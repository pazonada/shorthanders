# Agent: Matching & notification

**Purpose:** Match attorneys with qualified reporters and manage the notification lifecycle for each order.

---

## Job matching (real-time)

- **Trigger:** New order submitted by attorney
- **Actions:**
  1. Filter reporters by: jurisdiction match, case type preference, availability, active license
  2. If attorney selected "favorite" or specific reporter: send exclusive offer to that reporter
  3. If "best available": rank by rating, on-time rate, proximity, then broadcast
  4. Preferred/favorited reporters get 1-2 day exclusive window before general pool
  5. Rush orders: exclusive window shortened to end of business day
- **Escalation:** If no reporter accepts within 24 hours (rush) or 48 hours (standard), notify attorney + Aud

## Notification lifecycle

- **Trigger:** Various order state changes
- **Actions:**

  | Event | Notify attorney | Notify reporter |
  |-------|----------------|-----------------|
  | Order submitted | Confirmation + order # | — |
  | Reporter matched | "Reporter [name] assigned" | "New job offer" |
  | Reporter accepts | "Your reporter confirmed" | Confirmation + case details |
  | Reporter declines | — (auto-rematch) | — |
  | Transcript uploaded | "Transcript ready for review" | Confirmation |
  | Transcript withdrawn | "Reporter is uploading a corrected version" | — |
  | Attorney accepts delivery | "Payment processing" | "Payment releasing in 2 business days" |
  | Auto-release (2 biz days) | "Transcript auto-accepted" | "Payment released" |
  | Payment sent | Receipt | Payout confirmation |
  | Deadline approaching (24h) | — | "Reminder: transcript due tomorrow" |
  | Deadline missed | "Your reporter is past the delivery date" | "You've missed your delivery deadline" |

- **Channels:** Email (always) + in-app notification + SMS (if reporter opted in)
- **Escalation:** Missed deadlines trigger the late delivery policy (see governance docs)

## Rematch on decline

- **Trigger:** Reporter declines a job offer or exclusive window expires
- **Actions:**
  1. Remove declined reporter from candidate pool for this order
  2. Re-run matching algorithm with remaining candidates
  3. If "favorite" reporter declined, notify attorney: "[Name] isn't available. We're matching you with the next best reporter."
  4. Broadcast to general pool if no favorites remain
- **Escalation:** If 3+ reporters decline the same job, flag for manual review (may indicate pricing or case complexity issue)
