/**
 * Imagery. PROJECT_BRIEF.md Section 3.3.
 *
 * No photography exists yet, so every entry has `src: null` and renders a
 * branded placeholder at the right aspect ratio. Alt text and the art-direction
 * brief are written now, so when a photo arrives the only change is setting
 * `src`. Nothing about the layout moves.
 *
 * Section 3.3 rules the art direction: macro texture shots of the actual
 * commodity, warm consistent grade, documentary sourcing imagery. No stock
 * handshakes, no globe clip art.
 *
 * The `brief` field is what to shoot. CONTENT_REVIEW.md lists them all.
 */

import type { CategorySlug } from "./categories";

/** Placeholder wash, so the four category cards do not read as identical. */
export type ImageTone = "spice" | "leaf" | "grain" | "deep";

export interface ImageAsset {
  /**
   * Path under /public, e.g. "/photography/red-chilli.jpg".
   * null renders the placeholder.
   */
  src: string | null;
  /** Describes the photograph, not the product. Written before the photo exists. */
  alt: string;
  /** Art direction for the shoot. */
  brief: string;
  tone: ImageTone;
}

export const categoryImages: Record<CategorySlug, ImageAsset> = {
  spices: {
    src: null,
    alt: "Whole dried Indian spices shown close, with red chilli, black peppercorns and turmeric fingers together.",
    brief: "Macro group shot: whole dried red chilli, black peppercorns, green cardamom pods and broken turmeric fingers on a neutral warm ground. Raked light to bring out skin and wrinkle texture.",
    tone: "spice",
  },
  "agri-natural": {
    src: null,
    alt: "Moringa leaf powder, desiccated coconut and a compressed cocopeat block shown together.",
    brief: "Macro group shot: bright green moringa powder, white desiccated coconut and the fibrous brown surface of a cocopeat block. The three colours carry the frame; keep the ground neutral.",
    tone: "leaf",
  },
  food: {
    src: null,
    alt: "Long-grain Indian Basmati rice beside a jar of clarified ghee.",
    brief: "Macro of extra-long-grain Basmati filling the frame, grains separated enough to read individual length, with warm ghee in shallow focus behind.",
    tone: "grain",
  },
  "tea-coffee": {
    src: null,
    alt: "Loose Indian black tea leaves beside unroasted green coffee beans.",
    brief: "Split macro: dark curled orthodox tea leaf on one side, pale green unroasted Arabica beans on the other. Same warm grade across both halves.",
    tone: "deep",
  },
};

/** Keyed by product slug. */
export const productImages: Record<string, ImageAsset> = {
  "red-chilli": {
    src: null,
    alt: "Whole dried red chillies shown close, with stems and wrinkled skin visible.",
    brief: "Macro of whole dried chilli filling the frame. Skin wrinkle and deep red colour are the subject. Shoot a stemless variant for the same product.",
    tone: "spice",
  },
  "black-pepper": {
    src: null,
    alt: "Whole black peppercorns shown close, showing berry size and surface texture.",
    brief: "Macro of whole black pepper. Berry size and the wrinkled surface are the subject, since buyers grade on size and density.",
    tone: "deep",
  },
  cardamom: {
    src: null,
    alt: "Whole green cardamom pods shown close, showing pod size and colour.",
    brief: "Macro of green cardamom pods, colour and pod size front and centre. A shallow ruler or scale reference would suit the grading story.",
    tone: "leaf",
  },
  turmeric: {
    src: null,
    alt: "Dried turmeric fingers beside ground turmeric powder.",
    brief: "Whole dried turmeric fingers with a small heap of ground powder alongside, so the two supplied forms read in one frame.",
    tone: "spice",
  },
  moringa: {
    src: null,
    alt: "Bright green moringa leaf powder beside dried moringa leaves.",
    brief: "Macro of moringa powder, colour is the whole point, with dried whole leaf alongside. Colour accuracy matters more than styling here.",
    tone: "leaf",
  },
  coconut: {
    src: null,
    alt: "Desiccated coconut, coconut chips and a mature coconut shown together.",
    brief: "Group shot across the chain: mature nut, copra, fine desiccated coconut, and oil in glass. White on warm ground.",
    tone: "grain",
  },
  cocopeat: {
    src: null,
    alt: "A compressed cocopeat block beside loose expanded coco growing medium.",
    brief: "Documentary rather than macro: a 5 kg compressed block next to the same material expanded loose, to show the compression ratio buyers ask about.",
    tone: "deep",
  },
  "basmati-rice": {
    src: null,
    alt: "Extra-long-grain Indian Basmati rice shown close, with individual grains separated.",
    brief: "Macro with grains separated enough to read individual length. Length is the parameter buyers specify, so the shot must support it.",
    tone: "grain",
  },
  ghee: {
    src: null,
    alt: "Golden clarified ghee in a glass jar, showing colour and texture.",
    brief: "Warm side light on ghee in clear glass, half set and half liquid if possible. Colour and grain are the subject.",
    tone: "spice",
  },
  tea: {
    src: null,
    alt: "Loose Indian black tea leaves shown close, showing leaf grade and colour.",
    brief: "Macro of dry leaf so grade reads: CTA granules and orthodox whole leaf shot the same way for comparison across variety pages.",
    tone: "deep",
  },
  coffee: {
    src: null,
    alt: "Unroasted green Indian coffee beans shown close, showing bean size and colour.",
    brief: "Macro of green (unroasted) beans, since Allvora supplies green beans. Bean size and uniformity are what buyers grade on.",
    tone: "leaf",
  },
};

/**
 * Optional per-variety overrides, keyed "productSlug/varietySlug". A variety
 * without one falls back to its product's photograph, and keeps that
 * photograph's alt text: describing a Sannam S4 photo as Teja S17 would be a
 * false statement in the accessibility layer.
 */
export const varietyImages: Record<string, ImageAsset> = {};

export function categoryImage(slug: CategorySlug): ImageAsset {
  return categoryImages[slug];
}

export function productImage(slug: string): ImageAsset | undefined {
  return productImages[slug];
}

export function varietyImage(
  productSlug: string,
  varietySlug: string
): ImageAsset | undefined {
  return varietyImages[`${productSlug}/${varietySlug}`] ?? productImages[productSlug];
}

/** Every image slot still awaiting a photograph, for CONTENT_REVIEW.md. */
export function pendingPhotography(): { key: string; brief: string }[] {
  const pending: { key: string; brief: string }[] = [];
  for (const [key, asset] of Object.entries(categoryImages)) {
    if (!asset.src) pending.push({ key: `category/${key}`, brief: asset.brief });
  }
  for (const [key, asset] of Object.entries(productImages)) {
    if (!asset.src) pending.push({ key: `product/${key}`, brief: asset.brief });
  }
  for (const [key, asset] of Object.entries(varietyImages)) {
    if (!asset.src) pending.push({ key: `variety/${key}`, brief: asset.brief });
  }
  return pending;
}
