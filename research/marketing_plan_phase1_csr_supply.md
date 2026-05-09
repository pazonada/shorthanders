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

**Sequencing (Aud + Rosie, 2026-05-09):**

Two orthogonal cuts: **employment status** (freelance vs court-employed) and **geography** (Bay Area → other CA metros → rest of state).

**Phase 1A — Freelance CSRs (primary target):**
Per Rosie, roughly half of the 4,733 CRB licensees are court-employed (regularly assigned as the official reporter for a specific courthouse / department). The other ~2,500 are freelance — these are our urgent supply target.

1. **Bay Area freelance** first (~300 CSRs estimated, pending research effort).
2. **Other major CA metro freelance** — LA, San Diego, Sacramento, OC.
3. **Rest of state freelance** — every remaining freelance licensee.

**Phase 1B — Court-employed CSRs (secondary target):**
Court-employed CSRs aren't out of the game — they may take freelance work occasionally and they may have transcripts from court appearances they could deliver via Dewey Sholes. They are not the urgent supply, but they're worth a separate, later batch with **different messaging** that emphasizes:
- Side-income for occasional freelance jobs.
- A simple delivery rail for transcripts they've already produced from their court work.
- Not asking them to leave or replace their primary court employment.

Same geo order within Phase 1B (Bay Area → other metros → rest of state).

**The freelance-vs-employed split depends on the CSR research effort** — we have to identify which CSRs are court-employed before we can run this segmentation. See `research/csr_research_tracker.md` for the methodology.

This isn't a filter (we email everyone in the universe eventually); it's a batch order. Bay Area first for the pilot because that's the geographic concentration where Phase 2 firm outreach will start. Freelance first because that's where the supply gap actually exists.

**Batch size:** 100 CSRs per send. Rationale: lets us A/B subject lines and copy across batches, keeps daily volume well within Resend's free-tier limits, and gives time to triage replies before the next batch lands.

**Pitch in the cold email (locked elements):**
- We're entering pilot phase.
- Listing fee waived for first year.
- They need to be willing to provide feedback during the pilot (light expectation, not heavy commitment).
- Honest disclosure: **the platform doesn't open to law firms until we onboard a minimum number of CSRs**, so signing up now is signing up to be among the first reporters firms see when demand goes live.

**Email sequence (3 touches over 2 weeks per CSR):**
1. Introduction: what Dewey Sholes is, why it exists, free pilot signup, the feedback expectation, the "we're not opening to firms until we have enough CSRs" framing.
2. Follow-up: address common concerns (IC status, how payment works, no exclusivity, statutory rate honored 100%).
3. Final: social proof (how many reporters have signed up, Rosie's endorsement as a practicing attorney, the firms-side waitlist progress).

**Personalization:** name + license info (from CRB pull). Email addresses are not in CRB records — supplement via LinkedIn, firm websites, or the marketing-agent's research pass (see "Marketing agent: open tasks" at the bottom of this doc).

**What we track per email send:**
- **Open rate** per batch (subject-line A/B signal)
- **Click-through rate** to the landing page (per batch, per email touch in the sequence)
- **Conversion rate** = signups attributable to the email (UTM-tagged signup link `?source=email&batch=NN`)
- **Per-batch comparison** — is conversion stable across batches, or does it decay as we move from Bay Area → other metros → rest of state?

**Target conversion rate:** 3-5% = 140-235 signups from the full list.
**Realistic Month 2 target:** Email 1,000-2,000 CSRs → 30-100 signups.

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
- Built into the platform: unique referral link in CSR dashboard, copy-paste-able into emails to CSR friends.
- Rewards (already defined in pilot pricing policy):
  - 1 referral → $10 Starbucks card
  - 5 referrals → $25 Amazon card
  - 10+ referrals → $50 Amazon card
- Cost is minimal and only kicks in when it's working.

**What we track per referral link:**
- **Click-through rate** on the referral link (per CSR — surfaces which CSRs are actively sharing).
- **Conversion rate** of referral-link visitors to signups.
- **Reward triggers** — when a CSR crosses 1, 5, or 10 successful referrals.

**UTM convention:** `?source=referral&csr=<license-number>` so we can attribute to the originating CSR.

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

**The specific problem these cards solve (sharpened 2026-05-08):**

Today, when an attorney finishes a court hearing and later realizes they need a transcript, they have to track down which CSR was on the record — often days or weeks after the fact. The CSR's name might be in the minute order, but contact info isn't. Calling the court clerk, hunting on CSR association directories, asking colleagues who they used last time — it's a real, recurring pain point in civil practice.

**The use case:** at the end of a live hearing, the CSR who reported it hands the attorneys present a Dewey Sholes business card. The card is the attorney's shortcut to ordering the transcript later — they scan the QR or type the URL and land directly on the CSR's profile with a one-click "Request a transcript from a recent hearing" CTA pre-filled with what we know.

**Why this framing sharpens the strategy:**
- It's not generic networking swag. It's a *workflow* tool that solves a concrete attorney pain point.
- The handoff is precise (post-hearing, in person, to attorneys who need exactly this CSR), so distribution volume per CSR is small — maybe 50-100 cards per active CSR per year, not 500.
- The attorney's intent at moment-of-scan is *high* — they have a specific transcript they need, from this specific person. Conversion should be much higher than for cold marketing.
- Live attendance is the use case (CSR was physically there). For audio-transcription jobs the CSR isn't on-site, so cards don't apply the same way.

**Why it works for both sides:**
- **CSR gets** an effortless way to capture future transcript orders from attorneys they already worked with — without having to manage a CRM or follow up by email. The card is the follow-up.
- **Attorney gets** the answer to "who was the CSR on this hearing?" handed to them at the moment they're most likely to need it, plus a trivial path to order.
- **Platform gets** in-the-wild attorney acquisition with the CSR's implicit endorsement — every card handed out is a referral from someone who was just trusted to be on the record for a court proceeding.

**Why it's now feasible:** the recently confirmed CSR profile identifier rule (license number as canonical URL key — see [governance-and-process/csr_account_procedures.md](../governance-and-process/csr_account_procedures.md#public-profile-url--identifier)) means we can pre-print cards with stable per-CSR URLs without worrying about identifier drift.

**Open question — what does the URL on the card link to?**

The sharpened use case (above) basically settles this: the attorney has a specific CSR they need, at the moment they need them. Asking them to land on a homepage and search for "the reporter who was at our 9am hearing yesterday" is exactly the friction the card was supposed to remove.

| Option | Pros | Cons |
|---|---|---|
| **A. Direct profile link** (`deweysholes.com/csr/<license-number>`) | Solves the use case directly. Attorney scans → lands on the CSR's profile → one tap to request a transcript. Standard marketplace pattern (Yelp, LinkedIn, Etsy). | Visiting attorney sees only that CSR's profile in isolation. Mitigated by making profile pages a fully-featured marketplace landing (logo, search, "browse all CSRs" prompt) so the brand impression still happens. |
| **B. Homepage URL** + tell them to search | Brand impression first. | Reintroduces the exact pain point the card was supposed to fix. Attorney has to remember the CSR's name, type it in, hope the search works. If they bounce, they lose us the order. |

**Decision (Aud, 2026-05-08): Option A.** The card's job is to be a precision tool, not a billboard.

**Profile page implication:** when an attorney lands on a CSR profile via a card scan, the primary CTA should be **"Request a transcript from a recent hearing"** — not "Browse this CSR's availability." The flow should pre-fill what we can (the CSR is selected; the attorney enters case + date + delivery preferences). This is essentially the existing order flow with the reporter pre-selected and the entry point flagged so the page treats it as a "post-hearing follow-up" rather than a "fresh booking."

**Tag for product:** the existing order flow at `#/order` supports selecting a specific reporter, but the entry experience from a card scan needs a small affordance — landing on the profile, the order CTA should read in the context of "this CSR you just worked with" rather than generic "book now." Track as a v1.1 product polish item, not blocking for the cards to ship.

**Cost (rough):**
- Standard 2x3.5" linen-finish cards: $0.10–0.20 each at Vistaprint/Moo (250-card minimum at most printers).
- The sharpened post-hearing use case suggests **~50–100 cards per CSR per year** is the right starter volume (a card per attorney at a typical hearing × hearings per CSR × hand-off rate). Lower than initial estimate.
- Per CSR: ~$15–30 for 100 cards, shipped.
- For 100 pilot CSRs: **~$1,500–3,000 total**. Variable-print the CSR-specific name + license number on a generic template.

**When to launch:** tied to onboarding completion + license verification. Available initially to CSRs who indicated they accept **live attendance** jobs (the use case where cards apply); CSRs who only do audio transcription don't need cards yet. CSR triggers "send me my cards" from the dashboard once verified; we ship in monthly batches.

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

## Marketing agent: open tasks

When the marketing agent next runs, the following Phase 1 work is queued:

- **CRB email enrichment.** The CRB data has names + license numbers but not email addresses. Build a workflow to find emails for the Bay Area CSRs (~618) first, then move outward by metro. Acceptable inputs: LinkedIn, firm websites, professional directories. Document the find-rate and a guess at the per-CSR cost so we can decide whether to keep going. Cross-reference with `research/csr_research_tracker.md` so emails feed into the per-CSR research record.
- **Email batch tracking sheet.** Create `research/csr_email_batch_tracker.md` (or Airtable equivalent) that logs per-batch: send date, batch number, geo segment, employment-status segment (freelance vs court-employed), list size, opens, clicks, conversions to signup. Should match the UTM convention `?source=email&batch=NN`.
- **Email sequence drafts.** Three actual email drafts (introduction / follow-up / final) ready for Aud + Rosie review. Honor editorial standards (en-dashes only) and the disclosure rule (we're not opening to firms until minimum CSR signup). **Two variants per touch:** one for freelance CSRs (the Phase 1A primary pitch) and one for court-employed CSRs (Phase 1B — emphasize side-income for occasional freelance work + a delivery rail for transcripts they've already produced).
- **Referral link tracking.** Document the UTM scheme `?source=referral&csr=<license-number>` and the per-CSR analytics view we want in the dashboard once that's built.
- **Court-employed segmentation research.** Help populate the `employment_status` field of the CSR research tracker by pulling from public sources (court official-reporter directories, LinkedIn employer fields, case captions). See `research/csr_research_tracker.md` for the schema and methodology.

---

## Risks

| Risk | Mitigation |
|------|-----------|
| CRB data doesn't include email addresses | LinkedIn lookup, firm websites, professional directories, cold mail as backup |
| CSRs sign up but don't stay active | Early jobs from Rosie's network keep first reporters engaged |
| Low cold email conversion | Iterate messaging, try different segments, lean harder on warm network and referrals |
| CSRs skeptical of new platform | Rosie's credibility as a practicing attorney, waived listing fee, no exclusivity requirement |
