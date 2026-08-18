# Engineering support plan

**Owner:** Aud
**Last updated:** 2026-05-16 · bootstrapped-reality note added 2026-08-13
**Status:** Living document – update as the engineering picture changes

This is the plan for human engineering support around Shorthanders. It exists because, candidly, Claude (the AI co-builder) can write a lot of code but can't watch error logs, take responsibility for a live system, pick up the phone when Stripe rejects webhooks, or sleep through alerts. Disclosurewatch's reliability pain (vendor outages, silent cron failures, queued emails that don't send) is the failure mode we're explicitly avoiding here.

> ## Bootstrapped reality (added 2026-08-13) — read this first
>
> This doc was written assuming Shorthanders might pay for ongoing engineering support. The actual path is **solo, no budget, built with Claude Code**, with limited time — and Aud will pay for **one** thing. So the four roles below collapse for now:
>
> - **Role 1 (pre-launch code review) is the only genuine must-pay.** One senior-engineer pass over the money / PII / court-record paths before a real dollar moves (the review scope is the bullet list under Role 1). Likely **deferred or a favor** via Aud's senior-engineer friend — so **cash-to-launch can be ~$0**.
> - **Roles 2–4 (on-call retainer, quarterly architecture review, vendor-failure response) are NOT paid line items yet.** They're replaced by **reliability-by-design** (see that section) + the **free monitoring stack** (Sentry free / UptimeRobot free / Healthchecks ~$5) + the engineer-friend as an informal buddy. They become real spend only once there's **revenue and scale**.
> - **Privacy / data and QA/UAT are conditional**, not standing hires — part of what Role 1 looks at, and a separate spend only if the review surfaces something Aud + Claude can't close. Default QA is a test-mode end-to-end pass run by Aud + Claude.
>
> **Net: cash between here and launch is ~$0–4k** (just Role 1, often deferred) **+ ~$0–5/mo monitoring.** Everything else is Aud's time. The four-role plan below stands as the **scale-stage picture** — what to fund once the platform has customers and income. Read it as "later," not "now."

---

## Where you actually need a human

### 1. Pre-launch code review (one-time, non-negotiable)

**What:** A senior engineer reviews the launch-critical code paths before any real money or real data moves through the system.

**Specifically reviews:**
- Stripe Connect integration (auth + capture + dispute flow + refund flow + payout escrow)
- Authentication and session management (Supabase Auth or Clerk)
- File upload + transcript delivery flow (signed URLs, virus scan, retention)
- Anything that touches money, PII, or court records
- Database access patterns (row-level security, indexes, transactions)
- Error handling and idempotency on every webhook + integration call

**Who:** Aud's senior-engineer friend (25 years experience). Pay deferred or fixed-fee per pass. Get a written agreement on scope + NDA + payment terms regardless of friendship.

**Cost:** $2,000–4,000 for a serious week of review if paid; deferred or equity-style otherwise. Real-world value: prevents the kind of misconfigured Stripe Connect bug that forces a 50-customer refund and a regulatory headache.

**Frequency:** Once before launch. Repeat for any major architecture change (e.g. adding a new payment flow, adding court-API integrations).

### 2. On-call when shit breaks (continuous, first 6 months especially)

**What:** Someone responds to alerts within hours of them firing. First 90 days post-launch is the most fragile window – every weird state we hit teaches us something, and silently dropped errors compound into "the platform is broken" perception.

**Two options for who:**

- **Engineer-friend buddy system.** If he's willing to be the first responder on Sentry/Healthchecks/UptimeRobot alerts during the first 6 months, this is the cheapest path. Define expectations clearly: response within X hours during business hours, escalation path if it's a weekend payment failure, etc.
- **Paid on-call retainer.** $1,500–2,500/mo for 10–15 hrs/week of a senior contractor's time. They handle alerts, do small bug fixes, and escalate to Aud (or trigger Claude in a maintenance session) when bigger work is needed.

**Realistic Year-1 spend if paid:** $18,000–30,000.

**Triggers that justify upgrading from buddy system to paid retainer:**
- More than ~3 alerts per week firing
- Any production data-loss incident
- Real users (50+ CSRs or 10+ firms) — when downtime starts costing real customer goodwill

### 3. Quarterly architecture review (continuous, low-frequency)

**What:** Someone with marketplace / payments / two-sided-platform experience looks at the system holistically. Are we accumulating technical debt? Are integration patterns scaling? Is the data model still right?

**Who:** Could be the same engineer-friend, could be a different specialist. Often these reviews are most valuable from someone who hasn't been in the day-to-day.

**Cost:** $2,000–3,000 per session, once every 3–6 months for the first year. Year-1 budget: $4,000–9,000.

### 4. Vendor-failure response (situational)

**What:** When Stripe / Resend / Supabase has an outage or weird behavior, someone needs to evaluate what's actually happening and decide whether to fail open, fail closed, or wait it out.

**Who:** Aud + engineer-friend. This is judgment work, not coding work.

**Cost:** $0 if friend is available; otherwise rolled into the on-call retainer.

---

## Total realistic Year-1 engineering-support budget

**Lean case (friend handles everything):**
- Pre-launch review: $0–4,000 (if friend takes deferred pay or does it for equity)
- Buddy on-call: $0
- Quarterly reviews: $0–3,000 (if friend does first one)
- Vendor response: $0
- **Total: $0–7,000**

**Realistic case (friend does pre-launch + first quarter, then need to pay):**
- Pre-launch review: $2,000–4,000
- On-call retainer (months 4–12): $13,500–22,500 (9 months × $1,500–2,500)
- Quarterly reviews (3): $6,000–9,000
- **Total: $21,500–35,500**

**Defensive case (everything paid from day one):**
- Pre-launch review: $3,000–4,000
- On-call retainer (12 months): $18,000–30,000
- Quarterly reviews (3): $6,000–9,000
- **Total: $27,000–43,000**

Budget for the realistic case. If the friend takes on more than expected, the surplus becomes runway. If less, you have the money to redirect.

---

## Reliability-by-design (things that reduce the need for humans)

Architecture choices that buy reliability without an engineer:

- **Fewer integrations.** Stripe Connect, Postmark (transactional email), Supabase (DB + auth), Web Push API (no SMS provider — phone is comms-only per `project_phone_is_comms_only.md` memory). That's four. NOT ten like disclosurewatch.
- **Vendors with status pages and SLAs.** Stripe is rock-solid. Postmark is top-tier for transactional email. Supabase has a mature status page. Resend kept for marketing/digest emails where occasional delays are tolerable.
- **Built-in monitoring:**
  - Sentry for errors (free tier covers solo founders, $26/mo when we scale)
  - Healthchecks.io for cron jobs ($5/mo, alerts when a scheduled job doesn't fire)
  - UptimeRobot for the site itself (free)
- **Idempotency and retries on every integration call.** Code pattern, not infrastructure. Claude can write it; reviewer verifies it.
- **Manual fallbacks.** If automated email fails, an admin alert tells you. If payment capture fails, an admin queue surfaces it. The goal is for failure to surface itself, not stay silent (the disclosurewatch failure mode).
- **Idempotent webhook handlers.** Stripe webhooks can fire twice. Handle that.
- **Database backups daily, restore-tested quarterly.** Supabase handles backups automatically; you need to verify a restore works before you need to use one.

---

## What Claude can and can't do

**Claude can:**
- Write code, including integration code for Stripe / Postmark / Supabase
- Review patterns and flag obvious bugs
- Update governance docs and propagate decisions across the codebase
- Help diagnose problems when given logs, error messages, repro steps

**Claude cannot:**
- Watch your error logs or alerts
- Wake up at 3am when Stripe webhooks fail
- Take responsibility for the live system's uptime
- Make on-call decisions in real time
- Substitute for a human who knows the codebase end-to-end

That's why this plan exists. Claude is a force multiplier on the engineering work; it isn't a substitute for an engineer.

---

## Related docs

- `governance-and-process/payment_failure_policy.md` – what happens when payments fail (the live-system failure modes we're protecting against)
- `governance-and-process/mvp_scope_v1.md` – the smallest defensible MVP (the surface area we're committing to support)
- `~/.claude/projects/-Users-audubondougherty-Desktop-AI-experiments-shorthanders/memory/project_phone_is_comms_only.md` – no SMS provider, PWA push + email only
