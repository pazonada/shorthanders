# Reliability, monitoring & integration plan

A lean, solo-founder reliability plan for Shorthanders. Goal: **make failures visible, diagnosable, and recoverable fast** without turning a one-person company into an operations department. Adapted from a drafted PRD (`PRDs/Short_Handers_Reliability_Monitoring_Mitigation_PRD.docx`) with three amendments specific to this product (marked **[AMENDMENT]**).

> **Read this as a Phase-3 + launch companion, not a now-doc.** Almost everything here presupposes the real backend exists (Supabase + Stripe webhooks + Postmark wired). Today the app is a **static prototype** with all of that faked, so this rides *on top of* the backend build, in lockstep. See `integration_checklist.md` (what's faked) and `launch_prep.md` (Phase 3).

## Principles

- **Automate machines; talk to humans.** Automate technical health checks. Understand users through analytics + interviews, not agents.
- **Prefer managed services.** Every self-built piece is another thing that breaks at 2am.
- **Make failures visible.** A failure you catch is far less dangerous than a silent one.
- **Keep the stack small.** Every service = another account, credential, bill, failure point.
- **Database is the source of truth.** Invoice/payment status lives in Supabase and the UI reflects the DB — never the browser's word for it.
- **Design for graceful failure.** If an email send fails, the **in-app notification still exists**. A third-party outage must not corrupt app data.
- **Test critical paths repeatedly.** Synthetic tests for mechanics; humans for usability.

## Recommended stack (all managed, mostly free-tier at launch)

| Area | Pick | Bare-minimum fallback |
|---|---|---|
| Hosting | Vercel | Vercel |
| Auth + database | Supabase | Supabase |
| Payments | Stripe + **verified webhooks** | Stripe + dashboard review |
| Transactional email | **Postmark** (on a `notify.` subdomain) | Postmark |
| Error monitoring | Sentry | Vercel logs + review |
| Uptime | UptimeRobot / Better Stack (free) | one external uptime check |
| Functional QA | extend the existing `qa/` smoke-test kit | small smoke suite |
| Product analytics | PostHog (free tier) | basic event logging |

## [AMENDMENT 1] Reporter PII is the #1 risk — put it above everything

The biggest real-world risk here is **not downtime — it's exposing reporter data**, which has *already happened once* (a `/data/*.csv` with ~5,700 public-records emails was briefly reachable on an early deploy; and the old root deploy once served the whole repo). Non-negotiables, at the top of the privacy list:

- **Never ship raw reporter emails/addresses to the client or a public URL.** Keep the masked `csr_profiles.js`; contact reporters **only via the Invite flow**.
- Keep `.vercelignore` + `.gitignore` excluding `data/`, internal docs, and `api/`+`package.json` (build-cost) — and **audit each Vercel project's deploy scope before pushing** (the root/v1 lesson).
- Reporter PII is still in **git history** — scrub with filter-repo/BFG before the repo ever goes public.
- See `feedback_never_deploy_reporter_pii` (memory) — this is a HARD rule, not a guideline.

## [AMENDMENT 2] Cost is a monitored failure mode

A runaway Vercel/Supabase serverless bill is its own kind of outage when the founder funds this personally. Treat spend as a monitored layer:

- **Set a Vercel spend limit + usage alert BEFORE enabling functions** (Vercel → Settings → Billing → Spend Management).
- Keep functions lean; DB triggers not polling; static-first; batched deploys. Re-check the Vercel usage chart each working session while integrations are live.

## [AMENDMENT 3] Backups / recovery

DB-as-source-of-truth for invoices + payments means the DB is irreplaceable. **Enable and verify Supabase backups / point-in-time recovery** before real money or accounts exist. Test a restore once.

## Critical integration flows (the things that must not silently break)

- **Account creation:** sign up → Supabase account → profile → login.
- **Auth:** login/logout/reset → valid session → protected pages reject the unauthenticated.
- **Messaging:** send → store in Supabase → recipient sees it → notification state updates.
- **Message email:** new message → event recorded → Postmark sends → **a failed send is logged without losing the in-app message**.
- **Invoice:** reporter creates/sends → stored → firm can view.
- **Payment:** firm pays → Stripe → verified webhook → DB invoice = paid → reporter dashboard updates → Postmark receipt.

## Stripe webhooks — the highest-priority item of the whole backend build

This is where a solo founder gets burned (double-charges, silent missed payments, duplicate irreversible actions). Get it bulletproof **before real money moves**:

- **Verify webhook signatures.**
- **Record Stripe event IDs; make processing idempotent** (same event twice = one effect).
- **Update payment state only from verified webhooks, never the browser.**
- Log webhook successes + failures; provide a retry/reprocess path.
- **Test:** success, failure, canceled, delayed, duplicate, and failed-delivery scenarios.

## Monitoring layers

| Layer | Watches | Alert when | Action |
|---|---|---|---|
| Uptime | Public site/API | Unavailable | Investigate now |
| Errors | Runtime exceptions | New / high-volume / critical | Sentry context + Claude Code |
| Payments | Stripe events/webhooks | Failure or inconsistent status | Inspect Stripe event + app logs |
| Email | Postmark delivery | Delivery failure / unusual bounce | Inspect Postmark + app event |
| Database | Supabase / app state | Connection/query failure | Inspect Supabase + app logs |
| **Cost** *(added)* | Vercel/Supabase spend | Usage/spend spike | Find the runaway function |
| Functional QA | Critical journeys | Smoke test fails | Fix before users hit it |

## Implementation sequence (reordered: Sentry moves earlier)

1. Stabilize DB schema, authorization/RLS, user/account model.
2. Messaging + notifications (Supabase store, Postmark email, graceful-failure fallback).
3. **Add Sentry + verify with a deliberate test error** — *before* payments, so you have error visibility while writing the riskiest code.
4. Stripe payment flows + **verified, idempotent webhooks** (see above).
5. External uptime monitor + Vercel spend limit.
6. Extend the `qa/` smoke-test suite over the now-real flows.
7. Run end-to-end in a staging/test environment (Stripe test mode).
8. Onboard a small group of reporters + firms.
9. Watch monitoring while doing human research + analytics.
10. Only add infrastructure when real usage proves the need.

## Claude Code / agent guardrails

- Maintain the list of critical journeys + integrations; generate/maintain smoke tests; inspect logs on request and explain likely root causes; review changes for integration regressions.
- **Never silently change production data or payment state** because a log/test looks wrong.
- **Never treat an agent review with no reported errors as proof production is healthy.**

## Privacy & account basics

- No passwords, tokens, card data, or API secrets in logs. Secrets in env vars / managed secret storage, never source.
- Supabase auth + **row-level security** so users only see records they're entitled to.
- Treat transcripts, invoices, messages, profiles as sensitive business info. Minimize collected data; define retention/deletion before launch.

## Launch-readiness gate (go / no-go)

Sentry verified (test error) · uptime monitor verified · Vercel spend limit set · Supabase auth + RLS tested · Supabase backup/restore verified · Postmark send + failure tested · Stripe test payments + **signature verification + idempotency + retry** tested · messaging E2E · message-email E2E · invoice lifecycle E2E · payment→webhook→DB→dashboard→email E2E · smoke tests run automatically · **no reporter PII on any public URL; no secrets in source** · privacy/retention documented · incident procedure exists (identify → contain → diagnose → fix → test → deploy → verify).

## What NOT to build yet

A custom monitoring platform · overlapping observability vendors · an AI-agent fleet · custom payments · custom auth · an analytics warehouse before real usage · automated "interpretation" of user needs you can just ask users about.

---
*Related: `integration_checklist.md` (fakes → real wiring) · `accounts_and_infrastructure.md` (every account + cost) · `services_registry.md` (plain-English service index) · `launch_prep.md` (Phase 3).*
