import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { RfqCta } from "@/components/product/RfqCta";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Container } from "@/components/shared/Container";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { Chips } from "@/components/shared/MarketChips";
import { JsonLd } from "@/components/shared/JsonLd";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { categories } from "@/data/categories";
import { getMarket, markets } from "@/data/markets";
import { getProduct, productsInCategory } from "@/data/products";
import { buildMetadata, marketJsonLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return markets.map((market) => ({ region: market.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/markets/[region]">): Promise<Metadata> {
  const { region } = await params;
  const market = getMarket(region);
  if (!market) return {};

  return buildMetadata({
    title: market.seoTitle,
    description: market.seoDescription,
    path: `/markets/${market.slug}`,
    eyebrow: `MARKETS / ${market.name.toUpperCase()}`,
  });
}

export default async function MarketPage({ params }: PageProps<"/markets/[region]">) {
  const { region } = await params;
  const market = getMarket(region);
  if (!market) notFound();

  const path = `/markets/${market.slug}`;
  const focusCategories = categories.filter((c) =>
    market.focusCategories.includes(c.slug)
  );

  return (
    <>
      <JsonLd data={marketJsonLd(market, path)} />

      <section className="border-b border-rule">
        <Container className="py-16 sm:py-20">
          <Breadcrumbs
            crumbs={[
              { name: "Home", href: "/" },
              { name: "Markets", href: "/markets" },
              { name: market.name, href: path },
            ]}
            className="mb-8"
          />
          <div className="max-w-3xl">
            <h1 className="text-[1.95rem] leading-[1.12] sm:text-[2.5rem] lg:text-[2.85rem]">
              {market.h1}
            </h1>
            <p className="mt-8 text-[1.0625rem] leading-relaxed text-ink-600">
              {market.intro}
            </p>
          </div>
        </Container>
      </section>

      <section aria-labelledby="buyers-heading">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <SectionHeading
              eyebrow="Buyer profile"
              title={<span id="buyers-heading">Who we supply in {market.nameInSentence}.</span>}
            />
            <Chips items={market.buyerProfile} />
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="requirements-heading"
        className="border-y border-rule bg-ivory-100/50"
      >
        <Container className="py-20 sm:py-24">
          <SectionHeading
            eyebrow="Destination requirements"
            title={<span id="requirements-heading">What we coordinate for this market.</span>}
            className="mb-10"
          />
          <ul className="max-w-3xl border-t border-rule-strong">
            {market.requirements.map((requirement) => (
              <li
                key={requirement}
                className="ledger-spec flex gap-4 border-b border-rule py-4 text-ink-600"
              >
                <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-gold-500" />
                <span>{requirement}</span>
              </li>
            ))}
          </ul>
          <p className="ledger-foot max-w-3xl">
            COA available on request · Specifications confirmed before shipment
          </p>
        </Container>
      </section>

      <section aria-labelledby="products-heading">
        <Container className="py-20 sm:py-24">
          <SectionHeading
            eyebrow="Relevant products"
            title={<span id="products-heading">Product lines for {market.nameInSentence}.</span>}
            className="mb-10"
          />
          <div className="mb-12">
            <Eyebrow className="mb-3">Most requested</Eyebrow>
            <ul className="flex flex-wrap gap-2">
              {market.focusProducts.map((slug) => {
                const product = getProduct(slug);
                if (!product) return null;
                return (
                  <li key={slug}>
                    <Link
                      href={`/products/${product.category}/${product.slug}`}
                      className="form-badge inline-block border-peacock-600/40 text-peacock-600 transition-colors hover:border-peacock-600"
                    >
                      {product.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <ul className="grid border-l border-t border-rule sm:grid-cols-2 lg:grid-cols-3 [&>li]:border-b [&>li]:border-r [&>li]:border-rule">
            {focusCategories.flatMap((category) =>
              productsInCategory(category.slug).map((product) => (
                <li key={`${category.slug}-${product.slug}`}>
                  <Link
                    href={`/products/${category.slug}/${product.slug}`}
                    className="group flex h-full flex-col p-6 transition-colors hover:bg-ivory-100/70"
                  >
                    <Eyebrow className="mb-2">{category.shortName}</Eyebrow>
                    <span className="font-display text-[1.15rem] text-peacock-900 transition-colors group-hover:text-peacock-600">
                      {product.name}
                    </span>
                    <span className="eyebrow mt-2 tabular-nums">
                      {product.varieties.length} varieties and grades
                    </span>
                  </Link>
                </li>
              ))
            )}
          </ul>
        </Container>
      </section>

      <RfqCta
        heading={`Shipping to ${market.nameInSentence}?`}
        body="Send your specification, destination port and required documentation. We respond within 24 hours."
      />
    </>
  );
}
