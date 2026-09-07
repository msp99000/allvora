import type { Metadata } from "next";
import Link from "next/link";

import { CategoryGrid } from "@/components/product/CategoryGrid";
import { RfqCta } from "@/components/product/RfqCta";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Container } from "@/components/shared/Container";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { FeatherArcUnderlay } from "@/components/shared/FeatherArc";
import { JsonLd } from "@/components/shared/JsonLd";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { buildMetadata, itemListJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Products: Indian Spices, Rice, Ghee, Tea & Coffee",
  description:
    "Four product lines from India: spices, agricultural and natural products, food products, and tea and coffee. Every product supplied to buyer-specific specifications.",
  path: "/products",
  eyebrow: "PRODUCTS",
});

export default function ProductsHubPage() {
  return (
    <>
      <JsonLd
        data={itemListJsonLd(
          "Allvora Resources product categories",
          categories.map((c) => ({ name: c.name, href: `/products/${c.slug}` }))
        )}
      />

      <section className="relative overflow-hidden border-b border-rule">
        <FeatherArcUnderlay className="absolute -right-32 -top-24 h-[38rem] w-[38rem] opacity-70" />
        <Container className="relative py-16 sm:py-20">
          <Breadcrumbs
            crumbs={[
              { name: "Home", href: "/" },
              { name: "Products", href: "/products" },
            ]}
            className="mb-8"
          />
          <div className="max-w-3xl">
            <Eyebrow>Products</Eyebrow>
            <h1 className="mt-5 type-title">
              Four product lines, one sourcing standard.
            </h1>
            <p className="mt-8 type-lead text-ink-600">
              Every product below can be supplied to buyer-specific
              specifications with supporting documentation.
            </p>
          </div>
        </Container>
      </section>

      <section aria-labelledby="categories-heading">
        <Container className="py-16 sm:py-20">
          <h2 id="categories-heading" className="sr-only">
            Product categories
          </h2>
          <CategoryGrid />
        </Container>
      </section>

      <section aria-labelledby="all-products-heading" className="border-t border-rule">
        <Container className="py-20 sm:py-24">
          <SectionHeading
            title={<span id="all-products-heading">Every product line, with variety counts.</span>}
            className="mb-12"
          />
          <div className="space-y-14">
            {categories.map((category) => {
              const inCategory = products.filter((p) => p.category === category.slug);
              return (
                <div key={category.slug}>
                  <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3 border-b border-rule-strong pb-3">
                    <h3 className="type-card-lg">
                      <Link
                        href={`/products/${category.slug}`}
                        className="transition-colors hover:text-peacock-600"
                      >
                        {category.name}
                      </Link>
                    </h3>
                    <Eyebrow>{inCategory.length} products</Eyebrow>
                  </div>
                  <p className="mb-8 max-w-3xl text-[0.9375rem] leading-relaxed text-ink-600">
                    {category.intro}
                  </p>
                  <ul className="grid border-l border-t border-rule sm:grid-cols-2 lg:grid-cols-3 [&>li]:border-b [&>li]:border-r [&>li]:border-rule">
                    {inCategory.map((product) => (
                      <li key={product.slug}>
                        <Link
                          href={`/products/${category.slug}/${product.slug}`}
                          className="group flex h-full flex-col p-6 transition-colors hover:bg-ivory-100/70"
                        >
                          <span className="font-display text-[1.15rem] text-peacock-900 transition-colors group-hover:text-peacock-600">
                            {product.name}
                          </span>
                          <span className="eyebrow mt-2 tabular-nums">
                            {product.varieties.length} varieties and grades
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <RfqCta />
    </>
  );
}
