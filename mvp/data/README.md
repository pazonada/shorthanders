# CSR directory data

Source data for the unclaimed profiles in the reduced-scope MVP.

## Files

| File | What it is |
|---|---|
| `csr_active_directory.csv` | **The spreadsheet.** All active California CSRs (one row each). Import into Google Sheets / Excel. |
| `pull_csrs.py` | Pulls the full CRB public roster from the board's JSON API → `crb_all_raw.json`. |
| `build_spreadsheet.py` | Filters the raw roster to active CSRs and writes the CSV. |

## How the data is sourced

The Court Reporters Board of California publishes a public license search at
`connect.courtreportersboard.ca.gov/public/licensesearch/crb`. It's an Angular
app backed by a JSON API on a shared multi-board host. The board is identified by
the `lapp-board-info-id: 41` header — that's what scopes results to the CRB.

Endpoint (GET):
```
https://connect-ws.cab.ca.gov/api/public/DataAccess/verifyLicenseSearchCRB/Public/
  ?Name=&LicenseNumber=&EntityType=I&SortDirection=ASC&SortColumn=Name
  &PageSize=1000&PageNumber=<n>&firstRecord=<n*1000>&TotalRecords=0&sentAllResults=false&IsPagedData=1
Headers: lapp-board-info-id: 41
         lapp-route-url: /public/licensesearch/crb
         Accept: application/json, text/plain, */*
```
An empty `Name` returns the whole roster (paginated). No login or session needed.
Each record already contains name, license number, status, full address, **county**,
**public email**, expiration, and certification method — so there is **no need to
open the per-person "Details" page** the way the manual process did.

## Refreshing the data

```bash
python3 pull_csrs.py          # -> crb_all_raw.json  (~15 requests, ~1 min)
python3 build_spreadsheet.py  # -> csr_active_directory.csv
```

## Filter used

The roster has 14,519 total records. The CSV keeps only:
- **License type** = Certified Shorthand Reporter (excludes 272 Court Reporter Firm licenses)
- **License status** ∈ {Active, Active (Pending Renewal)}

Everything Cancelled / Delinquent / Deceased / Revoked / Suspended is dropped.
Result: **5,705 active CSRs.**

> Judgment call to revisit: **Delinquent** (820 licenses = lapsed for non-renewal,
> not the same as cancelled) are currently excluded. If you want reporters who are
> merely behind on renewal to still appear, add `"Delinquent"` to the `ACTIVE` set
> in `build_spreadsheet.py`.

## Distributions (as of last pull)

Status: Cancelled 7,308 · Active 5,865 · Delinquent 820 · Deceased 403 · Revoked 86 ·
Active (Pending Renewal) 23 · disciplinary <15.
Type: CSR 14,247 · Court Reporter Firm 272.
