import { FABRIC_TYPES, LAGOS_AREAS, type FabricType, type LagosArea } from "./fabrics";
import type { Supplier } from "./suppliers";

export interface SupplierMatch {
  supplier: Supplier;
  score: number;
  reasons: string[];
}

export interface RecommendationResult {
  query: string;
  matches: SupplierMatch[];
  detected: {
    fabrics: FabricType[];
    areas: LagosArea[];
    quantityMeters: number | null;
    maxBudgetNgn: number | null;
    intents: string[];
  };
}

/* ────────────────────────────────────────────────────────────
 * Local "AI-style" supplier ranker.
 *
 * Pure function — given a free-text brief, returns the top-scoring
 * suppliers with a short list of reasons explaining each match.
 * No network calls, no API keys; runs in milliseconds.
 * ──────────────────────────────────────────────────────────── */

// Words that should map onto specific fabric types (synonyms / context).
const FABRIC_ALIASES: Record<FabricType, string[]> = {
  Ankara: ["ankara", "wax", "wax print", "vlisco", "hitarget", "abc wax", "da viva", "print"],
  Adire: ["adire", "tie dye", "tie-dye", "indigo", "eko", "hand dyed", "hand-dyed", "batik"],
  "Aso-oke": ["aso oke", "aso-oke", "asooke", "sanyan", "alaari", "etu", "iseyin", "handwoven", "hand-woven", "woven"],
  Lace: ["lace", "cord lace", "french lace", "swiss lace", "tulle", "voile", "sequin", "sequinned", "beaded"],
  Brocade: ["brocade", "damask", "jacquard", "agbada"],
  Kampala: ["kampala", "tie and dye"],
  Guinea: ["guinea", "shadda", "atiku"],
  Linen: ["linen", "european linen", "irish linen"],
  Cotton: ["cotton", "jersey", "french terry", "knit", "tee", "t-shirt", "tshirt", "sweat"],
  Deadstock: ["deadstock", "dead stock", "overstock", "end of roll", "end-of-roll", "scrap", "remnant"],
};

// Use-case / occasion keywords → suggested fabric types.
const USE_CASE_FABRIC_MAP: Record<string, FabricType[]> = {
  bridal: ["Lace", "Aso-oke", "Brocade"],
  wedding: ["Lace", "Aso-oke", "Brocade", "Guinea"],
  "aso ebi": ["Ankara", "Lace", "Brocade"],
  "aso-ebi": ["Ankara", "Lace", "Brocade"],
  owambe: ["Aso-oke", "Lace", "Brocade", "Guinea"],
  ceremony: ["Aso-oke", "Brocade", "Guinea"],
  ceremonial: ["Aso-oke", "Brocade", "Guinea"],
  traditional: ["Aso-oke", "Brocade", "Guinea", "Adire"],
  agbada: ["Guinea", "Brocade"],
  streetwear: ["Cotton", "Deadstock"],
  hoodie: ["Cotton"],
  hoodies: ["Cotton"],
  tshirt: ["Cotton"],
  "t-shirt": ["Cotton"],
  tees: ["Cotton"],
  jersey: ["Cotton"],
  athleisure: ["Cotton"],
  shirt: ["Cotton", "Linen"],
  shirts: ["Cotton", "Linen"],
  trouser: ["Linen", "Cotton"],
  trousers: ["Linen", "Cotton"],
  suit: ["Linen", "Cotton", "Brocade"],
  suiting: ["Linen", "Cotton"],
  uniform: ["Cotton", "Guinea"],
  uniforms: ["Cotton", "Guinea"],
  resort: ["Linen", "Cotton"],
  summer: ["Linen", "Cotton"],
  beachwear: ["Linen", "Cotton"],
  ankara: ["Ankara"],
  print: ["Ankara"],
  prints: ["Ankara"],
};

const SAMPLE_INTENT_RX =
  /\b(sample|samples|sampling|small batch|small-batch|prototype|prototyping|test run|swatch|swatches|first run|capsule)\b/;
const BULK_INTENT_RX =
  /\b(bulk|production|wholesale|large order|big order|mass|run of|mill order|factory order)\b/;
const VERIFIED_INTENT_RX = /\b(verified|trusted|reliable|established|safe|legit|vetted)\b/;
const PREMIUM_INTENT_RX =
  /\b(premium|luxury|high.?end|couture|designer|imported|european|french|swiss)\b/;
const FAST_INTENT_RX = /\b(fast|quick|urgent|rush|asap|today|tomorrow)\b/;

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 0);
}

function detectFabrics(q: string): FabricType[] {
  const matches: FabricType[] = [];
  for (const fab of FABRIC_TYPES) {
    const aliases = FABRIC_ALIASES[fab];
    if (aliases.some((a) => q.includes(a))) {
      matches.push(fab);
    }
  }
  return matches;
}

function detectAreas(q: string): LagosArea[] {
  const matches: LagosArea[] = [];
  for (const a of LAGOS_AREAS) {
    if (q.includes(a.toLowerCase())) matches.push(a);
  }
  return matches;
}

function detectUseCaseFabrics(q: string): FabricType[] {
  const set = new Set<FabricType>();
  for (const [keyword, fabs] of Object.entries(USE_CASE_FABRIC_MAP)) {
    if (q.includes(keyword)) fabs.forEach((f) => set.add(f));
  }
  return Array.from(set);
}

function detectQuantity(q: string): number | null {
  // "100m", "50 meters", "20 yards", "1000 yds"
  const m =
    q.match(/(\d{1,5})\s*(?:m\b|meter|metre|metres|meters|yd|yds|yard|yards)/i) ??
    q.match(/(\d{1,5})\s*pcs?\b/i);
  return m ? parseInt(m[1], 10) : null;
}

function detectBudget(q: string): number | null {
  // "under 5000", "below ₦4500", "max 8k", "n3000/m"
  const explicit = q.match(
    /(?:under|below|max(?:imum)?|≤|<=|less than|up to)\s*[₦n$]?\s*(\d+(?:,\d{3})*(?:\.\d+)?)\s*(k|m|000)?/i
  );
  const tagged = q.match(/[₦n$]\s*(\d+(?:,\d{3})*(?:\.\d+)?)\s*(k|m|000)?/i);
  const m = explicit ?? tagged;
  if (!m) return null;
  let amount = parseFloat(m[1].replace(/,/g, ""));
  const suffix = (m[2] ?? "").toLowerCase();
  if (suffix === "k" || suffix === "000") amount *= 1000;
  if (suffix === "m") amount *= 1_000_000;
  return Math.round(amount);
}

function detectIntents(q: string): string[] {
  const intents: string[] = [];
  if (SAMPLE_INTENT_RX.test(q)) intents.push("sample");
  if (BULK_INTENT_RX.test(q)) intents.push("bulk");
  if (VERIFIED_INTENT_RX.test(q)) intents.push("verified");
  if (PREMIUM_INTENT_RX.test(q)) intents.push("premium");
  if (FAST_INTENT_RX.test(q)) intents.push("fast");
  return intents;
}

export function recommendSuppliers(
  rawQuery: string,
  suppliers: Supplier[],
  topN = 3
): RecommendationResult {
  const query = (rawQuery ?? "").trim();
  const q = query.toLowerCase();
  const tokens = tokenize(q);

  const fabrics = detectFabrics(q);
  const areas = detectAreas(q);
  const useCaseFabrics = detectUseCaseFabrics(q);
  const quantityMeters = detectQuantity(q);
  const maxBudgetNgn = detectBudget(q);
  const intents = detectIntents(q);

  const wantsSample = intents.includes("sample");
  const wantsBulk = intents.includes("bulk");
  const wantsVerified = intents.includes("verified");
  const wantsPremium = intents.includes("premium");
  const wantsFast = intents.includes("fast");

  const fabricSet = new Set<FabricType>(fabrics);
  const useCaseSet = new Set<FabricType>(useCaseFabrics.filter((f) => !fabricSet.has(f)));

  const scored: SupplierMatch[] = suppliers.map((s) => {
    let score = 0;
    const reasons: string[] = [];

    // Direct fabric matches — highest weight.
    const matchedFabs = s.fabrics.filter((f) => fabricSet.has(f));
    if (matchedFabs.length > 0) {
      score += matchedFabs.length * 30;
      reasons.push(`Stocks ${matchedFabs.join(", ")}`);
    }

    // Use-case-implied fabric matches.
    const useCaseHits = s.fabrics.filter((f) => useCaseSet.has(f));
    if (useCaseHits.length > 0) {
      score += useCaseHits.length * 14;
      if (matchedFabs.length === 0) {
        reasons.push(`Strong fit for the brief (${useCaseHits.slice(0, 2).join(", ")})`);
      }
    }

    // Area / location.
    if (areas.includes(s.area)) {
      score += 22;
      reasons.push(`Based in ${s.area}`);
    }

    // Quantity / MOQ alignment.
    if (quantityMeters !== null) {
      if (quantityMeters >= s.moqMeters) {
        score += 18;
        reasons.push(
          `Accepts ~${quantityMeters}m orders (MOQ ${s.moqMeters}m)`
        );
      } else {
        score -= 12;
      }
    }

    // Sample-friendly intent.
    if (wantsSample) {
      if (s.moqMeters <= 10) {
        score += 20;
        reasons.push(`Sample-friendly MOQ (${s.moqMeters}m)`);
      } else {
        score -= 6;
      }
    }

    // Bulk capacity intent.
    if (wantsBulk) {
      if (s.moqMeters >= 25) {
        score += 18;
        reasons.push(`Built for bulk (${s.moqMeters}m+ MOQ)`);
      }
    }

    // Budget alignment.
    if (maxBudgetNgn !== null) {
      if (s.priceFromNgn <= maxBudgetNgn) {
        score += 14;
        reasons.push(
          `Within budget (from ₦${s.priceFromNgn.toLocaleString()}/m)`
        );
      } else {
        score -= 10;
      }
    }

    // Verified preference.
    if (wantsVerified) {
      if (s.verified) {
        score += 12;
        reasons.push(`Verified by Fabrica`);
      } else {
        score -= 8;
      }
    } else if (s.verified) {
      score += 2;
    }

    // Premium / high-end preference.
    if (wantsPremium && s.priceFromNgn >= 6500) {
      score += 12;
      reasons.push(`Premium / high-end inventory`);
    }

    // Fast-response preference.
    if (wantsFast) {
      const hrs = parseResponseHours(s.responseTime);
      if (hrs !== null && hrs <= 2) {
        score += 10;
        reasons.push(`Fast responder (${s.responseTime.toLowerCase()})`);
      }
    }

    // Light bonus for token overlap with the supplier's prose
    // (covers vocabulary we didn't enumerate above).
    if (tokens.length > 0) {
      const haystack = (
        s.description +
        " " +
        s.tagline +
        " " +
        s.highlights.join(" ")
      ).toLowerCase();
      let overlap = 0;
      for (const t of tokens) {
        if (t.length >= 4 && haystack.includes(t)) overlap++;
      }
      if (overlap > 0) score += Math.min(overlap * 3, 12);
    }

    // Tiny "experience" bonus so a tie favours seasoned suppliers.
    score += Math.min(s.yearsInBusiness * 0.15, 3);

    // De-dupe reasons, cap to keep the card readable.
    const unique = Array.from(new Set(reasons)).slice(0, 4);

    return { supplier: s, score, reasons: unique };
  });

  scored.sort((a, b) => b.score - a.score);

  // Fallback: if nothing scored above the noise floor, just return the most
  // experienced verified suppliers so the UI never shows an empty result.
  const meaningful = scored.filter((m) => m.score >= 8);
  const finalMatches =
    meaningful.length >= topN
      ? meaningful.slice(0, topN)
      : [
          ...meaningful,
          ...suppliers
            .filter((s) => s.verified && !meaningful.some((m) => m.supplier.slug === s.slug))
            .sort((a, b) => b.yearsInBusiness - a.yearsInBusiness)
            .slice(0, topN - meaningful.length)
            .map<SupplierMatch>((s) => ({
              supplier: s,
              score: 0,
              reasons: ["Verified, well-established Lagos supplier"],
            })),
        ];

  return {
    query,
    matches: finalMatches.slice(0, topN),
    detected: {
      fabrics,
      areas,
      quantityMeters,
      maxBudgetNgn,
      intents,
    },
  };
}

function parseResponseHours(s: string): number | null {
  // Handles strings like "Replies in ~2 hrs", "Replies in ~30 min", "Replies same-day".
  const hr = s.match(/~?(\d+)\s*hr/i);
  if (hr) return parseInt(hr[1], 10);
  const min = s.match(/~?(\d+)\s*min/i);
  if (min) return parseInt(min[1], 10) / 60;
  if (/same.?day/i.test(s)) return 8;
  return null;
}
