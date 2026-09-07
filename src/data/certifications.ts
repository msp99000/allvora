/**
 * Registrations and certifications shown in the TrustBar, the footer badge row
 * and on /quality-and-certifications/.
 *
 * PROJECT_BRIEF.md Section 5.4: do not display an unconfirmed certification.
 * Every entry below is a launch placeholder with `confirmed: false`. Flip the
 * flag only once Allvora has supplied the registration document. Anything left
 * unconfirmed is rendered with a "pending confirmation" treatment in the dev
 * styleguide and is listed in CONTENT_REVIEW.md.
 */

export interface Certification {
  id: string;
  /** Short form used in the TrustBar. */
  short: string;
  /** Full name used on the certifications page. */
  name: string;
  /** Issuing body. */
  issuer: string;
  /** One sentence on what it means to a buyer. */
  meaning: string;
  confirmed: boolean;
}

export const certifications: Certification[] = [
  {
    id: "apeda",
    short: "APEDA Registered",
    name: "APEDA registration",
    issuer: "Agricultural and Processed Food Products Export Development Authority",
    meaning:
      "Registration with the Indian authority that oversees the export of scheduled agricultural and processed food products.",
    confirmed: false,
  },
  {
    id: "fssai",
    short: "FSSAI Certified",
    name: "FSSAI licence",
    issuer: "Food Safety and Standards Authority of India",
    meaning:
      "The food safety licence required to handle and export food products from India.",
    confirmed: false,
  },
  {
    id: "iec",
    short: "IEC Licensed",
    name: "Importer Exporter Code (IEC)",
    issuer: "Directorate General of Foreign Trade",
    meaning:
      "The code that permits a business to clear goods through Indian customs for export.",
    confirmed: false,
  },
  {
    id: "spices-board",
    short: "Spices Board Registered",
    name: "Spices Board of India registration",
    issuer: "Spices Board of India, Ministry of Commerce and Industry",
    meaning:
      "Registration as an exporter of spices and spice products, required for spice consignments leaving India.",
    confirmed: false,
  },
];

/**
 * Service commitments. Every one of these is a promise Allvora makes in the
 * approved copy, so they can be shown without any further verification.
 */
const serviceCommitments: string[] = [
  "COA With Every Shipment",
  "Specifications Confirmed Before Shipment",
  "Quote Within 24 Hours",
];

/**
 * The dot-separated TrustBar strip.
 *
 * Only CONFIRMED registrations appear here. An unconfirmed registration is an
 * unverified claim, and the site is live: showing "APEDA Registered" before the
 * document exists asserts something to a buyer that may not be true, and
 * showing it with a "pending confirmation" footnote publishes an internal note
 * to customers. Neither is acceptable on a production site, so both are gone
 * and the strip stands on commitments that are already true.
 *
 * Flip `confirmed: true` on a certification above and it rejoins the strip.
 */
export const trustBarItems: string[] = [
  ...certifications.filter((c) => c.confirmed).map((c) => c.short),
  ...serviceCommitments,
];

export const unconfirmedCertifications = certifications.filter((c) => !c.confirmed);

/**
 * What may actually be shown to a visitor.
 *
 * One rule, in one place, for every surface that renders a registration: the
 * TrustBar, the footer badge row and the quality page. In production only
 * confirmed registrations render, because an unconfirmed one is an unverified
 * claim being made to a buyer. In development they all render, carrying a
 * pending marker, so the team keeps seeing what still needs a document.
 */
export const visibleCertifications: Certification[] =
  process.env.NODE_ENV === "production"
    ? certifications.filter((c) => c.confirmed)
    : certifications;

/** Export documents Allvora coordinates, shown as a Specification Ledger block. */
export interface ExportDocument {
  id: string;
  name: string;
  note: string;
}

export const exportDocuments: ExportDocument[] = [
  {
    id: "coa",
    name: "Certificate of Analysis (COA)",
    note: "Tested parameters for the shipped lot, against the agreed specification.",
  },
  {
    id: "phytosanitary",
    name: "Phytosanitary certificate",
    note: "Plant health clearance for the destination country.",
  },
  {
    id: "origin",
    name: "Certificate of origin",
    note: "Confirms Indian origin for customs and tariff treatment.",
  },
  {
    id: "fumigation",
    name: "Fumigation certificate",
    note: "Issued where the destination requires treated cargo or wood packaging.",
  },
  {
    id: "health",
    name: "Health certificate",
    note: "Issued for food products where the destination authority requires it.",
  },
  {
    id: "other",
    name: "Other destination-required documentation",
    note: "Coordinated per market and per product at the specification stage.",
  },
];
