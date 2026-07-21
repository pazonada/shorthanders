# Launch prep – everything that has to happen before Dewey Sholes is real

A working to-do list. Tick things off as they're done. Last updated 2026-07-21.

**Who does what:**
**YOU** = a decision or a design only you can make · **CLAUDE** = I can do it, just ask ·
**ENGINEER** = needs a real developer · **LAWYER** = needs an actual attorney

**Right now the site is a prototype.** Nothing is real: no accounts, no database, no payments.
Everything resets when you refresh the page. The list below is the distance between that and a
site that takes money.

---

## Phase 1 – Decisions only you can make

Nothing else can be finalized until these are settled. **No number goes on the site until you
confirm it** – the site currently shows working numbers, not decisions.

- [ ] **What does "launch" mean?** A quiet opening to a handful of reporters is a very different
      list from a public launch. Pick one, because it changes how much of Phase 3 you actually
      need on day one. **YOU**
- [ ] **Confirm the reporter fee.** The site currently says 2% (Pro) or 5% (Free). Are those the
      real numbers? See `open_strategic_decisions.md` and `../marketing/pro_pricing_worksheet.md`. **YOU**
- [ ] **Confirm the Pro monthly price.** $29 has been floated, never decided. **YOU**
- [ ] **Confirm the firm subscription price**, or decide firms launch free. **YOU**
- [ ] **Pick the real domain.** Right now it's `dsmvp.vercel.app`. If you want
      `deweysholes.com`, buy it before launch, not after – changing the address later costs you
      any search traffic you've built. **YOU**

## Phase 2 – Design work you owe

- [x] **A share image, 1200 x 630 pixels.** ~~This is the picture in the preview box when your
      link is pasted into Slack, iMessage, or LinkedIn.~~ **Done 2026-07-21** – logo lockup over
      the shorthand pattern, with "Where California law firms and certified court reporters
      connect" on navy. Lives at `mvp/graphics/DS-share-image.png` (editable source alongside it
      as `.psd`). Note the wording on the image differs slightly from the site tagline, which is
      fine – but if the tagline changes, the image has to be re-exported to match. **YOU**
- [ ] **Check the site on a real phone**, not a resized browser window. **YOU**

## Phase 3 – Making it actually work

This is the big one, and it's real engineering. Everything here is spelled out in
`integration_checklist.md`.

- [ ] **Accounts and login** – so people can sign up and their account still exists tomorrow.
      (Supabase.) **ENGINEER**
- [ ] **A real database** – so profiles, messages, and invoices are stored instead of vanishing
      on refresh. **ENGINEER**
- [ ] **Payments** – reporters getting paid by card or bank transfer, your fee coming out
      automatically, subscriptions billing monthly, and year-end tax forms. (Stripe.) **ENGINEER**
- [ ] **Email** – invites, invoice notifications, the reporter outreach campaign. (Resend.) **ENGINEER**
- [ ] **Messaging that actually delivers**, rather than only existing in one browser. **ENGINEER**
- [ ] **Server-side search** – the directory currently searches 5,705 records in the visitor's
      browser, which will get slow. **ENGINEER**
- [ ] **Lock the firm gate properly.** Today the "upgrade to see this profile" blur is
      cosmetic – the data is still in the page and a determined person can read it. It has to be
      enforced on the server before it's protecting anything real. **ENGINEER**
- [ ] **Make the site load faster.** It currently rebuilds itself in the visitor's browser on
      every visit, which is fine for a demo and sluggish for real traffic. **ENGINEER**

## Phase 4 – Cleaning out the prototype

- [ ] **Remove the fake login shortcuts.** The login box has one-click buttons for pretend
      users. Those cannot be there on a real site. **CLAUDE**
- [ ] **Remove the demo toggles**, like the free/Pro switch that exists to show off the firm
      gate. **CLAUDE**
- [ ] **Read every page start to finish** with fresh eyes, checking that nothing describes the
      old v1 model (12% fee, matching, scheduling). **YOU**
- [ ] **Confirm every number on the site is real** – rates, fees, the 5,705 count, the invoice
      figures in the money comparison. **YOU**

## Phase 5 – Legal, before any money moves

- [ ] **The deposition-neutrality question.** Whether a platform can sit between a firm and a
      reporter without compromising the reporter's required neutrality. This is the one that
      could change the product, so ask early. Brief is written:
      `legal_question_deposition_neutrality.md`. **LAWYER**
- [ ] **Real terms of service.** What's on the site now says in its own text that it's prototype
      language. **LAWYER**
- [ ] **Real privacy policy**, same situation. **LAWYER**

## Phase 6 – The final pass

Do this last, right before you go live.

- [ ] **Rebuild the site** so you're checking the current version:
      ```
      bash mvp/build.sh
      ```
      **CLAUDE**
- [ ] **Run the checker:**
      ```
      python3 mvp/scripts/preflight.py
      ```
      It inspects the invisible details – the blurb Google shows, the share preview, and
      leftovers that shouldn't ship. It prints a list; anything marked FAIL has to be fixed.
      Ask me to run it if you'd rather. **CLAUDE**
- [ ] **If you changed the domain in Phase 1**, three places need updating to match, or the
      share previews and Google listing will point at the old address. Tell me the new domain
      and I'll handle it. **CLAUDE**
- [ ] **Click every page and every button** on the finished site. **YOU**
- [ ] **Paste the link into Slack or iMessage** and confirm the preview looks right. This is
      what the share image from Phase 2 is for. **YOU**
- [ ] **Confirm `dewey-sholes.vercel.app` still shows the old v1 prototype** and the two sites
      haven't been crossed. See `../../V1_ARCHIVE.md`. **CLAUDE**

## Phase 7 – After you're live

- [ ] **Add analytics**, so you know whether anyone is showing up. **CLAUDE**
- [ ] **Watch the first real signups closely.** The first reporter who claims a profile and the
      first firm that pays an invoice will find things no checklist did. **YOU**

---

## One thing worth understanding

Google will only ever see this site as **a single page** – not separate listings for Directory,
Pricing, For Firms, and so on. That's a consequence of how the site is put together.

What it means practically: the one description you wrote is the only description Google will
ever show, for everything. It also means a reporter searching their own name will not find their
Dewey Sholes profile.

If search traffic turns out to matter – especially reporters finding themselves – fixing it is a
real project, not a setting. Worth deciding before you spend money on marketing, and much
cheaper to do before launch than after.
