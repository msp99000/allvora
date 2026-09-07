/**
 * Imagery. PROJECT_BRIEF.md Section 3.3.
 *
 * All 16 slots now carry a photograph. `src: null` on any entry falls back to a
 * branded placeholder at the same aspect ratio, so a slot can be emptied or a
 * new one added without touching a page.
 *
 * Alt text describes what each photograph actually shows, not what the shot
 * brief asked for, and never names a variety: a generic red chilli photograph
 * must not assert that it is Teja S17.
 *
 * Section 3.3 rules the art direction: macro texture shots of the actual
 * commodity, warm consistent grade, documentary sourcing imagery. No stock
 * handshakes, no globe clip art.
 *
 * The `brief` field records the art direction each image was made to, so a
 * replacement can be shot or generated to match the rest of the set.
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
  /**
   * 16px base64 JPEG, shown while the real image loads. About 1 KB each. The
   * hero is the page's largest contentful paint, so having something correct
   * painted immediately matters more here than the bytes cost.
   */
  blurDataURL?: string;
}

/** The full-bleed home hero. The single most important image on the site. */
export const heroImage: ImageAsset = {
  src: "/photography/hero.jpg",
  blurDataURL:
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEKADAAQAAAABAAAACQAAAAD/wAARCAAJABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwAMDAwMDAwUDAwUHRQUFB0nHR0dHScxJycnJycxOzExMTExMTs7Ozs7Ozs7R0dHR0dHU1NTU1NdXV1dXV1dXV1d/9sAQwEODw8YFhgoFhYoYUI2QmFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFh/90ABAAB/9oADAMBAAIRAxEAPwDziMxrK6SkgFSuevNdn4dlttNm3ltxfAyP94H8uK4mbt9P610Gh/8AHxB/vf1rKRcbH//Z",
  alt: "Open jute sacks of dried spices lined along the wall of an Indian warehouse, daylight falling through a doorway.",
  brief: "Wide, cinematic, slightly elevated: open jute sacks of dried red chilli and turmeric in a warehouse or mandi, natural side light from a doorway, dust in the air. Must have empty darker space on the left third for the headline to sit over. Documentary rather than styled.",
  tone: "deep",
};

export const categoryImages: Record<CategorySlug, ImageAsset> = {
  spices: {
    src: "/photography/spices.jpg",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEKADAAQAAAABAAAACQAAAAD/wAARCAAJABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwAMDAwMDAwUDAwUHRQUFB0nHR0dHScxJycnJycxOzExMTExMTs7Ozs7Ozs7R0dHR0dHU1NTU1NdXV1dXV1dXV1d/9sAQwEODw8YFhgoFhYoYUI2QmFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFh/90ABAAB/9oADAMBAAIRAxEAPwDjZrhMBVHOMmm3v2PZmH72R/Kqrfequ/Ss+XzNHLyP/9k=",
    alt:
      "Dried red chillies, black peppercorns, green cardamom pods and turmeric fingers laid in rows on dark wood.",
    brief: "Macro group shot: whole dried red chilli, black peppercorns, green cardamom pods and broken turmeric fingers on a neutral warm ground. Raked light to bring out skin and wrinkle texture.",
    tone: "spice",
  },
  "agri-natural": {
    src: "/photography/agri-natural.jpg",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEKADAAQAAAABAAAACQAAAAD/wAARCAAJABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwAMDAwMDAwUDAwUHRQUFB0nHR0dHScxJycnJycxOzExMTExMTs7Ozs7Ozs7R0dHR0dHU1NTU1NdXV1dXV1dXV1d/9sAQwEODw8YFhgoFhYoYUI2QmFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFh/90ABAAB/9oADAMBAAIRAxEAPwDkNP8A7OO37Xu4YZwcZH9KtXctnHfyR2BJhBG0nntzz9a59anTt9anl8x3P//Z",
    alt: "Heaps of green moringa powder, white desiccated coconut and brown coconut coir on a dark slate surface.",
    brief: "Macro group shot: bright green moringa powder, white desiccated coconut and the fibrous brown surface of a cocopeat block. The three colours carry the frame; keep the ground neutral.",
    tone: "leaf",
  },
  food: {
    src: "/photography/food.jpg",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEKADAAQAAAABAAAACQAAAAD/wAARCAAJABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwAMDAwMDAwUDAwUHRQUFB0nHR0dHScxJycnJycxOzExMTExMTs7Ozs7Ozs7R0dHR0dHU1NTU1NdXV1dXV1dXV1d/9sAQwEODw8YFhgoFhYoYUI2QmFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFh/90ABAAB/9oADAMBAAIRAxEAPwDOtBYiMCKV0z97GOcfUYroraXTo0IDEseS3HP1wAK4PTPvfjVu3/4+R9T/ADrCUNbmsZaH/9k=",
    alt:
      "Long-grain Basmati rice spread beside a brass bowl of golden ghee.",
    brief: "Macro of extra-long-grain Basmati filling the frame, grains separated enough to read individual length, with warm ghee in shallow focus behind.",
    tone: "grain",
  },
  "tea-coffee": {
    src: "/photography/tea-coffee.jpg",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEKADAAQAAAABAAAACQAAAAD/wAARCAAJABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwAMDAwMDAwUDAwUHRQUFB0nHR0dHScxJycnJycxOzExMTExMTs7Ozs7Ozs7R0dHR0dHU1NTU1NdXV1dXV1dXV1d/9sAQwEODw8YFhgoFhYoYUI2QmFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFh/90ABAAB/9oADAMBAAIRAxEAPwDg5X3yEnnmurmEZjIfHI59K409a62Xqfr/AIVhU6GkT//Z",
    alt: "Dark curled black tea leaves on one side and pale green unroasted coffee beans on the other.",
    brief: "Split macro: dark curled orthodox tea leaf on one side, pale green unroasted Arabica beans on the other. Same warm grade across both halves.",
    tone: "deep",
  },
};

/** Keyed by product slug. */
export const productImages: Record<string, ImageAsset> = {
  "red-chilli": {
    src: "/photography/red-chilli.jpg",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEKADAAQAAAABAAAADAAAAAD/wAARCAAMABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwAMDAwMDAwUDAwUHRQUFB0nHR0dHScxJycnJycxOzExMTExMTs7Ozs7Ozs7R0dHR0dHU1NTU1NdXV1dXV1dXV1d/9sAQwEODw8YFhgoFhYoYUI2QmFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFh/90ABAAB/9oADAMBAAIRAxEAPwDkNtusSmP1+ZsZAHbIpkrICBIiruxgqcg+9Voy4mKqzAjeMg84AzVVWMqs7cFsZxwOTzxWNmdt422P/9k=",
    alt: "Whole dried red chillies with stems attached, shown close with their wrinkled skin in relief.",
    brief: "Macro of whole dried chilli filling the frame. Skin wrinkle and deep red colour are the subject. Shoot a stemless variant for the same product.",
    tone: "spice",
  },
  "black-pepper": {
    src: "/photography/black-pepper.jpg",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEKADAAQAAAABAAAADAAAAAD/wAARCAAMABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwAMDAwMDAwUDAwUHRQUFB0nHR0dHScxJycnJycxOzExMTExMTs7Ozs7Ozs7R0dHR0dHU1NTU1NdXV1dXV1dXV1d/9sAQwEODw8YFhgoFhYoYUI2QmFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFh/90ABAAB/9oADAMBAAIRAxEAPwDhVtIs/MTU6QwKCdmfrUawgkHcw/E1ajt49245PsScVFi7n//Z",
    alt: "Whole black peppercorns shown close, filling the frame, with their wrinkled surface visible.",
    brief: "Macro of whole black pepper. Berry size and the wrinkled surface are the subject, since buyers grade on size and density.",
    tone: "deep",
  },
  cardamom: {
    src: "/photography/cardamom.jpg",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEKADAAQAAAABAAAADAAAAAD/wAARCAAMABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwAMDAwMDAwUDAwUHRQUFB0nHR0dHScxJycnJycxOzExMTExMTs7Ozs7Ozs7R0dHR0dHU1NTU1NdXV1dXV1dXV1d/9sAQwEODw8YFhgoFhYoYUI2QmFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFh/90ABAAB/9oADAMBAAIRAxEAPwCrPFCIDI3AQ47c8j8D/jWc7xz7+hIGRv6Dnt/jinyu4KFmZsQeZyT1Jx2xxSXZ8qURoMKAf0GevWvP66ln/9k=",
    alt:
      "Whole green cardamom pods shown close, one split open to reveal the dark seeds inside.",
    brief: "Macro of green cardamom pods, colour and pod size front and centre. A shallow ruler or scale reference would suit the grading story.",
    tone: "leaf",
  },
  turmeric: {
    src: "/photography/turmeric.jpg",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEKADAAQAAAABAAAADAAAAAD/wAARCAAMABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwAMDAwMDAwUDAwUHRQUFB0nHR0dHScxJycnJycxOzExMTExMTs7Ozs7Ozs7R0dHR0dHU1NTU1NdXV1dXV1dXV1d/9sAQwEODw8YFhgoFhYoYUI2QmFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFh/90ABAAB/9oADAMBAAIRAxEAPwDz+ztUuZAjOFyenerkumIAzxEsinG7sfx/+tWUp5FXxPLsCZ+X0rKSle6ZrFxtZo//2Q==",
    alt:
      "Whole dried turmeric fingers beside a heap of ground turmeric powder.",
    brief: "Whole dried turmeric fingers with a small heap of ground powder alongside, so the two supplied forms read in one frame.",
    tone: "spice",
  },
  moringa: {
    src: "/photography/moringa.jpg",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEKADAAQAAAABAAAADAAAAAD/wAARCAAMABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwAMDAwMDAwUDAwUHRQUFB0nHR0dHScxJycnJycxOzExMTExMTs7Ozs7Ozs7R0dHR0dHU1NTU1NdXV1dXV1dXV1d/9sAQwEODw8YFhgoFhYoYUI2QmFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFh/90ABAAB/9oADAMBAAIRAxEAPwDlNOs7aVQ02WycEA4xWz9itoWzCSQDj5u9cpbyOh+U4rat5pGILHNRyy5r3Ef/2Q==",
    alt:
      "Bright green moringa leaf powder heaped beside dried whole moringa leaves.",
    brief: "Macro of moringa powder, colour is the whole point, with dried whole leaf alongside. Colour accuracy matters more than styling here.",
    tone: "leaf",
  },
  coconut: {
    src: "/photography/coconut.jpg",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEKADAAQAAAABAAAADAAAAAD/wAARCAAMABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwAMDAwMDAwUDAwUHRQUFB0nHR0dHScxJycnJycxOzExMTExMTs7Ozs7Ozs7R0dHR0dHU1NTU1NdXV1dXV1dXV1d/9sAQwEODw8YFhgoFhYoYUI2QmFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFh/90ABAAB/9oADAMBAAIRAxEAPwDkLXSGEaXkwDxE4KKcuev8I5x61Qnt5NrTiPagPTpjnHStG0v7nT3aS1baXG1uM5BrNkuZpdwdiQxyR2rNbmj2sf/Z",
    alt:
      "A whole mature coconut, a piece of white copra, desiccated coconut and a jar of coconut oil.",
    brief: "Group shot across the chain: mature nut, copra, fine desiccated coconut, and oil in glass. White on warm ground.",
    tone: "grain",
  },
  cocopeat: {
    src: "/photography/cocopeat.jpg",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEKADAAQAAAABAAAADAAAAAD/wAARCAAMABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwAMDAwMDAwUDAwUHRQUFB0nHR0dHScxJycnJycxOzExMTExMTs7Ozs7Ozs7R0dHR0dHU1NTU1NdXV1dXV1dXV1d/9sAQwEODw8YFhgoFhYoYUI2QmFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFh/90ABAAB/9oADAMBAAIRAxEAPwBseqafGrKCCFzkd+PaptM1iC+n8kR7MjK856evFWUSMEfIv5VYjjij+ZEUH1ArKzNLrsf/2Q==",
    alt:
      "A compressed cocopeat block beside the same material expanded loose, showing the difference in volume.",
    brief: "Documentary rather than macro: a 5 kg compressed block next to the same material expanded loose, to show the compression ratio buyers ask about.",
    tone: "deep",
  },
  "basmati-rice": {
    src: "/photography/basmati-rice.jpg",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEKADAAQAAAABAAAADAAAAAD/wAARCAAMABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwAMDAwMDAwUDAwUHRQUFB0nHR0dHScxJycnJycxOzExMTExMTs7Ozs7Ozs7R0dHR0dHU1NTU1NdXV1dXV1dXV1d/9sAQwEODw8YFhgoFhYoYUI2QmFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFh/90ABAAB/9oADAMBAAIRAxEAPwC/JLEVwyhj78isK/sbS4UlUCHHDLxz9OmKw01G7iUbXyB2NUrnUryYbWfAHYcViou5q2j/2Q==",
    alt: "Raw extra-long-grain Basmati rice spread in a single layer so individual grain length is visible.",
    brief: "Macro with grains separated enough to read individual length. Length is the parameter buyers specify, so the shot must support it.",
    tone: "grain",
  },
  ghee: {
    src: "/photography/ghee.jpg",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEKADAAQAAAABAAAADAAAAAD/wAARCAAMABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwAMDAwMDAwUDAwUHRQUFB0nHR0dHScxJycnJycxOzExMTExMTs7Ozs7Ozs7R0dHR0dHU1NTU1NdXV1dXV1dXV1d/9sAQwEODw8YFhgoFhYoYUI2QmFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFh/90ABAAB/9oADAMBAAIRAxEAPwDhdOgFzN5QUsdpOF68CpbuJIpdigr8oOCcnOKjtJ5YJd8J2tgjI9xUTTSg5DH86x15vI00sf/Z",
    alt:
      "A glass jar of golden ghee lit from the side, part set and part liquid.",
    brief: "Warm side light on ghee in clear glass, half set and half liquid if possible. Colour and grain are the subject.",
    tone: "spice",
  },
  tea: {
    src: "/photography/tea.jpg",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEKADAAQAAAABAAAADAAAAAD/wAARCAAMABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwAMDAwMDAwUDAwUHRQUFB0nHR0dHScxJycnJycxOzExMTExMTs7Ozs7Ozs7R0dHR0dHU1NTU1NdXV1dXV1dXV1d/9sAQwEODw8YFhgoFhYoYUI2QmFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFh/90ABAAB/9oADAMBAAIRAxEAPwDj5bh7lzLMd2T09Kqu+FLL/wDrptzm3mKxnjjrVVpHkcKx4NRYq5//2Q==",
    alt:
      "Dry curled orthodox black tea leaves shown close, filling the frame.",
    brief: "Macro of dry leaf so grade reads: CTA granules and orthodox whole leaf shot the same way for comparison across variety pages.",
    tone: "deep",
  },
  coffee: {
    src: "/photography/coffee.jpg",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEKADAAQAAAABAAAADAAAAAD/wAARCAAMABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwAMDAwMDAwUDAwUHRQUFB0nHR0dHScxJycnJycxOzExMTExMTs7Ozs7Ozs7R0dHR0dHU1NTU1NdXV1dXV1dXV1d/9sAQwEODw8YFhgoFhYoYUI2QmFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFh/90ABAAB/9oADAMBAAIRAxEAPwDPt1WJAqAAD/PNOdgBtPQjp7VmRTOVh4Hzjn8qnuHdLcODycj6Y9K5upof/9k=",
    alt:
      "Raw unroasted green coffee beans shown close, each with its centre crease visible.",
    brief: "Macro of green (unroasted) beans, since Allvora supplies green beans. Bean size and uniformity are what buyers grade on.",
    tone: "leaf",
  },
};

/**
 * Images for the pages outside the product tree. Same contract: null renders a
 * branded placeholder at the right ratio, so a page is never broken by a
 * missing file.
 */
export const pageImages: Record<string, ImageAsset> = {
  about: {
    src: "/photography/pages/about.jpg",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEKADAAQAAAABAAAADAAAAAD/wAARCAAMABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwAMDAwMDAwUDAwUHRQUFB0nHR0dHScxJycnJycxOzExMTExMTs7Ozs7Ozs7R0dHR0dHU1NTU1NdXV1dXV1dXV1d/9sAQwEODw8YFhgoFhYoYUI2QmFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFh/90ABAAB/9oADAMBAAIRAxEAPwB1v4tZABJArH2JH+NXF8ZuPuwxjnuTXm0haN9ik4GackztEztyVwB+NYWe51Wj2P/Z",
    alt: "Harvested crop drying in the sun on an Indian farm, shot wide in late afternoon light.",
    brief: "Wide documentary landscape: red chillies or turmeric spread to dry on a drying yard in rural India, late golden light, low horizon, no faces. Establishes the supply base.",
    tone: "spice",
  },
  sourcing: {
    src: "/photography/pages/sourcing.jpg",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEKADAAQAAAABAAAADAAAAAD/wAARCAAMABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwAMDAwMDAwUDAwUHRQUFB0nHR0dHScxJycnJycxOzExMTExMTs7Ozs7Ozs7R0dHR0dHU1NTU1NdXV1dXV1dXV1d/9sAQwEODw8YFhgoFhYoYUI2QmFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFh/90ABAAB/9oADAMBAAIRAxEAPwDMOpsEiuAqN5Q+Ujb07ZGPzzTBrZzJPsRWkB3EgY/DiubsmaW5s4WPylgDj8qsauot7yeCMnap4z9KrmdrkcqvY//Z",
    alt: "Jute sacks of graded spices stacked in a sorting warehouse.",
    brief: "Documentary interior: rows of filled and labelled jute sacks in a grading or sorting shed, weighing scale visible, cool daylight from high windows. Process rather than product.",
    tone: "deep",
  },
  quality: {
    src: "/photography/pages/quality.jpg",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEKADAAQAAAABAAAADAAAAAD/wAARCAAMABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwAMDAwMDAwUDAwUHRQUFB0nHR0dHScxJycnJycxOzExMTExMTs7Ozs7Ozs7R0dHR0dHU1NTU1NdXV1dXV1dXV1d/9sAQwEODw8YFhgoFhYoYUI2QmFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFh/90ABAAB/9oADAMBAAIRAxEAPwDVt9RunAPkrAp+7u5Jx2AFaV0l1dKr2ro20EMpbAOR16HkVRuraC6jKzoDsJKnoQSByK4+S+uk1NLJXPl78HnJb6k1ViD/2Q==",
    alt: "A spice sample being weighed and examined against a specification sheet in a testing lab.",
    brief: "Close documentary: a small sample of ground spice on a laboratory balance beside a printed specification sheet and a sample jar, clinical daylight. Reads as testing, not cooking.",
    tone: "leaf",
  },
  packaging: {
    src: "/photography/pages/packaging.jpg",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEKADAAQAAAABAAAADAAAAAD/wAARCAAMABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwAMDAwMDAwUDAwUHRQUFB0nHR0dHScxJycnJycxOzExMTExMTs7Ozs7Ozs7R0dHR0dHU1NTU1NdXV1dXV1dXV1d/9sAQwEODw8YFhgoFhYoYUI2QmFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFh/90ABAAB/9oADAMBAAIRAxEAPwCHSbmC5lKY4xkVozNDIrKpBI6gHOKp2mn2y/MgKE/3SRWmLSBWaTGWbGcnristbmmlj//Z",
    alt: "Bulk export sacks beside retail-size pouches of the same product.",
    brief: "A 25 kg export bag standing beside small retail pouches and a carton of the same product, plain unbranded packaging, neutral documentary light. Shows the bulk to retail range in one frame.",
    tone: "grain",
  },
  markets: {
    src: "/photography/pages/markets.jpg",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEKADAAQAAAABAAAACQAAAAD/wAARCAAJABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwAMDAwMDAwUDAwUHRQUFB0nHR0dHScxJycnJycxOzExMTExMTs7Ozs7Ozs7R0dHR0dHU1NTU1NdXV1dXV1dXV1d/9sAQwEODw8YFhgoFhYoYUI2QmFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFh/90ABAAB/9oADAMBAAIRAxEAPwDl7fXUTAMX6/8A1q0otegEmyRNyY6k4OfyrhKWqbbJSSP/2Q==",
    alt: "Stacked shipping containers at an Indian port, seen from the dockside.",
    brief: "Wide dockside view of stacked shipping containers and a gantry crane at an Indian container port, early morning haze, no readable shipping line branding.",
    tone: "deep",
  },
  contact: {
    src: "/photography/pages/contact.jpg",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEKADAAQAAAABAAAADAAAAAD/wAARCAAMABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwAMDAwMDAwUDAwUHRQUFB0nHR0dHScxJycnJycxOzExMTExMTs7Ozs7Ozs7R0dHR0dHU1NTU1NdXV1dXV1dXV1d/9sAQwEODw8YFhgoFhYoYUI2QmFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFh/90ABAAB/9oADAMBAAIRAxEAPwDiNJtbO4vFW/LiDBLeWMt6DgZ79aXV7S0tr6SKxLmEAbfMGGPrxxx6U/R7iW3vkkiOGAxRrdxLcX7yynLEDJ/Cpu72HZWP/9k=",
    alt: "The doorway of an Indian spice warehouse, open to the loading yard.",
    brief: "The open doorway of a warehouse seen from inside, bright loading yard beyond, sacks stacked either side. Warm and human without showing faces.",
    tone: "spice",
  },
  "blog/1121-vs-1509-basmati": {
    src: "/photography/pages/blog-1121-vs-1509.jpg",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEKADAAQAAAABAAAACQAAAAD/wAARCAAJABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwAMDAwMDAwUDAwUHRQUFB0nHR0dHScxJycnJycxOzExMTExMTs7Ozs7Ozs7R0dHR0dHU1NTU1NdXV1dXV1dXV1d/9sAQwEODw8YFhgoFhYoYUI2QmFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFh/90ABAAB/9oADAMBAAIRAxEAPwDDtV0P+xyZR/pG0ktnkN6YpLxND/slTCP3+0Hdnkt6Yrke9IetTy+Y7n//2Q==",
    alt: "Two piles of long-grain Basmati rice side by side for comparison.",
    brief: "Overhead macro: two neat piles of raw long-grain Basmati side by side on dark slate, a fine line between them, subtly different grain lengths.",
    tone: "grain",
  },
  "blog/black-pepper-grades-explained": {
    src: "/photography/pages/blog-pepper-grades.jpg",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEKADAAQAAAABAAAACQAAAAD/wAARCAAJABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwAMDAwMDAwUDAwUHRQUFB0nHR0dHScxJycnJycxOzExMTExMTs7Ozs7Ozs7R0dHR0dHU1NTU1NdXV1dXV1dXV1d/9sAQwEODw8YFhgoFhYoYUI2QmFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFh/90ABAAB/9oADAMBAAIRAxEAPwDlri9Yu42ZA6H1NZc8isDwc9qmbvVKWpHc/9k=",
    alt: "Black peppercorns separated into grade lots by berry size.",
    brief: "Overhead macro: black peppercorns divided into three or four small separated lots of visibly different berry size, on dark slate.",
    tone: "deep",
  },
  "blog/how-to-verify-an-indian-exporter": {
    src: "/photography/pages/blog-verify-exporter.jpg",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEKADAAQAAAABAAAACQAAAAD/wAARCAAJABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwAMDAwMDAwUDAwUHRQUFB0nHR0dHScxJycnJycxOzExMTExMTs7Ozs7Ozs7R0dHR0dHU1NTU1NdXV1dXV1dXV1d/9sAQwEODw8YFhgoFhYoYUI2QmFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFh/90ABAAB/9oADAMBAAIRAxEAPwDA8Ptp6z7L5BhvuuTgA+h+vaukm1DT7dT9skR4DuzDjcnXjacZJ+nA9a4OL/VVV1T/AI+f+AisI6uxtLRXP//Z",
    alt: "Export documents, a rubber stamp and an ink pad on a desk.",
    brief: "Close documentary still life: stacked export paperwork, a rubber stamp and ink pad, a pen, on a worn wooden desk. No readable text on the documents.",
    tone: "grain",
  },
};

export function pageImage(key: string): ImageAsset | undefined {
  return pageImages[key];
}

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
  if (!heroImage.src) pending.push({ key: "hero", brief: heroImage.brief });
  for (const [key, asset] of Object.entries(categoryImages)) {
    if (!asset.src) pending.push({ key: `category/${key}`, brief: asset.brief });
  }
  for (const [key, asset] of Object.entries(productImages)) {
    if (!asset.src) pending.push({ key: `product/${key}`, brief: asset.brief });
  }
  for (const [key, asset] of Object.entries(varietyImages)) {
    if (!asset.src) pending.push({ key: `variety/${key}`, brief: asset.brief });
  }
  for (const [key, asset] of Object.entries(pageImages)) {
    if (!asset.src) pending.push({ key: `page/${key}`, brief: asset.brief });
  }
  return pending;
}
