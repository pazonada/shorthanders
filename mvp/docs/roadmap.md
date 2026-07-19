# Roadmap — features beyond the current build

Ideas we want on record but aren't building right now (or have a basic version and want to
extend). Not commitments — a parking lot with enough detail to pick up later.

---

## Favorite / save a reporter (firms) — ALREADY IN MVP, room to grow

**What it is:** a firm marks a reporter to come back to later.

**Status:** already built. Every profile has a "Save reporter" button, and the firm dashboard
has a "Saved reporters" tab. Signed-in firms get this today.

**Should it be MVP?** Yes — it already is. It's cheap, and it's a good reason for a firm to
create an account (their saves only persist if they're signed in). For someone browsing
without an account, a plain browser bookmark is the natural fallback.

**Later extensions:**
- Notify a firm when a saved reporter updates their profile or notes new availability.
- Shared team lists (multiple people at a firm see the same saved reporters) — fits the paid
  firm plan.
- Notes/tags on a saved reporter ("used for the Ramos depo," "great on medical terminology").

---

## Reporter business card generator — ROADMAP

**What it is:** a link on a reporter's profile/dashboard that generates a printable,
Dewey-Sholes-branded business card pulled from their profile, with a QR code / short link
back to their profile. The reporter prints it and hands it to attorneys at hearings, so the
attorney can find them later to order the transcript.

**Why it's worth building:**
- **Free, professional marketing for the reporter** — a real reason to claim and keep their
  profile current.
- **Brings firms in at the exact moment of need** — an attorney at a hearing who needs a
  transcript gets a card, scans it, and lands on Dewey Sholes. That's a warm way to get firms
  signing up, driven by the reporters themselves.

**How it would work:**
1. Reporter clicks "Create my business card" (dashboard or profile).
2. We generate a card in a DS-branded template using **only their real profile info** — name,
   "Certified Shorthand Reporter, CSR #___," method, city/county, maybe top specialties and
   coverage — plus a **QR code + short link** to their public profile.
3. Output: a print-ready PDF (standard card size), **plus a button to order physical cards
   through a print-on-demand service** (Vistaprint, Moo, GotPrint, Amazon, etc.) — the
   reporter clicks, the design is handed off, they order a batch and it ships to them. Later,
   maybe a digital/shareable version too (a mobile card page or a vCard).
4. The reporter hands the cards out at hearings.
5. An attorney scans/opens it → the reporter's Dewey Sholes profile → they can reach out. To
   message or hire through the platform they'd sign up; if the reporter lists direct contact,
   the attorney can also just email them. (This lines up with the access model: basic info is
   free; messaging sits behind sign-up/subscription.)

**Open questions:**
- **What contact goes on the card / profile** — the reporter's choice, per their contact
  preferences. Don't force a channel.
- **Direct contact vs. drive-to-platform** — does the card push everything through the profile
  (to encourage sign-ups), or show the reporter's direct email too? Likely the profile link is
  primary, and the profile itself offers "email directly" (if the reporter opts in) or "message
  on Dewey Sholes (sign up)."
- **Print:** two paths — download a print-ready PDF, and/or a button that hands the design to
  a print-on-demand service (Vistaprint / Moo / GotPrint / Amazon) to order physical cards.
  Which vendor(s) is a to-do; each has a slightly different hand-off (some take an uploaded
  print-ready file, some have a design API). A vendor **affiliate/referral link** could earn
  Dewey Sholes a small cut when a reporter orders — a tiny bonus revenue line, worth noting.
- **Design:** needs a DS-branded card template (logo + shorthand motif). Keep it clean and
  professional — attorneys are the audience.
- **Never invent** — every field comes from the reporter's real profile; blank if they haven't
  filled it in.

---

## Parking lot (mentioned, not yet scoped)
- **Reviews / reputation** — honest per-reporter reviews would be the strongest reason a firm
  prefers Dewey Sholes over calling an agency. Needs volume first; revisit post-launch.
- **Featured / promoted listings** — Rosie's earlier idea; a discovery surface, decided post-launch.
