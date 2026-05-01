# Briscoe Sholes — Legal entity structure tradeoffs
*Draft — March 13, 2026*

*This memo outlines the options. A business attorney should review before you file anything.*

---

## The decision

Before launching, Briscoe Sholes needs to be a legal entity. The two realistic options for an early-stage two-founder marketplace are a limited liability company (LLC) or a C corporation (C-Corp). Each has tradeoffs that matter for your specific situation: two co-founders, a California-based marketplace handling money on behalf of third parties, plans to eventually raise outside capital, and regulatory relationships with state agencies.

---

## Option 1: LLC (default for most small businesses)

### How it works

An LLC is a pass-through entity. Profits and losses flow through to the founders' personal tax returns. No corporate-level tax. You and Rosie would be the two members, with an operating agreement governing ownership splits, decision-making, capital contributions, and what happens if one of you leaves.

### Advantages for Briscoe Sholes

**Simplicity.** Less paperwork, fewer formalities, lower formation costs. No board of directors, no annual shareholder meetings, no corporate minutes requirements. For two founders in the pre-revenue phase, this is meaningful.

**Tax flexibility.** Pass-through taxation means profits are taxed once (on your personal returns), not twice. Losses in the early months — and there will be losses — can offset other personal income. You can also elect to be taxed as an S-Corp later if it makes sense for self-employment tax purposes.

**Operating agreement flexibility.** LLCs let you structure governance however you want. Unequal voting rights, different profit-sharing ratios, vesting schedules, buy-sell provisions — all customizable in the operating agreement without the rigid structure of corporate bylaws.

**California LLC fee is manageable.** California charges an $800 minimum annual franchise tax (waived for the first year for new LLCs formed after Jan 1, 2024, if gross revenue is under $250K — confirm this is still in effect). There's also a gross receipts fee if annual revenue exceeds $250K, but that's a good problem to have.

### Disadvantages for Briscoe Sholes

**Venture capital friction.** Most institutional investors (VCs, angels writing SAFE notes) strongly prefer C-Corps. If you plan to raise money, you'll likely need to convert to a C-Corp eventually. Converting is doable but costs legal fees ($3K-10K typically), triggers potential tax events, and is easier to do before the company has significant assets or complex cap tables.

**No stock options.** LLCs issue membership interests or profits interests, not stock. This makes equity compensation for future employees more complicated and less familiar to recipients. Not a problem while it's just the two of you, but becomes one when you hire.

**Self-employment tax.** LLC members who are actively involved in the business pay self-employment tax (Social Security + Medicare) on their share of profits. This is an additional ~15.3% on the first ~$168K of income (2025 figure). Can be partially mitigated by electing S-Corp taxation.

### Where to form

If you go LLC, form in **California**. Delaware LLC advantages are mostly relevant for companies with complex multi-state operations or institutional investors. For a two-member LLC operating in California, forming in Delaware just means paying franchise taxes and registered agent fees in two states instead of one.

---

## Option 2: Delaware C-Corp (default for venture-backed startups)

### How it works

A C-Corp is a separate legal entity that pays its own taxes. The founders own shares of stock. The company has a board of directors (which can initially be just the two of you), issues stock, and follows corporate governance formalities.

### Advantages for Briscoe Sholes

**Investor-ready from day one.** If you plan to raise outside capital — SAFE notes, convertible notes, priced equity rounds — a Delaware C-Corp is what investors expect. Y Combinator, most accelerators, and most institutional investors require it or strongly prefer it. You skip the conversion later.

**Stock-based equity compensation.** Stock options, restricted stock grants, and 83(b) elections are standard, well-understood tools. When you hire your first employee or want to give equity to an early advisor, the mechanics are straightforward.

**QSBS tax exclusion potential.** Section 1202 of the Internal Revenue Code allows founders of qualified small business stock to exclude up to $10M (or 10x their basis) in capital gains on sale — but only for C-Corp stock held for 5+ years. This is a significant tax benefit if the company succeeds. LLCs don't qualify.

**Familiarity.** Lawyers, accountants, regulators, and partners all understand C-Corps. When you're briefing the CRB or Judicial Council, "we're a Delaware corporation" is a non-event. Some government agencies are less familiar with LLC structures.

**Clearer liability shield.** Both LLCs and C-Corps provide liability protection, but courts have a longer history of respecting the corporate veil for C-Corps, particularly when corporate formalities are followed.

### Disadvantages for Briscoe Sholes

**Double taxation.** The corporation pays federal corporate tax on profits (~21%). When profits are distributed to shareholders as dividends, the shareholders pay tax again on the dividend income. In practice, this doesn't matter in the early years because you'll be reinvesting, not paying dividends. But it matters eventually.

**More paperwork.** Annual meetings, board resolutions, corporate minutes, separate tax returns (Form 1120), state franchise tax filings. You'll want a CPA from the start.

**Delaware franchise tax + California qualification.** A Delaware C-Corp operating in California pays Delaware franchise tax ($400/year minimum, more as assets grow) plus California's $800 minimum franchise tax plus California corporate income tax on income attributable to California. You're paying two states.

**Losses don't pass through.** Unlike an LLC, early-stage losses stay inside the C-Corp. You can't use them to offset personal income. They carry forward against future corporate profits, but that doesn't help your personal tax situation now.

### Where to form

If you go C-Corp, form in **Delaware**. The Chancery Court system, established corporate case law, and investor expectations all point to Delaware. California C-Corps have no meaningful advantage and lack the legal infrastructure.

---

## The marketplace-specific considerations

Two things about Briscoe Sholes make the entity choice more nuanced than a typical startup.

**Money transmission.** The platform collects payment from law firms and pays reporters. Depending on how you structure this, you may be acting as a money transmitter under California's Money Transmission Act. Money transmitter licensing requirements can vary by entity type, and the compliance posture of a C-Corp may be more familiar to regulators than an LLC. If you use a payment processor like Stripe Connect, they handle the licensing and you operate under their umbrella — but the entity structure still matters for your processor agreement.

**Regulatory relationships.** You plan to engage with the CRB, Judicial Council, and eventually county court administrators. These are government agencies accustomed to dealing with businesses. Neither entity type is disqualifying, but a C-Corp signals permanence and institutional seriousness in a way that an LLC sometimes doesn't.

---

## Recommendation structure

This is ultimately a decision for you, Rosie, and your attorney. But here's how to think about it.

**If you're confident you'll raise outside capital within the next 12-18 months:** Form a Delaware C-Corp now. The legal costs are modestly higher upfront ($1,500-3,000 for formation with a startup-focused attorney vs. $500-1,000 for an LLC), but you avoid the conversion cost and complexity later.

**If you're bootstrapping and want to stay lean:** Form a California LLC now. Keep the option to convert later. The conversion is cleaner if done before you have significant revenue, complex contracts, or outside investors.

**If you're genuinely unsure:** The standard Silicon Valley playbook is Delaware C-Corp + Stripe Atlas or Clerky for formation + a startup attorney on retainer. This is the path of least resistance if there's any chance of outside capital. The total upfront cost is typically under $3,000.

---

## Action items for founders

1. Decide whether you intend to raise outside capital in the first 12-18 months. This drives the entity choice.
2. Regardless of entity type, draft a founders' agreement covering: ownership split, vesting schedule (standard is 4-year vest with 1-year cliff), roles and responsibilities, IP assignment, what happens if one founder leaves.
3. Consult a business attorney (not a general practitioner) who works with startups. A 1-hour consultation to validate the entity choice and set up formation correctly will cost $300-500 and is worth it.
4. File for an EIN with the IRS immediately after formation. You'll need it for bank accounts, payment processor setup, and hiring.
5. Open a business bank account. Do not commingle personal and business funds. This is critical for maintaining the liability shield regardless of entity type.
6. Register the business name. Check California Secretary of State for availability. File a fictitious business name statement if operating under "Briscoe Sholes" rather than the formal entity name.
