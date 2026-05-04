# Minimum fees and waiting time policy

**Owner:** Aud
**Last updated:** 2026-05-02
**Status:** Draft — for pilot launch

---

## Why this exists

Two scenarios came up while researching CA court reporter compensation:

1. **Tiny transcripts** — what if an attorney orders a transcription of a 5-minute audio file? At the statutory rate ($3.67/page × ~3 pages), the CSR would earn $11 for the time spent transcribing, certifying, and delivering. Not viable.

2. **Hearing delays** — what if a CSR shows up for a 9 AM hearing that doesn't actually start until 10:30 AM? They've blocked 90+ minutes that they could have used for other work.

Industry CSRs (in the deposition market we're not entering) handle these with minimum transcript fees ($300+) and waiting-time billing (~$40/hour). We need our own answers since we're court-proceedings only.

---

## Decision: lean on the existing per-diem attendance fee model

**For live attendance jobs:** the half-day ($255) and full-day ($509) per diems already cover both scenarios. The CSR is paid for the day — whether it runs short, runs long, has waiting time, or any combination. **No separate minimum fee or waiting time billing needed.**

**For audio transcription jobs:** add a **minimum transcript fee of $50** to protect CSRs from losing money on tiny audio files. Anything under ~13 pages bumps up to the floor.

This matches Rosie's preference for keeping things simple, and it avoids reinventing the wheel. Per-diems exist precisely to handle the unpredictability of court time.

---

## Live attendance: per-diem covers everything

When an attorney orders a CSR for a live court hearing, they pay either a half-day ($255) or full-day ($509) attendance fee plus the per-page transcript rate. That attendance fee is intended to compensate the CSR for **the day**, not just the actual minutes of recorded testimony.

This means:

| Scenario | How it's handled |
|---|---|
| Hearing scheduled 9 AM, doesn't start until 10:30 AM | Full attendance fee owed. CSR was on-site as scheduled. |
| Hearing scheduled half-day, runs 30 minutes | Half-day attendance fee owed. CSR cleared their morning. |
| Hearing scheduled half-day, runs 6 hours | Bumps to full-day fee (>4 hours = full day per existing policy). |
| Continuance — hearing postponed to next day | Full attendance fee owed for showing up. New booking required for new date. |
| Hearing cancelled <24 hours out | Half-day attendance fee per cancellation policy. |
| CSR arrives, no proceedings happen at all | Full attendance fee per cancellation policy day-of rule. |

**Why this works:** the per-diem is a contract for the CSR's time, not for a specific volume of work. Courts are unpredictable; the per-diem absorbs that unpredictability.

**Edge case worth flagging:** if a hearing genuinely runs **all day plus several hours late** (rare but happens), the full-day fee may feel inadequate. We'll handle these case-by-case during pilot. If patterns emerge, we can add an "extended hours" tier later.

---

## Audio transcription: $50 minimum fee

For post-hearing audio transcription, there's no attendance fee — only the per-page rate. To prevent CSRs from losing money on tiny audio files:

**Minimum transcript fee: $50**

If the actual page-rate calculation comes out below $50, the order is billed at $50 instead.

### Math:

- $50 / $3.67 per page = ~13.6 pages
- Anything under 14 pages bumps to the floor
- 14+ pages bills normally at $3.67/page

### Why $50 specifically:

- Covers ~30-60 minutes of CSR time (transcription + certification + delivery)
- Reasonable for the attorney to absorb (well below the half-day attendance fee they'd pay for live)
- Industry-typical floors range $50-$300; deposition floors are higher because deposition rates are higher. For statutory-rate court work, $50 is appropriate.

### How it appears in the order flow

When the attorney orders a transcription, the price calculator shows:

```
Audio length: 15 minutes
Estimated pages: 8 pages (auto-calculated at ~35 pages/hr)
Statutory rate: $3.67 × 8 = $29.36
Minimum transcript fee: $50.00 ← applied (page rate below floor)
Platform fee (8% pilot): $4.00
Total: $54.00
```

For longer audio, the minimum doesn't kick in:

```
Audio length: 60 minutes
Estimated pages: 35 pages
Statutory rate: $3.67 × 35 = $128.45
Platform fee (8% pilot): $10.28
Total: $138.73
```

A small note on the calculator clarifies: "Orders below $50 are billed at our $50 minimum to ensure your CSR is fairly compensated for their time."

---

## What we're NOT adding

- **Separate waiting-time billing** for live attendance — the per-diem covers it
- **Realtime / rough draft surcharges** — these are deposition conventions, not common in court hearing work
- **Video surcharges** — courts handle their own video; not our problem
- **Interpreter surcharges** — interpreter-present transcripts already bill at the same statutory rate (same word count)

---

## Implementation effort

| Component | Effort |
|---|---|
| Update `calculateEstimate()` to apply $50 floor for transcription | ~15 minutes |
| Add minimum-fee disclosure in pricing calculator and order flow Step 4 | ~30 minutes |
| Update FAQ to mention the minimum | ~5 minutes |
| Update existing policy docs to cross-reference | ~10 minutes |
| **Total** | **~1 hour** |

---

## Related documents

- `billing_and_payment_policy.md` — payment timing
- `cancellation_and_cna_policy.md` — what happens when proceedings don't happen
- `pilot_pricing_and_referrals.md` — pilot pricing structure
