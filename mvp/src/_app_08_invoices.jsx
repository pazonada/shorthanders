// ═══ Reporter invoices ═════════════════════════════════════════════
const INV_STATUS = { draft: ["inv-draft", "Draft"], sent: ["inv-sent", "Sent"], paid: ["inv-paid", "Paid"], overdue: ["inv-overdue", "Overdue"] };
function InvStatus({ status }) { const [cls, label] = INV_STATUS[status]; return <span className={"inv-status " + cls}>{label}</span>; }

function ReporterInvoices() {
  const store = useStore();
  const [view, setView] = useState("list");   // list | create | detail
  const [current, setCurrent] = useState(null);
  const invoices = store.invoices;

  if (view === "create") return <InvoiceCreator onCancel={() => setView("list")} onCreated={(inv) => { store.addInvoice(inv); setCurrent(inv); setView("detail"); }} />;
  if (view === "detail" && current) return <InvoiceDetail inv={store.invoices.find((i) => i.id === current.id) || current} onBack={() => setView("list")} onSend={() => store.updateInvoice(current.id, { status: "sent" })} />;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", gap: 20, fontSize: 14, color: "var(--muted)" }}>
          <span><strong style={{ color: "var(--ink)" }}>{invoices.filter((i) => i.status === "draft").length}</strong> draft</span>
          <span><strong style={{ color: "var(--ink)" }}>{invoices.filter((i) => i.status === "sent").length}</strong> sent</span>
          <span><strong style={{ color: "var(--ink)" }}>{invoices.filter((i) => i.status === "overdue").length}</strong> overdue</span>
          <span><strong style={{ color: "var(--ink)" }}>{invoices.filter((i) => i.status === "paid").length}</strong> paid</span>
        </div>
        <button className="btn btn-primary" onClick={() => setView("create")}><Icon name="plus" size={16} /> New invoice</button>
      </div>
      <div className="ds-card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table className="ds-table">
            <thead><tr><th>Invoice</th><th>Client / matter</th><th>Date</th><th>Due</th><th>Status</th><th style={{ textAlign: "right" }}>Amount</th></tr></thead>
            <tbody>
              {invoices.map((i) => (
                <tr key={i.id} style={{ cursor: "pointer" }} onClick={() => { setCurrent(i); setView("detail"); }}>
                  <td style={{ fontWeight: 600, color: "var(--ink)" }}>{i.id}</td>
                  <td><div style={{ color: "var(--ink)" }}>{i.client}</div><div style={{ fontSize: 12.5, color: "var(--muted)" }}>{i.matter}</div></td>
                  <td>{i.date}</td><td>{i.due}</td><td><InvStatus status={i.status} /></td>
                  <td style={{ textAlign: "right", fontWeight: 600, color: "var(--ink)" }}>${i.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

let INV_SEQ = 1045;
function InvoiceCreator({ onCancel, onCreated }) {
  const [f, setF] = useState({ client: "", matter: "", desc: "", date: "2026-07-16", units: "", rate: "", due: "2026-07-30", notes: "" });
  const amount = (Number(f.units) || 0) * (Number(f.rate) || 0);
  const valid = f.client && amount > 0;
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  return (
    <div style={{ maxWidth: 680 }}>
      <button onClick={onCancel} style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, marginBottom: 18 }}><Icon name="arrow" size={15} style={{ transform: "rotate(180deg)" }} /> Back to invoices</button>
      <div className="ds-card" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <h2 style={{ fontSize: 26 }}>New invoice</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div><label className="ds-label">Client / firm *</label><input className="ds-input" placeholder="Morgan & Reyes LLP" value={f.client} onChange={set("client")} /></div>
          <div><label className="ds-label">Matter reference</label><input className="ds-input" placeholder="Ramos v. Delta Freight (24CV01188)" value={f.matter} onChange={set("matter")} /></div>
        </div>
        <div><label className="ds-label">Service description</label><input className="ds-input" placeholder="Certified deposition transcript" value={f.desc} onChange={set("desc")} /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
          <div><label className="ds-label">Date of service</label><input className="ds-input" type="date" value={f.date} onChange={set("date")} /></div>
          <div><label className="ds-label">Units (pages/hrs)</label><input className="ds-input" type="number" placeholder="118" value={f.units} onChange={set("units")} /></div>
          <div><label className="ds-label">Rate per unit</label><input className="ds-input" type="number" placeholder="4.75" value={f.rate} onChange={set("rate")} /></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div><label className="ds-label">Due date</label><input className="ds-input" type="date" value={f.due} onChange={set("due")} /></div>
          <div><label className="ds-label">Notes (optional)</label><input className="ds-input" placeholder="Thank you!" value={f.notes} onChange={set("notes")} /></div>
        </div>
        <div className="ds-panel" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "var(--muted)", fontSize: 14 }}>Amount due</span>
          <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 30, color: "var(--ink)" }}>${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn btn-primary" disabled={!valid} style={{ opacity: valid ? 1 : 0.4 }} onClick={() => onCreated({ id: "INV-" + (++INV_SEQ), client: f.client, matter: f.matter || "–", desc: f.desc || "Court reporting services", date: f.date, amount, due: f.due, status: "draft", notes: f.notes })}>Create draft <Icon name="arrow" size={16} /></button>
          <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

function InvoiceDetail({ inv, onBack, onSend }) {
  const [sent, setSent] = useState(inv.status !== "draft");
  const [copied, setCopied] = useState(false);
  const [payLink, setPayLink] = useState("https://pay.deweysholes.com/i/" + inv.id.toLowerCase());

  // Real Stripe payment link when the backend is deployed; otherwise keep the
  // demo link so the local prototype still works.
  const sendInvoice = async () => {
    try {
      const resp = await fetch("api/pay/create-payment-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoiceId: inv.id, client: inv.client, amount: inv.amount, description: inv.desc, matter: inv.matter }),
      });
      if (resp.ok) { const d = await resp.json(); if (d && d.url) setPayLink(d.url); }
    } catch (e) { /* keep demo link */ }
    setSent(true); if (onSend) onSend();
  };
  return (
    <div style={{ maxWidth: 680 }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, marginBottom: 18 }}><Icon name="arrow" size={15} style={{ transform: "rotate(180deg)" }} /> Back to invoices</button>
      <div className="ds-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
          <div><div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 30 }}>{inv.id}</div><InvStatus status={sent ? (inv.status === "draft" ? "sent" : inv.status) : "draft"} /></div>
          <div style={{ textAlign: "right" }}><div style={{ fontSize: 13, color: "var(--muted)" }}>Amount due</div><div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 34 }}>${inv.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div></div>
        </div>
        <div style={{ height: 1, background: "var(--rule)", margin: "20px 0" }} />
        <dl style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "12px 22px", fontSize: 15 }}>
          <dt style={{ color: "var(--muted)" }}>Client</dt><dd style={{ color: "var(--ink)" }}>{inv.client}</dd>
          <dt style={{ color: "var(--muted)" }}>Matter</dt><dd style={{ color: "var(--ink)" }}>{inv.matter}</dd>
          <dt style={{ color: "var(--muted)" }}>Service</dt><dd style={{ color: "var(--ink)" }}>{inv.desc}</dd>
          <dt style={{ color: "var(--muted)" }}>Service date</dt><dd style={{ color: "var(--ink)" }}>{inv.date}</dd>
          <dt style={{ color: "var(--muted)" }}>Due</dt><dd style={{ color: "var(--ink)" }}>{inv.due}</dd>
        </dl>
        <div style={{ height: 1, background: "var(--rule)", margin: "20px 0" }} />
        {sent ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div className="banner banner-ok"><Icon name="mail" size={18} style={{ flexShrink: 0 }} /><div>Invoice sent to {inv.client}. They can pay by card or ACH from the link below.</div></div>
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <div className="ds-panel" style={{ flex: 1, minWidth: 220, padding: "12px 14px", fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "var(--ink-soft)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{payLink}</div>
              <button className="btn btn-secondary" onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1800); }}><Icon name="link" size={16} /> {copied ? "Copied!" : "Copy link"}</button>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", gap: 12 }}>
            <button className="btn btn-primary" onClick={sendInvoice}><Icon name="mail" size={16} /> Send invoice by email</button>
            <button className="btn btn-secondary" onClick={onBack}>Save as draft</button>
          </div>
        )}
      </div>
    </div>
  );
}
