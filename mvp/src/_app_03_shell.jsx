// ─── Top navigation (marketing + app share one bar) ────────────────
function Nav() {
  const store = useStore();
  const [open, setOpen] = useState(false);      // mobile menu
  const [loginOpen, setLoginOpen] = useState(false); // login modal
  const route = useRoute();
  const link = (to, label) => (
    <button onClick={() => { navigate(to); setOpen(false); }}
      style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14.5,
        color: route.startsWith("#" + to) && to !== "/" ? "var(--ink)" : "var(--muted)", padding: "8px 0" }}>{label}</button>
  );
  return (
    <>
    <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--rule)" }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 66 }}>
        <Logo onClick={() => navigate("/")} />
        <nav style={{ display: "flex", alignItems: "center", gap: 26 }} className="nav-links">
          {link("/directory", "Directory")}
          {link("/for-firms", "For firms")}
          {link("/for-reporters", "For reporters")}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 12, position: "relative" }}>
          {store.role === "reporter" && <button className="btn btn-primary" style={{ padding: "10px 18px", fontSize: 14 }} onClick={() => navigate("/reporter")}>My dashboard</button>}
          {store.role === "firm" && <button className="btn btn-primary" style={{ padding: "10px 18px", fontSize: 14 }} onClick={() => navigate("/firm")}>My firm</button>}
          {!store.role && (
            <button className="btn btn-secondary" style={{ padding: "10px 20px", fontSize: 14 }} onClick={() => setLoginOpen(true)}>Log in</button>
          )}
          {store.role && <button title="Settings" onClick={() => navigate("/settings")} style={{ background: route.startsWith("#/settings") ? "var(--brand-soft)" : "none", border: "1px solid var(--rule)", borderRadius: 999, width: 38, height: 38, cursor: "pointer", color: route.startsWith("#/settings") ? "var(--brand-dark)" : "var(--muted)", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="gear" size={16} /></button>}
          {store.role && <button title="Log out" onClick={() => { store.logout(); navigate("/"); }} style={{ background: "none", border: "1px solid var(--rule)", borderRadius: 999, width: 38, height: 38, cursor: "pointer", color: "var(--muted)", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="logout" size={16} /></button>}
        </div>
      </div>
    </header>
    {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
    </>
  );
}

// One login for both reporters and firms + a sign-up link. The prototype shortcuts
// stand in for real accounts (no auth in the demo).
function LoginModal({ onClose }) {
  const store = useStore();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const goReporter = () => { store.enterAsReporter(); onClose(); navigate("/reporter"); };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="ds-card" style={{ maxWidth: 420, width: "92%" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div>
            <h3 style={{ fontSize: 24 }}>Log in</h3>
            <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 4 }}>Reporters and firms sign in here.</p>
          </div>
          <button onClick={onClose} title="Close" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--dim)", padding: 4, flexShrink: 0 }}><Icon name="x" size={20} /></button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 18 }}>
          <div><label className="ds-label">Email</label><input className="ds-input" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          <div><label className="ds-label">Password</label><input className="ds-input" type="password" placeholder="••••••••" value={pw} onChange={(e) => setPw(e.target.value)} /></div>
          <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 4 }} onClick={goReporter}>Log in</button>
        </div>
        <p style={{ fontSize: 13.5, color: "var(--muted)", textAlign: "center", marginTop: 16 }}>New here? <button onClick={() => { onClose(); navigate("/signup"); }} style={{ background: "none", border: "none", color: "var(--brand-dark)", fontWeight: 600, cursor: "pointer", padding: 0, fontSize: 13.5 }}>Sign up</button>.</p>
        <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid var(--rule)" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--dim)", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 10, textAlign: "center" }}>Prototype – jump straight in as</div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }} onClick={goReporter}><Icon name="user" size={15} /> A reporter</button>
            <button className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }} onClick={() => { store.enterAsFirm(); onClose(); navigate("/firm"); }}><Icon name="building" size={15} /> A law firm</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// First-run orientation modal. Shown once, right after signup, on the first dashboard view - gated on
// the in-memory `justJoined` flag (not persisted, cleared on first mount), so it never reappears on a
// refresh or a later login. Role-aware content points at the 2-3 real things each side can do next.
function WelcomeModal({ role, name, onClose }) {
  const isFirm = role === "firm";
  const first = (!isFirm && name) ? name.split(" ")[0] : "";
  const items = isFirm ? [
    { icon: "search", title: "Search every California reporter", body: "Filter by county, area of law, language, and turnaround, then open full profiles." },
    { icon: "message", title: "Message reporters directly", body: "Agree on scope, dates, and rates yourselves - no agency in the middle." },
    { icon: "bank", title: "Pay invoices online", body: "Reporters bill you here; pay by card or ACH, with no agency markup." },
  ] : [
    { icon: "badge", title: "Polish your profile and set rates", body: "Firms browsing the directory see what you fill in - the more complete, the better." },
    { icon: "mail", title: "Invite the firms you already work with", body: "They join free and save you as a favorite, so they reach you first next time." },
    { icon: "invoice", title: "Invoice and get paid", body: "Send an invoice in a couple of clicks; firms pay by card or ACH, no agency cut." },
  ];
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="ds-card" style={{ maxWidth: 540, width: "92%" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div>
            <span className="pill pill-tag" style={{ marginBottom: 12, display: "inline-flex" }}>{isFirm ? "Your firm account is ready" : "Your profile is claimed"}</span>
            <h3 style={{ fontSize: 26 }}>Welcome to Dewey Sholes{first ? ", " + first : ""}</h3>
            <p style={{ color: "var(--muted)", fontSize: 14.5, marginTop: 6, lineHeight: 1.55 }}>Here's what you can do from here.</p>
          </div>
          <button onClick={onClose} title="Close" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--dim)", padding: 4, flexShrink: 0 }}><Icon name="x" size={20} /></button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, margin: "20px 0 22px" }}>
          {items.map((it) => (
            <div key={it.title} style={{ display: "flex", gap: 13, alignItems: "flex-start" }}>
              <div style={{ width: 40, height: 40, borderRadius: 11, background: "var(--brand-soft)", color: "var(--brand-dark)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name={it.icon} size={20} /></div>
              <div>
                <div style={{ fontWeight: 600, color: "var(--ink)", fontSize: 15 }}>{it.title}</div>
                <div style={{ color: "var(--muted)", fontSize: 13.5, marginTop: 2, lineHeight: 1.5 }}>{it.body}</div>
              </div>
            </div>
          ))}
        </div>
        {isFirm ? (
          // Firm's #1 next action (the directory) lives elsewhere, so offer both paths rather than
          // implying the blurred page behind is the directory: dismiss-here + go-there.
          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", flexWrap: "wrap" }}>
            <button className="btn btn-secondary" onClick={onClose}>Go to my dashboard</button>
            <button className="btn btn-primary" onClick={() => { onClose(); navigate("/directory"); }}><Icon name="search" size={16} /> Browse the directory</button>
          </div>
        ) : (
          // Reporter's next actions all live on the dashboard, so a single dismiss keeps them home.
          <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={onClose}>Explore my dashboard</button>
        )}
      </div>
    </div>
  );
}

// ─── Footer ────────────────────────────────────────────────────────
function Footer() {
  const col = (title, links) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.5)", textTransform: "uppercase", letterSpacing: ".05em" }}>{title}</div>
      {links.map(([to, label]) => <button key={label} onClick={() => navigate(to)} style={{ background: "none", border: "none", textAlign: "left", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: 14, color: "rgba(255,255,255,.72)", padding: 0 }}>{label}</button>)}
    </div>
  );
  return (
    <footer style={{ background: "var(--ink)", marginTop: 80 }}>
      <div className="container" style={{ padding: "56px 24px 40px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 48, justifyContent: "space-between" }}>
          <div style={{ maxWidth: 300 }}>
            <Logo onClick={() => navigate("/")} light />
            <p style={{ marginTop: 14, fontSize: 14, color: "rgba(255,255,255,.6)", lineHeight: 1.6 }}>The directory of every licensed California court reporter. Find a reporter, or run your reporting business from one place.</p>
          </div>
          <div style={{ display: "flex", gap: 56, flexWrap: "wrap" }}>
            {col("Company", [["/about", "About"], ["/terms", "Terms of service"], ["/privacy", "Privacy"], ["/contact", "Contact"]])}
          </div>
        </div>
        <div style={{ marginTop: 44, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,.13)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, fontSize: 13, color: "rgba(255,255,255,.5)" }}>
          <span>© 2026 Studio Crux, LLC. Dewey Sholes is a directory and payment facilitator, not a court reporting agency.</span>
          <span>Now serving California. Certified license data sourced from public CSR records.</span>
        </div>
      </div>
    </footer>
  );
}

// ─── Page wrapper ──────────────────────────────────────────────────
// roomy = the marketing-page rhythm (matches the homepage section bands). App screens stay tight.
function Page({ children, wide, roomy }) {
  const padY = roomy ? "clamp(56px, 6.5vw, 88px)" : 40;
  return (
    <>
      <Nav />
      <main className="container" style={{ maxWidth: wide ? 1280 : 1080, minHeight: "60vh", paddingTop: padY, paddingBottom: padY }}>{children}</main>
      <Footer />
    </>
  );
}

// ─── Small shared bits ─────────────────────────────────────────────
// Default avatar = the Dewey Sholes mark (brand-blue when claimed, grey when not).
// A claimed reporter can override it with their own photo.
function Avatar({ name, size = 52, claimed = true, photo }) {
  if (photo) return <img src={photo} alt={name} style={{ width: size, height: size, borderRadius: Math.round(size * 0.26), objectFit: "cover", flexShrink: 0, display: "block" }} />;
  const bg = claimed ? "#4361EE" : "#CBD5E1";
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ flexShrink: 0, display: "block" }} role="img" aria-label={name}>
      <rect width="60" height="60" rx="15" fill={bg} />
      <path d="M 14,42 C 10,24 16,9 30,9 C 46,9 54,21 51,34 C 48,47 35,54 22,48 C 15,44 14,36 19,30 C 24,23 36,24 40,33 C 43,39 40,47 34,50" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function Toast({ msg, onClose }) {
  useEffect(() => { if (!msg) return; const t = setTimeout(onClose, 3200); return () => clearTimeout(t); }, [msg]);
  if (!msg) return null;
  return <div style={{ position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)", background: "var(--ink)", color: "#fff", padding: "14px 22px", borderRadius: 12, fontSize: 14, fontWeight: 600, boxShadow: "var(--shadow-lg)", zIndex: 200, display: "flex", alignItems: "center", gap: 10 }}><Icon name="check" size={16} />{msg}</div>;
}
