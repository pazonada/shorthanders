# QA kit — Dewey Sholes

A **layered gate**: no single tool covers launch confidence, so each layer catches what the others
miss. Lives at repo root, outside the deployed `mvp/` path — nothing here ships.

| Layer | What it catches | Tool | File |
|---|---|---|---|
| **Browser flows** | broken flows, wrong routes, layout, console errors, PII in the page | Claude drives Chrome (or you click) | [`browser_flows.md`](browser_flows.md) + [`assertions.js`](assertions.js) |
| **Cross-model code review** | correctness + security bugs in the diff | Claude `/code-review` **and** Codex | [`code_review.md`](code_review.md) + [`diff.sh`](diff.sh) |
| **Test-mode E2E** *(add with backend)* | money actually moves, email actually lands, webhooks fire | Stripe/Resend test mode | see `browser_flows.md` → "the money/email layer" |
| **Monitoring** *(prod)* | failures that happen after you stop looking | Sentry / UptimeRobot / Healthchecks | `governance-and-process/engineering_support_plan.md` |

## Why layered

- Browser QA **can't** confirm money moved or email landed → that's test-mode E2E.
- Two AIs reviewing code **can share** a blind spot → for money/PII paths that's why the one human
  review still earns its (small) keep.
- Automation **can't** click a `window.confirm` dialog → a few manual click-tests per release.

Each file names its own limits so you're never fooled by a green check that didn't actually check.

## Fast path

```bash
# Code review on a feature branch:
./qa/diff.sh          # writes qa/_review_target.diff
# then run Claude /code-review, and Codex with the prompt in code_review.md, and reconcile.

# Browser flows:
#   start the `dev` server, open /mvp/, eval qa/assertions.js, walk browser_flows.md.
```

Right-sized for a solo, bootstrapped build: the paid layer is optional insurance, not a prerequisite.
