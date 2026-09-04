import Link from "next/link";

import { Logo } from "@/components/layout/Logo";
import { CertBadgeRow } from "@/components/shared/CertBadgeRow";
import { Container } from "@/components/shared/Container";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { categories } from "@/data/categories";
import { markets } from "@/data/markets";
import { products } from "@/data/products";
import { site } from "@/data/site";

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/about/sourcing-and-traceability", label: "Sourcing & traceability" },
  { href: "/quality-and-certifications", label: "Quality & certifications" },
  { href: "/private-label-and-packaging", label: "Private label & packaging" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

/** Section 4: product tree, markets, company links, contact, badges, legal. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-peacock bg-peacock-900 text-ivory-50">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-x-8 gap-y-12 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <Logo onDark />
            <p className="mt-6 max-w-xs font-display text-[1.15rem] leading-snug text-ivory-50">
              {site.tagline}
            </p>
            <div className="mt-8">
              <Eyebrow className="mb-3 text-ivory-50/70">Contact</Eyebrow>
              <ul className="space-y-1.5 text-[0.9375rem]">
                <li>
                  <a
                    href={site.email.href}
                    className="text-ivory-50/85 underline decoration-ivory-50/25 underline-offset-4 transition-colors hover:text-gold-300 hover:decoration-gold-500"
                  >
                    {site.email.label}
                  </a>
                </li>
                <li>
                  <a
                    href={site.phone.href}
                    className="text-ivory-50/85 underline decoration-ivory-50/25 underline-offset-4 transition-colors hover:text-gold-300 hover:decoration-gold-500"
                  >
                    {site.phone.label}
                  </a>
                </li>
                <li>
                  <a
                    href={site.whatsapp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ivory-50/85 underline decoration-ivory-50/25 underline-offset-4 transition-colors hover:text-gold-300 hover:decoration-gold-500"
                  >
                    WhatsApp {site.whatsapp.label}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <div key={category.slug}>
                <Eyebrow className="mb-3 text-ivory-50/70">
                  <Link href={`/products/${category.slug}`} className="hover:text-gold-300">
                    {category.name}
                  </Link>
                </Eyebrow>
                <ul className="space-y-1.5">
                  {products
                    .filter((p) => p.category === category.slug)
                    .map((product) => (
                      <li key={product.slug}>
                        <Link
                          href={`/products/${category.slug}/${product.slug}`}
                          className="text-[0.9375rem] text-ivory-50/80 transition-colors hover:text-gold-300"
                        >
                          {product.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}

            <div>
              <Eyebrow className="mb-3 text-ivory-50/70">
                <Link href="/markets" className="hover:text-gold-300">
                  Markets
                </Link>
              </Eyebrow>
              <ul className="space-y-1.5">
                {markets.map((market) => (
                  <li key={market.slug}>
                    <Link
                      href={`/markets/${market.slug}`}
                      className="text-[0.9375rem] text-ivory-50/80 transition-colors hover:text-gold-300"
                    >
                      {market.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Eyebrow className="mb-3 text-ivory-50/70">Company</Eyebrow>
              <ul className="space-y-1.5">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[0.9375rem] text-ivory-50/80 transition-colors hover:text-gold-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-rule-invert pt-8">
          <CertBadgeRow onDark className="mb-8" />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="eyebrow text-ivory-50/70">
              © {year} {site.legalName}. India.
            </p>
            <p className="eyebrow text-ivory-50/70">
              Export and sourcing · No prices published · Quote on specification
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
