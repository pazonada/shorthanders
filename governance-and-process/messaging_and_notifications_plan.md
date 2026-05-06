# Messaging & Notifications Plan

## Operating assumption

**Desktop is where the work happens. Phone is for comms only.** Legal users (firms, legal assistants, attorneys, CSRs) do their actual work — placing orders, reviewing transcripts, managing schedules — on a computer. The phone is a notification surface for time-sensitive prompts ("a job needs your response", "your CSR canceled") and short replies. No native app is planned, ever, because there's no on-phone workflow to wrap.

## Decision

The platform uses **PWA + Web Push** as the primary phone-side notification channel for CSRs, and **email** as the universal fallback. No SMS / Twilio.

In-platform communication uses an **inbox model**: a messages table with threads between firms and CSRs, plus order-level system messages ("your CSR confirmed", "transcript ready"). Real-time chat (typing indicators, presence, read receipts) is not in scope.

## Why PWA + Web Push, not SMS

- **One-tap accept flow.** Push notification → PWA opens to the job card → tap Accept → state updates. SMS would force a multi-step path (tap link → mobile web → magic-link auth → land on job card → accept), which costs us seconds and taps that matter inside tier response windows.
- **CSRs will be pinged often.** Early on we expect more jobs than CSRs, so an active CSR may get pinged multiple times per week. The smoother the per-ping experience, the more income they capture and the more they trust the platform.
- **Free per-message.** No $/SMS, no A2P 10DLC paperwork, no STOP/HELP compliance, no carrier deliverability variance.
- **Phone number becomes optional.** Lowers signup friction.
- **Push can carry richer payloads.** Title, body, and an action URL to the exact job — better than 160-char SMS that has to summarize then link out.

## How we make install rates high

Install is the gating step — if a CSR doesn't add the site to their home screen, push doesn't reach them. The platform will pitch and re-pitch install in multiple places:

**v1:**

- **CSR onboarding** — a dedicated step explaining the value ("get instant alerts the second a job comes in; one tap to accept") with platform-specific install instructions for iOS Safari and Android Chrome.
- **CSR sidebar / quick-actions area** — persistent "Enable push notifications" card for users who haven't installed yet, dismissible but reappearing periodically.
- **Onboarding email follow-up** — for CSRs who skipped the install step at signup, a follow-up email a day later walking them through it.
- **Inside notification settings** — install pitch is the top item if they haven't installed.

**Deferred to v1.1:**

- **Post-job-miss nudge** — if a CSR was eligible for a job but didn't see it in time, surface "you'd have heard about this instantly with push notifications. Install the app?" on next login. Requires tracking which jobs each non-installer would have qualified for, so we're deferring to v1.1.

The pitch leans on the economic motivation: missing alerts = missing income.

## Email as the always-on fallback

Email is the universal channel. Every CSR has a verified email at signup; not every CSR will install the PWA right away. Dispatch logic:

- **CSR has an active push subscription** → send push (and log it). For critical events (new job offered, tier deadline approaching), also send email if no read/click on push within a short window — belt-and-suspenders.
- **CSR has no push subscription** → send email only. Subject lines are written to be glanceable on a phone lock screen ("New job offered – respond by 3:45 PM").
- **All recipients (firms included) get email** for: confirmations, cancellations, transcript ready, receipts, weekly digests, marketing.

## Handling the "push silently stopped working" failure mode

Push subscriptions can break invisibly: the user removes the PWA from their home screen, iOS revokes the subscription, the browser is uninstalled, etc. The CSR keeps using the platform from desktop and assumes alerts are working — but isn't getting them.

The dispatcher MUST:

- **Detect push delivery failures** — when the push provider returns a permanent failure (HTTP 410, expired subscription), mark the subscription dead in the database.
- **Fall back to email immediately** for that send.
- **Surface a re-install nudge** the next time the user visits the site from any device: "We noticed your phone alerts stopped working. Reinstall to start getting them again."
- **Don't silently swallow the breakage.** A CSR who thinks they're getting push but isn't is the worst case — they assume there are no jobs and disengage.

A weekly background job should also send a silent test push to all subscriptions and clean up any that fail.

## Channels and defaults

User preferences live in Settings → Notifications. Email is verified at signup. Push subscription is created when the user grants permission after installing the PWA.

| Event | Default channel(s) | User can change to |
|---|---|---|
| New job offered (CSR) | Push (if installed) + email backup | Email only, or off (off shows a warning that they may miss tier windows) |
| Tier deadline approaching | Push + email — both required | Both required, cannot disable |
| Job confirmed / canceled (firm) | Email | Push if installed, both, off |
| New in-platform message | Push (if installed), else email | Email only, off |
| Transcript ready, payment receipts | Email | Email only |
| Marketing / digests | Email | Off |

## iOS-specific notes

- Web Push works on iOS 16.4+ (March 2023) and only after the user installs the PWA to the home screen and opens it from the home screen icon. Push will not work if they're just visiting the site in Safari.
- Push delivery on iOS is less reliable than on Android in practice. Treat email backup for critical events as load-bearing, not optional.
- iOS does not show notifications from a PWA on the lock screen as prominently as native apps. The install pitch should set expectations honestly.
- If a user removes the PWA from their home screen, the push subscription dies silently. See failure-mode handling above.

## Components to integrate

- **PWA wrapper** — `manifest.json` (app name, icon, theme colors, fullscreen display mode), service worker (push event handling, offline shell), install prompt UX with platform-specific instructions.
- **Web Push** — VAPID keys, push subscription storage (`push_subscriptions` table keyed by user_id, tracking endpoint and expiry), `web-push` library (or equivalent) on the backend for sending.
- **Transactional email** — SendGrid or Postmark, with templates for every event type.
- **In-app inbox** — `messages`, `threads`, `participants` tables; per-user unread counters; system-message support.
- **Notification dispatcher** — one backend service that takes an event (`new_job_offered`, `tier_deadline_approaching`, etc.), looks up each recipient's preferences and active push subscriptions, fans out to the right channels, and handles delivery failures (especially expired push subscriptions). Channel-specific dispatch scattered across the app gets brittle quickly; keep it in one place.

## Out of scope

- **SMS / Twilio.** Multi-step accept flow rules it out as the primary channel, and we don't need it as a fallback because email serves that role.
- **Native app.** No on-phone workflow to wrap.
- **Real-time chat** (typing indicators, presence, read receipts). Inbox + push/email is the model.
- **Voice or phone calls.**
- **WhatsApp or other messaging platforms.**
