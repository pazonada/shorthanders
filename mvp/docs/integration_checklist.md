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
  firm profile it collects (name, your name, role, location, size, practice areas).
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
- [ ] **The platform fee** – take **2% (Pro) / 5% (Free)** via Connect `application_fee_amount`
  on each payment; pick the tier from the reporter's plan. (This is the site's stated pricing –
  see the money-comparison section + `open_strategic_decisions.md`.)
- [ ] **Default large invoices to ACH** – card fee (~2.9%) is the reporter's cost; ACH (~0.8%,
  cap $5) is far cheaper on big transcripts. Nudge/steer accordingly. (Roadmap item.)
- [ ] **Firm payment methods** – collect card/ACH so firms can pay invoices online (the "pay
  online, not by check" value prop).
- [ ] **Subscriptions** – Stripe Checkout/Billing for the **firm Pro** tier (discovery) and the
  **reporter Pro** flat monthly. Drive `store.firmPlan` / reporter Pro from subscription status.
  - Firm plans: **$39/month** or **$429/year (1 month free)**. Reporter Pro: **$29/month**.
- [ ] **Coupon stacking policy (DECIDED 2026-07-28):** founding-firm codes are **capped and
  private** (see founding-cohort policy), so **let them stack with the annual discount** – it's
  simpler to build, cleaner UX, and rewards exactly the early annual commitment we want, with
  exposure bounded by the code cap (not the discount depth). **Only restrict stacking for a future
  PUBLIC / uncapped promo** – there, gate coupons to monthly-only or first-term so they can't
  compound with the annual price.
- [ ] **Webhooks** – `account.updated` (Connect onboarding done → mark verified),
  `payment_intent` / `invoice` events (→ update invoice status), subscription events (→ plan).
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
- [ ] **CSR outreach campaign** – the one-time claim invite to the 5,145 independent CSRs
  (`mvp/docs/csr_email_outreach.md`, `data/email_campaign.csv`). Either send via a mail-merge
  tool (GMass/YAMM through Workspace) or programmatically (Resend) – domain auth (SPF/DKIM/
  DMARC), warm-up, drip, CAN-SPAM basics.
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

## 6. Infra & housekeeping

- [ ] Env/secrets: Stripe keys, Supabase URL/keys, Resend key (Vercel env).
- [ ] Files stay **pass-through links only** – no upload/storage (per Terms). Keep it that way.
- [ ] Attribution for the outreach claim links (which reporters claimed from the email).
- [ ] **Legal gates before real money moves:** the deposition-neutrality check (TO-DO) and a
  terms-of-service review – see `mvp/docs/open_strategic_decisions.md` and
  `mvp/docs/legal_question_deposition_neutrality.md`.
