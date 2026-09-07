import type { Metadata } from "next";
import { Mail, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Container } from "@/components/shared/Container";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { FeatherArcDivider } from "@/components/shared/FeatherArc";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Contact Allvora Resources about sourcing spices, Basmati rice, ghee, tea, coffee and natural products from India. Every complete enquiry answered within 24 hours.",
  path: "/contact",
  eyebrow: "CONTACT",
});

export default function ContactPage() {
  const channels = [
    {
      id: "email",
      label: "Email",
      Icon: Mail,
      value: site.email.label,
      href: site.email.href,
      note: "Best for detailed specifications and documentation requests.",
      external: false,
    },
    {
      id: "phone",
      label: "Phone",
      Icon: Phone,
      value: site.phone.label,
      href: site.phone.href,
      note: "Business hours, India Standard Time.",
      external: false,
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      Icon: MessageCircle,
      value: site.whatsapp.label,
      href: site.whatsapp.href,
      note: "Quickest for short questions and sample coordination.",
      external: true,
    },
  ];

  const hasPlaceholders =
    site.email.placeholder || site.phone.placeholder || site.whatsapp.placeholder;

  return (
    <>
      <section className="border-b border-rule">
        <Container className="py-16 sm:py-20">
          <Breadcrumbs
            crumbs={[
              { name: "Home", href: "/" },
              { name: "Contact", href: "/contact" },
            ]}
            className="mb-8"
          />
          <div className="max-w-3xl">
            <Eyebrow>Contact</Eyebrow>
            <h1 className="mt-5 type-title">
              Talk to us about your requirement.
            </h1>
            <p className="mt-8 type-lead text-ink-600">
              Tell us the product, the grade and the destination. Every complete
              enquiry is answered {site.responseWindow}.
            </p>
          </div>
        </Container>
      </section>

      <section aria-labelledby="channels-heading">
        <Container className="py-16 sm:py-20">
          <h2 id="channels-heading" className="sr-only">
            Contact channels
          </h2>
          <ul className="grid border-l border-t border-rule lg:grid-cols-3 [&>li]:border-b [&>li]:border-r [&>li]:border-rule">
            {channels.map(({ id, label, Icon, value, href, note, external }) => (
              <li key={id} className="p-7 sm:p-8">
                <Icon aria-hidden className="mb-5 size-5 text-gold-700" />
                <Eyebrow className="mb-2">{label}</Eyebrow>
                <a
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="font-display text-[1.25rem] text-peacock-900 underline decoration-rule-strong underline-offset-4 transition-colors hover:text-peacock-600 hover:decoration-gold-500"
                >
                  {value}
                </a>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-600">
                  {note}
                </p>
              </li>
            ))}
          </ul>

          {hasPlaceholders ? (
            <p className="mt-6 max-w-2xl text-[0.875rem] leading-relaxed text-ink-500">
              Contact values shown as {"{{TOKEN}}"} are placeholders. They are set
              in one place, src/data/site.ts, and are listed in
              CONTENT_REVIEW.md for replacement with the details Allvora
              confirms.
            </p>
          ) : null}

          <FeatherArcDivider className="my-16" />

          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <div>
              <h2 className="type-section">
                Sending a specification?
              </h2>
              <p className="mt-4 max-w-md type-lead text-ink-600">
                The quote form captures grade, quantity, packaging, destination
                port and Incoterm in one pass, which is usually faster than an
                email thread.
              </p>
              <Button asChild variant="gold" size="lg" className="mt-8">
                <Link href="/request-a-quote">Request a quote</Link>
              </Button>
            </div>
            <div className="border-t border-rule pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <Eyebrow className="mb-3">Registered office</Eyebrow>
              <p className="text-[0.9375rem] leading-relaxed text-ink-600">
                {site.address.locality}, {site.address.region}
                <br />
                {site.address.country}
              </p>
              <Eyebrow className="mb-3 mt-8">Company</Eyebrow>
              <p className="text-[0.9375rem] leading-relaxed text-ink-600">
                {site.legalName}
                <br />
                {site.tagline}
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
