# What a buyer wants that the site does not answer

Written from the perspective of an importer who has landed on the site with a
real requirement, is comparing three or four Indian suppliers, and is deciding
who to send a specification to. Ranked by how likely each gap is to lose that
enquiry.

Most of these need information only Allvora has. Nothing here has been invented
or guessed. Give me the answers and I will wire them in.

---

## Tier 1: these lose enquiries today

### 1. Lead time is missing entirely

"How long from confirmed order to shipment?" is one of the first three questions
every importer asks, and the site never answers it. A buyer with a delivery
window cannot tell whether talking to you is worth their time.

**Need:** typical lead time by product line, e.g. "spices, 15 to 21 days from
confirmed order to container loading; Basmati, 20 to 30 days". Ranges are fine.
Seasonality matters too, if some products are crop-dependent.

### 2. No physical address

The site has an email and a phone number and no place. For a business asking
international buyers to send money, that is a real trust problem. Buyers also
check the address against the IEC and GST registries.

**Need:** the registered business address, and the city and state at minimum.
`site.ts` already has the fields and is currently rendering `{{CITY}}` and
`{{STATE}}`. This also enables PostalAddress in the Organization structured
data, which is currently omitted for exactly this reason.

### 3. No trust credentials visible at all

This is a trade-off I made deliberately, and you should know about it. Because
none of the four registrations is confirmed, the production site now shows
**zero** certifications. Previously it claimed three unverified ones, which was
worse. But a buyer comparing suppliers sees nothing where competitors show APEDA
and FSSAI numbers.

**Need:** the actual registration numbers, or confirmation that each is held.
IEC number, APEDA registration number, FSSAI licence number, Spices Board
registration. These are the single highest-value thing you can give me. Buyers
verify them against public registries, so the number matters more than a badge.

### 4. No minimum order quantity, even as a range

Every FAQ answer says "share your requirement and we will confirm the workable
minimum". A buyer reads that as evasive, and a small buyer cannot tell whether
they are too small to bother you.

**Need:** a workable floor per product line, even loose. "One 20ft FCL" or
"5 MT" is enough. It filters out enquiries you do not want and reassures the
ones you do.

### 5. Payment terms are absent

**Need:** what you accept. LC at sight, 30 percent TT advance with balance
against documents, DP, DA. Buyers price your terms into their decision, and
unstated terms read as inexperience.

---

## Tier 2: these differentiate you

### 6. HS codes per product

Serious importers need the HS code to calculate duty before they enquire.
Almost no small Indian exporter publishes them, so doing it is a visible
competence signal and it earns long-tail search traffic.

**Need:** the 6 or 8 digit HS code per product. Eleven codes. I would add an
`hsCode` field to `products.ts` and show it in the Specification Ledger.

### 7. Port of loading

Buyers calculate freight from the port. Not stating it means they cannot
estimate landed cost.

**Need:** which ports you ship from, e.g. Nhava Sheva, Chennai, Tuticorin,
Mundra.

### 8. Packaging formats and container loadability

The site says "packaging agreed per order" everywhere. Buyers plan around known
formats and want to know how much fits in a container.

**Need:** standard bag or carton sizes per product line (25 kg PP bags, 50 kg
jute, 10 kg cartons) and approximate MT per 20ft FCL.

### 9. Sample policy specifics

"Samples can be arranged" does not tell a buyer whether samples are free, who
pays courier, or how long they take.

**Need:** sample size, who bears cost, typical courier time.

### 10. Nobody is named anywhere

The site has no people on it. In this trade, buyers deal with a person, and
Google's E-E-A-T signals reward identifiable expertise. A founder or trade
lead with a name, a role and two lines of background would help both.

**Need:** a name, role, and a sentence or two of experience for whoever owns
buyer relationships. A photograph if they are willing.

---

## Tier 3: worth doing once Tier 1 and 2 are done

### 11. No proof of trade

No shipment photographs, no destinations actually served, no volumes moved, no
buyer references. Everything on the site describes capability rather than
history. If Allvora is new, that is honest and fine, and the way to compensate
is documentation depth, which the site already does well. If shipments have
happened, even a photo of a loaded container earns more trust than any copy.

### 12. No downloadable specification sheet

Buyers forward things internally. A per-product PDF that a buyer can send to
their QA colleague is a common and low-cost trade tool.

### 13. What happens after the RFQ is not stated

The form promises a response within 24 hours but does not say what arrives:
a price, a spec sheet, a sample offer, a question. Setting that expectation
raises completion rates.

### 14. Only three blog posts

The topic bank in Section 5.10 of the brief has seven more, and each targets a
real buyer query. This is the cheapest way to grow qualified traffic once the
trust gaps are closed.

---

## What I would do first

If you give me only three things, make them:

1. **The registration numbers** (IEC, APEDA, FSSAI, Spices Board)
2. **The business address**
3. **Lead times and MOQ ranges per product line**

Those three close the gap between "this looks like a real exporter" and "I can
verify this is a real exporter", which is the entire decision a first-time buyer
is making on this site.
