# Attorney Survey – Stage 1 of attorney research

**Owner:** Aud
**Last updated:** 2026-05-13
**Status:** Draft – ready for Rosie review before sending

---

## Two-stage research approach (parallel to CSR side)

Mirrors the CSR research structure from [csr_survey_questions.md](csr_survey_questions.md). Attorneys also get a broad survey first, then a subset converts to prototype walkthroughs.

| Stage | Format | Audience size | Time per respondent | Purpose |
|---|---|---|---|---|
| **1 – Survey (this doc)** | Anonymous web form | 30–60 responses | 5–7 minutes | Quantify pain points, test concept and pricing, validate featured-reporter idea |
| **2 – Prototype testing** | 1:1 video call walkthrough (new attorney guide to write) | 5 selected from survey | 60–75 minutes | Deep qualitative reactions to attorney UX |

This survey complements (not replaces) the existing [BriscoeSholes_Attorney_Survey.md](md/BriscoeSholes_Attorney_Survey.md), which is focused specifically on quantifying staff time and cost on the current transcript-ordering process. This one is concept + pricing + features.

Worth running both – the time-cost survey feeds the marketing claim ("firms save X hours per month"); this one feeds the product roadmap and pricing decisions.

---

## Survey design notes

- **Under 7 minutes.** Attorneys triage everything.
- **Mostly multiple choice and ranked-priority.** Two short free-text fields max.
- **Anonymous by default**, optional contact for follow-up walkthrough.
- **Concept paragraph lands before pricing questions.** Don't anchor on price up front.
- **Distribution:** Rosie's professional network, CA litigation paralegal associations (SFPA, LAPA), targeted LinkedIn boost, insurance defense firm directories.

---

## Survey questions

### Section 1 – Firm and practice (5 questions)

**Q1.** What best describes your practice? (select all that apply)
- Family law
- Civil litigation
- Probate / estate
- Personal injury (plaintiff)
- Personal injury (defense / insurance)
- Employment
- Criminal defense
- Intellectual property
- Other (please specify)

**Q2.** Firm size:
- Solo practitioner
- 2–5 attorneys
- 6–15 attorneys
- 16–50 attorneys
- 51+ attorneys

**Q3.** Where do you primarily practice in California? (multi-select)
- San Francisco / Bay Area
- Los Angeles / Orange County
- San Diego
- Sacramento / Central Valley
- Other (please specify)

**Q4.** Roughly how many court hearings does your firm typically need a CSR for per month?
- 0–2
- 3–5
- 6–10
- 11–20
- 20+

**Q5.** Roughly how many depositions does your firm book per month?
- 0–2
- 3–5
- 6–10
- 11–20
- 20+

---

### Section 2 – Current process pain (5 questions)

**Q6.** When you need a CSR for a court hearing, how do you typically book one? (select all that apply)
- Call an agency we have a relationship with
- Direct outreach to a specific reporter we've worked with
- Send a calendaring/paralegal team member to handle it
- Other (please describe)

**Q7.** How would you rate the overall experience of booking and paying for transcripts today?
- Smooth and predictable
- Generally fine, occasional friction
- Frustrating but workable
- Frustrating, expensive, opaque
- Extremely frustrating

**Q8.** Which of these frustrations have you experienced in the past 12 months? (select all that apply)
- Surprise line items on agency invoices
- High agency markups that seemed unjustified
- Difficulty getting a CSR for a short-notice hearing
- Last-minute reporter cancellations or no-shows
- Delays getting the transcript after the hearing
- Disputes over transcript accuracy
- Confusion about who pays for what when multiple parties are involved
- Difficulty finding a CSR who handles a specific case type
- None of the above

**Q9.** When the firm pays a transcript invoice today, can you tell what portion goes to the reporter vs. the agency?
- Yes, clearly itemized
- Sort of – I can guess
- No, it's opaque
- I've never thought about it

**Q10.** What's the single biggest frustration with the current CSR / transcript process? (free text, 1–3 sentences)

---

### Section 3 – Concept reaction (5 questions)

**Concept paragraph shown to respondents (~85 words):**

> Dewey Sholes is a new platform that connects California attorneys directly with court reporters for live-attended court hearings (with court-audio transcription supported when a reporter wasn't on the record and the court has released the audio). You book a reporter through the platform, and the reporter delivers the transcript to you directly. The platform handles scheduling, billing, and transcript delivery – replacing the agency middleman. Reporters keep 100% of their stated rate; you pay the reporter's rate plus a 12% platform fee. Pricing is transparent, with no surprise line items. Reporters are licensed CSRs verified through the California Court Reporters Board.

**Q11.** Based on that description alone, how interested would you be in trying this platform?
- Very interested
- Somewhat interested
- Neutral / need more info
- Not very interested
- Not interested at all

**Q12.** What appeals to you most about this concept? (select up to three)
- Transparent pricing (no hidden line items)
- Lower total cost than typical agencies
- Direct relationship with the reporter
- Faster booking
- Better-organized billing
- Reporter verification and ratings
- Other (please describe)

**Q13.** What concerns you most about this concept? (select up to three)
- Whether the reporter pool will be deep enough
- Reliability – will a reporter actually show up?
- Quality – how good are the transcripts?
- Trust – do I know who I'm hiring?
- Switching from my current agency relationships
- Platform dependability (uptime, support)
- Other (please describe)

**Q14.** Some platforms feature certain reporters in spotlight placements (like a "Featured Reporter" card on your dashboard). Would this be useful to you when picking a reporter to work with regularly?
- Yes – I'd use it to discover new reporters
- Maybe – if it's clearly editorial and not just paid placement
- Probably not – I'd rather see ratings and reviews
- No – I'd ignore it

**Q15.** If the platform let your firm save "favorite" reporters and auto-route future bookings to them first, would that be:
- Very valuable – main reason I'd use the platform
- Somewhat valuable
- Neutral
- Not particularly valuable

---

### Section 3a – How the matching flow should work (4 questions, added 2026-05-14, revised 2026-05-14)

**Read this first, then answer the questions below.**

> Here's the matching flow we're planning. When you submit a transcript order:
>
> 1. **You hit submit and walk away.** The system silently invites qualified reporters in widening batches – starting with your favorites (if any), then a small batch of 2 from the general pool, then 5 more, then more if needed.
> 2. **The moment a reporter accepts the job**, we send you a push notification + email. You're not asked to approve candidates in advance; you only get pinged when there's a real match.
> 3. **You land on a screen showing that reporter's profile and the exact cost** (the reporter's rate × your order specs + the 12% platform fee). You have **4 hours** (1 hour for Rush jobs) to confirm or veto the match.
> 4. **If you confirm** (or do nothing – it auto-confirms at the window's end), the match locks in and the reporter is told they're confirmed.
> 5. **If you veto**, you pick a reason from a fixed list (price too high, specialty mismatch, scheduling concern, prior bad experience, other). The vetoed reporter is told the attorney chose another reporter, and the cascade resumes finding the next match. You can veto up to **3 reporters per order** – after that the next match auto-confirms.

**Q15a.** Based on that description, does the flow feel:
- Right – I trust the cascade to find qualified reporters and just react when there's a match
- Mostly right – but I'd want to see and approve candidates before invitations go out *in some cases*
- Wrong – I want to see and approve all candidates *before* invitations go out, every order
- Not sure – depends on the case

**Q15b.** How often do you imagine actually using the veto button?
- Often – I'd expect to veto at least 1 in 5 matches
- Sometimes – only for clearly wrong matches (specialty, schedule, prior bad experience)
- Rarely – I'd trust the cascade most of the time
- Never – auto-match handles it; vetoing feels like extra work

**Q15c.** Are there specific case types or scenarios where you'd want to see and approve reporter candidates *before* invitations go out (instead of reacting after acceptance)? (select all that apply)
- High-stakes trial proceedings
- Sealed or confidential proceedings
- Cases with specialized terminology (medical, technical, financial expert witnesses)
- Cases where the reporter will work closely with my expert witness
- Cases with VIP / public-figure parties
- Multi-day or complex matters
- None – the post-acceptance veto pattern works for me on every order
- Other (please describe)

**Q15d.** When you see an accepting reporter's rate is meaningfully above the platform baseline (e.g. +15% or +20%), what would help you understand why and feel OK paying it instead of vetoing? (select all that apply, or free text)
- Their specialty match to your case type
- Their certifications (RPR, RMR, CRR)
- Their years of experience / job count
- Their rating + on-time delivery record
- Past cases they've worked similar to yours
- I don't need a justification – if they're qualified, the rate is what it is
- I wouldn't pay above baseline – I'd veto
- Other (please describe)

---

### Section 4 – Pricing perception (4 questions)

**Q16.** Today, what does your firm typically pay an agency for a half-day court hearing reporter appearance (no transcript ordered)?
- Free text – numeric. Range or estimate is fine.

**Q17.** If the platform charged a 12% buyer fee on top of the reporter's published rate, would that feel:
- Way less than I pay now – too good to be true
- A bit less – meaningful savings
- About the same
- A bit more – not worth switching
- Way more – wouldn't use

**Q18.** Some agencies add line items like "Administrative Fee," "Production Fee," "E-Bundle," "Electronic Delivery" – sometimes adding $200–500 to an invoice. Do these line items feel:
- Justified – agencies provide real services for that
- Sometimes justified, sometimes not
- Rarely justified
- Almost never justified – pure markup
- I don't pay close enough attention to know

**Q19.** Firms that sign up during our 6-month launch window are tagged as "founding firms" – you'd get founder-led onboarding, direct access to the team, and first dibs on new features as we build them. (Pricing is the standard 12% buyer fee from day one, the same as everyone else.) How important are those founding-firm perks to your decision to try the platform?
- Very important – wouldn't try without them
- Somewhat important
- Nice-to-have but not decisive
- Doesn't matter – I'd try it without them

---

### Section 5 – Depositions and other types (4 questions)

**Q20.** Depositions are not part of the platform's initial scope. We're starting with court hearings and audio transcription. If the platform later added deposition booking, would that:
- Make me much more likely to use it
- Make me somewhat more likely
- Doesn't affect my interest
- I primarily care about court hearings – depos aren't relevant

**Q21.** If the platform supported deposition booking but required your firm to handle scheduling (notice, subpoena, party coordination) – DS would only handle finding the reporter and managing billing – would that still be useful?
- Yes – that's how we already operate
- Yes if it's faster than my current process
- Only if DS handled scheduling too
- Not useful

**Q22.** Do you also book reporters for any of these? (select all that apply)
- WCAB (Workers Compensation) hearings
- NLRB hearings
- Public agency hearings (PUC, ALRB, etc.)
- Arbitrations
- City council / school board / public meetings
- Probate hearings
- None of the above

**Q23.** Any other features or services that would make this platform a clear choice for your firm? (free text, optional)

---

### Section 6 – Would your firm sign up? (3 questions)

**Q24.** How likely is your firm to sign up during our launch window (12% buyer fee, free CSR matching, no minimum commitments)?
- Very likely
- Somewhat likely
- Neutral
- Somewhat unlikely
- Very unlikely

**Q25.** Would you be willing to do a 60-minute video call with us to walk through the actual platform and give us deeper feedback? We'll pay you for your time.
- Yes – please contact me
- Maybe – depends on timing
- No

**Q26.** (If Yes or Maybe above) How can we reach you?
- Email (optional)
- Firm name (optional)
- Best practice area to dig into during the walkthrough (optional)

---

## What we're trying to learn from each section

| Section | Success looks like | Failure looks like |
|---|---|---|
| Firm and practice | Mix across practice types and firm sizes | Survey only reached one segment |
| Process pain | Surprise line items + agency markup show up as top frustrations (Q8, Q9) – validates DS thesis | Pain is elsewhere (slow delivery, quality) – we may be solving the wrong problem |
| Concept reaction | "Very interested" + "Somewhat interested" ≥ 50%; top concerns are operational (pool depth, reliability), not conceptual | Top concerns are conceptual ("I trust my agency"; "I don't want to learn a new tool") |
| Featured reporter (Q14) | >40% useful – validates discovery feature | <20% – defer feature indefinitely |
| Matching flow (Q15a–Q15d) | Majority say the cascade + post-acceptance veto pattern feels "right" or "mostly right"; veto frequency cluster is "rarely" or "sometimes" (not "often"); specific case-type triggers (sealed, expert witness) emerge as scenarios where pre-cascade review is wanted; rate-justification preference clusters around certs + specialty + experience | Majority want pre-cascade per-CSR approval on every order – means the auto-match philosophy is wrong for this audience and we need to rethink the order flow. OR: majority say they'd veto "often" – means our soft-preferences matching or rate-band positioning is off and we need to recalibrate before scaling. |
| Pricing (Q17–Q18) | 12% feels at-or-below current spend; line-item-frustration responses confirm DS positioning thesis | 12% feels expensive – we have a positioning problem |
| Founding-firm perks (Q19) | At least "somewhat important" for ~30%+ – non-pricing perks are doing real work as a sign-up incentive | "Doesn't matter" majority – founding-firm framing isn't adding anything; lean harder on functional pitch (transparency, no agency markup) |
| Depositions (Q20–Q21) | Strong "yes if you handle scheduling, fine if you don't" – validates the matching-only future path | Strong "only useful with full depo support" – confirms our depo strategy ceiling |
| WCAB/NLRB/agency (Q22) | Meaningful demand – confirms expanded-scope opportunity per Rosie | Low demand – keep scope tight |
| Sign-up intent (Q24) | >40% "very/somewhat likely" at 12% – pipeline real | <25% – firm-side acquisition harder than projected at this price |

---

## Distribution plan

- **Soft launch:** Rosie sends to 5 trusted attorney contacts to catch confusion in question wording. 1 week to refine.
- **Wave 1:** Rosie's professional network, CA litigation paralegal associations (SFPA, LAPA – paralegals will forward to attorneys), LinkedIn organic. 2 weeks.
- **Wave 2:** Paid LinkedIn targeting CA litigation attorneys at 5–50 person firms ($200 budget). 2 weeks.
- **Honorarium:** $25 digital gift card to first 30 completers ($750 cap). Higher than the CSR survey because attorney time is more expensive to compete for.

Target n = 30–60 completed responses. ~5–10 volunteers self-select for Stage 2 prototype testing.

---

## Related documents

- [csr_survey_questions.md](csr_survey_questions.md) – parallel Stage 1 survey for CSRs
- [md/BriscoeSholes_Attorney_Survey.md](md/BriscoeSholes_Attorney_Survey.md) – existing time-and-cost survey; run in parallel for the marketing-claim data
- [user_testing_legal_assistant_guide.md](user_testing_legal_assistant_guide.md) – existing prototype testing guide for paralegals; can be adapted for attorney walkthroughs (Stage 2)
- [marketing_plan_phase2_law_firms.md](marketing_plan_phase2_law_firms.md) – firm-side marketing strategy this survey supports
- [agency_invoice_evidence.md](agency_invoice_evidence.md) – the Caldarella invoice that informs Q9 and Q18
- [governance-and-process/founding_member_program.md](../governance-and-process/founding_member_program.md) – founding-firm program tested in Q19, Q24
