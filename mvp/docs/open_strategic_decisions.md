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

## 1. Monetization model — OPEN (leaning: two-sided subscription, no transaction cut)

**Question:** how does DS make money and recoup costs, given (a) CSR contact info is
already public, and (b) firms default to agencies unless they hire direct?

**Leaning / recommendation:**
- **Charge for access and tools, not for the transaction.** No per-job or per-payment cut.
- **Firms:** free to search + see basic (public) info; a **paid subscription** unlocks
  full enriched profiles + messaging + a consolidated invoice/receipt archive. Free trial.
- **CSRs:** free to claim, build a full profile, appear in search, and receive/reply to
  messages; **Pro** subscription for invoicing, card/ACH payments, payout tracking, and a
  1099/tax-ready archive + a "Pays on Dewey Sholes" badge.
- **Payments carry no DS fee** — the firm pays the exact invoice; Stripe's processing fee
  is the CSR's (standard merchant), passed through via Stripe Connect.

**Why this shape:**
- The **directory isn't the moat** (the data is public). Discovery/messaging must stay
  free enough to build liquidity; the paid value is the enriched profile, the messaging
  convenience, and the get-paid tools — none of which the state site offers.
- **No transaction cut = no disputes.** Aud's key catch: a per-invoice platform fee makes
  firms balk after the fact. Removing it eliminates that failure mode entirely.
- **Leak-resistant:** charging for access (not the deal) means off-platform hiring doesn't
  cost DS revenue the way a transaction fee would.
- **Predictable recurring revenue** covers fixed costs; success-based fees are lumpy and
  zero until volume.
- Firms are the side with money → primary revenue. CSR Pro is secondary, but getting paid
  is a real CSR pain point today, so Pro can still earn even when a firm bypasses.

**Cost-anxiety reality check:** at low volume, infra is ~free (Vercel/Supabase/Resend/
Stripe free tiers; Stripe's per-transaction fee is passed to the CSR). Not trying to be
profitable at launch — proving usage. Monetization is a switch flipped after liquidity.

**Open sub-questions:**
- **Firm access gate** (leaning yes): basic public info free; full profiles + messaging
  behind the paywall, shown as a blurred teaser (the Care.com/LinkedIn conversion mechanic).
- **If a transaction fee is ever added later:** make it **CSR-absorbed** (invisible to the
  firm) so it can't trigger the dispute. Not at launch.
- **Actual prices:** unset — do not invent. Aud sets them when ready.
- Firm subscriptions are a **slow build** (chicken-and-egg + agency default). Beachhead:
  direct-hire / transcription-leaning firms.

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

## Decisions still needed from Aud
- [ ] Confirm monetization shape (§1): two-sided subscription, no transaction cut.
- [ ] Confirm the firm access gate (§1): full profiles + messaging behind the firm paywall.
- [ ] Set prices when ready — don't invent them.
- [ ] Engage a reporting-industry attorney on the deposition-neutrality question (§3).
- [ ] Confirm positioning: lead with transcription/direct-hire; directory still shows depos (§2).
