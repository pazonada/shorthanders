// ═══ Dashboard shell (shared by reporter + firm) ═══════════════════
function DashLayout({ title, subtitle, tabs, active, onTab, children }) {
  return (
    <Page wide>
      <div style={{ marginBottom: 22 }}>
        <h1 style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}>{title}</h1>
        {subtitle && <p style={{ color: "var(--muted)", marginTop: 6 }}>{subtitle}</p>}
      </div>
      <div className="ds-tabs" style={{ marginBottom: 26, overflowX: "auto" }}>
        {tabs.map((t) => <button key={t.id} className={"ds-tab" + (active === t.id ? " on" : "")} onClick={() => onTab(t.id)}>{t.label}{t.badge ? <span style={{ marginLeft: 7, background: "var(--brand)", color: "#fff", fontSize: 11, fontWeight: 700, padding: "1px 7px", borderRadius: 999 }}>{t.badge}</span> : null}</button>)}
      </div>
      {children}
    </Page>
  );
}

// ═══ Reporter dashboard ════════════════════════════════════════════
function ReporterDashboard() {
  const store = useStore();
  const [tab, setTab] = useState("overview");
  // Returning from real Stripe onboarding lands here – treat the reporter as signed in.
  useEffect(() => { if (window.location.hash.indexOf("stripe=connected") !== -1 && store.role !== "reporter") store.enterAsReporter(); }, []);
  const me = useMemo(() => { const all = buildDirectory(); return all.find((x) => x.id === store.myCsr) || all.find((x) => x.claimed); }, [store.myCsr]);
  const invoices = store.invoices;
  const unread = store.convos.reduce((n, c) => n + c.unread, 0);
  const paidThisMonth = invoices.filter((i) => i.status === "paid").reduce((s, i) => s + i.amount, 0);
  const outstanding = invoices.filter((i) => i.status === "sent" || i.status === "overdue").reduce((s, i) => s + i.amount, 0);
  const pct = completeness(me);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "profile", label: "My profile" },
    { id: "payments", label: "Payments" },
    { id: "invoices", label: "Invoices" },
    { id: "messages", label: "Messages", badge: unread || null },
  ];

  return (
    <DashLayout title={"Welcome back, " + me.name.split(" ")[0]} subtitle={"CSR #" + me.csrNumber + " · " + me.city + ", CA"} tabs={tabs} active={tab} onTab={setTab}>
      {tab === "overview" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
          <StatCard icon="dollar" label="Paid this month" value={"$" + paidThisMonth.toLocaleString(undefined, { minimumFractionDigits: 2 })} tone="sage" />
          <StatCard icon="clock" label="Outstanding" value={"$" + outstanding.toLocaleString(undefined, { minimumFractionDigits: 2 })} tone="ochre" />
          <StatCard icon="eye" label="Profile views (30d)" value={me.views} tone="brand" />
          <StatCard icon="message" label="Unread messages" value={unread} tone="plum" onClick={() => setTab("messages")} />

          <div className="ds-card" style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
              <h3 style={{ fontSize: 20 }}>Profile completeness</h3>
              <span style={{ fontWeight: 700, color: pct >= 80 ? "var(--sage-deep)" : "var(--ochre-deep)" }}>{pct}%</span>
            </div>
            <Meter value={pct} />
            <p style={{ fontSize: 14, color: "var(--muted)" }}>{pct >= 80 ? "Your profile looks great and ranks near the top of search." : "Add rates and a testimonial to rank higher in firm searches."}</p>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn btn-secondary" onClick={() => setTab("profile")}>Edit profile</button>
              <button className="btn btn-secondary" onClick={() => navigate("/reporters/" + me.id)}><Icon name="eye" size={16} /> View public profile</button>
            </div>
          </div>

          <div className="ds-card" style={{ gridColumn: "1 / -1", display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap", background: "var(--sage-soft)", borderColor: "#C5D8C2" }}>
            <div style={{ width: 46, height: 46, borderRadius: 12, background: "#635BFF", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name="bank" size={22} /></div>
            <div style={{ flex: 1, minWidth: 220 }}>
              <div style={{ fontWeight: 700, color: "var(--sage-deep)" }}>Stripe payouts connected</div>
              <div style={{ fontSize: 14, color: "var(--ink-soft)", marginTop: 2 }}>Deposits to •••• 4471. Next payout Jul 19.</div>
            </div>
            <button className="btn btn-primary" onClick={() => setTab("invoices")}><Icon name="plus" size={16} /> New invoice</button>
          </div>
        </div>
      )}

      {tab === "profile" && <ReporterProfileEditor me={me} />}
      {tab === "payments" && <ReporterPayments invoices={invoices} paidThisMonth={paidThisMonth} />}
      {tab === "invoices" && <ReporterInvoices />}
      {tab === "messages" && <MessagesPanel embedded />}
    </DashLayout>
  );
}

function StatCard({ icon, label, value, tone, onClick }) {
  const bg = { sage: "var(--sage-soft)", ochre: "var(--ochre-soft)", brand: "var(--brand-soft)", plum: "var(--plum-soft)" }[tone];
  const fg = { sage: "var(--sage-deep)", ochre: "var(--ochre-deep)", brand: "var(--brand-dark)", plum: "var(--plum)" }[tone];
  return (
    <div className="ds-card" onClick={onClick} style={{ cursor: onClick ? "pointer" : "default", display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ width: 40, height: 40, borderRadius: 11, background: bg, color: fg, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name={icon} size={20} /></div>
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
      {field("Work types", (me.workTypes || []).join(" · "))}
      {field("Specialties", (me.specialties || []).join(" · "))}
      {field("Languages", (me.languages || []).join(" · ") || "English only")}
      {field("Coverage", (me.coverage || []).map((c) => c + " County").join(" · "))}
      {field("Rush jobs", me.rush ? "Yes – accepts rush / expedited" : "No")}
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
