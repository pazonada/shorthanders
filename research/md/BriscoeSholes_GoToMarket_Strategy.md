# Briscoe Sholes — Go-to-Market Strategy
*Draft — March 13, 2026*

---

## The Core Challenge

Briscoe Sholes is a two-sided marketplace. The classic chicken-and-egg problem applies: reporters won't sign up without jobs, and firms won't post jobs without reporters. The strategy below sequences supply and demand acquisition to avoid the cold-start trap.

---

## The Wedge: two county types, two entry points

Not all California counties work the same way, and the go-to-market strategy depends on understanding the difference.

**Staff-reporter counties (the majority).** Most counties still assign their own live reporters to hearings. The firm has no choice of reporter. But after the hearing, the firm still has to deal with the reporter directly to order the transcript, negotiate turnaround, arrange payment, and chase the W-9. The process is manual and painful even though the reporter was already in the room.

In these counties, Briscoe Sholes enters as the ordering and payment layer between firms and the court's existing reporters. The value proposition is workflow simplification: one place to order, pay, track, and handle tax compliance. There's less margin here because the platform isn't solving the matching problem, but it's low friction adoption. Both sides get comfortable using Briscoe Sholes as a habit.

**ER (electronic recording) counties.** In counties with expanded electronic recording orders (LA, Riverside, San Bernardino, Santa Clara, and more coming), there is no staff reporter at the hearing. Audio is recorded, and if anyone wants a transcript, they need to find a reporter to transcribe it. This is where the reporter shortage bites hardest and where the full marketplace kicks in: matching, pricing, turnaround commitments, quality ratings, the works.

**The sequencing.** Start with staff-reporter counties to build adoption and familiarity on both sides of the platform. Low margin, high volume, low risk. Then expand into ER counties where the platform becomes essential, not just convenient, because there's no existing system to fall back on. This is the back door.

---

## Phase 0: Pre-Launch Foundation (Weeks 1–4)

### Build the Reporter Database

The supply side starts with a public dataset. The CA Court Reporters Board maintains a searchable online directory of every active CSR licensee in the state. This is your starting universe.

**What to extract from the CRB database:**

- Full name and license number
- License status (active, inactive, suspended, expired)
- License expiration date
- City/region (where available)

**What the database won't tell you (and you'll need to learn through outreach):**

- Whether they do freelance/private work or are court-employed only
- Geographic coverage and willingness to travel
- Whether they do live attendance, transcription from audio, or both
- Turnaround time capabilities
- Technology comfort level
- Whether they're semi-retired and interested in flexible, remote transcription work

**Action items:**
1. Pull the full active licensee list from the CRB website (public data, no partnership needed)
2. Cross-reference with CCRA membership list if obtainable (members are more likely to be active freelancers)
3. Identify reporters who advertise independently (websites, LinkedIn, court hallway directories) — these are the ones already operating as ICs and most likely to adopt a marketplace

### Identify your pilot geography

Don't try to cover all 58 counties at launch. Pick 2-3 counties that let you test both sides of the wedge:

- At least one staff-reporter county where Rosie has strong relationships (this is your adoption play)
- At least one ER county where the full marketplace is needed (this is your margin play)
- Rosie's existing network should drive the choice

**Recommended pilot counties based on the data:**

- **Los Angeles** — Largest court system in the country. Expanded ER order (Sept 2024). 525,000+ unrecorded proceedings in 18 months. Tests the full marketplace model. Huge reporter pool relative to other counties. Rosie likely has connections here.
- **One staff-reporter county where Rosie has relationships** — San Francisco, Sacramento, or Orange. These still assign court reporters to hearings, so the platform enters as the ordering/payment layer. Lower margin but faster adoption because you're simplifying an existing process, not asking people to change one.
- **One mid-size ER county** — Riverside (expanded ER, offering $32,500 retention bonuses to recruit reporters) or San Bernardino (expanded ER since 2013). Pairs with LA to test the full marketplace in a smaller, more manageable court system.

### Prep the Credibility Materials

Before any outreach, you need:

- **Data security & privacy checklist** — BigLaw firms will not onboard a vendor without one. SOC 2 baseline, CA Rule 1.6 confidentiality standards, encryption requirements. (I can draft this.)
- **Reporter FAQ** — What is this platform? How do I get paid? Do I need to change my workflow? What's the platform fee? Am I an employee? (Answer: no — AB 3136 exempts CSRs from ABC test.) (I can draft this.)
- **Firm one-pager** — The pitch to law firms. Time savings, cost predictability, compliance guarantees. (I can draft this.)

---

## Phase 1: Seed the Supply Side (Weeks 3–8)

### Reporter Outreach Strategy

**Tier 1 — Warm contacts (Rosie's network):**

Rosie has 22 years of practice. She knows reporters. Start with the ones she's worked with personally. These are the easiest to recruit because they trust her. Ask each one to refer 2–3 colleagues. This is the fastest path to a critical mass of 15–25 reporters in your pilot counties.

**Tier 2 — Active freelancers (public data mining):**

Reporters who maintain their own websites, LinkedIn profiles, or who appear in court hallway directories are self-identified ICs actively seeking work. They're the most marketplace-ready segment. Outreach via email (addresses often on their websites) with the reporter FAQ and a simple sign-up link.

**Tier 3 — CCRA and professional networks:**

The California Court Reporters Association is the professional body. Getting a mention in their newsletter, a booth at their conference, or an endorsement from a board member would reach the broadest audience. This requires a human relationship — Rosie or a co-founder attending events and building trust. CCRA could be an ally (the platform creates more work for reporters) or skeptical (marketplace = race to the bottom?). Framing matters: "We're sending more work to reporters, not undercutting them. Rates are set by statute — we can't discount."

**Tier 4 — Semi-retired reporters:**

This is the sleeper segment. An estimated 50% of court-employed reporters were eligible to retire as of December 2023. Many have retired or will soon. A platform that offers flexible, remote transcription work (Use Case B — audio uploaded, work from home, set your own hours) is extremely attractive to a semi-retired CSR who still holds an active license. Targeted outreach to recently retired or soon-to-retire reporters could unlock supply that doesn't currently exist in the market.

**Messaging framework for reporters:**

- Lead with: "More work, on your terms." Not: "Join our platform."
- Emphasize: statutory rates (not discounted), flexible scheduling, payment handled for you, no chasing invoices
- Address the fear: "You are not an employee. You use your own tools, set your own schedule, accept jobs you want. We're a matching service, not an employer."
- Social proof: "X reporters in [county] are already signed up" (once you have the first cohort)

### Supply Target Before Firm Launch

Before inviting your first law firm, you need enough reporters to guarantee that a posted job will be accepted within 4 hours (the PRD's rush target). For a pilot in 2–3 counties, that means:

- Minimum 10–15 reporters covering LA
- Minimum 5–8 reporters covering the second county
- At least 3–5 of these should do live attendance (not just audio transcription)

This is achievable through Tier 1 (warm contacts) + Tier 2 (active freelancers) alone. You don't need CCRA or mass marketing to hit this number.

---

## Phase 2: Seed the Demand Side (Weeks 6–12)

### Firm Recruitment Strategy

**Anchor firms (3–4 firms, handpicked):**

Start with firms where Rosie has a personal relationship — ideally firms she's worked at or closely with. These become beta testers. They get:

- White-glove onboarding (Rosie personally walks them through the platform)
- Direct feedback channel (their input shapes the product)
- Priority access to the reporter pool
- Potentially waived or reduced platform fees during beta

**Ideal anchor firm profile:**

- Family law or civil litigation practice (highest transcript volume)
- 5–50 attorneys (big enough for volume, small enough for decision-making speed)
- Located in pilot counties
- Has support staff who currently chase reporters manually (the pain point)
- Ideally has experienced fee waiver cases (tests the TRF paperwork generation flow)

**What to ask anchor firms for:**

- Permission to track their current transcript ordering workflow (before/after data)
- Staff time estimates on transcript-related tasks (feeds the attorney survey and pricing model)
- Honest feedback on pricing, UX, and reporter quality
- Willingness to be a named reference for future firm recruitment

### Expansion Beyond Anchor Firms

Once anchor firms are running smoothly (target: 20–30 completed orders with >95% on-time delivery):

- **Referral mechanics:** Ask anchor firms to refer peer firms. Attorney networks are tight; word of mouth is the primary discovery channel for legal services vendors.
- **Bar association outreach:** LA County Bar, SF Bar Association, etc. Offer to present at a CLE (continuing legal education) event on "the transcript crisis and what to do about it." Educational positioning, not sales pitch.
- **Legal aid organizations:** Pitch the SRL/fee waiver features to legal aid orgs. They serve the population most harmed by the transcript gap. Their endorsement is credibility gold for court and Judicial Council partnerships.

---

## Phase 3: Prove Unit Economics (Months 3–6)

### Key Metrics to Track During Beta

- **Time-to-acceptance:** How fast do reporters accept jobs? Target: <4 hours for rush, <24 hours for standard.
- **On-time delivery rate:** Target: >95%. This is the product's core promise.
- **Reporter utilization:** What % of onboarded reporters accept at least one job per month?
- **Buyer repeat rate:** Do firms come back after their first order?
- **Staff time savings:** Before/after comparison of transcript-related admin time at anchor firms.
- **TRF paperwork success rate:** How many fee-waiver orders result in successful reimbursement applications?
- **Platform fee tolerance:** At what % do reporters push back? At what % do firms notice?

### Financial Model Inputs You'll Learn from Beta

- Average pages per order (by case type and use case)
- Rush vs. standard vs. economy mix
- Live attendance vs. transcription mix
- Fee waiver order volume as % of total
- Reporter acceptance rate by county and case type
- Actual TRF reimbursement outcomes (are firms successfully getting reimbursed?)

---

## Phase 4: Scale in California (Months 6–12)

### Geographic expansion within CA

Once pilot counties are working, expand county by county using the same two-track approach:

**Track A (adoption):** Roll out the ordering/payment layer to staff-reporter counties. This scales quickly because you're plugging into existing reporter relationships, not building new ones. Priority: large counties with high transcript volume (Sacramento, Orange, San Diego, Fresno, San Joaquin).

**Track B (full marketplace):** Expand into additional ER counties where firms need reporter matching. Priority:

1. Counties with expanded ER orders (Santa Clara, Del Norte, Sierra, and any new ones) — highest need for the full platform
2. Counties named in the Feb 2025 Supreme Court order (Contra Costa, San Diego) — political pressure creates urgency and receptiveness
3. Counties likely to move to ER as the reporter shortage deepens

Each new county requires: reporter recruitment in that geography + at least one firm relationship. Track A counties are easier because the reporters are already there.

### Reporter Pool Growth

By month 6, target 75–100 active reporters statewide. By month 12, target 200+. Growth drivers:

- Organic: reporters refer colleagues once they're getting steady work
- CCRA partnership: newsletter features, conference presence
- Semi-retired segment: targeted outreach campaign
- Agency partnerships: onboard 2–3 court reporting agencies who bring their own reporter rosters

---

## What Requires a Human (Cannot Be Automated or Delegated to Me)

- Rosie's personal outreach to her reporter contacts (Tier 1 supply seeding)
- Rosie's personal pitch to anchor law firms
- Attending CCRA events and building professional relationships
- CRB and Judicial Council meetings (I can prep the briefing docs, but a human attends)
- Legal entity formation decision (I can outline tradeoffs)
- Signing contracts and MOUs
- Making the final call on platform fee percentage (I can model scenarios)

## What I Can Produce to Support All of the Above

- Reporter outreach email templates and FAQ document
- Firm recruitment one-pager and pitch deck content
- Data security & privacy checklist for vendor approval
- Attorney survey on staff time costs
- CSR discovery interview guide
- CRB and Judicial Council briefing documents
- Stakeholder messaging framework (unions, legal aid, court admin)
- Financial model skeleton with scenario analysis
- Beta tester recruitment materials
- Legal aid partnership pitch

---

## A Note on Your Friend's Advice

Your friend suggested starting in a less regulated state. Here's why CA is actually the right call despite — and partly because of — the legal complexity:

**The regulation is the moat.** Statutory pricing means the business model is predictable and defensible. You can't be undercut on price because the price is set by law. A less-regulated state means open pricing, which means a race to the bottom and margin pressure from day one.

**The crisis creates urgency.** Over 1 million hearings without a verbatim record in 10 months. Courts issuing emergency orders. The Supreme Court demanding explanations. This is not a "nice to have" market — it's a "constitutional crisis" market. That urgency drives adoption speed.

**The CSR exemption from AB 5 is already settled.** AB 3136 (2019) exempts licensed CSRs from the ABC test. The independent contractor model is on solid legal ground in CA specifically for this profession.

**Rosie is the domain expert.** Starting in a state where your co-founder has 22 years of practice, existing relationships, and deep knowledge of the court system is worth more than any regulatory advantage elsewhere.

**CA is the template.** If you can build the compliance engine for CA — the most complex state — every other state is easier. The compliance config layer you build for CA becomes the framework you replicate 49 more times.

The friend's advice would be right for a generic marketplace. For a court transcript marketplace built by a CA attorney, CA is where you start.
