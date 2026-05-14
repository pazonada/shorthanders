# Founding-member program & referral incentives

**Owner:** Aud
**Last updated:** 2026-05-14
**Status:** Confirmed — pricing-tier model retired; founding cohort is segmentation only

---

## What changed (2026-05)

We previously planned a 6-month "pilot pricing" window with a reduced 8% platform fee for firms and a waived $99/yr listing fee for CSRs. **That program is retired.**

Reasons:
- The discounted-then-bumps-up pricing creates a churn cliff at the rate-change date.
- It conflicts with our broader honesty/transparency positioning — every public surface had to carry a "rate ends [date]" warning, which undermines trust.
- We can't responsibly project Year-1 revenue if the headline pricing changes underneath us.

Everyone now pays the same prices from day one:
- Attorneys: **flat 12% platform fee** on every order
- Individual CSRs: **$99/yr** listing fee, billed annually
- CSR firm tier (deferred to future release): $79/reporter/year (3-10 reporters)

The early-adopter pull is preserved through non-pricing perks (see below), not through discounts.

---

## Founding cohort: the launch window

The first 6 months from public launch are the "launch window." Users who sign up during this window are tagged internally as **founding firms** or **founding reporters**.

**What founding members get:**
- Direct line to the founders for product feedback and support
- First access to new features as we roll them out
- A real say in roadmap priorities (we'll be running structured feedback sessions)
- Early case-study / reference-firm opportunities (for firms who want them)

**What founding members don't get:**
- A discounted-then-bumps-up pricing tier (the retired model)
- Locked-in rates that expire on a date certain
- Publicly advertised fee discounts

**Implementation:** Set `founding_member = true` and `joined_cohort = "launch-2026"` on the user record at signup, when `created_at` falls within the launch window. No price logic touches this flag – it's used purely for internal segmentation, CRM exports, and admin dashboards.

The launch window is configurable at the platform level – we can extend it without redefining anyone's pricing because there's no pricing tier attached.

---

## Email-only promo codes (added 2026-05-14)

A discretionary marketing tool for the founding cohort. Codes are handed out via **direct outreach only** – never advertised on the site, never listed in public marketing copy, never linked from the footer.

### How they work

- Founders or the marketing-strategist agent generate a code (e.g. `BAYAREA2026`, `WALSH-FIRM-MAY`) tied to a specific outreach campaign or recipient.
- The code carries an associated incentive: a one-time platform-fee waiver on first order, a one-time partial discount, or a one-time gift card redemption. Capped value per recipient.
- The signup flow has a collapsed "Have a promo code?" link on the welcome screen (attorney + CSR). Clicking expands an input. The code is captured on the user record at signup.
- On first qualifying transaction, the incentive applies automatically; the code is then consumed and can't be reused by that account.

### What codes can carry

| Incentive | Constraint | Example use |
|---|---|---|
| One-time platform-fee waiver | First order only | Reactivating a stalled firm-outreach conversation |
| Partial platform-fee discount (e.g. 50% off first order) | First order only | Founding-firm direct outreach via Rosie's network |
| Gift card on signup (e.g. $25 Amazon) | Subject to anti-gaming guardrails | CSR survey completion bonus |
| Free first month of CSR listing fee | Drops to $99/yr after | Founding-reporter recruitment via FB groups |

### What codes can't carry

- No multi-year discount tiers (re-creates the churn cliff we just retired)
- No "first year free / locked rate" gimmicks (same reason)
- No site-wide-publicized codes (defeats the email-only constraint)
- No codes that apply to every order indefinitely (compounds into a permanent margin hit)

### Why email-only

The whole point of retiring the pilot-pricing tier was to avoid the rate-change-warning problem ("your discount ends on date X"). Public codes recreate that problem the moment they're listed.

Email-only codes have none of those properties:
- They're capped, one-time, and never advertised
- A CSR or attorney who didn't get the code never sees it referenced anywhere
- They don't create a churn cliff because they're not a tier with an expiration

### Governance

The marketing-strategist agent (`.claude/agents/marketing-strategist.md`) is the day-to-day owner of which codes are generated and to whom. Aud signs off on any code with a value above $50 per recipient. Codes are tracked in the admin dashboard so we know which outreach surfaces are converting.

**Open questions for follow-up:**
- Code-generation UI: do we build admin tooling in V1, or generate codes ad hoc in a spreadsheet?
- Capped budget per quarter: needs Rosie sign-off. Propose $1,000/quarter cap on aggregate code-value redemptions until we have revenue to justify more.
- Anti-gaming: same guardrails as the CSR referral program (no self-referrals, first-order-only verification, refund-revokes-redemption).

---

## Referral incentives for CSRs

CSRs who refer other CSRs who actually sign up:

| Referrals who sign up | Reward |
|----------------------|--------|
| 1 | $10 digital Starbucks gift card |
| 5 | $25 Amazon gift card |
| 10+ | $50 Amazon gift card |

- Rewards are cumulative tiers (not per-referral)
- Referral tracked via unique invite link or code generated in CSR dashboard
- Referred CSR must complete onboarding and claim their profile to count

These rewards apply regardless of when the referred CSR signs up — they aren't restricted to the launch window. If we want to add a founding-cohort multiplier (e.g., 2x rewards for referrals during the launch window) we can layer it on later.

---

## Targeted recruitment: near-retirement CSRs

Per Rosie's suggestion: search the CRB database by license number to identify CSRs who have been licensed the longest (older license numbers = earlier in career). These reporters may be close to retirement and represent a unique recruitment opportunity — they have deep experience, established reputations, and may be interested in a platform that simplifies their remaining working years.

**Action item:** Build a filtered list from the CRB data sorted by original issue date (earliest first) and cross-reference with Bay Area geography for targeted outreach.

---

## Cancellation / refund policy

**Status:** TBD — needs more research

What happens when an attorney cancels after a CSR has been assigned? Who absorbs the cost if the CSR has already started work?

Per Rosie: "Attorneys are currently at the mercy of whatever CSRs say right now, so any improvement we provide would be earthshaking."

**Action item:** Survey CSRs during the launch window to understand their expectations and pain points around cancellations. Use responses to draft a formal cancellation policy before broader scale-out.
