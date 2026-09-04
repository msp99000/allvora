import type { Metadata } from "next";

/**
 * Dev-only responsive harness, noindex.
 *
 * Headless Chrome clamps its window to a 500px minimum, so a 360px layout
 * cannot be captured by resizing the browser. This page renders any route in
 * fixed-width iframes instead, which is also how the 360 / 768 / 1280 / 1920
 * checks in the Section 9 launch checklist get done.
 *
 *   /dev/responsive?path=/products/spices&w=360,768,1280
 */
export const metadata: Metadata = {
  title: "Responsive harness",
  robots: { index: false, follow: false },
};

export default async function ResponsiveHarness({
  searchParams,
}: PageProps<"/dev/responsive">) {
  const params = await searchParams;
  const rawPath = typeof params.path === "string" ? params.path : "/";
  const path = rawPath.startsWith("/") ? rawPath : `/${rawPath}`;
  const rawW = typeof params.w === "string" ? params.w : "360,768,1280";
  const widths = rawW
    .split(",")
    .map((n) => Number.parseInt(n, 10))
    .filter((n) => Number.isFinite(n) && n >= 240 && n <= 2560);
  const height = Number.parseInt(
    typeof params.h === "string" ? params.h : "2400",
    10
  );

  return (
    <div className="flex items-start gap-6 overflow-x-auto bg-ivory-100 p-6">
      {widths.map((width) => (
        <figure key={width} className="shrink-0">
          <figcaption className="eyebrow mb-2">
            {width}px · {path}
          </figcaption>
          <iframe
            src={path}
            title={`${path} at ${width}px`}
            width={width}
            height={height}
            className="border border-rule-strong bg-ivory-50"
          />
        </figure>
      ))}
    </div>
  );
}
