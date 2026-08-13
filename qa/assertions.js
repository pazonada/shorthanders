// Dewey Sholes — reusable browser-QA assertions.
// Paste/eval this in the app tab (via the browser tool's javascript_tool) to get window.dsQA.
// These cover DOM / route / state / PII checks. Console + network checks come from the browser
// tool itself (read_console_messages / read_network_requests), not page JS — the page can't read
// its own past console output reliably. See qa/browser_flows.md.
(function () {
  const q = (sel) => [...document.querySelectorAll(sel)];
  const text = () => document.body ? document.body.innerText : "";

  const dsQA = {
    // Current hash route, e.g. "#/firm".
    route() { return location.hash || "(none)"; },

    // Precondition for any GEOMETRY / scroll / layout assert: a real, sized viewport. A 0-width
    // viewport (seen when the automated pane glitches) makes buttonOrder/scrollY lie — resize first.
    // Note: under automation document.visibilityState is *always* "hidden", which pauses
    // requestAnimationFrame — that's why the flows use non-rAF checks. Width, not visibility, is the
    // gate that matters here; it's reported too so you can see both.
    viewportOk() { return { pass: window.innerWidth > 0 && window.innerHeight > 0, detail: { w: window.innerWidth, h: window.innerHeight, vis: document.visibilityState } }; },

    // Assert an element matching a CSS selector, or containing exact text, exists.
    exists(selOrText) {
      const bySel = (() => { try { return q(selOrText).length > 0; } catch (e) { return false; } })();
      const byText = q("*").some((el) => el.children.length === 0 && el.textContent.trim() === selOrText);
      const pass = bySel || byText;
      return { pass, detail: selOrText };
    },

    // PII SMOKE CHECK (the ~5,700-email scar). Flags any UNMASKED email in the rendered page.
    // Masked contacts look like m***@domain — those are fine; raw ones are a leak.
    noRawEmails() {
      const found = (text().match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g) || [])
        .filter((e) => !e.includes("***"));
      return { pass: found.length === 0, detail: [...new Set(found)].slice(0, 10) };
    },

    // Unsaved-changes guard armed? (history.state.dsGuard). Use to verify a dirty form traps Back.
    // NOTE: the actual window.confirm("Discard?") dialog can't be exercised by automation (it
    // auto-dismisses) — this only proves the trap is armed. Flag a manual click-test.
    guardArmed() { return !!(window.history.state && window.history.state.dsGuard); },

    // Scroll position of the document. atTop() after a view swap, etc.
    scrollY() { return Math.round(window.scrollY); },

    // Left-to-right order of buttons whose label matches `re`. Verifies button conventions:
    // primary-rightmost for dialogs, Back-far-left for wizards. Returns [{t, x, primary}].
    buttonOrder(re) {
      return q("button").filter((b) => re.test(b.textContent))
        .map((b) => ({ t: b.textContent.trim(), x: Math.round(b.getBoundingClientRect().left), primary: b.classList.contains("btn-primary") }))
        .sort((a, b) => a.x - b.x);
    },

    // Run a batch: pass an object of {name: ()=>result}. Returns a compact pass/fail summary.
    run(cases) {
      const out = {};
      for (const [name, fn] of Object.entries(cases)) {
        try {
          const r = fn();
          out[name] = (r && typeof r === "object" && "pass" in r) ? (r.pass ? "PASS" : "FAIL " + JSON.stringify(r.detail)) : r;
        } catch (e) { out[name] = "ERROR " + e.message; }
      }
      return out;
    },
  };

  window.dsQA = dsQA;
  return "dsQA ready — route/viewportOk/exists/noRawEmails/guardArmed/scrollY/buttonOrder/run";
})();
