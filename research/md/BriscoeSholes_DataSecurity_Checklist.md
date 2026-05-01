# Briscoe Sholes — Data security & privacy requirements checklist
*Draft — March 13, 2026*

---

## Why this matters before beta

BigLaw and mid-size litigation firms will not onboard a new vendor without a security review. Many have formal vendor approval processes. This checklist covers what Briscoe Sholes needs to have in place (or have a credible plan for) before approaching firms for beta recruitment.

---

## 1. Attorney-client privilege and confidentiality

**CA Rule 1.6 (duty of confidentiality):** Attorneys have an obligation to make reasonable efforts to prevent unauthorized disclosure of client information. When a firm uses Briscoe Sholes, the platform becomes a third-party vendor handling potentially privileged material (hearing audio, transcript content, case details).

What the platform must provide:

- Contractual confidentiality obligations binding on the platform and all reporters who accept jobs through it
- A clear data processing agreement (DPA) that firms can review and sign
- Language specifying that Briscoe Sholes does not claim any ownership or license to transcript content
- Confirmation that platform employees cannot access transcript content without a documented business need
- Incident notification clause: if a breach occurs, the firm is notified within 72 hours

**Audio upload (Use Case B):** When firms upload hearing audio for transcription, the file contains attorney-client communications, judicial statements, and witness testimony. This is the highest-sensitivity data the platform will handle.

- Audio files must be encrypted in transit (TLS 1.2+) and at rest (AES-256)
- Audio files must be stored in a SOC 2-compliant environment
- Audio files must be automatically deleted after a configurable retention period (default: 30 days post-delivery, or per firm policy)
- Access to audio files must be limited to the assigned reporter and platform support (with audit log)

---

## 2. Data encryption standards

| Layer | Requirement | Standard |
|---|---|---|
| In transit | All data encrypted via HTTPS | TLS 1.2 minimum, TLS 1.3 preferred |
| At rest | All stored data encrypted | AES-256 |
| Database | Field-level encryption for PII | SSN (W-9), bank account info, license numbers |
| Backups | Encrypted backups | Same standard as production |
| Key management | Encryption keys rotated regularly | Annual rotation minimum; documented key management policy |

---

## 3. Authentication and access control

- Multi-factor authentication (MFA) available for all user accounts (firms and reporters)
- Role-based access control (RBAC): firm admin, firm user, reporter, platform admin
- Session timeout after inactivity (configurable, default 30 minutes)
- Password requirements: minimum 12 characters, complexity rules, no reuse of last 10 passwords
- API authentication via OAuth 2.0 or API keys with expiration
- Admin access requires MFA and is logged

---

## 4. SOC 2 compliance roadmap

Full SOC 2 Type II certification takes 6-12 months and is expensive. For beta, the platform needs a credible roadmap, not a completed audit. What to have ready:

**Immediate (before beta):**

- Written information security policy
- Access control documentation
- Incident response plan
- Data retention and deletion policy
- Vendor risk assessment for subprocessors (hosting, payment, etc.)

**Within 6 months:**

- SOC 2 Type I readiness assessment (engage an auditor for gap analysis)
- Penetration testing by a third party
- Vulnerability scanning on a regular schedule

**Within 12 months:**

- SOC 2 Type II audit (covers a 6-month observation period)
- Compliance report available to share with firm prospects

**For beta recruitment, the pitch is:** "We are building to SOC 2 standards from day one. Here is our security policy, our encryption architecture, and our timeline to formal certification. We welcome your security team's review."

---

## 5. Payment data security (PCI DSS)

Briscoe Sholes will handle payment transactions. PCI compliance is non-negotiable.

- Use Stripe (or equivalent PCI Level 1 certified processor) for all card transactions
- Never store raw card numbers on platform servers
- Use Stripe's tokenization for recurring payments
- ACH/bank account details handled through Stripe's verified bank account flow
- PCI SAQ-A (Self-Assessment Questionnaire A) is sufficient if all card processing is delegated to Stripe

---

## 6. W-9 and tax document handling

Reporters provide W-9 forms at onboarding. These contain Social Security Numbers.

- W-9 data must be encrypted at rest with field-level encryption for SSN
- Access to W-9 data limited to platform finance role (not general support)
- W-9 documents stored in a separate, access-controlled data store
- 1099 generation uses the stored data; original W-9 PDFs can be purged after extraction
- Retention: IRS requires W-9 records for 4 years after the last tax year the form was used

---

## 7. Reporter credential verification

The platform verifies CSR licenses against the CRB database. This data handling requires:

- License numbers stored as part of the reporter profile (not PII-sensitive, but part of professional identity)
- Verification checks logged with timestamp and result
- If CRB provides an API: secure API integration with authentication
- If manual: documented verification process with audit trail

---

## 8. Incident response plan

A written incident response plan covering:

- Definition of what constitutes a security incident
- Roles and responsibilities (who is the incident lead)
- Communication plan: internal escalation, firm notification (within 72 hours), reporter notification
- Containment and remediation steps
- Post-incident review and documentation
- California-specific: compliance with CA Civil Code § 1798.82 (data breach notification law) if personal information is compromised

---

## 9. Subprocessor list

Firms will ask: "Who else touches our data?" Maintain a list of all subprocessors:

| Subprocessor | Purpose | Data accessed | Compliance |
|---|---|---|---|
| Hosting provider (e.g., Vercel, AWS) | Application hosting | All platform data | SOC 2 Type II |
| Stripe | Payment processing | Payment info, bank details | PCI Level 1 |
| Email provider (e.g., SendGrid) | Transactional email | Email addresses, order notifications | SOC 2 |
| Cloud storage (e.g., S3) | Audio file storage, transcript storage | Audio files, transcripts | SOC 2, AES-256 |
| Analytics (if any) | Usage metrics | Anonymized usage data | Privacy-compliant |

---

## 10. Firm-facing security documentation

What to prepare as a PDF or web page for the beta recruitment process:

- One-page security overview (suitable for a managing partner, not a CISO)
- Full security policy document (for the firm's IT or compliance team)
- Data processing agreement template (mutual DPA)
- Subprocessor list
- SOC 2 roadmap with timeline
- Contact for security questions (named person, not a generic inbox)

---

## Action items

1. Write the information security policy (can be 5-10 pages covering the above)
2. Draft the DPA template (standard mutual data processing agreement)
3. Set up encryption architecture documentation
4. Create the one-page security overview for firm recruitment
5. Engage a SOC 2 readiness consultant (budget: $5K-15K for gap assessment)
6. Schedule a third-party penetration test before public launch
