import PageHero from "@/components/sections/PageHero";
import { getHeroForPath } from "@/lib/page-hero";
import type { ReactNode } from "react";

type IronMountainPageHeroProps = {
  /** App route path, e.g. `/buy` */
  path: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  priority?: boolean;
};

/**
 * Hyperlocal hero block for Iron Mountain Ranch marketing pages.
 * Resolves imagery + location badges from `lib/page-hero.ts`.
 */
export default function IronMountainPageHero({
  path,
  title,
  subtitle,
  children,
  priority = false,
}: IronMountainPageHeroProps) {
  const hero = getHeroForPath(path);

  return (
    <PageHero {...hero} priority={priority}>
      <div className="text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight">{title}</h1>
        {subtitle ? (
          <p className="text-lg md:text-xl text-white/85 max-w-3xl mx-auto mb-6">{subtitle}</p>
        ) : null}
        {children}
      </div>
    </PageHero>
  );
}
