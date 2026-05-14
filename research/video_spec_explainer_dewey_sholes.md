# Dewey Sholes – video explainer spec sheet

**Owner:** Aud (drafted), marketing agent (to refine + execute)
**Last updated:** 2026-05-13
**Status:** Draft 1, ready for AI video platform handoff or human animator brief.

---

## Purpose

A short explainer video that shows the **current state** (an attorney getting a high agency bill while the CSR who did the work earns a small share) versus the **Dewey Sholes future state** (same job, transparent line items, attorney pays less, reporter keeps 100%). Both parties end the video happy and high-fiving across a split-screen, breaking the fourth wall to address the viewer.

The video is the visual companion to the "agency invoice evidence" research and the "streamline-not-eliminate" brand thesis – it makes the math viscerally clear in 60–75 seconds.

---

## Distribution targets

- **Dewey Sholes landing page** – hero or above-the-fold position
- **LinkedIn** – paid + organic, targeting CA litigation attorneys and CA CSRs
- **Phase 1 cold-email campaigns** – embedded preview in attorney + CSR outreach
- **Facebook CSR groups** – shareable proof of concept (Court Reporter Rates Discussion, Cal-CCRA member groups)
- **Earned-media pitch supplement** – when pitching CA legal-industry press (The Recorder, Daily Journal, Law360)

---

## Specifications

| | |
|---|---|
| **Duration target** | 60–75 seconds |
| **Primary aspect ratio** | 16:9 (1920×1080) for landing page and LinkedIn |
| **Secondary cuts** | 9:16 (1080×1920) for Instagram/TikTok/LinkedIn vertical; 1:1 (1080×1080) for square LinkedIn feed |
| **Format** | MP4, H.264, ≥ 8 Mbps for landing page; MP4 H.264 ≤ 4 Mbps for social |
| **Audio** | Stereo, 48 kHz, normalized to −14 LUFS for web playback |
| **Subtitles** | Burned-in optional caption track for sound-off social viewing (most LinkedIn views are muted) |

---

## Tone & visual style

**Tone:** Calm, professional, slightly warm. Not a "loud commercial." Think Stripe, Notion, Linear product explainer – confident, restrained, lets the math speak.

**Visual style:**
- Clean, modern. Lots of white/light space, generous margins.
- Soft, well-lit interiors. Realistic but slightly idealized (no clutter).
- Subtle motion graphics for invoice line items – they appear one-by-one with light highlighting, not animated chaos.
- Color palette pulls from DS brand: navy/indigo as primary, ochre/warm accent for highlights, white for surface backgrounds, periwinkle-soft for secondary surfaces (no cream / warm off-white).
- Typography: serif for any large editorial text overlays (matches DS landing-page identity); sans-serif for invoice line items and UI mockups.

**Avoid:**
- Cartoonish stock-corporate-explainer feel
- Loud color saturation
- Cliché legal imagery (gavels, scales of justice, Lady Justice statues)
- Fake-looking AI rendered characters with uncanny-valley artifacts – if AI video, use a platform that handles human faces cleanly (Sora, Veo, Runway Gen-3) or fall back to motion-graphics-only with stylized character silhouettes

---

## Brand assets

| Asset | Where to find / how to specify |
|---|---|
| Logo | Dewey Sholes wordmark – pull from [index.html](../index.html) hero/nav |
| Primary color | Navy / indigo (`#1E2756` or similar – pull exact value from CSS variables in index.html) |
| Accent color | Ochre / warm gold (`--ochre-deep` from the live site) |
| Surface | White or `--periwinkle-soft` |
| Typography | Match the live site – serif headline + sans body (Aud can supply exact font names) |
| Reference URL | [deweysholes.vercel.app](https://deweysholes.vercel.app) |

---

## Characters

### Character 1 – The attorney

- **Name (for direction):** Sarah Chen (visual reference only, not shown in video)
- **Age range:** Mid-30s to mid-40s
- **Appearance:** Professional but approachable. Business-casual: blazer or sweater, no tie. Slightly tired – has been working a long day.
- **Setting:** Modern law-firm office. Clean desk with a laptop, a few papers, a coffee mug. Floor-to-ceiling window in background showing a Bay Area or LA cityscape (slightly out of focus).
- **Demeanor in Scene 1–4:** Frustrated, resigned. Exhales when she sees the agency bill.
- **Demeanor in Scene 5–8:** Relieved, then pleasantly surprised, then genuinely happy.

### Character 2 – The court reporter

- **Name (for direction):** Janet Wong (visual reference only, not shown in video)
- **Age range:** Late 30s to late 40s
- **Appearance:** Sharp, professional. Reading glasses, comfortable home-office attire (e.g., blouse + cardigan). A stenograph machine partially visible in the background.
- **Setting:** Tidy home office or co-working desk. Plants, a few books, a second monitor showing what looks like a transcript draft. Lighting is warm and natural.
- **Demeanor in Scene 1–4:** Tired, frustrated. She just finished a hard day's work and is looking at a pay statement that feels small.
- **Demeanor in Scene 5–8:** Relaxed, satisfied. Smiling at her screen.

**Casting note:** the two characters should feel like peers – not a young attorney and an older reporter, or vice versa. The video's message is "both sides of this transaction deserve better"; they should look like contemporaries.

---

## Setting / production design

- **Attorney's office:** modern law firm, neutral background, hint of CA geography out the window
- **CSR's home office:** warm, lived-in, professional. Stenograph machine in frame at least once (subtle product placement of what she does)
- **Transitions between locations:** split-screen with a clean vertical divider; the divider is the "agency wedge" that fades away at the end

---

## Storyboard (scene by scene)

### Scene 1 – Hook: the agency bill arrives (0:00–0:08)

**Visual:**
- Wide shot of the attorney's office. Attorney is at her desk, finishing a phone call or closing her laptop briefly.
- Cut to medium shot: she opens an email or pulls out a printed invoice from an envelope.
- Camera moves in slightly as her expression shifts – neutral → reading → faint frown.

**Audio:**
- Subtle office ambience (faint typing, a hum, no music yet)
- A single low piano note as the bill appears

**Voiceover:** *(none yet – let the visual land)*

**On-screen text:** none

---

### Scene 2 – Zoom into agency invoice (0:08–0:20)

**Visual:**
- Tight zoom on the invoice document. Camera pushes in until we can read individual line items.
- Each line item appears with a soft animated highlight (subtle yellow underline, then fade).
- Items appear in sequence, not all at once:

```
Original Transcript (319 pages × $5.50)     $1,754.50
Administrative / Account Service Fee          $210.14
Production Fee                                 $150.00
Litigation Package                              $90.00
Remote Surcharge (per page)                   $207.00
Exhibit Management (10 hrs × $25)             $250.00
Remote Technician (10 hrs × $95)              $950.00
Remote Set-Up Fee                              $325.00
Electronic Delivery                             $25.00
─────────────────────────────────────────
TOTAL DUE                                  $2,311.49
```

- "TOTAL DUE $2,311.49" appears in bold red/dark-red type, slightly larger.
- The "extras" line items (Admin Fee, Production Fee, Litigation Package, Remote Surcharge, Electronic Delivery, Printing Fee) get subtle red underlines as they appear.

**Voiceover (0:08):**
> "Every law firm knows the moment. Another transcript bill from the agency."

**Voiceover (0:14):**
> "Two thousand three hundred dollars for a hearing. Then come the fees nobody explained – production fee, litigation package, remote surcharge, electronic delivery, printing fee."

**Music:** A single, slightly tense piano motif builds.

**On-screen text:** No additional overlays – the invoice IS the visual.

---

### Scene 3 – Cut to CSR receiving her pay statement (0:20–0:30)

**Visual:**
- Split-screen wipe in from the right: attorney's frustrated face stays on the left half, CSR appears on the right half.
- CSR is at her home desk, opening an email titled "Job #82948 – Payout."
- Her pay statement appears. Camera pushes in.
- Line items appear:

```
JOB #82948 – TAKEHOME
Original transcript (319 pages × $4.40)      $1,403.60
Appearance fee (your share)                    $XXX
                                              ─────
Your earnings                                $1,403.60

Agency commission                            −$907.89

Net deposit                                  $1,403.60
```

- The "Agency commission" line appears in a slightly darker, smaller font, almost shameful in styling.
- Her face shifts from neutral to a tired, resigned half-smile.

**Voiceover (0:20):**
> "And the court reporter who actually did the work? She keeps about sixty cents of every dollar the attorney paid."

**Voiceover (0:26):**
> "The rest disappears into a markup she can't control."

**Music:** Piano motif continues, slightly heavier.

---

### Scene 4 – Tension peak: both characters together (0:30–0:38)

**Visual:**
- Full split-screen now. Both characters in the same shot, divided by a clean vertical line.
- Both look at their respective screens. Both exhale.
- The divider between them shimmers briefly as if it has weight – visually it represents the agency in the middle.
- Camera holds for 2 seconds on this composition.

**Voiceover (0:30):**
> "Attorneys overpay. Reporters underearn. Everyone loses except the middleman."

**Music:** Piano motif resolves with a soft sustained chord – held silence at the end of the scene for 1 second.

**On-screen text (lower third, subtle):**
> "Same job. Different sides. Same problem."

---

### Scene 5 – Transition to Dewey Sholes (0:38–0:50)

**Visual:**
- The split-screen divider cracks softly down the middle and is wiped away with a clean horizontal motion.
- We're now in the attorney's office again, but the mood has shifted – warmer light, calmer composition.
- She's on her laptop. Camera over-the-shoulder.
- Browser shows `deweysholes.com`. The site loads with the actual DS hero page (real screenshot or recreation).
- She clicks "Order a transcript." A clean, modern booking flow appears.
- She fills in:
  - Court: SF Superior Court
  - Hearing date: tomorrow
  - Duration: Half day
  - Need by: 5 business days
- A clean price estimate appears: "**~$1,300 total**"
- She clicks "Book."

**Voiceover (0:38):**
> "Dewey Sholes connects California attorneys directly with certified court reporters. No agency. No hidden line items."

**Voiceover (0:46):**
> "Every charge on your invoice is the work that was done – at a transparent platform fee."

**Music:** A new, warmer motif starts – same instrument family but a major key, hopeful.

---

### Scene 6 – Both characters get their respective documents (0:50–1:05)

**Visual:**
- Split-screen returns, but this time without the heavy divider – just a soft visual separation.
- Left half: attorney's new DS invoice arrives in her inbox. Camera pushes in. Line items appear cleanly:

```
DEWEY SHOLES – INVOICE #DS-2026-0142
Live attendance (half day)                   $1,050.00
Transcript (200 pages × $5.00)               $1,000.00
                                              ─────
Subtotal                                     $2,050.00
Platform fee (12%)                             $246.00
                                              ─────
TOTAL DUE                                    $2,296.00
```

- Subhead under the total in green/positive color: **"You saved $480 vs. typical agency pricing."**

- Right half: CSR's pay statement appears.

```
DEWEY SHOLES – PAYOUT
Job #DS-2026-0142
Live attendance (half day)                   $1,050.00
Transcript (200 pages × $5.00)               $1,000.00
                                              ─────
Your earnings                                $2,050.00

Platform deductions                              $0.00

Net deposit                                  $2,050.00  ✓ 100%
```

- The "100%" gets a small green checkmark and a subtle highlight pulse.
- Both characters lean back slightly, eyes widening just a bit. They are seeing a number that surprises them – in a good way.

**Voiceover (0:50):**
> "Same job. Same reporter. Lower total for the firm. And the reporter keeps a hundred percent of her stated rate."

**Voiceover (0:58):**
> "Dewey Sholes just automates the work the agency was charging extra for."

**Music:** Warm motif builds gently.

---

### Scene 7 – The high-five (1:05–1:13)

**Visual:**
- Both characters look up from their respective screens, smiling.
- They turn toward the camera (toward the viewer) and then toward each other across the split-screen.
- They each raise a hand toward the divider.
- Their palms meet – and the moment they touch, the split-screen divider dissolves entirely.
- They are now in a shared frame – same composition, no divider – facing the camera.
- Quick playful look between them, then back to camera.
- Both smile – slight wink or knowing look. **Fourth wall is broken**; they're addressing the viewer directly: *this is how it should be*.

**Voiceover (1:05):**
> "Dewey Sholes. Court transcripts, finally simple."

**Music:** Warm motif resolves on a satisfying major chord with a soft chime.

---

### Scene 8 – CTA (1:13–1:18)

**Visual:**
- Clean end card. White background.
- DS logo (centered, large).
- Tagline below logo: **"Court transcripts, finally simple."**
- Smaller text below: **"California launch now accepting reporters and law firms."**
- URL: **deweysholes.com**
- Subtle DS brand-color accent line.

**Voiceover:** none – let the end card breathe.

**Music:** Held final chord with gentle fadeout.

---

## Full voiceover script (single block, with timing)

> *[0:08]* "Every law firm knows the moment. Another transcript bill from the agency.
>
> *[0:14]* Two thousand three hundred dollars for a hearing. Then come the fees nobody explained – production fee, litigation package, remote surcharge, electronic delivery, printing fee.
>
> *[0:20]* And the court reporter who actually did the work? She keeps about sixty cents of every dollar the attorney paid.
>
> *[0:26]* The rest disappears into a markup she can't control.
>
> *[0:30]* Attorneys overpay. Reporters underearn. Everyone loses except the middleman.
>
> *[0:38]* Dewey Sholes connects California attorneys directly with certified court reporters. No agency. No hidden line items.
>
> *[0:46]* Every charge on your invoice is the work that was done – at a transparent platform fee.
>
> *[0:50]* Same job. Same reporter. Lower total for the firm. And the reporter keeps a hundred percent of her stated rate.
>
> *[0:58]* Dewey Sholes just automates the work the agency was charging extra for.
>
> *[1:05]* Dewey Sholes. Court transcripts, finally simple."

**Word count:** ~150 words. Pace: ~145 wpm = about 62 seconds. Total video duration target 65–75 seconds with breathing room.

**Voiceover talent direction:** Female, mid-30s to mid-40s, warm but professional. Think NPR feature reporter, not radio DJ. Pacing slow enough to let the line items breathe; tone shifts from slightly heavy (Scenes 1–4) to brighter (Scenes 5–8). Avoid over-acted "explainer-voice" cheer.

---

## Music & sound design

| Section | Music direction |
|---|---|
| Scenes 1–4 (current state) | Solo piano motif. Minor key. Slightly tense, building. Sparse. |
| Transition (Scene 5 start) | A single sustained chord resolving, then a key change to major. |
| Scenes 5–7 (DS state) | Same instrument family (piano + maybe a subtle string pad joining), major key, warmer, hopeful, restrained. |
| Scene 7 high-five moment | A small chime or bell-like note when palms meet – celebratory but not loud. |
| Scene 8 end card | Held final chord with gentle fadeout. |

**Sound effects (subtle, almost subliminal):**
- Soft typing in the law-office shots
- A small "ding" when the new DS invoice arrives in the attorney's inbox (Scene 6)
- A small notification chime when the CSR's payout email arrives (Scene 6)

**Avoid:** stock corporate explainer music (the upbeat ukulele/whistle cliché). The video earns its emotional shifts; the music should be a partner, not a substitute.

---

## On-screen text & graphics

### Text overlays (lower third or floating, in DS brand typography)

| Time | Text | Purpose |
|---|---|---|
| 0:18 | None (let line items speak) | – |
| 0:28 | "$2,311 paid – $1,403 earned" *(optional)* | Reinforces the gap |
| 0:34 | "Same job. Different sides. Same problem." | Punctuates Scene 4 tension |
| 0:55 | "You saved $480" (animated counter from $0) | Visual reward |
| 1:02 | "Reporter keeps 100%" with green checkmark | Visual reward, CSR side |
| 1:14 | "deweysholes.com" + tagline | CTA |

### Invoice line-item animations

When line items appear in Scenes 2 and 6, each line should:
1. Slide in from the right with a 0.2s ease
2. The dollar amount appears with a 0.1s delay (creates a "scanning" feeling)
3. Highlight underline (subtle, lasts 0.4s) for emphasis lines
4. Stays on screen until the next item arrives or the camera moves

The "TOTAL" line gets a stronger highlight – slightly larger type, bold weight, and a subtle background tint (red-ish in Scene 2, green-ish in Scene 6).

---

## Real-world source numbers (use these – they're all from documented invoices)

The line items in Scene 2 are pulled from invoice #91319 (March 2023, CA remote-Zoom depo) – documented in [agency_invoice_evidence.md](agency_invoice_evidence.md). The transcript-only line uses Caldarella's $5.50/pg rate (also documented).

For the DS comparison (Scene 6), use the proposed DS recalibrated rates:
- Half-day attendance: $1,050
- Per-page transcript: $5.00
- Platform fee: 12%

**Sample calculation** (for a 200-page hearing transcript with half-day attendance):
- Live attendance: $1,050
- Transcript: 200 × $5.00 = $1,000
- Subtotal: $2,050
- 12% platform fee: $246
- **Total: $2,296**

vs. agency-equivalent (using #91319-style markup pattern):
- Transcript: 200 × $5.50 = $1,100
- Agency attendance: ~$1,500 (Bay Area private hearing rate)
- Admin/production/extras: ~$176 (proportionally ~24% markup)
- **Total: ~$2,776**

**Savings: $480 (17% lower).** Use that exact number in the on-screen counter.

(Note: the more dramatic 38% savings example from invoice #91319 includes remote-services fees that don't apply to court hearings, which is DS's V1 scope. Sticking with the 17% number keeps the math defensible and the savings claim conservative.)

---

## Visual references / inspiration

Marketing agent or producer should pull stylistic cues from:

| Source | What to emulate |
|---|---|
| Stripe product explainer videos | Clean type, generous whitespace, subtle motion, restrained color |
| Notion's "Notion AI" launch video | Soft real-actor scenes intercut with crisp UI mockups |
| Linear product videos | Calm pace, sophisticated motion graphics, minimal voiceover |
| Apple "Shot on iPhone" portrait series | Warm character lighting, professional but human framing |
| Ramp B2B explainers | Side-by-side comparisons done elegantly without making competitors look bad |

**Anti-references** (do NOT emulate):
- Insurance commercials (too loud, too cliché)
- Personal injury law firm ads (clearly not us)
- Animated explainer videos with cartoon characters (we want real-feeling humans)

---

## Notes for the AI video tool / human producer

1. **If using an AI video platform** (Sora, Veo, Runway, Pika): provide this entire doc as the brief, plus separate prompts for each scene shot. The two human characters need to be visually consistent across scenes – pin a reference image for each character at the start and reuse it.

2. **If using a human animator/motion-designer**: this becomes the brief for storyboard + animatic. Plan ~3 weeks of production time (1 week storyboard + voiceover, 1 week animation, 1 week revisions + sound).

3. **If using stock footage + motion graphics**: the character work can be stock; the invoice line items and end card are pure motion graphics. Cheapest path; sacrifices the high-five payoff.

4. **First-version length target: 65–75 seconds.** Cut down versions:
   - 30-second cut for paid social: skip Scene 1 hook, jump straight to invoice. End at high-five.
   - 15-second cut: just the side-by-side invoice comparison + tagline. No characters.

5. **Localization**: this script is CA-specific. Future state cuts could swap "California launch" for "New York launch" / etc. when DS expands.

6. **Compliance review:** before publishing, sanity-check the savings claim ("$480 saved" / "17% lower") against current real DS pricing + documented agency invoice averages. If pricing shifts post-launch, the on-screen number needs to be re-cut. Build the comparison numbers as a separate motion-graphic asset that can be swapped without re-shooting.

7. **Accessibility:** burn-in optional captions for sound-off viewing. The voiceover script above is the caption text.

---

## Open questions for the marketing agent

These should be settled before production starts:

1. **Final savings number** – $480 / 17% is conservative and defensible. Do we want a more dramatic claim ("Save up to 38%") that draws from the #91319 remote-depo case? The conservative number is more honest for court-hearing-only V1 scope.
2. **Character casting / AI generation source** – Sora-class AI for humans, or stock + motion graphics? Cost trade-off significant.
3. **Voiceover talent** – internal voice, agency talent (~$500–2,000), or AI voice (free but more risk of uncanny)?
4. **Music licensing** – original composition (~$2,000) vs. royalty-free library (~$50) vs. AI-generated track. Original elevates the production noticeably.
5. **Distribution-channel cuts** – do we want 16:9 + 9:16 + 1:1 from the start, or 16:9 only and adapt later?

---

## Related documents

- [agency_invoice_evidence.md](agency_invoice_evidence.md) – the source data for invoice line items used in Scene 2
- [csr_agency_live_attendance_rates.md](csr_agency_live_attendance_rates.md) – rate-card synthesis informing the comparison numbers
- [marketing_strategy_master.md](marketing_strategy_master.md) – overall launch marketing plan this video supports
- [marketing_plan_phase1_csr_supply.md](marketing_plan_phase1_csr_supply.md) – Phase 1 CSR-side outreach where the video will be embedded
- [marketing_plan_phase2_law_firms.md](marketing_plan_phase2_law_firms.md) – Phase 2 firm-side outreach where the video will be embedded
