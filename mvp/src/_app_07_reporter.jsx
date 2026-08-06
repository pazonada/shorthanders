// ═══ Dashboard shell (shared by reporter + firm) ═══════════════════
function DashLayout({ title, subtitle, tabs, active, onTab, headerRight, children }) {
  return (
    <Page wide>
      <div style={{ marginBottom: 22, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
        <div>
          <h1 style={{ fontSize: "clamp(32px, 4vw, 46px)" }}>{title}</h1>
          {subtitle && <p style={{ color: "var(--muted)", marginTop: 6 }}>{subtitle}</p>}
        </div>
        {headerRight}
      </div>
      <div className="ds-tabs" style={{ marginBottom: 26, overflowX: "auto" }}>
        {tabs.map((t) => <button key={t.id} className={"ds-tab" + (active === t.id ? " on" : "")} onClick={() => onTab(t.id)}>{t.label}{t.badge ? <span style={{ marginLeft: 7, background: "var(--brand)", color: "#fff", fontSize: 11, fontWeight: 700, padding: "1px 7px", borderRadius: 999 }}>{t.badge}</span> : null}</button>)}
      </div>
      {children}
    </Page>
  );
}

// Route-backed dashboard tabs: derive the active tab from the hash and switch by navigating, so
// each tab is a real browser-history entry. That makes the browser Back button return to the
// previous tab instead of jumping out of the dashboard - no "back" text links needed.
function useRouteTab(base, tabIds, defaultTab) {
  const route = useRoute();
  const m = route.match(new RegExp("^#" + base + "/([a-z]+)"));
  const tab = m && tabIds.indexOf(m[1]) !== -1 ? m[1] : defaultTab;
  const setTab = (id) => navigate(id === defaultTab ? base : base + "/" + id);
  return [tab, setTab];
}

// ═══ Reporter dashboard ════════════════════════════════════════════
function ReporterDashboard() {
  const store = useStore();
  // Greet a brand-new reporter with "Welcome"; returning reporters with "Nice to see you". Capture the
  // flag once on mount so the title is stable, then clear it so later visits read as returns.
  const [firstVisit] = useState(store.justJoined);
  useEffect(() => { if (store.justJoined) store.clearJustJoined(); }, []);
  const [tab, setTab] = useRouteTab("/reporter", ["overview", "profile", "payments", "invoices", "messages"], "overview");
  const [inviteOpen, setInviteOpen] = useState(false);
  // Returning from real Stripe onboarding lands here – treat the reporter as signed in.
  // Being on the reporter dashboard means you're acting as the reporter - set the role if it
  // isn't already, so navigating straight here (no explicit login) still treats you as the owner
  // on your own public profile (otherwise rates/edits look gated, as to an outside viewer).
  useEffect(() => { if (store.role !== "reporter") store.enterAsReporter(); }, []);
  const me = useMemo(() => { const all = buildDirectory(); const base = all.find((x) => x.id === store.myCsr) || all.find((x) => x.claimed); return { ...base, ...store.myProfile }; }, [store.myCsr, store.myProfile]);
  const invoices = store.invoices;
  const unread = store.convos.reduce((n, c) => n + c.unread, 0);
  const paidThisMonth = invoices.filter((i) => i.status === "paid").reduce((s, i) => s + i.amount, 0);
  const outstanding = invoices.filter((i) => i.status === "sent" || i.status === "overdue").reduce((s, i) => s + i.amount, 0);
  // Feel-good "money kept from an agency" ESTIMATE (see docs/roadmap.md + the never-invent-data rule).
  // Benchmark = the real ~39% agency cut from research/agency_invoice_evidence.md - the same invoice
  // the homepage money-comparison uses - minus the reporter's small DS fee. Always labeled an estimate;
  // in the prototype it's computed from the demo invoices. Cheap read-time calc, no background job.
  const AGENCY_CUT = 0.39, DS_FEE = 0.05;
  const estSavedVsAgency = Math.round(paidThisMonth * (AGENCY_CUT - DS_FEE));

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "profile", label: "My profile" },
    { id: "payments", label: "Payments" },
    { id: "invoices", label: "Invoices" },
    { id: "messages", label: "Messages", badge: unread || null },
  ];

  return (
    <DashLayout title={(firstVisit ? "Welcome, " : "Nice to see you, ") + me.name.split(" ")[0]} subtitle={"CSR #" + me.csrNumber + " · " + (isOutOfState(me) ? "Out of state" : me.city + ", CA")} tabs={tabs} active={tab} onTab={setTab}
      headerRight={
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <button className="btn btn-secondary" onClick={() => setTab("profile")}>Edit profile</button>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <button className="btn btn-primary" onClick={() => navigate("/reporter/invoices/new")}><Icon name="plus" size={16} /> New invoice</button>
            <button onClick={() => navigate("/reporters/" + me.id)} style={{ background: "none", border: "none", color: "var(--brand)", cursor: "pointer", fontSize: 13, fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 5, padding: 0 }}><Icon name="eye" size={14} /> View public profile</button>
          </div>
        </div>
      }>
      <div className="ds-note"><Icon name="info" size={15} style={{ flexShrink: 0, color: "var(--dim)" }} /><span><strong style={{ fontWeight: 600, color: "var(--ink-soft)" }}>Sample data</strong> – the invoices, payments, stats, and messages here are illustrative placeholders for the prototype.</span></div>
      {tab === "overview" && (
        <>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
          <StatCard icon="dollar" label="Paid this month" value={"$" + paidThisMonth.toLocaleString(undefined, { minimumFractionDigits: 2 })} sub={"Est. ~$" + estSavedVsAgency.toLocaleString() + " saved vs. an agency"} />
          <StatCard icon="invoice" label="Outstanding" value={"$" + outstanding.toLocaleString(undefined, { minimumFractionDigits: 2 })} sub="Invoiced, awaiting payment" />
          <StatCard icon="eye" label="Profile views (30d)" value={me.views} sub={(me.saves || 0) + " firms saved your profile"} />

          <div className="ds-card flat" style={{ gridColumn: "1 / -1", marginTop: 20, display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap", background: "var(--brand-soft)", borderColor: "var(--brand-pale)" }}>
            <div style={{ width: 46, height: 46, borderRadius: 12, background: "var(--brand)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name="mail" size={22} /></div>
            <div style={{ flex: 1, minWidth: 220 }}>
              <div style={{ fontWeight: 700, color: "var(--brand-dark)" }}>Invite the firms you already work with</div>
              <div style={{ fontSize: 14, color: "var(--ink-soft)", marginTop: 2 }}>Send your profile to firms you know, or drop your profile link in the chat at a remote hearing. They join free and save you as a favorite, so you can be contacted easily and are first in mind next time they need a reporter{store.invitedFirms.length ? " · " + store.invitedFirms.length + " invited" : ""}.</div>
            </div>
            <button className="btn btn-primary" onClick={() => setInviteOpen(true)}><Icon name="mail" size={16} /> Invite a law firm</button>
          </div>
        </div>
        {inviteOpen && <InviteFirmModal me={me} onClose={() => setInviteOpen(false)} />}
        </>
      )}

      {tab === "profile" && <ReporterProfileEditor me={me} />}
      {tab === "payments" && <ReporterPayments invoices={invoices} paidThisMonth={paidThisMonth} />}
      {tab === "invoices" && <ReporterInvoices />}
      {tab === "messages" && <MessagesPanel embedded />}
    </DashLayout>
  );
}

function StatCard({ icon, label, value, onClick, sub }) {
  return (
    <div className="ds-card" onClick={onClick} style={{ cursor: onClick ? "pointer" : "default", display: "flex", flexDirection: "column", gap: 12, boxShadow: "inset 3px 0 0 0 var(--ink), 0 1px 3px rgba(15,23,42,0.05), 0 12px 30px -16px rgba(15,23,42,0.14)" }}>
      <span style={{ color: "var(--brand)", display: "flex", marginTop: -6 }}><Icon name={icon} size={20} /></span>
      <div style={{ marginTop: 10 }}><div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 30, color: "var(--ink)", lineHeight: 1 }}>{value}</div><div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>{label}</div>{sub ? <div style={{ fontSize: 11.5, color: "var(--dim)", marginTop: 6, lineHeight: 1.4 }}>{sub}</div> : null}</div>
    </div>
  );
}

// Shared bits for the editable profile form.
// Availability is a self-set accepting-jobs toggle (note: activity_signal_design.md chose a
// computed "Recently active" signal; this accepting switch is a separate, complementary axis).
function ToggleSwitch({ on, onClick }) {
  return (
    <button type="button" role="switch" aria-checked={on} onClick={onClick} style={{ width: 46, height: 27, borderRadius: 999, border: "none", cursor: "pointer", padding: 3, background: on ? "var(--brand)" : "var(--rule-strong)", display: "inline-flex", alignItems: "center", flexShrink: 0, transition: "background .15s ease" }}>
      <span style={{ width: 21, height: 21, borderRadius: "50%", background: "#fff", display: "block", transform: on ? "translateX(19px)" : "translateX(0)", transition: "transform .15s ease", boxShadow: "0 1px 2px rgba(0,0,0,.25)" }} />
    </button>
  );
}
function chipStyle(on) {
  return { fontSize: 13, padding: "6px 13px", borderRadius: 999, cursor: "pointer", fontFamily: "'Inter', sans-serif",
    border: on ? "1px solid var(--brand)" : "1px solid var(--rule-strong)", background: on ? "var(--brand-soft)" : "var(--bg)",
    color: on ? "var(--brand-dark)" : "var(--ink-soft)", fontWeight: on ? 600 : 400, display: "inline-flex", alignItems: "center", gap: 5 };
}
function FieldBlock({ label, hint, children }) {
  return (
    <div>
      <label className="ds-label" style={{ marginBottom: hint ? 3 : 7 }}>{label}</label>
      {hint ? <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 9, lineHeight: 1.5 }}>{hint}</div> : null}
      {children}
    </div>
  );
}
// Toggle chips for a small fixed list (proceedings, services, languages, credentials, availability).
function ChipToggle({ options, selected, onToggle, extra }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {options.map((opt) => {
        const val = typeof opt === "string" ? opt : opt.code;
        const label = typeof opt === "string" ? opt : opt.label;
        const on = selected.includes(val);
        return <button key={val} type="button" onClick={() => onToggle(val)} style={chipStyle(on)}>{on ? <Icon name="check" size={13} /> : null}{label}</button>;
      })}
      {extra || null}
    </div>
  );
}
// Search-to-add picker with removable chips, for long lists (areas of law, counties). allowOther
// lets the reporter add a value not in the list.
function TagSearchAdd({ options, selected, onChange, placeholder, allowOther }) {
  const [q, setQ] = useState("");
  const query = q.trim();
  const lower = query.toLowerCase();
  const matches = query ? options.filter((o) => !selected.includes(o) && o.toLowerCase().indexOf(lower) !== -1).slice(0, 8) : [];
  const exists = !query || options.some((o) => o.toLowerCase() === lower) || selected.some((o) => o.toLowerCase() === lower);
  const add = (v) => { if (v && !selected.includes(v)) onChange(selected.concat([v])); setQ(""); };
  return (
    <div>
      {selected.length > 0 ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
          {selected.map((v) => (
            <span key={v} className="pill pill-verified" style={{ fontSize: 13, padding: "6px 8px 6px 13px", display: "inline-flex", alignItems: "center", gap: 7 }}>
              {v}
              <button type="button" onClick={() => onChange(selected.filter((x) => x !== v))} aria-label={"Remove " + v} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: "var(--brand-dark)", display: "flex" }}><Icon name="x" size={12} /></button>
            </span>
          ))}
        </div>
      ) : null}
      <div style={{ position: "relative" }}>
        <input className="ds-input" value={q} onChange={(e) => setQ(e.target.value)} placeholder={placeholder} onKeyDown={(e) => { if (e.key === "Enter" && allowOther && query) { e.preventDefault(); add(query); } }} />
        {(matches.length > 0 || (allowOther && query && !exists)) ? (
          <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, zIndex: 5, background: "var(--bg)", border: "1px solid var(--rule-strong)", borderRadius: 10, boxShadow: "var(--shadow-md)", overflow: "hidden", maxHeight: 240, overflowY: "auto" }}>
            {matches.map((m) => <button key={m} type="button" onClick={() => add(m)} style={{ display: "block", width: "100%", textAlign: "left", padding: "9px 13px", background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "var(--ink-soft)" }}>{m}</button>)}
            {allowOther && query && !exists ? <button type="button" onClick={() => add(query)} style={{ display: "flex", alignItems: "center", gap: 6, width: "100%", textAlign: "left", padding: "9px 13px", background: "var(--bg-soft)", border: "none", cursor: "pointer", fontSize: 14, color: "var(--brand-dark)", fontWeight: 500 }}><Icon name="plus" size={13} /> Add "{query}"</button> : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
// One rate line: an optional low and high. Blank = not shown; one = set rate; both = a range.
function RateRow({ label, unit, value, onChange, extra }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
      <div style={{ flex: 1, minWidth: 150 }}>
        <div style={{ fontSize: 14, color: "var(--ink)" }}>{label}</div>
        <div style={{ fontSize: 12, color: "var(--dim)" }}>{unit}</div>
      </div>
      {extra || null}
      <input className="ds-input" style={{ width: 82 }} placeholder="Low" value={value.low} onChange={(e) => onChange({ low: e.target.value, high: value.high })} />
      <span style={{ color: "var(--dim)" }}>–</span>
      <input className="ds-input" style={{ width: 82 }} placeholder="High" value={value.high} onChange={(e) => onChange({ low: value.low, high: e.target.value })} />
    </div>
  );
}
function ReporterProfileEditor({ me }) {
  const store = useStore();
  const [toast, setToast] = useState("");
  const counties = useMemo(() => Array.from(new Set(buildDirectory().map((r) => r.county).filter((c) => c && c !== "Out of State"))).sort(), []);
  const [photo, setPhoto] = useState(me.photo || "");
  const [bio, setBio] = useState(me.bio || "");
  const [years, setYears] = useState(me.yearsExp || "");
  const [proceedings, setProceedings] = useState(me.proceedings || []);
  const [services, setServices] = useState(me.services || []);
  const [areas, setAreas] = useState(me.specialties || []);
  const [languages, setLanguages] = useState(me.languages || []);
  const [certs, setCerts] = useState(() => CREDENTIAL_TYPES.map((c) => c.code).filter((code) => (me.certifications || []).some((x) => x.indexOf(code) !== -1)));
  const [coverage, setCoverage] = useState(me.coverage || []);
  const [otherStates, setOtherStates] = useState(me.otherStates || []);
  const [notary, setNotary] = useState(!!me.notary);
  const [rush, setRush] = useState(!!me.rush);
  // Draft, seeded from the saved value. Committed to the store on Save, then read by the profile.
  const [accepting, setAccepting] = useState(store.myAccepting);
  const [showRates, setShowRates] = useState(!!me.publishRates);
  const blankRates = { pageOriginal: { low: "", high: "" }, pageCopy: { low: "", high: "" }, halfDay: { low: "", high: "" }, fullDay: { low: "", high: "" }, trialDay: { low: "", high: "" }, expedited: { low: "", high: "" }, realtime: { low: "", high: "" } };
  const [rates, setRates] = useState(() => (me._rateDraft && me._rateDraft.rates) || blankRates);
  const [expUnit, setExpUnit] = useState((me._rateDraft && me._rateDraft.expUnit) || "percent");
  const [customRates, setCustomRates] = useState(() => (me._rateDraft && me._rateDraft.customRates) || []);

  const toggleIn = (setter) => (v) => setter((cur) => cur.includes(v) ? cur.filter((x) => x !== v) : cur.concat([v]));
  const setRate = (key) => (val) => setRates((r) => Object.assign({}, r, { [key]: val }));
  const updateCustom = (i, k, v) => setCustomRates((cur) => cur.map((c, j) => j === i ? Object.assign({}, c, { [k]: v }) : c));
  const photoPick = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result);
    reader.readAsDataURL(f);
  };

  // Format one rate line for the public profile: "$low–$high", "$one", or a % surcharge.
  const rateStr = (v) => {
    const lo = (v.low || "").toString().trim(), hi = (v.high || "").toString().trim();
    if (!lo && !hi) return null;
    return lo && hi ? "$" + lo + "–$" + hi : "$" + (lo || hi);
  };
  const expStr = (v) => {
    const lo = (v.low || "").toString().trim(), hi = (v.high || "").toString().trim();
    if (!lo && !hi) return null;
    if (expUnit !== "percent") return rateStr(v);
    return lo && hi ? lo + "%–" + hi + "%" : "+" + (lo || hi) + "%";
  };
  const buildRateLines = () => [
    ["Transcript – original (per page)", rateStr(rates.pageOriginal)],
    ["Transcript – copy (per page)", rateStr(rates.pageCopy)],
    ["Appearance – half day", rateStr(rates.halfDay)],
    ["Appearance – full day", rateStr(rates.fullDay)],
    ["Trial day", rateStr(rates.trialDay)],
    ["Expedited / rush", expStr(rates.expedited)],
    ["Realtime / rough draft add-on", rateStr(rates.realtime)],
  ].concat(customRates.map((c) => [(c.label || "").trim(), rateStr({ low: c.low, high: c.high })]))
   .filter(([label, val]) => label && val);

  const saveProfile = () => {
    const rateLines = buildRateLines();
    store.saveMyProfile({
      photo, bio, yearsExp: years, proceedings, services, specialties: areas, languages,
      certifications: ["CSR #" + me.csrNumber].concat(certs), coverage, otherStates, notary, rush,
      publishRates: showRates, rateLines, _rateDraft: { rates, expUnit, customRates },
    });
    store.setMyAccepting(accepting);
    setToast("Profile saved");
  };

  return (
    <div style={{ maxWidth: 720, display: "flex", flexDirection: "column", gap: 22 }}>
      <FieldBlock label="Profile photo" hint="A clear headshot helps firms recognize you. Optional.">
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Avatar name={me.name} size={72} claimed photo={photo} />
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <label className="btn btn-secondary" style={{ cursor: "pointer" }}><Icon name="user" size={16} /> {photo ? "Change photo" : "Upload photo"}<input type="file" accept="image/*" onChange={photoPick} style={{ display: "none" }} /></label>
            {photo ? <button className="btn btn-secondary" onClick={() => setPhoto("")}>Remove</button> : null}
          </div>
        </div>
      </FieldBlock>

      <FieldBlock label="Bio">
        <textarea className="ds-input" rows={4} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="A few sentences about your practice, experience, and how you work." />
      </FieldBlock>

      <div style={{ maxWidth: 200 }}>
        <FieldBlock label="Years of experience">
          <input className="ds-input" type="number" min="0" value={years} onChange={(e) => setYears(e.target.value)} placeholder="Years" />
        </FieldBlock>
      </div>

      <FieldBlock label="Proceedings covered"><ChipToggle options={PROCEEDING_TYPES} selected={proceedings} onToggle={toggleIn(setProceedings)} /></FieldBlock>
      <FieldBlock label="Services offered"><ChipToggle options={SERVICE_TYPES} selected={services} onToggle={toggleIn(setServices)} extra={<><button type="button" onClick={() => setRush(!rush)} style={chipStyle(rush)}>{rush ? <Icon name="check" size={13} /> : null}Accepts rush / expedited</button><button type="button" onClick={() => setNotary(!notary)} style={chipStyle(notary)}>{notary ? <Icon name="check" size={13} /> : null}Notary public</button></>} /></FieldBlock>
      <FieldBlock label="Area of law" hint="Pick from the California State Bar list, or type your own and press Enter to add it.">
        <TagSearchAdd options={SPECIALTY_TYPES} selected={areas} onChange={setAreas} placeholder="Search areas of law, or type your own" allowOther />
      </FieldBlock>
      <FieldBlock label="Languages" hint="Languages you work in besides English. Pick from the list or type your own to add it."><TagSearchAdd options={LANGUAGES} selected={languages} onChange={setLanguages} placeholder="Search languages, or type your own" allowOther /></FieldBlock>
      <FieldBlock label="Certifications"><ChipToggle options={CREDENTIAL_TYPES} selected={certs} onToggle={toggleIn(setCerts)} /></FieldBlock>
      <FieldBlock label="Counties covered"><TagSearchAdd options={counties} selected={coverage} onChange={setCoverage} placeholder="Search California counties" /></FieldBlock>
      <FieldBlock label="Also certified in" hint="Other states where you're licensed or certified. California is your base directory, so it's not listed here."><TagSearchAdd options={US_STATES} selected={otherStates} onChange={setOtherStates} placeholder="Search states" /></FieldBlock>
      <FieldBlock label="Availability" hint="When this is off, you still appear in search and firms can still message you (say, to ask for a past transcript) - your profile just shows that you're not taking new work right now.">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <ToggleSwitch on={accepting} onClick={() => setAccepting(!accepting)} />
          <span style={{ fontSize: 14, fontWeight: 500, color: accepting ? "var(--ink)" : "var(--muted)" }}>{accepting ? "Accepting jobs" : "Not accepting jobs right now"}</span>
        </div>
      </FieldBlock>

      <div style={{ borderTop: "1px solid var(--rule)", paddingTop: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
          <div style={{ flex: 1, minWidth: 240 }}>
            <label className="ds-label" style={{ marginBottom: 3 }}>Rates</label>
            <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.5 }}>Share as much or as little as you like - one number for a set rate, a low and high for a range, or leave a line blank to keep it private.</div>
          </div>
          <button type="button" onClick={() => setShowRates(!showRates)} style={chipStyle(showRates)}>{showRates ? <Icon name="eye" size={13} /> : null}{showRates ? "Shown on profile" : "Hidden - tap to show"}</button>
        </div>
        {showRates ? (
          <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 14 }}>
            <RateRow label="Per page - original transcript" unit="$ per page" value={rates.pageOriginal} onChange={setRate("pageOriginal")} />
            <RateRow label="Per page - each copy" unit="$ per page" value={rates.pageCopy} onChange={setRate("pageCopy")} />
            <RateRow label="Half day - appearance" unit="$ per half day" value={rates.halfDay} onChange={setRate("halfDay")} />
            <RateRow label="Full day - appearance" unit="$ per day" value={rates.fullDay} onChange={setRate("fullDay")} />
            <RateRow label="Trial day" unit="$ per day" value={rates.trialDay} onChange={setRate("trialDay")} />
            <RateRow label="Expedited / rush" unit={expUnit === "percent" ? "% surcharge on base rate" : "$ per page"} value={rates.expedited} onChange={setRate("expedited")} extra={<select className="ds-input" style={{ width: 162 }} value={expUnit} onChange={(e) => setExpUnit(e.target.value)}><option value="percent">% surcharge</option><option value="perpage">Per page</option></select>} />
            <RateRow label="Realtime / rough draft add-on" unit="$ per page or day" value={rates.realtime} onChange={setRate("realtime")} />
            {customRates.map((cr, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <input className="ds-input" style={{ flex: 1, minWidth: 150 }} placeholder="Rate name (e.g. Interpreter surcharge)" value={cr.label} onChange={(e) => updateCustom(i, "label", e.target.value)} />
                <input className="ds-input" style={{ width: 82 }} placeholder="Low" value={cr.low} onChange={(e) => updateCustom(i, "low", e.target.value)} />
                <span style={{ color: "var(--dim)" }}>–</span>
                <input className="ds-input" style={{ width: 82 }} placeholder="High" value={cr.high} onChange={(e) => updateCustom(i, "high", e.target.value)} />
                <button type="button" onClick={() => setCustomRates(customRates.filter((_, j) => j !== i))} aria-label="Remove rate" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--dim)", display: "flex" }}><Icon name="x" size={16} /></button>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "flex-end" }}><button type="button" onClick={() => setCustomRates(customRates.concat([{ label: "", low: "", high: "" }]))} style={{ background: "none", border: "none", color: "var(--brand-dark)", cursor: "pointer", fontSize: 13, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 2px" }}><Icon name="plus" size={14} /> Add another rate</button></div>
          </div>
        ) : null}
      </div>

      <div style={{ display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
        <button className="btn btn-primary" onClick={saveProfile}><Icon name="check" size={16} /> Save changes</button>
        <button onClick={() => navigate("/reporters/" + me.id)} style={{ background: "none", border: "none", color: "var(--brand)", cursor: "pointer", fontSize: 14, fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 6, padding: 0 }}><Icon name="eye" size={15} /> View public profile</button>
      </div>
      <Toast msg={toast} onClose={() => setToast("")} />
    </div>
  );
}

function ReporterPayments({ invoices, paidThisMonth }) {
  const paid = invoices.filter((i) => i.status === "paid");
  const [modalInv, setModalInv] = useState(null);
  // What firms owe right now – the honest figure the platform can actually compute. A fixed "next
  // payout" date was fabricated: DS can't know when a firm will pay, and a payout date only exists
  // once Stripe reports money in transit. See docs/integration_checklist.md §3.
  const awaiting = invoices.filter((i) => i.status === "sent" || i.status === "overdue").reduce((s, i) => s + i.amount, 0);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
        <StatCard icon="dollar" label="Paid this month" value={"$" + paidThisMonth.toLocaleString(undefined, { minimumFractionDigits: 2 })} />
        <StatCard icon="clock" label="Awaiting payment" value={"$" + awaiting.toLocaleString(undefined, { minimumFractionDigits: 2 })} />
        <StatCard icon="invoice" label="Payments received" value={paid.length} />
      </div>
      <div className="ds-card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "18px 22px", borderBottom: "1px solid var(--rule)" }}><h3 style={{ fontSize: 22 }}>Recent payments</h3></div>
        <div style={{ overflowX: "auto" }}>
          <table className="ds-table">
            <thead><tr><th>Invoice</th><th>Client</th><th>Method</th><th>Date</th><th style={{ textAlign: "right" }}>Amount</th></tr></thead>
            <tbody>{paid.length ? paid.map((i) => <tr key={i.id} style={{ cursor: "pointer" }} onClick={() => setModalInv(i)}><td style={{ fontWeight: 600, color: "var(--ink)" }}>{i.id}</td><td>{i.client}</td><td>{i.method || "Card"}</td><td>{i.date}</td><td style={{ textAlign: "right", fontWeight: 600, color: "var(--ink)" }}>${i.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td></tr>) : <tr><td colSpan={5} style={{ textAlign: "center", color: "var(--muted)", padding: 30 }}>No payments yet.</td></tr>}</tbody>
          </table>
        </div>
      </div>
      {modalInv && <InvoiceModal inv={modalInv} viewer="reporter" onClose={() => setModalInv(null)} />}
    </div>
  );
}

// The reporter's plan chooser (pay-per-invoice vs Pro). Lives in Settings now, not the dashboard.
// Current plan is outlined; the switch button sits on the OTHER card - same pattern as the firm's.
function ReporterPlanCards() {
  const store = useStore();
  const isPro = store.reporterPlan === "pro";
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12, alignItems: "stretch" }}>
      {/* Each panel is header-group + button as two flex children, with a generous gap (28) between
          them - so the button always has clear room above it (min 28, more when the panel stretches),
          while the header and description stay tight (10). */}
      <div className="ds-panel" style={{ display: "flex", flexDirection: "column", gap: 28, ...(!isPro ? { border: "2px solid var(--ink)" } : null) }}>
        <div>
          <span style={{ fontWeight: 700, color: "var(--ink)" }}>Pay per invoice{!isPro && <span className="pill pill-tag" style={{ marginLeft: 6 }}>Current</span>}</span>
          <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 24, color: "var(--ink)", lineHeight: 1, marginTop: 12 }}>5%<span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12.5, color: "var(--muted)", fontWeight: 400 }}> per payment</span></div>
          <p style={{ fontSize: 13.5, color: "var(--muted)", margin: "10px 0 0", lineHeight: 1.55 }}>No monthly cost. Best if you invoice occasionally.</p>
        </div>
        {isPro && <button className="btn btn-secondary" style={{ marginTop: "auto", justifyContent: "center" }} onClick={() => store.downgradeReporter()}>Switch to pay-per-invoice</button>}
      </div>
      <div className="ds-panel" style={{ display: "flex", flexDirection: "column", gap: 28, ...(isPro ? { border: "2px solid var(--ink)" } : null) }}>
        <div>
          <span style={{ fontWeight: 700, color: "var(--ink)" }}>Pro{isPro && <span className="pill pill-tag" style={{ marginLeft: 6 }}>Current</span>}</span>
          <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 24, color: "var(--ink)", lineHeight: 1, marginTop: 12 }}>$29<span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12.5, color: "var(--muted)", fontWeight: 400 }}>/month + 2% per payment</span></div>
          <p style={{ fontSize: 13.5, color: "var(--muted)", margin: "10px 0 0", lineHeight: 1.55 }}>A lower per-payment fee. Best once you invoice often or in large amounts.</p>
        </div>
        {!isPro && <button className="btn btn-primary" style={{ marginTop: "auto", justifyContent: "center" }} onClick={() => store.upgradeReporter()}><Icon name="arrow" size={16} /> Switch to Pro</button>}
      </div>
    </div>
  );
}

// ═══ Invite a firm (reporter brings their own clients) ═════════════
function InviteFirmModal({ me, onClose }) {
  const store = useStore();
  const first = me.name.split(" ")[0];
  const link = "https://dsmvp.vercel.app/#/invite/" + me.id;
  const [firm, setFirm] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("Hi there,\n\nI'm now listed on Dewey Sholes, where you can hire me, message me, and pay my invoices in one place. It's free for your firm to join, and you can pay me by card or ACH right from your account.\n\nCreate your free account and save my profile here:\n" + link + "\n\nThanks,\n" + first);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState("");
  const emailValid = /.+@.+\..+/.test(email);
  const who = firm.trim() || "the firm";
  const send = () => { store.inviteFirm({ name: firm.trim() || email.trim(), email: email.trim(), at: "Just now" }); setSent(true); };
  const copy = (text, which) => { navigator.clipboard.writeText(text); setCopied(which); setTimeout(() => setCopied(""), 1800); };
  const subhead = { fontSize: 12.5, fontWeight: 700, fontFamily: "'Inter', sans-serif", color: "var(--brand)", textTransform: "uppercase", letterSpacing: ".05em" };
  const copyLink = { background: "none", border: "none", color: "var(--brand-dark)", cursor: "pointer", fontSize: 13, fontWeight: 600, padding: 4 };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="ds-card" style={{ maxWidth: 540, width: "92%", maxHeight: "88vh", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
        {sent ? (
          <div style={{ textAlign: "center", padding: "8px 4px" }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: "var(--brand-soft)", color: "var(--brand-dark)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}><Icon name="mail" size={26} /></div>
            <h3 style={{ fontSize: 22 }}>Invite sent to {who}</h3>
            <p style={{ color: "var(--muted)", marginTop: 10, lineHeight: 1.6, fontSize: 14.5 }}>When they join, {who} is saved to your firm list automatically and can pay your invoices here, so you stay first in mind for their next job.</p>
            <p style={{ color: "var(--dim)", marginTop: 10, fontSize: 12.5 }}>Prototype: no email is actually sent.</p>
            <button className="btn btn-primary" style={{ marginTop: 18 }} onClick={onClose}><Icon name="check" size={16} /> Done</button>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
              <div>
                <h3 style={{ fontSize: 24 }}>Invite a law firm</h3>
                <p style={{ color: "var(--muted)", marginTop: 6, fontSize: 14, lineHeight: 1.55 }}>Bring a firm you already work with. They join free, save you as a favorite, and can pay your invoices here.</p>
              </div>
              <button onClick={onClose} title="Close" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--dim)", padding: 4, flexShrink: 0 }}><Icon name="x" size={20} /></button>
            </div>

            <div style={{ marginTop: 20 }}>
              <div style={subhead}>Send through your own email</div>
              <p style={{ color: "var(--muted)", fontSize: 12.5, margin: "5px 0 10px", lineHeight: 1.5 }}>Copy your profile link and paste it into an email from your own account.</p>
              <div className="ds-panel" style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12.5, color: "var(--muted)", padding: "10px 12px" }}>
                <Icon name="link" size={15} style={{ flexShrink: 0 }} /> <span style={{ fontFamily: "'JetBrains Mono', monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>{link}</span>
                <button className="btn btn-secondary" style={{ padding: "4px 10px", fontSize: 12.5, flexShrink: 0 }} onClick={() => copy(link, "link")}>{copied === "link" ? "Copied!" : "Copy"}</button>
              </div>
            </div>

            <div style={{ marginTop: 20 }}>
              <div style={subhead}>Or send through Dewey Sholes</div>
              <p style={{ color: "var(--muted)", fontSize: 12.5, margin: "5px 0 12px", lineHeight: 1.5 }}>We'll email the firm your invite – add their email and hit Send.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div><label className="ds-label">Firm name <span style={{ color: "var(--dim)", fontWeight: 400 }}>(optional)</span></label><input className="ds-input" placeholder="Morgan & Reyes LLP" value={firm} onChange={(e) => setFirm(e.target.value)} /></div>
                  <div><label className="ds-label">Contact email</label><input className="ds-input" type="email" placeholder="office@firm.com" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                </div>
                <div><label className="ds-label">Message</label><textarea className="ds-input" rows={6} value={msg} onChange={(e) => setMsg(e.target.value)} style={{ resize: "vertical", lineHeight: 1.5 }} /></div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
              <button onClick={() => copy(msg, "msg")} style={copyLink}>{copied === "msg" ? "Message copied!" : "Copy the message"}</button>
              <div style={{ display: "flex", gap: 10 }}>
                <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                <button className="btn btn-primary" disabled={!emailValid} style={{ opacity: emailValid ? 1 : 0.4 }} onClick={send}><Icon name="mail" size={16} /> Send</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
