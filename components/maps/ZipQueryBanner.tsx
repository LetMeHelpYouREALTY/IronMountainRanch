import Link from "next/link";
import { getZipEntry, isValidZipCode } from "@/lib/las-vegas-zip-data";

type ZipQueryBannerProps = {
  zip?: string | null;
  variant?: "buy" | "contact";
};

export default function ZipQueryBanner({ zip, variant = "buy" }: ZipQueryBannerProps) {
  if (!zip || !isValidZipCode(zip)) return null;

  const entry = getZipEntry(zip);
  const areaLabel = entry ? `${entry.area}` : "Las Vegas Valley";

  if (variant === "contact") {
    return (
      <div
        className="mb-8 rounded-xl border border-blue-200 bg-blue-50 px-5 py-4 text-slate-800"
        role="status"
      >
        <p className="font-medium">
          Interested in homes near zip {zip}
          {entry ? ` (${areaLabel})` : ""}?
        </p>
        <p className="mt-1 text-sm text-slate-600">
          Schedule a consultation below or call Dr. Jan Duffy. Mention zip {zip} when you book.
        </p>
        <Link
          href="/las-vegas-zip-code-map"
          className="mt-2 inline-block text-sm font-semibold text-blue-700 hover:underline"
        >
          Browse the Las Vegas zip code map →
        </Link>
      </div>
    );
  }

  return (
    <div
      className="container mx-auto px-4 pt-6"
      role="status"
    >
      <div className="mx-auto max-w-4xl rounded-xl border border-blue-200 bg-blue-50 px-5 py-4 text-slate-800">
        <p className="font-medium">
          Showing MLS search for zip {zip}
          {entry ? ` — ${areaLabel}` : ""}
        </p>
        <p className="mt-1 text-sm text-slate-600">
          Enter a city or address in the search below, or refine filters for this zip.
        </p>
        <Link
          href="/las-vegas-zip-code-map"
          className="mt-2 inline-block text-sm font-semibold text-blue-700 hover:underline"
        >
          View all valley zip codes →
        </Link>
      </div>
    </div>
  );
}
