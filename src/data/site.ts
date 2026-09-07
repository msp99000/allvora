/**
 * Single source of truth for company identity and contact channels.
 *
 * Values written as {{TOKEN}} are placeholders. They are listed in
 * CONTENT_REVIEW.md and must be replaced with details confirmed by Allvora
 * Resources before launch. Never invent a phone number or an address.
 */

export interface SiteContact {
  /** Display form, used as link text. */
  label: string;
  /** href for the anchor, already protocol-qualified. */
  href: string;
  /** True while the value is still a placeholder. */
  placeholder: boolean;
}

export interface SiteConfig {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  /** Production origin, no trailing slash. */
  url: string;
  locale: string;
  email: SiteContact;
  phone: SiteContact;
  whatsapp: SiteContact;
  address: {
    locality: string;
    region: string;
    country: string;
    countryCode: string;
    placeholder: boolean;
  };
  /** Profiles for Organization JSON-LD sameAs. Empty until confirmed. */
  sameAs: string[];
  /** Turnaround promise used in copy and in the RFQ success state. */
  responseWindow: string;
}

const EMAIL = "business@allvoraresources.com";
/** E.164 for links, spaced for display. */
const PHONE_E164 = "+916369775715";
const PHONE_DISPLAY = "+91 63697 75715";

export const site: SiteConfig = {
  name: "Allvora Resources",
  legalName: "Allvora Resources",
  tagline: "Indian Products. Global Reach. Reliable Sourcing.",
  description:
    "Allvora Resources is an India-based export and sourcing company supplying spices, rice, ghee, tea, coffee and natural products to international buyers, to specification and with documentation.",
  url: "https://www.allvoraresources.com",
  locale: "en",
  email: {
    label: EMAIL,
    href: `mailto:${EMAIL}`,
    placeholder: false,
  },
  phone: {
    label: PHONE_DISPLAY,
    href: `tel:${PHONE_E164}`,
    placeholder: false,
  },
  whatsapp: {
    label: PHONE_DISPLAY,
    href: `https://wa.me/${PHONE_E164.replace(/[^\d]/g, "")}`,
    placeholder: false,
  },
  address: {
    locality: "{{CITY}}",
    region: "{{STATE}}",
    country: "India",
    countryCode: "IN",
    placeholder: true,
  },
  sameAs: [],
  responseWindow: "within 24 hours",
};

/** Every placeholder token still present in the site config. */
export function unresolvedContactTokens(): string[] {
  const tokens: string[] = [];
  if (site.email.placeholder) tokens.push("{{EMAIL}}");
  if (site.phone.placeholder) tokens.push("{{PHONE}}");
  if (site.whatsapp.placeholder) tokens.push("{{WHATSAPP}}");
  if (site.address.placeholder) tokens.push("{{CITY}}", "{{STATE}}");
  return tokens;
}
