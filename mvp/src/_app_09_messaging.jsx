// ═══ Messaging (text + pass-through secure links; no file storage) ══
function MessagesPanel({ embedded }) {
  const store = useStore();
  const convos = store.convos;
  const [activeId, setActiveId] = useState(convos[0] ? convos[0].id : null);
  const active = convos.find((c) => c.id === activeId);
  const [draft, setDraft] = useState("");
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
              <div style={{ fontSize: 12.5, color: "var(--muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.msgs[c.msgs.length - 1].t || "Shared a link"}</div>
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
            {linkOpen && (
              <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
                <input className="ds-input" style={{ flex: 2, minWidth: 180, padding: "9px 12px", fontSize: 13 }} placeholder="Paste a secure link (your Dropbox, Box, etc.)" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} />
                <input className="ds-input" style={{ flex: 1, minWidth: 120, padding: "9px 12px", fontSize: 13 }} placeholder="Label (optional)" value={linkLabel} onChange={(e) => setLinkLabel(e.target.value)} />
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

function MessagingPage() {
  const store = useStore();
  useEffect(() => { if (!store.role) store.enterAsFirm(); }, []);
  return (
    <Page wide>
      <h1 style={{ fontSize: "clamp(28px, 3.5vw, 40px)", marginBottom: 6 }}>Messages</h1>
      <p style={{ color: "var(--muted)", marginBottom: 24 }}>Talk directly with {store.role === "reporter" ? "law firms" : "reporters"}. Dewey Sholes is the channel – the working relationship is yours.</p>
      <MessagesPanel />
    </Page>
  );
}
