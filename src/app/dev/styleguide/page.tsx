import type { Metadata } from "next";

import { CategoryGrid } from "@/components/product/CategoryGrid";
import { BuyerSpecNote } from "@/components/product/BuyerSpecNote";
import { FormsBadges } from "@/components/product/FormsBadges";
import { RfqCta } from "@/components/product/RfqCta";
import { SpecList, SpecTable } from "@/components/product/SpecTable";
import { VarietyCard } from "@/components/product/VarietyCard";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CertBadgeRow } from "@/components/shared/CertBadgeRow";
import { Container } from "@/components/shared/Container";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import {
  FeatherArcDivider,
  FeatherArcOnDark,
  FeatherArcUnderlay,
} from "@/components/shared/FeatherArc";
import { MarketChips } from "@/components/shared/MarketChips";
import { RuleGrid } from "@/components/shared/RuleGrid";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, NativeSelect, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generalFaqs } from "@/data/faqs";
import { getProduct } from "@/data/products";

export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};

const swatches = [
  ["peacock-900", "#0E3B36", "Headers, footer, bands", "bg-peacock-900"],
  ["peacock-700", "#14514A", "Hover on dark", "bg-peacock-700"],
  ["peacock-600", "#1B6B5F", "Links, interactive", "bg-peacock-600"],
  ["peacock-100", "#D8E6E2", "Stamp wash", "bg-peacock-100"],
  ["gold-500", "#C98A2B", "CTA fill and rules only, never text on ivory", "bg-gold-500"],
  ["gold-700", "#96630F", "The text gold, 4.80 on ivory", "bg-gold-700"],
  ["gold-300", "#E3B25E", "Text gold on peacock, 6.36", "bg-gold-300"],
  ["cobalt-700", "#1F3A8A", "Rare data accent", "bg-cobalt-700"],
  ["ivory-50", "#FAF7F0", "Page ground", "bg-ivory-50"],
  ["ivory-100", "#F2ECE0", "Tinted panels", "bg-ivory-100"],
  ["ink-900", "#221A14", "Body text, 16.01", "bg-ink-900"],
  ["ink-600", "#5A4A3C", "Secondary text, 7.92", "bg-ink-600"],
  ["ink-500", "#756456", "Spec labels, 5.29", "bg-ink-500"],
] as const;

function Block({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-rule pt-10">
      <Eyebrow className="mb-2">{title}</Eyebrow>
      {note ? <p className="mb-6 max-w-2xl text-[0.9375rem] text-ink-600">{note}</p> : null}
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function StyleguidePage() {
  const redChilli = getProduct("red-chilli");
  const teja = redChilli?.varieties.find((v) => v.slug === "teja-s17");

  return (
    <>
      <div className="relative overflow-hidden border-b border-rule">
        <FeatherArcUnderlay className="absolute -right-24 -top-16 h-[34rem] w-[34rem] opacity-70" />
        <Container className="relative py-16">
          <Eyebrow>Internal · noindex</Eyebrow>
          <h1 className="mt-3 text-[2.4rem] leading-[1.1]">Allvora design system</h1>
          <p className="mt-4 max-w-2xl text-[1.0625rem] text-ink-600">
            Tokens and components for the Allvora Resources site. The signature
            element is the Specification Ledger: mono values, hairline rules, a
            stamped grade badge and a document footer row.
          </p>
        </Container>
      </div>

      <Container className="space-y-14 py-14">
        <Block title="Palette" note="Contrast ratios are against ivory-50 unless noted. gold-500 fails as text on ivory at 2.74, which is why gold-700 exists.">
          <RuleGrid cols={3}>
            {swatches.map(([name, hex, use, bg]) => (
              <li key={name} className="flex items-center gap-4 p-4">
                <span className={`size-12 shrink-0 border border-rule-strong ${bg}`} />
                <span className="min-w-0">
                  <span className="block font-mono text-[0.8125rem] text-ink-900">{name}</span>
                  <span className="block font-mono text-[0.6875rem] uppercase text-ink-500">{hex}</span>
                  <span className="mt-1 block text-[0.8125rem] leading-snug text-ink-600">{use}</span>
                </span>
              </li>
            ))}
          </RuleGrid>
        </Block>

        <Block title="Typography" note="Libre Caslon Text for headlines, Archivo for body, IBM Plex Mono for specification data and eyebrows.">
          <div className="space-y-6">
            <p className="eyebrow">SPICES / RED CHILLI / TEJA S17</p>
            <p className="font-display text-[3rem] leading-[1.08] text-peacock-900">
              Quality products from India, sourced to your specification.
            </p>
            <p className="font-display text-[2rem] leading-tight text-peacock-900">
              Built for buyers who check the paperwork.
            </p>
            <p className="max-w-2xl text-[1.0625rem] leading-relaxed text-ink-600">
              Body copy in Archivo. Allvora Resources connects international buyers
              with spices, rice, ghee, tea, coffee and natural products from
              India&apos;s producing regions.
            </p>
            <p className="ledger-spec">
              15,000 to 18,000 SHU · ASTA colour · moisture · aflatoxin · pesticide residue
            </p>
          </div>
        </Block>

        <Block title="Buttons">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="gold" size="lg">Request a quote</Button>
            <Button variant="primary">Explore products</Button>
            <Button variant="outline">See specifications</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Inline link</Button>
          </div>
          <div className="on-peacock mt-6 flex flex-wrap items-center gap-3 bg-peacock-900 p-6">
            <Button variant="gold">Request a quote</Button>
            <Button variant="onDark">Contact us</Button>
          </div>
        </Block>

        <Block title="Badges and stamps">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="stamp">Commercial export grade</Badge>
            <Badge variant="stamp">High pungency</Badge>
            <Badge variant="stampPeacock">Tellicherry Special Extra Bold</Badge>
            <Badge variant="form">Whole</Badge>
            <Badge variant="form">Stemless</Badge>
            <Badge variant="form">Powder</Badge>
          </div>
          <CertBadgeRow className="mt-6" />
        </Block>

        <Block title="Breadcrumb eyebrow">
          <Breadcrumbs
            crumbs={[
              { name: "Home", href: "/" },
              { name: "Products", href: "/products" },
              { name: "Spices", href: "/products/spices" },
              { name: "Red Chilli", href: "/products/spices/red-chilli" },
              { name: "Teja S17", href: "/products/spices/red-chilli/teja-s17" },
            ]}
          />
        </Block>

        <Block
          title="Specification Ledger"
          note="The signature component. Scroll it horizontally below 768px rather than squashing the four columns."
        >
          {redChilli ? <SpecTable product={redChilli} categorySlug="spices" /> : null}
        </Block>

        <Block title="Specification list (variety page)">
          {teja ? (
            <div className="max-w-2xl">
              <SpecList gradeType={teja.gradeType} specs={teja.specs} forms={teja.forms} />
            </div>
          ) : null}
        </Block>

        <Block title="Buyer specification note">
          <BuyerSpecNote />
        </Block>

        <Block title="Forms badges">
          <FormsBadges forms={["Whole", "Stemless", "Powder", "Flakes"]} />
        </Block>

        <Block title="Variety cards">
          <RuleGrid cols={3}>
            {redChilli?.varieties.slice(0, 3).map((variety) => (
              <li key={variety.slug}>
                <VarietyCard product={redChilli} variety={variety} categorySlug="spices" />
              </li>
            ))}
          </RuleGrid>
        </Block>

        <Block title="Category grid">
          <CategoryGrid />
        </Block>

        <Block title="Section heading">
          <SectionHeading
            eyebrow="How we work"
            title="Share your requirement, and we take it from there."
            intro="Variety, grade, technical parameters, quantity, packaging and destination."
            reveal={false}
          />
        </Block>

        <Block title="Feather arc motif" note="At most twice per page: one section divider and one underlay or on-dark sweep.">
          <FeatherArcDivider />
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="relative h-48 overflow-hidden border border-rule">
              <FeatherArcUnderlay className="absolute -right-10 -top-6 h-72 w-72" />
            </div>
            <div className="relative h-48 overflow-hidden bg-peacock-900">
              <FeatherArcOnDark className="absolute inset-0 h-full w-full" />
            </div>
          </div>
        </Block>

        <Block title="Market chips">
          <MarketChips />
        </Block>

        <Block title="Form controls">
          <div className="grid max-w-2xl gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="sg-name">Name <span>*</span></Label>
              <Input id="sg-name" placeholder="Your name" />
            </div>
            <div>
              <Label htmlFor="sg-incoterm">Incoterm</Label>
              <NativeSelect id="sg-incoterm" defaultValue="">
                <option value="" disabled>Select</option>
                <option>FOB</option>
                <option>CIF</option>
              </NativeSelect>
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="sg-spec">Target specifications</Label>
              <Textarea id="sg-spec" placeholder="Grade, moisture, packaging, certifications required…" />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="sg-err">Email <span>*</span></Label>
              <Input id="sg-err" aria-invalid defaultValue="not-an-email" />
              <p className="mt-1.5 text-[0.8125rem] text-gold-700">
                Enter a valid email address, for example buyer@company.com
              </p>
            </div>
          </div>
        </Block>

        <Block title="FAQ accordion">
          <FaqAccordion faqs={generalFaqs.slice(0, 4)} title="Common questions" />
        </Block>
      </Container>

      <RfqCta />
    </>
  );
}
