# Reviews and ratings

Decided 2026-07-21.

## Decision

**No testimonials, reviews, or ratings at launch.** Reporter profiles show no social proof.

Testimonials were pulled from the prototype on 2026-07-21 (display, keyword search, and the
profile-completeness score). The seed data still carries a `testimonials` array on the sample
profiles, but nothing renders or searches it - it's dormant, kept only so the shape is on record.

## Why

- **Unverifiable.** Reporter-supplied quotes mean asking CSRs to collect testimonials and
  trusting they are real. On a directory whose entire value is being a trustworthy place to find
  a reporter, publishing unverifiable praise is a credibility liability, not an asset.
- **Already out of scope.** The reduced-scope MVP explicitly cut ratings and reviews (`no
  matching/scheduling/escrow/ratings`). The testimonials block was a v1 holdover that should not
  have survived the re-scope.
- **Better signal exists.** "Recently active" already gives a firm a real, earned signal without
  anyone writing a quote. Social proof, if we add it, should be earned the same way.

## The plan for later: ratings earned through real transactions

The point at which reviews become trustworthy is when they can only come from someone who
actually hired and paid the reporter through the platform. So:

- **Capture, don't display.** Once payments are live, invite a rating (and optionally a comment)
  from the firm after an invoice is paid - a real, verified transaction. Store it. Show nothing
  yet.
- **Wait for volume.** Publish only once a reporter has enough ratings that the average means
  something; a single review is noise and easily gamed. (Threshold TBD - do not invent one.)
- **Ratings before comments.** When we do publish, lead with the aggregate rating. Free-text
  comments are a bigger moderation and liability surface (defamation, disputes, fake text) and
  are a separate, later decision - probably not at first.
- **Provenance is the whole point.** Whatever we show must be tied to a paid transaction on the
  platform, not self-supplied. That tie is what makes it worth more than the testimonials we
  just removed.

This is a post-launch, post-payments feature. It is listed under money/integration work, not
launch prep - there is nothing to build until real payments exist to hang a rating on.
