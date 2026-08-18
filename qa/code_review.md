# Cross-model code review loop

Two different models have different blind spots, so reviewing a diff with **both** Claude and Codex
catches more than either alone. This is the code layer of the QA gate. Run it **per feature branch**,
and especially on anything in the money/PII/auth hotlist below.

Honest limit: two AIs can still **share** a blind spot (both miss the same subtle Stripe/auth bug).
So for the money/PII paths this loop is the stand-in for — or the cheap complement to — the one human
review in `governance-and-process/engineering_support_plan.md`. It shrinks that human pass; it doesn't
fully delete it on the highest-stakes code.

## The loop

1. **Generate the target.** On the feature branch:
   ```bash
   ./qa/diff.sh            # base defaults to main; writes qa/_review_target.diff (gitignored)
   ```
2. **Pass A — Claude.** In this repo, run `/code-review` (Claude Code). Level guide:
   - UI / mechanical changes → `low` or `medium`
   - **backend, payments, auth, PII → `high`**, or `ultra` (multi-agent cloud) before launch.
   Add `--fix` to apply, or `--comment` on a PR.
3. **Pass B — Codex.** Run OpenAI Codex on the **same** diff, with the prompt below. (Claude can't
   invoke Codex — you run this side.)
4. **Reconcile.** Put both findings side by side. Dedupe. For each unique finding decide: real bug /
   nit / false positive. Fix the real ones, re-run the affected pass. Where the two models **disagree**
   on a money/PII/auth path, that disagreement is the signal to look hardest.

### Codex prompt (paste with the diff)

> You are reviewing a diff for Shorthanders, a California court-reporter directory + invoicing app
> (static frontend, Supabase for DB/auth, Stripe Connect for payments, Postmark for email). Find
> correctness bugs first, then security. Be specific: cite the file/line and give a concrete failing
> input → wrong result. Pay special attention to the hotlist: Stripe Connect fee math and payout
> destination, webhook idempotency and source-of-truth, authorization (users acting only on their own
> resources), secrets exposure, and any raw reporter PII (emails/addresses) reaching the client.
> Report only findings you can justify; say "no issues found" for a clean area rather than inventing one.

## The hotlist — what to scrutinize on the backend

When the diff touches payments / auth / data, both passes must specifically check:

- **Fee math** — `application_fee_amount` uses the right percentage, base, rounding, and plan
  (Pro vs Free). Stripe executes whatever you pass, including a wrong number.
- **Payout destination** — the transfer goes to the **correct reporter's** connected account.
- **Webhooks** — handlers are **idempotent** (a doubled Stripe event can't double-process) and are
  the **source of truth**; a client "success" redirect never marks something paid on its own.
- **Authorization** — a firm can only pay invoices addressed to it; a reporter only reads its own
  payout data; the firm gate is enforced **server-side**, not just blurred in the page.
- **Onboarding gating** — no invoice can be sent/paid before the reporter finished Connect onboarding.
- **Secrets** — the Stripe **secret key** is env-only; never in the client bundle, the repo, or a
  public deploy. (Same discipline as the PII rule.)
- **PII + RLS** — no raw reporter emails/addresses shipped to the client; row-level security on tables
  so one account can't read another's rows.
- **Idempotency + fallbacks** — retries on every integration call; a failure surfaces itself (admin
  alert / queue) instead of going silent.

## When this runs

- Every feature branch before merge (UI: low/medium).
- **Before launch**, a `high`/`ultra` Claude pass + a Codex pass over the whole payments/auth/PII
  surface — this is the pre-launch review, done cheaply, with the option to add a human on top.
