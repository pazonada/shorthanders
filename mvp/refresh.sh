#!/usr/bin/env bash
# Quarterly reporter-directory refresh: re-pull the CRB public roster, regenerate the
# (masked) directory data, rebuild the page, and run the pre-deploy checks.
#
#   bash mvp/refresh.sh
#
# What each step does:
#   1. pull_csrs.py        - fetch the full CA CRB roster            -> data/crb_all_raw.json (gitignored)
#   2. generate_profiles.py- filter to ACTIVE + MASK emails         -> csr_profiles.js  (expired drop out,
#                                                                       new licensees get added)
#   3. build.sh            - rebuild index.html
#   4. scripts/preflight.py- gate: fails on raw emails / PII exposure / house-style issues
#
# NOTE: this rebuilds the UNCLAIMED public mirror. Once real claimed profiles exist, the refresh
# must become a keyed MERGE that never overwrites claimed self-entered data and freezes (not
# deletes) expired licenses - see docs/roster_refresh_policy.md. Not built yet.
#
# After it passes: review `git diff --stat`, then commit csr_profiles.js + index.html and push.
set -euo pipefail
cd "$(dirname "$0")"

echo "==> 1/4  Pulling the CRB roster (network, ~1 min)..."
python3 data/pull_csrs.py

echo "==> 2/4  Regenerating csr_profiles.js (active only, emails masked)..."
python3 data/generate_profiles.py

echo "==> 3/4  Rebuilding index.html..."
bash build.sh

echo "==> 4/4  Preflight checks..."
python3 scripts/preflight.py

echo
echo "Refresh complete. Review 'git diff --stat', then commit csr_profiles.js (+ index.html) and push."
echo "Reminder: raw emails/addresses live only in data/ (gitignored, not deployed) - keep it that way."
