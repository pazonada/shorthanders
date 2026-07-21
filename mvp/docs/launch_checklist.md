# Launch checklist – taking the MVP public

Run this before the MVP is a real, indexable site with real money moving through it.
Last updated 2026-07-21.

There are two halves: the **automated** check (metadata, house style, leftovers) and the
**manual** half (things a script can't see). Do the automated one first – it's free.

## 1. Automated: run the preflight

```
python3 mvp/scripts/preflight.py
```

It checks the built `mvp/index.html` for: title and description presence + length, the full
Open Graph and Twitter card set, canonical URL, favicon, `robots.txt`, a leftover `noindex`,
em-dashes (house style is en-dash only), and leftovers that must never ship – `localhost`
URLs, `TODO`/`FIXME`, lorem ipsum.

`FAIL` = must fix. `WARN` = look at it. `NOTE` = expected while this is still a prototype.
It exits non-zero on any FAIL, so it can gate a deploy script later.

**Rebuild before running it** (`bash mvp/build.sh`) – it reads the built file, not `src/`.

### Known open FAIL

- **`og:image`** – there is no share image yet. Needs a real 1200x630 asset (the link preview
  card people see in Slack, iMessage, LinkedIn). Once it exists, drop it in `mvp/graphics/`
  and add `og:image` + `twitter:image` to `src/_head.html` as absolute URLs.

## 2. If the domain changes

Moving off `dsmvp.vercel.app` means updating, in lockstep:

- `mvp/src/_head.html` – `canonical`, `og:url` (both currently hardcoded, with a comment)
- `mvp/robots.txt` – the `Sitemap:` line
- `mvp/scripts/preflight.py` – the `SITE_URL` constant, or the origin checks will pass
  against the wrong host

## 3. SEO reality check (read before spending effort here)

The app is a **hash router** (`#/directory`, `#/pricing`). Search engines do not index hash
fragments as separate pages – **the entire site is one indexable URL**. So:

- The `title` and `meta description` you have are the *only* ones Google will use, for
  everything. They're doing all the work.
- A `sitemap.xml` would list exactly one URL, which is why the preflight only WARNs on it.
- If organic search matters – especially reporters searching their own name, or firms
  searching "court reporter <county>" – that needs real per-page URLs, which means routing
  changes and server-side rendering. That's a project, not a checklist item. Decide whether
  it's worth it before launch, because retrofitting URLs later breaks links.

## 4. Before real traffic

- **Precompile the JSX.** The page currently ships `babel-standalone` and transforms in the
  browser on every load. Fine for a prototype, slow and fragile for real users.
- **The prototype is faked end to end.** Auth, data, payments, and messaging are all
  in-browser and reset on refresh. Everything that needs wiring is in
  `integration_checklist.md` – Supabase, Stripe (Connect, invoicing, the 2%/5% application
  fee, subscriptions, webhooks, 1099-K), Resend, server-side search, server-enforced firm gate.
- **Remove the prototype affordances**: the persona shortcut buttons in the login modal, and
  any "demo" toggles (e.g. the `firmPlan` free/pro switch that demos the firm gate lifting).
  The preflight NOTE counts these; it should reach zero.

## 5. Money and legal gates

- **Prices on the site are working numbers, not decisions.** The 2% / 5% split and any
  subscription price must be confirmed before they're public – see
  `open_strategic_decisions.md` and `../marketing/pro_pricing_worksheet.md`. Never publish an
  invented number.
- **Deposition-neutrality question** must be answered by a reporting-industry attorney before
  real money moves – `legal_question_deposition_neutrality.md`.
- **Terms of service** need a real legal review. What's on the site now is described in its
  own copy as prototype language, not final terms.

## 6. Last look

- Load the built page and click through every route.
- Check the link preview by pasting the URL into Slack or iMessage (this is what `og:image`
  is for).
- Check it on a phone.
- Confirm `dewey-sholes.vercel.app` still serves the archived v1 prototype and that the two
  sites haven't been crossed – see `../../V1_ARCHIVE.md`.
