// ═══ Legal / info pages ════════════════════════════════════════════
function LegalPage({ title, intro, sections }) {
  return (
    <Page roomy>
      <div style={{ maxWidth: 760 }}>
        <h1 style={{ fontSize: "clamp(30px, 4vw, 46px)" }}>{title}</h1>
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

function TermsPage() {
  return <LegalPage title="How Dewey Sholes works – and what it is not"
    intro="Plain-language summary of the platform's role. This is prototype copy for review, not final legal terms of service."
    sections={[
      { h: "What Dewey Sholes is", p: ["Dewey Sholes plays exactly three roles, and no others:"], list: ["A directory provider – a searchable listing of licensed California court reporters, built from public licensing data.", "A communication platform – a channel for law firms and reporters to message each other.", "A payment facilitator – a way for reporters to invoice firms and collect payment through Stripe."] },
      { h: "What Dewey Sholes is not", p: ["Dewey Sholes does not, and will not:"], list: ["Employ reporters or treat them as agents of the platform.", "Guarantee the quality, accuracy, or completeness of any reporter's work.", "Guarantee that any invoice will be paid.", "Negotiate, set, or influence rates between the parties.", "Mediate, arbitrate, or resolve disputes between a firm and a reporter.", "Store, host, or take custody of audio files, transcripts, or other work product.", "Become a party to any agreement between a firm and a reporter."] },
      { h: "The agreement is between you", p: ["Any service agreement exists solely between the law firm and the court reporter. Scope, deadlines, rates, confidentiality, and delivery are agreed directly between those two parties. Dewey Sholes is not a signatory and assumes no obligations under that agreement."] },
      { h: "Files and confidential material", p: [
        "Dewey Sholes does not store, host, secure, or review any files. When you exchange audio, transcripts, or other deliverables, you share a link to your own storage through messaging. The file stays with you, never on our servers.",
        "You are solely responsible for how you share materials, including choosing links that are private, access-controlled, or expiring, and for complying with any confidentiality obligations or protective orders that apply. Dewey Sholes does not vet the links you share and is not responsible for how you or the other party store or secure files.",
        "Because depositions and other proceedings can involve confidential or personal information, keeping custody of files with the parties, not the platform, protects everyone.",
      ] },
      { h: "Identity verification & payments", p: ["Reporter identity verification and all payment processing are handled by Stripe, including KYC, identity, tax, and banking. Dewey Sholes stores only the status Stripe returns, never your bank details or ID documents."] },
    ]} />;
}
function PrivacyPage() {
  return <LegalPage title="Privacy" intro="Prototype summary. Final privacy policy to follow."
    sections={[
      { h: "Public license data", p: ["The base directory is built from publicly available California CSR licensing records – name, license number, and city. This information is public whether or not a reporter claims their profile."] },
      { h: "Claimed profiles", p: ["Information a reporter adds when claiming a profile (bio, specialties, rates, etc.) is shown publicly by their choice. A reporter can edit or remove it at any time."] },
      { h: "Payments & identity", p: ["Identity and banking information is collected and held by Stripe, not by Dewey Sholes. We store only verification status and invoice metadata."] },
      { h: "Messages", p: ["Messages are carried by the platform so both parties have a record. We don't sell your data or use your conversations for advertising."] },
    ]} />;
}
function AboutPage() {
  return <LegalPage title="About Dewey Sholes"
    intro="California's court reporters are independent professionals, but the tools around them assume an agency sits in the middle. We think that's backwards."
    sections={[
      { h: "Why we built this", p: ["Law firms struggle to find independent reporters, and reporters lose a chunk of every job to agencies that mostly just handle discovery and billing. Dewey Sholes puts those two things – being found, and getting paid – directly in the hands of the people doing the work.", "We start narrow on purpose: a directory firms can search, and business tools reporters actually need. No matching engine, no scheduling, no escrow. Just the two things that matter most."] },
      { h: "How it started", p: ["Dewey Sholes is a women-owned business. It began with a question its founder put to a good friend, a California trial lawyer: what's the most broken part of your work you'd love to see fixed? The answer came fast – finding and paying court reporters, a process that's hard, opaque, and agency-dependent.", "So she built the fix, with that lawyer's guidance along the way. We stay close to the reporters and firms who use it, and build deliberately."] },
    ]} />;
}
function ContactPage() {
  return (
    <Page roomy>
      <div style={{ maxWidth: 560 }}>
        <h1 style={{ fontSize: "clamp(30px, 4vw, 46px)" }}>Get in touch</h1>
        <p style={{ fontSize: 17, color: "var(--ink-soft)", marginTop: 14, lineHeight: 1.6 }}>Questions, feedback, or want to be part of the pilot? We'd love to hear from you.</p>
        <div className="ds-card" style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div><label className="ds-label">Name</label><input className="ds-input" placeholder="Your name" /></div>
            <div><label className="ds-label">Email</label><input className="ds-input" type="email" placeholder="you@example.com" /></div>
          </div>
          <div><label className="ds-label">I am a…</label><select className="ds-input"><option>Court reporter</option><option>Law firm</option><option>Other</option></select></div>
          <div><label className="ds-label">Message</label><textarea className="ds-input" rows={4} placeholder="How can we help?" /></div>
          <ContactSubmit />
        </div>
      </div>
    </Page>
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
  const [myCsr, setMyCsr] = useState("14585");   // demo reporter = Adam Elwailly
  const [saved, setSaved] = useState(["10518", "8239", "4360"]);
  const [convos, setConvos] = useState(SEED_CONVOS);
  const [invoices, setInvoices] = useState(SEED_INVOICES);
  const [customTemplates, setCustomTemplates] = useState([]);
  const [invitedFirms, setInvitedFirms] = useState([]);
  const [firmPlan, setFirmPlan] = useState("free");   // 'free' | 'pro'
  const [firmName, setFirmName] = useState("Morgan & Reyes LLP"); // demo default; set from signup
  // Reporters a free firm may fully view/message: the ones who invited or are connected to them.
  const [unlockedReporters, setUnlockedReporters] = useState(["10518", "8239", "4360"]);

  const store = {
    role, myCsr, saved, convos, invoices, customTemplates, invitedFirms, firmPlan, firmName, unlockedReporters,
    addTemplate: (t) => setCustomTemplates((xs) => [...xs, t]),
    enterAsReporter: () => setRole("reporter"),
    enterAsFirm: (name) => { setRole("firm"); if (name && name.trim()) setFirmName(name.trim()); },
    logout: () => setRole(null),
    upgradeFirm: () => setFirmPlan("pro"),
    toggleSaved: (id) => setSaved((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]),
    inviteFirm: (firm) => setInvitedFirms((xs) => [firm, ...xs]),
    // A firm arriving on a reporter's invite link: create their free account, save + unlock the inviter.
    acceptInvite: (reporterId) => { setRole("firm"); setSaved((s) => s.includes(reporterId) ? s : [...s, reporterId]); setUnlockedReporters((u) => u.includes(reporterId) ? u : [...u, reporterId]); },
    startConvoWith: (name) => setConvos((cs) => cs.some((c) => c.with === name) ? cs
      : [{ id: "new-" + name, with: name, role: "reporter", subtitle: "New conversation", unread: 0, msgs: [{ from: "me", t: "", at: "Just now" }].filter((m) => m.t) }, ...cs]),
    pushMessage: (cid, msg) => setConvos((cs) => cs.map((c) => c.id === cid ? { ...c, msgs: [...c.msgs, msg], unread: 0 } : c)),
    markRead: (cid) => setConvos((cs) => cs.map((c) => c.id === cid ? { ...c, unread: 0 } : c)),
    addInvoice: (inv) => setInvoices((xs) => [inv, ...xs]),
    updateInvoice: (id, patch) => setInvoices((xs) => xs.map((i) => i.id === id ? { ...i, ...patch } : i)),
  };
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

// ═══ Router ════════════════════════════════════════════════════════
function AppRouter() {
  const route = useRoute();
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
  if (route.startsWith("#/pricing")) return <PricingPage />;
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
