# Legal sign-offs tracker

**Owner:** Aud & Rosie
**Last updated:** 2026-03-26
**Status:** Active – action items from Rosie call 3/26

---

## 1. AB 5 / Independent contractor classification

**Status:** Needs employment attorney review

### Our position
CSRs on Dewey Sholes are independent contractors. We score favorably on 8-9 of 11 Borello factors.

### Key question: Which legal test applies?
- **If AB 3136 or AB 2257 exempts CSRs from AB 5:** Borello test applies. IC classification is defensible.
- **If CSRs are NOT exempt:** ABC test applies. Prong B is the vulnerability – is court reporting "outside the usual course" of our business? If we're seen as a "court reporting service," Prong B fails. If we're a "technology marketplace," there's an argument but it's untested.

### Rosie's take
"Pretty sure CSRs are independent contractors." But we need a formal opinion to cover ourselves.

### Platform rules to protect IC status (already implemented in prototype)
- Never call the platform a "court reporting service" – always "marketplace" or "matching platform"
- Do not dictate how reporters produce transcripts
- Allow reporters to decline any job with no penalty or rating impact
- No exclusivity requirements
- Pay per job (per-page rate, not per hour)
- No equipment or proprietary software requirements
- **Hybrid rate-setting bands exposed in CSR settings UI** (added 2026-05-14): CSRs set their own rate via a slider in their profile settings. Standard band ±20% of platform baseline gets full auto-match priority; CSRs can opt into an expanded ±50% band with disclosed lower matching priority; out-of-band requests beyond ±50% are handled by direct email negotiation. This directly addresses CA Labor Code §2778(b)(2)(B): *"The individual has the ability to set or negotiate their own rates for the services performed."* See [rating_and_matching_policy.md – Hybrid rate-setting bands](rating_and_matching_policy.md) for why we chose a soft cap (matching priority) over a hard cap (UI ceiling) – the soft cap removes any plausible argument that we're constraining the §2778 right.

### Onboarding language (already in prototype – updated 2026-05-14)
"By joining Dewey Sholes, you confirm that you are an independent professional, not an employee of Dewey Sholes or its parent company. You choose which jobs to accept, set your own schedule, **set or negotiate your own rates (standard ±20% band via the slider; opt-in expanded ±50% band with reduced matching priority; anything beyond, email us)**, and control how you perform your work."

The Terms of service "Independent contractor relationship" section also explicitly cites the hybrid rate-setting model as part of what makes CSRs independent contractors under §2778.

### Risk matrix
| Scenario | Likelihood | Severity |
|----------|-----------|----------|
| ABC test Prong B challenge | Low-Medium (reduced by exposed §2778 hybrid rate-setting bands – no UI cap on the right; soft cap via matching priority) | High |
| EDD audit reclassifying reporters | Low-Medium | High |
| Individual misclassification claim | Low | Medium |
| Class action by reporters | Very Low (reporters benefit from IC status) | Very High |

### Action item
**Get a formal legal opinion from an employment attorney.** Budget: ~$5K. Rosie will identify candidates.

---

## 2. Platform liability when transcripts are challenged

**Status:** Needs litigation attorney review (or Rosie sign-off on TOS language)

### Our position
Dewey Sholes is a technology marketplace, not a court reporting agency. The reporter bears primary professional responsibility via their personal certification under penalty of perjury.

### Why we're likely NOT liable
- No editorial involvement – we transfer files, don't edit or review content
- IC relationship with reporters (not employees)
- Certification is personal to the reporter under CA law
- Possible Section 230 protection (untested in transcript context)

### Four liability vectors
1. **Negligent matching:** Assigning an unqualified reporter to a complex case
2. **Quality rating misrepresentation:** Firms relying on ratings to select a reporter who produces a defective transcript
3. **Failure to verify credentials:** Reporter's license lapsed and we didn't catch it
4. **Implied warranty:** Marketing promises "guaranteed accuracy" anywhere

### Critical differentiator
Transcripts are legal documents with constitutional implications (right to a record on appeal). Courts may scrutinize marketplace disclaimers more carefully than consumer platforms like Uber.

### Proposed safeguards (to build into TOS)
- TOS establishes platform as marketplace, not agency. Disclaim accuracy guarantees.
- Reporter agreement: sole responsibility for accuracy, indemnification, active CSR license, compliance with professional standards
- Liability capped at the platform fee for the disputed transaction
- Binding arbitration clause
- Never promise accuracy anywhere – promise logistics, payment speed, compliance only
- No editorial touch on transcripts (no spell-check, no formatting normalization)
- Objective rating metrics only (on-time delivery, acceptance rate) – not subjective quality
- Quarterly license verification with auto-suspend (already in CSR License Verification Policy)

### E&O insurance
Recommended: $2-5K/year. Protects against negligent-matching and credential-verification claims.

### Action items
- **(a)** Rosie to review TOS / reporter agreement language. If she's comfortable signing off, we proceed. Otherwise, budget ~$5K for litigation attorney.
- **(b)** Decision on E&O insurance: yes or no? Budget $2-5K/year.
- **(c)** Decision: build formal dispute resolution process before launch, or handle case-by-case initially? (Rosie leaned toward case-by-case during the launch window.)

---

## Already decided (locked)

| Decision | Status |
|----------|--------|
| Entity: Studio Crux, LLC (not raising capital) | Locked |
| Platform fee: flat 12% buyer-side | Locked |
| CSR listing fee: $99/yr individual, $79/reporter/yr firm tier (3-10) | Locked |
| Payment timing: 2 business days after delivery | Locked |
| W-9: collected at first payout, not at signup | Locked |
| SLA tiers: Rush (24-48h), Expedited (3-5d), Standard (2+ weeks) | Locked |
| Case types: all types from launch | Locked |
| Pilot county: SF Bay Area | Locked |
| Volume: a few transcripts per month per lawyer | Locked |
