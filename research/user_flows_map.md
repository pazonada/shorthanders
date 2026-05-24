# Dewey Sholes – User flows map

**Last updated:** 2026-05-14
**Status:** Prototype audit – what exists vs. what's needed for real build

---

## CSR (court reporter) flows

### Onboarding (9 screens) – COMPLETE in prototype

```
Welcome/pitch
  |
  v
Account type ─── Individual ($99/yr)
  |                  └── Firm ($79/reporter/yr, 3-10 reporters) – deferred
  v
[Step 1] Credentials
  CSR license #, method (steno/voice), certifications, languages, court-employed status
  |
  v
[Step 2] Preferences
  Job types (live/transcription), case types, courts served, turnaround capabilities
  |
  v
[Step 3] Case history
  Add recent cases (name, number, court, date, role) – up to 10
  |
  v
[Step 4] Payment & notifications
  Stripe bank connect, listing fee explanation, phone #, SMS/email toggles
  |
  v
[Step 5] Create account
  Name, email, password, IC agreement notice
  |
  v
Invite colleagues
  Search CRB database by name/CSR#, select to invite, skip option
  |
  v
Success
  Verification pending, what happens next, profile summary,
  founding-reporter welcome callout (no promo code – non-pricing perks
    per governance-and-process/founding_member_program.md),
  PWA install instructions
  |
  v
[Reporter Dashboard]
```

### Reporter dashboard – COMPLETE in prototype

```
Dashboard
  |
  ├── [Tab] Available jobs
  |     Filters: county, turnaround, type
  |     Job cards: match %, court, case type, date, earnings
  |     Actions: Accept / Decline (expandable detail)
  |
  ├── [Tab] My active jobs
  |     Deadlines widget
  |     Status: Transcribing / In review / Delivered
  |     Actions: Message attorney, Upload transcript, Release job,
  |              Withdraw & re-upload, Mid-job check-in
  |     Release job modal: reason, when-did-you-know
  |
  ├── [Tab] Calendar
  |     Unified view: DS jobs + external jobs + onboarded cases
  |     Add external job modal (court appointment, direct hire, agency)
  |     Color-coded: DS (blue), external (orange), past (gray)
  |
  └── [Tab] Earnings
        Stats: this month, pending, completed
        Monthly bar chart
        Recent payouts table

Sidebar always shows:
  - Quick stats (available jobs, active, earned)
  - Rating card (4.7 overall + sub-ratings)
  - Profile completion nudge
  - PWA install prompt (dismissible)
  - Referral card (tiered rewards)
```

### CSR rate-setting (open marketplace) – COMPLETE in prototype (revised 2026-05-24)

```
Settings → Profile (CSR view) → Your rates panel
  |
  v
Per-rate numeric inputs:
  - Per page (original)
  - Half-day live attendance
  - Full-day live attendance
  - Trial day
  - Travel time (per hour)
  |
  Each input shows:
    "Most charge ~$X" sub-label sourced from PRICING baseline
    No platform-imposed cap, no slider, no band
  |
  v
"Need help setting rates?" link (v1.1 PREVIEW in prototype)
  Click to expand inline popover showing:
    - Median + 25–75th percentile range for comparable reporters
    - Case-type filter (general / family / civil / probate /
      criminal / WC / PI / employment)
    - Scope label (county → adjacent counties → statewide)
    - "v1.1 preview" badge + "Coming in v1.1 once enough
      reporters have joined" note
  Cold-start baselines used until real data exists (see
  governance-and-process/rate_guidance_helper_policy.md)
  |
  v
Per-card sub-label below the rates grid:
  "These reflect what most CA reporters charge today – you set
   your own rate, and you keep 100% of it. The 12% platform fee
   attorneys pay is calculated on top of your rate – it never
   comes out of your earnings."

Status: input grid works in prototype. State local to SettingsPage.
  Real build persists per-rate fields on the CSR record. Helper
  popover ships as v1.1 once we have aggregation infrastructure
  (daily snapshot job, county-adjacency table, percentile compute).
```

See `governance-and-process/matching_applicant_pool_policy.md` for
the matching model this rate-setting plugs into. Old hybrid ±20% /
±50% rate-band design retired 2026-05-24 in favor of the open
marketplace. `governance-and-process/rating_and_matching_policy.md`
preserves the band design as a deferred-fallback if open marketplace
doesn't pan out.

### CSR flows: WHAT'S MISSING for real build

```
!! Transcript upload + certification flow
   CSR needs to: upload file, confirm page count,
   sign certification ("I certify under penalty of perjury..."),
   submit for delivery
   Status: NOT in prototype – critical path

!! Job alerts → apply flow → applicant pool
   CSR gets notified (push / email; favorites get louder push + email
   defaulted on), reviews job details on Available jobs view, clicks
   Apply if interested. Application sits in firm's review pool.
   Status: Available jobs + Apply UI exists in prototype. Server-side
   application persistence + notification trigger pipeline not wired.

!! Selection notification → confirm availability
   When firm selects a CSR, CSR gets push + email: "[Firm] selected
   you for [case]. Confirm within [1h Rush / 4h Expedited /
   12h Standard]."
   Status: Your Applications tab in prototype shows the selected
   state with Confirm + Decline buttons (mock). Real timer + state
   machine not wired.

!! Profile editing (post-onboarding)
   Update credentials, availability, courts, rates, bio, photo
   Status: profile completion nudge exists but no edit flow

!! Payment setup / Stripe onboarding
   Real Stripe Connect identity verification, bank account linking
   Status: button exists in onboarding but no real flow

!! W-9 submission
   Upload W-9 before first payout (per policy: at first payout, not signup)
   Status: NOT in prototype

!! Grievance / dispute response
   CSR receives correction request from attorney, reviews flagged sections,
   uploads corrected transcript
   Status: NOT in prototype

!! License renewal reminder
   Platform notifies CSR when license approaching expiration
   Status: NOT in prototype (admin compliance tab tracks this)
```

---

## Attorney / law firm flows

### Onboarding (8 screens) – COMPLETE in prototype

```
Welcome/pitch
  |
  v
[Step 1] About you & firm
  Name, email, firm name, phone
  |
  v
[Step 2] Practice
  CA bar number, practice areas (10 checkboxes)
  |
  v
[Step 3] Courts & workflow
  Courts served, current transcript ordering method
  |
  v
[Step 4] Favorite reporters
  Search CRB database, favorite/invite reporters
  |
  v
[Step 5] Billing & notifications
  Billing preference (per-order / monthly), notification toggles
  |
  v
[Step 6] Password
  Password, confirm, terms agreement
  |
  v
Success
  Bar verification pending, what happens next, profile summary,
  founding-firm welcome callout (no promo code – non-pricing perks
    per governance-and-process/founding_member_program.md)
  |
  v
[Buyer Dashboard]
```

### Order flow (5 steps + applicant-pool review) – COMPLETE in prototype (revised 2026-05-24)

```
[Step 1] Type selection
  Live attendance  ──or──  Post-hearing transcription
  |                              |
  v                              v
[Step 2] Case & hearing details
  Court, dept, case #, case name, case type
  *Internal matter / client reference (optional, free text)*
    → appears on invoice for firm-side AP reconciliation
    → see governance-and-process/billing_and_payment_policy.md
  Live: date, time               Transcription: audio upload
  Duration, interpreter toggle
  |
  v
[Step 3] Reporter preference
  Open marketplace (default) / From favorites first / Top rated
  |
  v
[Step 4] Turnaround & pricing
  Rush (1-2 business days, 1.5x) / Expedited (3-5d, 1x) / Standard (6+ d, 0.85x)
  Price estimate breakdown – uses platform baseline since CSR
    hasn't been selected yet; footnote notes actual cost depends on
    the reporter you select
  Application window per turnaround tier shown:
    Rush 4h · Expedited 24h · Standard 72h
  Fee waiver checkbox
  Cost split toggle → add co-payers (name, email, share %)
  |
  v
[Step 5] Review & submit
  Full summary (incl. matter reference if filled), cost-split party
    list (if applicable)
  Submit button → handleSubmitOrder() → setSubmitted(true)
  |
  v
Confirmation
  "Order posted!" headline (not "Order confirmed!" – the order is
    open for applications, no reporter assigned yet)
  Order #, "Qualified reporters can apply during your [4h / 24h / 72h]
    application window"
  What-happens-next steps reference the applicant-pool flow:
    1. Qualified reporters apply during the window.
       Reporters you've favorited get a louder alert.
    2. Review applicants live on your dashboard – profile, rating,
       and rate for each. Select whoever you want at any time.
    3. Your selected reporter confirms availability, and the job
       locks in.
  Primary CTA: [Review applicants →] → #/order/applicants/:orderId
  Secondary CTA: [View dashboard]
  |
  v
[Review Applicants screen] (#/order/applicants/:orderId)
  Order metadata header: case name, jurisdiction, case type
  Status banner: "X reporters have applied · Y from your favorites ·
    Application window: Zh remaining of Wh. You can select any time."
  Sort: favorites first / rate low-high / rate high-low / rating /
    completed jobs
  Filter: favorites-only checkbox
  Per-applicant card:
    Avatar + name + CSR # + rating + on-time + jobs + city
    Certifications + specialty chips
    Per-page · half-day · full-day · trial-day rates
    [Select firstName →] [View full profile] [Message]
    Favorite badge + yellow border + gold avatar background
      if applicant is in firm's favorites set
  Select → confirmation modal → "Selected" screen
    Selected CSR notified to confirm within
      1h Rush / 4h Expedited / 12h Standard
  Live: firm can view + select any time, no gate.
    More applicants can keep arriving until firm selects.
```

**No veto window.** No "you have N hours to confirm or veto" screen.
No "the firm chose another reporter" message to applicants. No 3-veto
budget. The firm reviews the actual applicant pool and picks; the
selected CSR confirms; non-selected CSRs see the status change
silently in their Your Applications view (no push, no email).

See `governance-and-process/matching_applicant_pool_policy.md` for
the canonical policy describing this flow.

### Buyer dashboard – COMPLETE in prototype

```
Dashboard
  |
  ├── [Tab] My cases (default)
  |     Quick stats: active orders, pending review, avg turnaround, spend
  |     Search, status filter, case type filter
  |     Case cards → Case detail view:
  |       Order history, timeline, reporter profiles
  |       Delivered: review transcript, accept delivery, request correction
  |       Case notes
  |
  ├── [Tab] Find reporters (→ #/reporters directory)
  |     Search, filters (county, specialty, sort, favorites-only)
  |     Reporter cards: book now, favorite
  |     → Full reporter profile page (#/reporters/:id)
  |
  ├── [Tab] Messages (→ #/messages)
  |     Split pane: conversation list + chat
  |     Search, unread counts, online status
  |     Order context panel
  |
  ├── [Tab] Billing
  |     Payment methods, billing address
  |     Invoice history with download
  |     Transparent pricing callout
  |
  ├── [Tab] Calendar
  |     Month view with hearing/delivery events
  |
  ├── [Tab] Analytics
  |     Monthly spending chart, spending by case type
  |     Metrics: total spent, avg per order, avg turnaround
  |
  └── [Tab] Team
        Team members with roles (Admin, Attorney, Paralegal, Legal Asst.)
        Invite member button
```

### Additional attorney flows – COMPLETE in prototype

```
Request copy flow (#/request-copy) – 4 steps
  Search case → Review details → Pricing ($0.20/page + 12%) → Confirmation

Transcript viewer – full-screen overlay
  Title page, appearances, testimony, certification
  Zoom, page nav, print/download

Invoice view – full-screen overlay
  Itemized invoice with print/download

Order detail page (#/order/:id)
  Timeline, reporter info, documents, invoice summary
```

### Attorney flows: WHAT'S MISSING for real build

```
!! Delivery acceptance / auto-release flow
   Attorney reviews transcript, accepts or requests correction.
   If no response in 2 business days, auto-releases payment.
   Status: buttons exist in case detail but no real flow/timer

!! Correction request flow
   Attorney flags specific sections, reporter gets notified,
   reporter uploads corrected version
   Status: NOT in prototype – just an alert() placeholder

!! Cost-split co-payer experience
   Co-payer receives email link, sees case details and their share,
   enters payment info (guest checkout), confirms
   Status: ordering attorney side done, CO-PAYER side NOT in prototype

!! Firm admin: manage team permissions
   Add/remove team members, set roles, control access
   Status: team tab shows members but no management actions

!! Rating / review flow
   After delivery accepted, attorney rates the reporter
   Status: NOT in prototype

!! Re-order / repeat order
   Quick re-order from a previous case with same details
   Status: NOT in prototype

!! Fee waiver / TRF paperwork generation
   Auto-generate TRF reimbursement paperwork on delivery
   Status: NOT in prototype (checkbox exists but no output)
```

---

## Shared flows

### COMPLETE in prototype

```
Messaging (#/messages)
  Split-pane inbox, conversation search, date separators,
  read receipts, typing indicator, attachment button, mobile responsive

Chat panel (slide-in)
  Available from dashboard and order detail pages

Settings (#/settings)
  Profile, Notifications, Security (password, 2FA, sessions), Billing

Notifications (bell icon)
  6 notification types with unread count

Sign-in modal
  Role selection (attorney / reporter) → redirect to respective dashboard

Dark mode toggle
  Full dark mode support across all screens
```

### WHAT'S MISSING for real build

```
!! Account management (both CSR + attorney)
   Edit profile: name, email, phone, firm, photo, bio, credentials
   Change password (in settings – exists in prototype but not functional)
   Update payment methods (add/remove cards, update bank info)
   Pause account: temporarily hide from marketplace (CSR: stop receiving
     job notifications, profile hidden from directory; attorney: no new orders)
     → "Reactivate" button when ready to come back
   Delete/close account:
     → Confirmation flow: "Are you sure?" with consequences listed
     → Check for open orders/active jobs – must resolve before closing
     → Data export: download your data before deletion (CCPA requirement)
     → Grace period: 30 days to reactivate before permanent deletion
     → Per our custody policy: attorney transcript copies retained 90 days
       post-closure, CSR notes/files are their own responsibility
   Status: Settings page exists in prototype with profile/security tabs
           but none of this is functional

!! Support / help flows
   Report an issue:
     → From any screen: "Help" button or menu item
     → Issue categories: billing problem, technical issue, report a user,
       transcript quality concern, payment not received, other
     → Form: category, description, optional screenshot upload,
       order/job # reference (auto-populated if from an order context)
     → Confirmation: ticket #, expected response time
   Request support:
     → Live chat (stretch goal) or email support
     → FAQ link as first-line deflection
   Report a user:
     → From reporter profile or message thread
     → Reason: unprofessional conduct, missed deadline, harassment,
       inaccurate credentials, other
     → Admin notified for review
   Status: Contact page exists (#/contact) but no in-app support flow

!! CSR listing fee management
   Annual renewal reminder (30 days, 7 days, expired)
   Payment failed → grace period → profile hidden → account suspended
   Upgrade/downgrade: individual ↔ firm tier
   Renewal receipt / invoice
   Status: NOT in prototype

!! Founding-member tagging (segmentation only, no price logic)
   Users who sign up during the launch window get tagged in the DB:
     founding_member = true
     joined_cohort   = "launch-2026"
   Set at signup based on created_at falling within launch window.
   No pricing tier, no rate-lock, no expiration. Tag is used purely
   for internal segmentation (admin dashboards, CRM exports, founder
   feedback touchpoints).
   Dashboard banner: "Founding firm / founding reporter" – feature
   highlight only, no rate claim.
   Per the 2026-05-14 pricing reset, the prior pilot-pricing tier (8%
   firms / waived $99 CSRs / Year-1 rate-lock + expiration emails)
   was retired. Everyone pays the standard 12% buyer fee and $99/yr
   listing fee from day one.
   See ../governance-and-process/founding_member_program.md for the
   rationale and the full tag schema.
   Status: founding-firm / founding-reporter banners shown in prototype
           dashboards; tag schema not yet wired into the real build.

!! Data export (CCPA compliance)
   User requests export of all their data
   Platform generates downloadable archive (profile, orders, transcripts,
   messages, payment history)
   Required under CCPA for CA residents
   Status: NOT in prototype

!! Onboarding email sequence
   Welcome email after signup
   "Complete your profile" reminder (if incomplete after 48 hours)
   "Your verification is complete" confirmation
   "Your first job is waiting" (when a matching job is posted)
   Status: NOT in prototype

!! Email notification system
   Transactional emails: order confirmation, reporter assigned,
   transcript delivered, payment received, cost-split invitation,
   co-payer confirmation, license expiration warning
   Status: NOT in prototype (notification preferences exist but no actual emails)

!! Push notification system (PWA)
   Firebase Cloud Messaging integration
   New job available, message received, payment arrived
   Status: PWA install prompts added to prototype, but no actual push implementation

!! Password reset flow
   Forgot password → email → reset
   Status: NOT in prototype

!! Real payment processing
   Stripe integration: card payments, ACH, Stripe Connect for CSR payouts
   Status: NOT in prototype (placeholders only)

!! File upload / download
   Actual file handling: audio upload (attorney), transcript upload (CSR),
   transcript download (attorney), signed URLs, access control
   Status: NOT in prototype (UI exists but no real file handling)

!! Search / discovery
   Global search across cases, orders, reporters, messages
   Status: per-tab search exists but no unified search
```

---

## Admin flows

### COMPLETE in prototype

```
Admin dashboard (#/admin)
  |
  ├── [Tab] Overview
  |     Metrics: orders, reporters, attorneys, turnaround, revenue, satisfaction
  |     Monthly orders chart
  |
  ├── [Tab] Verifications
  |     Filter by status, reporter verification queue
  |     Actions: approve / flag
  |
  ├── [Tab] CSR Database
  |     Stats: total CSRs (4,733), Bay Area (618), on platform (47)
  |     Sync status, expiration monitoring
  |
  └── [Tab] Compliance
        Regulatory checklist: license verification, statutory rates,
        certification, retention, CCPA, renewals
```

### WHAT'S MISSING for real build

```
!! User management
   View/edit/suspend user accounts (attorneys + CSRs)
   Status: NOT in prototype

!! Financial reporting
   Revenue dashboard, fee collection, payout tracking, refunds
   Status: NOT in prototype

!! Dispute management
   View/manage correction requests, grievances, refund requests
   Status: NOT in prototype

!! Content moderation
   Review flagged profiles, messages, or uploaded content
   Status: NOT in prototype

!! Platform configuration
   Manage pricing, turnaround tiers, courts, case types
   Status: NOT in prototype (hardcoded in PRICING constant)
```

---

## Public pages

### COMPLETE in prototype

```
Landing page (#/)
  Hero, how it works, use cases, pricing, comparison,
  compliance, SRL section, TRF callout, pricing calculator,
  social proof, footer

Static pages:
  FAQ (#/faq) – accordion Q&A for attorneys, reporters, general
  About (#/about) – problem, solution, founders
  Terms (#/terms) – 8-section TOS draft
  Privacy (#/privacy) – 7-section privacy policy draft
  Contact (#/contact) – form + office info
  TRF info (#/trf) – Transcript Reimbursement Fund details
```

---

## Priority build order for real site

### Must-have for launch (Month 1 build)

| # | Flow | Why |
|---|------|-----|
| 1 | Auth (signup + login + password reset) | Can't do anything without accounts |
| 2 | CSR onboarding (real form → database) | Need supply before demand |
| 3 | Attorney onboarding (real form → database) | Need buyers |
| 4 | Order creation (real form → database) | Core transaction |
| 5 | Job notification + acceptance (CSR side) | CSR needs to see and accept jobs |
| 6 | Transcript upload + certification (CSR side) | CSR needs to deliver the work |
| 7 | Delivery review + acceptance (attorney side) | Attorney needs to receive and approve |
| 8 | Payment processing (Stripe) | Everyone needs to get paid |
| 9 | File security (signed URLs, RLS, encryption) | Non-negotiable for legal industry |
| 10 | PWA + push notifications | CSRs need instant job alerts |
| 11 | Email notifications (transactional) | Users need to know what's happening |
| 12 | Profile editing (both roles) | Users need to update their info post-onboarding |
| 13 | Report an issue / request support | Users need a way to get help |

### Should-have for launch (Month 2)

| # | Flow | Why |
|---|------|-----|
| 14 | Cost-split co-payer guest checkout | Key differentiator per Rosie |
| 15 | Messaging (real-time) | Attorneys and CSRs need to communicate |
| 16 | Correction request flow | Errors happen, need a process |
| 17 | Rating/review after delivery | Trust signal for marketplace |
| 18 | Reporter referral tracking | Growth channel |
| 19 | Pause account | CSRs going on vacation, attorneys between cases |
| 20 | CSR listing fee renewal + billing | Annual $99 fee management, grace periods |

### Nice-to-have (Month 3+)

| # | Flow | Why |
|---|------|-----|
| 21 | Analytics dashboard (attorney) | Value-add, not critical |
| 22 | Team management (firm admin) | Multi-user firms |
| 23 | Admin dispute management | Handle edge cases |
| 24 | Request copy flow | Secondary revenue stream |
| 25 | Re-order / repeat order | Convenience feature |
| 26 | TRF paperwork generation | Fee waiver support |
| 27 | Admin financial reporting | Business intelligence |
| 28 | Delete/close account + data export (CCPA) | Regulatory requirement, but low volume at launch |
| 29 | Report a user | Trust & safety, low priority until scale |
| 30 | Onboarding email sequence | Activation optimization |
