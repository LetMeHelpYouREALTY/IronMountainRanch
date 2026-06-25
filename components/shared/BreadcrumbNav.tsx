import Link from "next/link";
import type { BreadcrumbItem } from "@/lib/schema";

type BreadcrumbNavProps = {
  items: BreadcrumbItem[];
  className?: string;
};

/** Visible breadcrumb trail — pair with generateBreadcrumbSchema for the same items. */
export default function BreadcrumbNav({ items, className = "" }: BreadcrumbNavProps) {
  return (
    <nav aria-label="Breadcrumb" className={`text-sm text-slate-500 ${className}`}>
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.url} className="flex items-center gap-1">
              {index > 0 ? <span aria-hidden="true">/</span> : null}
              {isLast ? (
                <span className="text-slate-900">{item.name}</span>
              ) : (
                <Link href={item.url} className="hover:text-blue-600">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
