# Messaging & Notifications Plan

## Operating assumption

**Desktop is where the work happens. Phone is for comms only.** Legal users (firms, legal assistants, attorneys, CSRs) do their actual work – placing orders, reviewing transcripts, managing schedules – on a computer. The phone is a notification surface for time-sensitive prompts ("a job needs your response", "your CSR canceled") and short replies. No native app is planned, ever, because there's no on-phone workflow to wrap.

## Decision

The platform uses **PWA + Web Push** as the primary phone-side notification channel for CSRs, and **email** as the universal fallback. No SMS / Twilio.

In-platform communication uses an **inbox model**: a messages table with threads between firms and CSRs, plus order-level system messages ("your CSR confirmed", "transcript ready"). Real-time chat (typing indicators, presence, read receipts) is not in scope.

## Why PWA + Web Push, not SMS

- **One-tap accept flow.** Push notification → PWA opens to the job card → tap Accept → state updates. SMS would force a multi-step path (tap link → mobile web → magic-link auth → land on job card → accept), which costs us seconds and taps that matter inside tier response windows.
- **CSRs will be pinged often.** Early on we expect more jobs than CSRs, so an active CSR may get pinged multiple times per week. The smoother the per-ping experience, the more income they capture and the more they trust the platform.
- **Free per-message.** No $/SMS, no A2P 10DLC paperwork, no STOP/HELP compliance, no carrier deliverability variance.
- **Phone number becomes optional.** Lowers signup friction.
- **Push can carry richer payloads.** Title, body, and an action URL to the exact job – better than 160-char SMS that has to summarize then link out.

## How we make install rates high

Install is the gating step – if a CSR doesn't add the site to their home screen, push doesn't reach them. The platform will pitch and re-pitch install in multiple places:

**v1:**

- **CSR onboarding** – a dedicated step explaining the value ("get instant alerts the second a job comes in; one tap to accept") with platform-specific install instructions for iOS Safari and Android Chrome.
- **CSR sidebar / quick-actions area** – persistent "Enable push notifications" card for users who haven't installed yet, dismissible but reappearing periodically.
- **Onboarding email follow-up** – for CSRs who skipped the install step at signup, a follow-up email a day later walking them through it.
- **Inside notification settings** – install pitch is the top item if they haven't installed.

**Deferred to v1.1:**

- **Post-job-miss nudge** – if a CSR was eligible for a job but didn't see it in time, surface "you'd have heard about this instantly with push notifications. Install the app?" on next login. Requires tracking which jobs each non-installer would have qualified for, so we're deferring to v1.1.

The pitch leans on the economic motivation: missing alerts = missing income.

## Email as the always-on fallback

Email is the universal channel. Every CSR has a verified email at signup; not every CSR will install the PWA right away. Dispatch logic:

- **CSR has an active push subscription** → send push (and log it). For critical events (new job offered, tier deadline approaching), also send email if no read/click on push within a short window – belt-and-suspenders.
- **CSR has no push subscription** → send email only. Subject lines are written to be glanceable on a phone lock screen ("New job offered – respond by 3:45 PM").
- **All recipients (firms included) get email** for: confirmations, cancellations, transcript ready, receipts, weekly digests, marketing.

## Handling the "push silently stopped working" failure mode

Push subscriptions can break invisibly: the user removes the PWA from their home screen, iOS revokes the subscription, the browser is uninstalled, etc. The CSR keeps using the platform from desktop and assumes alerts are working – but isn't getting them.

The dispatcher MUST:

- **Detect push delivery failures** – when the push provider returns a permanent failure (HTTP 410, expired subscription), mark the subscription dead in the database.
- **Fall back to email immediately** for that send.
- **Surface a re-install nudge** the next time the user visits the site from any device: "We noticed your phone alerts stopped working. Reinstall to start getting them again."
- **Don't silently swallow the breakage.** A CSR who thinks they're getting push but isn't is the worst case – they assume there are no jobs and disengage.

A weekly background job should also send a silent test push to all subscriptions and clean up any that fail.

## Channels and defaults

User preferences live in Settings → Notifications. Email is verified at signup. Push subscription is created when the user grants permission after installing the PWA.

| Event | Default channel(s) | User can change to |
|---|---|---|
| New job offered – regular (CSR) | Push (if installed) + email backup | Email only, or off (off shows a warning that they may miss tier windows) |
| **New job offered – favorite-from (CSR has been favorited by the posting firm)** | **Push + email, both on, opt-out only** | Either channel can be turned off in Settings → Notifications, but the default is sticky-on. No SMS. |
| Tier deadline approaching | Push + email – both required | Both required, cannot disable |
| Job confirmed / canceled (firm) | Email | Push if installed, both, off |
| New in-platform message | Push (if installed), else email | Email only, off |
| First applicant arrived (firm) | Push (if installed), else email | Off |
| Application window closed (firm) | Push + email | Either channel can be turned off |
| Transcript ready, payment receipts | Email | Email only |
| Marketing / digests | Email | Off |

## iOS-specific notes

- Web Push works on iOS 16.4+ (March 2023) and only after the user installs the PWA to the home screen and opens it from the home screen icon. Push will not work if they're just visiting the site in Safari.
- Push delivery on iOS is less reliable than on Android in practice. Treat email backup for critical events as load-bearing, not optional.
- iOS does not show notifications from a PWA on the lock screen as prominently as native apps. The install pitch should set expectations honestly.
- If a user removes the PWA from their home screen, the push subscription dies silently. See failure-mode handling above.

## Firm ↔ CSR messaging in the applicant-pool flow

Added 2026-05-24. Pairs with `governance-and-process/matching_applicant_pool_policy.md`.

The v1 matching model lets firms message CSRs both before selection (to vet applicants) and after selection (for logistics coordination). The rules below pin down what's allowed, how it's scoped, and how we keep CSRs from getting spammed.

### Who can message whom, and when

| Order state | Allowed threads | Notes |
|---|---|---|
| `collecting_applicants` | None | Job is read-only; CSRs see the public posting but no thread yet exists. |
| `review_open` | Firm ↔ each applicant who has applied | Either party can open the thread; either can send / reply. 1:1 thread per applicant per order. |
| `selection_pending` | Existing threads continue; no new ones | Selected CSR is in confirmation window; non-selected applicants can still send messages they'd already started, but firm typically doesn't reply at this stage. |
| `confirmed` | Firm ↔ selected CSR only | Other applicants' threads are archived (read-only on both sides; no new messages allowed in those threads). Selected-CSR thread stays open for the engagement. |
| `delivered` / `closed_no_selection` | Thread is read-only | Archive starts; 90-day retention before soft-delete from user-facing view. |

### Format

- **1:1 threads.** No group threads. No firm-to-applicants broadcast (a firm cannot send the same message to multiple applicants in one click; they have to open each thread individually). The friction is deliberate and is the v1 spam control.
- **Async, text-only.** No real-time chat affordances – no typing indicators, no presence, no read receipts. Send a message, the other party gets a notification, they read + reply when they get to it.
- **No attachments in v1.** Defer to v1.1 (file storage, virus scanning, MIME handling, size limits). Parties can send PDFs via email out-of-band if they need to.
- **Plain text only.** No rich formatting, no inline images, no links rendered as embeds (raw URLs are fine).
- **Message length cap:** 4,000 characters per message. Long enough for real questions, short enough that abuse looks like abuse.

### Notifications

- **Push (Web Push via PWA)** when a new message arrives, if the recipient has the PWA installed and push enabled.
- **Email digest** as the always-on fallback: if a message hasn't been read within 30 minutes (during business hours) or by the next business day (after hours), an email goes out with the message contents inline.
- Both channels are user-toggleable in Settings → Notifications under "New in-platform message" – see the "Channels and defaults" table above.

### Anti-spam (v1 = trust-first)

- **No hard rate limits.** A firm can open one thread per applicant per order. There's no daily/weekly cap on messages sent across all threads.
- **Mute thread.** Either party can mute a thread, which stops notifications without closing the thread (replies are still accepted but go to the recipient's inbox quietly).
- **Block from future jobs.** Either party can block the other from messaging on future orders (separate from mute). CSRs blocking a firm: that firm's future orders will not be visible to that CSR (we'll filter at the open-jobs query). Firms blocking a CSR: that CSR can't apply to future orders from that firm.
- **Instrumentation:** track per-firm message volume, reply rate by applicants, applicant-block rate by firm. If patterns emerge that look like abuse (e.g., a firm with 50 messages sent and 5% reply rate, or a 20% applicant-block rate against one firm), ops reviews. Add hard limits only if we see actual abuse.

### Compliance + safety

- **Non-privileged disclaimer.** First message in any thread is preceded by a system notice: *"Messages on Shorthanders are not a privileged channel. Do not send privileged attorney-client communications here. If you need to share privileged material, use a secure channel outside the platform."* Shown once per thread, not on every message.
- **Admin visibility.** Admin can read thread contents for dispute resolution. Disclosed in the TOS. Threads are not visible to attorneys outside the originating firm, to other CSRs, or to anyone else.
- **Reportable content.** Either party can flag a message as abusive (harassment, threats, off-platform-job solicitation, etc.). Reports route to admin; admin reviews within a service-level commitment to be defined in the moderation policy.
- **Retention.** Threads archived 90 days after the order moves to `delivered` or `closed_no_selection`. After archival, the user-facing view soft-deletes them; admin retention follows the legal-hold period in `transcript_retention_and_custody_policy.md`.

### Out of scope for v1 (here, in addition to the doc-wide out-of-scope below)

- **Attachments** (files, images, PDFs). v1.1.
- **Pre-application questions from CSR-side** ("I see this job is in Alameda; is the courthouse the Hayward branch?"). Today they have to apply first to open a thread. v1.1 candidate.
- **Group threads** (firm + multiple applicants in one thread).
- **Off-platform export** (downloading a thread as PDF). Possible v1.1 if firms ask for it.
- **AI-assisted reply drafting / smart compose.** No.

## Components to integrate

- **PWA wrapper** – `manifest.json` (app name, icon, theme colors, fullscreen display mode), service worker (push event handling, offline shell), install prompt UX with platform-specific instructions.
- **Web Push** – VAPID keys, push subscription storage (`push_subscriptions` table keyed by user_id, tracking endpoint and expiry), `web-push` library (or equivalent) on the backend for sending.
- **Transactional email** – SendGrid or Postmark, with templates for every event type.
- **In-app inbox** – `messages`, `threads`, `participants` tables; per-user unread counters; system-message support.
- **Notification dispatcher** – one backend service that takes an event (`new_job_offered`, `tier_deadline_approaching`, etc.), looks up each recipient's preferences and active push subscriptions, fans out to the right channels, and handles delivery failures (especially expired push subscriptions). Channel-specific dispatch scattered across the app gets brittle quickly; keep it in one place.

## Out of scope

- **SMS / Twilio.** Multi-step accept flow rules it out as the primary channel, and we don't need it as a fallback because email serves that role.
- **Native app.** No on-phone workflow to wrap.
- **Real-time chat** (typing indicators, presence, read receipts). Inbox + push/email is the model.
- **Voice or phone calls.**
- **WhatsApp or other messaging platforms.**
