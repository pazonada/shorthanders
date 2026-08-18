# Open strategic decisions – reduced-scope MVP

One place for the strategy calls still in flight, so they don't live only in chat.
Each item: the question, where it stands, the recommended direction and why, and
what's still open. Update as decisions land.

**Status legend:** DECIDED · LEANING (a recommendation, not yet confirmed by Aud) ·
OPEN · TO-DO (an action, often needing an outside expert).

## Settled anchors (context)
- Shorthanders is a **neutral directory + messaging + payment facilitator** – never a
  party to the firm↔reporter agreement. Governs the whole liability posture.
- **Never invent data** – rates/prices/amounts ship blank or user-entered. (See the
  hard rule in memory / the invoice templates.)
- **Files:** pass-through secure links only; the platform stores no audio or deliverables.
- Directory runs on **real CRB data** – 5,705 active CSRs (name, license, city, county,
  method, public email).

---

## 1. Monetization model – DECIDED (shape; FIRM price $49/user locked, reporter prices still TBD)

**Question:** how does Shorthanders make money and recoup costs, given (a) CSR contact info is
already public, and (b) firms default to agencies unless they hire direct?

**The model:**
- **Firms:** free to search + see basic (public) info; a **paid monthly subscription**
  unlocks full claimed profiles + messaging + a tidy history of invoices/receipts for any
  reporter who bills them through the platform. Free trial. **This is the main revenue.**
  - **The gate, DECIDED 2026-07-19:** a **free** firm can fully view (and message/pay/save)
    two kinds of reporter only – **unclaimed** profiles (they're just public license data)
    and reporters who **invited or are connected to** the firm. **Every other claimed
    profile is gated:** shown as a **blurred preview behind an "Upgrade to Pro" overlay**
    (Care.com / LinkedIn pattern), and locked reporters show a lock cue in the directory.
    Pro unlocks full profiles + messaging + advanced search for *everyone*. Implemented in
    the prototype (`firmLocked()` in `_app_05_directory.jsx`; a `firmPlan` free/pro toggle
    lets you demo the gate lifting).
- **Reporters:** free to claim, build a full profile, appear in search, and receive/reply
  to messages. To get *paid* through the site, everyone pays a **per-payment fee** taken from
  the reporter's side (invisible to the firm), on a two-tier structure:
  - **Base fee (pay-per-invoice)** – the higher per-payment fee, no monthly cost. Best for
    part-timers, who pay nothing in months they don't bill through us.
  - **Pro (flat monthly + a lower per-payment fee)** – for heavier billers, the flat fee plus
    a reduced cut beats the base fee. Working numbers ~5% base / ~2% Pro (not final).
  - **Two-tier fee DECIDED 2026-07-20:** Pro **reduces** the fee, it does **not waive** it –
    so the per-payment fee scales with total volume across *all* reporters instead of being
    capped, and Pro users pay the sub AND a smaller fee. This **reverses the earlier
    "Pro waives the fee" call.** Modeled on the "Revenue model" tab of `revenue_model.xlsx`,
    where the fee often lands ~70% of total revenue. Upgrade point = Pro price ÷ (base − Pro
    fee); at $29 / (5%−2%) that's ~$967/mo of billing.
- **The firm never sees a Shorthanders fee on an invoice.** They pay the exact amount the
  reporter billed. Any Shorthanders fee comes out of the reporter's side. **This is what prevents the
  firm-balks-at-a-surprise-fee dispute Aud was worried about.**

**What Stripe actually costs us (this is the key correction):**
- The **processing fee** – cards 2.9% + $0.30; ACH ~0.8% capped at $5 – is the **reporter's**
  cost, deducted from their payment, exactly like they'd pay Square/PayPal/QuickBooks to
  accept a card anywhere. We pass it through; it never touches our books. **We do not eat
  the 2.9%.**
- **Our** real Stripe cost is only the Connect overhead: roughly **$2/month per active
  reporter account** (only in months they actually get paid) + a small payout fee
  (~0.25% + $0.25). A reporter who doesn't invoice that month costs us ~nothing.
- *(Stripe's published rates as of this writing – verify on stripe.com/pricing; they change.)*

**Why this works:**
- **You can't charge for the directory itself** – the contact data is public. So browsing
  and messaging stay cheap/free so people actually use the site. What people pay for is the
  enriched profile, the messaging, and the get-paid tools – none on the state site.
- **A subscription easily covers our real Stripe cost** (~$2/active reporter/month), because
  we're *not* trying to claw back the 2.9% – that was never ours. Firm subscriptions are
  almost pure profit (firms generate no processing cost at all).
- **The reporter "pay only when you get paid" option earns something from the part-timers**
  who'd never buy a monthly plan – without any firm-facing fee, so no disputes.
- **Off-platform deals don't cost us.** We charge for access, not the job, so a firm and
  reporter working together off-site doesn't lose us revenue – we already got the subscription.

**On the cost worry:** at low usage the tools are basically free (Vercel/Supabase/Resend/
Stripe free tiers; the processing fee is the reporter's). Not trying to turn a profit at
launch – trying to prove people use it. Turn on serious pricing once there's real usage.

**Prices (firm = DECIDED $49/user; reporter side still working numbers):**
- **Reporters:** free to list + message. Get paid at **5% per payment** (pay-as-you-go, no
  monthly) or **Pro $29/month + 2% per payment**. Pro crossover ≈ **$970/mo** of billing.
  *(Still working numbers.)*
- **Firms:** **$49/month per user (per seat)** – **HARD / decided 2026-08-01** (Aud). This is up
  from the old $39 **and now per seat**, which **reverses the earlier "$39/firm, not per seat"**
  call; the live prototype copy already reads "$49/month per user." A **firm-wide** single-price
  plan (one price for the whole office) stays **deferred** – gauged via the signup interest
  question, not offered yet. **Annual is $539/year (1 month free)** – already live on the For firms
  page (`mvp/src/_app_04_marketing.jsx`) alongside the $49/mo per-seat price. Founding-firm codes (capped/private)
  **MAY stack** with any annual discount – exposure is bounded by the code cap; only restrict
  stacking for a future public/uncapped promo. The free
  tier stays generous – message/pay/save any reporter who invited or is connected to you; the
  subscription only gates *discovery* of new reporters via full search. Live on the Pricing page,
  the reporter Payments tab, and the firm Subscription tab. Still working numbers – validate with
  Rosie's network before scaling.

**Why reporter messaging is free – intentional, not a leak (decided 2026-07-24):**
Charging the scarce supply side to *respond to inbound demand we generate* would stall the
marketplace and the reporter-invite flywheel, and mirror the agency behaviour we position against.
We charge each side for what IT values: firms pay for **access** (subscription); reporters pay a
small fee for **getting paid**. The real risk isn't free messaging – it's **payment
disintermediation** (parties meet on Shorthanders, transact off it). Mitigations:
- **Let the firm pull the payment onto the rails.** Firms want electronic payment and dislike
  check-only reporters (see `firm_electronic_payment` memory), so firm-side convenience drags the
  transaction – and the fee – on-platform regardless of reporter habit. Strongest lever.
- **Make on-platform payment strictly better** – instant payout, auto-invoice from the thread,
  tracking, 1099-K handling. Path of least resistance.
- **Reviews-after-payment flywheel** – verified ratings only come from on-platform payments, so
  reporters *want* to invoice through Shorthanders (`reviews_and_ratings.md`).
- **The firm subscription is the reliable, recurring anchor;** reporter per-payment fees are the
  variable upside that grows as the payment habit forms.

**The one number to validate (OPEN):** the **digital-invoicing adoption rate** – what share of
reporters who message on Shorthanders actually invoice/collect through Shorthanders vs. off-platform. The whole
supply-side revenue line rides on it. Ask Rosie's network + pilot reporters/firms.

**Invoice payment method – card vs ACH (LEAN 2026-08-06, confirm before the Stripe build):**
When a firm pays an invoice, Pay opens the reporter's Stripe hosted payment page. *(Prototype today
is simulated – `pay()` in `_app_10_firm.jsx` just flips the invoice to paid; real hosted-page wiring
is a TODO in `integration_checklist.md`.)* Two questions, now answered as a lean:
- **Who picks card vs ACH?** The **firm (the payer) chooses at the Stripe page** – the reporter does
  not pre-lock a single method. But the method is the **reporter's** cost (card 2.9% + $0.30 vs ACH
  ~0.8% capped at $5), so we shape the default in the reporter's favor rather than forcing a method.
- **Offer both, default to ACH on large invoices – NOT ACH-only (LEAN, Aud 2026-08-06).** Always show
  both methods; **pre-select ACH once the invoice is ≥ $1,000**, with card still one tap away. Card
  stays the default below $1,000.
- **Why $1,000:** Stripe's ACH fee caps at $5 above ~$625, while the card fee keeps climbing – at
  $1,000 the reporter loses ~$29.30 to a card vs. ~$5 to ACH (a ~$24 gap), and it only widens (~$39
  at $1,500). Below $1,000 the card premium is small (< ~$29) and card clears instantly vs. ACH's
  1–4 business days, so nudging there mostly annoys. $1,000 is the clean point where the reporter's
  savings start to matter, erring toward protecting the party who actually bears the fee. Common B2B
  guidance lines up: ACH is the smarter call over ~$500 and cards stay fine under ~$5k, so $1,000
  sits sensibly in that band. **Tunable** once we see real invoice sizes – the sample invoices
  already cluster $384–$1,650, so a lot of real ones will straddle this line.
- **Still open:** (1) whether a reporter may **hard-restrict to ACH-only** (protects their margin,
  but a firm that wants card points/float then can't) – current lean is **no, keep both**; (2)
  confirm the $1,000 threshold against real invoice-size data before locking it in.

**Considered feature (OPEN) – firm-initiated payment request:** today a payment needs the CSR to
send an invoice first, so a firm that wants to pay electronically can't self-serve. Consider a
"request an invoice / request to pay" action from a firm on a connected reporter: the firm signals
the matter + amount to confirm, the reporter one-taps to issue the invoice. Directly lowers the
friction that keeps payments off-platform. Not built; worth prototyping.

**Firms finding reporters they already know – DECIDED/built 2026-07-28 (Rosie channel):** a firm
often already has the reporter's name (off the transcript cover, jotted at a hearing). Three linked
mechanics let that pull both sides onto the platform: (1) the **For firms** page pitches "Already
worked with a reporter? Find them again"; (2) the **gate now treats a name/license search as
non-discovery** – a free firm that searches a reporter's name (substring match, not just exact) or
exact license number unlocks *that* reporter free; broad filtered browsing still needs Pro
(`searchUnlockIds` + `store.directUnlocked` in `_app_05_directory.jsx`); (3) on an **unclaimed**
profile a firm sees an **"Invite this reporter"** nudge → confirmation + auto-save, so the lookup
pulls the reporter in (they connect once they claim). Rationale: charging Pro to reach someone you
already know adds friction to the warmest lead; Pro's value is *discovery* of new reporters.

**Still open:** Firm subscriptions grow slowly – a catch-22 (firms won't pay until reporters have
rich profiles; reporters won't fill profiles until firms are there), plus the just-call-an-agency
habit. Start with firms most likely to say yes: ones already hiring reporters directly, and
transcription work (where agencies are weakest).

---

## 2. Deposition scope & positioning – LEANING (show it; don't market it; one legal check)

**Question:** the full-version Shorthanders avoided depositions (agency-saturated + feared liability).
Should the reduced directory show whether a CSR does depos, and does that add liability?

**Leaning / recommendation:**
- **The "no depos" rule was an old-model rule.** That version sat *inside* the transaction
  (matching/booking). The reduced model is a neutral directory + payment rail – Shorthanders is **not
  the hiring party for any work** – so the depo-vs-transcription liability gap largely
  collapses; exposure is the same (near-zero by design) for both.
- **"Allow hiring for depos" isn't a lever you have.** In a directory, the parties contract
  directly off-platform regardless, and an invoice doesn't even reveal depo vs. hearing. The
  only real levers: what the directory **shows**, how you **position**, and whether you
  **facilitate depo payments**.
- **Show depo capability** in the directory – self-reported, low-risk, honest (most CSRs do
  depos). Already a work-type filter.
- **Position/market on transcription + direct-hire, not depos** – strategic, not legal:
  depos are agency-owned; that's a head-on war to avoid. Let the directory reflect reality;
  keep the marketing on the underserved gap.

---

## 3. Deposition-neutrality legal check – TO-DO

The one real depo-specific concern is **not** generic hiring liability – it's the regulatory
overlay on deposition-reporter **neutrality and financial disclosure** (the neutral-officer
rules; California has history/rules around reporting firms giving attorneys incentives or
having undisclosed financial arrangements). Court-audio transcription does not carry this.

**Action:** have a **court-reporting-industry attorney** – not Rosie (family-law, not a
CSR-regulatory expert) – opine on whether Shorthanders' subscription/payment model implicates
deposition-reporter neutrality/incentive rules **before** actively facilitating depo
payments. Consider a terms line stating Shorthanders doesn't arrange depositions or act as a
deposition officer.

**Shareable brief for the lawyer (and Rosie):** `mvp/docs/legal_question_deposition_neutrality.md`
– plain-English explanation + the exact question(s) to ask.

**Update 2026-07-29 – Rosie's read (no written opinion needed):** Rosie says we do **not**
need a formal legal opinion on whether Shorthanders can be a **pass-through / referral** for depo jobs.
Her reasoning: the concern about a non-reporter routing depo work rests on an **archaic law
that doesn't apply to our situation** (directory + payment rail, Shorthanders is not the hiring party).
She's confident, so we're **not commissioning an opinion** on the broker/pass-through angle.
Two things to keep straight so this green-light doesn't get over-read:
- Her read covers the **broker/pass-through** question. The narrower concern this section was
  actually raising – deposition-reporter **neutrality / financial-disclosure** rules – is a
  CSR-regulatory question she flagged herself as outside her family-law expertise. Confirm
  with her whether "doesn't apply" also covers that, or only the broker angle, before we
  actively facilitate depo *payments*.
- Separate issue, not covered here: **money custody** (money-transmitter/escrow) only arises
  if Shorthanders ever *holds* funds. Using Stripe Connect (platform never holds the money) keeps us
  clear; don't let this note be remembered as a green-light on holding money.

---

## 4. Messaging & notifications – DECIDED (async threads) + engineering guidance

**Decision:** **async in-app message threads (email-style), not real-time chat.** Fits the
B2B inquiry pattern (no presence expectation), gives the in-platform record the paid product
+ dispute trail need, and is far lower-maintenance than realtime (no websockets/presence).
The prototype already does this.

**The real risk is notification reliability** (Aud's Resend pain on disclosurewatch.com).
"Doesn't send" is usually deliverability or invisible failures, not the provider. Do once:
- Authenticate the sending domain (SPF/DKIM/DMARC on a subdomain; warm it).
- Trigger sends from the **database** (Supabase insert trigger on a new message), not a
  request handler that might not complete.
- Log every attempt + wire **delivery webhooks** (delivered/bounced) so failures are visible.
- Add **retry**.
- Don't rely on email alone – in-app unread badge for logged-in users; PWA **Web Push** later
  as a second channel.
- Put sender + snippet + reply link *in* the email so it's actionable even if unclicked.
- Resend is fine with the above in place; if it still flakes, **Postmark** has the strongest
  transactional deliverability. Fix the fundamentals first or any provider inherits the mess.

---

## 5. Compliance posture – keep it light (LEANING)

Aud is a solo founder and wants to avoid heavy compliance overhead (SOC 2, etc.). Good news:
the way this is built already keeps the burden small.

- **SOC 2 is not required.** It's a voluntary security audit that big enterprise buyers
  sometimes demand. A directory for solo reporters and small firms doesn't need it. Revisit
  only if a large customer ever makes it a condition of signing.
- **The risky data is outsourced, on purpose:**
  - Payments + card data → **Stripe** (card security / PCI is Stripe's job; we never see card numbers).
  - Reporter identity + bank/tax info for payouts → **Stripe Connect** (we don't store SSNs or bank details).
  - Sign-in + passwords → **Supabase Auth** (we don't store raw passwords).
- **We store no files** – audio/deliverables are pass-through links only. This is the single
  biggest thing keeping sensitive-document handling off our plate. Keep it that way.
- **What we still owe (light):** a plain privacy policy, honoring reasonable data
  access/deletion requests, and basic security hygiene. California's consumer-privacy law
  (CCPA/CPRA) has size thresholds a tiny startup is under at first, but a privacy policy +
  deletion process is good practice regardless.
- Not legal advice – confirm specifics with the same lawyer during the terms-of-service review.

## 6. Shared files & insecure links – DECIDED (stay hands-off)

**Question:** what if a reporter shares a transcript (depo or hearing) through messaging via
an insecure link (a public Google Doc, a personal server)?

**Position:** low legal exposure, because Shorthanders is the **message pipe, not the file host** –
we don't store, secure, host, or vet files or links; we hold only the URL text in a message,
like email or Slack. The person who chose the insecure link is responsible for it. The
"store no files" rule is what keeps us out of custody – protect it.

Two real risks to manage anyway: **reputation** (a leak "through Shorthanders" looks bad even
if not our fault) and the fact that **deposition transcripts are more sensitive** than
hearing transcripts (hearings are usually public record; depos can be confidential/sealed).

**How we handle it (cheap, keeps us out of custody):**
- Terms clause spelling out that Shorthanders doesn't store/secure/vet files or links and that users are
  solely responsible for how they share materials and for confidentiality/protective orders.
  *(Added to the prototype Terms page.)*
- A nudge in the messaging composer when a link is pasted: "only share links you control;
  we don't store or secure files." *(Added.)*
- Do **not** scan/vet/"secure" links – the more we police them, the more we look responsible.
  Hands-off + clear user responsibility + a helpful nudge is the safest posture.
- Confirm the terms wording in the one-time terms-of-service review (same lawyer as the depo
  question). Not legal advice.

## 7. Message several reporters at once – DECIDED 2026-07-24 (prototyped)

**Question:** a firm shortlisting 5 candidates shouldn't have to copy-paste the same message
into 5 threads. Can we help without building the full v1 job board?

**Decision – a "message several reporters" fan-out, NOT a job board.** From Saved reporters, a
firm drafts **one** message and picks recipients; it sends as **separate 1:1 threads**, one per
reporter. Each reporter sees a normal DM and **never sees they were one of several**; each reply
splits into its own thread. It's pure fan-out over existing messaging – **no applications,
scheduling, escrow, first-claim-wins, or cascade** (all the retired v1 machinery). ~80% of the
job-board's "reach several candidates" value at ~5% of the complexity.

**Guardrails (built):** cap at **10** recipients + it's private per-reporter (no group thread, no
competitive/reverse-auction signal – protects supply-side trust); the compose list flags any
"not taking new work" reporter; copy nudges the firm to keep the message general. Prototype:
`BulkMessageModal` + `store.sendToMany` (`_app_10_firm.jsx` / `_app_11_router.jsx`), entered from
the firm's Saved reporters tab.

**Open:** whether bulk send is a **Pro/subscription lever** (reaching a shortlist is a nice reason
to subscribe); rate-limiting/anti-spam when it's wired to real messaging.

---

## Decisions still needed from Aud
- [x] **Monetization shape (§1) – DECIDED 2026-07-17.** Firms pay a subscription for full
  profiles + messaging; reporters free to list, pay only to get paid (per-payment fee for
  occasional users OR flat plan for heavy users); no firm-facing transaction fee.
- [x] **Firm access gate (§1) – DECIDED 2026-07-19.** Free firms fully view only unclaimed
  profiles + reporters who invited/are connected to them; every other claimed profile is a
  blurred "Upgrade to Pro" preview. Pro unlocks everyone. Implemented in the prototype.
- [ ] Set prices when ready – don't invent them (firm sub, reporter flat plan, reporter per-payment %).
- [ ] Engage a reporting-industry attorney on the deposition-neutrality question (§3).
- [ ] Confirm positioning: lead with transcription/direct-hire; directory still shows depos (§2).
