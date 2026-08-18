# Build-phase plan – wiring the real backend, in order

Fires **only on the "Rosie clears the name" branch** (else rebrand first – see the rename notes).
This sequences the work; the **what-it-does detail lives in `integration_checklist.md`**, the
cost/spend rules in `accounts_and_infrastructure.md`, and the human-engineer split in the
engineering-support plan. Owner tags: **YOU** (decision) · **CLAUDE** (I scaffold/wire) · **ENGINEER**
(a human dev should own/review – auth, money, webhooks) · **LAWYER**.

**Golden rule:** everything below can be built and tested in **Stripe/Resend TEST mode** early;
**real money does not turn on until Milestone 8 (legal gates) passes.**

## M0 – Foundations (do first; unblocks everything) — YOU + CLAUDE
- [ ] **Lock the payments entity BEFORE any Stripe/Connect wiring** (Studio Crux vs a new Shorthanders entity –
      see `project_entity_dba_and_infra`). Cheapest to decide now, zero migration.
- [ ] Set a **Vercel spend limit**; confirm Standard build machine; **re-enable `api/` + `package.json`
      in `.vercelignore`** so functions deploy again. Env/secrets in Vercel (Stripe, Supabase, Resend).
- [ ] Create Shorthanders' **own Supabase project** (separable), its own Stripe account (under the decided
      entity), and Resend **sending-domain auth** (SPF/DKIM/DMARC on a Shorthanders domain) – all in test mode.

## M1 – Auth + accounts (Supabase) — ENGINEER + CLAUDE
- [ ] Real email/password sign-in; **derive role (reporter/firm) from the account**, not a hardcoded
      default. Remove the prototype persona shortcuts.
- [ ] Reporter signup tied to the claimed CRB record; firm signup persists its profile.
- [ ] Replace `store.role`/`enterAsReporter`/`enterAsFirm` with real sessions. Password reset + verify.

## M2 – Database + persistence (Supabase) — ENGINEER + CLAUDE  *(needs M1)*
- [ ] Import CRB roster → `reporters`; claimed data → `reporter_profiles`.
- [ ] **Persist the claim form** (bio, proceedings, services, `rates`+`publishRates`, `workMode`,
      `coverage`, `baseState`, edited `city`/`county`, notary, photo) – the prototype `finish()` drops these.
- [ ] Make the dashboard profile editor a **real editable form** (reuse claim fields).
- [ ] Persist saved reporters, unlocked/connected, invited firms, messages, invoices (incl. the
      **metered-vs-flat line shape** + `payLink`/`paidAt`/`method`), plan state.

## M3 – Messaging + email (Resend) — ENGINEER + CLAUDE  *(needs M1–M2)*
- [ ] Persist async message threads (Supabase Realtime).
- [ ] Transactional email: reporter→firm invites, invoice/payment-link, welcome/verify/reset, receipts.
- [ ] Notifications (new message, invoice paid, invite accepted): **web push + email fallback**, no SMS.
      **DB-triggered sends, delivery webhooks, retries** (this is where Aud's past deliverability pain was).

## M4 – Payments (Stripe) — ENGINEER-led  *(needs M1–M2; TEST mode until M8)*
- [ ] **Connect onboarding gated at FIRST INVOICE**, not at claim.
- [ ] Invoicing: real card+ACH payment links; **pass `connectedAccountId` + `application_fee_amount`
      (2% Pro / 5% Free by plan)** – the current send call omits these.
- [ ] Firm-side pay = real Stripe hosted page; invoice status from **webhooks**
      (`account.updated`, `payment_intent`/`invoice`, subscription events).
- [ ] Subscriptions: firm **$49/user or $539/yr**, reporter Pro **$29/mo**; drive plan state. 1099-K.

## M5 – Search + gates, server-side — ENGINEER + CLAUDE  *(needs M2)*
- [ ] Server-side search/filter + pagination (keep the current keyword reach + add stemming).
- [ ] **Enforce the firm gate server-side** (never ship claimed data to a free firm).
- [ ] **Enforce rate visibility server-side** (never send `rates` to an unauthorized viewer).

## M6 – Analytics + attribution (Supabase + PostHog) — CLAUDE  *(parallel once events exist)*
- [ ] Events table; log searches/views/invites/saves/messages/invoices/upgrades.
- [ ] **Email opens/clicks + signup-source attribution** (reporter-invited vs direct vs campaign).
- [ ] Wire PostHog (free tier). Recommendations = later, validate first. **NOT HubSpot.**

## M7 – Data ops — CLAUDE + YOU
- [ ] Quarterly CRB re-sync (add new, refresh unclaimed, freeze expired, **honor `suppressed_csrs.csv`**,
      never overwrite claimed). Move the removal suppression from the local CSV to a DB flag.
- [ ] Preflight gate: fail deploy if any raw email / `data`/`docs`/`marketing` file would ship.

## M8 – Legal gates BEFORE real money — LAWYER  *(gates M4 going live)*
- [ ] Deposition-neutrality opinion (a court-reporting-industry attorney, not Rosie).
- [ ] Terms-of-service + privacy review (also covers CCPA + the file/link-liability clauses).

## M9 – Pre-launch verification / UAT — YOU + CLAUDE  *(launch_prep Phase 6)*
- [ ] End-to-end in Stripe + Resend TEST mode: payments succeed **and the webhook fires and is
      handled**; every email actually lands (not spam); messaging syncs across two browsers; real-device pass.

---
**Rough dependency order:** M0 → M1 → (M2, M3) → M4/M5 → M6/M7 → **M8 gates real money** → M9 → launch.
Most of M1/M4 is where a human ENGINEER should own or review (auth, money, webhooks); Claude can
scaffold everything and own M6/M7 and the frontend wiring.

---

# Engineer scope brief (shareable – forward this section)

*What a solo, non-technical founder needs a human engineer for on this build. The AI assistant
(Claude) writes and wires almost all of the code and the whole frontend. A human is needed for the
few areas where a bug is **invisible and expensive** — it fails silently (the screen says "success"
while money went nowhere or data is exposed via an API the UI never shows), so it can't be caught by
looking at the site. This is a **bounded, hours-not-months** engagement: design the risky pieces up
front, then review + edge-test before real money turns on.*

**Stack:** React (single-file prototype today) · **Supabase** (auth + Postgres + Realtime) ·
**Stripe Connect** (marketplace payouts + application fees + subscriptions) · **Resend** (email) ·
Vercel serverless functions. Two-sided marketplace: **court reporters** (get paid) and **law firms**
(pay + discover). Ideal reviewer has shipped a **two-sided marketplace on Supabase + Stripe Connect**
— that exact combo moves ~5× faster than a generalist and knows the footguns.

### The 3 review areas (with where to look + rough senior-hours)

1. **Auth + data access — risk: a data leak.** ~**3–6 h**.
   - Design/review **Supabase Row-Level Security (RLS)** policies — the client queries the DB
     directly, so wrong RLS = anyone can pull reporter PII / other firms' invoices. (This project
     already had one PII leak; keep it from recurring.)
   - Confirm the **paywall gates are enforced server-side, not just in the UI**: the "free firms
     can't see claimed profiles" gate (`firmLocked()` in `src/_app_05_directory.jsx`) and "rates
     only to Pro firms" (`canSeeRate` same file). UI-only = bypassable = the whole business model
     leaks. Auth/session/role flows: `src/_app_11_router.jsx` (StoreProvider), `_app_03_shell.jsx`
     (LoginModal), `_app_06_claim.jsx` (signup).
2. **Payments — Stripe Connect — risk: money misrouted or your fee lost.** ~**6–12 h** (the meatiest).
   - Review the Connect integration: each payment routes to the right reporter's connected account
     and takes the platform **application fee (2% Pro / 5% Free)** — the current send call
     (`src/_app_08_invoices.jsx` → `api/pay/create-payment-link`) omits `connectedAccountId` +
     `application_fee_amount`, so as-wired the money wouldn't route or the fee wouldn't be taken.
     Also: **idempotency** (no double-charge on retries), failures/disputes, Connect onboarding
     gated at first invoice (`api/connect/create-account`), and the test→live cutover.
3. **Webhooks — risk: silent failure + a security hole.** ~**2–4 h**.
   - Verify webhook handlers **check the Stripe signature** (without it, anyone can POST a fake
     "payment succeeded" and mark invoices paid), are **idempotent**, and actually update the DB
     with retries. Same discipline for Resend delivery/bounce webhooks (so "the email didn't send"
     is visible, not silent).
   - **Plus ~3–5 h** end-to-end edge-testing in Stripe + Resend **TEST mode** before go-live (M9).

**Rough total:** ~**15–25 hours of senior time**, spread across the build — not a full-time hire.

### Engagement shapes (cheapest first)
- **Review-only** (cheapest): Claude builds it; the human **reviews** the flows above + the RLS. A
  review costs far less than a build. Best default.
- **Setup + review:** the human sets up RLS + Stripe Connect + webhooks, reviews the rest. Fixed-fee
  or hourly.
- **On-call buddy** (separate, small retainer/favor): someone reachable when production breaks — the
  founder is solo and non-technical. See `governance-and-process/engineering_support_plan.md` for the
  fuller "where a human is needed" picture (Year-1 budget ballpark $21–36k).

### The ask, in one line
*"Claude builds it all in test mode. I need a senior engineer with Supabase + Stripe Connect
marketplace experience to (a) design/review the RLS + payment architecture up front and (b) review +
edge-test the auth, payments, and webhook code before real money turns on — roughly 15–25 hours.
Who should I hire, and does anyone in your network fit?"*
