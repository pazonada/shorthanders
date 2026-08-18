# Shorthanders – accounts & infrastructure reference

A single place for **each account/service you have (or will need), what it's for, its current
state, and what to do with it.** Pulled together from the entity, payments, email, and rebrand
discussions (Aug 2026). This is operational reference, **not legal or tax advice** – the entity,
DBA, and trademark items are worth one confirmation from the release-review attorney / your state.

## At a glance

| Account / service | Role for Shorthanders | Current state | What to do |
|---|---|---|---|
| **Legal entity** | Who owns/operates DS | Studio Crux, LLC (NJ) | Keep DS under it; brand via a DBA. Spin out a separate entity only on a real trigger (below). |
| **DBA / alternate name** | "Shorthanders" as a trade name | **Filed** (NJ Form C-150G, $50 / 5 yrs) | Done — Studio Crux can bank/contract/invoice as Shorthanders. The retired "Dewey Sholes" name is not filed and won't be. |
| **Domain + DNS** | shorthanders.com (target) · deweysholes.com (legacy) | **shorthanders.com owned but NOT set up yet**; deweysholes.com still live at Gandi (SPF/DKIM/DMARC verified) | Before launch: stand up shorthanders.com DNS + email; keep deweysholes.com forwarding through the switch. Tighten DMARC `p=none → reject` later. |
| **Email / Workspace** | Human/team mail | Google Workspace on **deweysholes.com** today (admin@, aud@, hello@) — migrate to shorthanders.com before launch | `aud@` = personal founder address (1:1, keep its reputation clean). Turn `hello@` into / alias **`support@`** for inbound support + "remove my listing" requests (free Group/alias, no seat). App + outreach email go elsewhere (below). |
| **Resend** | **Transactional** app email only | Already paying (other site) | Use for permission-based app mail (invite-accepted, invoices, receipts, notifications) on its own authenticated Shorthanders sending domain. **Do NOT send the cold CSR campaign here – against AUP.** Postmark is the fallback only if transactional deliverability still flakes. |
| **CSR outreach tool** | Cold invite campaign | Not set up | A Workspace **mail-merge tool (GMass / YAMM / Mailmeteor)** sending from a **dedicated outreach identity** – ideally an `outreach.`/`go.` subdomain (secondary domain in Workspace, no extra seat; its own SPF/DKIM/DMARC), warmed + dripped. The tool manages email **unsubscribes**. Not Resend/Postmark (AUP); not HubSpot (overkill). |
| **GitHub** | Source of record | `pazonada/shorthanders` (private; renamed from dewey-sholes) | Keep. **Reporter PII is in git history** – scrub with filter-repo/BFG before ever going public. |
| **Vercel** | Hosting | `shorthanders.vercel.app` = MVP (`mvp/`); root = v1 (old `dewey-sholes.vercel.app`) | Keep the two split. **Set a spend limit.** `.vercelignore` excludes `api/` + `package.json` for build cost – remove those two when the real backend is wired. |
| **Supabase** | Auth + database + usage events | Not built (all faked today) | Stand up when building the backend: auth, tables (reporters, profiles, firms, invoices, messages), and the events log that feeds recommendations. Free tier at launch. |
| **Stripe (+ Connect)** | Payments, payouts, subscriptions | Faked (stubs fall back to demo) | **Decide the payments entity BEFORE wiring real Connect** (see sequencing). Then: Express/Connect onboarding, 2%/5% application fee, card/ACH, subscriptions, webhooks. Set the business name/descriptor to Shorthanders (via the filed DBA). |
| **Trademark** | "Shorthanders" mark | **ITU application filed** (1(b); Serial _add #_) — priority date locked. Old "Dewey Sholes" app (Serial 99703235) being abandoned | Watch for the USPTO Notice of Allowance, then file the Statement of Use (live-site specimen) or buy extensions — after launch. Use ™ (not ®) until it registers. |

## Cost & financial sense-check

Every figure is approximate – **verify current pricing before relying on it.** The design goal:
**near-zero fixed cost until real usage justifies each spend** (free tiers everywhere), so the cost
base scales with revenue, not ahead of it.

| Account / service | Cost | You pay… | Notes |
|---|---|---|---|
| Studio Crux, LLC | ~$75/yr (NJ annual report) | Now (existing) | Formation already done. |
| DBA / alternate name | **$50 one-time** | Paid (filed as Shorthanders) | Free to keep; renew in 5 yrs. |
| Domain (Gandi) | ~$20/yr | Now | ~$2/mo amortized. |
| Google Workspace | ~$7/seat/mo → **~$14/mo** (2 seats) | Now | Could run 1 seat (~$7) if you drop the separate super-admin; `hello@`/`support@` Groups are free. |
| GitHub | **$0** | – | Private repos free. |
| Vercel | **Shared** – already on Pro (~$20/mo, sometimes more) | Now, across projects | DS is another project on your existing Pro plan – **no new base fee, just incremental usage.** "Sometimes more" = usage overage → hold it down with lean builds + batched pushes + the `.vercelignore`. |
| Resend | **$0** free tier, or ~$20/mo | Marginal (shared w/ other site) | **Transactional only.** Free tier ~3k emails/mo may cover launch. Claude Code plugin available. |
| Trademark | ~$250–350 (paid) | Filed (ITU) | Priority date locked; SOU + possible extension fees still to come after the NOA. Old Dewey Sholes filing (99703235) sunk. |
| Supabase | **Shared/marginal** – you already pay it (Disclosure Watch + iPhone app) | Now | Adding DS likely adds incremental compute, **not a fresh $25 base** – verify against your org billing. Keep DS as its **own project** (ideally its own org) so its data stays separable + transferable for a future spin-out/sale. |
| Stripe (+ Connect) | **$0** base; ~$2/mo per *active* Connect account | Only when money moves | Processing fees are the reporter's cost, passed through. Offset by revenue. |
| Mail-merge tool (outreach) | **$0–30/mo** | Campaign months only | YAMM ~$50/yr (cheapest, occasional) · GMass ~$30/mo (best, pausable) · Mailmeteor ~$10–25/mo. |
| PostHog (analytics) | **$0** free tier (~1M events/mo) | Only at real scale | Product analytics; not a CRM. |
| Postmark | **$0** | Not now | Transactional fallback only, if Resend flakes. |

**Explicitly NOT buying:** HubSpot (sales CRM – wrong job, recurring bill), Instantly (cold-email
SaaS – overkill), SMS/Twilio (no SMS by product decision), file storage / S3 (pass-through links
only), a second email platform for outreach (the mail-merge tool is it).

**Run-rate:** Vercel Pro, Supabase, and Resend are **already paid across your portfolio**
(Disclosure Watch, the iPhone app, your other site), so DS mostly adds *usage*, not new base fees.
- **DS-specific recurring today:** ~**$16/mo** – its own Workspace (~$14) + domain (~$2) – **plus**
  incremental usage on the shared Vercel/Supabase/Resend, **plus** ~$30 in outreach-campaign months.
  One-offs: DBA $50, NJ report ~$75/yr.
- **At scale:** the shared platforms tip into overage / additional Pro-compute as DS grows – but
  that lands once firm subs ($49/user) + reporter per-payment fees are flowing.

**Levers:** hold shared-platform *usage* down (lean builds, batched pushes, the `.vercelignore` –
these directly control Vercel's "sometimes more"); 1 Workspace seat vs 2 (~-$7/mo); YAMM annual vs
GMass monthly. The old "move to Cloudflare to dodge Vercel's $20" barely applies now – that base is
already sunk in your Pro plan, so it'd only shave DS's marginal usage, not a base fee.

## Two guiding decisions

- **Everything stays under Studio Crux, LLC for now**, branded as Shorthanders via the DBA. Your
  other products and your consulting also stay under Studio Crux – one EIN, one bank relationship,
  one tax return. The only cost of sharing one entity is shared liability, which is minimal while
  everything is pre-revenue and payments aren't live.
- **Keep DS infra cleanly separable from your other properties.** Its own domain/sending domain,
  its own Vercel project, its own **Supabase project (ideally its own org)**, its own Stripe account,
  its own repo. Riding on shared accounts is fine for *billing* (cheaper), but DS's **data and
  services should stay in their own project** so a later spin-out, rebrand, or sale is a clean
  hand-off, not a migration out of Disclosure Watch / the iPhone app's tables.

## Sequencing / triggers (what changes the answers above)

1. **Rosie / name:** RESOLVED — renamed to **Shorthanders** (Rosie went quiet past the Aug 15, 2026
   deadline; the internal rename was executed). DBA filed under the new name; no "Dewey" cemented in
   public records. Shorthanders **ITU trademark filed** (priority date locked); the old Dewey Sholes
   application is being abandoned.
2. **Before Stripe go-live:** lock the payments entity. Standing up Connect under Studio Crux is a
   perfectly valid choice and sidesteps the connected-account migration entirely. What you want to
   avoid is onboarding real reporters/subscriptions and *then* moving to a different entity – that's
   a Stripe-assisted migration, and it gets harder with every user.
3. **A separate Shorthanders, LLC** becomes worth it only on: real money + PII at scale (liability
   ring-fencing), raising outside money (→ Delaware C-Corp, not just an LLC), or a sale conversation.
   None of these are "is the LLC making revenue."

## Related docs

- `integration_checklist.md` – everything the prototype fakes and what to wire (the technical side
  of the Supabase / Stripe / Resend rows above).
- `open_strategic_decisions.md` – the monetization model behind the Stripe row.
- `_private/` – the Rosie agreement + the internal rename/rebrand fallback (not in the deployable
  tree; never committed to the public path).
