# CSR License Verification & Data Sync Policy

**Owner:** Aud  
**Last updated:** 2026-03-22  
**Status:** Draft — pending Rosie review

---

## Purpose

Ensure all reporters listed on Dewey Sholes hold active, valid CSR licenses issued by the California Court Reporters Board (CRB). Protect attorneys from being matched with unlicensed reporters and protect the platform from negligent-matching liability.

---

## Data Source

- **Source:** California Department of Consumer Affairs (DCA) public licensee data
- **Location:** [DCA Box folder](https://dca.app.box.com/s/oss6hf8jys2bmgxqd2gdz7w4oepm2il9) → `CourtReporters_8100/`
- **Format:** .xlsx file with all CSR and CRF (firm) licensees
- **Fields used:** License Number, First/Last Name, City, State, Expiration Date, License Status
- **Current dataset:** 4,733 active CA CSRs (as of January 2025 DCA update)

---

## Sync Schedule

### Quarterly Full Sync (January, April, July, October)

1. Download latest `CourtReporters_Data00.xlsx` from the DCA Box folder
2. Parse and compare against the platform database
3. For each record, check:
   - **New licenses:** Create unclaimed profile (name, CSR#, city, expiration)
   - **Status changes:** Active → Delinquent or Cancelled → auto-pause profile, notify reporter
   - **Expiration date changes:** Update stored expiration date
   - **Name/address changes:** Update profile data
4. Generate a sync report:
   - New CSRs added
   - Profiles paused (lapsed/delinquent)
   - Profiles reactivated (renewed)
   - Expiration dates updated
5. Review report manually before applying changes

### Automated Expiration Monitoring (Daily)

Run daily against stored expiration dates:

| Trigger | Action |
|---------|--------|
| 60 days before expiration | Email reporter: "Your CSR license expires on [date]. Renew to keep your listing active." |
| 30 days before expiration | Email + in-app banner: "Your license expires in 30 days." |
| 7 days before expiration | Email + in-app banner + flag profile as "Expiring soon" (visible to platform, not attorneys) |
| Expiration day | Auto-pause profile. Reporter cannot accept new jobs. Email: "Your listing has been paused. Renew your license and we'll reactivate automatically." |
| Post-expiration: next quarterly sync shows renewed | Auto-reactivate profile. Email: "Welcome back! Your listing is live again." |

### Delinquent License Handling

If a quarterly sync shows a reporter's status changed from "Active" to "Delinquent":

1. Immediately pause their profile (no new job matches)
2. Notify reporter: "The CRB shows your license as delinquent. Your listing is paused until your license is restored to active status."
3. Do NOT cancel active jobs — the reporter is still a licensed CSR, just behind on renewal fees
4. Check status at next quarterly sync; reactivate if restored

---

## Onboarding Verification

When a reporter signs up and claims their profile:

1. Match entered CSR number against CRB database
2. Verify name matches (fuzzy match — allow for maiden names, middle name variations)
3. Confirm license status is "Active"
4. Store expiration date for monitoring
5. If no match found: reject with message "We couldn't verify CSR #[number]. Please check your license number or contact support."

---

## Audit Trail

All license verification events must be logged:

- Timestamp
- CSR number
- Action taken (verified, paused, reactivated, warning sent)
- Source (onboarding check, quarterly sync, expiration monitor)
- Result (pass, fail, pending)

Retain logs for 3 years minimum (aligns with CA statute of limitations for professional negligence).

---

## Future: CRB API Integration

The CRB MOU template (already drafted) includes a provision for API access to license verification data. If/when CRB offers an API:

1. Switch from quarterly batch sync to real-time verification
2. Verify license at every job acceptance (not just onboarding)
3. Deprecate the quarterly Box file download

Until then, quarterly sync + daily expiration monitoring provides sufficient coverage.

---

## Responsible Parties

| Task | Owner | Frequency |
|------|-------|-----------|
| Download and run quarterly sync | Aud (automated in prod) | Quarterly |
| Review sync report | Aud | Quarterly |
| Monitor expiration emails | Automated | Daily |
| Respond to reporter license questions | Rosie | As needed |
| CRB relationship / API access | Rosie | Ongoing |
