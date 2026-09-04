/**
 * Phase 5 verification for the Section 7 SEO contract.
 *
 * Crawls every built route against a running server and checks metadata,
 * structured data and internal linking. Run against a production build:
 *
 *   npx next build && npx next start -p 4311 &
 *   npm run audit:seo -- http://localhost:4311
 */

import { site } from "../src/data/site";
import { builtRoutes } from "../src/lib/routes";

const base = (process.argv[2] ?? "http://localhost:4311").replace(/\/$/, "");
/** Read from the site config so changing the domain cannot leave this stale. */
const PROD_ORIGIN = site.url;

interface Problem {
  route: string;
  level: "error" | "warn";
  message: string;
}

const problems: Problem[] = [];
const fail = (route: string, message: string) =>
  problems.push({ route, level: "error", message });
const warn = (route: string, message: string) =>
  problems.push({ route, level: "warn", message });

function pick(html: string, re: RegExp): string | undefined {
  return re.exec(html)?.[1]?.trim();
}

function meta(html: string, name: string): string | undefined {
  const byName = new RegExp(
    `<meta[^>]+(?:name|property)="${name}"[^>]*content="([^"]*)"`,
    "i"
  );
  const byContentFirst = new RegExp(
    `<meta[^>]+content="([^"]*)"[^>]*(?:name|property)="${name}"`,
    "i"
  );
  return pick(html, byName) ?? pick(html, byContentFirst);
}

function jsonLdBlocks(html: string): unknown[] {
  const out: unknown[] = [];
  const re = /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(html))) {
    const raw = match[1];
    if (!raw) continue;
    try {
      const parsed: unknown = JSON.parse(raw.replace(/\\u003c/g, "<"));
      if (Array.isArray(parsed)) out.push(...parsed);
      else out.push(parsed);
    } catch {
      out.push({ __parseError: raw.slice(0, 120) });
    }
  }
  return out;
}

function typesOf(blocks: unknown[]): string[] {
  return blocks
    .map((b) => (b as { "@type"?: unknown })?.["@type"])
    .filter((t): t is string => typeof t === "string");
}

function decode(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'");
}

async function main() {
  const routes = builtRoutes().filter((r) => !r.path.startsWith("/dev"));
  const titles = new Map<string, string[]>();
  const descriptions = new Map<string, string[]>();
  const inboundLinks = new Map<string, number>(routes.map((r) => [r.path, 0]));

  console.log(`Auditing ${routes.length} routes against ${base}\n`);

  for (const route of routes) {
    const response = await fetch(`${base}${route.path}`);
    if (!response.ok) {
      fail(route.path, `HTTP ${response.status}`);
      continue;
    }
    const html = await response.text();

    // --- Title ---
    const title = pick(html, /<title>([\s\S]*?)<\/title>/i);
    if (!title) fail(route.path, "no <title>");
    else {
      const clean = decode(title);
      titles.set(clean, [...(titles.get(clean) ?? []), route.path]);
      if (clean.length > 65) {
        warn(route.path, `title ${clean.length} chars (Google truncates near 60): ${clean}`);
      }
    }

    // --- Description ---
    const description = meta(html, "description");
    if (!description) fail(route.path, "no meta description");
    else {
      const clean = decode(description);
      descriptions.set(clean, [...(descriptions.get(clean) ?? []), route.path]);
      if (clean.length < 120 || clean.length > 170) {
        warn(route.path, `description ${clean.length} chars (target 150 to 160)`);
      }
    }

    // --- Exactly one H1, Section 7.5 ---
    const h1s = html.match(/<h1[\s>]/g) ?? [];
    if (h1s.length !== 1) fail(route.path, `${h1s.length} h1 elements, expected exactly 1`);

    // --- Canonical ---
    const canonical = pick(html, /<link[^>]+rel="canonical"[^>]*href="([^"]*)"/i);
    const expected = `${PROD_ORIGIN}${route.path === "/" ? "" : route.path}`;
    if (!canonical) fail(route.path, "no canonical link");
    else if (canonical !== expected) {
      fail(route.path, `canonical is ${canonical}, expected ${expected}`);
    }

    // --- Open Graph and Twitter, Section 7.1 ---
    for (const tag of ["og:title", "og:description", "og:image", "og:url"]) {
      if (!meta(html, tag)) fail(route.path, `missing ${tag}`);
    }
    if (!meta(html, "twitter:card")) fail(route.path, "missing twitter:card");

    // --- Structured data, Section 7.2 ---
    const blocks = jsonLdBlocks(html);
    if (blocks.some((b) => (b as { __parseError?: string }).__parseError)) {
      fail(route.path, "JSON-LD failed to parse");
    }
    const types = typesOf(blocks);
    if (!types.includes("Organization")) fail(route.path, "no Organization JSON-LD");

    const nested = route.path.split("/").filter(Boolean).length > 1;
    if (nested && !types.includes("BreadcrumbList")) {
      fail(route.path, "nested page without BreadcrumbList");
    }
    if (route.kind === "variety" && !types.includes("Product")) {
      fail(route.path, "variety page without Product JSON-LD");
    }
    if (route.kind === "blog-post" && !types.includes("BlogPosting")) {
      fail(route.path, "post without BlogPosting JSON-LD");
    }

    // FAQ accordion and FAQPage schema must appear together.
    const hasAccordion = html.includes('data-slot="accordion"') || html.includes("faq-heading");
    if (hasAccordion && !types.includes("FAQPage")) {
      fail(route.path, "FAQ rendered without FAQPage JSON-LD");
    }

    const serialised = JSON.stringify(blocks);

    // Section 7.8: no price, no fabricated ratings.
    for (const banned of ["aggregateRating", '"offers"', "priceCurrency", "reviewCount"]) {
      if (serialised.includes(banned)) {
        fail(route.path, `banned property in structured data: ${banned}`);
      }
    }
    // Placeholders must never reach structured data.
    if (/\{\{[A-Z_]+\}\}/.test(serialised)) {
      fail(route.path, "unresolved {{TOKEN}} placeholder inside JSON-LD");
    }

    // --- Internal links, Section 7.4 ---
    const hrefs = [...html.matchAll(/href="(\/[^"#?]*)"/g)]
      .map((m) => m[1] ?? "")
      .map((h) => (h.length > 1 ? h.replace(/\/$/, "") : h));
    for (const href of new Set(hrefs)) {
      if (href !== route.path && inboundLinks.has(href)) {
        inboundLinks.set(href, (inboundLinks.get(href) ?? 0) + 1);
      }
    }
  }

  // --- Uniqueness ---
  for (const [title, paths] of titles) {
    if (paths.length > 1) fail(paths.join(", "), `duplicate title: ${title}`);
  }
  for (const [description, paths] of descriptions) {
    if (paths.length > 1) {
      fail(paths.join(", "), `duplicate description: ${description.slice(0, 60)}…`);
    }
  }

  // --- Orphans, Section 7.4 ---
  for (const [path, count] of inboundLinks) {
    if (count === 0 && path !== "/") fail(path, "orphan page, no internal links point to it");
  }

  // --- sitemap and robots ---
  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  for (const route of routes) {
    const url = `${PROD_ORIGIN}${route.path === "/" ? "" : route.path}`;
    if (!sitemap.includes(`<loc>${url}</loc>`)) {
      fail(route.path, "missing from sitemap.xml");
    }
  }
  const sitemapCount = (sitemap.match(/<loc>/g) ?? []).length;
  if (sitemapCount !== routes.length) {
    warn("/sitemap.xml", `${sitemapCount} entries for ${routes.length} built routes`);
  }

  const robots = await (await fetch(`${base}/robots.txt`)).text();
  if (!robots.includes("Sitemap:")) fail("/robots.txt", "no Sitemap line");
  if (!robots.includes("/dev/")) warn("/robots.txt", "dev routes not disallowed");

  // --- Report ---
  const errors = problems.filter((p) => p.level === "error");
  const warnings = problems.filter((p) => p.level === "warn");

  for (const problem of [...errors, ...warnings]) {
    console.log(
      `${problem.level === "error" ? "FAIL" : "warn"}  ${problem.route}\n      ${problem.message}`
    );
  }

  console.log(
    `\n${routes.length} routes audited, ${sitemapCount} sitemap entries, ` +
      `${errors.length} errors, ${warnings.length} warnings.`
  );
  process.exit(errors.length > 0 ? 1 : 0);
}

void main();
