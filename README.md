# Dewey Sholes

A court transcript marketplace for California attorneys and court reporters, operated by Studio Crux, LLC.

This repo holds the landing page, the interactive prototype, and the governance / research documents that describe how the platform works.

## What's where

- **`index.html`** – a build artifact, not a source file. It is a copy of `mvp/index.html`, mirrored to the root by `mvp/build.sh` so the root serves the same site as `mvp/`. Don't edit it directly – edit `mvp/src/` and run `bash mvp/build.sh`. The previous v1 marketplace prototype that lived here (attorney onboarding, order flow, 12% fee, admin) was replaced on 2026-07-21 and remains in git history and `deploy-archive-2026-05-12/`.
- **`governance-and-process/`** – the authoritative policy docs. Pricing model, payment flow, cost-splitting, ratings + matching algorithm, IC classification, transcript custody, etc. These are the source of truth. Site copy should always agree with these.
- **`research/`** – research notes, survey drafts, rate-card analysis, agency-invoice teardowns, target lists, user-testing guides, and the master marketing strategy.
- **`marketing/`** – outbound marketing collateral: video spec sheet, competitive-analysis system, swag strategy, phase-1 (CSR) / phase-2 (firm) / phase-3 (insurance carrier) plans, and the founding-member program description.
- **`mockups/`** – design experiments that haven't been merged into the live prototype yet.
- **`deploy/`** – built artifacts the live site serves (don't edit directly).
- **`.claude/agents/`** – custom Claude Code agents for this repo, including the marketing-strategist agent that owns competitive-analysis.

## Current state (2026-05-14)

The pricing model is **flat 12% buyer fee + $99/yr individual CSR listing fee, from day one for everyone.** The prior "pilot 8% then standard 12%" tier was retired. See `governance-and-process/founding_member_program.md`.

The early-adopter pull is preserved through **non-pricing perks** for the founding cohort (the first 6 months of public launch): direct founder access, first dibs on new features, real influence on the roadmap.

CSRs **set their own rates** via a slider in their profile settings. The standard band is ±20% of platform baseline (full auto-match priority); an opt-in expanded ±50% band is available with the disclosed trade-off that out-of-band rates get fewer auto-match offers. Out-of-band rates beyond ±50% are handled by direct email negotiation. See `governance-and-process/rating_and_matching_policy.md – Hybrid rate-setting bands`.

After an attorney submits an order, they see a **match-preview screen** showing the matched CSR and that CSR's actual rates before the order is sent to the CSR for acceptance. The attorney can confirm or request a rematch (up to three rematches before contacting support). Rejected CSRs never see the order – invites only go out after confirm.

Every invoice carries the firm's case + matter reference so AP teams can reconcile against the right client matter at billing time. See `governance-and-process/billing_and_payment_policy.md`.

## How to make changes

- **Site copy and prototype UX**: edit the parts in `mvp/src/`, then run `bash mvp/build.sh` – it rebuilds `mvp/index.html` and mirrors it to the repo root. Never edit either `index.html` by hand. The live preview serves the repo's main branch.
- **Policy**: edit the relevant doc in `governance-and-process/`. If a change in policy implies a change in site copy, update both in the same commit.
- **Research and strategy**: edit the relevant doc in `research/` or `marketing/`.
- **Style preference**: use en-dashes (the slightly shorter `–` character), never the longer em-dash. The repo has been swept consistently.

## Deploy workflow

Worktree commits must be fast-forwarded into `main` to reach the live preview. Push with `git push origin HEAD:main` from any worktree.
