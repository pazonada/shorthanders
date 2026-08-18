# Matching policy: applicant-pool review (v1 launch model)

**Owner:** Aud & Rosie
**Last updated:** 2026-05-24
**Status:** v1 spec. Confirmed by Aud and Rosie 2026-05-23 in conversation. This supersedes the job-board "first-to-claim-wins" model previously specified in `mvp_scope_v1.md` and supersedes the cascade + veto-window design in `rating_and_matching_policy.md` (which now stands as a deferred post-v1 alternative).

The matching surface in Shorthanders is **applicant-pool review**, modeled on Care.com / dating-app applicant flows rather than on Uber-style auto-match or first-claim-wins. The model: firm posts a job → qualified CSRs apply → application window closes per turnaround tier → firm reviews applicant profiles + prices → firm selects one CSR (or none) → selected CSR confirms availability → job locks in.

This puts choice in the firm's hands, makes price a comparison axis at the moment of selection, and gives CSRs visibility into what they're applying for. It also exposes Shorthanders as an open marketplace at the matching layer, not just at the pricing layer.

---

## The flow

### 1. Firm submits order

- Order is created with all the usual attributes (jurisdiction, case type, certs required, dates, turnaround tier, matter ref, etc.).
- Order state: **`collecting_applicants`**.
- Push + email notification fires to CSRs whose alert preferences match the job's filterable attributes (jurisdiction, case type, certifications, attendance type). CSRs opt in to which categories they want.
- All CSRs who pass hard filters can see the job in their dashboard's "Open jobs" view.
- Firm sees an order-status card on their dashboard: "Collecting applicants – [N] reporters interested so far."

### 2. CSRs apply

- A CSR who sees the job in their dashboard can click **Apply** to express interest.
- Applying is informational; it does not commit the CSR to the job. Their availability is implicitly affirmed by applying.
- A CSR can withdraw their application before selection without penalty.
- CSRs see their open applications in a **"Your applications"** view with status: *Waiting for firm to review / Application window closing in X / Firm selected someone else / Firm selected you – confirm availability*.

### 3. Application window (notification trigger, not a gate)

The application window is a **notification timer**, not a gate on the firm's ability to review or select. The firm can view applicants as they arrive and select any time – before, at, or after window close. We chose this on 2026-05-24 over the gated alternative because (a) it mirrors Care.com faithfully, (b) it lets firms with favorites fill jobs fast without forcing them off-platform to text "are you available?", and (c) it's honest about how the marketplace actually behaves rather than pretending applicants get a guaranteed runway.

The window length depends on the firm's turnaround tier:

| Turnaround tier | Application window |
|---|---|
| Rush (1–2 business days) | **4 hours** |
| Expedited (3–5 business days) | **24 hours** |
| Standard (6+ business days) | **72 hours** |

These are starting defaults. We'll instrument and tune them post-launch based on observed time-to-fill, applicant counts per window, and firm satisfaction.

- **First applicant arrives** → firm gets a "First reporter applied" push + email. Optional; firm can mute this notification type.
- **Window closes** → firm gets a "Window closed – N applicants" push + email if they haven't already selected.
- **The job is never removed from CSRs' open-jobs view** during `open` (the merged `collecting_applicants` / `review_open` state). CSRs can keep applying right up to selection. The firm sees later applicants in the same live review screen.
- **State naming:** for simplicity, we collapse `collecting_applicants` and `review_open` into a single state called `open` since the firm can act in both. The state machine becomes: `open` → `selection_pending` → `confirmed` (with `closed_no_selection` as a terminal alt from `open`).

### 4. Firm reviews applicants

The Review Applicants screen shows:

- **All applicants who've applied** (passing hard filters)
- For each: profile photo, name, license number, rating, jobs completed, on-time rate, specialty tags, location, **their per-page rate + per-diem rate for this job's case type**, an "Apply selected" CTA
- Sortable / filterable by: applicant rate (low to high or high to low), rating, completed jobs, distance, favorite-status (favorites get a "★ Worked with you before" badge)
- A "Select [N]" pill if N new applicants have arrived since the firm last viewed

Three outcomes:

**a. Firm selects an applicant.** Order moves to `selection_pending`. See step 5.

**b. Firm selects no one and walks away.** Order stays in `open`. Job remains visible to qualified CSRs; new applicants can still apply. When **at least one new applicant arrives OR another N hours pass** (defaults: 12h Rush / 24h Expedited / 48h Standard), the firm gets a re-notification: "M new applicants since you last checked (N total). Review now." The firm can iterate this loop as many times as they want until either (a) they select someone or (b) the job's hard deadline approaches and we auto-escalate (see step 7 / edge cases).

**c. Firm closes the order without selecting.** Order moves to `closed_no_selection`. Applicant CSRs are notified silently (their application status updates in their dashboard; no email/push). Firm can resubmit the order if they change their mind.

### 5. Selection → CSR confirms availability

When the firm clicks "Select [CSR name]":

- Order state moves to **`selection_pending`**.
- Selected CSR is notified immediately (push + email): "[Firm name] selected you for [case name]. Confirm you're still available within [confirmation window]."
- **Confirmation window:** 1 hour for Rush, 4 hours for Expedited, 12 hours for Standard. CSR must explicitly click Confirm or Decline.
- The job is **paused** from showing to other CSRs while `selection_pending` is open – we don't want a CSR applying right after the firm has tentatively selected someone else.
- Firm sees: "Waiting for [CSR] to confirm availability – we'll notify you the moment they respond, or [X hours] from now if they don't."

**Three CSR responses:**

**a. Confirm.** Order locks in. State moves to **`confirmed`**. Stripe pre-authorization fires on the firm's card. Both parties are notified. The job moves from "open" to "assigned" in everyone's dashboard. **Post-selection messaging unlocks** at this point so the parties can coordinate logistics (location, dial-in info, document handoff).

**b. Decline.** State moves back to **`open`**. Firm is notified immediately (push + email): "[CSR] is no longer available – select someone else." The Review Applicants screen reopens with that CSR removed from the list. The firm picks again.

**c. No response within the confirmation window (timeout).** Treated as decline. Firm notified the same way. We don't punish the CSR with a rating impact for one missed window, but we instrument it; repeated no-responses degrade their ranking in subsequent applicant reviews.

### 6. Confirmed job runs normally

Same delivery, certification, payment, dispute, and rating workflows as before. No change.

### 7. Hard deadline / no applicants

- If the application window closes with **zero applicants**, the firm is notified: "No reporters have applied yet. We've broadened the alert criteria; we'll re-notify you when applicants start arriving or when [hard deadline minus 12h] is reached."
- If the order has no confirmed CSR by **[hard deadline minus 12h]**, ops is alerted (per existing late-delivery/CNA policy). Ops can manually escalate, contact firm to widen criteria, or trigger emergency cancel-with-fee waiver.

---

## Pricing visibility

The applicant's rate – per-page + per-diem for the specific case type – is visible on the Review Applicants screen. This is intentional. It makes price a legitimate axis of comparison at the moment of selection, which is what the open-marketplace pitch promises.

If we ever want to test hiding price ("we'll set it on selection"), do it as a deliberate experiment post-launch.

---

## Messaging

**In v1.** Decided 2026-05-24 (revising the earlier "post-selection only" position). Firms need to vet applicants for high-stakes hearings, and CSRs need to ask clarifying questions about scope before applying or after applying. We've expanded messaging into v1 in both windows.

| Phase | Who can message | Direction | Purpose |
|---|---|---|---|
| Before applying (job is in `collecting_applicants`) | No one | – | The job board is read-only at this stage; CSRs see the public order details, no thread exists yet. |
| After applying, before selection (`review_open`) | Firm ↔ each CSR who applied | Either direction | Firm vets applicants; applicants ask clarifying questions. 1:1 thread per applicant. |
| After selection (`confirmed`) | Firm ↔ selected CSR | Either direction | Logistics coordination (location, dial-in info, document handoff). |

**Shape of the feature in v1** (full detail in `governance-and-process/messaging_and_notifications_plan.md`):

- **1:1 threads per order.** No group threads. No firm-to-applicants broadcast.
- **Async, text-only.** No real-time chat (no typing indicators, no presence). No attachments – defer to v1.1. Parties can email PDFs out-of-band if they need to.
- **Notifications:** push (Web Push via the PWA) for immediacy, email digest as fallback. Per the existing notifications plan.
- **Anti-spam: trust-first.** No hard rate limits in v1. Either party can mute a thread (no future notifications). We instrument per-firm message volume + reply rate; if abuse patterns emerge post-launch, we add limits.
- **Non-privileged disclaimer.** First message in any thread is preceded by a system notice: "Messages on Shorthanders are not a privileged channel. Do not send privileged attorney-client communications here." This is shown once per thread, not on every message.
- **Admin visibility.** Admin can read threads for dispute resolution. Disclosed in the TOS. Threads are not visible to attorneys outside the originating firm or to other CSRs.
- **Retention.** Threads archived 90 days after the order moves to `delivered` or `closed_no_selection`. After that, they're soft-deleted from the user-facing view (admin retains for the legal-hold period defined in `transcript_retention_and_custody_policy.md`).
- **Identity disclosure on first message.** When a firm opens a thread with an applicant, the applicant sees the firm name + initiating attorney's name (already visible to applicants on the job posting; this is informational consistency, not new disclosure).

**Why we changed the earlier "post-selection only" call:**
- Real firm need: vetting a CSR before committing to a custody-trial or contested-probate hearing matters more than vetting a Care.com nanny.
- Real CSR need: clarifying things like "is this all-day or am I covering just the motion?" before applying or after applying.
- Cost is manageable: 1:1 async text-only threads are bounded engineering work, especially with the inbox / notification infrastructure already planned in the messaging-and-notifications doc.
- Spam risk exists but is bounded by the small CA legal/CSR community (people know each other); we'll instrument and tighten if it breaks.

---

## CSR rejection comms ("you weren't selected")

We deliberately do **not** send "you weren't selected" notifications. Reasoning:

- Demoralization risk: applying to many jobs and getting individually rejected for each is a slog. Per the project_match_preview_ux memory and the strategy session decisions about CSR supply liquidity, we want to keep the CSR experience friction-light.
- Visibility without push: the CSR's "Your applications" view will show the status change (the job moved to `confirmed` with someone else, or `closed_no_selection`), so a CSR who actively checks can see it. We just don't push it.
- Honest framing if asked: in the FAQ + reporter onboarding copy, we explicitly say "if you're not selected, we won't bother you about it – check Your applications anytime for status." Transparency at signup, no push at miss.

Future option: opt-in "send me application updates" toggle in CSR notification settings. Defer.

---

## Favorites treatment

Favorites get an advantage in **notification visibility**, not in selection standing. The model is: every qualified CSR can see and apply to the job at the same moment, but the firms a CSR has worked with get a louder ping so they don't miss it.

**On the firm side (Review Applicants screen):**

- Favorite CSRs get a **★ "Worked with you before" badge** on their applicant card.
- Favorites **float to the top of the default sort**.
- Firms can **filter to "favorites only"** if they want to skip the wider review.
- Favorites have no priority in *selection logic* – the firm picks whoever they want, the same way they'd pick a non-favorite.

**On the CSR side (notifications) – revised 2026-05-24:**

- A CSR who has been favorited by Firm X gets a distinct **"favorite-from job alert"** notification type when Firm X posts a new job. Different from the regular "new job in your alert categories" alert.
- **Defaults for favorite-from alerts: push + email, both on, opt-out only.** The CSR has to explicitly turn each channel off in Settings → Notifications. Compared to regular new-job alerts which are user-controlled and may be off, favorite-from alerts are sticky-on so a favorite doesn't miss a job from a firm they've built a relationship with.
- The CSR's "Favorited by X firms" panel on their dashboard shows the count and surfaces the "Priority alerts on" indicator + a link to notification settings.
- **No SMS.** Push + email is the channel mix per `project_phone_is_comms_only.md` and the messaging-and-notifications plan. We are not adding Twilio for this feature.
- **Anti-firehose consideration:** a CSR favorited by many firms could be alerted often. We don't rate-limit in v1 – instrument volume per CSR and reply rate; if CSRs ask for a per-firm mute or a "digest mode" later, we'll add it.

**Why this revision over the earlier "same priority as everyone else" policy:**

The openness promise was about *access* to apply, not about *visibility*. A CSR who has built trust with a firm and may already be on the firm's mind shouldn't lose a job because their phone was face-down. Louder notifications honor the relationship without giving favorites exclusive access. Non-favorites still see the same job in the same dashboard at the same moment; they just don't get the extra-prominent ping.

---

## Edge cases

| Case | What happens |
|---|---|
| CSR applies, then withdraws before window closes | Application removed silently. No firm notification (the firm hasn't reviewed yet). |
| CSR applies, then withdraws after review opens but before selection | Application removed silently. If firm has the review screen open, the applicant list re-renders without that CSR. If the firm had already clicked Select on that CSR, treat the same as Decline at confirmation. |
| CSR applies to 5 overlapping jobs, gets selected for 2 | At selection, the CSR confirms availability. They explicitly Confirm one and Decline the others. We send Decline notifications to the other firms. CSRs who routinely over-apply and then decline degrade their ranking. |
| Firm selects, then changes mind before CSR confirms | Firm can hit "Withdraw selection" within the confirmation window. State moves back to `review_open`. Selected CSR gets a silent status update (no push). Track count of selections-withdrawn per firm for ops review. |
| Firm closes order, then re-opens | Treat as a new submit (new application window starts; prior applicants are not auto-carried over because too much time may have passed). |
| Application window closes with 1 applicant, firm doesn't select | Firm gets a "1 applicant available – review now" notification at window close. After [re-notification interval] passes with no action, ops is alerted. |
| Two CSRs applying at the same moment as window closes | Race: anyone whose Apply request server-timestamp is before window-close is included. Server is the source of truth, not the client. |

---

## State machine summary

```
collecting_applicants
        │
        │ application window closes
        ▼
   review_open  ◄────────────────────┐
        │                            │
        │ firm selects a CSR         │
        ▼                            │
 selection_pending                   │
        │                            │
        ├── CSR confirms ──► confirmed
        │
        ├── CSR declines / times out ┘
        │
        └── firm withdraws selection ┘

review_open
   │ firm closes order
   ▼
closed_no_selection
```

---

## Why this model over the alternatives

| Alternative | Why we chose applicant-pool instead |
|---|---|
| First-to-claim-wins (the previous v1 model) | Robbed the firm of choice. Price competition was hidden (firm saw only the winning CSR's rate). Felt like an auction the firm wasn't in. |
| Cascade + veto-window (the deferred v2 design) | Heavy engineering (batching logic, veto reasons, auto-confirm timers, 3-veto limits). Required notifying CSRs they "weren't selected" via veto, which was the part we most wanted to avoid. |
| Manual concierge matching | Doesn't scale. Doesn't fit Studio-Crux-as-platform positioning. Punted earlier. |

Applicant-pool keeps engineering tractable (no batching, no race conditions on claim, no veto state machine), keeps firm choice central, keeps CSRs in pull mode, and uses time-to-fill data we'll naturally collect to tune the windows.

---

## Open issues to revisit post-launch

1. **Application window lengths.** 4h / 24h / 72h are guesses. Instrument time-to-fill, applicant counts, and firm-satisfaction proxies. Tune.
2. **Re-notification interval** (when firm sits on `review_open`). 12h / 24h / 48h proposed; same caveat.
3. **No-applicants escalation.** Today's policy is "ops alerted at hard deadline minus 12h." Once we have data on application rates, build an automated widening (e.g., "extend search to adjacent counties") rather than a manual ops call.
4. **CSR ranking weight on application behavior.** How aggressively should "applied then declined" or "no-response to selection" degrade ranking? Start conservative; tune.
5. ~~**Pre-selection messaging.** Currently off.~~ **Resolved 2026-05-24:** pre-selection messaging is in v1. See the Messaging section above. Open follow-ups: (a) what counts as an abuse pattern that triggers rate limiting, (b) whether to add an applicant-side "ask a question about the job before applying" UX in v1.1.
6. **Bulk apply / saved searches.** CSRs may want to apply with one click to all matching new jobs. Defer.
7. **The cascade + veto-window design** in `rating_and_matching_policy.md` stays in the doc as a deferred alternative. If applicant-pool doesn't pan out (e.g., firms hate reviewing applicants, or time-to-fill is too slow), the cascade is the next thing to try.

---

## Related docs

- `governance-and-process/mvp_scope_v1.md` – v1 scope; matching section references this doc as the canonical spec
- `governance-and-process/rating_and_matching_policy.md` – the cascade + rating-system design that this supersedes for v1
- `governance-and-process/cancellation_and_cna_policy.md` – what happens when a confirmed CSR can't make the job (separate from "selected CSR declines confirmation")
- `governance-and-process/late_delivery_and_deplatforming_policy.md` – ranking degradation rules
- `governance-and-process/messaging_and_notifications_plan.md` – the notification cadence assumed above (push + email + dashboard status)
- `research/marketing_strategy_master.md` – open-marketplace positioning that this model makes credible
- `project_match_preview_ux.md` memory – history of the matching-model decisions; this doc is the current state
