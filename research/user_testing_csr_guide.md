# User testing guide — CSRs (Stage 2 prototype walkthrough)

**Status:** Draft — refocused 2026-05-13 to be site-content / UX only. Concept and pricing questions now live in [csr_survey_questions.md](csr_survey_questions.md) (Stage 1).
**Owner:** Aud (drafting); Rosie (recruitment, co-facilitation).
**Last updated:** 2026-05-13

---

## Where this fits in CSR research

| Stage | Doc | Format | Purpose |
|---|---|---|---|
| 1 — Survey | [csr_survey_questions.md](csr_survey_questions.md) | Anonymous web form, 5–7 min, n=30–60 | Concept reaction, current rates, business-model feedback, pricing perception, featured-reporter validation, pilot interest |
| **2 — Prototype walkthrough (this doc)** | This doc | 45-min video call, n=5 | Reactions to the actual site, profile, business cards, order flow, UI/UX details |

**The split matters.** Stage 1 already establishes whether CSRs *like the concept*. Stage 2 doesn't re-litigate the concept — it tests whether the *actual product* delivers on the concept. Participants for Stage 2 are recruited from Stage 1 respondents who opted in (Q21).

---

## What we're trying to learn (Stage 2 specifically)

Five concrete site / UX questions that the survey can't answer because they require seeing the actual product:

1. **Does the public CSR profile feel right** to a working CSR? Specifically: cases-worked display, job-completion count, rating breakdown — comfortable or invasive?
2. **Does the reporter onboarding flow have friction** points that would cause real CSRs to bail?
3. **Does the order-acceptance flow** (invite card, response window, accept/decline) match what CSRs need to make an in-the-moment decision?
4. **Does the business-cards concept work in practice** — would CSRs actually hand them out? What would they want them to say?
5. **What's missing from the platform** that a working CSR would expect on day one but we haven't built?

These map to specific product/marketing decisions we've left open for prototype-stage testing. Concept-level questions (will CSRs use this, what kills trust, what does pricing look like) are handled by the survey.

---

## Method

**Format:** 45-minute video calls (Zoom or Google Meet). Recorded with consent.
**Sample size:** Up to 5 completed interviews. Pilot-stage scale; not aiming for statistical significance, just signal.
**Compensation:** $25 Starbucks gift card per completed interview. Sent digitally within 24 hours.
**Tools:** Zoom recording + transcript, simple notes doc, lightweight participant tracker.

**Recruitment criteria (mix within 5 slots — prioritize live attendance since that's the cards-strategy target):**
- 2-3 CSRs who do mostly **live attendance** in CA superior courts
- 1-2 CSRs who do **audio transcription** primarily
- At least 1 **newly licensed** CSR (within last 24 months) if possible — different incentive structure, no entrenched book of business
- Solo CSRs preferred over those embedded in agencies; we want decision-makers

**Recruitment channel (primary):**
- Stage 1 survey respondents who opted into Q21 follow-up. Filter by work-type mix above.

**Backup channels** (if Stage 1 doesn't produce enough opt-ins):
- Rosie's professional network (CSRs she's worked with on cases)
- CSR shortage action group contacts
- Direct outreach to recently licensed CSRs from the CRB directory

---

## Discussion guide

Total target: ~45 minutes. Time budgets are guidance, not hard caps — let the most useful threads run long.

### Warm-up (2-3 min)

Brief — the survey already captured background.

- Quick recap from your survey response: you do mostly [X], in [Y counties], [Z years experience]. Anything that's changed since you filled out the survey, or anything you wanted to expand on?
- Anything you've been thinking about since the survey that you want to flag before we walk through the site?

### Landing page + onboarding flow (8-10 min)

Walk through on screen-share. Do not over-explain — let them react.

- Show landing page. *Reactions: clear or confusing, anything missing, would you scroll further?*
- Show the reporter onboarding flow up to where the prototype gets unrealistic.
  - *Where in the flow do you start to second-guess?*
  - *Anything you'd expect to see that isn't there?*
  - *Any friction points where a real CSR would bail?*

### CSR profile page (10-12 min)

This is the highest-leverage UX surface. Take the time.

- What do you think of having a public profile like this?
- Are you comfortable with attorneys seeing your name, license number, and rating?
- **Open question A:** Would you want recent cases you've worked on shown publicly here? Why or why not?
- **Open question B:** Would you want a count of jobs you've completed on the platform shown? Does that help you or hurt you?
- **Open question C:** How do you feel about the "Additional expertise" free-text field vs. the standardized specialty checkboxes? Which would you actually fill out?
- What's missing from this profile that would make you more comfortable / more useful?

### Order acceptance flow (8-10 min)

Show the order-invite UX (job card, response window, accept/decline).

- *Reactions: is the information shown enough to decide?*
- Response-time expectations — does the per-tier window (2h for Rush, 12h for Expedited, 24h for Standard) feel realistic?
- Are accept/decline buttons clear? Anything missing that would change your decision?
- For featured-job invites (CSR's declared specialty matches), would highlighting that in the invite card change your behavior?
- For the live-status timeline the attorney sees — would you want CSRs to see something similar (your position in the cascade, who else has been invited)?

### Business cards concept (5-7 min)

Show mockup: card with the CSR's name, license number, profile QR code, "Find me on Dewey Sholes" tagline.

- **Open question D:** Would you actually hand these out at the end of a hearing? In what context?
- Would the platform branding bother you? Would you prefer a card with no platform branding (just your info + a generic site URL)?
- What would you want the card to say?
- *(If they don't already hand out business cards — survey Q5d) Would this change that?*

### Anything missing (3-5 min)

- Walk me through what you'd expect to be able to do on this site on a typical work day. Does what we've shown you cover it?
- What's missing from the site that you'd expect to find on day one?
- Anything you want to flag that I didn't ask about?

### Wrap (2-3 min)

- Can we follow up if we have more questions?
- Would you be willing to test a later iteration of the site in 2–3 months?

---

## Open questions we need answered (track per-interview)

These are the specific things prototype testing is explicitly designed to answer. Concept-level questions (will CSRs use this, what kills trust, pricing perception) are tracked in the Stage 1 survey results, not here.

| Question | Hypothesis to test | Decision it informs |
|---|---|---|
| Are CSRs comfortable with public profiles showing recent cases? | Mixed — some will want it, some won't. | Whether to show recent cases on profile in v1.1 or make it opt-in only. |
| Are CSRs comfortable with public profiles showing job-count? | Likely uncomfortable for new CSRs (cold-start penalty). | Whether to show job-count on profile, ever. |
| Does the "Additional expertise" free-text get used in practice? | CSRs who have niche expertise will fill it; standard specialists will leave it blank. | Whether to keep the field or hide it. |
| Will CSRs actually distribute business cards post-hearing? | Yes, especially for CSRs trying to build their own book. | Whether to invest in card production at all. |
| Do the per-tier response windows feel realistic? | 2h Rush is tight but workable; 12h Expedited and 24h Standard are fine. | Whether to adjust per-tier windows pre-pilot. |
| Where does the onboarding flow lose people? | First friction point: license-verification step (assumed easy but may have edge cases). | Where to invest in onboarding polish. |

---

## Output

After up to 5 interviews, synthesize into:

- A 1-page memo of the top 5 findings, with direct quotes.
- A revised list of v1 vs v1.1 product decisions (this doc + `csr_account_procedures.md` get updated).
- A decision on the cards strategy (go / no-go / modify) with concrete next steps.
- A revised CSR pitch / messaging hierarchy for the cold-email and landing page.

Findings should be circulated to: Aud, Rosie, the marketing agent (when next planning Phase 1).
