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
- Discounted pricing
- Locked-in rates
- Fee waivers
- Promo codes

**Implementation:** Set `founding_member = true` and `joined_cohort = "launch-2026"` on the user record at signup, when `created_at` falls within the launch window. No price logic touches this flag — it's used purely for internal segmentation, CRM exports, and admin dashboards.

The launch window is configurable at the platform level — we can extend it without redefining anyone's pricing because there's no pricing tier attached.

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
