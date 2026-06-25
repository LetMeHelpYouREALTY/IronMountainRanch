import type { Metadata } from "next";
import { buildZipHomesMetadata, ZipHomesForSalePage } from "@/components/sections/ZipHomesForSalePage";

export const metadata: Metadata = buildZipHomesMetadata("89143");

export default function Zip89143HomesPage() {
  return <ZipHomesForSalePage zip="89143" />;
}
