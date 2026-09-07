import type { Metadata } from "next";
import Link from "next/link";

import { RfqForm } from "@/components/product/RfqForm";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Container } from "@/components/shared/Container";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { site } from "@/data/site";
import { resolvePrefill } from "@/lib/rfq-prefill";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Request a Quote",
  description:
    "Send your specification to Allvora Resources: product, grade, quantity, packaging, destination port and Incoterm. We respond within 24 hours.",
  path: "/request-a-quote",
  eyebrow: "REQUEST A QUOTE",
});

const checklist = [
  "Product, variety and grade, or the parameters that matter most",
  "Quantity and packaging format",
  "Destination port and Incoterm",
  "Certifications or test parameters your market requires",
];

/**
 * Server-rendered rather than static: the form's starting values come from the
 * query string, so resolving them here puts the correct selects in the initial
 * HTML. Doing it on the client needed a Suspense boundary whose fallback swap
 * measured a 0.173 layout shift.
 */
export default async function RequestAQuotePage({
  searchParams,
}: PageProps<"/request-a-quote">) {
  const params = await searchParams;
  const prefill = resolvePrefill(params);

  return (
    <>
      <section className="border-b border-rule">
        <Container className="py-16 sm:py-20">
          <Breadcrumbs
            crumbs={[
              { name: "Home", href: "/" },
              { name: "Request a quote", href: "/request-a-quote" },
            ]}
            className="mb-8"
          />
          <div className="max-w-3xl">
            <h1 className="type-title">
              Request a quote.
            </h1>
            <p className="mt-8 type-lead text-ink-600">
              Send your specification and receive a response within 24 hours. The
              more detail you share, the faster we can confirm availability and
              pricing.
            </p>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-16 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
            <RfqForm prefill={prefill} />

            <aside className="lg:pt-2">
              <div className="border-t border-rule-strong pt-6">
                <Eyebrow className="mb-4 text-gold-700">Helps us quote faster</Eyebrow>
                <ul className="space-y-2.5">
                  {checklist.map((item) => (
                    <li key={item} className="ledger-spec flex gap-3 leading-snug">
                      <span aria-hidden className="mt-[0.62em] h-px w-2.5 shrink-0 bg-gold-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 border-t border-rule pt-6">
                <Eyebrow className="mb-3">Prefer to write directly</Eyebrow>
                <ul className="space-y-2 text-[0.9375rem]">
                  <li>
                    <a
                      href={site.email.href}
                      className="text-peacock-600 underline decoration-peacock-600/40 underline-offset-4 transition-colors hover:decoration-gold-500"
                    >
                      {site.email.label}
                    </a>
                  </li>
                  <li>
                    <a
                      href={site.whatsapp.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-peacock-600 underline decoration-peacock-600/40 underline-offset-4 transition-colors hover:decoration-gold-500"
                    >
                      WhatsApp {site.whatsapp.label}
                    </a>
                  </li>
                </ul>
                <Link
                  href="/contact"
                  className="eyebrow mt-5 inline-block text-gold-700 underline decoration-gold-500/50 underline-offset-4 transition-colors hover:decoration-gold-500"
                >
                  All contact details
                </Link>
              </div>

              <p className="mt-10 border-t border-rule pt-6 text-[0.875rem] leading-relaxed text-ink-500">
                We do not publish prices. Quotes are issued against a confirmed
                specification, volume and destination.
              </p>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
