# v1 archive – the original full marketplace

**What v1 was:** the first Dewey Sholes product – a full two-sided marketplace where attorneys
submitted orders, the platform matched them to a CSR, and money moved through escrow. Its
money model was a **flat 12% attorney-only buyer fee plus a $99/yr CSR listing fee**, with
rate-setting bands, a match-preview screen, ratings, and cost-splitting between parties.

**Why it's archived:** the product was re-scoped in July 2026 to the current MVP – a directory
of California court reporters plus messaging and invoicing, with no matching, scheduling,
escrow, or rate bands, and a reporter-side per-payment fee instead of an attorney-side one.
v1 was **not abandoned as wrong** – it's the fuller version of the idea and may be built
toward again. Nothing here has been deleted.

**Status:** still deployed as a prototype at **https://dewey-sholes.vercel.app**, served from
the repo root. The current MVP is separate, at **https://dsmvp.vercel.app**, served from
`mvp/`. Keep them separate – see the warning at the bottom.

Last updated 2026-07-21.

## The snapshot

The exact state of the live v1 prototype is tagged in git:

```
git tag                      # list tags
git show v1-prototype        # what the tag points at
git checkout v1-prototype    # browse the whole repo as it was
```

The tag is the real archive – it captures **every file** at that moment, including everything
listed below, and it can't drift. The inventory below is a map, not a second copy.

## Where the v1 files live

Nothing was moved. This is what belongs to v1 and where it is:

| Path | What it is |
| --- | --- |
| `index.html` | The v1 prototype itself – single-file React-via-Babel, ~12,200 lines. Every v1 route: marketing, attorney + reporter onboarding, order flow, match preview, dashboards, admin, directory, pricing, FAQ, terms. **This is what dewey-sholes.vercel.app serves.** |
| `csr_profiles.js` | v1's reporter dataset (4,733 records). Note this is a *different* file from `mvp/csr_profiles.js` (5,705 records) – don't cross them. |
| `governance-and-process/` | 30 policy docs – the authoritative source of truth for the v1 model. Pricing, billing + payment, cost-splitting, ratings + matching, IC classification, transcript custody, founding-member program, engineering support plan. |
| `PRDs/` | 15 product requirement docs, including the earlier "Briscoe Sholes" and "CertifiedRecord" naming eras. |
| `mockups/` | Four design directions explored for v1 – `editorial.html`, `heritage.html`, `hybrid.html`, `index.html`. |
| `graphics/` | Brand and marketing imagery (~44MB, includes video). Shared history with the MVP: `hp-text-grey.png` is used by both. |
| `logos/` | Logo explorations and finals. Shared with the MVP. |
| `admin/` | Founder collaboration agreement, Trello import. |
| `deploy/` | A stale March 2026 build. Superseded – the live site serves the root `index.html`, not this. Kept only as a historical artifact. |
| `deploy-archive-2026-05-12/` | An earlier full snapshot (index.html + csr_profiles.js + graphics) from May 2026. |
| `marketing/` | v1-era outbound marketing: video spec, competitive analysis, swag, phase 1-3 plans, founding-member program. Note the MVP has its own separate `mvp/marketing/`. |
| `research/` | 478 files, ~19MB. **Shared, not v1-only.** Rate research, agency-invoice teardowns, county tiers, user-testing guides. The MVP still cites these – e.g. `agency_invoice_evidence.md` is the source for the homepage money comparison. Do not treat as archived. |

## What is *not* v1

Everything under `mvp/` is the current product. It has its own build (`mvp/build.sh`), its own
data file, its own docs (`mvp/docs/`), and its own marketing folder. Start at
`mvp/docs/PROJECT_OVERVIEW.md`.

## Warning – keep the two sites separate

On 2026-07-21 the repo root was briefly overwritten with the MVP build, which took the v1
prototype off `dewey-sholes.vercel.app` until it was restored. `mvp/build.sh` deliberately
does **not** write to the repo root, and has a comment saying so. If you ever want the root to
serve something else, that's a real decision – the v1 prototype is what's published there.
