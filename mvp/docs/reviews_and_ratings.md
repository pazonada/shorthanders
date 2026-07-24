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

## The plan for later: ratings + optional testimonials, earned through real transactions

The point at which social proof becomes trustworthy is when it can only come from someone who
actually hired and paid the reporter through the platform. The flow (refined 2026-07-23):

**After a firm pays an invoice, prompt them once with two things:**

1. **A rating** - two quick scores: **quality of the deliverable** and **timeliness of delivery**.
   Average the two into one headline score. Store the two sub-scores separately even though we
   show the average, so we can split them out later.
2. **An optional testimonial** - a short quote about the reporter. **Skippable, and that's the
   design.** A firm that liked the reporter can add a nice line; a firm that didn't just skips it.

**Why "optional testimonial" instead of "review":** a review field invites negative free text -
the big moderation and liability surface (defamation, disputes, fake text). An *opt-in
testimonial* is positive-only by construction: unhappy firms express that through the numeric
scores and by skipping the quote, so the text we actually collect and host is praise a firm chose
to give. Much lower risk, same warmth.

**Sequencing - capture now, display later:**

- **Capture, don't display.** Once payments are live, collect ratings + optional testimonials on
  the payment-success screen. Store everything. Show nothing yet.
- **Wait for volume, then turn both on together.** Publish only once a reporter has enough ratings
  that the average means something; a single score is noise and easily gamed. (Threshold TBD - do
  not invent one.) When we flip ratings on, **the testimonials that were collected start appearing
  on the reporters who earned them** at the same time.
- **How it plays out over time:** the best reporters become evident from the *combination* -
  their rating plus the volume of testimonials attached to them. A reporter with a rating but no
  testimonials naturally sits a little lower in a firm's consideration than one with several
  glowing quotes. Keep this a **soft discovery nudge, not the sort order itself:** the numeric
  rating stays the backbone. Don't let testimonial-count drive ranking, or we just reward the
  reporters who nag firms for quotes and penalize great reporters whose busy firms never write one.
- **Provenance is the whole point.** Every rating and testimonial is tied to a paid transaction on
  the platform, not self-supplied. That tie is what makes it worth more than the testimonials we
  just removed.

**Bank for display-time (still true):** a per-reporter threshold before anything shows; a light
moderation / takedown path even for opt-in testimonials; a reporter's right to respond or hide;
transparency with reporters up front that this is being collected and will eventually show (put it
in onboarding/terms); the standard "we host user content, we don't author it" ToS posture.

**Only works for firms who pay through the platform** - so ratings and testimonials build up for
the reporters who use invoicing/payments (Pro reporters especially). A nice bonus reason to go Pro.

This is a post-launch, post-payments feature. It is listed under money/integration work, not
launch prep - there is nothing to build until real payments exist to hang a rating on.
