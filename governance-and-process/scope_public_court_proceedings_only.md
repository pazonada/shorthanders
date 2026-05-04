# Platform scope: public court proceedings only

**Owner:** Aud
**Last updated:** 2026-05-02
**Status:** Confirmed — foundational platform constraint

---

## The scope

**Dewey Sholes serves public court proceedings only.** This includes:

- Live attendance at courtroom hearings (motions, family law calendars, civil hearings, criminal hearings, probate, etc.)
- Post-hearing audio transcription of court audio (where the court permits recording and the audio is available)
- Certified Non-Appearances at court hearings (when a party or witness fails to appear at a scheduled court hearing)

**We are NOT currently serving (deferred to future releases):**

- **Depositions** — private proceedings, often involve PHI, sealed materials, party-specific confidentiality stipulations
- **Arbitration hearings** — private, confidentiality-bound
- **Mediation transcripts** — typically privileged, often not transcribed
- **EUOs (examinations under oath)** — insurance claim proceedings, private and confidential
- **Private agreements / contracts being read into a record** — outside court context
- **Sealed proceedings** — even if technically "court," sealed records have unique handling that we're not equipped for

External messaging uses "not at this time" rather than "never" — Rosie wants to leave the door open to expand into depositions (and possibly other private proceeding types) once we have the infrastructure, compliance program, and budget to support them properly.

---

## Why this scope matters

### Regulatory clarity

Public court proceedings are matters of public record. The pricing is set by **CA Gov. Code 69950** (statutory rate of $1.13 per 100 words for original transcripts). The custodial chain is well-established (CSR delivers to court or party who ordered it). The platform's role as a marketplace is straightforward.

Depositions, by contrast, are **private commercial transactions** with:
- No statutory rate cap (deposition rates are negotiated, typically higher)
- Notice-and-protective-order requirements under CCP § 2025.570
- Witness PII concerns under CCP § 2025.340(e)
- Often-overlapping HIPAA-protected health information (medical malpractice, personal injury cases)
- Confidentiality stipulations that can vary case to case

A platform that handles both without different infrastructure and policies for each would create regulatory risk and security exposure we can't justify.

### Security and liability

Court hearings are open to the public. The transcript content is generally not sensitive in a way that requires HIPAA-tier protections. Our security architecture (encryption, access controls, signed URLs) is more than adequate for this content.

Deposition transcripts often contain PHI and PII. Building HIPAA-compliant infrastructure (BAAs with every law firm, formal compliance program, encryption + access controls + audit logs at HIPAA standards) is a $10-50K investment plus ongoing operational overhead. Not justified for a bootstrapped pilot.

### Product simplicity

Court proceedings are predictable products: per-page rate per Gov. Code 69950, per-diem attendance fees, brief CNA records when hearings don't proceed. Simple.

Depositions involve realtime feeds, rough drafts, video synchronization, multi-party copy distribution, exhibit handling, witness scheduling coordination, and other complex workflow that we'd need to build for. Different product entirely.

---

## How this constraint shows up

### In product

- Order flow (`#/order`) Step 1 offers two options: "Live attendance" and "Post-hearing transcription" — both are court contexts. There is no "deposition" option, and there won't be one.
- All mock data uses court-hearing examples (judges, court calendars, hearing dates)
- File upload accepts court audio and produces court transcripts

### In CSR onboarding

- Job type preferences offered: "Live attendance" and "Audio transcription" (both for court work)
- We don't market the platform to deposition-focused CSRs as a deposition channel

### In landing page copy

- Hero subtitle: "for public court hearings"
- Use cases A & B: live attendance / post-hearing transcription, both court-context
- New scope clarification block on landing page below use cases
- FAQ entry: "Do you handle depositions? No."

### In policies

All governance docs reference "court hearings" or "court proceedings." Where existing docs reference "depositions" in scenario examples (e.g., older drafts of cancellation policy), those should be updated to court-hearing scenarios.

---

## Edge cases worth flagging

### Court hearings that involve sensitive testimony

Some court hearings are sensitive (custody disputes, criminal cases involving minors, medical mal where HIPAA might leak in). We handle these with:
- Standard encryption and access controls (already in place)
- Auto-deletion of audio per retention policy
- No custody of the certified record itself (CSR retains)
- No platform processing of content beyond file transfer

This is sufficient for public court records. If a sealed-record scenario arises, the attorney should not order through Dewey Sholes — they should work directly with the courtroom CSR per the court's sealed-record handling rules.

### Hearings transcribed from court-supplied audio

Many CA courts now record audio of proceedings (especially in counties facing the CSR shortage). An attorney can request the audio file and order a transcription through us. This fits our scope.

### Court proceedings that get reclassified mid-case

Rare, but possible — e.g., a hearing starts as a public motion and the judge orders something sealed. The CSR follows the court's instruction and we handle whatever we have through normal flow. The attorney is responsible for their own confidentiality obligations.

### Attorneys who try to use us for a deposition anyway

If an attorney attempts to order a "live attendance" job with a clear deposition use case (deposition notice attached, "deposition of X" in the case name field, etc.):
- The order is allowed to proceed (we don't gatekeep based on case name)
- The CSR who accepts is doing freelance deposition work outside our platform's intended use
- Studio Crux is **not** liable for handling that as a deposition vendor — our terms make clear we are a court-hearing platform
- We update the TOS to disclaim any responsibility for deposition-specific obligations (notice, copy distribution, sealed-record handling, etc.)

In other words: we don't actively prevent deposition orders from flowing through, but we also don't take on the legal obligations that attach to deposition vendors. This is a calculated risk; we revisit if it becomes a frequent issue.

---

## Documents to update

The following existing policies have language that references depositions in ways that should be reframed for court-hearing scope:

- `cancellation_and_cna_policy.md` — examples reference "deposition" and "case settles on the spot before deposition begins"; reframe as court hearing scenarios
- `cost_splitting_policy.md` — opening example mentions "multiple attorneys often need the same deposition transcript"; reframe as court hearing scenario (e.g., contested family law hearing where both spouses' attorneys need the transcript)

These updates don't change the policies themselves — just the framing examples.

---

## Related documents

- `transcript_retention_and_custody_policy.md` — already excludes deposition-style copy distribution
- `confidentiality_and_audio_retention.md` — already specifies public-hearing scope for audio
- `legal_signoffs_tracker.md` — Section 2 (platform liability) already framed for court transcripts

---

## When this scope might change

We could add deposition support in v2 or beyond if:

1. Pilot proves the marketplace model works at scale
2. We have revenue to invest in HIPAA-compliant infrastructure
3. We have legal staff (or budget for outside counsel) to handle deposition-specific compliance
4. There's clear market demand from existing users for an integrated deposition flow

Until those conditions are met, depositions are out of scope. This is a feature, not a limitation.
