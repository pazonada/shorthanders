# Rating system & matching algorithm policy

**Owner:** Aud & Rosie
**Last updated:** 2026-05-05
**Status:** v2 Draft – pending Rosie review of items tagged `[NEEDS ROSIE]`

---

## Changelog

- **v2.5 (2026-05-13):** Added specialty taxonomy detail to the "Self-declared with optional proof" capability bucket. Standardized controlled vocabulary of ~15 specialties drives matching; a separate free-text "Additional expertise" field on the profile handles niche / unusual expertise informationally without polluting the matching surface; a "Request a new specialty" pathway lets the controlled vocabulary evolve (5+ requests within 90 days → added to standard list). Documents why standardization is necessary given the auto-match design and how attorney-side niche needs are covered via "Notes for the reporter" and favorites.
- **v2.4 (2026-05-13):** Added explicit "CSR capabilities and job requirements" section defining what CSRs declare (credentials, specialties, equipment, operational settings), what attorneys specify in orders (jurisdiction, dates, realtime/interpreter/sealed needs), and the hard-filter vs. soft-preference matrix that governs which capability dimensions exclude a CSR from a pool vs. boost their ranking. Existing Phase 2 "specialty fit as soft preference" now references this section for the underlying definitions.
- **v2.3 (2026-05-05):** Added quick-reference cascade table and per-tier example timelines (Rush 24h, Expedited 5-day, Standard 7-day) at the top of the matching algorithm section.
- **v2.2 (2026-05-05):** Three SLA tiers (Rush / Expedited / Standard) explicitly mapped to per-tier response windows; flagged calculator-vs-legal-doc Standard-deadline discrepancy as `[NEEDS RECONCILE]`. Phase 4 auto-cancel moved from "deadline reached" to "12h before deadline" so the attorney has runway to rebook.
- **v2.1 (2026-05-05):** Rosie answers: specialty matching is a **soft preference** in ranking (not a hard filter); late-stage escalation is **all-call to everyone in the eligible pool** (not batches of 10). Phase 3 split into two sub-phases: **3a (48h–72h):** batches of 10 with 3h windows; **3b (72h+):** all-call to every eligible CSR. Phase 4 ops notification now sits at the same 72h trigger as 3b. Updated ranking logic and removed resolved items from open-questions list.
- **v2 (2026-05-05):** Replaced sequential favorites + weighted-lottery model with a parallel-favorites + cascading batch-of-3 model. Removed the 3.5-rating entry floor for the general pool. Added explicit invite lifecycle, cold-start fairness slot, live-job geographic pre-filter, and ops/lawyer escalation tiers.
- **v1 (2026-03-26):** Initial policy confirmed in Rosie call.

---

## Rating dimensions

Attorneys rate CSRs on three dimensions after each completed job:

1. **Communication / responsiveness** – How well did the CSR communicate during the job?
2. **Timeliness of delivery** – Was the transcript delivered on time?
3. **Transcript quality** – Was the transcript accurate and professionally formatted?

A **composite score** (weighted average of all three) is calculated for matching algorithm use.

---

## Rating visibility

| Audience | What they see |
|----------|---------------|
| **Attorneys** | Individual CSR's composite score, number of completed jobs |
| **CSRs** | Their own aggregate rating, updated monthly. "Your average this quarter is 4.2." No per-attorney attribution. |
| **Admin** | Full breakdown: per-job ratings, per-attorney patterns, comments |

**Rationale:** Hiding individual attributions from CSRs protects the working relationship, especially in smaller markets where the same people encounter each other repeatedly.

---

## Comments

- Attorneys can leave free-text comments after each job
- Comments are visible **only to Dewey Sholes admin**, not to CSRs
- Admin reviews comments, flags patterns, and surfaces sanitized feedback when appropriate
- Admin monitors for abusive/vindictive commenting patterns and discounts those attorneys' influence

---

## Anti-manipulation safeguards

- **Trimmed mean:** Throw out the highest and lowest rating each quarter
- **Outlier detection:** If an attorney's ratings consistently diverge from consensus (e.g., rates everyone 1 star), algorithmically reduce that attorney's weight on composite scores
- **Recency weighting:** Recent ratings carry more weight than old ones
- **Volume weighting:** A CSR with 50 ratings is more stable than one with 3

---

## CSR capabilities and job requirements

The matching algorithm relies on two structured data sets: what CSRs *can* do (capabilities) and what each order *needs* (requirements). This section defines both, along with how they map onto the hard-filter vs. soft-preference distinction the cascade uses.

### CSR capability dimensions

CSRs declare their capabilities during onboarding and can edit them anytime in profile settings. Capabilities fall into four buckets:

**1. Verified credentials** – DS verifies via external source.

| Credential | What it is | How DS verifies |
|---|---|---|
| CRB license | Active CA Court Reporters Board certification | Auto-checked against CRB database on signup and periodically thereafter. Required to participate. |
| RPR | NCRA Registered Professional Reporter | Verified via NCRA member directory lookup or CSR-uploaded certificate |
| RMR | NCRA Registered Merit Reporter (advanced) | Same as RPR |
| CRR | NCRA Certified Realtime Reporter | Same as RPR. Required to accept jobs that need realtime feed. |
| CRC | NCRA Certified Realtime Captioner | Same as RPR. Required for CART/captioning work if DS ever supports it. |

**2. Self-declared with optional proof** – CSR checks a box, optionally uploads supporting evidence. Profile shows "self-declared" until proof is attached, then shows "verified."

Self-declared capabilities are split into two structurally distinct fields: a **standardized controlled vocabulary** (drives matching) and a **free-text "additional expertise" field** (informational, doesn't drive matching).

##### Standardized specialties – controlled vocabulary (drives matching)

The matching algorithm operates on a fixed set of specialties to keep filtering and ranking precise. CSRs multi-select from this list during onboarding and can edit anytime.

| Category | Standardized values |
|---|---|
| Subject-matter specialty | Medical / Expert, Technical / Engineering, Intellectual Property / Patent, Financial / Securities, Government / Military, Construction Defect, Employment, Family Law, Probate, Workers Compensation, Criminal |
| Job-type comfort | Interpreted proceedings (with language pairs declared from a controlled language list), Sealed / Confidential matters, Multi-party arbitrations, Trials (jury / non-jury) |
| Equipment | Realtime feed capable, Video synchronization capable, In-person reporting, Remote/Zoom reporting only |

The starting list above is **~15 standardized specialties** plus language pairs plus equipment flags. Limited intentionally – every additional specialty is one more dimension the matching algorithm has to reason about, and a list that's too long becomes noise. Better to start tight and expand based on real demand (see "Request a new specialty" below).

##### Free-text "additional expertise" field (informational only)

A separate single text field on the CSR profile (500 character cap). Doesn't drive auto-matching. Used for:

- Niche expertise that doesn't fit the standardized list (maritime / admiralty, veterinary expert testimony, agricultural disputes, specific scientific domains)
- Unusual language fluency that isn't on the controlled list
- Court-specific experience ("frequent appearances in Marin Superior Family Law dept.")
- Equipment quirks or preferences ("Stenograph Luminex II, prefer two-screen setup")

Surfaced on the public profile so attorneys reviewing an auto-matched CSR get richer trust signal. Keyword-searchable by admin for occasional manual surfacing on unusual jobs. **Not used by the algorithm itself**; the auto-match cascade only looks at the standardized fields.

##### "Request a new specialty" pathway

If a CSR thinks their niche should be a standardized specialty, they can submit a request from their profile. Admin reviews monthly.

**Rule of thumb:** if 5+ CSRs request the same specialty within a rolling 90-day window, it gets added to the standardized list. This way the controlled vocabulary evolves with actual supply patterns rather than being frozen at launch.

Side benefit: a flood of requests for a single specialty is a market signal. Eight requests for "Maritime / Admiralty" in a quarter means there's a CSR community we should be marketing to that we're currently missing.

##### Why standardize at all (rationale for the controlled vocabulary)

The auto-match decision already settled (per v2 design principle: attorneys don't browse CSRs at order time). Auto-matching only works if the algorithm has clean, structured data to filter and rank on. Free-form specialties would fragment the supply pool – a "Medical malpractice" CSR and a "Med-Mal" CSR look identical to a human but require fuzzy matching or human normalization to combine algorithmically.

The free-text "additional expertise" field handles every realistic edge case (niche specialties, unusual languages, court-specific experience) without polluting the matching surface. The "request new specialty" pathway prevents the controlled list from going stale.

##### Attorney-side handling of niche needs

The attorney never browses CSRs (auto-match remains default). For one-off niche needs not covered by the standardized list, two existing mechanisms apply:

1. **"Notes for the reporter" field on the order** (already in scope). Attorney writes "expert is a marine biologist; familiarity with cetacean terminology preferred." Invited CSRs see this in the invite card and self-select.
2. **Favorites flow** (already in scope). If the attorney has a working relationship with a specific CSR for unusual work, they favorite that CSR – Phase 1 of the cascade prioritizes favorites before the general pool.

Between standardized specialties for matching, free-text "additional expertise" for trust signal on the profile, "Notes for the reporter" for one-off needs, and favorites for relationship continuity, every realistic scenario is covered without making the attorney browse.

**3. Operational settings** – CSR-controlled, not verified.

| Setting | Default | Range |
|---|---|---|
| Service radius (live jobs) | CSR-defined | County list, driving-distance cap, or specific courthouse list |
| Max concurrent jobs | 5 | 1–20 |
| Availability windows | Weekdays 8a–6p | CSR sets weekly schedule |
| Job-type preferences | Live + audio | Either or both |
| After-hours / weekend opt-in | Off | On/off toggle, optionally with surcharge multiplier |
| Rate adjustments | 0% from default | ±20% (per AB-5 rate-setting band) |

**4. Track record** – computed from completed-job history, not declared.

- Composite rating (1–5, recency-weighted)
- On-time delivery rate (% of transcripts delivered by deadline)
- Completed-job count (lifetime and last 90 days)
- Specialty job count (per specialty category – surfaces actual experience independent of self-declaration)

### Job requirement dimensions

When an attorney places an order, the order captures requirements in two layers. Most are auto-populated from court / case selection at booking time.

**Required (drive hard filters):**

| Field | Notes |
|---|---|
| Jurisdiction / courthouse | Drives service-radius filter for live jobs |
| Date and time | Drives availability conflict checking |
| Job type | Court hearing (live) / Audio transcription |
| Realtime feed needed? | If yes, only CRR-certified CSRs eligible |
| Interpreted? | If yes, language must match a language declared by the CSR |
| Confidential / sealed designation | If yes, only CSRs who opted into sealed work |
| Witness no-show coverage (CNA) | Standard for all jobs; not a filter |

**Preferred (drive soft signals in ranking):**

| Field | Notes |
|---|---|
| Case type / subject matter | Boosts CSRs with matching specialty |
| Witness type (expert, technical, treating physician, etc.) | Boosts specialists |
| Expected duration (half / full / trial day) | Drives attendance fee tier, not eligibility |
| Turnaround tier (rush / expedited / standard) | Drives SLA + price multiplier; doesn't filter CSRs |
| Firm's prior CSR (favorite) | Routes to Phase 1 favorites round |

---

## Capability matching: hard filters vs. soft preferences

The cascade applies hard filters first to define the eligible pool, then uses soft preferences to rank within that pool.

### Hard filters (CSR excluded from pool if missing)

A CSR who fails any hard filter never sees the invite. Hard filters are non-negotiable because they reflect either legal requirement, declared capability gaps, or scheduling conflicts.

| Filter | Applies to | Notes |
|---|---|---|
| Active CRB license | All jobs | Verified at signup and on a recurring sync – see [csr_license_sync.md](agent-actions/csr_license_sync.md) |
| Service radius covers courthouse | Live jobs only | Audio jobs have no geographic filter |
| CRR certification | Jobs requiring realtime feed | Self-declared without CRR is insufficient – must hold the cert |
| Declared language match | Interpreted jobs | E.g., a Mandarin interpreted depo requires the CSR to have declared Mandarin |
| Sealed-work opt-in | Sealed / confidential jobs | CSRs explicitly opt into sealed work; not a default |
| Calendar availability | All live jobs | No conflicting accepted job in the requested window |
| Workload below declared max | All jobs | CSR's `max concurrent jobs` setting honored |

### Soft preferences (boost ranking, don't exclude)

Within the eligible pool, the algorithm boosts CSRs whose capabilities align well with the job. None of these excludes a CSR – they just affect order in the ranked-slot fill.

| Signal | How it weighs | Notes |
|---|---|---|
| Specialty match | Significant boost | Per Rosie (2026-05-05): soft preference, not hard filter. A non-specialist remains eligible if highly rated and lightly loaded. |
| RPR / RMR / CRR / CRC certification | Modest boost | General signal of professional competence beyond CRB license |
| Composite rating (recency-weighted) | Significant boost | See Phase 2 ranking logic |
| Past completion of similar specialty jobs | Modest boost | Computed from track-record dimension – actual experience often beats self-declared experience |
| Low current workload | Modest boost | Already in v1 ranking logic |
| Short travel time to courthouse (live only) | Tiebreaker | Geography already filtered hard; travel time is a finer-grained preference within radius |

### Fairness slot is exempt from soft preferences

Per Rosie (2026-05-05) and confirmed in Phase 2 selection logic: the fairness slot in each batch (1 of 3 in Phase 2, 3 of 10 in Phase 3a) does **not** apply soft preferences. The goal is to give cold-start CSRs visibility even on jobs whose specialty they haven't built up yet. A new CSR without Medical specialty can still be invited on a medical-witness depo through the fairness slot.

Hard filters still apply to fairness-slot CSRs – a CSR can't accept a job they're legally or operationally not equipped for (e.g., no CRR cert → can't take a realtime job, even via fairness rotation).

### What's surfaced to the attorney

The order detail view (described under "Attorney-side UX" below) shows which capabilities matched and which were near-misses. Sample:

```
Sarah Chen
✓ License verified (CRB)
✓ RPR + CRR certified (NCRA)
✓ Medical/Expert specialty – 23 prior medical depos completed
✓ Available in your courthouse's radius
4.9★ · 142 jobs · 99% on-time
```

This makes the match legible: the attorney sees *why* this CSR was selected, not just "the algorithm picked her."

`[NEEDS ROSIE]` – confirm whether soft-preference boost should be visible to CSRs too ("this job matches your Medical specialty"). Aud leans toward yes – helps CSRs decide whether to accept.

---

## Matching algorithm (v2)

### Design principles

- **Attorneys don't pick reporters at order time.** The cascade runs automatically. The 3-mode picker ("Match me with the best available" / "Choose from favorites" / "Choose from top-rated") is removed from the order flow.
- **Favorites get first crack, in parallel.** No ranking among favorites – first to accept wins.
- **The general pool fans out in small batches** so CSRs aren't drowning in invites and the system doesn't over-commit a job.
- **Cold-start fairness is built in.** New CSRs and lower-rated CSRs get rotated into batches even when top-rated CSRs are available, so they can build a track record and we don't ossify a leaderboard.
- **Geography matters for live, not for audio.** Live transcription is filtered to the courthouse's service radius before anything else; audio transcription has no geographic constraint.
- **Invites stay live until the job is claimed.** Earlier-batch CSRs who didn't respond aren't timed out when the pool widens – they can still accept until someone takes the job. When a CSR claims it, every still-live invitee is notified.

### Quick reference: the cascade at a glance

| Phase | Trigger | Who gets invited | Pool size per fan-out | CSR response window | Advances when… |
|---|---|---|---|---|---|
| **1: Favorites** | Order placed | All firm favorites in parallel *(live: in-radius favorites only)* | Everyone at once | Rush **2h** / Exp **12h** / Std **24h** | A favorite accepts (done), all decline (advance early), or window expires |
| **2: General pool batches** | Phase 1 ends, no acceptance | Top of ranked list + 1 fairness slot *(live: in-radius only)* | **3 at a time** | Rush **2h** / Exp **12h** / Std **24h** | Someone accepts, all 3 decline (advance early), or window expires → next batch of 3 |
| **3a: Acceleration** | 48h from placement, no acceptance | Same mix, scaled up – 7 ranked + 3 fairness | **10 at a time** | **3h** (all tiers) | Someone accepts, all 10 decline, or window expires → next batch of 10 |
| **3b: All-call** | 72h from placement, no acceptance | Every eligible CSR in active pool *(live: all in-radius CSRs)* | Everyone at once | No per-CSR window – invite stays live | Someone accepts, or auto-cancel fires |
| **4: Auto-cancel** | 12h before order deadline, no acceptance | – | – | – | Order cancels, full refund, all live invites close, attorney notified |

### Example timelines

```
Rush job, 24h deadline:

  Hour  0 ─ Order placed                   Phase 1 starts (favorites, 2h window)
  Hour  2 ─ No favorite → Phase 2 (batches of 3, 2h each)
  Hour  4 ─ Batch 2 of 3
  Hour  6 ─ Batch 3 of 3
  …
  Hour 12 ─ AUTO-CANCEL (12h before deadline)
            Phase 3a/3b never fired.
```

```
Expedited job, 5-day (120h) deadline:

  Hour   0 ─ Order placed                  Phase 1 (favorites, 12h)
  Hour  12 ─ Phase 2 starts (batches of 3, 12h each)
  Hour  48 ─ Phase 3a (batches of 10, 3h each)
  Hour  72 ─ Phase 3b: ALL-CALL + ops notified
  Hour 108 ─ AUTO-CANCEL (12h before deadline)
```

```
Standard job, 7-day (168h) deadline:

  Hour   0 ─ Order placed                  Phase 1 (favorites, 24h)
  Hour  24 ─ Phase 2 starts (batches of 3, 24h each)
  Hour  48 ─ Phase 3a (batches of 10, 3h each)
  Hour  72 ─ Phase 3b: ALL-CALL + ops notified
  Hour 156 ─ AUTO-CANCEL (12h before deadline)
```

**Edge case:** a 3-day Expedited job (72h deadline) auto-cancels at hour 60 – Phase 3b never fires because 12h-pre-deadline arrives before the 72h Phase 3b trigger.

### SLA tiers

Three tiers, surfaced in the homepage cost estimator:

| Tier | Deadline | Price multiplier |
|---|---|---|
| **Rush** | 1-2 biz days | 1.5× |
| **Expedited** | 3-5 biz days | 1.0× |
| **Standard** | 6+ biz days | 0.85× |

`[NEEDS RECONCILE]` – `legal_signoffs_tracker.md` v1 lists Standard as "2+ weeks." The user-facing calculator says "6+ biz days." Treating the calculator (user-facing) as authoritative here; flag for the legal-doc owner to align.

The matching cascade respects all three tiers – see "Per-tier response windows" below. The label "rush" elsewhere in this doc means specifically the Rush tier (1-2 biz days), not just "any short deadline."

### Per-tier CSR response windows

These windows define **how long an invited CSR has to accept a job** before the cascade moves on. They apply identically to Phase 1 (favorites round) and Phase 2 (general-pool batches of 3). Tiered so we don't burn a 24h favorites window on a Rush job that's due tomorrow.

| Tier | CSR response window (Phase 1 & Phase 2) |
|---|---|
| Rush (1-2 biz days) | **2 hours** |
| Expedited (3-5 biz days) | **12 hours** `[NEEDS ROSIE]` – proposed; v1 grouped Expedited with Standard at 24h |
| Standard (6+ biz days) | **24 hours** |

Phase 3a (batches of 10, after 48h) uses a **fixed 3h response window** across all tiers – it's not tier-dependent. Phase 3b (after 72h) is an all-call with no per-CSR window; it stays open until someone accepts or until the 12h-pre-deadline auto-cancel fires.

---

### Phase 1: Favorites round (parallel)

- The invite goes to **all favorites on the firm's account simultaneously** the moment the order is placed.
- The first favorite to accept wins. Everyone else gets a "this job has been claimed" notification.
- **Live jobs:** the favorites pool is **pre-filtered to favorites within the courthouse's service radius**. Out-of-region favorites are skipped for this phase. (Definition of "service radius" – see `[NEEDS ROSIE]` Q4 below.)
- **Audio jobs:** all favorites get the invite; no geographic filter.
- **Window:** see "Per-tier response windows" table above.

If no favorite accepts (or the firm has no favorites, or no favorites are eligible for a live job), the cascade moves to Phase 2 immediately when the window closes – or earlier if every eligible favorite has explicitly declined.

---

### Phase 2: General pool – batches of 3

After the favorites round expires (or is skipped):

- Invite goes to **3 CSRs at a time** from the general pool.
- The first to accept wins. Other invitees in that batch (and any earlier-phase invitees still holding live invites) get a "claimed" notification.
- **Decline-fast:** if all 3 in a batch explicitly decline before the window closes, immediately fan out to the next batch – don't wait the full window.
- **Invite lifecycle:** invites do not auto-expire when the next batch goes out. A CSR invited in batch 1 can still accept after batch 2 ships, up until the job is claimed by someone else.
- **Live jobs:** the general pool is restricted to CSRs whose service radius covers the courthouse. (Same definition as Phase 1.)
- **Audio jobs:** no geographic filter; the entire active general pool is in scope.
- **Window per batch:** see "Per-tier response windows" table above.

#### How a batch of 3 is selected

The candidate pool for a batch is **all active CSRs who pass the job's hard filters** (see "Capability matching: hard filters vs. soft preferences" above). No minimum-rating gate is applied. The selection mixes ranking with deliberate fairness:

- **2 slots – top of ranked list** by:
  1. **Case-type / specialty fit** (soft preference, defined under "Soft preferences" above) – CSRs whose declared specialties or completed-job history overlap with the order's case type rank ahead of CSRs without that experience. Specialty fit is a tiebreak/boost, not a hard filter – a non-specialist still ranks fine if they're high-rated and lightly loaded.
  2. Composite rating (recency-weighted)
  3. Lowest current workload (active accepted jobs / pages due / upcoming live dates)
  4. (Live only) shorter travel time to courthouse as tiebreaker
- **1 slot – fairness rotation** from one of:
  - New CSRs (fewer than 10 rated jobs – the existing "benefit of the doubt" provisional pool)
  - Mid-rated CSRs (composite below the platform median) who haven't been invited recently
  - Reserved so that **every batch contains at least one CSR who isn't already top-of-list**
  - Fairness slot does **not** apply specialty filter – the goal is to give cold-start CSRs exposure regardless of case type.

`[NEEDS ROSIE]` – confirm the 2-of-3 / 1-of-3 split, or whether this should rotate based on supply (e.g., if there are no eligible new/mid CSRs, all 3 slots go to ranked list).

#### Overload protection (carried forward from v1)

- Track each CSR's current workload (accepted jobs, pages due, upcoming live dates).
- Reduce weighting or remove from candidate pool when they hit their declared capacity.
- CSRs set their own max concurrent jobs and availability windows.
- A 4.9-rated CSR juggling six transcripts shouldn't get a seventh.

---

### Phase 3a: Acceleration after 48 hours (batches of 10)

If 48 hours pass from order placement with no acceptance:

- Batch size steps up from **3 → 10** at a time.
- Response window per batch tightens to **3 hours**.
- Same selection mix applies, scaled up: **7 ranked + 3 fairness** (`[NEEDS ROSIE]` to confirm split at batch-of-10 size).
- Same invite-stays-live behavior – earlier-batch invitees can still accept.

### Phase 3b: All-call after 72 hours

If 72 hours pass from order placement with still no acceptance, the cascade gives up on batching and **opens the invite to every eligible CSR in the active pool, in parallel**.

- **Audio jobs:** "every eligible CSR" = the entire active general pool (no geographic filter).
- **Live jobs:** "every eligible CSR" = every active CSR whose service radius covers the courthouse. (Out-of-radius CSRs are still excluded – geography never relaxes for live work.)
- First-accept wins; everyone else gets the "claimed" notification.
- All previously-invited CSRs (Phase 1 favorites, every Phase 2 batch, every Phase 3a batch) keep their live invites – they're now alongside the all-call pool, not replaced by it.
- **Rationale (Rosie, 2026-05-05):** at this point the work is hard to fill and we should stop trying to be clever about who sees the invite – just open it up.

---

### Phase 4: Human escalation & auto-cancel

`[NEEDS ROSIE]` – thresholds below are Aud's draft, partially confirmed.

| Trigger | Order type | Action |
|---|---|---|
| 72 hours from placement, no acceptance | Standard / Expedited | Phase 3b all-call begins **and** Dewey Sholes ops is notified to manually outreach / problem-solve. |
| **12 hours before deadline, no acceptance** | **Any** | **Auto-cancel + full refund.** Notify the attorney that no CSR accepted, the refund has been issued, and they can either re-place the order with an extended deadline (which restarts the cascade) or work with another provider. All live invites are closed at this moment. |

Auto-cancelling at the 12h-before-deadline mark – instead of waiting for the deadline itself – gives the attorney runway to rebook. We don't leave them hanging until the moment of failure.

For a Rush job (1-2 biz days), the 12h-before-deadline mark may fall before Phase 3a's 48h trigger, in which case the cascade auto-cancels straight from Phase 2 without ever reaching Phase 3.

---

### Live-attendance matching specifics

For live attendance jobs, **geography is the most important filter** and is applied before all other logic:

1. Define the courthouse's **service radius** – `[NEEDS ROSIE]` Q4 – options:
   - County match
   - Driving-distance cap (e.g., 30 miles, 60 minutes)
   - CSR-defined service area on the CSR profile (preferred – gives the CSR control)
2. **Phase 1** offers to firm favorites *who fall inside that radius* (in parallel).
3. If no in-radius favorites accept, **Phase 2** opens to all in-radius CSRs (batches of 3).
4. Within in-radius candidates, ranking applies as usual (rating → workload → travel time as tiebreaker).
5. Out-of-radius CSRs (favorites or otherwise) **are not invited for live jobs**, even if Phase 3/4 escalates.

### Audio-transcription matching specifics

For audio (post-hearing) transcription, **no geographic filter applies**. The entire active general pool is in scope from Phase 2 onward.

### Court-appointed CSR track

- Only in the general pool when they've explicitly marked themselves available for freelance work.
- Slot in based on rating like anyone else when available.

---

### Notifications & invite lifecycle

- **Invite sent:** push notification + in-app job card with deadline, earnings, court info, deadline-to-respond clock.
- **Invite still live:** the CSR can accept any time until the job is claimed by someone else, even after their batch's response window closes and the cascade has moved on.
- **Job claimed:** every still-live invitee gets a "this job has been claimed by another CSR" notification. Their invite is closed.
- **Decline:** CSR can decline explicitly (counts toward the decline-fast trigger for their batch).
- **Ignore:** CSR doesn't respond before window expires; their invite stays live, they don't count toward the decline-fast trigger.

`[NEEDS ROSIE]` – confirm whether ignored invites count toward overload metrics or fairness-rotation cooldown.

---

### Attorney-side UX

While the cascade runs, the attorney sees a **live status timeline** in the order detail view:

```
Order placed             ✓  Mar 12, 2:14 PM
Sent to your favorites   ✓  Mar 12, 2:14 PM (2 favorites notified)
Opened to general pool   …  Mar 13, 2:14 PM (no favorite accepted)
Assigned to Sarah Chen   →  pending
```

Each step shows who was invited (count, not names – except the eventual winner) and when. This makes the algorithm legible and gives the attorney signal if their job is at risk of not finding a match.

---

## Discovery & promotion (separate from matching)

Surfaces where attorneys *encounter* CSRs outside of the auto-match cascade. Per Rosie 2026-05-13: "We could also do that thing where we feature a reporter on your page like targeted ads so it gives them some exposure."

This is a deliberate concept separation. **Auto-match** assigns CSRs to specific jobs based on capability + ranking + fairness. **Discovery** is everything that puts CSRs in front of attorneys at moments when no specific job is being placed – homepage, favorites discovery, email digests, specialty pages, post-match "similar CSRs" suggestions.

### The hard rule that makes this safe

**Discovery placement does NOT affect auto-match ranking, ever.** The cascade still selects CSRs purely on capability, rating, workload, fairness, and geography. Featured CSRs do not jump the queue on actual bookings.

What featured placement *does* affect is what attorneys see at moments of **browsing-with-intent**, primarily for building favorites. A favorited CSR then enters Phase 1 of the cascade for that firm – which is the most powerful effect of featured visibility, but it's an indirect one mediated by attorney choice.

Without this rule, paid-or-promoted placement degenerates into "pay to win at matching" – the failure mode that breaks marketplace trust. With this rule, featured placement is a discovery / relationship-building tool that respects the matching algorithm's integrity.

### Surfaces where featured CSRs could appear

| Surface | What attorneys see | Why featured placement makes sense here |
|---|---|---|
| Attorney dashboard / homepage | Rotating "Featured CSR" card | High-traffic surface; light-touch exposure |
| Favorites discovery page | Grid/list of CSRs the firm could favorite | Browsing-with-intent surface; favorites feed Phase 1 of cascade |
| Email digests | Weekly/monthly "New CSRs in your area" + spotlights | Long-form discovery outside the app |
| Post-match CSR profile | "Other CSRs you might want to favorite" similar-to | Captures attention when attorney is already evaluating a CSR |
| Specialty / county pages | Featured Family Law CSRs, Featured Bay Area CSRs, etc. | Targeted by attorney's known interests |

### Models to consider (not yet decided)

Three structurally different approaches; we can use one, two, or all three at different surfaces.

| Model | Who controls placement | Revenue to DS | Best fit |
|---|---|---|---|
| **Free editorial rotation** | DS staff curates | None | Community-building, cold-start visibility for new CSRs, pre-launch readiness |
| **Earned badges** | Algorithm picks based on rating, on-time rate, etc. | None | Quality signal; rewards good behavior; aligns with marketplace meritocracy |
| **Paid promotion** | CSR pays for placement (monthly fee, per-impression, or per-favorite-conversion) | Recurring revenue line beyond listing fee + buyer fee | Year 2+ once we have data on attorney browse behavior |

**Working assumption for launch:** start with free editorial rotation + earned badges. Both can launch with minimal additional product surface. Defer the paid-promotion design to Year 2 after we see how attorneys actually use the discovery surfaces during the launch window.

### Why this is a real strategic lever (not just a feature)

Three reasons it matters more than it looks:

1. **Cold-start visibility for new CSRs.** A CSR with zero ratings can't compete in auto-match ranking (the fairness slot helps slowly). Featured placement on browsing surfaces lets new CSRs build favorites, which then surface them in Phase 1 of future cascades. It's the supply-side onboarding ramp.
2. **Second revenue line.** Buyer fee + listing fee are the only current revenue sources. A paid-promotion tier – even priced modestly – compounds as the platform grows and reduces dependence on per-transaction take rate.
3. **AB 5 posture.** "CSRs control their own marketing on the platform" is one more factor supporting the independent-contractor classification under § 2778. CSRs who pay to promote themselves are behaving like independent professionals running their own books.

### Launch status

**Not in V1.** Launches without featured-CSR surfaces. We add discovery features post-launch once we know:

- Whether attorneys actually browse CSRs outside the cascade (favorites and post-match profile views are the proxies to watch)
- Which surfaces drive favoriting behavior (informs where featured placement is worth investing)
- Whether CSRs would pay for promotion (CSR user testing question, can be added to the existing interview script)

The matching policy reflects this concept now so we don't accidentally design the matching cascade in a way that conflicts with discovery later.

---

## Launch-window matching algorithm (during 6-month launch window window)

**Keep it simple. No ratings in the matching algorithm during the launch window.**

1. Phase 1: parallel favorites round, same as v2 (24h standard / 2h rush window).
2. Phase 2: round-robin / availability-based batches of 3 – no rating signal yet (we don't have enough data).
3. Phases 3-4 unchanged: same time-based escalation.
4. Geographic pre-filter for live jobs unchanged – geography matters from day one.
5. Collect ratings during the launch window even though they don't affect matching – build the dataset from day one.

### Transition to ratings-informed matching

| Phase | Timing | Algorithm change |
|-------|--------|-----------------|
| Launch | Months 1-3 | Favorites + round-robin batches. Ratings collected but not used in selection. |
| Phase 1 | Months 3-6 | Ratings used as tiebreaker within ranked-list slot. Fairness slot active from day one. |
| Phase 2 | Months 6+ (when avg CSR has 10+ rated jobs) | Full ranking + fairness model as described above. |

---

## CSR retention during low-demand periods

If CSRs sign up but don't get jobs for a while:

- Regular email updates: "The platform is growing – here's our progress"
- Milestone notifications: "12 new law firms joined this month"
- Periodic survey for product feedback (part of launch-window agreement)
- Goal: prevent churn before demand materializes

---

## Open questions for Rosie

Tagged `[NEEDS ROSIE]` inline above. Consolidated:

1. **Fairness slot split** – confirm 2-of-3 ranked + 1-of-3 fairness in standard (Phase 2) batches and the analog 7-of-10 ranked + 3-of-10 fairness for Phase 3a batches.
2. **Service radius definition for live jobs** – county / driving distance / CSR-defined service area? (Aud leans toward CSR-defined.)
3. **Phase 4 thresholds** – Phase 3 all-call is confirmed (Rosie 2026-05-05). Auto-cancel at 12h-before-deadline confirmed by Aud (2026-05-05). Still need Rosie's sign-off on: (a) ops-notification at 72h for std/ext, (b) the per-tier response windows in the table above (Rush 2h / Expedited 12h proposed / Standard 24h).
4. **Ignored invites and CSR metrics** – do they count toward overload? toward a fairness-rotation cooldown so chronically unresponsive CSRs aren't repeatedly invited?
5. **Drop the 3.5 rating floor entirely?** v1 said "above 3.5 enters the pool." v2 currently drops the floor in favor of the fairness slot. Confirm.
6. **Capability surface to CSRs** (added 2026-05-13) – when an invite is sent, should the in-app job card show the CSR which of their declared specialties matched the job ("This job matches your Medical specialty")? Aud leans toward yes – gives CSRs information to decide whether to accept and reinforces the value of declaring specialties accurately.
7. **Specialty self-declaration verification path** (added 2026-05-13) – for specialties without an NCRA equivalent (Medical, Technical, IP, etc.), is a soft "view supporting evidence" link sufficient (CSR uploads sample/credentials, no DS verification), or do we need light admin review? Aud leans toward the upload-and-display-only model with bad actors caught via job ratings.
8. **Starting specialty list** (added 2026-05-13) – confirm the ~15 standardized specialties listed under "Self-declared with optional proof." Anything missing that's high-frequency in CA hearing/arbitration work and worth shipping in V1? Anything on the list that's so rare it should start in the free-text field rather than the controlled vocabulary?
9. **Specialty-request threshold** (added 2026-05-13) – proposed: 5+ requests within 90 days promotes a free-text specialty into the controlled vocabulary. Confirm the threshold or adjust based on Rosie's read of CA-market niche-specialty frequency.

### Resolved (2026-05-05)

- ~~**Specialty / case-type filtering**~~ → Soft preference / ranking boost, not a hard filter. CSRs with relevant case-type experience rank ahead of those without; non-specialists still eligible.
- ~~**"Ping a lot more people" for near-deadline / can't-find-a-match"**~~ → Two-stage escalation: **48h–72h** = batches of 10 with 3h windows; **72h+** = all-call to every eligible CSR (audio = entire pool; live = everyone in service radius).
