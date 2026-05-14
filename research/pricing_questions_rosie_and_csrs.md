# Pricing recalibration: open questions for Rosie + CSR user testing

**Owner:** Aud
**Last updated:** 2026-05-12
**Status:** Draft – pre-launch. Capture answers here before locking V1 pricing in code.

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
Surveyed 17 CA agencies. **15 are quote-walled.** Only Denise Paddock CSR (OC solo) publishes – $1,900/day for private hearing work. Judicial Council via Bay Area Legal Aid cites ~$3,300/day average for private hearing reporters (wide-band aggregate). **This is the data gap user testing should close.**

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
- Court hearings only – depos, rough draft, realtime, video, exhibits explicitly out of scope

### The headline gap
Atkinson-Baker pays its reporters **more per page for hearing transcripts ($4.40)** than DS's flat $3.67. A CSR moving an Atkinson-Baker hearing to DS would earn less per page even keeping 100%. That's the recalibration question.

---

## Hearing transcript vs. audio transcription – quick refresher

Both produce a certified written record, but the workflow and pricing logic differ:

| | Hearing transcript | Audio transcription |
|---|---|---|
| CSR present at the hearing? | Yes – steno in real time | No – works from a recording |
| Attendance fee? | Yes (half / full / trial day) | No – only the page rate |
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

6. Of the agencies you've worked with directly (or know reporters who have), what's the typical **split between CSR and agency** on (a) attendance fees and (b) transcript page rates? Atkinson-Baker's reporter card suggests $4.40/pg take-out on hearings – is that representative, or low/high for the CA market?
7. Have you ever seen a CSR-favorable split (70%+) on transcripts? Any conditions?

### D. Pricing dimensions we haven't modeled

8. **In-person vs. remote** – do CA courts and CSRs see this as different work, priced differently? Your sense of whether DS should differentiate.
9. **Jury vs. non-jury trial** – material enough to price separately, or is a single trial-day rate fine for V1?
10. **Interpreter surcharges** – is this a real expectation in CA hearing work (not just depos)? What's the rate to look like?
11. **Travel** – does the CA market treat travel time as billable, or absorbed in the per-diem? Bay Area launch will have CSRs covering multiple counties.
12. **After-hours / weekend** – for court hearings specifically (not depos), how often does this come up in CA? Family law TROs, emergency motions?
13. **Calendar calls / short hearings (under 30 min)** – should we have a sub-half-day "appearance" tier, or does the simplicity of half-day-as-floor win?

### E. Scope edge cases

14. **Public meetings / public hearings / agency hearings** (city council, school board, ALJ) – in DS scope or out? Many CSRs do this work; rate-card data suggests it's a separate quote-only category.
15. **Workers Comp hearings at WCAB** – they're public quasi-court. In scope?
16. **Daily transcript copy during multi-day trials** – when an attorney orders next-morning delivery of each trial day. Do you order this in your practice? How is it typically priced (per-day with rush multiplier, or flat)?
17. **Multi-copy billing structure by case type** *(added 2026-05-13)* – Tina Sherman (CA WC reporter, Facebook 5/13) confirmed CA WC is **automatic O+2** (Original + 2 certified copies on every transcript). General civil depo is typically O+1 (or O-only). The CSR's rate applies to each deliverable, so WC effectively bills ~2x per page count vs. an O-only job. Two product questions for you: (a) Should the DS booking flow default to O+2 for WC jobs, O+1 for civil depos, O-only for court hearings – or let the ordering attorney choose? (b) Should the per-copy rate be CSR-settable within bands (consistent with our broader rate-setting design) or platform-fixed at the simultaneous-copy / separate-copy rates already in `index.html:2747`? This affects the multi-party cost-splitting UX and the billing engine.

### F. Cancellation and CNA realism

17. Is our 24-hour cancellation cutoff realistic, lenient, or strict by CA market norms?
18. CNA frequency – in your practice, roughly how often does a hearing happen where the CSR shows up but no testimony is taken? Helps us size the pricing-risk exposure.
19. Jury-trial cancellations are penalized more heavily in the private market ($400 vs. $150 for non-trial). Worth tiering in DS, or over-engineering?

### G. Recalibration framing

> **Update 2026-05-13:** After full review of the 10+ rate cards Aud shared (folded into [csr_agency_live_attendance_rates.md § 4](csr_agency_live_attendance_rates.md)), the recalibration anchors have shifted materially. The court-statutory options below (a, b, c) are now understood as *cost-recovery floors for court-employed reporters*, not market prices. Private CA hearing rates cluster at **$1,800-3,600 full-day** (Denise Paddock's published $1,900, Rosie's Contra Costa ~$3,600, Judicial Council aggregate ~$3,300). The recalibration target is no longer "what does the court charge" but "what's a defensible private-market price that's clearly cheaper than agency but still pays CSRs above their agency take-out."

20. **(Revised 2026-05-13)** Of the recalibrated options for the live-attendance base rate – (a) DS launch ~50% below agency at **$900 half / $1,500 full**, (b) split-the-difference at **$1,050 half / $1,650 full** (between a and c – the "I don't want to undersell, but I don't want to overshoot before data" hedge), (c) more aggressive at **$1,200 half / $1,800 full** (closer to private-agency floor), (d) conservative at **$700 half / $1,200 full** (above court statutory but still well below market), or (e) hold current $255/$509 pending data – which is right, given the CA-vs-FL premium and your Contra Costa experience?

> **Practical note:** Aud's read after the rate-card review (2026-05-13) is that **option (b) – $1,050 half / $1,650 full – is the smartest hedge for launch**. It's still ~40-50% below typical CA agency rates ($1,800-3,000), ~75% above court statutory ($596 Bay Area mean), and gives CSRs a substantial raise vs. agency take-out. The ±20% CSR rate-setting band means premium CSRs can position up to $1,260/$1,980 and cold-start CSRs can sit at $840/$1,320 – so the published default is the *middle*, not a ceiling or floor. Final number should be validated by Stage 1 CSR survey results (Q7/Q8 ask CSRs their own private-direct rates). If 30-60 CSR survey responses cluster materially above or below $1,650 full-day private rate, adjust accordingly before launch launch.

20b. **(Added 2026-05-13)** Trial-day reframing: rather than the standalone $2,200 trial-day rate, should trial-day be **full-day × a trial-premium multiplier** (e.g., 1.3-1.5× full-day = $1,950-$2,250 at the recommended $1,500 full-day)? This keeps trial-day pegged to full-day so it updates when we revisit the base rate.

21. **(Revised 2026-05-13; original answer stale)** Hearing transcript page rate – given the May 2026 clarification that § 69950 doesn't bind privately-retained CSRs, the options are now: (a) hold at the conventional statutory rate (~$3.67 with 3.25 folio multiplier), (b) raise to ~$5 to match Atkinson-Baker reporter take-out, (c) raise further to ~$5.50-6 to match what private agencies actually charge clients (Caldarella $5.50, Lexitas $5.95), or (d) let CSRs set within a band of platform default. Your earlier answer said "keep at statutory" – that was under the older statutory-cap understanding. What's the right call now?

---

## Questions for CSRs in user testing (pricing-focused)

The existing [user_testing_csr_guide.md](user_testing_csr_guide.md) covers the broader pitch, profile, and trust questions. **These are pricing-specific additions** for the same 5-CSR launch test, weighted toward Bay Area live-attendance CSRs.

### A. Current rate benchmarks (open-ended, anchor data)

1. What's your current per-diem for live attendance – half-day, full-day, trial-day?
   - First through an agency, then directly to a private attorney. (Capture both numbers.)
2. What's your current per-page rate for (a) hearings, (b) audio transcription, (c) depositions if applicable?
3. When you work through an agency, what percentage of the attorney's payment do you keep? Best estimate is fine; not asking for contracts.

### B. Reaction to DS pricing

4. *Show DS's current rates: $255 half / $509 full / $2,200 trial, page rate $3.67, 12% buyer fee, CSR keeps 100% minus optional $99/yr listing.*
   - Where does this sit relative to what you currently earn? Surprised? Reasonable? Insulting?
   - If we raised the hearing transcript page rate to $5, would that change your answer?
5. What would make this an obvious "yes" for you – what's the floor?

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
16. CNA – when this happens to you, how is it currently priced? Full attendance fee? Reduced?
17. DS proposes: full attendance fee owed if attorney cancels within 24 hours, full fee if CSR shows up. Does this match your expectation?

### E. The agency-vs-DS comparison

18. If you keep 100% of your stated rates (with attorney paying a 12% buyer fee on top), what page rate would you set for a hearing transcript? Free-text.
19. What's the deal-breaker – what would make you immediately say "no, this rate is too low to be worth my time"?
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

## Strategic framing – Rosie's "streamline, not eliminate" thesis

Added 2026-05-13 after Rosie's reaction to the Caldarella agency invoice (see [agency_invoice_evidence.md](agency_invoice_evidence.md)).

> "I think the agency justifies its admin costs but the whole point of the platform is not quite eliminating but streamlining and automating those tasks." – Rosie, 2026-05-13

**Why this matters:** the agency invoice from Caldarella's Facebook post had four "admin" line items totaling **$557 (24% of the bill)** – Administrative/Account Service Fee, Production Fee, E-Bundle, Electronic Delivery, plus exhibit handling. Each is a real task someone has to perform: scheduling, formatting the PDF, bundling files, sending the email, scanning exhibits.

**The DS thesis isn't that these tasks are fake.** It's that software does them at near-zero marginal cost where the agency does them with paid humans:

| Agency line item | On DS |
|---|---|
| Admin / scheduling | Built into booking flow – pennies of compute |
| Production fee (PDF assembly) | Template + CSR upload – zero |
| E-Bundle | Auto-generated on transcript upload – zero |
| Electronic delivery | Auto-email on completion – zero |
| Exhibit handling | CSR handles via platform OR firm handles own – zero platform cost |

That's how a 24%-of-invoice agency markup compresses to an 11–12% platform fee. **Not by eliminating the work – by automating it.**

**Why this is a better brand pitch than "agencies are evil":**

- It's the truth (agencies do real work)
- It positions DS as a peer / replacement, not an attacker
- It's the same story as DoorDash vs. restaurant phone delivery, or Stripe vs. merchant-services brokers – software automating coordination work humans used to do
- It survives any future direct comparison: agencies can match a fee rate, but they can't match a fee rate plus near-zero per-job overhead

This framing belongs in landing-page copy, cold-email body text, and the eventual CSR pitch deck. **It's also a quote we should attribute back to Rosie** if/when DS does press – she said it cleanest.

---

## Rosie's vision (worth quoting back to her in marketing)

Also from her 2026-05-12 answers:

> "My vision for this is that DS will charge law firms less than the current standard, but reporters will keep more of it versus agencies, so it's a win-win."

That's the brand positioning thesis in 27 words. The agency invoice evidence in [agency_invoice_evidence.md](agency_invoice_evidence.md) shows it's quantitatively true: same $2,311 agency invoice becomes $1,842 on DS – attorney saves $469, CSR earns $241 more. Win-win is not aspirational; it's the math.

---

## Answers received from Rosie (2026-05-12)

Captured from her 2026-05-12 written response. **Important caveat:** Q1–Q5 (legal status of § 69950 and hearing-vs-audio pricing) were answered before the 2026-05-13 clarification that § 69950 applies to court-administered transcripts, not privately-retained CSRs. Her answers on transcript page rates reflect the older "statutory cap on all transcripts" understanding. Her answers on **appearance fees, agency economics, scope edge cases, and cancellation realism** are not affected by that clarification and remain authoritative.

### Headline data points (new, not in any prior research)

- **Contra Costa private-agency rate:** ~$1,800 for a half-day hearing. (Rosie, from a recent matter she handled.) This is the first published-by-someone-actually-paying-it CA private hearing rate we've captured. Our current DS half-day rate ($255) is **7x below** this figure. Even the SF-rate proposal ($316) is 6x below.
- **LA market:** "Attorney fee rates are close to twice Bay area rates, and as I recall deposition reporters charged a lot more too." Confirms LA is the high-rate outlier in CA, consistent with the statutory per-diem survey.
- **Appearance fees are unregulated.** Rosie: "Showing up and being at the hearing is different, and I think it's pretty unregulated." Consistent with the 2026-05-13 statutory clarification – § 69950 doesn't reach appearance/per-diem fees regardless of how it's read.

These should be folded into [csr_agency_live_attendance_rates.md](csr_agency_live_attendance_rates.md) as live data points.

### Q&A summary (selected high-value answers)

**Audio transcription positioning (Q3, Q5):**

Rosie was emphatic: "Audio transcriptions are not a substitute. Don't call them that. They're only used when the court approves them because no CSR was available. The substitute for audio recordings is no transcript at all." Also: "it's a misdemeanor to make your own recording of a hearing. The audio files are only provided when the court has approved them."

Marketing implication: never describe audio transcription as a fallback or alternative to live-attended hearings. Audio is an *exception* the court grants when no CSR was available; the default substitute is no transcript at all. Re-read any current copy that frames audio as "another way to get a transcript."

**Agency economics (Q6, Q7):**

Rosie: "I've never been on the CSR side. I don't know."

Implication: this question goes to CSR user testing. Rosie can't fill the gap from her own experience. The Caldarella invoice + Atkinson-Baker rate-card analysis are our best current data; CSR conversations need to refine the typical-split number.

**In-person vs. remote (Q8):**

> "That's a hot-button issue. There's a big debate in the whole industry about whether in-person or remote should be treated differently. Remote saves on travel costs and it seems to me the CSRs like it better. If they travel to be in person, they can charge for travel and I believe incidentals. So that's where the difference would be. I think we research what everyone else is doing and do the same."

Implication: don't innovate here. Mirror the market consensus. Travel and incidentals are the existing differentiator. Probably means we add a travel-time billable to in-person jobs and otherwise treat remote and in-person identically – pending CSR user testing to confirm.

**Travel (Q11):**

> "Travel time is very billable and it's usually a pretty big expense."

Direct quote. Travel needs to be a billable line item in V1, not an afterthought.

**After-hours and weekend (Q12):**

> "Almost never. The courts are all open at specified days and times which are published to the public in advance and they're closed at all other times. ... Weekends absolutely never."

Implication: V1 is correct to defer after-hours / weekend handling. Court hearings essentially don't happen outside court hours.

**Short hearings / calendar calls (Q13):**

> "Law firms hate half-day rates because you have to pay $1500 or $2000 for maybe 10 minutes. But it makes sense for reporters. ... I've completed 9:00 hearings by 9:05 and I've also sat around until noon. So the half-day might be the winner."

She also raised a future idea worth capturing: a "shared CSR" model where a firm or a couple of firms share a reporter's fee to cover multiple matters during the same time slot. Complex but interesting; parking it for now.

Implication: keep half-day as the floor for V1. Don't try to model sub-half-day appearances. Revisit if attorneys complain about it post-launch.

**Scope edge cases (Q14, Q15, Q16):**

- **Public meetings / agency hearings:** "I guess if they do it, we ought to offer it if we're the one-stop shop for transcript ordering. But I don't know who the buyers are or how we'd market to them. Outside my experience or expertise." – *Park for Phase 2+; not a V1 priority.*
- **WCAB / NLRB:** "I always forget WCAB, NLRB, etc. aren't actual court. They operate exactly like court, so yes, in scope." – *In scope. Update [scope_public_court_proceedings_only.md](../governance-and-process/scope_public_court_proceedings_only.md) to make this explicit.*
- **Daily transcript copy during multi-day trials:** "Usually during trial a draft is provided for free immediately to everyone who's paid for the real thing. The usefulness of a draft in this context is to prepare for the next day, as opposed to having a more accurate record for appeal. Everyone expects errors but they just need the information." – *Important billing-model insight: rough drafts during trial are FREE to those who already paid for the final. Update trial-pricing model accordingly.*

**Cancellation realism (Q17, Q18, Q19):**

- **24-hour cutoff:** Rosie thinks it's "in the middle." She walked through the CA tentative-ruling system: by 2pm day-before, judge publishes tentative ruling; by 4pm, parties must contest if they want a hearing. So **it's actually 4pm the day before** when parties know for certain whether the hearing will happen. Possible refinement: shift our cancellation cutoff from "24 hours" to "4pm the business day before" to align with how CA practice actually works.
- **CNA frequency:** "In any given calendar, if there's about 15 lines, at least two will have no-shows." But Rosie notes: for cases where the attorney is *hiring* a CSR specifically, no-shows are rare because the hiring attorney plans to be there. CNAs are more common for depositions. **Important terminology note:** *"testimony is something very specific, as opposed to attorneys, judges, and non-witnesses talking. Just to keep in mind for wording."* – review CNA policy copy for this distinction.
- **Jury trial cancellations:** "Jury trials are big money for the reporters, pretty much guaranteed to be working the full day several days in a row, so that makes sense. They're also way more likely to settle at the last minute, so this also makes sense... A jury trial is also the court's second-highest priority after domestic violence to provide its own reporters. We'll get fewer of those jobs than other types of hearings. Let's do what everyone else does here." – *Confirms higher cancellation penalty for trials is industry norm. Implement.*

**Recalibration framing (Q20, Q21):**

- **Q20 (live-attendance base rate):** Rosie hadn't seen the half-day/full-day options laid out the way we presented them. Her practical anchor: Contra Costa half-day at ~$1,800 from a private agency. Strong implication that our current pricing is dramatically below market.
- **Q21 (hearing transcript page rate):** Rosie said "keep it to the statutory but with all the add-ons that are allowed plus whatever the reporter is paid for their actual time." **This answer is stale after the 2026-05-13 statutory clarification** – the per-page cap she was preserving doesn't actually apply to privately-retained CSRs. We should revisit this question with her on the next call.

### Follow-ups that came out of Rosie's answers

Open product / governance changes worth landing before launch:

1. Update [scope_public_court_proceedings_only.md](../governance-and-process/scope_public_court_proceedings_only.md) to add WCAB and NLRB as in-scope (per Rosie Q15).
2. Add a travel-time billable line item to V1 pricing (per Rosie Q11).
3. Review CNA policy copy for "testimony vs. talking" terminology precision (per Rosie Q18).
4. Consider refining cancellation cutoff from "24 hours" to "4pm the business day before" to align with CA tentative-ruling practice (per Rosie Q17).
5. Audit any marketing copy that frames audio transcription as a "substitute" or "alternative" – replace with language reflecting that it's an exception when no CSR is available (per Rosie Q3, Q5).
6. Add daily-trial-draft-included logic to trial-day pricing (per Rosie Q16).
7. Update [csr_agency_live_attendance_rates.md](csr_agency_live_attendance_rates.md) with the Contra Costa $1,800 half-day data point (per Rosie Q20).
8. Re-pose Q21 (hearing transcript rate) on the next call with Rosie, now that we understand § 69950 doesn't cap privately-retained CSR transcripts.

---

## Related documents

- [csr_agency_live_attendance_rates.md](csr_agency_live_attendance_rates.md) – court statutory per-diem survey + the agency rate gap
- [user_testing_csr_guide.md](user_testing_csr_guide.md) – full CSR user testing protocol (this doc adds pricing depth)
- [marketing_strategy_master.md](marketing_strategy_master.md) – overall launch strategy
- [../governance-and-process/founding_member_program.md](../governance-and-process/founding_member_program.md) – current DS pricing in code
- [../governance-and-process/minimum_fees_and_waiting_time.md](../governance-and-process/minimum_fees_and_waiting_time.md) – what DS explicitly leaves out and why
- [../governance-and-process/cancellation_and_cna_policy.md](../governance-and-process/cancellation_and_cna_policy.md) – current cancellation/CNA stance
