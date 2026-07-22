# Directory search & filters

Decisions and open work for the directory sidebar. Last updated 2026-07-21.

## Settled 2026-07-21

- **Experience** offers "Under 5 years" plus the 5/10/15/20+ bands. "Under 5" matches only
  profiles that state a number below 5; unclaimed records have no experience value, so they are
  excluded rather than guessed at.
- **Additional languages** (was "Language"). English is assumed for every CA CSR, so it is not
  an option - the filter is for reporters who *also* work in another language. Single-select for
  now; a firm filtering usually needs one specific language.
- **Specialty** is a filter whose options are **derived from whatever reporters list**, not a
  hardcoded taxonomy. Important honesty note: this is NOT like the county filter. Counties come
  from the real 5,705-record state import, so that filter is genuine. Specialties do not exist in
  the state data at all - the only specialty values in the app today are the ~16 in the **six
  fabricated sample profiles** (Maritime, Patent, Trade secret...). So the specialty dropdown
  currently shows invented categories. The mechanism is self-correcting (it will show real
  specialties once real reporters claim), but until then it is demo data, and we must not treat
  those 16 values as a validated taxonomy. See "the specialty taxonomy is unknown" below.
- **Method removed as a filter.** Steno vs voice is real state data, but firms rarely dictate how
  a reporter captures the record - they care about the output. Method still shows on the profile
  and is keyword-searchable; it's just not worth a filter slot. (If firm research later shows
  method preference is real, it's a one-line re-add.)
- **Keyword search made prominent** - labeled "Search by keyword", larger box, a helper line
  naming what it covers (names, locations, specialties, proceedings, services, bios) and an
  example. It reaches every write-in field on a profile.

## Fields added 2026-07-21 (grounded)

- **Services gained "Remote / videoconference" and "Legal video."** Remote is the top post-2020
  hiring axis (Veritext/Lexitas/NNRC lead with it); legal video is a distinct service from the
  CLVS certification (offers-the-service vs. is-certified). Both filter via the existing services
  checkboxes and show as profile pills.
- **Notary public** - a profile field (header meta) and an Options filter toggle. Matters for
  administering the oath in remote / out-of-state depositions. Also a "notary" keyword token.
- **Zip is in the keyword haystack** so a firm can paste a zip for an exact match. City was
  already covered by keyword search. Decided NOT to add a city/zip filter facet: county is the
  right geographic facet, and true proximity ("reporters near 90210", radius) is a backend/geo
  feature, not exact-zip matching.

## Search interaction (decided 2026-07-21)

- **Deferred search, not live filtering.** The sidebar controls and keyword box are a *draft*;
  nothing filters the list until **Search** is pressed (button beside the keyword box, a second at
  the bottom of the filter sidebar, and Enter in the keyword field). With this many facets,
  compose-then-apply beats the list reflowing on every keystroke, and it maps cleanly to
  server-side search later. A "Filters changed - press Search" hint appears when the draft differs
  from what's applied. Implemented as a draft-vs-applied snapshot in `_app_05_directory.jsx`
  (`searched`); the filtered list reads only the snapshot.
  - **Live count kept** (2026-07-21): as the draft changes, the count of what Search *would*
    return updates live on the Search button ("Search - N results") and in the hint; a draft that
    matches nothing shows an ochre "no matches, loosen something" warning before you commit. The
    list still only changes on Search. `matchesCriteria()` is shared by the live count and the
    applied list so they can't diverge.
- **Featured cards are browse-only.** They show when nothing is applied (discovery). An active
  search shows a pure ranked list with no featured section; Clear all returns to browse. The count
  label reads "reporters" in browse and "results" after a search.

## Open

### Specialty + Certifications facets - shipped 2026-07-21 from sourced lists

The fabricated specialty filter was removed, then rebuilt from the cited research
(`specialty_taxonomy_research.md`). Now live as **two separate multi-select facets**:

- **Specialty** (`SPECIALTY_TYPES`, `_app_02_data.jsx`) - 18 litigation practice areas from
  court-reporting agency expertise pages + CA State Bar + Martindale. Multi-select, match any.
- **Certifications** (`CREDENTIAL_TYPES`) - the NCRA credential axis (CRR/RMR/RDR/RPR/CLVS/CRC),
  kept distinct from case-subject specialties per the research. Matched by code against a
  reporter's certifications.

Semantics: OR within a facet, AND across facets. The six sample profiles were remapped to
canonical specialty values so the filter demonstrates.

**Still an open user-testing question** (the list is sourced but no source is a CA CSR describing
their own work): overlap consolidation (Insurance Defense / PI; Business / Commercial / Corporate
/ Securities), granularity (~18 vs fewer buckets), and weak items (Corporate, Bankruptcy). Adjust
the constant once CSR testing lands.

### Grow the specialty list from real demand (needs a backend)

Once the taxonomy question is settled, two things to add when there's a backend:

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

### Rates - deferred to user testing (decided 2026-07-21)

**Decision: do not build rates yet; ask CSRs in user testing first.** The tension Aud named:
reporters are often cagey about publishing rates (visible in the CSR Facebook group), while
price-sensitive firms genuinely want them. That is a real two-sided design problem, not a build
task - forcing public rates could suppress reporter signups, the exact supply we need. So the
questions for user testing are whether reporters will publish rates at all, in what form (a
range, "on request", per-line-item), and what would make them comfortable doing so.

Every seeded profile already has `rate: null`, and the profile already renders "Provided on
request" when a rate is absent, so nothing fake is shown in the meantime.

When/if it is built (HARD RULE: never invent the numbers), the shape would be:

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
