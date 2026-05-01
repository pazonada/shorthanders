# Briscoe Sholes — Late delivery penalty policy
*Draft — March 13, 2026*

*This policy needs validation against real reporter economics before implementation. Interview data from CSR discovery calls should inform the final version.*

---

## Why this matters

The PRD identifies late delivery as the most common real-world problem in transcript ordering. Firms cite unpredictable turnaround as their top frustration. Reporters cite unrealistic deadline expectations from firms as theirs. A late delivery policy has to address both sides without making the platform hostile to reporters (who are the scarce resource) or unreliable for firms (who are the paying customers).

Get this wrong in either direction and you lose a side of the marketplace. Too punitive toward reporters and they won't accept jobs. Too lenient and firms won't trust the platform's delivery promises.

---

## Definitions

**Committed delivery date.** The date the reporter agrees to when accepting a job. This is set by the reporter at acceptance, within the range allowed by the order tier (standard: 10 business days, rush: 3 business days, economy: 20 business days per the PRD).

**Late.** Any delivery after 11:59 PM Pacific on the committed delivery date.

**Materially late.** Delivery more than 2 business days after the committed delivery date.

**No-delivery.** The reporter has not delivered by 5 business days after the committed delivery date and has not communicated a revised timeline.

---

## Tiered consequences

### Tier 0: Grace communication (day of deadline)

On the morning of the committed delivery date, the platform sends the reporter a reminder. If the reporter knows they'll miss the deadline, they can proactively extend by up to 2 business days through the platform. The firm is notified of the extension automatically with an updated delivery date.

This is not a penalty tier. This is a pressure valve. Reporters who communicate proactively should not be penalized the same way as reporters who go silent.

### Tier 1: Late (1-2 business days past deadline)

**What happens to the reporter:**
- The late delivery is recorded on the reporter's profile as a data point (visible to the platform, not to firms initially).
- No financial penalty for a first occurrence within a rolling 90-day window.
- If this is the reporter's second or third late delivery in 90 days, the reporter receives a notice that continued late deliveries may affect job routing priority.

**What happens to the firm:**
- Automatic notification when the delivery is late, with the reporter's revised ETA if one has been provided.
- Option to cancel the order at no charge if they need to find another reporter (platform re-routes the job).

**Rationale:** A day or two late is frustrating but rarely case-damaging. The first time, give the reporter the benefit of the doubt. Pattern behavior gets flagged.

### Tier 2: Materially late (3-5 business days past deadline)

**What happens to the reporter:**
- The late delivery is recorded and counts as a reliability incident.
- Platform fee credit of 25% of the platform fee is offered to the firm (paid by the platform, not deducted from the reporter's compensation). The reporter still receives full statutory rate.
- The reporter's job routing priority is reduced for 30 days. They'll see jobs slightly later than on-time reporters, giving firms more reliable options first.
- A second materially late delivery within 90 days triggers a warning and temporary suspension from rush-tier jobs for 60 days.

**What happens to the firm:**
- Notification with option to cancel and re-route.
- 25% platform fee credit applied automatically if they choose to wait for delivery.
- If the transcript is for a court filing deadline, the platform offers to help the firm find an alternate reporter on an emergency basis.

**Rationale:** Three to five days late is serious. It can miss filing windows. The platform absorbs the cost of the credit rather than penalizing the reporter's pay, because docking reporter compensation on a statutory-rate transcript creates legal risk and workforce resentment. But reduced routing priority creates a real incentive to deliver on time.

### Tier 3: No-delivery (5+ business days, no communication)

**What happens to the reporter:**
- Order is automatically canceled and re-routed to another reporter.
- Reporter's account is suspended pending a review conversation with platform staff.
- If the reporter had already been paid an advance or partial payment, the platform initiates recovery.
- Three no-delivery incidents within 12 months results in permanent removal from the platform.

**What happens to the firm:**
- Full platform fee refund.
- Priority re-routing to an available reporter with expedited matching.
- Personal follow-up from platform support.

**Rationale:** Going silent is the worst outcome. Firms can handle a delay if they know about it. What they can't handle is uncertainty. No-delivery with no communication breaks trust in the platform entirely.

---

## What the policy does NOT do

**It does not dock reporter pay.** Reporters receive the statutory per-word rate regardless of delivery timing. Deducting from statutory compensation raises legal issues (the rate is set by Gov. Code § 69950, not negotiated) and would drive reporters off the platform. The consequences are routing priority and platform access, not compensation.

**It does not impose automatic financial penalties on reporters.** Financial penalties on ICs who are receiving statutory rates create classification risk (it starts to look like employer control over work conditions). Non-financial consequences — routing priority, tier access, suspension — accomplish the same behavioral incentive without the legal exposure.

**It does not publicly shame reporters.** Late delivery data is used for routing algorithms and internal quality tracking. It is not displayed on reporter profiles or visible to firms as a "late delivery percentage." Reporters are professionals and should be treated accordingly.

---

## Edge cases

**Force majeure.** If a reporter's late delivery is caused by circumstances outside their control — medical emergency, natural disaster, technology failure with documentation — the platform should have a process for excusing the late delivery and not counting it toward the rolling thresholds. This requires human review, not automation.

**Firm-caused delays.** If the firm provides incorrect audio, changes the scope of the order, or delays providing access to materials, the committed delivery date should be adjustable. Reporters should not be penalized for delays caused by the ordering party.

**Partial delivery.** If the reporter delivers most of the transcript on time but a portion is delayed (e.g., transcript of a multi-day trial where day 3 comes late), the policy should apply to the late portion, not the entire order.

**TRF orders.** The same delivery expectations apply to TRF-eligible orders. Fee-waiver litigants should not receive slower service. Since the firm or SRL pays the reporter through the platform upfront (and files for TRF reimbursement separately), the payment and penalty mechanics are identical to any other order.

---

## Implementation notes

**Start soft.** During beta, apply Tier 0 and Tier 1 only. Collect data on how often reporters are late, by how much, and why. Use this data to calibrate Tiers 2 and 3 before enforcing them. The specific thresholds (90-day windows, 30-day routing reductions, etc.) are starting points, not gospel.

**Reporter input.** Before finalizing this policy, discuss it with the first 10-15 reporters who sign up. Their feedback on what's fair, what's realistic, and what would make them leave the platform is more valuable than any policy document.

**Track the data.** Log every delivery: committed date, actual date, whether the reporter communicated proactively, and the reason for any delay. This data feeds the routing algorithm and informs policy adjustments.

**Review quarterly.** Revisit the thresholds and consequences every quarter during the first year. The right balance depends on reporter supply, firm expectations, and the patterns that emerge from real usage.
