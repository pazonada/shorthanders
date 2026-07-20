# Polish pass – punch list

Goal: prototype at dsmvp.vercel.app looks right, flows make sense, copy is tight –
ready to put in front of user testers. Not building real backend here.

Status key: ☐ open · ☑ done · ◐ needs a decision from Aud

## P0 – mechanical, high-confidence (do first)
- ☑ Em-dash sweep (2 had crept back into new copy → fixed, all en-dashes now).
- ☐ Dead-end / broken-link check: every nav item, footer link, and CTA lands somewhere real.
- ☐ Sentence-case audit for UI labels (Aud's standard: sentence case, not title case).
- ☐ Terminology consistency ("reporter" is primary; "CSR" for the license; drop stray "court reporter" where "reporter" reads better).

## P1 – should fix before testing
- ☐ Editorial voice pass on the marketing pages (landing, for-firms, for-reporters,
  pricing) using the editorial-standards skill – tighten, cut filler, warm the tone.
- ☐ Demo-mode clarity: the "Log in" dropdown actually means "jump in as a demo persona."
  Make that unmistakable so a tester isn't confused about signing in.
- ☐ Mobile pass: check landing, directory, profile, claim flow at phone width.
- ☐ Empty/hover/active states consistent across cards, tabs, chips.

## P2 – decisions / bigger
- ◐ Reporter dashboard "My profile" is a read-only preview (banner says so). Do we make
  a few fields feel editable for testing, or is the banner enough?
- ◐ Invoice creator is a bare units × rate form. Evolve into the **template-picker**
  (WC / standard depo / transcription starters → edit line items) discussed earlier?
  Makes the "get paid" half of the demo much more real. (Aud to greenlight.)
- ◐ Demo narrative: our headline demo reporter (Adam Elwailly, #14585) is **Voice** method
  per the real license, but the fictional bio leans realtime/steno. Soften the bio, or
  swap the hero demo to a machine writer, for coherence.

## Open input needed from Aud
1. **First test audience** – reporters, firms, or both? Decides which flow gets the
   hardest scrutiny (reporters live in claim→invoice; firms live in search→message).
2. Priority order / anything you already dislike on the live site.
