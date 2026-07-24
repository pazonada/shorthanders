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

## Voice

Plain language, sentence case, en-dashes (–) never em-dashes (—) – same as the rest of the site.
