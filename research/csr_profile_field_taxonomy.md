# CSR profile field taxonomy — research synthesis

**Purpose:** figure out what information belongs in a reporter's Dewey Sholes profile,
beyond the starting list in the PRD. Feeds the reduced-scope MVP directory + claim flow.

**Sources**
- **CRB public license data** (already scraped): name, license #, status, city, county,
  public email, and **certification method** ("Steno Machine Writer" etc.).
- **Facebook — "Court Reporters of Facebook"** (private, ~6K, machine + voice reporters only)
  and **"Court Reporter Rates Discussion"** (public, ~11.5K). Reviewed 2026-07-17.
  Signal, not a survey: they confirm *what reporters themselves treat as important* —
  method (machine vs voice), realtime/CAT software, and how granular rate structures are.
- **PRD v1** field list (mvp/prd-v1.rtf).
- **Existing repo research**: `csr_agency_live_attendance_rates.md`, `agency_invoice_evidence.md`,
  `csr_survey_questions.md`, rate-benchmark memories (incl. workers'-comp micro-market).
- **Domain knowledge** of US court reporting (NCRA certs, CAT software, methods).

> Privacy note: this synthesizes *categories* of information. We did not compile personal
> data on individual group members.

---

## A. Already in the prototype

Name · CSR license # · city/county · license status + expiration · public email ·
bio · years of experience · practice-area specialties · types of proceedings ·
languages · geographic coverage · certifications · rates (free text) · accepts rush ·
testimonials · work types (Depositions / Trial / Realtime / Transcription / Live).

These are a good base. The additions below are the ones the research says actually
differentiate reporters to a hiring firm.

---

## B. High-value additions (recommend for v1 or v1.1)

### 1. Reporting method  ★ FB-confirmed, already in CRB data
Stenographic (machine) · Voice writing (mask) · Digital/electronic. The FB group is
explicitly "voice or machine method"; the CRB record already carries a Certification
Method. **We can prefill this from the license data** — high value, zero user effort.

### 2. Realtime capability  ★ FB-confirmed
Not just "does realtime work" but *offers a live realtime feed* — the thing firms pay a
premium for. Sub-signals: streams to counsel (iPad/laptop), platforms supported
(CaseViewNet, Bridge, Zoom realtime, LiveDeposition, etc.). Reporters treat realtime as
a distinct, higher-tier service.

### 3. National certifications / skill tier  ★ FB-confirmed
CSR is the CA license; the *quality* signals firms recognize are national:
- **RPR** (Registered Professional Reporter), **RMR** (Merit), **RDR** (Diplomate)
- **CRR** (Certified Realtime Reporter), **CRC** (captioner)
- Optional: certified speed (e.g., 225 wpm) and **notary public** (many CSRs administer oaths)

### 4. Remote vs. in-person  ★ implied by FB (Zoom/remote-depo discussion)
Offers: in-person · remote (Zoom/videoconference) · hybrid. Plus remote platforms
supported. Post-COVID this is a top firm filter.

### 5. Rate structure (structured, not free text)  ★ FB "Rates Discussion" is entirely this
Reporters price on many axes. Even if we keep rates optional and non-binding, the
*shape* matters. Common line items seen in the rates group + agency invoices:
- Per-page: **original** vs **copy** (O&1, copies)
- Appearance / per-diem: half-day, full-day, hourly
- Turnaround tiers: standard, expedited, **daily**, immediate/realtime-rough
- Rough draft / ASCII fee · minimum · travel · waiting time · cancellation/CNA
- Realtime: hourly or per-page premium
- (Workers'-comp is its own rate micro-market — flag if relevant)

### 6. Turnaround options offered
Standard · Expedited · Daily copy · Realtime rough. Ties to the "accepts rush" field but
richer.

### 7. Deliverable formats & delivery
PDF · ASCII · E-Transcript (PTX) · condensed/min-u-script · word index · linked exhibits ·
**secure delivery**. Firms increasingly ask about secure handling.

---

## C. Trust & discovery signals (lightweight, high ROI)

- **Verified license** badge (we already verify via the CRB roll + Stripe identity).
- **Professional affiliations**: NCRA, CCRA (California Court Reporters Assn), DRA/CalDRA
  (Deposition Reporters Assn). Recognizable to firms.
- **E&O / professional insurance** (yes/no).
- **Sample transcript** or redacted work sample.
- **Willing to travel** (radius / counties) — distinct from "coverage."
- **Typical availability / lead time** (even though scheduling is out of scope, "usually
  available", "books 48h out" is useful copy).

---

## D. Deliberately out (for now)

Live calendars / real-time availability, booking, escrow, ratings/reviews — all excluded
by the PRD. Note it, don't build it.

---

## E. Recommendation

Add to **v1** (cheap, high-signal, several are prefillable from license data):
1. Reporting method (prefill from CRB)
2. Realtime capability + platforms
3. National certifications (RPR/RMR/RDR/CRR/CRC) + notary
4. Remote / in-person / hybrid
5. Deliverable formats

Defer to **v1.1** (needs UI thought or data we don't have at launch):
6. Structured rate builder (per-page O&1, per-diem, turnaround tiers) — big enough to
   design carefully; today's free-text "rates" field is a fine placeholder.
7. Affiliations, E&O, sample transcript, travel radius.

## F. Open questions to validate (with Rosie + user testing)
- Which *national* certs do CA firms actually recognize/care about vs. noise?
- Is a structured rate builder worth the friction, or does free-text + "contact for quote"
  convert better? (The rates group's antitrust caution suggests reporters are wary of
  publishing rates at all — worth testing.)
- Remote-platform list: which 3–4 matter most to our pilot counties (SC / CC / Alameda)?
- Deeper FB mining (searching "looking for a reporter" posts) would show the exact
  attributes *firms* filter on — a good next research step if we want more signal.
