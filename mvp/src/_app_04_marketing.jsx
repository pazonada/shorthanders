// ═══ LANDING ═══════════════════════════════════════════════════════
function LandingPage() {
  const dir = useMemo(() => buildDirectory(), []);
  const preview = useMemo(() => dir.filter((r) => r.claimed).sort((a, b) => completeness(b) - completeness(a)).slice(0, 3), [dir]);
  const total = dir.length;
  return (
    <>
      <Nav />
      {/* hero */}
      <section className="mvp-hero" style={{ background: "linear-gradient(180deg, var(--periwinkle-soft) 0%, var(--bg) 70%)" }}>
        <img src="graphics/hp-text-grey.png" alt="" aria-hidden="true" className="mvp-hero-shorthand" />
        <div className="container" style={{ padding: "72px 24px 60px", textAlign: "center", maxWidth: 880 }}>
          <span className="pill pill-tag" style={{ marginBottom: 20, display: "inline-flex" }}>{total.toLocaleString()} California court reporters, one directory</span>
          <h1 style={{ fontSize: "clamp(38px, 6vw, 66px)", lineHeight: 1.04 }}>Find an independent court reporter. <em>Skip the agency.</em></h1>
          <p style={{ fontSize: 19, color: "var(--ink-soft)", margin: "22px auto 0", maxWidth: 620, lineHeight: 1.6 }}>
            Search every licensed CSR in California by county, specialty, language, and turnaround – then message them directly. Reporters claim a free profile, send invoices, and get paid without an agency taking a cut.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 34, flexWrap: "wrap" }}>
            <button className="btn btn-primary" onClick={() => navigate("/directory")}><Icon name="search" size={16} /> Search the directory</button>
            <button className="btn btn-secondary" onClick={() => navigate("/claim")}>Claim your profile</button>
          </div>
          <div style={{ marginTop: 22, fontSize: 13, color: "var(--muted)", display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name="shield" size={14} /> Verified via Stripe identity</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name="dollar" size={14} /> Free for reporters</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name="check" size={14} /> No booking fees, no markup</span>
          </div>
        </div>
      </section>

      {/* two-sided value */}
      <section className="container" style={{ padding: "16px 24px 8px" }}>
        <div className="ds-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
          <ValueCard icon="building" tone="brand" eyebrow="For law firms" title="Find and hire reporters quickly"
            points={["Search 4,700+ CSRs by county, city, language, specialty, and rush availability", "Rich, verified profiles – no more cold-calling agencies", "Message reporters directly and agree terms yourselves"]}
            cta={["Browse the directory", "/directory"]} />
          <ValueCard icon="user" tone="sage" eyebrow="For court reporters" title="Run your business from one place"
            points={["Claim a professional profile firms can actually find", "Send invoices and collect card or ACH payments via Stripe", "Track what's paid, sent, and overdue – no agency cut, ever"]}
            cta={["Claim your free profile", "/claim"]} />
        </div>
      </section>

      {/* how it works */}
      <section className="container" style={{ padding: "56px 24px" }}>
        <h2 style={{ fontSize: 34, textAlign: "center", marginBottom: 8 }}>How it works</h2>
        <p style={{ textAlign: "center", color: "var(--muted)", marginBottom: 40 }}>We connect the two sides. The working relationship stays between you.</p>
        <div className="ds-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))" }}>
          <Step n="1" title="Search or get found" body="Firms search the directory. Reporters claim their profile so they show up." />
          <Step n="2" title="Message directly" body="Reach out through Dewey Sholes. Discuss scope, dates, and rates yourselves." />
          <Step n="3" title="Do the work" body="You agree terms and handle the deposition or transcript directly – off-platform." />
          <Step n="4" title="Invoice & get paid" body="The reporter sends an invoice; the firm pays by card or ACH. Status tracked automatically." />
        </div>
      </section>

      {/* directory preview */}
      <section style={{ background: "var(--bg-soft)", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
        <div className="container" style={{ padding: "56px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 26, flexWrap: "wrap", gap: 12 }}>
            <div>
              <h2 style={{ fontSize: 32 }}>Reporters on Dewey Sholes</h2>
              <p style={{ color: "var(--muted)", marginTop: 6 }}>A few of the independent CSRs who've claimed their profile.</p>
            </div>
            <button className="btn btn-secondary" onClick={() => navigate("/directory")}>See all <Icon name="arrow" size={16} /></button>
          </div>
          <div className="ds-grid ds-dir-grid">{preview.map((r) => <RepCard key={r.id} r={r} />)}</div>
        </div>
      </section>

      {/* liability / trust */}
      <section className="container" style={{ padding: "56px 24px", maxWidth: 820, textAlign: "center" }}>
        <Icon name="shield" size={30} style={{ margin: "0 auto", color: "var(--brand)" }} />
        <h2 style={{ fontSize: 30, marginTop: 14 }}>A directory and a payment tool – nothing you have to sign over</h2>
        <p style={{ color: "var(--ink-soft)", marginTop: 14, fontSize: 16, lineHeight: 1.7 }}>
          Dewey Sholes helps a firm find a reporter and helps a reporter get paid. We don't employ reporters, guarantee work, negotiate rates, or hold your files. Your service agreement is strictly between the firm and the reporter.
        </p>
        <button className="btn btn-secondary" style={{ marginTop: 22 }} onClick={() => navigate("/terms")}>Read how this works</button>
      </section>

      {/* final CTA */}
      <section style={{ background: "var(--ink)", color: "#fff" }}>
        <div className="container" style={{ padding: "64px 24px", textAlign: "center", maxWidth: 720 }}>
          <h2 style={{ fontSize: 38, color: "#fff" }}>Ready when you are.</h2>
          <p style={{ color: "rgba(255,255,255,.75)", marginTop: 14, fontSize: 17 }}>Search for a reporter, or claim the profile that's already waiting for you.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 30, flexWrap: "wrap" }}>
            <button className="btn btn-white" onClick={() => navigate("/directory")}><Icon name="search" size={16} /> Search the directory</button>
            <button className="btn" style={{ background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,.3)" }} onClick={() => navigate("/for-reporters")}>I'm a reporter</button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

function ValueCard({ icon, tone, eyebrow, title, points, cta }) {
  const bg = tone === "sage" ? "var(--sage-soft)" : "var(--brand-soft)";
  const fg = tone === "sage" ? "var(--sage-deep)" : "var(--brand-dark)";
  return (
    <div className="ds-card" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: bg, color: fg, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name={icon} size={22} /></div>
        <span style={{ fontSize: 13, fontWeight: 700, color: fg, textTransform: "uppercase", letterSpacing: ".04em" }}>{eyebrow}</span>
      </div>
      <h3 style={{ fontSize: 26 }}>{title}</h3>
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 11 }}>
        {points.map((p, i) => <li key={i} style={{ display: "flex", gap: 10, fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.5 }}><Icon name="check" size={18} style={{ color: fg, flexShrink: 0, marginTop: 2 }} />{p}</li>)}
      </ul>
      <button className="btn btn-primary" style={{ alignSelf: "flex-start", marginTop: 4 }} onClick={() => navigate(cta[1])}>{cta[0]} <Icon name="arrow" size={16} /></button>
    </div>
  );
}
function Step({ n, title, body }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div className="step-dot active" style={{ width: 38, height: 38, fontSize: 16 }}>{n}</div>
      <h3 style={{ fontSize: 21 }}>{title}</h3>
      <p style={{ color: "var(--muted)", fontSize: 14.5, lineHeight: 1.6 }}>{body}</p>
    </div>
  );
}

// ═══ FOR FIRMS ═════════════════════════════════════════════════════
function ForFirmsPage() {
  return (
    <Page>
      <MarketingHero eyebrow="For law firms" title="Stop calling agencies. Find the reporter yourself."
        sub="Every licensed CSR in California, searchable by the things that actually matter – county, specialty, language, and whether they take rush work. Message them directly and agree terms without a middleman marking up the rate." />
      <div className="ds-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", marginTop: 8 }}>
        <FeatureBlock icon="search" title="Real search" body="Filter 4,700+ reporters by county, city, language, years of experience, specialty, work type, and rush availability." />
        <FeatureBlock icon="badge" title="Verified profiles" body="Claimed reporters verify their identity through Stripe. You see who you're hiring before you reach out." />
        <FeatureBlock icon="message" title="Direct messaging" body="Contact reporters through the platform. Scope, dates, and rates are agreed directly between you." />
        <FeatureBlock icon="dollar" title="No markup" body="You're not paying an agency's cut. The rate you agree with the reporter is the rate you pay." />
        <FeatureBlock icon="doc" title="Clean invoices" body="Reporters invoice you through the platform with your matter reference on every line, ready for AP." />
        <FeatureBlock icon="lock" title="Pay securely" body="Pay any invoice by credit card or ACH. Receipts are automatic; nothing to chase." />
      </div>
      <CtaStrip title="Search the directory now – no account needed to browse." button={["Open the directory", "/directory"]} />
    </Page>
  );
}

// ═══ FOR REPORTERS ═════════════════════════════════════════════════
function ForReportersPage() {
  const store = useStore();
  return (
    <Page>
      <MarketingHero eyebrow="For court reporters" title="Your whole business, minus the agency."
        sub="You're already in our directory – every licensed California CSR is. Claim your profile to control how firms see you, then use Dewey Sholes to invoice clients and get paid. Free, forever, for reporters." />
      <div className="ds-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", marginTop: 8 }}>
        <FeatureBlock icon="user" title="Claim your profile" body="Add your bio, specialties, coverage area, languages, certifications, and rates. A claimed profile ranks above unclaimed ones." />
        <FeatureBlock icon="shield" title="Verify once, via Stripe" body="Confirm your identity through Stripe Connect. Firms trust a verified badge – and it's what powers your payouts." />
        <FeatureBlock icon="message" title="Hear from firms directly" body="Firms message you through the platform. You decide who to work with and on what terms." />
        <FeatureBlock icon="invoice" title="Invoice in seconds" body="Create an invoice with the client, matter, and line items. Send it as a payment link by email." />
        <FeatureBlock icon="bank" title="Get paid by card or ACH" body="Stripe deposits straight to your bank. Track draft, sent, paid, and overdue at a glance." />
        <FeatureBlock icon="dollar" title="Keep 100% of your rate" body="No agency cut on the work you find here. Dewey Sholes is free for reporters." />
      </div>
      <div style={{ background: "var(--sage-soft)", border: "1px solid #C5D8C2", borderRadius: 18, padding: 32, marginTop: 40, textAlign: "center" }}>
        <h3 style={{ fontSize: 26, color: "var(--sage-deep)" }}>Find your profile and claim it</h3>
        <p style={{ color: "var(--ink-soft)", marginTop: 10, maxWidth: 560, margin: "10px auto 0" }}>Look yourself up by license number or name, confirm it's you, and create your account. Three minutes, start to finish.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 22, flexWrap: "wrap" }}>
          <button className="btn btn-primary" onClick={() => navigate("/claim")}><Icon name="user" size={16} /> Claim my profile</button>
          {store.role !== "reporter" && <button className="btn btn-secondary" onClick={() => { store.enterAsReporter(); navigate("/reporter"); }}>See a demo dashboard</button>}
        </div>
      </div>
    </Page>
  );
}

function MarketingHero({ eyebrow, title, sub }) {
  return (
    <div style={{ maxWidth: 760, margin: "12px 0 40px" }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: "var(--brand)", textTransform: "uppercase", letterSpacing: ".05em" }}>{eyebrow}</span>
      <h1 style={{ fontSize: "clamp(34px, 5vw, 52px)", lineHeight: 1.08, marginTop: 12 }}>{title}</h1>
      <p style={{ fontSize: 18, color: "var(--ink-soft)", marginTop: 18, lineHeight: 1.65 }}>{sub}</p>
    </div>
  );
}
function FeatureBlock({ icon, title, body }) {
  return (
    <div className="ds-panel" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ width: 40, height: 40, borderRadius: 11, background: "var(--bg)", border: "1px solid var(--rule)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--brand)" }}><Icon name={icon} size={20} /></div>
      <h3 style={{ fontSize: 19 }}>{title}</h3>
      <p style={{ color: "var(--muted)", fontSize: 14.5, lineHeight: 1.6 }}>{body}</p>
    </div>
  );
}
function CtaStrip({ title, button }) {
  return (
    <div style={{ background: "var(--ink)", color: "#fff", borderRadius: 20, padding: "40px 32px", marginTop: 44, textAlign: "center" }}>
      <h3 style={{ fontSize: 26, color: "#fff" }}>{title}</h3>
      <button className="btn btn-white" style={{ marginTop: 20 }} onClick={() => navigate(button[1])}>{button[0]} <Icon name="arrow" size={16} /></button>
    </div>
  );
}

// ═══ PRICING (Option A) ════════════════════════════════════════════
function PricingPage() {
  return (
    <Page>
      <div style={{ textAlign: "center", maxWidth: 680, margin: "12px auto 44px" }}>
        <h1 style={{ fontSize: "clamp(34px, 5vw, 52px)" }}>Simple, honest pricing</h1>
        <p style={{ fontSize: 18, color: "var(--ink-soft)", marginTop: 16, lineHeight: 1.6 }}>Reporters use Dewey Sholes free. Law firms pay a flat monthly subscription for advanced search and direct messaging. No booking fees, no commission on your work.</p>
      </div>
      <div className="ds-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", maxWidth: 860, margin: "0 auto" }}>
        <PriceCard tone="sage" name="Court reporters" price="$0" unit="always free"
          blurb="Claim your profile, get discovered, invoice clients, and collect payments."
          features={["Claimed public profile", "Stripe identity verification", "Unlimited invoices & payments", "Direct messages from firms", "Payment tracking dashboard"]}
          cta={["Claim your profile", "/claim"]} note="Standard Stripe processing fees apply to payments you collect." />
        <PriceCard tone="brand" featured name="Law firms" price="$149" unit="/ month"
          blurb="Full search, verified profiles, and unlimited direct messaging for your whole team."
          features={["Advanced directory search & filters", "Unlimited direct messaging", "Saved reporters & shared lists", "Matter references on every invoice", "Pay invoices by card or ACH"]}
          cta={["Start a firm account", "/firm"]} note="Browsing the directory is always free. Subscription unlocks messaging & advanced search." />
      </div>
      <div className="ds-panel" style={{ maxWidth: 860, margin: "32px auto 0", textAlign: "center" }}>
        <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6 }}>
          <strong style={{ color: "var(--ink-soft)" }}>Where we're headed:</strong> long term, we expect a hybrid – firms subscribe, reporters stay free, and a small optional transaction fee funds new business tools. We'll never surprise you with a change to how you get paid.
        </p>
      </div>
    </Page>
  );
}
function PriceCard({ tone, featured, name, price, unit, blurb, features, cta, note }) {
  const fg = tone === "sage" ? "var(--sage-deep)" : "var(--brand-dark)";
  return (
    <div className="ds-card" style={{ borderColor: featured ? "var(--brand)" : "var(--rule)", borderWidth: featured ? 2 : 1, position: "relative", display: "flex", flexDirection: "column", gap: 16 }}>
      {featured && <span className="pill pill-verified" style={{ position: "absolute", top: -12, left: 26 }}>Most popular</span>}
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: fg, textTransform: "uppercase", letterSpacing: ".04em" }}>{name}</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 10 }}>
          <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 48, color: "var(--ink)" }}>{price}</span>
          <span style={{ color: "var(--muted)", fontSize: 15 }}>{unit}</span>
        </div>
        <p style={{ color: "var(--muted)", fontSize: 14.5, marginTop: 8, lineHeight: 1.5 }}>{blurb}</p>
      </div>
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
        {features.map((f, i) => <li key={i} style={{ display: "flex", gap: 10, fontSize: 14.5, color: "var(--ink-soft)" }}><Icon name="check" size={17} style={{ color: fg, flexShrink: 0, marginTop: 2 }} />{f}</li>)}
      </ul>
      <button className="btn btn-primary" style={{ justifyContent: "center" }} onClick={() => navigate(cta[1])}>{cta[0]}</button>
      <p style={{ fontSize: 12.5, color: "var(--dim)", lineHeight: 1.5, textAlign: "center" }}>{note}</p>
    </div>
  );
}
