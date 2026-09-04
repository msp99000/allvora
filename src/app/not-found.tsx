import Link from "next/link";

import { Container } from "@/components/shared/Container";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { FeatherArcUnderlay } from "@/components/shared/FeatherArc";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/categories";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <FeatherArcUnderlay className="absolute -right-28 -top-20 h-[36rem] w-[36rem] opacity-60" />
      <Container className="relative py-24 sm:py-32">
        <div className="max-w-2xl">
          <Eyebrow className="tabular-nums">Error 404</Eyebrow>
          <h1 className="mt-5 text-[2.1rem] leading-[1.1] sm:text-[2.9rem]">
            That page is not in the catalogue.
          </h1>
          <p className="mt-7 text-[1.0625rem] leading-relaxed text-ink-600">
            The link may be out of date, or the variety you are looking for may
            not have its own page yet. Every product line is listed below, and
            the quote form takes a free-text specification if you cannot find
            what you need.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button asChild variant="gold" size="lg">
              <Link href="/request-a-quote">Request a quote</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/products">All products</Link>
            </Button>
          </div>

          <div className="mt-14 border-t border-rule-strong pt-6">
            <Eyebrow className="mb-4">Product lines</Eyebrow>
            <ul className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/products/${category.slug}`}
                    className="form-badge inline-block transition-colors hover:border-peacock-600 hover:text-peacock-900"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
