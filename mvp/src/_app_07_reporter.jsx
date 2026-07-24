// ═══ Dashboard shell (shared by reporter + firm) ═══════════════════
function DashLayout({ title, subtitle, tabs, active, onTab, headerRight, children }) {
  return (
    <Page wide>
      <div style={{ marginBottom: 22, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
        <div>
          <h1 style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}>{title}</h1>
          {subtitle && <p style={{ color: "var(--muted)", marginTop: 6 }}>{subtitle}</p>}
        </div>
        {headerRight}
      </div>
      <div className="ds-tabs" style={{ marginBottom: 26, overflowX: "auto" }}>
        {tabs.map((t) => <button key={t.id} className={"ds-tab" + (active === t.id ? " on" : "")} onClick={() => onTab(t.id)}>{t.label}{t.badge ? <span style={{ marginLeft: 7, background: "var(--brand)", color: "#fff", fontSize: 11, fontWeight: 700, padding: "1px 7px", borderRadius: 999 }}>{t.badge}</span> : null}</button>)}
      </div>
      {children}
    </Page>
  );
}

// Route-backed dashboard tabs: derive the active tab from the hash and switch by navigating, so
// each tab is a real browser-history entry. That makes the browser Back button return to the
// previous tab instead of jumping out of the dashboard - no "back" text links needed.
function useRouteTab(base, tabIds, defaultTab) {
  const route = useRoute();
  const m = route.match(new RegExp("^#" + base + "/([a-z]+)"));
  const tab = m && tabIds.indexOf(m[1]) !== -1 ? m[1] : defaultTab;
  const setTab = (id) => navigate(id === defaultTab ? base : base + "/" + id);
  return [tab, setTab];
}

// ═══ Reporter dashboard ════════════════════════════════════════════
function ReporterDashboard() {
  const store = useStore();
  const [tab, setTab] = useRouteTab("/reporter", ["overview", "profile", "payments", "invoices", "messages"], "overview");
  const [inviteOpen, setInviteOpen] = useState(false);
  // Returning from real Stripe onboarding lands here – treat the reporter as signed in.
  useEffect(() => { if (window.location.hash.indexOf("stripe=connected") !== -1 && store.role !== "reporter") store.enterAsReporter(); }, []);
  const me = useMemo(() => { const all = buildDirectory(); return all.find((x) => x.id === store.myCsr) || all.find((x) => x.claimed); }, [store.myCsr]);
  const invoices = store.invoices;
  const unread = store.convos.reduce((n, c) => n + c.unread, 0);
  const paidThisMonth = invoices.filter((i) => i.status === "paid").reduce((s, i) => s + i.amount, 0);
  const outstanding = invoices.filter((i) => i.status === "sent" || i.status === "overdue").reduce((s, i) => s + i.amount, 0);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "profile", label: "My profile" },
    { id: "payments", label: "Payments" },
    { id: "invoices", label: "Invoices" },
    { id: "messages", label: "Messages", badge: unread || null },
  ];

  return (
    <DashLayout title={"Welcome back, " + me.name.split(" ")[0]} subtitle={"CSR #" + me.csrNumber + " · " + me.city + ", CA"} tabs={tabs} active={tab} onTab={setTab}
      headerRight={
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <button className="btn btn-secondary" onClick={() => setTab("profile")}>Edit profile</button>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <button className="btn btn-primary" onClick={() => setTab("invoices")}><Icon name="plus" size={16} /> New invoice</button>
            <button onClick={() => navigate("/reporters/" + me.id)} style={{ background: "none", border: "none", color: "var(--brand)", cursor: "pointer", fontSize: 13, fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 5, padding: 0 }}><Icon name="eye" size={14} /> View public profile</button>
          </div>
        </div>
      }>
      <div className="ds-note"><Icon name="info" size={15} style={{ flexShrink: 0, color: "var(--dim)" }} /><span><strong style={{ fontWeight: 600, color: "var(--ink-soft)" }}>Sample data</strong> — the invoices, payments, stats, and messages here are illustrative placeholders for the prototype.</span></div>
      {tab === "overview" && (
        <>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
          <StatCard icon="dollar" label="Paid this month" value={"$" + paidThisMonth.toLocaleString(undefined, { minimumFractionDigits: 2 })} tone="sage" />
          <StatCard icon="clock" label="Outstanding" value={"$" + outstanding.toLocaleString(undefined, { minimumFractionDigits: 2 })} tone="ochre" />
          <StatCard icon="eye" label="Profile views (30d)" value={me.views} tone="brand" />
          <StatCard icon="message" label="Unread messages" value={unread} tone="plum" onClick={() => setTab("messages")} />

          <div className="ds-card" style={{ gridColumn: "1 / -1", display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap", background: "var(--brand-soft)", borderColor: "var(--brand-pale)" }}>
            <div style={{ width: 46, height: 46, borderRadius: 12, background: "var(--brand)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name="mail" size={22} /></div>
            <div style={{ flex: 1, minWidth: 220 }}>
              <div style={{ fontWeight: 700, color: "var(--brand-dark)" }}>Invite the firms you already work with</div>
              <div style={{ fontSize: 14, color: "var(--ink-soft)", marginTop: 2 }}>They join free and save you as a favorite, so you are first in mind next time they need a reporter{store.invitedFirms.length ? " · " + store.invitedFirms.length + " invited" : ""}.</div>
            </div>
            <button className="btn btn-primary" onClick={() => setInviteOpen(true)}><Icon name="mail" size={16} /> Invite a law firm</button>
          </div>
        </div>
        {inviteOpen && <InviteFirmModal me={me} onClose={() => setInviteOpen(false)} />}
        </>
      )}

      {tab === "profile" && <ReporterProfileEditor me={me} />}
      {tab === "payments" && <ReporterPayments invoices={invoices} paidThisMonth={paidThisMonth} />}
      {tab === "invoices" && <ReporterInvoices />}
      {tab === "messages" && <MessagesPanel embedded />}
    </DashLayout>
  );
}

function StatCard({ icon, label, value, onClick }) {
  return (
    <div className="ds-card" onClick={onClick} style={{ cursor: onClick ? "pointer" : "default", display: "flex", flexDirection: "column", gap: 12, boxShadow: "inset 3px 0 0 0 var(--ink)" }}>
      <span style={{ color: "var(--brand)", display: "flex", marginTop: -6 }}><Icon name={icon} size={30} /></span>
      <div><div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 30, color: "var(--ink)", lineHeight: 1 }}>{value}</div><div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>{label}</div></div>
    </div>
  );
}

function ReporterProfileEditor({ me }) {
  const [toast, setToast] = useState("");
  const field = (label, value) => (
    <div><label className="ds-label">{label}</label><div className="ds-panel" style={{ padding: "12px 14px", fontSize: 14.5, color: "var(--ink-soft)" }}>{value || <span style={{ color: "var(--dim)" }}>Not set</span>}</div></div>
  );
  return (
    <div style={{ maxWidth: 720, display: "flex", flexDirection: "column", gap: 18 }}>
      <div className="banner banner-info"><Icon name="user" size={18} style={{ flexShrink: 0 }} /><div>This is a read-only preview of your profile data in the prototype. In the live product each field is editable inline.</div></div>
      {field("Bio", me.bio)}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {field("Years of experience", me.yearsExp + " years")}
        {field("Rates", me.rate)}
      </div>
      {field("Proceedings covered", (me.proceedings || []).join(" · "))}
      {field("Services offered", (me.services || []).join(" · "))}
      {field("Areas of law", (me.specialties || []).join(" · "))}
      {field("Certifications", (me.certifications || []).join(" · "))}
      {field("Languages", (me.languages || []).join(" · ") || "English only")}
      {field("Coverage", (me.coverage || []).map((c) => c + " County").join(" · "))}
      {field("Rush jobs", me.rush ? "Yes – accepts rush / expedited" : "No")}
      {field("Notary public", me.notary ? "Yes" : "No")}
      <div style={{ display: "flex", gap: 12 }}>
        <button className="btn btn-primary" onClick={() => setToast("Profile saved")}><Icon name="check" size={16} /> Save changes</button>
        <button className="btn btn-secondary" onClick={() => navigate("/reporters/" + me.id)}><Icon name="eye" size={16} /> Preview public profile</button>
      </div>
      <Toast msg={toast} onClose={() => setToast("")} />
    </div>
  );
}

function ReporterPayments({ invoices, paidThisMonth }) {
  const paid = invoices.filter((i) => i.status === "paid");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div className="ds-card" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <h3 style={{ fontSize: 20 }}>Your plan</h3>
          <span className="pill pill-claimed"><Icon name="check" size={13} /> Pay per invoice</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
          <div className="ds-panel" style={{ borderColor: "var(--brand-pale)" }}>
            <div style={{ fontWeight: 700, color: "var(--ink)" }}>Pay per invoice <span className="pill pill-tag" style={{ marginLeft: 6 }}>Current</span></div>
            <p style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 6, lineHeight: 1.55 }}>A small fee per payment, no monthly cost. Best if you invoice occasionally.</p>
          </div>
          <div className="ds-panel">
            <div style={{ fontWeight: 700, color: "var(--ink)" }}>Pro</div>
            <p style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 6, lineHeight: 1.55 }}>Flat monthly plus a lower per-invoice fee. Best once you invoice often or in large amounts.</p>
            <div style={{ fontSize: 12.5, color: "var(--dim)", marginTop: 8 }}>Pricing announced before launch.</div>
          </div>
        </div>
      </div>
      <div className="ds-card" style={{ display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: "#635BFF", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="bank" size={24} /></div>
        <div style={{ flex: 1, minWidth: 220 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}><h3 style={{ fontSize: 20 }}>Stripe Connect</h3><span className="pill pill-claimed"><Icon name="check" size={13} /> Active</span></div>
          <div style={{ fontSize: 14, color: "var(--muted)", marginTop: 4 }}>Payouts to Bank of America •••• 4471 · Identity & tax verified</div>
        </div>
        <button className="btn btn-secondary">Manage on Stripe</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
        <StatCard icon="dollar" label="Paid this month" value={"$" + paidThisMonth.toLocaleString(undefined, { minimumFractionDigits: 2 })} tone="sage" />
        <StatCard icon="clock" label="Next payout" value="Jul 19" tone="brand" />
        <StatCard icon="invoice" label="Payments received" value={paid.length} tone="plum" />
      </div>
      <div className="ds-card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "18px 22px", borderBottom: "1px solid var(--rule)" }}><h3 style={{ fontSize: 18 }}>Recent payments</h3></div>
        <div style={{ overflowX: "auto" }}>
          <table className="ds-table">
            <thead><tr><th>Invoice</th><th>Client</th><th>Method</th><th>Date</th><th style={{ textAlign: "right" }}>Amount</th></tr></thead>
            <tbody>{paid.length ? paid.map((i) => <tr key={i.id}><td style={{ fontWeight: 600, color: "var(--ink)" }}>{i.id}</td><td>{i.client}</td><td>{i.method || "Card"}</td><td>{i.date}</td><td style={{ textAlign: "right", fontWeight: 600, color: "var(--ink)" }}>${i.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td></tr>) : <tr><td colSpan={5} style={{ textAlign: "center", color: "var(--muted)", padding: 30 }}>No payments yet.</td></tr>}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ═══ Invite a firm (reporter brings their own clients) ═════════════
function InviteFirmModal({ me, onClose }) {
  const store = useStore();
  const first = me.name.split(" ")[0];
  const link = "https://dsmvp.vercel.app/#/invite/" + me.id;
  const [firm, setFirm] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("Hi there,\n\nI'm now on Dewey Sholes, where you can hire me, message me, and pay my invoices in one place. It's free for your firm to join, and you can pay me by card or ACH right from your account.\n\nCreate your free account and save my profile here:\n" + link + "\n\nThanks,\n" + first);
  const [sent, setSent] = useState(false);
  const valid = firm.trim().length > 1 && /.+@.+\..+/.test(email);
  const send = () => { store.inviteFirm({ name: firm.trim(), email: email.trim(), at: "Just now" }); setSent(true); };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="ds-card" style={{ maxWidth: 540, width: "92%", maxHeight: "88vh", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
        {sent ? (
          <div style={{ textAlign: "center", padding: "8px 4px" }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: "var(--sage-soft)", color: "var(--sage-deep)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}><Icon name="mail" size={26} /></div>
            <h3 style={{ fontSize: 22 }}>Invite sent to {firm}</h3>
            <p style={{ color: "var(--muted)", marginTop: 10, lineHeight: 1.6, fontSize: 14.5 }}>When they join, {firm} is saved to your firm list automatically and can pay your invoices here, so you stay first in mind for their next job.</p>
            <p style={{ color: "var(--dim)", marginTop: 10, fontSize: 12.5 }}>Prototype: no email is actually sent.</p>
            <button className="btn btn-primary" style={{ marginTop: 18 }} onClick={onClose}><Icon name="check" size={16} /> Done</button>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
              <div>
                <h3 style={{ fontSize: 24 }}>Invite a law firm</h3>
                <p style={{ color: "var(--muted)", marginTop: 6, fontSize: 14, lineHeight: 1.55 }}>Bring a firm you already work with. They join free, save you as a favorite, and can pay your invoices here.</p>
              </div>
              <button onClick={onClose} title="Close" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--dim)", padding: 4, flexShrink: 0 }}><Icon name="x" size={20} /></button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 18 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div><label className="ds-label">Firm name</label><input className="ds-input" placeholder="Morgan & Reyes LLP" value={firm} onChange={(e) => setFirm(e.target.value)} /></div>
                <div><label className="ds-label">Contact email</label><input className="ds-input" type="email" placeholder="office@firm.com" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
              </div>
              <div><label className="ds-label">Message</label><textarea className="ds-input" rows={8} value={msg} onChange={(e) => setMsg(e.target.value)} style={{ resize: "vertical", lineHeight: 1.5 }} /></div>
              <div className="ds-panel" style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12.5, color: "var(--muted)" }}>
                <Icon name="link" size={15} style={{ flexShrink: 0 }} /> <span style={{ fontFamily: "'JetBrains Mono', monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{link}</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 18, flexWrap: "wrap" }}>
              <button className="btn btn-primary" disabled={!valid} style={{ opacity: valid ? 1 : 0.4 }} onClick={send}><Icon name="mail" size={16} /> Send invite</button>
              <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
