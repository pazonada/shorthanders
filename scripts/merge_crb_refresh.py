#!/usr/bin/env python3
"""
Merge a fresh CRB licensee CSV with the current CSR research tracker state.

Use this when DCA publishes a refreshed Court Reporters Excel and we need to
sync changes into the live Sheets tracker without losing research notes,
outreach status, or contact info we've already populated.

Workflow:
1. Download the latest CourtReporters_Data00.xlsx from the DCA Box folder.
2. Convert to CSV with the columns: License #, Last Name, First Name, City,
   State, Zip, Expiration, Status. (The existing all_active_ca_csrs.csv format.)
3. Export the live Sheets tracker to CSV (File -> Download -> CSV).
4. Run this script. The output CSV is the new seed; import it back into Sheets
   replacing the old data.

Usage:
    python3 scripts/merge_crb_refresh.py \\
        --crb path/to/fresh_crb_export.csv \\
        --current path/to/sheets_export.csv \\
        --output research/csr_research_tracker_seed.csv \\
        --deltas research/merge_deltas_2026-07-15.csv

If --current is omitted, the script just produces a fresh seed from the CRB
data alone (same effect as the original seed generation).

Merge rules:
- For licenses that exist in both files: update CRB-sourced fields (last_name,
  first_name, city, zip, license_expiration); preserve research/tracking
  fields (email, phone, linkedin_url, employment_status, employed_courthouse,
  specialties, firms_worked_with, outreach_status, last_contacted_date,
  email_batch_number, notes, researcher, last_researched_date); recompute
  metro from ZIP using the lookup table.
- For licenses in CRB but not in current state: add as new rows with metro
  computed from ZIP, employment_status='unknown', outreach_status='not_contacted'.
- For licenses in current state but not in CRB: keep the row so research
  isn't lost, but prefix the notes field with [LAPSED] so the researcher can
  find and review them. The deltas CSV also lists them under the LAPSED
  change type. metro is recomputed for lapsed rows too.
- For licenses in both, the deltas CSV lists changed CRB fields under
  UPDATED so you can spot-check before importing.

The metro column is treated as a DERIVED field (always recomputed from ZIP,
never preserved from existing state). To override the classification for a
ZIP-3 prefix, edit research/zip_to_metro_lookup.csv. Per-row metro overrides
are not supported by design — they would silently disagree with the rule.
"""

import argparse
import csv
import sys
from pathlib import Path


CRB_SOURCED_FIELDS = {
    'last_name', 'first_name', 'city', 'zip', 'license_expiration',
}

DERIVED_FIELDS = {
    'metro',  # always recomputed from ZIP via the lookup table
}

PRESERVED_FIELDS = {
    'email', 'phone', 'linkedin_url', 'employment_status',
    'employed_courthouse', 'license_issue_year', 'specialties',
    'firms_worked_with', 'outreach_status', 'last_contacted_date',
    'email_batch_number', 'notes', 'researcher', 'last_researched_date',
}

OUTPUT_COLUMNS = [
    'csr_license_number', 'last_name', 'first_name', 'email', 'phone',
    'linkedin_url', 'metro', 'city', 'zip', 'license_expiration',
    'employment_status', 'employed_courthouse', 'license_issue_year',
    'specialties', 'firms_worked_with', 'outreach_status',
    'last_contacted_date', 'email_batch_number', 'notes', 'researcher',
    'last_researched_date',
]


def load_crb(path):
    rows = {}
    duplicates = []
    with open(path, newline='') as f:
        reader = csv.DictReader(f)
        for row in reader:
            lic = row['License #']
            if lic in rows:
                duplicates.append((lic, row))
            rows[lic] = row
    if duplicates:
        print(f'WARNING: CRB CSV has {len(duplicates)} duplicate license number(s):', file=sys.stderr)
        for lic, row in duplicates:
            print(f'  {lic}: {row["First Name"]} {row["Last Name"]} - {row["City"]} {row["Zip"]} (kept this row, dropped earlier one)', file=sys.stderr)
    return rows


def load_current(path):
    rows = {}
    if path is None or not Path(path).exists():
        return rows
    with open(path, newline='') as f:
        reader = csv.DictReader(f)
        for row in reader:
            rows[row['csr_license_number']] = row
    return rows


def load_zip_to_metro(path):
    """Load ZIP-3 to metro lookup. Returns empty dict if path missing."""
    mapping = {}
    if path is None or not Path(path).exists():
        return mapping
    with open(path, newline='') as f:
        reader = csv.DictReader(f)
        for row in reader:
            mapping[row['zip_prefix']] = row['metro']
    return mapping


def derive_metro(zip_str, zip_to_metro):
    """Compute metro from a ZIP using the 3-digit prefix. Falls back to other_ca."""
    if not zip_str or not zip_to_metro:
        return ''
    prefix = str(zip_str)[:3]
    return zip_to_metro.get(prefix, 'other_ca')


def build_merged_row(license_num, crb_row, existing_row, zip_to_metro):
    out = {col: '' for col in OUTPUT_COLUMNS}
    out['csr_license_number'] = license_num

    if crb_row:
        out['last_name'] = crb_row['Last Name']
        out['first_name'] = crb_row['First Name']
        out['city'] = crb_row['City']
        out['zip'] = crb_row['Zip']
        out['license_expiration'] = crb_row['Expiration']

    if existing_row:
        for field in PRESERVED_FIELDS:
            out[field] = existing_row.get(field, '')

    # metro is always recomputed from ZIP — derived field, not manual.
    # If you want to override, edit zip_to_metro_lookup.csv (changes the rule
    # for every CSR with that ZIP-3 prefix). Per-row overrides aren't supported.
    out['metro'] = derive_metro(out['zip'], zip_to_metro)

    if not out['employment_status']:
        out['employment_status'] = 'unknown'
    if not out['outreach_status']:
        out['outreach_status'] = 'not_contacted'

    return out


def main():
    ap = argparse.ArgumentParser(description='Merge fresh CRB pull into research tracker.')
    ap.add_argument('--crb', required=True, help='Path to fresh CRB CSV.')
    ap.add_argument('--current', help='Path to current tracker CSV (Sheets export). Omit for first-time seed.')
    ap.add_argument('--output', required=True, help='Path to write merged seed CSV.')
    ap.add_argument('--deltas', help='Path to write a deltas summary CSV (optional).')
    ap.add_argument('--zip-lookup', default='research/zip_to_metro_lookup.csv',
                    help='Path to ZIP-3 to metro lookup CSV (default: research/zip_to_metro_lookup.csv).')
    args = ap.parse_args()

    crb = load_crb(args.crb)
    current = load_current(args.current)
    zip_to_metro = load_zip_to_metro(args.zip_lookup)
    if not zip_to_metro:
        print(f'WARNING: ZIP-to-metro lookup not loaded from {args.zip_lookup}; metro column will be blank.', file=sys.stderr)

    crb_licenses = set(crb.keys())
    current_licenses = set(current.keys())

    new_licenses = crb_licenses - current_licenses
    lapsed_licenses = current_licenses - crb_licenses
    common_licenses = crb_licenses & current_licenses

    merged_rows = []

    # Rows present in latest CRB pull (continuing + new)
    for license_num in sorted(crb_licenses):
        merged_rows.append(
            build_merged_row(license_num, crb[license_num], current.get(license_num), zip_to_metro)
        )

    # Lapsed rows kept with a marker so research isn't lost
    for license_num in sorted(lapsed_licenses):
        existing = current[license_num]
        out = {col: existing.get(col, '') for col in OUTPUT_COLUMNS}
        # Recompute metro for lapsed rows too (if ZIP exists), keeps the field consistent
        out['metro'] = derive_metro(out.get('zip', ''), zip_to_metro)
        marker = '[LAPSED — not in latest CRB pull]'
        existing_notes = out.get('notes', '')
        if marker not in existing_notes:
            out['notes'] = (marker + ' ' + existing_notes).strip()
        merged_rows.append(out)

    with open(args.output, 'w', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=OUTPUT_COLUMNS)
        writer.writeheader()
        writer.writerows(merged_rows)

    print(f'Wrote {len(merged_rows)} rows to {args.output}', file=sys.stderr)
    print(f'  - {len(new_licenses)} newly licensed (added)', file=sys.stderr)
    print(f'  - {len(common_licenses)} continuing (research fields preserved)', file=sys.stderr)
    print(f'  - {len(lapsed_licenses)} lapsed (kept with [LAPSED] note)', file=sys.stderr)

    if args.deltas:
        with open(args.deltas, 'w', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(['change_type', 'csr_license_number', 'name', 'note'])

            for lic in sorted(new_licenses):
                row = crb[lic]
                writer.writerow([
                    'NEW', lic,
                    f"{row['First Name']} {row['Last Name']}",
                    f"{row['City']}, {row['Zip']} - exp {row['Expiration']}",
                ])

            for lic in sorted(lapsed_licenses):
                row = current[lic]
                writer.writerow([
                    'LAPSED', lic,
                    f"{row.get('first_name','')} {row.get('last_name','')}",
                    f"prior outreach status: {row.get('outreach_status','')}",
                ])

            for lic in sorted(common_licenses):
                crb_row = crb[lic]
                cur_row = current[lic]
                changes = []
                if crb_row['City'] != cur_row.get('city', ''):
                    changes.append(f"city: {cur_row.get('city','')} -> {crb_row['City']}")
                if crb_row['Zip'] != cur_row.get('zip', ''):
                    changes.append(f"zip: {cur_row.get('zip','')} -> {crb_row['Zip']}")
                if crb_row['Expiration'] != cur_row.get('license_expiration', ''):
                    changes.append(f"expiration: {cur_row.get('license_expiration','')} -> {crb_row['Expiration']}")
                if changes:
                    writer.writerow([
                        'UPDATED', lic,
                        f"{crb_row['First Name']} {crb_row['Last Name']}",
                        '; '.join(changes),
                    ])
        print(f'Wrote deltas to {args.deltas}', file=sys.stderr)


if __name__ == '__main__':
    main()
