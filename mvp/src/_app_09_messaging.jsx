// ═══ Messaging (text + pass-through secure links; no file storage) ══
function MessagesPanel({ embedded }) {
  const store = useStore();
  const convos = store.convos;
  const dir = useMemo(() => buildDirectory(), []);   // build once, not on every render/keystroke
  const [activeId, setActiveId] = useState(convos[0] ? convos[0].id : null);
  const active = convos.find((c) => c.id === activeId);
  // The reporter this conversation is with, so a firm sees the "not accepting new work" reminder.
  const withRep = active ? dir.find((x) => x.name === active.with) : null;
  const [draft, setDraft] = useState("");
  const [reqOpen, setReqOpen] = useState(false);
  const sendRequest = (req) => {
    store.requestInvoice({ reporterName: active.with, firmName: store.firmName, matter: req.matter, desc: req.desc, amount: req.amount, at: "Just now" });
    const line = "Requested an invoice" + (req.matter ? " for " + req.matter : "") + (req.desc ? " – " + req.desc : "") + (req.amount ? " (about $" + req.amount.toLocaleString() + ")" : "") + ". Please send it here so I can pay by card or ACH.";
    store.pushMessage(active.id, { from: "me", t: line, at: "Just now" });
    setReqOpen(false);
  };
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkLabel, setLinkLabel] = useState("");
  const endRef = useRef(null);
  useEffect(() => { if (endRef.current) endRef.current.scrollIntoView({ behavior: "smooth" }); }, [activeId, active && active.msgs.length]);

  const send = () => {
    if (!draft.trim() && !linkUrl.trim()) return;
    const msg = { from: "me", t: draft.trim(), at: "Just now" };
    if (linkUrl.trim()) msg.link = { label: linkLabel.trim() || "Shared link", url: linkUrl.trim() };
    store.pushMessage(activeId, msg);
    setDraft(""); setLinkUrl(""); setLinkLabel(""); setLinkOpen(false);
  };

  const meLabel = store.role === "firm" ? "you (firm)" : "you";

  return (
    <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 0, border: "1px solid var(--rule)", borderRadius: 18, overflow: "hidden", height: embedded ? 560 : 640, background: "var(--bg)" }} className="msg-grid">
      {/* conversation list */}
      <div style={{ borderRight: "1px solid var(--rule)", overflowY: "auto", background: "var(--bg-soft)" }}>
        <div style={{ padding: "16px 18px", borderBottom: "1px solid var(--rule)", fontWeight: 700, fontSize: 15 }}>Messages</div>
        {convos.map((c) => (
          <button key={c.id} onClick={() => { setActiveId(c.id); store.markRead(c.id); }} style={{ width: "100%", textAlign: "left", background: c.id === activeId ? "var(--bg)" : "none", border: "none", borderBottom: "1px solid var(--rule)", padding: "14px 18px", cursor: "pointer", display: "flex", gap: 12, alignItems: "center" }}>
            <Avatar name={c.with} size={40} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 600, fontSize: 14, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.with}</span>
                {c.unread ? <span style={{ background: "var(--brand)", color: "#fff", fontSize: 10, fontWeight: 700, padding: "1px 6px", borderRadius: 999 }}>{c.unread}</span> : null}
              </div>
              <div style={{ fontSize: 12.5, color: "var(--muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.msgs.length ? (c.msgs[c.msgs.length - 1].t || "Shared a link") : "New conversation"}</div>
            </div>
          </button>
        ))}
      </div>

      {/* thread */}
      {active ? (
        <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
          <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--rule)", display: "flex", alignItems: "center", gap: 12 }}>
            <Avatar name={active.with} size={38} />
            <div><div style={{ fontWeight: 600, fontSize: 15 }}>{active.with}</div>{active.subtitle && <div style={{ fontSize: 12.5, color: "var(--muted)" }}>{active.subtitle}</div>}</div>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "18px 20px", display: "flex", flexDirection: "column", gap: 12, background: "var(--bg-soft)" }}>
            {store.role === "firm" && withRep && notAcceptingJobs(withRep) && <div className="banner banner-warn" style={{ fontSize: 12.5, padding: "10px 14px" }}><Icon name="info" size={15} style={{ flexShrink: 0 }} /><div><strong>{active.with.split(" ")[0]} isn't accepting new jobs right now.</strong> They may still help with a past transcript or an existing matter, but likely won't take on new work.</div></div>}
            <div className="banner banner-info" style={{ fontSize: 12.5, padding: "10px 14px" }}><Icon name="shield" size={15} style={{ flexShrink: 0 }} /><div>Dewey Sholes carries your messages and links but never stores files. Share audio and deliverables through your own secure link. Terms are between you and {active.with}.</div></div>
            {active.msgs.map((m, i) => (
              <div key={i} className={"msg-bubble " + (m.from === "me" ? "msg-me" : "msg-them")}>
                {m.t && <div>{m.t}</div>}
                {m.link && <a href={m.link.url} target="_blank" rel="noopener noreferrer" className="msg-link"><Icon name="link" size={14} /> {m.link.label}</a>}
                <div style={{ fontSize: 11, opacity: 0.6, marginTop: 6 }}>{m.at}</div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* composer */}
          <div style={{ borderTop: "1px solid var(--rule)", padding: 14, background: "var(--bg)" }}>
            {store.role === "firm" && withRep ? <button className="chip-filter" style={{ marginBottom: 10, fontSize: 12.5, padding: "8px 12px", display: "inline-flex", alignItems: "center", gap: 6 }} onClick={() => setReqOpen(true)}><Icon name="invoice" size={15} /> Request an invoice</button> : null}
            {reqOpen && <RequestInvoiceModal reporterName={active.with} onSend={sendRequest} onClose={() => setReqOpen(false)} />}
            {linkOpen && (
              <div style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <input className="ds-input" style={{ flex: 2, minWidth: 180, padding: "9px 12px", fontSize: 13 }} placeholder="Paste a secure link (your Dropbox, Box, etc.)" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} />
                  <input className="ds-input" style={{ flex: 1, minWidth: 120, padding: "9px 12px", fontSize: 13 }} placeholder="Label (optional)" value={linkLabel} onChange={(e) => setLinkLabel(e.target.value)} />
                </div>
                {linkUrl.trim() ? (
                  <div style={{ display: "flex", gap: 7, alignItems: "flex-start", marginTop: 8, fontSize: 12, color: "var(--ink-soft)", background: "#F7F8C6", border: "1px solid #DCE224", borderRadius: 9, padding: "8px 11px" }}>
                    <Icon name="shield" size={14} style={{ flexShrink: 0, marginTop: 1 }} />
                    <span>Only share links you control access to (private, access-controlled, or expiring). Dewey Sholes doesn't store, secure, or check your files or links. You're responsible for how sensitive material is shared.</span>
                  </div>
                ) : null}
              </div>
            )}
            <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
              <button title="Attach a secure link" className="chip-filter" style={{ padding: "11px 12px", borderColor: linkOpen ? "var(--brand)" : "var(--rule)", color: linkOpen ? "var(--brand-dark)" : "var(--ink-soft)" }} onClick={() => setLinkOpen((v) => !v)}><Icon name="link" size={16} /></button>
              <textarea className="ds-input" rows={1} style={{ flex: 1, resize: "none", padding: "11px 14px" }} placeholder={"Message " + active.with + "…"} value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} />
              <button className="btn btn-primary" style={{ padding: "12px 20px" }} onClick={send}>Send</button>
            </div>
            <div style={{ fontSize: 11, color: "var(--dim)", marginTop: 8, textAlign: "center" }}>Sending as {meLabel} · Dewey Sholes doesn't participate in or store your negotiation.</div>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)" }}>No conversation selected.</div>
      )}
    </div>
  );
}

// A firm asks a reporter to bill them through Dewey Sholes, so the payment lands on-platform
// instead of a check off-site. The reporter gets a one-tap prompt to issue the invoice.
function RequestInvoiceModal({ reporterName, onSend, onClose }) {
  const [matter, setMatter] = useState("");
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const first = reporterName.split(" ")[0];
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="ds-card" style={{ maxWidth: 480, width: "94%" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div>
            <h3 style={{ fontSize: 22 }}>Request an invoice</h3>
            <p style={{ color: "var(--muted)", fontSize: 13.5, marginTop: 4, lineHeight: 1.5 }}>Ask {first} to bill you through Dewey Sholes so you can pay by card or ACH. They get a one-tap prompt to send it.</p>
          </div>
          <button onClick={onClose} title="Close" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--dim)", padding: 4, flexShrink: 0 }}><Icon name="x" size={20} /></button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 16 }}>
          <div><label className="ds-label">Matter reference (optional)</label><input className="ds-input" value={matter} onChange={(e) => setMatter(e.target.value)} placeholder="e.g. Ramos v. Delta Logistics" /></div>
          <div><label className="ds-label">What it's for</label><textarea className="ds-input" rows={3} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="e.g. Half-day deposition on Aug 4, certified transcript + realtime." /></div>
          <div style={{ maxWidth: 200 }}><label className="ds-label">Amount to confirm (optional)</label><input className="ds-input" type="number" min="0" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Agreed amount" /></div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 20, flexWrap: "wrap" }}>
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={() => onSend({ matter: matter.trim(), desc: desc.trim(), amount: amount ? Number(amount) : null })}><Icon name="invoice" size={16} /> Send request</button>
        </div>
      </div>
    </div>
  );
}

function MessagingPage() {
  const store = useStore();
  useEffect(() => { if (!store.role) store.enterAsFirm(); }, []);
  return (
    <Page wide>
      <h1 style={{ fontSize: "clamp(32px, 4vw, 46px)", marginBottom: 6 }}>Messages</h1>
      <p style={{ color: "var(--muted)", marginBottom: 24 }}>Talk directly with {store.role === "reporter" ? "law firms" : "reporters"}. Dewey Sholes is the channel – the working relationship is yours.</p>
      <MessagesPanel />
    </Page>
  );
}
