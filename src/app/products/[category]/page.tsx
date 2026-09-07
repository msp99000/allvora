import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type * as React from "react";

import { RfqCta } from "@/components/product/RfqCta";
import { SpecTable } from "@/components/product/SpecTable";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Container } from "@/components/shared/Container";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { JsonLd } from "@/components/shared/JsonLd";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { categories, getCategory } from "@/data/categories";
import { generalFaqs } from "@/data/faqs";
import { productsInCategory } from "@/data/products";
import { buildMetadata, categoryCrumbs, itemListJsonLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[category]">): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};

  return buildMetadata({
    title: category.seoTitle,
    description: category.seoDescription,
    path: `/products/${category.slug}`,
    eyebrow: category.name.toUpperCase(),
  });
}

export default async function CategoryPage({
  params,
}: PageProps<"/products/[category]">) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const items = productsInCategory(category.slug);

  return (
    <div
      style={
        { "--cat": category.accent, "--cat-tint": category.accentTint } as React.CSSProperties
      }
    >
      <JsonLd
        data={itemListJsonLd(
          `${category.name} products`,
          items.map((p) => ({
            name: p.name,
            href: `/products/${category.slug}/${p.slug}`,
          }))
        )}
      />

      <section className="border-b border-rule">
        {/* The line's colour, held across every page beneath it. */}
        <div aria-hidden className="h-1 w-full bg-[var(--cat)]" />
        <Container className="py-16 sm:py-20">
          <Breadcrumbs crumbs={categoryCrumbs(category)} className="mb-8" />
          <div className="max-w-3xl">
            <Eyebrow>{category.name}</Eyebrow>
            <h1 className="type-title mt-5">
              {category.h1}
            </h1>
            <p className="mt-8 type-lead text-ink-600">
              {category.intro}
            </p>
          </div>
        </Container>
      </section>

      {items.map((product, index) => (
        <section
          key={product.slug}
          aria-labelledby={`product-${product.slug}`}
          className={index % 2 === 1 ? "border-y border-rule bg-ivory-100/50" : ""}
        >
          <Container className="py-16 sm:py-20">
            <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
              <SectionHeading
                eyebrow={`${product.varieties.length} varieties and grades`}
                title={
                  <Link
                    id={`product-${product.slug}`}
                    href={`/products/${category.slug}/${product.slug}`}
                    className="transition-colors hover:text-peacock-600"
                  >
                    {product.name}
                  </Link>
                }
                intro={product.intro}
              />
              <Link
                href={`/products/${category.slug}/${product.slug}`}
                className="eyebrow shrink-0 text-gold-700 underline decoration-gold-500/50 underline-offset-4 transition-colors hover:decoration-gold-500"
              >
                {product.name} details
              </Link>
            </div>
            <SpecTable product={product} categorySlug={category.slug} />
          </Container>
        </section>
      ))}

      <section>
        <Container className="py-20 sm:py-24">
          <FaqAccordion faqs={generalFaqs} title="Common questions" />
        </Container>
      </section>

      <RfqCta
        heading={`Send your ${category.name.toLowerCase()} specification.`}
        body="Tell us the variety, grade, volume and destination. We respond within 24 hours."
        categorySlug={category.slug}
      />
    </div>
  );
}
