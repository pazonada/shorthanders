// ═══════════════════════════════════════════════════════════════════
//  DEWEY SHOLES – Reduced-scope MVP prototype
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

// ─── Icon set ──────────────────────────────────────────────────────
const P = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" };
function Icon({ name, size = 18, style }) {
  const s = { width: size, height: size, display: "block", ...style };
  const paths = {
    search: <><circle cx="11" cy="11" r="7" {...P} /><path d="M21 21l-4.3-4.3" {...P} /></>,
    check: <path d="M20 6L9 17l-5-5" {...P} />,
    star: <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.6l1-5.8L3.5 9.7l5.9-.9z" {...P} />,
    message: <path d="M21 11.5a8.4 8.4 0 01-9 8.4 9 9 0 01-3.8-.8L3 21l1.9-4.2A8.4 8.4 0 013 11.5 8.4 8.4 0 0112 3a8.4 8.4 0 019 8.5z" {...P} />,
    invoice: <><path d="M6 2h9l4 4v16H6z" {...P} /><path d="M9 8h6M9 12h6M9 16h4" {...P} /></>,
    bank: <><path d="M3 10l9-5 9 5" {...P} /><path d="M5 10v8M19 10v8M9 10v8M15 10v8M3 21h18" {...P} /></>,
    shield: <path d="M12 3l7 3v6c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6z" {...P} />,
    user: <><circle cx="12" cy="8" r="4" {...P} /><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" {...P} /></>,
    arrow: <path d="M5 12h14M13 6l6 6-6 6" {...P} />,
    plus: <path d="M12 5v14M5 12h14" {...P} />,
    link: <path d="M10 14a4 4 0 006 .5l2.5-2.5a4 4 0 00-5.7-5.7L11 8M14 10a4 4 0 00-6-.5L5.5 12a4 4 0 005.7 5.7L13 16" {...P} />,
    dollar: <><path d="M12 2v20" {...P} /><path d="M17 6.5C17 4.6 14.8 3.5 12 3.5S7 4.8 7 7s2.2 3 5 3.5 5 1.3 5 3.5-2.2 3.5-5 3.5-5-1.1-5-3" {...P} /></>,
    clock: <><circle cx="12" cy="12" r="9" {...P} /><path d="M12 7v5l3 2" {...P} /></>,
    pin: <><path d="M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z" {...P} /><circle cx="12" cy="10" r="2.5" {...P} /></>,
    filter: <path d="M3 5h18l-7 8v6l-4-2v-4z" {...P} />,
    chevron: <path d="M6 9l6 6 6-6" {...P} />,
    x: <path d="M18 6L6 18M6 6l12 12" {...P} />,
    menu: <path d="M3 6h18M3 12h18M3 18h18" {...P} />,
    globe: <><circle cx="12" cy="12" r="9" {...P} /><path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" {...P} /></>,
    badge: <><circle cx="12" cy="10" r="6" {...P} /><path d="M8.5 15L7 22l5-3 5 3-1.5-7" {...P} /></>,
    doc: <><path d="M7 2h7l5 5v15H7z" {...P} /><path d="M14 2v5h5" {...P} /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" {...P} /><path d="M3 7l9 6 9-6" {...P} /></>,
    lock: <><rect x="5" y="11" width="14" height="10" rx="2" {...P} /><path d="M8 11V8a4 4 0 018 0v3" {...P} /></>,
    logout: <path d="M15 3h4v18h-4M10 12h9M13 8l-5 4 5 4" {...P} />,
    heart: <path d="M12 20s-7-4.4-9.2-9C1 7.5 3 4 6.5 4c2 0 3.4 1.2 4.5 2.7C12 5.2 13.5 4 15.5 4 19 4 21 7.5 21.2 11c-2.2 4.6-9.2 9-9.2 9z" {...P} />,
    eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" {...P} /><circle cx="12" cy="12" r="3" {...P} /></>,
    building: <><rect x="4" y="3" width="16" height="18" rx="1.5" {...P} /><path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2M10 21v-3h4v3" {...P} /></>,
  };
  return <svg viewBox="0 0 24 24" style={s}>{paths[name] || null}</svg>;
}

// ─── Brand logo ────────────────────────────────────────────────────
// Canonical brand lockup: navy icon + DEWEY (navy) / SHOLES (brand blue) in Courier New.
// Ported from the v1 site (logos/final/bs-gregg-navy.svg). light=true for dark backgrounds.
function Logo({ onClick, light }) {
  const dewey = light ? "#FFFFFF" : "#0F172A";
  const sholes = light ? "#818CF8" : "#4361EE";
  return (
    <button onClick={onClick} aria-label="Dewey Sholes home" style={{ display: "flex", alignItems: "center", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
      <svg height="34" viewBox="0 0 310 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
        <rect x="0" y="0" width="60" height="60" rx="13" fill="#0F172A" />
        <path d="M 14,42 C 10,24 16,9 30,9 C 46,9 54,21 51,34 C 48,47 35,54 22,48 C 15,44 14,36 19,30 C 24,23 36,24 40,33 C 43,39 40,47 34,50" fill="none" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        <text x="76" y="27" fontFamily="'Courier New',Courier,monospace" fontSize="18" fontWeight="700" fill={dewey} letterSpacing="4">DEWEY</text>
        <text x="76" y="53" fontFamily="'Courier New',Courier,monospace" fontSize="18" fontWeight="700" fill={sholes} letterSpacing="4">SHOLES</text>
      </svg>
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
