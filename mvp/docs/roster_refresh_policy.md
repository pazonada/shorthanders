# Roster refresh & reconciliation (keeping the directory in sync with the CRB)

The directory is a mirror of the California CRB's licensed-CSR roster. That roster changes -
people get licensed, licenses lapse, reporters retire, contact info changes. Without a refresh
the directory silently drifts out of date. This spec is the quarterly reconciliation that keeps
it honest. Created 2026-07-21. **Backend work - not built yet; needs the data pipeline + DB.**

## Cadence

**Quarterly** by default (tie to when the CRB publishes updated data; pull more often if they do).
Each run pulls the latest full CRB roster and diffs it against what's on the site.

## The diff → four buckets

Compare the fresh CRB pull against current records by license number:

1. **New licensees** (in CRB, not on site) → add as **unclaimed public stubs** (name, license,
   city, county, method, expiration - the same public fields we already carry).
2. **Contact/info changes on UNCLAIMED records** (email, city, county, expiration changed) →
   update freely. Unclaimed = a mirror of the public record, so keep it current.
3. **Lapsed / expired / removed** (on site, now expired or gone from the CRB) → **freeze, don't
   delete** (see below).
4. **Unchanged** → leave alone.

## The rule that matters most: claimed vs unclaimed are handled differently

- **Unclaimed records are a mirror** - overwrite them with the latest public data every run.
- **Claimed profiles are owned by the reporter** - the bio, areas of law, services, rates,
  certifications, etc. are *their* self-entered data. **A refresh must NEVER overwrite a claimed
  profile's self-entered fields with roster data.** The only thing the refresh syncs onto a
  claimed profile is the underlying **license status** (active / expired) from the CRB.

## "Freeze," not delete

Expired ≠ gone forever. A lapse is often just a late renewal. So:

- **Never hard-delete** a record on expiry - especially a claimed one (deleting a paying/active
  reporter's profile over a renewal lag would be terrible, and they'd lose everything they built).
- Mark the record **`licenseStatus: expired`** (or `inactive`) and **hide it from default search**
  so firms don't book someone who isn't currently licensed. Keep the record; if they renew, it
  comes back automatically on the next refresh.
- **Retired is inferred, not a field.** The CRB shows active/expired, not "retired." Treat a
  license expired-and-not-renewed across several cycles as effectively retired - but that's a
  derived status, don't assert it as fact on the profile.

## Claimed profile whose license expires - the sensitive path

A claimed (possibly Pro-paying) reporter whose license lapses can't be shown as bookable, but we
also can't just yank their profile. Sequence:

1. On the refresh that catches the expiry, **notify the reporter** (email/in-app): your license
   shows expired in the CRB, renew to stay listed.
2. **Grace period** (length TBD - a decision, don't invent it) during which the profile stays up
   with a quiet "license renewal pending" state, not in default search.
3. If still expired after grace, **hide from the directory** but keep the account and data intact,
   so renewing restores it instantly.
4. **Pause billing** if they're on Pro while hidden - don't charge a reporter who isn't listed.

## Review before applying (audit trail)

Each run produces a **diff report** (added N, expired N, contact-changed N) for a human to eyeball
before it's applied - a bad CRB export or a format change shouldn't silently wipe or rewrite the
directory. Keep a log of what each refresh changed.

## Data freshness, shown

Because the directory is a public-record mirror, show **"Roster data as of <date>"** somewhere
(directory footer / about). It builds trust and sets expectations that a just-licensed reporter
might not appear until the next refresh.

## What the current prototype already has

- Every record carries an **`expiration`** date, and the profile shows a **License status** field.
  So "hide expired" could even be computed client-side today (filter records past expiration) -
  though the current snapshot is all-active (expirations 2026-27), so nothing is filtered yet.
- What's missing is the **pipeline**: fetching fresh CRB data on a schedule, diffing, applying the
  rules above, and the notify/grace/billing-pause logic (all backend).

## Open decisions (don't invent)

- **Grace-period length** for a claimed profile whose license lapsed.
- **Refresh frequency** - quarterly is the default; match it to the CRB's actual publish cadence.
- **"Retired" treatment** - how many expired cycles before we stop showing a stub at all.
- **Per-state:** other states' rosters refresh differently and may lack contact info entirely
  (see `state_expansion_checklist.md`) - this policy is CA-shaped; re-derive per state.
