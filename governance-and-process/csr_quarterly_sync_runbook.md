# CSR research tracker — quarterly sync runbook

**Purpose:** Step-by-step procedure for refreshing the Sheets-based CSR research tracker with the latest CRB licensee data, without losing any research notes / outreach status / contact info populated since the last sync.

**Cadence:** Quarterly per [CSR_License_Verification_Policy.md](CSR_License_Verification_Policy.md) — January, April, July, October. Confirm DCA's actual update cadence before assuming quarterly is sufficient (they may publish more frequently).

**Time required:** ~15 minutes if nothing surprising shows up; up to an hour if there are many lapsed licenses to triage.

---

## Prerequisites

- Access to the CA Department of Consumer Affairs Box folder ([link in the verification policy](CSR_License_Verification_Policy.md))
- Edit access to the live Google Sheet
- Local clone of the repo with Python 3 available (`python3 --version` should report 3.x)

---

## Step-by-step

### 1. Download the latest CRB Excel

1. Visit the DCA Box folder.
2. Open `CourtReporters_8100/`.
3. Download `CourtReporters_Data00.xlsx` (or whatever the current filename is).

### 2. Convert to CSV with the script's expected columns

The merge script expects exactly these columns: `License #, Last Name, First Name, City, State, Zip, Expiration, Status`. Order doesn't matter, but names must match.

1. Open the downloaded file in Excel / Numbers / Google Sheets.
2. Filter to `Status = Active` (drop expired/cancelled rows).
3. **File → Export / Save As → CSV**.
4. Save somewhere predictable, e.g. `~/Downloads/all_active_ca_csrs_2026-07-15.csv`.

### 3. Export the live tracker Sheet to CSV

1. Open the CSR research Google Sheet.
2. **Make sure you're on the main data tab** (not `zip_to_metro` or any other helper tab — the Download CSV exports the active tab).
3. **File → Download → Comma-separated values (.csv)**.
4. Save as e.g. `~/Downloads/csr_research_live_2026-07-15.csv`.

### 4. Run the merge script

From the repo root:

```bash
python3 scripts/merge_crb_refresh.py \
  --crb ~/Downloads/all_active_ca_csrs_2026-07-15.csv \
  --current ~/Downloads/csr_research_live_2026-07-15.csv \
  --output research/csr_research_tracker_seed.csv \
  --deltas research/merge_deltas_2026-07-15.csv
```

The script will:
- Print a summary to stderr (NEW / continuing / LAPSED counts).
- Warn about any duplicate license numbers in the CRB source.
- Write the merged seed (replaces the existing one in the repo).
- Write a deltas CSV summarizing NEW / LAPSED / UPDATED rows.

**The script always recomputes `metro` from ZIP using `research/zip_to_metro_lookup.csv`.** So you don't need the ARRAYFORMULA in your Sheet for the metro column to be correct after re-import — the values are baked into the merged CSV.

### 5. Review the deltas CSV

Open `research/merge_deltas_2026-07-15.csv` and skim:

- **NEW rows** — how many newly licensed CSRs are we adding? Expect modest growth (few dozen per quarter is normal in CA).
- **LAPSED rows** — were any of these CSRs you were actively pursuing? Note their license numbers for follow-up; sometimes a "lapsed" status is a rolling-renewal hiccup and the CSR is back next quarter.
- **UPDATED rows** — any address or expiration changes that impact ongoing research? Address changes can imply a metro reclassification.

If anything looks dramatically wrong (e.g., 1,000 lapsed when you expected 5), don't import — investigate the source first.

### 6. Re-import the merged CSV back to Sheets

1. In the live Google Sheet → **File → Import → Upload**.
2. Drag in `research/csr_research_tracker_seed.csv`.
3. Choose **Replace spreadsheet** as the import location.
4. Leave "Convert text to numbers, dates, and formulas" checked.
5. Click **Import data**.

Your sheet now reflects the latest CRB pull, with all your research notes preserved.

### 7. (Optional) Re-add the ARRAYFORMULA

The script computes `metro` itself, so the ARRAYFORMULA in column G is no longer required for correctness. Two reasonable choices:

- **Skip the formula** (recommended). `metro` becomes a static field. Simpler. The tradeoff: if you edit the `zip_to_metro` lookup tab between syncs, existing rows don't reclassify until the next merge.
- **Re-add the ARRAYFORMULA** to G2 if you want lookup-table edits to live-propagate. Same formula as before:
  ```
  =ARRAYFORMULA(IF(I2:I="", "", IFERROR(VLOOKUP(VALUE(LEFT(I2:I,3)), zip_to_metro!A:B, 2, FALSE), "other_ca")))
  ```
  You'll also need to clear the values in column G first (`Cmd+Shift+Down` from G2, Delete) before pasting the formula or it'll error with the "would overwrite data" message.

### 8. Commit the deltas log

The deltas CSV is a useful audit record of what changed each quarter. Add it to git:

```bash
git add research/merge_deltas_2026-07-15.csv research/csr_research_tracker_seed.csv
git commit -m "Quarterly CSR sync 2026-07-15"
git push
```

---

## Common edge cases and how to handle them

### A CSR I was researching just got marked lapsed

The merge script keeps lapsed rows with `[LAPSED]` prefixed in their notes. They'll still appear in your sheet so research isn't lost, but they're flagged for review. Decide case-by-case — sometimes a lapse is a rolling-renewal issue and the CSR is back in the next sync. If you've already emailed them, leave a clear note in `notes` and re-evaluate next quarter.

### The CRB Excel has duplicate license numbers

Rare but happens (the existing seed had Michelle Castellanos with two address records). The script keeps the latest occurrence and emits a warning so you know. If you want the dropped row's address, hand-edit it after import.

### A CSR's metro classification doesn't match where they actually work

The metro column is derived from the ZIP-3 prefix lookup — it's a "good first guess" not a final classification. Edge cases (CSR lives in one metro but works another, ZIP boundaries that span multiple counties) are noise we accept for outreach sequencing. **Do not hand-edit a single row's `metro` value** — the next sync will recompute and overwrite it.

If a ZIP-3 prefix is *systematically* wrong (e.g., you research 30 CSRs with prefix 925 and find most of them work LA-county courts, not the Inland Empire), edit the row in `research/zip_to_metro_lookup.csv` and re-import to the `zip_to_metro` Sheet tab. The change applies to all CSRs with that prefix on the next merge.

If you need finer-than-ZIP-3 control (e.g., distinguish Santa Rosa 95401 from Albion 95410, both in the 954 prefix), the script would need to be extended to support ZIP-5 overrides. Defer until volume justifies it.

### I added a custom column to my sheet

The merge script only knows about the canonical schema columns. Any custom columns you've added to the main sheet will be **dropped on the merge round-trip**. To preserve custom data:

- Put it in a **separate tab** keyed by `csr_license_number`, joined to the main tab via `=VLOOKUP(A2, custom_data!A:B, 2, FALSE)`.
- Or accept that custom columns need to be re-added manually after each merge (and keep notes on what you added).

### A row says `[LAPSED]` but the CSR is actually still active

Possible causes:
- Source data lag — the CRB may not have updated yet, or your downloaded CRB CSV is stale.
- Status filter mismatch — make sure you filtered for `Status = Active` in step 2, not just defaulted to all rows.

If neither of those, hand-edit the `notes` field to clear the `[LAPSED]` prefix and add a note like "verified active per CRB website on YYYY-MM-DD".

---

## Refining the system over time

As the research effort progresses, you'll find ways the system can be sharper:

- **ZIP-3 mapping errors**: edit `research/zip_to_metro_lookup.csv` and `git push`. Next quarterly sync picks it up.
- **New required schema fields**: edit `OUTPUT_COLUMNS` in `scripts/merge_crb_refresh.py` and add the matching column to the Sheet.
- **Ongoing data needs that don't fit the schema**: build a separate sheet/tab and join via `csr_license_number`.

Resist the urge to engineer this further until you have evidence that the simpler version is actually breaking. The goal is a cadence that survives without ceremony, not a perfect data model.
