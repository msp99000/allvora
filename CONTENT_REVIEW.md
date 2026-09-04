# Content review

Everything on this site that Allvora must confirm, correct or supply before
launch. Nothing in this list is wrong; it is either drafted copy that needs a
human read, or a deliberate placeholder that must not go live as-is.

Work top to bottom. The first section blocks launch.

---

## 1. Blocking: placeholders that must not ship

### 1.1 Contact details

All contact values are `{{TOKEN}}` placeholders and are visible on the site
today (footer, contact page, quote page, WhatsApp links in the header).

| Token | Where it is set | Appears on |
|---|---|---|
| `{{EMAIL}}` | `src/data/site.ts` | footer, /contact, /request-a-quote |
| `{{PHONE}}` | `src/data/site.ts` | footer, /contact |
| `{{WHATSAPP}}` | `src/data/site.ts` | header icon, footer, /contact, /request-a-quote |
| `{{CITY}}`, `{{STATE}}` | `src/data/site.ts` | /contact registered office |

All five are set in one file. Replace the values and set each channel's
`placeholder` flag to `false`. Nothing else needs editing.

Placeholders are deliberately never emitted into structured data: `lib/seo.ts`
strips any unresolved token before it can reach Organization JSON-LD, and
`scripts/audit-seo.ts` fails the build check if one appears. So the site is safe
to deploy with placeholders visible, but it should not be announced.

### 1.2 Certifications: none are confirmed

`src/data/certifications.ts` lists four registrations, all with
`confirmed: false`:

- APEDA registration
- FSSAI licence
- Importer Exporter Code (IEC)
- Spices Board of India registration

Section 5.4 of the brief forbids displaying an unconfirmed certification. While
`confirmed` is false, each is shown with a dashed border and an asterisk, the
trust bar carries the line "Registrations pending confirmation before launch",
and the quality page marks each one "Pending".

**Two options before launch.** Either supply the certificate for each and set
`confirmed: true`, or set `NEXT_PUBLIC_SHOW_UNCONFIRMED_CERTS=false` so
unconfirmed entries stop rendering entirely.

The trust bar text ("APEDA Registered · FSSAI Certified · IEC Licensed · COA
With Every Shipment · Quote Within 24 Hours") comes from the brief and asserts
these registrations. It must be confirmed or edited in `certifications.ts`.

### 1.3 The logo is a placeholder

`public/brand/allvora-mark.svg` and the inline mark in
`src/components/layout/Logo.tsx` are drawn to the brand direction in Section 3.1
(peacock feather barbs across a globe, gold eye ring, cobalt core). They are not
the real brand asset. Replace both with the supplied artwork.

### 1.4 Production domain

`site.url` in `src/data/site.ts` is set to `https://www.allvoraresources.com`. It drives
every canonical URL, the sitemap, and OG image URLs. Confirm it before the first
crawl.

### 1.5 Email delivery is not configured

`/api/rfq` logs enquiries to the server console and returns success. Nothing is
emailed until three environment variables are set. See the README.

---

## 2. Confirm: facts stated in copy

- **MOQ.** The FAQ answer is "MOQ depends on the product and packaging format.
  Share your requirement and we will confirm the workable minimum." No number is
  stated anywhere. Confirm this is the position you want, or supply real
  minimums.
- **Response time.** "Within 24 hours" appears on most pages, in the trust bar
  and in the RFQ success state. Set in `site.responseWindow`.
- **Incoterms.** "FOB and CIF are standard; other terms on request."
- **Samples.** "Samples can be arranged for serious buyer inquiries; courier
  terms are confirmed per request."
- **Business hours.** /contact says the phone is answered during "Business
  hours, India Standard Time." Confirm or change.
- **Halal documentation.** The Middle East market page says halal documentation
  is "arranged where the destination or buyer requires it". Confirm Allvora can
  do this.
- **Organic certification.** Moringa and ghee FAQs say certified organic is
  available and that the supplying processor's certificate is passed on. Confirm.

---

## 3. `[generated, review]`: copy drafted by Claude Code

Approved copy from Sections 5.1 to 5.11 of the brief is used verbatim and is not
listed here. Everything below was written to the brief's register and needs a
read for accuracy.

### 3.1 Product and variety copy (`src/data/products.ts`)

| Item | Count | Note |
|---|---|---|
| Product page intros | 11 | 2 to 3 sentences each |
| Variety intros, generated | 25 | every P1 variety except the two exemplars |
| Variety intros, approved | 2 | 1121 Basmati and Teja S17, verbatim from Section 5.9 |
| SEO titles | 86 | derived from the approved table rows |
| SEO descriptions | 86 | derived from the approved table rows, 150 to 160 chars |
| Basmati processing form notes | 7 | Section 5.9 marks these `[draft, refine]` |

The variety intros state origin and buyer context (for example "Byadagi Kaddi is
the wrinkled, deep-red chilli from Karnataka"). These are general trade facts,
not claims about Allvora's supply chain, but they should be read by someone who
knows the trade.

### 3.2 Page copy

| Page | Status |
|---|---|
| `/about/sourcing-and-traceability` | main paragraph verbatim from Section 5.3 (marked `[draft, refine]` there). The four process stages and eight sourcing regions in `src/data/sourcing.ts` are generated. |
| `/private-label-and-packaging` | main paragraph verbatim from Section 5.5 (marked `[draft, refine]`). The three formats and five process stages are generated. |
| `/markets/*` | all 7 region pages. Section 5.7 marks the region template `[draft, refine]`. Intros, buyer profiles and destination requirement lists are generated. |
| `/quality-and-certifications` | standing paragraph verbatim from Section 5.4. The parameter list and document table are generated from the brief's lists. |

### 3.3 FAQs (`src/data/faqs.ts`)

- The 6 general FAQs are verbatim from Section 5.11.
- Product FAQs, 3 to 4 per product across 11 products, are generated.
- Variety FAQs for 1121 and Teja S17 use the exact questions given in Section
  5.9; the answers are generated.
- Every other variety page builds its 3 questions from its own data row, so no
  two variety pages carry identical answer text.

### 3.4 Blog posts (`src/content/blog/`)

All three are generated, roughly 900 to 1200 words each:

1. `1121-vs-1509-basmati.mdx`
2. `black-pepper-grades-explained.mdx`
3. `how-to-verify-an-indian-exporter.mdx`

These make general claims about the Indian trade (grading systems, what
registrations cover). They are written conservatively and carry a note that they
are not a substitute for destination-market requirements, but they should be
reviewed by someone with trade knowledge before publishing.

---

## 4. Decisions taken, for your confirmation

These are judgement calls made during the build. Each is reversible.

**P2 variety pages are not built.** The brief lists 27 P1 varieties to build
first and marks the remaining 59 as P2. Those 59 have no intro copy written, so
publishing them would mean 59 near-identical thin pages, which Section 7.8 rules
out as doorway pages. They stay in the product Specification Ledger as data
(buyers still see every grade), their URLs return 404, and they are absent from
the sitemap. To ship them: write their intros, then set
`LAUNCH_P2_VARIETIES = true` in `src/lib/routes.ts`.

**Variety titles run past 60 characters.** Section 7.1 specifies the pattern
"[Variety] [Product] Exporter & Supplier from India | Allvora Resources" and
also asks for 60 characters where possible. Both are not achievable together:
the brand suffix alone is 20 characters. The specified pattern was kept, so 40
titles run 66 to 79 characters. The distinctive part leads, so a truncated
result still reads correctly. Drop the suffix from `title.template` in
`src/app/layout.tsx` if you would rather have short titles.

**Desiccated coconut.** The approved table has two rows both named "Desiccated
Coconut", differing only by grade (Fine and Medium). They became
`desiccated-coconut-fine` and `desiccated-coconut-medium`. The brief's P1 list
says "Desiccated Coconut" without specifying which, so Fine is P1 and Medium is
P2, to avoid two near-duplicate pages competing for the same query.

**"Guntur varieties" renders as "Guntur".** The table row reads "Guntur
varieties", which would produce the H1 "Guntur varieties Red Chilli exporter and
supplier from India". The variety is named "Guntur" throughout.

**Display font.** Section 3.2 offered Zodiak, Sentient or Libre Caslon Text.
Zodiak and Sentient are Fontshare fonts and cannot be self-hosted through
`next/font/google`, which the brief requires. Libre Caslon Text was chosen.

**Scroll reveals animate movement, not opacity.** Section 3.2 asks for
scroll-triggered fade-ins on section headings. A scroll-driven opacity fade
leaves text part-transparent whenever the timeline is mid-range, which measured
3.25:1 and fails the AA floor that Section 3.4 makes non-negotiable, and it
renders headings invisible on a page too short to scroll. The scroll reveal
animates the 8px rise only. The hero keeps its full fade, because that animation
is time-based and always completes.

**Analytics is an empty slot.** `src/components/shared/Analytics.tsx` renders
nothing. No third-party script ships until a provider is chosen.

**OG cards use the runtime's default font.** The card layout, palette and
feather arc are on-brand, but `next/og` cannot use `next/font` output and
fetching a font file per request would add a failure mode to a decorative asset.
Swapping in Libre Caslon Text is a follow-up if the cards matter enough.

---

## 5. Not done

- Real photography. The image system is built and wired in (see section 6), but
  every slot is still a placeholder awaiting a photograph.
- `/about/why-source-from-india/`, industries pages and product-plus-country
  pages. All marked P2 in Section 4.
- The Phase 2 blog topic bank (7 further posts listed in Section 5.10).

---

## 6. Photography: 15 slots awaiting a photograph

The image system is built. Every slot renders a branded placeholder at the
correct aspect ratio, with the alt text already written. Supplying a photograph
is one line: drop the file in `public/photography/` and set `src` on that entry
in `src/data/images.ts`. No layout changes, and nothing shifts, because the slot
already reserves the space.

Art direction, from Section 3.3: macro texture shots of the actual commodity,
consistent warm grade, documentary sourcing imagery. No stock-photo handshakes,
no globe clip art.

### Category slots (4), shown on the home page and /products/

| Slot | What to shoot |
|---|---|
| `spices` | Macro group: whole dried red chilli, black peppercorns, green cardamom pods, broken turmeric fingers. Raked light for skin and wrinkle texture. |
| `agri-natural` | Macro group: bright green moringa powder, white desiccated coconut, the fibrous brown face of a cocopeat block. The three colours carry the frame. |
| `food` | Macro of extra-long-grain Basmati filling the frame, grains separated enough to read individual length, ghee in shallow focus behind. |
| `tea-coffee` | Split macro: dark curled orthodox tea leaf against pale green unroasted Arabica beans, same grade across both halves. |

### Product slots (11), shown on each product page and inherited by its varieties

| Slot | What to shoot |
|---|---|
| `red-chilli` | Whole dried chilli filling the frame; skin wrinkle and deep red are the subject. Shoot a stemless variant too. |
| `black-pepper` | Whole peppercorns; berry size and wrinkled surface, since buyers grade on size and density. |
| `cardamom` | Green pods; colour and pod size front and centre. A scale reference would suit the grading story. |
| `turmeric` | Whole dried fingers with a heap of ground powder alongside, so both supplied forms read in one frame. |
| `moringa` | Powder, where colour is the whole point, with dried whole leaf alongside. Colour accuracy over styling. |
| `coconut` | Group across the chain: mature nut, copra, fine desiccated, oil in glass. White on a warm ground. |
| `cocopeat` | Documentary rather than macro: a 5 kg compressed block beside the same material expanded loose, to show compression ratio. |
| `basmati-rice` | Grains separated enough to read individual length, since length is the parameter buyers specify. |
| `ghee` | Warm side light on ghee in clear glass, half set and half liquid if possible. |
| `tea` | Dry leaf so grade reads. Shoot CTC granules and orthodox whole leaf identically for comparison. |
| `coffee` | Green (unroasted) beans, since Allvora supplies green. Bean size and uniformity are what buyers grade on. |

### Two notes

**Alt text is already written and is deliberately conservative.** It describes
the photograph, not the variety. A variety page without its own photo inherits
the product photograph and keeps the product's alt text, because describing a
Sannam S4 photograph as Teja S17 would be a false statement in the
accessibility layer. If you shoot per variety, add an entry to `varietyImages`
in `src/data/images.ts` with alt text naming that variety, which is also what
Section 7.6 asks for.

**Shoot to a consistent crop.** Category slots render 16:9, product and variety
slots render 4:3. Supplying images near those ratios avoids awkward cropping,
though `object-cover` will handle any ratio without breaking the layout.
