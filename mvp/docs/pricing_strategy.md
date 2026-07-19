# Pricing strategy — competitor benchmarks + revenue scenarios

**Read this first (the one big takeaway):** the revenue is almost entirely **paying firms**
(number of firms × the firm price). The reporter side is small money but essential supply. So
the whole game is **getting firms to sign up** — which, as you said, is also the hardest part.
That points to one clear move: **price the firm side low at launch to reduce friction, with a
free trial, and raise it later once the value is proven.**

Everything below is **illustrative, to frame the decision** — not a forecast. The sign-up and
pay rates are guesses until you test them, and the prices are yours to set. Competitor prices
are real as of this writing; **verify current rates** (they change).

---

## What comparable sites charge

| Site | Model | Who pays | Rough price (verify) |
|---|---|---|---|
| **Care.com** | Subscription for access | Families (the demand side) | ~$40–50/month, cheaper on longer terms; caregivers free |
| **LinkedIn** | Subscription for access/messaging | Individuals | Premium ~$30/mo; Business ~$60/mo; Sales Navigator ~$99/mo |
| **Fiverr** | Commission | Sellers 20% of each job; buyers ~5.5% fee; optional Seller Plus ~$29/mo | (a cut of the job, not a subscription) |
| **Thumbtack** | Pay per lead | Pros (supply) pay per contact | ~$1.50–$40+ per lead; consumers free |
| **Legal directories** (Avvo, FindLaw, Justia, Martindale) | Premium listings / advertising | Attorneys | ~$50–$300+/month; consumers free |
| **Court reporting agencies** (the thing you undercut) | Markup on the job | The firm, baked into the rate | ~30–40% of every job |

**What this tells us:**
- Charging the **demand side** a subscription for access (Care.com, LinkedIn) lands roughly
  **$30–$100/month.** Firms fit right in this band — and they're businesses, not consumers, so
  the top of that range is defensible **if** they use it.
- **Supply-side** money (Fiverr's cut, Thumbtack's leads, legal-directory listings) is all over
  the place; the lesson is to keep the **reporter** side **light** so reporters actually join.
- Your value story is strong: agencies take ~30–40%, so **any** Dewey Sholes fee looks cheap.
  The hard part isn't justifying the price — it's getting firms to change their habit.

---

## Proposed pricing (least → most)

Three price points to choose from. Lean **Conservative** at launch to get firms in the door.

| Tier | Firm subscription | Reporter Pro (flat) | Reporter "pay only when you get paid" |
|---|---|---|---|
| **Conservative (entice)** | ~$29/mo | ~$9/mo | ~1% of each payment |
| **Moderate** | ~$59/mo | ~$15/mo | ~2% of each payment |
| **Premium** | ~$99/mo | ~$25/mo | ~3% of each payment |

Notes:
- **Annual option:** offer ~2 months free (pay for 10, get 12) to pull firms onto yearly plans.
- **Reporters:** free to claim and list. The flat Pro plan is for heavy users; the per-payment
  fee is for occasional/part-time reporters (they pay nothing in months they don't use it).
  Both come out of the reporter's side — the firm never sees a Dewey Sholes fee.
- **Free trial for firms** (e.g., 14 days) is important — it lets them feel the value before paying.

---

## Revenue scenarios

**Shared inputs:** 5,705 active CSRs (real). "Sign up" = a reporter claims a free profile.
Assume **~30% of reporters who claim end up paying** (flat Pro, used here as a stand-in; the
per-payment fee would depend on how many jobs flow through, which we can't estimate yet).

### Scenario 1 — Launch (Conservative pricing)
| | 50 firms | 100 firms |
|---|---|---|
| Firms (× $29/mo) | $1,450/mo | $2,900/mo |
| Reporters: 5% claim (285), ~30% pay (~85 × $9) | $765/mo | $765/mo |
| **Monthly total** | **~$2,215** | **~$3,665** |
| **Yearly total** | **~$26,600** | **~$44,000** |
| Share from firms | ~65% | ~79% |

### Scenario 2 — Growth (Moderate pricing)
| | 200 firms |
|---|---|
| Firms (× $59/mo) | $11,800/mo |
| Reporters: 10% claim (570), ~30% pay (~171 × $15) | $2,565/mo |
| **Monthly total** | **~$14,365** |
| **Yearly total** | **~$172,000** |
| Share from firms | ~82% |

### Scenario 3 — Scaled (Premium pricing)
| | 500 firms |
|---|---|
| Firms (× $99/mo) | $49,500/mo |
| Reporters: 20% claim (1,141), ~30% pay (~342 × $25) | $8,550/mo |
| **Monthly total** | **~$58,050** |
| **Yearly total** | **~$697,000** |
| Share from firms | ~85% |

---

## What the numbers tell you

1. **Firms are ~65–85% of the revenue in every scenario.** The reporter side barely moves the
   total. So spend your energy on firm sign-ups, and price reporters to *join*, not to milk.
2. **Break-even is low; income needs scale.** Your costs at low usage are tiny (free tiers on
   Vercel/Supabase/Resend; the card fee is the reporter's). Even Scenario 1 (50 firms) at
   ~$2,200/month more than covers running the site. But a real salary needs **hundreds** of
   paying firms — that's the honest bar, and it's a firm-acquisition problem, not a pricing one.
3. **So launch cheap on the firm side.** At ~$29/mo with a free trial, a firm that hires even one
   reporter a month and skips the agency markup comes out way ahead — an easy "yes." Raise the
   price later, once you've proven it and have reviews to back it up.
4. **The reporter side is a rounding error on revenue but the foundation of the product.** Keep
   it free to list; make Pro cheap or purely pay-as-you-go. Reporters filling out rich profiles
   is what makes the firm subscription worth buying.

## Still yours to decide
- The actual prices (these are ranges to react to — don't treat them as set).
- Monthly vs. annual emphasis, and the free-trial length.
- Reporter side: flat Pro, per-payment, or offer both.
