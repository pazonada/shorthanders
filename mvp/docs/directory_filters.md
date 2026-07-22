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

## Open

### The specialty taxonomy - researched 2026-07-21, filter pulled pending a decision

The fabricated specialty filter was **removed** on 2026-07-21. A cited research pass then produced
a grounded ~18-item shortlist from real sources (court-reporting agency expertise pages, the CA
State Bar, Martindale) - see `specialty_taxonomy_research.md`. That list is sourced, not invented,
but the research itself flags that no source is a CA CSR describing their own work, so **user
testing is still the final gate**, the same call Aud made for rates. Decision pending: ship the
researched core list as the dropdown now, or hold the whole feature until CSR testing.

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
