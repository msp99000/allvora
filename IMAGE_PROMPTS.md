# Image generation prompts, Allvora Resources

16 prompts, one per image slot. Written for Nano Banana (Gemini), and they work
in Midjourney, Flux or DALL-E with minor trimming.

## Before you start

**Style anchor.** Paste this in front of every prompt so the set looks like one
shoot rather than sixteen stock photos:

> Editorial commodity photography for an Indian agricultural export company.
> Natural directional light from one side, deep shadows, warm neutral grade,
> shot on a 50mm lens at f/4 on a full-frame camera. Realistic, documentary,
> unstyled. No text, no logos, no watermarks, no packaging labels, no people's
> faces. Muted background, colour comes from the product itself.

**Negative prompt** (Nano Banana takes this as a trailing instruction; Midjourney
uses `--no`):

> no text, no watermark, no logo, no brand packaging, no hands holding product
> unnaturally, no plastic supermarket trays, no cartoon or illustration, no HDR
> glow, no blue colour cast, no confetti scatter of spices, no white studio
> seamless background

**Sizes.** Generate at the largest the model allows, then downscale.
- Hero: 16:9, target 2400x1350
- Category slots: 16:9, target 1920x1080
- Product slots: 4:3, target 1600x1200

**Filenames** are listed per prompt. Save into `public/photography/`.

---

## 1. Hero, `hero.jpg` (16:9) — the most important image on the site

> [style anchor] A wide, slightly elevated view inside an Indian spice warehouse
> at mid-morning. Open jute sacks of dried red chillies and turmeric fingers in
> the middle and right of the frame, rolled down to show the product. Shafts of
> daylight from a doorway on the right, fine dust visible in the light. The left
> third of the frame is darker and largely empty, in shadow, so text can sit over
> it. Deep greens and browns in the architecture, saturated red and ochre from
> the product. Cinematic, documentary, no people in focus.

**Critical:** the left third must stay dark and uncluttered. The headline sits
there. If the generated image is busy on the left, regenerate rather than crop.

---

## Category slots (16:9)

### 2. Spices, `spices.jpg`
> [style anchor] Overhead macro arrangement of four Indian spices in separate
> loose piles almost touching: whole dried red chillies, black peppercorns, green
> cardamom pods, and broken turmeric fingers. Dark weathered wood surface. Raked
> side light bringing out the wrinkled skin of the chilli and the texture of the
> peppercorns. Rich saturated colour against a dark ground.

### 3. Agricultural & Natural, `agri-natural.jpg`
> [style anchor] Overhead macro of three materials side by side in loose piles:
> vivid green moringa leaf powder, snow white desiccated coconut, and dark brown
> fibrous coconut coir pith. Dark slate surface. The three colours carry the
> frame. Soft directional light, visible powder and fibre texture.

### 4. Grains & Dairy, `food.jpg`
> [style anchor] Macro of extra long grain Indian Basmati rice filling the frame,
> raw uncooked grains lying loose and separated enough to see individual grain
> length and the slender pointed shape. A shallow brass bowl of golden clarified
> ghee softly out of focus behind. Warm side light, dark background.

### 5. Tea & Coffee, `tea-coffee.jpg`
> [style anchor] Split composition, macro. Left half: dark curled dry orthodox
> Assam black tea leaves. Right half: pale green unroasted raw coffee beans. The
> two materials meet in a clean line down the centre. Dark surface, single
> directional light across both halves, identical exposure on each side.

---

## Product slots (4:3)

### 6. Red chilli, `red-chilli.jpg`
> [style anchor] Extreme macro of whole dried red chillies filling the frame,
> stems attached, deep glossy red with pronounced wrinkled skin. Raked light from
> the left throwing texture into relief. A few chillies in sharp focus, the rest
> falling off. Dark background.

### 7. Black pepper, `black-pepper.jpg`
> [style anchor] Extreme macro of whole black peppercorns filling the frame, each
> berry's wrinkled surface clearly resolved, uniform large berry size. Hard side
> light. Dark slate surface. Shallow depth of field with a band of sharp focus
> across the middle.

### 8. Cardamom, `cardamom.jpg`
> [style anchor] Macro of whole green cardamom pods filling the frame, plump and
> ridged, vivid natural green with pale ribbing. A few pods split open showing
> dark seeds inside. Soft directional light, dark neutral background.

### 9. Turmeric, `turmeric.jpg`
> [style anchor] Macro of whole dried turmeric fingers, hard and knobbly with
> dull orange-brown skin, arranged loosely, with a small heap of bright golden
> ground turmeric powder beside them. Dark surface, warm side light. Both forms
> clearly readable in one frame.

### 10. Moringa, `moringa.jpg`
> [style anchor] Macro of vivid green moringa leaf powder in a loose heap, fine
> and slightly clumping, beside a scattering of small dried whole moringa leaves.
> Colour accuracy is critical: a clean bright green, not olive and not neon. Dark
> matte surface, soft even light.

### 11. Coconut, `coconut.jpg`
> [style anchor] Group still life on a dark surface: one whole mature brown
> coconut, a piece of dried white copra, a loose heap of fine desiccated coconut,
> and a small glass jar of clear coconut oil. Warm side light. White product
> against a dark ground.

### 12. Cocopeat, `cocopeat.jpg`
> [style anchor] Documentary product shot: a dense rectangular compressed brown
> coconut coir block, beside a loose fluffy pile of the same material after
> expansion, so the difference in volume is obvious. Plain concrete floor, even
> daylight. Horticultural and industrial rather than styled.

### 13. Basmati rice, `basmati-rice.jpg`
> [style anchor] Extreme macro of raw uncooked Basmati rice grains, extra long
> and slender with pointed ends, spread in a single loose layer so individual
> grain length is clearly measurable. Pale translucent cream colour. Dark surface,
> low raking light to cast small shadows beside each grain.

### 14. Ghee, `ghee.jpg`
> [style anchor] A clear glass jar of golden ghee lit from the side, half of it
> set into a soft opaque grain and half melted to clear liquid gold, so both
> states are visible. Warm light through the glass. Dark background, no label on
> the jar.

### 15. Tea, `tea.jpg`
> [style anchor] Macro of dry loose black tea leaves filling the frame, dark
> tightly curled and twisted orthodox Assam leaf, with visible golden tips mixed
> through. Dark surface, single soft directional light. Texture of the leaf is
> the subject.

### 16. Coffee, `coffee.jpg`
> [style anchor] Macro of raw unroasted green coffee beans filling the frame,
> pale sage green with the distinctive centre crease clearly visible, uniform
> large bean size. Dark surface, soft directional light.

**Do not let the model roast these.** Image models default to dark glossy
roasted beans. If the output is brown, add "raw green unroasted coffee beans,
pale green, absolutely not roasted, not brown, not dark" and regenerate.

---

## Reviewing what comes back

Reject and regenerate if you see any of these. They are the usual failure modes:

- **Roasted coffee** on slot 16. Allvora sells green beans.
- **Cooked dishes.** Every slot is raw commodity, never a prepared dish.
- **Spices arranged in tidy spoons, bowls or rainbow rows.** That reads as
  supermarket stock photography and undoes the trading-house positioning.
- **Text or fake devanagari** rendered into the image. Image models invent
  garbled script on sacks and labels.
- **Six-fingered hands.** Avoid hands entirely; none of these prompts need one.
- **A blue or magenta cast.** The set must stay warm and neutral.
- **Turmeric powder that reads neon yellow**, or moringa that reads olive.

## After you have the files

Put them in `public/photography/` with the exact filenames above, then tell me
and I will wire them up. It is one line per image in `src/data/images.ts`, and
nothing about the layout changes because every slot already reserves its space.

## A note on honesty

These are generated images, not photographs of Allvora's actual stock. That is
fine for category and product pages, where they are representative. Two limits:

- Never put a generated image on a **variety** page implying it is that specific
  grade. A buyer choosing Teja S17 on ASTA colour would be misled.
- Replace them with real photographs of real lots as soon as you have them.
  A buyer who has visited a warehouse can tell, and real product photography is
  a genuine trust signal in this trade.
