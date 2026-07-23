# Feedback session guide – a demand-side lawyer

For an informal feedback chat with a practicing lawyer about Dewey Sholes' features and flows.
First use: the Chicago in-house counsel (nonprofit) who asked to talk. Created 2026-07-21.

## What we want out of this

She is a **demand-side user** – someone who *hires* court reporters – and in-house counsel at a
nonprofit, which is a target segment we just added. We want to learn:

1. **How she actually finds and hires a reporter today** (the real workflow + pain – the most
   valuable thing here, worth more than her reaction to the site).
2. Whether the **flows** (search → profile → message → book/pay) match how she'd want to do it.
3. Whether the **value proposition** ("skip the agency, hire the reporter directly") lands.
4. What would make her **trust it** enough to actually use, and what would stop her.

**Her being in Chicago, not California, is fine.** Features and flows are geography-agnostic – how
a lawyer reacts to search, filters, a profile, messaging, and pricing has nothing to do with the
state. Tell her upfront to ignore the California-specific data and "CSR" wording; we want her read
on the *experience*.

## How to set it up (say this, roughly)

> "This is an early prototype – the reporter profiles are sample/placeholder data, the California
> stuff is just because that's where we're starting, and nothing actually saves. I don't need you
> to like it – I need you to tell me where it's confusing, wrong for how you work, or missing
> something. Think out loud as you go; the 'ums' and hesitations are the useful part."

Logistics (adjust to her time): screen-share the live site (dsmvp.vercel.app), let *her* drive the
mouse if possible, ~30–45 min. Ask permission to take notes or record. Don't demo it *to* her –
give her a task and watch.

## Start with her world, before the site (~10 min)

These questions are gold even if she never opens the site:

- Walk me through the last time you needed a court reporter. How did you find one?
- Do you use an agency, a reporter directly, a list someone keeps, word of mouth?
- What's annoying about that process? What goes wrong?
- Who actually books it – you, a paralegal, an assistant?
- How do you pay them today? Any friction there (checks, invoices, AP)?
- As in-house counsel at a nonprofit, is any of this different from a firm – budget approval,
  vendor rules, volume?

## Guided walkthrough – give tasks, don't narrate

For each: **give her a task, then shut up and watch.** Note where she hesitates, misreads, or
looks for something that isn't there. Questions below are for *after* she attempts it.

**1. Landing page (first impression)**
- Task: "You've landed here from a link. What is this? Who's it for?"
- Watch: does "skip the agency" / the value prop read instantly? Does she get that it's a
  directory + direct hiring, not an agency?
- Ask: What do you think this does? Would this be useful to you? What would you click first?

**2. Find a reporter (directory + filters)**
- Task: "Find a reporter you might hire for [a kind of case she named earlier]."
- Watch: does she reach for the keyword search or the filters? Do the **filters match how she
  thinks** – Area of law, proceedings (deposition/trial/hearing), services (realtime, remote/
  videoconference, legal video), certifications, notary, languages? Does she try to filter by
  something we don't have (date/availability? rate? location radius?)?
- Ask: Are these the things you'd filter on? Anything missing? Did "Area of law" make sense?
  Would you search by keyword or by these filters?

**3. A reporter profile**
- Task: "Open a reporter and tell me if you'd reach out to them."
- Watch: what does she look at to decide? Does she notice claimed vs unclaimed, "recently active,"
  certifications, the SAMPLE badge? What's missing that she'd want before contacting someone?
- Ask: What would you need to see to feel confident hiring this person? What's missing? (Listen
  hard for **rates** – we deliberately don't show them yet; see if she asks.)

**4. Message a reporter**
- Task: "Reach out to book them for a deposition."
- Watch: is messaging-then-agreeing-terms-directly what she expects, or does she expect the
  platform to handle scheduling/booking/quotes?
- Ask: Is this how you'd want to make contact? What would you say? What would you expect back?

**5. Pricing / the firm gate (the monetization test – important)**
- Context to watch for: firms browse free but a **subscription gates discovery** (searching for
  *new* reporters); firms never pay a per-job fee. Reporters pay a small fee out of their side.
- Task: point her at Pricing, and let her hit the "upgrade to see this profile" gate.
- Ask (carefully, non-leading): How do you feel about a subscription to search the full directory?
  Does "firms never pay a per-job fee, the reporter covers a small platform fee" sit right? What
  would you expect to pay, if anything? (Don't defend the model – just capture her reaction.)

**6. Firm signup (optional, if time)**
- Task: "Sign your org up."
- Watch: friction, anything that feels like too much, anything a nonprofit legal team couldn't do.

## Big-picture closers (~5 min)

- If this existed and worked, would you use it? For what, specifically?
- What's the one thing that would make you *not* use it?
- What's missing before you'd trust it with a real matter?
- Who else on your team would touch this – and would *they* find it usable?
- Anything about it that felt off, or like it wasn't built for how lawyers actually work?

## Bias traps – what NOT to do

- **Don't lead** ("Isn't the search great?" → "How was the search?").
- **Don't explain away** confusion – if she's lost, that's data; note it, don't rescue her.
- **Don't sell.** You're not pitching; you're learning. Resist defending the model.
- **Don't over-index on politeness.** "This is nice" isn't feedback. Push: "What would you change?"
- **Watch behavior over opinion** – where she clicks and hesitates beats what she says she'd do.

## After: quick synthesis

Same day, jot:
- Her real hiring workflow + top pains (verbatim quotes if you can).
- Where she got stuck or confused in each flow.
- What she went looking for that isn't there (esp. rates, availability/date, location).
- Her reaction to the subscription model.
- Would-use / wouldn't-use, and the deciding factor.
- 1–3 changes worth making based on this one session (and whether they're one-offs or worth
  testing with more lawyers before acting).

Note: this is one out-of-state, demand-side data point – strong for flows and value-prop, not for
anything California-specific. Treat single-session findings as signals to explore, not decisions.
