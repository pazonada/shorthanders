// ═══ Reporter invoices ═════════════════════════════════════════════
const INV_STATUS = { draft: ["inv-draft", "Draft"], sent: ["inv-sent", "Sent"], paid: ["inv-paid", "Paid"], overdue: ["inv-overdue", "Overdue"] };
function InvStatus({ status, viewer }) {
  const [cls, base] = INV_STATUS[status];
  // "Sent" is written from the reporter's side (they sent it). To the firm (the payer) that same
  // invoice is one awaiting THEIR payment, not something they sent - so relabel it for the firm
  // viewer, keeping the same pill styling.
  const label = viewer === "firm" && status === "sent" ? "Awaiting payment" : base;
  return <span className={"inv-status " + cls}>{label}</span>;
}

// Regime-aware starter templates (see mvp/docs/csr_profile_field_taxonomy.md).
// Line-item STRUCTURE only – no prefilled rates. Dewey Sholes doesn't set rates;
// reporters fill in their own.
// `rateKey` maps a line to a field in the reporter's saved `rates` (RATE_FIELDS in _app_02_data),
// so the builder can pre-fill the Rate cell from their own profile. Only clean per-unit-dollar
// fields are mapped; composite/percentage lines (O&2, rush %) stay manual (Tier 2). See docs.
const INVOICE_TEMPLATES = [
  { id: "depo", name: "Standard deposition", hint: "Original + copies + appearance", lines: [
    { desc: "Certified transcript, original (per page)", kind: "unit", qty: "", rate: "", rateKey: "pageOriginal" },
    { desc: "Copy (per page)", kind: "unit", qty: "", rate: "", rateKey: "pageCopy" },
    { desc: "Appearance (half day)", kind: "flat", qty: "1", rate: "", rateKey: "perDiemHalf" },
  ] },
  { id: "wc", name: "Workers' comp", hint: "O&2, minimum, statement on the record", lines: [
    { desc: "Original + 2 copies (O&2), per page", kind: "unit", qty: "", rate: "" },
    { desc: "Minimum transcript fee", kind: "flat", qty: "1", rate: "" },
    { desc: "Statement on the record / appearance", kind: "flat", qty: "1", rate: "", rateKey: "perDiemHalf" },
  ] },
  { id: "audio", name: "Court-audio transcription", hint: "Per page or per audio hour", lines: [
    { desc: "Transcription (per page)", kind: "unit", qty: "", rate: "", rateKey: "transcription" },
    { desc: "Certification", kind: "flat", qty: "1", rate: "" },
  ] },
  { id: "blank", name: "Blank invoice", hint: "Build your own from scratch", lines: [
    { desc: "", kind: "unit", qty: "1", rate: "" },
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

// Pull a plain number out of a saved rate string ("$4.50", "$1.25/pg" -> 4.5, 1.25). Returns null
// for blanks or percentage rates ("+50%") - those aren't per-unit dollars, so they stay manual.
function parseRate(str) {
  if (str == null) return null;
  const s = String(str);
  if (s.indexOf("%") !== -1) return null;
  const m = s.replace(/,/g, "").match(/\d+(\.\d+)?/);
  if (!m) return null;
  const n = Number(m[0]);
  return isFinite(n) ? n : null;
}

// Turn a stored invoice (or a firm's payment request) back into editable builder state.
function invoiceToLines(inv) {
  if (inv.lineItems && inv.lineItems.length) return inv.lineItems.map((l) => l.flat
    ? { desc: l.desc, kind: "flat", qty: "1", rate: l.amount != null ? String(l.amount) : "" }
    : { desc: l.desc, kind: "unit", qty: String(l.qty), rate: String(l.rate) });
  return [{ desc: inv.desc || "", kind: "flat", qty: "1", rate: inv.amount ? String(inv.amount) : "" }];
}

function ReporterInvoices() {
  const store = useStore();
  const [src, setSrc] = useState(null);            // builder source: { template } | { prefill } | { invoice } | { template, prefill }
  const [pendingReq, setPendingReq] = useState(null);  // a firm's request, carried through the picker into the builder
  const [modalInv, setModalInv] = useState(null);
  const invoices = store.invoices;
  // View is DERIVED FROM THE URL so the browser Back button and the in-app Back button can't diverge:
  // /invoices = list, /invoices/new = template picker, /invoices/build = the builder (needs a src).
  const route = useRoute();
  const view = /\/invoices\/build$/.test(route) ? (src ? "build" : "template")
    : /\/invoices\/new$/.test(route) ? "template" : "list";
  const pickerPrefill = pendingReq || (src && src.prefill) || null;
  const myName = useMemo(() => { const r = buildDirectory().find((x) => x.id === store.myCsr); return r ? r.name : ""; }, [store.myCsr]);
  const requests = store.paymentRequests.filter((q) => q.status === "pending" && q.reporterName === myName);
  // A firm asked us to invoice them. Route through the template picker (carrying the request) so the
  // reporter picks a structure - the firm + matter come pre-filled, and picking "Blank" keeps the
  // firm's requested amount as a single line.
  const acceptRequest = (q) => { store.fulfillRequest(q.id); setPendingReq(q); setSrc(null); navigate("/reporter/invoices/new"); };
  const pickTemplate = (t) => { setSrc(pickerPrefill ? { template: t, prefill: pickerPrefill } : { template: t }); navigate("/reporter/invoices/build"); };
  const cancelPicker = () => { setPendingReq(null); setSrc(null); navigate("/reporter/invoices"); };

  // Draft persisted or updated from the builder. When it's sent, open the read-only modal on it.
  const onSubmit = (inv, opts) => {
    if (opts.editing) store.updateInvoice(inv.id, inv); else store.addInvoice(inv);
    setSrc(null); setPendingReq(null); navigate("/reporter/invoices");
    if (opts.send) setModalInv({ ...inv });
  };
  // Clicking a row: drafts open the builder (editable); sent/paid open the read-only modal.
  const openInvoice = (i) => { if (i.status === "draft") { setSrc({ invoice: i }); navigate("/reporter/invoices/build"); } else setModalInv(i); };

  if (view === "template") return <TemplatePicker prefill={pickerPrefill} onCancel={cancelPicker} onPick={pickTemplate} />;
  if (view === "build") return <InvoiceBuilder src={src} onCancel={() => window.history.back()} onSubmit={onSubmit} />;

  return (
    <div>
      {requests.length > 0 && (
        <div className="ds-card flat" style={{ marginBottom: 18, background: "var(--brand-soft)", borderColor: "var(--brand-pale)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}><Icon name="invoice" size={18} style={{ color: "var(--brand-dark)" }} /><h3 style={{ fontSize: 22 }}>Invoice requests from firms</h3></div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {requests.map((q) => (
              <div key={q.id} style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", background: "var(--bg)", border: "1px solid var(--rule)", borderRadius: 10, padding: "12px 14px" }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ fontWeight: 600, color: "var(--ink)" }}>{q.firmName}{q.amount ? " · $" + q.amount.toLocaleString(undefined, { minimumFractionDigits: 2 }) : ""}</div>
                  <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>{q.matter ? q.matter + " – " : ""}{q.desc}</div>
                </div>
                <button className="btn btn-primary" onClick={() => acceptRequest(q)}><Icon name="plus" size={15} /> Create invoice</button>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="ds-card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table className="ds-table">
            <thead><tr><th>Invoice</th><th>Client / matter</th><th>Date</th><th>Due</th><th>Status</th><th style={{ textAlign: "right" }}>Amount</th></tr></thead>
            <tbody>
              {invoices.map((i) => (
                <tr key={i.id} style={{ cursor: "pointer" }} onClick={() => openInvoice(i)}>
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
      {modalInv && <InvoiceModal inv={store.invoices.find((i) => i.id === modalInv.id) || modalInv} viewer="reporter" onClose={() => setModalInv(null)} />}
    </div>
  );
}

function TemplatePicker({ prefill, onCancel, onPick }) {
  const store = useStore();
  const custom = store.customTemplates || [];
  return (
    <div>
      <button onClick={onCancel} style={backLink}><Icon name="arrow" size={15} style={{ transform: "rotate(180deg)" }} /> Back to invoices</button>
      <h2 style={{ fontSize: 26, marginBottom: 6 }}>{prefill ? "New invoice for " + prefill.firmName : "Start a new invoice"}</h2>
      {prefill
        ? <p style={{ color: "var(--muted)", marginBottom: 22, lineHeight: 1.55, maxWidth: 680 }}>From their request{prefill.matter ? " · " + prefill.matter : ""}. Pick a structure below – the firm and matter come pre-filled. Or choose <strong style={{ color: "var(--ink-soft)", fontWeight: 600 }}>Blank invoice</strong> to just bill the requested amount.</p>
        : <p style={{ color: "var(--muted)", marginBottom: 20 }}>Pick a starter for the kind of work you're billing. You can edit every line, or start blank.</p>}
      <div className="ds-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))" }}>
        {INVOICE_TEMPLATES.map((t) => (
          <button key={t.id} className="rep-card" style={{ cursor: "pointer" }} onClick={() => onPick(t)}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: "var(--brand-soft)", color: "var(--brand-dark)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name="invoice" size={19} /></div>
              <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22 }}>{t.name}</span>
            </div>
            <div style={{ fontSize: 13, color: "var(--muted)" }}>{t.hint}</div>
            <div style={{ fontSize: 12.5, color: "var(--brand-dark)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4 }}>Use template <Icon name="arrow" size={13} /></div>
          </button>
        ))}
        {custom.map((t, i) => (
          <button key={"c" + i} className="rep-card" style={{ cursor: "pointer" }} onClick={() => onPick(t)}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: "var(--brand-soft)", color: "var(--brand-dark)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name="star" size={19} /></div>
              <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22 }}>{t.name}</span>
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
// The builder is the one place invoices are authored OR edited. `src` decides what it opens on:
//   { template }  – a fresh invoice from a starter template
//   { prefill }   – a firm's payment request, pre-filled and fully editable (see acceptRequest)
//   { invoice }   – an existing DRAFT, reopened to edit (finalized invoices never come here)
function InvoiceBuilder({ src, onCancel, onSubmit }) {
  const store = useStore();
  const me = useMemo(() => { const all = buildDirectory(); return all.find((x) => x.id === store.myCsr) || all.find((x) => x.claimed); }, [store.myCsr]);
  const editInv = src && src.invoice ? src.invoice : null;
  const prefill = src && src.prefill ? src.prefill : null;
  const template = src && src.template ? src.template : (editInv || prefill ? null : INVOICE_TEMPLATES[3]);
  const label = editInv ? "Editing " + editInv.id : prefill ? "From " + prefill.firmName + "'s request" : (template ? template.name : "Invoice");

  const [f, setF] = useState(
    editInv ? { client: editInv.client, matter: editInv.matter === "–" ? "" : (editInv.matter || ""), date: editInv.date || "2026-07-17", due: editInv.due || "", notes: editInv.notes || "" }
    : prefill ? { client: prefill.firmName || "", matter: prefill.matter || "", date: "2026-07-17", due: "", notes: "" }
    : { client: "", matter: "", date: "2026-07-17", due: "2026-07-31", notes: "" }
  );
  // For a fresh template invoice, pre-fill each line's Rate from the reporter's own saved rates
  // where the line maps to one (l.rateKey) and they've entered it – otherwise leave it blank.
  const fillFromProfile = (l) => {
    if (l.rate) return l.rate;
    if (l.rateKey && me && me.rates) { const n = parseRate(me.rates[l.rateKey]); if (n != null) return String(n); }
    return "";
  };
  const [lines, setLines] = useState(() => {
    if (editInv) return invoiceToLines(editInv);
    // A real (non-blank) template wins even when there's a request prefill - the reporter chose to itemize.
    if (template && template.id !== "blank" && template.lines) return template.lines.map((l) => ({ desc: l.desc, kind: l.kind || "unit", qty: l.qty, rate: fillFromProfile(l) }));
    // Blank template on a request (or a bare request): keep the firm's requested amount as one line.
    if (prefill) return [{ desc: prefill.desc || "", kind: "flat", qty: "1", rate: prefill.amount ? String(prefill.amount) : "" }];
    return ((template && template.lines) || [{ desc: "", kind: "unit", qty: "1", rate: "" }]).map((l) => ({ desc: l.desc, kind: l.kind || "unit", qty: l.qty, rate: fillFromProfile(l) }));
  });
  const didPrefill = useMemo(() => !editInv && !!template && template.id !== "blank" && (template.lines || []).some((l) => l.rateKey && me && me.rates && parseRate(me.rates[l.rateKey]) != null), []);
  const [preview, setPreview] = useState(false);
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState("");
  // Dirty = anything changed from what we opened with -> drives the unsaved-changes guard.
  const initialSnapshot = useRef(null);
  const snapshot = JSON.stringify({ f, lines });
  if (initialSnapshot.current === null) initialSnapshot.current = snapshot;
  useUnsavedGuard(snapshot !== initialSnapshot.current);

  const setLine = (i, k, v) => setLines((xs) => xs.map((l, j) => j === i ? { ...l, [k]: v } : l));
  const addLine = () => setLines((xs) => [...xs, { desc: "", kind: "flat", qty: "1", rate: "" }]);
  const addAddon = (desc) => setLines((xs) => [...xs, { desc, kind: "flat", qty: "1", rate: "" }]);
  const removeLine = (i) => setLines((xs) => xs.length > 1 ? xs.filter((_, j) => j !== i) : xs);
  // Flip a line between a flat one-off fee and metered quantity × rate. Going metered, seed qty=1.
  const toggleKind = (i) => setLines((xs) => xs.map((l, j) => j === i ? { ...l, kind: l.kind === "flat" ? "unit" : "flat", qty: l.kind === "flat" && !(Number(l.qty) > 0) ? "1" : l.qty } : l));
  // Flat lines are a single fee (stored in `rate`, qty ignored); metered lines are qty × rate.
  const lineAmt = (l) => l.kind === "flat" ? (Number(l.rate) || 0) : (Number(l.qty) || 0) * (Number(l.rate) || 0);
  const total = lines.reduce((s, l) => s + lineAmt(l), 0);
  const valid = f.client && total > 0;
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  // Build the stored invoice object at a given status. Reuses the id when editing a draft.
  const build = (status, extra) => Object.assign({
    id: editInv ? editInv.id : ("INV-" + (++INV_SEQ)),
    client: f.client, matter: f.matter || "–",
    desc: lines[0] && lines[0].desc ? lines[0].desc : "Court reporting services",
    date: f.date, due: f.due, amount: total, status, notes: f.notes,
    lineItems: lines.filter((l) => l.desc || lineAmt(l) > 0).map((l) => l.kind === "flat"
      ? { desc: l.desc, flat: true, amount: Number(l.rate) || 0 }
      : { desc: l.desc, qty: Number(l.qty) || 0, rate: Number(l.rate) || 0 }),
  }, editInv && editInv.from ? { from: editInv.from } : {}, extra || {});

  const saveDraft = () => onSubmit(build("draft"), { editing: !!editInv, send: false });
  // Send: finalize, fetch a real payment link (falls back to a demo link), persist as sent, and
  // let the parent open the read-only modal on it.
  const sendInvoice = async () => {
    setSending(true);
    let payLink = "https://pay.deweysholes.com/i/" + (editInv ? editInv.id : "INV-" + (INV_SEQ + 1)).toLowerCase();
    const inv = build("sent");
    try {
      const resp = await fetch("api/pay/create-payment-link", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoiceId: inv.id, client: inv.client, amount: inv.amount, description: inv.desc, matter: inv.matter }),
      });
      if (resp.ok) { const d = await resp.json(); if (d && d.url) payLink = d.url; }
    } catch (e) { /* keep demo link */ }
    onSubmit(Object.assign(inv, { payLink }), { editing: !!editInv, send: true });
  };

  if (preview) return (
    <div style={{ maxWidth: 680 }}>
      <button onClick={() => setPreview(false)} style={backLink}><Icon name="arrow" size={15} style={{ transform: "rotate(180deg)" }} /> Back to edit</button>
      <div className="banner banner-info" style={{ marginBottom: 16 }}><Icon name="eye" size={18} style={{ flexShrink: 0 }} /><div>This is how {f.client || "the firm"} will see your invoice.</div></div>
      <InvoicePreviewCard me={me} f={f} lines={lines} total={total} />
      <div style={{ display: "flex", gap: 12, marginTop: 18, flexWrap: "wrap" }}>
        <button className="btn btn-primary" disabled={!valid || sending} style={{ opacity: valid && !sending ? 1 : 0.4 }} onClick={sendInvoice}><Icon name="mail" size={16} /> {sending ? "Sending…" : "Send invoice"}</button>
        <button className="btn btn-secondary" disabled={!valid} style={{ opacity: valid ? 1 : 0.4 }} onClick={saveDraft}>Save as draft</button>
        <button className="btn btn-secondary" onClick={() => setPreview(false)}>Back to edit</button>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 760 }}>
      <button onClick={onCancel} style={backLink}><Icon name="arrow" size={15} style={{ transform: "rotate(180deg)" }} /> Back to invoices</button>
      <div className="ds-card" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <h2 style={{ fontSize: 26 }}>{editInv ? "Edit invoice" : "New invoice"}</h2>
          <span className="pill pill-tag">{label}</span>
        </div>
        {prefill && <div className="ds-note" style={{ marginBottom: 0 }}><Icon name="info" size={15} style={{ flexShrink: 0, color: "var(--dim)" }} /><span>{prefill.firmName} asked you to bill them. We filled in what they sent – edit anything, add mileage or other fees, then send.</span></div>}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div><label className="ds-label">Client / firm *</label><input className="ds-input" placeholder="Morgan & Reyes LLP" value={f.client} onChange={set("client")} /><div style={{ fontSize: 12, color: "var(--dim)", marginTop: 5, lineHeight: 1.45 }}>New to Dewey Sholes? They get a free account to view and pay, and you're saved to their firm.</div></div>
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
            <div style={{ display: "grid", gridTemplateColumns: "46px 1fr 62px 80px 82px 26px", gap: 8, fontSize: 11, fontWeight: 700, color: "var(--dim)", textTransform: "uppercase", letterSpacing: ".03em", padding: "0 2px" }}>
              <span /><span>Description</span><span style={{ textAlign: "right" }}>Qty</span><span style={{ textAlign: "right" }}>Rate</span><span style={{ textAlign: "right" }}>Amount</span><span />
            </div>
            {lines.map((l, i) => {
              const flat = l.kind === "flat";
              return (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "46px 1fr 62px 80px 82px 26px", gap: 8, alignItems: "center" }}>
                  <button type="button" onClick={() => toggleKind(i)} title={flat ? "Flat one-off fee. Click for quantity × rate." : "Quantity × rate. Click for a flat fee."} style={{ fontSize: 9.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".02em", color: "var(--brand-dark)", background: "var(--brand-soft)", border: "1px solid var(--brand-pale)", borderRadius: 6, padding: "7px 0", cursor: "pointer" }}>{flat ? "Flat" : "Qty"}</button>
                  <input className="ds-input" style={{ padding: "9px 11px", fontSize: 13.5 }} placeholder="Description" value={l.desc} onChange={(e) => setLine(i, "desc", e.target.value)} />
                  {flat
                    ? <span style={{ gridColumn: "3 / 5", textAlign: "right", fontSize: 12, color: "var(--dim)", fontStyle: "italic" }}>Flat fee</span>
                    : <>
                        <input className="ds-input" style={{ padding: "9px 8px", fontSize: 13.5, textAlign: "right" }} type="number" placeholder="0" value={l.qty} onChange={(e) => setLine(i, "qty", e.target.value)} />
                        <input className="ds-input" style={{ padding: "9px 8px", fontSize: 13.5, textAlign: "right" }} type="number" placeholder="0.00" value={l.rate} onChange={(e) => setLine(i, "rate", e.target.value)} />
                      </>}
                  {flat
                    ? <input className="ds-input" style={{ gridColumn: "5 / 6", padding: "9px 8px", fontSize: 13.5, textAlign: "right" }} type="number" placeholder="0.00" value={l.rate} onChange={(e) => setLine(i, "rate", e.target.value)} />
                    : <span style={{ textAlign: "right", fontSize: 13.5, color: "var(--ink)", fontWeight: 600 }}>${lineAmt(l).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>}
                  <button onClick={() => removeLine(i)} title="Remove" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--dim)", display: "flex", justifyContent: "center" }}><Icon name="x" size={15} /></button>
                </div>
              );
            })}
          </div>
          <button onClick={addLine} style={{ background: "none", border: "none", color: "var(--brand-dark)", fontWeight: 600, cursor: "pointer", fontSize: 13.5, marginTop: 10, display: "inline-flex", alignItems: "center", gap: 5, padding: 0 }}><Icon name="plus" size={14} /> Add line</button>
          <div style={{ fontSize: 12, color: "var(--dim)", marginTop: 8, lineHeight: 1.45 }}>{didPrefill ? "Rates filled in from your profile where you've set them. Enter page counts, and edit any rate for this job. " : ""}Per-page work uses Qty × Rate; one-off fees (appearance, minimum, expedited) are a single Flat amount – use the toggle at the start of a line to switch.</div>
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
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <button type="button" disabled={!valid} onClick={() => setPreview(true)} style={{ background: "none", border: "none", color: valid ? "var(--brand-dark)" : "var(--dim)", cursor: valid ? "pointer" : "default", fontSize: 14, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 5, padding: "6px 4px" }}><Icon name="eye" size={15} /> Preview</button>
          <div style={{ marginLeft: "auto", display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <button className="btn btn-secondary" disabled={!valid} style={{ opacity: valid ? 1 : 0.4 }} onClick={saveDraft}>Save as draft</button>
            <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
            <button className="btn btn-primary" disabled={!valid || sending} style={{ opacity: valid && !sending ? 1 : 0.4 }} onClick={sendInvoice}><Icon name="mail" size={16} /> {sending ? "Sending…" : "Send invoice"}</button>
          </div>
        </div>
      </div>
      <Toast msg={toast} onClose={() => setToast("")} />
    </div>
  );
}

// The invoice document itself – the real issued page. Shared by the builder preview and the
// read-only InvoiceModal so both look identical, and it's what prints (see .invoice-print in CSS).
function InvoiceDocument({ reporterName, reporterSub, invoiceId, client, matter, date, due, items, total, paid, method, paidAt, showPayBar }) {
  const rows = (items || []).filter((l) => l.desc || (l.flat ? (Number(l.amount) || 0) > 0 : (Number(l.qty) || 0) * (Number(l.rate) || 0) > 0));
  return (
    <div className="ds-card" style={{ padding: 0, overflow: "hidden" }}>
      <div style={{ padding: "26px 28px", borderBottom: "1px solid var(--rule)", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 14 }}>
        <div>
          <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, color: "var(--ink)" }}>{reporterName || "Your name"}</div>
          {reporterSub ? <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>{reporterSub}</div> : null}
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--brand)", textTransform: "uppercase", letterSpacing: ".08em" }}>Invoice{invoiceId ? " · " + invoiceId : ""}</div>
          <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>Issued {date || "–"}</div>
          <div style={{ fontSize: 13, color: "var(--muted)" }}>Due {due || "–"}</div>
          {/* PAID stamp is deliberately GREEN - the universal paid convention (Aud, 2026-08-03).
              An intentional exception to the "never green" palette rule; see docs/palette.md. */}
          {paid ? <div style={{ display: "inline-block", marginTop: 8, border: "2px solid #16A34A", color: "#15803D", borderRadius: 7, padding: "3px 11px", fontSize: 13, fontWeight: 800, letterSpacing: ".1em", transform: "rotate(-3deg)" }}>PAID</div> : null}
        </div>
      </div>
      <div style={{ padding: "20px 28px", borderBottom: "1px solid var(--rule)" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--brand)", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 4 }}>Bill to</div>
        <div style={{ fontSize: 15, color: "var(--ink)" }}>{client || "–"}</div>
        {matter && matter !== "–" ? <div style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 2 }}>Matter: {matter}</div> : null}
      </div>
      <div style={{ overflowX: "auto" }}>
        <table className="ds-table">
          <thead><tr><th>Description</th><th style={{ textAlign: "right" }}>Qty</th><th style={{ textAlign: "right" }}>Rate</th><th style={{ textAlign: "right" }}>Amount</th></tr></thead>
          <tbody>{rows.length ? rows.map((l, i) => {
            const flat = l.flat === true;
            const amt = flat ? (Number(l.amount) || 0) : (Number(l.qty) || 0) * (Number(l.rate) || 0);
            return <tr key={i}><td style={{ color: "var(--ink)" }}>{l.desc || "–"}</td><td style={{ textAlign: "right", color: "var(--muted)" }}>{flat ? "" : (Number(l.qty) || 0)}</td><td style={{ textAlign: "right", color: "var(--muted)" }}>{flat ? "" : "$" + (Number(l.rate) || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td><td style={{ textAlign: "right", fontWeight: 600, color: "var(--ink)" }}>${amt.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td></tr>;
          }) : <tr><td colSpan={4} style={{ color: "var(--muted)" }}>–</td></tr>}</tbody>
        </table>
      </div>
      <div style={{ padding: "18px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--bg-soft)", borderTop: "1px solid var(--rule)" }}>
        <span style={{ color: "var(--muted)", fontSize: 14 }}>{paid ? "Total paid" : "Total due"}</span>
        <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, color: "var(--ink)" }}>${(total || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
      </div>
      {paid ? (
        <div style={{ padding: "16px 28px 22px" }}>
          <div className="banner banner-ok" style={{ marginBottom: 0 }}>
            <Icon name="check" size={18} style={{ color: "var(--brand-dark)", flexShrink: 0 }} />
            <div><strong style={{ color: "var(--ink)", fontWeight: 600 }}>Paid in full.</strong>{method ? " By " + method : ""}{paidAt ? " on " + paidAt : ""} · via Stripe, powered by Dewey Sholes.</div>
          </div>
        </div>
      ) : showPayBar ? (
        <div style={{ padding: "18px 28px 24px" }}>
          <div className="btn btn-primary" style={{ width: "100%", justifyContent: "center", cursor: "default", pointerEvents: "none" }}><Icon name="lock" size={15} /> Pay by card or ACH</div>
          <div style={{ fontSize: 11.5, color: "var(--dim)", textAlign: "center", marginTop: 10 }}>Secure payment via Stripe · powered by Dewey Sholes</div>
        </div>
      ) : null}
    </div>
  );
}

// The invoice as the firm receives it (builder preview) – delegates to the shared document.
function InvoicePreviewCard({ me, f, lines, total }) {
  const items = lines.map((l) => l.kind === "flat" ? { desc: l.desc, flat: true, amount: Number(l.rate) || 0 } : { desc: l.desc, qty: l.qty, rate: l.rate });
  const sub = "Certified Shorthand Reporter" + (me ? " · CSR #" + me.csrNumber : "") + (me && me.city ? " · " + me.city + ", CA" : "");
  return <InvoiceDocument reporterName={me ? me.name : "Your name"} reporterSub={sub} client={f.client} matter={f.matter} date={f.date} due={f.due} items={items} total={total} showPayBar />;
}

// Read-only invoice viewer, shared across the reporter's Payments + Invoices lists and the firm's
// Invoices list, so clicking any invoice or payment opens the SAME thing – a modal, not its own
// page (the back button was unreliable). Prints as a standalone page/receipt via window.print().
// Drafts never open here; they open the builder to edit (see the state model in launch_prep).
function InvoiceModal({ inv, viewer, onClose }) {
  const store = useStore();
  const meMeta = useMemo(() => buildDirectory().find((x) => x.id === store.myCsr), [store.myCsr]);
  const [copied, setCopied] = useState(false);
  const [tplSaved, setTplSaved] = useState(false);
  const paid = inv.status === "paid";
  // Reporter viewing their own invoice -> full identity; firm viewing -> the reporter name the
  // invoice carries (inv.from).
  const reporterName = viewer === "reporter" ? (meMeta ? meMeta.name : inv.from) : (inv.from || "Court reporter");
  const reporterSub = viewer === "reporter" && meMeta
    ? "Certified Shorthand Reporter · CSR #" + meMeta.csrNumber + (meMeta.city ? " · " + meMeta.city + ", CA" : "")
    : "Certified Shorthand Reporter";
  const items = inv.lineItems && inv.lineItems.length ? inv.lineItems : [{ desc: inv.desc, flat: true, amount: inv.amount }];
  const payLink = inv.payLink || ("https://pay.deweysholes.com/i/" + inv.id.toLowerCase());
  const copy = () => { navigator.clipboard.writeText(payLink); setCopied(true); setTimeout(() => setCopied(false), 1800); };
  // Save this invoice's line structure as a reusable template. Only the line labels + their
  // metered/flat kind carry over - not the firm, matter, dates, or amounts (those are per-invoice).
  const saveAsTemplate = () => {
    const name = (window.prompt && window.prompt("Name this template. Only the line labels are saved, not the firm or the amounts.", "My invoice layout")) || null;
    if (name) { store.addTemplate({ id: "custom", name, lines: items.map((li) => ({ desc: li.desc, kind: li.flat ? "flat" : "unit", qty: "1", rate: "" })) }); setTplSaved(true); }
  };
  const payNow = () => { store.updateInvoice(inv.id, { status: "paid", method: "Card", paidAt: "2026-07-17" }); onClose(); };

  return (
    <div className="modal-overlay invoice-modal-overlay" onClick={onClose}>
      <div className="ds-card invoice-print" style={{ maxWidth: 640, width: "94%", maxHeight: "90vh", overflowY: "auto", padding: 0 }} onClick={(e) => e.stopPropagation()}>
        <div className="no-print" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", borderBottom: "1px solid var(--rule)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ fontWeight: 700, color: "var(--ink)" }}>{inv.id}</span><InvStatus status={inv.status} viewer={viewer} /></div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button className="btn btn-secondary" style={{ padding: "6px 12px" }} onClick={() => window.print()}><Icon name="printer" size={15} /> Print</button>
            <button onClick={onClose} title="Close" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--dim)", padding: 4 }}><Icon name="x" size={20} /></button>
          </div>
        </div>
        <div style={{ padding: 18 }}>
          <InvoiceDocument reporterName={reporterName} reporterSub={reporterSub} invoiceId={inv.id} client={inv.client} matter={inv.matter} date={inv.date} due={inv.due} items={items} total={inv.amount} paid={paid} method={inv.method} paidAt={inv.paidAt} />
          <div className="no-print" style={{ marginTop: 16 }}>
            {viewer === "reporter" && !paid ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div className="banner banner-ok"><Icon name="mail" size={18} style={{ flexShrink: 0 }} /><div>Sent to {inv.client}. They can pay by card or ACH from the link below. If new to Dewey Sholes, the email invites them to create a free account to view and pay, which saves you to their firm.</div></div>
                <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                  <div className="ds-panel" style={{ flex: 1, minWidth: 220, padding: "12px 14px", fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "var(--ink-soft)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{payLink}</div>
                  <button className="btn btn-secondary" onClick={copy}><Icon name="link" size={16} /> {copied ? "Copied!" : "Copy link"}</button>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--muted)", borderTop: "1px solid var(--rule)", paddingTop: 12 }}>
                  <span>Bill work like this often?</span>
                  <button type="button" onClick={saveAsTemplate} disabled={tplSaved} style={{ background: "none", border: "none", color: tplSaved ? "var(--muted)" : "var(--brand-dark)", cursor: tplSaved ? "default" : "pointer", fontWeight: 600, fontSize: 13, display: "inline-flex", alignItems: "center", gap: 5, padding: 0 }}><Icon name={tplSaved ? "check" : "star"} size={14} /> {tplSaved ? "Template saved" : "Save as new template"}</button>
                </div>
              </div>
            ) : viewer === "firm" && !paid ? (
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button className="btn btn-primary" onClick={payNow}><Icon name="dollar" size={16} /> Pay now</button>
              </div>
            ) : (
              <div className="ds-note" style={{ marginBottom: 0 }}><Icon name="printer" size={15} style={{ flexShrink: 0, color: "var(--dim)" }} /><span>Use Print to save a copy of this receipt for your records.</span></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const backLink = { background: "none", border: "none", color: "var(--muted)", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, marginBottom: 18 };
