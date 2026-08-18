# Rebrand naming research

**Status:** contingency research, not a decision. This exists so a shortlist is ready if it's needed – it does not mean the rebrand is happening.

**Trigger:** if Rosie stays silent on the advisor agreement by August 15, 2026, the plan is to release the "Dewey Sholes" name (see the Rosie-advisor memory) and move to something new. This doc is the naming half of that contingency – not the legal/entity/infrastructure half (see `mvp/docs/accounts_and_infrastructure.md` and the rename checklist referenced there for the mechanical steps: repo, Vercel, Supabase, Stripe, DBA filing, domain, email/DNS).

**Owner:** marketing-strategist agent
**Last updated:** 2026-08-04

---

## What this name has to do

- **Read as a product, not a law firm.** "Dewey Sholes" reads like two attorney surnames (Dewey & Sholes), which was charming as an inside joke but confuses people into thinking it's a law firm. The new name should not follow the "Surname & Surname" or "Surname, Surname" pattern.
- **Work for both sides of the marketplace.** Court reporters (supply) and law firms / legal assistants (demand) both need to hear the name and get it, fast, on a cold intro or a referral.
- **Travel past California.** California is first, but Illinois is next (Texas is deprioritized – it already has an entrenched competitor, MyTexasCSR, run by the state's trade associations). The name can't lean on California-only vocabulary.
- **Never contain "CSR."** Certified Shorthand Reporter is California's licensing term. Illinois and other states use different terms (Illinois: CSR too, actually – IL also uses "Certified Shorthand Reporter" – but the point holds generally: many states don't, and "CSR" reads as insider jargon to the legal-assistant buyer, who is not a court reporter and doesn't necessarily know the acronym). "Court reporter" is the term that travels and that non-reporters actually use.
- **Sound professional enough for a law firm to put in a vendor list, and approachable enough for a solo independent reporter to feel is "for them," not an enterprise sales platform.**
- **Not describe us as a "directory"** in the name itself, even though that's what the product is today – the roadmap includes a job board and eventually assigned matching, and a name that only means "directory" boxes in future positioning.

---

## Competitive/landscape pass (grounding, not exhaustive)

Full profiles live in `marketing/competitive-analysis/`; this is the naming-relevant summary, refreshed for this task.

**Descriptive/literal names already in the market:**
- **MyTexasCSR** (mytexascsr.com) – "Where court reporters connect with legal professionals." Run jointly by the two Texas trade associations (TCRA + TEXDRA), not a standalone company. This is the clearest in-market example of the direct/descriptive route, and it works there *because* it's backed by built-in trade-association distribution, not because the name itself is doing marketing work. We don't have that distribution advantage, which matters for how much weight a purely descriptive name can carry on its own. See `marketing/competitive-analysis/mytexascsr.md`.
- **CSR Suite**, **On The Record** (On The Record Tech) – both direct competitors per our own competitive-analysis folder, both descriptive/plain-English names. "On The Record" in particular is a real, currently-operating competitor name – ruling that exact phrase out as a Shorthanders brand, not just as a trademark risk but as a direct name collision.
- **Court Reporters Clearinghouse**, **Worldwide Court Reporters**, **NNRC (National Network Reporting Company)** – older-generation agencies, literal descriptive names.

**Evocative/craft-rooted names already in the market:**
- **Colibri Legal** – "colibri" is French/Spanish for hummingbird; an established example of a fully abstract, borrowed-word name working fine in this exact category (AI transcription for depositions).
- **Steno** (steno.com) – a well-funded, national court-reporting and litigation-services company ("Steno Connect," 2,000+ reporters/videographers nationwide, $49M Series C as of March 2026). This is a real, active, well-known, venture-backed brand in our category, not a small or fading one. Any candidate built on the "steno-" root should be treated as a likely hard conflict, not just a trademark risk – it would read as copying an existing national competitor. Full profile: `marketing/competitive-analysis/steno.md`.
- **National Verbatim Reporters Association (NVRA)** holds several registered word marks built on "verbatim" (CERTIFIED VERBATIM REPORTER, REALTIME VERBATIM REPORTER, RVR, CVR). "Verbatim" as a root is heavily claimed in this specific industry, more than a generic search would suggest.
- **Deposely**, **VoiceScript**, **Verbit**, **Remote Legal**, **Filevine Depositions** – mostly compound/descriptive B2B SaaS names (per our own competitive-analysis entries), none abstract.

**Adjacent-category names worth knowing about (not court-reporting competitors, but naming-collision risks for candidate roots below):**
- **Verba** (Verba Technologies / verba.com) – an established compliance call-recording software brand (recording, archiving, "keep your words" tagline). Directly adjacent in meaning to a court-reporting brand.
- **Veritas Technologies** – large, well-known enterprise data-backup company. Blocks "Veritas"-style names.
- **Litera** – a large, established legal-tech company (contract drafting/CLM). Blocks "Litera"-style names in legal tech specifically.
- **Verily** – Alphabet's (Google) life-sciences company. Blocks "Verily."
- **Scrivener** (Literature & Latte) – a very well-known writing-software product. Blocks "Scrivener" for anything text/writing-adjacent.
- **Quill.com** (Staples office-supply brand) and **Quill.org** (education nonprofit) – both established, both would compete for search visibility and likely for trademark registrability in overlapping classes.
- **Cadence Design Systems** – large public semiconductor-software company. A "Cadence"-root name in software risks confusion even outside their category, because trademark examiners weigh brand strength, not just industry match.
- **AVer Information** – an established electronics/camera hardware brand. Complicates "Aver" as a clean brand root.
- **Tally (Tally Technologies)** – a known fintech (debt-payoff) app. Moderate conflict for a "Tally" brand, lower risk since it's a different category (consumer fintech vs. B2B legal marketplace) but worth flagging.

**Takeaway for candidate selection:** the court-reporting/legal-tech industry itself has already claimed "verbatim," "steno," "on the record," and most of the obvious literal terms. The safest ground – both for differentiation and for a cleaner trademark path – is a step removed from the literal vocabulary: a real word used metaphorically (evocative route) or a coined word (abstract route), checked against the adjacent-industry conflicts above.

---

## Owned domains: brand vs. SEO feeder

Aud already owns three descriptive domains: `csrfinder.com`, `courtreporterfinder.com`, `csrdirectory.com`.

**Using one of these as the actual brand name is not recommended**, for a few reasons:
- Two of the three (`csrfinder.com`, `csrdirectory.com`) contain "CSR," which fails the "must travel to Illinois and beyond, must not read as insider jargon to a legal assistant" constraint above.
- `courtreporterfinder.com` clears the CSR problem, but "Finder" and "Directory"-style names lock the brand into describing *only* the current directory feature, which works against the roadmap (job board, ratings, eventually assigned matching).
- A purely descriptive domain is easy to find via search but hard to build brand recall or trademark strength around – legally, generic/descriptive marks get the weakest protection, and two competitors (CSR Suite, On The Record) already sit in that same plain-English space.

**The better use of these domains is as SEO/redirect assets feeding the real brand**, not as the brand itself. This is a legitimate, common combo: keep the brand name for the product (site, invoices, emails, trademark filing) and let `courtreporterfinder.com` (the cleanest of the three – no "CSR") run as a landing page or 301 redirect that captures literal search traffic ("court reporter finder," "find a court reporter") and funnels it to the branded site. `csrfinder.com` and `csrdirectory.com` are lower-value for this because of the CSR string, but could still redirect or serve CA-specific SEO pages (where "CSR" is a real, searched term) without being the front-facing brand.

---

## Shortlist

Each candidate: idea/root, how it reads to a reporter vs. a firm, expansion fit, tone, and an honest pros/cons call. None of these are verified as available – see the verification checklist at the end.

### 1. Direct/descriptive

Plain-English names built from the product itself. Easiest to explain in one sentence; hardest to make ownable or distinctive, and closest to what two direct competitors (CSR Suite, On The Record) and one in-market example (MyTexasCSR) already do.

| Candidate | Root/idea | Reads to reporter | Reads to firm | Expansion fit | Pros | Cons |
|---|---|---|---|---|---|---|
| **Court Reporter Finder** | The owned domain, promoted to brand | Fine, self-explanatory | Fine, self-explanatory | Travels – no state-specific term | Zero explanation needed; domain already owned; ranks for exact-match search | Reads as a search tool, not a product with messaging + invoicing; boxes into "directory" forever; weak trademark (descriptive marks are hard to register/defend); doesn't differentiate from MyTexasCSR's plain-English approach |
| **Find A Reporter** | Same idea, shorter | Fine | Fine | Travels | Short, sayable, obvious | Extremely generic – near-impossible to trademark cleanly; likely many close variants already in use somewhere; no brand equity |
| **Reporter Direct** | "Direct" = no agency middleman, the core value prop | Signals no agency cut | Signals no agency markup | Travels | The word "direct" carries real differentiation (matches the actual product: firm and reporter connect without an agency) | Close to "Remote Legal" / "Direct" is a common suffix across legal-tech (used loosely by several competitors' subheads); still fairly generic |
| **Hire A Reporter** | Transactional, plain | Slightly staffing-agency-coded ("hire") which most independent reporters resist (they're not employees) | Fine, very clear intent | Travels | Instantly clear | "Hire" framing risks the exact AB-5/independent-contractor sensitivity reporters already have about agencies calling the shots – a bad connotation for the supply side specifically |
| **CSR Directory** (existing owned domain, unmodified) | Literal | Reads correctly to a CA reporter | Confusing outside CA; jargon to a legal assistant who doesn't know "CSR" | **Fails travel/jargon constraint** – included only to be explicit about why it's ruled out as the primary brand | Domain already owned, decent CA-specific SEO value | Contains the exact acronym the brief rules out; keep as a feeder domain only, not the brand |

**Overall read on this route:** viable as an SEO/landing-page layer (see domain section above), weak as the actual brand. None of these differentiate Shorthanders from MyTexasCSR's literal naming, and the whole point of dropping "Dewey Sholes" is to stop being confused for something we're not (a law firm) – a purely descriptive name solves that but trades it for "generic search-results page," which undersells the messaging + invoicing + payments product underneath.

---

### 2. Evocative

Real words (or close variants) rooted in the craft: verbatim record, the spoken word, testimony, the transcript, getting paid. Builds on Verba / OnRecord / Verso / Quill (already floated) with new options and honest conflict flags for all of them.

| Candidate | Root/idea | Reads to reporter | Reads to firm | Expansion fit | Pros | Cons |
|---|---|---|---|---|---|---|
| **Verba** *(previously floated)* | Latin root of "verbatim" – the exact word | Warm, craft-aligned ("keeping the words") | Clear enough with a tagline | Travels | Short, easy to say, ties to the verbatim-record concept without spelling it out | **Real conflict:** Verba Technologies (verba.com) is an established compliance call-recording brand – directly adjacent meaning, same general "recording the spoken word" space. High risk of confusion and a crowded trademark path |
| **OnRecord** *(previously floated)* | "On the record" – courtroom phrase everyone already knows | Instantly clear, feels native to the profession | Instantly clear | Travels | Zero explanation needed; plain-English clarity | **Direct name collision:** "On The Record" (On The Record Tech) is an actual, currently-operating direct competitor per our own competitive analysis. This isn't a soft conflict – it's the same phrase already in use in the same category |
| **Verso** *(previously floated)* | Latin/Italian, "turned" / "the other side of a page" (bookbinding term) – nods to the transcript-as-record idea | Neutral, doesn't obviously connect without explanation | Neutral | Travels, meaning doesn't hinge on a US legal term | Sounds clean and professional; short | Registered word marks already exist for "Verso" in software/education and finance categories; the bookbinding meaning is a stretch most people won't get without being told |
| **Quill** *(previously floated)* | The writing instrument – classic "record-keeper" image | Warm, old-fashioned-craft feel | Clear enough | Travels | Memorable, simple, pleasant | **Real conflict:** Quill.com is Staples' large office-supply brand; Quill.org is an established education platform. Both actively use the exact word in commerce – a hard trademark and search-visibility problem |
| **Recital** | Formal statement/testimony given aloud (also the legal-drafting term for "whereas" recitals in a contract) | Slightly formal/legal-sounding, less obviously "for reporters" at first read | Double meaning lands well – both "testimony given" and "the recitals of an agreement" read as legal-native | Travels, not a US-specific term | Real double meaning that's actually relevant (spoken testimony + formal record), not just aesthetically nice; distinctive in this category (no direct hit found) | Most people's first association is a music recital, not a legal one – needs a tagline to land the intended meaning; four syllables is a bit long for a spoken referral |
| **Tally** | Keeping count / keeping the record – leans into the payments and invoicing side of the product, not just the transcript side | Reads as practical, "get-paid" coded, which matches a real pain point (reporters chasing payment) | Reads as clear and businesslike | Travels | Short, one syllable, easy to say and spell; genuinely reflects one of the product's two core jobs (get paid) rather than only the directory half | **Moderate conflict:** Tally Technologies is an established consumer fintech (debt payoff) app – different category, lower confusion risk, but still worth a clean trademark check; doesn't obviously carry the "find a reporter" half of the meaning on its own |

**Overall read on this route:** the strongest single risk in this whole doc is that the two most-loved floated names (OnRecord, Verba) both have real, close-in-category conflicts – one is a literal existing competitor, the other is an adjacent recording-software brand. Recital and Tally are the cleanest of this group on conflict risk, but each only carries half the product's story (testimony vs. payment) rather than both.

---

### 3. Abstract/coined

Short, invented or lightly-modified words with a faint thread to voice, record, or words – the route the founder leans toward. Most ownable and most trademarkable if a clean one is found, at the cost of needing a tagline to do more explaining early on.

| Candidate | Root/thread | Reads to reporter | Reads to firm | Expansion fit | Pros | Cons |
|---|---|---|---|---|---|---|
| **Scripta** | Latin, "things written" (root of "script," "scripture," "manuscript") | Faint but real thread to the written record | Sounds professional, vaguely legal-Latin (a register law firms are comfortable with – "certiorari," "voir dire") | Travels, no US-specific meaning | Clean, short, easy to spell once heard; Latin legal-adjacent register fits the audience; faint but genuine thread to "the written record" | Pronunciation could go two ways on first read (SKRIP-ta vs. SCRIP-ta) – needs a pronunciation-obvious first exposure (logo, audio) |
| **Scriva** | Shortened/coined from "scribe" / "scrivener" | Warm craft echo (scribe = an old word for someone who writes down speech) | Sounds like a brand name, not overtly legal, which is neutral rather than a plus or minus | Travels | Very short, easy to say, easy to spell; coined enough to be genuinely ownable | The full word "scrivener" is a well-known writing-software brand (Literature & Latte) – "Scriva" is a shortened, different word, but it sits close enough in sound/meaning to warrant a careful trademark check, not an assumption of clearance |
| **Notari** | Echo of "notary" – official witnessing/attestation of a document, without literally being the word | Faint legal-craft echo, not overclaiming ("we're not notaries") | Reads as trustworthy/official without being a specific legal claim | Travels | Genuinely faint thread (official record-keeping) without misrepresenting what a court reporter does; short, sayable, pleasant sound | Close enough to "notary" that some firms may briefly wonder if it's a notary service – a one-line tagline fixes this fast, but it's a real first-impression tax |
| **Dictum** | Latin, "a thing said" – also an actual legal term ("obiter dictum," a judge's side remark) | Neutral on first hearing, becomes a nice easter egg once someone looks it up | Lawyers specifically will recognize the term, which could read as clever or as slightly cute/inside-baseball | Travels | Real dual meaning for the legal audience specifically; short, one clean syllable pattern | Attorneys already use "dictum" to mean something narrower and different (non-binding judicial commentary) – risk of the name reading like a small legal in-joke that doesn't fully make sense once you know the real definition |
| **Loquo** | Latin root "loqui," to speak (source of "eloquent," "loquacious," "colloquy") | Neutral, doesn't obviously land without explanation | Same | Travels | Short, unusual, ownable; genuinely tied to "speech" as a root | Least intuitive of this group – almost nobody will get the thread unaided, so it leans hardest on tagline + repetition to build meaning over time |
| **Cadenza** | Musical term for a soloist's unaccompanied passage – evokes the rhythm and flow of spoken testimony | Pleasant, a little unexpected for a legal-adjacent product | Pleasant, memorable, slightly less "law firm," more "modern brand" | Travels | Distinctive and memorable; no conflict found in legal tech; sounds premium | Musical association is stronger than the legal one at first hearing – some risk of reading as an arts/events brand rather than a legal product until the tagline clarifies it; **Cadence** (the shorter, more common variant) is blocked by Cadence Design Systems, so stick to the fuller "Cadenza," not the shorter form |

**Overall read on this route:** none of these are instantly self-explanatory, which is the honest tradeoff of the abstract route – they all need a tagline to do real work in the first few seconds (the same way "Stripe," "Toptal," or "Verbit" needed one early on). In exchange, they're the cleanest group on direct-competitor collision and the most ownable long-term, which matches what the founder said they lean toward.

---

## Top picks and a recommendation

This is a starting shortlist for Aud to react to, not a final call – reduced to the names that came out cleanest on conflict risk, sayability, and "does it survive Illinois and beyond."

1. **Scripta** (abstract) – the strongest all-around abstract candidate: short, easy to spell once seen, a real (if faint) thread to "the written record," a register (Latin-adjacent) that legal audiences are comfortable with, and no direct-competitor or adjacent-brand collision found in this pass. Needs the pronunciation locked early (logo treatment, spoken intro) so it doesn't split into two readings.
2. **Notari** (abstract) – close second; the "notary" echo does real work explaining "official record" without overclaiming, and it's pleasant to say. The main cost is a one-beat "wait, are you a notary service?" moment that a tagline resolves fast.
3. **Recital** (evocative) – the strongest evocative candidate specifically because it carries a genuine double meaning (spoken testimony + the legal-document "recitals") rather than a decorative one, and it's clean on the conflict check. Worth keeping in the mix if Aud wants a real English word rather than a coined one.
4. **Court Reporter Finder** (descriptive, using the owned domain) – not the top pick for the primary brand, but the strongest fallback if speed/certainty matters more than distinctiveness: no explanation needed, no new domain purchase, and it's the domain that actually clears the "no CSR" constraint. Best positioned as the safety option, or – our actual recommendation for this specific domain – as the SEO feeder regardless of which brand name wins.
5. **Tally** (evocative) – worth keeping on the list specifically because it's the only candidate here that names the payments/get-paid half of the product rather than only the "find a reporter" half, which is a real and underrepresented angle in this shortlist.

**If forced to pick one today:** Scripta, on the strength of clearing every constraint (no CSR, no direct competitor collision, travels past California, doesn't read as a law firm, plausible trademark path) while still carrying a faint, honest thread to what the product actually does. But this is genuinely a case where hearing the finalists said out loud, and checking real domain/trademark availability, should move the decision more than this doc can on its own.

---

## Naming pitfalls to watch (any route)

- **Spellability.** If someone hears the name in a phone call or a hallway referral, can they type it into a browser correctly on the first try? Latin-rooted and coined names (Scripta, Scriva, Loquo) are the highest risk here – test out loud with people outside this project before deciding.
- **Sayability over the phone.** Legal assistants refer vendors to each other verbally constantly ("who do you use for reporters?"). A name that needs to be spelled out loses free word-of-mouth distribution. Say every finalist on a phone call before deciding, not just read it silently.
- **Don't box the name into "directory."** The roadmap includes a job board and, eventually, a paid assigned-matching tier – a name that only means "find a reporter" (Court Reporter Finder, CSR Directory) will need re-explaining as the product grows past directory features. Names in the evocative/abstract groups don't have this problem.
- **Avoid California-only or CA-specific vocabulary** in the brand name itself – "CSR" specifically, but also "statutory rate," "CRB," or anything else that reads as insider CA-licensing jargon to an Illinois firm or reporter later.
- **Don't repeat the "reads like a law firm" problem in a new shape.** Two surnames was the original problem; watch for accidentally landing on something that sounds like "Smith & Co." or a stiff Latin legal-maxim phrase that reads as a law firm's own name rather than a product brand.
- **Check for unintended meaning in Spanish**, given the size of the CA (and later, national) Spanish-speaking legal-assistant and reporter population – a quick native-speaker sanity check on finalists is cheap insurance.
- **Industry-specific trademark crowding.** As the competitive pass above shows, "verbatim," "steno," and "on the record" are already heavily claimed *inside this specific industry* – a name can look clear on a generic Google search and still collide hard once checked against court-reporting and legal-tech trademarks specifically.

---

## Verification checklist for finalists

This doc does **not** claim any domain or trademark is available – that can't be verified reliably without formal search tools and (ideally) legal review. Before committing to a final name, run each finalist through:

1. **USPTO TESS search** (https://tmsearch.uspto.gov) – search the exact name and close phonetic variants, across the relevant classes: Class 42 (software/SaaS), Class 45 (legal services), Class 35 (business services/matchmaking), and Class 41 (education, in case of overlap with named conflicts like Quill.org).
2. **State entity/DBA search** in California and Illinois specifically (both states' Secretary of State business-entity search tools), since those are the two active/near-term markets and a same-name conflict there is a real operating problem, not just a trademark risk.
3. **.com availability**, plus a quick check of `.io` / `.co` as fallback if `.com` is taken – a registrar WHOIS lookup, not a guess.
4. **Search-engine and social-handle sanity check** – Google the exact name plus "court reporter," "legal," and "law firm" to surface anything not caught by formal trademark search (smaller regional businesses, informal use, forum mentions). Check handle availability on the platforms actually used for outreach (LinkedIn, Facebook, since reporters congregate there per `csr_facebook_channel` in memory).
5. **Say it out loud to at least 3-5 people outside the project** (spelling test + phone-call test above) before finalizing.
6. **If budget allows, a short paid trademark clearance search** from a trademark attorney or clearance service before filing – cheap insurance relative to the cost of re-branding twice.

None of the above happened as part of this research pass – it's the next step once Aud narrows to 1-2 real finalists.

---

## Open questions for Aud

- Does "Scripta" or "Notari" actually say well out loud to Aud, or does either feel wrong once spoken? (Written analysis can't substitute for saying a name out loud repeatedly.)
- Is a real-word evocative name (Recital, Tally) preferred over a coined one (Scripta, Notari) for search-visibility reasons – real words get some organic search benefit a coined word won't have until the brand is established?
- Worth commissioning a quick trademark clearance search on the top 2-3 before spending more design/copy time on any one name?
- Should `courtreporterfinder.com` be set up as an SEO feeder now (independent of the rebrand timeline), since it doesn't require picking the new brand name first?
