# User testing guide — CSRs

**Status:** Draft. Targeted for use once we have ~15-20 verified CSR contacts willing to take a 30-minute call.
**Owner:** Aud (drafting); Rosie (recruitment, co-facilitation).
**Last updated:** 2026-05-08

---

## What we're trying to learn

This is **discovery and validation**, not usability testing of a polished product. We're trying to answer questions that the existing data, our memos, and our own intuition can't settle:

1. **Will CSRs actually use Dewey Sholes** if it works as designed? What's the single biggest reason they would or wouldn't sign up today?
2. **What's the post-hearing handoff to attorneys actually like today**, and does our business-card idea fit naturally into how they already work?
3. **What should the public CSR profile show** to maximize bookings without making CSRs uncomfortable? Specifically: cases-worked, job-completion count, rating breakdown.
4. **What kills trust** in a platform like this (CSR perspective)? Specifically: payment timing, exclusivity, agency comparison, license-verification accuracy, dispute handling.
5. **What does our pricing/payout structure look like** to a CSR who's been getting agency assignments at 50-85% take? Surprising? Insulting? Reasonable?

These map to specific product/marketing decisions we've left open for testing.

---

## Method

**Format:** 30-minute video calls (Zoom or Google Meet). Recorded with consent.
**Sample size:** Aim for 8-12 completed interviews. Diminishing returns after that for our scale.
**Compensation:** $50 Visa or Amazon gift card per completed interview. Mailed within 48 hours.
**Tools:** Zoom recording + transcript, Notion or Otter for note-taking, Airtable for participant tracking.

**Recruitment criteria (mix):**
- 3-4 CSRs who do mostly **live attendance** in CA superior courts (the primary target for the cards strategy)
- 2-3 CSRs who do **audio transcription** primarily (different workflow, different concerns)
- 2-3 CSRs who are **newly licensed** (within last 24 months) — different incentive structure, no entrenched book of business
- 1-2 CSRs who are **semi-retired or part-time** — different mental model, may be a key supply-side segment for pilot
- Mix of solo CSRs and CSRs in small firms (boutique 2-5 reporter shops)

**Recruitment channels:**
- Rosie's professional network (CSRs she's worked with on cases)
- CSR shortage action group contacts
- Cold email to recently licensed CSRs from the CRB directory (warm pitch: "we're building something for CSRs and want to learn from you, $50 for 30 minutes")
- Posts in CA CSR Facebook groups (with admin permission)

---

## Discussion guide

### Warm-up (3 min)

- How did you become a CSR? How long have you been working?
- What kind of work do you primarily do — live attendance, audio transcription, depositions, all of the above?
- How do you find work today? (Agencies / direct attorney relationships / court appointments / mix?)

### Current workflow (10 min)

The goal here is to understand the *real* flow without leading them.

- Walk me through how a typical job goes — from "you find out about it" to "you get paid." What works well, what's painful?
- When you finish a live hearing, what happens next? How does the attorney decide whether to order a transcript? How do they reach you?
- What percentage of your live hearings end up with a transcript order weeks later?
- When attorneys want to order a transcript later, how do they typically find you again? *(Looking for confirmation that "tracking down the CSR" is a real pain point on their side too.)*
- Have you ever lost a transcript order because the attorney couldn't reach you, didn't remember your name, or went to a different CSR? How often does that happen?
- How do you handle business cards or contact info today? Do you carry cards? Do you give them out?

### Reactions to Dewey Sholes (12 min)

Walk through the prototype on screen-share. Do not over-explain — let them react.

- Show landing page. *Reactions: what is this, would you sign up?*
- Show the reporter onboarding flow up to the point where the prototype gets unrealistic. *Reactions: anything missing, anything that feels off?*
- Show a CSR profile page. **Specific prompts:**
  - What do you think of having a public profile like this?
  - Are you comfortable with attorneys seeing your name, license number, and rating?
  - **Open question A:** Would you want recent cases you've worked on shown publicly here? Why or why not?
  - **Open question B:** Would you want a count of jobs you've completed on the platform shown? Does that help you or hurt you?
  - What's missing from this profile that would make you more comfortable / make it more useful?
- Show the order flow and the matching policy. *Reactions: response time expectations, accept/decline, tier windows.*
- Show the business cards concept (mock up: card with their name, license number, profile QR code, "Find me on Dewey Sholes" tagline).
  - **Open question C:** Would you actually hand these out at the end of a hearing? In what context?
  - Would the platform branding bother you? Would you prefer a card with no platform branding (just your info + a generic site URL)?
  - What would you want the card to say?
- Mention: 100% of statutory rate, payment in 2 business days, no exclusivity, $99/yr listing fee waived during pilot.
  - *Reactions to each. Particularly listen for the "what's the catch" reaction.*

### Hypothetical decisions (4 min)

Force a decision. Real numbers, real tradeoffs.

- If signups opened tomorrow with a $99/yr listing fee waived for the first year, would you sign up? Why or why not?
- What would change your mind from "no" to "yes"?
- Who do you know who would be a strong fit for this? Would you refer them?

### Wrap (1 min)

- Is there anything I should have asked you that I didn't?
- Can we follow up if we have more questions?

---

## Open questions we need answered (track per-interview)

These are the specific things we're explicitly testing. Track each per-interview and look for patterns.

| Question | Hypothesis to test | Decision it informs |
|---|---|---|
| Is the post-hearing transcript-tracking pain real and recurring? | Yes, attorneys regularly lose track of which CSR was on the record. | Whether business cards solve a real problem. |
| Are CSRs comfortable with public profiles showing recent cases? | Mixed — some will want it, some won't. | Whether to show recent cases on profile in v1.1 or make it opt-in only. |
| Are CSRs comfortable with public profiles showing job-count? | Likely uncomfortable for new CSRs (cold-start penalty). | Whether to show job-count on profile, ever. |
| Will CSRs actually distribute business cards post-hearing? | Yes, especially for CSRs trying to build their own book. | Whether to invest in card production at all. |
| Is the "100% of statutory rate" pitch the right lead message? | Yes, but only after the trust questions are answered. | Marketing hierarchy on landing page and outreach. |
| What's the trust-killer? | Payment timing + license verification accuracy + dispute handling. | Where to invest in design/process. |

---

## Output

After 8-12 interviews, synthesize into:

- A 1-page memo of the top 5 findings, with direct quotes.
- A revised list of v1 vs v1.1 product decisions (this doc + `csr_account_procedures.md` get updated).
- A decision on the cards strategy (go / no-go / modify) with concrete next steps.
- A revised CSR pitch / messaging hierarchy for the cold-email and landing page.

Findings should be circulated to: Aud, Rosie, the marketing agent (when next planning Phase 1).
