# CSR account procedures

**Owner:** Aud
**Last updated:** 2026-05-02
**Status:** Confirmed for MVP / pilot

This is the authoritative document for how CSR (Certified Shorthand Reporter) accounts work on Dewey Sholes from signup through deactivation. It consolidates and references existing policies; deep dives on specific topics live in their dedicated docs.

---

## Account types

### MVP / pilot: solo CSRs only

For the 6-month pilot, **only solo CSR accounts are supported**. Each account represents one individual licensed CSR.

### Deferred: CSR firm accounts (post-pilot)

CSR firm accounts (3-10 reporters under one account with consolidated billing and a firm-wide availability dashboard) are **deferred to v2**. There aren't enough small CSR firms in CA to justify building this for the pilot.

**During the pilot, CSRs from boutique firms** can either:
- Sign up individually and use Dewey Sholes solo (preferred path)
- Indicate during onboarding they'd be interested in a future firm account, so we can gauge demand

The CSR onboarding flow includes a single checkbox at signup:

> ☐ I'm part of a court reporting firm with 2+ reporters. Notify me when firm accounts are available.

We collect this data without building the firm tier yet. Once we have ~5-10 expressed interests, we'll evaluate building it for v2.

---

## Account lifecycle

```
[NEW]
   │  signup form completed
   ▼
[PENDING VERIFICATION]
   │  CRB license verification (auto, usually <24 hours)
   │
   ├─ License confirmed ─────────┐
   │                              ▼
   │                         [ACTIVE]
   │                          /  |  \
   │                         /   |   \
   │           pause acct   /    |    \  license expires / 5+ strikes
   │                       ▼     │     ▼
   │                  [PAUSED]   │  [SUSPENDED]
   │                       │     │     │
   │            reactivate │     │     │ admin reinstates
   │                       └──── │ ────┘
   │                             ▼
   │                       [ACTIVE]
   │
   └─ License rejected
      │
      ▼
   [REJECTED]  (CSR contacted; can appeal)
```

### State definitions

| State | What it means | What the CSR can do | What attorneys see |
|---|---|---|---|
| **Pending verification** | Account created, awaiting CRB license check | Browse only, no job matching | Profile not visible |
| **Active** | Verified and live | Receive job notifications, accept/decline, deliver, get paid, edit profile | Profile visible in directory and in matching results |
| **Paused** | CSR self-paused (vacation, break, etc.) | Edit profile, view past jobs, but no new job notifications | Profile hidden from directory and matching |
| **Suspended** | Admin-initiated (license expired, 5+ strikes, fraud review) | Cannot accept jobs; can appeal | Profile hidden; existing jobs reassigned |
| **Deleted (deactivated)** | CSR requested deletion; in 30-day grace period | Read-only access; can reactivate | Profile hidden |
| **Permanently deleted** | After 30-day grace period | No access | Data anonymized (per CCPA + retention policy) |

---

## Onboarding requirements

The CSR completes the onboarding flow at `#/reporter-signup`. Some items are mandatory at signup; others are deferred to first payout or first job.

### Mandatory at signup (cannot proceed without)

- Full legal name
- Email address
- Phone number
- CSR license number (CA Court Reporters Board)
- Reporting method (stenography or voice writing)
- Password
- Acceptance of independent contractor agreement (per AB 5 / Borello compliance)

### Required for active matching (encouraged but can skip)

- At least one selected case type preference
- At least one selected court / jurisdiction
- At least one selected turnaround capability (Rush / Expedited / Standard)
- At least one job type (live attendance, audio transcription, or both)

If the CSR skips these, their account stays Pending until profile is at least minimally complete. They get a nudge email to finish.

### Deferred to first payout

- **W-9** — collected via Stripe Connect at first payout, NOT at signup. This avoids upfront paperwork friction. If they never get paid, we never need their SSN.
- **Bank account details** — same: collected via Stripe Connect identity verification flow before first payout.

### Deferred to discretion

- Bio (public profile description)
- Profile photo
- Languages other than English
- Certifications beyond CSR (RMR, CRR, RPR)
- Past case history (helps discoverability but optional)
- Court-appointed status (badge displayed if checked — see below)
- Copy request opt-in (defaults to ON — see below)
- Notification preferences (defaults set during signup)
- "Interested in firm accounts" indicator

---

## License verification

See `CSR_License_Verification_Policy.md` for the full policy.

Summary:
- CRB license is auto-verified at signup against the CRB database
- Re-checked quarterly (every 90 days) for all active accounts
- License renewal warning sent 30 days before expiration
- License expired → account auto-suspends until renewed and re-verified
- CSR can manually trigger a re-verification from settings if they renew early

---

## Payment setup

### Stripe Connect onboarding

CSRs link a bank account through Stripe Connect to receive payouts. This is initiated in onboarding but **doesn't have to be completed before the first job**. They can accept jobs first, complete payment setup before delivery.

If payment setup isn't complete by first delivery acceptance, the CSR receives a notice and the payout is held in the platform's Stripe balance until they finish.

### W-9 timing

Per `billing_and_payment_policy.md`: W-9 is collected at first payout, not at signup. This is a deliberate choice to reduce signup friction for CSRs who might not end up using the platform.

Stripe's identity verification flow handles SSN collection during the bank-link step. We never store SSN ourselves; Stripe holds it.

### Payouts

- Payouts hit the linked bank account 2 business days after delivery acceptance (or auto-release)
- See `payment_failure_policy.md` for what happens when payouts fail

### Listing fee

- Pilot: **$0 listing fee** for the first year (per `pilot_pricing_and_referrals.md`)
- After first year: $99/year for individual CSRs, charged annually

---

## Profile management

### What the CSR can edit (Settings → Profile)

- Personal info: name, email, phone
- Reporting method, certifications, languages
- Court-employed status (and which courts)
- Job types accepted (live attendance / audio transcription)
- Case types accepted
- Courts served
- Turnaround capabilities
- Bio (public profile description)
- Profile photo
- Weekly availability grid
- Allow copy requests toggle
- Notification preferences (per channel: email, SMS, push)

### What the CSR cannot edit (admin only)

- CSR license number (would require re-verification)
- Account type (currently always Individual)
- Verification status
- Strike count (visible to CSR, but only admin can adjust)
- Quality and timeliness ratings (system-calculated)

### Profile completeness nudge

The dashboard shows a "complete your profile" widget if the CSR hasn't filled out:
- At least one profile photo
- At least one bio sentence
- At least 3 case type preferences
- At least 1 court / jurisdiction
- Weekly availability grid

Profile completeness affects matching — incomplete profiles rank lower.

### What appears on the public profile (v1) and what doesn't

A CSR's public profile page (visible to attorneys browsing the directory or arriving via a deep link) shows in v1:

- Name, license number, profile photo, location, languages, certifications, specialties
- Bio (CSR-authored)
- Aggregate quality signals: rating + review count, on-time delivery rate, average turnaround
- Weekly availability grid
- Courts covered
- Recent reviews (text, attorney name redacted to first name + last initial per existing policy)
- **CTAs:** "Book this reporter" and "Request a transcript copy" (both pre-select the reporter when entering the corresponding flow)

**What does NOT appear on the public profile in v1:**

- **Recent cases worked.** The reporter onboarding collects up to 10 recent cases for matching/discovery purposes, but those are not displayed publicly. Confidentiality concerns + signal-to-noise: most attorneys won't browse cases when evaluating; they'll check rating + courts covered + availability.
- **Job count completed on Dewey Sholes.** Avoids creating a cold-start penalty for new CSRs during pilot, and avoids implying a "leaderboard" dynamic.

**Status of these decisions:** v1 only. Both questions are tagged for user testing (see `research/user_testing_attorney_guide.md` and `research/user_testing_csr_guide.md`):

- *Attorney side:* Would seeing recent cases / job count change your decision to book? What signal do you actually use to evaluate an unfamiliar CSR?
- *CSR side:* Are you comfortable having recent cases visible? Does it bother you to compete on visible job count?

Revisit for v1.1 once user-testing data lands. Until then, the data is collected (CSR-side) but not exposed (attorney-side).

### Public profile URL & identifier

**Every CSR profile is identified by their California CSR license number.** This is the canonical, stable identifier across the entire system.

**URL pattern (real build):**
- Canonical: `deweysholes.com/csr/<license-number>` (e.g., `deweysholes.com/csr/14892`)
- A slug variant resolves and 301s to the canonical URL: `deweysholes.com/csr/jane-doe-14892` → `deweysholes.com/csr/14892`

**Why license number, not an internal id or username:**
- Already unique under California regulation (issued by the CA Court Reporters Board; no two CSRs share one).
- Stable across name changes (marriage, rebrand), firm moves, and display-name preference changes.
- Already what we use for credential verification — single source of truth.
- Public information already (the CRB directory is publicly searchable), so using it as a URL leaks no private data.

**What this enables:**
- Stable, shareable URLs that don't break — works for business cards, email signatures, QR codes, marketing assets, support-ticket references, admin notes.
- Search-engine indexability: each CSR profile is a single canonical URL.
- Predictable deep-linking from external surfaces (Rosie's network outreach, partner sites, the CSR's own social bios).

**Edge cases:**
- **Invalid / unknown license number:** show "We don't have a profile for CSR #X. They might not have signed up yet." Provide a CTA to invite them or browse other CSRs.
- **Paused account:** show a "this CSR is taking a break" state with an option to favorite for when they return — do not 404. This preserves the link's value when the CSR returns.
- **Deplatformed account:** show a generic "this profile is no longer available" state. Do not surface deplatforming reason publicly.

**Prototype note:**
The current React-in-HTML prototype uses internal mock ids (`rep-1`, `rep-2`, etc.) at `#/reporters/<id>`. The real build standardizes on license number at `/csr/<license-number>`. When migrating, set up a redirect from the old `#/reporters/<id>` path to the new canonical URL so any in-flight links keep working.

### Attorney/firm side: parallel identifier rule (with caveats)

The same canonical-identifier principle applies on the buyer side, but with practical limits:

- **When an attorney signs up directly: use their CA Bar number** as the canonical identifier. URL pattern: `deweysholes.com/atty/<bar-number>`. Same logic as CSR licenses — already unique by state regulation, stable, public information, what we use for verification.
- **In practice, most accounts will be created by assistants signing up as themselves**, not by the attorney directly. Assistants don't have a bar number and aren't impersonating the attorney. For these accounts, fall back to:
  - **Firm-level canonical URL** — `deweysholes.com/firm/<firm-slug>` for the firm's public/marketing-facing presence, with the firm slug derived from the firm's name and a disambiguating suffix if needed.
  - **Internal account id** for the assistant's own account record (no public URL — assistants typically don't have public-facing profiles the way CSRs do).
- **Firm accounts that include an attorney with a verified bar number** can have both URLs resolve to the same canonical record (the bar-number URL 301s to the firm URL, or vice versa, depending on which we pick as canonical).

**Why this matters less than on the CSR side:**
CSR profiles are public-facing marketplace listings — attorneys browse them, book them, refer them. Attorney/firm profiles are mostly internal (the firm's own dashboard, the firm's own team). Public-facing attorney/firm pages exist mainly for SEO, partnership outreach, and edge cases (e.g., a CSR wanting to attribute past work). So the URL-as-marketing-asset case is much weaker on this side.

**Open question (not yet decided):**
Whether to surface attorney/firm profiles publicly at all in the MVP. If we don't, the canonical-URL rule above is dormant — interesting only when we eventually expose those profiles. Track this with the marketing plan; revisit once we have firm-side signups in the pilot.

---

## Account state transitions

### CSR pauses their account

Initiated from Settings → Security → Account status.

**What happens:**
1. CSR clicks "Pause account" → confirmation modal explaining consequences
2. CSR confirms → account state set to Paused
3. Profile hidden from directory and matching algorithm
4. No new job notifications sent
5. Active jobs are unaffected — CSR completes them as normal
6. CSR receives confirmation email
7. Yellow banner displays on dashboard: "Your account is paused. Reactivate when ready."

**To reactivate:**
1. Click "Reactivate" on the paused-state banner
2. Account returns to Active immediately (no re-verification needed if license is still valid)

**No time limit.** Account can stay paused indefinitely.

### CSR deletes their account

Initiated from Settings → Security → Danger zone.

**What happens:**
1. CSR clicks "Delete account" → modal opens
2. Modal warns about consequences and shows any blockers (e.g., 3 active jobs)
3. CSR must complete or release any active jobs before deletion can proceed
4. CSR can download a data export (per CCPA)
5. CSR types "DELETE" to confirm
6. Account state set to Deleted (deactivated) — 30-day grace period begins
7. Profile hidden, no access to dashboard except a "reactivate" prompt
8. After 30 days, account is permanently deleted; data is anonymized per retention policy

**Reactivation during grace period:**
- CSR logs in, sees "Your account is scheduled for deletion in X days. Reactivate?" → click reactivates immediately
- Reactivated account returns to Active state (or last pre-deletion state)

### License expires

Per `CSR_License_Verification_Policy.md`:

1. 30 days before expiration: warning email + dashboard banner
2. 7 days before expiration: second warning, more urgent
3. Day of expiration: account auto-suspends
4. CSR cannot accept new jobs until they renew with the CRB and the platform re-verifies
5. Existing jobs are flagged for admin review — typically transferred to another CSR per `late_delivery_and_deplatforming_policy.md` release flow
6. Once renewed, CSR triggers re-verification from settings; account returns to Active

### Suspension via strikes

Per `late_delivery_and_deplatforming_policy.md`:

- 5 strikes triggers automatic suspension
- CSR receives email explaining suspension and appeal process
- CSR can appeal to admin within 30 days
- Admin reviews appeal within 5 business days
- Suspension can be lifted with no strikes reset (but new strikes accumulate from where they left off) or lifted with partial strike reset (admin discretion)

---

## Notification preferences

### Default settings at signup

| Notification | Default channels |
|---|---|
| New matching jobs | Push + Email |
| Job acceptance confirmations | Email |
| Mid-job check-ins | Push + Email |
| Delivery deadline reminders (24h before) | Push + SMS |
| Payment received | Email |
| Quality rating received | Email |
| Copy requests from other parties | Email (if opted in) |
| License expiration warnings | Email + SMS |
| Pilot pricing reminders | Email |
| Platform updates | Email |

### What the CSR can change

All of the above, per channel (email / SMS / push). Each notification type can be toggled independently.

### What the CSR cannot turn off

- Account security alerts (login from new device, password change)
- Suspension or strike notifications
- Payment failure alerts
- Legal/compliance notices (license verification status, quarterly compliance)

---

## Copy request opt-in

Per `transcript_retention_and_custody_policy.md`:

CSRs choose at signup whether to allow copy requests from non-parties through the platform. **Default is ON** since most CSRs welcome the additional revenue.

CSRs can change this anytime in Settings → Profile → Copy requests.

When ON:
- Their name and CSR# appear in case lookup search results
- Other parties can send them copy requests through the platform
- They decide whether to fulfill each request individually
- They handle the CCP § 2025.570 notification window themselves

When OFF:
- Their name and CSR# do not appear in case lookup search results
- They are not contactable for copy requests through the platform
- (Other parties can still find them through the CRB or court records — we just don't facilitate)

---

## Court-appointed CSR badge

CSRs who also work as court employees can mark themselves "Court-appointed" during onboarding (or in Settings later).

**Effect:**
- Public profile displays a "Court-appointed" badge
- At booking, attorneys see: "This reporter also serves as a court-appointed CSR and may occasionally need to release a job due to court obligations."
- Court appointment is a valid release reason with no penalty (per `late_delivery_and_deplatforming_policy.md`)

This protects court-appointed CSRs from strikes when their court duties pull them away.

---

## Settings the CSR can access

A complete map of CSR-controlled settings:

### Settings → Profile
- Personal info (name, email, phone)
- Credentials (CSR license # is read-only; method, certs, languages editable)
- Court-employed status
- Job types and case types
- Courts served
- Turnaround capabilities
- Weekly availability grid
- Bio
- Profile photo
- Copy request opt-in toggle

### Settings → Notifications
- Per-notification, per-channel toggles (email / SMS / push)

### Settings → Security
- Change password
- Two-factor authentication setup
- Active sessions list (with revoke option)
- Account status (Pause / Reactivate)
- Delete account (Danger zone)

### Settings → Billing
- Stripe Connect status (linked bank, payout schedule)
- Payment history
- Tax documents (1099 download once available at year-end)

---

## Data used by the matching algorithm

What signals affect whether a CSR shows up in matching results, and in what order:

| Signal | Effect on matching |
|---|---|
| Verification status | Must be Active to match at all |
| Account state | Paused / Suspended / Deleted = no matches |
| Case type preferences | Must match the order's case type |
| Courts served | Must match for live attendance jobs (not required for transcription) |
| Turnaround capabilities | Must include the order's tier (Rush / Expedited / Standard) |
| Languages | Boost if interpreter language is required |
| Quality rating | Higher rating = higher rank |
| Timeliness score | Higher score = higher rank |
| Reliability (response rate to check-ins, jobs released) | Higher = higher rank |
| Strike count | More strikes = lower rank |
| Profile completeness | Incomplete profile = lower rank |
| Attorney's preferred-vendor list | If listed, CSR gets first right of refusal (notification + 1-2 day exclusive window) |
| Geographic distance (live attendance only) | Closer = higher rank |
| Push notification opt-in status | If opted out, lower rank (since we can't notify them quickly) |

The CSR can see their own ratings and strike count on their dashboard but does not see their exact match-rank score.

---

## CCPA compliance

CSRs (as CA residents) have rights under the California Consumer Privacy Act:

- **Right to access:** Download all data the platform has about them (Settings → Security → Download my data)
- **Right to delete:** Initiate account deletion (Settings → Security → Delete account)
- **Right to opt out of sale of personal info:** N/A — we don't sell personal info, but the toggle is in Settings → Privacy as a confirmation
- **Right to correct:** Profile editing covers this; for read-only fields (license #), CSR can request correction via Support

---

## Open questions / future decisions

1. **Multi-CSR firm accounts** — deferred to v2; collecting interest signals during pilot. Decision criterion: build if 5+ firms express interest.
2. **Linking multiple email addresses to one CSR account** — not supported; each account is one email. Revisit if CSRs request it.
3. **Account ownership transfer** — what happens if a CSR retires and wants to give their book of business / favorited attorneys to another CSR? Not supported in MVP. Discuss with Rosie.
4. **Account suspension during medical leave** — currently CSRs use the pause feature. Consider whether a longer "extended leave" state is needed for >6 month leaves.
5. **CSRs who lose their license but want to keep an inactive profile** — currently auto-suspended. Should we allow a "former CSR / view-only profile" state? Probably not; suspended is the right state.

---

## Related documents

- `CSR_License_Verification_Policy.md` — license verification details
- `billing_and_payment_policy.md` — payment timing
- `late_delivery_and_deplatforming_policy.md` — strikes, release flow, deplatforming
- `rating_and_matching_policy.md` — rating system + matching algorithm
- `cost_splitting_policy.md` — cost-split mechanics from CSR perspective
- `payment_failure_policy.md` — payout failures
- `pilot_pricing_and_referrals.md` — pilot pricing
- `transcript_correction_policy.md` — correction request handling
- `transcript_retention_and_custody_policy.md` — what CSRs can/can't do with transcripts
- `confidentiality_and_audio_retention.md` — audio retention by CSRs
