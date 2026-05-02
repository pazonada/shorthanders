# Legal assistant incentive program

**Owner:** Aud
**Last updated:** 2026-05-02
**Status:** Draft — pilot-only program

---

## Program window: 6-month pilot only

**This program runs only during the 6-month pilot signup window.** It is not a permanent feature.

- New signups during the pilot window are eligible to earn rewards
- After the pilot window ends, no new participants can enter the program
- Legal assistants who already qualified for a tier during the pilot keep their reward (we honor what they earned)
- We can extend the program post-pilot if it's working and cash allows, but the default is sunset

**Why pilot-only:**
- We're bootstrapped — the rewards budget is genuinely finite
- The point is to drive early adoption among the first wave of users; we don't need to incentivize forever
- Once the platform has real traction, network effects and product quality should drive retention without rewards
- It also creates a "first mover" benefit that encourages early signups during the pilot

---

## Why this exists

At law firms, the **partner says "get me the transcript."** The **legal assistant or paralegal decides which platform to use**. They're the operational decision-maker, the actual user, and the de facto buyer.

If we treat them as a buyer — including rewarding them for using us — they become evangelists for Dewey Sholes inside their firm and across their professional network. That's how we win the demand side without spending on paid ads.

This program rewards the legal assistant personally for jobs they book through Dewey Sholes. The rewards go to the *individual*, not the firm.

---

## Points-based reward economy

Legal assistants earn **10 points per completed order** through Dewey Sholes. They redeem points for rewards from a catalog. Points accumulate continuously — they don't expire during the pilot — and users choose what to redeem for and when.

**Why points instead of fixed tiers:** different people want different things. Some legal assistants will cash out a Starbucks card every month for the dopamine hit; others will save up for the Stanley. The flexibility is a feature, not a bug — it lets people self-select what motivates them.

### Earning points

- **10 points per completed order**
  - Order must be delivered + accepted (or auto-released)
  - Refunded orders revoke the points
  - Minimum order value $50 (prevents gaming with tiny orders)
- Co-payer splits earn the ordering legal assistant 10 points for the one job they created

### Redemption catalog

| Reward | Cost in points | Our cost (incl. shipping) | Equivalent orders to earn |
|---|---|---|---|
| $10 Starbucks gift card (digital, instant) | 30 points | $10 | 3 orders |
| Branded canvas tote bag (mailed) | 40 points | $12 | 4 orders |
| Real branded Stanley tumbler (mailed) | 250 points | $60 | 25 orders |

**Points stay on their account until redeemed.** A legal assistant who books 25 orders could redeem 8 Starbucks cards over time, or 6 totes, or save it all for a Stanley.

### Why these specific rewards

- **Starbucks card**: Per Rosie, "small dollar amounts but they definitely remember who got it for them." Creates the personal moment Rosie described — and the digital format means instant gratification.
- **Canvas tote**: Travels with the legal assistant — courthouse, office, home. Each use is a brand impression in public. Mid-cost reward for sustained engagement.
- **Real Stanley with our logo**: The premium "you're a power user" gift. Real Stanley brand has cachet legal assistants will recognize. Worth saving up for.

### Dashboard view

The legal assistant's dashboard shows:

```
🎯 Your Dewey Sholes points
You have 40 points (4 orders earned)

What you can redeem now:
✅ $10 Starbucks gift card (30 pts) — Redeem
✅ Branded canvas tote bag (40 pts) — Redeem
🔒 Real branded Stanley tumbler (210 pts to go)
```

Clean, no surprises, no expiration anxiety.

### How point earning works

- **Per individual legal assistant account**, not per firm
- Points are **cumulative across the pilot** — no expiration during pilot window
- Points earned only when an order is completed (delivered + accepted OR auto-released)
- Refunded orders revoke the points
- Co-payer splits earn the ordering legal assistant 10 points for the one job they created
- Unredeemed points at end of pilot: users get a 30-day grace period to redeem; after that, points expire (announced in advance via email)
- Already-redeemed rewards are honored regardless of pilot status

### Tone

Low-key gamification. Not pushy. The reward should feel like a thank-you, not a quota. Dashboard messaging celebrates earned points without ever pressuring the user to book more. Notifications when something becomes redeemable, but no "you're falling behind!" nags.

---

## Cost model

Assuming an average order generates ~$24 platform fee (8% pilot rate × $300 avg order). Each order earns 10 points. Each redemption costs us a fixed amount.

**Per-redemption math:**

| Reward | Cost to us | Points to redeem | Orders behind it | Platform revenue per redemption | Cost % |
|---|---|---|---|---|---|
| Starbucks card | $10 | 30 pts | 3 orders | $72 | 14% |
| Tote bag | $12 | 40 pts | 4 orders | $96 | 13% |
| Real Stanley | $60 | 250 pts | 25 orders | $600 | 10% |

**The Stanley is actually our cheapest reward in % terms** — because it requires 25 orders behind it. Self-balancing.

**Pilot-wide modeling** (reflecting realistic redemption mix — most users will redeem multiple Starbucks cards over the pilot rather than save for the Stanley):

| Scenario | Active legal assistants | Avg orders/assistant | Total platform revenue | Est. redemption mix | Est. reward cost | Reward % of revenue |
|---|---|---|---|---|---|---|
| Conservative (15 firms × 1 assistant) | 15 | 5 | $1,800 | 8 Starbucks + 3 totes | $116 | 6% |
| Moderate (20 firms × 2 assistants) | 40 | 8 | $7,680 | 25 Starbucks + 8 totes + 1 Stanley | $406 | 5% |
| Aggressive (25 firms × 3 assistants) | 75 | 12 | $21,600 | 60 Starbucks + 20 totes + 3 Stanleys | $1,020 | 5% |

**At realistic scale, the reward program runs ~5-6% of platform revenue.** Way healthier than the fixed-tier model. Industry benchmarks for marketplace acquisition costs are 10-25%, so this is well within sustainable range.

**Why points are cheaper than fixed tiers:** with fixed tiers, anyone who hits the threshold gets the reward whether or not they want it. With points, users only redeem rewards they actually want, and many will redeem the cheap ones repeatedly while never reaching the expensive ones.

**Worst-case:** Every active legal assistant maxes out and saves for Stanleys. If 75 people each redeem 1 Stanley, that's $4,500 — but they'd also have driven 75 × 25 × $24 = $45,000 in platform revenue. 10% reward ratio. We'd take that all day.

**Best-case:** Most legal assistants redeem mid-tier rewards regularly, becoming repeat engagers. Total cost stays under 8% of revenue. Program is essentially free relative to the value.

**If cash runs low mid-pilot:** We can pause new point earning at any time without affecting users who already earned points. We always honor existing balances. The program also auto-ends with the pilot window (with 30-day grace period for unredeemed points).

---

## What the email/notification looks like

### First time they hit 30 points (eligible for first redemption)

> **Subject:** You can redeem your first Dewey Sholes reward
>
> Hi [name],
>
> You've earned 30 points by booking 3 transcripts through Dewey Sholes — thank you for being one of our early users.
>
> You can redeem 30 points for a $10 Starbucks gift card right now, or save up:
> - **30 points** → $10 Starbucks gift card
> - **40 points** → Branded canvas tote bag
> - **250 points** → Real Stanley tumbler with our logo
>
> [Redeem from your dashboard]
>
> Points stay on your account until you redeem them. (Rewards are part of our pilot program — only available to legal assistants who sign up during the first 6 months.)
>
> — Aud
> Founder, Dewey Sholes

### When they redeem the Stanley (250 points)

> **Subject:** Your Dewey Sholes Stanley is on its way
>
> Hi [name],
>
> 25 transcripts! You're officially a Dewey Sholes power user. Your real Stanley tumbler is on its way.
>
> Reply to this email with the address you'd like it shipped to. (Use your office address if that works — we'll address it to you.)
>
> Want to bring more colleagues on? Forward this email. We're working on a referral bonus for legal assistants who refer their network.
>
> — Aud

---

## Anti-gaming protections

Built into the system:

1. **Order completion required** — pending or cancelled orders don't earn points
2. **Minimum order value** — $50 floor prevents gaming with tiny orders
3. **Refunds revoke points** — if an order is refunded, the points it earned are removed (even if already redeemed; we don't claw back delivered rewards but we do log the deficit)
4. **Anti-fraud review on Stanley redemptions** — human review before shipping the $60 reward (look for anomalous patterns like 25 orders all from the same firm in 2 days)
5. **Single-account enforcement** — one Dewey Sholes account per legal assistant (verified via email + firm)
6. **No transferable points** — points belong to the individual account that earned them; can't be gifted, sold, or pooled

---

## Build effort

| Component | Effort |
|---|---|
| Database: `points_balance` and `points_transactions` tables per user | 0.5 day |
| Logic: award 10 points on order completion | 0.5 day |
| Logic: revoke points on refund (with cap on negative balance handling) | 0.5 day |
| Redemption catalog page with item costs and current balance | 1 day |
| Redemption flow: confirm → deduct points → trigger fulfillment | 1 day |
| Email templates (first redemption eligible, redemption confirmation, low-points reminder near pilot end) | 1 day |
| Dashboard widget showing point balance and "what you can redeem now" | 0.5 day |
| Tremendous/Tango Card API integration for digital gift cards | 1 day |
| Admin tool for shipping physical rewards (orders queue) | 0.5 day |
| Anti-fraud review flag for Stanley redemptions | 0.25 day |
| **Total** | **~6 days** |

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
