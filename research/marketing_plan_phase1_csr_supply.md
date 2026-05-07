# Marketing plan: Phase 1 — CSR supply acquisition

**Owner:** Aud (execution) + Rosie (warm intros)
**Last updated:** 2026-04-11
**Status:** Draft
**Budget:** ~$0 (sweat equity only)
**Timeline:** Month 2 (after site build complete, Month 1)
**Goal:** 100 CSRs signed up before marketing to law firms

---

## Why supply comes first

Dewey Sholes is a two-sided marketplace. Law firms won't use a platform with no reporters, and reporters won't stay on a platform with no jobs. We break the chicken-and-egg problem by loading supply first:

1. Sign up CSRs (free during pilot — $99/yr listing fee waived)
2. Once we have enough supply to reliably fill jobs → market to firms
3. Firms post jobs → reporters get work → flywheel starts

## How many CSRs do we need?

**Target: 100 signed up before starting firm outreach.**

Why 100 is enough:
- ~80%+ of orders will be transcription, which can be done by **any CSR in the state** regardless of location
- Only 2 CA counties prohibit audio recording (requiring live attendance with a CSR physically present)
- At ~40% regularly active, 100 signups = ~40 CSRs checking the platform regularly = more than enough to cover a pilot's volume of a few jobs per week
- We can start firm outreach in metros where we have the deepest live-attendance coverage while transcription jobs are statewide

## The pitch to CSRs

**During pilot:** "Sign up free — no listing fee during the pilot. Get found directly by attorneys at statutory rates. No agency middleman taking a cut."

**Key selling points:**
- Keep 100% of your statutory rate (no agency markup)
- $99/yr listing fee waived during pilot
- Choose which jobs to accept — no exclusivity, no minimum volume
- Platform handles payment collection (2 business days after delivery)
- Your CSR license is verified automatically via CRB data — instant credibility

## Channels (all free)

### 1. Cold email to CRB database (Primary — highest volume)
**Source:** 4,733 active CA CSRs from CRB data pull (completed)
**Approach:** 
- Segment by license issue date:
  - **Newest CSRs (licensed last 2-3 years):** Hungry for work, no agency loyalty, most tech-comfortable
  - **Most experienced CSRs (licensed 20+ years):** Deep attorney relationships, may be looking to simplify their practice before retirement
- Email sequence (3 touches over 2 weeks):
  1. Introduction: what Dewey Sholes is, why it exists, free pilot signup
  2. Follow-up: address common concerns (IC status, how payment works, no exclusivity)
  3. Final: social proof (how many reporters have signed up, Rosie's endorsement as a practicing attorney)
- Personalize with their name and license info (we have it from CRB)
- CRB records may not have email addresses — supplement via LinkedIn lookup, firm websites, or professional directory searches

**Target conversion rate:** 3-5% = 140-235 signups from full list
**Realistic Month 2 target:** Email 1,000-2,000 CSRs → 30-100 signups

### 2. Rosie's professional network (Highest quality)
**Source:** Rosie's 22 years of practicing family law in CA
**Approach:**
- Personal outreach to reporters Rosie has worked with directly
- Ask each to refer 2-3 colleagues
- Leverage the CSR shortage action group contacts — ask reporters who their regular firms are (feeds firm targeting later)

**Target:** 10-15 warm signups
**Timeline:** Concurrent with cold email, ongoing

### 3. CSR Facebook groups and online communities
**Source:** Active FB groups where reporters discuss industry issues, complain about agencies, share job leads
**Approach:**
- Join groups, engage authentically (not just spam a link)
- Share content about the CSR shortage, statutory rate transparency, problems with agency model
- When relevant, mention Dewey Sholes as a solution
- Rosie's credibility as a 22-year attorney adds weight

**Target:** 5-15 signups
**Timeline:** Ongoing from Month 2

### 4. LinkedIn content and outreach
**Source:** Aud's marketing/comms background
**Approach:**
- Posts about the CSR shortage, transcript cost transparency, the broken status quo
- Connect with CSRs directly (LinkedIn has occupation filters)
- Share Rosie's perspective as an attorney frustrated with the current system

**Target:** 5-10 signups
**Timeline:** Ongoing from Month 2

### 5. CSR referral program
**Source:** Every CSR who signs up
**Approach:**
- Built into the platform: unique invite link in CSR dashboard
- Rewards (already defined in pilot pricing policy):
  - 1 referral → $10 Starbucks card
  - 5 referrals → $25 Amazon card
  - 10+ referrals → $50 Amazon card
- Cost is minimal and only kicks in when it's working

**Target:** 10-20 signups (secondary channel, grows over time)
**Budget:** ~$250-500 in gift cards (only spent if it works)

### 6. Local paralegal / legal professional meetups
**Source:** SF Paralegal Association, LA Paralegal Association, local bar events
**Approach:**
- Attend events, meet people, mention the platform
- Paralegals often know CSRs personally — they can make intros
- Free or $10-20 entry

**Target:** Relationship building, 2-5 indirect signups
**Timeline:** Month 3+

---

## Schwag mailers (stretch goal, if budget allows)

If there's $500-750 to spare:
- Send 20-25 branded tumblers + note cards to highest-value CSR targets
- Focus on: newly licensed CSRs in major metros + experienced CSRs from Rosie's network
- Estimated cost: $25-35/package shipped × 20-25 = $500-875
- Note card from Rosie as a practicing attorney who built the platform

**Decision:** Defer until Month 3. Revisit if cold email conversion is below target and we need a boost.

---

## CSR business cards (open idea, captured 2026-05-08)

**The idea (Aud + Rosie, in active discussion):** Mail free branded business cards to each CSR who completes onboarding and gets license-verified. Cards include the CSR's name and license number, a tagline like "Find me on Dewey Sholes for a transcription!", and a direct link/QR to their Dewey Sholes profile.

**Why it works for both sides:**
- **CSR gets** a free, professionally produced asset to grow their book of business — something they can hand out at depositions, courthouses, bar events.
- **Platform gets** CSR-driven attorney acquisition: every card distributed is an inbound referral with the CSR's personal endorsement implied.

**Why it's now feasible:** the recently confirmed CSR profile identifier rule (license number as canonical URL key — see [governance-and-process/csr_account_procedures.md](../governance-and-process/csr_account_procedures.md#public-profile-url--identifier)) means we can pre-print cards with stable per-CSR URLs without worrying about identifier drift.

**Open question — what does the URL on the card link to?**

| Option | Pros | Cons |
|---|---|---|
| **A. Direct profile link** (`deweysholes.com/csr/<license-number>`) | Lowest friction. Attorney lands on the CSR's profile, sees ratings/specialties/availability, books in 2 clicks. Standard marketplace pattern (Yelp, LinkedIn, Etsy). | Visiting attorney sees only that CSR's profile in isolation. Mitigated by making profile pages a fully-featured marketplace landing (logo, search, "browse all CSRs" prompt). |
| **B. Homepage URL** + tell them to search | Brand impression first — attorney sees the platform's pitch. | Higher friction. Attorney may not bother searching for the specific CSR; risks them remembering "Dewey Sholes" generically and booking through any other channel. Weaker conversion. |

**Aud's leaning (2026-05-08):** Option A. Profile page should include marketplace context (nav, search, "browse all CSRs") so the brand impression still happens, but the attorney's primary intent — book this specific CSR — should be one tap away. Standard marketplace conversion logic.

**Cost (rough):**
- Standard 2x3.5" linen-finish cards: $0.10–0.20 each at Vistaprint/Moo (250-card minimum).
- Per CSR: $25–50 for a useful starter quantity (250–500 cards), shipped.
- For 100 pilot CSRs: ~$2,500–5,000 total. Variable-print the CSR-specific name + license number on a generic template.

**When to launch:** tied to onboarding completion + license verification. CSR triggers "send me my cards" from the dashboard once verified, we ship in monthly batches.

**Risks / open issues:**
- **Compliance with CSR's own branding.** Many CSRs already have firm-issued or self-issued cards. Frame ours as a "Dewey Sholes referral card" — additive, not replacement.
- **Distribution overhead.** Shipping individual orders is operationally heavy. Batch quarterly or use a print-on-demand integration (Moo / Sticker Mule / Vistaprint API).
- **Card aging.** A paused or deplatformed CSR has cards in circulation. The profile-identifier policy already handles this gracefully (paused → "this CSR is taking a break" page; deplatformed → generic "no longer available"). Verify before launch.

**Tag for marketing agent:** when next planning Phase 1 budget, evaluate whether business cards displace any of the schwag-mailer line item above. Both target high-value CSRs but with different mechanisms (cards = recurring distribution touchpoint; tumblers = one-shot wow moment).

**Status:** undecided; not in MVP scope. Capture in Month 2-3 budget discussion.

---

## Timeline

| Week | Activity |
|------|----------|
| Month 1 | Site build (Aud + Claude) |
| Month 2, Week 1-2 | Prep email sequences, segment CRB list, supplement email addresses |
| Month 2, Week 2 | Rosie begins warm outreach to her network |
| Month 2, Week 3 | First cold email batch (500 CSRs — newest licenses) |
| Month 2, Week 4 | Second cold email batch (500 CSRs — most experienced) |
| Month 3, Week 1-2 | Follow-up sequences, iterate messaging based on response rates |
| Month 3, Week 3-4 | Expand to remaining CRB list if needed, launch referral program |
| Month 3-4 | Hit 100 CSRs → begin Phase 2 (firm outreach) |

---

## Success metrics

| Metric | Target |
|--------|--------|
| CSRs signed up | 100 before firm outreach begins |
| Cold email open rate | 25%+ |
| Cold email → signup conversion | 3-5% |
| Warm network signups | 10-15 |
| Time to 100 signups | 6-8 weeks from first outreach |
| Geographic coverage (for live attendance) | At least 10 CSRs in each of LA, Bay Area, San Diego |

---

## Risks

| Risk | Mitigation |
|------|-----------|
| CRB data doesn't include email addresses | LinkedIn lookup, firm websites, professional directories, cold mail as backup |
| CSRs sign up but don't stay active | Early jobs from Rosie's network keep first reporters engaged |
| Low cold email conversion | Iterate messaging, try different segments, lean harder on warm network and referrals |
| CSRs skeptical of new platform | Rosie's credibility as a practicing attorney, waived listing fee, no exclusivity requirement |
