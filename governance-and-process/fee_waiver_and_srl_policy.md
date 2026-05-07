# Fee Waiver & Self-Represented Litigant Policy

These are two related but distinct populations the platform serves. This doc captures how we treat each one, what we promise, and what we explicitly don't promise at MVP.

## Why one policy doc covers both

Fee-waiver clients and self-represented litigants (SRLs) are often conflated in marketing copy because they overlap in the access-to-justice conversation. They are not the same population:

- **Self-Represented Litigant (SRL)** is a *legal-status* label – a party to a court case who is not represented by an attorney. Anyone can be an SRL regardless of income.
- **Fee waiver** is a *financial-hardship* status – a court-granted exemption from court fees (forms FW-001 / FW-003), available to people who demonstrate inability to pay.

The Venn diagram is partial:

| | Has fee waiver | No fee waiver |
|---|---|---|
| **SRL (no attorney)** | Indigent person going pro se | Wealthy or principled DIY litigant |
| **Represented (has attorney)** | Legal aid client, pro-bono client | Typical paying client |

These two groups need *different* accommodations from the platform. This policy treats them separately so the team and the site copy don't conflate them.

## Self-represented litigant (SRL) policy

### What we promise SRLs at MVP

- **Plain-English ordering flow.** No assumed familiarity with court procedure or transcript jargon. Tooltips on case-type fields, plain explanations of what a transcript is and when one is needed, and a "what happens next" walkthrough at every step.
- **No login required to read public information.** SRLs may not have a lawyer to point them at the right resources. The TRF page, FAQ, About, and pricing pages are accessible without an account.
- **Email support.** SRLs without a firm behind them get the same response time as any other user.
- **Same pricing as everyone else.** SRLs pay the statutory rate plus the platform fee. Being an SRL by itself does not unlock a discount or fee waiver; that's a separate determination made by the court (see below).

### What being an SRL does NOT entitle a person to on Dewey Sholes

- **A fee waiver.** Fee waivers are granted by courts, not by Dewey Sholes. An SRL who has not applied for or been granted a fee waiver pays full statutory rates.
- **TRF reimbursement.** TRF (see below) is keyed to fee-waiver status, not to SRL status. A wealthy SRL has no TRF claim.
- **Free legal advice.** We do not provide legal advice, recommend attorneys, or interpret court orders. We are a marketplace for transcript ordering.

### Site copy rules for SRL framing

- The homepage SRL callout addresses ordering accommodation only – no fee-waiver claim attached.
- Do NOT bundle "fee waiver" into SRL marketing language. They are separate.
- Do NOT imply Dewey Sholes is a legal-aid service. We are a marketplace.

## Fee-waiver / TRF policy

### Who this applies to

Anyone – represented or not – who has a court-granted fee waiver on file (FW-001 or FW-003). The largest TRF user volume in practice is **legal aid orgs and pro-bono attorneys representing fee-waiver clients**, not solo pro-se litigants.

### How payments flow (no float, ever)

The platform never floats a fee-waiver order. The flow is:

1. The customer (firm, legal aid org, pro-bono attorney, or SRL) places an order and checks "fee waiver applies."
2. **The customer pays the statutory transcript rate at checkout, exactly like any other order.** Stripe charge clears immediately.
3. **Dewey Sholes pays the CSR on the standard payout schedule** – exactly like any other order. The CSR experience is identical regardless of fee-waiver status.
4. After delivery, the customer separately submits TRF reimbursement paperwork to the court.
5. The state reimburses *the customer* directly (not Dewey Sholes), 8-10 weeks later, up to $2,500 per case, subject to TRF fund availability.

The customer carries the float. We do not. This rule is non-negotiable – see [TRF Research Memo](../research/) for the underlying analysis.

### What we provide at MVP (deferred auto-generation)

At launch, when an order is marked fee-waiver:

- **After delivery, we email the customer:**
  - The TRF reimbursement application (or links to the current court forms)
  - Step-by-step submission instructions
  - The case-specific details they'll need to fill in (case name, number, court, department, hearing date, page count, statutory amount paid)
- **Customer fills in the form, signs, and submits to the court clerk.**

What we do *not* provide at MVP: pre-filled, ready-to-sign reimbursement applications. Building court-form auto-fill is real engineering (templating, county-specific variations, validation, ongoing form-revision tracking) and is not justified by MVP volume.

### Future: TRF auto-generation (v1.1+)

When justified by volume – likely once a legal aid org or pro-bono partner is consistently sending fee-waiver orders – we will build the auto-fill engine. Trigger criteria:

- 20+ fee-waiver orders per month, OR
- A partnership commitment from a legal aid org that requires it

Until then, the email-the-forms approach preserves the user benefit at minimal engineering cost.

### What we don't promise

- We do not guarantee TRF reimbursement. Denials happen if the fee waiver is invalid, the fund is exhausted, or paperwork is incomplete.
- We do not pursue reimbursement on the customer's behalf. They submit; they collect.
- We do not refund the customer if the state denies reimbursement. The transcript was rendered and the CSR was paid; that transaction stands.

### Fund-exhaustion handling

The TRF (Trial Court Trust Fund line item, ~$300K/year per Gov. Code § 69953) runs out most fiscal years. Orders are processed by the court on a first-come, first-served basis from July 1 onward. We surface this honestly in the TRF FAQ and recommend submitting early in the fiscal year. We do not advance payment if the fund is exhausted.

## Site copy alignment

The following surfaces have been reviewed and aligned with this policy as of 2026-05-07:

- Homepage SRL callout – ordering accommodation only, fee-waiver clause removed
- Homepage pricing fee-waiver footer – speaks to anyone with a fee waiver, accurate framing on send-forms approach
- Order flow fee-waiver checkbox + summary footnote – accurate "send forms after delivery" framing
- TRF page (#/trf) – Step 2, FAQ f3, and CTA aligned with deferred auto-generation
- "TRF reimbursement, made simple" use-cases card – aligned

Future copy that touches either audience must follow this policy:
- SRL framing → ordering accommodation, no fee-waiver assumption
- Fee-waiver framing → addresses anyone with FW-001/FW-003, no SRL assumption, honest about email-the-forms vs. auto-fill scope

## Related decisions and references

- **No-float rule:** firms/customers always pay upfront. See [billing_and_payment_policy.md](billing_and_payment_policy.md).
- **Cost splitting:** all parties pay before the job is created. See [cost_splitting_policy.md](cost_splitting_policy.md).
- **Court-only scope:** TRF applies only to court proceedings, which matches our scope. See [scope_public_court_proceedings_only.md](scope_public_court_proceedings_only.md).
- **Statutory rates:** transcript pricing per Gov. Code § 69950. See PRICING constant in `index.html` and the pricing page.
