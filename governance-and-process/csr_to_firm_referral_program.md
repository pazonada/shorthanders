# CSR-to-firm referral program

**Owner:** Aud & Rosie
**Last updated:** 2026-05-05
**Status:** Draft — pending Rosie review

---

## Problem we're solving

Dewey Sholes is supply-heavy and demand-light at the start of the pilot. We need attorneys / law firms on the platform for our growing CSR base to actually get jobs.

Every CSR who joins comes in with 5–20 existing law-firm relationships. That's our highest-leverage demand-acquisition channel — far warmer than any outbound marketing. A new CSR has direct, motivated reasons to bring their existing book of business onto the platform: more jobs flow to them, and the firms they already trust get pilot pricing.

Today (2026-05-05), the CSR onboarding flow has a "Invite colleagues" step (screen 7) that asks the new CSR to invite **other CSRs**. There's no equivalent ask for the **law firms / attorneys** the CSR already works with. This program closes that gap.

---

## What changes in onboarding

CSR onboarding screen 7 leads with a **firm-invite UI** instead of the colleague-invite UI:

- **Primary CTA:** Invite the firms you regularly work with (firm name, contact name, email — one row per firm)
- **Secondary section (collapsed):** Invite other reporters (existing colleague-invite flow, preserved as-is)

The colleague invite is demoted because a new CSR's self-interest aligns more strongly with bringing in firms (more jobs for them) than with bringing in other CSRs (more competition for the same jobs). We still want the colleague invites — supply growth matters — but we shouldn't lead with the ask that's mildly *against* the new CSR's self-interest.

---

## Reward structure

Three tiers, scaling with the value the referral actually delivers to the platform:

| Trigger | Reward to referring CSR | Cost to us | Notes |
|---|---|---|---|
| Firm signs up via the CSR's invite link | **Auto-favorite status** with that firm's account — referring CSR is at the top of the firm's reporter list by default | $0 | Pure platform mechanic. Free, and directly aligns CSR incentive with firm activation. |
| Firm completes their **1st job** on Dewey Sholes (with any CSR, not just the referring CSR) | **$25 Starbucks gift card** | $25 cash equivalent | Triggers on real platform value (a real job, real revenue). Small enough to scale to early pilot volume. |
| Firm completes **3+ jobs in 90+ days** | **$50 cash** | $50 cash | Triggers on sustained platform value — the firm has stuck. Bigger reward justified because we now have evidence of recurring revenue. |

**Things deliberately not in the program:**
- Cash bounty for signups (only) — too easy to game with low-quality signups
- Free additional year of CSR listing fees — Aud's call: we'd rather pay a small one-time gift card per converted firm than open up a recurring revenue waiver
- $100+ per-job kickbacks — not affordable at scale, and the gift card + cash structure is meaningful enough at our pricing tier

---

## Incentive on the firm side

A firm getting cold-emailed about a new platform needs a reason to convert. The CSR's name + relationship is the warm hook; we add a price hook on top:

- **Invited by your CSR? Your first transcript order is platform-fee-free.**
- This is in addition to the existing pilot pricing (8% vs 12% standard platform fee).
- One waived fee per converted firm — bounded cost.

---

## Tracking & enforcement

- Each CSR's invite generates a unique referral URL (`#/attorney-signup?ref=CSR-{id}`).
- The firm's account is permanently tagged with the referring CSR's ID at signup.
- Reward triggers fire on:
  - Firm completes 1st job (status = delivered + accepted) → queue $25 gift card payout to referring CSR
  - Firm completes 3rd job within 90 days of signup → queue $50 cash payout to referring CSR
- Auto-favorite status applies the moment the firm signs up — no job completion required.
- Firm signups via the link are flagged in admin so we can spot-check for self-referrals or other gaming.

---

## Anti-gaming guardrails

- **No self-referrals.** A CSR cannot refer their own firm or any account whose primary contact email matches their own.
- **First-job qualifier excludes test/dev jobs.** Only attorney-confirmed deliveries with real payment count.
- **3+ jobs qualifier requires distinct order IDs.** Splitting one job into multiple orders to game the threshold is detectable.
- **Cap on total payouts per CSR per quarter:** `[NEEDS ROSIE]` — propose $500/quarter cap to prevent any single CSR from gaming the program at scale.

---

## Open questions for Rosie

1. **Cap on quarterly payouts per CSR** — propose $500/quarter. Rosie's view?
2. **Should we offer the colleague-invite reward (free first year for invitee) on the firm side too?** Currently both colleague-invite and firm-invite use the pilot pricing baseline. We could double down: invited firms get a *deeper* fee discount (e.g., 5% for first year) — but Aud's lean is to keep it simple and use the platform-fee-free first-job hook instead.
3. **Gift card brand** — Starbucks proposed; open to Visa gift cards or merchant-of-CSR's-choice if we get pushback.
4. **Whether to show the rewards explicitly in the onboarding UI** or keep them in the email confirmation. Aud's lean: show rewards explicitly — transparency is a feature for the marketplace-class product.
