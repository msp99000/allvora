/**
 * THE PRODUCT DATA. PROJECT_BRIEF.md Section 5.8.
 *
 * This file is the single source of truth for every product fact on the site.
 * Adding a variety here produces a page, a sitemap entry, metadata and JSON-LD
 * with no page-level code change. If a page needs a product fact that is not
 * here, add it here rather than inlining it in the page.
 *
 * Variety intros other than basmati-rice/1121 and red-chilli/teja-s17 (which
 * are approved copy from Section 5.9) are marked [generated, review] in
 * CONTENT_REVIEW.md. seoTitle and seoDescription are derived from the approved
 * four-column table rows.
 */

import type { CategorySlug } from "./categories";

export type ProductForm = string;

export interface VarietyFormNote {
  form: ProductForm;
  note: string;
}

export interface Variety {
  slug: string;
  /** Name exactly as it appears in the approved table. */
  name: string;
  /**
   * Subject for the page H1 and the SEO title. Usually "${name} ${product.name}",
   * but set explicitly where the variety name already carries the product noun
   * ("Virgin Coconut Oil", "Traditional Basmati Rice").
   */
  headingName: string;
  gradeType: string;
  specs: string[];
  forms: ProductForm[];
  priority: "P1" | "P2";
  seoTitle: string;
  seoDescription: string;
  /** Page intro, 2 to 3 sentences. Present for every P1 variety. */
  intro?: string;
  /** Per-form notes, used where a variety ships in distinct processing forms. */
  formNotes?: VarietyFormNote[];
}

export interface Product {
  slug: string;
  name: string;
  category: CategorySlug;
  /** Product page intro, 2 to 3 sentences. */
  intro: string;
  seoTitle: string;
  seoDescription: string;
  varieties: Variety[];
  /** Overrides the standing buyer specification paragraph where one is written. */
  buyerSpecNote?: string;
}

/** Section 5.4 standing paragraph, the default buyer specification note. */
export const defaultBuyerSpecNote =
  "Allvora Resources supplies products according to international buyer requirements and destination-market regulations. Specifications including grade, size, moisture, purity, colour, chemical parameters, microbiological limits, packaging and labelling can be customized. Certificate of Analysis (COA) and relevant export documentation can be provided upon request.";

export const products: Product[] = [
  {
    slug: "red-chilli",
    name: "Red Chilli",
    category: "spices",
    seoTitle: "Red Chilli Exporter from India: Varieties & Grades",
    seoDescription:
      "Red chilli exporter from India: Sannam S4, Teja S17, Byadagi, Kashmiri and Guntur varieties in whole, stemless, powder and flake forms, to your SHU and ASTA spec.",
    intro:
      "India is the world's largest producer and exporter of dried red chilli, and the trade runs on named varieties rather than a single commodity grade. Pungency (SHU) and colour (ASTA) move independently: Teja and Sannam are bought for heat, Byadagi and Kashmiri for colour. Allvora supplies each variety whole, stemless, as powder and as flakes, specified to your parameters.",
    varieties: [
    {
      slug: "sannam-s4",
      name: "Sannam S4",
      headingName: "Sannam S4 Red Chilli",
      gradeType: "Commercial export grade",
      specs: ["15,000 to 18,000 SHU", "ASTA colour", "moisture", "aflatoxin", "pesticide residue"],
      forms: ["Whole", "Stemless", "Powder", "Flakes"],
      priority: "P1",
      seoTitle: "Sannam S4 Red Chilli Exporter & Supplier from India",
      seoDescription:
        "Sannam S4 Red Chilli exporter and supplier from India. Grade: Commercial export grade. Available as Whole, Stemless, Powder and Flakes. Quote within 24 hours.",
      intro:
        "Sannam S4 is the commercial export grade that carries most of India's red chilli volume, with pungency in the 15,000 to 18,000 SHU band and dependable ASTA colour. Buyers use it as a blending and grinding chilli, where consistent heat matters more than peak colour. Allvora supplies Sannam S4 whole, stemless, as powder and as flakes, with moisture, aflatoxin and pesticide residue confirmed before shipment.",
    },
    {
      slug: "s10-sannam",
      name: "S10 Sannam",
      headingName: "S10 Sannam Red Chilli",
      gradeType: "Medium-high pungency",
      specs: ["SHU", "ASTA", "moisture", "foreign matter", "pod size"],
      forms: ["Whole", "Stemless", "Powder"],
      priority: "P2",
      seoTitle: "S10 Sannam Red Chilli Exporter & Supplier from India",
      seoDescription:
        "S10 Sannam Red Chilli exporter and supplier from India. Grade: Medium-high pungency. Available as Whole, Stemless and Powder. Specified on sHU and aSTA.",
    },
    {
      slug: "teja-s17",
      name: "Teja S17",
      headingName: "Teja S17 Red Chilli",
      gradeType: "High pungency",
      specs: ["High SHU", "ASTA colour", "moisture", "aflatoxin"],
      forms: ["Whole", "Stemless", "Powder", "Flakes"],
      priority: "P1",
      seoTitle: "Teja S17 Red Chilli Exporter & Supplier from India",
      seoDescription:
        "Teja S17 Red Chilli exporter and supplier from India. Grade: High pungency. Available as Whole, Stemless, Powder and Flakes. Certificate of Analysis on request.",
      intro:
        "Teja S17 is a high-pungency red chilli from the Guntur belt, specified by buyers who need heat: high SHU with dependable ASTA colour. Allvora supplies Teja S17 whole, stemless, as powder and as flakes, with aflatoxin and moisture parameters confirmed before shipment.",
    },
    {
      slug: "byadagi-kaddi",
      name: "Byadagi Kaddi",
      headingName: "Byadagi Kaddi Red Chilli",
      gradeType: "High-colour, mild heat",
      specs: ["~150 to 200 ASTA", "low pungency", "moisture", "colour"],
      forms: ["Whole", "Stemless", "Powder"],
      priority: "P1",
      seoTitle: "Byadagi Kaddi Red Chilli Exporter & Supplier from India",
      seoDescription:
        "Byadagi Kaddi Red Chilli exporter and supplier from India. Grade: High-colour, mild heat. Available as Whole, Stemless and Powder. Response within 24 hours.",
      intro:
        "Byadagi Kaddi is the wrinkled, deep-red chilli from Karnataka that buyers specify for colour rather than heat, typically around 150 to 200 ASTA with low pungency. It is used where a blend or a retail pack needs red colour without added heat, and by oleoresin extractors. Allvora supplies Byadagi Kaddi whole, stemless and as powder, with colour and moisture confirmed before shipment.",
    },
    {
      slug: "byadagi-dabbi",
      name: "Byadagi Dabbi",
      headingName: "Byadagi Dabbi Red Chilli",
      gradeType: "Premium colour grade",
      specs: ["ASTA colour", "pod size", "moisture", "foreign matter"],
      forms: ["Whole", "Powder"],
      priority: "P2",
      seoTitle: "Byadagi Dabbi Red Chilli Exporter & Supplier from India",
      seoDescription:
        "Byadagi Dabbi Red Chilli exporter and supplier from India. Grade: Premium colour grade. Available as Whole and Powder. Specified on aSTA colour and pod size.",
    },
    {
      slug: "kashmiri",
      name: "Kashmiri",
      headingName: "Kashmiri Red Chilli",
      gradeType: "Bright colour, mild heat",
      specs: ["ASTA colour", "SHU", "moisture", "pesticide residue"],
      forms: ["Whole", "Powder"],
      priority: "P1",
      seoTitle: "Kashmiri Red Chilli Exporter & Supplier from India",
      seoDescription:
        "Kashmiri Red Chilli exporter and supplier from India. Grade: Bright colour, mild heat. Available as Whole and Powder. Specified on aSTA colour and sHU.",
      intro:
        "Kashmiri chilli is specified for bright red colour with mild heat, which makes it the choice for retail packs and blends where appearance leads. Buyers check ASTA colour, SHU, moisture and pesticide residue. Allvora supplies Kashmiri chilli whole and as powder, to your colour and residue parameters.",
    },
    {
      slug: "guntur",
      name: "Guntur",
      headingName: "Guntur Red Chilli",
      gradeType: "Commercial",
      specs: ["SHU", "ASTA", "moisture", "pod length", "foreign matter"],
      forms: ["Whole", "Powder", "Flakes"],
      priority: "P1",
      seoTitle: "Guntur Red Chilli Exporter & Supplier from India",
      seoDescription:
        "Guntur Red Chilli exporter and supplier from India. Grade: Commercial. Available as Whole, Powder and Flakes. Specified on sHU, aSTA, moisture and pod length.",
      intro:
        "Guntur is the commercial designation for chilli from the Guntur belt of Andhra Pradesh, India's largest red chilli producing and trading region. Buyers order it as a volume commercial grade, checking SHU, ASTA colour, pod length and foreign matter. Allvora supplies Guntur chilli whole, as powder and as flakes, to your parameters.",
    },
    ],
  },
  {
    slug: "black-pepper",
    name: "Black Pepper",
    category: "spices",
    seoTitle: "Black Pepper Exporter from India: Varieties & Grades",
    seoDescription:
      "Black pepper exporter from India: Tellicherry TGSEB and TGEB, Malabar Garbled MG1 and MG2, and 500 to 600 g/L grades, specified on density, moisture and piperine.",
    intro:
      "Indian black pepper is graded two ways: by screen size for the Tellicherry grades, and by bulk density for the Malabar Garbled and GL grades. Buyers choose between them depending on whether pepper is sold on appearance or ground into a blend. Allvora supplies whole pepper across both grading systems, with density, moisture and piperine confirmed before shipment.",
    varieties: [
    {
      slug: "tgseb",
      name: "TGSEB",
      headingName: "TGSEB Black Pepper",
      gradeType: "Tellicherry Special Extra Bold",
      specs: ["4.75 mm+", "high density", "moisture ≤11%", "piperine", "foreign matter"],
      forms: ["Whole"],
      priority: "P1",
      seoTitle: "TGSEB Black Pepper Exporter & Supplier from India",
      seoDescription:
        "TGSEB Black Pepper exporter and supplier from India. Grade: Tellicherry Special Extra Bold. Available as Whole. Specified on 4.75 mm+ and high density.",
      intro:
        "TGSEB is Tellicherry Special Extra Bold, the top size grade of Indian black pepper, screened at 4.75 mm and above with high bulk density. It is bought by spice houses, grinders and retail brands that sell pepper on berry size and appearance. Allvora supplies TGSEB whole, with moisture at or below 11 percent and piperine confirmed before shipment.",
    },
    {
      slug: "tgeb",
      name: "TGEB",
      headingName: "TGEB Black Pepper",
      gradeType: "Tellicherry Extra Bold",
      specs: ["4.25 mm+", "bulk density", "moisture", "piperine"],
      forms: ["Whole"],
      priority: "P1",
      seoTitle: "TGEB Black Pepper Exporter & Supplier from India",
      seoDescription:
        "TGEB Black Pepper exporter and supplier from India. Grade: Tellicherry Extra Bold. Available as Whole. Specified on 4.25 mm+, bulk density and moisture.",
      intro:
        "TGEB is Tellicherry Extra Bold, screened at 4.25 mm and above, one size step below TGSEB and the more widely traded of the two Tellicherry grades. Buyers specify berry size, bulk density, moisture and piperine. Allvora supplies TGEB whole, to those parameters.",
    },
    {
      slug: "mg1",
      name: "MG1",
      headingName: "MG1 Black Pepper",
      gradeType: "Malabar Garbled Grade 1",
      specs: ["Berry size", "bulk density", "moisture", "light berries", "piperine"],
      forms: ["Whole"],
      priority: "P1",
      seoTitle: "MG1 Black Pepper Exporter & Supplier from India",
      seoDescription:
        "MG1 Black Pepper exporter and supplier from India. Grade: Malabar Garbled Grade 1. Available as Whole. Specified on berry size, bulk density and moisture.",
      intro:
        "MG1 is Malabar Garbled Grade 1, the standard cleaned grade of Indian black pepper from the Malabar coast, sold on bulk density rather than on screen size alone. It is the working grade for grinders, blenders and food manufacturers. Allvora supplies MG1 whole, with density, moisture, light berries and piperine confirmed before shipment.",
    },
    {
      slug: "mg2",
      name: "MG2",
      headingName: "MG2 Black Pepper",
      gradeType: "Malabar Garbled Grade 2",
      specs: ["Density", "moisture", "foreign matter", "piperine"],
      forms: ["Whole"],
      priority: "P2",
      seoTitle: "MG2 Black Pepper Exporter & Supplier from India",
      seoDescription:
        "MG2 Black Pepper exporter and supplier from India. Grade: Malabar Garbled Grade 2. Available as Whole. Specified on density, moisture and foreign matter.",
    },
    {
      slug: "500-gl",
      name: "500 GL",
      headingName: "500 GL Black Pepper",
      gradeType: "Commercial",
      specs: ["Bulk density ~500 g/L", "moisture", "berry size"],
      forms: ["Whole"],
      priority: "P2",
      seoTitle: "500 GL Black Pepper Exporter & Supplier from India",
      seoDescription:
        "500 GL Black Pepper exporter and supplier from India. Grade: Commercial. Available as Whole. Specified on bulk density ~500 g/L, moisture and berry size.",
    },
    {
      slug: "550-gl",
      name: "550 GL",
      headingName: "550 GL Black Pepper",
      gradeType: "Premium commercial",
      specs: ["Bulk density ~550 g/L", "moisture", "piperine"],
      forms: ["Whole"],
      priority: "P2",
      seoTitle: "550 GL Black Pepper Exporter & Supplier from India",
      seoDescription:
        "550 GL Black Pepper exporter and supplier from India. Grade: Premium commercial. Available as Whole. Specified on bulk density ~550 g/L, moisture and piperine.",
    },
    {
      slug: "600-gl",
      name: "600 GL",
      headingName: "600 GL Black Pepper",
      gradeType: "Premium",
      specs: ["Bulk density ~600 g/L", "moisture", "piperine", "purity"],
      forms: ["Whole"],
      priority: "P2",
      seoTitle: "600 GL Black Pepper Exporter & Supplier from India",
      seoDescription:
        "600 GL Black Pepper exporter and supplier from India. Grade: Premium. Available as Whole. Specified on bulk density ~600 g/L, moisture, piperine and purity.",
    },
    ],
  },
  {
    slug: "cardamom",
    name: "Cardamom",
    category: "spices",
    seoTitle: "Cardamom Exporter from India: Varieties & Grades",
    seoDescription:
      "Cardamom exporter from India: 6 mm, 7 mm and 8 mm green cardamom plus Bold, Extra Bold and Super Bold grades, specified on pod size, colour and essential oil.",
    intro:
      "Indian green cardamom is graded on pod diameter and colour, from 6 mm through to super premium 8 mm and the bold grades, with large cardamom traded separately as a whole spice. Buyers specify pod size, green colour, density and essential oil content. Allvora supplies cardamom whole, to your size and moisture parameters.",
    varieties: [
    {
      slug: "6mm",
      name: "6 mm",
      headingName: "6 mm Cardamom",
      gradeType: "Standard",
      specs: ["Pod diameter ≥6 mm", "colour", "moisture", "open pods"],
      forms: ["Whole"],
      priority: "P2",
      seoTitle: "6 mm Cardamom Exporter & Supplier from India",
      seoDescription:
        "6 mm Cardamom exporter and supplier from India. Grade: Standard. Available as Whole. Specified on pod diameter ≥6 mm, colour and moisture. Request a quote.",
    },
    {
      slug: "7mm",
      name: "7 mm",
      headingName: "7 mm Cardamom",
      gradeType: "Premium",
      specs: ["Pod diameter ≥7 mm", "green colour", "density", "moisture"],
      forms: ["Whole"],
      priority: "P2",
      seoTitle: "7 mm Cardamom Exporter & Supplier from India",
      seoDescription:
        "7 mm Cardamom exporter and supplier from India. Grade: Premium. Available as Whole. Specified on pod diameter ≥7 mm, green colour, density and moisture.",
    },
    {
      slug: "8mm",
      name: "8 mm",
      headingName: "8 mm Cardamom",
      gradeType: "Super Premium",
      specs: ["Pod diameter ≥8 mm", "colour", "density", "essential oil"],
      forms: ["Whole"],
      priority: "P1",
      seoTitle: "8 mm Cardamom Exporter & Supplier from India",
      seoDescription:
        "8 mm Cardamom exporter and supplier from India. Grade: Super Premium. Available as Whole. Specified on pod diameter ≥8 mm, colour, density and essential oil.",
      intro:
        "8 mm is the super premium size grade of Indian green cardamom, with pod diameter at or above 8 mm. Buyers in the Middle East and in premium retail specify it for pod size, green colour and essential oil content. Allvora supplies 8 mm cardamom whole, with density and moisture confirmed before shipment.",
    },
    {
      slug: "bold",
      name: "Bold",
      headingName: "Bold Cardamom",
      gradeType: "Premium",
      specs: ["Pod size", "green colour", "weight", "open/broken pods"],
      forms: ["Whole"],
      priority: "P2",
      seoTitle: "Bold Cardamom Exporter & Supplier from India",
      seoDescription:
        "Bold Cardamom exporter and supplier from India. Grade: Premium. Available as Whole. Specified on pod size, green colour and weight. Response within 24 hours.",
    },
    {
      slug: "extra-bold",
      name: "Extra Bold",
      headingName: "Extra Bold Cardamom",
      gradeType: "Premium",
      specs: ["Large pods", "colour", "density", "moisture"],
      forms: ["Whole"],
      priority: "P2",
      seoTitle: "Extra Bold Cardamom Exporter & Supplier from India",
      seoDescription:
        "Extra Bold Cardamom exporter and supplier from India. Grade: Premium. Available as Whole. Specified on large pods, colour, density and moisture. COA on request.",
    },
    {
      slug: "super-bold",
      name: "Super Bold",
      headingName: "Super Bold Cardamom",
      gradeType: "Top grade",
      specs: ["≥8 mm", "high density", "colour", "essential oil"],
      forms: ["Whole"],
      priority: "P2",
      seoTitle: "Super Bold Cardamom Exporter & Supplier from India",
      seoDescription:
        "Super Bold Cardamom exporter and supplier from India. Grade: Top grade. Available as Whole. Specified on ≥8 mm, high density, colour and essential oil.",
    },
    {
      slug: "large-cardamom",
      name: "Large Cardamom",
      headingName: "Large Cardamom",
      gradeType: "Commercial",
      specs: ["Pod size", "moisture", "colour", "foreign matter", "volatile oil"],
      forms: ["Whole", "Seeds"],
      priority: "P2",
      seoTitle: "Large Cardamom Exporter & Supplier from India",
      seoDescription:
        "Large Cardamom exporter and supplier from India. Grade: Commercial. Available as Whole and Seeds. Specified on pod size, moisture, colour and foreign matter.",
    },
    ],
  },
  {
    slug: "turmeric",
    name: "Turmeric",
    category: "spices",
    seoTitle: "Turmeric Exporter from India: Varieties & Grades",
    seoDescription:
      "Turmeric exporter from India: Erode, Salem, Nizamabad, Alleppey Finger and high-curcumin Lakadong, as fingers and powder, specified on curcumin and moisture.",
    intro:
      "Turmeric is bought on curcumin content and colour, and both vary by producing belt: Erode, Salem, Nizamabad, Duggirala and Sangli supply the commercial trade, while Lakadong and Alleppey Finger serve buyers who need higher curcumin. Allvora supplies turmeric as fingers and as powder from each of these origins, with curcumin, moisture and colour confirmed before shipment.",
    varieties: [
    {
      slug: "erode",
      name: "Erode",
      headingName: "Erode Turmeric",
      gradeType: "Commercial Indian",
      specs: ["Curcumin", "moisture", "colour", "foreign matter"],
      forms: ["Fingers", "Powder"],
      priority: "P1",
      seoTitle: "Erode Turmeric Exporter & Supplier from India",
      seoDescription:
        "Erode Turmeric exporter and supplier from India. Grade: Commercial Indian. Available as Fingers and Powder. Specified on curcumin, moisture and colour.",
      intro:
        "Erode turmeric from Tamil Nadu is the commercial Indian grade that sets the reference for the trade, supplied as fingers and as powder. Buyers check curcumin, moisture, colour and foreign matter. Allvora supplies Erode turmeric in both forms, to your curcumin and moisture parameters.",
    },
    {
      slug: "salem",
      name: "Salem",
      headingName: "Salem Turmeric",
      gradeType: "Premium commercial",
      specs: ["Curcumin", "colour", "moisture", "size"],
      forms: ["Fingers", "Powder"],
      priority: "P1",
      seoTitle: "Salem Turmeric Exporter & Supplier from India",
      seoDescription:
        "Salem Turmeric exporter and supplier from India. Grade: Premium commercial. Available as Fingers and Powder. Specified on curcumin, colour, moisture and size.",
      intro:
        "Salem turmeric is a premium commercial grade from Tamil Nadu, specified where a buyer wants higher curcumin and better colour than a standard commercial lot. It is bought by spice grinders, extractors and retail brands. Allvora supplies Salem turmeric as fingers and as powder, to your curcumin, colour and size parameters.",
    },
    {
      slug: "alleppey-finger",
      name: "Alleppey Finger",
      headingName: "Alleppey Finger Turmeric",
      gradeType: "Premium",
      specs: ["Higher curcumin", "colour", "moisture", "finger size"],
      forms: ["Fingers", "Powder"],
      priority: "P2",
      seoTitle: "Alleppey Finger Turmeric Exporter & Supplier from India",
      seoDescription:
        "Alleppey Finger Turmeric exporter and supplier from India. Grade: Premium. Available as Fingers and Powder. Specified on higher curcumin, colour and moisture.",
    },
    {
      slug: "nizamabad",
      name: "Nizamabad",
      headingName: "Nizamabad Turmeric",
      gradeType: "Commercial",
      specs: ["Curcumin", "moisture", "foreign matter"],
      forms: ["Fingers", "Powder"],
      priority: "P1",
      seoTitle: "Nizamabad Turmeric Exporter & Supplier from India",
      seoDescription:
        "Nizamabad Turmeric exporter and supplier from India. Grade: Commercial. Available as Fingers and Powder. Specified on curcumin, moisture and foreign matter.",
      intro:
        "Nizamabad turmeric from Telangana is a commercial grade traded in volume through one of India's principal turmeric markets. Buyers specify curcumin, moisture and foreign matter. Allvora supplies Nizamabad turmeric as fingers and as powder, to those parameters.",
    },
    {
      slug: "sangli-rajapuri",
      name: "Sangli / Rajapuri",
      headingName: "Sangli / Rajapuri Turmeric",
      gradeType: "Commercial/Premium",
      specs: ["Curcumin", "colour", "moisture", "size"],
      forms: ["Fingers", "Powder"],
      priority: "P2",
      seoTitle: "Sangli / Rajapuri Turmeric Exporter & Supplier from India",
      seoDescription:
        "Sangli / Rajapuri Turmeric exporter and supplier from India. Grade: Commercial/Premium. Available as Fingers and Powder. Specified on curcumin and colour.",
    },
    {
      slug: "duggirala",
      name: "Duggirala",
      headingName: "Duggirala Turmeric",
      gradeType: "Commercial",
      specs: ["Curcumin", "moisture", "colour"],
      forms: ["Fingers", "Powder"],
      priority: "P2",
      seoTitle: "Duggirala Turmeric Exporter & Supplier from India",
      seoDescription:
        "Duggirala Turmeric exporter and supplier from India. Grade: Commercial. Available as Fingers and Powder. Specified on curcumin and moisture. Request a quote.",
    },
    {
      slug: "lakadong",
      name: "Lakadong",
      headingName: "Lakadong Turmeric",
      gradeType: "High-curcumin",
      specs: ["High curcumin", "moisture", "colour", "purity"],
      forms: ["Fingers", "Powder"],
      priority: "P1",
      seoTitle: "Lakadong Turmeric Exporter & Supplier from India",
      seoDescription:
        "Lakadong Turmeric exporter and supplier from India. Grade: High-curcumin. Available as Fingers and Powder. Specified on high curcumin, moisture and colour.",
      intro:
        "Lakadong turmeric from Meghalaya is India's high-curcumin turmeric, and it is specified by nutraceutical and extraction buyers for that reason. Volumes are smaller than in the mainland commercial belts, so orders are confirmed against available crop. Allvora supplies Lakadong as fingers and as powder, with curcumin, moisture and purity confirmed before shipment.",
    },
    ],
  },
  {
    slug: "moringa",
    name: "Moringa",
    category: "agri-natural",
    seoTitle: "Moringa Exporter from India: Varieties & Grades",
    seoDescription:
      "Moringa exporter from India: dried leaf, food grade and premium powder, organic and nutraceutical grades, seed and cold-pressed oil, to your mesh and microbial limits.",
    intro:
      "Moringa is exported from India as dried leaf, powder, seed and cold-pressed oil, with organic and nutraceutical grades for buyers who need certification or a tighter contaminant profile. Powder is the highest volume format in the trade. Allvora supplies each form to your moisture, mesh and microbiological parameters.",
    varieties: [
    {
      slug: "moringa-leaf",
      name: "Moringa Leaf",
      headingName: "Moringa Leaf",
      gradeType: "Dried leaf",
      specs: ["Moisture", "colour", "foreign matter", "microbiology"],
      forms: ["Dried Leaves"],
      priority: "P2",
      seoTitle: "Moringa Leaf Exporter & Supplier from India",
      seoDescription:
        "Moringa Leaf exporter and supplier from India. Grade: Dried leaf. Available as Dried Leaves. Specified on moisture, colour, foreign matter and microbiology.",
    },
    {
      slug: "moringa-powder",
      name: "Moringa Powder",
      headingName: "Moringa Powder",
      gradeType: "Food Grade",
      specs: ["Moisture ≤7 to 8% typical", "mesh", "colour", "microbiology"],
      forms: ["Powder"],
      priority: "P1",
      seoTitle: "Moringa Powder Exporter & Supplier from India",
      seoDescription:
        "Moringa Powder exporter and supplier from India. Grade: Food Grade. Available as Powder. Specified on moisture ≤7 to 8% typical, mesh, colour and microbiology.",
      intro:
        "Moringa powder is dried moringa leaf milled to a food grade, typically at 7 to 8 percent moisture, and it is the highest volume moringa format in export. It is bought by supplement brands, beverage and food manufacturers and private-label packers. Allvora supplies moringa powder to your mesh, colour and microbiological parameters.",
    },
    {
      slug: "premium-moringa-powder",
      name: "Premium Moringa Powder",
      headingName: "Premium Moringa Powder",
      gradeType: "Premium",
      specs: ["Moisture", "bright green colour", "mesh", "microbial limits"],
      forms: ["Powder"],
      priority: "P2",
      seoTitle: "Premium Moringa Powder Exporter & Supplier from India",
      seoDescription:
        "Premium Moringa Powder exporter and supplier from India. Grade: Premium. Available as Powder. Specified on moisture and bright green colour. Request a quote.",
    },
    {
      slug: "organic-moringa",
      name: "Organic Moringa",
      headingName: "Organic Moringa",
      gradeType: "Certified Organic",
      specs: ["Organic certification", "moisture", "pesticide residue", "microbiology"],
      forms: ["Leaf", "Powder"],
      priority: "P2",
      seoTitle: "Organic Moringa Exporter & Supplier from India",
      seoDescription:
        "Organic Moringa exporter and supplier from India. Grade: Certified Organic. Available as Leaf and Powder. Specified on organic certification and moisture.",
    },
    {
      slug: "nutraceutical-grade",
      name: "Nutraceutical Grade",
      headingName: "Nutraceutical Grade Moringa",
      gradeType: "High QC",
      specs: ["Heavy metals", "pesticides", "microbiology", "nutritional profile"],
      forms: ["Powder"],
      priority: "P2",
      seoTitle: "Nutraceutical Grade Moringa Exporter & Supplier from India",
      seoDescription:
        "Nutraceutical Grade Moringa exporter and supplier from India. Grade: High QC. Available as Powder. Specified on heavy metals, pesticides and microbiology.",
    },
    {
      slug: "moringa-seed",
      name: "Moringa Seed",
      headingName: "Moringa Seed",
      gradeType: "Commercial",
      specs: ["Moisture", "purity", "oil content", "foreign matter"],
      forms: ["Seeds"],
      priority: "P2",
      seoTitle: "Moringa Seed Exporter & Supplier from India",
      seoDescription:
        "Moringa Seed exporter and supplier from India. Grade: Commercial. Available as Seeds. Specified on moisture, purity and oil content. Response within 24 hours.",
    },
    {
      slug: "moringa-oil",
      name: "Moringa Oil",
      headingName: "Moringa Oil",
      gradeType: "Cold-pressed",
      specs: ["FFA", "peroxide value", "moisture", "fatty-acid profile"],
      forms: ["Oil"],
      priority: "P2",
      seoTitle: "Moringa Oil Exporter & Supplier from India",
      seoDescription:
        "Moringa Oil exporter and supplier from India. Grade: Cold-pressed. Available as Oil. Specified on fFA, peroxide value, moisture and fatty-acid profile.",
    },
    ],
  },
  {
    slug: "coconut",
    name: "Coconut",
    category: "agri-natural",
    seoTitle: "Coconut Exporter from India: Varieties & Grades",
    seoDescription:
      "Coconut exporter from India: fresh and semi-husked nuts, copra, fine and medium desiccated coconut, chips, flakes, edible oil and virgin coconut oil, to specification.",
    intro:
      "Coconut is supplied from India across the full chain: whole and semi-husked nuts, copra, desiccated grades, chips and flakes, and edible and virgin oil. Each format carries its own specification set, from maturity and defects on whole nuts to free fatty acid and peroxide value on oil. Allvora supplies each of them to buyer specification.",
    varieties: [
    {
      slug: "fresh-coconut",
      name: "Fresh Coconut",
      headingName: "Fresh Coconut",
      gradeType: "Mature",
      specs: ["Weight", "size", "maturity", "husk condition", "defects"],
      forms: ["Whole"],
      priority: "P2",
      seoTitle: "Fresh Coconut Exporter & Supplier from India",
      seoDescription:
        "Fresh Coconut exporter and supplier from India. Grade: Mature. Available as Whole. Specified on weight, size, maturity and husk condition. Request a quote.",
    },
    {
      slug: "semi-husked-coconut",
      name: "Semi-Husked Coconut",
      headingName: "Semi-Husked Coconut",
      gradeType: "Export",
      specs: ["Size", "weight", "maturity", "moisture", "appearance"],
      forms: ["Whole"],
      priority: "P2",
      seoTitle: "Semi-Husked Coconut Exporter & Supplier from India",
      seoDescription:
        "Semi-Husked Coconut exporter and supplier from India. Grade: Export. Available as Whole. Specified on size, weight, maturity, moisture and appearance.",
    },
    {
      slug: "copra",
      name: "Copra",
      headingName: "Copra",
      gradeType: "Milling Grade",
      specs: ["Moisture", "oil content", "mould", "foreign matter"],
      forms: ["Whole", "Pieces"],
      priority: "P2",
      seoTitle: "Copra Exporter & Supplier from India",
      seoDescription:
        "Copra exporter and supplier from India. Grade: Milling Grade. Available as Whole and Pieces. Specified on moisture, oil content, mould and foreign matter.",
    },
    {
      slug: "desiccated-coconut-fine",
      name: "Desiccated Coconut",
      headingName: "Fine Desiccated Coconut",
      gradeType: "Fine",
      specs: ["Moisture", "fat", "particle size", "microbiology"],
      forms: ["Fine Powder"],
      priority: "P1",
      seoTitle: "Fine Desiccated Coconut Exporter & Supplier from India",
      seoDescription:
        "Fine Desiccated Coconut exporter and supplier from India. Grade: Fine. Available as Fine Powder. Specified on moisture, fat, particle size and microbiology.",
      intro:
        "Fine desiccated coconut is dried, shredded coconut kernel milled to a fine particle size, used by bakery, confectionery and food manufacturers. Buyers specify moisture, fat content, particle size and microbiological limits. Allvora supplies the fine grade against those parameters, with a Certificate of Analysis per lot.",
    },
    {
      slug: "desiccated-coconut-medium",
      name: "Desiccated Coconut",
      headingName: "Medium Desiccated Coconut",
      gradeType: "Medium",
      specs: ["Moisture", "fat", "particle size", "colour"],
      forms: ["Medium"],
      priority: "P2",
      seoTitle: "Medium Desiccated Coconut Exporter & Supplier from India",
      seoDescription:
        "Medium Desiccated Coconut exporter and supplier from India. Grade: Medium. Available as Medium. Specified on moisture, fat and particle size. Request a quote.",
    },
    {
      slug: "coconut-chips",
      name: "Coconut Chips",
      headingName: "Coconut Chips",
      gradeType: "Food Grade",
      specs: ["Moisture", "size", "colour", "microbiology"],
      forms: ["Chips"],
      priority: "P2",
      seoTitle: "Coconut Chips Exporter & Supplier from India",
      seoDescription:
        "Coconut Chips exporter and supplier from India. Grade: Food Grade. Available as Chips. Specified on moisture, size, colour and microbiology. Request a quote.",
    },
    {
      slug: "coconut-flakes",
      name: "Coconut Flakes",
      headingName: "Coconut Flakes",
      gradeType: "Food Grade",
      specs: ["Moisture", "particle size", "colour"],
      forms: ["Flakes"],
      priority: "P2",
      seoTitle: "Coconut Flakes Exporter & Supplier from India",
      seoDescription:
        "Coconut Flakes exporter and supplier from India. Grade: Food Grade. Available as Flakes. Specified on moisture, particle size and colour. Quote within 24 hours.",
    },
    {
      slug: "coconut-oil",
      name: "Coconut Oil",
      headingName: "Coconut Oil",
      gradeType: "Edible",
      specs: ["FFA", "moisture", "peroxide value", "acid value"],
      forms: ["Oil"],
      priority: "P2",
      seoTitle: "Coconut Oil Exporter & Supplier from India",
      seoDescription:
        "Coconut Oil exporter and supplier from India. Grade: Edible. Available as Oil. Specified on fFA, moisture, peroxide value and acid value. Quote within 24 hours.",
    },
    {
      slug: "virgin-coconut-oil",
      name: "Virgin Coconut Oil",
      headingName: "Virgin Coconut Oil",
      gradeType: "Premium",
      specs: ["FFA", "peroxide value", "moisture", "fatty-acid profile"],
      forms: ["Oil"],
      priority: "P1",
      seoTitle: "Virgin Coconut Oil Exporter & Supplier from India",
      seoDescription:
        "Virgin Coconut Oil exporter and supplier from India. Grade: Premium. Available as Oil. Specified on fFA, peroxide value, moisture and fatty-acid profile.",
      intro:
        "Virgin coconut oil is pressed from fresh coconut kernel rather than from copra, which is what separates it from ordinary edible coconut oil. It is bought by food, cosmetic and supplement brands that specify free fatty acid, peroxide value and fatty-acid profile. Allvora supplies virgin coconut oil against those parameters, with test results per lot.",
    },
    ],
  },
  {
    slug: "cocopeat",
    name: "Cocopeat",
    category: "agri-natural",
    seoTitle: "Cocopeat Exporter from India: Varieties & Grades",
    seoDescription:
      "Cocopeat exporter from India: 5 kg blocks, briquettes, buffered and washed low-salt grades, grow bags and coco chips, specified on expansion, EC, pH and moisture.",
    intro:
      "Cocopeat is coconut coir processed into a growing medium and shipped compressed, as blocks, briquettes and grow bags. Horticulture buyers specify expansion volume, EC, pH and water-holding capacity, and often require washed or buffered material for low salt content. Allvora supplies cocopeat across those grades to your parameters.",
    varieties: [
    {
      slug: "cocopeat-block",
      name: "Cocopeat Block",
      headingName: "Cocopeat Block",
      gradeType: "5 kg compressed",
      specs: ["Expansion", "EC", "pH", "moisture", "compression ratio"],
      forms: ["Blocks"],
      priority: "P1",
      seoTitle: "Cocopeat Block Exporter & Supplier from India",
      seoDescription:
        "Cocopeat Block exporter and supplier from India. Grade: 5 kg compressed. Available as Blocks. Specified on expansion, eC, pH, moisture and compression ratio.",
      intro:
        "The 5 kg compressed block is the standard export format for coconut coir growing media, chosen because it ships dense and expands on hydration. Horticulture distributors and growers specify expansion volume, EC, pH and moisture. Allvora supplies 5 kg blocks to those parameters, with compression ratio confirmed before shipment.",
    },
    {
      slug: "cocopeat-briquette",
      name: "Cocopeat Briquette",
      headingName: "Cocopeat Briquette",
      gradeType: "Compressed",
      specs: ["Expansion volume", "EC", "pH", "moisture"],
      forms: ["Briquettes"],
      priority: "P2",
      seoTitle: "Cocopeat Briquette Exporter & Supplier from India",
      seoDescription:
        "Cocopeat Briquette exporter and supplier from India. Grade: Compressed. Available as Briquettes. Specified on expansion volume, eC and pH. Request a quote.",
    },
    {
      slug: "buffered-cocopeat",
      name: "Buffered Cocopeat",
      headingName: "Buffered Cocopeat",
      gradeType: "Premium horticulture",
      specs: ["Low EC", "pH", "water-holding capacity", "air porosity"],
      forms: ["Blocks", "Bags"],
      priority: "P2",
      seoTitle: "Buffered Cocopeat Exporter & Supplier from India",
      seoDescription:
        "Buffered Cocopeat exporter and supplier from India. Grade: Premium horticulture. Available as Blocks and Bags. Specified on low EC and pH. Request a quote.",
    },
    {
      slug: "washed-cocopeat",
      name: "Washed Cocopeat",
      headingName: "Washed Cocopeat",
      gradeType: "Low-salt grade",
      specs: ["EC", "pH", "moisture", "expansion"],
      forms: ["Blocks"],
      priority: "P2",
      seoTitle: "Washed Cocopeat Exporter & Supplier from India",
      seoDescription:
        "Washed Cocopeat exporter and supplier from India. Grade: Low-salt grade. Available as Blocks. Specified on eC, pH, moisture and expansion. Request a quote.",
    },
    {
      slug: "cocopeat-grow-bag",
      name: "Cocopeat Grow Bag",
      headingName: "Cocopeat Grow Bag",
      gradeType: "Horticulture",
      specs: ["Dimensions", "EC", "pH", "expansion", "planting holes"],
      forms: ["Grow Bags"],
      priority: "P2",
      seoTitle: "Cocopeat Grow Bag Exporter & Supplier from India",
      seoDescription:
        "Cocopeat Grow Bag exporter and supplier from India. Grade: Horticulture. Available as Grow Bags. Specified on dimensions, eC, pH, expansion and planting holes.",
    },
    {
      slug: "coco-chips",
      name: "Coco Chips",
      headingName: "Coco Chips",
      gradeType: "Horticulture",
      specs: ["Chip size", "EC", "moisture", "expansion"],
      forms: ["Loose", "Blocks"],
      priority: "P2",
      seoTitle: "Coco Chips Exporter & Supplier from India",
      seoDescription:
        "Coco Chips exporter and supplier from India. Grade: Horticulture. Available as Loose and Blocks. Specified on chip size, eC and moisture. Quote within 24 hours.",
    },
    {
      slug: "cocopeat-chips",
      name: "Cocopeat + Chips",
      headingName: "Cocopeat and Chips Mix",
      gradeType: "Growing media",
      specs: ["Ratio", "EC", "pH", "water retention"],
      forms: ["Blocks", "Grow Bags"],
      priority: "P2",
      seoTitle: "Cocopeat and Chips Mix Exporter & Supplier from India",
      seoDescription:
        "Cocopeat and Chips Mix exporter and supplier from India. Grade: Growing media. Available as Blocks and Grow Bags. Specified on ratio, eC and pH. COA on request.",
    },
    ],
  },
  {
    slug: "basmati-rice",
    name: "Basmati Rice",
    category: "food",
    seoTitle: "Basmati Rice Exporter from India: Varieties & Grades",
    seoDescription:
      "Basmati rice supplier from India: 1121, 1509, 1401, 1718 and Traditional Basmati in Raw, Steam, Sella and Golden Sella, to your grain length and broken percentage.",
    intro:
      "Indian Basmati is specified twice: once by variety and once by processing form. 1121 and 1885 give extra-long grain, 1509 and 1401 serve long-grain commercial volume, and Raw, Steam, Sella or Golden Sella is chosen for the destination market's cooking preference. Allvora supplies nine varieties across those forms, to your length, broken percentage and purity parameters.",
    buyerSpecNote:
      "Buyers can specify: Grain length · Broken % · Moisture · Chalky grains · Damaged grains · Foreign matter · Admixture · Purity · Aroma · Cooking time · Elongation ratio · Ageing · Crop year · Sortex level.",
    varieties: [
    {
      slug: "1121",
      name: "1121",
      headingName: "1121 Basmati Rice",
      gradeType: "Premium Extra Long",
      specs: ["Grain length ~8.3+ mm", "broken %", "moisture", "purity", "elongation"],
      forms: ["Raw", "Steam", "Sella", "Golden Sella"],
      priority: "P1",
      seoTitle: "1121 Basmati Rice Exporter & Supplier from India",
      seoDescription:
        "1121 Basmati Rice exporter and supplier from India. Grade: Premium Extra Long. Available as Raw, Steam, Sella and Golden Sella. Response within 24 hours.",
      intro:
        "1121 is India's premium extra-long-grain Basmati, with raw grain length of approximately 8.3 mm and above and strong cooking elongation. It is the leading choice for Middle East and international buyers who specify length, purity and low broken percentage. Allvora supplies 1121 in Raw, Steam, Sella and Golden Sella processing forms, specified to your parameters.",
      formNotes: [
        { form: "Raw", note: "Milled and polished without heat treatment. It keeps the finest aroma and the most slender grain, and is specified where the buyer's market cooks rice gently and accepts a softer grain." },
        { form: "Steam", note: "Soaked and steamed before milling, then dried. Steaming firms the grain and retains aroma, and it is the usual choice where buyers want separated grains without the colour shift of parboiling." },
        { form: "Sella", note: "Parboiled: soaked, pressure treated and dried before milling. The grain cooks firm and separate with a low breakage rate, which suits food service and high-volume kitchens." },
        { form: "Golden Sella", note: "Parboiled to a deeper golden colour. It behaves like Sella in the pot and is specified for retail markets that read the golden hue as a mark of quality." },
      ],
    },
    {
      slug: "1509",
      name: "1509",
      headingName: "1509 Basmati Rice",
      gradeType: "Long Grain",
      specs: ["Grain length ~8.2+ mm", "broken %", "moisture", "purity"],
      forms: ["Raw", "Steam", "Sella"],
      priority: "P1",
      seoTitle: "1509 Basmati Rice Exporter & Supplier from India",
      seoDescription:
        "1509 Basmati Rice exporter and supplier from India. Grade: Long Grain. Available as Raw, Steam and Sella. Specified on grain length ~8.2+ mm and broken %.",
      intro:
        "1509 is a long-grain Basmati with raw grain length of approximately 8.2 mm and above, a shorter-duration crop than 1121 and generally the more competitively priced of the two. Buyers specify it where they want Basmati length and character at commercial volume. Allvora supplies 1509 in Raw, Steam and Sella forms, to your broken percentage, moisture and purity parameters.",
      formNotes: [
        { form: "Raw", note: "Milled without heat treatment, keeping aroma and slender grain, for markets that cook rice gently." },
        { form: "Steam", note: "Soaked, steamed and dried before milling, for firm separated grains without a colour shift." },
        { form: "Sella", note: "Parboiled for a firm grain and low breakage, the usual choice for food service volume." },
      ],
    },
    {
      slug: "1401",
      name: "1401",
      headingName: "1401 Basmati Rice",
      gradeType: "Premium Long Grain",
      specs: ["Grain length", "broken %", "moisture", "aroma"],
      forms: ["Raw", "Steam", "Sella"],
      priority: "P2",
      seoTitle: "1401 Basmati Rice Exporter & Supplier from India",
      seoDescription:
        "1401 Basmati Rice exporter and supplier from India. Grade: Premium Long Grain. Available as Raw, Steam and Sella. Specified on grain length and broken %.",
    },
    {
      slug: "1718",
      name: "1718",
      headingName: "1718 Basmati Rice",
      gradeType: "Premium",
      specs: ["Grain length", "moisture", "broken %", "cooking expansion"],
      forms: ["Raw", "Steam", "Sella"],
      priority: "P2",
      seoTitle: "1718 Basmati Rice Exporter & Supplier from India",
      seoDescription:
        "1718 Basmati Rice exporter and supplier from India. Grade: Premium. Available as Raw, Steam and Sella. Specified on grain length, moisture and broken %.",
    },
    {
      slug: "1692",
      name: "1692",
      headingName: "1692 Basmati Rice",
      gradeType: "New Basmati",
      specs: ["Grain length", "purity", "moisture", "broken %"],
      forms: ["Raw", "Steam"],
      priority: "P2",
      seoTitle: "1692 Basmati Rice Exporter & Supplier from India",
      seoDescription:
        "1692 Basmati Rice exporter and supplier from India. Grade: New Basmati. Available as Raw and Steam. Specified on grain length, purity, moisture and broken %.",
    },
    {
      slug: "1847",
      name: "1847",
      headingName: "1847 Basmati Rice",
      gradeType: "Improved Basmati",
      specs: ["Grain length", "purity", "moisture", "broken %"],
      forms: ["Raw", "Steam", "Sella"],
      priority: "P2",
      seoTitle: "1847 Basmati Rice Exporter & Supplier from India",
      seoDescription:
        "1847 Basmati Rice exporter and supplier from India. Grade: Improved Basmati. Available as Raw, Steam and Sella. Specified on grain length, purity and moisture.",
    },
    {
      slug: "1885",
      name: "1885",
      headingName: "1885 Basmati Rice",
      gradeType: "Improved 1121 type",
      specs: ["Extra-long grain", "broken %", "moisture", "elongation"],
      forms: ["Raw", "Steam", "Sella"],
      priority: "P2",
      seoTitle: "1885 Basmati Rice Exporter & Supplier from India",
      seoDescription:
        "1885 Basmati Rice exporter and supplier from India. Grade: Improved 1121 type. Available as Raw, Steam and Sella. Specified on extra-long grain and broken %.",
    },
    {
      slug: "1886",
      name: "1886",
      headingName: "1886 Basmati Rice",
      gradeType: "Improved Basmati",
      specs: ["Long grain", "purity", "moisture", "broken %"],
      forms: ["Raw", "Steam", "Sella"],
      priority: "P2",
      seoTitle: "1886 Basmati Rice Exporter & Supplier from India",
      seoDescription:
        "1886 Basmati Rice exporter and supplier from India. Grade: Improved Basmati. Available as Raw, Steam and Sella. Specified on long grain, purity and moisture.",
    },
    {
      slug: "traditional-basmati",
      name: "Traditional Basmati",
      headingName: "Traditional Basmati Rice",
      gradeType: "Premium Traditional",
      specs: ["Aroma", "slender grain", "purity", "elongation"],
      forms: ["Raw", "Steam", "Sella"],
      priority: "P2",
      seoTitle: "Traditional Basmati Rice Exporter & Supplier from India",
      seoDescription:
        "Traditional Basmati Rice exporter and supplier from India. Grade: Premium Traditional. Available as Raw, Steam and Sella. Specified on aroma and slender grain.",
    },
    ],
  },
  {
    slug: "ghee",
    name: "Ghee",
    category: "food",
    seoTitle: "Ghee Exporter from India: Varieties & Grades",
    seoDescription:
      "Ghee supplier from India: cow and buffalo ghee, A2, bilona, cultured, organic and industrial grades, in retail and bulk, specified on fat, moisture, FFA and purity.",
    intro:
      "Ghee is supplied from India across a range, from standard cow and buffalo grades for volume trade to A2, bilona, cultured and organic grades for premium retail, plus industrial grades for food manufacturing. Where a grade depends on process or milk source, that is documented alongside the analysis. Allvora supplies ghee in retail and bulk formats.",
    varieties: [
    {
      slug: "cow-ghee",
      name: "Cow Ghee",
      headingName: "Cow Ghee",
      gradeType: "Standard",
      specs: ["Fat", "moisture", "FFA", "peroxide value", "microbiology"],
      forms: ["Retail", "Bulk"],
      priority: "P2",
      seoTitle: "Cow Ghee Exporter & Supplier from India",
      seoDescription:
        "Cow Ghee exporter and supplier from India. Grade: Standard. Available as Retail and Bulk. Specified on fat, moisture, fFA, peroxide value and microbiology.",
    },
    {
      slug: "buffalo-ghee",
      name: "Buffalo Ghee",
      headingName: "Buffalo Ghee",
      gradeType: "Commercial",
      specs: ["Fat", "moisture", "FFA", "acid value", "purity"],
      forms: ["Retail", "Bulk"],
      priority: "P2",
      seoTitle: "Buffalo Ghee Exporter & Supplier from India",
      seoDescription:
        "Buffalo Ghee exporter and supplier from India. Grade: Commercial. Available as Retail and Bulk. Specified on fat, moisture, fFA, acid value and purity.",
    },
    {
      slug: "a2-cow-ghee",
      name: "A2 Cow Ghee",
      headingName: "A2 Cow Ghee",
      gradeType: "Premium",
      specs: ["Milk source documentation", "fat", "moisture", "purity"],
      forms: ["Retail"],
      priority: "P1",
      seoTitle: "A2 Cow Ghee Exporter & Supplier from India",
      seoDescription:
        "A2 Cow Ghee exporter and supplier from India. Grade: Premium. Available as Retail. Specified on milk source documentation, fat and moisture. Request a quote.",
      intro:
        "A2 cow ghee is made from the milk of cattle producing A2 beta-casein, and buyers who specify it expect documentation of the milk source, not only an analysis of the finished product. It sells mainly into premium retail and health-positioned brands. Allvora supplies A2 cow ghee in retail formats, with milk source documentation, fat, moisture and purity confirmed before shipment.",
    },
    {
      slug: "bilona-ghee",
      name: "Bilona Ghee",
      headingName: "Bilona Ghee",
      gradeType: "Traditional Premium",
      specs: ["Milk source", "process", "fat", "moisture", "purity"],
      forms: ["Retail"],
      priority: "P1",
      seoTitle: "Bilona Ghee Exporter & Supplier from India",
      seoDescription:
        "Bilona Ghee exporter and supplier from India. Grade: Traditional Premium. Available as Retail. Specified on milk source, process, fat, moisture and purity.",
      intro:
        "Bilona ghee is made by the traditional route: curd is cultured and churned to butter, which is then clarified, rather than clarifying cream directly. Premium retail and private-label brands specify it for the process itself, so the process is documented alongside the analysis. Allvora supplies bilona ghee in retail formats, with milk source, fat, moisture and purity confirmed before shipment.",
    },
    {
      slug: "cultured-ghee",
      name: "Cultured Ghee",
      headingName: "Cultured Ghee",
      gradeType: "Premium",
      specs: ["Cultured butter source", "fat", "FFA", "peroxide value"],
      forms: ["Retail", "Bulk"],
      priority: "P2",
      seoTitle: "Cultured Ghee Exporter & Supplier from India",
      seoDescription:
        "Cultured Ghee exporter and supplier from India. Grade: Premium. Available as Retail and Bulk. Specified on cultured butter source, fat, fFA and peroxide value.",
    },
    {
      slug: "organic-ghee",
      name: "Organic Ghee",
      headingName: "Organic Ghee",
      gradeType: "Certified Organic",
      specs: ["Organic certification", "fat", "moisture", "residues"],
      forms: ["Retail", "Bulk"],
      priority: "P2",
      seoTitle: "Organic Ghee Exporter & Supplier from India",
      seoDescription:
        "Organic Ghee exporter and supplier from India. Grade: Certified Organic. Available as Retail and Bulk. Specified on organic certification, fat and moisture.",
    },
    {
      slug: "industrial-ghee",
      name: "Industrial Ghee",
      headingName: "Industrial Ghee",
      gradeType: "Food Manufacturing",
      specs: ["Fat", "FFA", "moisture", "microbiological parameters"],
      forms: ["Bulk"],
      priority: "P2",
      seoTitle: "Industrial Ghee Exporter & Supplier from India",
      seoDescription:
        "Industrial Ghee exporter and supplier from India. Grade: Food Manufacturing. Available as Bulk. Specified on fat, fFA, moisture and microbiological parameters.",
    },
    ],
  },
  {
    slug: "tea",
    name: "Tea",
    category: "tea-coffee",
    seoTitle: "Tea Exporter from India: Varieties & Grades",
    seoDescription:
      "Tea bulk supplier from India: Assam CTC and orthodox, Darjeeling, Nilgiri, Dooars, green tea, masala tea, dust and fannings, loose and in tea bag formats.",
    intro:
      "Indian tea covers Assam CTC for strength, Darjeeling for specialty orthodox character, Nilgiri and Dooars for the commercial trade, and green tea, masala blends, dust and fannings for packers. Buyers specify leaf grade, liquor, aroma and moisture. Allvora supplies tea loose and in tea bag formats, with private-label options available.",
    varieties: [
    {
      slug: "assam-ctc",
      name: "Assam CTC",
      headingName: "Assam CTC Tea",
      gradeType: "Strong black tea",
      specs: ["Leaf grade", "liquor strength", "moisture", "colour", "aroma"],
      forms: ["Loose", "Tea Bags"],
      priority: "P1",
      seoTitle: "Assam CTC Tea Exporter & Supplier from India",
      seoDescription:
        "Assam CTC Tea exporter and supplier from India. Grade: Strong black tea. Available as Loose and Tea Bags. Specified on leaf grade, liquor strength and moisture.",
      intro:
        "Assam CTC is the strong, brisk black tea that supplies most of the world's tea bag and milk tea demand, produced by the crush, tear and curl method. Blenders, packers and private-label brands buy it on leaf grade, liquor strength and colour. Allvora supplies Assam CTC loose and in tea bag formats, to your grade and moisture parameters.",
    },
    {
      slug: "assam-orthodox",
      name: "Assam Orthodox",
      headingName: "Assam Orthodox Tea",
      gradeType: "Premium",
      specs: ["Leaf appearance", "liquor", "aroma", "moisture"],
      forms: ["Loose"],
      priority: "P2",
      seoTitle: "Assam Orthodox Tea Exporter & Supplier from India",
      seoDescription:
        "Assam Orthodox Tea exporter and supplier from India. Grade: Premium. Available as Loose. Specified on leaf appearance, liquor and aroma. Quote within 24 hours.",
    },
    {
      slug: "darjeeling",
      name: "Darjeeling",
      headingName: "Darjeeling Tea",
      gradeType: "Specialty",
      specs: ["Flush", "leaf grade", "aroma", "liquor", "origin"],
      forms: ["Loose", "Tea Bags"],
      priority: "P1",
      seoTitle: "Darjeeling Tea Exporter & Supplier from India",
      seoDescription:
        "Darjeeling Tea exporter and supplier from India. Grade: Specialty. Available as Loose and Tea Bags. Specified on flush, leaf grade, aroma, liquor and origin.",
      intro:
        "Darjeeling is India's specialty orthodox tea, sold by flush and by garden, and bought for aroma and liquor rather than for strength. Its customers are specialty retailers, tea houses and premium private-label brands. Allvora supplies Darjeeling loose and in tea bag formats, with flush, leaf grade and origin confirmed at the specification stage.",
    },
    {
      slug: "nilgiri",
      name: "Nilgiri",
      headingName: "Nilgiri Tea",
      gradeType: "Aromatic black tea",
      specs: ["Leaf grade", "liquor colour", "aroma", "moisture"],
      forms: ["Loose", "Tea Bags"],
      priority: "P2",
      seoTitle: "Nilgiri Tea Exporter & Supplier from India",
      seoDescription:
        "Nilgiri Tea exporter and supplier from India. Grade: Aromatic black tea. Available as Loose and Tea Bags. Specified on leaf grade, liquor colour and aroma.",
    },
    {
      slug: "dooars",
      name: "Dooars",
      headingName: "Dooars Tea",
      gradeType: "Commercial",
      specs: ["Grade", "liquor", "moisture", "colour"],
      forms: ["Loose"],
      priority: "P2",
      seoTitle: "Dooars Tea Exporter & Supplier from India",
      seoDescription:
        "Dooars Tea exporter and supplier from India. Grade: Commercial. Available as Loose. Specified on grade, liquor, moisture and colour. Response within 24 hours.",
    },
    {
      slug: "green-tea",
      name: "Green Tea",
      headingName: "Green Tea",
      gradeType: "Specialty",
      specs: ["Leaf appearance", "colour", "moisture", "flavour"],
      forms: ["Loose", "Tea Bags"],
      priority: "P1",
      seoTitle: "Green Tea Exporter & Supplier from India",
      seoDescription:
        "Green Tea exporter and supplier from India. Grade: Specialty. Available as Loose and Tea Bags. Specified on leaf appearance, colour, moisture and flavour.",
      intro:
        "Indian green tea is unoxidised leaf, produced in Assam, the Nilgiris and Darjeeling, and is bought both as loose specialty leaf and as tea bag material. Buyers specify leaf appearance, colour, moisture and flavour profile. Allvora supplies green tea loose and in tea bag formats, to those parameters.",
    },
    {
      slug: "masala-tea",
      name: "Masala Tea",
      headingName: "Masala Tea",
      gradeType: "Value Added",
      specs: ["Tea grade", "spice blend", "moisture", "microbiology"],
      forms: ["Loose", "Tea Bags"],
      priority: "P2",
      seoTitle: "Masala Tea Exporter & Supplier from India",
      seoDescription:
        "Masala Tea exporter and supplier from India. Grade: Value Added. Available as Loose and Tea Bags. Specified on tea grade and spice blend. Quote within 24 hours.",
    },
    {
      slug: "tea-dust",
      name: "Tea Dust",
      headingName: "Tea Dust",
      gradeType: "Commercial",
      specs: ["Particle size", "liquor strength", "moisture"],
      forms: ["Bulk", "Tea Bags"],
      priority: "P2",
      seoTitle: "Tea Dust Exporter & Supplier from India",
      seoDescription:
        "Tea Dust exporter and supplier from India. Grade: Commercial. Available as Bulk and Tea Bags. Specified on particle size, liquor strength and moisture.",
    },
    {
      slug: "fannings",
      name: "Fannings",
      headingName: "Tea Fannings",
      gradeType: "Tea Bag Grade",
      specs: ["Particle size", "liquor strength", "colour"],
      forms: ["Tea Bags"],
      priority: "P2",
      seoTitle: "Tea Fannings Exporter & Supplier from India",
      seoDescription:
        "Tea Fannings exporter and supplier from India. Grade: Tea Bag Grade. Available as Tea Bags. Specified on particle size and liquor strength. Request a quote.",
    },
    ],
  },
  {
    slug: "coffee",
    name: "Coffee",
    category: "tea-coffee",
    seoTitle: "Coffee Exporter from India: Varieties & Grades",
    seoDescription:
      "Coffee bulk supplier from India: Arabica Plantation A and PB, Robusta parchment and cherry grades, Monsooned Malabar AA and Mysore Nuggets EB, as green beans.",
    intro:
      "Indian coffee is graded across Arabica and Robusta, in plantation (washed), parchment and cherry (natural) processing, then screened into bean size grades. Specialty lots include Monsooned Malabar, Mysore Nuggets and Kaapi Royale. Allvora supplies green beans across these grades, with screen size, moisture, defect count and cup profile confirmed before shipment.",
    varieties: [
    {
      slug: "arabica-plantation-a",
      name: "Arabica Plantation A",
      headingName: "Arabica Plantation A Coffee",
      gradeType: "Premium",
      specs: ["Screen size", "moisture", "defects", "cup quality"],
      forms: ["Green Beans"],
      priority: "P1",
      seoTitle: "Arabica Plantation A Coffee Exporter & Supplier from India",
      seoDescription:
        "Arabica Plantation A Coffee exporter and supplier from India. Grade: Premium. Available as Green Beans. Specified on screen size, moisture and defects.",
      intro:
        "Arabica Plantation A is a washed Arabica grade from India's southern plantations, screened for bean size and graded on defect count and cup quality. It is bought by roasters and traders who specify screen size, moisture and cup profile. Allvora supplies Plantation A as green beans, with those parameters confirmed before shipment.",
    },
    {
      slug: "arabica-plantation-pb",
      name: "Arabica Plantation PB",
      headingName: "Arabica Plantation PB Coffee",
      gradeType: "Premium",
      specs: ["Peaberry", "screen size", "moisture", "defects"],
      forms: ["Green Beans"],
      priority: "P2",
      seoTitle: "Arabica Plantation PB Coffee Exporter & Supplier from India",
      seoDescription:
        "Arabica Plantation PB Coffee exporter and supplier from India. Grade: Premium. Available as Green Beans. Specified on peaberry, screen size and moisture.",
    },
    {
      slug: "plantation-b",
      name: "Plantation B",
      headingName: "Plantation B Coffee",
      gradeType: "Commercial",
      specs: ["Bean size", "moisture", "defects", "cup profile"],
      forms: ["Green Beans"],
      priority: "P2",
      seoTitle: "Plantation B Coffee Exporter & Supplier from India",
      seoDescription:
        "Plantation B Coffee exporter and supplier from India. Grade: Commercial. Available as Green Beans. Specified on bean size, moisture, defects and cup profile.",
    },
    {
      slug: "robusta-parchment-pb",
      name: "Robusta Parchment PB",
      headingName: "Robusta Parchment PB Coffee",
      gradeType: "Premium Robusta",
      specs: ["Screen size", "moisture", "defects", "cup quality"],
      forms: ["Green Beans"],
      priority: "P2",
      seoTitle: "Robusta Parchment PB Coffee Exporter & Supplier from India",
      seoDescription:
        "Robusta Parchment PB Coffee exporter and supplier from India. Grade: Premium Robusta. Available as Green Beans. Specified on screen size, moisture and defects.",
    },
    {
      slug: "robusta-parchment-ab",
      name: "Robusta Parchment AB",
      headingName: "Robusta Parchment AB Coffee",
      gradeType: "Commercial Premium",
      specs: ["Bean size", "moisture", "defects"],
      forms: ["Green Beans"],
      priority: "P2",
      seoTitle: "Robusta Parchment AB Coffee Exporter & Supplier from India",
      seoDescription:
        "Robusta Parchment AB Coffee exporter and supplier from India. Grade: Commercial Premium. Available as Green Beans. Specified on bean size, moisture and defects.",
    },
    {
      slug: "robusta-cherry-pb",
      name: "Robusta Cherry PB",
      headingName: "Robusta Cherry PB Coffee",
      gradeType: "Natural Robusta",
      specs: ["Screen size", "moisture", "defects"],
      forms: ["Green Beans"],
      priority: "P2",
      seoTitle: "Robusta Cherry PB Coffee Exporter & Supplier from India",
      seoDescription:
        "Robusta Cherry PB Coffee exporter and supplier from India. Grade: Natural Robusta. Available as Green Beans. Specified on screen size, moisture and defects.",
    },
    {
      slug: "robusta-cherry-ab",
      name: "Robusta Cherry AB",
      headingName: "Robusta Cherry AB Coffee",
      gradeType: "Commercial",
      specs: ["Bean size", "moisture", "defects"],
      forms: ["Green Beans"],
      priority: "P1",
      seoTitle: "Robusta Cherry AB Coffee Exporter & Supplier from India",
      seoDescription:
        "Robusta Cherry AB Coffee exporter and supplier from India. Grade: Commercial. Available as Green Beans. Specified on bean size and moisture. Request a quote.",
      intro:
        "Robusta Cherry AB is a natural, dry-processed Robusta screened at AB bean size, and it is the volume commercial Robusta in Indian export. Roasters and blenders buy it for body in espresso blends and for instant coffee production. Allvora supplies Robusta Cherry AB as green beans, with bean size, moisture and defect count confirmed before shipment.",
    },
    {
      slug: "monsooned-malabar-aa",
      name: "Monsooned Malabar AA",
      headingName: "Monsooned Malabar AA Coffee",
      gradeType: "Specialty",
      specs: ["Screen size", "moisture", "monsooning characteristics", "cup profile"],
      forms: ["Green Beans"],
      priority: "P1",
      seoTitle: "Monsooned Malabar AA Coffee Exporter & Supplier from India",
      seoDescription:
        "Monsooned Malabar AA Coffee exporter and supplier from India. Grade: Specialty. Available as Green Beans. Specified on screen size and moisture. COA on request.",
      intro:
        "Monsooned Malabar AA is Indian Arabica exposed to monsoon winds in open warehouses on the Malabar coast, which swells the bean, pales its colour and lowers acidity. It is a specialty lot bought by roasters for that specific cup character. Allvora supplies Monsooned Malabar AA as green beans, with screen size, moisture and cup profile confirmed before shipment.",
    },
    {
      slug: "mysore-nuggets-eb",
      name: "Mysore Nuggets EB",
      headingName: "Mysore Nuggets EB Coffee",
      gradeType: "Specialty",
      specs: ["Extra bold", "screen size", "moisture", "cup profile"],
      forms: ["Green Beans"],
      priority: "P2",
      seoTitle: "Mysore Nuggets EB Coffee Exporter & Supplier from India",
      seoDescription:
        "Mysore Nuggets EB Coffee exporter and supplier from India. Grade: Specialty. Available as Green Beans. Specified on extra bold, screen size and moisture.",
    },
    {
      slug: "robusta-kaapi-royale",
      name: "Robusta Kaapi Royale",
      headingName: "Robusta Kaapi Royale Coffee",
      gradeType: "Specialty",
      specs: ["Screen size", "moisture", "defects", "cup profile"],
      forms: ["Green Beans"],
      priority: "P2",
      seoTitle: "Robusta Kaapi Royale Coffee Exporter & Supplier from India",
      seoDescription:
        "Robusta Kaapi Royale Coffee exporter and supplier from India. Grade: Specialty. Available as Green Beans. Specified on screen size, moisture and defects.",
    },
    ],
  },
];

const productBySlug = new Map(products.map((p) => [p.slug, p]));

export function getProduct(slug: string): Product | undefined {
  return productBySlug.get(slug);
}

export function productsInCategory(category: CategorySlug): Product[] {
  return products.filter((p) => p.category === category);
}

export function getVariety(
  productSlug: string,
  varietySlug: string
): { product: Product; variety: Variety } | undefined {
  const product = getProduct(productSlug);
  const variety = product?.varieties.find((v) => v.slug === varietySlug);
  return product && variety ? { product, variety } : undefined;
}

/** Varieties that get their own page at launch. */
export function launchVarieties(product: Product): Variety[] {
  return product.varieties.filter((v) => v.priority === "P1");
}

export const allVarieties: { product: Product; variety: Variety }[] = products.flatMap((p) =>
  p.varieties.map((v) => ({ product: p, variety: v }))
);

/** Every distinct form string across the catalogue, for the RFQ form. */
export const allForms: string[] = [
  ...new Set(products.flatMap((p) => p.varieties.flatMap((v) => v.forms))),
].sort();
