/**
 * SEO contract, PROJECT_BRIEF.md Section 7.
 *
 * Every page's metadata and every JSON-LD block is built here, from the data
 * layer. Nothing is hand-written into a page.
 *
 * Two rules enforced in code rather than by discipline:
 *   1. No price and no rating ever appears in Product schema. This is an RFQ
 *      business (Section 7.8).
 *   2. Unresolved {{TOKEN}} placeholders are stripped before they can reach
 *      structured data. A placeholder phone number in schema is worse than no
 *      phone number at all.
 */

import type { Metadata } from "next";

import type { BlogPost } from "@/data/blog";
import { categories, type Category } from "@/data/categories";
import type { Faq } from "@/data/faqs";
import type { Market } from "@/data/markets";
import type { Product, Variety } from "@/data/products";
import { site } from "@/data/site";

const BRAND = site.name;

export function absoluteUrl(path: string): string {
  const clean = path === "/" ? "" : path.replace(/\/$/, "");
  return `${site.url}${clean}`;
}

/** True when a value still contains a {{TOKEN}} placeholder. */
function isPlaceholder(value: string | undefined): boolean {
  return !value || /\{\{[A-Z_]+\}\}/.test(value);
}

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  /** Mono eyebrow, rendered on the OG card above the title. */
  eyebrow?: string;
  noindex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
}

/**
 * The one metadata builder. Title is passed without the brand suffix; the root
 * layout's title template appends it.
 */
export function buildMetadata({
  title,
  description,
  path,
  eyebrow,
  noindex,
  type = "website",
  publishedTime,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = ogImageUrl(title, eyebrow);

  return {
    title,
    description,
    alternates: { canonical: url },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title: `${title} | ${BRAND}`,
      description,
      url,
      siteName: BRAND,
      locale: "en_US",
      type,
      ...(publishedTime ? { publishedTime } : {}),
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${title}, ${BRAND}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${BRAND}`,
      description,
      images: [ogImage],
    },
  };
}

/** Branded OG card, rendered by src/app/api/og/route.tsx. */
export function ogImageUrl(title: string, eyebrow?: string): string {
  const params = new URLSearchParams({ title });
  if (eyebrow) params.set("eyebrow", eyebrow);
  return `${site.url}/api/og?${params.toString()}`;
}

/* ------------------------------------------------------------------------ */
/* JSON-LD                                                                    */
/* ------------------------------------------------------------------------ */

type JsonLdObject = Record<string, unknown>;

/** Sitewide, emitted once in the root layout. */
export function organizationJsonLd(): JsonLdObject {
  const contactPoint: JsonLdObject = {
    "@type": "ContactPoint",
    contactType: "sales",
    areaServed: ["Europe", "Middle East", "North America", "Africa", "Asia", "Oceania"],
    availableLanguage: ["English"],
  };
  if (!isPlaceholder(site.email.label)) contactPoint.email = site.email.label;
  if (!isPlaceholder(site.phone.label)) contactPoint.telephone = site.phone.label;

  const org: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    description: site.description,
    slogan: site.tagline,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/brand/allvora-mark.svg"),
    },
    contactPoint: [contactPoint],
  };

  if (!site.address.placeholder) {
    org.address = {
      "@type": "PostalAddress",
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.countryCode,
    };
  }
  if (site.sameAs.length > 0) org.sameAs = site.sameAs;

  return org;
}

export function websiteJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    publisher: { "@id": `${site.url}/#organization` },
    inLanguage: "en",
  };
}

/**
 * Product schema for a variety page. No offers, no price, no aggregateRating:
 * an RFQ business has none of those, and fabricating them is out of bounds.
 * Specifications go in additionalProperty, which is where a buyer's structured
 * data belongs.
 */
export function productJsonLd(
  category: Category,
  product: Product,
  variety: Variety,
  path: string
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: variety.headingName,
    description: variety.intro ?? variety.seoDescription,
    url: absoluteUrl(path),
    category: `${category.name} / ${product.name}`,
    countryOfOrigin: { "@type": "Country", name: "IN" },
    brand: { "@type": "Brand", name: BRAND },
    manufacturer: { "@id": `${site.url}/#organization` },
    material: variety.forms.join(", "),
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Grade",
        value: variety.gradeType,
      },
      {
        "@type": "PropertyValue",
        name: "Available forms",
        value: variety.forms.join(", "),
      },
      ...variety.specs.map((spec) => ({
        "@type": "PropertyValue",
        name: "Buyer specification",
        value: spec,
      })),
    ],
  };
}

export function faqJsonLd(faqs: Faq[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export interface Crumb {
  name: string;
  href: string;
}

export function breadcrumbJsonLd(crumbs: Crumb[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.href),
    })),
  };
}

export function blogPostingJsonLd(post: BlogPost): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: absoluteUrl(`/blog/${post.slug}`),
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    datePublished: post.published,
    dateModified: post.published,
    author: { "@id": `${site.url}/#organization` },
    publisher: { "@id": `${site.url}/#organization` },
    inLanguage: "en",
    image: ogImageUrl(post.title, "GUIDE"),
  };
}

export function itemListJsonLd(name: string, items: Crumb[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.href),
    })),
  };
}

export function marketJsonLd(market: Market, path: string): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: market.h1,
    description: market.intro,
    url: absoluteUrl(path),
    about: { "@id": `${site.url}/#organization` },
    inLanguage: "en",
  };
}

/* ------------------------------------------------------------------------ */
/* Breadcrumb helpers, so every nested page builds the same trail            */
/* ------------------------------------------------------------------------ */

export function categoryCrumbs(category: Category): Crumb[] {
  return [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: category.name, href: `/products/${category.slug}` },
  ];
}

export function productCrumbs(category: Category, product: Product): Crumb[] {
  return [
    ...categoryCrumbs(category),
    { name: product.name, href: `/products/${category.slug}/${product.slug}` },
  ];
}

export function varietyCrumbs(
  category: Category,
  product: Product,
  variety: Variety
): Crumb[] {
  return [
    ...productCrumbs(category, product),
    {
      name: variety.name,
      href: `/products/${category.slug}/${product.slug}/${variety.slug}`,
    },
  ];
}

export function categoryFor(product: Product): Category {
  const found = categories.find((c) => c.slug === product.category);
  if (!found) throw new Error(`No category for product ${product.slug}`);
  return found;
}
