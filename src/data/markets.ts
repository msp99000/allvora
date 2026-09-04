/**
 * Market axis. PROJECT_BRIEF.md Section 5.7.
 *
 * The hub copy is approved. The region template is marked [draft, refine] in
 * the brief, so every `intro`, `buyerProfile` and `requirements` list below is
 * written to that template and is flagged [generated, review] in
 * CONTENT_REVIEW.md.
 */

import type { CategorySlug } from "./categories";

export type MarketSlug =
  | "middle-east"
  | "europe"
  | "north-america"
  | "africa"
  | "southeast-asia"
  | "south-asia"
  | "australia-nz";

export interface Market {
  slug: MarketSlug;
  /** Region name as it appears in a sentence, without a leading article. */
  name: string;
  /** Form used after "buyers across", e.g. "the Middle East". */
  nameInSentence: string;
  priority: "P1" | "P2";
  /** Page H1, Section 5.7 pattern: "[Product portfolio] for [region] buyers". */
  h1: string;
  /** Two to three sentences: buyer profile plus the most relevant product lines. */
  intro: string;
  /** Typical buyer types in this region. */
  buyerProfile: string[];
  /** Product slugs to surface, most relevant first. */
  focusProducts: string[];
  /** Categories to show in the product grid. */
  focusCategories: CategorySlug[];
  /** Destination requirements Allvora coordinates for this market. */
  requirements: string[];
  seoTitle: string;
  seoDescription: string;
}

export const markets: Market[] = [
  {
    slug: "middle-east",
    name: "Middle East",
    nameInSentence: "the Middle East",
    priority: "P1",
    h1: "Indian spices, rice and food products for Middle East buyers",
    intro:
      "Middle East buyers are among the largest importers of Indian Basmati rice, and the region's rice traders, retail chains and food-service distributors specify grain length, ageing and crop year closely. Alongside rice we supply whole and ground spices and ghee in retail and bulk formats. Specifications, packaging and labelling are agreed per order and confirmed in writing before shipment.",
    buyerProfile: [
      "Rice importers and traders",
      "Supermarket and hypermarket chains",
      "Food-service distributors",
      "Repackers and private-label brands",
    ],
    focusProducts: ["basmati-rice", "red-chilli", "turmeric", "ghee", "black-pepper"],
    focusCategories: ["food", "spices"],
    requirements: [
      "Arabic and English label artwork coordinated with the buyer",
      "Halal documentation arranged where the destination or buyer requires it",
      "Certificate of Analysis for each shipped lot",
      "Certificate of origin and health certificate as applicable",
      "Retail pack sizes and bulk formats agreed before production",
    ],
    seoTitle: "Indian Spices, Rice & Food Supplier for the Middle East",
    seoDescription:
      "Indian Basmati rice, spices and ghee for Middle East importers, retail chains and distributors, with labelling and documentation coordinated per order.",
  },
  {
    slug: "europe",
    name: "Europe",
    nameInSentence: "Europe",
    priority: "P1",
    h1: "Indian spices, moringa, tea and coffee for European buyers",
    intro:
      "European buyers work to some of the strictest pesticide residue and contaminant limits of any market, and specification work starts there rather than at the shipping stage. We supply spices, moringa, tea and coffee against agreed residue, aflatoxin and microbiological parameters, with testing arranged where required. Organic and certified lots are available for the products where that grade exists.",
    buyerProfile: [
      "Spice houses and ingredient importers",
      "Health and nutraceutical brands",
      "Tea and coffee traders and roasters",
      "Private-label and retail brands",
    ],
    focusProducts: ["black-pepper", "turmeric", "red-chilli", "moringa", "tea", "coffee"],
    focusCategories: ["spices", "agri-natural", "tea-coffee"],
    requirements: [
      "Pesticide residue (MRL) parameters agreed at the specification stage",
      "Aflatoxin and ochratoxin limits confirmed per product",
      "Microbiological limits and, where specified, steam-sterilised material",
      "Organic certification where the buyer requires certified goods",
      "Phytosanitary certificate and Certificate of Analysis per shipment",
    ],
    seoTitle: "Indian Spice, Moringa, Tea & Coffee Supplier for Europe",
    seoDescription:
      "Indian spices, moringa, tea and coffee for European buyers, supplied against agreed MRL, aflatoxin and microbiological limits, with testing per shipment.",
  },
  {
    slug: "north-america",
    name: "North America",
    nameInSentence: "North America",
    priority: "P1",
    h1: "Indian spices, Basmati rice and coconut products for North American buyers",
    intro:
      "North American importers, ingredient buyers and horticulture distributors typically source spices, Basmati rice, coconut products and cocopeat growing media from India. Buyers here specify FDA-facing labelling, allergen and microbiological parameters, and lot-level test reports. We confirm those parameters before shipment and supply the supporting documentation with the container.",
    buyerProfile: [
      "Ingredient and commodity importers",
      "Ethnic and mainstream grocery distributors",
      "Food manufacturers and repackers",
      "Horticulture and growing-media distributors",
    ],
    focusProducts: ["red-chilli", "turmeric", "basmati-rice", "coconut", "cocopeat"],
    focusCategories: ["spices", "food", "agri-natural"],
    requirements: [
      "Nutrition and allergen label content coordinated with the buyer",
      "Microbiological limits and, where specified, treated material",
      "Certificate of Analysis and lot traceability per shipment",
      "Fumigation certificate and wood packaging treatment where applicable",
      "Container loading and pallet configuration agreed before booking",
    ],
    seoTitle: "Indian Spices, Basmati & Coconut Supplier for North America",
    seoDescription:
      "Indian spices, Basmati rice, coconut products and cocopeat for North American buyers, with labelling, testing and lot documentation coordinated per shipment.",
  },
  {
    slug: "africa",
    name: "Africa",
    nameInSentence: "Africa",
    priority: "P2",
    h1: "Indian rice, spices and food products for African buyers",
    intro:
      "African importers and wholesalers source rice, spices and edible oils from India in commercial grades and bulk formats. Volume, packaging durability and shipping schedule usually matter as much as grade. We quote against the grade and pack format you specify, and coordinate the documentation each destination requires.",
    buyerProfile: [
      "Commodity importers and wholesalers",
      "Repackers and local brands",
      "Food-service suppliers",
    ],
    focusProducts: ["basmati-rice", "red-chilli", "turmeric", "coconut"],
    focusCategories: ["food", "spices"],
    requirements: [
      "Commercial grades and bulk pack formats quoted to your volume",
      "Certificate of origin and pre-shipment inspection where required",
      "Fumigation certificate and phytosanitary certificate as applicable",
      "Packaging specified for transit and storage conditions",
    ],
    seoTitle: "Indian Rice, Spices & Food Products Supplier for Africa",
    seoDescription:
      "Indian rice, spices and food products for African importers and wholesalers, in commercial grades and bulk formats, with destination documentation arranged.",
  },
  {
    slug: "southeast-asia",
    name: "Southeast Asia",
    nameInSentence: "Southeast Asia",
    priority: "P2",
    h1: "Indian spices, coconut products and coffee for Southeast Asian buyers",
    intro:
      "Southeast Asian food manufacturers and ingredient traders buy Indian spices, coconut derivatives and coffee as processing inputs. Specifications here tend to be technical: mesh, moisture, oil content and microbiological limits. We supply against those parameters and arrange testing where the buyer requires it.",
    buyerProfile: [
      "Food manufacturers and processors",
      "Ingredient traders",
      "Coffee roasters and blenders",
    ],
    focusProducts: ["black-pepper", "red-chilli", "coconut", "coffee"],
    focusCategories: ["spices", "agri-natural", "tea-coffee"],
    requirements: [
      "Technical parameters (mesh, moisture, oil content) agreed per lot",
      "Microbiological limits confirmed at the specification stage",
      "Certificate of Analysis and phytosanitary certificate per shipment",
      "Bulk packaging suited to the buyer's processing line",
    ],
    seoTitle: "Indian Spices, Coconut & Coffee Supplier for Southeast Asia",
    seoDescription:
      "Indian spices, coconut products and coffee for Southeast Asian manufacturers and ingredient traders, against technical and microbiological specifications.",
  },
  {
    slug: "south-asia",
    name: "South Asia",
    nameInSentence: "South Asia",
    priority: "P2",
    h1: "Indian spices, tea and food products for South Asian buyers",
    intro:
      "Buyers across South Asia source Indian spices, tea and food products at short shipping distance and in frequent, smaller consignments. Availability by crop season and consistency between shipments are the usual priorities. We confirm crop year and grade before each order rather than at dispatch.",
    buyerProfile: [
      "Regional importers and distributors",
      "Blenders and repackers",
      "Retail and food-service suppliers",
    ],
    focusProducts: ["red-chilli", "turmeric", "tea", "basmati-rice"],
    focusCategories: ["spices", "tea-coffee", "food"],
    requirements: [
      "Crop year and grade confirmed before each order",
      "Consistency between consignments held to the agreed specification",
      "Certificate of origin and phytosanitary certificate as applicable",
      "Pack formats suited to onward repacking or direct retail",
    ],
    seoTitle: "Indian Spices, Tea & Food Products Supplier for South Asia",
    seoDescription:
      "Indian spices, tea and food products for South Asian importers and blenders, with crop year, grade and documentation confirmed before each order is placed.",
  },
  {
    slug: "australia-nz",
    name: "Australia & New Zealand",
    nameInSentence: "Australia and New Zealand",
    priority: "P2",
    h1: "Indian spices, rice and natural products for Australia and New Zealand buyers",
    intro:
      "Australian and New Zealand biosecurity requirements shape what can be shipped and how it must be treated, so treatment and packaging are settled before booking rather than at the port. We supply spices, Basmati rice, moringa and coconut products with the treatment certificates and declarations these destinations require.",
    buyerProfile: [
      "Importers and wholesale distributors",
      "Health and natural product brands",
      "Grocery and food-service suppliers",
    ],
    focusProducts: ["red-chilli", "turmeric", "basmati-rice", "moringa", "coconut"],
    focusCategories: ["spices", "food", "agri-natural"],
    requirements: [
      "Biosecurity treatment and declarations arranged before booking",
      "Wood packaging treated and certified to ISPM 15 where used",
      "Phytosanitary certificate and Certificate of Analysis per shipment",
      "Container cleanliness and packing declarations as required",
    ],
    seoTitle: "Indian Spices, Rice & Natural Products for Australia and NZ",
    seoDescription:
      "Indian spices, Basmati rice, moringa and coconut products for Australian and New Zealand buyers, with biosecurity treatment and certificates arranged.",
  },
];

const marketBySlug = new Map(markets.map((m) => [m.slug, m]));

export function getMarket(slug: string): Market | undefined {
  return marketBySlug.get(slug as MarketSlug);
}

/** Home page markets strip, Section 5.1. */
export const marketsStripLine =
  "Serving buyers across Europe, the Middle East, North America, Africa, Southeast Asia, South Asia, and Australia & New Zealand.";
