// ═══ Directory card ════════════════════════════════════════════════
function RepCard({ r }) {
  const isNew = r.claimed && r.claimedAt >= RECENT_CLAIM_CUTOFF;
  return (
    <button className={"rep-card" + (r.claimed ? "" : " unclaimed")} onClick={() => navigate("/reporters/" + r.id)}>
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
        <Avatar name={r.name} claimed={r.claimed} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 21, color: "var(--ink)", lineHeight: 1.1 }}>{r.name}</span>
            {isNew && <span className="pill pill-new">New</span>}
          </div>
          <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 3 }}>CSR #{r.csrNumber} · {r.city}{r.county ? " · " + r.county + " County" : ""}</div>
          <div style={{ marginTop: 8 }}>
            {r.claimed
              ? <span className="pill pill-claimed"><Icon name="check" size={13} /> Claimed{r.verified ? " · Verified" : ""}</span>
              : <span className="pill pill-unclaimed">Unclaimed</span>}
          </div>
        </div>
      </div>
      {r.claimed ? (
        <>
          <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.55, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{r.bio}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {(r.workTypes || []).slice(0, 3).map((w) => <span key={w} className="pill pill-tag">{w}</span>)}
            {r.rush && <span className="pill pill-rush"><Icon name="clock" size={12} /> Rush OK</span>}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 2, fontSize: 13, color: "var(--muted)" }}>
            <span>{r.yearsExp} yrs experience</span>
            <span style={{ color: "var(--brand-dark)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4 }}>View profile <Icon name="arrow" size={14} /></span>
          </div>
        </>
      ) : (
        <div style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.5 }}>
          Public license record. <span style={{ color: "var(--brand-dark)", fontWeight: 600 }}>Is this you? Claim it →</span>
        </div>
      )}
    </button>
  );
}

// ═══ Directory ═════════════════════════════════════════════════════
const PAGE_SIZE = 24;
function ReporterDirectory() {
  const all = useMemo(() => buildDirectory(), []);
  const [q, setQ] = useState("");
  const [county, setCounty] = useState("");
  const [language, setLanguage] = useState("");
  const [minYears, setMinYears] = useState("");
  const [method, setMethod] = useState("");   // reporting method (from license)
  const [work, setWork] = useState([]);       // selected work types
  const [rushOnly, setRushOnly] = useState(false);
  const [claimedOnly, setClaimedOnly] = useState(false);
  const [limit, setLimit] = useState(PAGE_SIZE);

  const counties = useMemo(() => Array.from(new Set(all.map((r) => r.county).filter(Boolean))).sort(), [all]);

  const toggleWork = (w) => { setWork((cur) => cur.includes(w) ? cur.filter((x) => x !== w) : [...cur, w]); setLimit(PAGE_SIZE); };

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let list = all.filter((r) => {
      if (needle && !(r.name.toLowerCase().includes(needle) || (r.city || "").toLowerCase().includes(needle) || r.csrNumber.includes(needle))) return false;
      if (county && r.county !== county) return false;
      if (claimedOnly && !r.claimed) return false;
      if (rushOnly && !r.rush) return false;
      if (language && !(r.languages || []).includes(language)) return false;
      if (minYears && (!(r.yearsExp) || r.yearsExp < Number(minYears))) return false;
      if (method && !(r.method || "").includes(method)) return false;
      if (work.length && !work.every((w) => (r.workTypes || []).includes(w))) return false;
      return true;
    });
    // PRD ranking: claimed first, then completeness, then recent claim.
    list.sort((a, b) => {
      if (a.claimed !== b.claimed) return a.claimed ? -1 : 1;
      const c = completeness(b) - completeness(a);
      if (c) return c;
      return (b.claimedAt || "").localeCompare(a.claimedAt || "");
    });
    return list;
  }, [all, q, county, language, minYears, method, work, rushOnly, claimedOnly]);

  const anyFilter = q || county || language || minYears || method || work.length || rushOnly || claimedOnly;
  const clearAll = () => { setQ(""); setCounty(""); setLanguage(""); setMinYears(""); setMethod(""); setWork([]); setRushOnly(false); setClaimedOnly(false); setLimit(PAGE_SIZE); };

  return (
    <Page wide>
      <div style={{ marginBottom: 22 }}>
        <h1 style={{ fontSize: "clamp(30px, 4vw, 44px)" }}>California court reporter directory</h1>
        <p style={{ color: "var(--muted)", marginTop: 8, fontSize: 16 }}>{all.length.toLocaleString()} licensed CSRs. Search, filter, and message reporters directly.</p>
      </div>

      {/* search */}
      <div style={{ position: "relative", marginBottom: 16 }}>
        <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "var(--dim)" }}><Icon name="search" size={18} /></span>
        <input className="ds-input" style={{ paddingLeft: 46, fontSize: 16, height: 52 }} placeholder="Search by name, city, or license number…" value={q} onChange={(e) => { setQ(e.target.value); setLimit(PAGE_SIZE); }} />
      </div>

      {/* filter row */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", marginBottom: 10 }}>
        <select className="ds-input" style={{ width: "auto", padding: "9px 14px" }} value={county} onChange={(e) => { setCounty(e.target.value); setLimit(PAGE_SIZE); }}>
          <option value="">All counties</option>
          {counties.map((c) => <option key={c} value={c}>{c}{TIER_A_COUNTIES.includes(c) ? " ★" : ""}</option>)}
        </select>
        <select className="ds-input" style={{ width: "auto", padding: "9px 14px" }} value={language} onChange={(e) => { setLanguage(e.target.value); setLimit(PAGE_SIZE); }}>
          <option value="">Any language</option>
          {LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
        </select>
        <select className="ds-input" style={{ width: "auto", padding: "9px 14px" }} value={minYears} onChange={(e) => { setMinYears(e.target.value); setLimit(PAGE_SIZE); }}>
          <option value="">Any experience</option>
          <option value="5">5+ years</option>
          <option value="10">10+ years</option>
          <option value="15">15+ years</option>
          <option value="20">20+ years</option>
        </select>
        <select className="ds-input" style={{ width: "auto", padding: "9px 14px" }} value={method} onChange={(e) => { setMethod(e.target.value); setLimit(PAGE_SIZE); }}>
          <option value="">Any method</option>
          <option value="Machine">Machine (steno)</option>
          <option value="Voice">Voice writing</option>
        </select>
        {WORK_TYPES.slice(0, 5).map((w) =><button key={w} className={"chip-filter" + (work.includes(w) ? " on" : "")} onClick={() => toggleWork(w)}>{w}</button>)}
        <button className={"chip-filter" + (rushOnly ? " on" : "")} onClick={() => { setRushOnly((v) => !v); setLimit(PAGE_SIZE); }}><Icon name="clock" size={13} style={{ display: "inline", verticalAlign: "-2px", marginRight: 4 }} />Rush</button>
        <button className={"chip-filter" + (claimedOnly ? " on" : "")} onClick={() => { setClaimedOnly((v) => !v); setLimit(PAGE_SIZE); }}>Claimed only</button>
        {anyFilter ? <button className="chip-filter" style={{ color: "var(--brand-dark)", borderColor: "var(--brand-pale)" }} onClick={clearAll}>Clear all</button> : null}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "18px 0 16px", flexWrap: "wrap", gap: 8 }}>
        <span style={{ fontSize: 14, color: "var(--muted)" }}>{filtered.length.toLocaleString()} {filtered.length === 1 ? "reporter" : "reporters"}{anyFilter ? " match" : ""}</span>
        <span style={{ fontSize: 13, color: "var(--dim)", display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name="star" size={13} /> Claimed & verified profiles shown first</span>
      </div>

      {filtered.length === 0 ? (
        <div className="ds-panel" style={{ textAlign: "center", padding: 48 }}>
          <p style={{ color: "var(--muted)" }}>No reporters match those filters. <button onClick={clearAll} style={{ background: "none", border: "none", color: "var(--brand-dark)", fontWeight: 600, cursor: "pointer" }}>Clear all filters</button></p>
        </div>
      ) : (
        <>
          <div className="ds-grid ds-dir-grid">{filtered.slice(0, limit).map((r) => <RepCard key={r.id} r={r} />)}</div>
          {limit < filtered.length && (
            <div style={{ textAlign: "center", marginTop: 32 }}>
              <button className="btn btn-secondary" onClick={() => setLimit((l) => l + PAGE_SIZE * 2)}>Show more ({(filtered.length - limit).toLocaleString()} more)</button>
            </div>
          )}
        </>
      )}
    </Page>
  );
}

// ═══ Reporter profile ══════════════════════════════════════════════
function ReporterProfile({ reporterId }) {
  const store = useStore();
  const all = useMemo(() => buildDirectory(), []);
  const r = all.find((x) => x.id === reporterId);
  if (!r) return <Page><div className="ds-panel" style={{ textAlign: "center", padding: 60 }}><h2>Reporter not found</h2><button className="btn btn-secondary" style={{ marginTop: 16 }} onClick={() => navigate("/directory")}>Back to directory</button></div></Page>;

  if (!r.claimed) return <UnclaimedProfile r={r} />;

  const pct = completeness(r);
  const messageReporter = () => {
    if (store.role === "firm") { store.startConvoWith(r.name); navigate("/messages"); }
    else { store.enterAsFirm(); store.startConvoWith(r.name); navigate("/messages"); }
  };
  return (
    <Page>
      <button onClick={() => navigateBack("/directory")} style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, marginBottom: 20 }}><Icon name="arrow" size={15} style={{ transform: "rotate(180deg)" }} /> Back to directory</button>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 320px", gap: 32, alignItems: "start" }} className="profile-grid">
        {/* main */}
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
            <Avatar name={r.name} size={84} />
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <h1 style={{ fontSize: 40, lineHeight: 1 }}>{r.name}</h1>
                {r.verified && <span className="pill pill-verified"><Icon name="shield" size={13} /> Verified</span>}
              </div>
              <div style={{ color: "var(--muted)", marginTop: 8, fontSize: 15, display: "flex", gap: 14, flexWrap: "wrap" }}>
                <span><Icon name="badge" size={14} style={{ display: "inline", verticalAlign: "-2px", marginRight: 4 }} />CSR #{r.csrNumber}</span>
                <span><Icon name="pin" size={14} style={{ display: "inline", verticalAlign: "-2px", marginRight: 4 }} />{r.city}{r.county ? ", " + r.county + " County" : ""}</span>
                <span><Icon name="clock" size={14} style={{ display: "inline", verticalAlign: "-2px", marginRight: 4 }} />{r.yearsExp} years</span>
                {r.method ? <span><Icon name="doc" size={14} style={{ display: "inline", verticalAlign: "-2px", marginRight: 4 }} />{r.method}</span> : null}
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 12 }}>
                {(r.workTypes || []).map((w) => <span key={w} className="pill pill-tag">{w}</span>)}
                {r.rush && <span className="pill pill-rush"><Icon name="clock" size={12} /> Rush available</span>}
              </div>
            </div>
          </div>

          <ProfileSection title="About"><p style={{ fontSize: 16, color: "var(--ink-soft)", lineHeight: 1.7 }}>{r.bio}</p></ProfileSection>
          <ProfileSection title="Specialties"><TagList items={r.specialties} tone="brand" /></ProfileSection>
          <ProfileSection title="Proceedings handled"><TagList items={r.proceedings} tone="sage" /></ProfileSection>
          {(r.languages || []).length > 0 && <ProfileSection title="Languages"><TagList items={r.languages} tone="plum" /></ProfileSection>}
          <ProfileSection title="Geographic coverage"><TagList items={(r.coverage || []).map((c) => c + " County")} tone="brand" /></ProfileSection>
          <ProfileSection title="Certifications"><TagList items={r.certifications} tone="sage" /></ProfileSection>
          {(r.testimonials || []).length > 0 && (
            <ProfileSection title="What firms say">
              {r.testimonials.map((t, i) => (
                <blockquote key={i} style={{ borderLeft: "3px solid var(--brand-pale)", paddingLeft: 18, margin: "0 0 14px" }}>
                  <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: 20, fontStyle: "italic", color: "var(--ink)", lineHeight: 1.4 }}>“{t.quote}”</p>
                  <cite style={{ fontSize: 13, color: "var(--muted)", fontStyle: "normal", marginTop: 8, display: "block" }}>– {t.author}</cite>
                </blockquote>
              ))}
            </ProfileSection>
          )}
        </div>

        {/* sidebar */}
        <aside style={{ position: "sticky", top: 86, display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="ds-card">
            {r.rate ? <div style={{ marginBottom: 16 }}><div style={{ fontSize: 12, fontWeight: 700, color: "var(--dim)", textTransform: "uppercase", letterSpacing: ".04em" }}>Rates</div><div style={{ fontSize: 17, color: "var(--ink)", fontWeight: 600, marginTop: 4 }}>{r.rate}</div></div>
              : <div style={{ marginBottom: 16, fontSize: 14, color: "var(--muted)" }}>Rates provided on request.</div>}
            <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={messageReporter}><Icon name="message" size={16} /> Message {r.name.split(" ")[0]}</button>
            <button className="btn btn-secondary" style={{ width: "100%", justifyContent: "center", marginTop: 10 }} onClick={() => { store.toggleSaved(r.id); }}>
              <Icon name="heart" size={16} /> {store.saved.includes(r.id) ? "Saved" : "Save reporter"}
            </button>
            <p style={{ fontSize: 12, color: "var(--dim)", marginTop: 14, lineHeight: 1.5, textAlign: "center" }}>Terms are agreed directly between you and the reporter. Dewey Sholes is a communication channel only.</p>
          </div>
          <div className="ds-panel" style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "var(--muted)" }}>
            <Icon name="eye" size={16} /> {r.views} profile views this month
          </div>
        </aside>
      </div>
    </Page>
  );
}
function ProfileSection({ title, children }) {
  return <section><h2 style={{ fontSize: 15, fontWeight: 700, fontFamily: "'Inter', sans-serif", color: "var(--dim)", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 12 }}>{title}</h2>{children}</section>;
}
function TagList({ items, tone }) {
  const cls = tone === "sage" ? "pill-claimed" : tone === "plum" ? "pill-tag" : "pill-verified";
  return <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{(items || []).map((it, i) => <span key={i} className={"pill " + cls} style={{ fontSize: 13, padding: "6px 13px" }}>{it}</span>)}</div>;
}

function UnclaimedProfile({ r }) {
  return (
    <Page>
      <button onClick={() => navigateBack("/directory")} style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, marginBottom: 20 }}><Icon name="arrow" size={15} style={{ transform: "rotate(180deg)" }} /> Back to directory</button>
      <div style={{ maxWidth: 620 }}>
        <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
          <Avatar name={r.name} size={72} claimed={false} />
          <div>
            <h1 style={{ fontSize: 34, lineHeight: 1 }}>{r.name}</h1>
            <div style={{ color: "var(--muted)", marginTop: 8, fontSize: 15 }}>CSR #{r.csrNumber} · {r.city}{r.county ? " · " + r.county + " County" : ""}</div>
            <span className="pill pill-unclaimed" style={{ marginTop: 10 }}>Unclaimed profile</span>
          </div>
        </div>

        <div className="ds-panel" style={{ marginTop: 26 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, fontFamily: "'Inter', sans-serif", color: "var(--dim)", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 14 }}>Public license record</h2>
          <dl style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "10px 20px", fontSize: 15 }}>
            <dt style={{ color: "var(--muted)" }}>License</dt><dd style={{ color: "var(--ink)" }}>CSR #{r.csrNumber}</dd>
            <dt style={{ color: "var(--muted)" }}>Location</dt><dd style={{ color: "var(--ink)" }}>{r.city}{r.county ? ", " + r.county + " County" : ""}, CA</dd>
            {r.method ? <><dt style={{ color: "var(--muted)" }}>Reporting method</dt><dd style={{ color: "var(--ink)" }}>{r.method}</dd></> : null}
            {r.email ? <><dt style={{ color: "var(--muted)" }}>Public email</dt><dd><a href={"mailto:" + r.email} style={{ color: "var(--brand-dark)", textDecoration: "none" }}>{r.email}</a></dd></> : null}
            <dt style={{ color: "var(--muted)" }}>License status</dt><dd style={{ color: "var(--ink)" }}>Active · expires {r.expiration}</dd>
          </dl>
          <p style={{ fontSize: 13.5, color: "var(--dim)", marginTop: 16, lineHeight: 1.5 }}>Name, license, county, and any public email are from California's CSR licensing records. A bio, specialties, coverage, and rates appear once the reporter claims and completes their profile.</p>
        </div>

        <div className="banner banner-ok" style={{ marginTop: 20 }}>
          <Icon name="user" size={20} style={{ flexShrink: 0 }} />
          <div>
            <strong>Is this you?</strong> Claim your profile to add your bio, specialties, and rates – and to start invoicing clients and getting paid. It's free.
            <div><button className="btn btn-primary" style={{ marginTop: 14 }} onClick={() => navigate("/claim/" + r.id)}>Claim this profile <Icon name="arrow" size={16} /></button></div>
          </div>
        </div>
      </div>
    </Page>
  );
}
