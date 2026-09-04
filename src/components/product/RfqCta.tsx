import Link from "next/link";

import { FeatherArcOnDark } from "@/components/shared/FeatherArc";
import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";

/**
 * Section 6: full-width band, one gold button. On product and variety pages the
 * link carries ?product=&variety= so the RFQ form arrives prefilled.
 */
export function RfqCta({
  heading = "Tell us what you need to source from India.",
  body = "Send your specification and receive a response within 24 hours.",
  productSlug,
  varietySlug,
  categorySlug,
}: {
  heading?: string;
  body?: string;
  productSlug?: string;
  varietySlug?: string;
  categorySlug?: string;
}) {
  const params = new URLSearchParams();
  if (categorySlug) params.set("category", categorySlug);
  if (productSlug) params.set("product", productSlug);
  if (varietySlug) params.set("variety", varietySlug);
  const query = params.toString();
  const href = query ? `/request-a-quote?${query}` : "/request-a-quote";

  return (
    <section className="on-peacock relative overflow-hidden bg-peacock-900 text-ivory-50">
      <FeatherArcOnDark className="absolute -right-16 top-0 h-full w-[36rem] opacity-90" />
      <Container className="relative py-16 sm:py-20">
        <div className="max-w-2xl">
          <h2 className="text-[1.7rem] leading-tight text-ivory-50 sm:text-[2.1rem]">
            {heading}
          </h2>
          <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-ivory-50/80">
            {body}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button asChild variant="gold" size="lg">
              <Link href={href}>Request a quote</Link>
            </Button>
            <Button asChild variant="onDark" size="lg">
              <Link href="/contact">Contact us</Link>
            </Button>
          </div>
          <p className="eyebrow mt-6 text-ivory-50/70">
            Response {site.responseWindow} · COA with every shipment
          </p>
        </div>
      </Container>
    </section>
  );
}
