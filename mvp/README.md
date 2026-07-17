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

## Deploying to a NEW Vercel URL

The goal is a separate URL from the live site, so both prototypes stay reachable.
Because Vercel can't be configured from here, do this once in the Vercel dashboard:

1. **New Project** → import the same GitHub repo (`pazonada/dewey-sholes`).
2. Set **Root Directory** to `mvp`.
3. Framework preset: **Other** (no build step — it's static). Leave build/output empty.
4. Deploy. Vercel serves `mvp/index.html` at the new project's URL, with
   `mvp/csr_profiles.js` resolved alongside it.

The existing project (root `index.html`) is unaffected and keeps its current URL.

> Tip: `src/`, `build.sh`, and `prd-v1.rtf` will also be uploaded but are never
> linked from the page. If you'd rather not serve them, add a `.vercelignore`
> in `mvp/` listing `src`, `build.sh`, and `prd-v1.rtf`.
