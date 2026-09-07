import type { Metadata } from "next";

import { RfqCta } from "@/components/product/RfqCta";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Container } from "@/components/shared/Container";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { generalFaqs } from "@/data/faqs";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Private Label & Packaging",
  description:
    "Private label spices, rice, tea and ghee from India. Bulk, retail and private-label formats, with labelling and compliance coordinated per destination market.",
  path: "/private-label-and-packaging",
  eyebrow: "PACKAGING",
});

/** Section 5.5 sections. [generated, review] */
const formats = [
  {
    title: "Bulk supply",
    body: "Industrial pack formats for manufacturers, blenders, repackers and traders. Pack size, liner, palletisation and container loading are agreed per order and per product.",
    points: [
      "Bags, drums, cartons and jumbo formats by product",
      "Pallet configuration and container plan agreed before booking",
      "Lot identification carried through to the Certificate of Analysis",
    ],
  },
  {
    title: "Retail packaging",
    body: "Retail-ready packs for grocery, specialty and food-service channels, in the pack sizes and materials your market expects.",
    points: [
      "Pack size and material specified by the buyer",
      "Shelf-life and storage statements agreed per product",
      "Case configuration and outer marking to your requirement",
    ],
  },
  {
    title: "Labelling and compliance",
    body: "Label content is coordinated against the destination market's rules before artwork is finalised, so a print run is not wasted on a non-compliant panel.",
    points: [
      "Ingredient, origin and nutrition panels reviewed per destination",
      "Language requirements confirmed with the buyer",
      "Barcodes, batch coding and date formats agreed before print",
    ],
  },
];

/** Section 5.5: brief, spec, sample, confirm, ship. */
const process = [
  {
    title: "Brief",
    body: "You tell us the product, the market and the shelf you are aiming at.",
  },
  {
    title: "Specification",
    body: "Grade, technical parameters, pack format and label content are written down and agreed.",
  },
  {
    title: "Sample",
    body: "A sample is arranged against the agreed specification so the product can be assessed before commitment.",
  },
  {
    title: "Confirm",
    body: "Specification, artwork and packaging are confirmed in writing, and the order is placed.",
  },
  {
    title: "Ship",
    body: "Production, testing and documentation are coordinated, and the container is booked and loaded.",
  },
];

export default function PrivateLabelPage() {
  return (
    <>
      <section className="border-b border-rule">
        <Container className="py-16 sm:py-20">
          <Breadcrumbs
            crumbs={[
              { name: "Home", href: "/" },
              { name: "Private label & packaging", href: "/private-label-and-packaging" },
            ]}
            className="mb-8"
          />
          <div className="max-w-3xl">
            <Eyebrow>Packaging</Eyebrow>
            <h1 className="mt-5 text-[2.1rem] leading-[1.1] sm:text-[2.9rem] lg:text-[3.2rem]">
              Your brand, our sourcing.
            </h1>
            <p className="mt-8 text-[1.0625rem] leading-relaxed text-ink-600">
              We supply in bulk, retail and private-label formats depending on
              product and destination. Buyers can request standard commercial
              grades, premium grades, customized specifications, contract-specific
              requirements and destination-specific documentation. Packaging is
              agreed per order: bulk formats for industrial buyers, retail-ready
              and private-label packaging for brands. Specifications and packaging
              are confirmed in writing before shipment.
            </p>
          </div>
        </Container>
      </section>

      <section aria-labelledby="formats-heading">
        <Container className="py-20 sm:py-24">
          <SectionHeading
            title={<span id="formats-heading">Three ways product leaves the factory.</span>}
            className="mb-12"
          />
          <ul className="grid border-l border-t border-rule lg:grid-cols-3 [&>li]:border-b [&>li]:border-r [&>li]:border-rule">
            {formats.map((format) => (
              <li key={format.title} className="p-7 sm:p-8">
                <h3 className="text-[1.25rem] leading-snug">{format.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">
                  {format.body}
                </p>
                <ul className="mt-5 space-y-1.5 border-t border-rule pt-4">
                  {format.points.map((point) => (
                    <li key={point} className="ledger-spec flex gap-2.5 leading-snug">
                      <span aria-hidden className="mt-[0.62em] h-px w-2.5 shrink-0 bg-gold-500" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="process-heading" className="border-y border-rule bg-ivory-100/50">
        <Container className="py-20 sm:py-24">
          <SectionHeading
            eyebrow="Private label process"
            title={<span id="process-heading">Five stages, confirmed in writing.</span>}
            className="mb-14"
          />
          <ol className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {process.map((stage, index) => (
              <li key={stage.title} className="border-t border-rule-strong pt-5">
                <Eyebrow className="mb-3 tabular-nums text-gold-700">
                  {String(index + 1).padStart(2, "0")}
                </Eyebrow>
                <h3 className="text-[1.125rem] leading-snug">{stage.title}</h3>
                <p className="mt-2.5 text-[0.875rem] leading-relaxed text-ink-600">
                  {stage.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section>
        <Container className="py-20 sm:py-24">
          <FaqAccordion
            faqs={generalFaqs.filter((f) =>
              ["Can you do private label?", "What is your minimum order quantity?", "Do you provide samples?", "Which Incoterms do you quote?"].includes(
                f.question
              )
            )}
            title="Common questions"
          />
        </Container>
      </section>

      <RfqCta
        heading="Send your brief and your specification."
        body="Tell us the product, the market and the pack format. We respond within 24 hours."
      />
    </>
  );
}
