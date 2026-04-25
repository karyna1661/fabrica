import {
  FABRIC_TYPES,
  LAGOS_AREAS,
  MOQ_BANDS,
  type FabricType,
  type LagosArea,
} from "./fabrics";

export type SwatchPattern = "solid" | "stripes" | "grid" | "dots" | "weave" | "zigzag";

export interface Swatch {
  name: string;
  bg: string;       // tailwind background utility (e.g. "bg-amber")
  fg?: string;      // pattern color utility (e.g. "text-ink")
  pattern?: SwatchPattern;
}

export interface Supplier {
  slug: string;
  name: string;
  tagline: string;
  area: LagosArea;
  market?: string;
  fabrics: FabricType[];
  moqMeters: number;
  priceFromNgn: number; // ₦ / meter
  priceToNgn: number;
  responseTime: string;
  whatsapp: string; // E.164, no "+"
  verified: boolean;
  yearsInBusiness: number;
  description: string;
  highlights: string[];
  swatches: Swatch[];
  accentColor: "green-primary" | "amber" | "clay" | "magenta" | "ink";
}

const HAND_CRAFTED_SUPPLIERS: Supplier[] = [
  {
    slug: "mama-tope-textiles",
    name: "Mama Tope Textiles",
    tagline: "Wax prints from the heart of Idumota.",
    area: "Idumota",
    market: "Idumota Market, Line 4 Stall 23",
    fabrics: ["Ankara", "Kampala", "Guinea"],
    moqMeters: 12,
    priceFromNgn: 2200,
    priceToNgn: 4800,
    responseTime: "Replies in ~2 hrs",
    whatsapp: "2348012345001",
    verified: true,
    yearsInBusiness: 14,
    description:
      "Family-run wholesaler stocking 200+ Ankara designs from Vlisco, Hitarget, and ABC Wax. Strong on classic patterns and seasonal drops. Walk-ins welcome on Tuesdays and Fridays.",
    highlights: [
      "200+ wax print SKUs in stock",
      "Half-piece (6yd) MOQ accepted",
      "Bulk discount from 50m+",
    ],
    swatches: [
      { name: "Vlisco Classic", bg: "bg-amber", fg: "text-ink", pattern: "dots" },
      { name: "Hitarget Tropical", bg: "bg-green-primary", fg: "text-cream", pattern: "zigzag" },
      { name: "ABC Floral", bg: "bg-clay", fg: "text-ink", pattern: "stripes" },
    ],
    accentColor: "amber",
  },
  {
    slug: "balogun-base-fabrics",
    name: "Balogun Base Fabrics",
    tagline: "Lace, brocade, and trims since 2003.",
    area: "Balogun",
    market: "Balogun Market, Lane 7",
    fabrics: ["Lace", "Brocade", "Guinea"],
    moqMeters: 8,
    priceFromNgn: 5500,
    priceToNgn: 22000,
    responseTime: "Replies in ~30 min",
    whatsapp: "2348012345002",
    verified: true,
    yearsInBusiness: 21,
    description:
      "Premium lace and Swiss voile importer. Strong relationships with Austrian and Swiss mills. Carries cord lace, French lace, and tulle in 80+ colorways. Custom dyeing available on bulk orders.",
    highlights: [
      "Direct importer — no middleman markup",
      "Custom dyeing from 30m",
      "Bridal & ceremonial specialist",
    ],
    swatches: [
      { name: "Cord Lace Ivory", bg: "bg-bone", fg: "text-ink", pattern: "grid" },
      { name: "French Lace Rose", bg: "bg-magenta", fg: "text-cream", pattern: "dots" },
      { name: "Swiss Voile Sky", bg: "bg-green-soft", fg: "text-ink", pattern: "weave" },
    ],
    accentColor: "magenta",
  },
  {
    slug: "adire-oke-collective",
    name: "Adire Oke Collective",
    tagline: "Hand-dyed Adire from Abeokuta.",
    area: "Yaba",
    fabrics: ["Adire", "Cotton"],
    moqMeters: 5,
    priceFromNgn: 4500,
    priceToNgn: 9500,
    responseTime: "Replies in ~4 hrs",
    whatsapp: "2348012345003",
    verified: true,
    yearsInBusiness: 7,
    description:
      "Cooperative of 12 Adire artisans based in Itoku, Abeokuta with a Lagos showroom in Yaba. Indigo, eko, and modern colorway capabilities. Each piece is hand-stamped or tied — slight variance is part of the craft.",
    highlights: [
      "Hand-dyed, ethical sourcing",
      "Custom motif on 20m+ orders",
      "Showroom by appointment",
    ],
    swatches: [
      { name: "Indigo Eleko", bg: "bg-green-deep", fg: "text-cream", pattern: "zigzag" },
      { name: "Sun Burst", bg: "bg-amber", fg: "text-ink", pattern: "dots" },
      { name: "Modern Slate", bg: "bg-ink", fg: "text-cream", pattern: "grid" },
    ],
    accentColor: "green-primary",
  },
  {
    slug: "mushin-mill-direct",
    name: "Mushin Mill Direct",
    tagline: "Bulk cotton, linen, and basics.",
    area: "Mushin",
    fabrics: ["Cotton", "Linen", "Guinea"],
    moqMeters: 50,
    priceFromNgn: 1800,
    priceToNgn: 6500,
    responseTime: "Replies in ~1 hr",
    whatsapp: "2348012345004",
    verified: true,
    yearsInBusiness: 11,
    description:
      "Direct from a mid-size mill on the Mushin–Isolo axis. Strong on plain weaves, twills, and uniform fabric. Best for production runs above 50m. Sample swatches mailed within Lagos for ₦2,000.",
    highlights: [
      "Production-grade quality control",
      "50m MOQ, breakpoints at 100m & 500m",
      "Cut & roll service available",
    ],
    swatches: [
      { name: "Cotton Bone", bg: "bg-bone", fg: "text-muted", pattern: "weave" },
      { name: "Linen Cream", bg: "bg-cream", fg: "text-muted", pattern: "weave" },
      { name: "Twill Green", bg: "bg-green-primary", fg: "text-cream", pattern: "stripes" },
    ],
    accentColor: "ink",
  },
  {
    slug: "surulere-deadstock-co",
    name: "Surulere Deadstock Co.",
    tagline: "Last-season fabric. Designer prices.",
    area: "Surulere",
    fabrics: ["Deadstock", "Cotton", "Lace", "Linen"],
    moqMeters: 3,
    priceFromNgn: 1200,
    priceToNgn: 5500,
    responseTime: "Replies in ~6 hrs",
    whatsapp: "2348012345005",
    verified: false,
    yearsInBusiness: 3,
    description:
      "We salvage end-of-roll and overstock from Lagos garment factories — small lots, real designer fabrics, deeply discounted. Stock changes weekly. First-come, first-served.",
    highlights: [
      "3m MOQ — perfect for samples",
      "Stock list updated weekly",
      "One-of-one — no reorders",
    ],
    swatches: [
      { name: "Mystery Roll #14", bg: "bg-clay", fg: "text-ink", pattern: "stripes" },
      { name: "Mystery Roll #21", bg: "bg-green-soft", fg: "text-ink", pattern: "dots" },
      { name: "Mystery Roll #08", bg: "bg-magenta", fg: "text-cream", pattern: "grid" },
    ],
    accentColor: "clay",
  },
  {
    slug: "iya-bukky-aso-oke",
    name: "Iya Bukky Aso-Oke",
    tagline: "Hand-woven Aso-oke. Made in Iseyin.",
    area: "Lagos Island",
    market: "Lagos Island Aso-oke Hub",
    fabrics: ["Aso-oke"],
    moqMeters: 6,
    priceFromNgn: 12000,
    priceToNgn: 45000,
    responseTime: "Replies in ~8 hrs",
    whatsapp: "2348012345006",
    verified: true,
    yearsInBusiness: 28,
    description:
      "Three generations of weavers from Iseyin. Specialises in Sanyan, Alaari, and Etu in heritage and modern colorways. Custom commissions from 6 yards (5.5m). Wedding bookings open 8 weeks ahead.",
    highlights: [
      "Custom wedding sets",
      "Heritage Sanyan & Alaari",
      "Master weaver oversight",
    ],
    swatches: [
      { name: "Sanyan", bg: "bg-amber", fg: "text-ink", pattern: "weave" },
      { name: "Alaari Deep", bg: "bg-clay", fg: "text-cream", pattern: "weave" },
      { name: "Etu Indigo", bg: "bg-green-deep", fg: "text-cream", pattern: "weave" },
    ],
    accentColor: "amber",
  },
  {
    slug: "lekki-linen-house",
    name: "Lekki Linen House",
    tagline: "European linen. Lagos pricing.",
    area: "Lekki",
    fabrics: ["Linen", "Cotton"],
    moqMeters: 15,
    priceFromNgn: 7800,
    priceToNgn: 14500,
    responseTime: "Replies in ~3 hrs",
    whatsapp: "2348012345007",
    verified: true,
    yearsInBusiness: 5,
    description:
      "European-mill linen and cotton-linen blends, imported in 50m rolls. 12 colorways always in stock — natural, bone, sand, olive, navy, charcoal, oxblood, tan, ivory, sage, mustard, black.",
    highlights: [
      "Pre-washed, garment-ready",
      "12 in-stock colorways",
      "Showroom on Admiralty Way",
    ],
    swatches: [
      { name: "Natural", bg: "bg-bone", fg: "text-muted", pattern: "weave" },
      { name: "Sage", bg: "bg-green-soft", fg: "text-green-deep", pattern: "weave" },
      { name: "Oxblood", bg: "bg-clay", fg: "text-cream", pattern: "weave" },
    ],
    accentColor: "green-primary",
  },
  {
    slug: "yaba-young-textiles",
    name: "Yaba Young Textiles",
    tagline: "Streetwear-ready cotton & jersey.",
    area: "Yaba",
    fabrics: ["Cotton", "Deadstock"],
    moqMeters: 25,
    priceFromNgn: 2100,
    priceToNgn: 5800,
    responseTime: "Replies in ~5 hrs",
    whatsapp: "2348012345008",
    verified: false,
    yearsInBusiness: 2,
    description:
      "Heavyweight cottons, French terry, and jersey for streetwear and contemporary brands. Perfect for hoodies, tees, and trousers. Working with 6+ emerging Lagos labels.",
    highlights: [
      "300–400 GSM cottons",
      "French terry & jersey in stock",
      "Designer-friendly MOQs",
    ],
    swatches: [
      { name: "French Terry Cream", bg: "bg-cream", fg: "text-muted", pattern: "grid" },
      { name: "Heavy Tee Black", bg: "bg-ink", fg: "text-cream", pattern: "grid" },
      { name: "Jersey Olive", bg: "bg-green-deep", fg: "text-cream", pattern: "grid" },
    ],
    accentColor: "ink",
  },
  {
    slug: "ikeja-import-house",
    name: "Ikeja Import House",
    tagline: "Bridal lace, sequins, embellishment.",
    area: "Ikeja",
    fabrics: ["Lace", "Brocade"],
    moqMeters: 5,
    priceFromNgn: 9500,
    priceToNgn: 38000,
    responseTime: "Replies in ~1 hr",
    whatsapp: "2348012345009",
    verified: true,
    yearsInBusiness: 9,
    description:
      "Sequinned lace, beaded tulle, and stoned net for bridal and ceremonial wear. Sourced from India, Turkey, and France. Showroom at Allen Avenue. Ships nationwide via GIG Logistics.",
    highlights: [
      "Bridal & couture specialist",
      "5m MOQ on most laces",
      "Stoned net in 30+ colors",
    ],
    swatches: [
      { name: "Sequin Champagne", bg: "bg-amber", fg: "text-ink", pattern: "dots" },
      { name: "Beaded Ivory", bg: "bg-bone", fg: "text-muted", pattern: "dots" },
      { name: "Stoned Rose", bg: "bg-magenta", fg: "text-cream", pattern: "dots" },
    ],
    accentColor: "magenta",
  },
  {
    slug: "mainland-mill-co",
    name: "Mainland Mill Co.",
    tagline: "Brocade, damask, and ceremonial weaves.",
    area: "Mushin",
    fabrics: ["Brocade", "Guinea", "Kampala"],
    moqMeters: 20,
    priceFromNgn: 3400,
    priceToNgn: 11000,
    responseTime: "Replies in ~2 hrs",
    whatsapp: "2348012345010",
    verified: true,
    yearsInBusiness: 17,
    description:
      "Long-standing brocade and damask wholesaler with stock from Austria, China, and the UAE. Strong on traditional ceremonial palettes. Cash and bank transfer accepted; no card payments at the warehouse.",
    highlights: [
      "Traditional ceremonial colorways",
      "20m starter MOQ",
      "Volume pricing from 100m",
    ],
    swatches: [
      { name: "Royal Damask", bg: "bg-green-deep", fg: "text-amber", pattern: "zigzag" },
      { name: "Wine Brocade", bg: "bg-clay", fg: "text-amber", pattern: "zigzag" },
      { name: "Cream Guinea", bg: "bg-cream", fg: "text-green-deep", pattern: "weave" },
    ],
    accentColor: "green-primary",
  },
];

/* ────────────────────────────────────────────────────────────
 * Generated suppliers — extends the directory to 70 total.
 *
 * The data is deterministic: same seed → same supplier set,
 * so server and client render identical results and SSG works.
 * ──────────────────────────────────────────────────────────── */

const FIRST_NAMES = [
  "Bisi", "Funmi", "Kemi", "Yemi", "Tunde", "Femi", "Ade", "Bola", "Wale",
  "Kunle", "Sade", "Toyin", "Ngozi", "Chika", "Ifeoma", "Obi", "Emeka",
  "Aisha", "Hauwa", "Fatima", "Yusuf", "Aminu", "Ibrahim", "Hassan",
  "Lola", "Tobi", "Rotimi", "Segun", "Dapo", "Tope", "Tola", "Niyi",
  "Bukky", "Adunni", "Dami", "Folake", "Ibukun", "Jide", "Lekan", "Seun",
] as const;

const PREFIXES = ["Iya", "Mama", "Baba", "Alhaji", "Chief", "Madam", "Aunty", ""] as const;

const SUFFIXES = [
  "Textiles", "Fabrics", "Trading Co.", "Stores", "Concept",
  "Empire", "House", "Co.", "Studios", "Imports", "Wholesale",
  "Mill", "& Sons", "& Daughters", "Collective", "Hub",
] as const;

const MARKETS_BY_AREA: Record<LagosArea, string[]> = {
  Idumota: ["Idumota Market", "Idumota Line 12", "Idumota Wholesale Wing"],
  Balogun: ["Balogun Market", "Balogun Lane 3", "Tinubu Square Stalls"],
  Mushin: ["Idi-Oro Market", "Mushin Mill Strip", "Olosha Junction"],
  Surulere: ["Bode Thomas Showroom", "Adeniran Ogunsanya Stalls"],
  "Lagos Island": ["Marina Market", "Lagos Island Aso-oke Hub", "Broad Street Wing"],
  Yaba: ["Tejuosho Market", "Sabo Market Stall 4", "Yaba Showroom"],
  Lekki: ["Admiralty Way Showroom", "Lekki Phase 1 Studio", "Ikate Market"],
  Ikeja: ["Allen Avenue Showroom", "Ikeja City Mall Stall", "Computer Village Annex"],
};

const FABRIC_PALETTES: Record<FabricType, Swatch[]> = {
  Ankara: [
    { name: "Vlisco Bloom", bg: "bg-amber", fg: "text-ink", pattern: "dots" },
    { name: "Hitarget Wave", bg: "bg-green-primary", fg: "text-cream", pattern: "zigzag" },
    { name: "ABC Geo", bg: "bg-clay", fg: "text-cream", pattern: "stripes" },
    { name: "Da Viva", bg: "bg-magenta", fg: "text-cream", pattern: "dots" },
  ],
  Adire: [
    { name: "Indigo Eleko", bg: "bg-green-deep", fg: "text-cream", pattern: "zigzag" },
    { name: "Eko Stamp", bg: "bg-ink", fg: "text-cream", pattern: "grid" },
    { name: "Sun Tie", bg: "bg-amber", fg: "text-ink", pattern: "dots" },
  ],
  "Aso-oke": [
    { name: "Sanyan", bg: "bg-amber", fg: "text-ink", pattern: "weave" },
    { name: "Alaari", bg: "bg-clay", fg: "text-cream", pattern: "weave" },
    { name: "Etu Indigo", bg: "bg-green-deep", fg: "text-cream", pattern: "weave" },
  ],
  Lace: [
    { name: "Cord Ivory", bg: "bg-bone", fg: "text-ink", pattern: "grid" },
    { name: "French Rose", bg: "bg-magenta", fg: "text-cream", pattern: "dots" },
    { name: "Swiss Sky", bg: "bg-green-soft", fg: "text-ink", pattern: "weave" },
    { name: "Sequin Gold", bg: "bg-amber", fg: "text-ink", pattern: "dots" },
  ],
  Brocade: [
    { name: "Royal Damask", bg: "bg-green-deep", fg: "text-amber", pattern: "zigzag" },
    { name: "Wine Brocade", bg: "bg-clay", fg: "text-amber", pattern: "zigzag" },
    { name: "Cream Brocade", bg: "bg-cream", fg: "text-green-deep", pattern: "weave" },
  ],
  Kampala: [
    { name: "Tie-Dye Coral", bg: "bg-clay", fg: "text-cream", pattern: "dots" },
    { name: "Kampala Sky", bg: "bg-green-soft", fg: "text-green-deep", pattern: "zigzag" },
    { name: "Ochre Burst", bg: "bg-amber", fg: "text-ink", pattern: "stripes" },
  ],
  Guinea: [
    { name: "Guinea White", bg: "bg-paper", fg: "text-muted", pattern: "weave" },
    { name: "Guinea Cream", bg: "bg-cream", fg: "text-muted", pattern: "weave" },
    { name: "Guinea Forest", bg: "bg-green-deep", fg: "text-cream", pattern: "weave" },
  ],
  Linen: [
    { name: "Natural Linen", bg: "bg-bone", fg: "text-muted", pattern: "weave" },
    { name: "Sage Linen", bg: "bg-green-soft", fg: "text-green-deep", pattern: "weave" },
    { name: "Oxblood Linen", bg: "bg-clay", fg: "text-cream", pattern: "weave" },
  ],
  Cotton: [
    { name: "Cotton Bone", bg: "bg-bone", fg: "text-muted", pattern: "weave" },
    { name: "Heavy Tee Black", bg: "bg-ink", fg: "text-cream", pattern: "grid" },
    { name: "Cotton Olive", bg: "bg-green-deep", fg: "text-cream", pattern: "grid" },
  ],
  Deadstock: [
    { name: "Mystery Roll", bg: "bg-magenta", fg: "text-cream", pattern: "stripes" },
    { name: "End-Lot Slate", bg: "bg-ink", fg: "text-cream", pattern: "dots" },
    { name: "Last-Season", bg: "bg-amber", fg: "text-ink", pattern: "grid" },
  ],
};

const ACCENT_BY_FABRIC: Record<FabricType, Supplier["accentColor"]> = {
  Ankara: "amber",
  Adire: "green-primary",
  "Aso-oke": "amber",
  Lace: "magenta",
  Brocade: "green-primary",
  Kampala: "clay",
  Guinea: "green-primary",
  Linen: "green-primary",
  Cotton: "ink",
  Deadstock: "clay",
};

const DESCRIPTION_TEMPLATES = [
  (s: { fabricList: string; area: string; years: number }) =>
    `${s.years}-year-old wholesaler stocking ${s.fabricList} from trusted Lagos and overseas mills. Walk-ins welcome at the ${s.area} stall — call ahead for bulk pickups.`,
  (s: { fabricList: string; area: string; years: number }) =>
    `Family-run business specialising in ${s.fabricList}. Serving designers, tailors, and event planners across ${s.area} and the wider Lagos network for ${s.years} years.`,
  (s: { fabricList: string; area: string; years: number }) =>
    `Direct-from-mill pricing on ${s.fabricList}. Strong relationships with importers in Aba, Cotonou, and Dubai. ${s.area}-based, with nationwide GIG logistics.`,
  (s: { fabricList: string; area: string; years: number }) =>
    `${s.fabricList.charAt(0).toUpperCase() + s.fabricList.slice(1)} curated for designers who care about quality. ${s.years} years on the ${s.area} circuit. Sample pieces always on hand.`,
  (s: { fabricList: string; area: string; years: number }) =>
    `Boutique stockist of ${s.fabricList}. Small but tight selection — every roll vetted before it hits the shelf. Located in ${s.area}.`,
];

const TAGLINE_TEMPLATES = [
  (s: { fabric: string; area: string }) => `${s.fabric} for the ${s.area} crowd.`,
  (s: { fabric: string; area: string }) => `Honest ${s.fabric.toLowerCase()} prices — ask anyone in ${s.area}.`,
  (s: { fabric: string; area: string }) => `Your ${s.area} plug for ${s.fabric.toLowerCase()}.`,
  (s: { fabric: string; area: string }) => `${s.fabric} done right since day one.`,
  (s: { fabric: string; area: string }) => `Fresh ${s.fabric.toLowerCase()} drops every week.`,
  (s: { fabric: string; area: string }) => `Where Lagos comes for ${s.fabric.toLowerCase()}.`,
];

const HIGHLIGHT_POOL = [
  "Bulk discount from 50m+",
  "Walk-ins Tue–Sat",
  "GIG Logistics nationwide",
  "Sample swatches on request",
  "Flexible payment terms",
  "WhatsApp catalog updated weekly",
  "Cut & roll service available",
  "Mix-and-match colorways",
  "Custom dyeing on bulk orders",
  "Designer-friendly MOQs",
  "Showroom by appointment",
  "Cash & transfer accepted",
] as const;

const RESPONSE_TIMES = [
  "Replies in ~30 min",
  "Replies in ~1 hr",
  "Replies in ~2 hrs",
  "Replies in ~4 hrs",
  "Replies in ~6 hrs",
  "Replies same-day",
] as const;

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function pick<T>(arr: readonly T[], seed: number): T {
  return arr[seed % arr.length];
}

function buildGeneratedSuppliers(): Supplier[] {
  const N = 60;
  const out: Supplier[] = [];
  const usedSlugs = new Set(HAND_CRAFTED_SUPPLIERS.map((s) => s.slug));

  for (let i = 0; i < N; i++) {
    const seed = i + 11; // continue WhatsApp numbering from 011

    const prefix = pick(PREFIXES, i * 7 + 3);
    const first = pick(FIRST_NAMES, i * 11 + 5);
    const suffix = pick(SUFFIXES, i * 13 + 1);
    const baseName = [prefix, first, suffix].filter(Boolean).join(" ");

    let slug = slugify(baseName);
    while (usedSlugs.has(slug)) slug = `${slug}-${seed}`;
    usedSlugs.add(slug);

    const area = pick(LAGOS_AREAS, i * 5 + 2);
    const market = i % 4 === 0 ? undefined : pick(MARKETS_BY_AREA[area], i * 3);

    const fabricCount = 1 + (i % 3); // 1–3 fabrics
    const fabricsSet = new Set<FabricType>();
    for (let k = 0; k < fabricCount + 2 && fabricsSet.size < fabricCount; k++) {
      fabricsSet.add(pick(FABRIC_TYPES, i * (k + 4) + 7));
    }
    const fabrics = Array.from(fabricsSet);
    const primaryFabric = fabrics[0];

    const moqOptions = [3, 5, 6, 8, 10, 12, 15, 20, 25, 30, 50, 75, 100];
    const moqMeters = pick(moqOptions, i * 17 + 4);

    const priceFromOptions = [1500, 1800, 2200, 2700, 3200, 3800, 4500, 5200, 6500, 7800, 9500, 12000];
    const priceFromNgn = pick(priceFromOptions, i * 19 + 6);
    const priceToNgn = priceFromNgn + 1500 + ((i * 311) % 16000);

    const responseTime = pick(RESPONSE_TIMES, i * 23 + 1);

    const whatsapp = `23480123450${String(seed).padStart(2, "0")}`;

    const verified = i % 7 !== 0; // ~85% verified
    const yearsInBusiness = 1 + ((i * 3 + 2) % 27);

    const fabricList = fabrics.join(", ");
    const description = pick(DESCRIPTION_TEMPLATES, i * 29 + 5)({
      fabricList,
      area,
      years: yearsInBusiness,
    });
    const tagline = pick(TAGLINE_TEMPLATES, i * 31 + 2)({
      fabric: primaryFabric,
      area,
    });

    const highlights: string[] = [];
    for (let h = 0; h < 3; h++) {
      const item = pick(HIGHLIGHT_POOL, i * 37 + h * 11 + 3);
      if (!highlights.includes(item)) highlights.push(item);
    }

    // 3 swatches mostly drawn from the supplier's fabric mix
    const swatches: Swatch[] = [];
    for (let s = 0; s < 3; s++) {
      const fab = fabrics[s % fabrics.length];
      const palette = FABRIC_PALETTES[fab];
      const sw = palette[(i * (s + 1) + 5) % palette.length];
      swatches.push(sw);
    }

    out.push({
      slug,
      name: baseName,
      tagline,
      area,
      market,
      fabrics,
      moqMeters,
      priceFromNgn,
      priceToNgn,
      responseTime,
      whatsapp,
      verified,
      yearsInBusiness,
      description,
      highlights,
      swatches,
      accentColor: ACCENT_BY_FABRIC[primaryFabric],
    });
  }

  return out;
}

export const SUPPLIERS: Supplier[] = [
  ...HAND_CRAFTED_SUPPLIERS,
  ...buildGeneratedSuppliers(),
];

export function getSupplier(slug: string): Supplier | undefined {
  return SUPPLIERS.find((s) => s.slug === slug);
}

export function getAllSupplierSlugs(): string[] {
  return SUPPLIERS.map((s) => s.slug);
}

/**
 * Static maps so Tailwind v4's class scanner picks every utility up.
 * Never interpolate Tailwind class names dynamically — the scanner won't see them.
 */
export const accentBgClass: Record<Supplier["accentColor"], string> = {
  "green-primary": "bg-green-primary",
  amber: "bg-amber",
  clay: "bg-clay",
  magenta: "bg-magenta",
  ink: "bg-ink",
};

export const accentRingClass: Record<Supplier["accentColor"], string> = {
  "green-primary": "shadow-brutal-green",
  amber: "shadow-brutal-amber",
  clay: "shadow-brutal-clay",
  magenta: "shadow-brutal",
  ink: "shadow-brutal",
};

export interface SupplierFilters {
  fabric?: string;
  area?: string;
  moq?: string;
  verified?: string;
}

export function filterSuppliers(
  suppliers: Supplier[],
  f: SupplierFilters
): Supplier[] {
  return suppliers.filter((s) => {
    if (f.fabric && !s.fabrics.includes(f.fabric as FabricType)) return false;
    if (f.area && s.area !== f.area) return false;
    if (f.moq) {
      const band = MOQ_BANDS.find((b) => b.id === f.moq);
      if (band && (s.moqMeters < band.min || s.moqMeters > band.max)) {
        return false;
      }
    }
    if (f.verified === "1" && !s.verified) return false;
    return true;
  });
}
