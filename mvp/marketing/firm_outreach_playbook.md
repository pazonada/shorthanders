# Firm outreach playbook – getting the first ~50 firms

The firm side of the plan, at ~$0 and two people. Built on the v1 research (target list,
practice areas, the paralegal-as-buyer insight) re-based for the reduced-scope MVP: a
directory + messaging + invoicing, sold as a **monthly firm subscription** – no matching,
no transaction fee. Supersedes the old `mvp/docs/first_50_firms_plan.md`.

## Step 0: supply before demand

**You can't sell a firm a subscription to an empty directory.** A firm paying to search
needs to see real reporters, with filled-out profiles, in their county. So before chasing
firms, get reporters to claim profiles in the launch counties (free + easy for them – see
[`csr_email_outreach.md`](../docs/csr_email_outreach.md) and the in-app "Invite a firm"
flow). Aim for enough claimed reporters in the Bay Area counties that the directory looks
alive there.

## Who to sell to

**The paralegal / legal secretary / office manager – not the partner.** Partners say "get
me the transcript"; the assistant picks the vendor. At a small firm they have real
discretion without sign-off. The whole game is being the easiest option for that person.

## Who to target (practice areas, best first)

Ranked by how much court-reporter work they generate (from `firm_priority_starter.md`):

1. **Insurance defense** – high deposition volume, price-sensitive (carriers audit line items).
2. **Personal injury – plaintiff** – every case has depositions; cost-conscious contingency model.
3. **Family law – contested / high-asset** – depositions + hearing-transcript appearances (Rosie's network).
4. **Employment – plaintiff** – deposition-heavy.
5. **Medical malpractice – plaintiff** – fewer cases, but long 200+ page expert depos.
6. **Civil / commercial litigation** – steady work.
7. **Probate / trust litigation** – lower volume, long complex matters.

**Skip:** BigLaw (100+), transactional (M&A, corporate, securities, real estate),
immigration, pure criminal defense. Sweet spot is **5–50 attorneys (ideal 10–30)**.

**Geography: Bay Area first** – Santa Clara, Contra Costa, Alameda, SF. Concentrate all
~50 firms in the counties where you have reporter density. LA waits.

## The starter target list (26 firms, researched)

Full list with sizes and cities in
[`research/firm_priority_starter.md`](../../research/firm_priority_starter.md); tracker at
[`research/firm_outreach_tracker_seed.csv`](../../research/firm_outreach_tracker_seed.csv)
(paralegal names/emails still blank – enriching those is the first concrete task). Named
anchors include:

- **Rouda Feder Tietjen & McGuinn** – SF, PI/med-mal
- **Dolan Law Firm** – SF + Oakland, PI/employment
- **Bowles & Verna LLP** – Walnut Creek (Contra Costa anchor)
- **Lonich Patton Ehrlich Policastri (LPEP)** – San Jose, family law
- **Hoover Krepelka** – San Jose, largest Silicon Valley family-law firm
- **Mello & Pickering**, **Morgan Tidalgo Sukhodrev & Azzolino** – San Jose family law
- **Siegel LeWitter Malkani** – Oakland employment; **Venardi Zurada** – Oakland PI/employment
- **Talbot Law Group**, **Albertson & Davidson** – Walnut Creek / probate
- **Sack Rosendin** – Oakland insurance defense; **Ridley Master** – San Mateo insurance defense

## Channels (best first, all near-$0)

1. **Reporter-to-firm referrals** – built into the product. A reporter invites the firms
   they already work with; the firm joins free to pay/message them and saves the reporter.
   Warmest and cheapest, seeds both sides at once.
2. **Rosie's warm network** – her family-law and paralegal contacts; personal intros.
3. **Handwritten postcards** to the target firms – see the campaign below.
4. **Free/guest attendance** at Bay Area paralegal association meetings (SFPA luncheons,
   East Bay PA, PASCCO, SCCoLPA). Attend as guests – no paid sponsorships or booths.
5. **Bar / paralegal listservs + LinkedIn organic** – Rosie posts to family-law sections.
6. **Cold email** to enriched paralegal contacts – last, after warm channels.

## The handwritten-postcard campaign

The right physical channel for this budget and buyer. Handwritten = high read-rate,
near-zero cost, and two people can do it at a kitchen table.

- **Who:** the target firms above, addressed to "Office Manager / Paralegal" (or a named
  contact once enriched). Boutique firms where the person opening the mail is the person
  who hires reporters.
- **The hook (use the real invoice evidence):** lead with the agency-markup shock. From
  [`agency_invoice_evidence.md`](../../research/agency_invoice_evidence.md), a real CA
  transcript bill was **$2,311, of which $908 (39%) went to the agency, not the reporter**.
  Postcard front: *"You paid $2,311 for a transcript. $908 of it never reached the
  reporter."* Back: *"Find and hire California court reporters directly – no agency
  markup. [site URL]"* + a QR code + the founding-firm code (below).
- **Cost:** postcard stock + a stamp each. That's it. No printing house, no illustration,
  no chocolate.
- **Tracking:** put a unique code / QR-tagged URL on the postcard so you can tell which
  firms responded (log in the tracker CSV).

## The founding-firm incentive

**A short free trial + a founding-firm discount code for year one.** (Confirmed direction
2026-07-19; Monarch-style.)

- **Why this shape:** the free trial removes the risk of trying; the discount code rewards
  commitment, is **shareable** (built-in referral), and – because you still charge
  something – teaches you what firms will actually pay and lets you raise prices later
  without a takeaway. Free-forever perks teach you none of that.
- **One code, both channels:** the same founding-firm code is the thing a **reporter hands
  their firm** in the in-app invite *and* the thing printed on the **postcard**. One
  mechanic powers referrals and mail.
- **Numbers are yours to set** (trial length, discount %). Keep them simple and legible.
- **Non-pricing perks too:** founder-led onboarding, a direct line, first dibs on features,
  a say in the roadmap. Free to give, and they matter to early firms.

## Onboarding (re-mapped to the subscription model)

High-touch and manual fits two people perfectly. Milestones, re-based off the retired
order/escrow flow:

1. Firm subscribes (or starts trial) → founder-led welcome, help them run their first search.
2. First reporter messaged → check in within a day.
3. First invoice paid through the platform → confirm it went smoothly.
4. After a few weeks of real use → ask for a referral to another firm ("know another firm
   that would benefit?").

## North-star metrics (subscription model)

Not orders/matches (retired). Track: firms subscribed + actively searching/messaging;
reporters listed + invoicing; **reporter→firm referral conversion** (invites sent → firms
joined); trial → paid.

## What we dropped from the v1 firm plan (and why)

- **Insurance-carrier "preferred vendor" scheme** – needed cost-savings data and volume
  routing the directory doesn't produce. (Defense *firms* stay as targets; carrier play is out.)
- **Deluxe mailers** (commissioned comic, chocolate boxes, insulated shipping) – budget.
  The plain handwritten postcard is the survivor.
- **Order-based incentives / the "12% undercuts the agency markup" pitch** – no orders, no
  transaction fee. New pitch: "skip the agency markup, the subscription is cheap."

## The honest caveat

The directory is a **harder** firm sell than the old "we match you" model – the firm does
more of the work. That's exactly why the reporter-intro channel and a low price matter so
much: a warm intro from a reporter the firm already trusts, plus a cheap trial and a
founding code, is what overcomes "I'll just call my agency."
