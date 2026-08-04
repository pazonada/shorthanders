# Integration checklist – wiring the prototype to real services

Everything the prototype currently **fakes**, and what to build when wiring up the real
backend. The demo runs entirely in the browser: state lives in the React store
(`_app_11_router.jsx` `StoreProvider`), data is seeded in `_app_02_data.jsx`, and the two
serverless stubs under `mvp/api/` fall back to a demo path when no backend answers.

Grep for **"Prototype"** and **"demo"** in `mvp/src/` to find the fake spots in the UI.

---

## 1. Auth – Supabase Auth (or similar)

Nothing is really authenticated today; the UI just flips `store.role` and picks a demo persona.

- [ ] **Login** (`LoginModal` in `_app_03_shell.jsx`) – real email/password sign-in; derive the
  account's role (reporter vs firm) from the account, not a hardcoded default. Remove the
  "Prototype – jump straight in as" shortcut buttons. Note the current form is inert: the email
  and password fields go nowhere and the "Log in" button always calls `enterAsReporter`, so a
  firm signing in would land in the wrong dashboard. Real sign-in must route by the account's
  actual role.
- [ ] **Reporter signup** (`ClaimFlow` step 1, `_app_06_claim.jsx`) – real account creation tied
  to the claimed CSR record. (Currently email/password/mobile fields go nowhere.)
- [ ] **Persist the "Build your profile" form + make it editable later.** `ClaimFlow` step 4
  collects the full profile (bio, years, rate, proceedings, services, specialties, certifications,
  languages, coverage, rush, notary) but `finish()` just navigates – nothing is saved. And the
  dashboard profile tab (`ReporterProfileEditor`, `_app_07_reporter.jsx`) is a **read-only
  preview** with a faked "Save changes" button. Wire both to the reporter record: save on claim,
  and make the dashboard editor a real editable form (reuse the same fields/constants) so a
  reporter can update their profile after claiming.
- [ ] **Firm signup** (`FirmSignup`, `_app_06_claim.jsx`) – real account creation; persist the
  firm profile it collects (name, your name, role, location, size, practice areas, and the
  optional firm-wide-plan interest answer – see §8).
- [ ] **Sessions + role** – replace `store.role` / `enterAsReporter` / `enterAsFirm` / `logout`
  with real session state. `store.firmName` is currently in-memory only (set from signup).
- [ ] Password reset, email verification, "remember me".

## 2. Database – Supabase Postgres

All of these are in-memory (React state) or seed data and reset on refresh:

- [ ] **Reporter directory** – `buildDirectory()` merges the CRB stub list (`csr_profiles.js` /
  `data/csr_active_directory.csv`) with a small `CLAIMED` overlay in `_app_02_data.jsx`.
  Needs real tables: `reporters` (from the CRB import) + `reporter_profiles` (claimed data).
- [ ] **Claimed profile edits** – `ReporterProfileEditor` is a read-only preview and the
  `ClaimFlow` profile form isn't saved. Persist bio, proceedings, services, rates, coverage,
  languages, certifications, rush, photo.
- [ ] **Firm accounts** – persist what `FirmSignup` collects; `store.firmName` becomes a real field.
- [ ] **Saved reporters** (`store.saved`), **unlocked/connected reporters**
  (`store.unlockedReporters`), **invited firms** (`store.invitedFirms`).
- [ ] **Messages** – `SEED_CONVOS` / `store.convos` / `pushMessage` (see §4).
- [ ] **Invoices** – `SEED_INVOICES` / `store.invoices` / `addInvoice` / `updateInvoice` (see §3).
- [ ] **Plan state** – `store.firmPlan` (free/pro) and reporter Pro status come from real
  subscriptions (see §3), not a client toggle.
- [ ] **CRB data pipeline** – import the ~5,705 active CSRs and refresh periodically (license
  status + expirations). Match a signup to its CRB record on claim.

## 3. Payments – Stripe

Two serverless stubs already exist and fall back to demo behavior:
`mvp/api/connect/create-account` and `mvp/api/pay/create-payment-link`.

- [ ] **Reporter payouts – Stripe Connect** (`ClaimFlow` step 2) – real Express/Connect
  onboarding: identity/KYC, bank account, W-9. The "Continue to Stripe" button already calls
  `api/connect/create-account`; wire the real account link + redirect back.
- [ ] **Invoicing / getting paid** (`InvoiceDetail` in `_app_08_invoices.jsx`) – real payment
  links / hosted invoices accepting **card and ACH**. Already calls `api/pay/create-payment-link`.
- [ ] **Gate Connect onboarding at FIRST INVOICE (decided 2026-07-30), not at claim.** Keep
  listing/claim friction-free (no KYC just to appear in the directory); require the reporter to
  complete Express/Connect onboarding the first time they **send** an invoice / accept payment.
  Note the frontend send call currently does **not** pass the reporter's `connectedAccountId`, so as
  wired the money would not route to them – pass it (plus the platform `application_fee_amount`) on
  the real payment link/charge, and block the first send until onboarding is verified.
- [ ] **The platform fee** – take **2% (Pro) / 5% (Free)** via Connect `application_fee_amount`
  on each payment; pick the tier from the reporter's plan. (This is the site's stated pricing –
  see the money-comparison section + `open_strategic_decisions.md`.)
- [ ] **Default large invoices to ACH** – card fee (~2.9%) is the reporter's cost; ACH (~0.8%,
  cap $5) is far cheaper on big transcripts. Nudge/steer accordingly. (Roadmap item.)
- [ ] **Firm-side receive & pay** – the firm dashboard now has an **Invoices tab** (`FirmInvoices`,
  `_app_10_firm.jsx`) listing invoices addressed to the firm (`client === firmName`) with a **Pay
  now** button; paying is **simulated** today (flips status to paid). Wire it to the reporter's real
  Stripe hosted payment page (card/ACH) and update status from Stripe webhooks (the "pay online, not
  by check" value prop). A "Request an invoice" button also now sits on the reporter profile (firm
  view), in addition to Messages.
- [ ] **Subscriptions** – Stripe Checkout/Billing for the **firm Pro** tier (discovery) and the
  **reporter Pro** flat monthly. Drive `store.firmPlan` / reporter Pro from subscription status.
  - Firm plans: **$49/month per user** or **$539/year (1 month free)**; **firm-wide plans TBD**
    (demand-gauged at signup – see §8). Reporter Pro: **$29/month**.
- [ ] **Coupon stacking policy (DECIDED 2026-07-28):** founding-firm codes are **capped and
  private** (see founding-cohort policy), so **let them stack with the annual discount** – it's
  simpler to build, cleaner UX, and rewards exactly the early annual commitment we want, with
  exposure bounded by the code cap (not the discount depth). **Only restrict stacking for a future
  PUBLIC / uncapped promo** – there, gate coupons to monthly-only or first-term so they can't
  compound with the annual price.
- [ ] **Webhooks** – `account.updated` (Connect onboarding done → mark verified),
  `payment_intent` / `invoice` events (→ update invoice status), subscription events (→ plan).
- [ ] **Derive `overdue` from the due date (prototype gap).** Today an invoice's `overdue` status
  is static – seeded or set by hand; nothing flips a `sent` invoice to `overdue` when its `due`
  date passes. Wire a scheduled job (or a computed check) that transitions `sent → overdue` once
  `due` is in the past. The reporter Payments "Awaiting payment" card sums `sent` + `overdue`, so
  the total is right regardless, but the *overdue* label is meaningless until this is built.
  - **Open (validate with CSRs first): a payment-terms field.** Overdue keys off the CSR-set `due`
    date, which today is a raw date picker – there's no net-30/60/90 "terms" concept, and it's *not*
    auto net-30. Firms pay on their own AP cycle, so before leaning on "overdue," ask CSRs (user-test
    Open question R) whether they even set terms and whether flagging overdue is wanted. If yes,
    consider a **terms field** (net-N) that computes `due` from the service/send date; if no, overdue
    may not belong in the product at all. Don't build the terms field until CSR input lands.
- [ ] **The reporter's payout figure/date must come from Stripe, not a placeholder.** The prototype
  showed a hardcoded "Next payout: Jul 19", which the platform can't actually know – a firm pays
  whenever it pays, and the invoice due date is only a request. Replaced in the UI with **"Awaiting
  payment"** (sum of what firms owe). When wired, only show a real payout/arrival date from Stripe's
  in-transit estimate *after* a firm has actually paid – never a standing calendar date.
- [ ] **Quarterly roster refresh** – a scheduled job that re-pulls the CRB roster, diffs it,
  adds new licensees, refreshes unclaimed contact info, and freezes (not deletes) expired/
  retired licenses - never overwriting claimed profiles' self-entered data. Full spec + the
  claimed-profile-expiry notify/grace/billing-pause path: `roster_refresh_policy.md`.
- [ ] **Tax** – Stripe issues the reporter's year-end **1099-K** for what they collect (the
  "get your tax forms" value prop). Confirm thresholds; don't over-promise "we do your taxes".
- [ ] **Capture a rating after a paid invoice** (not before). Once payments are live, invite the
  firm to rate (and optionally comment on) the reporter after an invoice is paid - a verified
  transaction, which is the only kind of review worth publishing. **Store it, display nothing
  yet**: hold until a reporter has enough ratings to average, publish ratings before free-text
  comments, and keep every rating tied to a real paid job. Full reasoning: `reviews_and_ratings.md`.

## 4. Messaging & email – Resend/Postmark + realtime

- [ ] **Reporter → firm invites** – `InviteFirmModal` (`_app_07_reporter.jsx`) and invoice-as-invite
  (`_app_05` / `_app_08`). Two send paths, both to wire:
  - **Self-send (built, no backend needed):** the modal now offers **Copy message** / **Copy link**
    so the reporter pastes the invite into their *own* email or text. For firms the reporter already
    works with this is usually the best-delivering, most-trusted path – keep it prominent.
  - **Platform-send ("Send through Dewey Sholes") – currently simulated** ("no email is actually
    sent"). When wired: send server-side via the authenticated domain, but attribute to the reporter –
    **From:** `"<Reporter> via Dewey Sholes <invite@deweysholes.com>"`, **Reply-To:** the reporter's
    own email (so replies go to them). Requires SPF/DKIM/DMARC on the sending domain or it spam-folders
    (see the deliverability discipline in `open_strategic_decisions.md` §4). Contains the reporter's
    message + the personalized `/#/invite/<id>` link + create-account CTA. Firm name is now optional;
    only a valid email is required to send. Also wire the invoice/payment-link email.
- [ ] **CSR outreach campaign** – the claim invite to the ~5,145 independent CSRs (`mvp/docs/
  csr_email_outreach.md`, `data/email_campaign.csv`), recurring per state as we expand.
  **Send via a Google Workspace mail-merge tool (GMass / YAMM / Mailmeteor) – NOT Resend or
  Postmark.** Both ESPs' acceptable-use policies prohibit cold/unsolicited/scraped-list email and
  will suspend the account (which would also take down transactional sending on the same domain).
  The mail-merge tool sends from a real Workspace mailbox and manages the email **unsubscribe**
  (one-click header + auto suppression). Requirements: a **dedicated outreach identity** (ideally an
  `outreach.`/`go.` subdomain, or at minimum a non-primary address) so a rough campaign can't torch
  the primary domain's reputation; its own SPF/DKIM/DMARC; validate the list first (low bounces);
  **warm up + drip over days**, not big same-day batches; CAN-SPAM (physical address + honored
  opt-out). **Transactional app email stays on Resend** (invites-accepted, invoices, receipts,
  notifications) – that's permission-based and AUP-fine.
- [ ] **"Remove my unclaimed listing" requests – a SEPARATE, data-side flow** (not an email-tool or
  CRM job). A reporter asking to be taken off the directory is a data request, not an email
  unsubscribe: a link to `support@deweysholes.com` (or a small form) → flag that reporter as
  **suppressed / do-not-list** in the directory data → the **quarterly CRB refresh must honor the
  suppression** so they aren't re-added on the next sync (see `roster_refresh_policy.md`). Handle
  manually while solo; build a one-tap request link on unclaimed profiles when the backend lands.
  HubSpot is **not** the tool for this (it's a sales CRM, not the directory DB) – don't add it.
- [ ] **In-app messaging** (`MessagingPage`, `_app_09_messaging.jsx`) – persist threads and make
  them real-time (Supabase Realtime). Async threads, not live chat.
- [ ] **Notifications** – new message, invoice paid, invite accepted, favorite job alerts.
  Web Push (PWA) primary + **email fallback**, NO SMS. Delivery reliability: DB-triggered sends,
  delivery webhooks, retries; Postmark as a Resend fallback. (See
  `governance-and-process/messaging_and_notifications_plan.md`.)
- [ ] **Transactional email** – welcome, verification, password reset, receipts.
- [ ] **"You're featured this week" email** (Aud, 2026-07-21). Featured slots rotate weekly
      (`weeklyFeatured`, `_app_02_data.jsx`), so the three reporters up that week can be emailed
      on the same schedule. Cheap to run - three recipients a week - and it's genuinely good
      news, which makes it one of the few emails a reporter will be pleased to get.

      Design notes: the rotation is deterministic from the week number, so a scheduled job can
      compute the same set the site shows without extra state. Include something concrete
      (profile views that week) so it isn't an empty congratulation, and use the moment for the
      "invite the firms you already work with" ask, which is the growth engine. Needs the usual
      unsubscribe/preferences handling. Note it also feeds the activity signal: an email that
      brings a reporter back is a sign-in, which is what "Recently active" measures - a real
      loop, but one to keep honest rather than to farm.

## 5. Search & the firm gate (server-side)

- [ ] **Search/filter** – today it's a client-side filter over the full dataset in
  `ReporterDirectory` (fine for ~5,705). At statewide/multi-state scale, move to server-side
  search + pagination (Postgres full-text / filters).
- [ ] **Firm gate** – `firmLocked()` blurs non-connected claimed profiles for free firms. This
  is client-only today; enforce on the server (don't ship full claimed data to a free firm).
- [ ] **Rate visibility (added 2026-07-30)** – reporter rates are **opt-in** (`publishRates`) and shown
  **only to paying (Pro) firm members** (plus the reporter's own preview); hidden from other reporters,
  free firms, and logged-out visitors, who all see "Rates provided on request" and must message to ask.
  Client gate today (`canSeeRate` in `_app_05_directory.jsx` = `isOwner || (firm && pro)`); **enforce
  server-side too – never send a rate (or the whole `rates` object) to an unauthorized viewer.**
  Rates are a **structured object** now (`rates`, keyed by `RATE_FIELDS` in `_app_02_data.jsx` –
  per-diem half/full, original/copy per page, transcription, realtime, rush, rough draft; fields from
  the CSR rate research, values reporter-entered) shown in a dedicated **profile body section**, not
  the sidebar. Onboarding collects `rates` + `publishRates` (`ClaimFlow`, `_app_06_claim.jsx`; the
  opt-in toggle appears once any rate is entered); persist both and add the same builder+toggle to the
  dashboard profile editor. Keeping DS rate-neutral (opt-in, firm-only) also supports the
  reporter-independence / AB-5 §2778 argument.
  - **Store rates as number + unit, not display strings.** The prototype saves rates as free-text
    (`"$4.50"`, `"$1.25/pg"`, `"+50%"`), and the invoice builder's rate-prefill (Tier 1) parses them
    back to numbers at use time (`parseRate` in `_app_08_invoices.jsx`). When persisting for real,
    store a numeric value + a unit/type (per-page $, per-diem $, hourly $, or **percentage** for
    rush/expedited) so the invoice builder and any future surcharge calculator don't have to parse
    text. The builder pre-fills a line's rate from the reporter's own saved rate where the template
    line maps to one (`rateKey` → `RATE_FIELDS`); **Tier 2 (deferred):** a percentage-surcharge
    calculator (expedited/rush computed off the transcript subtotal) – kept manual for now.
- [ ] **Work mode + location filtering (added 2026-07-30).** The claim form now captures a
  **work mode** (`workMode`: "both" = in person and remote, or "remote" = remote only), an editable
  **city/county** (prefilled from the CRB record), in-person **coverage counties** (only when
  "both"), and a **baseState** (only when "remote", for out-of-CA transcriptionists). Persist these.
  The directory filter is now **work-mode-aware (done 2026-07-30):** a **county** filter skips
  `workMode: "remote"` reporters in `matchesCriteria` (`_app_05_directory.jsx`), while service /
  remote / general searches still include them - so an out-of-state remote transcriptionist stays
  findable for CA remote work without polluting local in-person county searches. Priyanka (900003)
  is seeded remote-only to demo it. **Still to wire (backend):** persist the claim form's `workMode`,
  in-person `coverage`, `baseState`, and edited `city`/`county` so real claimed reporters carry them
  (the prototype `finish()` discards them today).

## 6. Infra & housekeeping

- [ ] Env/secrets: Stripe keys, Supabase URL/keys, Resend key (Vercel env).
- [ ] Files stay **pass-through links only** – no upload/storage (per Terms). Keep it that way.
- [ ] Attribution for the outreach claim links (which reporters claimed from the email).
- [ ] **Legal gates before real money moves:** the deposition-neutrality check (TO-DO) and a
  terms-of-service review – see `mvp/docs/open_strategic_decisions.md` and
  `mvp/docs/legal_question_deposition_neutrality.md`.

## 7. Data exposure / reporter PII (fixed 2026-07-28 – keep it fixed)

**What happened:** Vercel serves the whole `mvp/` root, so internal working files were publicly
downloadable. `dsmvp.vercel.app/data/email_campaign.csv` and `.../data/csr_active_directory.csv`
exposed **~5,700 reporters' raw emails and street addresses** in one request – a ready-made spam
list, worse than crawling. `docs/` and `marketing/` (internal strategy) were public too.

**Fixed by:** `mvp/.vercelignore` (excludes `data/ docs/ marketing/ src/ scripts/ supabase/` + loose
internal files – only `index.html`, `csr_profiles.js`, `graphics/` ship); `data/*.csv`
gitignored + `git rm`'d; `csr_profiles.js` now ships **masked** emails only (`m***@domain`, via
`data/generate_profiles.py`); the "Public email" row was removed from the UI (contact only via
"Invite this reporter"); `robots.txt` disallows the sensitive paths.

**Build-cost note (2026-07-28):** `api/` **and `package.json` are also `.vercelignore`d** — not for
privacy but for **cost**. Deploying them made Vercel run `npm install` (Stripe + Supabase SDKs) and
bundle 6 serverless functions on *every* push, burning most of the build CPU minutes. The prototype
doesn't need them live (the one caller, `api/connect/create-account`, degrades to a demo fallback).
**When you wire the real backend, REMOVE `api/` and `package.json` from `.vercelignore`** so the
functions deploy again.

**Still owed / keep honest:**
- [ ] **Real emails server-side only.** When the backend lands, the reporter's real address lives in
  the DB/`api/` layer, **never** in `csr_profiles.js`, the client bundle, or any public API/JSON.
  Contact stays relayed (invite/message) so the address is never handed to a firm. Rate-limit +
  Vercel/Cloudflare WAF on any endpoint that could enumerate reporters.
- [ ] **The two PII CSVs remain in git *history*** (private repo). If the repo is ever made public,
  scrub with `git filter-repo`/BFG first.
- [ ] **Preflight gate:** `scripts/preflight.py` should fail the deploy if `csr_profiles.js` contains
  a raw email (`@` with a multi-char local part) or if any `data/*.csv` / `docs/` / `marketing/`
  file would be served. Add before the first public launch.
- [ ] After each deploy, spot-check that `/data/…`, `/docs/…`, `/marketing/…` return 404.

## 8. Product analytics & usage events (foundation for recommendations)

Nothing is instrumented today. Capturing behavior is the prerequisite for the **personalized
reporter recommendations** now sold as a paid firm feature, and for building usage personas.
Do it early (per Jay Hariani's "instrument usage data now").

- [ ] **Events table in Supabase** – log key actions as `{user_id, role, event, target, ts}`:
  directory search, profile view (claimed vs public), invite sent/accepted, save, message sent,
  invoice created/paid, plan upgrade. This raw log feeds recommendations + persona analysis.
  Supabase **stores** it but does not build personas for you – that's analysis on top.
- [ ] **Recommendations** – derive "suggested for your firm" from this behavior (paid > saved >
  messaged), labeled with the reason. See the directory-personalization direction
  (`project_directory_personalization` in memory): validate with lawyers first; shelved for build.
- [ ] **Product analytics tool (optional)** – PostHog's free tier fits behavior/funnels/cohorts far
  better than a CRM; use it or query Supabase directly. A CRM (HubSpot) is **not** this – it's for
  leads/outbound, a separate and later need. Don't stack tools early (each is a recurring bill).
- [ ] **Firm-wide-plan demand signal** – `FirmSignup` now collects `form.teamInterest` (the optional
  "would a firm-wide plan interest you?" question), but `finish()` discards it. Persist it so we can
  gauge demand for the future firm-wide tier before building it.
- [ ] **Marketing / CRM (later, only if needed)** – if HubSpot is adopted, integrate only what should
  be automated (push signups/contacts via its API or tracking script); a hand-managed list needs no
  site integration. Add selectively when campaign volume justifies it.
- [ ] **Privacy** – behavior tracking must be disclosed in the privacy policy, and **CCPA** applies
  (California users). Don't instrument silently.
