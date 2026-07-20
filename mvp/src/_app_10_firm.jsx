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
    <DashLayout title={store.firmName} subtitle="Firm account · Legal Operations" tabs={tabs} active={tab} onTab={setTab}>
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
  const store = useStore();
  const isPro = store.firmPlan === "pro";
  // Free = transact with reporters you already know + skim the directory.
  // Pro  = discover and reach NEW reporters (full profiles, search filters, open messaging).
  const free = [
    "Search the directory and see each reporter's public license info",
    "Message, pay, and save any reporter who invites you",
    "Pay invoices by card or ACH – no booking fees, ever",
  ];
  const pro = [
    "Full profiles for every reporter (bio, specialties, rates, coverage, certifications)",
    "Advanced search and filters to discover new reporters",
    "Message any reporter directly",
    "Shared team lists and unlimited team seats",
    "Matter references + a tidy invoice and receipt history",
  ];
  return (
    <div style={{ maxWidth: 760, display: "flex", flexDirection: "column", gap: 20 }}>
      <div className="ds-card" style={{ display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--brand-soft)", color: "var(--brand-dark)", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="building" size={24} /></div>
        <div style={{ flex: 1, minWidth: 220 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}><h3 style={{ fontSize: 20 }}>Firm plan</h3><span className={isPro ? "pill pill-verified" : "pill pill-tag"}>{isPro ? "Pro" : "Free"}</span></div>
          <div style={{ fontSize: 14, color: "var(--muted)", marginTop: 4 }}>{isPro ? "You're on Pro – full profiles, search, and messaging unlocked." : "You're on the free plan. Pro pricing announced before launch."}</div>
        </div>
        {isPro
          ? <button className="btn btn-secondary">Manage billing</button>
          : <button className="btn btn-primary" onClick={() => store.upgradeFirm()}><Icon name="arrow" size={16} /> Upgrade to Pro</button>}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
        <div className="ds-card" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}><h3 style={{ fontSize: 18 }}>Free</h3>{!isPro && <span className="pill pill-claimed"><Icon name="check" size={13} /> Your plan</span>}</div>
          <p style={{ fontSize: 13.5, color: "var(--muted)", margin: 0 }}>Work with the reporters you already know.</p>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, margin: 0, padding: 0 }}>
            {free.map((f) => <li key={f} style={{ display: "flex", gap: 10, fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.5 }}><Icon name="check" size={16} style={{ color: "var(--sage-deep)", flexShrink: 0, marginTop: 2 }} />{f}</li>)}
          </ul>
        </div>
        <div className="ds-card" style={{ display: "flex", flexDirection: "column", gap: 12, borderColor: "var(--brand-pale)", background: "var(--brand-soft)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}><h3 style={{ fontSize: 18 }}>Pro</h3>{isPro ? <span className="pill pill-verified"><Icon name="check" size={13} /> Your plan</span> : <span className="pill pill-verified">Subscription</span>}</div>
          <p style={{ fontSize: 13.5, color: "var(--muted)", margin: 0 }}>Discover and reach reporters you don't know yet.</p>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, margin: 0, padding: 0 }}>
            {pro.map((f) => <li key={f} style={{ display: "flex", gap: 10, fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.5 }}><Icon name="check" size={16} style={{ color: "var(--brand-dark)", flexShrink: 0, marginTop: 2 }} />{f}</li>)}
          </ul>
        </div>
      </div>
      <div className="banner banner-info"><Icon name="dollar" size={18} style={{ flexShrink: 0 }} /><div>You only pay the subscription. There are no booking fees or commissions – the rate you agree with a reporter is the rate you pay them directly.</div></div>
    </div>
  );
}
