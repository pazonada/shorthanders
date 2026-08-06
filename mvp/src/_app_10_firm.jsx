// ═══ Firm dashboard ════════════════════════════════════════════════
function FirmDashboard() {
  const store = useStore();
  const [tab, setTab] = useRouteTab("/firm", ["saved", "messages", "invoices", "subscription"], "saved");
  const [bulkOpen, setBulkOpen] = useState(false);
  const all = useMemo(() => buildDirectory(), []);
  const saved = all.filter((r) => store.saved.includes(r.id));
  const unread = store.convos.reduce((n, c) => n + c.unread, 0);
  const firmInvoices = store.invoices.filter((i) => i.client === store.firmName);
  const toPay = firmInvoices.filter((i) => i.status === "sent" || i.status === "overdue").length;
  const tabs = [
    { id: "saved", label: "Saved reporters", badge: saved.length || null },
    { id: "messages", label: "Messages", badge: unread || null },
    { id: "invoices", label: "Invoices", badge: toPay || null },
    { id: "subscription", label: "Subscription" },
  ];
  return (
    <DashLayout title={store.firmName} subtitle="Firm account · Legal Operations" tabs={tabs} active={tab} onTab={setTab}>
      {tab === "saved" && (
        <>
        {saved.length ? (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
              <span style={{ color: "var(--muted)", fontSize: 14 }}>{saved.length} saved {saved.length === 1 ? "reporter" : "reporters"}</span>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button className="btn btn-secondary" onClick={() => navigate("/directory")}><Icon name="search" size={16} /> Find more reporters</button>
                <button className="btn btn-primary" onClick={() => setBulkOpen(true)}><Icon name="message" size={16} /> Message reporters</button>
              </div>
            </div>
            {/* List view (same RepRow as the directory), not stacked cards or a horizontal
                scroller - a firm's saved set is a working list to scan and manage, and grows well
                past what cards or a carousel handle. The filled save-heart on each row is the
                un-save affordance. */}
            <div className="dir-list">{saved.map((r) => <RepRow key={r.id} r={r} />)}</div>
          </>
        ) : (
          <div className="ds-panel" style={{ textAlign: "center", padding: 56 }}>
            <Icon name="heart" size={30} style={{ margin: "0 auto", color: "var(--dim)" }} />
            <h3 style={{ fontSize: 22, marginTop: 12 }}>No saved reporters yet</h3>
            <p style={{ color: "var(--muted)", marginTop: 8, maxWidth: 420, margin: "8px auto 0" }}>Browse the directory and tap “Save reporter” on anyone you might want to work with. They'll show up here for your whole team.</p>
            <button className="btn btn-primary" style={{ marginTop: 22 }} onClick={() => navigate("/directory")}><Icon name="search" size={16} /> Browse the directory</button>
          </div>
        )}
        </>
      )}
      {tab === "messages" && <MessagesPanel embedded />}
      {tab === "invoices" && <FirmInvoices />}
      {tab === "subscription" && <FirmSubscription />}
      {bulkOpen && <BulkMessageModal reporters={saved} onClose={() => setBulkOpen(false)} />}
    </DashLayout>
  );
}

// A firm's received invoices - pay by card or ACH. Invoices addressed to this firm are those whose
// client === firmName. Paying is real Stripe in production (see integration_checklist.md); simulated
// here. This is the firm-side counterpart to the reporter's invoice list.
function FirmInvoices() {
  const store = useStore();
  const [modalInv, setModalInv] = useState(null);
  const mine = store.invoices.filter((i) => i.client === store.firmName);
  const payable = mine.filter((i) => i.status === "sent" || i.status === "overdue");
  const pay = (inv) => store.updateInvoice(inv.id, { status: "paid", method: "Card", paidAt: "2026-07-17" });
  if (!mine.length) return (
    <div className="ds-panel" style={{ textAlign: "center", padding: 56 }}>
      <Icon name="invoice" size={30} style={{ margin: "0 auto", color: "var(--dim)" }} />
      <h3 style={{ fontSize: 22, marginTop: 12 }}>No invoices yet</h3>
      <p style={{ color: "var(--muted)", marginTop: 8, maxWidth: 440, margin: "8px auto 0" }}>When a reporter sends you an invoice through Dewey Sholes, it lands here to pay by card or ACH. Ask a reporter for one from their profile or your messages.</p>
      <button className="btn btn-primary" style={{ marginTop: 22 }} onClick={() => navigate("/directory")}><Icon name="search" size={16} /> Find a reporter</button>
    </div>
  );
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div className="ds-note"><Icon name="info" size={15} style={{ flexShrink: 0, color: "var(--dim)" }} /><span><strong style={{ fontWeight: 600, color: "var(--ink-soft)" }}>Prototype</strong> – paying is simulated. In production, Pay now opens the reporter's secure Stripe page (card or ACH); no real charge is made here.</span></div>
      {payable.length > 0 && <div style={{ color: "var(--muted)", fontSize: 14 }}>{payable.length} invoice{payable.length === 1 ? "" : "s"} to pay</div>}
      {mine.map((i) => {
        const paid = i.status === "paid";
        return (
          <div key={i.id} className="ds-card" onClick={() => setModalInv(i)} style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap", cursor: "pointer" }}>
            <div style={{ flex: 1, minWidth: 220 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <span style={{ fontWeight: 700, fontSize: 17, color: "var(--ink)" }}>${i.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                <InvStatus status={i.status} />
              </div>
              <div style={{ fontSize: 14, color: "var(--ink-soft)", marginTop: 4 }}>{i.from ? "From " + i.from + " · " : ""}{i.matter}</div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>{i.desc}{i.due ? " · due " + i.due : ""}</div>
            </div>
            {paid
              ? <span className="pill pill-claimed"><Icon name="check" size={13} /> Paid{i.method ? " · " + i.method : ""}</span>
              : <button className="btn btn-primary" onClick={(e) => { e.stopPropagation(); pay(i); }}><Icon name="dollar" size={16} /> Pay now</button>}
          </div>
        );
      })}
      {modalInv && <InvoiceModal inv={store.invoices.find((i) => i.id === modalInv.id) || modalInv} viewer="firm" onClose={() => setModalInv(null)} />}
    </div>
  );
}

// Draft one message, send it privately to several saved reporters at once - each lands as its own
// 1:1 thread (not a group thread), and reporters never see they were one of several. Scoped
// deliberately as fan-out over existing messaging, NOT a job board. See open_strategic_decisions.md.
function BulkMessageModal({ reporters, onClose }) {
  const store = useStore();
  const CAP = 10;
  const [sel, setSel] = useState(reporters.slice(0, CAP).map((r) => r.id));
  const [text, setText] = useState("");
  const toggle = (id) => setSel((s) => s.includes(id) ? s.filter((x) => x !== id) : (s.length >= CAP ? s : [...s, id]));
  const chosen = reporters.filter((r) => sel.includes(r.id));
  const canSend = text.trim() && chosen.length;
  const send = () => { if (!canSend) return; store.sendToMany(chosen.map((r) => r.name), text.trim()); onClose(); navigate("/firm/messages"); };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="ds-card" style={{ maxWidth: 560, width: "94%", maxHeight: "88vh", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div>
            <h3 style={{ fontSize: 22 }}>Message several reporters</h3>
            <p style={{ color: "var(--muted)", fontSize: 13.5, marginTop: 4, lineHeight: 1.5 }}>One message, sent privately to each. Everyone gets their own thread – they never see each other.</p>
          </div>
          <button onClick={onClose} title="Close" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--dim)", padding: 4, flexShrink: 0 }}><Icon name="x" size={20} /></button>
        </div>
        <div style={{ margin: "16px 0" }}>
          <div className="ds-label" style={{ marginBottom: 8 }}>Recipients · {chosen.length} selected{sel.length >= CAP ? " (max " + CAP + ")" : ""}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3, maxHeight: 230, overflowY: "auto", border: "1px solid var(--rule)", borderRadius: 10, padding: 6 }}>
            {reporters.map((r) => {
              const on = sel.includes(r.id);
              return (
                <label key={r.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 8px", borderRadius: 8, cursor: "pointer", background: on ? "var(--brand-soft)" : "transparent" }}>
                  <input type="checkbox" checked={on} onChange={() => toggle(r.id)} style={{ width: 16, height: 16, accentColor: "var(--brand)", flexShrink: 0 }} />
                  <Avatar name={r.name} size={30} claimed={r.claimed} photo={r.photo} />
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.name}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)" }}>{r.city}{r.county && r.county !== r.city ? ", " + r.county + " County" : ""}</div>
                  </div>
                  {notAcceptingJobs(r) ? <span style={{ fontSize: 11, color: "var(--ink-soft)", background: "#F7F8C6", border: "1px solid #DCE224", borderRadius: 6, padding: "2px 7px", whiteSpace: "nowrap", flexShrink: 0 }}>Not taking new work</span> : null}
                </label>
              );
            })}
          </div>
        </div>
        <div>
          <div className="ds-label" style={{ marginBottom: 8 }}>Your message</div>
          <textarea className="ds-input" rows={5} value={text} onChange={(e) => setText(e.target.value)} placeholder="Hi – we have a half-day deposition in Santa Clara on Aug 12, realtime preferred. Are you available, and what would you charge?" />
          <p style={{ fontSize: 12, color: "var(--dim)", marginTop: 8, lineHeight: 1.5 }}>Keep it general (skip names) so the same message reads naturally to everyone. Each reporter replies in their own thread.</p>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={send} disabled={!canSend} style={{ opacity: canSend ? 1 : 0.5 }}><Icon name="message" size={16} /> Send to {chosen.length} {chosen.length === 1 ? "reporter" : "reporters"}</button>
        </div>
      </div>
    </div>
  );
}

function FirmSubscription() {
  const store = useStore();
  const isPro = store.firmPlan === "pro";
  // Free = transact with reporters you already know + skim the directory.
  // Pro  = discover and reach NEW reporters (full profiles, search filters, open messaging).
  const free = [
    "Search the directory and see each reporter's public license info",
    "Message and save the reporters you're connected to",
    "Pay invoices by card or ACH – no booking fees, ever",
  ];
  const pro = [
    "Full profiles for every reporter (bio, areas of law, rates, coverage, certifications)",
    "Advanced search and filters to discover new reporters",
    "Message and save any reporter directly",
    "Personalized reporter recommendations",
    "Saved reporters and shared team lists",
    "Matter references + a tidy invoice and receipt history",
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div className="ds-card" style={{ display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--brand-soft)", color: "var(--brand-dark)", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="building" size={24} /></div>
        <div style={{ flex: 1, minWidth: 220 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}><h3 style={{ fontSize: 20 }}>Firm plan</h3><span className={isPro ? "pill pill-verified" : "pill pill-tag"}>{isPro ? "Pro" : "Free"}</span></div>
          <div style={{ fontSize: 14, color: "var(--muted)", marginTop: 4 }}>{isPro ? "You're on Pro – full profiles, search, and messaging unlocked." : "You're on the free plan. The membership is $49/month per user, or $539/year (1 month free). Firm-wide plans coming soon."}</div>
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
            {free.map((f) => <li key={f} style={{ display: "flex", gap: 10, fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.5 }}><Icon name="check" size={16} style={{ color: "var(--ink-soft)", flexShrink: 0, marginTop: 2 }} />{f}</li>)}
          </ul>
        </div>
        <div className="ds-card" style={{ display: "flex", flexDirection: "column", gap: 12, borderColor: "var(--brand-pale)", background: "var(--brand-soft)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}><h3 style={{ fontSize: 18 }}>Pro</h3>{isPro ? <span className="pill pill-verified"><Icon name="check" size={13} /> Your plan</span> : <span className="pill pill-verified">Subscription</span>}</div>
          <p style={{ fontSize: 13.5, color: "var(--muted)", margin: 0 }}>Discover and reach reporters you don't know yet.</p>
          <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 30, color: "var(--ink)", lineHeight: 1 }}>$49<span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5, color: "var(--muted)", fontWeight: 400 }}>/month per user · or $539/year</span></div>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, margin: 0, padding: 0 }}>
            {pro.map((f) => <li key={f} style={{ display: "flex", gap: 10, fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.5 }}><Icon name="check" size={16} style={{ color: "var(--brand-dark)", flexShrink: 0, marginTop: 2 }} />{f}</li>)}
          </ul>
        </div>
      </div>
      <div className="banner banner-info"><Icon name="dollar" size={18} style={{ flexShrink: 0 }} /><div>You only pay the subscription. There are no booking fees or commissions – the rate you agree with a reporter is the rate you pay them directly.</div></div>
    </div>
  );
}
