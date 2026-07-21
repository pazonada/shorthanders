# Dewey Sholes

A court transcript marketplace for California attorneys and court reporters, operated by Studio Crux, LLC.

This repo holds the landing page, the interactive prototype, and the governance / research documents that describe how the platform works.

## Two products live here – read this first

- **The current product is the MVP, in `mvp/`** – a directory of California court reporters
  plus messaging and invoicing. Live at https://dsmvp.vercel.app. Start at
  `mvp/docs/PROJECT_OVERVIEW.md`.
- **v1, the original full marketplace** (12% attorney fee, matching, escrow, rate bands), is
  archived but still deployed as a prototype at https://dewey-sholes.vercel.app, served from
  the repo root. See **`V1_ARCHIVE.md`** for what belongs to it and how to retrieve the
  snapshot.

Everything below this line describes v1 unless it says otherwise.

## What's where

- **`index.html`** – the **v1** prototype (archived, still deployed). Single-file
  React-via-Babel. Hosts every route v1 exposes: marketing pages, attorney + reporter
  onboarding, order flow, dashboards, admin, reporter directory, pricing page, FAQ, terms of
  service. The MVP is a separate build at `mvp/index.html` – see `V1_ARCHIVE.md`.
- **`governance-and-process/`** – the authoritative policy docs. Pricing model, payment flow, cost-splitting, ratings + matching algorithm, IC classification, transcript custody, etc. These are the source of truth. Site copy should always agree with these.
- **`research/`** – research notes, survey drafts, rate-card analysis, agency-invoice teardowns, target lists, user-testing guides, and the master marketing strategy.
- **`marketing/`** – outbound marketing collateral: video spec sheet, competitive-analysis system, swag strategy, phase-1 (CSR) / phase-2 (firm) / phase-3 (insurance carrier) plans, and the founding-member program description.
- **`mockups/`** – design experiments that haven't been merged into the live prototype yet.
- **`deploy/`** – a stale March 2026 v1 build. Superseded: the live v1 site serves the root `index.html`, not this.
- **`.claude/agents/`** – custom Claude Code agents for this repo, including the marketing-strategist agent that owns competitive-analysis.

## v1 model – archived (state as of 2026-05-14)

The model below is **v1's**, kept for reference. The MVP in `mvp/` supersedes it: no 12% attorney fee, no matching, no rate bands. See `mvp/docs/PROJECT_OVERVIEW.md` for what's current.

The pricing model is **flat 12% buyer fee + $99/yr individual CSR listing fee, from day one for everyone.** The prior "pilot 8% then standard 12%" tier was retired. See `governance-and-process/founding_member_program.md`.

The early-adopter pull is preserved through **non-pricing perks** for the founding cohort (the first 6 months of public launch): direct founder access, first dibs on new features, real influence on the roadmap.

CSRs **set their own rates** via a slider in their profile settings. The standard band is ±20% of platform baseline (full auto-match priority); an opt-in expanded ±50% band is available with the disclosed trade-off that out-of-band rates get fewer auto-match offers. Out-of-band rates beyond ±50% are handled by direct email negotiation. See `governance-and-process/rating_and_matching_policy.md – Hybrid rate-setting bands`.

After an attorney submits an order, they see a **match-preview screen** showing the matched CSR and that CSR's actual rates before the order is sent to the CSR for acceptance. The attorney can confirm or request a rematch (up to three rematches before contacting support). Rejected CSRs never see the order – invites only go out after confirm.

Every invoice carries the firm's case + matter reference so AP teams can reconcile against the right client matter at billing time. See `governance-and-process/billing_and_payment_policy.md`.

## How to make changes

- **MVP site copy and UX** (the current product): edit the parts in `mvp/src/`, then run `bash mvp/build.sh`. Never hand-edit `mvp/index.html`. Before making it public, run `python3 mvp/scripts/preflight.py` and work `mvp/docs/launch_checklist.md`.
- **v1 prototype** (archived, still deployed at dewey-sholes.vercel.app): edit the root `index.html`. `mvp/build.sh` deliberately does not write here.
- **Policy**: edit the relevant doc in `governance-and-process/`. If a change in policy implies a change in site copy, update both in the same commit.
- **Research and strategy**: edit the relevant doc in `research/` or `marketing/`.
- **Style preference**: use en-dashes (the slightly shorter `–` character), never the longer em-dash. The repo has been swept consistently.

## Deploy workflow

Worktree commits must be fast-forwarded into `main` to reach the live preview. Push with `git push origin HEAD:main` from any worktree.
