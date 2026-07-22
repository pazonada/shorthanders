# Adding a state (geography expansion checklist)

Everything hardcoded to California, in one place, so a future expansion (Texas first – it has a
licensing registry; see `PROJECT_OVERVIEW.md` growth strategy) is a checklist, not a scavenger
hunt. Created 2026-07-21.

**Why a note and not a config switch:** wiring a geography abstraction now would be speculative
complexity for an expansion gated behind "one metro provably pays." When that day comes, decide
whether it's still copy edits (add a state) or a real multi-state data model (per-state rosters,
per-state license terminology, per-state landing pages for SEO). This list is the input to that
decision.

## 1. The tagline (title / social) – `mvp/src/_head.html`

Three tags all read "…and **CA** court reporters connect": `<title>`, `og:title`,
`twitter:title`. Also update `SITE_URL` in `scripts/preflight.py` only if the domain changes (not
for a state change).

## 2. Descriptions – `mvp/src/_head.html`

`og:description`, `meta description`, `twitter:description` all say "Every licensed **California**
court reporter…". Note the split we chose: the tagline uses "CA" (abbreviation, punchy), the
descriptions spell out "California."

## 3. On-page copy (the site body)

- **Landing** (`_app_04_marketing.jsx`): hero kicker "Over N **California** court reporters", hero
  sub "every licensed CSR in **California**", the money-comparison "**California** invoice" line,
  For-firms/For-reporters hero subs ("every licensed CSR in **California**").
- **Directory** (`_app_05_directory.jsx`): the `<h1>` "**California** court reporter directory".
- **Footer** (`_app_03_shell.jsx`): "**Now serving California**." and the footer tagline "every
  licensed **California** court reporter".
- **About / Terms / Privacy** (`_app_11_router.jsx`): "publicly available **California** CSR
  records", "**California's** court reporters are independent professionals", etc.
- **Claim / signup** (`_app_06_claim.jsx`): "every licensed **California** CSR is", "Search every
  licensed reporter in **California**".

Grep to find them all: `grep -rn "California\|Now serving" mvp/src/`.

## 4. The word "CSR" – California-specific terminology (~38 uses)

**"CSR" = Certified Shorthand Reporter, the California license.** Texas uses **CSR** too
(Certified Shorthand Reporter, via the JBCC), so it may transfer – but confirm per state; some
states say "CCR" (Certified Court Reporter) or just "licensed court reporter." If a target state
uses a different term, "CSR" throughout the copy becomes wrong, not just California-flavored.
Grep: `grep -rn "CSR" mvp/src/`.

## 5. Data layer

- **`mvp/csr_profiles.js`** (~1 MB) is the **California** CRB roster (5,705 records: name, city,
  county, method, zip, email, expiration). A new state needs its own roster from that state's
  registry, in the same shape. Multi-state = concatenate with a `state` field per record, and add
  a **state filter/selector** to the directory (today there's only a county filter).
- **`CITY_COUNTY` map + `countyFor()`** (`_app_01_core.jsx`) is a **California** city→county
  fallback for the ~194 records with a blank county. A new state needs its own map (or better
  county data in the source).
- **`TIER_A_COUNTIES`** (`_app_01_core.jsx` = Santa Clara / Contra Costa / Alameda) drives the ★
  in the county dropdown – California pilot counties. New state = its own priority metros.
- The **county filter** derives options from the data, so it auto-includes a new state's counties
  – but with no state filter, counties from different states would intermix confusingly. Add a
  **state** facet before loading a second state.

## 6. Things that are CA-specific but NOT geography-labeled (verify per state)

- **"Workers' comp" as a proceeding** and its fee-schedule framing is a California construct
  (own O&2 / minimum). Other states differ – confirm the proceeding/rate assumptions.
- **Rate baselines** (deferred feature) – the $5/pg and per-diem numbers in the memos are
  California working guidance, never statutory, and would not transfer. See the rate memos.
- **Specialty taxonomy** – sourced partly from the **CA** State Bar's certified areas
  (`specialty_taxonomy_research.md`); re-check against the new state's bar.

## 7. Beyond code – the real gates before you can operate in a new state

These are bigger than string edits, and easy to forget because they're not in the codebase:

- **Legal / regulatory review, per state.** This is the actual gate, the same one CA has. The
  deposition-neutrality question (`legal_question_deposition_neutrality.md`) was framed for
  California; every target state has its own rules on reporter neutrality, **who may administer
  the oath** (notary vs. commissioned reporter, esp. for remote/out-of-state depositions),
  remote-deposition procedure, and transcript-custody duties. Terms of service and the platform's
  disclaimed role must be re-checked against the new state's law. **Do this before spending on
  the state, not after** – it can change the product.
- **SEO / landing pages.** The site is a single-page hash-router app, so today it is one
  indexable URL (see `launch_prep.md`). Multi-state makes this bite harder: a Texas firm googling
  "court reporter Houston" should land on a Texas page, which the current architecture can't
  provide. Per-state landing pages (real URLs) are the point at which the routing/SSR limitation
  stops being optional. Decide this as part of expansion.
- **Marketing is operational, tracked elsewhere.** The CSR outreach email
  (`csr_email_outreach.md`), the Facebook reporter channel, and the firm-outreach playbook are all
  California / Bay-Area specific. A new state needs its own reporter channels, firm targets, and a
  new outreach send. See `../marketing/` – not part of this product checklist, but don't launch a
  state without it.

## 8. Things that need NO change (nice)

- **The share image** ("The directory of certified court reporters") carries no state – a
  side benefit of the logo-only decision. No re-export on expansion.
- The **brand** (name, logo, "Skip the agency") is geography-free.

## Quick audit command

```
grep -rn "California\|Now serving\|CA court\|TIER_A\|CITY_COUNTY" mvp/src/
```
