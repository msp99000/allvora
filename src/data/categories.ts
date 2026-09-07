/**
 * The four product lines. Copy is PROJECT_BRIEF.md Section 5.8, verbatim.
 */

export type CategorySlug = "spices" | "agri-natural" | "food" | "tea-coffee";

export interface Category {
  slug: CategorySlug;
  /** Full name, used as the page H1 subject and in breadcrumbs. */
  name: string;
  /** Short name for the mega-menu column head and the mono eyebrow. */
  shortName: string;
  /** One line for the home page card, Section 5.1. */
  cardLine: string;
  /**
   * Page H1. Section 7.5 wants exactly one H1 per page carrying the target
   * query pattern naturally, so it is data rather than a template.
   */
  h1: string;
  /** Category page intro, Section 5.8, verbatim. */
  intro: string;
  seoTitle: string;
  seoDescription: string;
  /**
   * Per-line accent, drawn from the commodity itself: chilli red, moringa leaf,
   * ghee amber, roast brown. This is wayfinding rather than decoration. A buyer
   * moving between 11 products and 86 varieties learns which product line they
   * are in from the colour before they read the breadcrumb.
   *
   * Each is AA on white and on the panel tint. None is used as text on dark
   * grounds, where they fall below 4.5:1.
   */
  accent: string;
  /** The same hue as a wash, for panels and hovers. */
  accentTint: string;
}

export const categories: Category[] = [
  {
    slug: "spices",
    name: "Spices",
    shortName: "Spices",
    cardLine:
      "Red chilli, black pepper, cardamom, turmeric in whole, processed and custom forms.",
    h1: "Indian spices exporter and supplier",
    intro:
      "We supply Indian spices in whole, processed and customized forms: red chilli from Guntur and Byadagi, black pepper from the Malabar coast, green and large cardamom, and turmeric from India's principal producing belts. Each is available by named variety and grade, specified to your parameters.",
    seoTitle: "Indian Spices Exporter: Varieties, Grades & Forms",
    seoDescription:
      "Indian spice exporter supplying red chilli, black pepper, cardamom and turmeric by named variety and grade, in whole, processed and custom forms, to buyer specification.",
    accent: "#A8321B",
    accentTint: "#F8EDEB",
  },
  {
    slug: "agri-natural",
    name: "Agricultural & Natural",
    shortName: "Agri & Natural",
    cardLine: "Moringa, coconut products and cocopeat growing media.",
    h1: "Agricultural and natural products exporter from India",
    intro:
      "Moringa in leaf, powder, seed and oil forms including organic and nutraceutical grades; coconut across fresh, copra, desiccated and oil formats; and cocopeat growing media from 5 kg blocks to buffered horticulture grades.",
    seoTitle: "Moringa, Coconut & Cocopeat Exporter from India",
    seoDescription:
      "Exporter of moringa leaf, powder and oil, coconut in fresh, copra, desiccated and oil formats, and cocopeat growing media from India, supplied to buyer specification.",
    accent: "#3F6B34",
    accentTint: "#EEF3EC",
  },
  {
    slug: "food",
    name: "Grains & Dairy",
    shortName: "Grains & Dairy",
    cardLine:
      "Basmati rice across nine varieties, and ghee from standard to A2 bilona.",
    h1: "Basmati rice and ghee supplier from India",
    intro:
      "Indian Basmati rice across nine varieties and four processing types, and ghee from standard cow and buffalo grades to A2, bilona, cultured, organic and industrial formats, in retail and bulk.",
    seoTitle: "Basmati Rice & Ghee Supplier from India",
    seoDescription:
      "Indian food supplier: Basmati rice in nine varieties across Raw, Steam, Sella and Golden Sella, plus ghee from standard cow grades to A2, bilona and organic.",
    accent: "#8A6218",
    accentTint: "#F6F1E6",
  },
  {
    slug: "tea-coffee",
    name: "Tea & Coffee",
    shortName: "Tea & Coffee",
    cardLine:
      "Assam, Darjeeling and Nilgiri teas; Arabica, Robusta and specialty coffees.",
    h1: "Indian tea and coffee bulk supplier",
    intro:
      "Teas from Assam, Darjeeling, the Nilgiris and Dooars, from specialty orthodox to tea-bag fannings, plus green tea and masala blends. Indian coffees across Arabica and Robusta plantation, parchment and cherry grades, including Monsooned Malabar and Mysore Nuggets specialty lots. Private-label options available for both.",
    seoTitle: "Indian Tea & Coffee Bulk Supplier and Exporter",
    seoDescription:
      "Bulk supplier of Indian tea and coffee: Assam CTC, Darjeeling, Nilgiri and green teas, Arabica and Robusta grades, Monsooned Malabar and Mysore Nuggets specialty lots.",
    accent: "#5E3F26",
    accentTint: "#F2EEEA",
  },
];

const categoryBySlug = new Map(categories.map((c) => [c.slug, c]));

export function getCategory(slug: string): Category | undefined {
  return categoryBySlug.get(slug as CategorySlug);
}
