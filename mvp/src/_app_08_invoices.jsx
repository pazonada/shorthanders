// ═══ Reporter invoices ═════════════════════════════════════════════
const INV_STATUS = { draft: ["inv-draft", "Draft"], sent: ["inv-sent", "Sent"], paid: ["inv-paid", "Paid"], overdue: ["inv-overdue", "Overdue"] };
function InvStatus({ status }) { const [cls, label] = INV_STATUS[status]; return <span className={"inv-status " + cls}>{label}</span>; }

// Regime-aware starter templates (see mvp/docs/csr_profile_field_taxonomy.md).
// Line-item STRUCTURE only – no prefilled rates. Dewey Sholes doesn't set rates;
// reporters fill in their own.
const INVOICE_TEMPLATES = [
  { id: "depo", name: "Standard deposition", hint: "Original + copies + appearance", lines: [
    { desc: "Certified transcript, original (per page)", qty: "", rate: "" },
    { desc: "Copy (per page)", qty: "", rate: "" },
    { desc: "Appearance (half day)", qty: "1", rate: "" },
  ] },
  { id: "wc", name: "Workers' comp", hint: "O&2, minimum, statement on the record", lines: [
    { desc: "Original + 2 copies (O&2), per page", qty: "", rate: "" },
    { desc: "Minimum transcript fee", qty: "1", rate: "" },
    { desc: "Statement on the record / appearance", qty: "1", rate: "" },
  ] },
  { id: "audio", name: "Court-audio transcription", hint: "Per page or per audio hour", lines: [
    { desc: "Transcription (per page)", qty: "", rate: "" },
    { desc: "Certification", qty: "1", rate: "" },
  ] },
  { id: "blank", name: "Blank invoice", hint: "Build your own from scratch", lines: [
    { desc: "", qty: "1", rate: "" },
  ] },
];

// Surcharges a reporter can layer onto ANY invoice with one tap.
const INVOICE_ADDONS = [
  "Realtime hookup (hourly)",
  "Expedited / daily turnaround",
  "Rough draft / ASCII",
  "Travel",
  "Waiting time",
];

function ReporterInvoices() {
  const store = useStore();
  const [view, setView] = useState("list");   // list | template | build | detail
  const [tmpl, setTmpl] = useState(null);
  const [current, setCurrent] = useState(null);
  const invoices = store.invoices;

  if (view === "template") return <TemplatePicker onCancel={() => setView("list")} onPick={(t) => { setTmpl(t); setView("build"); }} />;
  if (view === "build") return <InvoiceBuilder template={tmpl} onCancel={() => setView("list")} onCreated={(inv) => { store.addInvoice(inv); setCurrent(inv); setView("detail"); }} />;
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
        <button className="btn btn-primary" onClick={() => setView("template")}><Icon name="plus" size={16} /> New invoice</button>
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

function TemplatePicker({ onCancel, onPick }) {
  const store = useStore();
  const custom = store.customTemplates || [];
  return (
    <div style={{ maxWidth: 760 }}>
      <button onClick={onCancel} style={backLink}><Icon name="arrow" size={15} style={{ transform: "rotate(180deg)" }} /> Back to invoices</button>
      <h2 style={{ fontSize: 26, marginBottom: 6 }}>Start a new invoice</h2>
      <p style={{ color: "var(--muted)", marginBottom: 20 }}>Pick a starter for the kind of work you're billing. You can edit every line, or start blank.</p>
      <div className="ds-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))" }}>
        {INVOICE_TEMPLATES.map((t) => (
          <button key={t.id} className="rep-card" style={{ cursor: "pointer" }} onClick={() => onPick(t)}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: "var(--brand-soft)", color: "var(--brand-dark)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name="invoice" size={19} /></div>
              <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 19 }}>{t.name}</span>
            </div>
            <div style={{ fontSize: 13, color: "var(--muted)" }}>{t.hint}</div>
            <div style={{ fontSize: 12.5, color: "var(--brand-dark)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4 }}>Use template <Icon name="arrow" size={13} /></div>
          </button>
        ))}
        {custom.map((t, i) => (
          <button key={"c" + i} className="rep-card" style={{ cursor: "pointer" }} onClick={() => onPick(t)}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: "var(--sage-soft)", color: "var(--sage-deep)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name="star" size={19} /></div>
              <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 19 }}>{t.name}</span>
            </div>
            <div style={{ fontSize: 13, color: "var(--muted)" }}>Your saved template</div>
            <div style={{ fontSize: 12.5, color: "var(--brand-dark)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4 }}>Use template <Icon name="arrow" size={13} /></div>
          </button>
        ))}
      </div>
    </div>
  );
}

let INV_SEQ = 1045;
function InvoiceBuilder({ template, onCancel, onCreated }) {
  const store = useStore();
  const me = useMemo(() => { const all = buildDirectory(); return all.find((x) => x.id === store.myCsr) || all.find((x) => x.claimed); }, [store.myCsr]);
  const [f, setF] = useState({ client: "", matter: "", date: "2026-07-17", due: "2026-07-31", notes: "" });
  const [lines, setLines] = useState((template.lines || [{ desc: "", qty: "1", rate: "" }]).map((l) => ({ ...l })));
  const [preview, setPreview] = useState(false);
  const [toast, setToast] = useState("");

  const setLine = (i, k, v) => setLines((xs) => xs.map((l, j) => j === i ? { ...l, [k]: v } : l));
  const addLine = () => setLines((xs) => [...xs, { desc: "", qty: "1", rate: "" }]);
  const addAddon = (desc) => setLines((xs) => [...xs, { desc, qty: "1", rate: "" }]);
  const removeLine = (i) => setLines((xs) => xs.length > 1 ? xs.filter((_, j) => j !== i) : xs);
  const lineAmt = (l) => (Number(l.qty) || 0) * (Number(l.rate) || 0);
  const total = lines.reduce((s, l) => s + lineAmt(l), 0);
  const valid = f.client && total > 0;
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const saveTemplate = () => {
    const name = (window.prompt && window.prompt("Name this template", template.name + " (mine)")) || null;
    if (name) { store.addTemplate({ id: "custom", name, lines: lines.map((l) => ({ ...l })) }); setToast("Template saved"); }
  };
  const create = () => onCreated({
    id: "INV-" + (++INV_SEQ), client: f.client, matter: f.matter || "–", desc: lines[0] && lines[0].desc ? lines[0].desc : "Court reporting services",
    date: f.date, due: f.due, amount: total, status: "draft", notes: f.notes,
    lineItems: lines.filter((l) => l.desc || lineAmt(l) > 0).map((l) => ({ desc: l.desc, qty: Number(l.qty) || 0, rate: Number(l.rate) || 0 })),
  });

  if (preview) return (
    <div style={{ maxWidth: 680 }}>
      <button onClick={() => setPreview(false)} style={backLink}><Icon name="arrow" size={15} style={{ transform: "rotate(180deg)" }} /> Back to edit</button>
      <div className="banner banner-info" style={{ marginBottom: 16 }}><Icon name="eye" size={18} style={{ flexShrink: 0 }} /><div>This is how {f.client || "the firm"} will see your invoice.</div></div>
      <InvoicePreviewCard me={me} f={f} lines={lines} total={total} />
      <div style={{ display: "flex", gap: 12, marginTop: 18, flexWrap: "wrap" }}>
        <button className="btn btn-primary" disabled={!valid} style={{ opacity: valid ? 1 : 0.4 }} onClick={create}><Icon name="check" size={16} /> Create draft</button>
        <button className="btn btn-secondary" onClick={() => setPreview(false)}>Back to edit</button>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 760 }}>
      <button onClick={onCancel} style={backLink}><Icon name="arrow" size={15} style={{ transform: "rotate(180deg)" }} /> Back to invoices</button>
      <div className="ds-card" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <h2 style={{ fontSize: 26 }}>New invoice</h2>
          <span className="pill pill-tag">{template.name}</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div><label className="ds-label">Client / firm *</label><input className="ds-input" placeholder="Morgan & Reyes LLP" value={f.client} onChange={set("client")} /></div>
          <div><label className="ds-label">Matter reference</label><input className="ds-input" placeholder="Ramos v. Delta Freight (24CV01188)" value={f.matter} onChange={set("matter")} /></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div><label className="ds-label">Service date</label><input className="ds-input" type="date" value={f.date} onChange={set("date")} /></div>
          <div><label className="ds-label">Due date</label><input className="ds-input" type="date" value={f.due} onChange={set("due")} /></div>
        </div>

        {/* line items */}
        <div>
          <label className="ds-label">Line items</label>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 74px 90px 90px 28px", gap: 8, fontSize: 11, fontWeight: 700, color: "var(--dim)", textTransform: "uppercase", letterSpacing: ".03em", padding: "0 2px" }}>
              <span>Description</span><span style={{ textAlign: "right" }}>Qty</span><span style={{ textAlign: "right" }}>Rate</span><span style={{ textAlign: "right" }}>Amount</span><span />
            </div>
            {lines.map((l, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 74px 90px 90px 28px", gap: 8, alignItems: "center" }}>
                <input className="ds-input" style={{ padding: "9px 11px", fontSize: 13.5 }} placeholder="Description" value={l.desc} onChange={(e) => setLine(i, "desc", e.target.value)} />
                <input className="ds-input" style={{ padding: "9px 8px", fontSize: 13.5, textAlign: "right" }} type="number" placeholder="0" value={l.qty} onChange={(e) => setLine(i, "qty", e.target.value)} />
                <input className="ds-input" style={{ padding: "9px 8px", fontSize: 13.5, textAlign: "right" }} type="number" placeholder="0.00" value={l.rate} onChange={(e) => setLine(i, "rate", e.target.value)} />
                <span style={{ textAlign: "right", fontSize: 13.5, color: "var(--ink)", fontWeight: 600 }}>${lineAmt(l).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                <button onClick={() => removeLine(i)} title="Remove" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--dim)", display: "flex", justifyContent: "center" }}><Icon name="x" size={15} /></button>
              </div>
            ))}
          </div>
          <button onClick={addLine} style={{ background: "none", border: "none", color: "var(--brand-dark)", fontWeight: 600, cursor: "pointer", fontSize: 13.5, marginTop: 10, display: "inline-flex", alignItems: "center", gap: 5, padding: 0 }}><Icon name="plus" size={14} /> Add line</button>
        </div>

        {/* surcharge add-ons */}
        <div>
          <label className="ds-label">Add a surcharge</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {INVOICE_ADDONS.map((a) => <button key={a} type="button" className="chip-filter" onClick={() => addAddon(a)}><Icon name="plus" size={13} style={{ display: "inline", verticalAlign: "-2px", marginRight: 3 }} />{a}</button>)}
          </div>
        </div>

        <div className="ds-panel" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "var(--muted)", fontSize: 14 }}>Total due</span>
          <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 30, color: "var(--ink)" }}>${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button className="btn btn-primary" disabled={!valid} style={{ opacity: valid ? 1 : 0.4 }} onClick={() => setPreview(true)}><Icon name="eye" size={16} /> Preview</button>
          <button className="btn btn-secondary" disabled={!valid} style={{ opacity: valid ? 1 : 0.4 }} onClick={create}>Create draft</button>
          <button className="btn btn-secondary" onClick={saveTemplate}><Icon name="star" size={16} /> Save as my template</button>
          <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        </div>
      </div>
      <Toast msg={toast} onClose={() => setToast("")} />
    </div>
  );
}

// The invoice as the firm receives it (approximates the Stripe hosted invoice / PDF).
function InvoicePreviewCard({ me, f, lines, total }) {
  const items = lines.filter((l) => l.desc || (Number(l.qty) || 0) * (Number(l.rate) || 0) > 0);
  return (
    <div className="ds-card" style={{ padding: 0, overflow: "hidden" }}>
      <div style={{ padding: "26px 28px", borderBottom: "1px solid var(--rule)", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 14 }}>
        <div>
          <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, color: "var(--ink)" }}>{me ? me.name : "Your name"}</div>
          <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>Certified Shorthand Reporter{me ? " · CSR #" + me.csrNumber : ""}{me && me.city ? " · " + me.city + ", CA" : ""}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--dim)", textTransform: "uppercase", letterSpacing: ".08em" }}>Invoice</div>
          <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>Issued {f.date}</div>
          <div style={{ fontSize: 13, color: "var(--muted)" }}>Due {f.due}</div>
        </div>
      </div>
      <div style={{ padding: "20px 28px", borderBottom: "1px solid var(--rule)" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--dim)", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 4 }}>Bill to</div>
        <div style={{ fontSize: 15, color: "var(--ink)" }}>{f.client || "–"}</div>
        {f.matter ? <div style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 2 }}>Matter: {f.matter}</div> : null}
      </div>
      <div style={{ overflowX: "auto" }}>
        <table className="ds-table">
          <thead><tr><th>Description</th><th style={{ textAlign: "right" }}>Qty</th><th style={{ textAlign: "right" }}>Rate</th><th style={{ textAlign: "right" }}>Amount</th></tr></thead>
          <tbody>{items.map((l, i) => {
            const amt = (Number(l.qty) || 0) * (Number(l.rate) || 0);
            return <tr key={i}><td style={{ color: "var(--ink)" }}>{l.desc || "–"}</td><td style={{ textAlign: "right" }}>{Number(l.qty) || 0}</td><td style={{ textAlign: "right" }}>${(Number(l.rate) || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td><td style={{ textAlign: "right", fontWeight: 600, color: "var(--ink)" }}>${amt.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td></tr>;
          })}</tbody>
        </table>
      </div>
      <div style={{ padding: "18px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--bg-soft)", borderTop: "1px solid var(--rule)" }}>
        <span style={{ color: "var(--muted)", fontSize: 14 }}>Total due</span>
        <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, color: "var(--ink)" }}>${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
      </div>
      <div style={{ padding: "18px 28px 24px" }}>
        <div className="btn btn-primary" style={{ width: "100%", justifyContent: "center", cursor: "default", pointerEvents: "none" }}><Icon name="lock" size={15} /> Pay by card or ACH</div>
        <div style={{ fontSize: 11.5, color: "var(--dim)", textAlign: "center", marginTop: 10 }}>Secure payment via Stripe · powered by Dewey Sholes</div>
      </div>
    </div>
  );
}

function InvoiceDetail({ inv, onBack, onSend }) {
  const [sent, setSent] = useState(inv.status !== "draft");
  const [copied, setCopied] = useState(false);
  const [payLink, setPayLink] = useState("https://pay.deweysholes.com/i/" + inv.id.toLowerCase());

  const sendInvoice = async () => {
    try {
      const resp = await fetch("api/pay/create-payment-link", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoiceId: inv.id, client: inv.client, amount: inv.amount, description: inv.desc, matter: inv.matter }),
      });
      if (resp.ok) { const d = await resp.json(); if (d && d.url) setPayLink(d.url); }
    } catch (e) { /* keep demo link */ }
    setSent(true); if (onSend) onSend();
  };

  return (
    <div style={{ maxWidth: 680 }}>
      <button onClick={onBack} style={backLink}><Icon name="arrow" size={15} style={{ transform: "rotate(180deg)" }} /> Back to invoices</button>
      <div className="ds-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
          <div><div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 30 }}>{inv.id}</div><InvStatus status={sent ? (inv.status === "draft" ? "sent" : inv.status) : "draft"} /></div>
          <div style={{ textAlign: "right" }}><div style={{ fontSize: 13, color: "var(--muted)" }}>Amount due</div><div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 34 }}>${inv.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div></div>
        </div>
        <div style={{ height: 1, background: "var(--rule)", margin: "20px 0" }} />
        <dl style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "12px 22px", fontSize: 15 }}>
          <dt style={{ color: "var(--muted)" }}>Client</dt><dd style={{ color: "var(--ink)" }}>{inv.client}</dd>
          <dt style={{ color: "var(--muted)" }}>Matter</dt><dd style={{ color: "var(--ink)" }}>{inv.matter}</dd>
          <dt style={{ color: "var(--muted)" }}>Service date</dt><dd style={{ color: "var(--ink)" }}>{inv.date}</dd>
          <dt style={{ color: "var(--muted)" }}>Due</dt><dd style={{ color: "var(--ink)" }}>{inv.due}</dd>
        </dl>
        {inv.lineItems && inv.lineItems.length ? (
          <div style={{ marginTop: 18, overflowX: "auto" }}>
            <table className="ds-table">
              <thead><tr><th>Description</th><th style={{ textAlign: "right" }}>Qty</th><th style={{ textAlign: "right" }}>Rate</th><th style={{ textAlign: "right" }}>Amount</th></tr></thead>
              <tbody>{inv.lineItems.map((l, i) => (
                <tr key={i}><td style={{ color: "var(--ink)" }}>{l.desc}</td><td style={{ textAlign: "right" }}>{l.qty}</td><td style={{ textAlign: "right" }}>${l.rate.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td><td style={{ textAlign: "right", fontWeight: 600, color: "var(--ink)" }}>${(l.qty * l.rate).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td></tr>
              ))}</tbody>
            </table>
          </div>
        ) : (
          <><div style={{ height: 1, background: "var(--rule)", margin: "20px 0" }} /><div style={{ fontSize: 15, color: "var(--ink-soft)" }}>{inv.desc}</div></>
        )}
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

const backLink = { background: "none", border: "none", color: "var(--muted)", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, marginBottom: 18 };
