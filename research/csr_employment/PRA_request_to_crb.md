# Public Records Act request to the CRB – draft

**Status:** Draft for Rosie's review before sending.
**Owner:** Aud + Rosie.
**Last updated:** 2026-05-09
**Goal:** Obtain public-facing email addresses (joined to license numbers) for every active CSR via the proper PRA channel, rather than scraping the per-license search portal.

---

## Send-to

- **To:** Courtreportersboard@dca.ca.gov
- **Subject:** Public Records Act Request – Public-Facing Email Addresses for Active CSR Licensees

## Suggested sender / sign-off

Best from Rosie if she's willing – sender carries weight as a CA-licensed attorney, even though the request itself is generic. If Aud sends, identify as a CA business operating in the court-reporting ecosystem. Either way, sign off with phone + email so the Board's records analyst can reach back if scope clarification is needed.

---

## Email body (copy / paste below this line)

> Dear Court Reporters Board,
>
> This is a request under the California Public Records Act (Government Code § 7920.000 et seq.) for records the Board maintains on its active Certified Shorthand Reporter (CSR) licensees.
>
> **What I am requesting**
>
> For every CSR who currently holds an Active license and who has a public-facing email address designated on the licensee record:
>
> - License number
> - Last name
> - First name
> - Public-facing email address
>
> I understand the recently-adopted requirement that applicants and renewing certificate holders provide a public-facing email is relatively new, so not every active licensee will have one on file. Whatever the Board currently has under the public-facing designation is exactly what I am asking for.
>
> The Department of Consumer Affairs already publishes equivalent licensee data (name, license number, city, expiration, status) via the monthly CRB bulk download. That download does not currently include the public-facing email field. This request is in effect asking for that one additional field, joined by license number to the records the Board already routinely releases.
>
> **Coverage question**
>
> Before producing the file, it would be helpful to know roughly how many active CSRs have a public-facing email on file at this time. If the proportion is small, I can adjust the request scope or timing accordingly. Please feel free to share that figure in your initial response.
>
> **Format and delivery**
>
> A CSV or Excel file is the easiest format on my end. If another format is more convenient on the Board's end, please advise.
>
> Email attachment to this address is preferred. If file size or transmission policy calls for a portal or postal delivery, please let me know.
>
> **Cost**
>
> I understand a reasonable direct-cost-of-duplication or staff-time fee may apply. If so, please advise the estimated cost before the Board produces the file, and I will confirm acceptance.
>
> **Recurring extract**
>
> If a quarterly or monthly recurring version of this extract is feasible (the same fields, refreshed automatically), I would be interested in arranging that as well.
>
> **Timing**
>
> Per Government Code § 7922.535, I understand the Board's initial response is due within 10 calendar days, with up to a 14-day extension under specified circumstances. I appreciate any indication of expected production timing in the initial response.
>
> If a narrower scope or different parameter would simplify production, I am happy to discuss. Thank you for your time.
>
> Sincerely,
>
> [Name]
> [Title – e.g., Co-founder, Shorthanders, a product of Studio Crux, LLC]
> [Email]
> [Phone]

---

## Why this is structured this way

- **Cites the statute up front.** Sets expectations that this is a formal PRA request, not a marketing inquiry.
- **Specifies fields precisely.** Removes ambiguity. The Board's records analyst can produce the exact query without needing follow-up.
- **Asks the coverage question first.** Avoids a one-shot file that turns out to cover only 30% of active licensees because the email-collection rule is recent.
- **Acknowledges cost.** PRA allows agencies to charge direct cost of duplication. Acknowledging this avoids back-and-forth on whether we're prepared to pay.
- **Asks about recurring delivery.** If the answer is yes, we never have to do this again. If no, we move on with the one-time file.
- **Doesn't explain commercial purpose.** PRA doesn't require a stated purpose, and explaining one can invite scope debate. Leave it alone.

## Expected timeline

- **Day 0:** Rosie sends the email.
- **Days 1–10:** Board acknowledges receipt and responds with either the file, an estimated production date, or a request for clarification. Per § 7922.535 the response within 10 calendar days is required – extensions of up to 14 additional days are permitted in specified circumstances.
- **If the Board says yes:** the file arrives, we ingest it.
- **If the Board says no or limited:** they'll cite an exemption. We then have a real basis to evaluate fallback paths (Hunter.io enrichment, pro tempore harvesting, signup-time collection).

## After we send

- Save the sent email + any response in this same folder (`research/csr_employment/PRA_request_to_crb_response_<date>.md` or attached file).
- If we get the data, the merge into the research tracker uses the same `merge_crb_refresh.py` pattern, with the email column populated from this PRA file rather than the monthly bulk download.
- Capture this whole pattern as a kanban task once the data flow is real, so the post-launch backend (per t54) can absorb the same source.
