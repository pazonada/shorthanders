# Research memo: California State Bar rules on attorney-client audio handling by third-party platforms
*Briscoe Sholes — March 13, 2026*

*This memo summarizes the applicable rules. It is not legal advice and should be reviewed by an ethics attorney before launch.*

---

## The question

When a law firm uploads hearing audio to the Briscoe Sholes platform for transcription by a licensed court reporter, what are the ethical obligations around handling that audio? Who is responsible for maintaining confidentiality, and what must the platform do to avoid creating an ethics violation for the ordering attorney?

---

## The governing rule: California Rule of Professional Conduct 1.6

Rule 1.6 imposes a duty of confidentiality on California attorneys. The relevant provision for platform purposes is subdivision (a): "A lawyer shall not reveal information protected from disclosure by Business and Professions Code section 6068, subdivision (e), unless the client gives informed consent..."

Business and Professions Code section 6068(e) requires attorneys to "maintain inviolate the confidence, and at every peril to himself or herself to preserve the secrets, of his or her client."

This is broader than attorney-client privilege (which is an evidentiary rule). The duty of confidentiality covers all information relating to the representation, regardless of source, including information learned during proceedings that are part of the public record. Hearing audio, even from public proceedings, can contain strategic discussions, sidebar conversations, and other material the attorney has a duty to protect.

---

## What Rule 1.6 requires when using third-party vendors

ABA Model Rule 1.6(c) and its California equivalent establish that an attorney's duty of confidentiality extends to situations where the attorney uses third-party service providers. The attorney must make "reasonable efforts to prevent the inadvertent or unauthorized disclosure of, or unauthorized access to, information relating to the representation."

The ABA's Formal Opinion 477R (2017) provides guidance that is widely followed in California. When transmitting confidential information electronically, attorneys must:

1. Understand the nature of the threat to confidentiality
2. Understand how client information is transmitted and stored
3. Use reasonable measures to protect the information
4. Take additional precautions for particularly sensitive matters

California State Bar Formal Opinion 2010-179 addresses the use of technology to transmit or store confidential client information. The opinion concludes that an attorney may use technology to transmit and store confidential information, but must take reasonable steps to ensure the technology provides adequate protection. What counts as "reasonable" depends on the sensitivity of the information, the costs and difficulty of additional safeguards, and the extent to which the methods are commonly accepted in the legal profession.

---

## How this applies to Briscoe Sholes

### The attorney remains responsible

When a firm uses Briscoe Sholes to order a transcript — whether by ordering from a known reporter or by uploading audio for transcription — the attorney at the firm retains the ethical duty of confidentiality. The platform does not assume the attorney's ethical obligations. However, if the platform's security practices are inadequate and a breach occurs, the attorney could face discipline for failing to exercise reasonable care in selecting a vendor.

This means the platform's security posture is not just a business question. It's an ethics question for every attorney who uses it.

### Audio files are the highest-risk asset

In Use Case A (live attendance), the reporter was already in the courtroom. The confidentiality dynamic is the same as any reporter-firm relationship — the reporter has a professional obligation not to disclose hearing content.

In Use Case B (audio transcription from ER counties), the firm uploads an audio file to the platform, which then routes it to a reporter for transcription. This is where the rules bite hardest. The audio file may contain: direct attorney-client communications captured during breaks or sidebars, witness testimony and judicial rulings, strategic discussions between co-counsel, and sensitive personal information about parties and witnesses.

The platform is now in custody of confidential client information. The attorney who uploaded it is relying on the platform to handle it properly. If the platform leaks, misroutes, or inadequately protects the audio file, the attorney has an ethics problem.

### What "reasonable efforts" means in practice

Based on the opinions cited above and standard vendor management practices at law firms, "reasonable efforts" for a platform handling attorney-client audio include:

**Encryption.** Audio files must be encrypted in transit (TLS 1.2+) and at rest (AES-256 or equivalent). This is a baseline, not a gold standard.

**Access control.** Only the assigned reporter and authorized platform personnel (with audit logging) should be able to access a specific audio file. No browsing of other reporters' files. No shared storage where files from different cases are accessible to unauthorized users.

**Authentication.** Multi-factor authentication for all reporter and firm accounts. A compromised reporter login should not grant access to a library of confidential audio files from multiple cases.

**Data retention and deletion.** Audio files should be retained only as long as necessary for the transcription to be completed and any disputes resolved. After that, files should be securely deleted. The platform should have a documented retention policy and the ability to confirm deletion.

**Subprocessor controls.** If the platform uses cloud hosting (AWS, GCP, Azure), the cloud provider is a subprocessor with access to the data. The platform should use a provider with SOC 2 certification and should ensure that hosting configurations follow best practices (encryption at rest enabled, access logging, no public buckets).

**No AI processing of audio.** If the platform ever considers using automated speech recognition, AI summarization, or any other automated processing of hearing audio, this creates an additional vector for disclosure. Client information processed by a third-party AI service is disclosed to that service's operator. Under current interpretations of Rule 1.6, this would require informed client consent unless the AI processing occurs entirely within the platform's own controlled infrastructure.

---

## Contractual safeguards the platform should implement

### With reporters

The reporter agreement should include:

- A confidentiality provision binding the reporter to the same standard of care as the platform. The reporter must not disclose, copy, retain, or use case audio or transcript content for any purpose beyond fulfilling the specific order.
- A provision requiring the reporter to delete the audio file and all working drafts after delivering the final transcript.
- A provision requiring the reporter to notify the platform immediately if they believe a confidentiality breach has occurred.

### With law firms

The firm-facing terms of service should include:

- A description of the platform's security measures in sufficient detail that the attorney can evaluate whether they meet the "reasonable efforts" standard. This doesn't mean publishing your entire security architecture, but it means providing enough information for a compliance review.
- A representation that the platform will handle confidential information in accordance with California Rule 1.6 and applicable data security standards.
- A data processing agreement (DPA) that specifies how confidential information is stored, who can access it, how long it is retained, and how it is deleted.
- A provision acknowledging that the attorney retains ultimate responsibility for client confidentiality and that the platform's role is to support, not replace, that obligation.

### Security documentation for firm onboarding

Many firms — particularly mid-size and larger firms — require vendors to complete a security questionnaire before onboarding. The platform should prepare a standard security overview document covering: encryption standards, access controls, authentication methods, data retention and deletion policies, incident response procedures, subprocessor list (cloud hosting, payment processor, etc.), and SOC 2 status or roadmap.

The data security checklist (already drafted) covers most of these items. A polished, firm-ready version should be part of the launch materials.

---

## The SOC 2 question

SOC 2 Type I or Type II certification is the gold standard for demonstrating security practices to law firms. However, SOC 2 is expensive ($20,000-50,000 for the initial audit) and time-consuming (3-6 months of preparation plus the audit itself). For a pre-launch startup, requiring SOC 2 before beta is unrealistic.

The practical approach is:

1. Build to SOC 2 standards from the start (the data security checklist is designed for this).
2. Document your security practices as if preparing for the audit.
3. During beta, provide the security overview document and be transparent that SOC 2 certification is on the roadmap. Most firms will accept this from a startup with strong security documentation and a credible roadmap.
4. Pursue SOC 2 Type I within the first 12 months of operation, once revenue justifies the cost.

---

## Specific risk scenarios

**Misrouted audio.** A file is accidentally made available to the wrong reporter. This is a confidentiality breach. Mitigation: file access should be linked to the specific job assignment. No reporter should be able to access any file not explicitly assigned to them. Job reassignment should revoke the previous reporter's access and grant it to the new one.

**Reporter retains audio after delivery.** The reporter keeps a copy of the audio file after delivering the transcript, either intentionally or through negligence. Mitigation: the reporter agreement prohibits retention. The platform cannot technically enforce deletion on the reporter's personal devices, but the contractual obligation creates accountability.

**Platform breach.** An unauthorized party accesses the platform's file storage. Mitigation: encryption at rest, access logging, intrusion detection, incident response plan. The firm-facing DPA should specify notification obligations (consistent with California's data breach notification law, Civ. Code § 1798.82).

**Subpoena or legal process.** A third party subpoenas audio files from the platform. The platform should have a procedure for evaluating legal process, notifying the affected firm before disclosure (unless prohibited by law), and asserting applicable privilege objections on behalf of the firm where possible.

---

## Summary of obligations

The attorney's obligation under Rule 1.6: make reasonable efforts to ensure the platform protects confidential information. Evaluate the platform's security practices before using it. For particularly sensitive matters, consider additional precautions.

The platform's obligation: implement security measures that meet the "reasonable efforts" standard so that attorneys can use the platform without violating their ethical duties. Document those measures in a way that firms can evaluate. Respond to security questionnaires. Maintain the security posture over time.

The reporter's obligation: handle audio and transcript content with confidentiality. Delete files after delivery. Report any suspected breach.

If all three parties meet their respective obligations, the use of Briscoe Sholes for transcript ordering — including audio upload for ER county transcription — is consistent with California's ethical rules.
