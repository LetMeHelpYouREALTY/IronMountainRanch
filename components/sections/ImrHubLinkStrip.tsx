import Link from "next/link";
import { IRON_MOUNTAIN_RANCH_HUB_PATH } from "@/lib/iron-mountain-ranch";

type ImrHubLinkStripProps = {
  className?: string;
};

/** Exact-match internal link back to the money hub (Palmer silo). */
export default function ImrHubLinkStrip({ className = "" }: ImrHubLinkStripProps) {
  return (
    <p className={`text-sm text-slate-600 ${className}`.trim()}>
      <Link
        href={IRON_MOUNTAIN_RANCH_HUB_PATH}
        className="font-semibold text-blue-600 hover:underline"
      >
        Iron Mountain Ranch Las Vegas homes for sale
      </Link>
      {" · "}
      <Link href="/buy" className="font-semibold text-blue-600 hover:underline">
        Search MLS listings
      </Link>
      {" · "}
      <Link href="/sub-communities" className="font-semibold text-blue-600 hover:underline">
        Village guides
      </Link>
    </p>
  );
}
