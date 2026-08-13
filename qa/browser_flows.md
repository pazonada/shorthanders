# Browser QA — repeatable click-through flows

The UI layer of the QA gate. Drive the running app, walk the critical flows, and assert on each.
Run it before every deploy that touches a flow below. Claude can execute this via the browser tools;
you can also do it by hand.

## Setup (once per session)

1. Start the dev server (from `.claude/launch.json`): the **`dev`** config (`npx serve` on :8080).
2. Open the app at `http://localhost:8080/mvp/#/`.
3. It's a **hash-routed SPA built with in-browser Babel** — a hash change does NOT reload code.
   After a rebuild (`bash mvp/build.sh`), do a **full reload** to load the new code. `serve` caches,
   so hard-reload if a change doesn't show.
4. Load the assertions: eval `qa/assertions.js` in the tab → gives you `window.dsQA`.

## The flows

Each flow: **do**, then **assert**. Console + network are checked with the browser tool
(`read_console_messages` onlyErrors, `read_network_requests`), not `dsQA`.

### 1. Firm signup → dashboard → welcome modal
- **Do:** `/firm-signup` → fill firm + your name → Continue → email + password → Create account.
- **Assert:** lands on `#/firm`; a `.modal-overlay` is present; pill "Your firm account is ready";
  two buttons — `dsQA.buttonOrder(/dashboard|directory/)` → `Go to my dashboard` left, `Browse the
  directory` (primary) right. Click primary → modal closes, route = `#/directory`.
- **Once-only:** dismiss, switch tabs, and reload → modal does NOT return (`document.querySelector('.modal-overlay')` null).
- **Greeting:** title = `Hello, {first name}`, subtitle = `{firm} · Firm account`.

### 2. Reporter claim → dashboard → welcome modal
- **Do:** `/claim` → By name → search → This is me → Yes → Continue → Continue to Stripe (demo
  fallback) → Continue → Save to my profile.
- **Assert:** lands on `#/reporter`; welcome modal pill "Your profile is claimed"; title
  `Hello, {first}`; single primary `Explore my dashboard`. Wizard step rows: `dsQA.buttonOrder(/Back|Continue|Save/)`
  → **Back far-left, primary far-right** (space-between).

### 3. Invoice: new → picker → builder → preview
- **Do:** `/reporter/invoices/new` → pick a template → fill client + a rate → Preview.
- **Assert:** entering Preview, `dsQA.scrollY()` ≈ 0 (scroll-to-top on toggle). Preview button row
  `dsQA.buttonOrder(/Save as draft|Back to edit|Send invoice/)` → **Back to edit left**, Save as
  draft, **Send invoice (primary) right**. No grey `Back to…` breadcrumb anywhere.

### 4. Unsaved-changes guard
- **Do:** open profile editor / invoice builder, edit a field.
- **Assert:** `dsQA.guardArmed()` === true. On Save, re-check → false (re-baselined).
- **⚠ Manual:** the actual `window.confirm("Discard your changes?")` on Cancel / browser-Back
  **can't be automated** (dialogs auto-dismiss). Click through it by hand once per release.

### 5. Directory + PII
- **Do:** open `/directory`, then a reporter profile.
- **Assert:** `dsQA.noRawEmails()` PASS on both (no unmasked emails in the page — the ~5,700-email
  scar). Firm gate blur is **cosmetic today**; when the backend lands, re-test that gated data is
  absent from the page source, not just visually blurred.

### 6. Cross-page console sweep
- Visit `/`, `/directory`, `/for-firms`, `/for-reporters`, `/reporter`, `/firm`, `/settings`.
- **Assert:** `read_console_messages` onlyErrors returns only the benign Babel size note. The
  `POST /api/connect/create-account → 404` is the intentional Stripe-demo fallback (goes away when
  the real function is live).

## Known limits (learned the hard way — don't be fooled by them)

- **`window.confirm` / `alert` auto-dismiss** under automation → verify via state (`dsQA.guardArmed`), flag a manual click.
- **Backgrounded/hidden tab pauses `requestAnimationFrame`** and can report **0-width viewport** →
  `dsQA.viewportOk()` before any scroll/geometry/animation assert; `resize_window` to a real size first.
- **Browser QA can't confirm money actually moved or an email actually landed.** That is the
  **test-mode E2E layer** below — add it when the backend exists.

## Later: the money/email layer (test mode, needs the backend)

Not clickable — assert against Stripe/Resend test mode:
- Invoice → firm pays (card **and** ACH) → your `application_fee` is taken → payout lands in the
  test connected account (inspect in the Stripe dashboard).
- Pro + firm subscriptions bill monthly.
- `stripe trigger` a **duplicate** webhook → your handler is idempotent (no double-count).
- Every email (invite, invoice notice) is delivered to a real inbox and not spam-flagged.
- The webhook is the **source of truth** — a client "success" redirect never marks paid on its own.
