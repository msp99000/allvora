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
  /** Category page intro, Section 5.8, verbatim. */
  intro: string;
  seoTitle: string;
  seoDescription: string;
}

export const categories: Category[] = [
  {
    slug: "spices",
    name: "Spices",
    shortName: "Spices",
    cardLine:
      "Red chilli, black pepper, cardamom, turmeric in whole, processed and custom forms.",
    intro:
      "We supply Indian spices in whole, processed and customized forms: red chilli from Guntur and Byadagi, black pepper from the Malabar coast, green and large cardamom, and turmeric from India's principal producing belts. Each is available by named variety and grade, specified to your parameters.",
    seoTitle: "Indian Spices Exporter: Varieties, Grades & Forms",
    seoDescription:
      "Indian spice exporter supplying red chilli, black pepper, cardamom and turmeric by named variety and grade, in whole, processed and custom forms, to buyer specification.",
  },
  {
    slug: "agri-natural",
    name: "Agricultural & Natural",
    shortName: "Agri & Natural",
    cardLine: "Moringa, coconut products and cocopeat growing media.",
    intro:
      "Moringa in leaf, powder, seed and oil forms including organic and nutraceutical grades; coconut across fresh, copra, desiccated and oil formats; and cocopeat growing media from 5 kg blocks to buffered horticulture grades.",
    seoTitle: "Moringa, Coconut & Cocopeat Exporter from India",
    seoDescription:
      "Exporter of moringa leaf, powder and oil, coconut in fresh, copra, desiccated and oil formats, and cocopeat growing media from India, supplied to buyer specification.",
  },
  {
    slug: "food",
    name: "Food Products",
    shortName: "Food",
    cardLine:
      "Basmati rice across nine varieties, and ghee from standard to A2 bilona.",
    intro:
      "Indian Basmati rice across nine varieties and four processing types, and ghee from standard cow and buffalo grades to A2, bilona, cultured, organic and industrial formats, in retail and bulk.",
    seoTitle: "Basmati Rice & Ghee Supplier from India",
    seoDescription:
      "Indian food products supplier: Basmati rice across nine varieties in Raw, Steam, Sella and Golden Sella, and ghee from standard cow grades to A2 and bilona, retail and bulk.",
  },
  {
    slug: "tea-coffee",
    name: "Tea & Coffee",
    shortName: "Tea & Coffee",
    cardLine:
      "Assam, Darjeeling and Nilgiri teas; Arabica, Robusta and specialty coffees.",
    intro:
      "Teas from Assam, Darjeeling, the Nilgiris and Dooars, from specialty orthodox to tea-bag fannings, plus green tea and masala blends. Indian coffees across Arabica and Robusta plantation, parchment and cherry grades, including Monsooned Malabar and Mysore Nuggets specialty lots. Private-label options available for both.",
    seoTitle: "Indian Tea & Coffee Bulk Supplier and Exporter",
    seoDescription:
      "Bulk supplier of Indian tea and coffee: Assam CTC, Darjeeling, Nilgiri and green teas, Arabica and Robusta grades, Monsooned Malabar and Mysore Nuggets specialty lots.",
  },
];

const categoryBySlug = new Map(categories.map((c) => [c.slug, c]));

export function getCategory(slug: string): Category | undefined {
  return categoryBySlug.get(slug as CategorySlug);
}
