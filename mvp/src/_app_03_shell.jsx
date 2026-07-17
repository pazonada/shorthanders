// ─── Top navigation (marketing + app share one bar) ────────────────
function Nav() {
  const store = useStore();
  const [open, setOpen] = useState(false);      // mobile menu
  const [demoOpen, setDemoOpen] = useState(false); // persona switch
  const route = useRoute();
  const link = (to, label) => (
    <button onClick={() => { navigate(to); setOpen(false); }}
      style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14.5,
        color: route.startsWith("#" + to) && to !== "/" ? "var(--ink)" : "var(--muted)", padding: "8px 0" }}>{label}</button>
  );
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--rule)" }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 66 }}>
        <Logo onClick={() => navigate("/")} />
        <nav style={{ display: "flex", alignItems: "center", gap: 26 }} className="nav-links">
          {link("/directory", "Directory")}
          {link("/for-firms", "For firms")}
          {link("/for-reporters", "For reporters")}
          {link("/pricing", "Pricing")}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 12, position: "relative" }}>
          {store.role === "reporter" && <button className="btn btn-primary" style={{ padding: "10px 18px", fontSize: 14 }} onClick={() => navigate("/reporter")}>My dashboard</button>}
          {store.role === "firm" && <button className="btn btn-primary" style={{ padding: "10px 18px", fontSize: 14 }} onClick={() => navigate("/firm")}>My firm</button>}
          {!store.role && (
            <>
              <button className="chip-filter" onClick={() => setDemoOpen((v) => !v)} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                Log in <Icon name="chevron" size={14} />
              </button>
              {demoOpen && (
                <div style={{ position: "absolute", top: 46, right: 0, width: 260, background: "#fff", border: "1px solid var(--rule)", borderRadius: 14, boxShadow: "var(--shadow-lg)", padding: 8, zIndex: 60 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "var(--dim)", textTransform: "uppercase", letterSpacing: ".05em", padding: "8px 10px 4px" }}>Prototype – jump in as</div>
                  <button onClick={() => { store.enterAsReporter(); setDemoOpen(false); navigate("/reporter"); }} style={demoItem}>
                    <Icon name="user" size={16} /> A court reporter
                    <span style={demoHint}>Adam Elwailly, CSR #14585</span>
                  </button>
                  <button onClick={() => { store.enterAsFirm(); setDemoOpen(false); navigate("/firm"); }} style={demoItem}>
                    <Icon name="building" size={16} /> A law firm
                    <span style={demoHint}>Morgan &amp; Reyes LLP</span>
                  </button>
                </div>
              )}
            </>
          )}
          {store.role && <button title="Log out" onClick={() => { store.logout(); navigate("/"); }} style={{ background: "none", border: "1px solid var(--rule)", borderRadius: 999, width: 38, height: 38, cursor: "pointer", color: "var(--muted)", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="logout" size={16} /></button>}
        </div>
      </div>
    </header>
  );
}
const demoItem = { display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "11px 10px", borderRadius: 10, fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, color: "var(--ink)", position: "relative" };
const demoHint = { position: "absolute", right: 10, fontSize: 11, fontWeight: 500, color: "var(--dim)" };

// ─── Footer ────────────────────────────────────────────────────────
function Footer() {
  const col = (title, links) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "var(--dim)", textTransform: "uppercase", letterSpacing: ".05em" }}>{title}</div>
      {links.map(([to, label]) => <button key={label} onClick={() => navigate(to)} style={{ background: "none", border: "none", textAlign: "left", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: 14, color: "var(--muted)", padding: 0 }}>{label}</button>)}
    </div>
  );
  return (
    <footer style={{ borderTop: "1px solid var(--rule)", background: "var(--bg-soft)", marginTop: 80 }}>
      <div className="container" style={{ padding: "56px 24px 40px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 48, justifyContent: "space-between" }}>
          <div style={{ maxWidth: 300 }}>
            <Logo onClick={() => navigate("/")} />
            <p style={{ marginTop: 14, fontSize: 14, color: "var(--muted)", lineHeight: 1.6 }}>The directory of independent California court reporters. Find a reporter, or run your reporting business from one place.</p>
          </div>
          <div style={{ display: "flex", gap: 56, flexWrap: "wrap" }}>
            {col("Find reporters", [["/directory", "Search directory"], ["/for-firms", "For law firms"], ["/pricing", "Pricing"]])}
            {col("For reporters", [["/claim", "Claim your profile"], ["/for-reporters", "Invoicing & payments"], ["/pricing", "Always free"]])}
            {col("Company", [["/about", "About"], ["/terms", "Terms of service"], ["/privacy", "Privacy"], ["/contact", "Contact"]])}
          </div>
        </div>
        <div style={{ marginTop: 44, paddingTop: 24, borderTop: "1px solid var(--rule)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, fontSize: 13, color: "var(--dim)" }}>
          <span>© 2026 Studio Crux, LLC. Dewey Sholes is a directory and payment facilitator, not a court reporting agency.</span>
          <span>Certified license data sourced from public California CSR records.</span>
        </div>
      </div>
    </footer>
  );
}

// ─── Page wrapper ──────────────────────────────────────────────────
function Page({ children, wide }) {
  return (
    <>
      <Nav />
      <main className="container" style={{ maxWidth: wide ? 1280 : 1080, minHeight: "60vh", paddingTop: 40, paddingBottom: 40 }}>{children}</main>
      <Footer />
    </>
  );
}

// ─── Small shared bits ─────────────────────────────────────────────
function Avatar({ name, size = 52, claimed = true }) {
  return <div className={"rep-avatar" + (claimed ? "" : " gray")} style={{ width: size, height: size, fontSize: size * 0.36, background: claimed ? avatarColor(name) : undefined }}>{initials(name).toUpperCase()}</div>;
}
function Meter({ value }) {
  return (
    <div style={{ height: 8, background: "var(--bg-soft)", borderRadius: 999, overflow: "hidden", border: "1px solid var(--rule)" }}>
      <div style={{ height: "100%", width: value + "%", background: value >= 80 ? "var(--sage)" : value >= 50 ? "var(--brand)" : "var(--ochre)", borderRadius: 999, transition: "width .4s ease" }} />
    </div>
  );
}
function Toast({ msg, onClose }) {
  useEffect(() => { if (!msg) return; const t = setTimeout(onClose, 3200); return () => clearTimeout(t); }, [msg]);
  if (!msg) return null;
  return <div style={{ position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)", background: "var(--ink)", color: "#fff", padding: "14px 22px", borderRadius: 12, fontSize: 14, fontWeight: 600, boxShadow: "var(--shadow-lg)", zIndex: 200, display: "flex", alignItems: "center", gap: 10 }}><Icon name="check" size={16} />{msg}</div>;
}
