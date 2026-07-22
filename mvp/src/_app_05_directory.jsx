// ═══ Directory card ════════════════════════════════════════════════
function RepCard({ r }) {
  const store = useStore();
  const locked = firmLocked(store, r);
  const scope = [...(r.proceedings || []), ...(r.services || [])];
  return (
    <button className={"rep-card" + (r.claimed ? "" : " unclaimed")} onClick={() => navigate("/reporters/" + r.id)}>
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
        <Avatar name={r.name} claimed={r.claimed} photo={r.photo} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, color: "var(--ink)", lineHeight: 1.15, display: "block" }}>{r.name}</span>
          <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 3 }}>CSR #{r.csrNumber}{r.method ? " · " + r.method : ""}</div>
          <div style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 4, display: "flex", alignItems: "center", gap: 5 }}><Icon name="pin" size={13} style={{ color: "var(--dim)", flexShrink: 0 }} />{r.city}{r.county && r.county !== r.city ? ", " + r.county + " County" : ""}</div>
          {recentlyActive(r) && (
            <div style={{ fontSize: 12.5, fontStyle: "italic", color: "var(--dim)", marginTop: 4 }}>Recently active</div>
          )}
        </div>
      </div>
      {r.claimed ? (
        locked ? (
          <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13.5, color: "var(--brand-dark)", fontWeight: 600, marginTop: 2 }}>
            <Icon name="lock" size={14} style={{ flexShrink: 0 }} /> View full profile with Pro
          </div>
        ) : (
        <>
          <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.55, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{r.bio}</p>
          {scope.length > 0 && <div style={{ fontSize: 12.5, color: "var(--muted)", lineHeight: 1.5 }}>{scope.slice(0, 4).join(" · ")}{r.rush ? " · Rush OK" : ""}</div>}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, flexWrap: "wrap", marginTop: "auto", paddingTop: 4, fontSize: 13, color: "var(--muted)" }}>
            <span style={{ whiteSpace: "nowrap" }}>{r.yearsExp} yrs experience</span>
            <span style={{ color: "var(--ink)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4, whiteSpace: "nowrap", marginLeft: "auto" }}>View profile <Icon name="arrow" size={14} /></span>
          </div>
        </>
        )
      ) : (
        <div style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.5 }}>
          Public license record. <span style={{ color: "var(--ink)", fontWeight: 600 }}>Is this you? Claim it →</span>
        </div>
      )}
    </button>
  );
}

// ═══ Directory ═════════════════════════════════════════════════════
function FilterGroup({ label, children }) {
  return (
    <div style={{ padding: "16px 0", borderTop: "1px solid var(--rule)" }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "var(--dim)", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 10 }}>{label}</div>
      {children}
    </div>
  );
}
function FilterCheck({ label, checked, onChange }) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 9, padding: "4px 0", fontSize: 14, color: "var(--ink-soft)", cursor: "pointer" }}>
      <input type="checkbox" checked={checked} onChange={onChange} style={{ width: 16, height: 16, accentColor: "var(--brand)", flexShrink: 0, cursor: "pointer" }} />
      {label}
    </label>
  );
}
const PAGE_SIZE = 24;
// One reporter vs one criteria set. Shared by the applied list and the live draft count so the
// "N results" preview and the actual results can never diverge in logic.
function matchesCriteria(r, s, haystacks) {
  const needle = (s.q || "").trim().toLowerCase();
  if (needle && !(haystacks.get(r.id) || "").includes(needle)) return false;
  if (s.county && r.county !== s.county) return false;
  if (s.claimedOnly && !r.claimed) return false;
  if (s.rushOnly && !r.rush) return false;
  if (s.language && !(r.languages || []).includes(s.language)) return false;
  if (s.minYears) {
    const y = r.yearsExp;
    if (s.minYears === "u5") { if (typeof y !== "number" || y >= 5) return false; }
    else if (typeof y !== "number" || y < Number(s.minYears)) return false;
  }
  if (s.tags.length && !s.tags.every((t) => (r.proceedings || []).includes(t) || (r.services || []).includes(t))) return false;
  // Specialty and credential facets: match ANY selected within the facet (OR), each facet must
  // be satisfied (AND across facets) - standard faceted-search behavior.
  if (s.specTags.length && !s.specTags.some((t) => (r.specialties || []).includes(t))) return false;
  if (s.certTags.length && !s.certTags.some((code) => (r.certifications || []).some((c) => c.includes(code)))) return false;
  return true;
}
function ReporterDirectory() {
  const all = useMemo(() => buildDirectory(), []);
  const [q, setQ] = useState("");
  const [county, setCounty] = useState("");
  const [language, setLanguage] = useState("");
  const [minYears, setMinYears] = useState("");
  const [tags, setTags] = useState([]);       // selected proceeding / service tags
  const [specTags, setSpecTags] = useState([]);   // selected specialties (multi, OR within group)
  const [certTags, setCertTags] = useState([]);   // selected credentials (multi, OR within group)
  const [rushOnly, setRushOnly] = useState(false);
  const [claimedOnly, setClaimedOnly] = useState(false);
  const [limit, setLimit] = useState(PAGE_SIZE);
  // Deferred search: the controls above are a DRAFT. Nothing filters the list until "Search" is
  // pressed, which snapshots the draft into `searched`. null (or an empty snapshot) = browse mode
  // (featured cards + everyone); a real snapshot = search mode (pure ranked list, no featured).
  // Deliberate choice 2026-07-21: with this many facets, compose-then-apply beats the list
  // reflowing on every keystroke. See docs/directory_filters.md.
  const [searched, setSearched] = useState(null);

  const counties = useMemo(() => Array.from(new Set(all.map((r) => r.county).filter(Boolean))).sort(), [all]);
  // Specialty filter pulled 2026-07-21: the only specialty values in the app are fabricated
  // (six sample profiles), and the real taxonomy is an open user-testing question. Re-add once
  // research produces a grounded list. See docs/directory_filters.md.

  const toggleTag = (t) => { setTags((cur) => cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]); setLimit(PAGE_SIZE); };
  const toggleIn = (setter) => (t) => { setter((cur) => cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]); setLimit(PAGE_SIZE); };
  const toggleSpec = toggleIn(setSpecTags);
  const toggleCert = toggleIn(setCertTags);

  // One lowercased haystack per reporter so keyword search reaches expertise, not just name/
  // city/license. A firm searching "maritime" or "realtime" should find the reporters who list
  // it. Built once; the claimed fields are only present on claimed profiles, which is fine -
  // unclaimed stubs have nothing but the public record to match on anyway.
  const haystacks = useMemo(() => {
    const m = new Map();
    for (const r of all) {
      m.set(r.id, [r.name, r.city, r.county, r.csrNumber, r.method, r.bio,
        ...(r.specialties || []), ...(r.proceedings || []), ...(r.services || []),
        ...(r.languages || []), ...(r.certifications || []), ...(r.coverage || [])]
        .filter(Boolean).join(" ").toLowerCase());
    }
    return m;
  }, [all]);

  // Signatures let us tell "draft differs from what's applied" (dirty) and "nothing is applied"
  // (browse) cheaply. Arrays are sorted so checkbox order doesn't create false dirtiness.
  const sig = (o) => JSON.stringify([o.q, o.county, o.language, o.minYears, [...o.tags].sort(), [...o.specTags].sort(), [...o.certTags].sort(), o.rushOnly, o.claimedOnly]);
  const draft = { q, county, language, minYears, tags, specTags, certTags, rushOnly, claimedOnly };
  const EMPTY_SIG = sig({ q: "", county: "", language: "", minYears: "", tags: [], specTags: [], certTags: [], rushOnly: false, claimedOnly: false });
  const draftSig = sig(draft);
  const searchedSig = searched ? sig(searched) : EMPTY_SIG;
  const browseMode = searchedSig === EMPTY_SIG;   // nothing applied -> featured + everyone
  const dirty = draftSig !== searchedSig;          // controls changed since last Search
  const anyDraft = draftSig !== EMPTY_SIG;
  const runSearch = () => { setSearched(draftSig === EMPTY_SIG ? null : { q, county, language, minYears, tags: [...tags], specTags: [...specTags], certTags: [...certTags], rushOnly, claimedOnly }); setLimit(PAGE_SIZE); };

  // Live count of what the current DRAFT would return - the useful signal live filtering gives
  // ("0 results, loosen something"), without reflowing the list. Recomputed on draft change.
  const draftCount = useMemo(() => all.reduce((n, r) => n + (matchesCriteria(r, draft, haystacks) ? 1 : 0), 0), [all, haystacks, draftSig]);

  const filtered = useMemo(() => {
    const s = searched;
    let list = s ? all.filter((r) => matchesCriteria(r, s, haystacks)) : all.slice();
    // PRD ranking: claimed first, then completeness, then recent claim.
    // Activity is deliberately NOT a ranking input (decided 2026-07-21). It shows on cards and
    // profiles only. Sorting by it would compound the cold start: the few active reporters would
    // absorb the early demand and everyone else would stay invisible. See activity_signal_design.md.
    list.sort((a, b) => {
      if (a.claimed !== b.claimed) return a.claimed ? -1 : 1;
      const c = completeness(b) - completeness(a);
      if (c) return c;
      return (b.claimedAt || "").localeCompare(a.claimedAt || "");
    });
    return list;
  }, [all, haystacks, searched]);

  const clearAll = () => { setQ(""); setCounty(""); setLanguage(""); setMinYears(""); setTags([]); setSpecTags([]); setCertTags([]); setRushOnly(false); setClaimedOnly(false); setSearched(null); setLimit(PAGE_SIZE); };
  // Featured only in browse mode - an active search shows a pure ranked list.
  const featured = browseMode ? weeklyFeatured(filtered.filter((r) => r.claimed), 3) : [];
  const featuredIds = new Set(featured.map((r) => r.id));
  const rest = filtered.filter((r) => !featuredIds.has(r.id));

  return (
    <Page wide>
      <div style={{ marginBottom: 22 }}>
        <h1 style={{ fontSize: "clamp(30px, 4vw, 44px)" }}>California court reporter directory</h1>
        <p style={{ color: "var(--muted)", marginTop: 8, fontSize: 16 }}>{all.length.toLocaleString()} licensed CSRs. Search and filter, then open a profile to message the reporter.</p>
      </div>

      <div className="dir-layout">
        {/* filter sidebar */}
        <aside className="dir-sidebar">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 2 }}>
            <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, color: "var(--ink)" }}>Filters</span>
            {(anyDraft || !browseMode) ? <button onClick={clearAll} style={{ background: "none", border: "none", color: "var(--muted)", fontSize: 13, cursor: "pointer", textDecoration: "underline" }}>Clear all</button> : null}
          </div>
          <FilterGroup label="County">
            <select className="ds-input" style={{ padding: "9px 12px", fontSize: 14 }} value={county} onChange={(e) => { setCounty(e.target.value); setLimit(PAGE_SIZE); }}>
              <option value="">All counties</option>
              {counties.map((c) => <option key={c} value={c}>{c}{TIER_A_COUNTIES.includes(c) ? " ★" : ""}</option>)}
            </select>
          </FilterGroup>
          <FilterGroup label="Proceedings">
            {PROCEEDING_TYPES.map((t) => <FilterCheck key={t} label={t} checked={tags.includes(t)} onChange={() => toggleTag(t)} />)}
          </FilterGroup>
          <FilterGroup label="Services">
            {SERVICE_TYPES.map((t) => <FilterCheck key={t} label={t} checked={tags.includes(t)} onChange={() => toggleTag(t)} />)}
          </FilterGroup>
          <FilterGroup label="Specialty">
            {/* Litigation subject matter. Multi-select (match any). Sourced list, pending CSR
                user testing - see docs/specialty_taxonomy_research.md. */}
            <div style={{ maxHeight: 208, overflowY: "auto", paddingRight: 4 }}>
              {SPECIALTY_TYPES.map((t) => <FilterCheck key={t} label={t} checked={specTags.includes(t)} onChange={() => toggleSpec(t)} />)}
            </div>
          </FilterGroup>
          <FilterGroup label="Certifications">
            {/* NCRA credentials - a separate skills axis from case-subject specialties. */}
            {CREDENTIAL_TYPES.map((c) => <FilterCheck key={c.code} label={c.label} checked={certTags.includes(c.code)} onChange={() => toggleCert(c.code)} />)}
          </FilterGroup>
          <FilterGroup label="Experience">
            <select className="ds-input" style={{ padding: "9px 12px", fontSize: 14 }} value={minYears} onChange={(e) => { setMinYears(e.target.value); setLimit(PAGE_SIZE); }}>
              <option value="">Any experience</option>
              <option value="u5">Under 5 years</option>
              <option value="5">5+ years</option>
              <option value="10">10+ years</option>
              <option value="15">15+ years</option>
              <option value="20">20+ years</option>
            </select>
          </FilterGroup>
          <FilterGroup label="Additional languages">
            {/* English is assumed for every CA CSR, so it isn't an option - this filters for
                reporters who ALSO work in another language. */}
            <select className="ds-input" style={{ padding: "9px 12px", fontSize: 14 }} value={language} onChange={(e) => { setLanguage(e.target.value); setLimit(PAGE_SIZE); }}>
              <option value="">Any (English assumed)</option>
              {LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </FilterGroup>
          <FilterGroup label="Options">
            <FilterCheck label="Takes rush / expedited" checked={rushOnly} onChange={() => { setRushOnly((v) => !v); setLimit(PAGE_SIZE); }} />
            <FilterCheck label="Claimed profiles only" checked={claimedOnly} onChange={() => { setClaimedOnly((v) => !v); setLimit(PAGE_SIZE); }} />
          </FilterGroup>
          <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 18 }} onClick={runSearch}><Icon name="search" size={16} /> Search{anyDraft ? " · " + draftCount.toLocaleString() + (draftCount === 1 ? " result" : " results") : ""}</button>
        </aside>

        {/* results */}
        <div className="dir-main">
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--ink)", marginBottom: 7 }}>Search by keyword</label>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ position: "relative", flex: 1 }}>
                <span style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", color: "var(--brand)" }}><Icon name="search" size={20} /></span>
                <input className="ds-input" style={{ paddingLeft: 50, fontSize: 16, height: 58, borderWidth: 2, width: "100%" }} placeholder="Try a name, city, specialty, or expertise – e.g. “maritime”" value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") runSearch(); }} />
              </div>
              <button className="btn btn-primary" style={{ height: 58, padding: "0 28px", flexShrink: 0 }} onClick={runSearch}>Search</button>
            </div>
            <p style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 6 }}>Set filters at left and search terms here, then press Search. Covers names, locations, specialties, proceedings, services, and profile bios.</p>
          </div>
          {dirty && (
            <div className="banner" style={{ display: "flex", alignItems: "center", gap: 8, background: draftCount === 0 ? "var(--ochre-soft)" : "var(--brand-soft)", color: draftCount === 0 ? "var(--ochre-deep)" : "var(--brand-dark)", borderRadius: 10, padding: "10px 14px", fontSize: 13.5, fontWeight: 600, marginBottom: 14 }}>
              <Icon name="search" size={15} />
              {draftCount === 0
                ? "No reporters match these filters – loosen something before searching."
                : "Press Search to see " + draftCount.toLocaleString() + (draftCount === 1 ? " result." : " results.")}
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "4px 0 16px", flexWrap: "wrap", gap: 8 }}>
            <span style={{ fontSize: 14, color: "var(--muted)" }}>{filtered.length.toLocaleString()} {browseMode ? (filtered.length === 1 ? "reporter" : "reporters") : (filtered.length === 1 ? "result" : "results")}</span>
            <span style={{ fontSize: 13, color: "var(--dim)" }}>Claimed profiles shown first</span>
          </div>
          {filtered.length === 0 ? (
            <div className="ds-panel" style={{ textAlign: "center", padding: 48 }}>
              <p style={{ color: "var(--muted)" }}>No reporters match those filters. <button onClick={clearAll} style={{ background: "none", border: "none", color: "var(--ink)", fontWeight: 600, cursor: "pointer" }}>Clear all filters</button></p>
            </div>
          ) : (
            <>
              {featured.length > 0 && (
                <div style={{ marginBottom: 30 }}>
                  <div className="dir-section-label">Featured reporters</div>
                  <div className="ds-grid ds-dir-grid">{featured.map((r) => <RepCard key={r.id} r={r} />)}</div>
                </div>
              )}
              {rest.length > 0 && (
                <>
                  {featured.length > 0 && <div className="dir-section-label">All reporters</div>}
                  <div className="dir-list">{rest.slice(0, limit).map((r) => <RepRow key={r.id} r={r} />)}</div>
                  {limit < rest.length && (
                    <div style={{ textAlign: "center", marginTop: 26 }}>
                      <button className="btn btn-secondary" onClick={() => setLimit((l) => l + PAGE_SIZE * 2)}>Show more ({(rest.length - limit).toLocaleString()} more)</button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </Page>
  );
}

// One reporter as a compact directory list row.
function RepRow({ r }) {
  const langs = (r.languages || []).filter(Boolean);
  const specs = (r.specialties || []).slice(0, 3);
  return (
    <div className="dir-row" onClick={() => navigate("/reporters/" + r.id)}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
        <Avatar name={r.name} size={40} claimed={r.claimed} />
        <div style={{ minWidth: 0 }}>
          <span style={{ fontWeight: 600, fontSize: 15, color: "var(--ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "block" }}>{r.name}</span>
          <div style={{ fontSize: 12.5, color: "var(--muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>CSR #{r.csrNumber}{r.method ? " · " + r.method : ""}{recentlyActive(r) ? <span style={{ fontStyle: "italic", color: "var(--dim)" }}> · Recently active</span> : null}</div>
        </div>
      </div>
      <div style={{ minWidth: 0, display: "flex", alignItems: "center", gap: 6, fontSize: 13.5, fontWeight: 600, color: "var(--ink-soft)" }}>
        <Icon name="pin" size={14} style={{ color: "var(--brand)", flexShrink: 0 }} />
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.county && r.county !== r.city ? r.county + " Co." : r.city}<span style={{ fontWeight: 400, color: "var(--muted)" }}>{r.county && r.county !== r.city ? " · " + r.city : ""}</span></span>
      </div>
      <div style={{ minWidth: 0, fontSize: 13 }}>
        {r.claimed ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <div style={{ color: "var(--ink-soft)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {[...(r.proceedings || []), ...(r.services || [])].slice(0, 3).join(" · ")}{r.rush ? "  ·  Rush" : ""}
            </div>
            <div style={{ color: "var(--muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {specs.join(" · ")}{langs.length ? "  ·  " + langs.join(", ") : ""}
            </div>
          </div>
        ) : <span style={{ color: "var(--dim)" }}>Public license record · unclaimed</span>}
      </div>
      <div className="dir-rate" style={{ fontSize: 13, color: r.claimed ? "var(--ink-soft)" : "var(--dim)", textAlign: "right" }}>
        {r.claimed ? (r.rate || "Rate on request") : "–"}
      </div>
      <div className="dir-chevron" style={{ color: "var(--dim)", display: "flex", justifyContent: "flex-end" }}><Icon name="arrow" size={16} /></div>
    </div>
  );
}

// ═══ Reporter profile ══════════════════════════════════════════════
// A free firm may fully view only unclaimed profiles + reporters connected to / who invited
// them (store.unlockedReporters). Every other claimed profile is gated behind Pro.
function firmLocked(store, r) {
  return store.role === "firm" && store.firmPlan !== "pro" && r.claimed && !store.unlockedReporters.includes(r.id);
}

function GatedProfile({ r }) {
  const store = useStore();
  const first = r.name.split(" ")[0];
  return (
    <Page>
      <button onClick={() => navigateBack("/directory")} style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, marginBottom: 16 }}><Icon name="arrow" size={15} style={{ transform: "rotate(180deg)" }} /> Back to directory</button>
      <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap", marginBottom: 8 }}>
        <Avatar name={r.name} size={84} photo={r.photo} />
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <h1 style={{ fontSize: 40, lineHeight: 1 }}>{r.name}</h1>
          </div>
          <div style={{ color: "var(--muted)", marginTop: 8, fontSize: 15, display: "flex", gap: 14, flexWrap: "wrap" }}>
            <span><Icon name="badge" size={14} style={{ display: "inline", verticalAlign: "-2px", marginRight: 4 }} />CSR #{r.csrNumber}</span>
            <span><Icon name="pin" size={14} style={{ display: "inline", verticalAlign: "-2px", marginRight: 4 }} />{r.city}{r.county ? ", " + r.county + " County" : ""}</span>
            {r.method ? <span><Icon name="doc" size={14} style={{ display: "inline", verticalAlign: "-2px", marginRight: 4 }} />{r.method}</span> : null}
          </div>
        </div>
      </div>
      <div style={{ position: "relative", marginTop: 18, borderRadius: 16, overflow: "hidden" }}>
        <div aria-hidden="true" style={{ filter: "blur(7px)", userSelect: "none", pointerEvents: "none", opacity: 0.5, display: "flex", flexDirection: "column", gap: 22, padding: 4 }}>
          <ProfileSection title="About"><p style={{ fontSize: 16, color: "var(--ink-soft)", lineHeight: 1.7 }}>{r.bio}</p></ProfileSection>
          <ProfileSection title="Specialties"><TagList items={r.specialties} tone="brand" /></ProfileSection>
          <ProfileSection title="Rates"><p style={{ fontSize: 16, color: "var(--ink-soft)" }}>{r.rate || "Provided on request"}</p></ProfileSection>
          <ProfileSection title="Geographic coverage"><TagList items={(r.coverage || []).map((c) => c + " County")} tone="brand" /></ProfileSection>
        </div>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, background: "linear-gradient(to bottom, rgba(255,255,255,0.35), rgba(255,255,255,0.78))" }}>
          <div className="ds-card" style={{ maxWidth: 440, textAlign: "center", boxShadow: "var(--shadow-lg)" }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--brand-soft)", color: "var(--brand-dark)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}><Icon name="lock" size={22} /></div>
            <h3 style={{ fontSize: 21 }}>See {first}'s full profile with Pro</h3>
            <p style={{ fontSize: 14.5, color: "var(--muted)", marginTop: 10, lineHeight: 1.6 }}>Full bio, specialties, rates, coverage, and certifications for every reporter, plus direct messaging and advanced search to find new reporters.</p>
            <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => store.upgradeFirm()}><Icon name="arrow" size={16} /> Upgrade to Pro</button>
            <p style={{ fontSize: 12, color: "var(--dim)", marginTop: 12, lineHeight: 1.5 }}>Pro pricing announced before launch. Reporters who invite your firm are always free to view.</p>
          </div>
        </div>
      </div>
    </Page>
  );
}

function ReporterProfile({ reporterId, invited }) {
  const store = useStore();
  const [inviteOpen, setInviteOpen] = useState(false);
  const all = useMemo(() => buildDirectory(), []);
  const r = all.find((x) => x.id === reporterId);
  if (!r) return <Page><div className="ds-panel" style={{ textAlign: "center", padding: 60 }}><h2>Reporter not found</h2><button className="btn btn-secondary" style={{ marginTop: 16 }} onClick={() => navigate("/directory")}>Back to directory</button></div></Page>;

  if (!r.claimed) return <UnclaimedProfile r={r} />;
  if (!invited && firmLocked(store, r)) return <GatedProfile r={r} />;

  const pct = completeness(r);
  const isOwner = store.role === "reporter" && r.id === store.myCsr;
  const first = r.name.split(" ")[0];
  const acceptInvite = () => { store.acceptInvite(r.id); navigate("/firm"); };
  const messageReporter = () => {
    if (store.role === "firm") { store.startConvoWith(r.name); navigate("/messages"); }
    else { store.enterAsFirm(); store.startConvoWith(r.name); navigate("/messages"); }
  };
  return (
    <Page>
      <button onClick={() => navigateBack("/directory")} style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, marginBottom: 16 }}><Icon name="arrow" size={15} style={{ transform: "rotate(180deg)" }} /> Back to directory</button>
      {invited && <div className="banner banner-ok" style={{ marginBottom: 14 }}><Icon name="heart" size={18} style={{ flexShrink: 0 }} /><div><strong>{first} invited you to Dewey Sholes.</strong> Create a free account to message {first}, pay their invoices, and save them to your firm. Joining is free for your firm.</div></div>}
      <div className="banner banner-warn" style={{ marginBottom: 22 }}><Icon name="eye" size={18} style={{ flexShrink: 0 }} /><div><strong>Sample profile.</strong> This reporter's bio, specialties, and testimonials are illustrative placeholders for the prototype, not real. The name, license, county, and method are real public data.</div></div>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 320px", gap: 32, alignItems: "start" }} className="profile-grid">
        {/* main */}
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
            <Avatar name={r.name} size={84} photo={r.photo} />
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <h1 style={{ fontSize: 40, lineHeight: 1 }}>{r.name}</h1>
              </div>
              <div style={{ color: "var(--muted)", marginTop: 8, fontSize: 15, display: "flex", gap: 14, flexWrap: "wrap" }}>
                <span><Icon name="badge" size={14} style={{ display: "inline", verticalAlign: "-2px", marginRight: 4 }} />CSR #{r.csrNumber}</span>
                <span><Icon name="pin" size={14} style={{ display: "inline", verticalAlign: "-2px", marginRight: 4 }} />{r.city}{r.county ? ", " + r.county + " County" : ""}</span>
                <span><Icon name="clock" size={14} style={{ display: "inline", verticalAlign: "-2px", marginRight: 4 }} />{r.yearsExp} years</span>
                {r.method ? <span><Icon name="doc" size={14} style={{ display: "inline", verticalAlign: "-2px", marginRight: 4 }} />{r.method}</span> : null}
              </div>
              {/* Shown only when true - absence is not a negative signal. */}
              {recentlyActive(r) && (
                <div style={{ marginTop: 7, fontSize: 13.5, fontStyle: "italic", color: "var(--dim)" }}>Recently active on Dewey Sholes</div>
              )}
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 12 }}>
                {(r.proceedings || []).map((w) => <span key={w} className="pill pill-tag">{w}</span>)}
                {r.rush && <span className="pill pill-rush"><Icon name="clock" size={12} /> Rush available</span>}
              </div>
            </div>
          </div>

          <ProfileSection title="About"><p style={{ fontSize: 16, color: "var(--ink-soft)", lineHeight: 1.7 }}>{r.bio}</p></ProfileSection>
          <ProfileSection title="Specialties"><TagList items={r.specialties} tone="brand" /></ProfileSection>
          <ProfileSection title="Proceedings covered"><TagList items={r.proceedings} tone="sage" /></ProfileSection>
          {(r.services || []).length > 0 && <ProfileSection title="Services offered"><TagList items={r.services} tone="brand" /></ProfileSection>}
          {(r.languages || []).length > 0 && <ProfileSection title="Languages"><TagList items={r.languages} tone="plum" /></ProfileSection>}
          <ProfileSection title="Geographic coverage"><TagList items={(r.coverage || []).map((c) => c + " County")} tone="brand" /></ProfileSection>
          <ProfileSection title="Certifications"><TagList items={r.certifications} tone="sage" /></ProfileSection>
          {/* Testimonials pulled 2026-07-21: unverified reporter-supplied quotes are a
              credibility risk, and ratings/reviews were already out of the reduced scope.
              Real ratings come later, captured after payment. See docs/reviews_and_ratings.md. */}
        </div>

        {/* sidebar */}
        <aside style={{ position: "sticky", top: 86, display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="ds-card">
            {r.rate ? <div style={{ marginBottom: 16 }}><div style={{ fontSize: 12, fontWeight: 700, color: "var(--dim)", textTransform: "uppercase", letterSpacing: ".04em" }}>Rates</div><div style={{ fontSize: 17, color: "var(--ink)", fontWeight: 600, marginTop: 4 }}>{r.rate}</div></div>
              : <div style={{ marginBottom: 16, fontSize: 14, color: "var(--muted)" }}>Rates provided on request.</div>}
            {invited ? (
              <>
                <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={acceptInvite}><Icon name="heart" size={16} /> Create free account and save {first}</button>
                <p style={{ fontSize: 12, color: "var(--dim)", marginTop: 14, lineHeight: 1.5, textAlign: "center" }}>Free for your firm. Message {first} and pay their invoices right away; upgrade only when you want to search the full directory.</p>
              </>
            ) : isOwner ? (
              <>
                <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={() => setInviteOpen(true)}><Icon name="mail" size={16} /> Invite a law firm</button>
                <button className="btn btn-secondary" style={{ width: "100%", justifyContent: "center", marginTop: 10 }} onClick={() => navigate("/reporter")}><Icon name="user" size={16} /> Back to dashboard</button>
                <p style={{ fontSize: 12, color: "var(--dim)", marginTop: 14, lineHeight: 1.5, textAlign: "center" }}>This is how firms see your profile. Invite the firms you already work with, so they join and save you.</p>
              </>
            ) : (
              <>
                <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={messageReporter}><Icon name="message" size={16} /> Message {first}</button>
                <button className="btn btn-secondary" style={{ width: "100%", justifyContent: "center", marginTop: 10 }} onClick={() => { store.toggleSaved(r.id); }}>
                  <Icon name="heart" size={16} /> {store.saved.includes(r.id) ? "Saved" : "Save reporter"}
                </button>
                <p style={{ fontSize: 12, color: "var(--dim)", marginTop: 14, lineHeight: 1.5, textAlign: "center" }}>Terms are agreed directly between you and the reporter. Dewey Sholes is a communication channel only.</p>
              </>
            )}
          </div>
          <div className="ds-panel" style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "var(--muted)" }}>
            <Icon name="eye" size={16} /> {r.views} profile views this month
          </div>
        </aside>
      </div>
      {isOwner && inviteOpen && <InviteFirmModal me={r} onClose={() => setInviteOpen(false)} />}
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
