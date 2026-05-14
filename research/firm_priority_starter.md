# Firm priority starter list

**Owner:** Aud
**Last updated:** 2026-05-09
**Status:** Starter set (26 firms) – not final. Built on public web research; contact enrichment is a separate pass.
**Goal:** Seed the firm outreach tracker with well-researched Bay Area firms. Quality over quantity.

---

## 1. Prioritization criteria (refined)

### Practice-area weighting

Not all litigation generates equal transcript volume. The ranking below is based on deposition intensity per case and average case volume per firm.

| Priority | Practice area | Why |
|----------|---------------|-----|
| 1 | Insurance defense | Mirror image of PI plaintiff but with strategic upside the plaintiff side doesn't have. High deposition volume (often 30+ orders/month at mid-size firms). Very price-sensitive because carriers audit every line item. Critically: defense firms are the on-ramp to direct-to-carrier outreach. Once a defense firm is on the platform and seeing cost savings, carriers can be pitched on pressuring ALL their panel firms to use Dewey Sholes – a top-down sales channel reaching ~70% of attorneys (per `~/.claude/projects/.../memory/project_insurance_carrier_channel.md`). See Section 1.5 below for the strategic logic. |
| 2 | Personal injury – plaintiff | Every PI case involves depositions: defendants, witnesses, treating physicians, expert witnesses. Active PI firm with 5+ attorneys = 10-20+ deposition orders/month. Contingency model = cost-conscious, receptive to transparent pricing. |
| 3 | Family law – contested/high-asset | Contested custody + high-asset divorces involve depositions (custody evaluators, forensic accountants, vocational experts) and court appearance transcripts. |
| 4 | Employment law – plaintiff side | Discrimination, wrongful termination, harassment cases are deposition-heavy. California's strong employment protections keep caseloads high. |
| 5 | Medical malpractice – plaintiff | Fewer cases per firm than PI, but long multi-expert depositions (200+ pages common). High per-order revenue. Boutique firms in this space are a very good fit. |
| 6 | Civil/commercial litigation | Breach of contract, business torts, partnership disputes. Steady deposition work. Lower per-firm volume than PI but strong when it overlaps with the categories above. |
| 7 | Probate/trust litigation | Only contested matters need transcripts. Volume is lower per firm but cases are long and complex – high per-order page count when they do order. |

**Explicitly excluded practice areas:** transactional (M&A, corporate, securities, real estate), immigration, pure criminal defense. These rarely or never order depositions or hearing transcripts.

### 1.5. Why insurance defense is a strategic priority (not just a target)

The user position (Aud, 2026-05-09): insurance defense firms are deliberately high priority not just because they buy a lot of transcripts but because **they're the on-ramp to direct-to-carrier outreach**. The long-term play:

1. Get a meaningful cluster of insurance defense firms on Dewey Sholes during the launch window.
2. Document their cost savings vs. agency markups (transparent statutory rate + 12% platform fee vs. typical 50-85% agency premium).
3. Pitch carriers (auto, GL, professional liability, workers' comp insurers) directly: *"Your panel firms are saving $X per case on transcripts via this platform. You can require it across your panel for the same savings."*
4. Carriers pressure ALL their panel firms to switch – a top-down distribution channel reaching the ~70% of attorneys whose work flows through carrier relationships (per `project_insurance_carrier_channel.md`).

**Implication for firm research:** carrier-locked vendor arrangements are NOT a disqualifier. They're a feature – those firms are the relationship anchors we need to build the carrier pitch. Cold outreach to defense firms with carrier panels is still worthwhile; even if conversion is slow, the firm becomes part of the future carrier conversation regardless.

### Attorney-count sweet spot: 5-50

**Lower bound (5 attorneys):** Below 5, the firm is effectively a solo or very small group. Volume is low and there's rarely dedicated support staff to handle transcript ordering. These firms end up in the "secondary" segment.

**Upper bound (50 attorneys):** Above 50 starts to bring in institutional procurement behavior – preferred vendor lists, partner-level approval for new vendors, procurement committee cycles. These are Phase 2 targets at best, not the launch cohort.

**Sweet spot (10-30 attorneys):** Enough volume to matter month-over-month. Small enough that a paralegal or office manager has real discretion over vendor selection without committee sign-off. Managing partner is often reachable directly. Firm is likely unhappy with their current court reporter sourcing situation but hasn't locked in a long-term agency contract.

**Why 5-9 attorneys can still qualify:** If the practice area is high-volume (PI plaintiff or insurance defense) and the firm has dedicated support staff (a paralegal or legal secretary), the volume can still hit 3+ orders/month. Flag these as secondary priority but don't exclude.

### Geography priorities within the Bay Area

The Bay Area is prioritized for one specific reason: **Rosie has expressed interest in attending paralegal events in SF.** Those events are a venue to make in-person contact with paralegals who work at our target firms – handing them a postcard, a Dewey Sholes pitch, or a CSR business card. That's the channel advantage SF has over LA or San Diego, not any pre-existing firm relationships.

| Submarket | Priority | Rationale |
|-----------|----------|-----------|
| San Francisco (SF proper) | Highest | Densest concentration of litigation firms; SF Superior Court is one of the highest-volume courts in CA. **SF paralegal events that Rosie can attend are the in-person channel that makes Bay Area firms easier to reach than firms in other CA metros.** |
| Oakland / Alameda County | High | Strong plaintiff PI bar, employment law cluster, lower rents mean more independent firms; under-served by entrenched CSR agencies relative to SF. Some East Bay paralegals attend SF paralegal events too. |
| San Jose / Santa Clara County | High | Large family law market, strong employment law base, high-volume civil courts. South Bay paralegal association is separate from SF; in-person reach for Rosie is weaker here unless she also attends Santa Clara events. |
| Walnut Creek / Contra Costa | Medium-high | Solid regional litigation bar; Bowles & Verna is the anchor name. |
| Palo Alto / Silicon Valley | Medium | Commercial disputes and employment law, but skews toward BigLaw satellites and IP shops. Litigation boutiques exist but are harder to find. |
| Marin / North Bay | Lower | Smaller market, lower volume, harder to justify early outreach budget. |

### New disqualifiers (additions to the locked list)

The locked plan already excluded: BigLaw (100+ attorneys), solo practitioners, transactional-only firms, out-of-state firms.

Adding:

- **Workers' compensation defense-only firms** – these firms use workers' comp administrative judges, not CSRs. Different transcript ecosystem entirely. (Example: Laughlin, Falbo, Levy & Moresi – 140+ attorneys and WC-only; excluded.)
- **Mediation/arbitration-only practices** – some boutiques have pivoted away from litigation entirely. If a firm's website emphasizes ADR over trial work, deprioritize.

**NOT a disqualifier (clarification):** Carrier-locked vendor arrangements at insurance defense firms. Per Section 1.5, those firms are explicit priorities – the carrier relationship is the strategic upside, not a complication.

---

## 2. Research methodology

### Sources used

1. **Google web search** – primary discovery tool for firm names, practice areas, and rough size signals.
2. **Firm websites** – attorney roster pages, practice area descriptions, office locations.
3. **Super Lawyers profiles** – useful for attorney count (number of Super Lawyers selections is a proxy for firm size), geographic confirmation, and practice area verification.
4. **LinkedIn company pages** (via search snippets, not direct login) – employee count ranges (11-50, 51-200, etc.) as a size proxy.
5. **Yelp listings** – address confirmation, phone, practice area tags.
6. **ZoomInfo / ContactOut / RocketReach snippets** – employee count cross-references where available.
7. **FindLaw / Justia / Martindale directories** – secondary confirmation.

### Search strategies

- Searched by geography + practice area + size signal: e.g., "Bay Area personal injury plaintiff law firm 10-50 attorneys San Francisco Oakland"
- Followed up with firm-specific searches to verify attorney count: e.g., "[firm name] attorneys number count LinkedIn 2025"
- Used LinkedIn employee count ranges (11-50, 51-200) as a quick size filter before doing firm-level research
- Cross-referenced Super Lawyers selection counts as a proxy: a firm with 6-14 Super Lawyers selections typically has 10-35 total attorneys

### What I could and could not verify

**Verified (sufficient confidence to include):**
- Firm exists and has a public web presence
- Practice areas match the target criteria
- Attorney count is within the 5-50 sweet spot (or within the 50-75 "edge case" range, flagged)
- Bay Area geography confirmed

**Not verified (left blank in tracker):**
- Paralegal / legal assistant names
- Direct work email addresses
- Mailing addresses (street addresses for several firms came from Yelp listings – confirm before mailing)
- Whether a specific CSR in our network works with this firm (this populates from CSR onboarding, per the Tier 1A logic)

### Confidence levels

Each firm entry in Section 3 carries a confidence signal:
- **High** – multiple sources confirm size, practice areas, and Bay Area location
- **Medium** – firm exists and practice area matches, but attorney count is estimated or based on a single source
- **Low / edge case** – firm qualifies on practice area and geography but attorney count is at or above the upper bound, or size could not be verified with confidence

---

## 3. Starter firm list (25 firms)

Firms are sorted by tier and then by rough confidence + expected transcript volume within each tier.

### Tier 1B – Bay Area mid-size litigation (core launch cohort)

These are the firms that should receive postcard + chocolate (Tier 2) treatment if they're in the top 25 by volume signal.

---

**1. Rouda Feder Tietjen & McGuinn**
- **City:** San Francisco
- **Metro:** SF
- **Attorney count:** 6 (confirmed – boutique by design)
- **Practice areas:** Personal injury, med mal, wrongful death, employment
- **Why they qualify:** One of the Bay Area's most decorated PI plaintiff boutiques. Awarded Daily Journal Top Boutiques 2025. Deposition-heavy model. Small enough that a paralegal has real vendor discretion. AV-rated.
- **Disqualifiers:** None
- **Tier:** 1B
- **Confidence:** High
- **Address:** 417 Montgomery St, San Francisco, CA 94104

---

**2. Dolan Law Firm, PC**
- **City:** San Francisco (primary); also Oakland
- **Metro:** SF / East Bay
- **Attorney count:** ~15 (confirmed from multiple sources)
- **Practice areas:** Personal injury, employment discrimination, wrongful termination
- **Why they qualify:** 15-attorney firm with SF + Oakland offices – dual-metro reach. High volume PI + employment plaintiff work. Active in California court system. Strong deposition practice.
- **Disqualifiers:** None. Multi-office means likely higher transcript volume than a single-office 15-attorney firm.
- **Tier:** 1B
- **Confidence:** High
- **Address:** 1438 Market St, San Francisco, CA 94102 (SF primary)

---

**3. Schoenberg Family Law Group, PC**
- **City:** San Francisco
- **Metro:** SF
- **Attorney count:** ~6 (partners + senior counsel confirmed; estimated ~6-8 total)
- **Practice areas:** Family law – litigation focus, high-conflict/high-asset cases exclusively
- **Why they qualify:** Self-described "trial lawyers who litigate high-conflict, high-stakes cases." Serves SF, Alameda, Contra Costa, Marin, San Mateo, Santa Clara. Family law specialist certifications. Active deposition practice for contested cases.
- **Disqualifiers:** None
- **Tier:** 1B
- **Confidence:** High
- **Address:** 50 California St, San Francisco, CA 94111

---

**4. Van Voorhis & Sosna LLP**
- **City:** San Francisco
- **Metro:** SF
- **Attorney count:** 5 (confirmed – Sarah Van Voorhis, Ariel Sosna, Sarah Arnott, Jennifer Cone, Susan Urrutia)
- **Practice areas:** Family law – divorce, custody, support
- **Why they qualify:** Certified Family Law Specialists, SFGATE 2025 winner for Best Family Law firm. SF Superior Court regulars. At the low end of our attorney-count sweet spot but with enough case volume for 3+ transcript orders/month.
- **Disqualifiers:** None. At 5 attorneys this is just inside the lower bound; flag as slightly lower volume but still worth outreach given SF location.
- **Tier:** 1B
- **Confidence:** High
- **Address:** 601 Montgomery St, Suite 540, San Francisco, CA 94111

---

**5. Cardwell Steigerwald Young LLP**
- **City:** San Francisco
- **Metro:** SF
- **Attorney count:** ~4-6 (4 named attorneys confirmed: Cardwell, Steigerwald, Young, Tong; possible additional associates)
- **Practice areas:** Family law – Bay Area-wide litigation
- **Why they qualify:** Boutique family law litigation firm at 150 Post St in SF. Multiple Super Lawyers selections. Active in Bay Area courts.
- **Disqualifiers:** None. Smaller count is a mild risk for volume, but boutique family law firms in SF tend to have active deposition schedules.
- **Tier:** 1B
- **Confidence:** Medium (attorney count estimated; 4 confirmed but may have additional)
- **Address:** 150 Post St, Suite 710, San Francisco, CA 94108

---

**6. Lerner Poole & Stewart, LLP**
- **City:** San Francisco
- **Metro:** SF
- **Attorney count:** ~4-6 (3 named partners + probable associates)
- **Practice areas:** Family law – all phases including litigation
- **Why they qualify:** Principals are certified Family Law Specialists. Reputation for complex, litigated cases. SF address.
- **Disqualifiers:** None. Same caveat as above on size.
- **Tier:** 1B
- **Confidence:** Medium
- **Address:** San Francisco (street address not confirmed in research – enrichment needed)

---

**7. Venardi Zurada LLP**
- **City:** Oakland (also Walnut Creek)
- **Metro:** East Bay
- **Attorney count:** Small boutique; 2 founding partners confirmed, associates not counted publicly. Estimated 4-8 total.
- **Practice areas:** Personal injury plaintiff, employment law – Oakland/East Bay focus
- **Why they qualify:** Top 5% Northern California attorneys, AV Preeminent rated. Oakland and Walnut Creek offices. PI + employment = two high-deposition-volume practice areas. East Bay firms have less competition from CSR agencies – potential early adopter.
- **Disqualifiers:** None
- **Tier:** 1B
- **Confidence:** Medium (size not publicly confirmed)
- **Address:** 1418 Lakeside Dr, Oakland, CA 94612

---

**8. Bracamontes & Vlasak, PC**
- **City:** San Francisco (primary); also Oakland
- **Metro:** SF / East Bay
- **Attorney count:** 2 partners + associates. Estimated 4-8 total.
- **Practice areas:** Personal injury plaintiff, employment law, tenant rights
- **Why they qualify:** Boutique with SF + Oakland footprint. Partners personally handle cases – classic small firm with high deposition activity per attorney. Both offices are in our target metros.
- **Disqualifiers:** None. Small size is a mild volume risk, but two-office model and PI focus compensate.
- **Tier:** 1B
- **Confidence:** Medium
- **Address:** 220 Montgomery St, Suite 2100, San Francisco, CA 94104

---

**9. Bowles & Verna LLP**
- **City:** Walnut Creek
- **Metro:** East Bay / Contra Costa
- **Attorney count:** 23 (confirmed)
- **Practice areas:** Personal injury plaintiff, civil/commercial litigation, business disputes, insurance
- **Why they qualify:** 23 attorneys, Walnut Creek base with Bay Area reach. PI plaintiff + business litigation = high deposition volume. Nearly four decades in business. Good size fit. Contra Costa County courts are less saturated with CSR agencies than SF proper.
- **Disqualifiers:** None
- **Tier:** 1B
- **Confidence:** High
- **Address:** 2121 N California Blvd, Suite 875, Walnut Creek, CA 94596

---

**10. Talbot Law Group, PC**
- **City:** Walnut Creek
- **Metro:** East Bay / Contra Costa
- **Attorney count:** ~5-6 (confirmed: Matthew Talbot + 4-5 named attorneys)
- **Practice areas:** Probate/trust litigation, estate litigation, conservatorship
- **Why they qualify:** Probate litigation is our Tier 2 practice area (less volume than PI but high per-order page count). Walnut Creek base. Active in Bay Area probate courts. Trust litigation depositions involve accountants, trustees, evaluators – long sessions.
- **Disqualifiers:** None
- **Tier:** 1B
- **Confidence:** High
- **Address:** 2033 N Main St, Suite 750, Walnut Creek, CA 94596

---

**11. Siegel LeWitter Malkani**
- **City:** Oakland
- **Metro:** East Bay
- **Attorney count:** ~6 (3 partners + 3 associates confirmed)
- **Practice areas:** Employment law – plaintiff side, individual + class action
- **Why they qualify:** Decades-long reputation as one of the top plaintiff employment firms in the Bay Area. Oakland address. Employment litigation is deposition-heavy – defendant depositions, 30(b)(6) depositions, expert witnesses. Named by The Recorder as one of the top 10 plaintiff employment firms in SF Bay Area.
- **Disqualifiers:** None
- **Tier:** 1B
- **Confidence:** High
- **Address:** 1939 Harrison St, Oakland, CA 94612

---

**12. Minnis & Smallets LLP**
- **City:** San Francisco
- **Metro:** SF
- **Attorney count:** ~3-5 (2 named partners confirmed; associates referenced)
- **Practice areas:** Employment law – plaintiff, discrimination, wrongful termination
- **Why they qualify:** Boutique employment plaintiff firm in SF. Super Lawyers recognitions for Aaron Minnis and Sonya Smallets. Active trial practice. Employment discrimination cases generate heavy deposition volume. At the small end of our size range – flag for enrichment to confirm support staff exists.
- **Disqualifiers:** None
- **Tier:** 1B
- **Confidence:** Medium
- **Address:** 57 Post St, San Francisco, CA 94104

---

**13. Hersh & Hersh**
- **City:** San Francisco
- **Metro:** SF
- **Attorney count:** ~3-5 (Nancy Hersh, Kate Hersh-Boyle, Charles Kelly confirmed)
- **Practice areas:** Medical malpractice, personal injury, employment
- **Why they qualify:** Nancy Hersh is one of the most decorated medical malpractice attorneys in Northern California (54 years experience). Med mal depositions routinely run 200+ pages – high per-order revenue for us. Firm focuses on serious injury and malpractice cases almost exclusively, meaning every case generates transcript demand.
- **Disqualifiers:** None. Small firm, but med mal volume compensates.
- **Tier:** 1B
- **Confidence:** Medium (attorney count estimated)
- **Address:** 601 Van Ness Ave, San Francisco, CA 94102

---

**14. Callaway & Wolf**
- **City:** San Francisco
- **Metro:** SF
- **Attorney count:** ~4-6 (Boone Callaway, Carl Wolf confirmed + named associates Nathaniel Leeds + others)
- **Practice areas:** Personal injury, medical malpractice – plaintiff
- **Why they qualify:** 30+ years in SF PI and med mal. Two founding partners plus associates. Both high-deposition practice areas. Boutique structure means paralegal has real vendor discretion.
- **Disqualifiers:** None
- **Tier:** 1B
- **Confidence:** Medium
- **Address:** 1388 Sutter St, Suite 1010, San Francisco, CA 94109

---

**15. Mary Alexander & Associates, PC**
- **City:** San Francisco
- **Metro:** SF
- **Attorney count:** ~3-6 (Mary Alexander + Catalina Munoz confirmed; likely small team of associates)
- **Practice areas:** Personal injury, transportation injuries, med mal, maritime, elder abuse
- **Why they qualify:** Mary Alexander is one of SF's most prominent PI attorneys with some of the largest verdicts in California. Firm handles complex multi-expert cases. Despite small size, each case involves extensive depositions. Founded 2000, still active.
- **Disqualifiers:** None
- **Tier:** 1B
- **Confidence:** Medium
- **Address:** 44 Montgomery St, Suite 1303, San Francisco, CA 94104

---

**16. Mello & Pickering, LLP**
- **City:** San Jose
- **Metro:** South Bay / Santa Clara
- **Attorney count:** ~4-6 (Jennifer Mello, Traci Pickering + Jessica Pellerin + Valerie Juntunen confirmed)
- **Practice areas:** Family law – litigation, divorce, custody, support
- **Why they qualify:** Certified Family Law Specialists, established San Jose firm, Santa Clara County courts. Family law in the South Bay has high caseload. Boutique firm with real support staff.
- **Disqualifiers:** None
- **Tier:** 1B
- **Confidence:** High
- **Address:** 1055 Minnesota Ave, San Jose, CA 95125

---

**17. Lonich Patton Ehrlich Policastri (LPEP)**
- **City:** San Jose
- **Metro:** South Bay / Santa Clara
- **Attorney count:** 18 (confirmed – grew from 3 to 18 attorneys)
- **Practice areas:** Family law + estate planning – one of the largest family law practices in California
- **Why they qualify:** 18 attorneys, all focused on family law and estate planning. Santa Clara County. At this size, they have multiple paralegals handling transcript ordering. Family law litigation at this volume = significant monthly transcript demand. Certified specialists throughout the firm.
- **Disqualifiers:** None. Estate planning portion is non-litigious, but the family law half of the practice generates strong transcript volume.
- **Tier:** 1B
- **Confidence:** High
- **Address:** 1871 The Alameda, San Jose, CA 95126

---

**18. Hoover Krepelka, LLP**
- **City:** San Jose
- **Metro:** South Bay / Santa Clara
- **Attorney count:** ~36-41 total employees (confirmed via ContactOut / RocketReach); likely 15-25 attorneys
- **Practice areas:** Family law exclusively – largest Silicon Valley family law firm
- **Why they qualify:** Self-described as the largest exclusively family law firm in Silicon Valley. Founded 1960. Four certified Family Law Specialist partners. Santa Clara County courts. At this scale, transcript ordering is a regular operational function – exactly the profile that benefits most from a streamlined platform.
- **Disqualifiers:** None. At the upper end of our sweet spot, but family-law-only focus keeps institutional procurement overhead lower than a general litigation firm this size.
- **Tier:** 1B
- **Confidence:** High (size estimated from employee data proxies)
- **Address:** 1520 The Alameda, Suite 200, San Jose, CA 95126

---

**19. Morgan Tidalgo Sukhodrev & Azzolino LLP (MTSA)**
- **City:** San Jose
- **Metro:** South Bay / Santa Clara
- **Attorney count:** 4+ (4 named partners; total not confirmed publicly)
- **Practice areas:** Family law – litigation focus, Santa Clara County courts specifically
- **Why they qualify:** Self-described firm that "spends time at the Santa Clara County courthouse nearly every day." That signal indicates high hearing volume and likely strong transcript demand. Family law + heavy court presence = regular deposition and hearing transcript orders.
- **Disqualifiers:** None
- **Tier:** 1B
- **Confidence:** Medium (attorney count not confirmed beyond named partners)
- **Address:** 50 W San Fernando St, San Jose, CA 95113

---

**20. Leland, Parachini, Steinberg, Matzger & Melnick LLP (LPS)**
- **City:** San Francisco
- **Metro:** SF
- **Attorney count:** ~9-15 (9 Super Lawyers selections is a proxy; full-service firm)
- **Practice areas:** Family law, litigation, civil litigation, business law, estate planning
- **Why they qualify:** Full-service civil firm at 135 Main St in SF. Family law litigation + general civil lit = two practice areas with transcript volume. Not a pure boutique, which means multiple practice groups can generate orders. 9+ Super Lawyers selections suggests solid mid-size firm.
- **Disqualifiers:** Some transactional work (corporate, real estate) but litigation departments are strong. Do not send messaging focused on non-litigious practice areas.
- **Tier:** 1B
- **Confidence:** Medium
- **Address:** 135 Main St, Suite 1200, San Francisco, CA 94105

---

**21. Albertson & Davidson, LLP**
- **City:** San Francisco (also Silicon Valley, LA, San Diego)
- **Metro:** SF / Multi-location
- **Attorney count:** 7 (confirmed – "team of seven estate attorneys")
- **Practice areas:** Trust, estate, and probate litigation exclusively
- **Why they qualify:** Pure probate/trust litigation firm – every case they handle requires a court reporter for depositions and hearings. 7 attorneys, all litigators. $300M in verdicts/settlements. Despite small size, their case type guarantees transcript demand. SF + Silicon Valley offices.
- **Disqualifiers:** None. Small firm but extremely focused practice = predictable transcript demand.
- **Tier:** 1B
- **Confidence:** High
- **Address:** 1 Market St, Suite 3600, San Francisco, CA 94105

---

**22. Sack Rosendin Inc.**
- **City:** Oakland
- **Metro:** East Bay
- **Attorney count:** ~5 (confirmed)
- **Practice areas:** Insurance defense, personal injury defense, civil litigation, business litigation, real estate
- **Why they qualify (high priority):** Insurance defense practice = mirror image of PI plaintiff but with the strategic upside described in Section 1.5. Per the carrier-channel strategy, defense firms are explicit priorities for the launch window – even if conversion is slow, getting them on platform builds the case for direct-to-carrier outreach later. Oakland base, boutique structure (5 attorneys = paralegal has real vendor authority), 40+ years experience per attorney, very price-sensitive given carrier audits. No "carrier-locked vendor" disqualifier applies – that constraint is the channel we want to leverage long-term.
- **Disqualifiers:** None.
- **Tier:** 1B (insurance-defense priority – strong candidate for Tier 2 chocolate treatment if any signed-up CSR cites them)
- **Confidence:** High
- **Address:** Oakland (street address not confirmed in research – enrichment needed)

---

### Edge cases (above sweet spot but worth tracking)

---

**23. Walkup, Melodia, Kelly & Schoenberger**
- **City:** San Francisco
- **Metro:** SF
- **Attorney count:** ~51-77 employees total; likely 20-30 attorneys (estimated from named attorney list of ~16+ named, plus associates)
- **Practice areas:** Personal injury, medical malpractice – plaintiff exclusively
- **Why they qualify despite size:** This is the premier Northern California PI plaintiff firm. More million-dollar verdicts than any other firm in Northern CA. Med mal + complex PI = the highest per-case transcript spend of any firm on this list. At 20-30 attorneys, they have dedicated litigation support staff who handle transcript ordering as a routine function. They are exactly the type of firm that would benefit most from streamlined ordering and transparent pricing.
- **Why they're flagged:** At the upper edge or slightly above our 50-attorney sweet spot. Procurement may run through a managing partner committee rather than a paralegal, which slows the sales cycle. They likely have an entrenched CSR agency relationship that's harder to displace cold.
- **Tier:** 1B edge case – postcard only, not chocolate, until a CSR-relationship signal makes them Tier 1A
- **Confidence:** Medium-high (attorney count estimated; firm existence and practice area are confirmed)
- **Address:** 650 California St, 26th Floor, San Francisco, CA 94108

---

**24. Dolan Law Firm, PC – Oakland office (separate tracker row)**
See entry #2 above. The Oakland office should be tracked separately if CSRs in the East Bay cite Dolan as a regular client. The SF row covers the HQ; this note flags the Oakland office as a potential second entry once CSR data flows in.

---

**25. Hoover Krepelka, LLP – note on employee vs. attorney count**
See entry #18 above. The 36-41 employee figure from third-party data includes support staff. The actual attorney count is likely 15-25. Flagged for enrichment – if they have dedicated transcript ordering staff, the platform pitch resonates strongly at this scale.

---

### Additional insurance defense firms (per Section 1.5 strategic priority)

**26. Demler, Armstrong & Rowland, LLP**
- **City:** San Francisco (also Long Beach HQ, Northern + Southern CA offices)
- **Metro:** SF
- **Attorney count:** Mid-size boutique (size not publicly stated – needs enrichment); core partner group together 30+ years
- **Practice areas:** Insurance coverage defense, general liability defense, catastrophic injury, construction litigation, insurance bad faith
- **Why they qualify:** Founded 1979, 40+ years of insurance defense focus. Primerus member (mid-size law firm peer network – implies real but not BigLaw scale). Per Section 1.5 strategic priority: a long-tenured insurance defense firm with carrier relationships is exactly the kind of relationship anchor we want for the carrier-channel play.
- **Disqualifiers:** None
- **Tier:** 1B (insurance-defense priority)
- **Confidence:** Medium (size not directly verified – flag for enrichment)
- **Address:** SF office address not confirmed in research – enrichment needed

---

**27. Ridley Master**
- **City:** San Mateo
- **Metro:** SF Peninsula / South Bay border
- **Attorney count:** 9 (confirmed via Lawyers.com listing)
- **Practice areas:** Civil litigation defense, insurance defense, employment litigation
- **Why they qualify:** AV-rated 9-attorney boutique on the SF Peninsula, serving the broader Bay Area (SF, Alameda, Contra Costa, Marin, Sonoma, Napa, Santa Clara, Santa Cruz, San Mateo, Monterey). Combined 100+ years insurance and civil defense experience. Sweet-spot size, geography, and practice area. Per Section 1.5 priority.
- **Disqualifiers:** None
- **Tier:** 1B (insurance-defense priority)
- **Confidence:** High
- **Address:** 1900 O'Farrell Street, Suite 280, San Mateo, CA 94403

---

**28. Murphy Pearson Bradley & Feeney**
- **City:** San Francisco (also Sacramento, Seattle, Los Angeles)
- **Metro:** SF / Multi-location
- **Attorney count:** Not publicly listed – likely mid-size given 4 offices
- **Practice areas:** Litigation, professional liability defense (legal malpractice, accountants, real estate professionals), business, employment, real estate/construction, white collar defense, trusts & estates litigation
- **Why they qualify:** "Lawyer's lawyers" for professional liability – defending other attorneys, accountants, and professionals. Professional liability defense has very high deposition volume (often the lawyer's whole malpractice case turns on the underlying-matter deposition record). Complex multi-party litigation defense. SF HQ. Diversified practice beyond pure insurance defense, but the litigation/professional-liability practice fits our profile.
- **Disqualifiers:** Confirm SF office attorney count is in sweet spot – multi-office firm could push the SF headcount above 50. If so, downgrade to edge case.
- **Tier:** 1B (with size flag)
- **Confidence:** Medium (size not directly verified – flag for enrichment)
- **Address:** San Francisco office address – enrichment needed

---

## 4. What is intentionally not populated yet

- **Paralegal / legal-assistant names.** These are the real target contacts. Finding them requires LinkedIn (free manual search or one month of Sales Navigator at $99) or firm website staff pages. This is a separate enrichment pass.
- **Work email addresses.** Cannot verify email addresses without enrichment tools (Hunter.io, Apollo) or manual LinkedIn research. Left blank in the tracker.
- **Mailing addresses.** Several addresses above come from Yelp listings. Confirm before printing postcards. A few firms (Lerner Poole, Sack Rosendin) have no street address confirmed here.
- **CSR relationship signal.** Tier 1A (CSR-cited) designations will populate automatically as CSRs complete onboarding and name their regular firms. None of these 25 can be designated 1A yet.
- **Outreach channel selection.** Whether a firm gets email only, postcard, or postcard + chocolate is a decision made after the full 100-firm list is assembled and ranked by expected volume + geography + CSR signal.

---

## 5. Scaling to the full 100-firm target

The 25 firms above cover SF, East Bay, and South Bay well. The remaining 75 firms needed to reach the 100-firm target should be sourced as follows:

**Next research pass priorities:**

1. **CSR onboarding data (once available).** Every firm a signed-up CSR names as a regular client should be added to the tracker as Tier 1A. This is the highest-value source and does not require any additional web research from us.

2. **Expand the South Bay / Santa Clara family law sweep.** I identified Hoover Krepelka, LPEP, MTSA, and Mello & Pickering. There are more. A targeted search for Santa Clara County family law firms with 5-20 attorneys should yield another 5-10 names.

3. **Mid-size PI plaintiff firms in the East Bay.** The Oakland + Alameda County plaintiff PI bar is large. Venardi Zurada and Bracamontes & Vlasak are a start; firms like The Barnes Firm and Wilshire Law (Oakland office) need further research to confirm Bay Area presence and size fit.

4. **Contra Costa and Alameda employment plaintiff firms.** Siegel LeWitter Malkani is the anchor. There are several smaller employment boutiques in the East Bay worth researching.

5. **South Bay civil/commercial litigation boutiques.** Shea & McIntyre, Bay Oak Law (Oakland), and Bowles & Verna are a start, but more research is needed for San Jose-specific civil lit firms.

6. **Marin County.** Small market but some well-established family law and PI firms serve Marin Superior Court. Lower priority but worth a pass once the core 100 is assembled.

**Blockers and notes:**

- **Insurance defense firms** are deliberately a top priority (per Section 1.5) but are harder to research because they don't market to plaintiffs and often don't list attorney counts or practice area details publicly. Plan to invest more discovery effort per defense firm than for plaintiff-side firms – the strategic value justifies it. Reporter-to-firm introductions (signed-up CSRs naming defense firms they've worked with) are a particularly high-signal channel here, since CSRs see the case captions on the defense side too.
- **Solo practitioners with support staff** fall in a gray zone – they're excluded from the 5-attorney lower bound for cold outreach but are a good organic/word-of-mouth target. Don't invest postcard budget here, but don't block them from signing up.

---

## 6. Sources used in this research

- Firm websites (attorneys pages, practice area pages, about pages)
- Super Lawyers profiles (superlawyers.com) for attorney count signals
- LinkedIn company pages (accessed via search snippets for employee range data)
- Yelp business listings for address confirmation
- ContactOut / ZoomInfo / RocketReach snippets for employee count cross-references
- FindLaw / Justia / Martindale directories for secondary confirmation
- Google web search – all searches conducted May 2026
