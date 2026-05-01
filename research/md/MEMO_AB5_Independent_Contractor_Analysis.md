# Research Memo: AB 5 / Independent Contractor Classification for Court Reporters on a Gig Marketplace Platform

**Prepared for:** Briscoe Sholes founding team
**Date:** March 13, 2026
**Status:** Research draft — requires attorney review and sign-off before reliance
**Jurisdiction:** California

---

## Executive Summary

Briscoe Sholes's marketplace model — connecting attorneys with independent certified shorthand reporters (CSRs) — faces a threshold legal question: are the reporters on the platform employees or independent contractors under California law?

The short answer is that the legal landscape is meaningfully more favorable than it might appear at first glance. Licensed CSRs have strong arguments for independent contractor status under the applicable legal tests, and the marketplace model (as opposed to a staffing agency model) strengthens that position further. However, this is not a slam dunk, and the specific design of the platform's relationship with reporters matters. An attorney must review the platform's operational details and sign off before launch.

---

## The Legal Framework

### The ABC Test (Dynamex / AB 5)

California's default test for worker classification is the ABC test, established by *Dynamex Operations West v. Superior Court* (2018) and codified by AB 5 (effective January 1, 2020). Under this test, a worker is presumed to be an **employee** unless the hiring entity proves **all three** of the following:

- **Prong A:** The worker is free from the control and direction of the hiring entity in performing the work, both under contract and in fact.
- **Prong B:** The worker performs work that is **outside the usual course** of the hiring entity's business.
- **Prong C:** The worker is customarily engaged in an independently established trade, occupation, or business of the same nature as the work performed.

This is a conjunctive test — failure on even one prong results in employee classification. Prong B is the killer for most gig platforms: if your business is providing court reporting services, and your workers are court reporters, the work is definitionally within your usual course of business.

### The Borello Test (Pre-Dynamex Standard)

Before Dynamex, California used the *S.G. Borello & Sons v. Department of Industrial Relations* "totality of the circumstances" test. This is a multifactor balancing test that considers roughly 11 factors, including who controls the work, who provides tools, method of payment, skill level, whether the worker has an independent business, and the parties' intent. No single factor is dispositive, and failure on one factor doesn't automatically result in employee classification.

The Borello test is significantly more favorable to independent contractor classification for skilled, licensed professionals like CSRs.

### The Critical Question: Which Test Applies to CSRs?

AB 5 carved out numerous exemptions from the ABC test. Exempt workers are instead evaluated under the Borello test. The question is whether CSRs fall within one of these exemptions.

**What we know:**

1. **AB 3136 (2019-2020 session):** Assemblymember Randy Voepel introduced AB 3136 specifically to exempt certified shorthand reporters (licensed under Business & Professions Code § 8000 et seq.) from the Dynamex ABC test. The bill's existence confirms the legislative intent to exempt CSRs. However, the final disposition of this bill requires confirmation — our research could not definitively establish whether it was enacted into law, rolled into another bill (such as AB 2257, the major AB 5 cleanup bill), or died in committee.

2. **AB 2257 (2020):** This was the comprehensive AB 5 cleanup bill that expanded the list of exempt professions. It is possible that the CSR exemption was incorporated here. This needs to be verified against the current text of Labor Code § 2750.3 (as amended) or its successor provisions.

3. **Professional services exemption:** AB 5 exempts numerous licensed professionals (attorneys, doctors, architects, accountants, engineers, etc.) from the ABC test. These exemptions generally require that the worker: (a) maintains a business location separate from the hiring entity, (b) has a business license, (c) has the ability to set their own rates, (d) can set their own hours, (e) is customarily engaged in the same type of work, and (f) can contract with other businesses. CSRs satisfy most of these conditions by the nature of their profession.

**What needs to be confirmed by counsel:**

- Whether AB 3136 was enacted or incorporated into AB 2257
- Whether CSRs are currently listed as an exempt profession under Labor Code § 2750.3 (or its successors)
- If no explicit statutory exemption exists, whether CSRs qualify under the general "professional services" exemption based on their licensing and professional characteristics

**For purposes of this memo, the analysis below proceeds under both scenarios:**
- Scenario A: CSRs are exempt, and the Borello test applies
- Scenario B: CSRs are not exempt, and the ABC test applies

---

## Analysis: Briscoe Sholes's Model Under Each Test

### Scenario A: Borello Test Applies (If CSRs Are Exempt)

Under the Borello multifactor test, Briscoe Sholes's marketplace model is **strong** for independent contractor classification:

| Borello Factor | Analysis | Favorable? |
|---|---|---|
| Distinct occupation or business | CSRs are licensed professionals in a distinct, established profession | Yes |
| Outside principal's regular business | Depends on how the platform is characterized (see below) | Neutral |
| Ability to discharge at will | Platform can remove reporters from the marketplace; reporters can leave | Neutral |
| Length of service | Per-job engagement, not ongoing employment relationship | Yes |
| Kind of work and skill involved | Highly skilled, licensed, specialized work | Yes |
| Who supplies tools | Reporters use their own stenotype machines, CAT software, dictionaries | Yes |
| Method of payment | Per-job (per-page statutory rate), not time-based | Yes |
| Parties' belief | Platform characterizes reporters as ICs; reporters operate as ICs | Yes |
| Opportunity for profit/loss | Reporters choose which jobs to accept, can work for multiple platforms | Yes |
| Investment by worker | Significant: licensing, equipment, training, professional development | Yes |
| Integral to business | Court reporting is the service the platform facilitates | Against |

**Assessment:** Under Borello, Briscoe Sholes's model scores favorably on 8-9 of 11 factors. The "integral to business" factor cuts against IC status, but under the Borello balancing approach, this alone is unlikely to override the weight of the other factors. **IC classification is likely defensible under Borello.**

### Scenario B: ABC Test Applies (If CSRs Are Not Exempt)

Under the ABC test, the analysis is harder:

**Prong A (freedom from control):** Likely satisfied. The platform does not direct how reporters produce transcripts, does not supply their tools, does not set their hours, and does not require exclusivity. Reporters choose which jobs to accept and use their own professional judgment and equipment. The platform sets some parameters (turnaround deadlines, format requirements), but these flow from court rules and buyer preferences, not platform control of the work itself.

**Prong B (outside usual course of business):** This is the critical question. If Briscoe Sholes characterizes itself as a "court reporting service," Prong B fails — the reporters' work is the platform's core business. However, if the platform characterizes itself as a **technology marketplace that connects buyers and sellers** (analogous to how Airbnb is a marketplace, not a hotel company), there's an argument that court reporting is not the platform's business — building and operating the marketplace is. This argument has been tested in other gig economy contexts with mixed results. **This is the highest-risk prong and the one most likely to be litigated.**

**Prong C (independently established business):** Likely satisfied. Licensed CSRs are, by definition, established independent professionals. They hold state licenses, maintain their own equipment, and most operate as independent businesses or through agencies. This prong is the strongest for CSRs.

**Assessment:** Under the ABC test, Prong B is the vulnerability. The platform's legal positioning (marketplace vs. service provider) matters enormously. The operational reality must match the legal characterization.

---

## Platform Design Recommendations to Strengthen IC Classification

Regardless of which test applies, the following platform design choices strengthen the independent contractor argument:

1. **Never call the platform a "court reporting service."** It is a marketplace or matching platform. Language matters in classification disputes.

2. **Do not dictate how reporters produce transcripts.** Offer an optional built-in workspace, but never require it. The PRD already does this correctly.

3. **Allow reporters to set their own availability and decline any job.** No penalties for declining jobs (though you can track acceptance rates for quality signals).

4. **Do not provide reporters with equipment or software.** The built-in transcription workspace is an optional tool, not a required one. Reporters who prefer their own CAT software should be the default expectation.

5. **Allow reporters to work on other platforms and for other clients.** No exclusivity requirements.

6. **Pay per job, not per hour.** The statutory per-page rate structure supports this naturally.

7. **Use independent contractor agreements** that clearly establish the IC relationship, the reporter's independent business status, and the reporter's obligation to handle their own taxes, insurance, and licensing.

8. **Do not exercise quality control that looks like supervision.** Compliance verification (license status, format standards) is different from directing the work itself. The platform verifies credentials and enforces court rules — it does not tell reporters how to do their jobs.

---

## Proposition 22 — Not Applicable

Proposition 22 (2020, upheld by CA Supreme Court July 2024) applies exclusively to app-based rideshare and delivery drivers (Uber, Lyft, DoorDash, etc.). It does not extend to court reporters or any other gig workers. Briscoe Sholes cannot rely on Prop. 22 for IC classification.

---

## Risk Assessment

| Risk | Likelihood | Severity | Mitigation |
|---|---|---|---|
| CSRs are exempt from ABC test (Borello applies) | Needs verification | If true, significantly de-risks | Confirm with counsel; cite specific statutory provision |
| ABC test Prong B challenge | Medium (if ABC applies) | High | Platform positioning as marketplace, not service provider |
| EDD audit reclassifies reporters as employees | Low-Medium | High (back taxes, penalties) | IC agreements, operational discipline, legal opinion on file |
| Individual reporter files misclassification claim | Low | Medium | Same mitigation as above; dispute resolution process |
| Class action by reporters alleging misclassification | Very Low (reporters benefit from IC status) | Very High | Proactive legal opinion; platform design best practices |

---

## Recommendations

1. **Highest priority:** Have counsel confirm whether CSRs are currently exempt from the ABC test under Labor Code § 2750.3 (or successor provisions). This changes the entire risk profile.

2. **Obtain a formal legal opinion** on IC classification for platform reporters, covering both the exempt (Borello) and non-exempt (ABC) scenarios. This opinion should be on file before the platform accepts its first order.

3. **Design the platform's terms of service and reporter agreements** with IC classification in mind. Have employment counsel draft these — not general business counsel.

4. **Maintain strict operational discipline** on the design recommendations above. The legal characterization only holds if the operational reality matches.

5. **Monitor legislative developments.** The CSR licensing statute sunsets January 1, 2029 (AB 3252). Any changes to licensing could affect exemption status. Future versions of AB 1189 (digital reporters / transcriptionists) could create new worker categories with different classification rules.

---

*This memo is a research summary, not legal advice. It should be reviewed by a California employment attorney before any business decisions are made based on its contents.*
