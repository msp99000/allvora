/**
 * FAQ content. PROJECT_BRIEF.md Section 5.11.
 *
 * `generalFaqs` is approved copy, used verbatim. Product and variety questions
 * are written to the same register and are flagged [generated, review] in
 * CONTENT_REVIEW.md. Answers never state an MOQ, a price or a certification
 * that is not in the data.
 */

import type { Product, Variety } from "./products";

export interface Faq {
  question: string;
  answer: string;
}

/** Section 5.11, verbatim. Reused across pages. */
export const generalFaqs: Faq[] = [
  {
    question: "What is your minimum order quantity?",
    answer:
      "MOQ depends on the product and packaging format. Share your requirement and we will confirm the workable minimum.",
  },
  {
    question: "Do you provide samples?",
    answer:
      "Yes, samples can be arranged for serious buyer inquiries; courier terms are confirmed per request.",
  },
  {
    question: "Which Incoterms do you quote?",
    answer: "FOB and CIF are standard; other terms on request.",
  },
  {
    question: "What documentation do you provide?",
    answer:
      "COA, phytosanitary certificate, certificate of origin, fumigation and health certificates as applicable to the product and destination.",
  },
  {
    question: "Can you do private label?",
    answer:
      "Yes, retail and private-label packaging are available depending on product and destination.",
  },
  {
    question: "How fast do you respond?",
    answer: "Within 24 hours to every complete inquiry.",
  },
];

/** Three to five questions per product page. Keyed by product slug. */
const productFaqMap: Record<string, Faq[]> = {
  "red-chilli": [
    {
      question: "How do I choose between a heat variety and a colour variety?",
      answer:
        "Pungency (SHU) and colour (ASTA) are separate parameters. Teja S17 and the Sannam grades are specified where heat leads. Byadagi and Kashmiri are specified where colour leads and heat must stay low. Tell us which parameter governs your product and we will propose the variety.",
    },
    {
      question: "Can you supply stemless chilli and powder from the same variety?",
      answer:
        "Yes. Most varieties are available whole, stemless and as powder, and several as flakes. The available forms for each variety are listed in the table above.",
    },
    {
      question: "Is aflatoxin tested before shipment?",
      answer:
        "Aflatoxin is a standard specification parameter for red chilli. State the limit your destination requires and testing is arranged so the result is on the Certificate of Analysis before the container ships.",
    },
    {
      question: "Do you supply to European pesticide residue limits?",
      answer:
        "Pesticide residue limits are agreed at the specification stage rather than checked afterwards. Share the MRL set that applies to your market and it becomes part of the confirmed specification.",
    },
  ],
  "black-pepper": [
    {
      question: "What is the difference between Tellicherry and Malabar grades?",
      answer:
        "Tellicherry grades (TGSEB, TGEB) are sorted on berry size, from 4.25 mm and above. Malabar Garbled grades (MG1, MG2) and the GL grades are sold on bulk density. Buyers who sell pepper whole usually specify Tellicherry; buyers who grind it usually specify Malabar or a GL grade.",
    },
    {
      question: "What does a GL grade mean?",
      answer:
        "GL refers to grams per litre of bulk density. 500 GL, 550 GL and 600 GL describe progressively denser, heavier pepper, which generally correlates with fuller berries and lower light-berry content.",
    },
    {
      question: "Is piperine content specified?",
      answer:
        "Yes. Piperine is a standard parameter alongside bulk density, moisture and foreign matter, and it is reported on the Certificate of Analysis.",
    },
  ],
  cardamom: [
    {
      question: "How is cardamom size graded?",
      answer:
        "Green cardamom is graded on pod diameter: 6 mm, 7 mm and 8 mm, with Bold, Extra Bold and Super Bold describing the larger, heavier pods. Larger grades are specified where pod appearance drives the sale.",
    },
    {
      question: "Is large cardamom the same product?",
      answer:
        "No. Large cardamom is a different spice with its own specification set, traded whole and as seeds, and it is listed separately in the table above.",
    },
    {
      question: "Can essential oil content be specified?",
      answer:
        "Yes. Essential oil content is a specification parameter for the premium size grades and is confirmed before shipment.",
    },
  ],
  turmeric: [
    {
      question: "Which origin has the highest curcumin?",
      answer:
        "Lakadong turmeric from Meghalaya is India's high-curcumin origin, and Alleppey Finger sits above the general commercial belts. Erode, Salem, Nizamabad, Duggirala and Sangli supply the commercial trade. State the curcumin level you need and we will propose the origin.",
    },
    {
      question: "Do you supply fingers as well as powder?",
      answer:
        "Yes. Every origin listed above is available as fingers and as powder. Buyers who grind in-market usually take fingers.",
    },
    {
      question: "Is curcumin content stated on the documentation?",
      answer:
        "Curcumin is a standard test parameter and is reported on the Certificate of Analysis for the shipped lot.",
    },
  ],
  moringa: [
    {
      question: "What moisture level is standard for moringa powder?",
      answer:
        "Food grade moringa powder is typically specified at 7 to 8 percent moisture. Tighter limits can be agreed where your process requires them.",
    },
    {
      question: "Do you supply certified organic moringa?",
      answer:
        "Certified organic leaf and powder are available. The certification held by the supplying processor is confirmed with the offer, and the certificate is supplied with the shipment.",
    },
    {
      question: "What is nutraceutical grade?",
      answer:
        "Nutraceutical grade is powder held to a tighter quality control set: heavy metals, pesticides, microbiology and nutritional profile are all tested. It is specified by supplement manufacturers rather than by food buyers.",
    },
  ],
  coconut: [
    {
      question: "What is the difference between coconut oil and virgin coconut oil?",
      answer:
        "Edible coconut oil is produced from dried copra. Virgin coconut oil is pressed from fresh kernel, which is why its free fatty acid and peroxide value are specified more tightly.",
    },
    {
      question: "Which desiccated coconut grade should I order?",
      answer:
        "Fine grade is used where the coconut is dispersed into a mix, such as bakery and confectionery. Medium grade is used where visible texture is wanted. Both are specified on moisture, fat, particle size and microbiology.",
    },
    {
      question: "Can you supply whole nuts as well as processed formats?",
      answer:
        "Yes. Fresh and semi-husked mature nuts are supplied alongside copra, desiccated grades, chips, flakes and oils. Whole nuts are specified on weight, size, maturity and defects.",
    },
  ],
  cocopeat: [
    {
      question: "What EC level should I specify?",
      answer:
        "EC requirements depend on the crop and the irrigation water. Washed and buffered grades are produced for low-salt requirements. Share your target EC and pH and we will confirm which grade meets it.",
    },
    {
      question: "How much does a 5 kg block expand?",
      answer:
        "Expansion volume is a specification parameter and is confirmed per production lot alongside compression ratio and moisture. State the expanded volume you need and it is written into the specification.",
    },
    {
      question: "What is buffered cocopeat?",
      answer:
        "Buffered cocopeat has been treated to stabilise its cation exchange behaviour, which reduces the nutrient lock-up growers otherwise see in the first weeks. It is specified for professional horticulture.",
    },
  ],
  "basmati-rice": [
    {
      question: "What is the difference between Raw, Steam, Sella and Golden Sella?",
      answer:
        "They are processing forms, not varieties. Raw is milled without heat treatment. Steam is soaked and steamed for a firmer grain. Sella is parboiled for firm, separate grains and low breakage. Golden Sella is parboiled to a deeper golden colour. Most varieties are available in several of these forms.",
    },
    {
      question: "Which variety gives the longest grain?",
      answer:
        "1121 and 1885 are the extra-long-grain varieties, at approximately 8.3 mm and above. 1509 and 1401 are long grain. Traditional Basmati is slender rather than longest, and is specified for aroma.",
    },
    {
      question: "Can crop year and ageing be specified?",
      answer:
        "Yes. Crop year, ageing, sortex level, broken percentage and admixture are all buyer-specifiable parameters and are confirmed before shipment.",
    },
    {
      question: "Do you supply retail packs and private label?",
      answer:
        "Yes. Bulk and retail formats are both available, and private-label packaging is arranged per order and destination.",
    },
  ],
  ghee: [
    {
      question: "What is the difference between A2 and bilona ghee?",
      answer:
        "A2 refers to the milk source, from cattle producing A2 beta-casein. Bilona refers to the process, culturing curd and churning it to butter before clarifying. A product can be one, the other or both, and each claim is documented separately.",
    },
    {
      question: "Do you supply ghee in bulk for manufacturing?",
      answer:
        "Yes. Industrial grade ghee is supplied in bulk for food manufacturing, specified on fat, free fatty acid, moisture and microbiological parameters.",
    },
    {
      question: "Is organic certification available?",
      answer:
        "Certified organic ghee is available. The certificate held by the supplying dairy is confirmed with the offer and supplied with the shipment.",
    },
  ],
  tea: [
    {
      question: "What is the difference between CTC and orthodox tea?",
      answer:
        "CTC (crush, tear, curl) produces small, uniform particles that brew strong and fast, which suits tea bags and milk tea. Orthodox tea keeps more of the leaf intact and is specified where aroma and liquor character lead.",
    },
    {
      question: "Can you supply tea bag grade material?",
      answer:
        "Yes. Fannings and dust are supplied specifically as tea bag grades, specified on particle size, liquor strength and colour.",
    },
    {
      question: "Do you offer private-label tea?",
      answer:
        "Private-label options are available for tea. Pack format, blend and label artwork are agreed before production.",
    },
  ],
  coffee: [
    {
      question: "What do plantation, parchment and cherry mean?",
      answer:
        "They describe processing. Plantation is washed Arabica. Parchment is washed Robusta. Cherry is naturally dry-processed. Each produces a different cup profile from the same growing region.",
    },
    {
      question: "What are AA, AB, PB and EB?",
      answer:
        "They are screen size grades. PB is peaberry, a single rounded bean. AA and EB are the larger bold screens. AB is the standard commercial screen. Larger screens generally command a premium and roast more evenly.",
    },
    {
      question: "What makes Monsooned Malabar different?",
      answer:
        "Monsooned Malabar is exposed to monsoon winds in open warehouses on the Malabar coast. The beans swell, pale in colour and lose acidity, which is the cup character roasters buy it for.",
    },
    {
      question: "Can samples be cupped before an order?",
      answer:
        "Yes. Samples can be arranged for serious inquiries so the lot can be cupped before the order is confirmed. Courier terms are agreed per request.",
    },
  ],
};

export function productFaqs(product: Product): Faq[] {
  return productFaqMap[product.slug] ?? generalFaqs.slice(0, 4);
}

/**
 * Variety questions written out where PROJECT_BRIEF.md Section 5.9 specifies
 * them. Keyed "productSlug/varietySlug".
 */
const varietyFaqMap: Record<string, Faq[]> = {
  "red-chilli/teja-s17": [
    {
      question: "What SHU range does Teja S17 offer?",
      answer:
        "Teja S17 is specified as a high-pungency chilli. The band for a given lot is confirmed by test before shipment and reported on the Certificate of Analysis, so it can be written into your contract specification.",
    },
    {
      question: "Is stemless Teja available in bulk?",
      answer:
        "Yes. Teja S17 is supplied whole, stemless, as powder and as flakes. Bulk pack format is agreed per order. Share your volume and destination and we will confirm the workable minimum.",
    },
    {
      question: "What documentation accompanies shipments to the EU?",
      answer:
        "European consignments are typically supported by a phytosanitary certificate, a certificate of origin and a Certificate of Analysis covering pesticide residue and aflatoxin against the limits that apply to your market. Requirements are confirmed per consignment.",
    },
  ],
  "basmati-rice/1121": [
    {
      question: "What broken percentage can be specified?",
      answer:
        "Broken percentage is a contract parameter rather than a fixed grade. State the maximum you accept, and it is confirmed against the lot before shipment with the result reported on the Certificate of Analysis.",
    },
    {
      question: "What packaging options are available?",
      answer:
        "1121 is supplied in bulk and in retail formats, including private-label packs. Pack size, material and label artwork are agreed at the specification stage, before production.",
    },
    {
      question: "Can crop year and ageing be specified?",
      answer:
        "Yes. Crop year, ageing and sortex level are buyer-specifiable for Basmati, alongside grain length, purity, admixture and elongation ratio. Include them with your enquiry so availability can be confirmed.",
    },
  ],
};

/**
 * Two to three questions for a variety page. Where no explicit set is written,
 * the questions are built from this variety's own row so that no two variety
 * pages carry the same answer text.
 */
export function varietyFaqs(product: Product, variety: Variety): Faq[] {
  const explicit = varietyFaqMap[`${product.slug}/${variety.slug}`];
  if (explicit) return explicit;

  const subject = variety.headingName;
  const forms = joinList(variety.forms);
  const specs = joinList(
    variety.specs.map((s) => s.charAt(0).toLowerCase() + s.slice(1))
  );

  return [
    {
      question: `Which forms of ${subject} do you supply?`,
      answer: `${subject} is supplied as ${forms}. Pack format is agreed per order, in bulk and, where the product allows it, in retail and private-label packaging.`,
    },
    {
      question: `What specifications can I set for ${subject}?`,
      answer: `The parameters buyers usually set for this grade are ${specs}. Beyond those, grade, size, purity, packaging and labelling can all be written into the specification and confirmed before shipment.`,
    },
    {
      question: `What documentation comes with a ${subject} shipment?`,
      answer:
        "A Certificate of Analysis for the shipped lot, plus phytosanitary certificate, certificate of origin, fumigation and health certificates as applicable to the destination.",
    },
  ];
}

function joinList(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0] as string;
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1] as string}`;
}
