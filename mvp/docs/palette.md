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

### Semantic – three, used only for status, sparingly

- **success** – one green (`--sage-deep` `#4F6F4D` on `--sage-soft`). Payment received, connected.
- **warning** – amber (`--ochre` family, or a truer amber). Attention, not error.
- **error** – red `#DC2626`. Failures, destructive confirms.

Semantic colors mean *status*. They are not decoration. A green card is a success state, not "a
green card."

### Acid yellow – reserved micro-accent

- `#E2E929` – **allowed only for small decorative accents and certain data-viz values.** A "new"
  dot, a highlight underline, one series in a chart. **Never** a background fill behind text, a
  notice, or a surface – it's too low-contrast and too loud at size.

### Retired as decorative accents

`--ochre` (olive), `--sage`, `--plum`, `--periwinkle`, the second `--accent` indigo – stop using
these as decoration. Sage survives only as the single success green; ochre only as warning. The
rest should migrate to neutrals or brand over time. (Legacy usages still exist – e.g. the
`StatCard` tones on the reporter overview and several `.banner` instances. Migrate opportunistically;
don't churn the whole app in one pass.)

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
