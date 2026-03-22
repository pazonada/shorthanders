# Agent: Financial reconciliation

**Purpose:** Ensure all payments, payouts, and fees are accurate and timely.

---

## Daily payout processing

- **Trigger:** Daily at 10:00 AM PT
- **Actions:**
  1. Identify all deliveries where the 2-business-day review window has closed (attorney accepted or auto-released)
  2. Calculate reporter payout: full statutory rate based on certified word count
  3. Initiate Stripe Connect payout to reporter
  4. Generate attorney invoice: statutory rate + 12% platform fee
  5. Record platform fee revenue
- **Escalation:** If a payout fails (invalid bank account, Stripe error), notify reporter + Aud

## Invoice generation

- **Trigger:** On delivery acceptance / auto-release
- **Actions:**
  1. Calculate final cost from certified word count (not the estimate)
  2. Generate itemized invoice: base rate, turnaround adjustment, platform fee
  3. If fee waiver indicated: generate TRF reimbursement application paperwork
  4. Email invoice to attorney, store in billing dashboard
- **Escalation:** If final cost differs >20% from estimate, flag for review before charging

## Monthly reconciliation

- **Trigger:** 1st of each month
- **Actions:**
  1. Reconcile all Stripe transactions against platform records
  2. Verify: total attorney charges = total reporter payouts + platform fees
  3. Flag any discrepancies >$1
  4. Generate monthly financial summary for founders
- **Escalation:** Any discrepancy gets flagged to Aud immediately

## Annual tax document generation

- **Trigger:** January 15 each year
- **Actions:**
  1. For each reporter who earned >$600 in the calendar year: generate 1099-NEC
  2. File with IRS via Stripe's 1099 filing service
  3. Send copy to reporter
  4. Store records for 7 years
- **Escalation:** Reporters missing W-9 on file cannot receive 1099 — flag for follow-up

## Listing fee billing

- **Trigger:** Annual, on reporter's signup anniversary
- **Actions:**
  1. Charge annual listing fee ($99 individual / $79 per reporter for firm accounts)
  2. If referral discount active: apply discounted rate
  3. Send renewal receipt
  4. If payment fails: send reminder, retry in 3 days, pause profile after 2 failed attempts
- **Escalation:** Paused profiles due to failed payment get a 14-day grace period before delisting
