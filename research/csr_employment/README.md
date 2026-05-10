# CSR court-employment research

**Purpose:** Identify which CSRs in our research tracker are employed by California superior courts as staff reporters (vs freelance / pro tempore). Per `marketing_plan_phase1_csr_supply.md`, court-employed CSRs go into Phase 1B outreach with different messaging emphasizing side-income for occasional freelance work and a delivery rail for transcripts they've already produced from their court appearances.

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

## Coverage as of 2026-05-09

| Court | Status | Active Staff matched to seed | Notes |
|---|---|---|---|
| Sacramento Superior Court | ✓ done | 40 | Public staff directory at saccourt.ca.gov. 119 reporters total in source; 85 matched to active CRB licenses; 40 Active Staff confirmed. |
| LA Superior Court | not started | — | Searched; found Pro Tempore directory only. Staff list not obviously public. Needs deeper investigation. |
| SF Superior Court | not started | — | Confirmed no public staff directory. Page directs users to call the department clerk. Bay Area priority — would need a different approach (LinkedIn-based research, or a direct ask if relationships permit). |
| Santa Clara Superior Court | not started | — | Bay Area priority. Likely has a directory; needs investigation. |
| Alameda Superior Court | not started | — | Bay Area priority. |
| San Diego Superior Court | not started | — | Pro Tempore directory exists; staff list TBD. |
| Orange County Superior Court | not started | — | Pro Tempore directory exists; staff list TBD. |
| Riverside Superior Court | not started | — | Pro Tempore + Non-Staff directory found. Staff list separate. |
| San Bernardino Superior Court | not started | — | |
| Fresno Superior Court | not started | — | Court Reporter Directory exists; format TBD. |
| Other CA superior courts (50+ counties) | not started | — | Smaller courts; lower priority. |

**Progress:** 40 / ~2,300 estimated court-employed (per Rosie's "maybe half of 4,700" estimate). About 1.7% coverage. Sacramento was the easy case — most other courts will require more investigation, and SF in particular will likely need a different approach.

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
