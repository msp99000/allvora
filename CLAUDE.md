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

## Design and SEO skills

The brief's Section 0 names four skills. Three are now installed and have been
run against the built site:

| Skill | Run at | What it changed |
|---|---|---|
| `frontend-design:frontend-design` | post-launch polish | Removed decorative numbering where content is not a sequence; consolidated 26 ad-hoc font sizes into a fluid modular scale |
| `ui-ux-pro-max:ui-ux-pro-max` | post-launch polish | Found two WCAG 2.2 AA gaps (focus obscured by the sticky header, sub-24px link targets) and the missing RFQ error summary |
| `claude-seo:seo-schema` | post-launch polish | Validated all emitted JSON-LD: 0 errors across 14 pages |

`shadcn` is still not installed; its primitives were hand-written from the
published component APIs and restyled to the tokens.

Two things worth knowing before re-running the design skills:

1. `frontend-design` flags several traits as generic AI-design tells that this
   brief *explicitly mandates*: warm ivory ground, high-contrast display serif,
   hairline rules, mono for data labels, all-caps eyebrows, middle-dot meta
   strings. The skill's own precedence rule settles it: "Where the brief pins
   down a visual direction, follow it exactly, the brief's own words always
   win." Those stay. What was changed is the axes the brief left free, where a
   default had been taken without a reason.
2. `claude-seo:seo-schema` records that Google retired FAQ rich results for all
   sites on 7 May 2026. The site still emits FAQPage, per the skill's own
   guidance to keep it rather than remove it: it no longer earns a Google rich
   result, but it remains useful to other consumers. Section 7.2 of the brief
   requires it.

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

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
