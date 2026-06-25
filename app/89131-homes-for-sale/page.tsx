import type { Metadata } from "next";
import { buildZipHomesMetadata, ZipHomesForSalePage } from "@/components/sections/ZipHomesForSalePage";

export const metadata: Metadata = buildZipHomesMetadata("89131");

export default function Zip89131HomesPage() {
  return <ZipHomesForSalePage zip="89131" />;
}
