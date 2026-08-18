# State-by-state CSR public-data feasibility map

A pre-load feasibility map for expanding Shorthanders' day-one directory completeness beyond
California. Companion to `mvp/docs/state_expansion_checklist.md` (the code/copy checklist for
adding a state) – this doc answers the question that checklist flags but doesn't fully resolve:
**which states can we actually pre-load, and in which of those can the CA-style cold-email claim
campaign also run?** Created 2026-08-04.

## Why this matters

Shorthanders' strongest, hardest-to-copy differentiator is **day-one directory completeness**: California
launched with all ~5,705 active CSRs pre-loaded from the state board's public roster, which
happened to include public emails – used both to build the directory and to run the reporter
claim-invite campaign (`mvp/docs/csr_email_outreach.md`). Every directory competitor (StenoScout,
eCourt Reporters, CourtReporters.com) is claim-only, so Shorthanders launches complete where they launch
empty (see `marketing/competitive-analysis/README.md`).

That advantage only travels to a new state if the state (a) licenses court reporters at the state
level, (b) publishes the roster publicly, (c) in bulk/downloadable form, and (d) includes contact
info so Shorthanders can invite reporters to claim. This doc checks all four, per state, with sources.

**Headline finding, stated up front: California looks like an outlier, not the norm, on point
(d).** Of the four states verified in real depth in this pass (CA, IL, TX, NJ), only California
publishes reporter emails. Illinois and New Jersey – the next two states in the current expansion
order – both have real, confirmed, bulk-downloadable rosters (the directory-completeness win
travels cleanly), but **neither publishes contact info**, for three different reasons in three
different states (see the table). Plan the next-state playbook around that split: **directory
pre-load is a code/data job; the claim-invite campaign is very likely a Facebook/organic/referral
job everywhere except California**, not a repeat of the CA email campaign.

## Methodology and honesty notes

- Scope: **states that mandate a state license or certification for court reporters.** National
  NCRA membership/certification doesn't count – that's voluntary and has nothing to do with a
  state-run public roster. Roughly 20-24 of 50 states have mandatory licensure; the rest (NY, FL,
  PA, OH, CT, MD, MA, VA, WI, etc.) don't license reporters at the state level at all, so there's
  no state roster to pre-load from regardless of anything else.
- Primary sources: the [NCRA "State of the Nation Activities Report" (SONAR)](https://www.ncra.org/docs/state-certification-requirements)
  PDF (state-by-state licensing-requirement summary, association-reported – it's missing a few
  known-mandatory states, e.g. Illinois, New Jersey, Hawaii, Utah, so it's a floor, not a ceiling),
  plus direct visits to each state's own licensing-board site, and – where I could reach it – the
  actual public dataset or API.
- **"Confirmed" vs. "unverified," and what that means:** a handful of states (CA, IL, TX, NV
  partially, WA, GA, NJ) got a real fetch/API check in this pass and are marked Confirmed with a
  cited URL. For Illinois specifically I queried the live public API directly (not just a
  description of it) and pasted the real field names below – that's as solid as this kind of
  research gets without calling the agency. Most of the remaining licensing states only got a
  search-level pass (I found the board's name and that a roster page exists, not what fields it
  returns or whether bulk export exists) – those are marked **Unverified** on purpose, per the
  house rule to never invent what a public dataset contains. Treat "Unverified" as "call or email
  the board" work, not "assume no."
- None of this is legal advice. Every "ToS / usage" note below is a flag to run past counsel
  before importing a state's data, not a green light.

## The table

| State | Board / agency | Public roster? | Bulk / downloadable? | Contact info (email / phone)? | ToS / usage flag | Shorthanders priority + rationale |
|---|---|---|---|---|---|---|
| **California** | Court Reporters Board of California (CRB), under DCA | Y – [courtreportersboard.ca.gov/licensees](https://www.courtreportersboard.ca.gov/licensees/index.shtml) | **Y – confirmed.** Monthly-refreshed download via [DCA public info portal](https://www.dca.ca.gov/consumers/public_info/index.shtml). Already the source of `mvp/csr_profiles.js` (5,705 records). | **EMAIL: Y** – 5,702/5,705 in Shorthanders' own build have an email. Phone: not part of the bulk file. | DCA's standard "Public Information Record Layout" governs; PII-handling discipline already applied per Shorthanders practice (mask/never-deploy-raw). | **Live already** – the proof case, not a target. |
| **Illinois** | IDFPR, Division of Professional Regulation – license type "SHORTHAND REPORTER" | Y – [idfpr.illinois.gov/profs/shorthandreporter.html](https://idfpr.illinois.gov/profs/shorthandreporter.html) | **Y – confirmed by direct API read.** Live, no-auth Socrata endpoint: `data.illinois.gov/resource/pzzh-kp68.json`. Queried it directly in this pass: 5,008 historical SHORTHAND REPORTER records, **1,430 active nationwide, 1,166 active with an Illinois address** (matches the "1,400+" figure already in `mvp/marketing/growth_strategy.md`). | **NO** – confirmed by reading the actual returned fields: `license_number, license_type, description, license_status, first_name, middle, last_name, business_name, city, state, zip, county, dates, ever_disciplined`. No email or phone field exists in the dataset. | Published under Illinois's Open Operating Standards Act (P.A. 98-627) open-data portal; no explicit use restriction surfaced in this pass – confirm with counsel before a bulk commercial import. | **High.** Cleanest possible pre-load case (real live bulk API, structured, no auth) – but the claim-invite email campaign does **not** transfer. Lean on Facebook/organic/reporter-referral for claiming, as the existing checklist already flagged as a possibility – now confirmed, not just suspected. |
| **Texas** | Judicial Branch Certification Commission (JBCC) | Y – [txcourts.gov/jbcc/court-reporters-certification](https://www.txcourts.gov/jbcc/court-reporters-certification/) (one-at-a-time public search) | Unverified – no confirmed bulk export; [Request for Records](https://www.txcourts.gov/jbcc/request-for-records/) page routes to an email inbox, no documented bulk/CSV process. | **NO – confirmed, and newly hardened.** Texas **HB 5129** (effective 6/20/2025) requires state agencies to strip licensee personal contact info (address/phone/email) from public disclosure absent written consent. JBCC has already pulled contact info from its public search and states staff "will be unable to provide or confirm contact information for licensees." | JBCC is a **judicial-branch entity** governed by Rule 12 of the Rules of Judicial Administration, not the state Public Information Act – a separate legal track from a normal executive-branch licensing board. | **Low.** Already deprioritized for the entrenched-competitor reason (MyTexasCSR, per `mvp/marketing/growth_strategy.md`). This confirms the data-access angle is weak too, independent of the competitor situation – even a revisit later should not assume email outreach or an easy bulk pull. |
| **Nevada** | Certified Court Reporters Board of Nevada | Y – [crptr.nv.gov/consumer/License_Verification](https://crptr.nv.gov/consumer/License_Verification/) | Unverified – only a one-at-a-time verification tool and static PDF "verification" documents found; no confirmed full-roster CSV/export. | Unverified. | Not assessed this pass. | **Med.** Small state; not in the current expansion order (`growth_strategy.md`) but worth a direct call/email to the board before ruling in or out – the standard web pass didn't resolve bulk or contact. |
| **Washington** | DOL Court Reporter Program | Y – [professions.dol.wa.gov/s/license-lookup](https://professions.dol.wa.gov/s/license-lookup) (one-at-a-time) | **Gated – confirmed.** DOL's own [data-services page](https://dol.wa.gov/about/data-services-requests/business-and-profession-data-requests) states bulk "lists of licensed professionals are available only to approved educators or associations" (licensed engineers are the sole public exception), and even where available, data-service requests are billed at **$60/hour**. | Unverified, but the gating pattern makes free/easy contact info unlikely – Shorthanders is neither an "approved educator" nor "association." | Explicit access restriction, not just a ToS footnote – this is a real gate on who can even request the data. | **Low/Med.** Not "verify per state" busywork like the existing checklist implies for WA – it's its own small access negotiation (cost + eligibility) before any commitment. Not currently in the expansion order. |
| **Georgia** | Board of Court Reporting (Judicial Council of Georgia, Office of Court Professionals) | Y – a public directory exists at [gcr.onegovcloud.com/public/directory](https://gcr.onegovcloud.com/public/directory/); board info at [ocp.georgiacourts.gov/board-of-court-reporting](https://ocp.georgiacourts.gov/board-of-court-reporting/) | Unverified – the directory is a JavaScript single-page app that couldn't be rendered/confirmed in this pass; no CSV/API found. A third-party mirror exists at stenosearch.com but isn't authoritative. | Unverified. | Georgia's board sits under the **Judicial Council** (judicial branch), structurally similar to Texas's JBCC – worth checking whether the standard Georgia Open Records Act applies or a separate judicial-branch rule governs, before counting on a bulk pull. | **Med.** Market rationale (Atlanta litigation hub, reciprocity) from `growth_strategy.md`'s #3 slot still stands, but the data-access mechanics need a real follow-up call/email to the board – this pass could not confirm bulk or contact either way. |
| **New Jersey** | State Board of Court Reporting, NJ Division of Consumer Affairs | Y – [njconsumeraffairs.gov/cou](https://www.njconsumeraffairs.gov/cou) | **Y – confirmed, and the easiest self-service bulk process found in this whole scan.** A free "standard list" of the **entire** DCA licensee database is posted at a public Box.com link (per [njconsumeraffairs.gov/requestlist](https://www.njconsumeraffairs.gov/requestlist)), plus free by-profession downloads on the verification site. A custom list is also available for $55 on CD. | **NO** – the request-list page explicitly names "Telephone Numbers" and "Email Addresses" as fields that are **not** provided. The list carries name, license #, address, county, and license/expiration dates only. | No bulk/commercial-use restriction surfaced beyond the standard fee schedule – confirm with counsel before import. | **High** for pre-load – matches `growth_strategy.md`'s #2 slot (after Illinois). Same pattern as Illinois: great for the directory, no email for the claim campaign – plan Facebook/reporter-referral there too. |
| **Alabama** | Alabama Board of Court Reporting | Y – [abcr.alabama.gov/roster](https://abcr.alabama.gov/roster/) | Unverified – search tool exists; column headers / export not confirmed. | Unverified. | Not assessed. | **Low.** Not in the current expansion order. |
| **Arizona** | AOC Certified Reporters Program | Y – [azcourts.gov/cld/Certified-Reporters-Program/Directory](https://www.azcourts.gov/cld/Certified-Reporters-Program/Directory) (blocked/403 on this pass; a directory is documented to exist per search results) | Unverified. | Unverified. | Not assessed. | **Low.** Not in the current expansion order. |
| **Mississippi** | Board of Certified Court Reporters (MS Judiciary) | Y – [courts.ms.gov/cle_bccr/bccr/bccr.php](https://courts.ms.gov/cle_bccr/bccr/bccr.php) | Unverified. | Unverified. | Not assessed. | **Low.** Not in the current expansion order. |
| **New Hampshire** | Advisory Board of Court Reporters, NH Office of Professional Licensure & Certification | Y – [oplc.nh.gov/advisory-board-court-reporters-directory](https://www.oplc.nh.gov/advisory-board-court-reporters-directory) | Unverified. | Unverified. | Not assessed. | **Low.** Small market; not in the current expansion order. |
| **Arkansas** | Arkansas Board of Certified Court Reporter Examiners | Y – a "Court Reporter Licensee Search" service is listed on the state directory (link redirected before fields could be confirmed this pass) | Unverified. | Unverified. | Not assessed. | **Low.** Not in the current expansion order. |
| **Louisiana** | Louisiana Board of Examiners of Certified Shorthand Reporters (LBECSR) | Y – [lacourtreporterboard.org](https://lacourtreporterboard.org/) | Unverified. | Unverified. | Not assessed. | **Low.** Not in the current expansion order (though NCRA reciprocity notes Louisiana as relevant to Gulf-region cross-state pooling – worth a look if/when GA or FL move forward). |
| **Missouri** | Board of Certified Court Reporter Examiners (est. under MO Supreme Court Rule 14) | Board site exists – [courts.mo.gov/page.jsp?id=355](https://www.courts.mo.gov/page.jsp?id=355); public roster page not confirmed. | Unverified. | Unverified. | Not assessed. | **Low.** Not in the current expansion order. |
| **Oklahoma** | State Board of Examiners of Certified Shorthand Reporters | Board exists per state statute/OCRA; public roster URL not confirmed this pass. | Unverified. | Unverified. | Not assessed. | **Low.** Not in the current expansion order. |
| **Tennessee** | Court reporter certification program under TN Dept. of Commerce & Insurance regulatory boards – [tn.gov/commerce/regboards/courtreport.html](https://www.tn.gov/commerce/regboards/courtreport.html) (fetch failed on a cert error this pass; not independently confirmed) | Unverified. | Unverified. | Unverified. | Not assessed. | **Low.** Not in the current expansion order. |
| **Iowa** | **Government board name unverified this pass** (NCRA SONAR reports mandatory licensure with RPR + "Iowa CSR" credentials, association-level source only) | Unverified. | Unverified. | Unverified. | Not assessed. | **Low.** Not in the current expansion order. |
| **Idaho** | **Government board name unverified this pass** (SONAR: mandatory, Q&A/Jury Charge/Literary skill test) | Unverified. | Unverified. | Unverified. | Not assessed. | **Low.** Not in the current expansion order. |
| **Kansas** | **Government board name unverified this pass** (SONAR: mandatory, no national credential required) | Unverified. | Unverified. | Unverified. | Not assessed. | **Low.** Not in the current expansion order. |
| **Michigan** | **Government board name unverified this pass** (SONAR: mandatory via RPR/NCRA – note this is one of the more disputed "mandatory" claims across secondary sources; verify the underlying statute before relying on it) | Unverified. | Unverified. | Unverified. | Not assessed. | **Low.** Not in the current expansion order. |
| **New Mexico** | **Government board name unverified this pass** (SONAR: mandatory, RPR-based) | Unverified. | Unverified. | Unverified. | Not assessed. | **Low.** Not in the current expansion order. |
| **Hawaii** | Hawaiʻi Board of Certified Shorthand Reporters (State Supreme Court) – confirmed to exist via [courts.state.hi.us](https://www.courts.state.hi.us/hawai%CA%BBi-board-of-certified-shorthand-reporters) | Not confirmed this pass. | Unverified. | Unverified. | Not assessed. | **Low.** Small market; not in the current expansion order. Notable only because it's mandatory-license despite NCRA's SONAR omitting it. |
| **Utah** | Division of Occupational and Professional Licensing (DOPL), Court Reporting – confirmed via [dopl.utah.gov/court-reporting](https://dopl.utah.gov/court-reporting/), Utah Code 58-74-301 | Utah DOPL runs a general license-verification search; whether it covers court reporters with a bulk option wasn't checked this pass. | Unverified. | Unverified. | Not assessed. | **Low.** Not in the current expansion order. Notable only because it's mandatory-license despite NCRA's SONAR omitting it. |

## Prioritized expansion shortlist

Reordered by what this research actually changes about `mvp/marketing/growth_strategy.md`'s
existing order (Illinois → New Jersey → Georgia → Florida, Texas deprioritized):

1. **Illinois – confirmed feasible, proceed as planned.** Bulk pre-load is a solved problem (the
   live API works today, no negotiation needed). The only planning change: **build the reporter
   outreach plan around Facebook/organic/referral from the start, not a CA-style cold-email
   send** – there's no email field to send to.
2. **New Jersey – confirmed feasible, proceed as planned.** Same shape as Illinois: bulk pre-load
   is easy (arguably the easiest of any state checked – a standing public Box.com download of the
   whole DCA licensee database), no email for outreach. Same Facebook/organic plan applies.
3. **Georgia – rationale still holds, but do the legwork before committing budget.** Unlike IL/NJ,
   this pass could not confirm bulk export or contact info. Before Georgia becomes an active
   build, get a real answer from the Board of Court Reporting (a phone call or records request,
   not another web search) on (a) whether the public directory has a bulk/CSV path and (b)
   whether it's subject to the standard Georgia Open Records Act given the judicial-branch
   structure.
4. **Texas – stay deprioritized, and don't revisit for the data reason alone.** Even setting aside
   the entrenched-competitor problem, HB 5129 has now closed the contact-info door at the state
   level (not just JBCC policy), and no bulk path is confirmed. If TX priorities ever change
   (e.g., a competitor stumble), budget for a formal Rule 12 records request and plan on
   directory-only, no email outreach, regardless.
5. **Washington – not in the plan, and this research is a reason to keep it out for now.** The
   "approved educators or associations only" bulk-access gate plus a $60/hr fee makes this a real
   negotiation, not a checklist item. Worth revisiting only if Shorthanders has grown into something an
   "association" carve-out plausibly covers, or is willing to pay for a one-time data pull.
6. **Everything else (NV, AL, AZ, MS, NH, AR, LA, MO, OK, TN, IA, ID, KS, MI, NM, HI, UT)** – none
   are in the current roadmap. Treat as a backlog: each needs the same quick verification pass
   (roster → bulk → contact) before it's worth spending real time on, using this doc's method.

## Strategic read: how far does the differentiator actually travel?

- **The pre-load advantage travels to any mandatory-licensing state with a real bulk roster** – that's
  a data/engineering problem, and it's now confirmed solvable in Illinois and New Jersey with no
  special negotiation. Expect it to work similarly in most licensing states; expect some (WA, and
  possibly TX/GA) to require an actual negotiation or fee.
- **The cold-email claim campaign is very likely a California-only tactic.** Every other state
  checked in real depth (IL, TX, NJ) explicitly does **not** publish reporter emails – for three
  different reasons (field doesn't exist, policy exclusion, and now a hardened state privacy
  statute). Don't plan a next-state launch assuming "load the roster, blast the claim emails" the
  way CA worked. The real plan per state is: pre-load the directory from the public roster (works
  broadly), then get reporters to claim via **Facebook groups, organic/SEO, and reporter-referral**
  (the existing `growth_strategy.md` "reporter-brought firms" engine) – which the CA playbook
  already leans on in parallel with email, so this isn't a new channel, just the *primary* one
  going forward instead of a backup.
- **Licensing states are a minority of the country – roughly 40-45% by this count.** The
  remaining majority (NY, FL, PA, OH, CT, MD, MA, VA, WI, and more) have no state roster at all,
  so Shorthanders would be claim-only there, exactly like every current directory competitor. That's not a
  reason to avoid those states – Florida is already #4 in `growth_strategy.md`'s order, and it's a
  huge litigation market – but it's a **different, weaker expansion motion**: no free
  pre-load, competing purely on the other wedges (12% attorney-only fee vs. agency cuts, the
  match-preview UX, does-both breadth, founding-member perks). Worth being explicit internally
  that "expand geography" isn't one uniform play – licensing-state expansion and non-licensing-state
  expansion are two different products from a supply-acquisition standpoint, and the roadmap
  should say which kind each state is.

## Suggested follow-up

- `mvp/docs/state_expansion_checklist.md`'s "Data layer" section (the per-state contact-info
  bullets on CA/TX/IL) should point here as the fuller reference now that IL and NJ are confirmed
  and TX's HB 5129 finding is new information since that section was last written.
- Before Georgia or any "Unverified" state gets real build time, convert its row from Unverified
  to Confirmed the same way IL got confirmed here – a direct check of the actual roster/API/export,
  not another round of web search summaries.
