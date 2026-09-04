/**
 * Sourcing origins. PROJECT_BRIEF.md Section 5.3.
 *
 * The regions named in the approved Section 5.3 paragraph, held as data rather
 * than written into the page, so /about/sourcing-and-traceability and any
 * future origin content cannot drift from each other.
 *
 * Region-to-product links are the ones stated in the brief. Nothing here claims
 * an owned facility, a farm relationship or a volume.
 */

export interface SourcingRegion {
  id: string;
  /** Region as a buyer would name it. */
  name: string;
  /** State or belt, for the mono sub-label. */
  area: string;
  /** Product slugs sourced from this region. */
  products: string[];
  /** What the region is known for, one line. */
  note: string;
}

export const sourcingRegions: SourcingRegion[] = [
  {
    id: "guntur",
    name: "Guntur",
    area: "Andhra Pradesh",
    products: ["red-chilli"],
    note: "India's largest red chilli producing and trading belt, and the origin for the Sannam and Teja grades.",
  },
  {
    id: "byadagi",
    name: "Byadagi",
    area: "Karnataka",
    products: ["red-chilli"],
    note: "The high-colour, low-pungency chilli belt, for buyers who specify ASTA colour rather than heat.",
  },
  {
    id: "western-ghats",
    name: "Western Ghats",
    area: "Kerala and Karnataka",
    products: ["black-pepper", "cardamom"],
    note: "The Malabar coast and the cardamom hills, source of the Tellicherry and Malabar pepper grades and green cardamom.",
  },
  {
    id: "turmeric-belts",
    name: "Erode, Salem and Nizamabad",
    area: "Tamil Nadu and Telangana",
    products: ["turmeric"],
    note: "India's principal turmeric markets, with Lakadong in Meghalaya supplying the high-curcumin grade.",
  },
  {
    id: "northern-plains",
    name: "Northern plains",
    area: "Punjab, Haryana and Uttar Pradesh",
    products: ["basmati-rice"],
    note: "The Basmati growing belt, for 1121, 1509 and the improved varieties.",
  },
  {
    id: "tea-gardens",
    name: "Assam, Darjeeling and the Nilgiris",
    area: "Assam, West Bengal and Tamil Nadu",
    products: ["tea"],
    note: "CTC strength from Assam, specialty orthodox from Darjeeling, aromatic black tea from the Nilgiris.",
  },
  {
    id: "southern-plantations",
    name: "Southern coffee plantations",
    area: "Karnataka, Kerala and Tamil Nadu",
    products: ["coffee"],
    note: "Arabica and Robusta estates, including the Malabar coast warehouses where Monsooned Malabar is produced.",
  },
  {
    id: "coastal-south",
    name: "Coastal south",
    area: "Tamil Nadu, Kerala and Andhra Pradesh",
    products: ["coconut", "cocopeat", "moringa"],
    note: "The coconut belt, supplying desiccated grades, oils and coir growing media, alongside moringa cultivation.",
  },
];

/** The four stages of the sourcing process shown on the traceability page. */
export interface SourcingStage {
  id: string;
  title: string;
  body: string;
  /** What the buyer receives or confirms at this stage. */
  outputs: string[];
}

export const sourcingStages: SourcingStage[] = [
  {
    id: "regions",
    title: "Sourcing regions",
    body: "Each requirement is sourced from the region best known for it, working with established producers and processors in that belt. Origin is stated at the specification stage, not discovered on the packing list.",
    outputs: ["Named producing region", "Crop year", "Processing location"],
  },
  {
    id: "specification",
    title: "Specification confirmation",
    body: "Grade, technical parameters, packaging, labelling and destination requirements are written down and confirmed in writing before any order is placed. Where a parameter cannot be met, that is said before the order, not after.",
    outputs: [
      "Written specification sheet",
      "Confirmed grade and forms",
      "Packaging and labelling agreed",
    ],
  },
  {
    id: "testing",
    title: "Testing and documentation",
    body: "Testing is arranged where the specification or the destination requires it, and the results are reported against the agreed parameters rather than as a generic pass. Export documentation is assembled per destination.",
    outputs: [
      "Certificate of Analysis for the shipped lot",
      "Phytosanitary and health certificates as applicable",
      "Certificate of origin and fumigation certificate",
    ],
  },
  {
    id: "packing",
    title: "Packaging and container coordination",
    body: "Pack format, palletisation and container loading are agreed before booking, so treatment requirements and wood packaging rules are settled ahead of the cut-off rather than at the port.",
    outputs: [
      "Agreed pack format and pallet configuration",
      "Container booking and loading plan",
      "Treatment certificates where required",
    ],
  },
];
