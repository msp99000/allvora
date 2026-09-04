import type { Metadata } from "next";

import { BuyerSpecNote } from "@/components/product/BuyerSpecNote";
import { RfqCta } from "@/components/product/RfqCta";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Container } from "@/components/shared/Container";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { certifications, exportDocuments } from "@/data/certifications";
import { generalFaqs } from "@/data/faqs";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Quality & Certifications",
  description:
    "Certified spice and food exporter from India. Specify grade, moisture, purity, chemical and microbiological limits, with COA and documentation per shipment.",
  path: "/quality-and-certifications",
  eyebrow: "QUALITY FIRST",
});

/** Section 5.4: the parameters a buyer can set. */
const parameters = [
  "Grade",
  "Size",
  "Moisture",
  "Purity",
  "Colour",
  "Chemical parameters",
  "Microbiological limits",
  "Processing requirements",
  "Packaging",
  "Labelling",
  "Shelf life",
  "Destination-market requirements",
];

export default function QualityPage() {
  const hasUnconfirmed = certifications.some((c) => !c.confirmed);

  return (
    <>
      <section className="border-b border-rule">
        <Container className="py-16 sm:py-20">
          <Breadcrumbs
            crumbs={[
              { name: "Home", href: "/" },
              { name: "Quality & certifications", href: "/quality-and-certifications" },
            ]}
            className="mb-8"
          />
          <div className="max-w-3xl">
            <Eyebrow>Quality first</Eyebrow>
            <h1 className="mt-5 text-[2.1rem] leading-[1.1] sm:text-[2.9rem] lg:text-[3.2rem]">
              International buyers require more than a competitive price.
            </h1>
            <p className="mt-8 text-[1.0625rem] leading-relaxed text-ink-600">
              Every product we supply can be sourced according to agreed
              specifications covering grade, size, moisture, purity, colour,
              chemical parameters, microbiological limits, processing
              requirements, packaging, labelling, shelf life and
              destination-market requirements.
            </p>
          </div>
        </Container>
      </section>

      {/* Specifiable parameters, in the ledger register. */}
      <section aria-labelledby="parameters-heading">
        <Container className="py-20 sm:py-24">
          <SectionHeading
            eyebrow="Specification"
            title={<span id="parameters-heading">What you can specify.</span>}
            className="mb-10"
          />
          <ul className="grid max-w-4xl gap-x-8 border-t border-rule-strong sm:grid-cols-2 lg:grid-cols-3">
            {parameters.map((parameter) => (
              <li
                key={parameter}
                className="ledger-spec border-b border-rule py-3.5 text-ink-600"
              >
                {parameter}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Documentation, Specification Ledger styling. Section 5.4. */}
      <section
        aria-labelledby="documentation-heading"
        className="border-y border-rule bg-ivory-100/50"
      >
        <Container className="py-20 sm:py-24">
          <SectionHeading
            eyebrow="Documentation"
            title={<span id="documentation-heading">What travels with the shipment.</span>}
            intro="Where applicable, products are supported by the following documentation, coordinated per product and per destination."
            className="mb-12"
          />
          <div className="ledger-scroll max-w-4xl">
            <table className="ledger">
              <caption className="sr-only">
                Export documentation supplied with shipments
              </caption>
              <thead>
                <tr>
                  <th scope="col" className="pl-0">
                    Document
                  </th>
                  <th scope="col">What it covers</th>
                </tr>
              </thead>
              <tbody>
                {exportDocuments.map((doc) => (
                  <tr key={doc.id}>
                    <th scope="row" className="ledger-wrap">
                      {doc.name}
                    </th>
                    <td className="ledger-spec">{doc.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="ledger-foot max-w-4xl">
            COA available on request · Specifications confirmed before shipment
          </p>
        </Container>
      </section>

      {/* Registrations. Nothing unconfirmed is presented as held. */}
      <section aria-labelledby="registrations-heading">
        <Container className="py-20 sm:py-24">
          <SectionHeading
            eyebrow="Registrations"
            title={<span id="registrations-heading">Registrations and certifications.</span>}
            className="mb-10"
          />
          <ul className="grid max-w-4xl border-l border-t border-rule sm:grid-cols-2 [&>li]:border-b [&>li]:border-r [&>li]:border-rule">
            {certifications.map((cert) => (
              <li key={cert.id} className="p-6 sm:p-7">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <h3 className="text-[1.1rem] leading-snug">{cert.name}</h3>
                  {!cert.confirmed ? (
                    <span className="form-badge shrink-0 border-dashed text-gold-700">
                      Pending
                    </span>
                  ) : null}
                </div>
                <Eyebrow className="mb-3">{cert.issuer}</Eyebrow>
                <p className="text-[0.9375rem] leading-relaxed text-ink-600">
                  {cert.meaning}
                </p>
              </li>
            ))}
          </ul>
          {hasUnconfirmed ? (
            <p className="mt-6 max-w-2xl text-[0.875rem] leading-relaxed text-ink-500">
              Registrations marked pending are being confirmed with the issuing
              authority and are not yet presented as held. They are listed in
              CONTENT_REVIEW.md and must be verified before launch.
            </p>
          ) : null}
        </Container>
      </section>

      <section className="border-y border-rule bg-ivory-100/50">
        <Container className="py-16 sm:py-20">
          <BuyerSpecNote />
        </Container>
      </section>

      <section>
        <Container className="py-20 sm:py-24">
          <FaqAccordion faqs={generalFaqs} title="Common questions" />
        </Container>
      </section>

      <RfqCta />
    </>
  );
}
