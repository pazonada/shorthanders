# CSR court-employment research

**Purpose:** Identify which CSRs in our research tracker are employed by California superior courts as staff reporters — **so we can DEPRIORITIZE them for Phase 1 outreach**. Freelance CSRs are the urgent target; court-employed CSRs are a secondary, smaller batch with different messaging.

The court-employed tag is the high-value output of this research. Without it, court-employed CSRs end up in Phase 1A and get the wrong pitch. The freelance tag (from pro tempore directories) is a nice-to-have positive confirmation, but every `unknown` row defaults to Phase 1A anyway, so freelance tagging doesn't materially change targeting — it just gives us extra data per CSR (especially email addresses, which pro tempore directories often publish).

---

## Source-of-truth pattern

Each court is researched as an independent batch. For each batch we save:

- `<court_slug>.csv` — the raw extracted directory data from the court's public website, with columns `last_name, first_name, csr_number, status, email, source`.
- `findings_YYYY-MM-DD.csv` — a deltas file showing which CSRs got tagged in the seed CSV during that research session (license number, name, employment_status, employed_courthouse, source, date, status from the source).
- The seed CSV (`research/csr_research_tracker_seed.csv`) is updated in-place: `employment_status="court_employed"` and `employed_courthouse=<court name>` for matched **Active Staff** entries.

When the user re-imports the seed (or the next quarterly merge runs), these tags propagate to the live Sheet.

---

## Methodology

### What "court-employed" means

A CSR is tagged `court_employed` if they're a current full-time staff reporter for a CA superior court — not a pro tempore (freelance reporter who consents to be appointed for individual proceedings).

### Source signals (in order of strength)

1. **The court's own staff directory** with explicit "staff" or "Active Staff" labels — gold standard. Sacramento publishes one with `@saccourt.ca.gov` email addresses identifying staff.
2. **Court email domain** — a CSR with `@<court>.ca.gov` email is a staff reporter.
3. **Court website mentions** with phrases like "Official Reporter, Department X" or "court-employed reporter" for a specific named CSR.
4. **LinkedIn profile** with current employer = a CA superior court. Useful as a corroborating signal but not authoritative.

### What's NOT a court-employed signal

- **Pro Tempore directories** — these are FREELANCE reporters who consent to be appointed for specific proceedings. The opposite of court-employed.
- **Court-Approved List of Official Reporters Pro Tempore** — same as above.
- A CSR's name appearing on a court's transcript-request page — could be either staff or pro tempore.

### Status mapping from Sacramento-style directories

Sacramento Superior Court's directory uses three labels:

| Sacramento label | Our `employment_status` tag | Notes |
|---|---|---|
| Active Staff | `court_employed` | Current full-time staff. Strong tag. |
| Retired | `unknown` | Was court-employed; license may still be active for occasional freelance. Don't auto-tag — research individually if needed. |
| Inactive | `unknown` | Status unclear; could be on leave, semi-retired, etc. Don't auto-tag. |

Other courts may use different labels — adapt the mapping per court.

---

## Methodology pivot (2026-05-09)

After confirming that several major courts (SF, Alameda, Santa Clara, San Diego) do **not** publish staff reporter directories at all, the research expanded to include **pro tempore (freelance) directories** as a secondary signal:

- Pro tempore lists confirm a CSR is **freelance / available for freelance**. They go into Phase 1A outreach with priority.
- Pro tempore status doesn't *prove* a CSR isn't also staff at a different court (rare but possible), so this is a weaker signal than an explicit court-staff tag.
- We tag matched pro tempore CSRs as `employment_status = freelance` only when their status is currently `unknown`. We never overwrite a `court_employed` tag with `freelance`.

**Net effect:** the seed tracker now captures *both* directions of the segmentation (court-employed vs freelance) where the data is available. Many CSRs remain `unknown` because neither court publishes them.

## Coverage as of 2026-05-09

| Court | Status | Court-employed matched | Freelance (pro tem) matched | Notes |
|---|---|---|---|---|
| Sacramento Superior Court | ✓ done | 40 | — | Public staff directory at saccourt.ca.gov. 119 reporters in source; 85 matched to active CRB licenses; 40 Active Staff confirmed. |
| LA Superior Court | ✓ done (pro tem only) | — | 217 | Pro Tempore directory PDF (lascpubstorage, 2/13/26 update). 264 unique CSRs in source; 217 matched to seed and tagged freelance. Staff list not publicly available. |
| Fresno Superior Court | ✓ done (pro tem only) | — | ~46 | Pro Tempore directory at fresno.courts.ca.gov. ~46 reporters in source. Tagged freelance. Staff list not separately published. |
| SF Superior Court | ✗ not feasible | — | — | Confirmed no public directory of any kind. Page directs callers to department clerk. Would need direct ask via Rosie's network or LinkedIn-based research. |
| Santa Clara Superior Court | ✗ not feasible | — | — | Confirmed no public reporter list. Page describes service policies but names no individuals. |
| Alameda Superior Court | ✗ not feasible | — | — | Confirmed no public list. Refers callers to email transcripts@alameda.courts.ca.gov. |
| San Diego Superior Court | not started | — | — | Pro Tempore directory exists per earlier search. Site returned 403 on direct fetch. Worth retry. |
| Orange County Superior Court | not started | — | — | Pro Tempore directory page exists (occourts.org). |
| Riverside Superior Court | not started | — | — | Two PDFs found (Pro Tempore + Non-Staff). |
| San Bernardino Superior Court | not started | — | — | |
| Other CA superior courts | not started | — | — | Smaller courts, lower priority. |

**Progress:** 40 court-employed + 251 freelance = **291 enriched rows out of 4,732 active CSRs (~6%)**. The freelance tally combines unique-by-license-number across LA + Fresno (some overlap deduplicated). Most CA superior courts do not publish staff directories; this research approach will plateau around the courts that publish either staff or pro tempore lists publicly. For the remaining ~94%, segmentation must come from CSR-self-reported data at signup.

---

## How to continue this research

1. **Pick a court** from the "not started" list above. Bay Area priorities first (Santa Clara, Alameda, then SF via alternate methods).
2. **WebSearch** for `"<county> superior court" official reporter staff list` and similar variations.
3. **WebFetch** the most promising results. Look specifically for staff-vs-pro-tempore distinctions and CSR license numbers.
4. **If a public directory exists with CSR numbers:** save raw data as `<court_slug>.csv`, run a matching script (model the Sacramento one), tag matched Active Staff in the seed, write a findings file dated YYYY-MM-DD.
5. **If no public directory:** document what you found in this README under the court's row. Don't fabricate data.
6. **Commit and push** with a clear message naming the court researched and the count of matches added.

For courts that don't publish staff directories, alternative approaches:
- LinkedIn search for `"Official Reporter" "<Court Name>"` — slower and less complete.
- Direct ask to the court clerk's office (Rosie's network may help).
- Defer to post-MVP — if we can't easily identify court-employed CSRs at a given court, they all stay `employment_status=unknown` and end up in Phase 1A by default. Not the end of the world.

---

## Caveat

This research is approximate. A CSR's employment status changes — staff reporters retire, freelancers get hired by courts, etc. The data here is a snapshot. Re-research the court's directory at next quarterly sync (per `governance-and-process/csr_quarterly_sync_runbook.md`) to catch changes.

The `[LAPSED]` flag in the seed (from the merge script) catches CSRs whose CRB license expired but doesn't catch the inverse — a CSR who left court employment to go freelance. To detect that, you'd need to re-check the court's directory periodically.
