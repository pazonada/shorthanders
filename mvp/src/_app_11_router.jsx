// ═══ Legal / info pages ════════════════════════════════════════════
function LegalPage({ title, intro, sections }) {
  return (
    <Page roomy>
      <h1 style={{ fontSize: "clamp(34px, 4.4vw, 54px)", lineHeight: 1.12, marginBottom: 28 }}>{title}</h1>
      <div style={{ maxWidth: 760 }}>
        {intro && <p style={{ fontSize: 17, color: "var(--ink-soft)", marginTop: 16, lineHeight: 1.7 }}>{intro}</p>}
        <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 26 }}>
          {sections.map((s, i) => (
            <section key={i}>
              <h2 style={{ fontSize: 22, marginBottom: 10 }}>{s.h}</h2>
              {s.p.map((para, j) => <p key={j} style={{ fontSize: 15.5, color: "var(--ink-soft)", lineHeight: 1.7, marginBottom: 10 }}>{para}</p>)}
              {s.list && <ul style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 7 }}>{s.list.map((li, k) => <li key={k} style={{ fontSize: 15.5, color: "var(--ink-soft)", lineHeight: 1.6 }}>{li}</li>)}</ul>}
            </section>
          ))}
        </div>
      </div>
    </Page>
  );
}

// Terms + Privacy content, kept as data so the SAME text renders both as a full page (footer /
// marketing links) and inside a modal (the sign-up flow – see LegalModal).
const TERMS_DOC = {
  title: "How Dewey Sholes works",
  intro: "Plain-language summary of the platform's role. This is prototype copy for review, not final legal terms of service.",
  sections: [
    { h: "What Dewey Sholes is", p: ["Dewey Sholes plays exactly three roles, and no others:"], list: ["A directory provider – a searchable listing of licensed California court reporters, built from public licensing data.", "A communication platform – a channel for law firms and reporters to message each other.", "A payment facilitator – a way for reporters to invoice firms and collect payment through Stripe."] },
    { h: "What Dewey Sholes is not", p: ["Dewey Sholes does not, and will not:"], list: ["Employ reporters or treat them as agents of the platform.", "Guarantee the quality, accuracy, or completeness of any reporter's work.", "Guarantee that any invoice will be paid.", "Negotiate, set, or influence rates between the parties.", "Mediate, arbitrate, or resolve disputes between a firm and a reporter.", "Store, host, or take custody of audio files, transcripts, or other work product.", "Become a party to any agreement between a firm and a reporter."] },
    { h: "The agreement is between you", p: ["Any service agreement exists solely between the law firm and the court reporter. Scope, deadlines, rates, confidentiality, and delivery are agreed directly between those two parties. Dewey Sholes is not a signatory and assumes no obligations under that agreement."] },
    { h: "Files and confidential material", p: [
      "Dewey Sholes does not store, host, secure, or review any files. When you exchange audio, transcripts, or other deliverables, you share a link to your own storage through messaging. The file stays with you, never on our servers.",
      "You are solely responsible for how you share materials, including choosing links that are private, access-controlled, or expiring, and for complying with any confidentiality obligations or protective orders that apply. Dewey Sholes does not vet the links you share and is not responsible for how you or the other party store or secure files.",
      "Because depositions and other proceedings can involve confidential or personal information, keeping custody of files with the parties, not the platform, protects everyone.",
    ] },
    { h: "Identity verification & payments", p: ["Reporter identity verification and all payment processing are handled by Stripe, including KYC, identity, tax, and banking. Dewey Sholes stores only the status Stripe returns, never your bank details or ID documents."] },
  ],
};
const PRIVACY_DOC = {
  title: "Privacy",
  intro: "Prototype summary. Final privacy policy to follow.",
  sections: [
    { h: "Public license data", p: ["The base directory is built from publicly available California CSR licensing records – name, license number, and city. This information is public whether or not a reporter claims their profile."] },
    { h: "Claimed profiles", p: ["Information a reporter adds when claiming a profile (bio, areas of law, rates, etc.) is shown publicly by their choice. A reporter can edit or remove it at any time."] },
    { h: "Payments & identity", p: ["Identity and banking information is collected and held by Stripe, not by Dewey Sholes. We store only verification status and invoice metadata."] },
    { h: "Messages", p: ["Messages are carried by the platform so both parties have a record. We don't sell your data or use your conversations for advertising."] },
  ],
};
function TermsPage() { return <LegalPage {...TERMS_DOC} />; }
function PrivacyPage() { return <LegalPage {...PRIVACY_DOC} />; }

// A legal doc shown in a MODAL rather than as its own page. Used for the Terms/Privacy links
// INSIDE a sign-up flow: opening them there must not navigate away and throw out the half-filled
// form (which is the bug this fixes). Escape or a click outside closes back to exactly where you
// were. The standalone /terms and /privacy routes still exist for footer and marketing links.
function LegalModal({ docKey, onClose }) {
  const doc = docKey === "privacy" ? PRIVACY_DOC : TERMS_DOC;
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div className="modal-overlay" onClick={onClose} style={{ alignItems: "flex-start", overflowY: "auto", padding: "40px 20px" }}>
      <div className="ds-card" style={{ maxWidth: 640, width: "92%", maxHeight: "85vh", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 6 }}>
          <h2 style={{ fontSize: 26 }}>{doc.title}</h2>
          <button onClick={onClose} title="Close" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--dim)", padding: 4, flexShrink: 0 }}><Icon name="x" size={20} /></button>
        </div>
        {doc.intro && <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.6, marginBottom: 18 }}>{doc.intro}</p>}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {doc.sections.map((s, i) => (
            <section key={i}>
              <h3 style={{ fontSize: 17, marginBottom: 8 }}>{s.h}</h3>
              {s.p.map((para, j) => <p key={j} style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.6, marginBottom: 8 }}>{para}</p>)}
              {s.list && <ul style={{ paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}>{s.list.map((li, k) => <li key={k} style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.55 }}>{li}</li>)}</ul>}
            </section>
          ))}
        </div>
        <div style={{ marginTop: 22, textAlign: "right" }}>
          <button className="btn btn-primary" onClick={onClose}>Got it</button>
        </div>
      </div>
    </div>
  );
}
function AboutPage() {
  return <LegalPage title="About Dewey Sholes"
    intro="California's court reporters are independent professionals, but the tools around them assume an agency sits in the middle. We think that's backwards."
    sections={[
      { h: "Why we built this", p: ["Law firms struggle to find independent reporters, and reporters lose a chunk of every job to agencies that mostly just handle discovery and billing. Dewey Sholes puts those two things – being found, and getting paid – directly in the hands of the people doing the work.", "We start narrow on purpose: a directory firms can search, and business tools reporters actually need."] },
      { h: "How it started", p: ["Dewey Sholes is a women-owned business. It began with a question its founder put to a good friend, a California trial lawyer: what's the most broken part of your work you'd love to see fixed? The answer came fast – finding and paying court reporters, a process that's hard, opaque, and agency-dependent.", "So she built the fix, with that lawyer's guidance along the way. We stay close to the reporters and firms who use it, and build deliberately."] },
    ]} />;
}
function ContactChannel({ icon, title, children }) {
  return (
    <div className="contact-channel">
      <div className="contact-chip"><Icon name={icon} size={21} /></div>
      <div>
        <div style={{ fontWeight: 600, fontSize: 15.5, color: "var(--ink)" }}>{title}</div>
        <div style={{ color: "var(--muted)", fontSize: 14.5, lineHeight: 1.55, marginTop: 3 }}>{children}</div>
      </div>
    </div>
  );
}
function ContactPage() {
  return (
    <>
      <Nav />
      <main style={{ background: "linear-gradient(180deg, var(--periwinkle-soft) 0%, var(--bg) 58%)", minHeight: "60vh" }}>
        <div className="container" style={{ maxWidth: 1080, padding: "clamp(56px, 6.5vw, 88px) 24px" }}>
          <div className="contact-grid">
            {/* left: intro + ways to reach us */}
            <div>
              <span className="kicker">Contact</span>
              <h1 style={{ fontSize: "clamp(40px, 5vw, 66px)", lineHeight: 1.04, letterSpacing: "-.025em" }}>Get in touch</h1>
              <p style={{ fontSize: 18, color: "var(--ink-soft)", marginTop: 20, lineHeight: 1.65, maxWidth: 440 }}>
                Questions, feedback, or want to be part of the pilot? We read every message and reply personally.
              </p>
              <div style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 22 }}>
                <ContactChannel icon="mail" title="Email us directly">
                  <a href="mailto:hello@deweysholes.com" className="contact-textlink">hello@deweysholes.com</a>
                </ContactChannel>
                <ContactChannel icon="user" title="Court reporters">
                  Every licensed California reporter is already listed. <button className="contact-textlink" onClick={() => navigate("/for-reporters")}>Claim your profile</button>.
                </ContactChannel>
                <ContactChannel icon="building" title="Law firms">
                  Search the directory and message reporters directly. <button className="contact-textlink" onClick={() => navigate("/for-firms")}>See how it works</button>.
                </ContactChannel>
              </div>
            </div>
            {/* right: message form */}
            <div className="ds-card" style={{ boxShadow: "var(--shadow-md)", display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <h2 style={{ fontSize: 25 }}>Send us a message</h2>
                <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 4 }}>We'll get back to you at the email you leave.</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div><label className="ds-label">Name</label><input className="ds-input" placeholder="Your name" /></div>
                <div><label className="ds-label">Email</label><input className="ds-input" type="email" placeholder="you@example.com" /></div>
              </div>
              <div><label className="ds-label">I am a…</label><select className="ds-input"><option>Court reporter</option><option>Law firm</option><option>Other</option></select></div>
              <div><label className="ds-label">Message</label><textarea className="ds-input" rows={5} placeholder="How can we help?" style={{ resize: "vertical" }} /></div>
              <ContactSubmit />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
function ContactSubmit() {
  const [sent, setSent] = useState(false);
  return sent
    ? <div className="banner banner-ok"><Icon name="check" size={18} style={{ flexShrink: 0 }} /><div>Thanks – this is a prototype, so nothing was actually sent. We'll wire this up for launch.</div></div>
    : <button className="btn btn-primary" style={{ alignSelf: "flex-start" }} onClick={() => setSent(true)}>Send message <Icon name="arrow" size={16} /></button>;
}

// ═══ Store provider ════════════════════════════════════════════════
function StoreProvider({ children }) {
  const [role, setRole] = useState(null);        // null | 'reporter' | 'firm'
  const [myCsr, setMyCsr] = useState("900001");   // demo reporter = Marguerite Ellsworth (sample)
  const [saved, setSaved] = useState(["900004", "900003", "900005"]);
  const [convos, setConvos] = useState(SEED_CONVOS);
  const [invoices, setInvoices] = useState(SEED_INVOICES);
  const [paymentRequests, setPaymentRequests] = useState(SEED_REQUESTS);
  const [customTemplates, setCustomTemplates] = useState([]);
  const [invitedFirms, setInvitedFirms] = useState([]);
  const [firmPlan, setFirmPlan] = useState("free");   // 'free' | 'pro'
  const [firmName, setFirmName] = useState("Morgan & Reyes LLP"); // demo default; set from signup
  // Reporters a free firm may fully view/message: the ones who invited or are connected to them.
  const [unlockedReporters, setUnlockedReporters] = useState(["900004", "900003", "900005"]);
  // Reporters a free firm reached by an EXACT name/license search - "I already know who I want" is
  // not discovery, so it's free. Broad filtered browsing still needs Pro. See directory search.
  const [directUnlocked, setDirectUnlocked] = useState([]);
  // The demo reporter's saved "accepting jobs" setting. Prototype stand-in for the one editable
  // profile field with cross-page display consequences; committed on Save, read by the profile.
  const [myAccepting, setMyAccepting] = useState(true);
  // The demo reporter's saved profile edits (bio, rates, etc.). Prototype in-session persistence so
  // the edit -> save -> "view public profile" loop actually reflects changes (resets on reload).
  const [myProfile, setMyProfile] = useState({});
  const [pendingSave, setPendingSave] = useState(null);   // reporter id a logged-out visitor tried to save; applied after signup
  const [pendingMessage, setPendingMessage] = useState(null);  // reporter name a logged-out visitor tried to message; started after signup
  const [justJoined, setJustJoined] = useState(false);  // set on claim/signup finish so the dashboard greets first-timers with "Welcome" not "Welcome back"

  const store = {
    role, myCsr, saved, convos, invoices, paymentRequests, customTemplates, invitedFirms, firmPlan, firmName, unlockedReporters, directUnlocked, myAccepting, setMyAccepting, myProfile, saveMyProfile: (patch) => setMyProfile((p) => ({ ...p, ...patch })), pendingSave, pendingMessage, justJoined,
    // A free firm searched a reporter's exact name or license number - unlock just that reporter.
    noteDirectMatch: (ids) => setDirectUnlocked((u) => { const add = ids.filter((id) => !u.includes(id)); return add.length ? [...u, ...add] : u; }),
    // Firm asks a reporter to invoice them (so payment happens on-platform); reporter fulfills it.
    requestInvoice: (req) => setPaymentRequests((rs) => [{ ...req, id: "REQ-" + Date.now(), status: "pending" }, ...rs]),
    fulfillRequest: (id) => setPaymentRequests((rs) => rs.map((r) => r.id === id ? { ...r, status: "fulfilled" } : r)),
    addTemplate: (t) => setCustomTemplates((xs) => [...xs, t]),
    enterAsReporter: () => setRole("reporter"),
    markJustJoined: () => setJustJoined(true),
    clearJustJoined: () => setJustJoined(false),
    enterAsFirm: (name) => { setRole("firm"); if (name && name.trim()) setFirmName(name.trim()); },
    logout: () => setRole(null),
    upgradeFirm: () => setFirmPlan("pro"),
    toggleSaved: (id) => setSaved((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]),
    inviteFirm: (firm) => setInvitedFirms((xs) => [firm, ...xs]),
    // A firm arriving on a reporter's invite link: create their free account, save + unlock the inviter.
    acceptInvite: (reporterId) => { setRole("firm"); setSaved((s) => s.includes(reporterId) ? s : [...s, reporterId]); setUnlockedReporters((u) => u.includes(reporterId) ? u : [...u, reporterId]); },
    // A logged-out visitor tapped "Save this reporter": remember which reporter, then send them to firm signup.
    queueSave: (reporterId) => setPendingSave(reporterId),
    // A logged-out visitor tapped "Message": remember which reporter, then send them to firm signup.
    queueMessage: (name) => setPendingMessage(name),
    // After firm signup completes: save + unlock the queued reporter, then clear the queue.
    completeSave: () => { if (pendingSave != null) { setSaved((s) => s.includes(pendingSave) ? s : [...s, pendingSave]); setUnlockedReporters((u) => u.includes(pendingSave) ? u : [...u, pendingSave]); setPendingSave(null); } },
    startConvoWith: (name) => setConvos((cs) => cs.some((c) => c.with === name) ? cs
      : [{ id: "new-" + name, with: name, role: "reporter", subtitle: "New conversation", unread: 0, msgs: [{ from: "me", t: "", at: "Just now" }].filter((m) => m.t) }, ...cs]),
    pushMessage: (cid, msg) => setConvos((cs) => cs.map((c) => c.id === cid ? { ...c, msgs: [...c.msgs, msg], unread: 0 } : c)),
    // Send ONE message to MANY reporters as separate 1:1 threads (not a group thread). Each
    // recipient gets an identical opening message in their own conversation; replies split off.
    // Reporters never see they were one of several. See docs/open_strategic_decisions.md.
    sendToMany: (names, text) => setConvos((cs) => {
      const mk = () => ({ from: "me", t: text, at: "Just now" });
      const updated = cs.map((c) => names.includes(c.with) ? { ...c, msgs: [...c.msgs, mk()] } : c);
      const have = new Set(cs.map((c) => c.with));
      const fresh = names.filter((n) => !have.has(n)).map((n) => ({ id: "new-" + n, with: n, role: "reporter", subtitle: "New conversation", unread: 0, msgs: [mk()] }));
      return [...fresh, ...updated];
    }),
    markRead: (cid) => setConvos((cs) => cs.map((c) => c.id === cid ? { ...c, unread: 0 } : c)),
    addInvoice: (inv) => setInvoices((xs) => [inv, ...xs]),
    updateInvoice: (id, patch) => setInvoices((xs) => xs.map((i) => i.id === id ? { ...i, ...patch } : i)),
  };
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

// ═══ Router ════════════════════════════════════════════════════════
function AppRouter() {
  const route = useRoute();
  if (route === "#/signup" || route === "#/signup/") return <SignupChooser />;
  if (route === "#/claim" || route === "#/claim/") return <ClaimStart />;
  const claim = route.match(/^#\/claim\/(.+)$/);
  if (claim) return <ClaimFlow reporterId={decodeURIComponent(claim[1])} />;
  const invited = route.match(/^#\/invite\/(.+)$/);
  if (invited) return <ReporterProfile reporterId={decodeURIComponent(invited[1])} invited />;
  const rp = route.match(/^#\/reporters\/(.+)$/);
  if (rp) return <ReporterProfile reporterId={decodeURIComponent(rp[1])} />;
  if (route === "#/reporters" || route === "#/reporters/") return <ReporterDirectory />;
  if (route.startsWith("#/directory")) return <ReporterDirectory />;
  if (route.startsWith("#/reporter")) return <ReporterDashboard />;
  if (route.startsWith("#/firm-signup")) return <FirmSignup />;
  if (route.startsWith("#/firm")) return <FirmDashboard />;
  if (route.startsWith("#/messages")) return <MessagingPage />;
  if (route.startsWith("#/for-firms")) return <ForFirmsPage />;
  if (route.startsWith("#/for-reporters")) return <ForReportersPage />;
  if (route.startsWith("#/terms")) return <TermsPage />;
  if (route.startsWith("#/privacy")) return <PrivacyPage />;
  if (route.startsWith("#/about")) return <AboutPage />;
  if (route.startsWith("#/contact")) return <ContactPage />;
  return <LandingPage />;
}

function App() {
  useEffect(() => { document.documentElement.dataset.theme = "light"; }, []);
  return <StoreProvider><AppRouter /></StoreProvider>;
}
