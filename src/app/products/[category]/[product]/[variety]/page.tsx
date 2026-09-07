import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BuyerSpecNote } from "@/components/product/BuyerSpecNote";
import { FormsBadges } from "@/components/product/FormsBadges";
import { RfqCta } from "@/components/product/RfqCta";
import { SpecList } from "@/components/product/SpecTable";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Container } from "@/components/shared/Container";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { JsonLd } from "@/components/shared/JsonLd";
import { Media } from "@/components/shared/Media";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { getCategory } from "@/data/categories";
import { varietyFaqs } from "@/data/faqs";
import { varietyImage } from "@/data/images";
import { getVariety, launchVarieties, products } from "@/data/products";
import { buildMetadata, productJsonLd, varietyCrumbs } from "@/lib/seo";
import { LAUNCH_P2_VARIETIES } from "@/lib/routes";

/**
 * Only P1 varieties ship a page at launch (src/lib/routes.ts explains why).
 * dynamicParams stays false so a P2 URL 404s rather than rendering a page with
 * no intro copy.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return products.flatMap((product) =>
    product.varieties
      .filter((v) => v.priority === "P1" || LAUNCH_P2_VARIETIES)
      .map((variety) => ({
        category: product.category,
        product: product.slug,
        variety: variety.slug,
      }))
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[category]/[product]/[variety]">): Promise<Metadata> {
  const { category: categorySlug, product: productSlug, variety: varietySlug } =
    await params;
  const found = getVariety(productSlug, varietySlug);
  const category = getCategory(categorySlug);
  if (!found || !category || found.product.category !== category.slug) return {};

  return buildMetadata({
    title: found.variety.seoTitle,
    description: found.variety.seoDescription,
    path: `/products/${category.slug}/${productSlug}/${varietySlug}`,
    eyebrow: `${found.product.name.toUpperCase()} / ${found.variety.name.toUpperCase()}`,
  });
}

export default async function VarietyPage({
  params,
}: PageProps<"/products/[category]/[product]/[variety]">) {
  const { category: categorySlug, product: productSlug, variety: varietySlug } =
    await params;
  const found = getVariety(productSlug, varietySlug);
  const category = getCategory(categorySlug);
  if (!found || !category || found.product.category !== category.slug) notFound();

  const { product, variety } = found;
  const path = `/products/${category.slug}/${product.slug}/${variety.slug}`;
  const siblings = launchVarieties(product).filter((v) => v.slug !== variety.slug);
  const faqs = varietyFaqs(product, variety);
  const image = varietyImage(product.slug, variety.slug);

  return (
    <>
      <JsonLd data={productJsonLd(category, product, variety, path)} />

      <section className="border-b border-rule">
        <Container className="py-16 sm:py-20">
          <Breadcrumbs crumbs={varietyCrumbs(category, product, variety)} className="mb-8" />
          <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-16">
            <div className="max-w-3xl">
              <h1 className="type-title">
                {variety.headingName} exporter and supplier from India
              </h1>
              {variety.intro ? (
                <p className="mt-8 type-lead text-ink-600">
                  {variety.intro}
                </p>
              ) : null}
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

      <section aria-labelledby="spec-heading">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
            <div>
              <SectionHeading
                title={<span id="spec-heading">Specification summary.</span>}
                className="mb-8"
              />
              <SpecList
                gradeType={variety.gradeType}
                specs={variety.specs}
                forms={variety.forms}
              />
            </div>
            <div className="lg:pt-4">
              <FormsBadges forms={variety.forms} />
              <div className="mt-8 border-t border-rule pt-6">
                <Eyebrow className="mb-2.5">Documentation</Eyebrow>
                <p className="text-[0.9375rem] leading-relaxed text-ink-600">
                  A Certificate of Analysis for the shipped lot, with
                  phytosanitary certificate, certificate of origin, fumigation
                  and health certificates as applicable to your destination.
                </p>
                <Link
                  href="/quality-and-certifications"
                  className="eyebrow mt-4 inline-block text-gold-700 underline decoration-gold-500/50 underline-offset-4 transition-colors hover:decoration-gold-500"
                >
                  How we handle quality
                </Link>
              </div>
            </div>
          </div>
          <BuyerSpecNote note={product.buyerSpecNote} className="mt-14" />
        </Container>
      </section>

      {/* Processing forms, where the variety ships in distinct forms. */}
      {variety.formNotes && variety.formNotes.length > 0 ? (
        <section aria-labelledby="forms-heading" className="border-y border-rule bg-ivory-100/50">
          <Container className="py-20 sm:py-24">
            <SectionHeading
              title={<span id="forms-heading">Choosing a processing form.</span>}
              intro="The variety sets the grain. The processing form sets how it cooks and how it looks on the shelf."
              className="mb-12"
            />
            <ul className="border-t border-rule-strong">
              {variety.formNotes.map((formNote) => (
                <li
                  key={formNote.form}
                  className="grid gap-3 border-b border-rule py-7 sm:grid-cols-[12rem_1fr] sm:gap-8"
                >
                  <h3 className="type-card">{formNote.form}</h3>
                  <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-ink-600">
                    {formNote.note}
                  </p>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      {siblings.length > 0 ? (
        <section aria-labelledby="related-heading">
          <Container className="py-16 sm:py-20">
            <SectionHeading
              title={<span id="related-heading">Other {product.name.toLowerCase()} grades.</span>}
              className="mb-8"
            />
            <ul className="flex flex-wrap gap-2">
              {siblings.map((sibling) => (
                <li key={sibling.slug}>
                  <Link
                    href={`/products/${category.slug}/${product.slug}/${sibling.slug}`}
                    className="form-badge inline-block transition-colors hover:border-peacock-600 hover:text-peacock-900"
                  >
                    {sibling.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`/products/${category.slug}/${product.slug}`}
                  className="form-badge inline-block border-peacock-600/40 text-peacock-600 transition-colors hover:border-peacock-600"
                >
                  All {product.name.toLowerCase()} grades
                </Link>
              </li>
            </ul>
          </Container>
        </section>
      ) : null}

      <section className="border-t border-rule">
        <Container className="py-20 sm:py-24">
          <FaqAccordion faqs={faqs} title={`${variety.name} questions`} />
        </Container>
      </section>

      <RfqCta
        heading={`Request a ${variety.headingName} quote.`}
        body="The form arrives with this variety selected. Add your volume, packaging and destination."
        categorySlug={category.slug}
        productSlug={product.slug}
        varietySlug={variety.slug}
      />
    </>
  );
}
