// ─── Reporter taxonomy: two separate axes ──────────────────────────
// PROCEEDINGS = the setting a reporter covers; SERVICES = the capability they offer.
// (Realtime is a service/skill, not a proceeding – see mvp/docs/csr_profile_field_taxonomy.md.)
// "Workers' comp" is a payment-affecting proceeding (own fee schedule / O&2 / minimum).
const PROCEEDING_TYPES = ["Depositions", "Trials", "Hearings", "Arbitrations", "Workers' comp"];
const SERVICE_TYPES = ["Realtime", "Remote / videoconference", "Legal video", "Rough draft / ASCII", "Court-audio transcription", "Expedited turnaround"];
// Common-first (the claim flow shows the first 6 as quick chips; the directory select and profile
// search show all). Weighted toward CA court-interpreter languages, then a broader alphabetical
// tail. Reporters can also add one not listed via the profile editor's "Other" write-in.
const LANGUAGES = ["Spanish", "Mandarin", "Cantonese", "Korean", "Vietnamese", "Tagalog",
  "Armenian", "Farsi (Persian)", "Russian", "Punjabi", "Arabic", "ASL (American Sign Language)",
  "Amharic", "Bengali", "Burmese", "Cebuano", "Croatian", "Dari", "Dutch", "French", "German",
  "Greek", "Gujarati", "Haitian Creole", "Hebrew", "Hindi", "Hmong", "Hungarian", "Ilocano",
  "Indonesian", "Italian", "Japanese", "Khmer (Cambodian)", "Lao", "Mongolian", "Nepali", "Pashto",
  "Polish", "Portuguese", "Romanian", "Samoan", "Serbian", "Somali", "Swahili", "Tamil", "Telugu",
  "Thai", "Tigrinya", "Tongan", "Turkish", "Ukrainian", "Urdu", "Yoruba"];

// Areas of law (displayed as "Area of law"). This is the California State Bar lawyer-referral
// "area of law" taxonomy, which Rosie (CA trial lawyer) endorsed as the authoritative list.
// Verbatim from the Bar, exact duplicates removed, PLUS two depo-heavy litigation areas the
// Bar's lawyer list omits: Antitrust and Product Liability. Nothing removed: almost any area
// has a litigation form that generates depositions, and reporters self-report, so areas none
// have covered just stay empty. See docs/specialty_taxonomy_research.md.
const SPECIALTY_TYPES = ["Administrative", "Admiralty", "Alternative Dispute Resolution", "Antitrust", "Appellate", "Art", "Bankruptcy", "Business", "Commercial Litigation", "Community Property", "Conservatorship & Guardianship", "Constitutional", "Construction", "Consumer", "Contracts", "Corporate", "Criminal", "Defamation", "Disability Rights", "Discrimination", "Education", "Elder", "Emancipation", "Entertainment", "Environmental", "Equestrian", "Estate Planning", "Family", "General", "Government Benefits", "Health Care", "Housing", "Immigration", "Immigration & Naturalization", "Insurance", "Intellectual Property", "International", "Juvenile", "Labor & Employment", "Landlord-Tenant", "Legal Malpractice", "Malpractice", "Maritime", "Medical Malpractice", "Military & Veterans Benefits", "Non-Profit", "Patent", "Personal Injury", "Privacy", "Probate", "Product Liability", "Real Estate", "Rights of Publicity", "Securities Law", "Small Claims", "Social Security", "Sports", "Tax", "Technology", "Tort", "Trade Secrets", "Traffic Violations", "Workers' Compensation"];

// CREDENTIALS = the NCRA skill/certification axis, kept separate from case-subject specialties.
// Source: ncra.org/certification. Matched against the reporter's certifications by code.
const CREDENTIAL_TYPES = [{ code: "CRR", label: "CRR (realtime)" }, { code: "RMR", label: "RMR (merit)" }, { code: "RDR", label: "RDR (diplomate)" }, { code: "RPR", label: "RPR (registered)" }, { code: "CLVS", label: "CLVS (legal video)" }, { code: "CRC", label: "CRC (captioning)" }];

// ─── Sample claimed profiles ────────────────────────────────────────
// FICTIONAL demo profiles - NOT tied to any real licensee. They exist only to show how a claimed
// profile looks. Names + license numbers (900001+) are invented and verified absent from the CRB
// roster (real numbers run 917-15248). Marked sample:true, so cards show a "Sample" badge and the
// profile carries a "fictional demo" banner. SWAP FOR REAL CLAIMED PROFILES once reporters claim
// (see launch_prep.md). The real 5,705 records render as unclaimed public stubs (that IS real
// public data, which is fine).
const SAMPLE_PROFILES = [
  { csrNumber: "900001", name: "Marguerite Ellsworth", city: "San Jose", county: "Santa Clara", method: "Voice", sample: true, bio: "Fifteen years reporting complex civil and IP litigation across the South Bay. Realtime feeds for trial teams, same-day rough drafts, and secure delivery. I run my whole practice solo – no agency markup.", yearsExp: 15, proceedings: ["Depositions", "Trials", "Arbitrations"], services: ["Realtime", "Remote / videoconference", "Rough draft / ASCII"], specialties: ["Intellectual Property", "Patent", "Commercial Litigation"], languages: ["Spanish"], coverage: ["Santa Clara", "San Mateo", "Alameda"], certifications: ["CSR #900001", "CRR", "RPR"], notary: true, rate: null, rush: true, verified: true, claimedAt: "2026-07-11", views: 214 },
  { csrNumber: "900002", name: "Desmond Farrataglia", city: "Concord", county: "Contra Costa", method: "Machine (steno)", sample: true, bio: "Concord-based, 20+ years. Insurance defense and PI depositions throughout the I-680 corridor. Rush drafts available same evening.", yearsExp: 22, proceedings: ["Depositions", "Trials", "Arbitrations", "Workers' comp"], services: ["Realtime", "Remote / videoconference", "Expedited turnaround"], specialties: ["Insurance", "Personal Injury", "Construction"], languages: [], coverage: ["Contra Costa", "Alameda", "Solano"], certifications: ["CSR #900002", "CRR", "RMR"], notary: true, rate: null, rush: true, verified: true, claimedAt: "2026-06-28", views: 301 },
  { csrNumber: "900003", name: "Priyanka Venkatesh", city: "Fremont", county: "Alameda", method: "Machine (steno)", sample: true, bio: "Fremont reporter, bilingual (English/Spanish). Two decades of depositions and a growing transcription practice for court-audio overflow.", yearsExp: 19, proceedings: ["Depositions", "Hearings", "Workers' comp"], services: ["Court-audio transcription"], specialties: ["Personal Injury", "Family"], languages: ["Spanish", "Tagalog"], coverage: ["Alameda", "Santa Clara"], certifications: ["CSR #900003"], rate: null, rush: true, verified: true, claimedAt: "2026-07-02", views: 143 },
  { csrNumber: "900004", name: "Cornelius Hathaway", city: "Sunnyvale", county: "Santa Clara", method: "Machine (steno)", sample: true, bio: "Sunnyvale realtime reporter for the tech-litigation bar. Trade-secret and patent cases, tight security protocols, encrypted delivery.", yearsExp: 14, proceedings: ["Depositions", "Trials", "Arbitrations"], services: ["Realtime", "Legal video", "Rough draft / ASCII"], specialties: ["Patent", "Trade Secrets"], languages: ["Mandarin"], coverage: ["Santa Clara", "San Mateo", "Alameda"], certifications: ["CSR #900004", "CRR", "RMR"], rate: null, rush: true, verified: true, claimedAt: "2026-07-13", views: 256 },
  { csrNumber: "900005", name: "Lucinda Brightwater", city: "Los Angeles", county: "Los Angeles", method: "Machine (steno)", sample: true, bio: "Downtown LA. Thirty years on the record. Business and entertainment litigation, and expert-witness depositions with dense exhibits.", yearsExp: 30, proceedings: ["Depositions", "Trials", "Arbitrations"], services: ["Realtime"], specialties: ["Business", "Entertainment"], languages: [], coverage: ["Los Angeles", "Orange"], certifications: ["CSR #900005", "CRR", "RMR", "RPR"], rate: null, rush: true, accepting: false, verified: true, claimedAt: "2026-06-30", views: 412 },
  { csrNumber: "900006", name: "Thaddeus Okonkwo-Reyes", city: "San Diego", county: "San Diego", method: "Machine (steno)", sample: true, bio: "San Diego reporter focused on cross-border and maritime civil matters. Bilingual, tech-forward, encrypted delivery standard.", yearsExp: 11, proceedings: ["Depositions", "Arbitrations"], services: ["Realtime", "Remote / videoconference", "Court-audio transcription"], specialties: ["Maritime", "Commercial Litigation", "Insurance"], languages: ["Spanish"], coverage: ["San Diego", "Imperial"], certifications: ["CSR #900006", "CRR"], rate: null, rush: false, verified: true, claimedAt: "2026-07-08", views: 118 },
];
const RECENT_CLAIM_CUTOFF = "2026-07-10"; // claimed on/after this date shows "New" badge

// Build the working directory list: the real CRB roll (all unclaimed public stubs) plus the
// fictional sample claimed profiles injected at the top. No real record is marked claimed.
function buildDirectory() {
  const roll = (typeof CSR_PROFILES !== "undefined") ? CSR_PROFILES : [];
  const real = roll.map((r) => ({
    id: r.csrNumber, csrNumber: r.csrNumber, name: r.name, city: r.city,
    county: r.county || countyFor(r.city) || null, method: r.method || "",
    zip: r.zip || "", email: r.email || "", expiration: r.expiration, claimed: false,
  }));
  const samples = SAMPLE_PROFILES.map((sp) => ({ id: sp.csrNumber, claimed: true, ...sp }));
  return [...samples, ...real].map((prof) => {
    // Prototype stand-in for "last signed in"; the real product reads it from auth.
    if (prof.claimed && prof.activeDaysAgo == null) prof.activeDaysAgo = (Number(prof.csrNumber) * 7) % 75;
    return prof;
  });
}

// Activity is shown only when it's good news. We never display a stale "last active 6 months
// ago" - a reporter who set up a profile and got on with their life is using the product
// correctly, and shaming that would make the whole directory look abandoned.
// Window is 30 days (decided 2026-07-21). Any sign-in counts: a reporter who only ever uses
// messaging is as active as one who invoices - do not weight payments higher.
const ACTIVE_WINDOW_DAYS = 30;
function recentlyActive(p) {
  return !!p.claimed && p.activeDaysAgo != null && p.activeDaysAgo <= ACTIVE_WINDOW_DAYS;
}
// A reporter who has turned off "accepting jobs". Absence of the flag = accepting (the default).
// They STILL appear in search and can still be messaged (e.g. to request a past transcript) - the
// flag only drives the "not taking new work" warning. See docs/activity_signal_design.md.
function notAcceptingJobs(p) {
  return !!p.claimed && p.accepting === false;
}

// ─── Featured slots ────────────────────────────────────────────────
// Rotates weekly rather than picking at random. Random re-rolls on every React render (the
// strip would reshuffle while someone types in the search box), and random sampling is uneven
// over time - some reporters would be featured repeatedly and others never. A round-robin
// gives everyone a turn in a predictable order, and lets us tell a reporter they are featured
// this week and have it be true. Everyone in the pool sees the same set on the same day.
function currentWeek() { return Math.floor(Date.now() / 604800000); }
function weeklyFeatured(pool, n) {
  // Claimed only, enforced here and not left to the caller: an unclaimed record is a public
  // license stub with nobody behind it, so featuring one would promote a page that can't
  // respond and would hand the slot to someone who never opted in.
  const claimedOnly = pool.filter((p) => p.claimed);
  // Deliberately NOT gated on recentlyActive(): that would hand the slot to reporters who are
  // already getting work and lock out the ones a featured slot could actually help. See the
  // "Rejected: gating featured on recent activity" section in docs/activity_signal_design.md.
  // Don't spend a slot on a bare profile; fall back to the whole pool if too few qualify.
  const good = claimedOnly.filter((p) => completeness(p) >= 60);
  const eligible = (good.length >= n ? good : claimedOnly).slice().sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  if (eligible.length <= n) return eligible;
  const start = (currentWeek() * n) % eligible.length;
  const out = [];
  for (let i = 0; i < n; i++) out.push(eligible[(start + i) % eligible.length]);
  return out;
}

// Profile completeness (0–100) for ranking + reporter dashboard meter.
function completeness(p) {
  if (!p.claimed) return 0;
  const checks = [p.bio, p.yearsExp, (p.proceedings || []).length, (p.services || []).length, (p.specialties || []).length, (p.coverage || []).length, (p.certifications || []).length, p.rate];
  const got = checks.filter(Boolean).length;
  return Math.round((got / checks.length) * 100);
}

// ─── Prototype store (mock auth + saved + messages + invoices) ──────
const StoreContext = createContext(null);
function useStore() { return useContext(StoreContext); }

const SEED_INVOICES = [
  { id: "INV-1041", client: "Morgan & Reyes LLP", matter: "Ramos v. Delta Freight (24CV01188)", desc: "Certified deposition transcript – 118 pp.", date: "2026-07-08", amount: 560.5, due: "2026-07-22", status: "paid", method: "ACH" },
  { id: "INV-1042", client: "Bayline Employment Group", matter: "In re Coastal Staffing PAGA", desc: "Realtime + certified transcript, full day", date: "2026-07-11", amount: 1650, due: "2026-07-25", status: "sent" },
  { id: "INV-1043", client: "Delaney Defense", matter: "Okafor v. Sunrise Medical (25CV02901)", desc: "Deposition transcript – 64 pp. + rough draft", date: "2026-07-14", amount: 384, due: "2026-07-28", status: "overdue" },
  { id: "INV-1044", client: "Kessler Tang LLP", matter: "Sealed – trade secret", desc: "Expedited transcript – 92 pp.", date: "2026-07-16", amount: 690, due: "2026-07-30", status: "draft" },
];

const SEED_CONVOS = [
  { id: "c1", with: "Morgan & Reyes LLP", role: "firm", subtitle: "Karen Ruiz, Legal Ops", unread: 1, msgs: [
    { from: "them", t: "Hi Marguerite – are you available for a deposition in San Jose on Aug 4? Complex IP matter, expert witness.", at: "Jul 15, 2:14 PM" },
    { from: "them", t: "We'd want realtime and a same-day rough draft if possible.", at: "Jul 15, 2:15 PM" },
    { from: "me", t: "Hi Karen – yes, Aug 4 is open. Realtime + same-day rough is no problem. I'll send a quick scope so we're aligned.", at: "Jul 15, 3:02 PM" },
    { from: "them", t: "Perfect. Exhibits are here if you want to prep terminology.", at: "Jul 15, 3:20 PM", link: { label: "Exhibit set (firm's secure share)", url: "https://share.morgan-reyes.example/expert-exhibits" } },
  ] },
  { id: "c2", with: "Delaney Defense", role: "firm", subtitle: "Marcus Vle, Sr. Associate", unread: 0, msgs: [
    { from: "them", t: "Following up on the Okafor transcript – any update on the rough draft?", at: "Jul 14, 9:40 AM" },
    { from: "me", t: "Sent this morning. Certified copy to follow by Friday.", at: "Jul 14, 10:05 AM", link: { label: "Rough draft (my secure share)", url: "https://files.example/okafor-rough" } },
  ] },
];
