/**
 * Las Vegas Valley zip directory for /las-vegas-zip-code-map.
 * Coordinates are approximate centroids — not legal boundaries.
 */

export type ZipRegion =
  | "northwest"
  | "summerlin"
  | "las-vegas"
  | "north-las-vegas"
  | "henderson"
  | "southwest";

export type LasVegasZipEntry = {
  zip: string;
  area: string;
  region: ZipRegion;
  badge?: string;
  neighborhoods: string[];
  highlight?: boolean;
};

export const ZIP_REGION_LABELS: Record<ZipRegion, string> = {
  northwest: "Northwest Las Vegas",
  summerlin: "Summerlin",
  "las-vegas": "Las Vegas",
  "north-las-vegas": "North Las Vegas",
  henderson: "Henderson",
  southwest: "Southwest Las Vegas",
};

/** Approximate map centers for markers and circles. */
export const ZIP_COORDS: Record<string, { lat: number; lng: number }> = {
  "89101": { lat: 36.1699, lng: -115.1398 },
  "89102": { lat: 36.151, lng: -115.186 },
  "89103": { lat: 36.126, lng: -115.174 },
  "89104": { lat: 36.145, lng: -115.098 },
  "89107": { lat: 36.19, lng: -115.21 },
  "89108": { lat: 36.21, lng: -115.22 },
  "89113": { lat: 36.058, lng: -115.262 },
  "89117": { lat: 36.125, lng: -115.27 },
  "89118": { lat: 36.082, lng: -115.208 },
  "89119": { lat: 36.072, lng: -115.155 },
  "89120": { lat: 36.108, lng: -115.098 },
  "89121": { lat: 36.118, lng: -115.064 },
  "89122": { lat: 36.088, lng: -115.038 },
  "89123": { lat: 36.025, lng: -115.12 },
  "89128": { lat: 36.218, lng: -115.258 },
  "89129": { lat: 36.252, lng: -115.278 },
  "89130": { lat: 36.245, lng: -115.295 },
  "89131": { lat: 36.2812, lng: -115.2847 },
  "89134": { lat: 36.195, lng: -115.295 },
  "89135": { lat: 36.158, lng: -115.332 },
  "89138": { lat: 36.135, lng: -115.355 },
  "89139": { lat: 36.035, lng: -115.195 },
  "89141": { lat: 36.012, lng: -115.168 },
  "89143": { lat: 36.305, lng: -115.318 },
  "89144": { lat: 36.272, lng: -115.305 },
  "89145": { lat: 36.145, lng: -115.28 },
  "89147": { lat: 36.028, lng: -115.268 },
  "89148": { lat: 36.008, lng: -115.248 },
  "89149": { lat: 36.265, lng: -115.335 },
  "89166": { lat: 36.295, lng: -115.34 },
  "89002": { lat: 36.018, lng: -115.038 },
  "89011": { lat: 36.048, lng: -114.978 },
  "89012": { lat: 36.012, lng: -115.048 },
  "89014": { lat: 36.038, lng: -115.078 },
  "89015": { lat: 36.058, lng: -115.018 },
  "89030": { lat: 36.208, lng: -115.118 },
  "89031": { lat: 36.232, lng: -115.097 },
  "89032": { lat: 36.198, lng: -115.117 },
  "89052": { lat: 36.0395, lng: -115.0687 },
  "89074": { lat: 36.021, lng: -115.089 },
};

export const lasVegasZipData: LasVegasZipEntry[] = [
  {
    zip: "89131",
    area: "Iron Mountain Ranch",
    region: "northwest",
    badge: "Iron Mountain Ranch",
    neighborhoods: ["Iron Mountain Ranch", "Centennial Hills", "Northwest Las Vegas"],
    highlight: true,
  },
  {
    zip: "89143",
    area: "Iron Mountain Ranch (north)",
    region: "northwest",
    badge: "Iron Mountain Ranch",
    neighborhoods: ["Iron Mountain Ranch", "Bradley Ranch area", "Northwest Las Vegas"],
    highlight: true,
  },
  {
    zip: "89129",
    area: "Centennial Hills",
    region: "northwest",
    neighborhoods: ["Centennial Hills", "Skye Canyon access", "Aliante nearby"],
  },
  {
    zip: "89144",
    area: "Centennial / Northwest",
    region: "northwest",
    neighborhoods: ["Centennial Hills", "Northwest Las Vegas"],
  },
  {
    zip: "89149",
    area: "Northwest Las Vegas",
    region: "northwest",
    neighborhoods: ["Northwest Las Vegas", "Near Iron Mountain Ranch"],
  },
  {
    zip: "89166",
    area: "Northwest Las Vegas",
    region: "northwest",
    neighborhoods: ["Northwest Las Vegas", "Lone Mountain area"],
  },
  {
    zip: "89130",
    area: "Northwest Las Vegas",
    region: "northwest",
    neighborhoods: ["Centennial Hills", "Northwest valley"],
  },
  {
    zip: "89128",
    area: "Northwest Las Vegas",
    region: "northwest",
    neighborhoods: ["Centennial area", "Northwest Las Vegas"],
  },
  {
    zip: "89134",
    area: "Summerlin North",
    region: "summerlin",
    neighborhoods: ["Summerlin", "The Trails", "North Summerlin"],
  },
  {
    zip: "89135",
    area: "Summerlin West",
    region: "summerlin",
    neighborhoods: ["Summerlin", "The Ridges", "Red Rock Canyon access"],
  },
  {
    zip: "89138",
    area: "Summerlin South",
    region: "summerlin",
    neighborhoods: ["Summerlin", "Southern Highlands nearby"],
  },
  {
    zip: "89145",
    area: "Summerlin / West Las Vegas",
    region: "summerlin",
    neighborhoods: ["Summerlin", "Peccole Ranch"],
  },
  {
    zip: "89101",
    area: "Downtown Las Vegas",
    region: "las-vegas",
    neighborhoods: ["Downtown", "Fremont Street", "Arts District"],
  },
  {
    zip: "89102",
    area: "West of Strip",
    region: "las-vegas",
    neighborhoods: ["Las Vegas Strip area", "Spring Valley edge"],
  },
  {
    zip: "89103",
    area: "Spring Valley",
    region: "las-vegas",
    neighborhoods: ["Spring Valley", "West Las Vegas"],
  },
  {
    zip: "89107",
    area: "Rancho / Charleston",
    region: "las-vegas",
    neighborhoods: ["Rancho", "Charleston area"],
  },
  {
    zip: "89108",
    area: "North Las Vegas (south)",
    region: "las-vegas",
    neighborhoods: ["Las Vegas", "Near US-95"],
  },
  {
    zip: "89031",
    area: "North Las Vegas",
    region: "north-las-vegas",
    neighborhoods: ["North Las Vegas", "Aliante"],
  },
  {
    zip: "89032",
    area: "North Las Vegas",
    region: "north-las-vegas",
    neighborhoods: ["North Las Vegas", "Craig Ranch"],
  },
  {
    zip: "89030",
    area: "North Las Vegas",
    region: "north-las-vegas",
    neighborhoods: ["North Las Vegas", "Downtown NLV"],
  },
  {
    zip: "89052",
    area: "Green Valley",
    region: "henderson",
    neighborhoods: ["Green Valley", "Henderson"],
  },
  {
    zip: "89074",
    area: "Henderson",
    region: "henderson",
    neighborhoods: ["Henderson", "Green Valley Ranch"],
  },
  {
    zip: "89012",
    area: "Henderson",
    region: "henderson",
    neighborhoods: ["Henderson", "Water Street district"],
  },
  {
    zip: "89123",
    area: "South Las Vegas",
    region: "southwest",
    neighborhoods: ["South Las Vegas", "Enterprise"],
  },
  {
    zip: "89139",
    area: "Southwest Las Vegas",
    region: "southwest",
    neighborhoods: ["Southwest Las Vegas", "Mountains Edge nearby"],
  },
  {
    zip: "89141",
    area: "Southern Highlands",
    region: "southwest",
    neighborhoods: ["Southern Highlands", "Southwest Las Vegas"],
  },
  {
    zip: "89147",
    area: "Southwest Las Vegas",
    region: "southwest",
    neighborhoods: ["Southwest Las Vegas", "Rhodes Ranch area"],
  },
  {
    zip: "89148",
    area: "Southwest Las Vegas",
    region: "southwest",
    neighborhoods: ["Southwest Las Vegas", "Enterprise"],
  },
];

export function isValidZipCode(zip: string): boolean {
  return /^\d{5}$/.test(zip);
}

export function getZipEntry(zip: string): LasVegasZipEntry | undefined {
  return lasVegasZipData.find((entry) => entry.zip === zip);
}

export function buildBuyUrlForZip(zip: string): string {
  return `/buy?zip=${encodeURIComponent(zip)}#imr-search`;
}

export function buildContactUrlForZip(zip: string): string {
  return `/contact?zip=${encodeURIComponent(zip)}`;
}
