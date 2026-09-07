import type { Metadata } from "next";
import Link from "next/link";

import { RfqCta } from "@/components/product/RfqCta";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Container } from "@/components/shared/Container";
import { Media } from "@/components/shared/Media";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { JsonLd } from "@/components/shared/JsonLd";
import { postsNewestFirst } from "@/data/blog";
import { pageImages } from "@/data/images";
import { buildMetadata, itemListJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Buyer Guides",
  description:
    "Buyer guides on sourcing from India: Basmati variety comparisons, spice grading systems, and how to verify an Indian exporter's registrations before you order.",
  path: "/blog",
  eyebrow: "GUIDES",
});

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogHubPage() {
  return (
    <>
      <JsonLd
        data={itemListJsonLd(
          "Allvora Resources buyer guides",
          postsNewestFirst.map((p) => ({ name: p.title, href: `/blog/${p.slug}` }))
        )}
      />

      <section className="border-b border-rule">
        <Container className="py-16 sm:py-20">
          <Breadcrumbs
            crumbs={[
              { name: "Home", href: "/" },
              { name: "Blog", href: "/blog" },
            ]}
            className="mb-8"
          />
          <div className="max-w-3xl">
            <Eyebrow>Guides</Eyebrow>
            <h1 className="mt-5 type-title">
              Buyer guides to sourcing from India.
            </h1>
            <p className="mt-8 type-lead text-ink-600">
              Grading systems, variety comparisons and the paperwork that comes
              with a container. Written for procurement buyers rather than for
              search engines.
            </p>
          </div>
        </Container>
      </section>

      <section aria-labelledby="posts-heading">
        <Container className="py-16 sm:py-20">
          <h2 id="posts-heading" className="sr-only">
            All posts
          </h2>
          <ul className="border-t border-rule-strong">
            {postsNewestFirst.map((post) => (
              <li key={post.slug} className="border-b border-rule">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group grid gap-5 py-9 transition-colors hover:bg-ivory-100/60 sm:grid-cols-[16rem_1fr] sm:gap-10 sm:px-2"
                >
                  <div>
                    {pageImages[`blog/${post.slug}`] ? (
                      <Media
                        image={pageImages[`blog/${post.slug}`]!}
                        ratio="16 / 9"
                        sizes="(min-width: 640px) 16rem, 100vw"
                        className="mb-4 border border-rule"
                      />
                    ) : null}
                    <Eyebrow className="tabular-nums">
                      {formatDate(post.published)} · {post.readingMinutes} min read
                    </Eyebrow>
                  </div>
                  <div>
                    <h3 className="max-w-2xl type-card-lg transition-colors group-hover:text-peacock-600">
                      {post.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-600">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <RfqCta />
    </>
  );
}
