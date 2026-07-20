# CSR email outreach – the personal claim invite

A one-time, personal note to active California CSRs inviting them to claim their free profile.
Not a marketing list – a single send, from a real person, that people can reply to.

## The list
`mvp/data/email_campaign.csv` – 5,701 valid emails with per-reporter merge fields
(`greeting`, `first_name`, `claim_url`, `city`, `county`, `license`, `segment`).
- **Send to the 5,145 `independent`.**
- **Hold the 556 `court_gov`** (court-employed reporters at `.gov`/court addresses – wrong
  audience for a "get found by firms" note, and riskier for deliverability).
- The email opens with `{{greeting}},` – the `greeting` column is already "Hi <First>" for
  everyone, and just "Hello" for the 7 reporters whose license lists only a first initial (e.g.
  "M Dowling"). So nothing to clean by hand; the merge handles it.

## Subject
`Invitation to edit your court reporter listing`

## The email (final)

```
{{greeting}},

I'm Aud, and I'm building Dewey Sholes – a more robust directory of independent California court reporters. The idea is to help law firms find and hire you directly, so you keep your full rate instead of handing a cut to an agency, and run your practice on your own terms as an independent professional.

Your public license info is already listed (every active CSR is in the state's database), and you can claim your profile for free to add your specialties, coverage, languages, and rates so firms can find and reach you. Claiming is free, always. If it's ever useful, you can also send invoices, collect card or ACH payments, and pull tax-ready records right from your profile –  those are all optional features as part of the Pro account.

Here's your profile: {{claim_url}}

That's really the whole reason I'm writing; this is a one-time note, and I won't keep emailing you. If you'd rather not be listed at all on our directory, just reply and I'll take you down. And if you have any questions about the site, or suggestions on how to make it better as we work on improvements and roll it out to law firms, I'd love to hear from you.

Thank you!

Aud
Founder, Dewey Sholes

Studio Crux, LLC • 70 W 35th St. Bayonne, NJ 07002
```

## How to send it (personal, not a blast)

- **Tool:** GMass or YAMM (Yet Another Mail Merge), sending through your Google Workspace inbox
  so it comes from a real Dewey Sholes address and replies land with you.
- **From:** a real person's address (e.g. `aud@deweysholes.com`), not `hello@` – feels like a
  person wrote it. Be ready for a handful of "take me down" and "thanks/suggestion" replies.
- **Drip it:** ~a few hundred a day over ~2–3 weeks, not all at once. Sending 5,000 in one go
  trips spam filters no matter how personal the words are.
- **Domain choice:** sending from `deweysholes.com` puts some wear on that domain's reputation
  (it also carries your real business email). This email is low-complaint by nature, so dripping
  from a real address is probably fine – but if you want to fully protect the main domain, send
  from a close-cousin domain set up just for outreach.
- **Compliance basics (met by the email above):** real sender, honest subject, a physical
  mailing address in the signature, and a way to opt out ("reply and I'll take you down").
  Honor delisting replies. Confirm specifics in the terms-of-service review.

## One ask only
This email invites them to claim their free profile – nothing else. Save the Pro/invoicing pitch
for a personal follow-up *after* someone claims and it goes well.
