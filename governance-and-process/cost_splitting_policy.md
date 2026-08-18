# Cost-splitting across parties

**Owner:** Aud & Rosie
**Last updated:** 2026-04-11
**Status:** Confirmed – Rosie approved design 4/11
**Priority:** Build into order flow (prototype complete, needs real build)

---

## Background

In multi-party court hearings, multiple attorneys often need the same court hearing transcript. Examples: a contested family law motion where both spouses' counsel want the record; a multi-party civil case where each defendant's counsel needs the hearing transcript for their own filings; a probate dispute where multiple beneficiaries' attorneys are entitled to the record. Today, attorneys negotiate cost splits informally over email/phone, and the CSR sends out partial invoices to each party manually. It's slow and the CSR often ends up chasing payments.

## Platform design: group checkout model

Per Rosie (4/11): "Our cost-split feature should only be for people who've already agreed and use it at initiation. We aren't chasing anyone down. Do you want to schedule for the 21st at 1:00 or not? We're only setting the job when everyone's on board and paid their share."

### Core principle

**All parties pay upfront. The job is only created once every share is paid.** The platform facilitates an agreement that parties have already reached – it does not create, enforce, or collect on payment obligations.

### Flow

1. **Ordering attorney** creates a transcript order through Shorthanders
2. In the pricing step, they toggle **"Split cost with other parties"**
3. They add co-paying attorneys (name, email, share percentage) – up to 5 co-payers
4. Each co-payer receives an email with a **secure payment link** to confirm and pay their share
5. **The job is only posted to reporters once all shares are collected**
6. If a co-payer doesn't confirm:
   - The ordering attorney is notified
   - They can: (a) cover the remaining share themselves and proceed, (b) cancel the order entirely, or (c) replace the non-responsive party with someone else
   - **Per Rosie (4/11): offer all three options.** Let the ordering attorney decide.
7. The CSR sees **one job** and receives **one full payment** – they don't need to know it was split

### What co-payers see

- An email: "[Attorney Name] has invited you to split the cost of a transcript for [Case Name / Number]"
- A secure page showing: case details, their share amount, and a payment form
- **No Shorthanders account required** – guest checkout via payment link
- After paying, they see a confirmation and a nudge to create an account for future orders

### What we do NOT do

- **No chasing.** If a co-payer doesn't pay, we notify the ordering attorney. We don't follow up with the co-payer.
- **No post-delivery splitting.** The split is agreed at order time, not after the transcript is delivered.
- **No copy fulfillment.** We don't sell transcript copies to third parties (see [transcript retention & custody policy](transcript_retention_and_custody_policy.md)). Each co-payer receives the same delivered transcript as part of the split order.
- **No court-ordered split enforcement.** If a court orders a split, the attorneys still handle it through our standard split flow. We don't interface with the court.

---

## Pricing

| Item | How it's handled |
|------|-----------------|
| Transcript cost | Statutory rate, split per agreed shares |
| Platform fee (12%) | Applied to each party's share separately |
| Reporter payout | Full statutory rate within 2 business days of delivery – reporter is unaffected by split |

---

## Share options

| Option | Description |
|--------|-------------|
| Equal split | Total divided equally among all parties (including ordering attorney) |
| Custom percentage | Each party's share set manually (25%, 33%, 50%, 75%) |

The ordering attorney always pays the remainder (total minus all co-payer shares).

---

## Why this design

1. **No collections risk for the platform.** Money is collected before work begins.
2. **No collections risk for the CSR.** They get one full payment regardless of split.
3. **Keeps the platform out of disputes.** We facilitate, we don't adjudicate.
4. **Aligns with Rosie's regulatory principle:** we don't take on duties that could edge us into the regulated CSR space (no copy sales, no third-party distribution).
5. **Guest checkout serves as lead gen.** Every co-payer who pays through a link is a potential new platform user.

---

## Insurance carrier relevance

Per Rosie (4/11): ~70% of attorneys functionally work for insurance carriers who audit defense costs. Cost splitting is especially common in multi-defendant cases where multiple insurers are funding the defense. A built-in split feature:

- Reduces attorney time spent negotiating and tracking splits (billable time the carrier pays for)
- Produces clean cost documentation that carriers can audit
- Could be highlighted in carrier-facing marketing as a cost control feature

---

## Deferred to post-launch

- **Volume discount arrangements** for firms that consistently use the same reporters (per Rosie: revisit when there's revenue)
- **Billing cycle sync** for firms that want to pay on net-30 or match their internal billing cycle
- **Split templates** for firms that repeatedly split with the same parties
- **Court-ordered split flow** with automatic ratio calculation from uploaded court orders

---

## Success metrics

- % of orders that use cost-splitting
- Average time from split invitation sent → co-payer payment received
- Conversion rate: guest payment link → platform account creation
- Reporter satisfaction: are they getting paid faster than manual split invoicing?
