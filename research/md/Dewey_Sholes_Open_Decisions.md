# Dewey Sholes – Open decisions
*Updated March 27, 2026 – incorporates Rosie call (March 27)*

---

## Platform rules

**1. Transcript correction process**
Attorney says a transcript has errors. What's the correction process? Does the reporter fix it for free? Is there a time limit for requesting corrections?

> **Decision (3/27):** Not a major concern for launch. Consumer protection rules and existing code sections already dictate rules about transcript accuracy. CSRs guarantee 100% accuracy by law, though in practice minor typos are common and insignificant. Rosie's experience over 20+ years: she has never heard of a CSR transcription error leading to anything material. There is likely a statutory procedure for criminal trials where an important fact is misrepresented, but this is extremely rare. **Revisit at the launch phase.**

**2. Reporter deplatforming and ratings**
How many late deliveries or quality complaints before a reporter gets suspended? Is there an appeals process?

> **Decision (3/27):** Late deliveries are the primary concern. If a CSR accepts a job, they accept the timeline. Default deadline is 45 days if the attorney doesn't specify one. After 5 late deliveries or quality complaints, the CSR gets suspended. There should be an appeals process.
>
> **Ratings system:**
> - Three dimensions: communication/responsiveness, timeliness, transcript quality – plus a composite score for matching
> - Aggregate ratings shown to CSRs monthly (not individual attributions)
> - Comments visible only to Dewey Sholes admin team (moderation layer)
> - Trimmed mean calculation (drop highest and lowest each quarter)
> - Algorithmically reduce influence of attorneys whose ratings consistently diverge from consensus
>
> **Matching algorithm:**
> - *Favorites tier:* First right of refusal with time-limited window (24h standard, 2-3h rush)
> - *General pool:* Weighted lottery – CSRs above 3.5 rating threshold enter pool, higher-rated get more "tickets" (e.g. 4.8 = 3x chance vs 3.6). Solves cold-start for new CSRs.
> - *Overload protection:* Track current workload, reduce weighting when at capacity. CSRs set own availability and max concurrent jobs.
> - *Live attendance:* Sort by blend of rating, workload, and proximity to courthouse
> - *Court-appointed CSRs:* Separate track, in general pool only when explicitly available for freelance. Badge visible to attorneys.
> - *Release flow:* CSR indicates reason (court appointment, illness, conflict) + when they knew. Job re-enters matching. Release frequency tracked by admins but doesn't directly affect rating.
> - *Launch (first 90 days):* Favorites-first matching, then round-robin/availability. No ratings in algorithm. Collect ratings during the launch window for future use.
> - *Post-launch transition:* Introduce ratings as tiebreaker first, then gradually increase weight after 3-6 months / 10+ rated jobs per CSR.
>
> **Action items:**
> - Create training/welcome experiences as part of onboarding for both law firms and CSRs (roadmap item)
> - Build communication strategy for CSRs who don't get work early at launch ("platform is growing" updates)

**3. Late delivery grace period**
Policy says grace period + routing priority demotion. How long is the grace period? 24 hours? 48 hours?

> **Decision (3/27):** 24-hour grace period if the law firm specified a deadline. Platform should transparently tell law firms at booking time that CSRs have a 24-hour grace period, so they should set their deadline a day prior to when they actually need it.
>
> **Check-in system:**
> - Platform pings CSR mid-job: "How's it going? Is this job on track?" – yes/no
> - If no: system asks if they want to reassign. If they say yes, it's reassigned. If no, one more check-in closer to deadline.
> - If still not on track at second check-in, auto-reassign.
> - For rush/expedited jobs: still check in but auto-reassign immediately if CSR says not on track.

**4. Audio file retention**
How long does the platform hold uploaded audio files? 90 days? 1 year? Who's responsible for long-term storage?

> **Decision (3/27):** 90 days after payment received and transcript delivered. The court retains audio for years (they're the records custodian). Law firms have their own internal retention policies. Platform doesn't need to hold audio long-term – only during the grievance/challenge window.
>
> **Action item:** Determine whether UCC specifies how long a firm has to challenge a transcript after delivery. 90 days is the working assumption.

**5. Confidentiality safeguards**
What contractual language do reporters agree to regarding attorney-client privileged audio? NDA at onboarding? What happens if confidentiality is breached?

> **Decision (3/27):** Not a major platform concern. If it's a public hearing in open court, it's publicly available – no confidentiality issue. For private proceedings, confidentiality obligations fall on the law firm regarding how they handle audio internally. The CSR is not bound by any separate confidentiality agreement, and the platform is not implicated. **No NDA required at onboarding.**

---

## Money decisions

**6. Referral discount / launch pricing**
First year free? Half off ($49)? Same discount whether invited by an attorney or another CSR?

> **Decision (3/27, revised 2026-05-14):** The original 3/27 decision was to run a 90-day discounted pricing tier (waived CSR listing fees, reduced 8% buyer fee locked for first year). **That tier was retired on 2026-05-14** (see [../../governance-and-process/founding_member_program.md](../../governance-and-process/founding_member_program.md) for rationale – churn cliff at rate-change date, conflicts with transparency positioning, breaks Year-1 revenue projections).
>
> **Current pricing (everyone, day one):**
> - Law firms: flat 12% platform fee
> - Individual CSRs: $99/yr listing fee, billed annually
>
> **Founding cohort (signups during the 6-month launch window):** Tagged in the DB as `founding_member=true` for internal segmentation. Get non-pricing perks – founder access, first dibs on new features, roadmap input. No pricing discount.
>
> **CSR referral incentives** (unchanged): CSR refers others and at least 1 signs up → $10 Starbucks digital gift card. 5 sign up → $25 Amazon card. 10+ sign up → $50 Amazon card.
>
> **Action item:** Search CRB database by license number to target older CSRs nearing retirement – recruit them first.

**7. Fee waiver orders**
TRF takes 8-10 weeks to reimburse. Confirmed: attorney pays upfront, platform generates reimbursement paperwork, platform does NOT float the cost. Does Rosie agree?

> **Decision (3/27):** Confirmed. Attorney pays upfront. Platform generates reimbursement paperwork. No float.

**8. Cancellation / refund policy**
Attorney cancels after a reporter has been assigned. Who eats the cost? What if the reporter already started work?

> **Decision (3/27):** TBD – no answer yet. Rosie notes that attorneys are currently at the mercy of whatever CSRs say, so any improvement is significant. **Action item:** Ask CSRs during discovery interviews how they currently handle cancellations.

---

## Legal sign-offs

**9. AB 5 / Independent contractor classification**

*Our position:* Licensed CSRs on Dewey Sholes are independent contractors, not employees.

*The threshold question – which test applies?*
- **Borello test** applies if CSRs are exempt from AB 5 (via AB 3136 or AB 2257). We score favorably on 8-9 of 11 Borello factors. IC classification is defensible.
- **ABC test** applies if CSRs are NOT exempt. Prong B is the vulnerability: is court reporting "outside the usual course" of our business? If we're seen as a "court reporting service," Prong B fails. If we're a "technology marketplace," there's an argument – but it's untested.

*Proposed platform rules to protect IC status:*
- Never call the platform a "court reporting service." Always "marketplace" or "matching platform."
- Do not dictate how reporters produce transcripts. Offer optional tools, never require them.
- Allow reporters to decline any job with no penalty or rating impact.
- Do not provide equipment or proprietary software reporters must use.
- No exclusivity requirements – reporters can work for agencies, other platforms, or direct clients.
- Pay per job (per-page statutory rate), not per hour.
- Verify credentials and enforce court rules only – no quality control that resembles supervision.

*Onboarding language:* "By joining Dewey Sholes, you confirm that you are an independent professional, not an employee of Dewey Sholes or its parent company. You choose which jobs to accept, set your own schedule, and control how you perform your work."

*Risk matrix:*
| Risk | Likelihood | Severity |
|---|---|---|
| ABC test Prong B challenge | Medium | High |
| EDD audit reclassifying reporters | Low-Medium | High |
| Individual misclassification claim | Low | Medium |
| Class action by reporters | Very Low | Very High |

> **Decision (3/27):** Rosie is fairly confident CSRs are independent contractors, but we need a real legal opinion from an employment attorney to cover ourselves. **Action item:** Engage employment lawyer for formal sign-off.

**10. Platform liability when transcripts are challenged**

*Our position:* Dewey Sholes is a technology marketplace, not a court reporting agency. The reporter bears primary professional responsibility for transcript accuracy via their personal certification under penalty of perjury.

*Why we're likely NOT liable:*
- No editorial involvement – we transfer files, we don't edit or review transcript content.
- IC relationship with reporters (not employees).
- Certification is personal to the reporter under CA law.
- Possible Section 230 protection (untested in transcript context – cannot rely on this).

*Four liability vectors:*
1. Negligent matching: Assigning an unqualified reporter to a complex case.
2. Quality rating misrepresentation: If firms rely on platform ratings to select a reporter who produces a defective transcript.
3. Failure to verify credentials: If a reporter's license lapsed and we didn't catch it.
4. Implied warranty: If our marketing promises "guaranteed accuracy" or similar language.

*Proposed safeguards:*
- TOS establishes platform as a marketplace. Disclaim accuracy guarantees.
- Reporter agreement: sole responsibility for accuracy, indemnification, active license, professional standards.
- Limitation of liability capped at the platform fee for the disputed transaction.
- Binding arbitration clause for disputes.
- Never promise accuracy – promise logistics, payment speed, and compliance only.
- No editorial touch on transcripts. Format validation (file type, cert page present) is OK.
- Reporter ratings use objective metrics only (on-time delivery, acceptance rate) – not subjective quality.
- Quarterly license verification with logging; auto-suspend reporters with lapsed licenses.
- E&O insurance recommended at $2-5K/year.

> **Decision:** Still open. Need answers on:
> - (a) Can Rosie review and sign off on TOS / reporter agreement, or do we need a litigation attorney ($2-5K)?
> - (b) E&O insurance: yes or no? Budget $2-5K/year.
> - (c) Dispute resolution process before launch, or case-by-case initially?

---

## Financial model research

**11. Live attendance vs. audio transcription ratio**

This is the single biggest variable in the financial model. Only 2 counties in CA require attorneys to bring their own CSR for live attendance. Audio transcription is location-independent. The actual split may be closer to 20-30% live / 70-80% audio, which would significantly change revenue projections.

*Current model assumption:* 60/40 live attendance / audio transcription.

> **Action needed:** Survey CSRs during discovery interviews (Q4a) to determine the actual split. Update financial model after 10+ interviews.

**12. Live attendance pricing**

> **Decision (3/27):** Standardized rates for live attendance, set at 1/3 below average agency rates. Win-win: attorneys pay less than agency rates, CSRs earn more than they would through an agency (because they keep 100%).
>
> **Standardized DS attendance rates (based on LA Superior Court baseline):**
>
> | | Agency rate | DS rate (1/3 off) | CSR keeps |
> |---|---|---|---|
> | **Half day (up to 4 hours)** | $382 | **$255** | $255 (100%) |
> | **Full day (4+ hours)** | $764 | **$509** | $509 (100%) |
>
> For context: through an agency at $382/half day, the CSR typically gets ~$190 (agencies keep 50%+). Through DS at $255/half day, the CSR gets $255 – a 34% raise while the attorney pays 33% less.
>
> 12% platform fee applies to the total booking (attendance + per-page transcript rate).
>
> Sources: Federal CACD per diem rates, LA Superior Court fee schedule, STENOIMPERIUM agency transparency report.
>
> **Action item:** Validate these rates with Rosie and pressure-test with her action group before launch. Rates for depositions/private work (where agencies charge $500-600+/half day) may need a separate tier.

---

## Already decided (for reference)

These are locked. Included here so we don't re-discuss them.

- Entity: Studio Crux, LLC (d/b/a Dewey Sholes, not raising capital)
- Platform fee: Flat 12% buyer-side, day one, everyone (the prior "8% during the launch window, locked for 1 year" tier was retired 2026-05-14 – see #6 above)
- CSR listing fee: $99/year individual, $79/reporter/year firm tier (3-10 reporters)
- Payment timing: 2 business days after delivery
- W-9: Collected at first payout, not at signup
- SLA tiers: Rush (24-48h emergency), Expedited (3-5 days), Standard (2+ weeks)
- Case types: All types from launch
- Pilot county: SF Bay Area (Rosie's networks, may expand statewide via Hastings alumni)
- Volume: A few transcripts per month per lawyer
- Billing: Pay-per-order only at launch (Net-30 deferred until revenue supports float)
- Confidentiality: No NDA required – public hearings are public, private proceedings are law firm's responsibility
- Audio retention: 90 days post-delivery (pending UCC research)
- Late delivery grace period: 24 hours with mid-job check-ins
- Deplatforming threshold: 5 strikes (late deliveries or quality complaints)
- IC confirmation language: "independent professional, not an employee of Dewey Sholes or its parent company"
- Live attendance: Standardized at 1/3 below agency rates ($255/half day, $509/full day). CSR keeps 100%.
