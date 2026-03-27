# Cost-splitting across parties

**Status:** Roadmap — post-launch feature
**Priority:** Medium (launch without it, build when demand signals justify)
**Target:** V2 or later

---

## Background

In many CA proceedings, both sides share the cost of the court reporter and/or transcript. Under CA Gov. Code §69950, the original transcript is billed at statutory rates, and copies for additional parties are billed at the statutory copy rate. Today, this splitting is handled manually — attorneys negotiate who pays what, and the reporter invoices each party separately. It's messy and slow.

## How it works today (without the platform)

1. Attorney A orders the transcript from the reporter
2. Attorney B (opposing counsel) requests a copy
3. Reporter invoices Attorney A for the original and Attorney B for the copy
4. Reporter chases two payments instead of one
5. If one side doesn't pay, the reporter is stuck

## Proposed platform flow

### Scenario 1: Copy request (most common)

1. Attorney A places an order through Dewey Sholes and pays for the original transcript
2. Reporter delivers the transcript
3. Attorney B (who may or may not be on the platform) requests a copy
4. If Attorney B is on the platform:
   - DS generates a copy invoice at the statutory copy rate
   - Attorney B pays through the platform
   - Reporter gets paid automatically — no chasing
5. If Attorney B is NOT on the platform:
   - DS sends an email invoice with a payment link (no account required)
   - Payment goes through Stripe, reporter gets paid automatically
   - This also serves as a lead gen / onboarding moment for Attorney B

### Scenario 2: Pre-agreed cost split

1. Attorney A places an order and indicates "split cost with opposing counsel"
2. Attorney A enters opposing counsel's email
3. DS sends a split invitation: "Attorney A has ordered a transcript for [Case Name]. Your share is $X. Accept and pay to receive your copy."
4. Both parties pay their share before the reporter begins work (or after delivery, TBD)
5. Reporter receives full payment in 2 business days regardless of who paid what

### Scenario 3: Court-ordered split

1. Court orders transcript costs split between parties (common in family law)
2. Attorney A uploads the court order or checks "court-ordered split"
3. DS generates invoices for each party based on the split ratio in the order
4. If one party doesn't pay within X days, DS notifies the court coordinator (stretch goal)

## Pricing

- Original transcript: Statutory rate (paid by ordering party)
- Copy: Statutory copy rate (paid by requesting party)
- Platform fee: 12% applied to each party's share separately
- Reporter payout: Full statutory rate within 2 business days, regardless of split status

## Key design decisions (TBD)

1. **Does the reporter wait for both parties to pay before starting?** Recommendation: No — the ordering attorney's payment triggers the work. Copy payments are collected separately.
2. **What if the second party doesn't pay?** The reporter is already paid (from the first party's payment). The copy invoice becomes a collections issue between DS and the second party.
3. **Can attorneys split unevenly?** e.g., 60/40 instead of 50/50. Recommendation: Allow custom ratios.
4. **Does opposing counsel need a DS account?** Recommendation: No — email invoice with payment link. But the experience should nudge them to sign up.

## Why this is post-launch

- Core transaction flow needs to be rock-solid first
- Requires guest checkout / email invoicing infrastructure
- Split logic adds complexity to the payment flow
- Low percentage of initial pilot transactions will involve splits (most pilot firms will be ordering for themselves)

## Rosie's note on future scaling

As the platform expands, we can set up arrangements for firms that want to use the same reporters and negotiate volume discounts or payment that syncs with the firm's billing cycle. For launch, this is too complicated. Revisit when there's revenue to support it.

## Success metrics (when launched)

- % of orders that use cost-splitting
- Average collection time for second-party invoices
- Conversion rate: guest invoice → platform signup
- Reporter satisfaction (are they getting paid faster than manual invoicing?)
