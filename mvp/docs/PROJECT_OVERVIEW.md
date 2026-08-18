# Shorthanders – project overview (start here)

The single "current state" doc. Read this first, then follow the pointers. Last updated 2026-07-20.

## What it is

A **reduced-scope MVP**: a searchable **directory of every licensed California court reporter**
(built from public CRB license data, ~5,705 active CSRs) + **direct firm↔reporter messaging** +
**reporter invoicing / getting paid**. That's it – no job matching, scheduling, escrow, rate
bands, or cascade (all of which the abandoned "v1" full marketplace had).

- **Live:** https://shorthanders.vercel.app (Vercel project root = `mvp/`).
- **Build:** a single-file React-via-Babel app. `mvp/build.sh` concatenates `mvp/src/_*.jsx` +
  `_head.html` / `_style_block.html` / `_body_open.html` / `_tail.html` into `mvp/index.html`.
  Edit the `src/` parts, run `bash build.sh`, commit + push (auto-deploys). Hash router (`#/route`).
- **State:** all in-browser (React `StoreProvider` in `_app_11_router.jsx`); seed data in
  `_app_02_data.jsx`. There is no real backend yet – see `integration_checklist.md`.

## Who's behind it

- **Aud (Audubon Dougherty)** – **sole founder/owner**, Studio Crux, LLC (a NJ LLC). Built the product.
- **Rosie** – **advisor** (a family-law-attorney friend who named the problem; a demand-side firm
  buyer, not a court-reporting-craft expert). **Not a co-founder.** Her full name and firm stay
  **off all public materials**; the About page describes her generically. Public copy is
  women-owned (Aud owns it).

## The money model – DECIDED (shape); prices are still working numbers

- **Firms:** free to browse basic public info and to **fully view / message / pay reporters who
  invited or are connected to them**. A **monthly subscription gates *discovery*** – searching the
  directory for *new* reporters + full claimed profiles of everyone. Free firm signup. **Firms
  never pay a Shorthanders fee** (avoids the surprise-fee dispute).
- **Reporters:** free to claim, list, and message. To *get paid* through the site, a **two-tier
  per-payment fee** taken from the reporter's side (invisible to the firm):
  - **Base fee (pay-per-invoice)** – ~5%, no monthly cost. For occasional reporters.
  - **Pro** – flat monthly **plus a reduced ~2% fee**. Pro **reduces** the fee, does **not waive
    it** (this *reversed* an earlier "Pro waives the fee" call). So the fee scales with total
    volume and can be the **biggest revenue line (~70% in the model)**. Upgrade point =
    Pro price ÷ (base − Pro fee) ≈ **$967/mo of billing** at $29 / 5% / 2%.
- **Stripe's processing fee** (~2.9% card / ~0.8% ACH) is the **reporter's** cost, passed through,
  never DS's. DS's real cost ≈ **$2/mo per active Stripe Connect account**.
- **Prices are UNSET / working numbers** (never invent – see rules). Aud floated $29 (firm sub &
  reporter Pro) and 5%/2% fees; the site now states **"Shorthanders takes 2% (Pro) or 5% (Free)."**
- Detail: `open_strategic_decisions.md` §1 · `../marketing/pro_pricing_worksheet.md` ·
  `revenue_model.xlsx` (3 tabs: Revenue model, CSR conversion, Net target).

## Reporter taxonomy – two separate axes

- **Proceedings covered** (the setting): Depositions · Trials · Hearings · Arbitrations · Workers' comp.
- **Services offered** (the capability): Realtime · Rough draft / ASCII · Court-audio transcription · Expedited.
- Realtime is a *service/skill*, not a proceeding. Detail: `csr_profile_field_taxonomy.md`.

## Growth strategy

**Wide supply, local selling.** The directory + reporter claiming run **statewide** (public data);
only the **manual firm-selling** concentrates (Bay Area → LA). **Reporters bring their own firms**
via the in-app invite flow – that's the statewide demand engine. **Transcription** is
location-independent (go wide anywhere); **live work** needs reporters + firms in the same metro.
Expand by **geography (Texas first** – it has a licensing registry; NY/FL don't) only after one
metro provably pays; **don't rebuild v1**. ~$0 budget, 2 people; handwritten postcards to boutique
firms + a founding-firm discount code; skip consumer legal directories (wrong funnel). A firm
value prop Rosie flagged: firms are annoyed by **check-only, tech-averse CSRs**, so electronic
payment pulls reporters onto the rails. Detail: `../marketing/growth_strategy.md` (one-pager) +
`../marketing/README.md` + `../marketing/firm_outreach_playbook.md`.

## What's built in the prototype (current state)

- **Marketing:** landing (hero, two-sided value cards, "how it works" with pen-and-ink step
  illustrations, the agency-vs-DS **money-comparison** bars, directory preview, **dark footer**),
  For firms, For reporters (each with an inline "What it costs" pricing section – there is no
  standalone Pricing page), About, Terms, Privacy, Contact.
- **Directory:** **sidebar-filter** search (county / **work mode** / experience / language / method
  selects + Proceedings/Services checkboxes + rush/claimed toggles), cards + list rows, **logo avatars**
  (brand-blue = claimed, grey = unclaimed; photo override supported), and the **firm gate** – a
  free firm sees a **blurred "Upgrade to Pro" overlay** on claimed profiles that didn't invite
  them (a `firmPlan` free/pro toggle demos the gate lifting; logic in `firmLocked()` in
  `_app_05_directory.jsx`).
- **Reporter side:** claim flow (`#/claim`: find record → confirm → account → Stripe verify →
  build profile), dashboard (overview, profile, payments incl. a pay-per-invoice/Pro plan card,
  invoices, messages), invoicing (templates → builder → detail with payment link + invoice-as-
  invite), and the **"Invite a firm"** flow (auto-favorites the reporter for the firm).
- **Firm side:** **signup** (`#/firm-signup`, carries the entered firm name into the dashboard),
  dashboard (an **Overview** tab with paid/outstanding/estimated-savings StatCards mirroring the
  reporter's, saved reporters, messages, invoices), and the invite-landing (`#/invite/<id>` → create
  free account + auto-save the inviter).
- **Settings** (`/settings`, header gear, both roles): account-level page holding **Plan & billing**
  (free↔Pro switch – moved here out of the dashboards), **Notifications** toggles, **Payouts** (reporter
  Stripe Connect) / **Payment methods** (firm), and **Account & security** (stubs). No more Subscription
  tab; the reporter Payments tab is now just stats + recent payments.
- **Auth:** a login modal (email/pw + reporter/firm signup links + prototype persona shortcuts).
  **All auth/data is faked** – nothing persists past refresh.
- **Brand:** the **SHORTHANDERS** wordmark with the spiral icon set inside the first "O"
  (dark-navy letters + blue "O" in the nav; white-letter version on the dark footer); brand blue
  `#4361EE`; the old ochre/brown was replaced site-wide with **olive `#7A7F3F`**.

## Hard rules / constraints (do NOT violate)

- **Never invent data** – rates, prices, stats, fee schedules, facts. Blank or user-entered only.
  Prices on the site/docs are Aud's working numbers, always labeled as such.
- **En-dashes (–) only** in all site copy and docs – never em-dashes (—). (Check `grep -c "—" index.html` = 0.)
- **Plain language** – no startup jargon (moat, beachhead, liquidity, north-star, flywheel, etc.).
- **Commit + push automatically** after changes (don't ask).
- The preview serves the main repo path; worktree commits must be fast-forwarded into `main`.
- **JSX/Babel quirks:** keep JSX comments single-line ASCII; use string concat, not template
  literals, inside JSX ternaries.

## What's faked / next steps

`integration_checklist.md` – everything the prototype fakes and what to wire: Supabase (auth + DB),
Stripe (Connect onboarding, invoicing card/ACH, the 2%/5% application fee, subscriptions,
webhooks, 1099-K), Resend/messaging (invite + invoice emails, the CSR outreach campaign, real-time
in-app messaging, notifications = web push + email, no SMS), server-side search, and
server-enforced firm gate. **Legal gates before real money:** the deposition-neutrality check and
a terms-of-service review (`legal_question_deposition_neutrality.md`, `open_strategic_decisions.md`).

## Doc index

**In `mvp/docs/`:**
- `PROJECT_OVERVIEW.md` – this file.
- `open_strategic_decisions.md` – the living decisions log (monetization, firm gate, depo scope).
- `integration_checklist.md` – prototype fakes → real wiring.
- `accounts_and_infrastructure.md` – **every account/service (entity, DBA, domain, Resend,
  GitHub, Vercel, Supabase, Stripe, trademark), its state, and what to do with it.** **NEW 2026-08-04.**
- `build_phase_plan.md` – **the sequenced backend build (M0–M9, dependency order, owner tags)** for
  the "Rosie clears the name → build" branch; complements `integration_checklist.md`. **NEW 2026-08-04.**
- `launch_prep.md` – **the launch to-do list** (plain language, phased, marked YOU / CLAUDE /
  ENGINEER / LAWYER). Pairs with `scripts/preflight.py`, which checks the built page's
  metadata, share tags, and leftovers before any public deploy. **NEW 2026-07-21.**
- `pricing_strategy.md` – older pricing analysis (partly superseded by the two-tier fee decision;
  see `pro_pricing_worksheet.md` for current).
- `csr_profile_field_taxonomy.md` – the two-axis reporter taxonomy.
- `reviews_and_ratings.md` – why there are no testimonials/reviews/ratings at launch, and the
  plan to capture verified ratings after payment for later. **NEW 2026-07-21.**
- `directory_filters.md` – directory sidebar decisions (experience/language, method + fabricated
  specialty filter removed) plus open work: the **rates** feature (never invent the numbers).
  **NEW 2026-07-21.**
- `specialty_taxonomy_research.md` – cited research (agencies + CA Bar + Martindale) proposing a
  grounded ~18-item CSR specialty list to replace the fabricated one; still needs CSR user
  testing. **NEW 2026-07-21.**
- `activity_signal_design.md` – why reporter activity is computed from sign-ins and shown
  only when positive, instead of a self-set availability status or a Care.com-style
  "last active" timestamp. **NEW 2026-07-21.**
- `csr_email_outreach.md` – the one-time CSR claim-invite email + send plan.
- `legal_question_deposition_neutrality.md` – brief for a reporting-industry attorney.
- `palette.md` – the concrete color palette: **indigo-only accent** (`#4361EE`), slate neutrals,
  three semantic colors used sparingly, acid yellow reserved for micro-accents/data-viz, and
  **quiet `.ds-note` notices** instead of tinted banners by default. **NEW 2026-07-24.**
- `roadmap.md` – deferred product ideas.
- `state_expansion_checklist.md` – every California-hardcoded string, data file, and structural
  assumption, so a future state expansion is a checklist not a hunt. **NEW 2026-07-21.**
- `roster_refresh_policy.md` – quarterly CRB re-sync: add new licensees, refresh unclaimed
  contact info, freeze (not delete) expired/retired, never overwrite claimed profiles. **NEW 2026-07-21.**
- `polish_punchlist.md` – UI polish backlog.
- `revenue_model.xlsx` (+ `build_revenue_model.py`) – adjustable revenue/funnel/net-target model.

**In `mvp/marketing/`:**
- `README.md` – marketing index + $0 channel stack.
- `growth_strategy.md` – the one-page growth direction.
- `firm_outreach_playbook.md` – firm acquisition (targets, postcards, founding-firm code).
- `pro_pricing_worksheet.md` – reporter pricing + the crossover / funnel math.

**Also:** `../../research/` holds the v1 research + real agency-invoice evidence
(`agency_invoice_evidence.md` – the $2,311 / $908 invoice behind the money-comparison visual).

## AI memory

Decisions are also recorded in the assistant's memory (auto-loaded each session) under
`.claude/projects/.../memory/` with an index in `MEMORY.md`. This repo doc is the human-readable
canonical record; the two should agree.
