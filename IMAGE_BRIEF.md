# Image brief for Allvora Resources

15 image slots. Every one currently renders a branded placeholder, so the site
looks finished without them. Adding a photo never changes layout: the slot
already reserves its aspect ratio.

## How to add one

1. Save the file into `public/photography/` using the **exact filename** below.
2. Open `src/data/images.ts`, find that entry, change `src: null` to the path.

```ts
"red-chilli": {
  src: "/photography/red-chilli.jpg",   // was null
  alt: "Whole dried red chillies shown close, with stems and wrinkled skin visible.",
  ...
},
```

That is the whole change. Alt text is already written for all 15.

## Specification

| | |
|---|---|
| Format | JPG (or WebP) |
| Category slots | **16:9** landscape, at least 1600 x 900 |
| Product slots | **4:3** landscape, at least 1600 x 1200 |
| File size | Aim under 400 KB each; `next/image` re-encodes and serves AVIF/WebP |
| Colour | Warm, consistent grade across the whole set. This matters more than any single shot |
| Avoid | Stock-photo handshakes, globe clip art, busy props, cool blue casts, visible foreign branding or price stickers |

The set reading as one consistent system matters more than any individual
photograph being perfect.

---

## 4 category slots (16:9)

Shown on the home page and on `/products/`.

| # | Filename | Shot |
|---|---|---|
| 1 | `spices.jpg` | Macro group: whole dried red chilli, black peppercorns, green cardamom pods, broken turmeric fingers. Raked side light for skin and wrinkle texture |
| 2 | `agri-natural.jpg` | Macro group: bright green moringa powder, white desiccated coconut, the fibrous brown face of a cocopeat block. Those three colours carry the frame |
| 3 | `food.jpg` | Extra-long-grain Basmati filling the frame, grains separated enough to read individual length, ghee in shallow focus behind |
| 4 | `tea-coffee.jpg` | Split macro: dark curled orthodox tea leaf on one side, pale green unroasted Arabica beans on the other, same grade across both halves |

## 11 product slots (4:3)

Shown on each product page, and inherited by that product's variety pages.

| # | Filename | Shot |
|---|---|---|
| 5 | `red-chilli.jpg` | Whole dried chilli filling the frame. Skin wrinkle and deep red are the subject |
| 6 | `black-pepper.jpg` | Whole peppercorns. Berry size and wrinkled surface, since buyers grade on size and density |
| 7 | `cardamom.jpg` | Green pods, colour and pod size front and centre |
| 8 | `turmeric.jpg` | Whole dried fingers with a heap of ground powder alongside, so both supplied forms read in one frame |
| 9 | `moringa.jpg` | Powder, where colour is the whole point, with dried whole leaf alongside. Colour accuracy over styling |
| 10 | `coconut.jpg` | Group across the chain: mature nut, copra, fine desiccated, oil in glass. White on a warm ground |
| 11 | `cocopeat.jpg` | Documentary rather than macro: a 5 kg compressed block beside the same material expanded loose, to show the compression ratio buyers ask about |
| 12 | `basmati-rice.jpg` | Grains separated enough to read individual length, since length is the parameter buyers specify |
| 13 | `ghee.jpg` | Warm side light on ghee in clear glass, half set and half liquid if possible |
| 14 | `tea.jpg` | Dry leaf so grade reads. If you shoot two, do CTC granules and orthodox whole leaf identically |
| 15 | `coffee.jpg` | Green (unroasted) beans, since Allvora supplies green beans, not roasted. Bean size and uniformity are what buyers grade on |

---

## Two cautions

**Coffee must be unroasted.** Allvora supplies green beans. A photo of glossy
dark roasted beans shows a product that is not for sale, and a coffee buyer will
notice immediately.

**Do not label a photo as a specific variety.** A generic red chilli photo on the
Red Chilli product page is fine and representative. The same photo on the
Teja S17 page, captioned as Teja S17, misleads a buyer who is choosing on ASTA
colour and pod length. Variety pages inherit the product photo and keep the
product's alt text for exactly this reason. Only add a per-variety entry
(`varietyImages` in `src/data/images.ts`) if the photo really is that grade.

## If sourcing from the web

Check the licence permits **commercial use and modification** (the site crops).

- Safe: CC0, Public Domain Mark, Pexels, Unsplash
- Needs attribution: CC-BY (workable, tell me and I will add a credits line)
- Do not use: CC BY-ND (forbids the crop), CC BY-SA (viral copyleft), CC BY-NC
  (non-commercial), and anything from a Google Images result without checking
  the source licence

Real product photography beats any of these, and even consistent phone photos of
actual stock on one background would look better than a stock library, because
they show your grades.
