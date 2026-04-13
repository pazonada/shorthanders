# Dewey Sholes — User flows map

**Last updated:** 2026-04-11
**Status:** Prototype audit — what exists vs. what's needed for real build

---

## CSR (court reporter) flows

### Onboarding (9 screens) — COMPLETE in prototype

```
Welcome/pitch
  |
  v
Account type ─── Individual ($99/yr, waived in pilot)
  |                  └── Firm ($79/reporter/yr, 3-10 reporters)
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
  Add recent cases (name, number, court, date, role) — up to 10
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
  promo code PIONEER2026, PWA install instructions
  |
  v
[Reporter Dashboard]
```

### Reporter dashboard — COMPLETE in prototype

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

### CSR flows: WHAT'S MISSING for real build

```
!! Transcript upload + certification flow
   CSR needs to: upload file, confirm page count,
   sign certification ("I certify under penalty of perjury..."),
   submit for delivery
   Status: NOT in prototype — critical path

!! Job matching notification → acceptance
   CSR gets notified (push/SMS/email), reviews job details,
   accepts or declines with reason
   Status: acceptance exists but no notification trigger flow

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

### Onboarding (8 screens) — COMPLETE in prototype

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
  promo code ATTORNEY2026
  |
  v
[Buyer Dashboard]
```

### Order flow (5 steps) — COMPLETE in prototype

```
[Step 1] Type selection
  Live attendance  ──or──  Post-hearing transcription
  |                              |
  v                              v
[Step 2] Case & hearing details
  Court, dept, case #, case name, case type
  Live: date, time               Transcription: audio upload
  Duration, interpreter toggle
  |
  v
[Step 3] Reporter preference
  Auto-match (recommended) / From favorites / Top rated
  |
  v
[Step 4] Turnaround & pricing
  Rush (24-48h, 1.5x) / Expedited (3-5d, 1x) / Standard (2+ wk, 0.85x)
  Price estimate breakdown
  Fee waiver checkbox
  Cost split toggle → add co-payers (name, email, share %)
  |
  v
[Step 5] Review & submit
  Full summary, cost-split party list (if applicable)
  Submit button
  |
  v
Confirmation
  Order #, what happens next (3 steps), dashboard link
```

### Buyer dashboard — COMPLETE in prototype

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

### Additional attorney flows — COMPLETE in prototype

```
Request copy flow (#/request-copy) — 4 steps
  Search case → Review details → Pricing ($0.20/page + 12%) → Confirmation

Transcript viewer — full-screen overlay
  Title page, appearances, testimony, certification
  Zoom, page nav, print/download

Invoice view — full-screen overlay
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
   Status: NOT in prototype — just an alert() placeholder

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
  FAQ (#/faq) — accordion Q&A for attorneys, reporters, general
  About (#/about) — problem, solution, founders
  Terms (#/terms) — 8-section TOS draft
  Privacy (#/privacy) — 7-section privacy policy draft
  Contact (#/contact) — form + office info
  TRF info (#/trf) — Transcript Reimbursement Fund details
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

### Should-have for pilot (Month 2)

| # | Flow | Why |
|---|------|-----|
| 12 | Cost-split co-payer guest checkout | Key differentiator per Rosie |
| 13 | Messaging (real-time) | Attorneys and CSRs need to communicate |
| 14 | Correction request flow | Errors happen, need a process |
| 15 | Rating/review after delivery | Trust signal for marketplace |
| 16 | CSR profile editing | Reporters need to update their info |
| 17 | Reporter referral tracking | Growth channel |

### Nice-to-have (Month 3+)

| # | Flow | Why |
|---|------|-----|
| 18 | Analytics dashboard (attorney) | Value-add, not critical |
| 19 | Team management (firm admin) | Multi-user firms |
| 20 | Admin dispute management | Handle edge cases |
| 21 | Request copy flow | Secondary revenue stream |
| 22 | Re-order / repeat order | Convenience feature |
| 23 | TRF paperwork generation | Fee waiver support |
| 24 | Admin financial reporting | Business intelligence |
