// ═══ LANDING ═══════════════════════════════════════════════════════
function LandingPage() {
  const dir = useMemo(() => buildDirectory(), []);
  const preview = useMemo(() => weeklyFeatured(dir.filter((r) => r.claimed), 4), [dir]);
  const total = dir.length;
  return (
    <>
      <Nav />
      {/* hero */}
      <section className="mvp-hero" style={{ background: "linear-gradient(180deg, var(--periwinkle-soft) 0%, var(--bg) 70%)" }}>
        <img src="graphics/hp-text-grey.png" alt="" aria-hidden="true" className="mvp-hero-shorthand" />
        <div className="container" style={{ padding: "80px 24px 64px", maxWidth: 900 }}>
          <span className="kicker">Over {(Math.floor(total / 100) * 100).toLocaleString()} California court reporters in one directory</span>
          <h1 className="h-display">Find an independent court reporter. <em>Skip the agency.</em></h1>
          <p style={{ fontSize: 19, color: "var(--ink-soft)", margin: "26px 0 0", maxWidth: 640, lineHeight: 1.6 }}>
            Firms can browse detailed profiles of every licensed CSR in California – for depositions, trials, and hearings – and message them directly. CSRs can get discovered and get paid with no agency taking a cut.
          </p>
          <div style={{ display: "flex", gap: 14, marginTop: 34, flexWrap: "wrap" }}>
            <button className="btn btn-primary" onClick={() => navigate("/directory")}><Icon name="search" size={16} /> Search the directory</button>
            <button className="btn btn-secondary" onClick={() => navigate("/claim")}>Claim your reporter profile</button>
          </div>
          <div style={{ marginTop: 26, fontSize: 13, color: "var(--muted)", display: "flex", gap: 20, flexWrap: "wrap" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name="shield" size={14} /> Verified via Stripe identity</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name="dollar" size={14} /> Free to get listed</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name="check" size={14} /> Low fees, no agency cut</span>
          </div>
        </div>
      </section>

      {/* two-sided value */}
      <section className="container" style={{ padding: "clamp(36px, 4vw, 52px) 24px clamp(56px, 6.5vw, 88px)" }}>
        <div className="ds-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
          <ValueCard icon="building" tone="brand" eyebrow="For law firms" title="Find and hire reporters quickly"
            points={["Search every CA reporter by location, areas of law, language, rates, turnaround, and more", "See full profiles and message reporters directly to negotiate work", "Pay invoices online by card or ACH – no paper checks, no agency markup"]}
            cta={["Browse the directory", "/directory"]} />
          <ValueCard icon="user" tone="ochre" eyebrow="For court reporters" title="Run your business from one place"
            points={["Free promotion; your claimed, professional profile will be prioritized for firms to find", "Invoice in seconds, get paid by card or ACH, and get year-end 1099s and clean records", "No agency taking massive cuts – you keep your rate, minus only a small platform fee"]}
            cta={["Claim your free profile", "/claim"]} />
        </div>
      </section>

      {/* how it works */}
      <section style={{ background: "var(--periwinkle-soft)", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
        <div className="container" style={{ padding: "clamp(56px, 6.5vw, 88px) 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 38 }}>
            <span className="kicker" style={{ justifyContent: "center" }}>The working relationship stays between you.</span>
          </div>
          <div className="ds-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))" }}>
            <Step n="1" title="Search or get found" body="Firms search the directory. Reporters claim their profile and add more details so they show up in search results." art={<StepArt kind="search" />} />
            <Step n="2" title="Message directly" body="Reach out through Dewey Sholes. Discuss scope, dates, and rates yourselves." art={<StepArt kind="message" />} />
            <Step n="3" title="Do the work" body="You agree terms and handle the hearing, deposition, or transcript-from-audio directly." art={<StepArt kind="work" />} />
            <Step n="4" title="Invoice & get paid" body="The reporter sends an invoice; the firm pays by card or ACH. Status tracked automatically." art={<StepArt kind="invoice" />} />
          </div>
        </div>
      </section>

      {/* money comparison */}
      <MoneyComparison />

      {/* directory preview */}
      <section style={{ background: "var(--bg-soft)", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
        <div className="container" style={{ padding: "clamp(56px, 6.5vw, 88px) 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 26, flexWrap: "wrap", gap: 12 }}>
            <div>
              <h2 className="h-section">Robust reporter profiles</h2>
              <p style={{ color: "var(--muted)", marginTop: 16, maxWidth: 540 }}>The state publishes basic contact information for CSRs, but there's never been a comprehensive directory where independent reporters can advertise their services – until now.</p>
            </div>
            <button className="btn btn-secondary" onClick={() => navigate("/directory")}>See all <Icon name="arrow" size={16} /></button>
          </div>
          <div className="ds-grid ds-feature-grid">{preview.map((r) => <RepCard key={r.id} r={r} />)}</div>
        </div>
      </section>

      {/* liability / trust */}
      <section className="container" style={{ padding: "clamp(56px, 6.5vw, 88px) 24px", maxWidth: 820, textAlign: "center" }}>
        <Icon name="shield" size={30} style={{ margin: "0 auto", color: "var(--brand)" }} />
        <h2 style={{ fontSize: 30, marginTop: 14 }}>A directory and a payment tool</h2>
        <p style={{ color: "var(--ink-soft)", marginTop: 14, fontSize: 16, lineHeight: 1.7 }}>
          Dewey Sholes helps a firm find a reporter and helps a reporter get paid. We don't employ reporters, guarantee work, negotiate rates, or hold your files. Your service agreement is strictly between the firm and the reporter.
        </p>
        <button className="btn btn-secondary" style={{ marginTop: 22 }} onClick={() => navigate("/terms")}>Read how this works</button>
      </section>

      <Footer />
    </>
  );
}

function ValueCard({ icon, tone, eyebrow, title, points, cta }) {
  const bg = "var(--brand-soft)";
  const fg = "var(--brand-dark)";
  return (
    <div className="ds-card" style={{ display: "flex", flexDirection: "column", gap: 16, height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: bg, color: fg, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name={icon} size={22} /></div>
        <span style={{ fontSize: 13, fontWeight: 700, color: fg, textTransform: "uppercase", letterSpacing: ".04em" }}>{eyebrow}</span>
      </div>
      <h3 style={{ fontSize: 26 }}>{title}</h3>
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 11 }}>
        {points.map((p, i) => <li key={i} style={{ display: "flex", gap: 10, fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.5 }}><Icon name="check" size={18} style={{ color: fg, flexShrink: 0, marginTop: 2 }} />{p}</li>)}
      </ul>
      <div style={{ marginTop: "auto", paddingTop: 15, display: "flex" }}>
        <button className="btn btn-primary" onClick={() => navigate(cta[1])}>{cta[0]} <Icon name="arrow" size={16} /></button>
      </div>
    </div>
  );
}
function Step({ n, title, body, art }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {art && <div style={{ background: "var(--bg)", border: "1px solid var(--ink)", borderRadius: 14, aspectRatio: "3 / 2", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>{art}</div>}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div className="step-dot active" style={{ width: 30, height: 30, fontSize: 14, background: "var(--brand)" }}>{n}</div>
        <h3 style={{ fontSize: 20 }}>{title}</h3>
      </div>
      <p style={{ color: "var(--muted)", fontSize: 14.5, lineHeight: 1.6 }}>{body}</p>
    </div>
  );
}

// Pen-and-ink step illustrations. Files live in mvp/graphics/, ~3:2, shown object-fit cover.
function StepArt({ kind }) {
  const files = { search: "step-1-search_v2.png", message: "step-2-message_v2.png", work: "step-3-work.png", invoice: "step-4-invoice.png" };
  return <img src={"graphics/" + files[kind]} alt="" aria-hidden="true" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", borderRadius: 13 }} />;
}

// Real agency invoice (research/agency_invoice_evidence.md) vs the same job on DS.
function MoneyComparison() {
  const Bar = ({ segments }) => (
    <div style={{ display: "flex", height: 34, borderRadius: 8, overflow: "hidden", border: "1px solid var(--rule)" }}>
      {segments.map((s, i) => <div key={i} style={{ width: s.w, background: s.bg }} title={s.label} />)}
    </div>
  );
  return (
    <section className="container" style={{ padding: "clamp(56px, 6.5vw, 88px) 24px", maxWidth: 820 }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <span className="kicker" style={{ justifyContent: "center" }}>Where your money goes</span>
        <h2 style={{ fontSize: "clamp(24px, 3.4vw, 38px)", lineHeight: 1.12 }}>For the same job, agencies keep 30–50%</h2>
        <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.6, maxWidth: 620, margin: "12px auto 0" }}>On a real $2,311 California deposition invoice, <strong style={{ color: "var(--ink)" }}>$908 went to the agency</strong> – admin, production, and delivery line items the reporter never touched.</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 8, flexWrap: "wrap", gap: 4 }}><span style={{ fontWeight: 700, color: "var(--ink)" }}>Through an agency</span><span style={{ color: "var(--muted)" }}>Firm pays $2,311</span></div>
          <Bar segments={[{ w: "61%", bg: "var(--ink)", label: "Reporter" }, { w: "39%", bg: "#C6D949", label: "Agency" }]} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginTop: 8, color: "var(--muted)", flexWrap: "wrap", gap: 4 }}><span>Reporter earns $1,404 (61%)</span><span style={{ color: "var(--ink)", fontWeight: 600 }}>Agency takes $908 (39%)</span></div>
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 8, flexWrap: "wrap", gap: 4 }}><span style={{ fontWeight: 700, color: "var(--brand-dark)" }}>Through Dewey Sholes</span><span style={{ color: "var(--muted)" }}>Firm pays the reporter's rate</span></div>
          <Bar segments={[{ w: "95%", bg: "var(--ink)", label: "Reporter" }, { w: "5%", bg: "var(--brand)", label: "Dewey Sholes" }]} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginTop: 8, color: "var(--muted)", flexWrap: "wrap", gap: 4 }}><span>Reporter keeps their rate</span><span style={{ color: "var(--brand-dark)", fontWeight: 600 }}>Dewey Sholes takes 2% (Pro) or 5% (Free)</span></div>
        </div>
      </div>
      <p style={{ textAlign: "center", color: "var(--dim)", fontSize: 12.5, marginTop: 26, lineHeight: 1.5 }}>Agency figures from a real anonymized California invoice (a 319-page arbitration transcript). On Dewey Sholes the reporter sets their own rate, and our small fee comes from their side – the firm never pays a platform fee. Illustrative.</p>
    </section>
  );
}

// ═══ FOR FIRMS ═════════════════════════════════════════════════════
function ForFirmsPage() {
  return (
    <Page roomy>
      <MarketingHero eyebrow="For law firms" title="Stop calling agencies. Find the reporter yourself."
        sub="Every licensed CSR in California, for depositions, trials, and hearings. Search by the things that actually matter – county, area of law, language, and whether they take rush work – then message them directly and agree terms without a middleman marking up the rate." />
      <div className="ds-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", marginTop: 8 }}>
        <FeatureBlock icon="search" title="Detailed search" body="Filter every licensed California reporter by county, city, language, years of experience, area of law, proceedings, services, and rush availability." />
        <FeatureBlock icon="badge" title="Verified profiles" body="Claimed reporters verify their identity through Stripe. You see who you're hiring before you reach out." />
        <FeatureBlock icon="message" title="Direct messaging" body="Contact reporters through the platform. Scope, dates, and rates are agreed directly between you." />
        <FeatureBlock icon="dollar" title="No markup" body="You're not paying an agency's cut. The rate you agree with the reporter is the rate you pay." />
        <FeatureBlock icon="doc" title="Clean invoices" body="Reporters invoice you through the platform with your matter reference on every line, ready for AP." />
        <FeatureBlock icon="lock" title="Pay online, not by check" body="No more cutting paper checks to reporters who won't take anything else. Pay any invoice by card or ACH in a click – receipts automatic, nothing to chase." />
      </div>
      <section style={{ marginTop: 40, background: "var(--brand-soft)", border: "1px solid var(--brand-pale)", borderRadius: 20, padding: "clamp(32px, 4vw, 48px)" }}>
        <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: "var(--brand)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name="search" size={26} /></div>
          <div style={{ flex: 1, minWidth: 260 }}>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 34px)", lineHeight: 1.12, color: "var(--brand-dark)" }}>Already worked with a reporter? Find them again.</h2>
            <p style={{ fontSize: 16, color: "var(--ink-soft)", marginTop: 12, lineHeight: 1.6, maxWidth: 620 }}>You usually already have the name – it's on the cover of the transcript, or you jotted it down at the hearing. Search the directory by name or license number, message them, and pick up where you left off. Reaching a reporter you looked up by name is free; if they haven't joined yet, invite them in a click.</p>
            <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={() => navigate("/directory")}><Icon name="search" size={16} /> Search the directory</button>
          </div>
        </div>
      </section>
      <section style={{ marginTop: 40, background: "#F1F5F9", border: "1px solid var(--rule-strong)", borderRadius: 20, padding: "clamp(40px, 5vw, 60px) clamp(16px, 2vw, 24px)" }}>
        <div style={{ textAlign: "center", margin: "0 0 28px" }}>
          <h2 style={{ fontSize: "clamp(26px, 3.2vw, 40px)", lineHeight: 1.1 }}>What it costs</h2>
          <p style={{ fontSize: 17, color: "var(--ink-soft)", marginTop: 12, lineHeight: 1.6 }}>Browsing the directory, inviting reporters, and paying invoices are always free. A simple monthly membership unlocks the full directory, reaching any reporter, and personalized recommendations – no booking fees, no commission on the work.</p>
        </div>
        <div className="ds-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", maxWidth: 820, margin: "0 auto" }}>
          <PriceCard tone="brand" name="Free" price="$0" unit="/mo"
            blurb="Work with the reporters who already know you – browse, invite, and pay, at no cost."
            features={["Browse the directory – the public license details the state already publishes", "Look up reporters you know and invite them to connect", "Message & save the reporters you're connected to", "Pay any reporter's invoice by card or ACH"]}
            cta={["Browse the directory", "/directory"]} note="Free forever. No card required." />
          <PriceCard tone="brand" featured name="Firm membership" price="$49" unit="/month"
            blurb="Search the full directory and reach any reporter – no agency in the middle."
            features={["Everything in the free plan", "Full profiles – claimed reporters, rates, coverage & certifications", "Search, message & save any reporter, not just your connections", "Personalized reporter recommendations", "Advanced search & filters, saved & shared team lists"]}
            cta={["Create a firm account", "/firm-signup"]} note="$49/month per user, or $539/year (1 month free). Firm-wide plans coming soon. No booking fees or commissions." />
        </div>
      </section>
      <CtaStrip title="Create a free firm account – search, message, and pay reporters in one place." button={["Create a firm account", "/firm-signup"]} />
    </Page>
  );
}

// ═══ FOR REPORTERS ═════════════════════════════════════════════════
function ForReportersPage() {
  const store = useStore();
  return (
    <Page roomy>
      <MarketingHero eyebrow="For court reporters" title="Your whole business, minus the agency."
        sub="You're already in our directory – every licensed California CSR is. Claiming your profile is free, and firms can find and message you at no cost. Use the site to invoice and get paid, and you keep far more than any agency leaves you." />
      <div className="ds-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", marginTop: 8 }}>
        <FeatureBlock icon="user" title="Get discovered" body="A professional profile firms find when they search by county, area of law, language, and turnaround – without building a website of your own." />
        <FeatureBlock icon="message" title="Firms come to you" body="Firms message you directly through the platform. You choose who to work with, and on what terms – no agency deciding for you." />
        <FeatureBlock icon="dollar" title="No agency cut" body="Agencies take 30–50% off the top. Here there's none – just a small fee when you collect payment through the site, so you keep the rest. Your practice, your rate, your call." />
        <FeatureBlock icon="invoice" title="Invoicing in seconds" body="Create an invoice with the client, matter, and line items, and send it as a payment link. Every invoice is saved – a clean record of your whole book." />
        <FeatureBlock icon="bank" title="Get paid, and your tax forms" body="Collect by card or ACH straight to your bank, and get tidy income records plus the year-end 1099 Stripe issues for what you collect." />
        <FeatureBlock icon="shield" title="Verified once, via Stripe" body="Confirm your identity through Stripe Connect. It powers your payouts and shows firms you're the real, licensed reporter." />
      </div>
      <section style={{ marginTop: 52, background: "#F1F5F9", border: "1px solid var(--rule-strong)", borderRadius: 20, padding: "clamp(40px, 5vw, 60px) clamp(16px, 2vw, 24px)" }}>
        <div style={{ textAlign: "center", margin: "0 0 28px" }}>
          <h2 style={{ fontSize: "clamp(26px, 3.2vw, 40px)", lineHeight: 1.1 }}>What it costs</h2>
          <p style={{ fontSize: 17, color: "var(--ink-soft)", marginTop: 12, lineHeight: 1.6 }}>Getting listed and messaging firms is free. You only pay a small fee when you collect payment through the site – pay as you go, or a lower fee on Pro.</p>
        </div>
        <div className="ds-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          <PriceCard tone="brand" name="Free" price="$0" unit="/mo"
            blurb="Get listed, get found, and message firms – all free. Get paid as you go."
            features={["Claim your public profile", "Appear in the directory & search", "Add areas of law, coverage & rates", "Message firms directly", "Invoice & collect card / ACH payments for a small fee per transaction"]}
            cta={["Claim your profile", "/claim"]} note="Free to list and message. Getting paid costs 5% per payment, no monthly fee. Standard Stripe fees apply." />
          <PriceCard tone="brand" featured name="Pro" price="$29" unit="/month"
            blurb="Everything in Free, at a lower payment fee. Best once you invoice often."
            features={["Everything in the free plan", "2% per payment, not 5%", "The more you invoice, the more you save"]}
            cta={["Claim your profile", "/claim"]} note="$29/month + 2% per payment. Worth it once you're collecting roughly $970+/month. Standard Stripe fees apply." />
        </div>
      </section>
      <div style={{ background: "var(--brand-soft)", border: "1px solid var(--brand-pale)", borderRadius: 18, padding: 32, marginTop: 40, textAlign: "center" }}>
        <h3 style={{ fontSize: 26, color: "var(--brand-dark)" }}>Find your profile and claim it</h3>
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
    <div style={{ margin: "12px 0 40px" }}>
      <span className="kicker">{eyebrow}</span>
      <h1 className="h-section">{title}</h1>
      <p style={{ fontSize: 18, color: "var(--ink-soft)", marginTop: 20, lineHeight: 1.65 }}>{sub}</p>
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

// Pricing lives inline on the For firms / For reporters pages – no standalone pricing page.
function PriceCard({ tone, featured, name, price, unit, blurb, features, cta, note }) {
  const fg = tone === "sage" ? "var(--sage-deep)" : "var(--brand-dark)";
  return (
    <div className="ds-card" style={{ borderColor: featured ? "var(--brand)" : "var(--rule)", borderWidth: featured ? 2 : 1, position: "relative", display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: fg, textTransform: "uppercase", letterSpacing: ".04em" }}>{name}</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 10 }}>
          <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: price[0] === "$" ? 48 : 30, color: "var(--ink)" }}>{price}</span>
          <span style={{ color: "var(--muted)", fontSize: 15 }}>{unit}</span>
        </div>
        <p style={{ color: "var(--muted)", fontSize: 14.5, marginTop: 8, lineHeight: 1.5 }}>{blurb}</p>
      </div>
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
        {features.map((f, i) => <li key={i} style={{ display: "flex", gap: 10, fontSize: 14.5, color: "var(--ink-soft)" }}><Icon name="check" size={17} style={{ color: fg, flexShrink: 0, marginTop: 2 }} />{f}</li>)}
      </ul>
      <button className="btn btn-primary" style={{ justifyContent: "center", marginTop: "auto" }} onClick={() => navigate(cta[1])}>{cta[0]}</button>
      <p style={{ fontSize: 12.5, color: "var(--dim)", lineHeight: 1.5, textAlign: "center" }}>{note}</p>
    </div>
  );
}
