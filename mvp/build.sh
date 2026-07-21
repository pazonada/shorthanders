#!/usr/bin/env bash
# Rebuild mvp/index.html from the modular sources in mvp/src/.
# The deployable artifact is mvp/index.html (+ mvp/csr_profiles.js).
set -euo pipefail
cd "$(dirname "$0")"
cat \
  src/_head.html src/_style_block.html src/_body_open.html \
  src/_app_01_core.jsx src/_app_02_data.jsx src/_app_03_shell.jsx src/_app_04_marketing.jsx \
  src/_app_05_directory.jsx src/_app_06_claim.jsx src/_app_07_reporter.jsx src/_app_08_invoices.jsx \
  src/_app_09_messaging.jsx src/_app_10_firm.jsx src/_app_11_router.jsx src/_tail.html \
  > index.html
echo "Built index.html ($(wc -l < index.html | tr -d ' ') lines)"
# Note: do NOT mirror to the repo root. The root serves the v1 prototype
# at dewey-sholes.vercel.app; this build only serves dsmvp.vercel.app.
