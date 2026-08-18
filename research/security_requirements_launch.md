# Security requirements for launch

**Owner:** Aud
**Last updated:** 2026-04-11
**Status:** Draft – spec for real build
**Related:** [Data security checklist](md/BriscoeSholes_DataSecurity_Checklist.md) (detailed requirements)

---

## What we need at launch (non-negotiable)

These are table stakes. Any litigation firm will ask about these, and the answer needs to be "yes" before we market to anyone.

### 1. HTTPS everywhere (encryption in transit)
**What it is:** Every connection between a user's browser and our servers is encrypted so nobody can intercept data in transit – not their ISP, not someone on the same WiFi, nobody. The green lock icon in the browser.

**How we get it:** Free. Vercel provides automatic HTTPS via Let's Encrypt for all deployments. Zero configuration needed. This covers the website, the API, file uploads, and file downloads.

**Standard:** TLS 1.2 minimum, TLS 1.3 preferred (Vercel handles this automatically).

### 2. Encrypted file storage (encryption at rest)
**What it is:** When a CSR uploads a transcript or an attorney uploads audio, the file sits on a server somewhere. "Encryption at rest" means that file is scrambled on disk – if someone stole the physical hard drive, they couldn't read the files without the encryption key.

**How we get it:** Supabase Storage is built on AWS S3, which supports AES-256 encryption at rest with a toggle. Enable server-side encryption on the storage bucket. This is a one-time configuration.

**Standard:** AES-256 (the same standard banks and government agencies use).

### 3. Authenticated file access (nobody sees files they shouldn't)
**What it is:** The most important one. When Attorney A orders a transcript, only Attorney A (and the assigned CSR) can download that file. Attorney B can't access it, even if they guess the URL. The platform admin can't casually browse transcript contents either.

**How we get it:** This requires careful architecture. See the [file security architecture spec](#file-security-architecture) below.

**Key mechanisms:**
- Supabase Row-Level Security (RLS) policies on the database
- Signed URLs for file downloads (temporary, expiring links scoped to the authenticated user)
- Storage bucket policies restricting access

### 4. Authentication + MFA
**What it is:** Users log in with email + password. MFA (multi-factor authentication) means they also need a second factor – usually a code from an authenticator app on their phone. This prevents someone who steals a password from accessing the account.

**How we get it:** Supabase Auth supports email/password login and TOTP-based MFA (authenticator app codes) out of the box. We enable MFA as optional at launch, and can make it required for firm admin accounts later.

**Password requirements:** Minimum 12 characters. Supabase Auth handles hashing (bcrypt) and brute-force protection (rate limiting).

### 5. No transcript via email – ever
**What it is:** The platform never sends the actual transcript file as an email attachment. Emails are not encrypted, get forwarded, sit in inboxes forever, and can be accessed by anyone with the email password. Instead, the platform sends a notification email: "Your transcript is ready. Click here to download." The attorney clicks the link, logs in, and downloads from the secure platform.

**How we get it:** Build the notification system to send links, not files. The download link points to an authenticated endpoint that checks the user's identity before serving the file.

### 6. Payment security (PCI compliance)
**What it is:** We handle credit card payments. PCI DSS is the security standard for anyone who touches payment card data. Violating it means fines and losing the ability to process payments.

**How we get it:** We never touch card data. Stripe handles all of it – card numbers never hit our servers. The user enters their card info in a Stripe-hosted form (Stripe Elements), and we only store a Stripe token. This qualifies us for PCI SAQ-A (simplest compliance level).

---

## What we DON'T need yet (but should plan for)

### SOC 2 Type I / Type II

**What it is in plain language:** SOC 2 is like a report card for your company's security practices, issued by an independent auditor. "Type I" means the auditor checked your security policies at a single point in time – "do you have the right rules in place?" "Type II" means the auditor watched you for 6-12 months to confirm you actually follow those rules consistently.

**Why firms care:** BigLaw and mid-size firms with formal vendor approval processes will ask "are you SOC 2 compliant?" It's the standard way to prove you take security seriously without the firm having to audit you themselves. Insurance carriers will almost certainly require it.

**Why we don't need it yet:** 
- A SOC 2 Type I audit costs $15,000-$30,000
- Type II requires 6-12 months of observation AFTER you pass Type I
- Small litigation firms (our launch targets, 2-20 attorneys) rarely have formal vendor security processes – they'll be satisfied with our encryption, MFA, and a written security policy
- We should be building SOC 2-ready infrastructure from the start (we are), but paying for the actual audit should wait until (a) we have revenue or (b) a large prospect requires it

**What to say when asked:** "We're building to SOC 2 standards from day one. Our infrastructure uses AES-256 encryption, MFA, role-based access, and SOC 2-certified subprocessors (AWS, Stripe). We plan to complete our Type I audit within 12 months of launch and welcome your security team's review of our architecture."

**Automation tools (when ready):** Platforms like Drata (~$7,500/yr), Vanta (~$10K/yr), or Secureframe (~$8K/yr) connect to your infrastructure (Supabase, AWS, GitHub, Stripe), auto-collect compliance evidence, generate required policies, and pair you with an auditor. Total automated SOC 2 Type I cost: ~$12,500-$20K (platform + auditor), vs. $25-50K+ doing it manually with consultants. Don't pay for this yet – but when a prospect requires it, you sign up, connect your infra, and you're 80% there because we built SOC 2-ready from day one.

**Timeline:** SOC 2 Type I readiness assessment when revenue reaches ~$5K/month or a BigLaw/carrier prospect requires it. Budget ~$12,500-$20K all-in with an automation platform.

### HIPAA compliance

**What it is in plain language:** HIPAA is the federal law that governs how medical information is handled. If you're a "covered entity" (healthcare provider, insurer) or a "business associate" (you handle medical data on their behalf), you must follow HIPAA rules – encryption, access controls, breach notification, audit trails, and a formal compliance program.

**Why this likely doesn't apply to Shorthanders:** We handle court transcripts from public hearings, not depositions. Court proceedings are public record – anyone could have walked into the courtroom and heard everything. There's no PHI to protect because the transcript is a legal document recording public proceedings, not a medical record.

The HIPAA concern only arises with **deposition transcripts** (private proceedings), specifically medical malpractice depositions where doctors testify about patient diagnoses and treatment. Since we're focused on court transcripts, HIPAA is essentially off the table.

**If we expand into depositions later:** Even then, the stronger argument is that the **law firm** is the HIPAA-covered entity (or business associate), not the platform that transfers the file. But if med mal deposition services become a significant segment, revisit this and budget $10-50K for a formal compliance program and BAA (Business Associate Agreement) template.

**What to say if asked:** "We handle court transcripts from public proceedings, which are not subject to HIPAA. Our encryption and access controls meet HIPAA's technical safeguards regardless. If we expand into deposition services involving medical records, we'll implement formal HIPAA compliance including BAAs."

**Timeline:** Revisit only if/when deposition services with PHI become part of the platform.

### Penetration testing

**What it is in plain language:** You hire a security firm to try to hack your platform. They attempt everything – SQL injection, broken authentication, privilege escalation, file access bypass – and give you a report of what they found. It's like a fire drill for your security.

**Why it matters:** It catches vulnerabilities that you didn't think of. No matter how carefully you build, there are always edge cases – a URL parameter someone can manipulate, an API endpoint that doesn't check permissions, a file upload that accepts malicious content.

**Why we don't need it yet:**
- Professional pen tests cost $5,000-$20,000+
- Our attack surface during the launch window is small (few users, limited features, no public API)
- The ROI is much higher when you have more users and more features to test
- We can do basic security testing ourselves during development (test that RLS policies work, test that signed URLs expire, test that one user can't access another's files)

**What to say when asked:** "We conduct internal security testing on all access controls and file permissions. We plan to engage a third-party penetration testing firm before our public launch."

**Timeline:** Before scaling beyond launch, or when a prospect requires it. Budget $5K-15K.

---

## File security architecture (Next.js + Supabase)

This is the spec for how transcript and audio files are secured in the real build.

### Storage structure

```
supabase-storage/
├── transcripts/
│   └── {job_id}/
│       └── {file_id}_{timestamp}.pdf
├── audio/
│   └── {job_id}/
│       └── {file_id}_{timestamp}.mp3
└── w9/
    └── {user_id}/
        └── w9_{timestamp}.pdf
```

Each bucket has different access policies:
- `transcripts`: Accessible to ordering attorney + assigned CSR + platform admin (with audit log)
- `audio`: Accessible to assigned CSR + ordering attorney + platform admin (with audit log)
- `w9`: Accessible to platform finance role only (not general support or admin)

### How file upload works (CSR delivers transcript)

```
1. CSR clicks "Upload transcript" in their dashboard
2. Browser sends file via HTTPS to Supabase Storage
   → Supabase checks: is this user authenticated? Are they the assigned CSR for this job?
   → If yes: file is stored, encrypted at rest (AES-256)
   → If no: upload rejected (403 Forbidden)
3. Database record created: job_id, file_path, uploaded_by, uploaded_at, checksum
4. Attorney receives email notification: "Your transcript is ready for review"
   → Email contains a LOGIN link, NOT the file
```

### How file download works (attorney retrieves transcript)

```
1. Attorney clicks "Download transcript" in their dashboard
2. Next.js API route checks:
   a. Is this user authenticated? (Supabase Auth session)
   b. Is this user the ordering attorney for this job? (RLS policy on jobs table)
   c. Is the job status "delivered" or later? (business logic check)
3. If all checks pass:
   → Generate a signed URL for the file in Supabase Storage
   → Signed URL expires in 5 minutes (short-lived)
   → Signed URL is scoped to this specific file
   → Return signed URL to browser
4. Browser downloads file directly from Supabase Storage via signed URL
5. Download event logged: user_id, job_id, file_path, downloaded_at, ip_address
```

### Supabase Row-Level Security (RLS) policies

RLS is the core security mechanism. It's a database-level rule that says "this user can only see rows where they are the owner." Even if there's a bug in the application code, RLS prevents data leakage at the database layer.

```sql
-- Jobs table: attorneys only see their own jobs
CREATE POLICY "attorneys_own_jobs" ON jobs
  FOR SELECT USING (
    auth.uid() = attorney_id
  );

-- Jobs table: CSRs only see jobs assigned to them
CREATE POLICY "csrs_assigned_jobs" ON jobs
  FOR SELECT USING (
    auth.uid() = reporter_id
  );

-- Transcript files: only accessible to job participants
CREATE POLICY "transcript_access" ON transcript_files
  FOR SELECT USING (
    auth.uid() IN (
      SELECT attorney_id FROM jobs WHERE id = job_id
      UNION
      SELECT reporter_id FROM jobs WHERE id = job_id
    )
  );

-- W-9 documents: only accessible to platform finance role
CREATE POLICY "w9_access" ON w9_documents
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM user_roles WHERE role = 'finance'
    )
  );
```

### Cost-split file access

When a job is cost-split, all co-payers receive access to the transcript:

```sql
-- Co-payers can also access transcripts for jobs they co-paid
CREATE POLICY "copayer_transcript_access" ON transcript_files
  FOR SELECT USING (
    auth.uid() IN (
      SELECT attorney_id FROM cost_split_payments
      WHERE job_id = transcript_files.job_id
      AND status = 'paid'
    )
  );
```

### Audit log

Every file access is logged for compliance:

```sql
CREATE TABLE file_access_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  job_id UUID REFERENCES jobs(id),
  file_path TEXT NOT NULL,
  action TEXT NOT NULL,  -- 'upload', 'download', 'view', 'delete'
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

This table is append-only (no UPDATE or DELETE policies) so the audit trail can't be tampered with.

### Signed URL implementation (Next.js API route)

```typescript
// /api/files/download/[jobId].ts
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export default async function handler(req, res) {
  const supabase = createServerSupabaseClient({ req, res });
  const { jobId } = req.query;

  // 1. Check authentication
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (!user) return res.status(401).json({ error: 'Not authenticated' });

  // 2. Check authorization (RLS handles this – query only returns
  //    rows the user is allowed to see)
  const { data: job, error: jobError } = await supabase
    .from('jobs')
    .select('id, transcript_path, status')
    .eq('id', jobId)
    .single();

  if (!job) return res.status(404).json({ error: 'Job not found' });
  if (job.status !== 'delivered' && job.status !== 'completed') {
    return res.status(403).json({ error: 'Transcript not yet available' });
  }

  // 3. Generate signed URL (expires in 5 minutes)
  const { data: signedUrl, error: urlError } = await supabase
    .storage
    .from('transcripts')
    .createSignedUrl(job.transcript_path, 300); // 300 seconds = 5 min

  if (urlError) return res.status(500).json({ error: 'Failed to generate download link' });

  // 4. Log the access
  await supabase.from('file_access_log').insert({
    user_id: user.id,
    job_id: jobId,
    file_path: job.transcript_path,
    action: 'download',
    ip_address: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
    user_agent: req.headers['user-agent'],
  });

  // 5. Return signed URL to client
  return res.status(200).json({ url: signedUrl.signedUrl });
}
```

### What this prevents

| Attack | How it's prevented |
|--------|-------------------|
| Unauthorized file access | RLS policies + signed URLs scoped to authenticated users |
| URL guessing/sharing | Signed URLs expire in 5 minutes and require prior authentication |
| Man-in-the-middle interception | HTTPS (TLS 1.2+) on all connections |
| Server breach / disk theft | AES-256 encryption at rest |
| Insider access (platform employees) | RLS policies enforce access at the database level; admin access requires MFA and is logged |
| Audit trail tampering | file_access_log table is append-only (no UPDATE/DELETE) |
| Payment data theft | Stripe handles all card data; we never store card numbers |
| W-9 / SSN exposure | Separate storage bucket with finance-role-only access policy |

---

## Security one-liner for marketing

"All files encrypted in transit (TLS 1.3) and at rest (AES-256). Authenticated access only – no transcripts sent via email. Every file download is logged. Built on SOC 2-certified infrastructure (AWS, Stripe)."

---

## Action items

- [ ] Enable AES-256 server-side encryption on Supabase storage buckets
- [ ] Implement RLS policies on jobs, transcript_files, and cost_split_payments tables
- [ ] Build signed URL download API route with audit logging
- [ ] Enable MFA in Supabase Auth configuration
- [ ] Configure email notifications to send links, never attachments
- [ ] Write one-page security overview PDF for firm recruitment
- [ ] Draft data processing agreement (DPA) template
- [ ] Write information security policy (5-10 pages)
