# ALLVORA RESOURCES: MASTER BUILD DOCUMENT
### Complete specification for Claude Code to build the Allvora Resources website

> **How to use this document:** Feed this entire file to Claude Code as the project brief (place it in the repo root as `PROJECT_BRIEF.md` and reference it in `CLAUDE.md`). Work through the phases in order. Website content lives in Section 4 and Section 5: it is final approved copy, use it verbatim unless a section is marked `[draft, refine]`. Product data in Section 5 must be treated as the single source of truth and loaded from a typed data layer, never hardcoded into pages.

---

## 0. SKILLS TO INVOKE

Claude Code must use the following skills at the indicated phases. If a named skill is not installed in the environment, apply its principles as summarized here and note the gap.

| Skill | When to invoke | What it governs |
|---|---|---|
| `/frontend-design:frontend-design` | Phase 3 (design system) and Phase 4 (page builds), before writing any UI code | Distinctive, non-templated visual identity. Brainstorm tokens (palette, type, layout, signature element) first, self-critique against generic defaults, then build. |
| `ui-ux-pro-max` | Phase 3 and Phase 4 | Interaction quality: hover states, focus states, motion, responsive behavior, accessibility (WCAG AA), empty/error states. |
| `shadcn` | Phase 2 (scaffolding) onward | Component primitives: use shadcn/ui as the base component library (Button, Card, Table, Accordion, NavigationMenu, Sheet, Form, Input, Select, Tabs, Badge, Separator, Dialog). Restyle tokens to the Allvora design system, do not ship default shadcn gray/zinc look. |
| `seo-for-claude` (or equivalent SEO skill) | Phase 5 | Metadata, JSON-LD, sitemap.xml, robots.txt, canonical URLs, Open Graph, internal linking, Core Web Vitals. Section 7 of this doc is the SEO contract; the skill supplements it. |

Rule of precedence: this document's content and sitemap win over skill defaults. Skill guidance wins over Claude Code's own habits for visual and interaction decisions.

---

## 1. PROJECT OVERVIEW

**Client:** Allvora Resources, an India-based export and sourcing company supplying agricultural, food, natural and processed products to international B2B buyers.

**Site type:** B2B lead-generation website. Inquiry/RFQ driven. No e-commerce, no cart, no checkout, no prices displayed.

**Primary conversion:** Request a Quote (RFQ) form submissions, plus WhatsApp and email contact.

**Audience:** International importers, distributors, wholesalers, supermarket chains, food manufacturers, spice companies, private-label brands, food-service businesses across Europe, Middle East, North America, Africa, Southeast Asia, South Asia, Australia/NZ. These are professional procurement buyers: they scan for grades, specifications, certifications, MOQ, packaging and Incoterms. They distrust vague marketing and trust documentation.

**Brand promise:** "Indian Products. Global Reach. Reliable Sourcing." The site must feel established, intellectual and trustworthy: closer to a trading house with a heritage than a startup landing page.

**Success criteria:**
1. A buyer landing on any variety page (e.g. Teja S17 chilli) can see grade, key specifications, available forms, and submit an RFQ in under 60 seconds.
2. Every product/variety page ranks-ready for its "product + exporter/supplier + India" query pattern (Section 7).
3. Lighthouse: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95 on mobile.
4. The design could not be mistaken for a generic template. One signature element carries the identity (Section 3).

---

## 2. TECH STACK & PROJECT SETUP (Phase 1 + Phase 2)

**Stack (non-negotiable):**
- Next.js 15+ (App Router, React Server Components, TypeScript strict)
- Tailwind CSS v4
- shadcn/ui (restyled via CSS variables / theme tokens)
- `next/font` with self-hosted fonts (no render-blocking font CDNs)
- Content architecture: typed data files in `/src/data/` (products, markets, certifications) + MDX for blog posts via `@next/mdx` or Contentlayer-style local content
- Forms: React Hook Form + Zod validation; submission via a Next.js Route Handler (`/api/rfq`) that emails via Resend (or logs to console in dev with a TODO for the API key)
- Icons: lucide-react
- Analytics placeholder: a single `<Analytics />` slot component (empty for now)
- Deployment target: Vercel

**Repo structure:**

```
allvora-web/
├── CLAUDE.md                  # points to PROJECT_BRIEF.md, records decisions
├── PROJECT_BRIEF.md           # this document
├── src/
│   ├── app/
│   │   ├── layout.tsx         # root layout: fonts, theme, Header, Footer, Organization JSON-LD
│   │   ├── page.tsx           # Home
│   │   ├── about/page.tsx
│   │   ├── about/sourcing-and-traceability/page.tsx
│   │   ├── quality-and-certifications/page.tsx
│   │   ├── private-label-and-packaging/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── request-a-quote/page.tsx
│   │   ├── products/page.tsx
│   │   ├── products/[category]/page.tsx           # generateStaticParams from data
│   │   ├── products/[category]/[product]/page.tsx
│   │   ├── products/[category]/[product]/[variety]/page.tsx
│   │   ├── markets/page.tsx
│   │   ├── markets/[region]/page.tsx
│   │   ├── blog/page.tsx
│   │   ├── blog/[slug]/page.tsx
│   │   ├── sitemap.ts         # generated from the data layer
│   │   ├── robots.ts
│   │   └── api/rfq/route.ts
│   ├── components/
│   │   ├── layout/  (Header, MegaMenu, Footer, TrustBar, MobileNav)
│   │   ├── product/ (SpecTable, VarietyCard, FormsBadges, RfqCta, CategoryGrid)
│   │   ├── shared/  (SectionHeading, Eyebrow, Breadcrumbs, FaqAccordion, MarketChips, CertBadgeRow)
│   │   └── ui/      (shadcn primitives)
│   ├── data/
│   │   ├── products.ts        # Section 5, typed
│   │   ├── categories.ts
│   │   ├── markets.ts
│   │   ├── certifications.ts
│   │   └── faqs.ts
│   ├── lib/ (seo.ts: metadata + JSON-LD builders, utils.ts)
│   └── content/blog/*.mdx
└── public/ (logo, og images, product photography placeholders)
```

**Data model (implement exactly, extend if needed):**

```ts
type ProductForm = string; // "Whole" | "Stemless" | "Powder" | "Flakes" | ...

interface Variety {
  slug: string;            // "teja-s17"
  name: string;            // "Teja S17"
  gradeType: string;       // "High pungency"
  specs: string[];         // ["High SHU", "ASTA colour", "Moisture", "Aflatoxin"]
  forms: ProductForm[];
  priority: "P1" | "P2";
  seoTitle: string;        // "Teja S17 Red Chilli Exporter & Supplier from India"
  seoDescription: string;
  intro?: string;          // 2-3 sentence page intro, from Section 5 where written
}

interface Product {
  slug: string;            // "red-chilli"
  name: string;            // "Red Chilli"
  category: "spices" | "agri-natural" | "food" | "tea-coffee";
  intro: string;           // category-page copy from Section 5
  varieties: Variety[];
  buyerSpecNote?: string;  // e.g. the basmati buyer-specification list
}
```

Every route under `/products/` is statically generated from this data. Adding a variety to `products.ts` must produce a new page, a sitemap entry, metadata and JSON-LD with zero page-level code changes.

---

## 3. DESIGN DIRECTION (Phase 3, run `/frontend-design:frontend-design` and `ui-ux-pro-max` here)

### 3.1 Brand context (real, existing brand assets)
Allvora's logo direction is a peacock feather merged with a globe: painterly teal/green barbs, a gold-orange eye ring, a cobalt core, drawn from earlier brand work that also referenced a monoline mark in dark brown on cream. The brand should feel worldwide, minimal, professional, eco-friendly and food-grade. The website palette must be derived from this feather, not invented fresh.

### 3.2 Token starting point (Claude Code refines via the skill, stays within this world)
- **Palette (named hex, adjust in the skill's brainstorm pass but keep the family):**
  - `--peacock-900: #0E3B36` deep peacock teal (primary, headers, footer)
  - `--peacock-600: #1B6B5F` peacock green (interactive, links, buttons)
  - `--gold-500: #C98A2B` feather-eye gold (accent, one use per screen: CTAs or active states, never both)
  - `--cobalt-700: #1F3A8A` cobalt (rare accent: data highlights, chart ink)
  - `--ivory-50: #FAF7F0` warm ivory (page background)
  - `--ink-900: #221A14` dark brown ink (body text)
- **Typography:** a characterful display serif with an established trading-house feel for headlines (candidates: Zodiak, Sentient, or Libre Caslon Text; pick one in the skill pass, avoid the overexposed Fraunces/Playfair defaults), a workhorse grotesk for body (Archivo or Public Sans), and a mono for specification data, eyebrows and document-style labels (IBM Plex Mono). The mono-for-specs choice is deliberate: it makes spec tables read like export documentation.
- **Signature element (the one memorable thing):** the **Specification Ledger**. Product spec tables and key data blocks are styled as export documents: mono type, fine rules, stamped-looking grade badges, a subtle "COA available on request" footer row. Combined with a single recurring peacock-feather arc motif (an SVG curve derived from the logo, used as a section divider or hero underlay, at most twice per page). Spend the boldness here; keep everything else quiet.
- **Layout concept:** generous ivory whitespace, a 12-column grid, editorial left-aligned headlines with mono eyebrows (e.g. `SPICES / RED CHILLI / TEJA S17` as a breadcrumb-eyebrow), full-bleed peacock-teal bands for the footer and one mid-page trust band. Hero is a thesis, not a stat card: lead with the strongest sentence of copy over a restrained visual, not a metric grid.
- **Motion:** one orchestrated page-load reveal on the hero (fade + 8px rise, 300-400ms, staggered), scroll-triggered fade-ins for section headings only, subtle hover lift on cards. Respect `prefers-reduced-motion`. Nothing else.

### 3.3 Photography & imagery
Use placeholder art direction now, real photography later: macro texture shots of the actual commodities (chilli skins, pepper berries, turmeric fingers, rice grains, tea leaves) treated with a consistent warm grade, plus documentary-style sourcing imagery. Generate neutral SVG/gradient placeholders with correct aspect ratios and descriptive `alt` text so real photos can be dropped in. No stock-photo handshake imagery, no generic globe clip art.

### 3.4 Non-negotiable quality floor
Responsive to 360px, visible keyboard focus rings (gold on peacock, peacock on ivory), WCAG AA contrast throughout (check gold-on-ivory carefully, darken gold for text use), semantic HTML landmarks, `prefers-reduced-motion` respected, no layout shift from fonts (use `font-display: swap` + size-adjust fallbacks).

---

## 4. SITE ARCHITECTURE & SITEMAP

Dual-axis architecture: Product axis + Market axis, plus trust, company and knowledge sections, all funneling to the RFQ.

**Global nav:** Products (mega-menu: 4 categories with product links) | Markets | Quality & Certifications | About | Blog | **Request a Quote** (persistent solid CTA button) + WhatsApp icon link.

**Persistent TrustBar** (slim strip above or below header, also reprised pre-footer): `APEDA Registered • FSSAI Certified • IEC Licensed • COA With Every Shipment • Quote Within 24 Hours`. (Mark certification names as placeholders until Allvora's registrations are confirmed; render from `certifications.ts` so they are editable in one place.)

**Footer:** condensed product tree (4 columns), markets list, company links, contact block (email, phone, WhatsApp), certification badges, legal links, and the line "Indian Products. Global Reach. Reliable Sourcing."

### Route map with launch priority

| Route | Priority | Target query pattern |
|---|---|---|
| `/` | P1 | brand + "Indian agricultural & spice exporter" |
| `/about/` | P1 | brand trust |
| `/about/sourcing-and-traceability/` | P1 | trust content |
| `/quality-and-certifications/` | P1 | "certified spice exporter India" |
| `/private-label-and-packaging/` | P1 | "private label spices India" |
| `/contact/` + `/request-a-quote/` | P1 | conversion |
| `/products/` | P1 | hub |
| `/products/spices/` (+ red-chilli, black-pepper, cardamom, turmeric) | P1 | "Indian spices exporter", "[spice] exporter India" |
| `/products/agri-natural/` (+ moringa, coconut, cocopeat) | P1 | "[product] manufacturer/exporter India" |
| `/products/food/` (+ basmati-rice, ghee) | P1 | "[product] supplier India" |
| `/products/tea-coffee/` (+ tea, coffee) | P1 | "[product] bulk supplier India" |
| Variety pages marked P1 in Section 5 data | P1 | "[variety] exporter/supplier India" |
| Variety pages marked P2 | P2 | long-tail |
| `/markets/` + middle-east, europe, north-america | P1 | "[product] supplier [region]" |
| `/markets/` africa, southeast-asia, south-asia, australia-nz | P2 | regional |
| `/blog/` shell + first 3 posts | P1 shell | buyer-guide queries |
| `/about/why-source-from-india/`, industries pages, product+country pages | P2 | long-tail expansion |

P1 variety pages (build these ~22 first): Sannam S4, Teja S17, Byadagi Kaddi, Kashmiri, Guntur (red chilli); TGSEB, TGEB, MG1 (pepper); 8mm Super Premium (cardamom); Erode, Salem, Nizamabad, Lakadong (turmeric); Moringa Leaf Powder; Desiccated Coconut, Virgin Coconut Oil; Cocopeat Block; 1121 Basmati (with all four processing forms as on-page sections), 1509 Basmati; A2 Cow Ghee, Bilona Ghee; Assam CTC, Darjeeling, Green Tea; Arabica Plantation A, Robusta Cherry AB, Monsooned Malabar AA.

---

## 5. WEBSITE CONTENT (final copy + product data)

Copy below is approved. Use verbatim unless marked `[draft, refine]`. Tone rules for anything Claude Code writes: plain verbs, specific over clever, no exclamation marks, no filler ("world-class", "cutting-edge" are banned), sentence case for UI labels, buyer-facing vocabulary (grades, specifications, documentation), and never promise a certification or capability not listed here.

### 5.1 HOME `/`

**Hero eyebrow (mono):** `EXPORT & SOURCING · INDIA`
**Hero headline:** Quality products from India, sourced to your specification.
**Hero subhead:** Allvora Resources connects international buyers with spices, rice, ghee, tea, coffee and natural products from India's producing regions. You define the grade, specification, packaging and destination requirements. We coordinate the sourcing, quality control and export documentation.
**Primary CTA:** Request a quote → `/request-a-quote/`
**Secondary CTA:** Explore products → `/products/`

**Category grid (4 cards):**
1. **Spices** · Red chilli, black pepper, cardamom, turmeric in whole, processed and custom forms. → `/products/spices/`
2. **Agricultural & Natural** · Moringa, coconut products and cocopeat growing media. → `/products/agri-natural/`
3. **Food Products** · Basmati rice across nine varieties, and ghee from standard to A2 bilona. → `/products/food/`
4. **Tea & Coffee** · Assam, Darjeeling and Nilgiri teas; Arabica, Robusta and specialty coffees. → `/products/tea-coffee/`

**How we work (3 steps, this is a real sequence so numbering is appropriate):**
1. **Share your requirement.** Variety, grade, technical parameters, quantity, packaging and destination.
2. **We source and verify.** We identify suitable producers and processors, confirm specifications, and arrange testing where required.
3. **We ship with documentation.** COA, phytosanitary, certificate of origin, fumigation and health certificates as applicable, coordinated per destination.

**Trust band (peacock-teal full-bleed):**
Headline: Built for buyers who check the paperwork.
Body: Every shipment can be supported by a Certificate of Analysis and destination-specific export documentation. Specifications are confirmed in writing before shipment. India's agricultural and processed-food products reach more than 200 countries and regions; our role is to make sourcing them reliable, transparent and efficient.

**Markets strip:** Serving buyers across Europe, the Middle East, North America, Africa, Southeast Asia, South Asia, and Australia & New Zealand. → `/markets/`

**Closing CTA block:** Tell us what you need to source from India. Send your specification and receive a response within 24 hours. [Request a quote]

### 5.2 ABOUT `/about/`

**Eyebrow:** `THE COMPANY`
**H1:** Sourcing from India, made reliable.

Allvora Resources is an India-based export and sourcing company focused on supplying quality agricultural, food, natural and processed products to international markets.

We work with established producers, processors and suppliers across India to source products according to buyer requirements, destination-market standards and international quality expectations. From whole spices and specialty agricultural products to premium rice, ghee, tea and coffee, we bring together products from India's diverse agricultural regions and connect them with buyers worldwide.

Our objective is simple: to make sourcing from India reliable, transparent and efficient.

**Why India (short section):** India is one of the world's major agricultural exporting countries. Its agricultural and processed-food exports reach more than 200 countries and regions, with Basmati rice, spices and coffee among the leading commodities. That diversity of varieties, regions and processing capability is the supply base we work from.

**Who we serve (chips/list):** Importers · Distributors · Wholesalers · Supermarket chains · Food manufacturers · Spice companies · Food-service companies · Retail and private-label brands · Agricultural distributors · Ingredient buyers.

**Vision:** To build Allvora Resources into a trusted global sourcing partner for Indian products.
**Mission:** To connect the world with quality products from India.

CTA: See how we handle quality → `/quality-and-certifications/`

### 5.3 SOURCING & TRACEABILITY `/about/sourcing-and-traceability/`

**H1:** From producing region to port, with a paper trail.

`[draft, refine]` We source each requirement from the region best known for it: chilli from Guntur and Byadagi, pepper and cardamom from the Western Ghats, turmeric from Erode, Salem and Nizamabad, Basmati from the northern plains, tea from Assam, Darjeeling and the Nilgiris, coffee from the southern plantations. Working with established producers and processors in each region, we confirm specifications before shipment and support them with testing and documentation where required. Buyers receive visibility on origin, crop year and processing at the specification stage, not after the container ships.

Sections: Sourcing regions (map or list) · Specification confirmation process · Testing & documentation · Packaging & container coordination.

### 5.4 QUALITY & CERTIFICATIONS `/quality-and-certifications/`

**Eyebrow:** `QUALITY FIRST`
**H1:** International buyers require more than a competitive price.

Every product we supply can be sourced according to agreed specifications covering grade, size, moisture, purity, colour, chemical parameters, microbiological limits, processing requirements, packaging, labelling, shelf life and destination-market requirements.

**Documentation (Specification Ledger styling):** Where applicable, products are supported by: Certificate of Analysis (COA) · Phytosanitary certificate · Certificate of origin · Fumigation certificate · Health certificate · Other destination-required export documentation.

**Registrations & certifications:** render badge row from `certifications.ts`. Launch placeholders: APEDA registration, FSSAI, IEC (DGFT), Spices Board of India registration. `[confirm each before publishing; do not display unconfirmed certifications]`

**Standing paragraph (also reused on every product page as `buyerSpecNote` default):**
> **Buyer-specific specifications available.** Allvora Resources supplies products according to international buyer requirements and destination-market regulations. Specifications including grade, size, moisture, purity, colour, chemical parameters, microbiological limits, packaging and labelling can be customized. Certificate of Analysis (COA) and relevant export documentation can be provided upon request.

### 5.5 PRIVATE LABEL & PACKAGING `/private-label-and-packaging/`

**H1:** Your brand, our sourcing.

`[draft, refine]` We supply in bulk, retail and private-label formats depending on product and destination. Buyers can request standard commercial grades, premium grades, customized specifications, contract-specific requirements and destination-specific documentation. Packaging is agreed per order: bulk formats for industrial buyers, retail-ready and private-label packaging for brands. Specifications and packaging are confirmed in writing before shipment.

Sections: Bulk supply · Retail packaging · Private label process (brief, spec, sample, confirm, ship) · Labelling & compliance coordination.

### 5.6 CONTACT `/contact/` and RFQ `/request-a-quote/`

**Contact H1:** Talk to us about your requirement.
Channels: Email · Phone · WhatsApp (use the contact details supplied by Allvora at build time; render from a single `site.ts` config; do not invent numbers or addresses).

**RFQ H1:** Request a quote.
**Intro:** Send your specification and receive a response within 24 hours. The more detail you share, the faster we can confirm availability and pricing.

**RFQ form fields (React Hook Form + Zod):**
- Name*, Company*, Country*, Email*, Phone/WhatsApp
- Product category* (select from data) → Product* (dependent select) → Variety/Grade (dependent select, optional)
- Quantity & unit* (free text, placeholder "e.g. 1 x 20ft FCL, 25 MT")
- Destination port (text)
- Incoterm (select: FOB, CIF, CFR, EXW, Other/Not sure)
- Target specifications (textarea, placeholder "Grade, moisture, packaging, certifications required…")
- How did you find us (select, optional)
Success state: "Received. We will respond within 24 hours to [email]." Error states name the field and the fix.

### 5.7 MARKETS `/markets/` and `/markets/[region]/`

**Hub H1:** Positioned to serve buyers worldwide.
Hub intro: India's agricultural and processed-food products already reach more than 200 countries and regions. We coordinate destination-specific specifications, labelling and documentation for each market we serve.

Each region page (P1: Middle East, Europe, North America) follows one template `[draft, refine]`:
- H1: "[Product portfolio] for [region] buyers" (e.g. "Indian spices, rice and food products for Middle East buyers")
- Intro paragraph naming the region's typical buyer profile and 3-4 most relevant product lines (Middle East: Basmati rice, spices, ghee; Europe: spices with strict MRL compliance, moringa, tea, coffee; North America: spices, Basmati, coconut products, cocopeat)
- A "destination requirements we coordinate" list (labelling, certifications, documentation)
- Product link grid filtered to relevant categories, RFQ CTA.

### 5.8 PRODUCT CONTENT: category intros, product pages, and the full data tables

**Hub `/products/` intro:** Four product lines, one sourcing standard. Every product below can be supplied to buyer-specific specifications with supporting documentation.

**Category intros:**
- **Spices `/products/spices/`:** We supply Indian spices in whole, processed and customized forms: red chilli from Guntur and Byadagi, black pepper from the Malabar coast, green and large cardamom, and turmeric from India's principal producing belts. Each is available by named variety and grade, specified to your parameters.
- **Agricultural & Natural `/products/agri-natural/`:** Moringa in leaf, powder, seed and oil forms including organic and nutraceutical grades; coconut across fresh, copra, desiccated and oil formats; and cocopeat growing media from 5 kg blocks to buffered horticulture grades.
- **Food Products `/products/food/`:** Indian Basmati rice across nine varieties and four processing types, and ghee from standard cow and buffalo grades to A2, bilona, cultured, organic and industrial formats, in retail and bulk.
- **Tea & Coffee `/products/tea-coffee/`:** Teas from Assam, Darjeeling, the Nilgiris and Dooars, from specialty orthodox to tea-bag fannings, plus green tea and masala blends. Indian coffees across Arabica and Robusta plantation, parchment and cherry grades, including Monsooned Malabar and Mysore Nuggets specialty lots. Private-label options available for both.

**Product page layout (all 11 products):** breadcrumb-eyebrow → H1 ("[Product] exporter and supplier from India") → 2-3 sentence intro → **Specification Ledger table (4 columns: Variety | Grade/Type | Key Buyer Specifications | Available Forms)** → buyer-spec-note callout (Section 5.4 standing paragraph) → variety cards linking to variety pages (P1 only at launch) → FAQ accordion (3-5 questions from `faqs.ts`) → RFQ CTA.

**THE PRODUCT DATA. Load the following into `products.ts` exactly. This is the approved 4-column dataset.**

#### Red Chilli (`spices/red-chilli`)
| Variety | Grade/Type | Key Buyer Specifications | Available Forms |
|---|---|---|---|
| Sannam S4 | Commercial export grade | 15,000 to 18,000 SHU; ASTA colour; moisture; aflatoxin; pesticide residue | Whole / Stemless / Powder / Flakes |
| S10 Sannam | Medium-high pungency | SHU; ASTA; moisture; foreign matter; pod size | Whole / Stemless / Powder |
| Teja S17 | High pungency | High SHU; ASTA colour; moisture; aflatoxin | Whole / Stemless / Powder / Flakes |
| Byadagi Kaddi | High-colour, mild heat | ~150 to 200 ASTA; low pungency; moisture; colour | Whole / Stemless / Powder |
| Byadagi Dabbi | Premium colour grade | ASTA colour; pod size; moisture; foreign matter | Whole / Powder |
| Kashmiri | Bright colour, mild heat | ASTA colour; SHU; moisture; pesticide residue | Whole / Powder |
| Guntur varieties | Commercial | SHU; ASTA; moisture; pod length; foreign matter | Whole / Powder / Flakes |

#### Black Pepper (`spices/black-pepper`)
| Variety | Grade/Type | Key Buyer Specifications | Available Forms |
|---|---|---|---|
| TGSEB | Tellicherry Special Extra Bold | 4.75 mm+; high density; moisture ≤11%; piperine; foreign matter | Whole |
| TGEB | Tellicherry Extra Bold | 4.25 mm+; bulk density; moisture; piperine | Whole |
| MG1 | Malabar Garbled Grade 1 | Berry size; bulk density; moisture; light berries; piperine | Whole |
| MG2 | Malabar Garbled Grade 2 | Density; moisture; foreign matter; piperine | Whole |
| 500 GL | Commercial | Bulk density ~500 g/L; moisture; berry size | Whole |
| 550 GL | Premium commercial | Bulk density ~550 g/L; moisture; piperine | Whole |
| 600 GL | Premium | Bulk density ~600 g/L; moisture; piperine; purity | Whole |

#### Cardamom (`spices/cardamom`)
| Variety | Grade/Type | Key Buyer Specifications | Available Forms |
|---|---|---|---|
| 6 mm | Standard | Pod diameter ≥6 mm; colour; moisture; open pods | Whole |
| 7 mm | Premium | Pod diameter ≥7 mm; green colour; density; moisture | Whole |
| 8 mm | Super Premium | Pod diameter ≥8 mm; colour; density; essential oil | Whole |
| Bold | Premium | Pod size; green colour; weight; open/broken pods | Whole |
| Extra Bold | Premium | Large pods; colour; density; moisture | Whole |
| Super Bold | Top grade | ≥8 mm; high density; colour; essential oil | Whole |
| Large Cardamom | Commercial | Pod size; moisture; colour; foreign matter; volatile oil | Whole / Seeds |

#### Turmeric (`spices/turmeric`)
| Variety | Grade/Type | Key Buyer Specifications | Available Forms |
|---|---|---|---|
| Erode | Commercial Indian | Curcumin; moisture; colour; foreign matter | Fingers / Powder |
| Salem | Premium commercial | Curcumin; colour; moisture; size | Fingers / Powder |
| Alleppey Finger | Premium | Higher curcumin; colour; moisture; finger size | Fingers / Powder |
| Nizamabad | Commercial | Curcumin; moisture; foreign matter | Fingers / Powder |
| Sangli / Rajapuri | Commercial/Premium | Curcumin; colour; moisture; size | Fingers / Powder |
| Duggirala | Commercial | Curcumin; moisture; colour | Fingers / Powder |
| Lakadong | High-curcumin | High curcumin; moisture; colour; purity | Fingers / Powder |

#### Moringa (`agri-natural/moringa`)
| Product | Grade/Type | Key Buyer Specifications | Available Forms |
|---|---|---|---|
| Moringa Leaf | Dried leaf | Moisture; colour; foreign matter; microbiology | Dried Leaves |
| Moringa Powder | Food Grade | Moisture ≤7 to 8% typical; mesh; colour; microbiology | Powder |
| Premium Moringa Powder | Premium | Moisture; bright green colour; mesh; microbial limits | Powder |
| Organic Moringa | Certified Organic | Organic certification; moisture; pesticide residue; microbiology | Leaf / Powder |
| Nutraceutical Grade | High QC | Heavy metals; pesticides; microbiology; nutritional profile | Powder |
| Moringa Seed | Commercial | Moisture; purity; oil content; foreign matter | Seeds |
| Moringa Oil | Cold-pressed | FFA; peroxide value; moisture; fatty-acid profile | Oil |

#### Coconut (`agri-natural/coconut`)
| Product | Grade/Type | Key Buyer Specifications | Available Forms |
|---|---|---|---|
| Fresh Coconut | Mature | Weight; size; maturity; husk condition; defects | Whole |
| Semi-Husked Coconut | Export | Size; weight; maturity; moisture; appearance | Whole |
| Copra | Milling Grade | Moisture; oil content; mould; foreign matter | Whole / Pieces |
| Desiccated Coconut | Fine | Moisture; fat; particle size; microbiology | Fine Powder |
| Desiccated Coconut | Medium | Moisture; fat; particle size; colour | Medium |
| Coconut Chips | Food Grade | Moisture; size; colour; microbiology | Chips |
| Coconut Flakes | Food Grade | Moisture; particle size; colour | Flakes |
| Coconut Oil | Edible | FFA; moisture; peroxide value; acid value | Oil |
| Virgin Coconut Oil | Premium | FFA; peroxide value; moisture; fatty-acid profile | Oil |

#### Cocopeat (`agri-natural/cocopeat`)
| Product | Grade/Type | Key Buyer Specifications | Available Forms |
|---|---|---|---|
| Cocopeat Block | 5 kg compressed | Expansion; EC; pH; moisture; compression ratio | Blocks |
| Cocopeat Briquette | Compressed | Expansion volume; EC; pH; moisture | Briquettes |
| Buffered Cocopeat | Premium horticulture | Low EC; pH; water-holding capacity; air porosity | Blocks / Bags |
| Washed Cocopeat | Low-salt grade | EC; pH; moisture; expansion | Blocks |
| Cocopeat Grow Bag | Horticulture | Dimensions; EC; pH; expansion; planting holes | Grow Bags |
| Coco Chips | Horticulture | Chip size; EC; moisture; expansion | Loose / Blocks |
| Cocopeat + Chips | Growing media | Ratio; EC; pH; water retention | Blocks / Grow Bags |

#### Basmati Rice (`food/basmati-rice`)
| Variety | Grade/Type | Key Buyer Specifications | Available Forms |
|---|---|---|---|
| 1121 | Premium Extra Long | Grain length ~8.3+ mm; broken %; moisture; purity; elongation | Raw / Steam / Sella / Golden Sella |
| 1509 | Long Grain | Grain length ~8.2+ mm; broken %; moisture; purity | Raw / Steam / Sella |
| 1401 | Premium Long Grain | Grain length; broken %; moisture; aroma | Raw / Steam / Sella |
| 1718 | Premium | Grain length; moisture; broken %; cooking expansion | Raw / Steam / Sella |
| 1692 | New Basmati | Grain length; purity; moisture; broken % | Raw / Steam |
| 1847 | Improved Basmati | Grain length; purity; moisture; broken % | Raw / Steam / Sella |
| 1885 | Improved 1121 type | Extra-long grain; broken %; moisture; elongation | Raw / Steam / Sella |
| 1886 | Improved Basmati | Long grain; purity; moisture; broken % | Raw / Steam / Sella |
| Traditional Basmati | Premium Traditional | Aroma; slender grain; purity; elongation | Raw / Steam / Sella |

`buyerSpecNote` for basmati: Buyers can specify: Grain length · Broken % · Moisture · Chalky grains · Damaged grains · Foreign matter · Admixture · Purity · Aroma · Cooking time · Elongation ratio · Ageing · Crop year · Sortex level.

#### Ghee (`food/ghee`)
| Product | Grade/Type | Key Buyer Specifications | Available Forms |
|---|---|---|---|
| Cow Ghee | Standard | Fat; moisture; FFA; peroxide value; microbiology | Retail / Bulk |
| Buffalo Ghee | Commercial | Fat; moisture; FFA; acid value; purity | Retail / Bulk |
| A2 Cow Ghee | Premium | Milk source documentation; fat; moisture; purity | Retail |
| Bilona Ghee | Traditional Premium | Milk source; process; fat; moisture; purity | Retail |
| Cultured Ghee | Premium | Cultured butter source; fat; FFA; peroxide value | Retail / Bulk |
| Organic Ghee | Certified Organic | Organic certification; fat; moisture; residues | Retail / Bulk |
| Industrial Ghee | Food Manufacturing | Fat; FFA; moisture; microbiological parameters | Bulk |

#### Tea (`tea-coffee/tea`)
| Variety | Grade/Type | Key Buyer Specifications | Available Forms |
|---|---|---|---|
| Assam CTC | Strong black tea | Leaf grade; liquor strength; moisture; colour; aroma | Loose / Tea Bags |
| Assam Orthodox | Premium | Leaf appearance; liquor; aroma; moisture | Loose |
| Darjeeling | Specialty | Flush; leaf grade; aroma; liquor; origin | Loose / Tea Bags |
| Nilgiri | Aromatic black tea | Leaf grade; liquor colour; aroma; moisture | Loose / Tea Bags |
| Dooars | Commercial | Grade; liquor; moisture; colour | Loose |
| Green Tea | Specialty | Leaf appearance; colour; moisture; flavour | Loose / Tea Bags |
| Masala Tea | Value Added | Tea grade; spice blend; moisture; microbiology | Loose / Tea Bags |
| Tea Dust | Commercial | Particle size; liquor strength; moisture | Bulk / Tea Bags |
| Fannings | Tea Bag Grade | Particle size; liquor strength; colour | Tea Bags |

#### Coffee (`tea-coffee/coffee`)
| Variety | Grade/Type | Key Buyer Specifications | Available Forms |
|---|---|---|---|
| Arabica Plantation A | Premium | Screen size; moisture; defects; cup quality | Green Beans |
| Arabica Plantation PB | Premium | Peaberry; screen size; moisture; defects | Green Beans |
| Plantation B | Commercial | Bean size; moisture; defects; cup profile | Green Beans |
| Robusta Parchment PB | Premium Robusta | Screen size; moisture; defects; cup quality | Green Beans |
| Robusta Parchment AB | Commercial Premium | Bean size; moisture; defects | Green Beans |
| Robusta Cherry PB | Natural Robusta | Screen size; moisture; defects | Green Beans |
| Robusta Cherry AB | Commercial | Bean size; moisture; defects | Green Beans |
| Monsooned Malabar AA | Specialty | Screen size; moisture; monsooning characteristics; cup profile | Green Beans |
| Mysore Nuggets EB | Specialty | Extra bold; screen size; moisture; cup profile | Green Beans |
| Robusta Kaapi Royale | Specialty | Screen size; moisture; defects; cup profile | Green Beans |

### 5.9 VARIETY PAGE TEMPLATE + two fully written exemplars

**Template structure (every variety page):** breadcrumb-eyebrow → H1 "[Variety] [Product] exporter and supplier from India" → intro (2-3 sentences: what it is, what it's known for, who buys it) → Specification Ledger (this variety's row expanded into a labelled spec list) → Available forms badges → buyer-spec-note → "Related varieties" links (siblings) → FAQ (2-3) → RFQ CTA prefilled with product+variety.

**Exemplar 1: `/products/food/basmati-rice/1121/`**
H1: 1121 Basmati Rice exporter and supplier from India
Intro: 1121 is India's premium extra-long-grain Basmati, with raw grain length of approximately 8.3 mm and above and strong cooking elongation. It is the leading choice for Middle East and international buyers who specify length, purity and low broken percentage. Allvora supplies 1121 in Raw, Steam, Sella and Golden Sella processing forms, specified to your parameters.
On-page sections for the four forms (Raw / Steam / Sella / Golden Sella), each 1-2 sentences on use case (e.g. Golden Sella for retail markets preferring a golden hue and firm cooking; Steam for aroma retention). `[draft, refine]`
FAQ: What broken percentage can be specified? · What packaging options are available? · Can crop year and ageing be specified?

**Exemplar 2: `/products/spices/red-chilli/teja-s17/`**
H1: Teja S17 Red Chilli exporter and supplier from India
Intro: Teja S17 is a high-pungency red chilli from the Guntur belt, specified by buyers who need heat: high SHU with dependable ASTA colour. Allvora supplies Teja S17 whole, stemless, as powder and as flakes, with aflatoxin and moisture parameters confirmed before shipment.
FAQ: What SHU range does Teja S17 offer? · Is stemless Teja available in bulk? · What documentation accompanies shipments to the EU?

All other variety intros: Claude Code writes them from the data table row + this template's register, 2-3 sentences, factual, no superlatives, flagged `[generated, review]` in a content-review checklist file (`CONTENT_REVIEW.md`).

### 5.10 BLOG `/blog/`

Launch with the shell + these 3 posts (Claude Code drafts ~800-1200 words each, buyer-guide register, Article + FAQPage schema, `[generated, review]`):
1. "1121 vs 1509 Basmati: which should you import?"
2. "Black pepper grades explained: TGSEB, TGEB, MG1 and GL grades"
3. "How to verify an Indian exporter: APEDA, Spices Board, FSSAI and IEC"

Phase 2 topic bank: turmeric curcumin by region (Erode, Salem, Nizamabad, Lakadong) · red chilli varieties explained · what is Monsooned Malabar coffee · cocopeat EC and pH for hydroponics · A2 vs regular ghee for private label · Indian spice harvest calendar · Incoterms and documentation for importing from India.

### 5.11 FAQs (`faqs.ts`, reused across pages)

- **What is your minimum order quantity?** MOQ depends on the product and packaging format. Share your requirement and we will confirm the workable minimum. `[confirm real MOQs with Allvora]`
- **Do you provide samples?** Yes, samples can be arranged for serious buyer inquiries; courier terms are confirmed per request.
- **Which Incoterms do you quote?** FOB and CIF are standard; other terms on request.
- **What documentation do you provide?** COA, phytosanitary certificate, certificate of origin, fumigation and health certificates as applicable to the product and destination.
- **Can you do private label?** Yes, retail and private-label packaging are available depending on product and destination.
- **How fast do you respond?** Within 24 hours to every complete inquiry.

---

## 6. COMPONENT SPECIFICATIONS (Phase 4)

- **Header + MegaMenu:** shadcn NavigationMenu. Products opens a 4-column mega-menu (one column per category, product links beneath, "View all" footer link). Sticky on scroll with a compressed state. Mobile: shadcn Sheet with accordion nav.
- **TrustBar:** slim, mono type, dot-separated items from `certifications.ts`, dismissible: no. Reprise as a pre-footer band.
- **SpecTable (the Specification Ledger, signature component):** semantic `<table>`, mono type for spec values, fine 1px rules in `--ink-900` at 15% opacity, grade rendered as a stamped Badge, sticky header row on desktop, horizontal-scroll with edge-fade on mobile (never squash 4 columns below 640px), footer row: "COA available on request · Specifications confirmed before shipment." This component must look like an export document, not a pricing table.
- **VarietyCard:** name, grade badge, top 3 specs, forms badges, arrow link. Hover: 2px lift + gold underline on name.
- **RfqCta:** full-width band, one gold button. On product/variety pages, link carries `?product=&variety=` params that prefill the RFQ form selects.
- **FaqAccordion:** shadcn Accordion, renders FAQPage JSON-LD from the same data.
- **Breadcrumbs:** mono eyebrow style, emits BreadcrumbList JSON-LD.
- **Footer:** 4-column product tree + markets + company + contact, peacock-900 background, ivory text, certification badge row.

---

## 7. SEO CONTRACT (Phase 5, run the SEO skill here)

1. **Metadata:** every page exports `generateMetadata` from `lib/seo.ts`. Title pattern for varieties: "[Variety] [Product] Exporter & Supplier from India | Allvora Resources" (≤60 chars where possible). Products: "[Product] Exporter from India: Varieties & Grades | Allvora Resources". Unique descriptions (150-160 chars) generated from data intros. Canonical URLs, Open Graph + Twitter cards with a branded OG image template.
2. **JSON-LD:** Organization (sitewide, in root layout: legalName, logo, contactPoint, sameAs) · Product on every variety page (name, description, category, `countryOfOrigin: "IN"`, brand "Allvora Resources"; **no price**, this is an RFQ business) · FAQPage wherever FaqAccordion renders · BreadcrumbList on all nested pages · BlogPosting on posts. All emitted by `lib/seo.ts` builders from the data layer.
3. **`sitemap.ts` + `robots.ts`:** generated from data; blog and P2 pages included as they ship.
4. **Internal linking:** category → products → varieties → siblings; every variety links back up and across; markets pages link to relevant categories; blog posts link to the varieties they discuss. No orphan pages.
5. **Headings:** exactly one H1 per page containing the target query pattern naturally; H2s for sections.
6. **Images:** descriptive alt text with variety names, `next/image`, explicit dimensions, lazy below the fold.
7. **Performance:** static generation for all product/market pages, font subsetting, zero client JS on content pages except the nav, accordion and form islands.
8. **Do not do:** keyword stuffing, hidden text, fabricated review/rating schema, price schema, doorway pages. Product+country pages (e.g. `/basmati-rice-uae/`) are Phase 2 and only with unique per-country content.

---

## 8. BUILD PHASES & ACCEPTANCE

**Phase 1: Setup.** Scaffold Next.js 15 + Tailwind v4 + shadcn, strict TS, repo structure per Section 2, `CLAUDE.md` created. ✓ when `npm run build` passes clean.
**Phase 2: Data layer.** `products.ts`, `categories.ts`, `markets.ts`, `certifications.ts`, `faqs.ts`, `site.ts` fully typed and populated from Section 5. ✓ when a script can print every route the site will generate (all P1 + P2 flagged).
**Phase 3: Design system.** Invoke frontend-design + ui-ux-pro-max: finalize tokens within Section 3's world, restyle shadcn theme, build Header/Footer/TrustBar/SpecTable. ✓ when a styleguide route (`/dev/styleguide`, noindex) shows all tokens and components and the SpecTable reads as an export document.
**Phase 4: Pages.** Home → core trust pages → category pages → P1 variety pages → markets → contact/RFQ → blog shell + 3 posts. ✓ when every P1 route renders with real content, responsive to 360px, keyboard navigable.
**Phase 5: SEO pass.** Section 7 contract implemented and verified (validate JSON-LD with a schema validator, check titles/descriptions for all routes). ✓ when Lighthouse mobile hits targets in Section 1.
**Phase 6: QA + handoff.** `CONTENT_REVIEW.md` lists every `[generated, review]` and `[confirm]` item; README documents how to add a variety, a market, a blog post, and how to set the Resend API key and real contact details.

**Hard rules for Claude Code:**
- Never invent certifications, client names, testimonials, statistics, MOQs, prices, phone numbers or addresses. Placeholders must be obvious (`{{PHONE}}`) and listed in `CONTENT_REVIEW.md`.
- No em dashes anywhere in site copy or documents; use commas, colons or parentheses.
- No emoji in site copy or UI.
- All product facts come from `products.ts`; if a page needs a fact that is not in the data, add it to the data, do not inline it.
- Commit per phase with descriptive messages.

---

## 9. FINAL PRE-LAUNCH CHECKLIST

- [ ] All P1 routes build statically and appear in sitemap.xml
- [ ] RFQ form validates, submits, and prefills from product pages
- [ ] WhatsApp + email links use real confirmed contact details
- [ ] Certifications shown are confirmed by Allvora
- [ ] JSON-LD validates for Organization, Product, FAQPage, BreadcrumbList
- [ ] Lighthouse mobile ≥ 90/95/95 (perf/a11y/SEO), no CLS from fonts
- [ ] 360px, 768px, 1280px, 1920px layouts checked
- [ ] Keyboard-only pass: nav, mega-menu, accordion, form all operable; focus visible
- [ ] `prefers-reduced-motion` disables reveals
- [ ] Every `[generated, review]` and `[confirm]` item resolved or consciously deferred
- [ ] 404 page designed (in brand, links to products + RFQ)
- [ ] OG image renders correctly when a URL is shared

*End of master build document.*
