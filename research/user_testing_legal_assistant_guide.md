# User testing guide – paralegals / legal assistants (+ optional 1 attorney)

**Status:** Draft. Updated 2026-05-24 to reflect the applicant-pool review model and to lead with a model-validation conversation before any prototype walkthrough.
**Owner:** Aud (drafting); Rosie (recruitment, co-facilitation – most launch-cohort firms are her network).
**Last updated:** 2026-07-28 (added the "Recommendations & match suggestions" section).

> **Caveat (2026-07-28):** most of this guide still describes the older **applicant-pool / order-flow** model that was retired for the reduced-scope MVP (a searchable directory + direct messaging + invoicing – no posting jobs, no applicant pools, flat 12% is gone). Before running interviews, the prototype-walkthrough sections likely need a refresh to match the current product. The **Recommendations & match suggestions** section below IS written for the current reduced-scope model.

---

## Why we're testing with paralegals and legal assistants, not attorneys

Inside law firms, **legal assistants and paralegals are the primary user of a transcript-ordering platform.** Attorneys typically delegate the actual ordering and tracking to support staff. So testing with assistants gives us truer signal about workflow friction, ordering speed, and what features matter day-to-day.

If we can also fit in **one attorney interview** (likely a friend of Rosie's), great – see "Optional attorney interview" below for how to adapt the same questions. But the assistant interviews are the priority and the attorney one is not assured.

---

## What we're trying to learn

This is **discovery and validation**, not usability testing of a polished product. Specific questions:

1. **Does the applicant-pool model land with the firm side?** Does "we collect applications and you pick" feel like a real upgrade vs. how they currently book reporters, or like extra work?
2. **Is the post-hearing transcript-tracking pain real?** When the firm needs a transcript from a hearing weeks ago, how do they find the CSR today, and is that actually painful enough to motivate a new platform?
3. **What does the assistant's workflow actually look like** – order frequency, where the order info comes from, how it gets billed back to the case?
4. **What signals do they use to evaluate an unfamiliar CSR?** Specifically: rating, on-time rate, recent cases, courts covered, prior firm relationship. Which actually matter at the moment of *selecting an applicant*?
5. **What kills trust in a new transcript marketplace?** Pricing transparency, certification authenticity, dispute handling, data security.
6. **Will firms actually use Dewey Sholes** if it works as designed, given their existing CSR relationships? What would make them switch?
7. **Is pre-selection messaging actually useful?** When would they message an applicant before picking? What would they ask?
8. **Is the cost-splitting feature a real win?** Or a feature that sounds good but doesn't get used?
9. **Does the legal-assistant incentive program** (points-for-redemption catalog) actually motivate them?

---

## Method

**Format:** 45-minute video calls (Zoom or Google Meet). Recorded with consent.
**Sample size:** Up to 5 paralegals / legal assistants. Plus 1 attorney if we can land one (Rosie's network – likely but not assured).
**Compensation:** $25 Starbucks gift card per completed interview. Sent digitally within 24 hours. Same comp for the optional attorney.
**Tools:** Zoom recording + transcript, simple notes doc, lightweight participant tracker.

**Recruitment criteria (mix within 5 assistant slots):**
- 3-4 **assistants/paralegals at solo or small firms** (1-10 attorneys)
- 1-2 **assistants/paralegals at mid-size firms** (10-50 attorneys) – different procurement workflow
- Mix of practice areas: family law, civil litigation, PI, probate (Rosie's network bias is fine)
- Prefer assistants who actually place transcript orders themselves (vs. just handling other admin)

**Recruitment channels:**
- Rosie's direct network (highest priority – warm intros)
- BASF chapter contacts via Rosie
- Pilot firm targeting list (`research/CA_Pilot_Firm_Targeting.md`)

---

## Discussion guide

Total target: ~45 minutes. Time budgets are guidance.

### Warm-up (3-5 min)

- Tell me about your role and your firm. How long have you been there?
- How often do you order court transcripts? Roughly how many per month?
- Do you place the orders yourself, or does an attorney handle it?

### Current workflow (10-12 min)

- Walk me through ordering a transcript today. Start from "we just finished a hearing" or "I need a transcript from a hearing two weeks ago." Where do the friction points show up?
- **Specific pain point probe:** Imagine it's been 3 weeks since a hearing and the attorney decides we need the transcript. How do you figure out who the CSR was? Walk me through that. *(Looking for honest sense of how painful this is.)*
- How often do you give up or delay because finding the CSR is too hard?
- When the same CSR has worked your firm's hearings before, do you keep their info anywhere? Where?
- How do you decide which CSR to use when you have a choice? Rate, turnaround, prior relationship, who's available?
- How much does the firm pay per page today? Do you know? *(Most assistants don't – they just file the invoice.)*
- How does the cost flow back to the client / case? Pass-through, marked up, billed at firm rate?

### Validate the business model (10-12 min) – BEFORE showing the prototype

This section is new (2026-05-24). We've changed the matching model twice in a month and need to ground-truth that the current direction makes sense to people who'd actually use it. Describe the model in plain language, pausing for reactions. Don't sell. The goal is to surface concerns, confusions, and "I would never do that" reactions, not to get agreement.

- *"We're building a marketplace where the firm posts a transcript order and qualified court reporters apply. We don't pick for you – you see everyone who applied, with their profile, rating, and the rate they're charging, and you pick whoever you want. Or you pick no one and wait for more applicants. Reactions?"*
  - Listen for: do they understand "review applicants" as a feature or as work they don't want to do? Do they expect the platform to pre-filter or rank for them?
- *"Reporters can set whatever rate they want – per page, half day, full day, etc. We show what most reporters in the region charge as guidance, but the actual number is theirs. So when you review applicants, you'll see varying rates. Reactions?"*
  - Listen for: are they comfortable making a price-vs-quality tradeoff? Or do they want everyone at the same rate? Do they care about price at all (if firm's pass-through), or only quality?
- *"You can review applicants live as they come in – not gated by a window closing. So if you have a favorite reporter and they apply at minute 5, you can pick them immediately. The window we show (4 hours for rush, 24 for expedited, 72 for standard) is when we keep notifying reporters, not when you have to wait. Reactions?"*
  - Listen for: do they like the speed, or feel pressure to act fast? Would they always pick the favorite, defeating the marketplace?
- *"While reviewing, you can message any applicant – ask scheduling questions, share case context, anything. Selected reporter messaging continues for logistics coordination after you pick them. Reactions?"*
  - Listen for: would they actually message? About what? Would they message every applicant or just one? Worried about reporters not responding fast?
- *"If you pick a reporter and they say they're no longer available, we notify you immediately and you pick from the remaining applicants. No deposit lost. Reactions?"*
  - Listen for: how much of a hassle is that? Does it make them more or less likely to pick a favorite quickly?

**Facilitator listening notes (model validation):**
- **The "review and pick" framing.** Some firms may want this; others may want auto-match because "we don't have time to review applicants for every hearing." If the latter is loud, we have a real problem.
- **Price as a comparison axis.** If firms say "I don't care about price, just give me the best one," the open-marketplace pitch lands weak. If they say "I care about price for routine matters but not for trials," that's a healthy signal.
- **Pre-selection messaging.** If they say they'd never use it ("I don't have time"), it's worth questioning whether messaging deserves v1 build cost or should defer.
- **What's missing.** Anything they expected to hear that we didn't describe? That's a hint about what their mental model is.

### Reactions to Dewey Sholes (15-18 min)

Walk through prototype on screen-share. Now they've validated (or pushed back on) the model in plain language; the prototype walkthrough lets them see whether the actual UX delivers on the description.

- Show landing page. *Reactions: who is this for, would you try it?*
- Show the order flow. **Specific prompts:**
  - Pricing transparency – does seeing the breakdown change how you feel about ordering?
  - Cost-splitting toggle – would the firm actually use this? In what scenarios?
  - Need-by date driving turnaround tier – does this match how the firm thinks about deadlines?
  - **Time savings probe:** If this saves you 10 minutes per order, how many minutes per week is that for your firm? Is that worth anything?
- Show the **post-submit confirmation + Review Applicants screen**. *Frame:* "When you submit an order, qualified reporters get notified and start applying. You can review them live as they come in – no need to wait for the window to close. The screen shows everyone who's applied, their profile, rating, on-time rate, and the rate they're charging for this job. Favorites get a star and float to the top. Sort by rate, rating, completed jobs, or favorites-first. Pick when you're ready – the reporter then confirms availability and the job locks in." *Open questions (these are the big ones – take time):*
  - **Open question D (live vs. gated):** "You can pick an applicant any time – before, at, or after window close. Some firms will pick a favorite within 5 minutes of posting. Other reporters might not get to apply before you've already chosen. Does that feel right, or would you want us to make you wait, so the field is fairer?" *(Listen for: do they intuitively get that "fairness to applicants" trades off against "speed for the firm"?)*
  - **Open question E (review-screen content):** "Looking at this applicant card, what's missing that would help you decide? What's extra that you'd never look at?" *(Probe: would they want to see specialty match indicators, "this CSR has worked your firm's cases X times before", a sample transcript link, anything else.)*
  - **Open question F (application window length):** "The window is 4h for rush, 24h for expedited, 72h for standard. Do those feel right? Too long? Too short? Especially: if you're not in a rush, would you actually wait 72 hours to see more applicants, or pick the first qualified one and move on?"
  - **Open question G (messaging an applicant before selecting):** "You can message any applicant before picking. What would you actually ask? Or would you skip messaging and just pick from the profile + rate?" *(Probe: scheduling confirmation, case-specific questions, vetting for sensitive matters.)*
  - **Open question H (rate visibility):** "Every applicant's rate is visible right on the card. So you're picking partly on price. Is that fine for routine matters but uncomfortable for high-stakes ones? Or does price-visibility feel right across the board?" *(Probe: if uncomfortable, why – worried about explaining to attorney, worried about reporter feeling judged on rate, etc.)*
  - **Open question I (no-one-applies edge case):** "If the window closes and no one applied – or only one applied and you don't love them – what would you want us to do? Auto-widen criteria? Notify ops? Just let it sit?"
  - **Open question J (CSR backs out):** "If you pick a reporter and they say they're not available after all, we notify you to pick someone else. How does that feel? Frustrating? Acceptable as long as we're fast about it?"
  - **Open question K** *(For attorneys, if the optional attorney interview happens):* "When you walk into a hearing and don't know which agency-assigned reporter is there, how do you actually feel about it? Trust the agency, or anxiety-producing? Does picking from applicants yourself feel like a win, or like extra work that wasn't your job before?"
- Show a CSR profile page (from the directory or by clicking through from Review Applicants). **Specific prompts:**
  - If your firm had never used this CSR before, what would convince the attorney to book them? What's missing?
  - How much does the rating matter? On-time rate? Avg turnaround?
  - **Open question L:** Would you want to see recent cases this CSR has worked on? Would that change the booking decision?
  - **Open question M:** Would you want to see a count of jobs they've completed on the platform? Would a low number turn you off?
  - The profile has two CTAs: "Book this reporter" (for an upcoming hearing) and "Request a transcript copy" (for a hearing already done). Does that distinction make sense?
- Show the business-card scenario. *Frame:* "Imagine the CSR who reported your firm's hearing hands the attorney this card on the way out. The QR code goes directly to that CSR's Dewey Sholes profile, where you can request a transcript with one click."
  - **Open question N:** Would the attorney actually keep this card? Would it land on your desk? Would you scan it?
  - Would you prefer the card link to go to the CSR's profile, or to a homepage where you search?
  - Would your firm take this seriously, or would it feel like marketing spam?
- Show the legal-assistant incentive program (`research/legal_assistant_incentive_program.md`).
  - Would the points catalog motivate you to choose Dewey Sholes for an order?
  - Which reward in the catalog is most appealing? Which feels off?
  - Do you have firm policies that would prevent you from accepting personal rewards?

### Recommendations & personalized directory (NEW – added 2026-07-28) (6-8 min)

*Facilitator framing: this tests an OPTIONAL personalization layer on the current reduced-scope directory (search + contact reporters directly; no applicant pool). We're deciding (a) whether to personalize the directory at all, (b) whether to base it on the firm's stated needs or their actual behavior – reporters they've paid, saved, or messaged, and (c) standing personalization vs. help for a specific job. Aud's lean (2026-07-28): capture a few preference fields at signup, and surface a personalized band at the TOP of the directory (the firm's own reporters + similar) rather than a separate recommendations feature or push notifications. Don't pitch – surface honest reactions.*

- **Personalized directory top (the main idea):** *"Imagine that when you open the directory, the top row is personalized to your firm – the reporters you've actually worked with (paid an invoice to, saved, or messaged) pinned at the top, plus a few similar ones. Useful, or would you rather just see a neutral list and search yourself?"* (Listen: do they want their history surfaced, or find it presumptuous? Do they trust "similar," or see it as filler?)
- **Which behavioral signal matters:** *"If we surfaced reporters based on your past behavior – ones you paid, saved, or messaged – which of those best predicts who you'd want to see again?"* (Probe the strength order: a paid invoice is the strongest "I actually hired them" signal; saves and messages are weaker intent.)
- **The homogeneity worry (key):** *"A lot of reporters look similar on paper. If we recommend reporters 'similar to' the ones you've used, would that genuinely help, or feel random? What makes one reporter a good substitute for another you like?"*
- **Standing vs. job-level:** *"Which is more useful: a standing personalized directory (your reporters + similar, always up top), or help in the moment of a specific job – say a workers' comp deposition next Tuesday in Oakland with a Cantonese-speaking witness that needs a rush turnaround?"* (Decides standing-personalization vs. a job-context filter. Aud expects standing to be the everyday default and job-level to matter most for the hard, constrained cases.)
- **What differentiates reporters for you:** *"When several reporters could do a job, what makes you pick one – location, availability for your date, a specific skill like realtime or a language, rush capability, prior relationship?"*
- **Field priority:** *"Rank these for choosing a reporter: location, proceeding type, services (realtime / transcription / rush), area of law, language."* (Aud's hypothesis: location + proceedings + services matter most in general; language is low in general but decisive for specific jobs.)
- **Labeling / transparency:** *"If we put reporters at the top, would you want us to say WHY – e.g. 'Suggested for your firm,' or a tag on each like 'worked with you 3 times' or 'near you, does depositions'? Does a reason make it feel more useful, or would an unlabeled 'Featured' row feel like an ad?"* (Aud's lean: always label the reason – it separates behavioral personalization from paid promotion and defuses the "why am I seeing this?" reaction.)
- **Capture at signup:** *"Would you tell us at signup what you typically need – location, proceedings, services – so a brand-new account with no history yet still gets a useful directory? Or is that busywork?"*
- **Notifications (only if raised / time permits):** *"Would you ever want an email when a new reporter who fits joins? On by default, or strictly opt-in? Per-reporter, or an occasional digest?"* (Aud's lean: probably unnecessary if the directory is already personalized; if built, default OFF, opt-in, digest. Listen for spam sensitivity.)

### Hypothetical decisions (5-7 min)

- If you needed a transcript tomorrow, would you try Dewey Sholes? What would make you not try it?
- How would your firm's procurement / vendor-onboarding process treat a new platform like this? Are there blockers (W-9, MSA, COI, security review)?
- Firms that sign up during our 6-month launch window are tagged as "founding firms" – founder-led onboarding, direct access to the team, first dibs on new features. Pricing is the same flat 12% for everyone. Do those founding-firm perks matter to your firm, or would you sign up either way?

### Wrap (2-3 min)

- Is there anything I should have asked you that I didn't?
- Who else at your firm should we talk to?

---

## Optional attorney interview (if we can get one)

If Rosie can land 1 attorney interview, run the same overall structure but adjust:

- **Skip the assistant-workflow questions.** Attorneys don't typically place orders themselves; the workflow probe should ask "what does your assistant tell you about ordering transcripts?" instead.
- **Lean harder on the strategic questions:** which CSR to use and why, when does the firm need transcripts vs. notes, how does the firm bill clients for transcripts.
- **Skip the assistant incentive program** (not their concern) and instead probe the firm's **vendor-relationship model**: would the firm switch from a known CSR/agency to a marketplace? What would the firm's existing CSRs say if they found out?
- **Add fee-waiver / TRF questions** if the attorney does any pro-bono or legal-aid work.
- **Lean on Open Question K** (above): how does it feel to have to pick from applicants yourself vs. delegating to an agency?

Same length (45 min), same comp ($25 Starbucks).

---

## Open questions we need answered (track per-interview)

| Question | Hypothesis to test | Decision it informs |
|---|---|---|
| Does the firm side actually want to review applicants and pick, or do they want auto-match? | Mixed – small firms with strong CSR relationships will love it; mid-size firms with high volume may want auto-match. | Whether to keep applicant-pool as v1, or build an "auto-match-from-this-firm's-favorites" shortcut in v1.1. |
| Is the post-hearing CSR-tracking pain real and acute? | Yes – assistants will spontaneously cite it before we prompt. | Whether the cards strategy is solving a real problem. |
| Do firms care about price when reviewing applicants? | Mixed – yes for routine matters, no for high-stakes. | Whether to surface "expected total cost" prominently, or keep price as a secondary signal. |
| Are the per-tier application windows the right length? | 4h Rush is tight; 24h Expedited works; 72h Standard may be too long (firms will pick the first qualified). | Whether to shorten Standard window, or add a "pick now, I have enough" affordance. |
| Will firms actually message applicants before selecting? | Mixed – they'll say they would, but actually won't most of the time. | Whether pre-selection messaging is v1 critical or v1.1 deferrable. If firms say they'd message frequently, keep it. If they say "I'd never bother", consider deferring. |
| Does cases-on-profile change booking decisions? | Mostly no. Rating and on-time rate carry more weight. | Whether to build the cases-display feature for v1.1. |
| Does job-count-on-profile change booking decisions? | Yes – high count signals confidence, low or zero discourages. | Strong argument NOT to show job-count during the launch window when most CSRs are at zero. |
| Will the firm actually scan a card-QR after a hearing? | Yes if professional and the link is direct. | Settles the link-target question (already leaning direct profile). |
| Is the cost-splitting feature a real win? | Yes – Rosie has flagged it as a key differentiator. | Whether to keep cost-splitting in MVP critical path. |
| Does the assistant incentive program actually motivate? | Mixed – some firms have policies against personal rewards. | Whether to keep it launch-window-only or kill it. |
| What's the trust-killer for the firm? | File security + transcript authenticity. | Where to invest in design/security messaging. |
| Do firms want a personalized directory top (their reporters + similar), or a neutral list they search themselves? | Yes to "my reporters up top" (own history is unarguably useful); "similar" is softer / needs proof. | Whether to personalize directory ordering for logged-in firms, and how far. |
| Which behavioral signal best predicts wanted reporters – paid invoice, save, or message? | Paid invoice strongest ("I hired them"); saves next; messages weakest. | How to weight signals in personalized ordering. |
| Standing personalization vs. job-level match help? | Standing = everyday default; job-level = the hard, high-value cases (language / rush / WC). | Whether to add a job-context filter on top of a personalized directory. |
| Which reporter fields carry real matching signal? | Location + proceedings + services generally; language decisive per-job. | Which fields to weight / capture at signup. |
| Do firms want "new matching reporter" notifications? | Likely unnecessary with a personalized directory; if built, opt-in / default-off / digest. | Whether to build notifications at all, and the default. |

---

## Round 2 / post-MVP topics – explicitly NOT in this round

Some firm-side questions are worth asking eventually but don't belong in this first round. Capture them here so they don't get lost; revisit in a second round of user testing/research after MVP launch when we have a track record to talk about.

### Courier / court-runner cost validation (deferred from 2026-05-09)

**Hypothesis to validate:** Per Rosie, firms currently pay ~$100 to dispatch a "court runner" to physically pick up a CD or transcript from a courthouse. The post-MVP growth idea is for Dewey Sholes to develop bulk-pickup relationships and offer the service at a lower price-point, especially for non-rush jobs (see `governance-and-process/post_mvp_growth_strategy.md`).

**Why it's round 2, not round 1:**
- The MVP doesn't include courier handling. Asking about it now risks the firm thinking we're already pitching it, which confuses the round-1 conversation.
- The validation only matters if we hit marketplace fit on the core transcript flow. If we don't, the courier idea is moot anyway.
- Round-2 conversations can be grounded in the firm's actual experience with Dewey Sholes rather than speculation about a service they haven't used.

**Questions to ask in round 2:**
- How often does your firm dispatch a courier to a courthouse (or anywhere) to pick up a CD, paper transcript, or other deliverable?
- Roughly how much does it cost per dispatch? Is that a flat rate or hourly?
- Who handles the logistics – you, an admin, an outside service?
- Is this a recurring pain point or a once-in-a-while annoyance?
- If Dewey Sholes offered bulk-pickup as an add-on bundled into the order, what price would feel like a meaningful win? Probe specific price points (e.g., "if we charged $40 for non-rush pickup, would you use it? $60? $80?").
- For rush jobs specifically, would you still want a courier option even at parity with current pricing, just for the convenience of one-click logistics?
- Are there cases where the current CD-pickup model is a hard blocker – e.g., a courthouse that hasn't moved to digital delivery – vs. cases where you'd just take digital if available?

**Decision this informs:** Whether to invest in courier-service partnerships post-MVP, what price-points to target, and whether to position courier as standard / premium / enterprise tier.

### Other questions deferred to round 2

Add new round-2 topics here as they come up. Each should follow the same shape: hypothesis to validate, why round 2 not round 1, specific questions, decision it informs.

---

## Output

After up to 5 interviews (plus optional attorney), synthesize into:

- A 1-page memo of the top 5 findings, with direct quotes.
- A revised list of v1 vs v1.1 product decisions, especially around applicant-pool review vs. auto-match for firm experience.
- Validation (or rejection) of the cards strategy, the assistant incentive program, and pre-selection messaging.
- A revised firm-side pitch / messaging hierarchy.

Findings circulated to: Aud, Rosie, the marketing agent.
