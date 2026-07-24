# Showing which reporters are actually using the site

Decided 2026-07-21. Implemented in the prototype as a display-only stand-in; the real version
needs auth (see `integration_checklist.md`).

## The decision

A claimed profile shows one line of italic metadata – **"Recently active on Dewey Sholes"** –
computed automatically from the reporter's own sign-ins. Nothing is shown when it isn't true.

## What we rejected, and why

**A self-set availability status** ("always open to IC work" / "limited" / "not currently
accepting"). The idea was sound, but a status is a claim made at one moment, and its accuracy
depends on people coming back to update it. They won't. A stale "available" is *worse* than no
status at all, because a firm acts on it, messages someone who stopped taking work months ago,
and hears nothing – which is precisely the failure the feature was meant to prevent. It also
puts the maintenance burden on the side of the market we're trying to attract.

*Revisited 2026-07-24 – see "The accepting-jobs toggle" below. This critique holds for a
**published availability claim** (a positive "I'm available" the firm acts on). A binary,
default-on "pause my listing" toggle escapes it, so we shipped that.*

**A visible "last active" timestamp**, Care.com style. On Care.com the providers browse demand,
so logging in is rational and frequent. Here, a reporter who fills out a profile and gets on
with their life is using the product *correctly* – firms come to them. Publishing "last active
5 months ago" would punish reporters for behaving as designed and make the directory look
abandoned even while it worked.

## The accepting-jobs toggle (added 2026-07-24)

The profile editor has a single **availability toggle, default ON** ("Accepting jobs"). Turning
it OFF does **not** hide the reporter – they stay in search and stay messageable – it flags them
as *not taking new work*. It sits alongside the computed "Recently active" line, not in place of
it: the two answer different questions – *am I willing to take new work* (self-set) vs *am I
engaged here* (earned).

**Why a self-set flag is safe here (the earlier rejection was of a different thing).** What we
rejected was a *published availability claim* – a positive "available" a firm reads and acts on.
This flag is the inverse, and negative:

- **Default ON means no upkeep for the normal case.** The common state (accepting work) is the
  default, so a reporter who fills out a profile and gets on with their life is represented
  correctly without ever touching it. The rejected design failed *because* staying accurate
  required coming back to update it; here, doing nothing is accurate.
- **It warns; it doesn't mislead.** A stale "available" was worse than nothing because a firm
  messaged someone who'd stopped taking work and got silence. A stale "not taking new work" only
  ever *under*-promises – the worst it does is make a willing reporter look busy.
- **The staleness cost falls on the reporter.** A forgotten OFF costs the *reporter* (looks
  unavailable), not the firm – so the person who can fix it is the one motivated to. The opposite
  of the rejected design, where upkeep fell on the side we're courting and neglect hurt the other
  side.

It's a "booked solid / on hiatus" sign, not an "I'm available!" billboard.

**Why OFF keeps them in search and messageable (decided 2026-07-24).** Removing a not-accepting
reporter would break a real need: a firm often wants a *specific* reporter – the one who was on
the record at a hearing or trial – to **request a transcript they already produced**, including
years later. That contact has nothing to do with whether the reporter takes *new* work. So OFF
keeps them findable and keeps the message button live; it just surfaces a **loud warning** in
three places: a banner at the top of their profile, an inline indicator on directory cards and
list rows ("Not taking new work"), and a reminder inside the messaging thread when a firm writes
to them. Because OFF is no longer destructive, the earlier confirmation dialog was removed –
toggling is now a plain switch.

**Not built for real yet:** the editor toggle is prototype-local (resets on refresh) and doesn't
persist. The display side *is* wired – `notAcceptingJobs(p)` (in `_app_02_data.jsx`, true when a
claimed profile has `accepting === false`) drives the profile banner, the card/row indicator, and
the messaging reminder; one sample profile (Lucinda, 900005) carries the flag to demo it.
Persisting the reporter's own setting is backend work – see `integration_checklist.md`. Ranking
is unaffected.

## Why the computed version works

Reporters have to sign in to do the things that matter – read and answer a firm's message, send
an invoice, get paid. So sign-ins are a real signal of someone transacting here, not a vanity
metric, and it costs the reporter nothing to produce.

**Display rule: activity is shown only when it's good news.** Present = a positive signal.
Absent = no signal, not a negative one. We never show staleness, a date, or a comparison.

Consequence worth knowing: the signal tracks *engagement*, not revenue. Because messaging
counts, a reporter who answers firms and never invoices through the site still reads as active.
That is deliberate - it keeps the directory looking alive on the strength of conversations
alone, rather than making liveness a side effect of payment adoption.

## Settled

- **The window is 30 days** (decided 2026-07-21).
- **Any sign-in counts, and messaging counts equally with payments** (decided 2026-07-21).
  Many reporters are expected to use the messaging side and never touch invoicing, and they are
  no less active for it. Do not weight payment activity higher, and do not make payments a
  precondition for the signal.
- **It shows on directory listings, and it does not affect ranking** (decided 2026-07-21).
  Displayed on the profile page, on the featured cards, and in the list rows - the list is the
  directory's default view, so cards alone would hide it from most firms. Ranking stays
  `claimed -> completeness -> recent claim`. Sorting by activity would compound the cold start:
  the few active reporters would absorb the early demand and everyone else would stay
  invisible, which is the opposite of what a statewide directory is for. There is a comment to
  this effect on the sort in `_app_05_directory.jsx` so it doesn't get added by accident.

## Open parameters

- **Responsiveness, later.** The signal a firm actually wants is "will this person reply to
  me." Time-to-first-response measures that directly, can't be farmed by logging in, and needs
  no self-reporting. It's the better long-run version of this feature.

## Prototype implementation

- `activeDaysAgo` is seeded in `buildDirectory()` (`_app_02_data.jsx`), derived from the license
  number so it's stable between renders. **It is fake, like the seeded bios and rates** – the
  real field comes from auth.
- `recentlyActive(p)` gates the display; claimed profiles only, since an unclaimed record has
  nobody behind it.
- Rendered in `ReporterProfile` (`_app_05_directory.jsx`) as italic dim metadata under the
  license/location line.

## Related: how featured slots are chosen

Before 2026-07-21 "Featured reporters" was `claimed.slice(0, 3)` off a list sorted by
completeness - i.e. the same three most-complete profiles forever, on both the directory and
the homepage. It now **rotates weekly** (`weeklyFeatured` in `_app_02_data.jsx`).

Weekly rotation rather than random, because random re-rolls on every React render (the strip
would reshuffle while a firm types in the search box) and random sampling is uneven over time -
some reporters featured repeatedly, others never. The round-robin gives everyone an equal turn:
verified over 12 simulated weeks with the seeded pool, all six claimed reporters appeared
exactly six times each.

Profiles under 60% complete are skipped, falling back to the whole pool if too few qualify - a
featured slot spent on a bare profile helps nobody. On the directory it rotates within whatever
the firm has filtered to, so a county filter still features reporters from that county.

Only claimed profiles are ever featured, enforced inside `weeklyFeatured` rather than left to
the caller - an unclaimed record is a public license stub with nobody behind it, so featuring
one would promote a page that can't respond and hand the slot to someone who never opted in.

### Rejected: gating featured on recent activity (2026-07-21)

Considered limiting the rotation to reporters who are recently active. Decided against it, and
the reasoning is worth keeping because the idea will come back.

**It inverts what the slot is for.** A recently active reporter is by definition already getting
messages or sending invoices. Gating on activity hands the slot to the people who least need it
and locks out the reporter who claimed a profile, filled it in properly, and has heard from
nobody - precisely the person a featured slot could rescue.

**It closes a loop that should stay open.** Featured drives visits, visits drive messages,
messages drive sign-ins, sign-ins make you "recently active", which would make you eligible for
featured. At six claimed profiles that is invisible; at six hundred it means a stable in-group
holds the slot permanently and everyone else is structurally excluded. It is the cold-start
problem we kept out of ranking, arriving through a side door.

**It weakens the supply-side promise.** Growth depends on reporters claiming profiles and then
inviting their own firms. "Finish your profile and you get a turn" is clean. "Finish your
profile, and if you are already busy here you might get a turn" is not, and the reporters with
no activity yet are exactly the ones whose behaviour we are trying to change.

**The gate we already have is the right one.** 60% completeness filters for *effort* - something
the reporter controls, and the thing that determines whether the slot converts. Activity is not
in their control; it depends on whether a firm happened to message them.

If the pool ever grows large enough that a turn comes around only twice a year, the version to
consider is a **tiebreaker, not a gate** - and weighted toward recently *claimed* or recently
*completed* profiles, which have no track record and the most to gain, rather than toward
recently active ones.

Activity belongs where it already is: on the card and the profile, as information for a firm
deciding who to contact. Featuring is distribution. Mixing the two makes the directory quietly
less fair without making it more useful.

**Planned:** email the week's featured reporters to tell them (see `integration_checklist.md`).

**Open, and worth deciding before launch:** whether featured placement is ever *sold*. There is
a promoted-listing idea on the books (a Rosie suggestion, post-launch). Establishing "featured
is a free, fair rotation" sets an expectation that is awkward to walk back later, and any paid
version has to stay a discovery surface only.
