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
 * The dot-separated TrustBar strip. The last two items are service commitments
 * rather than registrations, so they are not certification records.
 */
export const trustBarItems: string[] = [
  ...certifications.slice(0, 3).map((c) => c.short),
  "COA With Every Shipment",
  "Quote Within 24 Hours",
];

export const unconfirmedCertifications = certifications.filter((c) => !c.confirmed);

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
