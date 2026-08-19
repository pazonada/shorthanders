# Notification catalog — every email/notification, per event

The authoritative list of **every notification the product sends**, by event/flow: trigger → who gets it → channels → stream → default → plain-English purpose. This is the input the backend + Postmark wiring implements (event → template → stream → recipient). Channel *strategy* (why push-primary, email-fallback, no SMS) lives in `../../governance-and-process/messaging_and_notifications_plan.md`; this is the per-event map.

> **MVP scope (decided 2026-08-18): in-app + email only. Web Push is DEFERRED to v1.1.** iOS only delivers Web Push to home-screen-installed PWAs (Apple restriction), install rates are low, and it's real build cost — while email already reaches everyone. Where a row below says "push if installed, else email," read it for MVP as **email (+ in-app)**; the push column lights up in v1.1.

## How to read this

- **Channels:** `in-app` (bell/badge in the UI, always) · `push` (Web Push, only if the user installed the PWA) · `email` (the universal fallback + record). Rule of thumb: **push if installed, else email; critical events also email as belt-and-suspenders even if push was sent.**
- **Stream** (Postmark): **`TX`** = transactional (triggered, permission-based; the whole app). **`BC`** = broadcast (marketing/digests, separate stream so a marketing complaint can't sink invoice deliverability). **Cold recruitment email is neither — it goes through the Workspace mail-merge tool, never Postmark (AUP).** See `services_registry.md`.
- **Default:** **`always`** = can't be turned off (receipts, security, payments, legal-ish) · **`opt-out`** = on by default, user can disable in Settings → Notifications · **`off`** = opt-in only.
- **Graceful failure (from `reliability_monitoring_plan.md`):** every email has an **in-app counterpart**. A failed email send is logged and retried; it must never lose the in-app notification. The DB is the source of truth for "was this person notified."
- **From / reply-to:** transactional mail sends **from `notifications@` on the `notify.shorthanders.com` subdomain**, **reply-to `support@shorthanders.com`**. Broadcast from the same subdomain.
- **MVP-core** sections are what the current reduced-scope product needs first. **Deferred** = tied to the applicant-pool/matching spec, not built yet.

---

## A. Accounts & security  · MVP-core

| Event / trigger | Who gets it | Channels | Stream | Default | Purpose |
|---|---|---|---|---|---|
| Reporter welcome (profile claimed / signup) | Reporter | in-app + email | TX | always | Confirms the claim; links to finish the profile (a fuller profile ranks higher). |
| Firm welcome (signup) | Firm | in-app + email | TX | always | Confirms the account; orients them to search + messaging. |
| Verify email address | New user | email | TX | always | Confirms they own the address (deliverability + anti-abuse). |
| Password reset | User | email | TX | always | The reset link. |
| Security alert (password/email changed, new-device sign-in) | User | email | TX | always | Account-safety / fraud signal. |
| Finish-your-profile nudge (a few days after claim, if sparse) | Reporter | in-app + email | TX (lifecycle) | opt-out | Nudges to complete the profile; explains completeness → ranking. |
| PWA-install follow-up (day after signup, if not installed) | Reporter | email | TX (lifecycle) | opt-out | Walks through installing for push so they don't miss time-sensitive alerts. |

## B. Messaging  · MVP-core

| Event / trigger | Who gets it | Channels | Stream | Default | Purpose |
|---|---|---|---|---|---|
| New message received | Recipient (firm or reporter) | push if installed, else email + in-app | TX | opt-out (warns) | "New message from [name]." |
| **First contact from a firm** (firm messages a reporter with no prior thread) | Reporter | push + email + in-app | TX | opt-out (sticky-on) | The "a firm wants to get in touch" moment — louder than a routine reply because it may be a real booking lead. |
| Unread-message digest (optional, later) | Recipient | email | BC | off | "You have N unread messages" if nothing was opened for a day. |

## C. Discovery / favorites  · MVP-core

| Event / trigger | Who gets it | Channels | Stream | Default | Purpose |
|---|---|---|---|---|---|
| A firm saved your profile | Reporter | push if installed, else email + in-app | TX | opt-out | Favorite alert — "louder, not exclusive" (a signal a firm is interested). |

## D. Invoicing & payments  · MVP-core (the highest-stakes group)

| Event / trigger | Who gets it | Channels | Stream | Default | Purpose |
|---|---|---|---|---|---|
| Invoice sent | Firm | email + in-app | TX | always | "New invoice from [reporter] for [matter] — $X, due [date]," with the pay link. Doubles as the **invoice-as-invite** for a firm without an account yet. |
| Invoice paid | Reporter | email + in-app | TX | always | "You've been paid — [firm] paid invoice #X, $Y." Fires from the **verified Stripe webhook**, not the browser. |
| Payment receipt | Firm | email | TX | always | Receipt / confirmation of the payment. |
| Payout on the way | Reporter | email + in-app | TX | always | "Your payout of $Z is on its way, arriving ~[date]" — date from Stripe's **real in-transit estimate**, never a standing calendar date. |
| Invoice overdue reminder | Firm (+ reporter FYI) | email + in-app | TX | always | "Invoice #X is past due." Overdue is **computed from the due date**, not a hand-set flag. |
| Payment failed | Firm | email + in-app | TX | always | "Your payment didn't go through — update your method." |
| Invoice viewed (optional, later) | Reporter | in-app (maybe push) | TX | off | "[Firm] viewed your invoice." Nice-to-have, noisy — default off. |

## E. Subscriptions / billing  · MVP-core *if* firm sub + reporter Pro are live

| Event / trigger | Who gets it | Channels | Stream | Default | Purpose |
|---|---|---|---|---|---|
| Subscription started | Subscriber | email | TX | always | Receipt + what the plan includes. |
| Renewal upcoming | Subscriber | email | TX | always | "Your plan renews on [date] for $X." |
| Renewal payment failed | Subscriber | email + in-app | TX | always | "We couldn't renew — update your card" (before service lapses). |
| Subscription canceled / downgraded | Subscriber | email | TX | always | Confirmation + effective date. |
| Card expiring | Subscriber | email | TX | always | "Your card ending [x] expires soon." |

## F. Invites & connections  · MVP-core

| Event / trigger | Who gets it | Channels | Stream | Default | Purpose |
|---|---|---|---|---|---|
| Reporter invites a firm | Invited firm (may have no account) | email | TX | always | "[Reporter] invited you to connect on Shorthanders" + link to a free account. The core supply-pulls-demand loop. |
| Invited firm joined | Reporter | in-app + email | TX | opt-out | "The firm you invited just joined." |

## G. Support / directory  · MVP-core

| Event / trigger | Who gets it | Channels | Stream | Default | Purpose |
|---|---|---|---|---|---|
| "Remove my listing" acknowledgment | Reporter | email | TX | always | Confirms the removal request (via the Google Form → `support@`) and the timeline. Legal-adjacent — always send. |

## H. Reminders & re-engagement (lifecycle nudges)  · a few MVP, most later

The nudge class. **Anti-annoyance rules for this whole section** (or they hurt trust + deliverability): **frequency-capped** (≤ ~1 nudge/week/type; **back off after 2–3 ignored**), **all opt-out** (gated by the "Tips & reminders" pref), and the pure re-engagement ones ride the **broadcast** stream so they never touch transactional/receipt reputation. Everything here is **v1.1-ish** except the first profile nudge (already in §A).

| Event / trigger | Who gets it | Channels | Stream | Default | Purpose |
|---|---|---|---|---|---|
| **Unanswered message reminder** | Recipient with an unread/unreplied message after ~48h | email + in-app | TX (lifecycle) | opt-out | Don't let a firm's inquiry — a possible booking — go cold. Higher-stakes than a pure nudge. |
| **Complete your profile** (ongoing) | Reporter still below ~X% complete after N days | email + in-app | TX (lifecycle) | opt-out | Fill the gaps (completeness → ranking + firm trust). Escalation of §A's first nudge; capped. |
| **Keep your profile fresh / come back** | Reporter inactive ~30–60 days | email | BC | opt-out | "Update your availability + rates so firms see you as active." Classic re-engagement. |
| **Availability check-in** | Reporter whose "accepting jobs" toggle is untouched ~60–90 days | email + in-app | BC | opt-out | Keep availability honest so firms don't message someone who's actually out. |
| **New reporters / activity in your area** (firm) | Firm inactive ~30+ days | email | BC | opt-out | Pull dormant firms back with relevant new supply. |

> The **overdue-invoice** (§D) and **subscription-renewal** (§E) reminders are also "reminders," but they're transactional/always-on and live in their own flows. This section is the *engagement* nudges. Settings mapping: profile/freshness/availability nudges are gated by **"Tips & reminders"**; the unanswered-message reminder rides under **"New messages"**; dormant-firm re-engagement is a broadcast (product-news-adjacent).

## I. Marketing / lifecycle  · broadcast stream, separate reputation

| Event / trigger | Who gets it | Channels | Stream | Default | Purpose |
|---|---|---|---|---|---|
| Product updates / newsletter | Opted-in users | email | **BC** | opt-out | Feature news, movement/story beats. |
| Re-engagement / tips | Dormant users | email | **BC** | opt-out | "Here's what's new / how to get more out of Shorthanders." |

> **Not in this catalog:** the **cold reporter-recruitment campaign** (emailing CSRs who never signed up) is *outreach*, not a triggered notification, and it goes through the **Workspace mail-merge tool**, never Postmark. See `services_registry.md` + `csr_email_outreach.md`.

## J. Matching / applicant pool  · DEFERRED (v1 spec, not built)

From `messaging_and_notifications_plan.md` §"Channels and defaults." Listed for completeness; wire only if/when the applicant-pool flow ships.

| Event / trigger | Who gets it | Channels | Stream | Default |
|---|---|---|---|---|
| New job offered — regular | Matched reporters | push + email | TX | opt-out (warns they may miss windows) |
| New job offered — favorite-from | Favorited reporter | push + email | TX | opt-out, sticky-on |
| Tier deadline approaching | Applicant reporter | push + email | TX | always (both required) |
| First applicant arrived | Firm | push, else email | TX | off |
| Application window closed | Firm | push + email | TX | opt-out |
| Job confirmed | Firm + selected reporter | email + in-app | TX | always |
| Job canceled | Involved parties | email + in-app | TX | always |
| Not selected | Non-selected applicants | **none** | — | — (silent rejection by design) |

---

## Cross-cutting rules for the build

1. **In-app first, email as the backstop.** Write the in-app notification + DB record on the event; dispatch push/email from that record. A failed email never erases the in-app state.
2. **Payments fire from verified Stripe webhooks, idempotently** — never from a browser callback. (See `reliability_monitoring_plan.md`.)
3. **Preferences live in Settings → Notifications.** `always` rows aren't shown as toggles; `opt-out` rows are; every email carries an unsubscribe/preferences link (broadcast especially — legally required).
4. **One template per event, two streams.** Everything above except section H is transactional (Postmark TX stream); H is the broadcast stream.
5. **No PII in the notification payload/logs** beyond what the recipient is entitled to (no raw reporter contact lists, ever).

*Related: `messaging_and_notifications_plan.md` (channel strategy) · `integration_checklist.md` (wiring) · `services_registry.md` (Postmark + streams) · `reliability_monitoring_plan.md` (webhook/graceful-failure).*
