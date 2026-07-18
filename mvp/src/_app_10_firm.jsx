// ═══ Firm dashboard ════════════════════════════════════════════════
function FirmDashboard() {
  const store = useStore();
  const [tab, setTab] = useState("saved");
  const all = useMemo(() => buildDirectory(), []);
  const saved = all.filter((r) => store.saved.includes(r.id));
  const unread = store.convos.reduce((n, c) => n + c.unread, 0);
  const tabs = [
    { id: "saved", label: "Saved reporters", badge: saved.length || null },
    { id: "messages", label: "Messages", badge: unread || null },
    { id: "subscription", label: "Subscription" },
  ];
  return (
    <DashLayout title="Morgan & Reyes LLP" subtitle="Firm account · Legal Operations" tabs={tabs} active={tab} onTab={setTab}>
      {tab === "saved" && (
        saved.length ? (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
              <span style={{ color: "var(--muted)", fontSize: 14 }}>{saved.length} saved {saved.length === 1 ? "reporter" : "reporters"}</span>
              <button className="btn btn-secondary" onClick={() => navigate("/directory")}><Icon name="search" size={16} /> Find more reporters</button>
            </div>
            <div className="ds-grid ds-dir-grid">{saved.map((r) => <RepCard key={r.id} r={r} />)}</div>
          </>
        ) : (
          <div className="ds-panel" style={{ textAlign: "center", padding: 56 }}>
            <Icon name="heart" size={30} style={{ margin: "0 auto", color: "var(--dim)" }} />
            <h3 style={{ fontSize: 22, marginTop: 12 }}>No saved reporters yet</h3>
            <p style={{ color: "var(--muted)", marginTop: 8, maxWidth: 420, margin: "8px auto 0" }}>Browse the directory and tap “Save reporter” on anyone you might want to work with. They'll show up here for your whole team.</p>
            <button className="btn btn-primary" style={{ marginTop: 22 }} onClick={() => navigate("/directory")}><Icon name="search" size={16} /> Browse the directory</button>
          </div>
        )
      )}
      {tab === "messages" && <MessagesPanel embedded />}
      {tab === "subscription" && <FirmSubscription />}
    </DashLayout>
  );
}

function FirmSubscription() {
  return (
    <div style={{ maxWidth: 720, display: "flex", flexDirection: "column", gap: 20 }}>
      <div className="ds-card" style={{ display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--brand-soft)", color: "var(--brand-dark)", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="building" size={24} /></div>
        <div style={{ flex: 1, minWidth: 220 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}><h3 style={{ fontSize: 20 }}>Firm plan</h3><span className="pill pill-claimed"><Icon name="check" size={13} /> Active</span></div>
          <div style={{ fontSize: 14, color: "var(--muted)", marginTop: 4 }}>Firm pricing announced before launch · billing set up at signup</div>
        </div>
        <button className="btn btn-secondary">Manage billing</button>
      </div>
      <div className="ds-card">
        <h3 style={{ fontSize: 18, marginBottom: 14 }}>Your plan includes</h3>
        <ul style={{ listStyle: "none", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="plan-feats">
          {["Advanced directory search & filters", "Unlimited direct messaging", "Saved reporters & shared team lists", "Matter references on invoices", "Pay invoices by card or ACH", "Unlimited team seats"].map((f) => (
            <li key={f} style={{ display: "flex", gap: 10, fontSize: 14.5, color: "var(--ink-soft)" }}><Icon name="check" size={17} style={{ color: "var(--sage-deep)", flexShrink: 0, marginTop: 2 }} />{f}</li>
          ))}
        </ul>
      </div>
      <div className="banner banner-info"><Icon name="dollar" size={18} style={{ flexShrink: 0 }} /><div>You only pay the subscription. There are no booking fees or commissions – the rate you agree with a reporter is the rate you pay them directly.</div></div>
    </div>
  );
}
