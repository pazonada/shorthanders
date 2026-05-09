# CSR research tracker — schema and methodology

**Owner:** Aud + Rosie (split research effort, ~50 CSRs/week each per Rosie's 2026-05-09 proposal)
**Last updated:** 2026-05-09
**Status:** Schema definition. The actual live tracker should live in Google Sheets or Airtable for collaborative editing — this markdown doc is the schema reference, not the working data.

---

## What this is

A pre-signup CRM-style tracker that lets us segment, target, and personalize outreach to the ~4,733 CSRs in the CRB database. The goal is to know **before we email someone** whether they are likely freelance or court-employed, what firms they've worked with, and how to reach them.

This is distinct from the post-signup CSR account record (managed in `governance-and-process/csr_account_procedures.md` and the platform's own database). This tracker is for the people *not yet on the platform*.

---

## Why we need it

Two specific decisions depend on knowing which CSRs are court-employed vs. freelance:

1. **Phase 1 batch sequencing** — freelance CSRs are the urgent supply target; court-employed CSRs are a secondary batch with different messaging (see `marketing_plan_phase1_csr_supply.md`).
2. **Phase 2 firm targeting** — when CSRs sign up, we want to know which firms they've worked with. CSR-cited firms get the strongest personalized postcard outreach in Phase 2.

Without a tracker, we'd be emailing 4,733 people with generic copy and no segmentation signal.

---

## Source of truth

**Starting point:** the CRB website's downloadable Excel file of all licensed CSRs in California. Per Rosie (2026-05-09), this file already exists and can be downloaded — we just customize it with our additional fields. That gives us name + license number + (some) contact info as the seed.

**Enrichment sources** (per CSR, as we research):
- **LinkedIn profiles** — usually surfaces current employer, work history, location.
- **Court employee directories** — many CA superior courts publish lists of "official reporters" by department.
- **Old case captions** — public court records sometimes credit the CSR as "Official Reporter, Dept. X" for a specific courthouse, which is a strong court-employed signal.
- **Firm websites** — for freelance CSRs who have an "as seen with" or "preferred vendors" mention.
- **Google searches** — name + "CSR" + courthouse usually finds old transcript title pages or scheduling notices.
- **Existing CSR / agency directories** — CCRA member directory, NCRA directory.

---

## Schema (proposed — Aud and Rosie should review and edit)

| Field | Source | Notes |
|---|---|---|
| `csr_license_number` | CRB | Canonical key per `governance-and-process/csr_account_procedures.md`. Always present. |
| `last_name` | CRB | From CRB Excel. ALL CAPS in source — leave as-is or normalize in a Sheets formula. |
| `first_name` | CRB | From CRB Excel. ALL CAPS in source. |
| `email` | research | Empty until enriched (LinkedIn, firm websites, etc.). |
| `phone` | research | Empty until enriched. |
| `linkedin_url` | research | Empty until found. |
| `metro` | derived | `bay_area` / `la` / `san_diego` / `oc` / `sacramento` / `other_ca` / `unknown`. Bay Area is auto-tagged from the existing `bay_area_active_csrs.csv` subset; other metros need to be classified by zip or city. |
| `city` | CRB | From CRB Excel. |
| `zip` | CRB | From CRB Excel. Useful for metro classification. |
| `license_expiration` | CRB | From CRB Excel. Useful for re-licensing reminders and confirming the licensee is still active when we research. |
| `employment_status` | research | `freelance` / `court_employed` / `unknown` — **the central segmentation field**. All seeded to `unknown` initially. |
| `employed_courthouse` | research | If `court_employed`, which courthouse + department where known. |
| `license_issue_year` | research | Useful for newest-vs-experienced segmentation. Not in the current CRB CSV — would need to be derived (lower license numbers = older) or pulled separately. |
| `specialties` | research | e.g. family_law, civil_lit, pi, probate. From public-profile mentions. |
| `firms_worked_with` | research | Firms identified through public records or LinkedIn. **Feeds Phase 2 Tier-1A targeting.** |
| `outreach_status` | tracking | `not_contacted` / `email_sent` / `email_opened` / `email_clicked` / `responded` / `signed_up` / `unsubscribed` / `bounced`. All seeded to `not_contacted`. |
| `last_contacted_date` | tracking | |
| `email_batch_number` | tracking | Which Phase 1 batch they were in (matches `?batch=NN` UTM). |
| `notes` | research | Researcher's free-form observations. |
| `researcher` | tracking | `aud` / `rosie` / future delegate. |
| `last_researched_date` | tracking | When the entry was last touched. |

Add or remove fields as the research starts. The above schema is the current working plan after seeding from the CRB pull.

### Keeping the data fresh

The CRB Excel that seeds this tracker is itself updated by the California Department of Consumer Affairs on a rolling basis. The canonical sync schedule lives in `governance-and-process/CSR_License_Verification_Policy.md` — quarterly full syncs in **January, April, July, and October**. That same quarterly process regenerates this tracker's seed file so the pre-signup Sheets snapshot doesn't drift away from reality. Don't redefine the cadence here; defer to the verification policy as source of truth.

### Seed file (already populated)

The CRB pull (kanban t33, completed 2026-03-22) is in the repo at `research/CSRs/all_active_ca_csrs.csv` (4,733 rows) and `research/CSRs/bay_area_active_csrs.csv` (537 rows).

A seed file matching the tracker schema, **pre-populated with all 4,733 CSRs**, is at `research/csr_research_tracker_seed.csv`. Bay Area CSRs are auto-tagged with `metro=bay_area`; other metros are blank (to be classified). All `employment_status` values start as `unknown` (the research target). All `outreach_status` values start as `not_contacted`.

To bootstrap the live tracker: import `csr_research_tracker_seed.csv` to Google Sheets (File → Import → Upload → "Replace spreadsheet"). It's the live tracker's starting state — no merge with the empty template needed.

---

## Methodology — court-employed identification

Identifying who's court-employed is the highest-value enrichment. Suggested approach:

1. **Pull official-reporter lists** from each major CA superior court website. Many post these publicly. Match by name and license number.
2. **LinkedIn employer field** — "Court Reporter, [Court name]" or "Official Reporter" usually means employed. "Freelance court reporter" or solo practice means freelance.
3. **Search for recent case captions** naming the CSR. If the same CSR appears as the reporter for many cases in the same department, they're almost certainly the official reporter for that department.
4. **Default to `unknown`** if none of the above lands. Don't guess — `unknown` is a useful state because it queues someone for further research.

**Edge case:** some CSRs are court-employed but also do freelance work on their off days. Tag these as `court_employed` with a note in `notes` ("also takes freelance"). They go into Phase 1B but should be high-priority within that batch.

---

## Workflow

**Aud + Rosie split the universe.** Per Rosie's proposal: roughly 50 CSRs/week each. At that pace, ~2,500 freelance CSRs takes ~25 weeks (~6 months) to fully research. Realistically, we don't need to research every one before launching — we need enough Bay Area freelance coverage to start Phase 1A.

**Suggested first-pass priority** (within the research effort itself, not the outreach order):

1. Bay Area CSRs first (~618 from the CRB pull). Goal: have all 618 categorized as freelance / court-employed / unknown within the first few weeks.
2. Other-metro CSRs as Phase 1A outreach moves outward.
3. Rest of state on rolling basis.

**Tooling decision (locked, 2026-05-09):**

The live tracker lives in **Google Sheets**, not in the Dewey Sholes platform backend. Reasoning:

- Building admin CRM features into a platform that doesn't yet exist would push launch back by weeks for tooling that's operational, not customer-facing.
- Sheets handles 4,700 rows without breaking a sweat.
- Two-collaborator-friendly (Aud + Rosie), free, no credentials to manage.
- When the data shape changes, just edit a column — no DB migration.

**Email-side analytics live in Resend** (or whatever email provider we settle on). It already gives us per-recipient opens, clicks, bounces, and unsubscribes. We don't need to rebuild that.

**Conversion attribution lives on the platform.** When a CSR signs up via a UTM-tagged link, the platform records `signup_source`, `signup_campaign`, `signup_batch`, and `signup_referrer_csr` on their user record. That's the one piece the platform genuinely owns — and it's a small feature added to the signup flow during the real build (see kanban task on UTM signup tracking).

**Reconciliation workflow:**
- After each email batch send: export Resend's per-recipient CSV (opens / clicks), bulk-paste into the corresponding Sheets columns. ~5 minutes per batch.
- Signups: the platform's own DB has the authoritative record. Periodically pull the signup list and mark `outreach_status = signed_up` in Sheets.

**When to revisit (graduating tooling):**
- Sheets → Airtable (~$10/seat/month): when the schema outgrows flat (multiple touchpoints per CSR, history of contacts, deeper relationships between CSRs and firms).
- Airtable → real CRM (Salesforce / Hubspot): not before 12+ months post-launch, and only if revenue supports the per-seat cost.

**Bootstrap data:** A header-only CSV template lives at `research/csr_research_tracker_template.csv` — one-click import to Sheets, then layer the CRB Excel on top.

---

## Privacy / ethical guardrails

- We're researching **public information** about licensed professionals. CRB licensees are public record; LinkedIn profiles are public.
- Do **not** scrape from sources with explicit terms-of-service prohibitions or pay-walled directories without a license.
- Do **not** include data in this tracker that we wouldn't be comfortable showing the CSR if they asked. If we collected it, we should be able to defend collecting it.
- When a CSR signs up and their record migrates to the platform's own database, the pre-signup tracker entry should be **flagged as migrated** (not deleted yet, in case we need to audit attribution) and eventually purged.

---

## Open tasks for whoever picks this up

- [ ] Download the CRB CSR Excel file as the seed dataset.
- [ ] Stand up the live tracker in Google Sheets with the schema above.
- [ ] Aud + Rosie split the Bay Area chunk first (~309 CSRs each if 50/50).
- [ ] Document an internal cadence for sync (weekly check-in, shared notes column).
- [ ] When Phase 1A email outreach starts, populate `outreach_status`, `last_contacted_date`, `email_batch_number` from the email-batch tracker (cross-reference, don't double-enter).
- [ ] When a CSR signs up, mark `outreach_status = signed_up` and migrate identity over to the platform's CSR record per `csr_account_procedures.md`.
