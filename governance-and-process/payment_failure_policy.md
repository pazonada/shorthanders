# Payment failure policy

**Owner:** Aud
**Last updated:** 2026-04-11
**Status:** Draft

---

## How money flows through the platform

Dewey Sholes uses Stripe Connect as the payment layer. Money never sits in Studio Crux's business bank account – Stripe holds funds and routes them.

```
Attorney pays $215 via Stripe
    |
    v
[Stripe holds $215 in platform balance]
    |
    2 business days after delivery acceptance / auto-release
    |
    v
Stripe splits automatically:
    ├── $189.20 → CSR's bank account (via Stripe Connect)
    └── $25.80  → Studio Crux bank account (platform fee: 12%)
```

### Why this matters
- Studio Crux never holds client funds in its own bank account – avoids money transmitter licensing, commingling, and trust accounting requirements
- Stripe is PCI Level 1 certified – we never see or store card numbers
- CSRs set up Stripe Connect accounts during onboarding (identity verification + bank account linking)
- Studio Crux receives only its platform fee, deposited on its own schedule (daily/weekly/monthly)

---

## Payment failure scenarios

### Scenario 1: Attorney's card declines at order time

**Trigger:** Attorney submits an order, card is declined by their bank.

**What happens:**
- Order is NOT created. No job is posted to reporters.
- Attorney sees: "Payment failed. Please check your card details or try a different payment method."
- No notification to anyone else – nothing has happened yet.

**Resolution:** Attorney updates their payment method and resubmits. Self-service, no admin involvement.

### Scenario 2: Cost-split co-payer's card declines

**Trigger:** Co-payer clicks their payment link, enters card info, card is declined.

**What happens:**
- Co-payer's share is NOT collected. Job remains in "waiting for co-payers" status.
- Co-payer sees: "Payment failed. Please try a different card."
- Ordering attorney is NOT notified immediately (give the co-payer a chance to retry).

**Escalation (if not resolved within 24 hours):**
- Ordering attorney is notified: "[Co-payer name]'s payment hasn't gone through. You can cover their share, cancel the order, or replace them."
- Co-payer gets a reminder email: "Your payment for [case] is still pending."

**Resolution:** Co-payer retries with a different card, or ordering attorney takes one of the three options.

### Scenario 3: CSR payout fails (bank rejects deposit)

**Trigger:** Stripe attempts to transfer earnings to CSR's bank account, bank rejects (wrong account number, closed account, etc.).

**What happens:**
- Funds stay in Stripe platform balance (safe – not lost).
- CSR is notified: "Your payout of $197.80 couldn't be processed. Please update your bank information in Settings."
- Attorney is NOT notified – their part is done. They accepted delivery and their card was charged successfully.
- Admin dashboard shows a flag: "Payout failed for [CSR name] – $197.80"

**Escalation (if not resolved within 7 days):**
- Second notification to CSR: "Your payout is still pending. Update your bank details to receive $197.80."
- After 30 days: admin manually reaches out to CSR.

**Resolution:** CSR updates bank info in Settings → Stripe retries payout automatically.

### Scenario 4: Auto-release payment fails

**Trigger:** The 2-business-day auto-release window expires (attorney didn't respond), platform attempts to finalize payment, but the attorney's card on file has expired or been cancelled since the order was placed.

**What happens:**
- Attorney is notified: "Payment for [case] couldn't be processed. Please update your payment method within 48 hours to release payment to your reporter."
- CSR is notified: "Payment for [case] is delayed due to a billing issue. We're working on it – you'll be paid as soon as it's resolved."
- Admin dashboard shows a flag: "Payment hold – attorney card declined for [case]"

**Escalation (if not resolved within 48 hours):**
- Second notification to attorney with stronger urgency.
- After 7 days without resolution: admin manually contacts attorney. CSR's payment may be advanced from platform reserves if the amount is small enough.

**Resolution:** Attorney updates their card → payment processes immediately → CSR gets paid.

### Scenario 5: Refund requested after payment

**Trigger:** Attorney disputes a charge, requests a correction, or the job is cancelled after payment.

**Launch approach:** Handle case-by-case. No automated refund flow.
- Admin reviews the dispute
- If refund is warranted: issue through Stripe dashboard manually
- CSR payout is adjusted accordingly (if transcript wasn't delivered, CSR isn't paid)
- If transcript was delivered and accepted, no refund – the correction request flow applies instead

---

## Launch simplifications

For the 15-25 firm launch cohort, we keep it simple:

| Scenario | Automated? | Manual fallback |
|----------|-----------|----------------|
| Card decline at order | Yes – error message, retry | None needed |
| Co-payer decline | Yes – notify ordering attorney after 24h | Admin can step in |
| CSR payout failure | Yes – notify CSR | Admin follows up after 7 days |
| Auto-release card expired | Yes – notify attorney | Admin follows up after 48h |
| Refund | No | Admin handles via Stripe dashboard |

**What we build for launch:** Error messages for scenarios 1-4. Notifications for scenarios 2-4. Everything else is manual admin work during the launch window.

**What we build later:** Automated retry logic, dunning email sequences, self-service refund requests, payment advance for stuck CSR payouts.

---

## Related policies

- [Billing & payment policy](billing_and_payment_policy.md) – 2 business day payment timing, upfront charging
- [Cost-splitting policy](cost_splitting_policy.md) – all parties pay upfront before job is created
- [Late delivery & deplatforming policy](late_delivery_and_deplatforming_policy.md) – what happens when jobs go wrong
