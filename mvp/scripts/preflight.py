#!/usr/bin/env python3
"""Pre-launch check on the built mvp/index.html.

Run before any deploy that is meant to be public:

    python3 mvp/scripts/preflight.py

FAIL = must be fixed before the site is public.
WARN = should be looked at, but won't break anything.
NOTE = informational; expected to be true while this is still a prototype.

Exits 1 if there is any FAIL, so it can gate a deploy script later.
"""

import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
MVP = os.path.dirname(HERE)

# The public origin the MVP will be served from. Update at launch if the
# domain changes; canonical / og:url are checked against it.
SITE_URL = "https://shorthanders.vercel.app"

results = []


def check(level, name, ok, detail=""):
    results.append((level if not ok else "PASS", name, detail))


def main():
    path = os.path.join(MVP, "index.html")
    if not os.path.exists(path):
        print("FAIL  index.html not found - run build.sh first")
        return 1
    html = open(path, encoding="utf-8").read()
    head = html[: html.find("</head>")] if "</head>" in html else html

    def meta(attr, value):
        m = re.search(
            r'<meta[^>]+%s=["\']%s["\'][^>]+content=["\']([^"\']*)["\']' % (attr, re.escape(value)),
            head,
            re.I,
        )
        return m.group(1) if m else None

    # --- structural basics -------------------------------------------------
    check("FAIL", "lang attribute on <html>", bool(re.search(r'<html[^>]+lang=', html, re.I)))
    check("FAIL", "charset declared", bool(re.search(r'<meta[^>]+charset=', head, re.I)))
    check("FAIL", "viewport declared", bool(re.search(r'name=["\']viewport["\']', head, re.I)))

    # --- title -------------------------------------------------------------
    m = re.search(r"<title>(.*?)</title>", head, re.S)
    title = m.group(1).strip() if m else None
    check("FAIL", "title present", bool(title))
    if title:
        check("WARN", "title <= 60 chars (search truncation)", len(title) <= 60,
              "%d chars: %s" % (len(title), title))

    # --- descriptions ------------------------------------------------------
    desc = meta("name", "description")
    check("FAIL", "meta description present", bool(desc))
    if desc:
        check("WARN", "meta description <= 160 chars", len(desc) <= 160, "%d chars" % len(desc))

    ogdesc = meta("property", "og:description")
    check("FAIL", "og:description present", bool(ogdesc))
    if ogdesc:
        check("WARN", "og:description <= 300 chars", len(ogdesc) <= 300, "%d chars" % len(ogdesc))

    # --- social / sharing --------------------------------------------------
    for prop in ("og:title", "og:type", "og:url", "og:image", "og:site_name"):
        check("FAIL" if prop in ("og:title", "og:url", "og:image") else "WARN",
              "%s present" % prop, bool(meta("property", prop)))

    check("WARN", "twitter:card present", bool(meta("name", "twitter:card")))

    ogurl = meta("property", "og:url")
    if ogurl:
        check("FAIL", "og:url uses the public origin", ogurl.startswith(SITE_URL), ogurl)

    # --- canonical / crawling ---------------------------------------------
    canon = re.search(r'<link[^>]+rel=["\']canonical["\'][^>]+href=["\']([^"\']+)["\']', head, re.I)
    check("FAIL", "canonical link present", bool(canon))
    if canon:
        check("FAIL", "canonical uses the public origin",
              canon.group(1).startswith(SITE_URL), canon.group(1))

    check("FAIL", "favicon present", bool(re.search(r'rel=["\'][^"\']*icon', head, re.I)))
    check("FAIL", "robots.txt exists", os.path.exists(os.path.join(MVP, "robots.txt")))
    check("WARN", "sitemap.xml exists", os.path.exists(os.path.join(MVP, "sitemap.xml")))

    noindex = re.search(r'name=["\']robots["\'][^>]+content=["\']([^"\']*)["\']', head, re.I)
    check("FAIL", "no leftover noindex", not (noindex and "noindex" in noindex.group(1).lower()),
          noindex.group(1) if noindex else "")

    # --- house style -------------------------------------------------------
    check("FAIL", "no em-dashes (house style is en-dash)", html.count("—") == 0,
          "%d found" % html.count("—"))

    # --- things that must not ship ----------------------------------------
    # Uppercase-only for TODO/FIXME: the stepper uses a lowercase "todo" CSS class.
    for bad, label, flags in ((r"localhost|127\.0\.0\.1", "no localhost URLs", re.I),
                              (r"\bTODO\b|\bFIXME\b|\bXXX\b", "no TODO/FIXME markers", 0),
                              (r"lorem ipsum", "no lorem ipsum", re.I)):
        hits = len(re.findall(bad, html, flags))
        check("FAIL", label, hits == 0, "%d found" % hits)

    # --- reporter PII must not ship ---------------------------------------
    # csr_profiles.js is downloaded whole by every visitor. It must carry only MASKED emails
    # (m***@domain, one leading char). A raw address (2+ chars before @) is a scrapeable spam
    # vector. See docs/integration_checklist.md sec 7 and the generate_profiles.py masker.
    prof_path = os.path.join(MVP, "csr_profiles.js")
    if os.path.exists(prof_path):
        prof = open(prof_path, encoding="utf-8").read()
        raw = re.findall(r'"email":"[A-Za-z0-9._%+\-]{2,}@', prof)
        check("FAIL", "csr_profiles.js has no raw emails (masked only)", len(raw) == 0,
              "%d raw address(es) - re-run data/generate_profiles.py (it masks)" % len(raw))
    else:
        check("WARN", "csr_profiles.js present", False, "not found - the directory won't load")

    # The Vercel deploy serves the whole mvp/ root, so internal dirs must be excluded or they're
    # publicly downloadable (a /data/*.csv once leaked ~5,700 reporters' emails + addresses).
    vign_path = os.path.join(MVP, ".vercelignore")
    vign = open(vign_path, encoding="utf-8").read() if os.path.exists(vign_path) else ""
    for d in ("data/", "docs/", "marketing/"):
        check("FAIL", ".vercelignore excludes %s" % d, d in vign,
              "add it - otherwise /%s is publicly served" % d)

    # --- prototype markers (expected until the backend is wired) ----------
    proto = len(re.findall(r"prototype|demo persona|faked|not real", html, re.I))
    check("NOTE", "prototype markers still in the page", proto == 0,
          "%d occurrences - expected until integrations land; see docs/integration_checklist.md" % proto)
    check("NOTE", "in-browser Babel transform", "babel-standalone" not in html,
          "fine for a prototype; precompile before real traffic")

    # --- report ------------------------------------------------------------
    order = {"FAIL": 0, "WARN": 1, "NOTE": 2, "PASS": 3}
    results.sort(key=lambda r: order[r[0]])
    width = max(len(r[1]) for r in results)
    for level, name, detail in results:
        line = "%-4s  %-*s" % (level, width, name)
        if detail and level != "PASS":
            line += "  %s" % detail
        print(line)

    fails = sum(1 for r in results if r[0] == "FAIL")
    warns = sum(1 for r in results if r[0] == "WARN")
    print("\n%d fail, %d warn, %d pass"
          % (fails, warns, sum(1 for r in results if r[0] == "PASS")))
    if fails:
        print("\nNot ready to be public. Fix the FAIL rows above.")
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
