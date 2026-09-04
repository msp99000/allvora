import type { Metadata } from "next";
import Link from "next/link";

import { RfqCta } from "@/components/product/RfqCta";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Container } from "@/components/shared/Container";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { FeatherArcUnderlay } from "@/components/shared/FeatherArc";
import { JsonLd } from "@/components/shared/JsonLd";
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

      <section className="relative overflow-hidden border-b border-rule">
        <FeatherArcUnderlay className="absolute -right-32 -top-24 h-[38rem] w-[38rem] opacity-70" />
        <Container className="relative py-16 sm:py-20">
          <Breadcrumbs
            crumbs={[
              { name: "Home", href: "/" },
              { name: "Markets", href: "/markets" },
            ]}
            className="mb-8"
          />
          <div className="max-w-3xl">
            <Eyebrow>Markets</Eyebrow>
            <h1 className="mt-5 text-[2.1rem] leading-[1.1] sm:text-[2.9rem] lg:text-[3.2rem]">
              Positioned to serve buyers worldwide.
            </h1>
            <p className="mt-8 text-[1.0625rem] leading-relaxed text-ink-600">
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
            {markets.map((market, index) => (
              <li key={market.slug} className="border-b border-rule">
                <Link
                  href={`/markets/${market.slug}`}
                  className="group grid gap-4 py-8 transition-colors hover:bg-ivory-100/60 sm:grid-cols-[1fr_1.6fr] sm:gap-10 sm:px-2"
                >
                  <div>
                    <Eyebrow className="mb-3 tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </Eyebrow>
                    <h3 className="text-[1.4rem] leading-tight transition-colors group-hover:text-peacock-600">
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
