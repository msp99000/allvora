import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BuyerSpecNote } from "@/components/product/BuyerSpecNote";
import { RfqCta } from "@/components/product/RfqCta";
import { SpecTable } from "@/components/product/SpecTable";
import { VarietyCard } from "@/components/product/VarietyCard";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Container } from "@/components/shared/Container";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { JsonLd } from "@/components/shared/JsonLd";
import { Media } from "@/components/shared/Media";
import { RuleGrid } from "@/components/shared/RuleGrid";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { getCategory } from "@/data/categories";
import { productFaqs } from "@/data/faqs";
import { productImage } from "@/data/images";
import { getProduct, launchVarieties, products, productsInCategory } from "@/data/products";
import { buildMetadata, itemListJsonLd, productCrumbs } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({
    category: product.category,
    product: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[category]/[product]">): Promise<Metadata> {
  const { category: categorySlug, product: productSlug } = await params;
  const product = getProduct(productSlug);
  const category = getCategory(categorySlug);
  if (!product || !category || product.category !== category.slug) return {};

  return buildMetadata({
    title: product.seoTitle,
    description: product.seoDescription,
    path: `/products/${category.slug}/${product.slug}`,
    eyebrow: `${category.name.toUpperCase()} / ${product.name.toUpperCase()}`,
  });
}

export default async function ProductPage({
  params,
}: PageProps<"/products/[category]/[product]">) {
  const { category: categorySlug, product: productSlug } = await params;
  const product = getProduct(productSlug);
  const category = getCategory(categorySlug);
  if (!product || !category || product.category !== category.slug) notFound();

  const featured = launchVarieties(product);
  const siblings = productsInCategory(category.slug).filter(
    (p) => p.slug !== product.slug
  );
  const faqs = productFaqs(product);
  const image = productImage(product.slug);
  const path = `/products/${category.slug}/${product.slug}`;

  return (
    <>
      {featured.length > 0 ? (
        <JsonLd
          data={itemListJsonLd(
            `${product.name} varieties`,
            featured.map((v) => ({ name: v.name, href: `${path}/${v.slug}` }))
          )}
        />
      ) : null}

      <section className="border-b border-rule">
        <Container className="py-16 sm:py-20">
          <Breadcrumbs crumbs={productCrumbs(category, product)} className="mb-8" />
          <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-16">
            <div className="max-w-3xl">
              <h1 className="text-[2rem] leading-[1.1] sm:text-[2.7rem] lg:text-[3rem]">
                {product.name} exporter and supplier from India
              </h1>
              <p className="mt-8 text-[1.0625rem] leading-relaxed text-ink-600">
                {product.intro}
              </p>
            </div>
            {image ? (
              <Media
                image={image}
                ratio="4 / 3"
                sizes="(min-width: 1024px) 40vw, 100vw"
                priority
                className="border border-rule"
              />
            ) : null}
          </div>
        </Container>
      </section>

      {/* The Specification Ledger. */}
      <section aria-labelledby="ledger-heading">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            title={
              <span id="ledger-heading">
                {product.varieties.length} {product.name.toLowerCase()} varieties and
                grades.
              </span>
            }
            className="mb-10"
          />
          <SpecTable product={product} categorySlug={category.slug} />
          <BuyerSpecNote note={product.buyerSpecNote} className="mt-12" />
        </Container>
      </section>

      {featured.length > 0 ? (
        <section aria-labelledby="varieties-heading" className="border-y border-rule bg-ivory-100/50">
          <Container className="py-20 sm:py-24">
            <SectionHeading
              title={<span id="varieties-heading">Specifications by variety.</span>}
              intro="Each variety page carries its full specification list, available forms and the documentation supplied with a shipment."
              className="mb-12"
            />
            <RuleGrid cols={3}>
              {featured.map((variety) => (
                <li key={variety.slug}>
                  <VarietyCard
                    product={product}
                    variety={variety}
                    categorySlug={category.slug}
                  />
                </li>
              ))}
            </RuleGrid>
          </Container>
        </section>
      ) : null}

      <section>
        <Container className="py-20 sm:py-24">
          <FaqAccordion faqs={faqs} title={`${product.name} questions`} />
        </Container>
      </section>

      {siblings.length > 0 ? (
        <section aria-labelledby="siblings-heading" className="border-t border-rule">
          <Container className="py-16">
            <h2 id="siblings-heading" className="eyebrow mb-5">
              More in {category.name}
            </h2>
            <ul className="flex flex-wrap gap-2">
              {siblings.map((sibling) => (
                <li key={sibling.slug}>
                  <Link
                    href={`/products/${category.slug}/${sibling.slug}`}
                    className="form-badge inline-block transition-colors hover:border-peacock-600 hover:text-peacock-900"
                  >
                    {sibling.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <RfqCta
        heading={`Request a ${product.name.toLowerCase()} quote.`}
        body="Send your variety, grade, volume, packaging and destination. We respond within 24 hours."
        categorySlug={category.slug}
        productSlug={product.slug}
      />
    </>
  );
}
