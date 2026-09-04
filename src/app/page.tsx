import type { Metadata } from "next";
import Link from "next/link";

import { CategoryGrid } from "@/components/product/CategoryGrid";
import { RfqCta } from "@/components/product/RfqCta";
import { Container } from "@/components/shared/Container";
import { Eyebrow } from "@/components/shared/Eyebrow";
import {
  FeatherArcDivider,
  FeatherArcOnDark,
  FeatherArcUnderlay,
} from "@/components/shared/FeatherArc";
import { MarketChips } from "@/components/shared/MarketChips";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { marketsStripLine } from "@/data/markets";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Indian Agricultural & Spice Exporter",
  // The tab is the site's front door, so it leads with the company name. Inner
  // pages keep "<page> | Allvora Resources", which is what a search result
  // wants and what tells two open tabs apart.
  absoluteTitle: `${site.name}: Indian Agricultural & Spice Exporter`,
  description:
    "Indian exporter of spices, Basmati rice, ghee, tea, coffee and natural products, sourced to your specification and shipped with full export documentation.",
  path: "/",
  eyebrow: "EXPORT & SOURCING · INDIA",
});

/** Section 5.1. Approved copy, used verbatim. */
const steps = [
  {
    title: "Share your requirement.",
    body: "Variety, grade, technical parameters, quantity, packaging and destination.",
  },
  {
    title: "We source and verify.",
    body: "We identify suitable producers and processors, confirm specifications, and arrange testing where required.",
  },
  {
    title: "We ship with documentation.",
    body: "COA, phytosanitary, certificate of origin, fumigation and health certificates as applicable, coordinated per destination.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero. Section 3.2: a thesis, not a stat card. One orchestrated reveal. */}
      <section className="relative overflow-hidden border-b border-rule">
        <FeatherArcUnderlay className="absolute -right-28 -top-24 h-[42rem] w-[42rem] opacity-80 lg:-right-16" />
        <Container className="relative py-20 sm:py-24 lg:py-32">
          <div className="max-w-3xl">
            <Eyebrow className="reveal reveal-1">EXPORT &amp; SOURCING · INDIA</Eyebrow>
            <h1 className="reveal reveal-2 mt-5 text-[2.25rem] leading-[1.08] sm:text-[3.1rem] lg:text-[3.75rem]">
              Quality products from India, sourced to your specification.
            </h1>
            <p className="reveal reveal-3 mt-7 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-600 sm:text-[1.15rem]">
              Allvora Resources connects international buyers with spices, rice,
              ghee, tea, coffee and natural products from India&apos;s producing
              regions. You define the grade, specification, packaging and
              destination requirements. We coordinate the sourcing, quality
              control and export documentation.
            </p>
            <div className="reveal reveal-4 mt-10 flex flex-wrap items-center gap-4">
              <Button asChild variant="gold" size="lg">
                <Link href="/request-a-quote">Request a quote</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/products">Explore products</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Category grid */}
      <section aria-labelledby="products-heading">
        <Container className="py-20 sm:py-24">
          <SectionHeading
            eyebrow="What we supply"
            title={<span id="products-heading">Four product lines, one sourcing standard.</span>}
            intro="Every product can be supplied to buyer-specific specifications with supporting documentation."
            className="mb-12"
          />
          <CategoryGrid />
        </Container>
      </section>

      {/* How we work */}
      <section aria-labelledby="process-heading" className="border-y border-rule bg-ivory-100/50">
        <Container className="py-20 sm:py-24">
          <SectionHeading
            eyebrow="How we work"
            title={<span id="process-heading">Three steps, in this order.</span>}
            className="mb-14"
          />
          <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="border-t border-rule-strong pt-5">
                <Eyebrow className="mb-4 tabular-nums text-gold-700">
                  Step {String(index + 1).padStart(2, "0")}
                </Eyebrow>
                <h3 className="text-[1.25rem] leading-snug">{step.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Trust band, full-bleed peacock. Section 5.1. */}
      <section aria-labelledby="trust-heading" className="relative overflow-hidden bg-peacock-900 text-ivory-50">
        <FeatherArcOnDark className="absolute -right-10 bottom-0 h-full w-[34rem] opacity-90" />
        <Container className="relative py-20 sm:py-24">
          <div className="max-w-3xl">
            <Eyebrow className="text-ivory-50/70">Documentation</Eyebrow>
            <h2 id="trust-heading" className="mt-4 text-[1.9rem] leading-tight text-ivory-50 sm:text-[2.5rem]">
              Built for buyers who check the paperwork.
            </h2>
            <p className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-ivory-50/80">
              Every shipment can be supported by a Certificate of Analysis and
              destination-specific export documentation. Specifications are
              confirmed in writing before shipment. India&apos;s agricultural and
              processed-food products reach more than 200 countries and regions;
              our role is to make sourcing them reliable, transparent and
              efficient.
            </p>
            <Button asChild variant="onDark" size="lg" className="on-peacock mt-9">
              <Link href="/quality-and-certifications">See how we handle quality</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Markets strip */}
      <section aria-labelledby="markets-heading">
        <Container className="py-20 sm:py-24">
          <FeatherArcDivider className="mb-14" />
          <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            <SectionHeading
              eyebrow="Markets"
              title={<span id="markets-heading">Positioned to serve buyers worldwide.</span>}
            />
            <div>
              <p className="text-[1.0625rem] leading-relaxed text-ink-600">
                {marketsStripLine}
              </p>
              <MarketChips className="mt-7" />
              <Link
                href="/markets"
                className="eyebrow mt-8 inline-block text-gold-700 underline decoration-gold-500/50 underline-offset-4 transition-colors hover:decoration-gold-500"
              >
                View all markets
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <RfqCta
        heading="Tell us what you need to source from India."
        body="Send your specification and receive a response within 24 hours."
      />
    </>
  );
}
