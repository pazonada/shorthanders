# User testing guide — law firm users (attorneys + assistants)

**Status:** Draft. Targeted for use once we have ~12-15 willing attorneys and legal-assistant contacts.
**Owner:** Aud (drafting); Rosie (recruitment, co-facilitation — most pilot firms are her network).
**Last updated:** 2026-05-08

---

## What we're trying to learn

Same discovery-and-validation framing as the CSR guide. We need answers to:

1. **Is the post-hearing transcript-tracking pain real?** Specifically: when an attorney needs a transcript from a hearing weeks ago, how do they find the CSR today, and is that actually painful enough to motivate using a new platform?
2. **Who actually places transcript orders inside a firm** — the attorney, the legal assistant, the paralegal? This shapes the entire UX and the marketing channel.
3. **What signals do attorneys/assistants use to evaluate an unfamiliar CSR?** Specifically: rating, on-time rate, recent cases, courts covered. Which matter, which don't?
4. **What kills trust in a new transcript marketplace?** Specifically: pricing transparency, certification authenticity, dispute handling, data security.
5. **Will firms actually use Dewey Sholes** if it works as designed, given their existing CSR relationships? What would make them switch?
6. **Is the cost-splitting feature a real win?** Or is it a feature firms tell us sounds good but don't actually use?

---

## Method

**Format:** 30-minute video calls (Zoom or Google Meet). Recorded with consent.
**Sample size:** 8-12 completed interviews across attorneys + assistants combined.
**Compensation:** $75 Visa gift card per completed interview (higher than CSR side because attorney time is more expensive). Mailed within 48 hours.
**Tools:** Same as CSR guide.

**Recruitment criteria (mix):**
- 3-4 **attorneys at solo or small firms** (1-10 attorneys) — primary target for pilot
- 2-3 **legal assistants / paralegals** at small firms — they're often the actual ordering user
- 1-2 **attorneys at mid-size firms** (10-50 attorneys) — different procurement workflow
- 1-2 **legal aid attorneys or pro-bono practitioners** — fee-waiver use case
- Mix of practice areas: family law, civil litigation, PI (Rosie's network bias toward these is fine for pilot)

**Recruitment channels:**
- Rosie's direct network (highest priority — warm intros)
- BASF (Bay Area Bar Assoc.) family law and civil sections
- Pilot firm targeting list (`research/CA_Pilot_Firm_Targeting.md`)
- Targeted outreach via legal aid organizations for the fee-waiver perspective

---

## Discussion guide

### Warm-up (3 min)

- Tell me about your role and your firm. How long have you been doing this?
- How often do you order court transcripts? Roughly how many per month / quarter?
- Who in the firm typically places the order — you, an assistant, a paralegal?

### Current workflow (10 min)

- Walk me through ordering a transcript today. Start from "we just finished a hearing" or "I need a transcript from a hearing two weeks ago." Where do the friction points show up?
- **Specific pain point probe:** Imagine it's been 3 weeks since a hearing and you decide you need the transcript. How do you figure out who the CSR was? Walk me through that. *(Looking for honest sense of how painful this is.)*
- How often do you give up or delay because finding the CSR is too hard?
- When the same CSR has worked your hearings before, do you keep their info anywhere? Where?
- How do you decide which CSR to use when you have a choice? Rate, turnaround, prior relationship, who's available?
- How much do you pay per page today? Do you know? *(Most attorneys don't — they just see the invoice.)*

### Reactions to Dewey Sholes (12 min)

Walk through prototype on screen-share. Don't over-explain.

- Show landing page. *Reactions: who is this for, would you try it?*
- Show the order flow. **Specific prompts:**
  - Pricing transparency — does seeing the breakdown change how you feel about ordering?
  - Cost-splitting toggle — would you actually use this? In what scenarios?
  - Need-by date driving turnaround tier — does this match how you think about deadlines?
- Show a CSR profile page. **Specific prompts:**
  - If you'd never used this CSR before, what would convince you to book them? What's missing?
  - How much does the rating matter? On-time rate? Avg turnaround?
  - **Open question A:** Would you want to see recent cases this CSR has worked on? Would that change your decision to book?
  - **Open question B:** Would you want to see a count of jobs they've completed on the platform? Would a low number turn you off?
  - The profile has two CTAs: "Book this reporter" (for an upcoming hearing) and "Request a transcript copy" (for a hearing already done). Does that distinction make sense?
- Show the business-card scenario. *Frame:* "Imagine the CSR who just reported your hearing hands you this card. The QR code goes directly to that CSR's Dewey Sholes profile, where you can request a transcript with one click."
  - **Open question C:** Would you actually scan this? Would you keep the card? Would you remember it 3 weeks later?
  - Would you prefer the card link to go to the CSR's profile, or to a homepage where you search for them?
  - Would you take this seriously, or would it feel like marketing spam?
- Show the fee-waiver flow (if relevant — only with legal aid / pro-bono attorneys).
  - Would auto-generated TRF paperwork be a real time-saver?

### Hypothetical decisions (4 min)

- If you needed a transcript tomorrow, would you try Dewey Sholes? What would make you not try it?
- How would your firm's procurement / vendor-onboarding process treat a new platform like this? Are there blockers (W-9, MSA, COI, security review)?
- During the pilot, attorneys get an 8% platform fee instead of 12% for their first year. Does that matter to you?

### Wrap (1 min)

- Is there anything I should have asked you that I didn't?
- Who else at your firm should we talk to?

---

## Open questions we need answered (track per-interview)

| Question | Hypothesis to test | Decision it informs |
|---|---|---|
| Is the post-hearing CSR-tracking pain real and acute? | Yes — multiple attorneys will spontaneously cite it before we prompt. | Whether the cards strategy is solving a real problem. If we have to lead them to the pain, the pain isn't acute. |
| Who actually places orders inside the firm? | More often legal assistants than attorneys. | Where to focus marketing (legal assistants get the incentive program; attorneys get the brand pitch). Confirms or rejects current Phase 2 plan. |
| Does cases-on-profile change booking decisions? | Mostly no. Rating and on-time rate carry more weight. | Whether to build the cases-display feature. |
| Does job-count-on-profile change booking decisions? | Yes — high job count signals confidence; low or zero discourages. | Strong argument NOT to show job-count during pilot when most CSRs have zero. |
| Will attorneys actually scan a card-QR after a hearing? | Yes if the card looks professional and the link is direct (not homepage). | Settles the link-target question. |
| Is the cost-splitting feature a real win? | Yes — Rosie has flagged this as a key differentiator. Need attorney confirmation. | Whether to keep cost-splitting in MVP critical path. |
| Does the 12% platform fee sound transparent or sound like a markup? | Mixed. Need direct reaction. | Whether to lead with "12% flat fee" or with "you pay statutory rate, we add 12%." |
| What's the firm-side trust-killer? | Probably file security + transcript authenticity. | Where to invest in design/security messaging. |

---

## Special focus: legal-assistant interviews

Because legal assistants likely place most orders, dedicate at least 2-3 interviews specifically to them. Adjust the discussion guide to:

- Skip the attorney-strategic questions (which firm to use, how to bill clients).
- Focus on day-to-day workflow: how many orders/week, how they're tracked, how they're billed.
- Test the legal-assistant incentive program (`research/legal_assistant_incentive_program.md`) — would they care about points + tote bag + Stanley tumbler?
- Test if Dewey Sholes saves them measurable time per order. The pitch to firms is partly "your assistants get hours back per week."

---

## Output

After 8-12 interviews, synthesize into:

- A 1-page memo of the top 5 findings, with direct quotes.
- A revised list of v1 vs v1.1 product decisions.
- Validation (or rejection) of the cards strategy.
- A revised attorney-side and assistant-side pitch / messaging hierarchy.

Findings should be circulated to: Aud, Rosie, the marketing agent.
