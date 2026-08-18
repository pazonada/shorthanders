# California pilot firm targeting strategy

**Owner:** Aud & Rosie
**Last updated:** 2026-05-18 (TAM + launch sequence revised after strategy session)
**Status:** Living doc – now anchored on the Tier A pilot footprint defined in [`ca_court_recording_county_tiers.md`](ca_court_recording_county_tiers.md)

> **What changed 2026-05-18.** Previous version sized the market by attorney/firm count statewide and proposed a Phase 2 regional rollout across LA / Bay Area / San Diego / OC / Sacramento simultaneously. The strategy session that day reframed both:
> - **TAM is now expressed in court-hearing volume + dollar spend**, not just firm counts. ~$600M–$750M/year addressable.
> - **Launch is a Bay Area trio first (Santa Clara + Contra Costa + Alameda)**, not a parallel multi-metro push. Why: that's where ER orders and no-reporter status both exist, where Rosie's network is dense, and where one CSR can serve all three.
> - **Positioning is "open marketplace"**, not "statutory rates + 12% undercuts agency markup". CSRs set their own rates; the platform's pitch is workflow + managed services for direct-relationship attorneys, and cost savings + supply access for agency-switchers.
>
> The old statewide firm-count framing still has value for sizing year-2+ expansion, so it's preserved below as a reference floor – not as the pilot plan.

---

## Total addressable market in California

### Court-record TAM (replaces the old firm-count-driven sizing as the primary TAM)

These figures come from the 2026-05-18 strategy session and need independent verification before they go in any external doc. See [`ca_court_recording_county_tiers.md`](ca_court_recording_county_tiers.md#tam-restated-using-the-new-tiering) for the citation gap.

| Component | Estimate |
|---|---|
| CA hearing volume in family + probate + unlimited civil | ~1.8M hearings/year |
| Of which currently have a verbatim record (the live private-CSR market) | ~510K hearings/year |
| Gross spend on live coverage at ~$3,300/day average | ~$500M–$700M/year |
| Audio transcription market post-ER orders | ~$20M–$40M today, growing fast |
| **CA court-record TAM (live + audio combined)** | **~$600M–$750M/year, growing** |
| CA deposition market (out of v1 scope, comparison only) | ~$1B–$2B/year |

At our 12% attorney-only buyer fee and 5–10% market capture by year 2–3: implied revenue range of **~$3.6M–$9M ARR** at 5% capture, scaling to ~$7.2M–$18M at 10%. Venture-credible scale, intentionally narrower than the addressable opportunity because depos are explicitly out of v1 scope per `governance-and-process/scope_public_court_proceedings_only.md`.

### Firm-count breakdown (used for sizing year-2 expansion, not for pilot scoping)

| Segment | Est. firms | CSR usage | Priority |
|---------|-----------|-----------|----------|
| Small litigation firms (2-10 atty) | ~3,000 | Moderate-high | Primary target |
| Mid-size litigation firms (11-50 atty) | ~350 | High | Primary target |
| Solo litigators | ~16,000-20,000 | Low-moderate per firm, huge in aggregate | Secondary |
| Mid-large litigation firms (51-100 atty) | ~50 | Very high | Opportunistic |
| Large firms with lit departments (100+) | ~65 | Very high but entrenched agency relationships | Long-term |
| Government (DA, PD, AG offices) | ~200+ offices | High but procurement-constrained | Future |

**Primary addressable market: ~3,350 small-to-midsize litigation firms statewide.** Pilot focus is a small subset of these, concentrated in Tier A counties – see Phase 2 below.

Solo litigators are a massive secondary market (~16,000-20,000) but are harder to reach at scale and lower per-firm revenue. They're better acquired through word-of-mouth and organic search once the platform has traction.

### Why smaller firms are the sweet spot

- No existing agency contracts (or unhappy with current agency)
- Decision-maker is often the managing partner (short sales cycle)
- Personally feel the pain of finding reporters (no dedicated staff for it)
- More willing to try a new platform (less institutional inertia)
- Two-segment value prop depending on how they source today (per `project_attorney_channel_mix.md`):
  - **Agency-switchers:** Shorthanders at 12% is a discount vs. 30–50% agency markups
  - **Direct-relationship attorneys:** Shorthanders at 12% is a premium for the managed-platform layer (license re-verification, escrow billing, matter-ref invoicing, correction workflow, cloud storage)

---

## Tier 1 practice areas (highest CSR usage, best pilot targets)

### 1. Personal injury — plaintiff side
- **Why:** Deposition-heavy. Every case involves depositions of defendants, witnesses, medical experts, accident reconstruction experts. Multiple depositions per case.
- **Volume:** 5-20 transcript orders/month for an active firm
- **Firm profile:** 2-15 attorneys, contingency fee model, cost-conscious
- **CA market:** Estimated 1,500-2,000 PI plaintiff firms statewide
- **Key regions:** Los Angeles (largest concentration), San Francisco Bay Area, San Diego, Orange County, Sacramento, Inland Empire

### 2. Insurance defense
- **Why:** Mirror image of PI plaintiff. Same cases, other side. Very high deposition volume. Firms are cost-conscious because insurers squeeze their rates.
- **Volume:** 10-30+ transcript orders/month
- **Firm profile:** 5-50 attorneys, hourly billing to insurance carriers, very price-sensitive
- **CA market:** Estimated 300-500 firms statewide
- **Key insight:** These firms would love cheaper, faster transcript sourcing — but they may need carrier approval for vendor changes

### 3. Family law
- **Why:** Contested custody and high-asset divorces involve depositions, expert witnesses (custody evaluators, forensic accountants), and lots of court appearances needing transcripts.
- **Volume:** 3-10 transcript orders/month
- **Firm profile:** 2-10 attorneys, often boutique, strong referral networks
- **CA market:** Estimated 800-1,200 firms statewide
- **Key insight:** Rosie's strongest network. High emotional stakes = attorneys want reliable, fast reporters.

### 4. Employment law
- **Why:** Discrimination, wrongful termination, harassment, wage & hour cases. Deposition-heavy, especially in class actions.
- **Volume:** 5-15 transcript orders/month
- **Firm profile:** Plaintiff side is often small (2-10 atty); defense side overlaps with insurance defense
- **CA market:** Estimated 400-600 firms statewide (plaintiff + defense)
- **Key insight:** California's strong employment protections = higher litigation volume than most states

---

## Tier 2 practice areas (moderate CSR usage, good secondary targets)

### 5. Civil litigation / commercial disputes
- **Why:** Breach of contract, business torts, partnership disputes, construction defect. Steady deposition work.
- **Volume:** 3-10 transcript orders/month
- **Firm profile:** Wide range, 2-50+ attorneys
- **CA market:** Estimated 500-800 firms statewide
- **Key insight:** Overlaps heavily with other categories — many firms handle civil lit alongside a specialty

### 6. Medical malpractice
- **Why:** Complex, long depositions with expert witnesses. Fewer cases per firm but very high per-case transcript spend.
- **Volume:** 3-8 transcript orders/month, but longer transcripts (higher page count per order)
- **Firm profile:** Specialized boutiques, 3-15 attorneys
- **CA market:** Estimated 150-250 firms statewide
- **Key insight:** High-value customers. A single med mal deposition can be 200+ pages.

### 7. Criminal defense (private)
- **Why:** Less deposition work than civil, but heavy need for trial transcripts (especially for appeals). Constitutional right to a record on appeal.
- **Volume:** 2-5 transcript orders/month
- **Firm profile:** Solo to small firm (2-10 atty), often price-constrained
- **CA market:** Estimated 500-800 private criminal defense firms statewide (plus thousands of solos)
- **Key insight:** Lower per-firm revenue, but a large market. Many criminal defense attorneys are frustrated by slow court reporter turnaround.

---

## Tier 3 practice areas (occasional CSR usage)

| Practice area | Est. firms | Notes |
|---|---|---|
| Probate / trust litigation | 200-400 | Only contested matters need depositions |
| Real estate litigation | 200-300 | Construction defect overlaps with civil lit |
| Products liability | 50-100 | Often handled by larger firms |
| Bankruptcy litigation | 100-200 | Adversary proceedings only |
| Immigration (removal defense) | Limited | Mostly administrative hearings, not CSR-dependent |

---

## Pilot targeting: Tier A first, then sequential expansion

The launch sequence is driven by county tiering (see [`ca_court_recording_county_tiers.md`](ca_court_recording_county_tiers.md)). We don't try to win the whole state in parallel; we lock down the Bay Area trio first, then ladder out.

### Phase 1: Warm network in Tier A (Month 1-2)
**Source:** Rosie's professional contacts, CSR shortage action group, referrals from onboarded reporters in **Santa Clara, Contra Costa, and Alameda**.

| Target | Action | Owner |
|--------|--------|-------|
| Rosie's direct attorney contacts in the Bay Area | Personal outreach, demo of prototype | Rosie |
| Firms that work with reporters in Rosie's Bay Area network | Warm intro from reporter → firm | Rosie + Aud |
| CSR shortage action group contacts (Bay Area subset) | Ask reporters which Bay Area firms they regularly work with | Rosie |

**Goal:** 3-5 firms actively using the platform, all in Tier A counties.

### Phase 2: Tier A pilot saturation (Month 2-4)
**Strategy:** Win Santa Clara + Contra Costa + Alameda together. Geographic proximity means one CSR can serve all three, which is the cold-start supply-liquidity unlock.

| County | Est. litigation firms (rough) | Active CSRs (from CRB data, regional) | Pilot priority |
|---|---|---|---|
| Santa Clara | ~250-300 | included in ~618 Bay Area total | **Tier A – live + audio active** |
| Contra Costa | ~150-200 | included in ~618 Bay Area total | **Tier A – live + audio active** |
| Alameda | ~250-300 | included in ~618 Bay Area total | **Tier A – live + audio active** (pending Alameda order citation) |

**Pilot success metric (proposed):**
- 50 confirmed bookings across 20+ distinct law firms in 90 days
- < 48 hours average time-to-CSR-match

If we hit those numbers in the Bay Area, the LA expansion case writes itself.

**Outreach channels for Tier A:**
- Family law and probate bar associations in Santa Clara, Contra Costa, Alameda
- The Bay Area Legal Aid network (they're a co-plaintiff in the FVAP / ER lawsuit and care about this problem)
- Reporter referrals from the launch-cohort CSRs ("which firms do you work with?")
- LinkedIn outreach to managing partners at 2-20 attorney litigation firms in the three counties
- Local court self-help centers (for SRL channel)

### Phase 3: Tier B expansion (Month 4-6)
Tier B counties (no-reporter status, but no expanded ER): **San Diego, Sacramento, San Bernardino, Santa Barbara, Kings, Solano, Fresno, Del Norte**. Sell the live-attendance SKU; audio-transcription is constrained to § 69957 minor matters until each county issues its own order or statewide legislation moves.

| Metro / county | Est. litigation firms | Active CSRs (from CRB data) | Pilot priority |
|---|---|---|---|
| San Diego | ~300-400 | ~350 | **Tier B – live only** |
| Sacramento | ~200-300 | ~250 | **Tier B – live only** |
| Riverside / San Bernardino (IE) | ~150-200 | ~150 | **Tier B – live only** (San Bernardino) |
| Santa Barbara | ~50-100 | ~50-80 | **Tier B – live only** |
| Solano, Kings, Fresno, Del Norte | low individual counts; meaningful in aggregate | varies | **Tier B – live only** |

**Goal:** 15-25 firms across Tier A + Tier B combined by end of Month 6.

### Phase 4: Los Angeles (Month 6+)
**Why LA waits, even though it's the largest TAM:**
- 75+ family courtrooms across multiple courthouses – operationally heavy
- Fragmented attorney community
- Entrenched depo vendors who will react the moment they see traction
- Active CSR union hostility to ER; we don't want our first 100 bookings to happen in a political-war market
- LA is Tier A on case-type coverage and we *will* sell there – just not first

Approach LA from a position of demonstrated demand built in the Bay Area. The pitch becomes "here's what we've delivered across three Bay Area counties; here's what we'd do for LA family-law practitioners."

### Phase 5: Tier C + statewide scale (Year 2)
Tier C counties (Orange, Riverside, SF, plus the long tail) still have court-provided reporters in our target case types. Demand here is workflow-driven (billing reconciliation, paneling, transcript correction handling), not access-driven. The pitch differs and the conversion cycle is longer.

- Add legal conference presence (CAALA annual convention, CA State Bar conference)
- Launch referral incentive for existing firms
- Target solo litigators through search/content marketing
- Re-verify Orange + Riverside + SF coverage status before each push

**Goal:** 50+ firms statewide by end of Year 1; Tier C expansion in Year 2.

---

## Ideal pilot firm profile

| Attribute | Target |
|-----------|--------|
| Size | 2-20 attorneys |
| Practice area | PI, family law, employment, insurance defense, civil lit |
| Location | Any CA metro area |
| Current CSR sourcing | Word of mouth, outdated agency, or struggling to find reporters |
| Decision-maker access | Managing partner or office manager reachable |
| Monthly transcript volume | 3+ orders/month |
| Tech comfort | Uses email, can upload files, not paper-only |

---

## Insurance carrier channel (top-down sales)

Per Rosie (4/11): ~70% of attorneys functionally work for insurance companies. Carriers pay for the defense, audit every line item, and pressure firms to keep costs down. The firm has to submit estimated budgets and negotiate back and forth about what it will cost to defend the suit. Carriers have entire systems to audit and benchmark what firms typically spend on specific tasks.

### Why this matters for Shorthanders

- **One carrier relationship could unlock dozens/hundreds of panel firms.** Carriers maintain approved vendor lists and panel firm guidelines.
- **The platform naturally generates the cost data carriers want:** spend per matter, cost by case type, turnaround metrics, statutory rate compliance.
- **Transparent pricing is our pitch:** open marketplace where CSRs set their rates + flat 12% attorney-side fee vs. opaque agency markups. Easy for carriers to verify spend per matter against their internal benchmarks.
- **Rosie's insight:** "If our system saves money, maybe the carriers can pressure their firms to use us."

### How to approach

| Phase | Action | Priority |
|-------|--------|----------|
| Pilot | Build cost-savings data from early adopter firms. Create a one-pager a defense firm could forward to their carrier contact. | Medium |
| Post-pilot | Target carrier litigation cost management departments directly. Show anonymized benchmark data. | High |
| Scale | Offer carrier-specific reporting dashboards (spend by panel firm, by case type, vs. industry benchmarks). | High |

### Key carriers in CA (by market share)

Target the largest writers of commercial/auto/general liability in CA — these drive the most defense litigation spend. Research specific contacts in their litigation management or vendor management departments.

### Risk

Carrier sales cycles are long and enterprise-y. This is a Phase 2-3 play, not a pilot target. But worth planting seeds early.

---

## What to ask Rosie

1. Which of her contacts are at **firms** (not solo) in the target practice areas?
2. Can she get intros through the **CSR shortage action group** to firms that reporters already work with?
3. Does she have any connections to **CAALA** or local family law bars for broader outreach?
4. Any firms she knows that are **actively frustrated** with current reporter sourcing?
5. Does Rosie have any contacts at **insurance carriers** (litigation management / vendor management departments)?

---

## Sources

- [State Bar of California — Bar Brief 3: Where Do California Attorneys Work?](https://www.calbar.ca.gov/Portals/0/documents/BarBrief/Bar-Brief-3.pdf) — firm size and employment pattern data
- [State Bar demographics](https://apps.calbar.ca.gov/members/demographics.aspx) — 190,000 active CA attorneys
- CRB database pull (completed t33) — 4,733 active CA CSRs, regional distribution
- [IBISWorld — Law Firms in California](https://www.ibisworld.com/united-states/industry/california/law-firms/11151/) — ~59,000 law firm businesses in CA
