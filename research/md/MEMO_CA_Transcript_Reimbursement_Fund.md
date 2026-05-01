# Research Memo: California Transcript Reimbursement Fund (TRF)
## Implications for Briscoe Sholes's Fee Waiver Flow

**Prepared for:** Briscoe Sholes founding team
**Date:** March 13, 2026
**Status:** Research draft

---

## What the TRF Is

The Transcript Reimbursement Fund is a California program administered by the Court Reporters Board (CRB) that reimburses court reporters for the cost of preparing transcripts for litigants who have been granted fee waivers by the court. It exists to ensure that indigent litigants — who cannot afford transcript costs — still have access to verbatim court records, and that reporters are not expected to work for free.

**Statutory authority:** Government Code § 68086; Business & Professions Code § 8030.2 et seq.

---

## How the TRF Works Today

### The Current Process (Manual, Slow, Paper-Based)

1. **Litigant obtains a fee waiver** from the court (Form FW-001 / FW-003). This must be on file with the court before the transcript is ordered.

2. **Litigant requests a transcript.** The court reporter prepares the transcript at the statutory rate (Gov. Code § 69950 — currently $1.13/100 words for originals).

3. **Reporter submits a reimbursement claim** to the Court Reporters Board. The claim form requires: the reporter's name and CSR license number, case information, court and county, fee waiver order number, certified page count and word count, and the calculated amount owed at the statutory rate.

4. **CRB processes the claim.** Current processing timeline: approximately **8–10 weeks** from submission to payment.

5. **Reporter receives payment** from the TRF via check or direct deposit.

### Key Constraints

| Parameter | Value | Implication for Briscoe Sholes |
|---|---|---|
| **Per-case reimbursement cap** | $2,500 | Long transcripts in complex cases could exceed this. The reporter (or platform) absorbs the overage. |
| **Annual program funding** | ~$300,000 | The fund is small. At scale, Briscoe Sholes's fee-waiver volume could approach or exceed the fund's annual capacity. |
| **Processing time** | 8–10 weeks | The firm or SRL pays the reporter through the platform upfront, then files for TRF reimbursement and waits 8–10 weeks. The platform does not carry this float. |
| **Eligible proceedings** | Appeals and certain other proceedings where fee waiver is on file | Not all transcript requests qualify. The platform must verify eligibility at order entry. |
| **Payment goes to the reporter** | The reporter (not the ordering party) submits the claim | Under the platform's model, the firm pays the reporter upfront through the platform, then files for TRF reimbursement. The platform generates the application paperwork to simplify this. |

---

## Founder decision: no platform float on TRF orders

### Why the platform does not front payment

The original PRD design had the platform paying the reporter on delivery and then waiting 8-10 weeks for TRF reimbursement. The scenario modeling made the problem clear:

| Monthly fee-waiver orders | Avg. order value | Monthly cash committed | Outstanding float (at 10 weeks) |
|---|---|---|---|
| 10 | $800 | $8,000 | $20,000 |
| 25 | $800 | $20,000 | $50,000 |
| 50 | $800 | $40,000 | $100,000 |
| 100 | $800 | $80,000 | $200,000 |

At even modest volume, the platform would be carrying tens of thousands of dollars in float with no reserves to back it. The TRF's entire annual budget is only ~$300K. A pre-revenue startup cannot responsibly take on this exposure.

**The founders have decided: Briscoe Sholes will not carry TRF float at launch.**

### How TRF orders work on the platform (Option B)

The platform supports fee-waiver orders as a workflow, not a financing arrangement. Here is how it works:

1. The firm or SRL indicates that the case has a fee waiver on file.
2. The platform routes the order to a reporter through the normal matching process.
3. The firm or SRL pays the reporter through the platform at the statutory rate, the same as any other order. The reporter receives payment within 48 hours of delivery.
4. The platform generates the TRF reimbursement application paperwork (pre-filled with case details, reporter info, word count, and fee waiver order number) and provides it to the firm or SRL.
5. The firm or SRL submits the TRF application to the CRB and receives reimbursement directly.

The platform's value-add on TRF orders is the same as on any other order — simplified ordering, reporter matching, fast payment, status tracking — plus the additional benefit of generating the TRF paperwork automatically. The platform does not absorb the reimbursement timing risk.

### What this means for each party

**For the firm/SRL:** They pay upfront and file for reimbursement themselves, which is how TRF orders work today anyway. The difference is that the platform handles the ordering workflow and pre-fills the reimbursement application, saving time on both ends.

**For the reporter:** No change. The reporter gets paid through the platform within 48 hours of delivery, regardless of whether the order is TRF-eligible. The reporter does not file a TRF claim and does not carry the float.

**For the platform:** No cash flow exposure on TRF orders. The platform earns its standard fee on these orders (paid by the firm as part of the upfront payment). TRF volume is not a balance sheet risk.

### The fund exhaustion problem remains (but it's not our problem to solve)

The TRF has ~$300K in annual funding. If the platform makes transcript ordering easier for fee-waiver litigants and order volume increases, the fund could run dry faster. This is a real concern — but it's a policy problem for the Legislature and Judicial Council, not a cash flow problem for the platform. The platform can advocate for increased TRF funding as part of its access-to-justice positioning without putting its own capital at risk.

---

## Recommendations for Briscoe Sholes

### Pre-launch

1. **Build the TRF paperwork generator.** The platform should auto-generate the TRF reimbursement application with all required fields pre-filled from the order data. This is the concrete value the platform provides on fee-waiver orders beyond the standard ordering workflow.

2. **Verify TRF application requirements.** Confirm the current claim form fields, required attachments, and submission method with the CRB. The platform's generated application needs to match exactly what the CRB expects.

3. **Confirm per-case cap handling.** For orders that exceed the $2,500 TRF cap, the litigant or firm is responsible for the difference. The platform should flag this at order entry so there are no surprises. The platform cannot absorb overages.

4. **Define the fee-waiver verification step.** The platform needs to confirm that a valid fee waiver is on file before tagging an order as TRF-eligible. This could be a simple attestation from the ordering party (with the fee waiver order number), verified against court records if accessible.

### During beta

5. **Track TRF order volume and reimbursement outcomes.** Even though the platform isn't carrying the float, understanding how many orders are TRF-eligible and whether firms successfully obtain reimbursement is important data for the CRB and Judicial Council conversations.

6. **Explore partnership with CRB on TRF administration.** If the platform can streamline TRF claim submission — providing the CRB with structured, verified data instead of individual paper claims — it could reduce processing time and benefit both parties. This is a concrete offering for the CRB partnership conversation.

### Long-term

7. **Revisit platform-fronted TRF payments.** Once the platform has revenue, reserves, or outside capital, fronting reporter payment on TRF orders becomes feasible. This would be a meaningful competitive advantage and a strong access-to-justice differentiator. But it requires capital the founders don't have today.

8. **Advocate for TRF funding increase.** If Briscoe Sholes demonstrates that accessible transcript ordering drives fee-waiver volume, that's evidence the fund is underfunded. The platform can support legislative efforts to increase TRF appropriations.

---

## Key takeaways for the PRD

PRD Section 8.3 (Fee Waiver / Court-Paid Flow) should be updated to reflect the Option B approach:

- The platform supports TRF-eligible orders as a workflow feature, not a financing arrangement
- The firm or SRL pays the reporter through the platform upfront, then files for TRF reimbursement
- The platform generates the TRF application paperwork automatically
- The platform does not carry float or guarantee TRF reimbursement
- Per-case cap ($2,500) is flagged at order entry
- Revisiting platform-fronted TRF payments is a future milestone tied to available capital

---

*This memo is based on publicly available information about the TRF program. Specific procedural details should be confirmed with the Court Reporters Board before designing the fee-waiver flow.*
