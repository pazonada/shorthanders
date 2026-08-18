# Pro pricing worksheet

How to set the reporter-side prices (the pay-per-invoice fee and the flat Pro plan) from
real data instead of guesses. **No invented averages here** – every number is either a
sourced real data point or a clearly-labelled input you set.

> **Adjustable calcs in [`mvp/docs/revenue_model.xlsx`](../docs/revenue_model.xlsx)** (three tabs):
> - **CSR conversion** – email → claim → Pro dials → Pro count + revenue. Default 30/30/30 on
>   ~5,145 emailed ≈ **139 Pro, ~$4,000/mo at $29** (softer paid-upgrade step ≈ 46 Pro, ~$1,300/mo).
> - **Net target** – how many *paying users* (Path A: subscriptions) **or** how many *reporters
>   collecting on-platform* (Path B: the per-payment fee) it takes to net a target after NJ tax +
>   tech. Default $120k net ($10k/mo) ≈ **~410 paying firms** at $39, **or ~133 reporters** running
>   $4k/mo each through a ~3% blended fee (Pro 2% / base 5%).

Change the blue cells; everything recalcs on open.

## The model (recap)

**Two-tier per-payment fee (revised 2026-07-20 – Pro *reduces* the fee, doesn't waive it):**

- **Default on claim: pay-per-invoice at the base fee** (working number ~5%), no monthly cost.
  Fits occasional reporters.
- **Upgrade to Pro: flat monthly *plus* a reduced fee** (~2%). Pro users pay both. Worth it once
  a reporter bills enough that the fee saving (base − Pro) beats the subscription – upgrade point
  = Pro price ÷ (base − Pro fee), ≈ **$967/mo of billing** at $29 / 5% / 2%.

Everyone pays a fee, so the **fee scales with total volume instead of being capped** – which is
why it can be the biggest revenue line (often ~70% in the model). The reporter self-selects into
whichever tier is cheaper for their volume, and you make money either way.

## The three "fees" – keep them straight

1. **Stripe processing fee (~2.9% + 30¢ card, ~0.8% ACH).** The **reporter's** cost, on
   **both** plans. Never your money; Pro does **not** waive it.
2. **Shorthanders fee (the per-invoice %).** Your revenue on pay-per-invoice. This is the
   only part Pro waives.
3. **Your cost per active reporter (~$2/mo).** A flat Stripe Connect account fee, whether
   or not they run payments. That's essentially your whole per-reporter cost.

So "Pro saves you money" = the reporter stops paying your per-invoice %; they still pay
Stripe's 2.9% regardless.

## Real CA data we have (sourced)

We can't pull the Facebook group's Files section directly, but the group's invoices are
already captured in
[`research/agency_invoice_evidence.md`](../../research/agency_invoice_evidence.md) and
[`research/csr_agency_live_attendance_rates.md`](../../research/csr_agency_live_attendance_rates.md):

| Data point | Value | Source |
|---|---|---|
| 319-page arbitration transcript (full invoice) | **$2,311**; CSR's share ~$1,600 | agency_invoice_evidence.md |
| Remote Zoom deposition (full invoice) | **$4,186** | agency_invoice_evidence.md |
| Transcript page rates (billed) | **$3.00–$5.95 / page** | agency_invoice_evidence.md |
| Private half-day hearing (Rosie, Contra Costa) | **~$1,800** | csr benchmarks |
| Rough live-coverage day rate (planning figure) | **~$3,300 / day** | CA_Pilot_Firm_Targeting.md |

**Takeaway:** a *single* transcript job puts **$1,500–$2,500+** through a reporter; a big
remote depo, $4,000+. A monthly Pro fee in the low-double-digits is a rounding error
against even one job.

## The one input we're still missing

**Jobs per month (billing volume per reporter).** That's the only number the subscription
price really hinges on, and it's not in the files yet. Get it from:

- A short CSR survey question ("roughly how many transcripts/appearances do you bill a
  month, and what's a typical amount?").
- More group screenshots.
- Real usage once reporters start invoicing on the platform.

Until then, use the crossover model below with whatever volume you want to test.

## The crossover model

The point where **Pro beats pay-per-invoice**:

```
crossover volume ($/mo)  =  Pro price ($/mo)  ÷  per-invoice fee (%)
```

Worked with your example figures (**$29 Pro, 2% fee** – your numbers, not fixed):

| Monthly billings | Pay-per-invoice (2%) | Pro (flat) | Reporter's cheaper option |
|---|---|---|---|
| $1,000 | $20 | $29 | Pay-per-invoice |
| **$1,450** (crossover) | **$29** | **$29** | tie |
| $3,000 | $60 | $29 | **Pro** (saves $31/mo) |
| $6,000 | $120 | $29 | **Pro** (saves $91/mo) |

At $29 / 2%, the crossover is **$1,450/mo** – and since one transcript alone is ~$1,600,
**almost every steadily-working reporter lands above it.** In practice that means Pro
becomes your main reporter-revenue line, and pay-per-invoice mostly catches the genuinely
occasional reporter.

## The design lever

The per-invoice % and the Pro price **together** set that crossover:

- **Pro too low** relative to the fee → every heavy reporter escapes your % for cheap; you
  leave money on the table.
- **Pro too high** → nobody upgrades, and heavy reporters feel the per-invoice fee.

Given your ~$2/mo cost per active reporter, a Pro price in the **low-double-digits is
easily defensible** (it's under 2% of a *single* transcript, and it's mostly margin). The
figures you floated – **~$29 Pro, ~2% fee** – sit in a reasonable spot; a **$19–$39** band
is the sensible range to test. Final numbers are yours; these are your assumptions
sanity-checked against the real invoices above, not invented benchmarks.

## What to decide

1. The per-invoice fee % (your revenue on the default plan).
2. The Pro monthly price (and whether to offer an annual discount).
3. Where you want the crossover to fall – i.e., "at what monthly volume should a reporter
   feel they should upgrade?" That answer picks the two numbers above together.
