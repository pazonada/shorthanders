# Launch prep – everything that has to happen before Shorthanders is real

A working to-do list. Tick things off as they're done. Last updated 2026-07-24.

**Who does what:**
**YOU** = a decision or a design only you can make · **CLAUDE** = I can do it, just ask ·
**ENGINEER** = needs a real developer · **LAWYER** = needs an actual attorney

**Right now the site is a prototype.** Nothing is real: no accounts, no database, no payments.
Everything resets when you refresh the page. The list below is the distance between that and a
site that takes money.

---

## Phase 1 – Decisions only you can make

Nothing else can be finalized until these are settled. **No number goes on the site until you
confirm it** – the site currently shows working numbers, not decisions.

- [ ] **What does "launch" mean?** A quiet opening to a handful of reporters is a very different
      list from a public launch. Pick one, because it changes how much of Phase 3 you actually
      need on day one. **YOU**
- [ ] **Confirm the reporter fee.** The site currently says 2% (Pro) or 5% (Free). Are those the
      real numbers? See `open_strategic_decisions.md` and `../marketing/pro_pricing_worksheet.md`. **YOU**
- [ ] **Confirm the Pro monthly price.** $29 has been floated, never decided. **YOU**
- [ ] **Confirm the firm subscription price**, or decide firms launch free. **YOU**
- [ ] **Point the real domain.** Right now it's `shorthanders.vercel.app`. You already own
      `shorthanders.com` — point it before launch, not after – changing the address later costs you
      any search traffic you've built. **YOU**
- [ ] **Set up email on `shorthanders.com` (Google Workspace).** Same moves you did for
      deweysholes.com, on the new domain. deweysholes.com holds **no real mail** (test-only), so
      there's nothing to preserve — either swap this Workspace's **primary domain** to
      shorthanders.com and drop deweysholes.com, or start a **fresh Workspace** on shorthanders.com
      and cancel the old one. All in the Admin console (admin.google.com): **YOU**
      1. Account → Domains → Manage domains → **Add a domain** → `shorthanders.com` (secondary domain).
      2. **Verify** ownership — add the TXT record Google gives you at shorthanders.com's DNS host.
      3. **MX**: add `1  smtp.google.com.` at shorthanders.com's DNS (or the legacy 5× `ASPMX` set).
      4. **SPF** (root TXT): `v=spf1 include:_spf.google.com ~all`.
      5. **DKIM**: Apps → Google Workspace → Gmail → Authenticate email → generate a key for
         shorthanders.com → add the TXT it gives you → **Start authentication**.
      6. **DMARC** (TXT at `_dmarc.shorthanders.com`): start `v=DMARC1; p=none; rua=mailto:you@shorthanders.com`,
         tighten to `quarantine` → `reject` after ~2 clean weeks.
      7. Create `aud@shorthanders.com` (user or alias); make `hello@`/`support@` a **free Group**
         (no paid seat) for inbound support + "remove my listing" requests.
      8. At launch: **remove deweysholes.com** — swap primary to shorthanders.com then drop it, or
         cancel the old Workspace (2 seats billed annually, so cancel/downgrade). Then update the
         Stripe descriptor, the site's contact/pay addresses, and any lingering `@deweysholes.com`.
      (DNS steps happen at whatever registrar/host holds shorthanders.com.)

      **IN PROGRESS (2026-08-18):** shorthanders.com added to the existing Workspace + verified;
      **MX done** (5× ASPMX at Gandi, status Complete); **SPF edited** to Google-only
      `v=spf1 include:_spf.google.com ~all`; **DKIM generated for shorthanders.com** (gotcha: the
      Authenticate-email page defaults to deweysholes.com — must switch "Selected domain" to
      shorthanders.com first; each domain has its OWN key) + TXT added at Gandi + **Start
      authentication clicked**; DKIM/SPF verified **All ok**. **shorthanders.com MADE PRIMARY
      2026-08-18.** GOTCHA: changing the primary domain does **NOT** auto-rename users — the accounts
      stay `@deweysholes.com` and you keep logging in with the old address until you manually
      **rename each user** (Directory → Users → ⋮ Rename user → change domain to shorthanders.com;
      old address auto-kept as an alias), then re-login as `admin@shorthanders.com`. **REMAINING:**
      rename the users, then (b) `hello@`/`support@` Group (enable
      external posting; watch for new-domain spam-filtering); (c) **DMARC** `_dmarc` TXT; (d) redo
      `aud@` "Send mail as"/app-password + verify pazonada@gmail forwarding; (e) **remove
      deweysholes.com** (strip its user aliases + old hello@ group first) + rename org (still "Dewey
      Sholes"); (f) drop to 1 seat at **renewal** (annual plan locks the count until then). Billing
      is per-seat, not per-domain.
- [x] **Trademark — Shorthanders ITU filed** (Section 1(b), Serial 50056186; priority date locked; use ™, not ®,
      until it registers). Next: after the USPTO **Notice of Allowance**, file the **Statement of
      Use** with a live-site specimen (or buy extensions) — once the site is actually launched.
      Separately, let the old "Dewey Sholes" application (Serial 99703235) go abandoned. **YOU**

## Phase 2 – Design work you owe

- [x] **Share image, 1200 x 630.** Done 2026-07-21. The card people see when the link is
      pasted into Facebook, Slack, iMessage, or LinkedIn: the logo lockup plus one line -
      "A directory of over 5,700 California court reporters."

      That line does a job the title can't. The title has to carry the brand name, so the card
      adds the scale and the state instead, and it repeats neither the title nor the description
      verbatim - which was the thing to avoid, since platforms render those as text right beside
      the image.

      Files: `mvp/graphics/DS-share-image.png` and the `.psd` beside it. Wired into the page and
      live. **If the 5,700 figure ever changes, this image has to be re-exported** - it is the
      one place a number is baked into a picture instead of read from the data.
- [ ] **Check the site on a real phone**, not a resized browser window. **YOU**
- [ ] **Set up the CSR-removal Google Form BEFORE the outreach campaign.** When you email reporters,
      some will ask to be taken off the directory. Decided approach = a Google Form (auto-collects to
      a Sheet) linked from a personalized "Remove my listing" line in the email; applying removals is
      a batch "paste-and-rebuild" (export Sheet → `data/suppressed_csrs.csv` → run
      `generate_profiles.py` + `build.sh` → deploy). The build filter is already wired. Full steps:
      `csr_email_outreach.md` → "Opt-outs & removal requests." **YOU** (make the Form) **+ CLAUDE**
      (run/redeploy the batch). Must exist before the first send so removals are honored promptly.

## Phase 3 – Making it actually work

This is the big one, and it's real engineering. Reliability, webhook safety, monitoring, and the
go/no-go gate live in `reliability_monitoring_plan.md`; the full service list is in
`services_registry.md`. The wiring itself is spelled out in
`integration_checklist.md`.

> **NOTE TO SELF (Claude) – "ENGINEER" below = me + Aud; there is no separate engineer.** When I wire
> this backend, two standing obligations, both on me:
>
> **1. Re-enable the backend deploy.** `mvp/api/` and `mvp/package.json` are currently in
> `mvp/.vercelignore` (excluded 2026-07-28 to keep deploys static-only and cheap). Before the
> Stripe/Supabase functions can work live, **remove those two lines from `.vercelignore`** so the
> functions deploy again. The claim flow already calls `api/connect/create-account` and falls back to
> a demo stub on a 404 – that stub comes out once the real function is live.
>
> **2. Don't run up Aud's bill – cost is a HARD constraint (Aud is funding this personally).** Build
> cost-efficiently and keep watching spend *myself*; don't offload monitoring to Aud. Concretely:
> - **Set a Vercel spend limit / usage alert FIRST** (Vercel → Settings → Billing → Spend Management)
>   as a hard backstop, *before* enabling functions, so nothing can balloon silently.
> - **Keep functions lean** – minimal deps, fast cold starts; don't bundle Stripe/Supabase into
>   functions that don't need them. Push heavy work into Postgres/Supabase, not per-invocation compute.
> - **Notifications from a DB trigger, not polling** (already the plan – `open_strategic_decisions.md`
>   §4). No always-on processes; no cron unless genuinely required.
> - **Static-first** – keep the frontend static + CDN-cached; only hit a function when unavoidable.
> - **Cache build deps** so builds don't reinstall every push; **batch deploys** (fewer pushes).
> - **Re-check the Vercel usage chart each session** while integrations are live; if it climbs, dig in
>   before it compounds.
> - **Right-size the host** – the frontend is pure static, so if Vercel Pro + functions gets pricey,
>   move the frontend to a free static host (Cloudflare Pages / Netlify) + Supabase for the backend.
>   Cheapest architecture that works wins.

- [ ] **Accounts and login** – so people can sign up and their account still exists tomorrow.
      (Supabase.) **ENGINEER**
- [ ] **A real database** – so profiles, messages, and invoices are stored instead of vanishing
      on refresh. **ENGINEER**
- [ ] **Payments** – reporters getting paid by card or bank transfer, your fee coming out
      automatically, subscriptions billing monthly, and year-end tax forms. (Stripe.) **ENGINEER**
- [ ] **Derive "overdue" from the due date.** In the prototype an invoice's `overdue` status is
      static (seeded/set by hand); nothing turns a `sent` invoice `overdue` when its due date
      passes. The reporter's "Awaiting payment" figure sums `sent` + `overdue`, so it's correct
      either way, but the *overdue* label itself won't mean anything until a scheduled job (or a
      computed check) flips `sent → overdue` once `due` is in the past. Build it properly, and
      the reporter's payout dates must come from **Stripe's real in-transit estimate**, never a
      standing calendar date (see the payments-page design notes / integration_checklist §3). **ENGINEER**
- [ ] **Email** – invites, invoice notifications, the reporter outreach campaign. (Resend.) **ENGINEER**
- [ ] **Messaging that actually delivers**, rather than only existing in one browser. **ENGINEER**
- [ ] **Server-side search** – the directory currently searches 5,705 records in the visitor's
      browser, which will get slow. Keyword search already covers name, city, county, license,
      method, specialties, proceedings, services, languages, certifications, and bio (a firm can
      search "maritime" and find the reporters who list it). The server version needs to keep
      that same reach, and should add stemming / partial matching so "deposition" also finds
      "depositions". **ENGINEER**
- [ ] **Lock the firm gate properly.** Today the "upgrade to see this profile" blur is
      cosmetic – the data is still in the page and a determined person can read it. It has to be
      enforced on the server before it's protecting anything real. **ENGINEER**
- [ ] **Make the site load faster.** It currently rebuilds itself in the visitor's browser on
      every visit, which is fine for a demo and sluggish for real traffic. **ENGINEER**

## Phase 4 – Cleaning out the prototype

- [ ] **Make login actually work, and remove the fake shortcuts.** Today the login box is a
      placeholder: the email and password fields do nothing, the "Log in" button ignores them
      and always drops you into the *reporter* dashboard, and the only real way to pick a side is
      the two "Prototype - jump straight in as" buttons. None of that can ship.

      The real behavior (decided 2026-07-21, deferred to integration): a person enters email and
      password, the backend looks up the account, sees whether it's a reporter or a firm, and
      routes them to the right dashboard - no role buttons, one form. This is a backend job (it
      needs real accounts to look up), so it lands with auth in Phase 3, not before. Mechanics
      are spelled out under "Login" in `integration_checklist.md`. **ENGINEER + CLAUDE** 
- [ ] **Remove the demo toggles**, like the free/Pro switch that exists to show off the firm
      gate. **CLAUDE**
- [ ] **Read every page start to finish** with fresh eyes, checking that nothing describes the
      old v1 model (12% fee, matching, scheduling). **YOU**
- [ ] **Replace the 6 fictional SAMPLE profiles with real claimed profiles.** The featured/demo
      profiles (Marguerite Ellsworth, Desmond Farrataglia, etc., license #900001-900006) are
      invented - `SAMPLE_PROFILES` in `_app_02_data.jsx`, badged "SAMPLE" on cards and flagged
      "fictional demo" on the profile. They exist so the directory isn't empty. Swap them for
      real reporters as soon as a few claim (with their consent + real data), then drop the
      SAMPLE badge logic. **Do NOT re-attach fabricated data to real licensee records** - that
      was the bug this fixed (real names carried invented credentials). Real reporters appear as
      unclaimed public stubs until they themselves claim. **YOU / CLAUDE**
- [ ] **Confirm every number on the site is real** – rates, fees, the 5,705 count, the invoice
      figures in the money comparison. **YOU**
- [ ] **Design how a reporter states what work they want.** The CRB roster is every licensed CSR
      and carries no employment field - full-time freelancers, agency-only reporters, and court
      officials picking up side transcription look identical in it. Only the reporter knows.

      The insight worth building on (Aud, 2026-07-21): **anyone filling out a profile here wants
      direct work** - possibly alongside a court-appointed role, possibly alongside agency work,
      possibly instead of both. So the profile field is not "what kind of reporter are you," it's
      closer to "what work are you open to." Claiming is already the availability signal; the
      field just sharpens it.

      The directory already labels the gap - unclaimed rows read "Public license record ·
      unclaimed", there's an "Unclaimed profile" pill and a separate `UnclaimedProfile` page, and
      firms can filter to claimed profiles only.

      **Resolved 2026-07-21:** rather than asking reporters to maintain a status, activity is
      computed from their sign-ins and shown as "Recently active on Shorthanders" when true, and
      not shown otherwise. Reasoning and open parameters: `activity_signal_design.md`. Still open
      is whether unclaimed listings should say more plainly that nobody has confirmed
      availability. **YOU**

## Phase 5 – Legal, before any money moves

- [ ] **The deposition-neutrality question.** Whether a platform can sit between a firm and a
      reporter without compromising the reporter's required neutrality. This is the one that
      could change the product, so ask early. Brief is written:
      `legal_question_deposition_neutrality.md`. **LAWYER**
- [ ] **Real terms of service.** What's on the site now says in its own text that it's prototype
      language. **LAWYER**
- [ ] **Real privacy policy**, same situation. **LAWYER**

## Phase 6 – Prove it actually works (pre-launch verification / UAT)

The point of maximum anxiety, and rightly so: losing users – or getting in trouble – because a
payment, a message, or an email notification *silently* didn't work. This is a **layered gate**,
run once the Phase 3 integrations exist and before the final pass. No single tool covers it; each
layer catches what the others miss.

- [ ] **End-to-end tests in Stripe + Resend TEST mode.** Prove the riskiest flows with a real
      assertion, not a screenshot. Invoice → firm pays (card *and* ACH) → the reporter-side fee is
      taken → the payout lands. Pro and firm subscriptions bill monthly. A message sent in one
      browser actually appears in the other. Every email (invite, invoice notice, digest) actually
      **gets delivered to a real inbox and isn't flagged as spam.** And verify **Stripe webhooks
      fire and are handled** – a "payment succeeded" screen means nothing if the webhook that
      records it never ran. This is where the money/email fears get put to bed. **ENGINEER**
- [ ] **Run an AI UAT agent on a review branch.** Reviewed `MarkusNiGit/human-uat-kit` – good fit
      as *one* layer. Its expectation-loop + adversarial-input catalog is built to catch
      **coherence failures** – the "screen says success but it silently didn't happen" class, which
      is exactly the fear. **Prerequisite, and it must be built during Phase 3:** a **"headless
      drive surface"** – a way to drive the app *without* the GUI (an API / CLI / test harness),
      plus test-mode keys and a way to seed/reset test data and to trigger and inspect webhooks and
      emails. The tool's whole depth depends on that seam, so the backend has to be built with it in
      mind. **ENGINEER + CLAUDE**
- [ ] **Know what the UAT agent can't do, and cover it elsewhere.** It can't perceive visuals (it
      routes those to human review), can't confirm money *actually* moved, an email *actually*
      landed, or a payout hit a bank, and it's no substitute for real user research. So those live
      in the other layers: money/email in the test-mode E2E above, the visual check in the Phase 7
      click-through, the legal gates in Phase 5 (the lawyer), and real user testing next. **YOU / ENGINEER**
- [ ] **Real human testing with a handful of CSRs and firms.** A few real reporters claim and
      invoice, a real firm searches and pays, on their own phones and laptops. They will find things
      no automated pass does. Rosie's network is the path. **YOU**

## Phase 7 – The final pass

Do this last, right before you go live.

- [ ] **Rebuild the site** so you're checking the current version:
      ```
      bash mvp/build.sh
      ```
      **CLAUDE**
- [ ] **Run the checker:**
      ```
      python3 mvp/scripts/preflight.py
      ```
      It inspects the invisible details – the blurb Google shows, the share preview, and
      leftovers that shouldn't ship. It prints a list; anything marked FAIL has to be fixed.
      Ask me to run it if you'd rather. **CLAUDE**
- [ ] **If you changed the domain in Phase 1**, three places need updating to match, or the
      share previews and Google listing will point at the old address. Tell me the new domain
      and I'll handle it. **CLAUDE**
- [ ] **Click every page and every button** on the finished site. **YOU**
- [ ] **Paste the link into Slack or iMessage** and confirm the preview looks right. This is
      what the share image from Phase 2 is for. **YOU**
- [ ] **Confirm `dewey-sholes.vercel.app` still shows the old v1 prototype** and the two sites
      haven't been crossed. See `../../V1_ARCHIVE.md`. **CLAUDE**
- [ ] **Nothing private is downloadable.** The live site must not serve reporter PII or internal
      docs. After deploying, confirm these all return **404**: `/data/email_campaign.csv`,
      `/data/csr_active_directory.csv`, `/docs/`, `/marketing/`. And confirm `/csr_profiles.js`
      contains **no raw emails** (only masked `m***@domain`). This is guarded by `mvp/.vercelignore`
      + gitignored `data/*.csv` + the masked generator — a 2026-07-28 fix after ~5,700 reporters'
      emails/addresses were briefly live. See `integration_checklist.md` §7. **CLAUDE**

## Phase 8 – After you're live

- [ ] **Add analytics**, so you know whether anyone is showing up. **CLAUDE**
- [ ] **Watch the first real signups closely.** The first reporter who claims a profile and the
      first firm that pays an invoice will find things no checklist did. **YOU**

---

## One thing worth understanding

Google will only ever see this site as **a single page** – not separate listings for Directory,
Pricing, For Firms, and so on. That's a consequence of how the site is put together.

What it means practically: the one description you wrote is the only description Google will
ever show, for everything. It also means a reporter searching their own name will not find their
Shorthanders profile.

If search traffic turns out to matter – especially reporters finding themselves – fixing it is a
real project, not a setting. Worth deciding before you spend money on marketing, and much
cheaper to do before launch than after.
