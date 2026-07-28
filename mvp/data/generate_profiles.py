#!/usr/bin/env python3
"""Regenerate mvp/csr_profiles.js from the active-CSR pull, with county + MASKED email.

The public license email is masked (m***@domain) before it is written to the client file so the
deployed directory can't be scraped for reporters' raw addresses. Contact is routed through Dewey
Sholes (the "Invite this reporter" flow), never by exposing the address. The real address lives only
in the source pull (crb_all_raw.json, not deployed) and, later, the backend. Must match the JS
maskEmail() in _app_05_directory.jsx.
"""
import json, os, re

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = "/Users/audubondougherty/Desktop/AI_experiments/dewey-sholes"
rows = json.load(open(os.path.join(HERE, "crb_all_raw.json")))
ACTIVE = {"Active", "Active (Pending Renewal)"}

def tc(s):
    if not s:
        return ""
    s = re.sub(r"\s+", " ", s.strip())
    return s.title()

def mask_email(email):
    """m***@domain, lowercased. Empty if no address. Matches JS maskEmail()."""
    email = (email or "").strip()
    at = email.find("@")
    if at < 1:
        return ""
    return (email[0] + "•••@" + email[at + 1:]).lower()

CA_COUNTIES = {c.lower(): c for c in [
    "Alameda","Alpine","Amador","Butte","Calaveras","Colusa","Contra Costa","Del Norte",
    "El Dorado","Fresno","Glenn","Humboldt","Imperial","Inyo","Kern","Kings","Lake","Lassen",
    "Los Angeles","Madera","Marin","Mariposa","Mendocino","Merced","Modoc","Mono","Monterey",
    "Napa","Nevada","Orange","Placer","Plumas","Riverside","Sacramento","San Benito",
    "San Bernardino","San Diego","San Francisco","San Joaquin","San Luis Obispo","San Mateo",
    "Santa Barbara","Santa Clara","Santa Cruz","Shasta","Sierra","Siskiyou","Solano","Sonoma",
    "Stanislaus","Sutter","Tehama","Trinity","Tulare","Tuolumne","Ventura","Yolo","Yuba"]}

def county_clean(c):
    """Snap the raw county to a canonical CA county, an out-of-state bucket, or blank."""
    if not c:
        return ""
    c = re.sub(r"\s+", " ", c.strip())
    base = re.sub(r"(?i)\s+county$", "", c).strip()      # drop trailing " County"
    key = base.lower()
    if key in CA_COUNTIES:
        return CA_COUNTIES[key]
    if re.search(r"(?i)out of (state|country)", base):
        return "Out of State"
    return ""                                             # numeric codes, "CA", typos -> unknown

recs = []
for r in rows:
    if "Certified Shorthand Reporter" not in (r.get("LicenseTypeName") or ""):
        continue
    if r.get("LicenseStatusTypeName") not in ACTIVE:
        continue
    state = (r.get("IFNULL(Addr.StateCode, '')") or "").strip().upper()
    county = county_clean(r.get("CountyName"))
    if state and state != "CA":
        county = "Out of State"      # collapse all non-CA counties into one bucket
    method = {
        "Steno Machine Writer": "Machine (steno)",
        "Voice Writer": "Voice",
        "Steno Machine Writer, Voice Writer": "Machine & Voice",
    }.get((r.get("CertificationMethod") or "").strip(), "")
    recs.append({
        "csrNumber": str(r.get("LicenseNumber") or ""),
        "name": tc(r.get("Name")),
        "city": tc(r.get("City")),
        "county": county,
        "method": method,
        "zip": (r.get("Zip") or "").strip(),
        "email": mask_email(r.get("PublicEmail")),
        "expiration": (r.get("LicenseExpirationDate") or "")[:10],
    })

recs.sort(key=lambda x: x["name"])
out = os.path.join(REPO, "mvp", "csr_profiles.js")
with open(out, "w") as f:
    f.write("const CSR_PROFILES = ")
    f.write(json.dumps(recs, separators=(",", ":"), ensure_ascii=False))
    f.write(";\n")

print(f"Wrote {len(recs)} active CSRs -> {out}  ({os.path.getsize(out)//1024} KB)")
blank_county = sum(1 for r in recs if not r["county"])
print(f"  blank county after cleaning: {blank_county}")
