import Image from "next/image";

import type { ImageAsset, ImageTone } from "@/data/images";
import { cn } from "@/lib/utils";

/**
 * One image slot, Section 3.3.
 *
 * When the asset has no `src` yet it renders a branded placeholder rather than
 * a grey box: a warm wash in the palette with the feather mark set very low
 * behind a hairline frame. It should read as a deliberate abstract panel, not
 * as a missing image, so the site looks finished before the photography exists.
 * Dropping a real photo in means setting `src` in src/data/images.ts, and
 * nothing here or in any page changes.
 *
 * The mark is referenced as a file, so the browser caches one copy across every
 * placeholder on the page instead of inlining the path data per slot.
 *
 * The wrapper owns the aspect ratio, so swapping a placeholder for a photograph
 * cannot shift layout.
 */

const toneWash: Record<ImageTone, string> = {
  spice: "from-gold-100 via-ivory-100 to-ivory-200",
  leaf: "from-peacock-100 via-ivory-100 to-ivory-200",
  grain: "from-ivory-100 via-ivory-200 to-gold-100",
  deep: "from-peacock-100 via-ivory-200 to-peacock-100",
};

export interface MediaProps {
  image: ImageAsset;
  /** CSS aspect-ratio value, e.g. "4 / 3". The wrapper reserves this space. */
  ratio?: string;
  /** next/image sizes hint. Required for a well-behaved responsive photo. */
  sizes?: string;
  priority?: boolean;
  className?: string;
}

export function Media({
  image,
  ratio = "4 / 3",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  priority = false,
  className,
}: MediaProps) {
  return (
    <div
      className={cn("relative w-full overflow-hidden bg-ivory-100", className)}
      style={{ aspectRatio: ratio }}
    >
      {image.src ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <Placeholder tone={image.tone} />
      )}
    </div>
  );
}

/**
 * Decorative by definition: it depicts nothing, so it carries no alt text and
 * is hidden from assistive technology. The real alt text arrives with the
 * photograph.
 */
function Placeholder({ tone }: { tone: ImageTone }) {
  return (
    <div
      aria-hidden
      className={cn(
        "absolute inset-0 flex items-center justify-center bg-gradient-to-br",
        toneWash[tone]
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/allvora-logo.svg"
        alt=""
        className="h-[62%] w-auto opacity-[0.14] mix-blend-multiply"
      />
      <span className="pointer-events-none absolute inset-0 border border-rule" />
    </div>
  );
}
