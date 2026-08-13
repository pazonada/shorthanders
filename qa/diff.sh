#!/usr/bin/env bash
# Dump the review target (branch diff vs base + any uncommitted working changes) to one file that
# both Claude /code-review and Codex can read. Usage: ./qa/diff.sh [base]   (base defaults to main)
set -euo pipefail
base="${1:-main}"
out="qa/_review_target.diff"
{
  echo "### Committed on this branch vs ${base} ###"
  git diff "${base}...HEAD"
  echo
  echo "### Uncommitted working changes ###"
  git diff
} > "${out}"
lines=$(wc -l < "${out}" | tr -d ' ')
echo "wrote ${out} (${lines} lines, base=${base})"
