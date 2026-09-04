/**
 * Blog post metadata. PROJECT_BRIEF.md Section 5.10.
 *
 * The body of each post lives in src/content/blog/<slug>.mdx. Post copy is
 * drafted by Claude Code and is flagged [generated, review] in
 * CONTENT_REVIEW.md.
 */

export interface BlogPost {
  slug: string;
  title: string;
  /** Deck shown under the title and used as the meta description. */
  excerpt: string;
  /** ISO date. */
  published: string;
  /** Reading time in minutes, rounded. */
  readingMinutes: number;
  seoTitle: string;
  seoDescription: string;
  /** Product slugs the post discusses, for internal linking. */
  relatedProducts: string[];
  /** "productSlug/varietySlug" pairs the post discusses. */
  relatedVarieties: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "1121-vs-1509-basmati",
    title: "1121 vs 1509 Basmati: which should you import?",
    excerpt:
      "Both are long-grain Indian Basmati and both ship in Raw, Steam and Sella. The difference that matters to an importer is grain length against landed cost, and which one your market will actually pay for.",
    published: "2026-01-14",
    readingMinutes: 6,
    seoTitle: "1121 vs 1509 Basmati Rice: Which Should You Import?",
    seoDescription:
      "A buyer's comparison of 1121 and 1509 Basmati rice: grain length, elongation, processing forms, broken percentage and which market each variety suits.",
    relatedProducts: ["basmati-rice"],
    relatedVarieties: ["basmati-rice/1121", "basmati-rice/1509"],
  },
  {
    slug: "black-pepper-grades-explained",
    title: "Black pepper grades explained: TGSEB, TGEB, MG1 and GL grades",
    excerpt:
      "Indian black pepper is graded two different ways at once, by screen size and by bulk density. Knowing which system your supplier is quoting in is the difference between comparing offers and guessing.",
    published: "2026-01-28",
    readingMinutes: 7,
    seoTitle: "Black Pepper Grades Explained: TGSEB, TGEB, MG1 and GL",
    seoDescription:
      "What TGSEB, TGEB, MG1, MG2 and the 500 to 600 GL grades of Indian black pepper mean, how screen size and bulk density differ, and how to specify each one.",
    relatedProducts: ["black-pepper"],
    relatedVarieties: ["black-pepper/tgseb", "black-pepper/tgeb", "black-pepper/mg1"],
  },
  {
    slug: "how-to-verify-an-indian-exporter",
    title: "How to verify an Indian exporter: APEDA, Spices Board, FSSAI and IEC",
    excerpt:
      "Four registrations tell you whether an Indian supplier is legally able to ship what they are offering. Here is what each one covers, what it does not, and what to ask for before you send a deposit.",
    published: "2026-02-11",
    readingMinutes: 8,
    seoTitle: "How to Verify an Indian Exporter: APEDA, FSSAI, IEC",
    seoDescription:
      "How to check an Indian food and spice exporter: what APEDA, Spices Board, FSSAI and IEC registrations cover, how to verify them, and what documents to request.",
    relatedProducts: [],
    relatedVarieties: [],
  },
];

const postBySlug = new Map(blogPosts.map((p) => [p.slug, p]));

export function getPost(slug: string): BlogPost | undefined {
  return postBySlug.get(slug);
}

export const postsNewestFirst = [...blogPosts].sort((a, b) =>
  b.published.localeCompare(a.published)
);
