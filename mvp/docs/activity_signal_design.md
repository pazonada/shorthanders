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

**A visible "last active" timestamp**, Care.com style. On Care.com the providers browse demand,
so logging in is rational and frequent. Here, a reporter who fills out a profile and gets on
with their life is using the product *correctly* – firms come to them. Publishing "last active
5 months ago" would punish reporters for behaving as designed and make the directory look
abandoned even while it worked.

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

## Open parameters

- **Where it appears.** Profile page only, for now. Directory cards and search ranking are the
  obvious next questions, and ranking is the consequential one: sorting by activity would
  compound the cold-start problem, where the few active reporters absorb all the early demand.
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
