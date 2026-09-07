import type { Metadata } from "next";
import Link from "next/link";

import { RfqCta } from "@/components/product/RfqCta";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Container } from "@/components/shared/Container";
import { Media } from "@/components/shared/Media";
import { JsonLd } from "@/components/shared/JsonLd";
import { pageImages } from "@/data/images";
import { markets } from "@/data/markets";
import { getProduct } from "@/data/products";
import { buildMetadata, itemListJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Markets We Serve",
  description:
    "We serve buyers across Europe, the Middle East, North America, Africa, Southeast Asia, South Asia and Australia and New Zealand, with per-market documentation.",
  path: "/markets",
  eyebrow: "MARKETS",
});

export default function MarketsHubPage() {
  return (
    <>
      <JsonLd
        data={itemListJsonLd(
          "Markets served",
          markets.map((m) => ({ name: m.name, href: `/markets/${m.slug}` }))
        )}
      />

      <section className="relative isolate overflow-hidden bg-peacock-900">
        <div className="absolute inset-0">
          <Media
            image={pageImages.markets!}
            ratio="16 / 9"
            sizes="100vw"
            priority
            onDark
            className="h-full w-full [&>*]:h-full [&>img]:object-cover"
          />
        </div>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-peacock-900 via-peacock-900/85 to-peacock-900/45" />
        <Container className="relative py-20 sm:py-28">
          <Breadcrumbs
            crumbs={[
              { name: "Home", href: "/" },
              { name: "Markets", href: "/markets" },
            ]}
            className="mb-8"
            onDark
          />
          <div className="max-w-3xl">
            <h1 className="type-title text-ivory-50">
              Positioned to serve buyers worldwide.
            </h1>
            <p className="type-lead mt-8 text-ivory-50/80">
              India&apos;s agricultural and processed-food products already reach
              more than 200 countries and regions. We coordinate
              destination-specific specifications, labelling and documentation
              for each market we serve.
            </p>
          </div>
        </Container>
      </section>

      <section aria-labelledby="regions-heading">
        <Container className="py-16 sm:py-20">
          <h2 id="regions-heading" className="sr-only">
            Regions
          </h2>
          <ul className="border-t border-rule-strong">
            {markets.map((market) => (
              <li key={market.slug} className="border-b border-rule">
                <Link
                  href={`/markets/${market.slug}`}
                  className="group grid gap-4 py-8 transition-colors hover:bg-ivory-100/60 sm:grid-cols-[1fr_1.6fr] sm:gap-10 sm:px-2"
                >
                  <div>
                    <h3 className="type-card-lg transition-colors group-hover:text-peacock-600">
                      {market.name}
                    </h3>
                  </div>
                  <div>
                    <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-ink-600">
                      {market.intro}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {market.focusProducts.slice(0, 4).map((slug) => {
                        const product = getProduct(slug);
                        return product ? (
                          <li key={slug} className="form-badge">
                            {product.name}
                          </li>
                        ) : null;
                      })}
                    </ul>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <RfqCta />
    </>
  );
}
