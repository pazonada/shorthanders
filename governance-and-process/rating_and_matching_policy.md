# Rating system & matching algorithm policy

**Owner:** Aud & Rosie
**Last updated:** 2026-03-26
**Status:** Draft — confirmed in Rosie call 3/26

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

## Matching algorithm

### Tier 1: Favorites

Attorney's favorited CSRs get first right of refusal:
- **Standard jobs:** 24-hour exclusive window
- **Rush jobs:** 2-3 hour exclusive window
- If multiple favorites are available, offer to the one with highest composite score first

### Tier 2: Weighted lottery (post-pilot)

After favorites window expires:
- All CSRs above **3.5 composite score** enter the pool
- Higher-rated CSRs get more "tickets" (e.g., 4.8 = 3x chance vs 3.6)
- New CSRs get a provisional "benefit of the doubt" weighting until they have 10+ rated jobs
- Solves cold-start problem: new reporters still get work

### Overload protection

- Track each CSR's current workload (accepted jobs, pages due, upcoming live dates)
- Reduce weighting or remove from pool when they hit capacity
- CSRs can set their own max concurrent jobs and availability windows
- A 4.9-rated CSR juggling six transcripts shouldn't get a seventh

### Live attendance matching

Within a courthouse's service area, sort by:
1. Rating (composite score)
2. Current workload (lighter = preferred)
3. Proximity / travel time to courthouse

### Court-appointed CSR track

- Only in the general pool when they've explicitly marked themselves available for freelance work
- Slot in based on rating like anyone else when available

---

## Pilot phase algorithm (during 6-month pilot window)

**Keep it simple. No ratings in the matching algorithm during pilot.**

1. Favorites-first matching (attorneys indicate during onboarding which CSRs they've worked with)
2. Round-robin / availability-based matching for everything else
3. Collect ratings during pilot even though they don't affect matching — build the dataset from day one

### Transition to ratings-informed matching

| Phase | Timing | Algorithm change |
|-------|--------|-----------------|
| Pilot | Months 1-3 | Favorites + round-robin. Ratings collected but not used. |
| Phase 1 | Months 3-6 | Ratings as tiebreaker within tiers (two equal CSRs → higher-rated wins) |
| Phase 2 | Months 6+ (when avg CSR has 10+ rated jobs) | Full weighted lottery system |

---

## CSR retention during low-demand periods

If CSRs sign up but don't get jobs for a while:

- Regular email updates: "The platform is growing — here's our progress"
- Milestone notifications: "12 new law firms joined this month"
- Periodic survey for product feedback (part of pilot agreement)
- Goal: prevent churn before demand materializes
