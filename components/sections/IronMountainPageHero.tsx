import PageHero from "@/components/sections/PageHero";
import ImrPageContext from "@/components/sections/ImrPageContext";
import { getHeroForPath } from "@/lib/page-hero";
import { shouldShowImrPageContext } from "@/lib/imr-hyperlocal-content";
import type { ReactNode } from "react";

type IronMountainPageHeroProps = {
  /** App route path, e.g. `/buy` */
  path: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  priority?: boolean;
  /** Set false to skip auto hyperlocal context band below hero */
  showImrContext?: boolean;
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
  showImrContext,
}: IronMountainPageHeroProps) {
  const hero = getHeroForPath(path);
  const renderContext =
    showImrContext ?? shouldShowImrPageContext(path);

  return (
    <>
      <PageHero {...hero} priority={priority}>
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight">{title}</h1>
          {subtitle ? (
            <p className="text-lg md:text-xl text-white/85 max-w-3xl mx-auto mb-6">{subtitle}</p>
          ) : null}
          {children}
        </div>
      </PageHero>
      {renderContext ? <ImrPageContext path={path} /> : null}
    </>
  );
}
