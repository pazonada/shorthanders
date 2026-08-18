# Firm go-to-market strategy – Los Angeles + SF Bay Area

**Owner:** Aud
**Written:** 2026-08-01
**Status:** Active plan – this is the strategy doc for firm (demand-side) acquisition. It sits
above the existing tactical assets rather than replacing them:

- [`firm_outreach_playbook.md`](firm_outreach_playbook.md) – the Bay Area-specific tactics
  (postcard copy, the 26-firm researched list, association names, onboarding steps). Still
  correct and still in use – **read as "the Bay Area half of this plan, in more detail."**
- [`growth_strategy.md`](growth_strategy.md) – the whole-company growth philosophy (statewide
  supply, reporter-pulled demand, geography expansion order). Still correct at the company
  level. **This doc is a scoped exception to one line in it** – see "Why LA now, not later"
  below.
- [`pro_pricing_worksheet.md`](pro_pricing_worksheet.md) – the reporter-side fee math. Referenced
  here for the "route payments on-platform" goal, not repeated.
- [`positioning_and_partners.md`](positioning_and_partners.md) – the movement narrative, tagline
  options, and partner research. This doc uses its evidence (the real invoice numbers, the CA
  shortage stats) but doesn't duplicate the tagline work.

If a number here ever conflicts with `mvp/docs/open_strategic_decisions.md` §1, that doc wins –
it's the canonical pricing record.

---

## What changed to make this doc necessary

Two things moved since the existing marketing docs were written:

1. **The firm price locked**: $49/month per user (per seat), or $539/year – live on the site
   today (`For firms` page, `mvp/src/_app_04_marketing.jsx`). Firm-wide pricing is deferred.
2. **There's a real budget for firm acquisition now** – roughly $1,000–3,000, not $0. That's
   still tiny, but it's enough to run one small paid test and cover mailing + a couple of events
   in **two** metros instead of one.

Everything below is built for those two facts.

---

## 0. The four things a firm actually gets today (grounding, not aspiration)

Pulled straight from the live `For firms` page so this plan never overpromises:

- **Free forever:** browse the directory (public/unclaimed profiles), look up and message a
  reporter you already know by name or license number (unlocks that reporter, free, permanently),
  save reporters, pay any invoice by card or ACH.
- **$49/user/month (or $539/yr):** full claimed profiles + advanced search/filters across *every*
  reporter, not just the ones you already know, plus saved/shared team lists.
- **Never:** a Shorthanders fee on the invoice. The firm pays exactly what the reporter billed.
- **Always:** a matter-reference field on every invoice, and a receipt/invoice history for AP.

---

## 1. Positioning and core message

**One-line promise (what the paralegal actually reads):**

> **Stop calling agencies. Find the reporter yourself.**

That's the existing live headline on the `For firms` page, and it's the right one – it names the
habit we're breaking, not a feature. Keep it as the anchor line across postcards, LinkedIn, and
cold email subject lines.

**The four proof points, in the order a paralegal actually cares about them:**

1. **"You probably already know the reporter you need."** Search their name or license number,
   message them, pay them – free, no subscription. This is the door, not the upsell. It removes
   "another subscription to justify" as the first objection, because nobody has to buy anything
   to solve today's problem.
2. **"Pay online, not by check."** Reporters who only take checks are a real, specific annoyance
   firms already have – this fixes it without the firm changing who they hire.
3. **"See where the agency markup actually goes."** Backed by a real invoice, not a guess: on one
   documented CA transcript bill, **39% went to the agency** in line items the reporter never
   touched (`research/agency_invoice_evidence.md`); on a remote deposition, it was **70–82%**.
   Always cite this as *"a typical CA agency markup, from a real invoice"* – never as a guaranteed
   number for any specific firm's bill (see the honesty rule in §5).
4. **"Find a new reporter when your usual one is booked, retired, or moved."** The paid tier –
   full directory search across every licensed CA reporter, not just who you already know. Given
   the documented CA reporter shortage (see §7 "grounding evidence"), this isn't hypothetical –
   firms are already hitting this wall.

**What NOT to lead with:** the platform fee/commission language from the old model is gone –
never say "12%," "buyer fee," or imply Shorthanders takes a cut of the job. The firm never sees a Shorthanders charge
on an invoice, and that's a selling point, not a footnote.

---

## 2. Target segmentation

**The buyer is the paralegal, legal secretary, or office manager – not the partner.** Partners
say "get me the transcript"; the person who actually picks who to call is the one this whole plan
talks to. At a 5–30 attorney firm that person has real discretion without a sign-off chain. Every
tactic below is addressed to them by name in the copy ("Office Manager / Paralegal," not "Managing
Partner").

**Firm size sweet spot: 5–30 attorneys.** Below 5, there's often no dedicated staff doing the
ordering (a solo just calls whoever they know – good organic user, bad postcard target). Above
~50, procurement usually runs through a vendor list or committee, which slows the sales cycle past
what a $1–3k campaign can move.

**Practice areas, ranked by expected transcript/reporter volume** (from `firm_priority_starter.md`
and `CA_Pilot_Firm_Targeting.md` – the practice-area logic there is product-agnostic and still
holds even though those docs' pricing/SKU framing is retired):

| Rank | Practice area | Why | Note |
|---|---|---|---|
| 1 | **Insurance defense** | High volume (often 10–30+ orders/month at mid-size firms), and carriers audit every line item so they're primed to notice a lower bill. | Sell to the **firm**, not the carrier. Insurance-carrier top-down outreach is explicitly a later-phase channel (needs pilot cost-savings data we don't have yet) – see §8 risk. |
| 2 | **Personal injury – plaintiff** | Every case has depositions; contingency model makes them cost-conscious. | |
| 3 | **Family law – contested/high-asset** | Depositions + court-appearance transcripts; often boutique with real paralegal discretion. | |
| 4 | **Employment – plaintiff** | Deposition-heavy, especially class actions. | |
| 5 | **Medical malpractice – plaintiff** | Lower case count, but 200+ page depositions – high per-order value. | |
| 6 | **Civil / commercial litigation** | Steady, broad. | |
| 7 | **Probate / trust litigation** | Lower volume, long complex matters. | |

**Also target: in-house counsel at nonprofits, associations, and mid-size companies** – they
litigate (employment, contract, IP) and often have no agency relationship at all, per the existing
playbook. Find via LinkedIn "general counsel / in-house counsel" searches.

**Skip:** BigLaw (100+ attorneys – procurement committees, long cycles), transactional-only
practices, immigration, pure criminal defense (rarely order transcripts), workers' comp
defense-only firms (different hearing system, no CSRs).

---

## 3. Why LA now, not later (the one place this plan overrides existing docs)

`growth_strategy.md` says "Bay Area first, LA next" – written for a $0, two-person reality where
concentrated selling had to pick one metro. That's still the right call **at zero budget.** With
$1–3k and a dual-metro mandate, the calculus changes, and the directory's own real data says LA
should lead, not follow:

| County group | Licensed CA reporters in our directory today (real CRB data) |
|---|---|
| Los Angeles County alone | **1,130** |
| Bay Area core four (Santa Clara + Contra Costa + Alameda + San Francisco) | **434** |

LA alone has **~2.6x** the reporter supply of the entire Bay Area pilot footprint, and is about
**20% of the state's whole CSR population.** Rosie's practitioner read (unverified beyond her
personal observation, flagged as such) is that LA attorney fees and reporter day rates run "close
to 2x Bay Area rates" (`research/csr_agency_live_attendance_rates.md`) – if that holds, the dollar
value of the same agency-markup savings pitch is larger per firm in LA.

**What this means concretely:**
- **Run both metros in parallel**, not sequentially – the budget is small but two-metro-sized.
- **Bay Area keeps its head start**: the researched 26-firm list, the association names (SFPA,
  East Bay PA, PASCCO, SCCoLPA), and the existing playbook all already exist. Use them as-is.
- **LA starts from less** – no researched firm list yet, no confirmed association contacts. Week
  1–2 of the 90-day plan below exists specifically to close that gap fast, using the same
  methodology `firm_priority_starter.md` used for the Bay Area (see the action plan).
- **Rosie's network is Bay-Area-weighted and her advisor contract is unsigned** – per the task
  guardrail, this plan doesn't lean on it. If it firms up later, it's a Bay Area accelerant, not
  something LA can count on.

---

## 4. The wedge – how a firm gets in the door for free, then converts

This is the mechanic that makes the whole plan cheap. It's already built, not proposed:

**Step 1 – the free door.** A firm's paralegal already knows a reporter's name (it's on the
transcript cover, or jotted at a hearing). They search that name or license number in the
directory. A name/license search unlocks *that specific reporter*, free, forever – no
subscription, no trial clock. They can message, save, and pay that reporter through the site with
zero commitment. **This is the entire pitch for the first visit** – not "subscribe," just "look up
someone you already know."

**Step 2 – the reporter-supply flywheel pulls the same firm in from the other side.** Independent
of any firm-side selling, a reporter who claims their profile is prompted to invite the firms they
already work with. When a firm gets invited this way, they land signed-in and auto-connected –
same free access as the name-lookup path, just initiated by the reporter instead of the firm.
**This is the statewide engine and it costs nothing** – firm-side selling only needs to concentrate
where we're also driving reporter claims (LA + Bay Area), so the two efforts should be run
together, not separately.

**Step 3 – the payment habit forms.** Once a firm is paying *one* reporter through the site
(because it's easier than a check, and the receipt lands in one place for AP), that's the behavior
that matters most for revenue – **the reporter's per-payment fee, not the firm subscription, is
the platform's largest revenue line, and it only exists on payments actually routed through Shorthanders.** So every piece of firm-facing copy should nudge "pay through the site" as a firm
convenience, even for firms that never upgrade to Pro. A free firm paying its reporters on-platform
is not a failed conversion – it's the outcome the business model most needs.

**Step 4 – the discovery gap converts to Pro.** The free tier stops being enough the moment a
firm's usual reporter is unavailable – busy, retired, moved, or the case is in a county they don't
usually work. That's when "search everyone, not just who you know" becomes worth $49/month. Given
the documented CA reporter shortage (see §7), this gap is real and will hit firms during normal
casework, not hypothetically.

**What this means for messaging:** don't lead firm outreach with "subscribe for $49." Lead with
"look up someone you already know, for free" and "pay them online instead of writing a check." Let
the Pro upgrade sell itself the first time a firm's go-to reporter can't take the job.

---

## 5. Channel plan and the $1,000–3,000 budget

Everything free runs in both metros simultaneously and costs nothing to scale. The paid lines are
where the actual dollars go – kept small, specific, and killable.

### Free/sweat channels (run in both LA and Bay Area, no budget line)

| Channel | What it is | Why it's first |
|---|---|---|
| **Reporter-driven invites** | The claim flow's "invite a firm" prompt + the free-tier name-lookup door (§4). | Zero cost, statewide by design, the warmest lead there is. |
| **LinkedIn organic + manual outreach** | Posts + direct connects to paralegals/office managers at target firms, using the researched lists. No Sales Navigator or paid tools – manual search only. | Free; the buyer is reachable there. |
| **Bar / paralegal listservs** | Posting in county bar solo/small-firm sections and paralegal-association listservs where allowed. | Free, direct access to the buyer. |
| **Local paralegal-association guest attendance** | LA: **Los Angeles Paralegal Association (LAPA)**. Bay Area: SFPA, East Bay PA, PASCCO, SCCoLPA (already in the playbook). Attend as a guest, not a sponsor. | In-person trust-building, near-zero cost beyond a guest fee. |

### Paid lines – concrete $2,000 baseline (scales down to $1k / up to $3k, see notes)

| Line | What | Cost | Rationale |
|---|---|---|---|
| **Handwritten postcards** | ~300 postcards total (150 LA + 150 Bay Area), stock + stamp, addressed "Office Manager / Paralegal" or a named contact once enriched. Hook: the real $2,311/$908 invoice math from `agency_invoice_evidence.md`. QR code + tracked code per firm. | **$300** (~$1/postcard) | Cheapest channel that reliably lands on the actual buyer's desk. Proven-cheap tactic already validated for the Bay Area list; just doubling it to cover LA. |
| **Paralegal-association guest fees + a simple printed leave-behind** | Guest lunch/event fees across both metros over 90 days (assume 4–6 events total, ~$30–50 each) + a small run of a plain one-page leave-behind (not the deluxe mailer style – a single printed sheet). | **$350** | In-person is the highest-trust channel per dollar; the leave-behind is what survives after the event. |
| **One-time contact-enrichment task** | A single task-based (not retainer) Upwork/Fiverr job to find paralegal/office-manager names + emails for the LA + Bay Area target lists, so postcards and LinkedIn outreach aren't addressed to "Office Manager" blind. | **$250** | The highest-leverage $250 in the budget – every other channel gets sharper once outreach has a real name attached. One-time, not ongoing (see §6 on VA scope). |
| **Small geo-targeted Google Search ads test** | Bid on "court reporter [city]," "deposition reporter near me," "certified shorthand reporter California" – geo-fenced to LA County + the four Bay Area core counties. Land on the directory (pre-filtered to the searcher's county) or the `For firms` page, not the homepage. | **$600–900** | The one genuinely new-money channel this budget unlocks (the existing $0 plan explicitly deferred paid search until there was real budget – this is that moment). Small enough to be a real test, not a bet. Track cost-per-firm-signup and kill it if it's not competitive with the free channels by week 8. |
| **Contingency / whatever's working** | Held back, not pre-assigned. | **$200–500** | After the week-8 review (§6), put this behind whichever channel is actually converting – more postcards, more ad spend, or an extra association event. Don't split it in advance. |
| **Total** | | **~$1,700–2,550** | Sits inside the $1–3k band; trims to ~$1k by dropping the ad test to a $250 trial and cutting the enrichment task; expands to $3k by doubling the postcard wave and the ad budget once week-8 data says which channel to feed. |

**What's deliberately excluded** (per the existing $0-plan guardrails, still valid): Sales
Navigator or paid email-finder tools, deluxe/commissioned mailers, swag, any paid sponsorship
(only guest attendance), and any insurance-carrier outreach spend (too early – see §8).

---

## 6. Messaging and objection handling

| Objection | Answer |
|---|---|
| **"We already use an agency."** | "Keep them for what they're good at. This is free to try for the one reporter you already know – look them up, message them, pay them online. No agency to replace, no commitment." |
| **"Our reporters only take checks."** | Don't frame it as a mandate. "A lot of reporters would rather get paid by card or ACH than chase a check – this gives you both a faster, trackable way to pay, and a receipt for every matter automatically." |
| **"Switching is a hassle / another system to learn."** | There's nothing to switch. The free tier runs alongside whatever you already do; the name-lookup path takes about the same time as a phone call and needs no setup. |
| **"We don't need another subscription."** | Correct – most firms don't need one on day one. The subscription only matters the day your usual reporter is busy or retired and you need to find someone new. Until then, it's free. |
| **"How is this different from just calling the agency for a quote?"** | You see the reporter's real, published rate and profile immediately and message them directly – no phone tag, no waiting for a callback. |
| **"Is this legit – will our reporter actually get paid right?"** | Payments run on Stripe, the same rails as most modern invoicing tools. Shorthanders never holds the money and never adds a fee to your invoice – you pay exactly what the reporter billed. |
| **"What if our reporter doesn't want to be listed?"** | Every licensed CA reporter is already public record through the state (CRB); we didn't add anyone. Building out a full profile is the reporter's choice and entirely in their control. |

**Tone guardrails for all firm copy:** plain language, sentence case, en-dashes – no "moat,"
"flywheel," "movement," or platform jargon. The buyer is a working paralegal, not a startup
audience. Never claim a specific dollar savings for a specific firm – the 39%/agency-markup figure
is always framed as "a typical agency markup, from a real invoice," not a promise (per the "never
invent data" rule and the honesty caution in `positioning_and_partners.md`).

---

## 7. First-90-days action plan

Assumes **Aud solo**, with the option of a single task-based contractor for contact enrichment
(see the budget line above) – **not** an ongoing VA role. The budget doesn't support a retainer,
and the actual selling (postcards signed, event conversations, onboarding calls) has to be Aud's
voice because trust with a first-time firm is personal.

### Weeks 1–2 – build the LA half of the plan, ship the Bay Area half immediately

- **LA:** research a ~40–50 firm LA target list, same method as `firm_priority_starter.md` (web
  search + firm sites + Super Lawyers/LinkedIn size signals), weighted by the practice-area
  ranking in §2. Identify LA-specific association contacts (LAPA first) and confirm guest-visit
  policy.
- **Bay Area:** no new research needed – the 26-firm list already exists. Confirm it's still
  current (firms move, staff turn over) and check which local reporters in Santa Clara / Contra
  Costa / Alameda / SF have claimed profiles, since a filled-out profile is what makes the pitch
  convincing.
- **Both:** kick off the one-time contact-enrichment task for both lists (paralegal/office-manager
  names). Set up postcard stock, QR codes, and a shared tracker (extend
  `firm_outreach_tracker_seed.csv` with LA rows). Stand up (don't launch) the Search-ads account
  and county-filtered directory landing pages.

### Weeks 3–4 – first outreach wave, both metros

- Send postcard wave 1 (~75 LA + ~75 Bay Area firms) once enrichment gives real names; fall back
  to "Office Manager / Paralegal" where it doesn't.
- Start LinkedIn organic + direct outreach cadence in both metros.
- Attend the first paralegal-association event scheduled in this window (whichever metro has one
  first).
- Watch the reporter-invite flywheel – are any LA/Bay reporters already inviting firms on their
  own? That's a free signal of which firms to prioritize for a warm follow-up.

### Weeks 5–6 – launch the paid test, follow up wave 1

- Follow up on any postcard responses (the tracked code tells you which firm).
- Launch the Search-ads test, geo-fenced to LA County + the four core Bay Area counties.
- Send postcard wave 2 to the next tranche.
- Continue the association circuit in both metros.

### Weeks 7–8 – mid-point review, first onboarding

- **Review point:** which channel produced signups, at what cost? Reallocate the contingency
  budget toward whatever's working; cut the ad test if cost-per-signup is clearly worse than the
  free channels.
- Any firm that's signed up (free or paid) gets a founder-led welcome: help them run their first
  search, check in after their first message, confirm their first payment went smoothly.
- Ask every firm with a completed on-platform payment for a referral: "know another firm that'd
  benefit?"

### Weeks 9–10 – third wave, keep feeding the flywheel

- Postcard wave 3 (whatever budget remains after the week-8 reallocation).
- Keep the reporter Facebook-group presence going (per `README.md`'s reporter channel) – ask
  claimed reporters which LA/Bay firms they work with, both to seed invites and to sharpen the
  target list.

### Weeks 11–12 – day-90 review

- Tally: firms with a free account, firms on Pro, firms with at least one on-platform payment,
  reporter-driven invites that converted to a firm signup.
- Write up what actually worked (channel, metro, message) and what didn't – this becomes the
  input for the next budget cycle, not a guess.
- Report the one real open question honestly: **what share of connected firms are paying
  reporters through the platform vs. off-platform** – this is the single number the business model
  most needs and we won't know it until real usage exists.

---

## 8. Funnel and metrics

**Funnel stages:**

1. Directory visit (from postcard QR, LinkedIn, search ad, or reporter invite)
2. Free account created (via name-lookup or reporter invite)
3. Active on the free tier – messaging and/or paying a connected reporter
4. Trial or Pro started
5. Paid subscription
6. First payment routed *through* the platform (the metric that matters most for revenue)
7. Referral to another firm

**What to track** (these are targets to watch, not forecasts – we have no real conversion data of
our own yet, per the never-invent-data rule):

- Free accounts created, split by entry path (name-lookup vs. reporter invite vs. cold discovery)
- Postcards sent vs. tracked-code responses, by metro
- Search-ads spend, clicks, and cost per firm signup (compare directly against the free channels'
  effective cost of $0 + time)
- Free → trial → paid conversion (by metro, since LA and Bay Area may behave differently)
- **Reporter-initiated firm invites and their claim → invite → firm-joined conversion** – the
  flywheel health check
- **Share of connected firms paying at least one invoice through the platform** – this is the
  open question flagged in `open_strategic_decisions.md` §1 ("the digital-invoicing adoption
  rate") and it's more important than the subscription count
- Average seats per paying firm (tells us whether $49/seat is priced right for how many people at
  a firm actually need discovery access)

**A useful internal checkpoint, not a promise:** if 90 days in there isn't at least one paying firm
in each metro, that's a signal to revisit the message or the target list before spending more –
not a reason to assume the model is broken (subscription conversion is expected to be the slow
part; see §9).

---

## 9. Risks and what would make this fail

- **The free tier might be "enough" for most firms, permanently.** If "look up the reporter I
  already know" solves 90% of a firm's actual need, they may never hit the discovery gap that
  sells Pro. That's not a bug in the product (it's honest, and it still feeds the payment-fee
  revenue line) – but it means firm *subscription* growth should be expected to be slow, matching
  what `open_strategic_decisions.md` §1 already flags as a catch-22. Don't panic-discount the
  subscription price if this happens; watch the payment-routing metric instead.
- **Nothing forces payment on-platform.** There's no fee or penalty pushing a firm to pay through
  the site instead of a check off-platform once they've found a reporter – the pull is entirely
  "it's more convenient," which is real but not guaranteed to win every time. If the on-platform
  payment share stays low, that's the actual business-model risk, not the firm-signup number.
- **LA starts from zero relationships**, unlike the Bay Area's existing researched list and
  association groundwork. If weeks 1–2 don't produce a real LA target list and a confirmed
  association contact, LA slips behind on its own timeline inside this same 90 days.
- **Insurance-defense firms are the highest-volume segment but the weakest near-term carrier
  upside.** Sell to these firms directly and be glad of the volume – but do **not** pursue
  carrier-level outreach yet. That channel needs real cost-savings data from paying firms first,
  and jumping early risks a bad first impression with an audience we'll want later.
- **$600–900 of Search-ads spend is a directional signal, not a statistically solid read.** Treat
  any cost-per-signup number from this test as a rough steer, not a verdict – it's too small a
  budget to be confident either way.
- **Postcard response could be near-zero.** Law firm mail is often junk-mail-blind. The tracked
  code exists specifically to find this out fast and reallocate by week 8 rather than mailing
  blind for 90 days.
- **Copy risk:** any firm-facing claim that drifts from "a typical agency markup" into "you will
  save $X" is both a never-invent-data violation and, if a firm's actual bill doesn't match,
  a trust problem with exactly the buyer this plan needs to keep. Keep every savings claim
  benchmark-labeled.

---

## Related docs

- [`firm_outreach_playbook.md`](firm_outreach_playbook.md) – Bay Area tactical detail (postcard
  copy, the 26-firm list, onboarding steps)
- [`growth_strategy.md`](growth_strategy.md) – company-wide growth philosophy
- [`pro_pricing_worksheet.md`](pro_pricing_worksheet.md) – reporter-side fee math
- [`positioning_and_partners.md`](positioning_and_partners.md) – movement narrative, tagline
  options, partner research
- [`../docs/open_strategic_decisions.md`](../docs/open_strategic_decisions.md) §1 – canonical
  pricing record
- [`../../research/agency_invoice_evidence.md`](../../research/agency_invoice_evidence.md) – the
  real invoice math behind the markup claim
- [`../../research/firm_priority_starter.md`](../../research/firm_priority_starter.md) – the
  Bay Area 26-firm research (methodology to replicate for LA)
- [`../../research/csr_agency_live_attendance_rates.md`](../../research/csr_agency_live_attendance_rates.md)
  – source for the LA-vs-Bay-Area rate comparison (Rosie's practitioner read, flagged as
  unverified)
