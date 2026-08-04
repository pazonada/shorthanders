# StenoScout

**Last reviewed:** 2026-08-04

---

## Identity

- **URL:** https://stenoscout.com/
- **Founders:** "Nick" – site bio states "after years working in the legal services industry, Nick built this directory to help attorneys and legal professionals find qualified court reporters without the guesswork." Full name and company entity not disclosed on the public site this pass.
- **Year founded:** Not stated.
- **Location:** Not stated.

Not affiliated with Steno.com (steno.com) despite the similar name – confirmed by fetch of stenoscout.com, no shared branding, ownership, or cross-references found.

---

## One-line pitch

> "Find the Right Court Reporter – Fast." A nationwide, self-described directory "Built for Attorneys," free to search, with a lead-generation quote-request flow and paid subscription tiers for reporters who want visibility.

---

## Tagline / headline

> "Find the Right Court Reporter – Fast."
> Self-described: "Built for Attorneys."

Source: [stenoscout.com](https://stenoscout.com/)

---

## Target customer

**Two-sided**, but the two sides are treated very differently. Attorneys are the free, no-account-needed searcher/buyer. Court reporters are the paying customer – the site's actual revenue comes from reporter subscriptions, not from attorneys. **DS's model runs the opposite direction on both sides**: DS's reporters claim and list for free (no listing fee at all), and DS's firms pay a flat $49/user/month (or $539/year) subscription to *search for new reporters* (browsing, messaging, and paying reporters a firm is already connected to stays free). See Pricing model below for the full DS comparison.

---

## Pricing model

- **Attorneys:** free. Search, compare, and submit quote requests with no registration required.
- **Reporters – three tiers**, quoted verbatim from the site's advertise page:
  - **Free Listing** – $0/month, basic directory inclusion
  - **Featured Placement** – $79/month ($711/year) – "Pinned to #1 in your city results" with a "Sponsored" badge, quote requests emailed directly, extended bio, service list, booking-page link, RPR badge eligibility, monthly impressions reporting
  - **City Pro** – $249/month ($2,241/year) – everything in Featured plus "exclusive lead routing," inclusion in "Best in [City]" guides, a backlink, monthly email sponsorship, priority support, quarterly performance reviews – **limited to one provider per city** (an exclusivity mechanic DS does not use)
  - **Add-ons:** additional cities at $49/month; one-time newsletter/guide mentions at $99 and $149
- **Billing:** "Secure payment via Stripe," month-to-month, no setup fee, cancel anytime.
- **Revenue model in one line:** pure directory-listing subscription revenue from reporters. No transaction fee, no take-rate on jobs booked, no payment processing for actual court-reporting work.

Sources: [stenoscout.com/advertise](https://stenoscout.com/advertise/), [stenoscout.com](https://stenoscout.com/)

---

## Geographic scope

Nationwide by claim: **"1,122+ curated providers across 187+ cities in 47 states."** Heaviest depth in California (roughly 130 providers claimed across Los Angeles, San Francisco, San Diego, Fresno, Sacramento, Long Beach, Oakland, and San Jose) and a real but thinner presence in Illinois (roughly 26 providers claimed, concentrated in Chicago). Also generates individual city landing pages (e.g., "24 Best Court Reporters in Las Vegas, NV," "25 Best Court Reporters in Houston, TX") – an SEO-driven local-directory pattern.

**Caveat:** these are the platform's own claimed counts, not independently verified. Worth spot-checking a CA or IL city page against the real market before treating the numbers as ground truth.

Sources: [stenoscout.com](https://stenoscout.com/), [stenoscout.com/locations/nevada/las-vegas](https://stenoscout.com/locations/nevada/las-vegas/)

---

## Service scope

Directory and lead-generation only. No live-attendance booking flow, no scheduling/coordination tooling, no case-type or court-hearing-versus-deposition distinction visible on the public site. The product is: search → filter by city/credential → compare profiles and reviews → submit a quote request → the provider follows up by email outside the platform.

---

## CSR-supply model

**Self-claimed listings, not scraped public license data.** Reporters "claim free listing" through a provider login/dashboard – closer to a Yelp-style claim flow than to DS's approach of pre-populating every licensed reporter from public CRB data and inviting them to claim it. This means StenoScout's directory is only as complete as the reporters who've bothered to sign up, while DS's directory is complete from day one (every licensed CA reporter is listed, claimed or not) and StenoScout's completeness depends entirely on outbound reporter acquisition. **Reporters own their own client relationship** – StenoScout does not intermediate the booking or the payment; it hands off to email once a quote request is sent. This part of the model matches DS's own "you keep your relationship" positioning.

---

## Visible feature set

- Search and filter by city/state and (implied) credential
- Individual reporter profile pages with bio, services, and aggregated reviews with "sentiment analysis" (site claims to analyze real litigator feedback rather than just star ratings)
- Direct quote-request routing to providers by email – "no middleman, no spam" is the stated positioning
- Reporter dashboard for managing a claimed listing and subscription tier
- SEO content: a "Court Reporter Rate Guide 2026" and per-city "Best Court Reporters in [City]" pages, clearly built for organic search traffic
- Reporter RPR-badge display (a credential signal, though not confirmed as independently verified vs. self-reported)

Sources: [stenoscout.com](https://stenoscout.com/), [stenoscout.com/advertise](https://stenoscout.com/advertise/)

---

## Build maturity signals

Reads as a live, real, self-funded or bootstrapped small product rather than a venture-backed platform:
- Real Stripe billing, real pricing tiers, real per-city content at scale (dozens of generated city pages)
- Single named founder ("Nick"), no funding, no press coverage found in this pass, no named team beyond the one bio
- SEO-first content strategy (rate guides, city "best of" pages, editorial guidelines page) suggests an organic-growth playbook, not a paid-acquisition one – notably similar in spirit to DS's own $0-budget, SEO-leaning growth plan
- No mobile app, no evidence of messaging or payments infrastructure – a lighter build than DS's own reduced-scope MVP, which does have in-app-adjacent messaging and invoicing/get-paid tooling

---

## Strengths vs. DS

- **Real nationwide reporter volume today.** 1,122+ claimed providers across 47 states is more supply-side coverage than DS has anywhere outside California right now – directly relevant given DS's Illinois expansion is next and StenoScout already claims Chicago-area listings.
- **Aggregated reviews with sentiment analysis** – a trust-signal feature DS doesn't have yet (DS has ratings/testimonials designed but not yet published, per the scaling roadmap).
- **SEO muscle already built** – dozens of city landing pages and rate-guide content live today, which is exactly the "be findable in search / be the answer an AI cites" channel DS is only starting to build.
- **City-exclusivity tier (City Pro)** is a real monetization lever DS hasn't considered – one paying reporter per city gets priority placement, which could pressure competing reporters in the same market to pay for visibility.
- **Zero-friction attorney side** – no login needed to search or request a quote, slightly lower friction than DS's directory (need to confirm DS's exact current friction level for firm search, but StenoScout's "no account needed" bar is low).

---

## Weaknesses vs. DS – the specific gaps DS can win on

This is the closest analog to DS's own model in the whole competitive set, so the gaps are worth being precise about:

- **No messaging.** Quote requests go out by email; there is no in-platform conversation thread. DS has in-app messaging as a core feature. Once a StenoScout quote request leaves the platform, StenoScout has no further role or visibility – DS keeps the relationship on-platform end to end.
- **No payments or invoicing.** StenoScout is purely a discovery/lead-gen layer; the actual booking, invoicing, and payment for reporting work happens entirely off-platform. DS's reporter get-paid tools (invoicing, payment routing) are a core differentiator StenoScout simply doesn't have. DS's reporter-side revenue comes from a small per-payment fee charged only when a reporter actually collects money through the platform (5% on the free tier, or 2% plus a flat $29/month on Pro) – not from a listing fee, since DS's listing is free – and StenoScout has no equivalent to this at all.
- **No visible reporter rates.** StenoScout explicitly does not show individual reporter pricing in listings – firms have to request a quote and wait. DS's match-preview UX shows the attorney the actual reporter and that reporter's actual rates before they confirm, which is a real, immediate transparency advantage over StenoScout's "request a quote and wait for an email" flow.
- **Claim-only listings, not built from public license data.** StenoScout's directory is only as complete as who's signed up. DS's directory is complete from day one because it's seeded from public CRB license data – a reporter doesn't need to have heard of DS yet to already be listed and findable, which is a meaningfully different (and stronger) cold-start position for the demand side.
- **Pay-to-be-seen creates a pay-to-play dynamic among reporters** (Featured and City Pro tiers explicitly buy placement over other reporters, and City Pro locks out competitors in the same city entirely). This cuts against the "neutral, reporter-friendly" positioning DS can credibly claim, since DS's matching/discovery isn't pay-for-placement.
- **Thin CA/IL depth relative to DS's actual target markets.** ~130 CA providers and ~26 IL providers (StenoScout's own claimed counts) is real but far short of "every licensed reporter in the state," which is what DS starts with in California today. This is the single sharpest structural gap: DS already has the complete-directory advantage StenoScout would need years of outbound reporter acquisition to match.
- **No credential verification pipeline visible.** RPR badges appear self-reported/eligible-for-display rather than independently verified against a state licensing board, unlike DS's CRB-sourced data.

---

## Overlap with our positioning

| DS messaging pillar | StenoScout overlap? | Notes |
|---|---|---|
| Transparent pricing / no hidden fees | Partial | Reporter subscription pricing is public; individual job/reporter rates are not shown to attorneys (quote-request model) |
| No agency cut | Yes | Genuinely a non-agency, direct-connection model – closest overlap of anything in this folder |
| Direct CSR-to-attorney connection, reporter keeps the relationship | Yes | Reporters own the relationship once a quote request is sent – same philosophy as DS |
| Verified credentials | Partial | RPR badge display, not confirmed as independently verified against a licensing board |
| California-specific / Illinois-specific compliance depth | No | Broad-but-thin nationwide coverage, not state-deep |
| Simple / fast / modern UX | Yes | Clean, modern directory UX |
| In-platform messaging + payments | **No** | The clearest, most consequential gap – see above |

**Strategic read:** StenoScout is the philosophically closest existing product to DS's own model – a real non-agency, direct-connection directory with reporters paying for visibility. But it has stopped at the directory layer: no messaging, no payments, no invoicing, no rate transparency at the listing level, and a claim-only (not public-data-seeded) supply model. DS's actual differentiation isn't "we're not an agency" (StenoScout already claims that too) – it's that DS keeps the full transaction on-platform (message, see the matched reporter's real rate, confirm, get paid) where StenoScout hands the relationship off to email after the first quote request. Worth watching for feature creep in this direction; if StenoScout adds messaging or payments, the products get much closer.

---

## Open questions

- Real reporter count and city depth – the "1,122+ across 47 states" figure is self-reported; worth a periodic spot-check against real CA/IL license counts as DS's own directories mature.
- Any funding or backing beyond a single named founder? Not found in this pass.
- Does StenoScout have any plans (job postings, roadmap language, changelog) suggesting it will add messaging or payments? Not visible on the public site this pass – worth re-checking periodically given how close the philosophical overlap already is.
- How does the "City Pro" one-per-city exclusivity actually perform in markets where DS is also recruiting reporters (Bay Area, LA) – could a competing reporter's exclusive placement affect DS's own reporter-acquisition conversations in that city?
- Real review volume and quality – "sentiment analysis" on reviews is claimed but sample size/authenticity not verified in this pass.
