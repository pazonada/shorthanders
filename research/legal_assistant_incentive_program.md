# Legal assistant incentive program

**Owner:** Aud
**Last updated:** 2026-05-02
**Status:** Draft — for prototype + real build

---

## Why this exists

At law firms, the **partner says "get me the transcript."** The **legal assistant or paralegal decides which platform to use**. They're the operational decision-maker, the actual user, and the de facto buyer.

If we treat them as a buyer — including rewarding them for using us — they become evangelists for Dewey Sholes inside their firm and across their professional network. That's how we win the demand side without spending on paid ads.

This program rewards the legal assistant personally for jobs they book through Dewey Sholes. The rewards go to the *individual*, not the firm.

---

## Reward tiers

Rewards are tied to completed and accepted orders (not just submitted). One legal assistant account = one reward track. **Simple 2-tier structure to control costs in the bootstrapped pilot phase.**

| Tier | Jobs booked | Reward | Est. cost to us | Typical time to reach |
|---|---|---|---|---|
| 1 | 3 | $25 Amazon gift card (digital) | $25 | 1-4 weeks for active users |
| 2 | 10 | Branded Stanley-style insulated tumbler (mailed) | $30-40 incl. shipping | 1-5 months depending on firm volume |

After Tier 2, we'll evaluate based on real data whether to add additional tiers. For the pilot, two milestones is enough to drive behavior without bleeding cash.

### How counting works

- **Per individual legal assistant account**, not per firm
- Counter resets **annually** (so each year they have new milestones)
- Job counts only when:
  - The order is completed (transcript delivered + accepted, OR auto-released)
  - It's not refunded
  - The order has a minimum value (set at $50 to prevent gaming with tiny orders)
- Co-payer splits count as **1 job** for the ordering legal assistant (the one who created the order on the platform)

### Tier display on dashboard

The legal assistant's dashboard always shows their progress to the next tier:

```
🎯 Reward progress
[####------] 3/7 jobs to your branded Stanley tumbler
Last reward earned: $25 Amazon gift card (sent to email)
```

Tone: low-key gamification. Not pushy. The reward should feel like a thank-you, not a quota.

---

## Cost model

Assuming an average order generates ~$24 platform fee (8% pilot rate × $300 avg order):

| Tier | Jobs | Platform revenue | Reward cost | % of revenue |
|---|---|---|---|---|
| 1 | 3 | $72 | $25 | 35% |
| 2 | 10 | $240 | $30-40 | 13-17% |

**Tier 1 has the highest acquisition cost** (35% of platform fees), but we're paying for the habit-formation moment. By Tier 2, we're at a sustainable 13-17% retention cost.

**Total max cost per assistant per year**: ~$65 (gift card + tumbler + shipping).

**Worst-case:** Every active legal assistant hits Tier 2 within 90 days. If we get 50 active legal assistants in the first 6 months, that's ~$3,250 in rewards over the year. Painful but survivable.

**Best-case:** They become evangelists, tell other legal assistants in their network, and each referral has high LTV. The program pays for itself many times over.

**If cash runs low:** We can pause the program at any time without affecting users who already earned a tier. New signups simply wouldn't be eligible until we reactivate it.

---

## What the email/notification looks like

### When they hit Tier 1 (3 jobs)

> **Subject:** You earned a $25 Amazon gift card
>
> Hi [name],
>
> You've booked 3 transcripts through Dewey Sholes — thank you for being one of our early users.
>
> As a small thank-you, here's a $25 Amazon gift card: **[CLAIM CODE]**
>
> Keep going. At 10 jobs you'll earn a branded Dewey Sholes insulated tumbler shipped right to your office.
>
> — Aud
> Founder, Dewey Sholes

### When they hit Tier 2 (10 jobs)

> **Subject:** Your Dewey Sholes tumbler is on its way
>
> Hi [name],
>
> 10 transcripts! You're officially a Dewey Sholes power user.
>
> Reply to this email with the address you'd like your branded insulated tumbler shipped to. (Use your office address if that works — we'll address it to you.)
>
> Want to bring more colleagues on? Forward this email. We're working on a referral bonus for legal assistants who refer their network.
>
> — Aud

---

## Anti-gaming protections

Built into the system:

1. **Order completion required** — pending or cancelled orders don't count
2. **Minimum order value** — $50 floor prevents gaming with $5 orders
3. **One reward per tier per year** — can't unlock Tier 1 multiple times
4. **Refunds reverse the count** — if an order is refunded, the job doesn't count
5. **Anti-fraud review at Tier 4+** — human review before issuing $100+ rewards (look for anomalous patterns)
6. **Single-account enforcement** — one Dewey Sholes account per legal assistant (verified via email + firm)

---

## Build effort

This is a clear engineering task. Roughly:

| Component | Effort |
|---|---|
| Database: `incentive_progress` table per user | 0.5 day |
| Logic: increment counter on order completion | 0.5 day |
| Logic: check tier thresholds and trigger reward | 0.5 day |
| Email templates for each tier | 1 day |
| Dashboard widget showing progress | 0.5 day |
| Tremendous/Tango Card API integration for gift cards | 1 day |
| Admin tool for shipping physical rewards | 0.5 day |
| Anti-fraud / refund handling | 0.5 day |
| **Total** | **~5 days** |

**When to build:** During Phase 2 (firm onboarding). Not needed for Month 1 MVP since we won't have firms placing orders yet.

---

## Promotion strategy

The program needs to be visible enough to motivate behavior:

1. **Mention in firm onboarding** — the legal assistant should know about it from day one
2. **Dashboard widget** — always visible, always updating
3. **Email notification** — when they hit each tier, celebrate it
4. **Sales conversations** — when pitching a firm, mention "btw your legal assistants get personal rewards for using us"
5. **Pilot signup CTA** — prominent on the landing page once we're ready to push it
6. **Referral hook** — once they hit Tier 2, encourage them to tell other legal assistants

---

## What we DON'T do

- **No cash bribes.** Gift cards and merch only. (Cash payments to legal assistants for using a platform their firm pays for could create an appearance of impropriety. Stick to thank-you gifts.)
- **No quotas or pressure.** This is a thank-you program, not a sales target. We don't penalize people for not hitting tiers.
- **No firm-level kickbacks.** Rewards go to individuals only. The firm pays the platform fee; the assistant gets the gift. These are separate.
- **No retroactive eligibility.** Tier counts start when the program launches, not from past orders. (Maybe seed early adopters with a "thanks for joining the pilot" gift instead.)

---

## Pilot phase considerations

During the 6-month pilot:
- **Hand-write the note** that goes with physical rewards (Aud, not a template)
- **Personal outreach when someone hits a tier** — Aud should email them personally to thank them
- **Use this as a learning loop** — ask Tier 2 users what's working and what's not. Their feedback shapes future rewards.
- **Pause without warning if cash gets tight.** Existing earners keep their rewards; new participation is paused.

---

## Success metrics

- % of legal assistants who reach Tier 1 within 30 days of firm signup
- % of legal assistants who reach Tier 2 within 90 days
- Monthly orders per active legal assistant (with vs without rewards)
- Referrals: how many new legal assistants joined because someone forwarded a reward email?
- Cost per active legal assistant (rewards spent ÷ active assistants)

---

## Open questions for Rosie / future research

- Are there any conflict-of-interest concerns under CA Bar rules around individual legal assistants receiving gifts from a vendor their firm uses? (Likely not — these are minor thank-you gifts, not commissions — but worth confirming.)
- Should the firm admin be able to opt the firm out (e.g., if firm policy prohibits employees accepting vendor gifts)?
- Should we offer a charitable donation alternative for assistants whose firm policy doesn't allow them to accept gifts? ("Donate $25 to Legal Aid in your name instead.")
