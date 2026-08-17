// ═══════════════════════════════════════════════════════════════════
//  SHORTHANDERS – Reduced-scope MVP prototype
//  Directory + profile claiming + messaging + Stripe/invoicing.
//  No job matching, scheduling, escrow, ratings. See mvp/prd-v1.
// ═══════════════════════════════════════════════════════════════════

// ─── Hash router ───────────────────────────────────────────────────
function useRoute() {
  const [hash, setHash] = useState(window.location.hash || "#/");
  useEffect(() => {
    const handler = () => { setHash(window.location.hash || "#/"); window.scrollTo({ top: 0, left: 0, behavior: "instant" }); };
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  return hash;
}
function navigate(path) { window.location.hash = path; }
function navigateBack(fallback) { if (window.history.length > 1) window.history.back(); else navigate(fallback || "/"); }

// Guard a form against silently losing unsaved edits. While `isDirty`, leaving prompts to confirm –
// via tab close/refresh (native beforeunload) AND the browser Back button (a trap history entry +
// popstate confirm). In-app Cancel/back controls should just call navigateBack()/history.back(); they
// funnel through the same trap, so there's one confirm no matter how you try to leave. See palette.md.
function useUnsavedGuard(isDirty) {
  const dirtyRef = useRef(isDirty);
  dirtyRef.current = isDirty;
  const MSG = "Discard your changes? Anything you've entered on this form won't be saved.";
  useEffect(() => {
    const onBeforeUnload = (e) => { if (dirtyRef.current) { e.preventDefault(); e.returnValue = ""; } };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, []);
  useEffect(() => {
    if (!isDirty) return;
    window.history.pushState({ dsGuard: true }, "");   // trap entry (same URL) to catch the first Back
    const onPop = () => {
      if (window.confirm(MSG)) { window.removeEventListener("popstate", onPop); window.history.back(); }
      else { window.history.pushState({ dsGuard: true }, ""); }   // re-trap: stay put
    };
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      if (window.history.state && window.history.state.dsGuard) window.history.back();   // drop the trap on save/unmount
    };
  }, [isDirty]);
}

// ─── Icon set ──────────────────────────────────────────────────────
const P = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" };
function Icon({ name, size = 18, style }) {
  const s = { width: size, height: size, display: "block", ...style };
  const paths = {
    search: <><circle cx="11" cy="11" r="7" {...P} /><path d="M21 21l-4.3-4.3" {...P} /></>,
    check: <path d="M20 6L9 17l-5-5" {...P} />,
    star: <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.6l1-5.8L3.5 9.7l5.9-.9z" {...P} />,
    message: { vb: 256, node: <path d="M128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z" fill="currentColor" /> },
    invoice: <><path d="M6 2h9l4 4v16H6z" {...P} /><path d="M9 8h6M9 12h6M9 16h4" {...P} /></>,
    bank: <><path d="M3 10l9-5 9 5" {...P} /><path d="M5 10v8M19 10v8M9 10v8M15 10v8M3 21h18" {...P} /></>,
    shield: <path d="M12 3l7 3v6c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6z" {...P} />,
    user: <><circle cx="12" cy="8" r="4" {...P} /><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" {...P} /></>,
    arrow: <path d="M5 12h14M13 6l6 6-6 6" {...P} />,
    plus: <path d="M12 5v14M5 12h14" {...P} />,
    link: <path d="M10 14a4 4 0 006 .5l2.5-2.5a4 4 0 00-5.7-5.7L11 8M14 10a4 4 0 00-6-.5L5.5 12a4 4 0 005.7 5.7L13 16" {...P} />,
    dollar: { vb: 256, node: <path d="M152,120H136V56h8a32,32,0,0,1,32,32,8,8,0,0,0,16,0,48.05,48.05,0,0,0-48-48h-8V24a8,8,0,0,0-16,0V40h-8a48,48,0,0,0,0,96h8v64H104a32,32,0,0,1-32-32,8,8,0,0,0-16,0,48.05,48.05,0,0,0,48,48h16v16a8,8,0,0,0,16,0V216h16a48,48,0,0,0,0-96Zm-40,0a32,32,0,0,1,0-64h8v64Zm40,80H136V136h16a32,32,0,0,1,0,64Z" fill="currentColor" /> },
    clock: { vb: 256, node: <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z" fill="currentColor" /> },
    info: { vb: 256, node: <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z" fill="currentColor" /> },
    pin: <><path d="M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z" {...P} /><circle cx="12" cy="10" r="2.5" {...P} /></>,
    filter: <path d="M3 5h18l-7 8v6l-4-2v-4z" {...P} />,
    chevron: <path d="M6 9l6 6 6-6" {...P} />,
    x: <path d="M18 6L6 18M6 6l12 12" {...P} />,
    gear: <><path d="M12 15a3 3 0 100-6 3 3 0 000 6z" {...P} /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 008 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H2a2 2 0 110-4h.09A1.65 1.65 0 004 8a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H8a1.65 1.65 0 001-1.51V2a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H22a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z" {...P} /></>,
    menu: <path d="M3 6h18M3 12h18M3 18h18" {...P} />,
    globe: <><circle cx="12" cy="12" r="9" {...P} /><path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" {...P} /></>,
    badge: <><circle cx="12" cy="10" r="6" {...P} /><path d="M8.5 15L7 22l5-3 5 3-1.5-7" {...P} /></>,
    doc: <><path d="M7 2h7l5 5v15H7z" {...P} /><path d="M14 2v5h5" {...P} /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" {...P} /><path d="M3 7l9 6 9-6" {...P} /></>,
    lock: <><rect x="5" y="11" width="14" height="10" rx="2" {...P} /><path d="M8 11V8a4 4 0 018 0v3" {...P} /></>,
    logout: <path d="M15 3h4v18h-4M10 12h9M13 8l-5 4 5 4" {...P} />,
    heart: <path d="M12 20s-7-4.4-9.2-9C1 7.5 3 4 6.5 4c2 0 3.4 1.2 4.5 2.7C12 5.2 13.5 4 15.5 4 19 4 21 7.5 21.2 11c-2.2 4.6-9.2 9-9.2 9z" {...P} />,
    eye: { vb: 256, node: <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z" fill="currentColor" /> },
    building: <><rect x="4" y="3" width="16" height="18" rx="1.5" {...P} /><path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2M10 21v-3h4v3" {...P} /></>,
    printer: { vb: 256, node: <path d="M214.4,80H208V48a16,16,0,0,0-16-16H64A16,16,0,0,0,48,48V80H41.6A24,24,0,0,0,16,104v72a24,24,0,0,0,24,24H48v16a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V200h8a24,24,0,0,0,24-24V104A24,24,0,0,0,214.4,80ZM64,48H192V80H64ZM192,208H64V160H192Zm48-32a8,8,0,0,1-8,8h-8V152a8,8,0,0,0-8-8H56a8,8,0,0,0-8,8v32H40a8,8,0,0,1-8-8V104A8,8,0,0,1,40,96H216a8,8,0,0,1,8,8Zm-32-52a12,12,0,1,1-12-12A12,12,0,0,1,208,124Z" fill="currentColor" /> },
  };
  // Phosphor icons live on a 256 grid and are fill-based; our native set is 24-grid strokes.
  // An entry can be a plain node (24-grid) or { vb, node } to carry its own viewBox.
  const entry = paths[name];
  if (entry && entry.vb) return <svg viewBox={"0 0 " + entry.vb + " " + entry.vb} style={s}>{entry.node}</svg>;
  return <svg viewBox="0 0 24 24" style={s}>{entry || null}</svg>;
}

// ─── Brand logo ────────────────────────────────────────────────────
// Canonical brand wordmark (designed artwork exported from the PSD).
// light=true swaps to the white-letter version for dark backgrounds.
// height sizes the mark; nav and footer pass their own.
function Logo({ onClick, light, height = 40 }) {
  const src = light ? "graphics/logo-wordmark-light.png" : "graphics/logo-wordmark.png";
  return (
    <button onClick={onClick} aria-label="Shorthanders home" style={{ display: "flex", alignItems: "center", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
      <img src={src} alt="Shorthanders" style={{ display: "block", height: height, width: "auto" }} />
    </button>
  );
}

// ─── City → County lookup (major CA cities; fallback null) ─────────
const CITY_COUNTY = {
  "Los Angeles": "Los Angeles", "Long Beach": "Los Angeles", "Glendale": "Los Angeles", "Santa Clarita": "Los Angeles", "Pasadena": "Los Angeles", "Torrance": "Los Angeles", "Pomona": "Los Angeles", "Burbank": "Los Angeles", "Hawthorne": "Los Angeles", "Claremont": "Los Angeles", "Verdugo City": "Los Angeles", "Whittier": "Los Angeles", "Inglewood": "Los Angeles", "Norwalk": "Los Angeles", "Downey": "Los Angeles", "West Covina": "Los Angeles", "Lancaster": "Los Angeles", "Palmdale": "Los Angeles",
  "San Diego": "San Diego", "Chula Vista": "San Diego", "Oceanside": "San Diego", "El Cajon": "San Diego", "Carlsbad": "San Diego", "Escondido": "San Diego", "Vista": "San Diego", "Encinitas": "San Diego",
  "San Jose": "Santa Clara", "Sunnyvale": "Santa Clara", "Santa Clara": "Santa Clara", "Mountain View": "Santa Clara", "Palo Alto": "Santa Clara", "Milpitas": "Santa Clara", "Cupertino": "Santa Clara", "Gilroy": "Santa Clara",
  "San Francisco": "San Francisco",
  "Oakland": "Alameda", "Fremont": "Alameda", "Hayward": "Alameda", "Berkeley": "Alameda", "Alameda": "Alameda", "Pleasanton": "Alameda", "Livermore": "Alameda", "Dublin": "Alameda", "Union City": "Alameda", "San Leandro": "Alameda",
  "Concord": "Contra Costa", "Richmond": "Contra Costa", "Antioch": "Contra Costa", "Walnut Creek": "Contra Costa", "Martinez": "Contra Costa", "San Ramon": "Contra Costa", "Danville": "Contra Costa", "Brentwood": "Contra Costa",
  "Sacramento": "Sacramento", "Elk Grove": "Sacramento", "Folsom": "Sacramento", "Citrus Heights": "Sacramento", "Woodland": "Yolo", "Davis": "Yolo",
  "Fresno": "Fresno", "Clovis": "Fresno", "Bakersfield": "Kern", "Exeter": "Tulare", "Visalia": "Tulare",
  "Santa Ana": "Orange", "Anaheim": "Orange", "Irvine": "Orange", "Huntington Beach": "Orange", "Costa Mesa": "Orange", "Fullerton": "Orange", "Orange": "Orange", "Newport Beach": "Orange", "Mission Viejo": "Orange",
  "Riverside": "Riverside", "Moreno Valley": "Riverside", "Corona": "Riverside", "Temecula": "Riverside", "Murrieta": "Riverside", "Palm Springs": "Riverside",
  "San Bernardino": "San Bernardino", "Fontana": "San Bernardino", "Ontario": "San Bernardino", "Rancho Cucamonga": "San Bernardino", "Rialto": "San Bernardino",
  "Santa Barbara": "Santa Barbara", "Santa Maria": "Santa Barbara", "Ventura": "Ventura", "Oxnard": "Ventura", "Thousand Oaks": "Ventura", "Simi Valley": "Ventura",
  "Mill Valley": "Marin", "San Rafael": "Marin", "Novato": "Marin", "Santa Rosa": "Sonoma", "Petaluma": "Sonoma", "Napa": "Napa", "Vallejo": "Solano", "Fairfield": "Solano",
  "Stockton": "San Joaquin", "Modesto": "Stanislaus", "Salinas": "Monterey", "Monterey": "Monterey", "Santa Cruz": "Santa Cruz",
};
// Internal go-to-market reference only (manual firm-selling priority metros). NOT for the
// directory UI - a firm searching shouldn't see our sales strategy. See state_expansion_checklist.md.
const TIER_A_COUNTIES = ["Santa Clara", "Contra Costa", "Alameda"];

function countyFor(city) { return CITY_COUNTY[city] || null; }
function initials(name) {
  const parts = (name || "").trim().split(/\s+/);
  return ((parts[0] || "")[0] || "") + ((parts[parts.length - 1] || "")[0] || "");
}
// Deterministic avatar color from name (no Math.random – stable across renders)
const AVATAR_COLORS = ["#5C7BE3", "#4F6F4D", "#8B6B33", "#6B4A6E", "#2563EB", "#4F46E5"];
function avatarColor(seed) {
  let h = 0; for (let i = 0; i < (seed || "").length; i++) h = (h * 31 + seed.charCodeAt(i)) % 997;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}
