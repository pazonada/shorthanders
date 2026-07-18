// ─── Canonical work-type vocabulary ────────────────────────────────
// "Workers' comp" is a payment-affecting category (own fee schedule / O&2 / minimum),
// not just a specialty – see mvp/docs/csr_profile_field_taxonomy.md.
const WORK_TYPES = ["Depositions", "Trial work", "Realtime", "Transcription", "Workers' comp", "Live appearances"];
const LANGUAGES = ["Spanish", "Mandarin", "Cantonese", "Korean", "Vietnamese", "Tagalog", "ASL", "Russian", "Armenian", "Farsi"];

// ─── Claimed-profile overlay (keyed by real CSR license number) ─────
// The rest of the ~4,700 imported records render as unclaimed public stubs.
const CLAIMED = {
  "14585": { bio: "Fifteen years reporting complex civil and IP litigation across the South Bay. Realtime feeds for trial teams, same-day rough drafts, and secure delivery. I run my whole practice solo – no agency markup.", yearsExp: 15, workTypes: ["Depositions", "Trial work", "Realtime"], specialties: ["Intellectual property", "Complex civil", "Technical/engineering"], proceedings: ["Depositions", "Arbitrations", "Trials"], languages: ["Spanish"], coverage: ["Santa Clara", "San Mateo", "Alameda"], certifications: ["CSR #14585", "CRR", "RPR"], rate: null, rush: true, testimonials: [{ quote: "Adam's realtime feed kept our trial team in sync every day. Flawless.", author: "Partner, Morgan & Reyes LLP" }], verified: true, claimedAt: "2026-07-11", views: 214 },
  "7716": { bio: "Concord-based, 20+ years. Insurance defense and PI depositions throughout the I-680 corridor. Rush drafts available same evening.", yearsExp: 22, workTypes: ["Depositions", "Trial work", "Workers' comp"], specialties: ["Insurance defense", "Personal injury", "Construction defect", "Workers' comp"], proceedings: ["Depositions", "Trials", "Arbitrations"], languages: [], coverage: ["Contra Costa", "Alameda", "Solano"], certifications: ["CSR #7716", "CRR", "RMR"], rate: null, rush: true, testimonials: [{ quote: "Allison is my first call in Contra Costa, every time.", author: "Sr. Associate, Delaney Defense" }], verified: true, claimedAt: "2026-06-28", views: 301 },
  "8239": { bio: "Fremont reporter, bilingual (English/Spanish). Two decades of depositions and a growing transcription practice for court-audio overflow.", yearsExp: 19, workTypes: ["Depositions", "Transcription", "Workers' comp"], specialties: ["Immigration-adjacent civil", "Personal injury", "Family law", "Workers' comp"], proceedings: ["Depositions", "Hearings"], languages: ["Spanish", "Tagalog"], coverage: ["Alameda", "Santa Clara"], certifications: ["CSR #8239"], rate: null, rush: true, testimonials: [{ quote: "Catherine's Spanish-language depos are impeccable.", author: "Solo practitioner, Fremont" }], verified: true, claimedAt: "2026-07-02", views: 143 },
  "10518": { bio: "Sunnyvale realtime reporter for the tech-litigation bar. Trade-secret and patent cases, tight security protocols, encrypted delivery.", yearsExp: 14, workTypes: ["Depositions", "Realtime", "Trial work"], specialties: ["Patent", "Trade secret", "Antitrust"], proceedings: ["Depositions", "Trials", "Arbitrations"], languages: ["Mandarin"], coverage: ["Santa Clara", "San Mateo", "Alameda"], certifications: ["CSR #10518", "CRR", "RMR"], rate: null, rush: true, testimonials: [{ quote: "The only reporter we trust with sealed trade-secret depos.", author: "IP Group, Kessler Tang LLP" }], verified: true, claimedAt: "2026-07-13", views: 256 },
  "4360": { bio: "Downtown LA. Thirty years on the record. Business and entertainment litigation, and expert-witness depositions with dense exhibits.", yearsExp: 30, workTypes: ["Depositions", "Trial work", "Realtime"], specialties: ["Entertainment", "Business litigation", "Expert witness"], proceedings: ["Depositions", "Trials", "Arbitrations"], languages: [], coverage: ["Los Angeles", "Orange"], certifications: ["CSR #4360", "CRR", "RMR", "RPR"], rate: null, rush: true, testimonials: [{ quote: "Adrienne has reported half my career's biggest cases.", author: "Name partner, Century City" }], verified: true, claimedAt: "2026-06-30", views: 412 },
  "14273": { bio: "San Diego reporter focused on cross-border and maritime civil matters. Bilingual, tech-forward, encrypted delivery standard.", yearsExp: 11, workTypes: ["Depositions", "Realtime", "Transcription"], specialties: ["Maritime", "Cross-border commercial", "Insurance defense"], proceedings: ["Depositions", "Arbitrations"], languages: ["Spanish"], coverage: ["San Diego", "Imperial"], certifications: ["CSR #14273", "CRR"], rate: null, rush: false, testimonials: [], verified: true, claimedAt: "2026-07-08", views: 118 },
};
const RECENT_CLAIM_CUTOFF = "2026-07-10"; // claimed on/after this date shows "New" badge

// Build the working directory list once from the imported license roll.
function buildDirectory() {
  const roll = (typeof CSR_PROFILES !== "undefined") ? CSR_PROFILES : [];
  return roll.map((r) => {
    const overlay = CLAIMED[r.csrNumber];
    // County now comes straight from the CRB data; fall back to the city map
    // only for the handful of records with a blank/unmapped county.
    const county = r.county || countyFor(r.city) || null;
    return {
      id: r.csrNumber,
      csrNumber: r.csrNumber,
      name: r.name,
      city: r.city,
      county: county,
      method: r.method || "",
      zip: r.zip || "",
      email: r.email || "",
      expiration: r.expiration,
      claimed: !!overlay,
      ...(overlay || {}),
    };
  });
}

// Profile completeness (0–100) for ranking + reporter dashboard meter.
function completeness(p) {
  if (!p.claimed) return 0;
  const checks = [p.bio, p.yearsExp, (p.workTypes || []).length, (p.specialties || []).length, (p.coverage || []).length, (p.certifications || []).length, p.rate, (p.testimonials || []).length];
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
    { from: "them", t: "Hi Adam – are you available for a deposition in San Jose on Aug 4? Complex IP matter, expert witness.", at: "Jul 15, 2:14 PM" },
    { from: "them", t: "We'd want realtime and a same-day rough draft if possible.", at: "Jul 15, 2:15 PM" },
    { from: "me", t: "Hi Karen – yes, Aug 4 is open. Realtime + same-day rough is no problem. I'll send a quick scope so we're aligned.", at: "Jul 15, 3:02 PM" },
    { from: "them", t: "Perfect. Exhibits are here if you want to prep terminology.", at: "Jul 15, 3:20 PM", link: { label: "Exhibit set (firm's secure share)", url: "https://share.morgan-reyes.example/expert-exhibits" } },
  ] },
  { id: "c2", with: "Delaney Defense", role: "firm", subtitle: "Marcus Vle, Sr. Associate", unread: 0, msgs: [
    { from: "them", t: "Following up on the Okafor transcript – any update on the rough draft?", at: "Jul 14, 9:40 AM" },
    { from: "me", t: "Sent this morning. Certified copy to follow by Friday.", at: "Jul 14, 10:05 AM", link: { label: "Rough draft (my secure share)", url: "https://files.example/okafor-rough" } },
  ] },
];
