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
  This is `.banner-warn` (e.g. "not accepting new jobs", "sample profile"). This is the one place
  acid yellow is a fill.
- **error** – red `#DC2626`. Failures, destructive confirms.
- **The one green allowed:** the tiny "Recently active" **status dot** (`#22C55E`) – a universal
  online/active convention Aud asked for. Green appears nowhere else.

### Acid yellow – accents + the warning notice

- `#E2E929` (and the soft `#F7F8C6` fill) – small decorative accents, certain data-viz values, and
  the **attention/warning banner** above. Not for large decorative surfaces.

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
