# Marketing strategy master plan

**Owner:** Aud
**Last updated:** 2026-05-02
**Status:** Living document – update as we learn what works

This is the top-level strategy doc. Phase-specific tactics live in:
- `marketing_plan_phase1_csr_supply.md`
- `marketing_plan_phase2_law_firms.md`
- `marketing_plan_phase3_insurance_carriers.md`
- `legal_assistant_incentive_program.md`

---

## North star metrics

These are what we measure success by, in order of importance:

| Metric | Launch target | Why it matters |
|---|---|---|
| Active CSRs (signed up + completed at least 1 job) | 100+ before firm outreach | Without supply, demand-side marketing wastes money |
| Active firms (signed up + placed at least 2 orders) | 15-25 by month 5 | Threshold for proving the marketplace works |
| Repeat order rate | 60%+ within 90 days of first order | Indicates product/market fit |
| Avg orders/firm/month | 3+ | Determines unit economics |
| Time from CSR signup → first job accepted | < 2 weeks | Indicates platform is delivering on the supply-side promise |
| Time from firm signup → first order placed | < 7 days | Indicates onboarding works |
| Cost per active CSR signup | < $50 | Sustainable acquisition |
| Cost per active firm signup | < $500 | Sustainable acquisition (firms are higher LTV) |

---

## Audience priority order

### Primary audience 1: CSRs (supply side)
- **Decision-maker:** The CSR themselves
- **Best channels:** Cold email (CRB list), Rosie's network, CSR Facebook groups, LinkedIn
- **Best message:** Keep 100% of your stated rate, no agency cut, direct access to founders during launch
- **Marketing phase:** Phase 1 (Month 2)

### Primary audience 2: Legal assistants & paralegals at small-to-midsize litigation firms
- **Decision-maker:** Legal assistant or paralegal – NOT the partner
  - Why: Partners say "get me the transcript." Legal assistants pick which platform/agency to use. They're the operational decision-maker.
- **Best channels:** Direct outreach, paralegal association meetups, LinkedIn, reporter-to-firm intros, incentive program
- **Best message:** Save time chasing reporters, transparent pricing, your boss won't know the difference (it just works)
- **Marketing phase:** Phase 2 (Month 3-5)

### Secondary audience 1: Insurance carrier litigation management
- **Decision-maker:** Vendor management or claims leadership at carriers
- **Best channels:** Defense firm intros, LinkedIn outreach, industry events (CLM, PLUS)
- **Best message:** Reduce ALAE, transparent statutory pricing, audit-friendly cost data
- **Marketing phase:** Phase 3 (Month 6+, requires launch-window data)

### Secondary audience 2: Self-represented litigants (SRLs)
- **Decision-maker:** The litigant themselves
- **Best channels:** Court self-help centers, legal aid orgs, search marketing
- **Best message:** TRF reimbursement, fee waiver support, transparent statutory pricing
- **Marketing phase:** Post-launch – not a focus during the initial launch window

---

## The core tactical bet

**We win by being the easiest option for the legal assistant.**

Most marketplace marketing focuses on the principal buyer (in this case, attorneys). But attorneys aren't shopping – they're delegating. The legal assistant is the actual user, the actual evaluator, and the actual referrer. If we make their job easier and reward them personally for using the platform, they will:

1. Default to Dewey Sholes when their boss asks for a transcript
2. Tell other legal assistants in their network about it
3. Push back if their firm tries to switch them off the platform

**This is why the legal assistant incentive program (see [legal_assistant_incentive_program.md](legal_assistant_incentive_program.md)) is critical.** It treats them as the buyer they actually are.

---

## What can be automated vs. manual

### Fully automated (build into the platform)

| Tactic | Trigger | What happens |
|---|---|---|
| CSR signup welcome email | Account created | Auto-send onboarding sequence (welcome, complete profile, your first job, license verified) |
| Firm signup welcome email | Account created | Auto-send onboarding sequence (welcome, place first order, here's how cost-split works) |
| Founding-member tagging | Account created during launch window | Auto-set `founding_member=true` and `joined_cohort="launch-2026"` per t62. No price logic – tag is segmentation only. |
| Push notifications | New job posted matching CSR preferences | Firebase Cloud Messaging delivers instantly |
| Email notifications | Job state changes | Order confirmation, reporter assigned, transcript delivered, payment processed, license expiring |
| Legal assistant incentive tracking | Order completed and accepted | Increment job count for the assistant, trigger reward email at threshold |
| Reward delivery (digital) | Reaches Tier 1 (3 jobs) | Auto-issue $25 Amazon gift card via Tremendous/Tango Card API |
| CSR referral tracking | Referred CSR completes onboarding | Increment counter, deliver gift card at thresholds |
| Founding-member feedback touchpoints | Quarterly, on `joined_cohort` anniversary | "How's the platform working? What should we build next?" – preserves the founder-access perk we're selling at signup |
| Search retargeting | User views pricing page but doesn't sign up | Email follow-up with personalized info (later phase) |

### Semi-automated (templates ready, send manually)

| Tactic | Frequency | What it looks like |
|---|---|---|
| Cold email to CRB list | Weekly batches during Phase 1 | 200 emails/week, segmented by license date and metro area |
| LinkedIn outreach | Daily, 10-15 connection requests | Personalized notes to legal assistants and CSRs |
| Bar association posts | When relevant updates exist | Submit to local bar newsletters and family law section listservs |
| CSR Facebook group engagement | 2-3x per week | Authentic engagement, not spam |
| Conference follow-ups | After events | Templates for follow-up emails to contacts met |

### Manual (Aud + Rosie do it personally)

| Tactic | Who | Why |
|---|---|---|
| Warm network outreach | Rosie | Her relationships, her credibility |
| First firm onboarding calls | Aud | White-glove onboarding for the first 25 firms |
| First CSR onboarding check-ins | Aud | Make sure first 100 CSRs have a great experience |
| Carrier outreach (Phase 3) | Rosie + Aud | Long sales cycle, relationship-driven |
| Press / media | Aud | Story shaping requires founder voice |
| Schwag mailers | Aud | Hand-write the note cards (or template them but make them feel personal) |

### Don't do (yet)

- Paid ads (Google, LinkedIn, Meta) – wait until product/market fit and unit economics are proven
- SEO content marketing – too slow for our timeline; revisit Year 2
- Influencer marketing – not relevant to legal industry
- Trade show booths – too expensive ($2-10K each); attend as a participant instead
- PR firm – not justified pre-revenue

---

## Brand voice & positioning

### What we are
- A technology marketplace that connects attorneys with court reporters
- Transparent (statutory rates, no hidden markups)
- Fast (push notifications, 2-business-day payments)
- Modern (built for the legal assistant who has 15 tabs open)
- Compliant (CSR-verified, regulatory boundaries respected)

### What we are NOT
- A court reporting service (regulatory landmine – we're a marketplace)
- A staffing agency (we don't manage CSR work product)
- A custodian of records (CSRs control their notes; we just transfer files)
- A discount service (we don't undercut statutory rates – we just don't add agency markup)

### Voice
- **Direct.** No legal jargon when plain English works.
- **Practical.** Focus on what users actually do, not abstract benefits.
- **Sentence case.** Not Title Case. Not ALL CAPS. (Per Aud's editorial preference.)
- **No "white-glove" or "delight" or "synergy"** or other corporate filler.
- **Confident but not bro-y.** We respect the legal industry.

---

## Marketing budget reality check

**Total available:** Aud's severance, with maybe $2-3K allocable to Dewey Sholes marketing before survival concerns kick in.

**Phase 1 budget (CSR acquisition):** ~$0
- Cold email is free
- Rosie's network is free
- Facebook/LinkedIn organic is free
- Optional: $250-500 for referral program gift cards (only spent if it works)

**Phase 2 budget (firm acquisition):** ~$500-1,500
- Schwag mailers for paralegals at top-target firms (~20-30 packages × $25-35 each)
- Local bar association event entry fees ($10-50 each)
- Optional: $500 for legal assistant incentive program rewards (if early adopters hit thresholds)

**Phase 3 budget (carrier channel):** $0 until revenue justifies it
- All outreach is direct/personal
- Maybe a fractional BD hire ($2-3K/month) once the launch window is generating revenue

**Tools/software:**
- Email sending (Resend or SendGrid free tier): $0
- Tremendous/Tango Card for digital gift cards: pay-as-you-go ($25 per card delivered)
- Schwag printing (Printful, Stickers Northwest, custom merch): variable

---

## When to update this doc

- After every milestone (100th CSR signup, 5th firm onboarded, first carrier meeting)
- When a tactic gets confirmed or killed
- When new audience segments are identified
- Quarterly minimum
