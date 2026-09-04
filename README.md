# Allvora Resources

B2B lead-generation website for Allvora Resources, an India-based export and
sourcing company supplying agricultural, food, natural and processed products to
international buyers.

Inquiry driven: no cart, no checkout, no prices. The conversion is the RFQ form.

**Read `CONTENT_REVIEW.md` before launch.** Contact details, certifications and
the logo are placeholders today.

## Stack

Next.js 16 (App Router, React Server Components), TypeScript strict, Tailwind
CSS v4, shadcn/ui on Radix, React Hook Form with Zod, MDX for blog posts,
Resend for RFQ email, deployed to Vercel.

`PROJECT_BRIEF.md` is the master specification. `CLAUDE.md` records the
decisions and the copy rules.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

| Command | What it does |
|---|---|
| `npm run dev` | dev server |
| `npm run build` | production build, must pass clean |
| `npm run start` | serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | eslint |
| `npm run routes` | print every route the data layer generates, with P1/P2 priority |
| `npm run routes -- --pending` | just the routes held back from launch |
| `npm run audit:seo -- <url>` | crawl a running build and verify the Section 7 SEO contract |

Two dev-only routes, both `noindex` and excluded from the sitemap:

- `/dev/styleguide` every design token and component on one page.
- `/dev/responsive?path=/products/spices&w=360,768,1280` renders any route in
  fixed-width iframes. Headless Chrome clamps its window to 500px, so this is
  the only reliable way to check a 360px layout.

## Environment variables

Create `.env.local` for development and set the same keys in the Vercel project.

```bash
# RFQ email delivery. Without all three, /api/rfq logs the enquiry to the
# server console and still returns success, so the form is testable locally.
RESEND_API_KEY=re_xxxxxxxxxxxx
RFQ_TO_EMAIL=sales@allvora.com        # where enquiries land
RFQ_FROM_EMAIL=website@allvora.com    # must be a domain verified in Resend

# Optional. Set to false to hide certifications that are not yet confirmed
# instead of showing them with a "pending" marker.
NEXT_PUBLIC_SHOW_UNCONFIRMED_CERTS=false
```

To set up Resend: create an account, verify the sending domain, create an API
key, then add the three variables above to Vercel for Production, Preview and
Development. No code change is needed.

## How the content works

Everything the site says about a product comes from `src/data/`. Pages read the
data; they never hold product facts. Adding a variety produces a page, a sitemap
entry, metadata, JSON-LD and internal links with no page-level code change.

```
src/data/
├── products.ts        11 products, 86 varieties. The source of truth.
├── categories.ts      the 4 product lines
├── markets.ts         7 regions
├── certifications.ts  registrations and export documents
├── sourcing.ts        producing regions and the sourcing process
├── faqs.ts            general, product and variety questions
├── blog.ts            post metadata (bodies are MDX)
└── site.ts            company identity and contact channels
```

`src/lib/routes.ts` is the shared route manifest. The sitemap, the launch policy
and `npm run routes` all read from it.

`src/lib/seo.ts` builds every page's metadata and every JSON-LD block. No page
writes its own structured data.

### Add a variety

1. Open `src/data/products.ts` and find the product.
2. Add an entry to its `varieties` array:

```ts
{
  slug: "byadagi-dabbi",
  name: "Byadagi Dabbi",
  // Subject for the H1 and SEO title. Usually "<name> <product name>", but set
  // it explicitly when the name already carries the product noun, as in
  // "Virgin Coconut Oil".
  headingName: "Byadagi Dabbi Red Chilli",
  gradeType: "Premium colour grade",
  specs: ["ASTA colour", "pod size", "moisture", "foreign matter"],
  forms: ["Whole", "Powder"],
  priority: "P1",
  seoTitle: "Byadagi Dabbi Red Chilli Exporter & Supplier from India",
  seoDescription: "…150 to 160 characters…",
  intro: "Two to three sentences: what it is, what it is known for, who buys it.",
}
```

3. `npm run routes` to confirm the new route appears.
4. `npm run build`, then `npm run audit:seo -- http://localhost:3000` against a
   running build to check the title, description and structured data.

A `P1` variety gets its own page. A `P2` variety appears in the product's
Specification Ledger but has no page, and its URL returns 404. That is the
launch policy: 59 varieties have no intro copy yet, and shipping them as
near-identical pages would be the doorway-page pattern the brief rules out. To
release them all at once, write their intros and set `LAUNCH_P2_VARIETIES = true`
in `src/lib/routes.ts`.

A variety page needs `intro` to be worth publishing. `seoTitle` should stay at or
under 60 characters before the brand suffix; `seoDescription` should land between
150 and 160. `npm run audit:seo` checks both.

### Add a market

Add an entry to `markets` in `src/data/markets.ts`. Every field is required
except nothing: `h1`, `intro`, `buyerProfile`, `focusProducts` (product slugs),
`focusCategories`, `requirements`, `seoTitle` and `seoDescription` all drive the
page. Set `priority` to `"P1"` or `"P2"`; both are built, priority only affects
sitemap weight. The region appears automatically in the footer, the markets hub
and the home page chips.

### Add a blog post

1. Write the body at `src/content/blog/<slug>.mdx`. Plain markdown; internal
   links starting with `/` are routed through `next/link` automatically.
2. Add metadata to `blogPosts` in `src/data/blog.ts`, including
   `relatedProducts` and `relatedVarieties` so the post links into the catalogue
   and appears in the "Referenced in this guide" row.
3. Register the body in `src/lib/blog-bodies.ts`:

```ts
"my-post-slug": () => import("@/content/blog/my-post-slug.mdx"),
```

The map is explicit on purpose: a missing MDX file becomes a build-time type
error instead of a runtime 404.

### Change contact details

Everything lives in `src/data/site.ts`. Replace the `{{TOKEN}}` values and set
each channel's `placeholder` to `false`. The header WhatsApp link, the footer,
`/contact` and `/request-a-quote` all update together, and the details become
eligible for Organization structured data (placeholders are stripped before they
can reach it).

## Design system

Tokens are in `src/app/globals.css`, with every contrast ratio documented at the
top of the file. Three rules are load-bearing:

- **`gold-500` is never text.** It is 2.74:1 on ivory. Use `gold-700` for text
  on ivory and `gold-300` for text on peacock.
- **One gold element per screen.** Gold marks the RFQ conversion, nothing else.
- **The Specification Ledger is the signature component.** Mono values, hairline
  rules, a stamped grade badge and a document footer row. It should read as an
  export document, not a pricing table.

Fonts are Libre Caslon Text (display), Archivo (body) and IBM Plex Mono (spec
data and eyebrows), all self-hosted by `next/font` with size-adjusted fallbacks,
so there is no third-party font request and no layout shift.

## Testing and verification

```bash
npm run build
npm run start &
npm run audit:seo -- http://localhost:3000
```

The audit checks every built route for title and description presence, length
and uniqueness, exactly one H1, canonical URL, Open Graph and Twitter tags,
JSON-LD parsing and expected types, the absence of price and rating properties,
unresolved placeholders in structured data, orphan pages and sitemap coverage.
It exits non-zero on any error, so it can go in CI.

Lighthouse mobile, last measured against a production build:

| Page | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| Home | 97 | 100 | 100 | 100 |
| Variety page | 96 | 100 | 100 | 100 |
| Request a quote | 96 | 100 | 100 | 100 |

## Deploying

Push to the connected Vercel project. Set the environment variables above.
Product, category, market and blog routes are statically generated at build
time; `/request-a-quote` is server-rendered because its form values come from
the query string; `/api/rfq` and `/api/og` are serverless functions.
