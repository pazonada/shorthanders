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

I'm Aud, and I'm building Shorthanders – a more robust directory of independent California court reporters. The idea is to help law firms find and hire you directly, so you keep your full rate instead of handing a cut to an agency, and run your practice on your own terms as an independent professional.

Your public license info is already listed (every active CSR is in the state's database), and you can claim your profile for free to add your specialties, coverage, languages, and rates so firms can find and reach you. Claiming is free, always. If it's ever useful, you can also send invoices, collect card or ACH payments, and pull tax-ready records right from your profile –  those are all optional features as part of the Pro account.

Here's your profile: {{claim_url}}

That's really the whole reason I'm writing; this is a one-time note, and I won't keep emailing you. If you'd rather not be listed at all on our directory, just reply and I'll take you down. And if you have any questions about the site, or suggestions on how to make it better as we work on improvements and roll it out to law firms, I'd love to hear from you.

Thank you!

Aud
Founder, Shorthanders

Studio Crux, LLC • 70 W 35th St. Bayonne, NJ 07002
```

## How to send it (personal, not a blast)

- **Tool:** GMass or YAMM (Yet Another Mail Merge), sending through your Google Workspace inbox
  so it comes from a real Shorthanders address and replies land with you.
- **From:** a real person's address (e.g. `aud@shorthanders.com`), not `hello@` – feels like a
  person wrote it. Be ready for a handful of "take me down" and "thanks/suggestion" replies.
- **Drip it:** ~a few hundred a day over ~2–3 weeks, not all at once. Sending 5,000 in one go
  trips spam filters no matter how personal the words are.
- **Domain choice:** sending from `shorthanders.com` puts some wear on that domain's reputation
  (it also carries your real business email). This email is low-complaint by nature, so dripping
  from a real address is probably fine – but if you want to fully protect the main domain, send
  from a close-cousin domain set up just for outreach.
- **Compliance & deliverability:** the email already meets the basics (real sender, honest
  subject, physical address, opt-out). See **Compliance (CAN-SPAM)** and **Authenticate your
  sending domain** below before you send.

## One ask only
This email invites them to claim their free profile – nothing else. Save the Pro/invoicing pitch
for a personal follow-up *after* someone claims and it goes well.

## A follow-up? (decide before you send)
The email above promises "this is a one-time note, and I won't keep emailing you." **A follow-up
breaks that promise** – so if you want one, change that line in the copy first (drop it, or say
something like "I'll send one quick reminder and then leave you be"). Don't send a follow-up on top
of a one-time promise; it reads as exactly the thing the copy swore off.

If you do follow up:
- **One gentle nudge, to non-openers only,** about a week later – a short "in case this got buried"
  with the same claim link. One follow-up lifts response meaningfully; a third starts to annoy.
- **Suppress anyone who opted out or replied "take me down"** – they must never get the follow-up.
  Your send tool has to track and exclude them (YAMM/GMass can; HubSpot does it automatically in a
  sequence – a reason to run the sequence there if you want follow-ups handled cleanly).
- Everything in Compliance below applies to the follow-up too.

## Compliance (CAN-SPAM)
This is commercial email (it promotes the platform), so the federal **CAN-SPAM Act** applies – and
it applies to a one-off invite and any follow-up just the same. "It's not a newsletter" does **not**
exempt it; what matters is that the message is commercial, not whether it's recurring. The
requirements, and how this plan meets them:
- **Honest From and Subject** – no misleading headers. *(Met.)*
- **A real physical mailing address** in the email. *(Met – the signature carries Studio Crux's
  address. A P.O. box or mailbox-service address is fine if you'd rather not use a street address.)*
- **A clear opt-out, honored promptly** (within 10 business days). "Reply and I'll take you down"
  counts – as long as you actually process those replies. *(Met – just stay on top of the inbox.)*
- **Never email someone after they opt out,** including any follow-up – keep a suppression list.
- Applies to **business** addresses too (no B2B exemption in the US). California's own spam law is
  mostly overridden by CAN-SPAM except for outright deception.

Not legal advice – fold into the terms-of-service review.

## Opt-outs & removal requests – set this up BEFORE you send

Two DIFFERENT requests will come in, and they need two different suppressions:

1. **"Stop emailing me"** (email opt-out) → add them to your **mail-merge tool's unsubscribe list**
   so they're never contacted again (the tool does this automatically via its unsubscribe link).
2. **"Take my listing off the site"** (directory removal) → add their **license number** to the
   directory **suppression list** (`data/suppressed_csrs.csv`), which `generate_profiles.py` drops
   from the build on every rebuild and every quarterly CRB refresh, so they stay off. A directory
   removal implies an email opt-out too – do both.

**The mechanism (Option B – Google Form, decided; set up before launch):**
- Put a **"Remove my listing"** link in the email, personalized with the reporter's **license
  number** (so we know who it is without a lookup), pointing to a **Google Form**.
- Form responses auto-collect into a **Google Sheet** – that Sheet is the durable record of
  removals (no manual copy-paste, survives even if a local file is lost).
- People who instead just reply "take me down" go to `support@`; look their license number up in
  `email_campaign.csv` (email → license → name) and add them the same way.

**Applying removals (the "paste-and-rebuild," a batch job – ~3–4 times across the campaign, not
per-person):**
1. Export the removals Sheet → `data/suppressed_csrs.csv` (first column = license number).
2. Run `python3 data/generate_profiles.py` (it prints how many it removed).
3. Run `bash build.sh`, commit, push → the live directory no longer shows them.
- You can do this yourself, or hand Claude the license numbers and say "add these and redeploy."

### Google Form – exact spec (build this before the first send)

**Form title:** "[Brand] – remove my listing" · **Description:** "Ask us to take your public listing
off the directory and/or stop emailing you. We'll process it within a few business days."

**Fields:**
1. **License number** – short answer, **required**. (This is the key the build matches on; it's
   pre-filled by the personalized link below, so the reporter just confirms.)
2. **Full name** – short answer, required (verification).
3. **Email** – short answer, required (confirmation + adds them to the email-suppression list).
4. **What would you like?** – multiple choice, required: *Remove my listing from the directory* /
   *Stop emailing me* / *Both.* (Captures which of the two suppressions they want.)
5. **Anything else? (optional)** – long answer.

**Settings:** responses → a linked **Google Sheet** (the durable record); **don't require sign-in**
(reporters won't all have Google accounts); confirmation message = "Thanks – you'll be removed within
[X] business days." Keep the Sheet columns aligned so column A can export straight to
`data/suppressed_csrs.csv` (license number first).

**The personalized link (per reporter):** Google Forms supports **pre-filled URLs** – build one per
reporter with their license number (and name/email) already filled in, using the mail-merge tool's
merge fields. Format: `…/viewform?entry.<licenseFieldId>={{LicenseNumber}}&entry.<nameFieldId>={{Name}}`.
The email's "Remove my listing" link points at each reporter's own pre-filled URL, so a removal is
one tap and self-identifying (no manual email→license lookup).

**Two suppressions from one form:** a "directory" or "both" answer → `suppressed_csrs.csv` (rebuild).
Any answer that includes "stop emailing" (or "both") → the mail-merge tool's unsubscribe list. A
directory removal always implies email-suppression too.

## Authenticate your sending domain (SPF, DKIM, DMARC)
The single biggest lever for staying out of spam. Do this before any real volume.
- **Send from your own domain, not `@gmail.com`.** You can't set these records for gmail.com
  (Google owns it). Send from `shorthanders.com` via Google Workspace – ideally bulk outreach from a
  **subdomain** like `go.shorthanders.com`, so it doesn't wear on your main business mail.
- **Three DNS records,** added at your DNS host (registrar / Cloudflare / Vercel):
  - **SPF** (one `TXT`): who may send as you – e.g. `v=spf1 include:_spf.google.com ~all`. Keep a
    single SPF record and merge an "include" for each sender (Google, HubSpot, Resend).
  - **DKIM** (`TXT`/`CNAME`): a signature proving the mail is really yours. The sending tool
    generates the exact record – you paste it in, you don't invent it. Each sender needs its own.
  - **DMARC** (`TXT` at `_dmarc.shorthanders.com`): start in monitor mode –
    `v=DMARC1; p=none; rua=mailto:you@shorthanders.com` – then tighten to `p=quarantine`, then
    `p=reject`, once the reports look clean.
- **Verify + test:** click Verify in each sending tool, then send a test to **mail-tester.com** for
  a 0–10 score that flags anything missing (MXToolbox works too).
- **Warm up:** the "few hundred a day over 2–3 weeks" drip above isn't only politeness – a fresh
  domain that suddenly sends thousands gets flagged no matter how clean the authentication is.
