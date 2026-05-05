# Rating system & matching algorithm policy

**Owner:** Aud & Rosie
**Last updated:** 2026-05-05
**Status:** v2 Draft — pending Rosie review of items tagged `[NEEDS ROSIE]`

---

## Changelog

- **v2 (2026-05-05):** Replaced sequential favorites + weighted-lottery model with a parallel-favorites + cascading batch-of-3 (then batch-of-10) model. Removed the 3.5-rating entry floor for the general pool. Added explicit invite lifecycle, cold-start fairness slot, live-job geographic pre-filter, and ops/lawyer escalation tiers.
- **v1 (2026-03-26):** Initial policy confirmed in Rosie call.

---

## Rating dimensions

Attorneys rate CSRs on three dimensions after each completed job:

1. **Communication / responsiveness** — How well did the CSR communicate during the job?
2. **Timeliness of delivery** — Was the transcript delivered on time?
3. **Transcript quality** — Was the transcript accurate and professionally formatted?

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

## Matching algorithm (v2)

### Design principles

- **Attorneys don't pick reporters at order time.** The cascade runs automatically. The 3-mode picker ("Match me with the best available" / "Choose from favorites" / "Choose from top-rated") is removed from the order flow.
- **Favorites get first crack, in parallel.** No ranking among favorites — first to accept wins.
- **The general pool fans out in small batches** so CSRs aren't drowning in invites and the system doesn't over-commit a job.
- **Cold-start fairness is built in.** New CSRs and lower-rated CSRs get rotated into batches even when top-rated CSRs are available, so they can build a track record and we don't ossify a leaderboard.
- **Geography matters for live, not for audio.** Live transcription is filtered to the courthouse's service radius before anything else; audio transcription has no geographic constraint.
- **Invites stay live until the job is claimed.** Earlier-batch CSRs who didn't respond aren't timed out when the pool widens — they can still accept until someone takes the job. When a CSR claims it, every still-live invitee is notified.

### SLA tiers (reference — codified in `legal_signoffs_tracker.md`)

| Tier | Deadline |
|---|---|
| Rush | 24-48h |
| Expedited | 3-5d |
| Standard | 2+ weeks |

For matching purposes, **"rush" = any order with a deadline < 48h**.

---

### Phase 1: Favorites round (parallel)

- The invite goes to **all favorites on the firm's account simultaneously** the moment the order is placed.
- The first favorite to accept wins. Everyone else gets a "this job has been claimed" notification.
- **Live jobs:** the favorites pool is **pre-filtered to favorites within the courthouse's service radius**. Out-of-region favorites are skipped for this phase. (Definition of "service radius" — see `[NEEDS ROSIE]` Q4 below.)
- **Audio jobs:** all favorites get the invite; no geographic filter.

**Window:**
| Order type | Phase 1 window |
|---|---|
| Standard / Expedited | 24 hours |
| Rush (< 48h deadline) | 2 hours |

If no favorite accepts (or the firm has no favorites, or no favorites are eligible for a live job), the cascade moves to Phase 2 immediately when the window closes — or earlier if every eligible favorite has explicitly declined.

---

### Phase 2: General pool — batches of 3

After the favorites round expires (or is skipped):

- Invite goes to **3 CSRs at a time** from the general pool.
- The first to accept wins. Other invitees in that batch (and any earlier-phase invitees still holding live invites) get a "claimed" notification.
- **Decline-fast:** if all 3 in a batch explicitly decline before the window closes, immediately fan out to the next batch — don't wait the full window.
- **Invite lifecycle:** invites do not auto-expire when the next batch goes out. A CSR invited in batch 1 can still accept after batch 2 ships, up until the job is claimed by someone else.
- **Live jobs:** the general pool is restricted to CSRs whose service radius covers the courthouse. (Same definition as Phase 1.)
- **Audio jobs:** no geographic filter; the entire active general pool is in scope.

**Window per batch:**
| Order type | Phase 2 window |
|---|---|
| Standard / Expedited | 24 hours |
| Rush (< 48h deadline) | 2 hours |

#### How a batch of 3 is selected

The candidate pool for a batch is **all active CSRs** (no minimum-rating gate). The selection mixes ranking with deliberate fairness:

- **2 slots — top of ranked list** by:
  1. Composite rating (recency-weighted)
  2. Lowest current workload (active accepted jobs / pages due / upcoming live dates)
  3. (Live only) shorter travel time to courthouse as tiebreaker
- **1 slot — fairness rotation** from one of:
  - New CSRs (fewer than 10 rated jobs — the existing "benefit of the doubt" provisional pool)
  - Mid-rated CSRs (composite below the platform median) who haven't been invited recently
  - Reserved so that **every batch contains at least one CSR who isn't already top-of-list**

`[NEEDS ROSIE]` — confirm the 2-of-3 / 1-of-3 split, or whether this should rotate based on supply (e.g., if there are no eligible new/mid CSRs, all 3 slots go to ranked list).

#### Overload protection (carried forward from v1)

- Track each CSR's current workload (accepted jobs, pages due, upcoming live dates).
- Reduce weighting or remove from candidate pool when they hit their declared capacity.
- CSRs set their own max concurrent jobs and availability windows.
- A 4.9-rated CSR juggling six transcripts shouldn't get a seventh.

---

### Phase 3: Acceleration after 48 hours

If 48 hours pass from order placement with no acceptance:

- Batch size steps up from **3 → 10** at a time.
- Window per batch tightens to **3 hours**.
- Same selection mix (top-of-ranked + fairness rotation, just scaled up — e.g., 7 ranked + 3 fairness — `[NEEDS ROSIE]` to confirm split at 10-batch size).
- Same invite-stays-live behavior.

---

### Phase 4: Escalation at 72 hours / near deadline

`[NEEDS ROSIE]` — full escalation matrix below is Aud's draft, awaiting confirmation.

| Trigger | Order type | Action |
|---|---|---|
| 72 hours from placement, no acceptance | Standard / Expedited | Notify Dewey Sholes ops; ops manually outreach / problem-solve |
| Approaching deadline (< 12h before deadline) with no acceptance | Rush / Expedited | Accelerate further (`[NEEDS ROSIE]` — bigger batch? all-call? define) **and** notify the attorney that we may not find a match in time and they should consider extending the deadline |
| Deadline reached, no acceptance | Any | Order auto-cancels; full refund; notify attorney with rebooking guidance |

---

### Live-attendance matching specifics

For live attendance jobs, **geography is the most important filter** and is applied before all other logic:

1. Define the courthouse's **service radius** — `[NEEDS ROSIE]` Q4 — options:
   - County match
   - Driving-distance cap (e.g., 30 miles, 60 minutes)
   - CSR-defined service area on the CSR profile (preferred — gives the CSR control)
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

`[NEEDS ROSIE]` — confirm whether ignored invites count toward overload metrics or fairness-rotation cooldown.

---

### Attorney-side UX

While the cascade runs, the attorney sees a **live status timeline** in the order detail view:

```
Order placed             ✓  Mar 12, 2:14 PM
Sent to your favorites   ✓  Mar 12, 2:14 PM (2 favorites notified)
Opened to general pool   …  Mar 13, 2:14 PM (no favorite accepted)
Assigned to Sarah Chen   →  pending
```

Each step shows who was invited (count, not names — except the eventual winner) and when. This makes the algorithm legible and gives the attorney signal if their job is at risk of not finding a match.

---

## Pilot phase algorithm (during 6-month pilot window)

**Keep it simple. No ratings in the matching algorithm during pilot.**

1. Phase 1: parallel favorites round, same as v2 (24h standard / 2h rush window).
2. Phase 2: round-robin / availability-based batches of 3 — no rating signal yet (we don't have enough data).
3. Phases 3-4 unchanged: same time-based escalation.
4. Geographic pre-filter for live jobs unchanged — geography matters from day one.
5. Collect ratings during pilot even though they don't affect matching — build the dataset from day one.

### Transition to ratings-informed matching

| Phase | Timing | Algorithm change |
|-------|--------|-----------------|
| Pilot | Months 1-3 | Favorites + round-robin batches. Ratings collected but not used in selection. |
| Phase 1 | Months 3-6 | Ratings used as tiebreaker within ranked-list slot. Fairness slot active from day one. |
| Phase 2 | Months 6+ (when avg CSR has 10+ rated jobs) | Full ranking + fairness model as described above. |

---

## CSR retention during low-demand periods

If CSRs sign up but don't get jobs for a while:

- Regular email updates: "The platform is growing — here's our progress"
- Milestone notifications: "12 new law firms joined this month"
- Periodic survey for product feedback (part of pilot agreement)
- Goal: prevent churn before demand materializes

---

## Open questions for Rosie

Tagged `[NEEDS ROSIE]` inline above. Consolidated:

1. **Fairness slot split** — confirm 2-of-3 ranked + 1-of-3 fairness in standard batches, and the analogous split (e.g., 7+3?) when batch scales to 10.
2. **Service radius definition for live jobs** — county / driving distance / CSR-defined service area? (Aud leans toward CSR-defined.)
3. **Phase 4 escalation specifics** — at what point do we ping ops vs. the attorney? What's the "ping a lot more people" mechanism for near-deadline rush jobs?
4. **Specialty / case-type filtering** — should the general pool be filtered by case-type fit (e.g., a CSR who's only worked civil isn't pinged for family-law), or is geography + availability sufficient? (Carried over from v1 conversation.)
5. **Ignored invites and CSR metrics** — do they count toward overload? toward a fairness-rotation cooldown so chronically unresponsive CSRs aren't repeatedly invited?
6. **Drop the 3.5 rating floor entirely?** v1 said "above 3.5 enters the pool." v2 currently drops the floor in favor of the fairness slot. Confirm.
