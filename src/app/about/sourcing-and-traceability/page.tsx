import type { Metadata } from "next";
import Link from "next/link";

import { RfqCta } from "@/components/product/RfqCta";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Container } from "@/components/shared/Container";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { FeatherArcDivider } from "@/components/shared/FeatherArc";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { categories } from "@/data/categories";
import { getProduct } from "@/data/products";
import { sourcingRegions, sourcingStages } from "@/data/sourcing";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Sourcing & Traceability",
  description:
    "How Allvora Resources sources from India: named producing regions, written specification confirmation, testing where required, and export documentation assembled per destination.",
  path: "/about/sourcing-and-traceability",
  eyebrow: "SOURCING",
});

function categorySlugFor(productSlug: string): string {
  const product = getProduct(productSlug);
  return categories.find((c) => c.slug === product?.category)?.slug ?? "spices";
}

export default function SourcingPage() {
  return (
    <>
      <section className="border-b border-rule">
        <Container className="py-16 sm:py-20">
          <Breadcrumbs
            crumbs={[
              { name: "Home", href: "/" },
              { name: "About", href: "/about" },
              { name: "Sourcing & traceability", href: "/about/sourcing-and-traceability" },
            ]}
            className="mb-8"
          />
          <div className="max-w-3xl">
            <Eyebrow>Sourcing</Eyebrow>
            <h1 className="mt-5 text-[2.1rem] leading-[1.1] sm:text-[2.9rem] lg:text-[3.2rem]">
              From producing region to port, with a paper trail.
            </h1>
            <p className="mt-8 text-[1.0625rem] leading-relaxed text-ink-600">
              We source each requirement from the region best known for it:
              chilli from Guntur and Byadagi, pepper and cardamom from the
              Western Ghats, turmeric from Erode, Salem and Nizamabad, Basmati
              from the northern plains, tea from Assam, Darjeeling and the
              Nilgiris, coffee from the southern plantations. Working with
              established producers and processors in each region, we confirm
              specifications before shipment and support them with testing and
              documentation where required. Buyers receive visibility on origin,
              crop year and processing at the specification stage, not after the
              container ships.
            </p>
          </div>
        </Container>
      </section>

      <section aria-labelledby="regions-heading">
        <Container className="py-20 sm:py-24">
          <SectionHeading
            eyebrow="Sourcing regions"
            title={<span id="regions-heading">Where each product comes from.</span>}
            className="mb-12"
          />
          <ul className="border-t border-rule-strong">
            {sourcingRegions.map((region) => (
              <li
                key={region.id}
                className="grid gap-3 border-b border-rule py-7 sm:grid-cols-[15rem_1fr] sm:gap-8"
              >
                <div>
                  <h3 className="text-[1.15rem] leading-snug">{region.name}</h3>
                  <Eyebrow className="mt-1.5">{region.area}</Eyebrow>
                </div>
                <div>
                  <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-ink-600">
                    {region.note}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {region.products.map((productSlug) => {
                      const product = getProduct(productSlug);
                      if (!product) return null;
                      return (
                        <li key={productSlug}>
                          <Link
                            href={`/products/${categorySlugFor(productSlug)}/${productSlug}`}
                            className="form-badge inline-block transition-colors hover:border-peacock-600 hover:text-peacock-900"
                          >
                            {product.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="process-heading" className="border-y border-rule bg-ivory-100/50">
        <Container className="py-20 sm:py-24">
          <SectionHeading
            eyebrow="The process"
            title={<span id="process-heading">What happens between your enquiry and the container.</span>}
            className="mb-14"
          />
          <ol className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
            {sourcingStages.map((stage, index) => (
              <li key={stage.id} className="border-t border-rule-strong pt-6">
                <Eyebrow className="mb-4 tabular-nums text-gold-700">
                  {String(index + 1).padStart(2, "0")}
                </Eyebrow>
                <h3 className="text-[1.25rem] leading-snug">{stage.title}</h3>
                <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-ink-600">
                  {stage.body}
                </p>
                <ul className="mt-5 space-y-1.5">
                  {stage.outputs.map((output) => (
                    <li key={output} className="ledger-spec flex gap-2.5 leading-snug">
                      <span aria-hidden className="mt-[0.62em] h-px w-2.5 shrink-0 bg-gold-500" />
                      <span>{output}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <FeatherArcDivider className="mt-16" />
        </Container>
      </section>

      <RfqCta
        heading="Send a specification and see the process start."
        body="Share your variety, grade, volume and destination. We respond within 24 hours."
      />
    </>
  );
}
