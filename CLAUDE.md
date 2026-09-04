# CLAUDE.md

## Source of truth

`PROJECT_BRIEF.md` in this repo root is the master build document for the Allvora
Resources website. Read it before changing anything. Its content, sitemap and
copy win over any framework default or personal habit.

Two rules from that brief that are easy to break by accident:

1. All product facts come from `src/data/products.ts`. If a page needs a fact
   that is not in the data, add it to the data. Never inline a product fact in
   a page.
2. Never invent certifications, client names, testimonials, statistics, MOQs,
   prices, phone numbers or addresses. Placeholders use the `{{TOKEN}}` form and
   are listed in `CONTENT_REVIEW.md`.

## Copy rules

- No em dashes anywhere, in site copy or in project documents. Use commas,
  colons or parentheses.
- No emoji in site copy or UI.
- No exclamation marks. Sentence case for UI labels.
- Banned filler: "world-class", "cutting-edge", and similar.
- Buyer-facing vocabulary: grades, specifications, documentation.

## Stack decisions

| Decision | Choice | Note |
|---|---|---|
| Framework | Next.js 16 (App Router, RSC) | Brief asked for 15+; 16 was current at scaffold time |
| Styling | Tailwind CSS v4, CSS-variable theme | Tokens in `src/app/globals.css` under `@theme` |
| Components | shadcn/ui (new-york) on Radix, restyled | `components.json` present; primitives live in `src/components/ui` |
| Fonts | Libre Caslon Text (display), Archivo (body), IBM Plex Mono (specs) | via `next/font/google`, which self-hosts at build time |
| Forms | React Hook Form + Zod | `/api/rfq` route handler |
| Email | Resend, console fallback in dev | needs `RESEND_API_KEY` |
| Content | Typed data in `src/data`, MDX blog in `src/content/blog` | |
| Deploy | Vercel | |

Font note: the brief listed Zodiak and Sentient as display candidates. Both are
Fontshare fonts and are not distributable through `next/font/google`, so the
third listed candidate, Libre Caslon Text, was chosen to keep fonts self-hosted
with no third-party CDN request.

## Skills gap

The brief's Section 0 names four skills: `/frontend-design:frontend-design`,
`ui-ux-pro-max`, `shadcn` and `seo-for-claude`. None of them are installed in
this environment. Their principles, as summarized in Section 0 and Sections 3,
6 and 7, were applied by hand. If those skills are later installed, re-run the
design and SEO passes against Phase 3 and Phase 5.

## Layout of the code

- `src/data/` typed content: products, categories, markets, certifications,
  faqs, site config. Adding a variety here produces a page, a sitemap entry,
  metadata and JSON-LD with no page-level code change.
- `src/lib/seo.ts` every `generateMetadata` and every JSON-LD builder.
- `src/components/product/SpecTable.tsx` the Specification Ledger, the site's
  signature component. It must read as an export document, not a pricing table.
- `npm run routes` prints every route the data layer generates, with priority.

## Commands

```
npm run dev        # dev server
npm run build      # production build, must pass clean
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
npm run routes     # print all generated routes with P1/P2 priority
```
