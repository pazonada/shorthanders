// ═══ Claim front door: a reporter shows up and finds their record ══
const claimLinkBtn = { background: "none", border: "none", color: "var(--brand-dark)", fontWeight: 600, cursor: "pointer", padding: 0, fontSize: "inherit" };

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
          <span className="pill pill-tag" style={{ marginBottom: 14, display: "inline-flex" }}>Free for reporters, forever</span>
          <h1 style={{ fontSize: "clamp(30px, 4vw, 46px)" }}>Claim your profile</h1>
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
            <input className="ds-input" placeholder={mode === "license" ? "e.g. 14585" : "e.g. Adam Elwailly"} value={q}
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
        <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>CSR #{r.csrNumber} · {r.city}{r.county ? ", " + r.county + " County" : ""}</div>
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

// ═══ Profile claiming flow ═════════════════════════════════════════
function ClaimFlow({ reporterId }) {
  const store = useStore();
  const all = useMemo(() => buildDirectory(), []);
  const r = all.find((x) => x.id === reporterId);
  const [step, setStep] = useState(0);
  const [stripeState, setStripeState] = useState("idle"); // idle | connecting | done
  const [form, setForm] = useState({ bio: "", yearsExp: "", rate: "", rush: false, work: [], languages: [], coverage: "" });

  if (!r) return <Page><div className="ds-panel" style={{ textAlign: "center", padding: 60 }}><h2>Profile not found</h2></div></Page>;

  const steps = ["Confirm identity", "Create account", "Verify via Stripe", "Build your profile"];
  const toggle = (key, val) => setForm((f) => ({ ...f, [key]: f[key].includes(val) ? f[key].filter((x) => x !== val) : [...f[key], val] }));

  const finish = () => { store.enterAsReporter(); navigate("/reporter"); };

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
                  <div style={{ color: "var(--muted)", fontSize: 14, marginTop: 2 }}>CSR #{r.csrNumber} · {r.city}, CA · License active</div>
                </div>
              </div>
              <p style={{ color: "var(--ink-soft)", fontSize: 15, lineHeight: 1.6 }}>Claiming this profile lets you control how firms see you and unlocks invoicing and payments. You'll verify your identity in a moment so firms know it's really you.</p>
              <div style={{ display: "flex", gap: 12 }}>
                <button className="btn btn-primary" onClick={() => setStep(1)}>Yes, this is me <Icon name="arrow" size={16} /></button>
                <button className="btn btn-secondary" onClick={() => navigate("/directory")}>That's not me</button>
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
                  onClick={() => { setStripeState("connecting"); setTimeout(() => setStripeState("done"), 1400); }}>
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
              <p style={{ color: "var(--muted)", fontSize: 14 }}>Everything here is optional, but a complete profile ranks higher and earns firms' trust. You can finish it later.</p>
              <div><label className="ds-label">Short bio</label><textarea className="ds-input" rows={3} placeholder="Tell firms who you are and what you're great at…" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} /></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div><label className="ds-label">Years of experience</label><input className="ds-input" type="number" placeholder="e.g. 12" value={form.yearsExp} onChange={(e) => setForm({ ...form, yearsExp: e.target.value })} /></div>
                <div><label className="ds-label">Rates (optional)</label><input className="ds-input" placeholder="e.g. From $4.50/pg" value={form.rate} onChange={(e) => setForm({ ...form, rate: e.target.value })} /></div>
              </div>
              <div>
                <label className="ds-label">Types of work you accept</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{WORK_TYPES.map((w) => <button key={w} type="button" className={"chip-filter" + (form.work.includes(w) ? " on" : "")} onClick={() => toggle("work", w)}>{w}</button>)}</div>
              </div>
              <div>
                <label className="ds-label">Languages (beyond English)</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{LANGUAGES.slice(0, 6).map((l) => <button key={l} type="button" className={"chip-filter" + (form.languages.includes(l) ? " on" : "")} onClick={() => toggle("languages", l)}>{l}</button>)}</div>
              </div>
              <div><label className="ds-label">Counties you cover</label><input className="ds-input" placeholder="e.g. Santa Clara, Alameda, San Mateo" value={form.coverage} onChange={(e) => setForm({ ...form, coverage: e.target.value })} /></div>
              <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15, color: "var(--ink-soft)", cursor: "pointer" }}>
                <input type="checkbox" checked={form.rush} onChange={(e) => setForm({ ...form, rush: e.target.checked })} style={{ width: 18, height: 18 }} /> I accept rush / expedited turnaround jobs
              </label>
              <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
                <button className="btn btn-primary" onClick={finish}><Icon name="check" size={16} /> Claim & go to my dashboard</button>
                <button className="btn btn-secondary" onClick={finish}>Skip for now</button>
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
