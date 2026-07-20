# Open strategic decisions — reduced-scope MVP

One place for the strategy calls still in flight, so they don't live only in chat.
Each item: the question, where it stands, the recommended direction and why, and
what's still open. Update as decisions land.

**Status legend:** DECIDED · LEANING (a recommendation, not yet confirmed by Aud) ·
OPEN · TO-DO (an action, often needing an outside expert).

## Settled anchors (context)
- Dewey Sholes is a **neutral directory + messaging + payment facilitator** — never a
  party to the firm↔reporter agreement. Governs the whole liability posture.
- **Never invent data** — rates/prices/amounts ship blank or user-entered. (See the
  hard rule in memory / the invoice templates.)
- **Files:** pass-through secure links only; the platform stores no audio or deliverables.
- Directory runs on **real CRB data** — 5,705 active CSRs (name, license, city, county,
  method, public email).

---

## 1. Monetization model — DECIDED (shape; prices still TBD)

**Question:** how does DS make money and recoup costs, given (a) CSR contact info is
already public, and (b) firms default to agencies unless they hire direct?

**The model:**
- **Firms:** free to search + see basic (public) info; a **paid monthly subscription**
  unlocks full claimed profiles + messaging + a tidy history of invoices/receipts for any
  reporter who bills them through the platform. Free trial. **This is the main revenue.**
  - **The gate, DECIDED 2026-07-19:** a **free** firm can fully view (and message/pay/save)
    two kinds of reporter only — **unclaimed** profiles (they're just public license data)
    and reporters who **invited or are connected to** the firm. **Every other claimed
    profile is gated:** shown as a **blurred preview behind an "Upgrade to Pro" overlay**
    (Care.com / LinkedIn pattern), and locked reporters show a lock cue in the directory.
    Pro unlocks full profiles + messaging + advanced search for *everyone*. Implemented in
    the prototype (`firmLocked()` in `_app_05_directory.jsx`; a `firmPlan` free/pro toggle
    lets you demo the gate lifting).
- **Reporters:** free to claim, build a full profile, appear in search, and receive/reply
  to messages. To actually get *paid* through the site, one of two ways:
  - **"Pay only when you get paid"** — a small fee taken out of the reporter's side of each
    payment (invisible to the firm). Best for part-time / occasional reporters, who pay
    nothing in the months they don't use it.
  - **Optional flat monthly plan** — better value for heavy users who'd rather not count.
- **The firm never sees a Dewey Sholes fee on an invoice.** They pay the exact amount the
  reporter billed. Any DS fee comes out of the reporter's side. **This is what prevents the
  firm-balks-at-a-surprise-fee dispute Aud was worried about.**

**What Stripe actually costs us (this is the key correction):**
- The **processing fee** — cards 2.9% + $0.30; ACH ~0.8% capped at $5 — is the **reporter's**
  cost, deducted from their payment, exactly like they'd pay Square/PayPal/QuickBooks to
  accept a card anywhere. We pass it through; it never touches our books. **We do not eat
  the 2.9%.**
- **Our** real Stripe cost is only the Connect overhead: roughly **$2/month per active
  reporter account** (only in months they actually get paid) + a small payout fee
  (~0.25% + $0.25). A reporter who doesn't invoice that month costs us ~nothing.
- *(Stripe's published rates as of this writing — verify on stripe.com/pricing; they change.)*

**Why this works:**
- **You can't charge for the directory itself** — the contact data is public. So browsing
  and messaging stay cheap/free so people actually use the site. What people pay for is the
  enriched profile, the messaging, and the get-paid tools — none on the state site.
- **A subscription easily covers our real Stripe cost** (~$2/active reporter/month), because
  we're *not* trying to claw back the 2.9% — that was never ours. Firm subscriptions are
  almost pure profit (firms generate no processing cost at all).
- **The reporter "pay only when you get paid" option earns something from the part-timers**
  who'd never buy a monthly plan — without any firm-facing fee, so no disputes.
- **Off-platform deals don't cost us.** We charge for access, not the job, so a firm and
  reporter working together off-site doesn't lose us revenue — we already got the subscription.

**On the cost worry:** at low usage the tools are basically free (Vercel/Supabase/Resend/
Stripe free tiers; the processing fee is the reporter's). Not trying to turn a profit at
launch — trying to prove people use it. Turn on serious pricing once there's real usage.

**Still open:**
- **Actual prices** (firm subscription, reporter flat plan, and the reporter per-payment %):
  unset — do not invent. Aud sets them.
- Firm subscriptions will be slow to grow — a catch-22 (firms won't pay until lots of
  reporters have rich profiles; reporters won't fill profiles until firms are there), plus
  the habit of just calling an agency. Start with the firms most likely to say yes: ones
  that already hire reporters directly, and transcription work (where agencies are weakest).

---

## 2. Deposition scope & positioning — LEANING (show it; don't market it; one legal check)

**Question:** the full-version DS avoided depositions (agency-saturated + feared liability).
Should the reduced directory show whether a CSR does depos, and does that add liability?

**Leaning / recommendation:**
- **The "no depos" rule was an old-model rule.** That version sat *inside* the transaction
  (matching/booking). The reduced model is a neutral directory + payment rail — DS is **not
  the hiring party for any work** — so the depo-vs-transcription liability gap largely
  collapses; exposure is the same (near-zero by design) for both.
- **"Allow hiring for depos" isn't a lever you have.** In a directory, the parties contract
  directly off-platform regardless, and an invoice doesn't even reveal depo vs. hearing. The
  only real levers: what the directory **shows**, how you **position**, and whether you
  **facilitate depo payments**.
- **Show depo capability** in the directory — self-reported, low-risk, honest (most CSRs do
  depos). Already a work-type filter.
- **Position/market on transcription + direct-hire, not depos** — strategic, not legal:
  depos are agency-owned; that's a head-on war to avoid. Let the directory reflect reality;
  keep the marketing on the underserved gap.

---

## 3. Deposition-neutrality legal check — TO-DO

The one real depo-specific concern is **not** generic hiring liability — it's the regulatory
overlay on deposition-reporter **neutrality and financial disclosure** (the neutral-officer
rules; California has history/rules around reporting firms giving attorneys incentives or
having undisclosed financial arrangements). Court-audio transcription does not carry this.

**Action:** have a **court-reporting-industry attorney** — not Rosie (family-law, not a
CSR-regulatory expert) — opine on whether DS's subscription/payment model implicates
deposition-reporter neutrality/incentive rules **before** actively facilitating depo
payments. Consider a terms line stating DS doesn't arrange depositions or act as a
deposition officer.

**Shareable brief for the lawyer (and Rosie):** `mvp/docs/legal_question_deposition_neutrality.md`
— plain-English explanation + the exact question(s) to ask.

---

## 4. Messaging & notifications — DECIDED (async threads) + engineering guidance

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
- Don't rely on email alone — in-app unread badge for logged-in users; PWA **Web Push** later
  as a second channel.
- Put sender + snippet + reply link *in* the email so it's actionable even if unclicked.
- Resend is fine with the above in place; if it still flakes, **Postmark** has the strongest
  transactional deliverability. Fix the fundamentals first or any provider inherits the mess.

---

## 5. Compliance posture — keep it light (LEANING)

Aud is a solo founder and wants to avoid heavy compliance overhead (SOC 2, etc.). Good news:
the way this is built already keeps the burden small.

- **SOC 2 is not required.** It's a voluntary security audit that big enterprise buyers
  sometimes demand. A directory for solo reporters and small firms doesn't need it. Revisit
  only if a large customer ever makes it a condition of signing.
- **The risky data is outsourced, on purpose:**
  - Payments + card data → **Stripe** (card security / PCI is Stripe's job; we never see card numbers).
  - Reporter identity + bank/tax info for payouts → **Stripe Connect** (we don't store SSNs or bank details).
  - Sign-in + passwords → **Supabase Auth** (we don't store raw passwords).
- **We store no files** — audio/deliverables are pass-through links only. This is the single
  biggest thing keeping sensitive-document handling off our plate. Keep it that way.
- **What we still owe (light):** a plain privacy policy, honoring reasonable data
  access/deletion requests, and basic security hygiene. California's consumer-privacy law
  (CCPA/CPRA) has size thresholds a tiny startup is under at first, but a privacy policy +
  deletion process is good practice regardless.
- Not legal advice — confirm specifics with the same lawyer during the terms-of-service review.

## 6. Shared files & insecure links — DECIDED (stay hands-off)

**Question:** what if a reporter shares a transcript (depo or hearing) through messaging via
an insecure link (a public Google Doc, a personal server)?

**Position:** low legal exposure, because DS is the **message pipe, not the file host** —
we don't store, secure, host, or vet files or links; we hold only the URL text in a message,
like email or Slack. The person who chose the insecure link is responsible for it. The
"store no files" rule is what keeps us out of custody — protect it.

Two real risks to manage anyway: **reputation** (a leak "through Dewey Sholes" looks bad even
if not our fault) and the fact that **deposition transcripts are more sensitive** than
hearing transcripts (hearings are usually public record; depos can be confidential/sealed).

**How we handle it (cheap, keeps us out of custody):**
- Terms clause spelling out that DS doesn't store/secure/vet files or links and that users are
  solely responsible for how they share materials and for confidentiality/protective orders.
  *(Added to the prototype Terms page.)*
- A nudge in the messaging composer when a link is pasted: "only share links you control;
  we don't store or secure files." *(Added.)*
- Do **not** scan/vet/"secure" links — the more we police them, the more we look responsible.
  Hands-off + clear user responsibility + a helpful nudge is the safest posture.
- Confirm the terms wording in the one-time terms-of-service review (same lawyer as the depo
  question). Not legal advice.

## Decisions still needed from Aud
- [x] **Monetization shape (§1) — DECIDED 2026-07-17.** Firms pay a subscription for full
  profiles + messaging; reporters free to list, pay only to get paid (per-payment fee for
  occasional users OR flat plan for heavy users); no firm-facing transaction fee.
- [x] **Firm access gate (§1) — DECIDED 2026-07-19.** Free firms fully view only unclaimed
  profiles + reporters who invited/are connected to them; every other claimed profile is a
  blurred "Upgrade to Pro" preview. Pro unlocks everyone. Implemented in the prototype.
- [ ] Set prices when ready — don't invent them (firm sub, reporter flat plan, reporter per-payment %).
- [ ] Engage a reporting-industry attorney on the deposition-neutrality question (§3).
- [ ] Confirm positioning: lead with transcription/direct-hire; directory still shows depos (§2).
