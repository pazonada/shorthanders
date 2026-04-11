# Transcript retention & custody policy

**Owner:** Aud & Rosie
**Last updated:** 2026-04-11
**Status:** Draft — needs Rosie review

---

## Why this policy exists

CSRs operate under a regulated licensing regime (BPC 8016-8019, 16 CCR 2403). Their regulated duties include maintaining stenographic notes, certifying transcripts, and distributing copies. Any entity that edges into these functions risks being seen as engaging in the unlicensed practice of shorthand reporting (misdemeanor under BPC 8019) or triggering firm registration requirements under BPC 8051.

Dewey Sholes must draw a clear line: **we are a technology marketplace that facilitates connections and transfers files. We are not a court reporting service, a custodian of the record, or a distributor of transcripts.**

---

## Platform role: transfer, not custody

### What we do
- Provide infrastructure for CSRs to upload and deliver transcript files to the ordering attorney
- Store a copy of the delivered transcript in the attorney's account for their convenience (like an email attachment they can re-download)
- Process payment between attorney and CSR

### What we do NOT do
- Act as custodian of the official record or stenographic notes
- Certify, review, edit, or verify transcript accuracy
- Distribute, resell, or relicense transcripts to any party other than the original ordering attorney
- Take custody of transcripts on behalf of a CSR
- Fulfill copy requests from third parties (that is a regulated CSR function under CCP 2025.570)
- Set transcript pricing (statutory rates under Gov. Code 69950 are between the CSR and the ordering party)

---

## Transcript file retention

### Attorney's copy

| Event | Platform action |
|-------|----------------|
| CSR uploads transcript, attorney accepts delivery | File stored in attorney's account |
| Attorney accesses their account | Can download their copy at any time |
| Attorney closes their account | 90-day grace period to download files, then permanently deleted |
| Platform discontinues service | 90-day notice period for attorneys to download all files, then permanently deleted |

The file in the attorney's account is **their copy** — the same as if the CSR had emailed them a PDF. We are providing cloud storage as a convenience, not acting as custodian of the record.

### CSR's copy

- CSRs retain their own copies and original stenographic notes per their professional obligations
- The platform does **not** store, manage, or take responsibility for a CSR's notes or master transcript files
- Once a CSR delivers a transcript through the platform, the platform's role in that file is complete (aside from serving it back to the ordering attorney)

---

## Prohibited platform activities

The following are **never permitted**, to avoid triggering regulated CSR functions:

1. **No resale or redistribution.** The platform will never sell, license, or transfer a transcript to anyone other than the original ordering attorney. This aligns with Gov. Code 69954(d), which prohibits purchasers from reselling court transcripts.

2. **No third-party copy fulfillment.** If a non-party wants a transcript copy, they must request it from the original CSR (per CCP 2025.570), not from the platform. The platform will not fulfill copy requests.

3. **No custody of stenographic notes.** The platform will never store, manage, or accept custody of a CSR's stenographic notes or raw audio. Notes custody is a regulated function (16 CCR 2403, Gov. Code 69955).

4. **No transcript certification.** Only a licensed CSR can certify a transcript (BPC 8017). The platform will never certify, co-certify, or imply certification of any transcript.

5. **No witness PII collection.** The platform will not collect personal identifying information about deposition witnesses as a service or product (prohibited by CCP 2025.340(e)).

---

## When a CSR dies, retires, or becomes incapacitated

This is a known gap in freelance CSR regulation. For official court reporters, Gov. Code 69955 requires notes to be delivered to the court clerk. For freelance reporters, there is no explicit statutory mechanism.

### Platform position

- The platform **does not** step in as custodian of a CSR's notes or transcripts
- The platform **does not** assume the CSR's professional obligations
- The platform **does not** fulfill transcript requests on behalf of a deceased or retired CSR

### What the platform does

1. **Marks the CSR's profile as inactive** (no new jobs can be assigned)
2. **Notifies attorneys with open/recent orders** that the CSR is no longer active and they should contact the CSR (or their estate/successor) directly for any outstanding work
3. **Retains delivered transcripts** in attorneys' accounts per normal retention rules (these are the attorneys' copies, not the CSR's)
4. **Does not retain or provide access to** any undelivered work, notes, or files belonging to the CSR

### What the platform recommends (non-binding guidance to CSRs)

During onboarding, we recommend (but do not require) that CSRs:
- Designate a colleague or agency as successor custodian for their notes
- Maintain notes in a format and location accessible to their estate
- Comply with statutory retention periods (Gov. Code 69955, CCP 2025.510(e))

This is informational only. We do not enforce or monitor compliance — that is the CRB's role.

---

## Regulatory classification

### Why we are NOT a "firm" under BPC 8051

BPC 8051 requires registration for entities that engage in conduct under BPC 8050(b): employing, independently contracting with, or recruiting CSRs to report or transcribe deposition testimony.

Dewey Sholes is a **marketplace** where:
- The contract for reporting services is between the **attorney and the CSR directly**
- The platform does not employ CSRs or contract with them to perform reporting
- The platform does not assign, dispatch, or direct CSRs to jobs — CSRs choose which jobs to accept
- The platform does not handle, certify, or distribute transcripts — CSRs deliver directly to attorneys through the platform's file transfer infrastructure

This is analogous to Angi or Thumbtack connecting customers with licensed contractors. The platform facilitates the connection; the professional relationship and regulated duties remain between the CSR and the attorney.

### Maintaining this classification

To preserve marketplace status, the platform must **never**:
- Refer to itself as a "court reporting service" or "court reporting agency"
- Contract with CSRs on behalf of attorneys
- Set or negotiate transcript pricing
- Take editorial control over transcripts
- Act as custodian of the record
- Fulfill copy requests or distribute transcripts to third parties

---

## Related policies

- [Confidentiality & audio retention policy](confidentiality_and_audio_retention.md) — audio file retention (90-day deletion)
- [Transcript correction policy](transcript_correction_policy.md) — correction flow (platform facilitates, does not adjudicate)
- [Legal sign-offs tracker](legal_signoffs_tracker.md) — AB 5 / IC classification, platform liability analysis

---

## Action items

- [ ] Rosie to review this policy and confirm the regulatory line is drawn correctly
- [ ] Confirm with employment attorney (already budgeted) whether marketplace model avoids BPC 8051 registration
- [ ] Add CSR onboarding language recommending (not requiring) notes succession planning
- [ ] Ensure TOS explicitly states platform is not custodian of the record
- [ ] Ensure no marketing copy uses "court reporting service" language (audit needed)

---

## Key statutes referenced

| Statute | Relevance |
|---------|-----------|
| BPC 8016-8019 | CSR licensing, definition of practice, penalties |
| BPC 8050-8051 | Prohibited practices, firm registration for non-CSR entities |
| 16 CCR 2403 | CRB scope of practice (regulated CSR functions) |
| CCP 2025.340(e) | Prohibition on selling witness PII, equal access |
| CCP 2025.510-2025.570 | Deposition transcript custody, copy requests, retention |
| Gov. Code 69950 | Statutory transcript fees |
| Gov. Code 69954(d) | Prohibition on resale of purchased transcripts |
| Gov. Code 69955 | Notes retention, custody on death/retirement |
