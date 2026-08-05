# Roadmap – features beyond the current build

Ideas we want on record but aren't building right now (or have a basic version and want to
extend). Not commitments – a parking lot with enough detail to pick up later.

---

## Scaling roadmap – WIN CALIFORNIA FIRST (updated Aud, 2026-08-04)

**The decision: go deep in California before expanding anywhere else.** Getting California working end
to end – lots of reporters claimed, lots of firms actually using it, and real payments running through
the site – matters far more than being thinly present in several states. The state research
(`research/state_csr_public_data_map.md`) backs this up: California is the only state where we can
*both* pre-load the complete reporter list *and* recruit reporters cheaply by email. Other states are
pre-loadable but need different, slower outreach – Illinois publishes no reporter contact info at all,
New Jersey is postcards-only, and NJ reporters are called "CCRs" (not "CSRs"), so the site copy needs
relabeling per state. **So geographic expansion is pushed later – only after California provably pays.**

### The near-term demand plan: insurance-defense firms first, then their carriers

About **70% of attorneys work for insurance carriers** (see `insurance_carrier_channel` in memory),
and carriers care intensely about litigation cost – which makes them the best possible audience for
our pitch: *skip the agency markup, pay reporters direct, and see the savings.* The realistic order:

1. **Get insurance-defense firms in California actually using DS** and routing their payments through
   it (start LA + Bay Area, per `../marketing/firm_go_to_market.md`).
2. **Prove the savings with real numbers** – the "money saved vs. an agency" figure (see that section
   below), measured from real jobs.
3. **Then approach a carrier** with that data and ask them to push DS to their whole panel of defense
   firms. The firms are the proof; the carrier is what makes it spread widely. A carrier won't push an
   unproven site, so this has to be earned bottom-up, not led with.
   - **Legal check first:** a carrier steering firms to a site that has payment arrangements with
     reporters touches the deposition-neutrality question already queued for a reporting-industry
     attorney – confirm DS (a neutral directory + payment rail, *not* choosing the reporter) stays
     clear before building the carrier push. See `open_strategic_decisions.md` §3.

### Product roadmap (runs alongside the California push)

1. **Publish ratings + optional testimonials** – flip on the average score (**timeliness of delivery +
   quality of transcription**, averaged into one headline number) and opt-in testimonials, once
   there's enough paid-through-platform volume. See "Ratings + optional testimonials" below +
   `reviews_and_ratings.md`.
2. **Job board** – firms post full job details → reporters one-click "available/interested" → the firm
   reviews, messages, and hires through the existing messaging. Detail below; builds on
   `governance-and-process/matching_applicant_pool_policy.md`.
3. **Geographic expansion → LATER, only after California provably pays.** Illinois and New Jersey are
   both confirmed pre-loadable, but outreach differs by state and reporters use different credential
   letters – see `research/state_csr_public_data_map.md` + `state_expansion_checklist.md`. Texas stays
   deprioritized (its public data got more restricted in 2025, plus the MyTexasCSR competitor).
4. **DS-assigned matching (premium, opt-in tier)** – research seamless ways for DS to match/assign a
   reporter to a firm's job (we review + assign, instead of the firm picking), likely a **new paid
   tier** people opt into. Detail below.

---

## Favorite / save a reporter (firms) – ALREADY IN MVP, room to grow

**What it is:** a firm marks a reporter to come back to later.

**Status:** already built. Every profile has a "Save reporter" button, and the firm dashboard
has a "Saved reporters" tab. Signed-in firms get this today.

**Should it be MVP?** Yes – it already is. It's cheap, and it's a good reason for a firm to
create an account (their saves only persist if they're signed in). For someone browsing
without an account, a plain browser bookmark is the natural fallback.

**Later extensions:**
- Notify a firm when a saved reporter updates their profile or notes new availability.
- Shared team lists (multiple people at a firm see the same saved reporters) – fits the paid
  firm plan.
- Notes/tags on a saved reporter ("used for the Ramos depo," "great on medical terminology").

---

## Reporter business card generator – ROADMAP

**What it is:** a link on a reporter's profile/dashboard that generates a printable,
Dewey-Sholes-branded business card pulled from their profile, with a QR code / short link
back to their profile. The reporter prints it and hands it to attorneys at hearings, so the
attorney can find them later to order the transcript.

**Why it's worth building:**
- **Free, professional marketing for the reporter** – a real reason to claim and keep their
  profile current.
- **Brings firms in at the exact moment of need** – an attorney at a hearing who needs a
  transcript gets a card, scans it, and lands on Dewey Sholes. That's a warm way to get firms
  signing up, driven by the reporters themselves.

**How it would work:**
1. Reporter clicks "Create my business card" (dashboard or profile).
2. We generate a card in a DS-branded template using **only their real profile info** – name,
   "Certified Shorthand Reporter, CSR #___," method, city/county, maybe top specialties and
   coverage – plus a **QR code + short link** to their public profile.
3. Output: a print-ready PDF (standard card size), **plus a button to order physical cards
   through a print-on-demand service** (Vistaprint, Moo, GotPrint, Amazon, etc.) – the
   reporter clicks, the design is handed off, they order a batch and it ships to them. Later,
   maybe a digital/shareable version too (a mobile card page or a vCard).
4. The reporter hands the cards out at hearings.
5. An attorney scans/opens it → the reporter's Dewey Sholes profile → they can reach out. To
   message or hire through the platform they'd sign up; if the reporter lists direct contact,
   the attorney can also just email them. (This lines up with the access model: basic info is
   free; messaging sits behind sign-up/subscription.)

**Open questions:**
- **What contact goes on the card / profile** – the reporter's choice, per their contact
  preferences. Don't force a channel.
- **Direct contact vs. drive-to-platform** – does the card push everything through the profile
  (to encourage sign-ups), or show the reporter's direct email too? Likely the profile link is
  primary, and the profile itself offers "email directly" (if the reporter opts in) or "message
  on Dewey Sholes (sign up)."
- **Print:** two paths – download a print-ready PDF, and/or a button that hands the design to
  a print-on-demand service (Vistaprint / Moo / GotPrint / Amazon) to order physical cards.
  Which vendor(s) is a to-do; each has a slightly different hand-off (some take an uploaded
  print-ready file, some have a design API). A vendor **affiliate/referral link** could earn
  Dewey Sholes a small cut when a reporter orders – a tiny bonus revenue line, worth noting.
- **Design:** needs a DS-branded card template (logo + shorthand motif). Keep it clean and
  professional – attorneys are the audience.
- **Never invent** – every field comes from the reporter's real profile; blank if they haven't
  filled it in.

---

## Ratings + optional testimonials – collect early, display later – ROADMAP

**What it is:** after a firm pays an invoice, prompt them once for two things – a **rating** (two
quick scores: **quality of the deliverable** and **timeliness of delivery**, averaged into one
headline score) and an **optional testimonial** (a short quote about the reporter, **skippable**).

**Why an optional testimonial, not a "review":** a review field invites negative free text – the
big moderation and liability surface (defamation, disputes, fake text). An opt-in testimonial is
positive-only by construction: a firm that liked the reporter adds a nice line; a firm that didn't
just skips it and lets the numeric scores speak. So the text we host is praise a firm chose to
give – much lower risk, same warmth. (Full write-up: [`reviews_and_ratings.md`](reviews_and_ratings.md).)

**The sequencing (this is the smart part):** start **collecting** as soon as real payments are
live, but **don't display** anything until each reporter has a decent number of ratings and we've
thought through moderation. You can't backfill ratings for past jobs, so collecting early is
uniquely valuable – but showing them early backfires.

**Turn both on together, later:** when a reporter crosses the volume threshold and we flip ratings
on, the testimonials collected for that reporter **start appearing at the same time.** Over time
the best reporters become evident from the *combination* – their rating plus the volume of
testimonials attached. A reporter with a rating but no testimonials sits a little lower in a firm's
consideration than one with several glowing quotes. Keep that a **soft discovery nudge, not the
sort order itself:** the numeric rating stays the backbone, so we don't reward reporters who nag
firms for quotes or penalize great reporters whose busy firms never write one.

**Why not display from the start:**
- One or two ratings are noisy and unfair.
- A reporter with zero ratings looks bad next to one with a few – punishes newcomers.
- Before it's public you need enough data per reporter, a light takedown path even for opt-in
  testimonials, and a way for reporters to respond. All display-time work.

**Trigger – the payment-success moment:**
- Fresh impressions right after the firm paid.
- **Payment-gated = trustworthy:** only a firm that actually paid a reporter can rate them (like
  an Amazon "verified purchase"). Quietly solves fake ratings and fake testimonials.
- **Nuance:** only works for firms who pay *through* the platform. Ratings and testimonials build
  up for the reporters who use invoicing/payments (Pro reporters) – a nice bonus reason to go Pro.

**Timing note:** the prompt hangs off the *real* payment-success screen, which isn't live yet
(payments are mocked in the prototype). So this is **not** for the current demo – it's a small
addition to the "payment received → rate your reporter?" screen **when Stripe goes live.**

**Keep the collection simple:** two quick scores (quality, timeliness) + one optional testimonial,
skippable, one screen. Firm rates reporter only (a reporter-rates-firm direction can come later).

**Reporter approves testimonials before they show (opt-in display + veto):**
- When a firm leaves a testimonial, it lands in the reporter's dashboard **pending**, not live. The
  reporter **approves** the ones they want on their public profile and can **veto/hide** any they
  don't – for any reason, no justification needed. Nothing appears until they say so.
- **Critical split: this applies to the testimonial *quotes*, not the numeric rating.** Reporters
  curate which quotes show; they **cannot** pick and choose which scores count toward their
  average, or the rating stops meaning anything (everyone would keep only their 5s). So: quotes are
  opt-in and vetoable; the aggregate rating is computed from all verified ratings and is not
  reporter-editable. Worth stating plainly in onboarding so the deal is clear – "you control which
  kind words appear; the score reflects every paid job."
- A reporter can un-publish a previously approved testimonial later too (hide is reversible).
- This also doubles as first-line moderation: since only reporter-approved quotes go public, an
  abusive or off-base "testimonial" simply never gets approved. We still keep our own takedown
  ability for anything that slips through or violates terms.

**Bank for display-time (later):**
- A per-reporter threshold before any ratings or testimonials show.
- The approval/veto flow above, plus our own takedown ability; a reporter's right to respond.
- Be transparent with reporters up front that ratings + testimonials are being collected, that
  they control which testimonials appear, and that the score reflects all paid jobs (put it in
  their onboarding/terms).
- Testimonials are user-generated content we host, not author – standard platform posture; confirm
  wording in the terms-of-service review.

## "Money saved vs. an agency" – stickiness metric (Jay/Rosie, 2026-07-29)

A dashboard number for BOTH sides showing money kept out of a middleman's hands by using DS. Jay's
"make it sticky" advice; the tangible proof behind Rosie's "movement" framing (below / in marketing).

- **Reporter view:** "cut you kept" ≈ your DS-collected billings × a typical agency cut, minus the
  small DS fee. Only counts for work they'd otherwise route through an agency (many already work
  direct – don't imply otherwise).
- **Firm view:** "agency markup avoided" ≈ what you paid reporters through DS × a typical agency
  markup (what an agency would have added on top).
- **HARD RULES ([[feedback_never_invent_data]]):**
  - It is an **ESTIMATE, labeled as such** with the basis shown inline ("est. vs. a typical ~39%
    agency markup, from a real CA invoice" – see `research/agency_invoice_evidence.md`). Never an
    exact claim.
  - Benchmark = the **real 39%** (or the 30–50% range), NOT the retired "11%" in that evidence doc.
  - Use the **current** pricing model (reporter 2–5%, firm subscription), not old fee schemes.
  - The two views are the SAME agency margin seen from two sides – **don't double-count** or imply DS
    "creates" 2× savings company-wide.
  - Needs real transactions; in the prototype it's illustrative/demo data, clearly flagged.
- Fits as a StatCard on the reporter Overview + firm dashboard. Could roll up to a lifetime total for
  the feel-good hook ("you've kept $X from agencies").
- **Consistency:** the homepage `MoneyComparison` already uses this same real invoice – so the
  dashboard metric extends that identical proof into the app (one story, landing page → daily use).

## Job board (firm posts → reporters express interest → firm hires) – ROADMAP

**What it is:** a law firm enters all the details of a job (proceeding type, date, location,
services needed, turnaround, etc.) and publishes it to reporters. Reporters see relevant jobs and
**indicate availability/interest with one click**. The firm then reviews the profiles of the
reporters who expressed interest, messages them, and hires – **all through the messaging feature
the site already has.**

**Why it fits:** this is the demand→supply flow the reduced-scope MVP intentionally left out (it
ships directory + messaging + payments). It reuses the existing messaging and profiles rather than
adding a new comms surface, so it's an extension, not a rebuild.

**Prior design to build on:** this is essentially the **applicant-pool review model** already
spec'd in `governance-and-process/matching_applicant_pool_policy.md` (firm posts → CSRs apply during
a turnaround-tier notification window → firm reviews profiles/prices live → selects one → CSR
confirms availability). The retired "first-claim-wins" and "cascade/veto-window" variants are
recorded there too; cascade is kept as a deferred fallback. Revive that spec when building this.

**Open questions:** silent vs. explicit rejection comms; how a job post is filtered/notified to the
right reporters (county coverage, work mode, services, languages); whether the job board is free or
gated to a paid tier; how it coexists with the reporter-invites flywheel.

## DS-assigned matching (premium, opt-in tier) – ROADMAP / RESEARCH

**What it is:** instead of a firm browsing (or posting a job and picking), **Dewey Sholes reviews
the job and assigns a specific reporter** – a done-for-you match. Likely a **new paid membership
tier**: firms (and possibly reporters) opt in and pay for matching.

**Why:** it removes the firm's search/vetting effort entirely – the highest-touch, highest-value
version of the product, and a natural premium upsell above the $49 discovery subscription.

**The hard part (flag):** this is close to the **concierge / booking-agent role we deliberately
said NO to** ([[project_no_concierge_depos]] – "scheduling complexity is the blocker, not legal
risk"). So the research is specifically: how to make assignment **seamless/automated** enough that
it doesn't drag Dewey Sholes into manual scheduling and coordination on every job. Relates to the
retired **auto-match / cascade** model (kept as a deferred fallback in the matching policy) and to
**featured / promoted listings** (parking lot).

**Open questions:** who pays (firm, reporter, or both)? how is "assign" done without DS taking on
scheduling/coordination labor and liability – algorithmic match, or a human reviewing? how does it
coexist with the self-serve directory + job board (do premium firms get all three)? neutrality /
AB-5 §2778 implications of DS choosing the reporter rather than the parties choosing each other.

## Reverse discovery – reporters browse/pitch firms – ROADMAP / VALIDATE FIRST

**What it is:** the mirror of the current model. Today firms find and message reporters; this would
let a **reporter browse profiles of law firms that have signed up and message them directly to pitch
their services.**

**Status: NOT greenlit – validate with CSRs before building.** Added to the CSR user-testing guide
as Open question S (`research/user_testing_csr_guide.md`). The open question is whether proactively
pitching firms is something reporters actually want, or reads as cold-selling that's against
professional etiquette – and which firms they'd reach out to (known vs. new). Only promote out of
this section once CSR sessions show real demand. Distinct from the firm-side personalization
direction, which is also validate-first.

## Parking lot (mentioned, not yet scoped)
- **Featured / promoted listings** – Rosie's earlier idea; a discovery surface, decided post-launch.
- **Enterprise account options** (SSO, multi-seat/admin roles, custom contracts, SLAs) –
  deferred. Build only when a large customer asks and will pay. Light team-sharing for a firm
  is the earliest piece, if firms ask.
