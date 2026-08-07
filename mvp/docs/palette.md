# Color palette

The concrete palette for the site. Decided 2026-07-24. Goal: stop looking generated. Two rules
do most of the work – **one accent, few notices.**

## The problem this fixes

The prototype had grown **six accent hue families** (brand indigo, a second indigo, periwinkle,
olive/ochre, sage-green, plum) and **~15 tinted callout bars**. That sprawl – not any one color –
is what read as "AI-coded." The fix is subtraction.

## The palette

### Accent – indigo only

- `--brand` `#4361EE` – the one accent. Links, primary buttons, selected states, focus.
- `--brand-dark` `#3346C9` · `--brand-soft` `#EEF1FE` · `--brand-pale` `#C6CEFA` – its ramp.

There is **no second accent color.** A sky blue like `#29ACE9` was considered and rejected: next
to `#4361EE` it reads as "two blues that don't quite agree." If we ever want a brighter identity,
that's a deliberate full rebrand (swap indigo out), not a second accent bolted on.

### Neutrals – the slate ramp (unchanged, keep)

`--ink` `#0F172A` · `--ink-soft` `#334155` · `--muted` `#64748B` · `--dim` `#94A3B8` ·
`--rule` `#E2E8F0` · `--rule-strong` `#CBD5E1` · surfaces `#FFFFFF` / `--bg-soft` `#F8FAFC`.
Most of the UI is neutrals. This is correct – lean on it.

### Notification colors – indigo or acid yellow. NEVER green.

**Hard rule (Aud, firm):** notifications / status callouts are **indigo** (default) or **acid
yellow** (attention). **No green, no olive.** Green/olive tints read as generic and "AI-coded"
and are banned from banners, pills, and status chips.

- **info / positive / status** – **indigo** (`--brand-soft` bg, `--brand-pale` border,
  `--brand-dark`/`--ink-soft` text). This is `.banner-info`, `.banner-ok`, and `.pill-claimed`.
- **attention / warning** – **acid yellow** (`#F7F8C6` bg, `#DCE224` border, `--ink-soft` text).
  This is `.banner-warn` (e.g. "not accepting new jobs", "sample profile") and a **focused
  attention CTA card** (see "Acid-yellow CTA card" below). Reserve acid-yellow *fill* for these two;
  everywhere else it's a micro-accent, never a page/section background.
- **error** – red `#DC2626`. Failures, destructive confirms.
- **Green is allowed in exactly two spots**, both universal conventions Aud asked for – nowhere else:
  1. the tiny "Recently active" **status dot** (`#22C55E`);
  2. the **"PAID" stamp on an invoice/receipt** (`#16A34A` border, `#15803D` text) – the paid-in-full
     rubber-stamp convention (added 2026-08-03). Note the paid *notification* banner stays **indigo**
     (`.banner-ok`, positive/status); only the stamp glyph itself is green.

### Acid yellow – accents, the warning notice, and the CTA card

- `#E2E929` (and the soft `#F7F8C6` fill) – small decorative accents, certain data-viz values, the
  **attention/warning banner**, and the **acid-yellow CTA card** below. Not for large decorative
  surfaces or page/section backgrounds.

### Acid-yellow CTA card

A focused call-to-action card can use the acid-yellow attention fill (`#F7F8C6` bg, `#DCE224`
border, navy/`--ink-soft` text, navy `.btn-primary`). Reference: the **"Is this you?" reporter-claim
card** on an unclaimed profile (`_app_05_directory.jsx`). Conventions:

- **No icon chip.** These cards drop the icon and lead with a short **uppercase eyebrow**
  (`--ink-soft`, 12px, weight 700, `.05em` tracking) over the serif heading. Cleaner than a colored
  icon tile, and keeps acid yellow the only accent on the card.
- **One accent per audience.** On a shared surface, pair the two accents by who the card speaks to:
  **acid yellow = the reporter** (claim/attention), **indigo = the firm** (invite/action). The
  unclaimed profile does exactly this – acid-yellow claim card + indigo firm-invite card – so the
  two paths read as distinct, not two shades of the same blue.
- Keep it a **compact card**, not a full-width band – acid yellow stays a highlight, never a wash.

### Retired

`--ochre` (olive), `--sage` (green), `--plum`, `--periwinkle`, the second `--accent` indigo – gone
from banners, pills, and status. `.banner-warn`/`.banner-ok`/`.pill-claimed` were moved off olive/
sage to indigo + acid yellow. Any remaining inline olive/sage (e.g. the messaging link-share
caution, some `StatCard` legacy tones) should migrate the same way – don't leave green in notices.

## Notices – quiet by default

Two levels, and the quiet one is the default:

- **`.ds-note` (default)** – no fill, hairline top/bottom rules, muted 13px text with a dim icon.
  For passive/informational notes ("Sample data", "read-only preview"). Defined in `_body_open.html`.
- **`.banner` (rare)** – a tinted callout. Reserve for a genuine, time-sensitive **success or
  error** the user must notice (payment sent, something failed). If it's just context, it's a
  `.ds-note`, not a banner. Every tinted banner should feel earned.

Rule of thumb: if you're adding a tinted bar and it isn't success/error, make it a `.ds-note`.

## Text links

**Text links are brand indigo `#4361EE`** (`var(--brand)`), weight 500. Not purple, not grey. This
was an open question ("blue or purple?") – answered blue, because the accent is indigo-only and
purple/plum is retired. Muted grey is for non-interactive metadata, not links.

## Buttons

**Button labels are short – a few words at most, ideally two or three.** A button is a control, not
a sentence; long labels wrap, look clumsy, and bury the action. Say the verb + the object and stop:
**"Save this reporter,"** "Message reporter," "New invoice," "Create account" – not "Create free
account and save Marguerite."

- **Never personalize a button with a person's name.** Keep labels generic so the same control
  reads the same on every profile and record, and never has to be rebuilt per name. Put the name or
  context in the surrounding copy, not on the button.
- Explanation, reassurance ("free for your firm"), and consequences belong in the **microcopy near
  the button**, never inside the label.
- **Color.** The **primary** button is **DEWEY navy** (`--ink`), white text (hover shifts to
  `--brand` indigo); the **secondary** button is the outlined/soft style. A **disabled** primary
  button dims to ~40% opacity and reads as grey until its required input is filled – e.g. "Send" in
  the invite modal stays grey until a contact email is entered, then turns navy. Grey is not a color
  choice here, it's the disabled state.
- **Placement (modals).** Modal action buttons are **right-aligned** (`justify-content: flex-end`),
  **Cancel (secondary) then the primary** on the far right – matching RequestInvoiceModal and the
  firm modals. A tertiary text link (e.g. "Copy the message") can sit on the left of the same row.
- **Placement (full-page flows).** On a **page** (not a modal), the **cancel/back is a text link at
  the top** (the `backLink` style, e.g. "Back to invoices" / "Cancel" in ClaimFlow, FirmSignup) –
  **not** a button in the bottom row. The primary action sits at the **bottom, primary first** (e.g.
  `Send invoice`, then secondary `Save as draft`); a tertiary like `Preview` is a right-aligned text
  link. **Don't** also put a bottom "Cancel" button – it just duplicates the top back-link
  (`InvoiceBuilder`, 2026-08-07).

## Subheads and section labels

Section subheads – the small uppercase labels that head a group of fields or a profile section –
are **brand indigo** (`--brand`), **not grey**. Grey (`--dim`) subheads recede too far and are hard
to read.

- Style: `color: var(--brand)`, **uppercase**, `font-weight: 700`, Inter, `letter-spacing: .05em`,
  ~12–15px. Reference: the profile section headers in `_app_05_directory.jsx` (the `var(--brand)`
  `<h2>` used for "About", "Coverage", etc.).
- This is the indigo accent doing a wayfinding job – consistent with "navy anchors, indigo accents."

There is a **second, larger kind of subhead**: the **serif section heading** that titles a card or a
panel of content (not a field-group label). These are the **Instrument Serif** `h3`-style headings.

- Size: **22px**, Instrument Serif, `color: var(--ink)` (navy), normal weight – the same size as the
  directory **"Filters"** sidebar heading and a directory reporter card's name. Standardized 2026-08-06;
  bumped up from the earlier 18–20px so section headings read as headings.
- Use it for card/section titles like the plan cards' **"Free" / "Pro"**, **"Your plan"**, **"Recent
  payments"**, **"Stripe Connect"** on the dashboards. Reference: `FirmSubscription` in `_app_10_firm.jsx`.
- Not to be confused with the small uppercase indigo field labels above (those stay ~12–15px), or with
  page **titles** (`h1`, the clamp() sizes bumped ~15% in commit b771104).
- **One step up (26px):** headings that title a **full-width page section** (not a card) go to **26px**
  Instrument Serif – e.g. the **Settings** page section headers and the marketing `CtaStrip`. So:
  field label ~12–15px → card/panel subhead 22px → page-section heading 26px → page title (h1).

## Cards & surfaces

Two card treatments (standardized 2026-08-06, replacing the old flat grey-bordered boxes):
- **Content cards** – white, floating on a **soft shadow**, with a near-invisible edge (`.ds-card`:
  default border is `--border-light`, not the old grey `--rule`). Use for dashboard tiles/tables,
  Settings sections, pricing cards. `StatCard` combines its inset accent bar with the same shadow.
- **Callout cards** – tinted (brand-soft / acid-yellow), **flat** (`.ds-card.flat`, no shadow) with
  their own colored border. Inline prompts/notices only, never body content.

**Settings vs. dashboards are different *areas* on purpose:** Settings uses a **left section-nav**
(`.settings-grid` / `SettingsPage`); the reporter/firm dashboards keep their **top tabs**. Same card
look, different navigation – so Settings reads as a separate part of the site.

## Icons

- **Library: Phosphor** (`@phosphor-icons`), **regular** weight, drawn on a 256 grid. Chosen over
  the old hand-rolled line set for more character while staying professional. (Duotone was tried
  and rejected – the shaded two-tone read as busy.) The `Icon` component (`_app_01_core.jsx`)
  supports both: a plain node is 24-grid stroke (legacy), `{ vb: 256, node }` is a Phosphor icon.
  Migrate the rest to Phosphor opportunistically; copy paths from the `assets/regular/` SVGs
  (single path, `fill="currentColor"`).
- **Icon color follows context** via `currentColor`. On the metric chips it's brand indigo.

## Metric / stat cards

The dashboard stat cards are the reference "stylized card": white surface, **DEWEY navy
left-accent bar** (`box-shadow: inset 3px 0 0 0 var(--ink)` – an inset shadow so it follows the
rounded corner, unlike a `border-left`), a **brand-soft icon chip** (`--brand-soft` bg, `--brand-pale`
border, `--brand` icon) top-left, then a serif number over a muted label. Navy anchors, indigo
accents – the two brand colors doing different jobs. Reuse this pattern for other metric rows.

## Navigation – rely on the browser's Back button

**No "back" text links.** They read dated and they lie about the destination. Instead, every
navigable surface is a real hash route so the browser's Back button just works:

- Dashboard **tabs are hash subroutes** (`#/reporter/profile`, `#/firm/messages`, …) via the
  `useRouteTab` helper, so switching tabs is a history entry and Back returns to the previous tab
  instead of jumping out of the dashboard.
- Profile pages have no back button – Back returns you to wherever you came from (directory,
  dashboard, an invite link), correctly, because you actually navigated there.

## Voice

Plain language, sentence case, en-dashes (–) never em-dashes (—) – same as the rest of the site.

**Sentence case applies to values pulled from external data too, not just our own copy.** The CA CRB roster stores some fields in title case (e.g. county `"Out of State"`); render them in sentence case (`"Out of state"`) at display time. Never rewrite the source data – normalize in the display helper. For out-of-CA reporters we show just `Out of state` (no city, no "county" label) – their physical city (e.g. Alpine, UT) isn't a California location and reads like a CA town. See `isOutOfState()` in `src/_app_02_data.jsx`.
