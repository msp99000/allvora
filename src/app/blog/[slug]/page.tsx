import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { RfqCta } from "@/components/product/RfqCta";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Container } from "@/components/shared/Container";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { JsonLd } from "@/components/shared/JsonLd";
import { blogPosts, getPost } from "@/data/blog";
import { getProduct, getVariety } from "@/data/products";
import { blogBodies } from "@/lib/blog-bodies";
import { blogPostingJsonLd, buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return buildMetadata({
    title: post.seoTitle,
    description: post.seoDescription,
    path: `/blog/${post.slug}`,
    eyebrow: "BUYER GUIDE",
    type: "article",
    publishedTime: post.published,
  });
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  const load = blogBodies[slug];
  if (!post || !load) notFound();

  const { default: Body } = await load();

  const related = [
    ...post.relatedVarieties.flatMap((key) => {
      const [productSlug, varietySlug] = key.split("/");
      if (!productSlug || !varietySlug) return [];
      const found = getVariety(productSlug, varietySlug);
      if (!found || found.variety.priority !== "P1") return [];
      return [
        {
          name: found.variety.headingName,
          href: `/products/${found.product.category}/${productSlug}/${varietySlug}`,
        },
      ];
    }),
    ...post.relatedProducts.flatMap((productSlug) => {
      const product = getProduct(productSlug);
      if (!product) return [];
      return [
        {
          name: `All ${product.name.toLowerCase()} grades`,
          href: `/products/${product.category}/${product.slug}`,
        },
      ];
    }),
  ];

  return (
    <>
      <JsonLd data={blogPostingJsonLd(post)} />

      <article>
        <header className="border-b border-rule">
          <Container className="py-16 sm:py-20">
            <Breadcrumbs
              crumbs={[
                { name: "Home", href: "/" },
                { name: "Blog", href: "/blog" },
                { name: post.title, href: `/blog/${post.slug}` },
              ]}
              className="mb-8"
            />
            <div className="max-w-3xl">
              <Eyebrow className="tabular-nums">
                Buyer guide ·{" "}
                <time dateTime={post.published}>
                  {new Date(`${post.published}T00:00:00Z`).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    timeZone: "UTC",
                  })}
                </time>{" "}
                · {post.readingMinutes} min read
              </Eyebrow>
              <h1 className="mt-5 type-title">
                {post.title}
              </h1>
              <p className="mt-7 type-lead text-ink-600">
                {post.excerpt}
              </p>
            </div>
          </Container>
        </header>

        <Container className="py-14 sm:py-16">
          <div className="prose-allvora">
            <Body />
          </div>

          {related.length > 0 ? (
            <aside className="mt-16 max-w-2xl border-t border-rule-strong pt-6">
              <Eyebrow className="mb-4">Referenced in this guide</Eyebrow>
              <ul className="flex flex-wrap gap-2">
                {related.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="form-badge inline-block transition-colors hover:border-peacock-600 hover:text-peacock-900"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}

          <p className="mt-12 max-w-2xl text-[0.875rem] leading-relaxed text-ink-500">
            This guide is general information for buyers, not a substitute for
            the requirements of your destination market. Confirm current rules
            with your own customs broker or authority.
          </p>
        </Container>
      </article>

      <RfqCta />
    </>
  );
}
