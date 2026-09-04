import { FaqAccordionClient } from "@/components/shared/FaqAccordionClient";
import { JsonLd } from "@/components/shared/JsonLd";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { Faq } from "@/data/faqs";
import { faqJsonLd } from "@/lib/seo";

/**
 * Section 6: the accordion and its FAQPage JSON-LD render from the same data,
 * so the structured data can never drift from what a buyer reads.
 */
export function FaqAccordion({
  faqs,
  title = "Common questions",
  eyebrow = "FAQ",
}: {
  faqs: Faq[];
  title?: string;
  eyebrow?: string;
}) {
  if (faqs.length === 0) return null;

  return (
    <section aria-labelledby="faq-heading">
      <JsonLd data={faqJsonLd(faqs)} />
      <SectionHeading
        eyebrow={eyebrow}
        title={<span id="faq-heading">{title}</span>}
        className="mb-8"
      />
      <div className="max-w-3xl">
        <FaqAccordionClient faqs={faqs} />
      </div>
    </section>
  );
}
