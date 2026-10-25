"use client";

import dynamic from "next/dynamic";

const LasVegasZipCodeMap = dynamic(
  () => import("@/components/maps/LasVegasZipCodeMap"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[420px] animate-pulse rounded-2xl bg-slate-200" aria-hidden="true" />
    ),
  },
);

export default LasVegasZipCodeMap;
