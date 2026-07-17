#!/usr/bin/env python3
"""Filter the CRB roster to active CSRs and write a clean spreadsheet CSV."""
import json, csv, os, re

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = "/Users/audubondougherty/Desktop/AI_experiments/dewey-sholes"
rows = json.load(open(os.path.join(HERE, "crb_all_raw.json")))

ACTIVE = {"Active", "Active (Pending Renewal)"}
# Base URL of the deployed MVP. Override with:  DS_CLAIM_BASE=https://your-url.vercel.app python3 build_spreadsheet.py
CLAIM_BASE = os.environ.get("DS_CLAIM_BASE", "https://deweysholes-mvp.vercel.app").rstrip("/")

def titlecase(s):
    if not s:
        return ""
    s = s.strip()
    # keep short all-caps tokens like initials sensible; simple title-case is fine for display
    out = re.sub(r"\b([A-Za-z])([A-Za-z']*)\b", lambda m: m.group(1).upper() + m.group(2).lower(), s.title())
    return out

def county_clean(c):
    if not c:
        return ""
    c = titlecase(c)
    return re.sub(r"\s+County$", " County", c)

def only_date(s):
    return (s or "")[:10]

active_csrs = [
    r for r in rows
    if "Certified Shorthand Reporter" in (r.get("LicenseTypeName") or "")
    and (r.get("LicenseStatusTypeName") in ACTIVE)
]
active_csrs.sort(key=lambda r: (r.get("LastName") or "", r.get("FirstName") or ""))

os.makedirs(os.path.join(REPO, "mvp", "data"), exist_ok=True)
out_csv = os.path.join(REPO, "mvp", "data", "csr_active_directory.csv")

COLS = [
    ("License Number", lambda r: r.get("LicenseNumber") or ""),
    ("Name", lambda r: titlecase(r.get("Name"))),
    ("First Name", lambda r: titlecase(r.get("FirstName"))),
    ("Last Name", lambda r: titlecase(r.get("LastName"))),
    ("License Status", lambda r: r.get("LicenseStatusTypeName") or ""),
    ("City", lambda r: titlecase(r.get("City"))),
    ("County", lambda r: county_clean(r.get("CountyName"))),
    ("State", lambda r: r.get("IFNULL(Addr.StateCode, '')") or ""),
    ("Zip", lambda r: r.get("Zip") or ""),
    ("Street", lambda r: (r.get("StreetLine1") or "").strip()),
    ("Public Email", lambda r: (r.get("PublicEmail") or "").strip()),
    ("Certification Method", lambda r: r.get("CertificationMethod") or ""),
    ("Original License Date", lambda r: only_date(r.get("OriginalLicenseDate"))),
    ("Expiration Date", lambda r: only_date(r.get("LicenseExpirationDate"))),
    ("Claim URL", lambda r: CLAIM_BASE + "/#/claim/" + str(r.get("LicenseNumber") or "")),
]

with open(out_csv, "w", newline="") as f:
    w = csv.writer(f)
    w.writerow([c[0] for c in COLS])
    for r in active_csrs:
        w.writerow([fn(r) for _, fn in COLS])

# quick stats
from collections import Counter
with_email = sum(1 for r in active_csrs if (r.get("PublicEmail") or "").strip())
with_county = sum(1 for r in active_csrs if (r.get("CountyName") or "").strip())
print(f"Active CSRs written: {len(active_csrs)}")
print(f"  with public email: {with_email} ({100*with_email//len(active_csrs)}%)")
print(f"  with county:       {with_county} ({100*with_county//len(active_csrs)}%)")
print(f"  -> {out_csv}")
print("\nTop counties:")
for c, n in Counter(county_clean(r.get("CountyName")) for r in active_csrs).most_common(8):
    print(f"  {n:>5}  {c or '(blank)'}")
