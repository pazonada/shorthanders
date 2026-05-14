# Billing & payment policy

**Owner:** Aud & Rosie
**Last updated:** 2026-03-22
**Status:** Draft

---

## Launch model

- **Attorneys pay per order.** Credit card charged when the order is placed.
- **Reporters paid in 2 business days** after delivery acceptance (or auto-release).
- **No Net-30 invoicing at launch.** We cannot float 28 days of reporter payouts without capital.
- **Every invoice carries the firm's case + matter reference** so the firm can reconcile the charge against the right client matter at billing time. See "Invoice contents" below.

---

## Invoice contents (for firm-side reconciliation)

Per Rosie (2026-05-14): *"As the law firm side is keeping track of which client matter the cost is attached to, the firm can reconcile its internal billing when billing time comes."*

To support that reconciliation cleanly, every Dewey Sholes invoice must include the following identifying fields prominently (not buried in fine print):

| Field | Source | Purpose |
|---|---|---|
| **Invoice number** | Auto-generated at order placement | Our internal record |
| **Invoice date** | Order placement timestamp | Pairs with the charge on the firm's card statement |
| **Bill-to** | Firm name + ordering attorney + billing address | Who the firm's AP team makes payable |
| **Case caption** (case name) | From order form Step 2 | The court matter the work was done for |
| **Case number** | From order form Step 2 | Court docket number |
| **Firm's internal matter / client reference** | From order form Step 2 (optional, attorney-supplied) | Firm-specific billing code so AP can map the charge to the right client matter without having to look it up by case name. **This is what enables Rosie's reconciliation use case.** |
| **Line items** | Auto-built from the order: per-page rate × pages, attendance per diem, turnaround multiplier, travel time, copy line items, etc. | So the firm can see what they paid for |
| **Subtotal, platform fee, total** | Calculated | The math |
| **Status** | Pending / Paid | Whether the card has been charged |

The firm's matter reference field is **optional at order time** but strongly encouraged. Firms with established billing-code conventions (e.g. "2025-PI-0117" or "Martinez/Divorce") can drop their internal reference in once at order, and it then appears on:

1. The order review screen (Step 5 of the order flow)
2. The invoice (in a "For your firm's internal billing reconciliation" callout above the line items)
3. The billing dashboard's invoice list (alongside the invoice ID and date)

This means the firm's AP team never has to call us to ask "what was this charge for?" – the matter reference travels with the invoice from order to download.

**Why we did NOT use the court case number alone:** firms often use internal billing codes that don't match the court docket number (one client can have multiple matters; multiple law firms can be working the same court case from different sides; some firms organize billing by client name + matter type rather than by case). The internal matter reference lives alongside the court case info, not in place of it.

---

## Why not Net-30 at launch

Net-30 means the attorney pays 30 days after receiving the transcript, but the reporter still expects payment within 2 business days. That creates a 28-day float the platform would need to cover. As a bootstrapped LLC with no outside capital, we can't take on that cash flow risk.

---

## Future: Net-30 and volume pricing

As Rosie put it: "I think as we expand we can set something up for firms that want to use the same people and negotiate volume discounts or payment that syncs with the firm's billing cycle or whatever but just to get started that's too complicated."

When we have consistent revenue and cash reserves, revisit Net-30 with these guardrails:

- **Eligibility:** Firms must have 3+ months of on-time pay-per-order history and average 10+ orders/month
- **Credit card on file as backup:** If the invoice isn't paid by day 30, auto-charge the card
- **Volume discounts:** Negotiate per-page rate discounts for firms committing to monthly minimums
- **Billing cycle sync:** Allow firms to align invoicing with their internal billing cycle (1st of month, 15th, etc.)
- **Reporter payment unchanged:** Reporters always get paid in 2 business days regardless of attorney billing terms – the platform floats the difference from reserves

**Trigger to revisit:** When monthly platform fee revenue consistently exceeds $5,000/month for 3+ months.
