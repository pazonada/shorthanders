# Briscoe Sholes — Platform liability when transcripts are challenged
*Draft — March 13, 2026*

*This memo maps the risk landscape. It is not legal advice. A litigation attorney should review before launch.*

---

## The question

When a certified court transcript is challenged — for errors, omissions, or alleged fabrication — who is liable? And where does a marketplace platform that connected the reporter with the firm sit in that chain of responsibility?

This matters because transcript accuracy has real consequences. A mistranscribed ruling can change the outcome of an appeal. A missing passage can undermine a motion for new trial. If something goes wrong with a transcript ordered through Briscoe Sholes, the firm, the reporter, and the platform all need to know where they stand.

---

## How transcript challenges currently work in California

### The correction process

California Code of Civil Procedure section 1203 provides the mechanism. Any party can move to correct a transcript within the applicable time period. The motion must specify the claimed errors and the proposed corrections. The court can order a hearing where the reporter (and often the audio recording, if one exists) are consulted.

In practice, most transcript disputes are resolved informally. The attorney contacts the reporter, identifies the error, and the reporter issues a corrected page. Formal CCP 1203 motions are relatively rare and usually reserved for cases where the reporter disagrees that an error occurred or where the correction would be outcome-determinative.

### Who is liable under current law

**The reporter.** A certified court reporter is a licensed professional who certifies the transcript as accurate under penalty of perjury. The certification is personal to the reporter. If the transcript contains errors, the reporter bears primary professional responsibility. The CRB can take disciplinary action (including license suspension or revocation) for incompetence, dishonesty, or willful inaccuracy.

**The court reporting agency (if applicable).** When a reporter is assigned through an agency, the agency may bear some liability depending on the contractual relationship and whether the agency exercised any editorial control or quality review. Most agencies disclaim liability for transcript content and rely on the reporter's individual certification.

**The law firm.** The firm is the customer. Unless the firm somehow caused the error (e.g., by providing incorrect audio or interfering with the reporter's work), the firm is typically the injured party rather than a liable party in a transcript dispute.

---

## Where the platform fits

Briscoe Sholes occupies a role analogous to the court reporting agency: it connects the reporter with the firm and handles logistics. But there are important distinctions.

### Arguments that the platform is NOT liable for transcript content

**No editorial involvement.** The platform does not edit, review, proofread, or alter transcripts. The reporter uploads a completed, certified transcript. The platform transmits it. This is closer to a file transfer service than a publishing operation.

**Independent contractor relationship.** The reporter is an IC, not an employee. The platform does not supervise the reporter's work, dictate methodology, or control how the transcript is produced. AB 3136 reinforces this by exempting CSRs from the ABC test. Under the Borello test, the reporter is performing work in their independent professional capacity.

**The certification is the reporter's.** The certified transcript bears the reporter's name, license number, and declaration under penalty of perjury. The platform does not add its own certification or make any representations about accuracy.

**Section 230 considerations.** While CDA Section 230 is primarily associated with user-generated content online, its principles may offer some protection for a platform that merely transmits content created by a third party without editorial modification. This is untested in the transcript context and should not be relied upon as a primary defense.

### Arguments that the platform COULD face liability

**Negligent matching.** If the platform assigns a reporter who is not qualified for the job — for example, a reporter with no experience in medical terminology taking on a complex medical malpractice deposition — and the transcript is materially inaccurate as a result, a firm could argue the platform was negligent in the matching process.

**Quality rating misrepresentation.** If the platform displays reliability ratings, accuracy scores, or quality indicators for reporters, and a firm relies on those ratings to select a reporter who then produces a defective transcript, the platform's representations become part of the liability picture.

**Failure to verify credentials.** If the platform represents that all reporters are licensed and a reporter's license has lapsed (or was never valid), the platform's verification failure creates potential liability independent of the transcript content.

**Implied warranty.** Depending on how the platform markets itself, there may be an implied warranty that transcripts ordered through the platform meet a certain standard. If the platform's marketing promises "guaranteed accuracy" or similar language, that creates a contractual expectation.

---

## Risk mitigation strategies

### Contractual protections

**Terms of service — firm-facing.** The TOS should include clear language establishing that Briscoe Sholes is a marketplace, not a court reporting agency. The reporter is an independent professional. The platform facilitates the transaction but does not guarantee the accuracy of any transcript. The reporter's certification is the reporter's professional representation, not the platform's.

**Reporter agreement.** The reporter agreement should include: acknowledgment that the reporter is solely responsible for transcript accuracy; indemnification of the platform for claims arising from transcript content; representation that they hold an active CSR license; agreement to comply with all applicable professional standards.

**Limitation of liability.** Both the firm-facing TOS and the reporter agreement should limit the platform's liability to the amount of the platform fee for the disputed transaction. This is standard marketplace practice and courts generally enforce reasonable limitation of liability clauses in commercial contracts.

**Dispute resolution clause.** Require binding arbitration for disputes between the platform and either party. This reduces litigation exposure and keeps disputes private. California law generally enforces arbitration clauses in commercial agreements.

### Operational protections

**No quality representations.** Do not describe the platform as providing "quality-assured" or "guaranteed accurate" transcripts. The platform provides logistics and payment. Quality is the reporter's domain. If you implement reporter ratings, base them on objective, verifiable metrics (on-time delivery rate, acceptance rate) rather than subjective quality assessments.

**License verification on a schedule.** Verify CSR licenses at signup and periodically thereafter (quarterly is reasonable). Log every verification check. If a reporter's license lapses, automatically suspend their ability to accept new jobs. This demonstrates due diligence.

**No editorial touch.** Do not implement any feature that could be construed as editing or reviewing transcript content. No spell-check, no formatting normalization, no automated error detection on the text of the transcript itself. The file goes from reporter to firm untouched. Format validation (correct file type, presence of certification page) is fine; content review is not.

**Transcript challenge process.** Create a clear, documented process for what happens when a firm disputes a transcript ordered through the platform. The process should route the dispute to the reporter (not resolve it internally) and provide a mechanism for requesting corrections through the reporter. The platform's role is to facilitate communication, not adjudicate accuracy.

**Insurance.** Obtain errors and omissions (E&O) insurance and general liability insurance. E&O insurance specifically covers claims arising from professional services or advice. For a marketplace, this covers the matching and logistics functions. Budget $2,000-5,000/year for a startup-stage policy.

---

## Analogous case law and industry parallels

### Court reporting agencies

The closest analogue is the court reporting agency. Agencies that assign reporters to cases generally do not bear liability for transcript content unless they exercised editorial control or negligently assigned an unqualified reporter. The reporter's individual certification is the standard of professional accountability. Briscoe Sholes should position itself closer to a technology-enabled agency than a content producer.

### Other marketplaces

Platforms like Uber, Airbnb, and Upwork have all navigated the question of liability for the quality of services provided by independent contractors on their platforms. The general trend is that marketplaces that do not control the manner of performance and that clearly disclaim liability for service quality in their TOS are treated as intermediaries, not service providers. However, the more a marketplace controls the transaction (setting prices, imposing quality standards, handling disputes), the more it looks like a principal rather than an intermediary.

### The transcript-specific risk

Transcripts are different from rideshares or hotel stays in one important way: they are legal documents with constitutional implications. The right to a record on appeal is fundamental. A defective transcript can affect the outcome of litigation. This means courts may scrutinize marketplace disclaimers more carefully than they would in a consumer services context. This is not a reason to avoid the business, but it is a reason to take the contractual and operational protections seriously.

---

## Recommendations

1. **Hire a litigation attorney** (not just a startup/business attorney) to review the TOS and reporter agreement before launch. The liability exposure here is specific enough that it warrants specialized review.

2. **Do not promise accuracy.** Anywhere. In marketing, on the website, in the TOS, in sales conversations. The platform promises logistics, payment speed, and compliance. Accuracy is the reporter's professional obligation.

3. **Implement and document license verification.** This is the single most defensible thing the platform can do. If a transcript is challenged and the reporter's credentials were verified, the platform has demonstrated due diligence.

4. **Build the dispute resolution process before launch, not after the first complaint.** The CRB briefing doc already positions the platform as transparent and cooperative. Having a documented dispute process reinforces that posture.

5. **Get E&O insurance.** The cost is modest relative to the risk.

6. **Keep a paper trail.** Log everything: license verifications, job matching criteria, reporter certifications, delivery timestamps. If a claim arises, contemporaneous records are your best defense.
