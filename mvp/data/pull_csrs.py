#!/usr/bin/env python3
"""Pull the full CA Court Reporters Board public license roster via its JSON API."""
import json, time, urllib.request, urllib.parse, sys, os

BASE = "https://connect-ws.cab.ca.gov/api/public/DataAccess/verifyLicenseSearchCRB/Public/"
HEADERS = {
    "lapp-board-info-id": "41",
    "lapp-route-url": "/public/licensesearch/crb",
    "Accept": "application/json, text/plain, */*",
    "User-Agent": "Mozilla/5.0",
}
PAGE_SIZE = 1000
OUT_DIR = os.path.dirname(os.path.abspath(__file__))

def fetch_page(page):
    q = urllib.parse.urlencode({
        "Name": "", "LicenseNumber": "", "EntityType": "I",
        "SortDirection": "ASC", "PageSize": PAGE_SIZE, "SortColumn": "Name",
        "firstRecord": page * PAGE_SIZE, "PageNumber": page,
        "TotalRecords": 0, "sentAllResults": "false", "IsPagedData": 1,
    })
    req = urllib.request.Request(BASE + "?" + q, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.load(r)

def main():
    first = fetch_page(0)
    total = first.get("TotalRecords", 0)
    rows = list(first.get("Data") or [])
    n_pages = (total + PAGE_SIZE - 1) // PAGE_SIZE
    print(f"TotalRecords={total}  page_size={PAGE_SIZE}  pages={n_pages}", flush=True)
    for p in range(1, n_pages):
        time.sleep(0.4)
        d = fetch_page(p)
        got = d.get("Data") or []
        rows.extend(got)
        print(f"  page {p+1}/{n_pages}: +{len(got)} (total {len(rows)})", flush=True)
    with open(os.path.join(OUT_DIR, "crb_all_raw.json"), "w") as f:
        json.dump(rows, f)
    print(f"Saved {len(rows)} raw rows -> crb_all_raw.json", flush=True)

    # Survey distributions so we choose filters correctly.
    from collections import Counter
    st = Counter(r.get("LicenseStatusTypeName") for r in rows)
    ty = Counter(r.get("LicenseTypeName") for r in rows)
    print("\n=== LicenseStatusTypeName distribution ===")
    for k, v in st.most_common():
        print(f"  {v:>6}  {k}")
    print("\n=== LicenseTypeName distribution ===")
    for k, v in ty.most_common():
        print(f"  {v:>6}  {k}")

if __name__ == "__main__":
    main()
