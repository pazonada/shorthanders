# Messaging & Notifications Plan

## Operating assumption

**Desktop is where the work happens. Phone is for comms only.** Legal users (firms, legal assistants, attorneys, CSRs) do their actual work — placing orders, reviewing transcripts, managing schedules — on a computer. The phone is a notification surface for time-sensitive prompts ("a job needs your response", "your CSR canceled") and short replies. No native app is planned, ever, because there's no on-phone workflow to wrap.

This shapes every decision below: notifications must work on a stock phone with no install step.

## Decision

The platform uses **two notification channels**: SMS (via Twilio) and email (via SendGrid or Postmark).

In-platform communication uses an **inbox model**: a messages table with threads between firms and CSRs, plus order-level system messages ("your CSR confirmed", "transcript ready"). Real-time chat (typing indicators, presence, read receipts) is not in scope.

## Why SMS + email, not Web Push

- **No install step.** SMS and email work for everyone with a phone or address. Web Push requires the user to install the site as a PWA on their home screen first, which most users won't do — and there's no on-phone workflow that would motivate the install.
- **Time-critical use case favors SMS.** Tier response windows in the matching policy (v2.2) mean a CSR needs to be reached fast. SMS is the most reliable, lowest-friction way to do that.
- **Fewer integrations to maintain.** Twilio + SendGrid is two SaaS contracts. Web Push would mean a service worker, web push subscription storage, and a separate sender — maintained for a minority of users who installed the PWA, with SMS still required as the primary channel for everyone else.
- **Cost isn't the constraint.** ~$0.008/SMS × cascade volume = double-digit dollars per month at hundreds of jobs/month. Even at 10× scale, this is a small line item.

## Channels and defaults

User preferences live in Settings → Notifications. Phone number is collected at signup and verified via OTP before SMS is enabled. Email is verified at signup.

| Event | Default channel | User can change to |
|---|---|---|
| New job offered (CSR) | SMS | Email, both, or off (off shows a warning that they may miss tier windows) |
| Tier deadline approaching | SMS | Email + SMS only — cannot disable |
| Job confirmed / canceled (firm) | Email | SMS, both |
| New in-platform message | Email | SMS, both, off |
| Transcript ready, payment receipts | Email | Email only |
| Marketing / digests | Email | Off |

## Compliance

- **A2P 10DLC registration** is required for US business SMS. Register the brand and an "Account Notifications" campaign through Twilio. Approval takes ~1–2 weeks plus ~$15/month overhead. Must be done before launch.
- **STOP / HELP** keywords are handled by Twilio automatically. The first SMS to a new user must include opt-out language.
- **TCPA** — transactional SMS only goes to users who have provided a phone number and opted in. Default opt-in at signup is acceptable if disclosed in the Terms. Marketing SMS requires separate explicit consent.

## Components to integrate

- **Twilio Programmable Messaging** — SMS send/receive, A2P 10DLC.
- **SendGrid** (or Postmark) — transactional email and templates.
- **In-app inbox** — `messages`, `threads`, `participants` tables; per-user unread counters; system-message support.
- **Notification dispatcher** — one backend service that takes an event (`new_job_offered`, `tier_deadline_approaching`, etc.), looks up each recipient's preferences, and fans out to the right channel(s). It is important that this lives in one place; channel-specific dispatch scattered across the app gets brittle quickly.

## Out of scope

- **Native app.** Not planned. See operating assumption — there's no on-phone workflow to wrap.
- **PWA install + Web Push.** Not a roadmap step toward "more native-feeling." Could be added later as optional polish for power-user CSRs who want lock-screen alerts without SMS, but only if it earns its keep against the maintenance cost of a service worker and push subscription store. SMS remains the primary channel either way.
- **Real-time chat** (typing indicators, presence, read receipts). Inbox + SMS/email is the model.
- **Voice or phone calls.**
- **WhatsApp or other messaging platforms.**
