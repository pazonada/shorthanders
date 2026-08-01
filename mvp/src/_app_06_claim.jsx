// ═══ Claim front door: a reporter shows up and finds their record ══
const claimLinkBtn = { background: "none", border: "none", color: "var(--brand-dark)", fontWeight: 600, cursor: "pointer", padding: 0, fontSize: "inherit" };

// One "Sign up" entry that asks which side you're on, instead of making the visitor
// self-classify from a link. The two flows genuinely differ (a reporter claims an existing
// license record; a firm creates a new account), so the fork has to happen somewhere - this
// makes it an explicit, explained choice rather than a guess at a link.
function SignupChooser() {
  const Choice = ({ icon, eyebrow, title, body, cta, to }) => (
    <button onClick={() => navigate(to)} className="ds-card"
      style={{ textAlign: "left", cursor: "pointer", display: "flex", flexDirection: "column", gap: 12, border: "1px solid var(--rule)", background: "var(--bg)" }}>
      <div style={{ width: 46, height: 46, borderRadius: 12, background: "var(--brand-soft)", color: "var(--brand-dark)", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name={icon} size={23} /></div>
      <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--brand-dark)", textTransform: "uppercase", letterSpacing: ".04em" }}>{eyebrow}</span>
      <h3 style={{ fontSize: 22 }}>{title}</h3>
      <p style={{ color: "var(--muted)", fontSize: 14.5, lineHeight: 1.6, flex: 1 }}>{body}</p>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 7, color: "var(--brand-dark)", fontWeight: 600, fontSize: 15, marginTop: 2 }}>{cta} <Icon name="arrow" size={16} /></span>
    </button>
  );
  return (
    <Page>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <h1 style={{ fontSize: "clamp(34px, 4.4vw, 54px)" }}>Sign up</h1>
          <p style={{ fontSize: 17, color: "var(--ink-soft)", marginTop: 14, lineHeight: 1.6 }}>Which describes you? This just points you to the right first step.</p>
        </div>
        <div className="ds-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          <Choice icon="user" eyebrow="I'm a court reporter" title="Claim your profile"
            body="You're already listed – every licensed California CSR is. Find your record, control how firms see you, and start invoicing. Free to claim."
            cta="Claim your profile" to="/claim" />
          <Choice icon="building" eyebrow="I'm a law firm" title="Create a firm account"
            body="Search every licensed reporter in California, message them directly, and pay invoices online. Free to sign up."
            cta="Create a firm account" to="/firm-signup" />
        </div>
        <p style={{ textAlign: "center", color: "var(--muted)", fontSize: 14, marginTop: 26 }}>Already have an account? <button onClick={() => navigate("/")} style={claimLinkBtn}>Log in</button></p>
      </div>
    </Page>
  );
}

function ClaimStart() {
  const all = useMemo(() => buildDirectory(), []);
  const [mode, setMode] = useState("license");  // license | name
  const [q, setQ] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const results = useMemo(() => {
    if (!submitted) return null;
    const needle = q.trim().toLowerCase();
    if (!needle) return [];
    if (mode === "license") {
      const digits = needle.replace(/\D/g, "");
      return digits ? all.filter((r) => r.csrNumber === digits) : [];
    }
    return all.filter((r) => r.name.toLowerCase().includes(needle)).slice(0, 15);
  }, [submitted, q, mode, all]);

  const run = () => setSubmitted(true);

  return (
    <Page>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div style={{ textAlign: "center" }}>
          <span className="pill pill-tag" style={{ marginBottom: 14, display: "inline-flex" }}>Free to claim & get listed</span>
          <h1 style={{ fontSize: "clamp(34px, 4.4vw, 54px)" }}>Claim your profile</h1>
          <p style={{ fontSize: 17, color: "var(--ink-soft)", marginTop: 14, lineHeight: 1.6 }}>
            You're already listed – every licensed California CSR is. Find your record to control how firms see you, then start invoicing and getting paid. It takes about three minutes.
          </p>
        </div>

        <div className="ds-card" style={{ marginTop: 26 }}>
          <div className="ds-tabs" style={{ marginBottom: 18 }}>
            <button className={"ds-tab" + (mode === "license" ? " on" : "")} onClick={() => { setMode("license"); setSubmitted(false); }}>By license number</button>
            <button className={"ds-tab" + (mode === "name" ? " on" : "")} onClick={() => { setMode("name"); setSubmitted(false); }}>By name</button>
          </div>
          <label className="ds-label">{mode === "license" ? "Your CSR license number" : "Your name"}</label>
          <div style={{ display: "flex", gap: 10 }}>
            <input className="ds-input" placeholder={mode === "license" ? "e.g. 12345" : "e.g. Jordan Rivera"} value={q}
              onChange={(e) => { setQ(e.target.value); setSubmitted(false); }}
              onKeyDown={(e) => { if (e.key === "Enter") run(); }} />
            <button className="btn btn-primary" style={{ whiteSpace: "nowrap" }} onClick={run}><Icon name="search" size={16} /> Find me</button>
          </div>
          <p style={{ fontSize: 12.5, color: "var(--dim)", marginTop: 10 }}>Don't know your number? <button onClick={() => navigate("/directory")} style={claimLinkBtn}>Browse the full directory</button> instead.</p>
        </div>

        {results && (
          <div style={{ marginTop: 22 }}>
            {results.length === 0 ? (
              <div className="ds-panel" style={{ textAlign: "center", padding: 32 }}>
                <p style={{ color: "var(--muted)" }}>No active CSR found for that {mode === "license" ? "license number" : "name"}. Double-check it, or <button onClick={() => navigate("/directory")} style={claimLinkBtn}>browse the directory</button>.</p>
              </div>
            ) : (
              <>
                <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 12 }}>{results.length === 1 ? "Is this you?" : "Pick your record:"}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>{results.map((r) => <ClaimMatch key={r.id} r={r} />)}</div>
              </>
            )}
          </div>
        )}

        <div style={{ display: "flex", gap: 22, justifyContent: "center", marginTop: 30, flexWrap: "wrap", fontSize: 13, color: "var(--muted)" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name="dollar" size={14} /> Free forever</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name="shield" size={14} /> Verify once with Stripe</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name="eye" size={14} /> You control your listing</span>
        </div>
      </div>
    </Page>
  );
}

function ClaimMatch({ r }) {
  const store = useStore();
  return (
    <div className="ds-card" style={{ display: "flex", alignItems: "center", gap: 16, padding: 18 }}>
      <Avatar name={r.name} size={48} claimed={r.claimed} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 20, lineHeight: 1.1 }}>{r.name}</div>
        <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>CSR #{r.csrNumber} · {isOutOfState(r) ? "Out of state" : r.city + (r.county ? ", " + r.county + " County" : "")}</div>
      </div>
      {r.claimed ? (
        <div style={{ textAlign: "right", display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
          <span className="pill pill-claimed"><Icon name="check" size={13} /> Already claimed</span>
          <button onClick={() => { store.enterAsReporter(); navigate("/reporter"); }} style={claimLinkBtn}>Is this you? Sign in</button>
        </div>
      ) : (
        <button className="btn btn-primary" style={{ whiteSpace: "nowrap" }} onClick={() => navigate("/claim/" + r.id)}>This is me <Icon name="arrow" size={16} /></button>
      )}
    </div>
  );
}

function AlreadyClaimed({ r }) {
  const store = useStore();
  return (
    <Page>
      <div className="ds-card" style={{ maxWidth: 520, margin: "20px auto", textAlign: "center" }}>
        <Avatar name={r.name} size={64} />
        <h1 style={{ fontSize: 28, marginTop: 16 }}>This profile is already claimed</h1>
        <p style={{ color: "var(--ink-soft)", marginTop: 10, lineHeight: 1.6 }}>{r.name} (CSR #{r.csrNumber}) has already been claimed. If this is you, sign in to manage it. If you think someone claimed your profile in error, contact support.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 22, flexWrap: "wrap" }}>
          <button className="btn btn-primary" onClick={() => { store.enterAsReporter(); navigate("/reporter"); }}>Sign in</button>
          <button className="btn btn-secondary" onClick={() => navigate("/reporters/" + r.id)}>View the profile</button>
        </div>
      </div>
    </Page>
  );
}

// ═══ Profile claiming flow ═════════════════════════════════════════
// Searchable, alphabetized multi-select for long option lists (areas of law, languages) - matches
// the directory's option sets. Selected items show as removable tags; a search filters the list.
function MultiSelect({ options, value, onChange, placeholder }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const opts = useMemo(() => options.slice().sort((a, b) => a.localeCompare(b)), [options]);
  const toggle = (o) => onChange(value.includes(o) ? value.filter((x) => x !== o) : [...value, o]);
  const filtered = opts.filter((o) => o.toLowerCase().includes(q.trim().toLowerCase()));
  return (
    <div>
      <div className="ds-input" style={{ height: "auto", minHeight: 40, display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center", cursor: "text", padding: 6 }} onClick={() => setOpen((v) => !v)}>
        {value.length === 0 && <span style={{ color: "var(--dim)", padding: "0 4px", fontSize: 14 }}>{placeholder || "Select all that apply"}</span>}
        {value.map((v) => (
          <span key={v} style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "var(--brand-soft)", color: "var(--brand-dark)", borderRadius: 6, padding: "3px 8px", fontSize: 13.5 }}>
            {v}<Icon name="x" size={14} style={{ cursor: "pointer" }} onClick={(e) => { e.stopPropagation(); toggle(v); }} />
          </span>
        ))}
        <Icon name="chevron" size={16} style={{ marginLeft: "auto", color: "var(--dim)" }} />
      </div>
      {open && (
        <div style={{ border: "1px solid var(--rule)", borderRadius: 10, marginTop: 6, background: "var(--bg)", overflow: "hidden" }}>
          <input className="ds-input" style={{ margin: 6, width: "calc(100% - 12px)" }} placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} autoFocus />
          <div style={{ maxHeight: 220, overflowY: "auto", padding: 4 }}>
            {filtered.map((o) => {
              const on = value.includes(o);
              return (
                <div key={o} onMouseDown={(e) => e.preventDefault()} onClick={() => toggle(o)} style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 9px", borderRadius: 6, cursor: "pointer", fontSize: 14.5, color: "var(--ink)" }}>
                  <Icon name={on ? "check" : "plus"} size={16} style={{ color: on ? "var(--brand-dark)" : "var(--dim)" }} />{o}
                </div>
              );
            })}
            {filtered.length === 0 && <div style={{ padding: "10px 9px", fontSize: 13.5, color: "var(--muted)" }}>No matches.</div>}
          </div>
        </div>
      )}
    </div>
  );
}

function ClaimFlow({ reporterId }) {
  const store = useStore();
  const all = useMemo(() => buildDirectory(), []);
  const r = all.find((x) => x.id === reporterId);
  const [step, setStep] = useState(0);
  const [stripeState, setStripeState] = useState("idle"); // idle | connecting | done
  // Advancing a step doesn't change the route, so the global scroll-to-top-on-navigation
  // (see _app_01_core.jsx) never fires. Reset scroll ourselves so each step starts at the top
  // instead of holding the position of the Continue button on the previous, taller step. Deferred
  // one frame (as in the messaging thread) so it runs after the browser clamps scroll to the new,
  // shorter step's height - a direct scroll in the effect gets overridden by that clamp.
  React.useEffect(() => { requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "instant" })); }, [step]);
  const rOOS = r && isOutOfState(r);
  const [form, setForm] = useState({ bio: "", yearsExp: "", city: (r && !rOOS && r.city) || "", county: (r && !rOOS && r.county) || "", workMode: rOOS ? "remote" : "", baseState: "California", coverage: (r && !rOOS && r.county) || "", rates: {}, publishRates: false, rush: false, notary: false, proceedings: [], services: [], specialties: [], certifications: [], languages: [], otherStates: (r && r.otherStates) || [] });

  if (!r) return (
    <Page><div className="ds-panel" style={{ textAlign: "center", padding: 60, maxWidth: 520, margin: "0 auto" }}>
      <h2 style={{ fontSize: 26 }}>We couldn't find that license</h2>
      <p style={{ color: "var(--muted)", marginTop: 10 }}>This link may be for a license number that isn't in our active directory. Look yourself up instead.</p>
      <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={() => navigate("/claim")}><Icon name="search" size={16} /> Find my profile</button>
    </div></Page>
  );
  if (r.claimed) return <AlreadyClaimed r={r} />;

  const steps = ["Confirm identity", "Create account", "Verify via Stripe", "Build your profile"];
  const toggle = (key, val) => setForm((f) => ({ ...f, [key]: f[key].includes(val) ? f[key].filter((x) => x !== val) : [...f[key], val] }));

  const finish = () => { store.markJustJoined(); store.enterAsReporter(); navigate("/reporter"); };

  // Real Stripe Connect onboarding when the backend is deployed; otherwise the
  // prototype simulates it so the local demo keeps working.
  const beginStripe = async () => {
    setStripeState("connecting");
    try {
      const resp = await fetch("api/connect/create-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ licenseNumber: r.csrNumber, name: r.name, email: r.email }),
      });
      if (resp.ok) {
        const d = await resp.json();
        if (d && d.url) { window.location.href = d.url; return; }
      }
      throw new Error("no stripe backend");
    } catch (e) {
      setTimeout(() => setStripeState("done"), 1200); // demo fallback
    }
  };

  return (
    <Page>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <button onClick={() => navigateBack("/reporters/" + reporterId)} style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, marginBottom: 22 }}><Icon name="arrow" size={15} style={{ transform: "rotate(180deg)" }} /> Cancel</button>

        {/* stepper */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 30 }}>
          {steps.map((s, i) => (
            <React.Fragment key={s}>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <div className={"step-dot " + (i < step ? "done" : i === step ? "active" : "todo")}>{i < step ? <Icon name="check" size={15} /> : i + 1}</div>
                <span style={{ fontSize: 13, fontWeight: 600, color: i === step ? "var(--ink)" : "var(--dim)", display: i === step ? "block" : "none" }} className="step-label">{s}</span>
              </div>
              {i < steps.length - 1 && <div style={{ flex: 1, height: 1, background: "var(--rule)" }} />}
            </React.Fragment>
          ))}
        </div>

        <div className="ds-card">
          {step === 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <h1 style={{ fontSize: 30 }}>Is this you?</h1>
              <div className="ds-panel" style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <Avatar name={r.name} size={56} claimed={false} />
                <div>
                  <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 24 }}>{r.name}</div>
                  <div style={{ color: "var(--muted)", fontSize: 14, marginTop: 2 }}>CSR #{r.csrNumber} · {isOutOfState(r) ? "Out of state" : r.city + ", CA"} · License active</div>
                </div>
              </div>
              <p style={{ color: "var(--ink-soft)", fontSize: 15, lineHeight: 1.6 }}>Claiming this profile lets you control how firms see you and unlocks invoicing and payments. You'll verify your identity in a moment so firms know it's really you.</p>
              <div style={{ display: "flex", gap: 12 }}>
                <button className="btn btn-primary" onClick={() => setStep(1)}>Yes, this is me <Icon name="arrow" size={16} /></button>
                <button className="btn btn-secondary" onClick={() => navigateBack("/directory")}>That's not me</button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <h1 style={{ fontSize: 30 }}>Create your account</h1>
              <div className="banner banner-info"><Icon name="lock" size={18} style={{ flexShrink: 0 }} /><div>Prototype – this is a demo. No real account is created and nothing you type is stored or sent.</div></div>
              <div><label className="ds-label">Work email</label><input className="ds-input" type="email" placeholder="you@example.com" /></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div><label className="ds-label">Create a password</label><input className="ds-input" type="password" placeholder="••••••••" /></div>
                <div><label className="ds-label">Mobile (for sign-in codes)</label><input className="ds-input" type="tel" placeholder="(555) 000-0000" /></div>
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
                <button className="btn btn-primary" onClick={() => setStep(2)}>Continue <Icon name="arrow" size={16} /></button>
                <button className="btn btn-secondary" onClick={() => setStep(0)}>Back</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <h1 style={{ fontSize: 30 }}>Verify your identity</h1>
              <p style={{ color: "var(--ink-soft)", fontSize: 15, lineHeight: 1.6 }}>We use <strong>Stripe Connect</strong> to confirm you're a licensed reporter and to set up payouts. Stripe handles identity, tax, and banking – Dewey Sholes never sees your bank details or ID documents.</p>
              <div className="ds-panel" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <StripeCheck label="Confirm your legal name & license" />
                <StripeCheck label="Verify your identity (ID document)" />
                <StripeCheck label="Add a bank account for payouts" />
                <StripeCheck label="Complete tax onboarding (W-9)" />
              </div>
              {stripeState === "done" ? (
                <div className="banner banner-ok"><Icon name="check" size={18} style={{ flexShrink: 0 }} /><div><strong>Identity verified.</strong> Your payout account is connected. You can start invoicing right away.</div></div>
              ) : (
                <button className="btn btn-primary" style={{ justifyContent: "center", background: "#635BFF" }} disabled={stripeState === "connecting"}
                  onClick={beginStripe}>
                  {stripeState === "connecting" ? "Redirecting to Stripe…" : <>Continue to Stripe <Icon name="arrow" size={16} /></>}
                </button>
              )}
              <div style={{ display: "flex", gap: 12 }}>
                <button className="btn btn-primary" disabled={stripeState !== "done"} style={{ opacity: stripeState === "done" ? 1 : 0.4 }} onClick={() => setStep(3)}>Continue <Icon name="arrow" size={16} /></button>
                <button className="btn btn-secondary" onClick={() => setStep(1)}>Back</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <h1 style={{ fontSize: 30 }}>Build your profile</h1>
              <p style={{ color: "var(--muted)", fontSize: 14 }}>A complete profile ranks higher and earns firms' trust. Fill in what applies to you.</p>

              <div style={{ background: "var(--brand-soft)", border: "1px solid var(--brand-pale)", borderRadius: 12, padding: "14px 16px" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--brand-dark)", display: "flex", alignItems: "center", gap: 6 }}><Icon name="badge" size={15} /> From your California license record</div>
                <p style={{ fontSize: 12.5, color: "var(--brand-dark)", margin: "4px 0 12px", lineHeight: 1.5 }}>Prefilled from the state's CSR records. Name, license, and method come from the state.{rOOS ? " Your license lists an out-of-state address, so you'll take California work remotely." : " Edit your city or county if you've moved."}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 22px", fontSize: 14, color: "var(--ink-soft)", marginBottom: 14 }}>
                  <span><strong style={{ color: "var(--ink)", fontWeight: 600 }}>{r.name}</strong></span>
                  <span>CSR #{r.csrNumber}</span>
                  {r.method ? <span>{r.method}</span> : null}
                  <span>License active</span>
                </div>
                {rOOS ? (
                  <div style={{ fontSize: 14, color: "var(--ink-soft)" }}><label className="ds-label">Location</label>Based out of state</div>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <div><label className="ds-label">City</label><input className="ds-input" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /></div>
                    <div><label className="ds-label">County</label><input className="ds-input" value={form.county} onChange={(e) => setForm({ ...form, county: e.target.value })} /></div>
                  </div>
                )}
              </div>

              <div><label className="ds-label">Short bio</label><textarea className="ds-input" rows={3} placeholder="Tell firms who you are and what you're great at" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} /></div>
              <div style={{ maxWidth: 240 }}><label className="ds-label">Years of experience</label><input className="ds-input" type="number" placeholder="e.g. 12" value={form.yearsExp} onChange={(e) => setForm({ ...form, yearsExp: e.target.value })} /></div>

              <div>
                <label className="ds-label">How do you work?</label>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <label style={{ display: "flex", gap: 9, alignItems: "center", fontSize: 15, color: "var(--ink-soft)", cursor: "pointer" }}><input type="radio" name="workmode" checked={form.workMode === "both"} onChange={() => setForm({ ...form, workMode: "both" })} style={{ width: 18, height: 18 }} /> In person and remote <span style={{ fontSize: 13, color: "var(--dim)" }}>(you travel to depos, trials, and hearings)</span></label>
                  <label style={{ display: "flex", gap: 9, alignItems: "center", fontSize: 15, color: "var(--ink-soft)", cursor: "pointer" }}><input type="radio" name="workmode" checked={form.workMode === "remote"} onChange={() => setForm({ ...form, workMode: "remote" })} style={{ width: 18, height: 18 }} /> Remote only <span style={{ fontSize: 13, color: "var(--dim)" }}>(audio transcription and remote appearances, no travel)</span></label>
                </div>
                {form.workMode === "both" && (
                  <div style={{ marginTop: 14 }}>
                    <label className="ds-label">Counties you cover in person</label>
                    <input className="ds-input" value={form.coverage} onChange={(e) => setForm({ ...form, coverage: e.target.value })} placeholder="e.g. Santa Clara, Alameda, San Mateo" />
                    <p style={{ fontSize: 12, color: "var(--dim)", margin: "6px 0 0", lineHeight: 1.5 }}>Starts with your home county. Add any others you travel to.</p>
                  </div>
                )}
                {form.workMode === "remote" && (
                  <div style={{ marginTop: 14, maxWidth: 300 }}>
                    <label className="ds-label">State you're based in</label>
                    <select className="ds-input" value={form.baseState} onChange={(e) => setForm({ ...form, baseState: e.target.value })}>{["California"].concat(US_STATES).map((s) => <option key={s}>{s}</option>)}</select>
                    <p style={{ fontSize: 12, color: "var(--dim)", margin: "6px 0 0", lineHeight: 1.5 }}>Change this only if you've moved out of California. You can still take CA remote work.</p>
                  </div>
                )}
              </div>

              <div>
                <label className="ds-label">Proceedings covered</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{PROCEEDING_TYPES.map((w) => <button key={w} type="button" className={"chip-filter" + (form.proceedings.includes(w) ? " on" : "")} onClick={() => toggle("proceedings", w)}>{w}</button>)}</div>
              </div>
              <div>
                <label className="ds-label">Services offered</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{SERVICE_TYPES.map((w) => <button key={w} type="button" className={"chip-filter" + (form.services.includes(w) ? " on" : "")} onClick={() => toggle("services", w)}>{w}</button>)}</div>
              </div>
              <div>
                <label className="ds-label">Area of law (case types you've covered)</label>
                <MultiSelect options={SPECIALTY_TYPES} value={form.specialties} onChange={(v) => setForm({ ...form, specialties: v })} />
              </div>
              <div>
                <label className="ds-label">Certifications</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{CREDENTIAL_TYPES.map((c) => <button key={c.code} type="button" className={"chip-filter" + (form.certifications.includes(c.code) ? " on" : "")} onClick={() => toggle("certifications", c.code)}>{c.label}</button>)}</div>
              </div>
              <div>
                <label className="ds-label">Also certified in (other states)</label>
                <MultiSelect options={US_STATES} value={form.otherStates} onChange={(v) => setForm({ ...form, otherStates: v })} />
              </div>
              <div>
                <label className="ds-label">Languages (beyond English)</label>
                <MultiSelect options={LANGUAGES} value={form.languages} onChange={(v) => setForm({ ...form, languages: v })} />
              </div>
              <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15, color: "var(--ink-soft)", cursor: "pointer" }}>
                <input type="checkbox" checked={form.rush} onChange={(e) => setForm({ ...form, rush: e.target.checked })} style={{ width: 18, height: 18 }} /> I accept rush / expedited turnaround jobs
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15, color: "var(--ink-soft)", cursor: "pointer" }}>
                <input type="checkbox" checked={form.notary} onChange={(e) => setForm({ ...form, notary: e.target.checked })} style={{ width: 18, height: 18 }} /> I am a notary public
              </label>

              <div style={{ borderTop: "1px solid var(--rule)", paddingTop: 18 }}>
                <label style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "var(--ink-soft)", cursor: "pointer" }}>
                  <input type="checkbox" checked={form.publishRates} onChange={(e) => setForm({ ...form, publishRates: e.target.checked })} style={{ width: 18, height: 18, marginTop: 2, flexShrink: 0 }} />
                  <span>Show my rates to firms<span style={{ display: "block", fontSize: 12.5, color: "var(--dim)", marginTop: 2, lineHeight: 1.5 }}>Only paying law firms see your rates, never other reporters or the public. This option remains off by default, and firms will message you for a quote.</span></span>
                </label>
                {form.publishRates && (
                  <div style={{ marginTop: 14 }}>
                    <p style={{ fontSize: 12.5, color: "var(--dim)", margin: "0 0 10px", lineHeight: 1.5 }}>Fill in only what applies. Blanks stay "provided on request."</p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
                      {RATE_FIELDS.map(([k, label]) => (
                        <div key={k}><label style={{ fontSize: 12.5, color: "var(--muted)", display: "block", marginBottom: 4 }}>{label}</label><input className="ds-input" placeholder="e.g. $4.50/pg" value={form.rates[k] || ""} onChange={(e) => setForm({ ...form, rates: { ...form.rates, [k]: e.target.value } })} /></div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div style={{ marginTop: 4 }}>
                <button className="btn btn-primary" onClick={finish}><Icon name="check" size={16} /> Save to my profile</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Page>
  );
}
function StripeCheck({ label }) {
  return <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14.5, color: "var(--ink-soft)" }}><span style={{ width: 20, height: 20, borderRadius: 6, background: "#635BFF", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="check" size={13} /></span>{label}</div>;
}

// ═══ Firm signup (free account) ════════════════════════════════════
function FirmSignup() {
  const store = useStore();
  const [step, setStep] = useState(0);
  // Stepping forward keeps the same route, so reset scroll to the top of the form on each step
  // (see the matching note in ClaimFlow above). Deferred one frame so it wins over the browser's
  // scroll clamp when the next step is shorter than the current one.
  React.useEffect(() => { requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "instant" })); }, [step]);
  const [form, setForm] = useState({ firm: "", name: "", role: "", location: "", size: "", practices: [], teamInterest: "", email: "", pw: "" });
  const [legal, setLegal] = useState(null); // null | "terms" | "privacy" – shown in a modal so opening it doesn't discard the form
  const steps = ["About your firm", "Create your login"];
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const togglePractice = (p) => setForm((f) => ({ ...f, practices: f.practices.includes(p) ? f.practices.filter((x) => x !== p) : [...f.practices, p] }));
  const PRACTICE = ["Insurance defense", "Personal injury", "Family law", "Employment", "Medical malpractice", "Civil / commercial", "Probate / trust"];
  const step0Valid = form.firm.trim().length > 1 && form.name.trim().length > 1;
  const step1Valid = /.+@.+\..+/.test(form.email) && form.pw.length >= 1;
  const finish = () => {
    store.enterAsFirm(form.firm);
    store.completeSave();
    if (store.pendingMessage != null) { store.startConvoWith(store.pendingMessage); store.queueMessage(null); navigate("/messages"); }
    else navigate("/firm");
  };
  return (
    <Page>
      {legal && <LegalModal docKey={legal} onClose={() => setLegal(null)} />}
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <button onClick={() => navigate("/for-firms")} style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, marginBottom: 22 }}><Icon name="arrow" size={15} style={{ transform: "rotate(180deg)" }} /> Cancel</button>
        <div style={{ textAlign: "center" }}>
          <span className="pill pill-tag" style={{ marginBottom: 14, display: "inline-flex" }}>Free for firms</span>
          <h1 style={{ fontSize: "clamp(34px, 4.4vw, 54px)" }}>Create your firm account</h1>
          <p style={{ fontSize: 17, color: "var(--ink-soft)", marginTop: 14, lineHeight: 1.6 }}>Search the directory, message reporters, and pay their invoices in one place. Free to start – you only pay when you want to search for new reporters.</p>
        </div>
        {(store.pendingSave != null || store.pendingMessage != null) && <div className="ds-note" style={{ marginTop: 20 }}><Icon name="info" size={15} style={{ flexShrink: 0, color: "var(--dim)" }} /><span>A free account is required to {store.pendingMessage != null ? "message" : "save"} reporters. Create yours below – it's free.</span></div>}
        <div style={{ display: "flex", alignItems: "center", gap: 6, margin: "28px 0 26px" }}>
          {steps.map((s, i) => (
            <React.Fragment key={s}>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <div className={"step-dot " + (i < step ? "done" : i === step ? "active" : "todo")}>{i < step ? <Icon name="check" size={15} /> : i + 1}</div>
                <span style={{ fontSize: 13, fontWeight: 600, color: i === step ? "var(--ink)" : "var(--dim)" }}>{s}</span>
              </div>
              {i < steps.length - 1 && <div style={{ flex: 1, height: 1, background: "var(--rule)" }} />}
            </React.Fragment>
          ))}
        </div>
        <div className="ds-card">
          {step === 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div><label className="ds-label">Firm name *</label><input className="ds-input" placeholder="Morgan & Reyes LLP" value={form.firm} onChange={set("firm")} /></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div><label className="ds-label">Your name *</label><input className="ds-input" placeholder="Your full name" value={form.name} onChange={set("name")} /></div>
                <div><label className="ds-label">Your role</label><select className="ds-input" value={form.role} onChange={set("role")}><option value="">Select…</option><option>Paralegal</option><option>Legal secretary</option><option>Office manager</option><option>Attorney</option><option>Other</option></select></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div><label className="ds-label">City</label><input className="ds-input" placeholder="e.g. San Jose" value={form.location} onChange={set("location")} /></div>
                <div><label className="ds-label">Firm size</label><select className="ds-input" value={form.size} onChange={set("size")}><option value="">Select…</option><option>Solo</option><option>2–10 attorneys</option><option>11–50 attorneys</option><option>51+ attorneys</option></select></div>
              </div>
              <div>
                <label className="ds-label">Area of law (optional)</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{PRACTICE.map((p) => <button key={p} type="button" className={"chip-filter" + (form.practices.includes(p) ? " on" : "")} onClick={() => togglePractice(p)}>{p}</button>)}</div>
              </div>
              {/* teamInterest: demo-only gauge of firm-wide-plan demand; not stored on this fake submit - wire on real signup */}
              <div style={{ background: "var(--brand-soft)", border: "1px solid var(--brand-pale)", borderRadius: 12, padding: "16px 18px" }}>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: "var(--brand-dark)", textTransform: "uppercase", letterSpacing: ".05em" }}>Give us your opinion</div>
                <label className="ds-label" style={{ marginTop: 8 }}>If we offered a firm-wide plan in future, would you be interested? (optional)</label>
                <p style={{ fontSize: 12.5, color: "var(--ink-soft)", lineHeight: 1.5, margin: "6px 0 10px" }}>Today, membership is $49/month per user. A firm-wide plan – one price for your whole office – doesn't exist yet; your answer just helps us decide whether to build it.</p>
                <select className="ds-input" value={form.teamInterest} onChange={set("teamInterest")}><option value="">Select…</option><option>Yes – one plan for our whole office</option><option>Maybe later</option><option>No – just me for now</option></select>
              </div>
              <div style={{ marginTop: 4 }}>
                <button className="btn btn-primary" disabled={!step0Valid} style={{ opacity: step0Valid ? 1 : 0.4 }} onClick={() => setStep(1)}>Continue <Icon name="arrow" size={16} /></button>
              </div>
            </div>
          )}
          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="banner banner-info"><Icon name="lock" size={18} style={{ flexShrink: 0 }} /><div>Prototype – this is a demo. No real account is created and nothing you type is stored or sent.</div></div>
              <div><label className="ds-label">Work email *</label><input className="ds-input" type="email" placeholder="you@firm.com" value={form.email} onChange={set("email")} /></div>
              <div><label className="ds-label">Create a password *</label><input className="ds-input" type="password" placeholder="••••••••" value={form.pw} onChange={set("pw")} /></div>
              <p style={{ fontSize: 12.5, color: "var(--dim)", lineHeight: 1.5 }}>By creating an account you agree to the <button onClick={() => setLegal("terms")} style={claimLinkBtn}>Terms</button> and <button onClick={() => setLegal("privacy")} style={claimLinkBtn}>Privacy</button>.</p>
              <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
                <button className="btn btn-primary" disabled={!step1Valid} style={{ opacity: step1Valid ? 1 : 0.4 }} onClick={finish}><Icon name="check" size={16} /> Create account</button>
                <button className="btn btn-secondary" onClick={() => setStep(0)}>Back</button>
              </div>
            </div>
          )}
        </div>
        <div style={{ textAlign: "center", marginTop: 20, fontSize: 13.5, color: "var(--muted)" }}>Already have an account? <button onClick={() => navigate("/")} style={claimLinkBtn}>Log in</button></div>
      </div>
    </Page>
  );
}
