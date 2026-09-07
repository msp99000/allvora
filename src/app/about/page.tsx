import type { Metadata } from "next";
import Link from "next/link";

import { RfqCta } from "@/components/product/RfqCta";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Container } from "@/components/shared/Container";
import { Media } from "@/components/shared/Media";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { FeatherArcUnderlay } from "@/components/shared/FeatherArc";
import { Chips } from "@/components/shared/MarketChips";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { pageImages } from "@/data/images";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Allvora Resources",
  description:
    "Allvora Resources is an India-based export and sourcing company supplying agricultural, food and natural products to international buyers, to specification.",
  path: "/about",
  eyebrow: "THE COMPANY",
});

/** Section 5.2, approved copy. */
const audiences = [
  "Importers",
  "Distributors",
  "Wholesalers",
  "Supermarket chains",
  "Food manufacturers",
  "Spice companies",
  "Food-service companies",
  "Retail and private-label brands",
  "Agricultural distributors",
  "Ingredient buyers",
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-rule">
        <FeatherArcUnderlay className="absolute -right-32 -top-20 h-[38rem] w-[38rem] opacity-70" />
        <Container className="relative py-16 sm:py-20">
          <Breadcrumbs
            crumbs={[
              { name: "Home", href: "/" },
              { name: "About", href: "/about" },
            ]}
            className="mb-8"
          />
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16">
          <div className="max-w-3xl">
            <Eyebrow>The company</Eyebrow>
            <h1 className="mt-5 type-title">
              Sourcing from India, made reliable.
            </h1>
            <div className="mt-8 space-y-5 type-lead text-ink-600">
              <p>
                Allvora Resources is an India-based export and sourcing company
                focused on supplying quality agricultural, food, natural and
                processed products to international markets.
              </p>
              <p>
                We work with established producers, processors and suppliers
                across India to source products according to buyer requirements,
                destination-market standards and international quality
                expectations. From whole spices and specialty agricultural
                products to premium rice, ghee, tea and coffee, we bring together
                products from India&apos;s diverse agricultural regions and
                connect them with buyers worldwide.
              </p>
              <p className="font-display type-card-lg leading-snug text-peacock-900">
                Our objective is simple: to make sourcing from India reliable,
                transparent and efficient.
              </p>
            </div>
          </div>
          <Media
            image={pageImages.about!}
            ratio="4 / 3"
            sizes="(min-width: 1024px) 38vw, 100vw"
            priority
            className="border border-rule"
          />
          </div>
        </Container>
      </section>

      <section aria-labelledby="why-india">
        <Container className="py-20 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <SectionHeading
              eyebrow="Why India"
              title={<span id="why-india">A supply base with real depth.</span>}
            />
            <div className="space-y-5 type-lead text-ink-600">
              <p>
                India is one of the world&apos;s major agricultural exporting
                countries. Its agricultural and processed-food exports reach more
                than 200 countries and regions, with Basmati rice, spices and
                coffee among the leading commodities. That diversity of
                varieties, regions and processing capability is the supply base
                we work from.
              </p>
              <p>
                <Link
                  href="/about/sourcing-and-traceability"
                  className="text-peacock-600 underline decoration-peacock-600/40 underline-offset-4 transition-colors hover:decoration-gold-500"
                >
                  See how we source and document each shipment
                </Link>
                .
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="who-we-serve" className="border-y border-rule bg-ivory-100/50">
        <Container className="py-20 sm:py-24">
          <SectionHeading
            title={<span id="who-we-serve">Professional buyers, not consumers.</span>}
            className="mb-10"
          />
          <Chips items={audiences} className="max-w-4xl" />
        </Container>
      </section>

      <section aria-labelledby="vision-mission">
        <Container className="py-20 sm:py-24">
          <h2 id="vision-mission" className="sr-only">
            Vision and mission
          </h2>
          <div className="grid gap-px border-l border-t border-rule sm:grid-cols-2 [&>div]:border-b [&>div]:border-r [&>div]:border-rule">
            <div className="p-8 sm:p-10">
              <Eyebrow className="mb-4 text-gold-700">Vision</Eyebrow>
              <p className="font-display type-card-lg text-peacock-900">
                To build Allvora Resources into a trusted global sourcing partner
                for Indian products.
              </p>
            </div>
            <div className="p-8 sm:p-10">
              <Eyebrow className="mb-4 text-gold-700">Mission</Eyebrow>
              <p className="font-display type-card-lg text-peacock-900">
                To connect the world with quality products from India.
              </p>
            </div>
          </div>
          <div className="mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/quality-and-certifications">See how we handle quality</Link>
            </Button>
          </div>
          <p className="eyebrow mt-8 text-ink-500">{site.tagline}</p>
        </Container>
      </section>

      <RfqCta />
    </>
  );
}
