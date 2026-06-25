import Link from "next/link";
import {
  getVillagePrimaryZip,
  subCommunities,
} from "@/lib/iron-mountain-ranch";

export default function ImrVillageGuideTable() {
  return (
    <section
      className="max-w-5xl mx-auto mb-16"
      aria-labelledby="imr-village-table-heading"
    >
      <h2 id="imr-village-table-heading" className="text-2xl font-bold text-slate-900 mb-3">
        Iron Mountain Ranch villages — MLS subdivisions &amp; zip codes
      </h2>
      <p className="text-slate-600 mb-6 text-sm leading-relaxed">
        Buyers search by village name, builder marketing label, or exact GLVAR subdivision string.
        Use this table to match MLS filters to the right gated village—then open each guide for
        floor-plan context and live inventory.
      </p>
      <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold">
                Village / enclave
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                MLS subdivision
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Zip
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Guide
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {subCommunities.map((village) => {
              const zip = getVillagePrimaryZip(village.slug);
              return (
                <tr key={village.slug} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {village.name}
                    {village.alsoKnownAs?.[0] ? (
                      <span className="block text-xs font-normal text-slate-500">
                        aka {village.alsoKnownAs[0]}
                      </span>
                    ) : null}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{village.mlsSubdivision}</td>
                  <td className="px-4 py-3 text-slate-700">{zip}</td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/sub-communities/${village.slug}`}
                      className="font-semibold text-blue-600 hover:underline"
                    >
                      {village.name} homes for sale
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs text-slate-500">
        Gated access and HOA/LMA dues vary by village. Spring Mountain Ranch is a different
        community—see our FAQ if you meant Iron Mountain Ranch HOA or LMA.
      </p>
    </section>
  );
}
