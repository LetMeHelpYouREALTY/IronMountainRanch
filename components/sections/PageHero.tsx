import Image from "next/image";
import type { ReactNode } from "react";
import { getHeroImageSrc, type PageHeroContent } from "@/lib/page-hero";
import { MapPin } from "lucide-react";

type PageHeroProps = PageHeroContent & {
  children: ReactNode;
  /** Dark overlay strength 0–100; default 55 */
  overlay?: number;
  priority?: boolean;
  className?: string;
};

export default function PageHero({
  imageKey,
  alt,
  locationBadge,
  locationDetail,
  children,
  overlay = 55,
  priority = false,
  className = "",
}: PageHeroProps) {
  const src = getHeroImageSrc(imageKey);

  return (
    <section
      className={`relative overflow-hidden bg-slate-900 ${className}`}
      aria-label="Page hero"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          fetchPriority={priority ? "high" : "auto"}
          sizes="100vw"
          quality={75}
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-900/60 to-slate-900/85"
          style={{ opacity: overlay / 100 }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-28 pb-14 md:pt-32 md:pb-16 max-w-6xl">
        <div className="mb-6 flex flex-col items-center text-center gap-2">
          <p className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
            <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
            {locationBadge}
          </p>
          {locationDetail ? (
            <p className="text-sm text-slate-200/90 max-w-2xl">{locationDetail}</p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
