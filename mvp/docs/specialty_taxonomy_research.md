# CSR area-of-law taxonomy

> **DECISION (2026-07-21): superseded.** We adopted the **California State Bar lawyer-referral
> "area of law" list** (61 areas), which Rosie (CA trial lawyer) endorsed as the authoritative,
> comprehensive taxonomy - it's what the Bar itself calls the field ("Area of law", not
> "specialty" or "practice area"). It lives in `SPECIALTY_TYPES` in `_app_02_data.jsx`. The
> ~18-item researched shortlist below is kept only as background on how the court-reporting
> industry categorizes work; it is NOT the shipped list.
>
>
> **Nothing removed (decided 2026-07-21).** Earlier this doc implied transactional areas (Estate
> Planning, Contracts, Real Estate...) should be trimmed because reporters don't cover them. That
> was too absolute: almost every area of law has a *litigation* form that generates depositions
> (will contests, breach-of-contract suits, real-estate fraud disputes...). We cannot say for
> sure any area never involves a deposition, and reporters self-report, so areas none have
> covered just stay empty. Keeping the full list avoids excluding a reporter's real experience.
>
> **Two additions (2026-07-21).** The Bar's *lawyer* list omits two depo-heavy litigation areas
> reporters clearly work: **Antitrust** and **Product Liability**. Added alphabetically. Total: 63.

---

## Background: earlier research (not the shipped list)


Cited research into what "specialty" categories a California court reporter could list on a
directory profile. Run 2026-07-21 (multi-source, adversarially verified: 20 sources, 62 claims,
25 verified, 23 confirmed / 2 refuted). This replaces the earlier fabricated specialty values.

**Provenance, not demand.** Every source describes reporters *from the outside* – court-reporting
agencies, the CA State Bar, and legal directories. None is CA CSRs describing their own work. So
this establishes legitimate, sourced category NAMES; it does not prove which ones CA reporters
actually use. **CSR user testing is still the final gate** before this is treated as settled. No
counts, rates, or demand statistics were used or invented – this is about category names and
where they come from.

## How reporters actually get categorized (the method)

Three independent source families converge on a consistent core:

1. **Court-reporting / deposition agencies' own "areas of expertise" pages** – the most directly
   relevant analog to a CSR specialty dropdown. Depositions Inc. (ncdepo.com), Esquire
   Deposition Solutions, US Legal Support, Lexitas, CourtScribes. These are marketing pages, so
   they show *how the industry categorizes specialties* (what we want) but are not demand data.
2. **State Bar of California, Board of Legal Specialization** – the authoritative CA-specific,
   primary source. Certifies 11 areas directly + 11 via accredited orgs. Only *partially* useful:
   it mixes litigation and transactional areas, and its purpose is certifying attorneys, not
   reporters.
3. **Established legal directories (Martindale, 200+ A–Z practice areas)** – a canonical naming
   reference for the same deposition-heavy fields. Mine for names; don't adopt wholesale.

The court-reporting industry repeatedly singles out **IP/patent litigation** and **medical
malpractice** as the "highly technical" areas where subject-matter reporter experience matters
most (CourtScribes; Esquire runs a standalone IP/patent litigation-support page).

## Proposed shortlist – ~18 litigation specialties (each sourced)

Ordered roughly by strength of sourcing. "Agencies" = appears on one or more court-reporting
agency expertise pages; "CA Bar" = a State Bar certified/accredited area; "Martindale" = canonical
directory category.

| Specialty | Sourced by | Note |
|---|---|---|
| Personal Injury | Agencies (ncdepo, Lexitas), Martindale | Core, high volume |
| Medical Malpractice | Agencies, Martindale, CA Bar (accredited) | Flagged "highly technical"; expert-deposition heavy |
| Product Liability | Agencies (ncdepo, Esquire), Martindale | Core |
| Construction Defect / Construction Litigation | Agencies (ncdepo, Esquire, USLS), Martindale | Core |
| Intellectual Property / Patent Litigation | Agencies (ncdepo, Esquire, Lexitas) | Flagged "most demanding"; strongest specialty tag |
| Asbestos / Toxic Tort | Agencies (ncdepo), Martindale | |
| Class Action & Mass Tort | Agencies (Esquire, Lexitas) | |
| Securities Litigation | Agencies (Esquire, USLS) | |
| Business / Commercial Litigation | Martindale, Agencies (USLS) | Broad bucket; see overlap note |
| Insurance Defense | Agencies (Lexitas) | Overlaps PI / Workers' Comp in CA |
| Workers' Compensation | CA Bar (directly certified) | Long-standing CSR micro-market (own fee schedule) |
| Employment & Labor | Agencies (Esquire set) | |
| Environmental Litigation | Agencies (USLS) | |
| Family Law | CA Bar (directly certified) | |
| Criminal Law | CA Bar (directly certified) | |
| Legal Malpractice | CA Bar (directly certified) | |
| Bankruptcy / Creditors' Rights | CA Bar (Bankruptcy) | Litigation-adjacent (adversary proceedings); lower depo volume – validate |
| Corporate Law | Agencies (ncdepo, one out-of-state) | Weakest sourcing; may fold into Business/Commercial – validate |

## Separate axis – skills / credentials (do NOT put in the specialty dropdown)

Every source treats these as a different axis: they describe HOW a reporter works, not WHAT case
types they cover. Source: NCRA certification pages (primary).

- **Realtime / CRR** – NCRA's realtime proficiency cert; the thing reporters most market
  themselves on. (We already have "Realtime" as a service.)
- **Legal video / CLVS**, **Captioning / CRC**, and proficiency tiers **RPR / RMR / RDR**.
- Adjacent self-description tags agencies use: technical/medical terminology mastery, multilingual,
  expert-witness-heavy, complex/multi-deponent. Keep these as their own tags, visually separated.

## Exclude from the specialty dropdown (design principle)

Transactional work produces documents, not sworn testimony, so it has little court-reporting
exposure: **Estate Planning / Trust & Probate drafting, Real Estate closings, Tax planning, M&A /
deal work, Franchise & Distribution, Immigration filing, Admiralty (as a regulatory tag).** Keep
only their *litigation* carve-outs if CSRs report demand (e.g., probate/will-contest litigation,
tax-court litigation). **Appellate** is also a weak fit despite being CA-certified – appeals run
on the existing trial record; only oral argument is reported, no depositions.

Note: the 2 refuted claims both failed by trying to label the CA Bar list cleanly as
litigation-vs-transactional. So treat this exclusion as a *design principle*, not a tidy sourced
mapping.

## Validate with CSRs before shipping (open questions)

- **Overlap consolidation.** Insurance Defense / Personal Injury / Workers' Comp overlap heavily
  in CA practice; so do Business / Commercial / Corporate / Securities. Do reporters see these as
  distinct tags, or want fewer, broader buckets?
- **Granularity.** Is ~18 right, or do hiring firms search broader (one "Complex Civil / Business
  Litigation" instead of separate Securities / Commercial / Corporate)? No source settles this.
- **Weak items:** Corporate Law (single out-of-state agency), Bankruptcy (low depo volume),
  Appellate (excluded but CA-certified) – confirm.
- **A proceeding-TYPE axis?** Reporters often self-describe by proceeding (deposition, trial,
  hearing, arbitration/ADR, examination under oath) in addition to case subject. We already have a
  Proceedings axis; test whether Arbitration/ADR and EUO belong there.
- **Do NOT include "Certificate of Need"** – it appeared once (ncdepo, a North Carolina agency)
  and is a non-transferable NC healthcare-regulatory niche.

## Key sources

- Court Reporters: ncdepo.com/about-us · esquiresolutions.com/specialties/ ·
  uslegalsupport.com/court-reporting/ · lexitaslegal.com/resources/how-to-find-a-court-reporter ·
  courtscribes.com (agency-selection guide)
- CA Bar (primary): calbar.ca.gov/legal-professionals/legal-specialization/legal-specialty-areas
- Directory: martindale.com/areas-of-law/
- Credentials (primary): ncra.org/certification/NCRA-Certifications (+ the CRR page)
