# Dewey Sholes — reduced-scope MVP prototype

A second, parallel prototype that implements the narrowed MVP in [`prd-v1.rtf`](prd-v1.rtf):
a **searchable directory of independent California court reporters** plus the
**business tools** a reporter needs to get paid. No job matching, scheduling,
escrow, ratings, or reviews — those are explicitly out of scope.

This lives alongside the original full-vision prototype (repo-root `index.html`),
which is untouched and still deployed to the current live URL.

## What's here

| File | Role |
|---|---|
| `index.html` | **The deployable artifact.** Self-contained React-via-Babel app. |
| `csr_profiles.js` | ~4,700 real public CA CSR license records (name, number, city, expiration). |
| `src/` | Modular source parts that assemble into `index.html`. Edit these. |
| `build.sh` | Concatenates `src/*` → `index.html`. Run after any edit. |
| `prd-v1.rtf` | The revised PRD this prototype implements. |

Reuses the original prototype's design system verbatim (tokens, Instrument Serif
headings, Inter body, pill buttons, periwinkle palette).

## The 7 features (all clickable in the prototype)

1. **Public directory** — every licensed CSR, searchable before anyone claims a profile.
2. **Profile claiming** — confirm identity → create account → Stripe Connect verify → enrich.
3. **Search & filtering** — county, language, experience, work type, rush; claimed profiles rank first.
4. **Direct messaging** — text + **pass-through secure links only** (platform stores no files).
5. **Stripe Connect onboarding** — mocked Express flow (KYC/identity/tax/banking on Stripe's side).
6. **Invoice creation** — client, matter ref, line items → sendable payment link.
7. **Payment processing** — status tracking (draft / sent / paid / overdue).

Revenue model shown is **Option A**: firms pay a monthly subscription; reporters are free.

## Try it locally

The repo dev server (`npx serve`) serves the repo root, so open (note the
**trailing slash** — without it, `csr_profiles.js` resolves against the repo root
and loads the wrong file; on Vercel with root `mvp/` this isn't an issue):
`http://localhost:8080/mvp/`

The directory runs on `csr_profiles.js` — 5,705 active CSRs with county + public
email, generated from the CRB pull (see `data/generate_profiles.py`). The script
tag is versioned (`csr_profiles.js?v=…`); bump the version when you regenerate to
bust browser caches.

Use the **Log in** menu (top right) to jump in as a demo reporter (Adam Elwailly,
CSR #14585) or a demo firm (Morgan & Reyes LLP). All state is in-memory mock data.

## Editing

1. Edit the relevant part in `src/` (e.g. `src/_app_05_directory.jsx`).
2. Run `./build.sh` to regenerate `index.html`.
3. Reload the preview.

Keep JSX comments single-line ASCII, and use string concatenation (not template
literals) inside JSX ternaries — the in-browser Babel transformer mishandles both.
Use en-dashes (–), never em-dashes (—), in all copy.

## Per-reporter claim deep links (for outreach)

Every active CSR gets a one-click claim link:

```
<base>/#/claim/<licenseNumber>
```

e.g. `https://deweysholes-mvp.vercel.app/#/claim/11964` drops that reporter
straight onto their "Is this you?" confirmation, skipping the lookup. The
`csr_active_directory.csv` already has a **Claim URL** column for mail merge —
regenerate it with your real domain:

```bash
DS_CLAIM_BASE=https://your-real-url.vercel.app python3 data/build_spreadsheet.py
```

Links to already-claimed profiles show a "already claimed / sign in" screen;
unknown license numbers show a "find my profile" fallback.

## Deploying to a NEW Vercel URL (clean link)

A separate Vercel project keeps this MVP on its own URL while the original
full-vision prototype (root `index.html`) stays on its current URL. One-time
setup in the Vercel dashboard:

1. **New Project** → import the same GitHub repo (`pazonada/dewey-sholes`).
2. **Root Directory** → `mvp`.
3. Framework preset: **Other**. No build command; Vercel serves `index.html`
   statically and auto-detects the `api/` folder as serverless functions.
4. Add environment variables (see Stripe below) — start with **test** keys.
5. Deploy. The app is served at the project root (a clean `…/` URL, no `/mvp/`
   path and no trailing-slash issue), with the `api/*` endpoints live.

`vercel.json` sets `index.html` to revalidate on every load, so a redeploy is
never masked by a stale cache. `node_modules`, `.env*`, and `crb_all_raw.json`
are git-ignored.

## Stripe integration (test-mode scaffold)

Real Stripe Connect can't run purely client-side — secret keys must live on a
server. This repo adds Vercel **serverless functions** (`api/`) for it:

| Endpoint | Purpose |
|---|---|
| `POST /api/connect/create-account` | Create a reporter's Stripe Connect Express account + hosted onboarding link |
| `GET /api/connect/status` | Check whether onboarding is complete |
| `POST /api/pay/create-payment-link` | Create a card + ACH payment link for an invoice |
| `GET /api/health` | Reports whether a Stripe key is configured |

The frontend calls these when deployed and **falls back to the simulated flow
when the backend isn't present**, so the local `npx serve` demo still works.

### Go-live checklist (test mode)

1. Create a Stripe account; grab your **test** secret key (`sk_test_…`).
2. In Vercel → Project → Settings → Environment Variables, set
   `STRIPE_SECRET_KEY`. (See `.env.example`.)
3. In Stripe → Connect settings, enable **Express** accounts.
4. Redeploy. Now "Continue to Stripe" in the claim flow does real onboarding,
   and "Send invoice" creates a real test payment link (pay with test card
   `4242 4242 4242 4242`).
5. Flip to live keys only when you're ready to take real money.

## Supabase (Phase 1: persistence for the money path)

The 5,705 **unclaimed** CSR records stay static in `csr_profiles.js`. Supabase
only holds what users create: claimed profiles, Stripe accounts, invoices, and
messages. `supabase/schema.sql` defines it.

The serverless functions use the **service role** key and degrade gracefully —
without Supabase env set, Stripe still works, it just doesn't persist.

| File | Uses Supabase for |
|---|---|
| `api/connect/create-account.js` | Upsert reporter ↔ Stripe account on onboarding |
| `api/pay/create-payment-link.js` | Record the invoice as "sent" with its payment link |
| `api/stripe-webhook.js` | `account.updated` → payout flags; payment success → mark invoice paid |

### Setup

1. In Supabase: create a project → SQL editor → paste and run `supabase/schema.sql`.
2. Project Settings → API: copy the **Project URL** and the **service_role** key.
3. In Vercel env vars, set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`
   (plus the Stripe vars above).
4. In Stripe → Developers → Webhooks, add an endpoint pointing at
   `https://<your-vercel-url>/api/stripe-webhook`, subscribe to
   `account.updated`, `payment_intent.succeeded`, `checkout.session.completed`,
   and set `STRIPE_WEBHOOK_SECRET`.
5. Redeploy. The webhook needs a live test (the raw-body signature check can't be
   exercised locally) — fire a test event from the Stripe dashboard to confirm.

### Phase 2 (next) — frontend auth + real data

Still to do to make the app fully real: add the `@supabase/supabase-js` browser
client (anon key) for **sign-in** (reporters + firms via Supabase Auth), and swap
the in-memory mock store for real reads/writes (claimed profiles, invoices,
messages, saved reporters). The RLS policies in the schema are written for that
client. This is the larger build and the natural "bring in an engineer" point.
