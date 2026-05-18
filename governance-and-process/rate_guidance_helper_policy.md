# Rate-guidance helper policy

**Owner:** Aud
**Last updated:** 2026-05-18 (demoted from v1 to v1.1)
**Status:** **v1.1 spec.** The interactive helper is deferred from v1 because at launch we have zero reporter data, and even after the Bay Area pilot we'd have ~50–100 CSRs total. The cascade would fall back to "statewide" for most signups and the data wouldn't be honest. v1 ships static per-field microcopy ("Most CA reporters charge around $X – you set your rate") instead; the popover helper promotes to live when there are enough reporters in enough counties to make the regional data meaningful. **Trigger for promotion (proposed):** ≥ 20 CSRs in at least 3 counties with rates filled in.

This doc is the spec for v1.1. The prototype includes a preview implementation of the helper (Settings → Your rates, CSR view) labeled as a v1.1 preview – useful for stakeholder demos, not a v1 production feature.

The open-marketplace positioning (`research/marketing_strategy_master.md`) says we don't dictate what CSRs charge – they set their own rates and keep 100% of them. The rate-guidance helper is how we make that pitch credible without leaving new CSRs to guess. The platform looks at what comparable reporters in the same region are charging and surfaces median + range as a reference. The CSR makes the call.

---

## What the helper does

A small "Need help setting rates?" link sits next to each rate field in the CSR signup flow and in Settings → Your rates. Clicking it opens a popover with:

- The **median** rate among comparable reporters
- The **25th–75th percentile range** ("most reporters in your area charge $X–$Y")
- A **case-type filter** dropdown so reporters in micro-markets (workers' comp, criminal, family law) can see relevant data instead of a misleading general average
- A clear **scope label** that says exactly which sample we're showing ("Based on 6 reporters in Alameda County" or "Based on 3 in your county + 12 in adjacent counties")

The helper is informational only. It does not block, prefill, or penalize the CSR's choice. The CSR is free to set any rate inside or outside the range.

---

## Sample scope rules (the cascade)

Reporters in a CSR's own county are the most relevant comparison. But at v1 launch supply will be thin in most counties, so the helper widens the sample in a documented cascade rather than hiding.

| Stage | Rule | Label shown to user |
|---|---|---|
| 1 | If CSR's county has **≥ 5** comparable reporters (with at least one rate field set), use only those. | "Based on N reporters in [County] County" |
| 2 | If county sample is **< 5**, expand to include reporters in **adjacent counties** (geographic neighbors). | "Based on N reporters in [County] + adjacent counties (M of them in your county)" |
| 3 | If adjacent expansion still yields **< 5**, expand to **all of California**. | "Based on N reporters statewide. Your county doesn't have enough data yet." |
| 4 | If statewide sample is also **< 5** (first month of launch), show the **research baseline** loaded from `governance-and-process/rate_guidance_helper_policy.md#cold-start-baseline-values` and label it as such. | "Platform estimate based on industry research, no reporter data yet" |

### Why 5 as the minimum

Five is small enough that we don't hide the helper for months at launch but large enough that one outlier can't dominate the median + IQR. Revisit the threshold once we have actual data; if 5 still feels too small in practice (lots of high-variance samples), raise it.

### "Comparable" reporter definition

For the same rate-type field. A reporter who hasn't set a per-page rate doesn't count toward the per-page sample even if they have a half-day rate. This avoids the "we computed a median from one data point" pathology.

When the case-type filter is engaged, "comparable" further narrows to reporters who have the same case type checked in their preferences. If that narrowing drops the county sample below 5, the cascade widens (per the table above), still respecting the case-type filter.

---

## Statistic shown

**Median + 25th–75th percentile range.** Robust to outliers, communicates spread, doesn't over-specify.

We do **not** show:
- Mean (skewed by outliers in small samples)
- Min / max (an outlier on either end makes the range look intimidating; new CSRs need a reasonable target, not "anywhere from $2 to $20")
- Standard deviation (not legible to a CSR)

We round to typical billing units (nearest $0.25 for per-page rates; nearest $25 for day rates; nearest $5 for hourly travel).

---

## Per rate type

Each rate field has its own helper because reporters price each line item differently and the markets diverge:

- **Per-page rate** – original (and copy, where copy rates apply per CSR's stated practice)
- **Half-day live-attendance rate**
- **Full-day live-attendance rate**
- **Trial-day live-attendance rate**
- **Travel rate per hour**

The helper popover opens beside the specific field the CSR clicked. The case-type filter and scope label apply to the field in question.

---

## Case-type filter

Workers' comp pricing is a confirmed micro-market with its own rate structure (per `project_csr_rate_benchmarks.md` memory: Kristin Johns / NorCal FB data). Family law, criminal, civil, and probate are widely expected to diverge from each other too, though we don't have hard data yet. Without a case-type filter, a WC reporter sees the general median and thinks they're undercutting when they're actually pricing normally for their market.

Filter values in v1:

- **All case types** (default)
- **Family law**
- **Civil litigation**
- **Probate**
- **Criminal**
- **Workers' compensation** (treat as own micro-market – flag prominently when this is selected)
- **Personal injury**
- **Employment**

If the filter narrows the sample below the cascade thresholds, the cascade kicks in (county → adjacent → statewide), still respecting the filter.

---

## Cold-start baseline values

Used in stage 4 of the cascade only (when CA statewide has < 5 reporters in the relevant slice). Sourced from `project_rate_recalibration.md` (which says these are research-based, not statutory):

| Rate type | Baseline |
|---|---|
| Per-page (original) | $5.00 |
| Half-day live attendance | $1,050 |
| Full-day live attendance | $1,650 |
| Trial day | $2,310 |
| Travel rate per hour | $85 |

WC-specific bootstrap baselines (per Kristin Johns FB intel, NorCal): we have one data point and shouldn't generalize. When WC is selected during cold-start, show the general baseline with a callout: "We don't have enough workers' comp reporter data yet. WC pricing typically differs from general work – ask the WC community for current ranges."

When real data exceeds the cold-start threshold, the helper switches over automatically and stops showing baselines.

---

## Privacy and anonymization

The helper is statistics-only. It surfaces aggregates derived from a population. It does not show:

- Individual reporter names or license numbers
- The N value of the sample if the sample is small enough to identify individuals (we floor the displayed N at 5 – below that, the cascade has already widened)
- Any per-reporter rate data

The underlying data is each reporter's own rate inputs, which they've already chosen to publish on their profile (the platform shows the rate on each CSR's public profile per `governance-and-process/mvp_scope_v1.md`).

---

## Recomputation cadence

For v1, recompute the helper statistics **daily at 03:00 PT**, snapshot per county / rate-type / case-type triple. The popover reads from that snapshot.

We don't recompute on every page load because (a) the data doesn't change minute-to-minute, (b) the IQR calculation across the full reporter base is heavier than a single read, and (c) at scale the snapshot lets us cache the popover response. Daily is fine.

---

## When the helper is shown vs. hidden

**Shown:**

- CSR signup flow, rate-setting step (next to each rate field)
- Settings → Your rates (same placement as signup)

**Not shown:**

- Attorney-facing UI. Attorneys see each CSR's actual rate on the profile and at order time. They don't need the regional median.
- Public profile pages. Same reasoning.
- The order flow. Attorneys are picking a specific reporter, not setting a price.

---

## Open issues to revisit

1. **Threshold of 5.** Pure guess. Validate against real data once we have it. May need to scale by rate-type variance (per-page has tighter spread than trial-day, probably).
2. **County adjacency.** Build a simple adjacency map (each of 58 CA counties → list of neighbors). Static data; doesn't change. Can be derived from a CA county shapefile.
3. **WC bootstrap.** One data point is not a baseline. Decide whether to seed WC-specific values from CCRA / NCRA salary surveys before launch, or leave it on the cold-start callout until real WC reporters land.
4. **Helper for the audio-transcription SKU.** Page rates for post-ER audio transcription may differ from live attendance per-page rates (audio jobs likely command a different rate). Decide whether to track audio per-page as a separate rate field for this purpose. Defer; first see whether real CSRs price audio differently or just use their existing per-page rate.
5. **Slider UI.** The current prototype (`index.html` Settings → Your rates) still ships the deprecated hybrid ±20%/±50% band slider. v1 scope cut the hybrid band; rate-setting is supposed to be a simple input. The helper sits inside this UI – when we simplify the slider per `governance-and-process/mvp_scope_v1.md`, the helper placement should be revisited (it'll likely sit alongside a numeric input instead of a band slider).

---

## Related docs

- `governance-and-process/mvp_scope_v1.md` – CSR rate-setting UI scope
- `research/marketing_strategy_master.md` – open-marketplace positioning that this helper makes credible
- `research/ca_court_recording_county_tiers.md` – Tier A counties where we'll have early supply concentration (relevant for cascade behavior in practice)
- `governance-and-process/csr_account_procedures.md` – signup flow that this helper plugs into
- `project_rate_band_hybrid.md` memory – the rate-setting design history this helper replaces
- `project_rate_recalibration.md` memory – source of the cold-start baseline values
- `project_csr_rate_benchmarks.md` memory – WC micro-market intel
