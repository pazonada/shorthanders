# Dewey Sholes – accounts & infrastructure reference

A single place for **each account/service you have (or will need), what it's for, its current
state, and what to do with it.** Pulled together from the entity, payments, email, and rebrand
discussions (Aug 2026). This is operational reference, **not legal or tax advice** – the entity,
DBA, and trademark items are worth one confirmation from the release-review attorney / your state.

## At a glance

| Account / service | Role for Dewey Sholes | Current state | What to do |
|---|---|---|---|
| **Legal entity** | Who owns/operates DS | Studio Crux, LLC (NJ) | Keep DS under it; brand via a DBA. Spin out a separate entity only on a real trigger (below). |
| **DBA / alternate name** | "Dewey Sholes" as a trade name | Not filed | File NJ Form C-150G ($50, 5 yrs) so Studio Crux can bank/contract/invoice as Dewey Sholes. Do before contracting/taking money under the name. |
| **Domain + DNS** | deweysholes.com | Live at Gandi; SPF/DKIM/DMARC verified | Keep. Point the site + email here. Tighten DMARC `p=none → reject` later. |
| **Email / Workspace** | Human/team mail | Google Workspace, DNS done; admin@, aud@, hello@ | `aud@` = personal founder address (1:1, keep its reputation clean). Turn `hello@` into / alias **`support@`** for inbound support + "remove my listing" requests (free Group/alias, no seat). App + outreach email go elsewhere (below). |
| **Resend** | **Transactional** app email only | Already paying (other site) | Use for permission-based app mail (invite-accepted, invoices, receipts, notifications) on its own authenticated DS sending domain. **Do NOT send the cold CSR campaign here – against AUP.** Postmark is the fallback only if transactional deliverability still flakes. |
| **CSR outreach tool** | Cold invite campaign | Not set up | A Workspace **mail-merge tool (GMass / YAMM / Mailmeteor)** sending from a **dedicated outreach identity** – ideally an `outreach.`/`go.` subdomain (secondary domain in Workspace, no extra seat; its own SPF/DKIM/DMARC), warmed + dripped. The tool manages email **unsubscribes**. Not Resend/Postmark (AUP); not HubSpot (overkill). |
| **GitHub** | Source of record | `pazonada/dewey-sholes` (private) | Keep. **Reporter PII is in git history** – scrub with filter-repo/BFG before ever going public. |
| **Vercel** | Hosting | `dsmvp.vercel.app` = MVP (`mvp/`); root = v1 (`dewey-sholes.vercel.app`) | Keep the two split. **Set a spend limit.** `.vercelignore` excludes `api/` + `package.json` for build cost – remove those two when the real backend is wired. |
| **Supabase** | Auth + database + usage events | Not built (all faked today) | Stand up when building the backend: auth, tables (reporters, profiles, firms, invoices, messages), and the events log that feeds recommendations. Free tier at launch. |
| **Stripe (+ Connect)** | Payments, payouts, subscriptions | Faked (stubs fall back to demo) | **Decide the payments entity BEFORE wiring real Connect** (see sequencing). Then: Express/Connect onboarding, 2%/5% application fee, card/ACH, subscriptions, webhooks. Set the business name/descriptor to Dewey Sholes. |
| **Trademark** | "Dewey Sholes" mark | Pending, Serial No. 99703235 | Keep pursuing under the current name. If the brand ever changes, abandon this and file for the new name. |

## Cost & financial sense-check

Every figure is approximate – **verify current pricing before relying on it.** The design goal:
**near-zero fixed cost until real usage justifies each spend** (free tiers everywhere), so the cost
base scales with revenue, not ahead of it.

| Account / service | Cost | You pay… | Notes |
|---|---|---|---|
| Studio Crux, LLC | ~$75/yr (NJ annual report) | Now (existing) | Formation already done. |
| DBA / alternate name | **$50 one-time** | When you brand as Dewey Sholes | Free to keep; renew in 5 yrs. |
| Domain (Gandi) | ~$20/yr | Now | ~$2/mo amortized. |
| Google Workspace | ~$7/seat/mo → **~$14/mo** (2 seats) | Now | Could run 1 seat (~$7) if you drop the separate super-admin; `hello@`/`support@` Groups are free. |
| GitHub | **$0** | – | Private repos free. |
| Vercel | **$0** Hobby, or **$20/mo** Pro | Launch decision | Commercial use → Pro. Or move the static frontend to Cloudflare Pages / Netlify (free) and keep only functions elsewhere. Set a spend limit. |
| Resend | **$0** free tier, or ~$20/mo | Marginal (shared w/ other site) | **Transactional only.** Free tier ~3k emails/mo may cover launch. Claude Code plugin available. |
| Trademark | ~$250–350 one-time | Already filed | Sunk (Serial 99703235). |
| Supabase | **$0** free tier → $25/mo Pro | Only at scale | Auth + DB + events. Free tier covers launch. |
| Stripe (+ Connect) | **$0** base; ~$2/mo per *active* Connect account | Only when money moves | Processing fees are the reporter's cost, passed through. Offset by revenue. |
| Mail-merge tool (outreach) | **$0–30/mo** | Campaign months only | YAMM ~$50/yr (cheapest, occasional) · GMass ~$30/mo (best, pausable) · Mailmeteor ~$10–25/mo. |
| PostHog (analytics) | **$0** free tier (~1M events/mo) | Only at real scale | Product analytics; not a CRM. |
| Postmark | **$0** | Not now | Transactional fallback only, if Resend flakes. |

**Explicitly NOT buying:** HubSpot (sales CRM – wrong job, recurring bill), Instantly (cold-email
SaaS – overkill), SMS/Twilio (no SMS by product decision), file storage / S3 (pass-through links
only), a second email platform for outreach (the mail-merge tool is it).

**Run-rate:**
- **Today (pre-revenue prototype):** ~**$16/mo** (Workspace + domain; everything else free), plus
  ~$30 in the months you run an outreach campaign. Fixed one-offs: DBA $50, NJ report ~$75/yr.
- **At modest post-launch scale:** ~**$80–110/mo** (add Vercel Pro, Resend paid, Supabase Pro,
  Stripe Connect per active account) – by which point firm subscriptions ($49/user) and reporter
  per-payment fees more than cover it.

**Levers if you need to trim:** 1 Workspace seat instead of 2 (~-$7/mo); host the static frontend
free on Cloudflare/Netlify instead of Vercel Pro (~-$20/mo); YAMM annual instead of GMass monthly
for outreach; stay on every free tier until usage forces the upgrade.

## Two guiding decisions

- **Everything stays under Studio Crux, LLC for now**, branded as Dewey Sholes via the DBA. Your
  other products and your consulting also stay under Studio Crux – one EIN, one bank relationship,
  one tax return. The only cost of sharing one entity is shared liability, which is minimal while
  everything is pre-revenue and payments aren't live.
- **Keep DS infra cleanly separable from your other properties.** Its own domain/sending domain,
  its own Vercel project, its own Stripe account, its own repo. That's what makes a later spin-out
  (or a rebrand) cheap instead of a migration.

## Sequencing / triggers (what changes the answers above)

1. **Rosie / name:** get her signed (or, if she goes quiet or over-asks, the internal rename
   fallback in `_private/`) **before** cementing "Dewey" into public records (DBA, trademark, a
   future entity).
2. **Before Stripe go-live:** lock the payments entity. Standing up Connect under Studio Crux is a
   perfectly valid choice and sidesteps the connected-account migration entirely. What you want to
   avoid is onboarding real reporters/subscriptions and *then* moving to a different entity – that's
   a Stripe-assisted migration, and it gets harder with every user.
3. **A separate Dewey Sholes, LLC** becomes worth it only on: real money + PII at scale (liability
   ring-fencing), raising outside money (→ Delaware C-Corp, not just an LLC), or a sale conversation.
   None of these are "is the LLC making revenue."

## Related docs

- `integration_checklist.md` – everything the prototype fakes and what to wire (the technical side
  of the Supabase / Stripe / Resend rows above).
- `open_strategic_decisions.md` – the monetization model behind the Stripe row.
- `_private/` – the Rosie agreement + the internal rename/rebrand fallback (not in the deployable
  tree; never committed to the public path).
