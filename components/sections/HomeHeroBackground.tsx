import Image from "next/image";
import { getHeroImageSrc } from "@/lib/page-hero";

type HomeHeroBackgroundProps = {
  /** Descriptive alt for LCP discovery; visually de-emphasized with opacity overlay */
  alt?: string;
};

/**
 * Hero background via next/image (AVIF/WebP, priority) — not CSS background-image.
 */
export default function HomeHeroBackground({
  alt = "Iron Mountain Ranch gated community homes in northwest Las Vegas, Nevada",
}: HomeHeroBackgroundProps) {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Image
        src={getHeroImageSrc("gated-village")}
        alt={alt}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        quality={75}
        className="object-cover object-center opacity-30"
      />
    </div>
  );
}
