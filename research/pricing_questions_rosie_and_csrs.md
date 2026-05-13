# Pricing recalibration: open questions for Rosie + CSR user testing

**Owner:** Aud
**Last updated:** 2026-05-12
**Status:** Draft — pre-pilot. Capture answers here before locking V1 pricing in code.

---

## Why this exists

Current DS pricing (half $255 / full $509 / trial $2,200, page rate $3.67) was anchored to a single data point (LA Superior statutory per-diem, minus one-third) without a comp survey behind it. Recent research has surfaced gaps. Before we change the numbers we need (a) Rosie's domain read on the legal and market context, and (b) CSR feedback on whether the gaps we found are real to them.

---

## Research done so far

### Court statutory per-diems (Gov. Code § 68086)
What parties pay courts when an official court-employed reporter attends a civil proceeding. Surveyed 11 CA courts (see [csr_agency_live_attendance_rates.md](csr_agency_live_attendance_rates.md)).
- **Bay Area mean:** $298 half-day / $596 full-day (SF $316/$631, Alameda $280/$560)
- **LA Superior outlier:** $382 / $764
- DS's current $255/$509 sits *below* the Bay Area court rate. CSR keeps 100% of it, but the headline number is lower than what attorneys pay the court for the same service.

### Private agency live-attendance rates
Surveyed 17 CA agencies. **15 are quote-walled.** Only Denise Paddock CSR (OC solo) publishes — $1,900/day for private hearing work. Judicial Council via Bay Area Legal Aid cites ~$3,300/day average for private hearing reporters (wide-band aggregate). **This is the data gap user testing should close.**

### Out-of-state rate cards (8 cards reviewed 2026-05-12)
Private CSRs and one CA agency (Atkinson-Baker) reporter-payout sheet. The relevant signals for DS court-only scope:
- **Atkinson-Baker pays its CSRs $4.40/pg for hearings/trials/arbitrations** (vs. $3.00/pg for personal-injury depos). This is the CA agency take-out rate, not the client rate.
- Private CSRs charge $5–7/pg direct for hearings.
- Standard surcharges across all cards: interpreter (+$0.25–0.70/pg), medical/expert (+$0.20–0.70/pg), in-person modality (+$125–$240 per appearance), jury trial (+$100–$200/day), after-hours ($40–$100/hr), travel ($50/hr or 40¢/mi past 100 miles), weekend (varies).
- Most private cards use a "2-hour minimum + hourly add-on" model rather than half/full day.

### CSR Facebook group (Court Reporter Rates Discussion, 11K members)
Public group but feed gated to members. Only the pinned Featured post was visible: a CA CSR asking about per-page rates for interpreted depositions, complaining that Steno's $0.50 interpreter surcharge doesn't compensate for the slashed page count (60 pages in 4 hours). Replies: $1–2/pg. **Confirms interpreter surcharge is a live pain point in the CA market.** Aud cannot join (not a CSR); CSR user testing or Rosie's network is the path to more.

### What current DS pricing already covers
- Page rate, simultaneous-copy rate, separate-copy rate (Gov. Code § 69950 baseline)
- Turnaround multipliers (rush 1.5x, standard 1.0x, economy 0.85x)
- Half / full / trial-day attendance
- CNA with/without transcript
- 24-hour cancellation rule
- Audio transcription minimum ($50)
- Court hearings only — depos, rough draft, realtime, video, exhibits explicitly out of scope

### The headline gap
Atkinson-Baker pays its reporters **more per page for hearing transcripts ($4.40)** than DS's flat $3.67. A CSR moving an Atkinson-Baker hearing to DS would earn less per page even keeping 100%. That's the recalibration question.

---

## Hearing transcript vs. audio transcription — quick refresher

Both produce a certified written record, but the workflow and pricing logic differ:

| | Hearing transcript | Audio transcription |
|---|---|---|
| CSR present at the hearing? | Yes — steno in real time | No — works from a recording |
| Attendance fee? | Yes (half / full / trial day) | No — only the page rate |
| Source material | CSR's stenographic notes | Audio file supplied by court or party |
| Turnaround | Tied to hearing date; rush common | Asynchronous, ordered after the fact |
| Speed and accuracy | Faster, fewer guesses (CSR heard it live) | Slower; quality depends on audio clarity |
| Appellate acceptance | Standard | Court-dependent; some CA depts. require a CSR-prepared transcript for appeal |
| Risk for the CSR | Live skill on the day | Hours of careful playback work |

Implication: hearing transcript and audio transcription are different products and probably shouldn't share a page rate. The current DS model treats them identically.

---

## Questions for Rosie

Grouped by theme. Domain/legal answers we can't get from web research or CSR user testing.

### A. Legal status of the $3.67 page rate

1. Is Gov. Code § 69950's page rate a **legal cap** for any party who orders a hearing transcript from a privately-hired CA CSR, or is it the cap only when the *court* (or court-paid reporter) is producing the transcript?
2. If a private CSR takes down a public court hearing through DS, what does CA law say about their per-page rate? Is there freedom to charge above $3.67/pg, and if so, what would be the legal exposure for DS if a buyer challenged a $5/pg rate?
3. Are there appellate-courts-specific rules in CA that require a CSR-prepared transcript (vs. audio-derived) for the record to be accepted on appeal? Want to confirm before we describe audio transcription as a "substitute" anywhere in marketing.

### B. Hearing transcript vs. audio pricing

4. Should hearing transcript and audio transcription have **different page rates** in DS? Your gut: how much higher should hearing transcript be?
5. From your practice, what's the typical attorney's perceived value gap between an audio-derived transcript and a CSR-prepared one? Would attorneys pay more for the CSR-prepared transcript?

### C. Agency economics

6. Of the agencies you've worked with directly (or know reporters who have), what's the typical **split between CSR and agency** on (a) attendance fees and (b) transcript page rates? Atkinson-Baker's reporter card suggests $4.40/pg take-out on hearings — is that representative, or low/high for the CA market?
7. Have you ever seen a CSR-favorable split (70%+) on transcripts? Any conditions?

### D. Pricing dimensions we haven't modeled

8. **In-person vs. remote** — do CA courts and CSRs see this as different work, priced differently? Your sense of whether DS should differentiate.
9. **Jury vs. non-jury trial** — material enough to price separately, or is a single trial-day rate fine for V1?
10. **Interpreter surcharges** — is this a real expectation in CA hearing work (not just depos)? What's the rate to look like?
11. **Travel** — does the CA market treat travel time as billable, or absorbed in the per-diem? Bay Area pilot will have CSRs covering multiple counties.
12. **After-hours / weekend** — for court hearings specifically (not depos), how often does this come up in CA? Family law TROs, emergency motions?
13. **Calendar calls / short hearings (under 30 min)** — should we have a sub-half-day "appearance" tier, or does the simplicity of half-day-as-floor win?

### E. Scope edge cases

14. **Public meetings / public hearings / agency hearings** (city council, school board, ALJ) — in DS scope or out? Many CSRs do this work; rate-card data suggests it's a separate quote-only category.
15. **Workers Comp hearings at WCAB** — they're public quasi-court. In scope?
16. **Daily transcript copy during multi-day trials** — when an attorney orders next-morning delivery of each trial day. Do you order this in your practice? How is it typically priced (per-day with rush multiplier, or flat)?

### F. Cancellation and CNA realism

17. Is our 24-hour cancellation cutoff realistic, lenient, or strict by CA market norms?
18. CNA frequency — in your practice, roughly how often does a hearing happen where the CSR shows up but no testimony is taken? Helps us size the pricing-risk exposure.
19. Jury-trial cancellations are penalized more heavily in the private market ($400 vs. $150 for non-trial). Worth tiering in DS, or over-engineering?

### G. Recalibration framing

20. Of the options for the live-attendance base rate — (a) Bay Area court mean ($298/$596), (b) SF specifically ($316/$631), (c) keep current ($255/$509), or (d) market-blend factoring in the Atkinson-Baker reporter take-out — which do you think we should pick, and why?
21. Same question for the **hearing transcript page rate**: keep at statutory $3.67, raise to ~$5 to match Atkinson-Baker's reporter pay-out, or let CSRs set their own within a band?

---

## Questions for CSRs in user testing (pricing-focused)

The existing [user_testing_csr_guide.md](user_testing_csr_guide.md) covers the broader pitch, profile, and trust questions. **These are pricing-specific additions** for the same 5-CSR pilot, weighted toward Bay Area live-attendance CSRs.

### A. Current rate benchmarks (open-ended, anchor data)

1. What's your current per-diem for live attendance — half-day, full-day, trial-day?
   - First through an agency, then directly to a private attorney. (Capture both numbers.)
2. What's your current per-page rate for (a) hearings, (b) audio transcription, (c) depositions if applicable?
3. When you work through an agency, what percentage of the attorney's payment do you keep? Best estimate is fine; not asking for contracts.

### B. Reaction to DS pricing

4. *Show DS's current rates: $255 half / $509 full / $2,200 trial, page rate $3.67, 12% buyer fee, CSR keeps 100% minus optional $99/yr listing.*
   - Where does this sit relative to what you currently earn? Surprised? Reasonable? Insulting?
   - If we raised the hearing transcript page rate to $5, would that change your answer?
5. What would make this an obvious "yes" for you — what's the floor?

### C. Pricing dimensions we may add

For each dimension below, ask:
- **Do you currently charge for this? At what rate?**
- **If DS supported this, would it matter to you? Or feel like over-complication?**

6. **In-person vs. remote** modality differential
7. **Jury trial vs. non-jury trial** premium
8. **Interpreter** surcharge (per-page or per-day)
9. **Medical / expert / technical witness** surcharge on hearings
10. **After-hours** (after 5pm, after 6pm) hourly add-on
11. **Weekend** premium
12. **Travel** time and/or mileage
13. **Short-appearance** (under 2 hours) sub-half-day tier
14. **Daily transcript copy** during multi-day trials (overnight delivery)

### D. Cancellation and CNA

15. What's your current cancellation policy for attorneys who cancel? Cutoff time, fee amount.
16. CNA — when this happens to you, how is it currently priced? Full attendance fee? Reduced?
17. DS proposes: full attendance fee owed if attorney cancels within 24 hours, full fee if CSR shows up. Does this match your expectation?

### E. The agency-vs-DS comparison

18. If you keep 100% of your stated rates (with attorney paying a 12% buyer fee on top), what page rate would you set for a hearing transcript? Free-text.
19. What's the deal-breaker — what would make you immediately say "no, this rate is too low to be worth my time"?
20. What pricing dimensions in your existing agency contracts feel like over-engineering when you read them? Anything DS could *simplify out* without losing CSRs?

### F. Hearing transcript vs. audio specifically

21. Do you do both hearing-attendance work and audio-transcription work? If both, do you charge a different per-page rate for each?
22. What's the time multiplier for audio transcription vs. live-hearing transcript production? (E.g., 1 hour of clean audio = how many hours of transcription work?)
23. Are there cases where you'd refuse audio transcription work? (Bad audio, multiple speakers, etc.)

---

## How this feeds back into the product

Once we have Rosie's answers and 5 CSR conversations, we should be able to set:

1. **Live attendance base rate** (Bay Area court mean? SF specifically? Hold current?)
2. **Hearing transcript page rate** (statutory $3.67, raised to match Atkinson-Baker, or CSR-set?)
3. **Audio transcription page rate** (same as hearing, or lower since no live skill?)
4. **Which surcharge dimensions to model in V1** vs. which to park for V2
5. **Whether the "trial day" rate should split** into jury / non-jury

Anything beyond V1 goes into a pricing-roadmap doc with explicit "we heard this but deferred" reasoning, so we're not pretending we didn't hear it.

---

## Related documents

- [csr_agency_live_attendance_rates.md](csr_agency_live_attendance_rates.md) — court statutory per-diem survey + the agency rate gap
- [user_testing_csr_guide.md](user_testing_csr_guide.md) — full CSR user testing protocol (this doc adds pricing depth)
- [marketing_strategy_master.md](marketing_strategy_master.md) — overall pilot strategy
- [../governance-and-process/pilot_pricing_and_referrals.md](../governance-and-process/pilot_pricing_and_referrals.md) — current DS pricing in code
- [../governance-and-process/minimum_fees_and_waiting_time.md](../governance-and-process/minimum_fees_and_waiting_time.md) — what DS explicitly leaves out and why
- [../governance-and-process/cancellation_and_cna_policy.md](../governance-and-process/cancellation_and_cna_policy.md) — current cancellation/CNA stance
