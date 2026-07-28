# Advisory call – Jay Hariani (founder, GovTribe) · 2026-07-28

Notes from an advisory call with **Jay Hariani**, a CTO-type founder (founded **GovTribe**, a
government-contracting data/SaaS product). Aud walked him through Dewey Sholes – the pivot from a
complex matching platform to a scaled-back directory + messaging + invoicing, the California market,
the two-sided pricing, and the co-founder/advisor and entity questions. This captures his advice and
the agreed next steps. (Meeting logistics and personal/background chat are omitted.)

> Note: the transcript mangled the name as "Dewey Scholz / Scholes." It's **Dewey Sholes**. The
> "full prototype" link to send Jay is the v1 version at **dewey-sholes.vercel.app** (the reduced
> MVP is dsmvp.vercel.app).

## What Jay advised

### Legal entity
- **Consider a Delaware C-Corp over an LLC** if there's any chance of raising outside investment –
  investors expect a Delaware C-Corp; converting later is friction. (Today the entity is **Studio
  Crux, LLC**; this is a "revisit if you'll raise" flag, not a decision. See `../../` entity notes /
  the advisor-conversion record.)
- **Granting equity to non-active participants is a problem** – dead equity, governance drag, hard
  to claw back. Reinforces keeping Rosie a **contractual advisor, not an owner** (see below).

### Advisor / equity (Rosie)
- Keep the relationship as an **advisor, not a co-founder**; formalize it with a **compensation
  contract**, not equity. This matches Aud's existing plan – a capped, time-limited revenue share
  plus marketing pay for firms she sources. (Specific percentages/terms are recorded privately in
  `_private/` and the assistant's memory, not here, since they're sensitive.)
- General startup reality Jay flagged: it's **hard to find committed startup participants over 40**;
  set expectations accordingly and don't over-index on one person's involvement.

### Product / SaaS model
- **Start with the basic directory; add complexity gradually.** Don't rebuild the Uber-style
  matching engine up front. This validates the reduced-scope call – ship the directory, layer more
  on over time. (Matching/personalization stay on the roadmap as *deferred*, not scrapped.)
- **Capture usage data from day one** (searches, filters, clicks, who-contacts-whom) even while the
  product is simple – it's the fuel for later **matching, recommendations, and personalization**.
  You can't personalize retroactively without the history, so instrument early.
- **Recommendation engine / personalization** is the natural next layer once there's data: suggest
  reporters to firms, surface likely-fit firms to reporters.

### Technical support
- **Line up technical help as it scales** – a **fractional CTO** or a **technical co-founder /
  developer**. Building solo with AI agents is fine for the prototype and early MVP, but real
  integrations (payments, auth, deliverability, data) and scale need an engineer. Reinforces the
  existing `engineering_support_plan.md`.
- Using **AI agents for product development** in the meantime is a legitimate way to move fast now.

### Marketing / growth
- **SEO** and **paid ads** as acquisition channels.
- **Be discoverable through AI / "integrate with ChatGPT"** – think about how a lawyer asking an AI
  assistant "find me a court reporter in LA" could surface Dewey Sholes, and about an **AI-powered,
  personalized onboarding** experience for both reporters and firms (an agent that helps a reporter
  build a good profile, or helps a firm find who they need).
- **Make it sticky for both sides** – give reporters and firms reasons to keep coming back (the
  get-paid tools, saved lists, history, verified reviews-after-payment) so it's not just a lookup.

### Data privacy
- **Mind CCPA** – California's consumer-privacy law. (We already keep the compliance posture light –
  see `open_strategic_decisions.md` §5 – and just closed a real PII-exposure issue; see
  `integration_checklist.md` §7. Worth a proper privacy policy + deletion process before scale.)

### Market
- Reasonable to **start in California, then expand to other states (Texas, Illinois)** after initial
  validation – matches the "wide supply, local selling, geography-by-geography" growth plan.

## Contacts / intros
- **Jay Gross** – a court-reporting-agency contact Jay Hariani offered to introduce Aud to (Jay was
  candid that he's uncertain about the business's viability, but the industry intro is useful). Aud
  to tell Jay if he wants the intro.
- **Send Jay the full v1 prototype link** (dewey-sholes.vercel.app) for review.
- **Follow-up call in ~1 week** to review the full prototype and progress.

## Aud's next steps (from the call)
- [ ] Send the **advisor contract** to Rosie (comp terms already drafted – see private record).
- [ ] **Launch the reduced-scope MVP** (directory + messaging) to test viability with CA reporters.
- [ ] **Reach out to CA court reporters** for feedback on the platform.
- [ ] **Talk to lawyers** (including in-house counsel and nonprofits) for feedback + marketing.
- [ ] **Consider TX / IL expansion** after the initial launch.
- [ ] **Explore AI-powered personalized onboarding** for reporters and firms.
- [ ] **Plan for technical support / a fractional CTO** for future development phases.
- [ ] **Send the prototype link to Jay** and **schedule the follow-up** (~1 week).

## How this lands against current plans
- **Confirms** the reduced-scope directory-first approach, the CA→TX/IL geography plan, and the
  advisor-not-co-founder / capped-comp direction.
- **New to weigh:** the **Delaware C-Corp vs LLC** question (only matters if raising) and
  **instrumenting usage data now** so a future recommendation/personalization layer has history to
  learn from. The **AI-onboarding** and **discoverable-via-AI** ideas are fresh marketing angles.
- **Reinforces** the standing need for real engineering help (`engineering_support_plan.md`) and the
  privacy work (CCPA / `open_strategic_decisions.md` §5).
