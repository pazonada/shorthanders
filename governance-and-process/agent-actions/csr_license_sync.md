# Agent: CSR license sync

**Purpose:** Keep the platform's CSR database current with the Court Reporters Board and prevent unlicensed reporters from accepting jobs.

**Full policy:** See `governance-and-process/CSR_License_Verification_Policy.md`

---

## Quarterly full sync

- **Trigger:** January 1, April 1, July 1, October 1
- **Source:** DCA Box folder → `CourtReporters_8100/CourtReporters_Data00.xlsx`
- **Actions:**
  1. Download latest CRB data file
  2. Diff against platform database
  3. Create unclaimed profiles for new CSR licenses
  4. Pause profiles where status changed to Delinquent or Cancelled
  5. Reactivate profiles where status restored to Active
  6. Update expiration dates
  7. Generate sync report for human review
- **Escalation:** If >50 profiles change status in a single sync, flag for manual review before applying

## Daily expiration monitor

- **Trigger:** Daily at 6:00 AM PT
- **Actions:**
  1. Query all active reporter profiles
  2. Send warnings at 60/30/7 days before license expiration
  3. Auto-pause profiles on expiration day
  4. Auto-reactivate if next sync shows renewed license
- **Escalation:** If a reporter with active jobs has their license expire, notify Aud + Rosie immediately

## Onboarding verification

- **Trigger:** Reporter submits CSR number during signup
- **Actions:**
  1. Match CSR number against database
  2. Verify name (fuzzy match)
  3. Confirm status = Active
  4. Store expiration date
- **Escalation:** If CSR number not found or status not Active, block signup and show error message
