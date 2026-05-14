# Research Memo: California Transcript Rate Regulation & Pricing Implications
## Briscoe Sholes Platform Pricing Architecture

**Prepared for:** Briscoe Sholes founding team
**Date:** March 13, 2026
**Status:** Research draft – see May 2026 clarification below

---

## Important clarification (added 2026-05-13)

This memo originally treated the Gov. Code § 69950 rate as a hard cap on all transcripts of CA court proceedings. That framing is **overly broad and likely incorrect** as applied to DS.

After review on 2026-05-12 (Rosie + Aud), we believe:

- **§ 69950 applies primarily to transcripts produced by court-employed reporters** (the "official reporter" the court provides when one is assigned), billed to parties through the court's clerk.
- **When a private CSR is privately retained** – by a party directly or through a platform / agency – the per-page rate is **market-based**, not statutorily fixed. Agencies like Atkinson-Baker and Aiken-Welch routinely charge $5.50–$7/page for hearing transcripts and pay their CSRs $4.40/page take-out, which would be plainly unlawful if § 69950 were a hard cap on all transcripts. Their continued operation is the strongest evidence that the statute does not apply to private-retention work.
- **Appearance / per-diem fees are unregulated** (per Rosie). Private agencies charge $1,800+ for a half-day hearing in Contra Costa, $3,000+ for full-day hearings in other CA markets – without statutory constraint.
- **Deposition transcripts are not statutorily capped at all** in CA. CCP § 2025.510 governs procedure, not price. Market sets the rate.

**What this means for DS:** our pricing is meaningfully less constrained than this memo originally suggested. We are a marketplace for privately-retained CSRs, not a court-administered transcript service. The recalibration analysis in [csr_agency_live_attendance_rates.md](../csr_agency_live_attendance_rates.md) and [pricing_questions_rosie_and_csrs.md](../pricing_questions_rosie_and_csrs.md) reflects the updated read.

**Open follow-up:** a written legal opinion from a CA attorney with court-reporter-statute experience is worth $500–1,000 of outside-counsel time. Confirms what's above before launch, and gives us defensible posture if a buyer or competitor challenges our pricing.

The remainder of the original memo is preserved below for record. Sections affected by this clarification are flagged inline with **[REVISED 2026-05-13]**.

---

## The Statutory Rate Structure

### Gov. Code § 69950 – Current Rates (as of January 1, 2025)

| Transcript Type | Rate per 100 Words |
|---|---|
| Original transcript | $1.13 |
| Simultaneous additional copy (purchased with original) | $0.20 |
| First copy ordered separately (not simultaneously) | $0.26 |
| Additional copies (purchased at same time as another copy) | $0.20 |

**[REVISED 2026-05-13]** These rates apply to **court-administered transcripts** – i.e., transcripts produced by court-employed reporters and sold to parties through the court's clerk. They do **not** function as a hard cap on transcripts produced by privately-retained CSRs operating through a private marketplace or agency. The original "non-negotiable" framing of this paragraph was overly broad.

### How These Rates Were Set

The original rate ($0.85/100 words) remained unchanged for 28 years before being increased to $1.13 through AB 177 (effective 2021). There is no automatic adjustment mechanism – rate changes require new legislation. The rates for copies had not changed in over 100 years before the most recent adjustment.

Gov. Code § 69950.5 required the Judicial Council to report recommendations for increasing rate uniformity to the Legislature by January 1, 2024. This section sunsets January 1, 2028.

### Deposition Transcript Rates

**[REVISED 2026-05-13]** Deposition transcript rates are **not statutorily capped** in CA. CCP § 2025.510 governs deposition procedure and cost allocation among parties, but does not set a per-page rate. Private agencies set deposition transcript rates by market – typically $4–7/page for original, with separate copy rates and various line-item add-ons. The original claim that "both court hearing and deposition transcript rates are governed by the same statutory framework" was incorrect.

---

## The Folio Multiplier Problem

### What It Is

Gov. Code § 69950(c) addresses the administrative practice of using "folio multipliers" to estimate word counts rather than counting actual words. A "folio" is 100 words. Courts estimate the number of folios per transcript page using a multiplier, which varies by county.

### The Variation

| County Practice | Folios per Page | Implied Words per Page | Cost per Page (Original) |
|---|---|---|---|
| Low multiplier | 2.5 | 250 | $2.83 |
| PRD assumption | ~3.25 | ~325 | $3.67 |
| High multiplier | 3.5 | 350 | $3.96 |

**The difference between the lowest and highest multiplier is 40%.** For a 100-page transcript, this means a price range of $283 to $396 – a $113 spread for identical work.

### Judicial Council Findings

The Judicial Council's report (pursuant to Gov. Code § 69950.5) flagged this variation as a significant problem requiring legislative remedy. The report found that the lack of uniformity in folio-per-page estimates creates substantial disparities in transcript costs within and among courts.

### What § 69950(c) Actually Says

The statute provides that trial court practices regarding the number of words or folios on a typical transcript page "shall not be unilaterally changed by a trial court." This protects existing county practices from being changed by individual courts, but it doesn't mandate a single statewide standard – it freezes whatever each county is currently doing.

### Implication for Briscoe Sholes

The pricing engine cannot use a single statewide words-per-page conversion. It must either:

1. **Use county-level multiplier data** – store the folio multiplier for each county and calculate estimates accordingly. This is the most accurate approach but requires researching and maintaining 58 county-specific values.

2. **Use a range** – display an estimated price range at order entry (e.g., "$283–$396 for a 100-page transcript") based on the low and high multiplier bounds. Less precise but always accurate.

3. **Calculate from actual word count on delivery** – the final invoice is always based on the certified word count of the completed transcript, not an estimate. The multiplier issue only affects the pre-order estimate.

**Recommendation:** Use county-level multiplier data where available, fall back to the range approach for counties where the data isn't confirmed, and always bill on actual certified word count at delivery. The estimate is a UX feature; the invoice is the legal document.

---

## SB 478: California's Honest Pricing Law

### What It Requires

SB 478 (effective July 1, 2024) prohibits California businesses from advertising, displaying, or offering a price for goods or services that does not include all mandatory fees or charges. This is colloquially known as the "drip pricing" ban.

### How It Applies to Briscoe Sholes

If the platform displays the statutory transcript rate ($1.13/100 words, or ~$3.67/page) and then adds a separate platform fee at checkout, this likely violates SB 478. The total price the buyer will pay – including the platform's transaction fee – must be disclosed upfront.

### Pricing Display Options

**Option A: All-in price (recommended)**

Display a single per-page price that includes both the statutory rate and the platform fee. For example, if the platform fee is 15% of the statutory rate, display ~$4.22/page rather than $3.67/page + $0.55 platform fee.

Pros: SB 478 compliant, simple UX, no surprises.
Cons: Buyers can't see the breakdown unless they look for it. Some buyers may compare the displayed rate to the statutory rate they know and think the platform is overcharging.

**Option B: Transparent breakdown with total**

Display the statutory rate AND the platform fee AND the total, all on the same screen at order entry. "Transcript rate: $3.67/page (set by CA Gov. Code § 69950) + Platform fee: $0.55/page = Total: $4.22/page."

Pros: SB 478 compliant (total is displayed upfront), educational, builds trust by showing the statutory rate is not marked up.
Cons: More complex display. Some buyers may question why they're paying more than the statutory rate.

**Recommendation:** Option B. The transparency is a feature, not a bug. Law firms are sophisticated buyers – they know the statutory rate. Showing them that the platform charges a clearly labeled fee on top of the statutory rate (which cannot be changed) is more credible than hiding it in an opaque total. The key is that the total must be shown at the point where the buyer first sees a price – not added later at checkout.

### Enforcement

SB 478 is enforced by the California Attorney General's office. Violations fall under the Consumers Legal Remedies Act (CLRA), which enables consumers to seek damages and injunctive relief. Fines can be significant.

---

## Appearance Fees and Expedite Fees

### Appearance/Per Diem Fees (Live Attendance Only)

Beyond the per-page transcript rate, reporters are entitled to appearance fees for live attendance jobs:

- Proceedings lasting one hour or less: $30 fee (Gov. Code § 68086)
- Proceedings lasting more than one hour: fee equals actual cost of providing services (capped at 18% of salary and benefits for court-employed reporters; market rate for private reporters)

The appearance fee is separate from the transcript cost. In the Briscoe Sholes model, this is the component that can be split among parties (per the PRD's cost-splitting feature). The appearance fee is not set by § 69950 – it's governed by § 68086 and is more variable.

### Expedited Transcript Fees

The PRD defines three turnaround tiers: rush (24 hours), standard (3–5 days), and economy (2+ weeks). The statutory rate applies to all tiers – there is no separate "expedite surcharge" in the statute for court hearing transcripts.

However, for depositions, maximum expedite fees of $2,500 per case apply. The platform should distinguish between court hearing transcripts (no statutory expedite fee) and deposition transcripts (if ever added to the platform) in its pricing logic.

**How to handle turnaround tiers on the platform:** Since the statutory rate doesn't change by turnaround speed, the platform fee is the natural lever for pricing urgency. A higher platform fee for rush jobs and a lower fee for economy jobs creates the tiered pricing the PRD envisions without violating the statutory rate structure. Under SB 478, all tiers must display the total (including platform fee) upfront.

---

## CA Minimum Transcript Format Standard (MTFS)

### What It Requires

The MTFS is defined in California Code of Regulations, Title 16, § 2473 (adopted by the Court Reporters Board, effective January 1, 2025):

- Minimum 25 typed text lines per page
- Full lines of text: no less than 56 characters (52 characters if timestamping is used)
- Text begins no more than 10 spaces from the left margin

### Platform Implications

The built-in transcription workspace (Use Case B) must enforce MTFS formatting automatically. For reporters using their own CAT software, the platform should validate uploaded transcripts against MTFS standards before certification – or at minimum flag non-compliance for the reporter to correct.

The MTFS is also relevant to the words-per-page conversion: 25 lines × ~65 characters/line ÷ ~5 characters/word = ~325 words/page. This is the basis for the PRD's conversion factor, but as discussed above, actual county practice varies.

---

## Rules of Court – Transcript Format and Appeals

### Rule 8.130 (Reporter's Transcript in Appeals)

Establishes deposit requirements for appeal transcripts: $430/day (under 3 hours) or $860/day (3+ hours) for previously untranscribed proceedings. Lower rates ($60/$180) for previously prepared transcripts. The court reporter is paid at the statutory rate per Gov. Code §§ 69950 and 69554.

If the deposit is insufficient, the reporter files a "Notice Re Insufficient Fees" within 15 days. The party then has 10 days to deposit the additional amount.

### Rule 8.144 (Form of the Record)

Governs formatting requirements for reporter's transcripts in appeals: indexes, volumes, covers, and format compliance. References Gov. Code §§ 69950 and 69554 for pricing.

### Rule 8.340(c) (Transcript Correction)

Motions to correct transcript errors must be filed in the Court of Appeal. The platform's dispute resolution process should align with this rule – buyer-flagged errors that rise to the level of a formal correction should be channeled to the appropriate court procedure, not resolved solely on-platform.

---

## Key Takeaways

1. **Statutory rates are fixed at $1.13/100 words for originals.** No negotiation possible. The platform fee is the only pricing lever.

2. **The folio multiplier problem creates 40% price variation across counties.** The pricing engine must account for this – either with county-level data or displayed ranges.

3. **SB 478 requires total price disclosure upfront.** The platform fee cannot be added at checkout. Recommend transparent breakdown (statutory rate + platform fee = total).

4. **Appearance fees for live attendance are separate** from transcript rates and are the component that gets split among parties.

5. **Turnaround tiers should be priced through the platform fee**, not through modification of the statutory rate.

6. **The MTFS defines formatting standards** that the built-in workspace must enforce and uploaded transcripts should be validated against.

7. **Rate changes require new legislation** and are extremely infrequent. The current rate structure is stable and predictable for business modeling purposes.

---

*This memo is based on publicly available statutory and regulatory sources. Rate specifics and procedural details should be verified with the Court Reporters Board before finalizing the platform's pricing engine.*
