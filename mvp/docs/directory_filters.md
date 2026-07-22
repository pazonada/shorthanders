# Directory search & filters

Decisions and open work for the directory sidebar. Last updated 2026-07-21.

## Settled 2026-07-21

- **Experience** offers "Under 5 years" plus the 5/10/15/20+ bands. "Under 5" matches only
  profiles that state a number below 5; unclaimed records have no experience value, so they are
  excluded rather than guessed at.
- **Additional languages** (was "Language"). English is assumed for every CA CSR, so it is not
  an option - the filter is for reporters who *also* work in another language. Single-select for
  now; a firm filtering usually needs one specific language.
- **Specialty** is a filter, options **derived from what reporters actually list** (same pattern
  as counties), not a fixed taxonomy we made up. Sparse at launch because only claimed profiles
  carry specialties; it fills in as reporters claim.
- **Method removed as a filter.** Steno vs voice is real state data, but firms rarely dictate how
  a reporter captures the record - they care about the output. Method still shows on the profile
  and is keyword-searchable; it's just not worth a filter slot. (If firm research later shows
  method preference is real, it's a one-line re-add.)
- **Keyword search made prominent** - labeled "Search by keyword", larger box, a helper line
  naming what it covers (names, locations, specialties, proceedings, services, bios) and an
  example. It reaches every write-in field on a profile.

## Open

### Grow the specialty list from real demand (needs a backend)

Right now specialty options are whatever reporters have typed. Two things to add once there's a
backend:

- **Log what firms search for.** Capturing the keyword queries that return few or zero results
  tells us which specialties firms want that no reporter has listed yet - the honest way to grow
  the dropdown, instead of inventing categories. (Aud's "save all inputs to inform a list of
  specialties", 2026-07-21.)
- **Reconcile two taxonomies that already exist.** Firm signup collects practice areas
  (`Insurance defense, Personal injury, Family law, Employment, Medical malpractice, Civil /
  commercial, Probate / trust`) while reporter specialties are free-form (`Maritime, Patent,
  Trade secret`...). A shared, suggested specialty list - reporters pick from common ones and can
  still add their own - would make the filter denser without forcing a rigid taxonomy. Seed it
  from the firm practice-area list + the most-searched terms; do not invent it wholesale.

### Rates - the big missing piece (HARD RULE: never invent the numbers)

A firm's most-wanted filter, and deliberately not built yet because it must not ship with made-up
prices. Every seeded profile has `rate: null` on purpose. What this needs, as its own focused
build:

- **A rate structure on the profile**, reporter-entered, blank until they fill it in. The line
  items follow the taxonomy already in the memory/policy docs - per-page transcript, per-diem
  (half / full day) appearance, and a rush surcharge - with room for the proceeding types to
  differ (a depo per-diem is not a trial day). Decide the exact fields before building.
- **Show ranges, not false precision.** A reporter may give a range or "on request"; the profile
  should render whatever they provide and say "provided on request" otherwise - never a
  placeholder number.
- **A rate filter for firms** (by ceiling or band). This only works once reporters have entered
  rates, so at launch it will be mostly empty - which is honest, not broken. Consider hiding it
  until enough rates exist to filter on.
- **What the platform must never do:** print a rate a reporter didn't enter, or present any
  baseline as a "statutory" or official rate. The v1 baselines ($5/pg, per-diems) are working
  guidance only, not law - see the rate memos.

This is the next substantial directory feature. It needs an explicit decision on the rate-field
taxonomy before any of it is built.
