# Services & integrations registry

Every outside service, account, and API it takes to run **shorthanders.com** — with a plain-English, one-line "what it's for." This is the quick index; for cost detail, sequencing, and account logins see [`accounts_and_infrastructure.md`](accounts_and_infrastructure.md).

**Status key:** 🟢 live · 🟡 planned / not built yet (faked in the prototype today) · ⚪️ only when a campaign is running.

## The full stack

| Service | Category | What it's for (plain English) | Status | Rough cost |
|---|---|---|---|---|
| **Vercel** | Hosting | Runs the website and its behind-the-scenes code, and publishes updates when you push changes. | 🟢 live (prototype) | Shared on your existing Pro plan (~$20/mo) — no new base fee, just usage |
| **Gandi** | Domain / DNS | Owns the `shorthanders.com` web address and holds the settings that point it at the website and the email. | 🟢 live | ~$20/yr |
| **GitHub** | Code storage | The safekeeping vault for all the code and its full history. | 🟢 live | $0 (private repos free) |
| **Claude Code** | Build tool | The tool you actually build and maintain the site with. | 🟢 live (dev) | Your subscription |
| **Supabase** | Database + logins | The filing cabinet + front desk: stores accounts, profiles, messages, and invoices, and handles sign-in. | 🟡 planned | Free tier at launch |
| **Stripe (+ Connect)** | Payments | Takes payments from firms, pays out reporters, and runs the monthly subscriptions. | 🟡 planned | $0 base; per-payment fees (the reporter's cost) + ~$2/mo per active payout account |
| **Google Workspace** | Human email | Your real mailboxes — `aud@`, `hello@`/`support@` — for reading and replying to people. | 🟢 live | ~$14/mo (2 seats → 1 at renewal) |
| **Postmark** | Automated email | Reliably sends the automatic notification emails (welcome, new message, unpaid invoice, receipt) from a `notify.shorthanders.com` subdomain. | 🟡 planned (setting up) | Free tier to start; ~$15/mo at volume |
| **Mail-merge tool** (GMass / YAMM / Mailmeteor) | Outreach email | Sends the one-time cold reporter-recruitment emails from your Google mailbox (Postmark isn't allowed to send cold mail). | ⚪️ campaign months | ~$0–30/mo while running |
| **Sentry** | Error monitoring | A smoke alarm for the code: tells you when something breaks and exactly what broke. | 🟡 planned (near launch) | Free tier |
| **Uptime monitor** (UptimeRobot / Better Stack) | Uptime | Pings the site every few minutes and alerts you if it goes down. | 🟡 planned (at launch) | Free tier |
| **Vercel logs** | Error monitoring | Built-in record of deploy and runtime failures (comes with Vercel). | 🟢 live | Included |
| **PostHog** | Analytics | Shows how people actually use the site — which pages, where they drop off. Not a CRM. | 🟡 planned | Free tier (~1M events/mo) |

## Notes & decisions baked in

- **Postmark, not Resend, for transactional email.** (Earlier plan had Resend as primary; superseded — you're setting up Postmark.) Resend/Postmark are **transactional only** — cold recruitment email must go through the mail-merge tool or it violates their rules.
- **Two email reputations, kept apart:** human/reply mail on the main domain via Google Workspace; automated notifications on a **`notify.` subdomain** via Postmark; cold outreach via Workspace mail-merge. A problem in one doesn't drag down the others.
- **Everything payments/data-related is faked today.** Supabase, Stripe, and Postmark are stubbed in the prototype and get wired in the Phase-3 backend build (see [`integration_checklist.md`](integration_checklist.md)).
- **Free-tier at launch** for Supabase, Sentry, uptime, and PostHog — real cost only arrives with real usage.
- **Hard rule:** no raw reporter emails on any public URL — see [`reliability_monitoring_plan.md`](reliability_monitoring_plan.md) and the PII discipline.

*Not runtime services, but part of the operation (tracked in `accounts_and_infrastructure.md`): Studio Crux LLC + the Shorthanders DBA, and the Shorthanders trademark (Serial 50056186).*
