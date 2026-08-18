# Rename runbook — "Dewey Sholes" → "Shorthanders"

**Why:** renaming off "Dewey Sholes" to remove the name-based risk from the Rosie situation
(she's non-responsive; "Dewey" is her late mother's surname). See the rosie-advisor memory +
`project_domains`.

**New name:** _TBD._ Post-trademark-scan front-runner = **`courtreporterfinder.com`** (already owned;
generic → low conflict risk; instantly clear; method-neutral). `verbatimrecord` was ruled out — the
scan found existing *Verbatim* court-reporting firms (crowded, in-field confusion risk).

This runbook is **name-agnostic** — every step works for whatever final name is chosen. Plug it in.
Owner tags: **YOU** = only you can do it · **CLAUDE** = ask me. Nothing here is legal advice.

---

## Phase 0 — Lock the name (do first)
- [ ] Final name chosen; the `.com` is in hand. **YOU**
- [ ] Trademark posture accepted. For a **generic** name (courtreporterfinder) there's no mark to
      register and nothing to collide with — fine to use, just not ownable. For a **distinctive**
      name, run the free [USPTO TESS](https://www.uspto.gov/trademarks/search) check first. **YOU**
- [ ] Note: the pending "Dewey Sholes" TM filing fee is **sunk** — a rename is a new application, and
      a pending mark can't be edited to a new name. Skip re-filing unless you want a stylized/logo mark.

## Phase 1 — Domain, DNS, email (the infrastructure identity)
- [ ] Point the new domain's DNS at the registrar. **YOU**
- [ ] **Google Workspace:** add + verify the new domain; move primary mail (aud@, hello@) onto it;
      keep `deweysholes.com` receiving/forwarding for a while so nothing is lost. See
      `project_email_infrastructure`. **YOU**
- [ ] **Email auth on the new domain:** SPF, DKIM, DMARC. **YOU + CLAUDE**
- [ ] **Postmark** (account already set up): verify the new sending domain; add its DKIM +
      return-path records; confirm SPF. Transactional mail only — cold CSR outreach stays on
      Workspace mail-merge (`project_email_outreach_and_analytics`). **YOU + CLAUDE**
- [ ] **Redirects (301):** point the OTHER descriptive domains you own — and `deweysholes.com` —
      at the new primary (csrfinder, courtreporterdirectory, cacsrs, cacourtreporters, findacsr,
      + verbatimrecord if bought). Free SEO, no waste. **YOU**

## Phase 2 — Code + content rename (the app)  **CLAUDE (mostly)**
- [ ] Global replace `Dewey Sholes` / `deweysholes` / `dsmvp` across `mvp/src/*`, `mvp/docs/*`,
      and meta. Watch for the logo wordmark, the nav lockup, and email/invite copy.
- [ ] Page `<title>`, meta description, and Open Graph / share tags → new name.
- [ ] **Share image:** `mvp/graphics/DS-share-image.png` has the name **baked into the picture**
      (see `launch_prep.md` Phase 2) → re-export with the new wordmark. **YOU (design) + CLAUDE (wire)**
- [ ] Logo / wordmark / favicon → new brand.
- [ ] Footer, About, prototype Terms/Privacy placeholders, invite templates → new name.
- [ ] `bash mvp/build.sh`, commit the built `mvp/index.html`.
- [ ] `python3 mvp/scripts/preflight.py` — catches leftover "Dewey Sholes" + share/meta issues.

## Phase 3 — Hosting (Vercel)  **YOU + CLAUDE**
- [ ] Rename the Vercel project (`dsmvp` → new); add the new domain; leave the old `.vercel.app`
      alive during the transition so nothing 404s.
- [ ] Update the handful of places the domain string is referenced for canonical + share previews
      (`launch_prep.md` Phase 7).

## Phase 4 — Backend naming (only when you wire it — not built yet)  **CLAUDE**
- [ ] Supabase project named under the new brand.
- [ ] Stripe account business name + **statement descriptor** = new name (this is what shows on a
      firm's card statement — it must be the new brand, not "Dewey Sholes").
- [ ] Do these under the new name as you build them (`integration_checklist.md`), no re-do later.

## Phase 5 — Entity / legal  **YOU**
- [ ] File the **DBA**: Studio Crux, LLC "doing business as [NEW NAME]" (NJ C-150G, ~$50) — once the
      name is final, since a DBA is a public record. See `project_entity_dba_and_infra`.
- [ ] Rosie: the rename removes the "Dewey" lever. A short written "no claim to this business"
      acknowledgment is belt-and-suspenders if ever obtainable, but is **not** required to proceed.
- [ ] Assign the new domain (+ any future mark) to the operating entity.

## Phase 6 — Verify  **CLAUDE + YOU**
- [ ] Nothing anywhere still says "Dewey Sholes" — code, docs, meta, the share image, email templates.
- [ ] Paste the new link into Slack/iMessage → the preview shows the new name + image.
- [ ] Standing rule: no internal docs or reporter PII served by the live site (confirm the usual
      404s — `feedback_never_deploy_reporter_pii`).

---

**Sequencing note:** Phases 0–3 can happen now (frontend rename + domain/email). Phase 4 rides along
with the backend build. Phase 5 (DBA) once the name is truly final. Keep `deweysholes.com` and the
old Vercel URL alive through the switch so no existing link dies.
