# MVP scope (v1)

**Owner:** Aud
**Last updated:** 2026-05-16
**Status:** Confirmed scope for the initial launch; living doc — update as features promote or deprecate

This is the smallest defensible thing we can launch with confidence. Everything in `governance-and-process/`, `research/`, and the prototype is the *playbook*; this is the *build order*. Anything not in this scope is post-launch.

The driving constraint is reliability. We've built a lot of policy and design surface area; shipping all of it at once invites the kind of integration sprawl that's broken disclosurewatch.com. v1 commits to a small surface area that we can support end-to-end with one part-time engineer + Claude. Everything else is real value but it's v1.1 / v1.2 value.

---

## What v1 ships

### Onboarding

- **CSR signup** with CRB license verification (auto-check against CRB database), basic credentials (method, certs, languages), case-type preferences, court-served jurisdiction, weekly availability, bio. PWA install prompt. Founding-reporter callout.
- **Attorney signup** with CA Bar verification, firm details, practice areas, courts served, billing setup, favorite-reporters search. PWA install prompt. Founding-firm callout.
- **Promo code field** on both signup flows (collapsed "Have a promo code?" link). Codes are managed in a Google Sheet at first — no admin UI. Apply at first qualifying transaction.

### Order flow

- **5-step order** as currently built: type selection, case details + matter reference, reporter preference, turnaround + pricing, review + submit.
- **Matter-reference field** on Step 2 (per Rosie's reconciliation requirement). Carries through to invoice and billing dashboard.
- **Cost-split toggle** with co-payer flow (already designed, defer real build to v1.1 — see below).
- **Pricing**: CSRs set their own rates (no hybrid band). Platform shows a baseline as guidance copy. 12% attorney-side fee on top. $99/yr CSR listing fee.
- **Submit fires the job-board flow** (see Matching below).

### Matching (job-board model)

**This replaces the cascade + match-preview design from earlier prototypes.** The cascade is real future product investment; the job-board is the v1.

- Attorney submits order. Order is **posted to the job board** with all filterable attributes (jurisdiction, case type, certs required, deadline, attendance type).
- **Push + email notification fires to CSRs** whose alert preferences match the job's attributes. CSRs opt in to which alert categories they want.
- All qualified CSRs (passing hard filters) can see the job in their dashboard.
- First CSR to **claim** the job wins. Standard DB-level first-write-wins on `order.claimed_by_csr_id`. Job is removed from other CSRs' boards immediately.
- Attorney is notified: "[Reporter] claimed your order." Card pre-authorization fires.
- **No batch preview. No match-preview screen. No attorney veto window.** Attorney's recourse if the match is wrong is cancel-with-fee per existing cancellation policy.
- **No cascade phases.** All eligible CSRs see the job at once. No "favorites first then widen" — favorites get an additional notification badge but don't have exclusive access.

**Why this design over the cascade:**
- No matching algorithm to build, debug, or tune in v1
- No batch logic, no veto window, no reason taxonomy, no auto-confirm timer
- CSRs control their own job flow (less platform paternalism)
- No "you weren't selected" notifications because invitations are pull, not push
- Solves WC pricing mismatch — CSRs see jobs in their dashboard, decide if their rate fits

### Payments

- **Stripe Connect** with the attorney's card pre-authorized at order time (high-end estimate × 1.3 to cover rate variation + add-ons + page-count overage).
- **Final capture at delivery acceptance** when certified page count is known. Authorization released for any unused portion.
- **CSR payout 2 business days after attorney accepts delivery** (or auto-release per existing billing policy).
- **No Net-30 invoicing.** Pay-per-order only at launch.

### Reporter directory + profile pages

- **Directory** with search, filters (county, specialty, favorites-only), sort (rating, jobs, turnaround). No rate-based sort (don't encourage rate-shopping).
- **Public CSR profile pages** with rating, on-time rate, jobs, courts, availability, bio, rate card (CSR's set rates displayed).
- **Favorites** — attorneys mark CSRs for jurisdiction-matching prioritization in alerts.

### CSR rate-setting UI

- **Settings → Your rates** with a simple input (or slider with no hard cap). CSR types in their per-page rate, half-day, full-day, trial-day, travel rate.
- **Per-field microcopy as guidance:** next to each rate input, a one-liner like "Most CA reporters charge around $X – you set your rate." Sourced from `project_rate_recalibration.md` baselines. No popover, no aggregation, no county logic – just static copy that we update by hand if the baseline shifts. No ±20% / ±50% bands. No matching-priority penalty. Simplified Option A from the pricing discussion.
- **Interactive rate-guidance helper:** deferred to v1.1 (see "What v1 cuts" below).

### Notifications

- **Push (Web Push API, served by the PWA)** for: job alerts matching CSR preferences, job claimed notifications, delivery accepted, payment received, license renewal warnings.
- **Email (Postmark for transactional, Resend for digest/marketing)** for: order confirmations, password resets, payment receipts, transcript-ready notices, weekly digest of relevant new jobs (CSR-side).
- **No SMS provider.** PWA push is the immediacy channel; email is the durable record.

### Admin dashboards

- **User table** with founding-cohort tag, account status, basic ops actions (suspend / verify / refund).
- **Order table** with state, dispute flags, payout status.
- **Verification queue** for CSR license + bar number verifications.
- **Financial summary** (revenue, payouts, pending).
- **No analytics / cohort metrics surface** in v1 — query the DB directly when needed.

### Invoicing

- **Per-order invoice** with: invoice number, date, bill-to (firm + attorney + address), case name, case number, **firm's internal matter reference**, line items, subtotal, platform fee, total, status.
- **Downloadable as PDF** (server-rendered, not just print-stylesheet).
- **Invoice history** on the buyer dashboard.

### Compliance + policy

- All current governance docs apply: cost-splitting, cancellation, late-delivery, license verification, transcript retention, payment failure, fee-waiver/SRL.
- IC agreement at CSR signup naming the rate-setting right.
- TOS + Privacy Policy reviewed by a CA attorney before launch (separate from the engineer code review).

---

## What v1 cuts (deferred to v1.1, v1.2, or later)

### Match flow complexity

- **Cascade matching algorithm** (Phase 1 favorites parallel → Phase 2 batches of 2 → Phase 3 +5 → Phase 4 +10 → Phase 5 all-call). Defer to v1.x once we have real attorney + CSR behavior data showing the job-board model needs sophistication.
- **Match-preview / batch-preview screens** (v1 and v2 designs). Cut.
- **Post-acceptance veto window** with structured reason taxonomy. Cut.
- **3-veto limit** logic. Cut.
- **Auto-confirm timer** with reminder emails at 50% / 90%. Cut. No veto window means no auto-confirm.
- **Browse profiles after 3 vetoes** alternative. Was already deferred; stays deferred.

### Pricing complexity

- **Hybrid ±20% standard / ±50% opt-in expanded rate-setting band.** Cut. Simplified to "CSR sets their rate, platform shows a baseline as guidance." No matching-priority penalty for "expanded band" rates because there is no band.
- **Interactive rate-guidance helper** ("Need help setting rates?" popover with median + 25–75th percentile range of comparable reporters in the same region, with a case-type filter and cascade scope). **Deferred to v1.1.** The full spec stays in `governance-and-process/rate_guidance_helper_policy.md`. Reason for cut: at v1 launch we have zero reporter data, and even after the Bay Area pilot (50 bookings, 20 firms in 90 days) we'd likely have ~50–100 CSRs total – mostly concentrated in Tier A counties – so the cascade would fall back to "statewide" for most signups. The build cost (daily snapshot job, per-county/rate-type/case-type aggregations, county-adjacency table, percentile computation, snapshot storage) is real (1–2 weeks of engineering) for a feature whose value doesn't kick in until N is meaningful in each county. v1 ships static per-field microcopy instead; the helper promotes when there are enough reporters in enough counties to make the regional data honest. **Prototype includes a v1.1 preview** of the helper for stakeholder demos – clearly labeled as such.
- **WC-specific pricing model** (O+2, lower per-diem, higher page rate, big minimum, in-person/extra-device add-ons). Cut. Don't recruit WC supply at launch; or if we do, accept that some WC CSRs will take a pay cut on DS vs. their direct work. Add a WC pricing model in v2 once we know how much WC demand exists.
- **Travel-time billing** with CSR-defined free radius + per-hour rate. Cut. Defer; CSRs negotiate travel ad hoc with attorneys for v1, or absorb into their per-diem.

### Cost-splitting feature

- **Multi-party cost-splitting** with co-payer secure payment links, share allocation, "waiting for co-payers" state. Cut from v1 actually-built; the design + policy stays in `cost_splitting_policy.md`. Cost-split orders in v1 are handled manually by admin (rare enough at small scale that we can do it by hand).

### Founding cohort + promo program

- **Founding-cohort tagging** stays as a DB flag set at signup. No admin UI for managing cohorts in v1.
- **Promo code program**: codes generated in a Google Sheet by Aud/Rosie/marketing-strategist agent; entered at signup via the "Have a promo code?" field; manually validated and applied to the user record by admin in v1. **No admin UI for code generation, validation, redemption tracking** in v1. Build that in v1.1.

### Discovery + featured-CSR surface

- **Featured CSRs** / promoted listings on the directory. Already deferred to post-launch.
- **CSR specialty taxonomy + self-declared with proof flow.** Use free-text + the small standardized list for v1; defer the proof-upload + verification flow.

### Multi-CSR firm accounts

- **CSR firm tier** ($79/reporter/year, 3-10 reporters per account). Already deferred to v2. Collect interest signal at signup ("I'm part of a 2+ reporter firm — notify me when firm accounts are available").

### Mobile / native app

- **Native iOS / Android.** Cut. PWA + Web Push for v1, per `project_phone_is_comms_only.md` memory.

### Other deferrals

- **Insurance carrier channel** (Phase 3 marketing). Already documented as Month 6+; not v1 work.
- **Legal assistant incentive program** (points + rewards catalog). Already documented as Phase 2 marketing build, not v1 product.
- **Featured-CSR / paid promotion** placements. Post-launch.
- **Net-30 invoicing.** Documented in `billing_and_payment_policy.md` as future feature; trigger condition is $5k/mo platform fee revenue for 3+ months.
- **Deposition support** (already out of scope per `scope_public_court_proceedings_only.md`).

---

## Build estimate

This is an honest guess; ranges reflect uncertainty.

| Component | Solo-dev hours | Calendar weeks (50% time) |
|---|---|---|
| Real-build scaffolding (Supabase schema, Vercel deploy, auth) | 40–60 | 2–3 |
| CSR signup + license verification | 30–50 | 1.5–2.5 |
| Attorney signup + bar verification | 30–50 | 1.5–2.5 |
| Order flow (5 steps + matter ref) | 50–70 | 2.5–3.5 |
| Job-board matching | 30–40 | 1.5–2 |
| CSR dashboard (open jobs + active jobs + earnings) | 40–60 | 2–3 |
| Attorney dashboard (cases + billing + invoices) | 40–60 | 2–3 |
| Stripe Connect (auth + capture + payouts + webhooks + retries) | 60–100 | 3–5 |
| Notifications (Web Push + Postmark + Resend) | 30–50 | 1.5–2.5 |
| Transcript upload + certification + delivery | 40–60 | 2–3 |
| Admin dashboard (users, orders, verifications, financials) | 40–60 | 2–3 |
| Pre-launch code review (engineer-friend) | 1 week of his time | 1 week (parallel) |
| Bug fixes, polish, deployment, monitoring setup | 40–60 | 2–3 |
| **Total** | **470–720** | **24–35 weeks part-time** |

So: **3–6 months part-time** to v1 launch. **Could be 6–10 weeks full-time** if you went all-in.

This is dramatically less than the 9-12 months the all-features prototype implied. The cuts above are the difference.

---

## What stays the same as the prototype

The prototype's value isn't wasted by these cuts. What persists:

- All governance + policy docs (cost-split, cancellation, retention, billing, IC, etc.)
- All rate research and competitive-analysis findings
- The matching policy design (cascade, fairness slots, soft preferences) — becomes the spec for v2 matching when we promote from job-board to algorithmic matching
- The match-preview / veto-window designs — become candidate designs to A/B-test post-launch
- The hybrid rate band design — becomes the candidate v2 pricing model
- The matter-reference invoicing approach (built and shipping in v1)
- The competitive-analysis system and tagline alternatives (marketing-strategist agent owns)
- The CSR survey + attorney survey designs (research running in parallel to build)

The prototype is the playbook for years 1–2. v1 is the slice we ship first to start learning from real users.

---

## Open questions before locking v1 scope

1. **Promo code redemption flow:** does the field at signup actually do anything in v1 if there's no admin UI? Two options: (a) "Have a promo code?" field is purely captured-to-DB for manual admin review and application; (b) field doesn't exist in v1 and we handle promo codes via direct email ("show this email to founders@deweysholes.com after signup for a one-time credit"). (b) is simpler; (a) is friendlier UX. Aud to decide.
2. **First-eligible-to-claim race conditions:** what if two CSRs hit "Claim" at the same millisecond? DB-level first-write-wins is the answer, but UX needs to handle the loser gracefully ("Another reporter claimed this job 2 seconds ago — here are similar open jobs"). Standard pattern; flagged here so it's not forgotten.
3. **CSR dashboard "open jobs" filter logic:** show all qualified jobs in their jurisdictions, or filter to a subset based on availability + recent activity? For v1, show all qualified — let CSRs self-filter visually. Defer smart filtering to v1.1.
4. **Quality control on the claim:** any qualified CSR can claim, including newly verified ones with no rating yet. Pro: cold-start path. Con: attorneys might get unrated CSRs and feel uneasy. Mitigation: surface the rating clearly in the claim notification; allow attorney cancel-with-fee within X hours of claim if they're not comfortable. Discuss.
5. **Pricing-fee split (12% attorney-only vs. 7%/5% split vs. 10% attorney-only):** see analysis in chat 2026-05-16; default to 12% attorney-only for v1; revisit only if attorney conversion is below 25% on outreach.

---

## Related docs

- `governance-and-process/engineering_support_plan.md` – who we hire, when, what frequency
- `governance-and-process/billing_and_payment_policy.md` – payment flow + matter-ref invoicing
- `governance-and-process/rating_and_matching_policy.md` – cascade design for v2 + post-launch
- `governance-and-process/founding_member_program.md` – tagging + email-only promo codes
- `research/marketing_plan_phase1_csr_supply.md` / `phase2_law_firms.md` / `phase3_insurance_carriers.md` – marketing build that pairs with v1
- `research/csr_survey_questions.md` / `attorney_survey_questions.md` – validation running in parallel
