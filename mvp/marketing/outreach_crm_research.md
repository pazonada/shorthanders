# Outreach tracking / lightweight CRM – research

**Question:** what's the best $0-ish tool to track who's been contacted (firms and CSRs),
when, on what channel, and whether they opened/replied/signed up – for a solo founder.

**Where this fits:** firm outreach already has a manual tracker –
[`research/firm_outreach_tracker_seed.csv`](../../research/firm_outreach_tracker_seed.csv) – and
a playbook at [`firm_outreach_playbook.md`](firm_outreach_playbook.md). This doc asks whether to
graduate off the CSV, and to what.

---

## What the tool actually needs to do

- **Firms (the priority):** postcards (offline – can't be opened/click-tracked, has to be
  logged by hand), cold/warm email, maybe LinkedIn. Needs a pipeline –
  contacted → opened → replied → signed up – for a Bay Area–then–LA list that's realistically
  in the tens to low hundreds of firms, not thousands.
- **CSRs:** mostly Facebook groups (not trackable by any CRM – it's community presence, not
  outreach) plus a **one-time bulk claim-invite email** to CA's ~5,700 licensed reporters. This
  is a mail-merge blast with open/click tracking, not an ongoing relationship pipeline.
- Founder-friendly: no sales team, minimal setup, has to survive being picked up and dropped
  for weeks at a time without breaking.

These are two different shapes of problem – a **relationship pipeline** (firms) and a
**one-time tracked blast** (CSRs) – which is why the recommendation below splits them.

---

## Candidates evaluated

### HubSpot free CRM
- **Good for this:** exactly the contacted → opened → replied → signed-up pipeline, out of the
  box. Free Gmail/Outlook extension logs and tracks every email you send automatically, so you
  don't have to remember to log activity by hand.
- **Price:** genuinely free forever. Free tier: 1,000 contacts, 2 users, one deal pipeline,
  ~200 email-tracking notifications/month (this exact number is widely reported by third-party
  pricing writeups but I couldn't confirm it on HubSpot's own pricing page – treat it as
  approximate, not gospel). Cheapest paid tier (Starter) is ~$7–20/seat/mo if you ever outgrow
  free, which you almost certainly won't at this volume.
- **Open/reply tracking:** yes, native, via the email integration.
- **Effort solo:** low once set up (~30–60 min); the UI is built for a sales rep, so there's
  some extra chrome (marketing upsells, unused features) to ignore.
- **Downside:** it's an enterprise product wearing a free hat – constant nudges to upgrade,
  and the free tier's automation is deliberately crippled to sell you paid tiers. None of that
  blocks the actual use case here.

### Attio (free)
- **Good for this:** cleaner, more modern UI than HubSpot; good if HubSpot feels bloated.
  Flexible enough to model firms + individual paralegal contacts.
- **Price:** free for up to 3 seats, 50,000 records, 3 custom objects, ~200–250 tracked emails
  a month.
- **Open/reply tracking:** yes, included free, but the monthly cap is tighter than HubSpot's
  and email sequencing is a paid feature.
- **Effort solo:** low-medium – less battle-tested documentation/community than HubSpot, so
  troubleshooting takes a bit more digging.
- **Downside:** smaller ecosystem, and it's built more for VC/startup relationship tracking
  than sales pipelines – a fine fit here, just less proven.

### Brevo (free) – email sending + a real free CRM in one place
- **Good for this:** unusual in that it's both an email tool and a CRM in the same free
  account. Free tier: up to 300 emails/day (9,000/mo) sending, 100,000 contacts stored, and a
  free Sales pipeline (1 pipeline, up to 50 open deals).
- **Price:** $0 for the above; cheapest paid add-on (Sales Essentials, for unlimited deals) is
  cheap but not needed at this volume.
- **Open/reply tracking:** yes on the email side (opens, clicks). The Sales/CRM side tracks
  pipeline stage, not opens directly – you'd pair Brevo's own email sends with its own CRM to
  get both in one tool.
- **Effort solo:** low-medium; two connected products (Marketing + Sales) inside one account,
  so a bit more surface area to learn than a single-purpose tool.
- **Downside:** the 50-open-deal cap on the free CRM is fine for firms but would be tight if
  you ever ran the CSR side through the same free account as a nurtured pipeline (not the plan
  here – CSRs are a blast, not a pipeline). 300 emails/day means a 5,700-reporter blast takes
  about 19 days to fully go out on the free tier.

### Streak (Gmail-based CRM)
- **Good for this:** lives entirely inside Gmail, so if you already work from Gmail all day
  this is the least context-switching option.
- **Price:** Streak **retired its free CRM/pipeline tier in 2024–2025.** What's still free
  forever is email tracking, snippets, and mail merge (50/day) – useful, but not a pipeline.
  The actual CRM (pipelines, shared views, reporting) now starts at **$49/mo** (or $59/mo
  billed monthly).
- **Open/reply tracking:** yes, and it's free even without the CRM tier.
- **Effort solo:** very low if you're comfortable in Gmail.
- **Downside:** the free plan alone doesn't give you a pipeline anymore, so it doesn't cover
  the "status" half of the ask without paying $49+/mo. Only worth it if the Gmail-native
  simplicity is worth $49/mo to you later.

### folk
- **Good for this:** built for exactly this kind of relationship-building outreach (folk is
  aimed at "warm outreach from a small team"), imports from LinkedIn/Gmail well.
- **Price:** **no permanent free plan** – 2-week trial, then $20/user/mo (annual) minimum.
- **Open/reply tracking:** yes, on paid tiers.
- **Effort solo:** low.
- **Downside:** it's a genuinely good fit for the use case, but it costs money from day one.
  Worth revisiting if HubSpot/Attio start to feel limiting and $20/mo becomes easy to justify.

### Airtable / Notion (DIY spreadsheet-style tracker)
- **Good for this:** total control over the exact fields you want (channel, contacted date,
  postcard sent, status). Free tiers are generous enough for this volume (Airtable: 1,000
  records/base free; Notion: unlimited blocks for a single user free).
- **Price:** $0.
- **Open/reply tracking:** none built in – you'd have to bolt on a separate email tracker
  (see YAMM/Mailtrack below) and manually copy the result over. This is the real cost: two
  tools instead of one, kept in sync by hand.
- **Effort solo:** low to build, but higher ongoing effort than a real CRM because nothing
  updates itself.
- **Downside:** this is roughly what the current CSV tracker already is, just prettier. It
  doesn't solve the "see opens and replies" half of the ask without another tool bolted on.

### Google Sheets + a mail-merge/tracking add-on (YAMM or Mailtrack)
- **Good for this:** the natural fit for the **CSR one-time claim-invite blast** specifically –
  not a pipeline tool, a "send N emails from a spreadsheet and see who opened/clicked" tool.
- **Price:** YAMM free tier sends 50 emails/day with open/click/reply tracking from inside
  Google Sheets (some sources say 20/day – conflicting, worth testing live rather than trusting
  either number); Personal plan (removes the daily cap) is $25/year. Mailtrack's free tier
  reportedly tracks a limited number of opens/month (10, per one source) before nagging you to
  upgrade – less reliable than YAMM for a real campaign; treat both numbers as unconfirmed
  until you test them.
- **Open/reply tracking:** yes, this is the whole point of these tools.
- **Effort solo:** very low – you already have the reporter list in a spreadsheet-shaped form.
- **Downside:** not a CRM, no pipeline, no "status" beyond opened/clicked/bounced. That's fine
  here because the CSR email is a one-time blast, not an ongoing relationship you're managing
  stage-by-stage.

### Apollo.io (free)
- **Good for this:** less a tracker, more a **contact-finding tool** – its free tier is
  generous for finding verified email addresses for paralegals/office managers at target firms,
  which is the actual bottleneck named in the firm playbook ("paralegal names/emails still
  blank").
- **Price:** free tier exists ($0), with a monthly email-credit allowance for finding/verifying
  emails (reported figures for the credit amount vary across sources – some say 10,000/mo,
  others report it's been cut sharply for new signups; don't bank on either number, check what
  your account actually shows). Cheapest paid tier is roughly $49/user/mo if you need more.
- **Open/reply tracking:** has sequences/tracking on paid tiers; not the reason to use it here.
- **Effort solo:** low.
- **Downside:** worth having in the toolkit for list-building, not for outreach tracking. Don't
  confuse "Apollo can send sequences" with "Apollo is your CRM" – it's the wrong tool for the
  primary ask.

### Instantly.ai / lemlist (cold-email-at-scale tools)
- **Good for this:** built for high-volume cold email with inbox rotation, warmup, and
  deliverability tooling – solves problems you don't have yet.
- **Price:** neither has a real free plan. Instantly starts around $37–40/mo (annual); lemlist
  starts around $63/mo (annual). Both require a paid plan to do anything meaningful.
- **Open/reply tracking:** yes, that's their core feature.
- **Effort solo:** low to medium (more setup than a simple CRM – domain warmup, sending
  infrastructure).
- **Downside:** wrong shape of tool for this stage. These are built for spray-and-pray cold
  email at volume; the firm playbook is deliberately warm and concentrated (postcards, Rosie's
  network, referrals, a short target list) – paying $40–60+/mo for cold-email infrastructure
  before there's a proven channel would be spending ahead of the evidence.

### LinkedIn Sales Navigator
- **Good for this:** better search/filtering for finding paralegals and office managers by
  title and firm, and InMail to reach people outside your network.
- **Price:** Core plan is **$119.99/mo billed monthly, or ~$89.99/mo billed annually
  ($1,079.88/yr)**. There's a standard one-time-per-year free trial (1 month, sometimes 2 months
  via a referral link from an existing subscriber) that requires a card on file and
  auto-converts to paid if you don't cancel.
- **Open/reply tracking:** not really its purpose – it's a prospecting/search tool, not an
  outreach tracker.
- **Effort solo:** low to use, but it's a recurring cost for a targeting list that's realistically
  already coming from public sources (county bar directories, firm websites, the
  `firm_priority_starter.md` research).
- **Downside:** ~$90–120/mo is real money against a ~$0 budget, for a channel ("maybe LinkedIn")
  that's third on the channel list behind referrals and postcards. Not worth it yet.

---

## Recommendation

**Firms (the priority) – HubSpot's free CRM.** It's the one tool on this list that does the
whole job – pipeline stages, automatic email open/reply tracking via the Gmail integration, and
a place to log postcard sends by hand – for $0, at a volume (tens to low hundreds of firms)
that will never bump the free-tier caps. Set it up once: import the firm list from
`firm_outreach_tracker_seed.csv`, install the Gmail extension, create one pipeline with stages
matching contacted → opened → replied → signed up, log each postcard send as a manual activity
on the day it's mailed.

**Fallback if HubSpot feels too "sales team" for one person: Attio's free plan.** Same price
($0), cleaner interface, slightly tighter tracked-email cap (~200–250/mo, which is still more
than a solo concentrated campaign needs). Worth a quick trial of both before committing – they
cost nothing to try side by side for a week.

**Don't buy folk, Streak's paid tier, Instantly, lemlist, or LinkedIn Sales Navigator right
now.** All of them are good products, but every one of them costs $20–120/mo for capability
this stage of the business doesn't need yet (either the free alternative already covers it, or
the tool solves a scale problem – high-volume cold email, deep LinkedIn search – that doesn't
exist here). Revisit LinkedIn Sales Navigator specifically if firm outreach via LinkedIn proves
out and the current free-account + occasional-trial approach starts to feel limiting.

**CSRs – don't use the firm CRM for this.** The claim-invite email is a one-time blast, not a
relationship you're managing stage by stage, so it's the wrong shape of problem for a pipeline
tool. Use **Google Sheets + YAMM** (free tier, or $25/year if the daily send cap is annoying) to
send the blast and see opens/clicks – it's already spreadsheet-shaped, matches how the reporter
list already lives, and costs nothing to try first. Facebook-group activity isn't trackable by
any of these tools and shouldn't be forced into one – that's relationship-building, not outreach
to log.

**One adjunct worth having regardless of the above: Apollo's free tier**, purely to find the
paralegal/office-manager email addresses that `firm_outreach_tracker_seed.csv` is currently
missing. That's a list-building tool, not a tracker – use it to fill in the blanks, then log
everything in HubSpot (or Attio) once you're actually reaching out.

### What I couldn't confirm

- HubSpot's exact "email tracking notifications per month" cap on the free tier – reported
  consistently by third parties as ~200/mo, but not stated on HubSpot's own pricing page as
  fetched. Confirm inside the product once signed up.
- YAMM vs. Mailtrack's exact free-tier daily/monthly send-and-track limits – sources disagree
  (YAMM: 20 vs. 50 emails/day; Mailtrack: 10 tracked opens/mo vs. "unlimited"). Test live rather
  than planning around an unconfirmed number.
- Apollo's free-tier monthly credit allowance – reported figures range from ~700 to 10,000/mo
  depending on source and signup date; check what your own account shows after signing up.

---
*Companion docs: [firm_outreach_playbook.md](firm_outreach_playbook.md) ·
[growth_strategy.md](growth_strategy.md) ·
[`research/firm_outreach_tracker_seed.csv`](../../research/firm_outreach_tracker_seed.csv)
(current manual tracker this research is meant to replace or upgrade).*
