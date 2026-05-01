# Briscoe Sholes — Non-Dev Task List (Reprioritized)
*Updated March 13, 2026 — based on PRD v1.2 and initial research*

---

## What's Changed Since the Last List

Several things shifted based on the updated PRD and initial research I just ran:

1. **AB 5 is largely a non-issue for licensed CSRs.** AB 3136 (2019) explicitly exempts CSRs from the ABC test — they're evaluated under the older, more flexible Borello test instead. This is great news for the gig marketplace model. Still needs a lawyer to sign off, but the legal landscape is much friendlier than feared.

2. **AB 1189 is dead.** The bill that would have created "certified digital reporter" and "legal transcriptionist" license categories failed in the 2025-2026 session (hearing canceled at author's request). The PRD references it as active legislation — that needs updating. Platform architecture should still anticipate future versions, but there's no near-term tailwind from this bill.

3. **The TRF has a $2,500/case cap and 8-10 week processing time.** Founder decision: the platform will NOT carry TRF float. Fee-waiver orders are paid by the firm/SRL upfront through the platform, and the platform generates the TRF reimbursement application paperwork. The firm/SRL files for reimbursement directly. Annual program funding is only $300K.

4. **SB 478 (California's hidden fee law) affects how the platform fee is displayed.** You can't advertise the statutory transcript rate and then add the platform fee at checkout. Total price must be disclosed upfront. This has UX and pricing display implications.

5. **The folio multiplier problem is real.** CA counties use different multipliers (2.5–3.5 folios per page) to estimate words, creating up to 40% cost variation for identical work. The Judicial Council flagged this as needing legislative fix. The platform's pricing engine needs to account for this.

6. **State expansion tiers are now defined** — Tier 1 is NY, TX, IL, FL (CO dropped). The jurisdiction matrix research should follow this order.

---

## Reprioritized Task List

### TIER 1 — Launch Blockers (must complete before MVP launch)

These feed directly into decisions or partnerships that gate launch readiness.

| # | Task | Status | Can I Do It? | Notes |
|---|------|--------|-------------|-------|
| 1 | **AB 5 / IC classification research memo** | RESEARCH COMPLETE — memo in progress | Yes, fully | AB 3136 exempts CSRs. Borello test applies. Memo documents the analysis for a lawyer to review and sign off. |
| 2 | **CA Transcript Reimbursement Fund research memo** | RESEARCH COMPLETE — memo in progress | Yes, fully | $2,500/case cap, 8-10 week processing, $300K annual funding. Cash flow model needed. |
| 3 | **Platform fee financial model** | Not started | Yes (skeleton + assumptions) | Statutory rates are fixed ($1.13/100 words). Platform fee is the only lever. Need to model: fee %, reporter payout, volume scenarios. No TRF float (founder decision). Needs real volume assumptions from Rosie. |
| 4 | **Rate regulation & pricing engine research memo** | RESEARCH COMPLETE — memo in progress | Yes, fully | Folio multiplier problem, SB 478 compliance, MTFS format standards. Feeds directly into pricing UX. |
| 5 | **Data security & privacy requirements checklist** | Not started | Yes, solid first draft | SOC 2 baseline + BigLaw vendor approval requirements + CA Rule 1.6 confidentiality for attorney-client audio. This is a gate for firm beta recruitment. |
| 6 | **Legal entity structure tradeoffs memo** | Not started | Yes (tradeoffs); No (decision) | Marketplace LLC vs. C-Corp, state of incorporation, insurance requirements. Founders + lawyer decide. |
| 7 | **Platform liability memo — transcript challenges** | Not started | Yes (thorough first draft) | What happens if a certified transcript is challenged? Analogous cases, risk landscape. Lawyer signs. |
| 8 | **CA CRB partnership briefing doc** | Not started | Yes, fully | Prep document for the CRB conversation: what you're asking for (API access to licensee data, TRF coordination), what you're offering (platform that helps solve the crisis they're documenting). |
| 9 | **Judicial Council briefing doc** | Not started | Yes, fully | Similar prep doc. Focus: fee waiver flow, electronic recording integration, access-to-justice framing. |

### TIER 2 — Pre-Launch Preparation (complete before or during beta)

| # | Task | Status | Can I Do It? | Notes |
|---|------|--------|-------------|-------|
| 10 | **Attorney survey — staff time costs on transcript chasing** | Not started | Yes, draft survey | PRD recommends this before setting platform fee. Survey design + analysis framework. Rosie distributes. |
| 11 | **CSR discovery interview guide** | Not started | Yes, fully | For reporter outreach: what's their current workflow, pain points, what would make them use a marketplace. |
| 12 | **Beta tester recruitment pitch for law firms** | Not started | Yes, fully | One-pager + email template. Needs data security checklist (item 5) to be credible. |
| 13 | **Reporter outreach materials** | Not started | Yes (write); No (send) | Recruitment pitch, FAQ, onboarding guide for CSRs. Someone has to actually send it. |
| 14 | **Late delivery penalty policy** | Not started | Yes (model options + draft language) | Needs validation against real reporter economics. PRD says this is the most common real-world problem. |
| 15 | **MOU template for CA CRB partnership** | Not started | Yes, solid first draft | Framework for API access, TRF coordination, license verification data sharing. |
| 16 | **State bar rules memo — attorney-client audio handling** | RESEARCH COMPLETE — memo in progress | Yes, fully | CA Rule 1.6 applies. Attorney remains responsible for confidentiality even with third-party vendors. Platform needs contractual safeguards. |
| 17 | **Stakeholder messaging framework** | Not started | Yes, fully | NEW — PRD section 11.5 identifies labor unions, access-to-justice orgs, and court admin as key stakeholders. Need proactive messaging before launch. |

### TIER 3 — Post-Launch / Expansion Prep

| # | Task | Status | Can I Do It? | Notes |
|---|------|--------|-------------|-------|
| 18 | **Jurisdiction matrix — Tier 1 expansion states (NY, TX, IL, FL)** | Not started | Yes, fully | Electronic recording rules, CSR requirements, licensing boards, rate structures. CA county doc is done; now do the same for expansion states. |
| 19 | **Dispute resolution process research per jurisdiction** | Not started | Yes, fully | Court rules for transcript correction in CA + expansion states. |
| 20 | **CCRA relationship prep** | Not started | Yes (briefing doc); No (meeting) | California Court Reporters Association — potential ally or opponent depending on framing. |
| 21 | **Legal aid org partnership materials** | Not started | Yes, fully | Pitch to access-to-justice nonprofits. SRL features + fee waiver routing are the hook. |
| 22 | **Certifications/registrations research for CA marketplace operation** | Not started | Yes, mostly | Does Briscoe Sholes need any specific state registrations to operate? Business license, marketplace regulations, etc. |

---

## Updated "What I Can vs. Can't Do" Summary

**I can produce right now (fully autonomous):** Items 1, 2, 3 (skeleton), 4, 5, 8, 9, 10, 11, 12, 13, 14 (draft), 15, 16, 17, 18, 19, 20, 21, 22

**I can draft but a human must finalize:** Items 3 (needs real volume data), 6 (founders + lawyer decide), 7 (lawyer signs), 14 (reporter economics validation)

**Requires a human entirely:** CRB/Judicial Council/CCRA meetings, legal entity decisions, reporter supply seeding execution, beta firm recruitment calls, anything requiring a signature with professional liability

---

## Recommended Execution Order (What I'll Start Now)

**Batch 1 — Immediate (these have research already done):**
1. AB 5 / IC classification research memo
2. CA TRF research memo (with cash flow implications)
3. Rate regulation & pricing memo (including SB 478 and folio multiplier issue)
4. State bar / confidentiality memo

**Batch 2 — Next session:**
5. Financial model skeleton (platform fee scenarios)
6. Data security & privacy checklist
7. Attorney survey draft
8. CSR interview guide

**Batch 3 — Following session:**
9. CRB briefing doc
10. Judicial Council briefing doc
11. Stakeholder messaging framework
12. Beta recruitment pitch + reporter outreach materials

---

## PRD Updates Needed

Based on research, these items in the PRD should be flagged for Rosie:

- **AB 1189 reference:** Bill failed. Remove "active CA legislation" framing; replace with note about legislative intent and likelihood of future attempts.
- **TRF flow:** Updated to Option B. Platform does not carry float. Firm/SRL pays upfront, platform generates TRF reimbursement paperwork. PRD section 8.3 updated with tracked changes.
- **SB 478 pricing display:** Platform fee must be included in the price shown to buyer at order entry. Can't show statutory rate then add fee at checkout.
- **Folio multiplier variation:** PRD uses ~325 words/page as conversion. Actual county practice varies 250-350 words/page. Pricing engine needs county-level multiplier data.
- **State expansion list:** PRD says CO was "considered for Tier 1 but excluded." Research should confirm the Tier 1 list (NY, TX, IL, FL) before building compliance configs.
