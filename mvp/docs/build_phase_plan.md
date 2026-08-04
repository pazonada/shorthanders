# Build-phase plan – wiring the real backend, in order

Fires **only on the "Rosie clears the name" branch** (else rebrand first – see the rename notes).
This sequences the work; the **what-it-does detail lives in `integration_checklist.md`**, the
cost/spend rules in `accounts_and_infrastructure.md`, and the human-engineer split in the
engineering-support plan. Owner tags: **YOU** (decision) · **CLAUDE** (I scaffold/wire) · **ENGINEER**
(a human dev should own/review – auth, money, webhooks) · **LAWYER**.

**Golden rule:** everything below can be built and tested in **Stripe/Resend TEST mode** early;
**real money does not turn on until Milestone 8 (legal gates) passes.**

## M0 – Foundations (do first; unblocks everything) — YOU + CLAUDE
- [ ] **Lock the payments entity BEFORE any Stripe/Connect wiring** (Studio Crux vs a new DS entity –
      see `project_entity_dba_and_infra`). Cheapest to decide now, zero migration.
- [ ] Set a **Vercel spend limit**; confirm Standard build machine; **re-enable `api/` + `package.json`
      in `.vercelignore`** so functions deploy again. Env/secrets in Vercel (Stripe, Supabase, Resend).
- [ ] Create DS's **own Supabase project** (separable), its own Stripe account (under the decided
      entity), and Resend **sending-domain auth** (SPF/DKIM/DMARC on a DS domain) – all in test mode.

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
