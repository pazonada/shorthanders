# Cancellation & Certified Non-Appearance (CNA) policy

**Owner:** Aud
**Last updated:** 2026-05-02
**Status:** Draft — covers two related scenarios that have been open items

---

## Why this exists

Two real-world scenarios come up regularly in court reporting that we need clear policies for:

1. **Attorney cancels** the booking before the CSR has done the work
2. **Witness doesn't show up** (Certified Non-Appearance / CNA) — the CSR did the work but no testimony was taken

Both involve the same core question: *who pays the CSR for what*? Industry standard handles both predictably, and we follow that standard so CSRs aren't penalized for situations outside their control.

---

## Core principle

**The attorney who booked the CSR is responsible for paying the CSR for any time the CSR has committed to the job.** A CSR who blocks their calendar, drives to a courthouse, or shows up to a hearing has already invested real time even if proceedings don't happen as scheduled. They should be paid for that time.

This aligns with how traditional CSR agencies have always operated, and matches how attorneys generally handle vendor scheduling obligations.

---

## Cancellation policy (attorney-initiated)

When an attorney cancels a booking before the proceedings begin:

| Time before scheduled job | CSR has acted? | Fee owed | Refund to attorney |
|---|---|---|---|
| **More than 24 hours** | Hasn't started or traveled | $0 cancellation fee | Full refund |
| **Less than 24 hours**, CSR has not yet left for location | Calendar blocked | Half-day attendance fee | Partial refund (full minus half-day fee) |
| **Day-of**, CSR is en route or has arrived | Showed up / on the way | Full attendance fee (half-day or full-day per scheduled job type) | Partial refund (full minus attendance fee) |
| **After proceedings have started** | Job is in progress | Treated as a regular job — CSR delivers what was completed; standard pricing applies | No cancellation refund; attorney pays for what was completed |

**Why the 24-hour cutoff:**

Most CSRs need to either (a) commit travel/setup time the day before or day-of, or (b) decline other bookings to hold the slot. 24 hours is the industry-standard buffer where they can still rebook the slot. Inside 24 hours, they've already lost the day.

**Force majeure exceptions:**

- Court-ordered postponement of the proceeding → no cancellation fee (treated like the court canceling, not the attorney)
- Documented emergency (medical, natural disaster) → admin discretion; typically waived
- Both parties stipulate to reschedule before any work happens → no fee

These are admin-reviewed case by case, not automated.

---

## Certified Non-Appearance (CNA) policy

A CNA happens when the CSR shows up for a scheduled job, but the witness or other essential party doesn't appear, so no testimony is taken. The CSR may produce a brief "non-appearance" record (1-3 pages stating who appeared, who didn't, when proceedings ended).

### Two sub-scenarios

#### CNA with brief transcript

The CSR produces a short certified document recording the non-appearance. Standard practice — courts and attorneys often want this on the record.

**Pricing:**
- Full attendance fee (half-day or full-day, whichever was booked)
- Per-page rate for the brief CNA transcript (typically 1-3 pages)
- Platform fee applies to the total
- CSR receives 100% of attendance fee + 100% of statutory page rate

#### CNA without transcript

The CSR shows up, witness doesn't appear, no transcript is produced.

**Pricing:**
- Full attendance fee only (half-day or full-day)
- No per-page charges
- Platform fee applies to the attendance fee
- CSR receives 100% of attendance fee

### How the CSR marks a job as CNA

When uploading the transcript through the platform, the CSR selects a "Job type" option:

- **Standard transcript** (default — proceedings happened normally)
- **Certified Non-Appearance with transcript** (1-3 page CNA record produced)
- **Certified Non-Appearance — no transcript** (just attendance, no testimony taken)

For the CNA-with-transcript option, the CSR uploads the brief CNA document the same way they'd upload any transcript. For the no-transcript option, no file is uploaded — the CSR just marks the job complete with the CNA designation and notes describing the non-appearance.

### What the attorney sees

- Delivered jobs marked as CNA show a clear "Certified Non-Appearance" badge
- The invoice itemizes:
  - Attendance fee (half-day or full-day)
  - CNA transcript pages (if applicable)
  - Platform fee
- Standard 2-business-day acceptance window applies
- Standard auto-release applies if attorney doesn't respond

### Why no discount for CNA

Some attorneys may ask "why am I paying full attendance for a job where nothing happened?" The answer: **the CSR did everything they were asked to do.** They blocked their day, traveled, set up, and stood ready. The witness's failure to appear is not the CSR's responsibility — and in most cases, it's the attorney's responsibility (their client, their adversary's client, or their subpoena that didn't get served properly).

This is consistent with industry standard. Charging less for CNAs would penalize CSRs for events outside their control, which would make Dewey Sholes a worse deal for them than agencies — defeating the whole purpose of the platform.

---

## Edge cases

### Witness shows up very late

**Not a CNA.** This is a regular job that ran shorter than expected. Standard pricing applies based on what was actually transcribed.

### Case settles or motion is withdrawn before the hearing proceeds

Treated like a CNA with brief transcript. CSR documents the disposition on the record (pages stating the case status with appearances noted). Full attendance fee + brief page count.

### Multiple witnesses, one no-shows but others appear

Not a CNA — proceedings happened with the witnesses who appeared. Standard pricing. CSR can note the missing witness in their certificate.

### Attorney didn't show but witness did

Rare. Treat as a CNA from the witness's perspective, with attendance fee owed to the CSR. Witness is compensated separately if they're entitled to a witness fee under CCP § 2020.230.

### CSR is late or doesn't show

Not a CNA situation — this is a CSR performance issue. Triggers the late delivery / deplatforming policy (strikes, possible reassignment). CSR forfeits attendance fee.

### Reschedule after a CNA

Counts as a new booking with a new attendance fee. The original CNA is closed and paid; the new appointment is its own job.

---

## Pilot phase considerations

During the pilot, we handle ambiguous cases case-by-case rather than enforcing strict automated rules. Aud personally reviews any cancellation or CNA dispute that arises so we can:

- Build a feel for how often these scenarios actually occur
- Refine the policy if real cases surface gaps
- Maintain attorney goodwill while still protecting CSR earnings
- Document specific edge cases as they come up

After the pilot, we'll formalize the dispute resolution process based on what we've learned.

---

## Build effort (real platform)

| Component | Effort |
|---|---|
| CSR upload modal: add Job type radio (standard / CNA with transcript / CNA no transcript) | 0.5 day |
| CNA badge on delivered job card (CSR side) | 0.25 day |
| CNA badge on attorney's case detail view | 0.25 day |
| Invoice formatting changes for CNA jobs (no per-page charges if CNA-no-transcript) | 0.5 day |
| Attorney "Cancel order" flow with time-based fee calculation | 1 day |
| Server-side fee calculation logic (24-hour rule, en-route detection) | 1 day |
| Refund processing via Stripe | 0.5 day |
| Email notifications (cancellation confirmation, refund processed, CNA delivered) | 0.5 day |
| **Total** | **~4.5 days** |

---

## Related documents

- `billing_and_payment_policy.md` — payment timing
- `late_delivery_and_deplatforming_policy.md` — what happens if the CSR is the one who fails to appear
- `payment_failure_policy.md` — what happens if cancellation refund fails
- `transcript_correction_policy.md` — separate scenario; not applicable to CNAs
- `scope_public_court_proceedings_only.md` — platform scope (court hearings only)
- General contract principles — attorney's obligation to pay vendor for committed time

---

## Open questions

1. Should we offer attorneys a "cancellation insurance" option at booking time (small fee, full refund regardless of timing)? Probably not for MVP, but worth revisiting.
2. Should CSRs be able to negotiate their own cancellation/CNA terms separate from platform defaults? No — keeping it standardized simplifies trust and pricing.
3. How should we surface CNA frequency on attorney profiles? If an attorney has 5+ CNAs in a month, that might indicate poor witness coordination — but we shouldn't penalize them for one or two. Probably just log internally; don't display.
