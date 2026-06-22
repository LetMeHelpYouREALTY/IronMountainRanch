/**
 * Iron Mountain Ranch — site identity, NAP, and primary navigation.
 * NAP must match Google Business Profile exactly.
 */

import { getSiteUrl } from "./site-url";

export const siteConfig = {
  name: "Iron Mountain Ranch | Homes by Dr. Jan Duffy",
  shortSiteName: "Iron Mountain Ranch",
  fullName: "Iron Mountain Ranch | Homes by Dr. Jan Duffy",
  tagline: "Gated Northwest Las Vegas Real Estate",
  brandLine:
    "Iron Mountain Ranch | Homes by Dr. Jan Duffy | Berkshire Hathaway HomeServices Nevada Properties",
  brandName: "Berkshire Hathaway HomeServices",
  shortName: "BHHS",
  get url() {
    return getSiteUrl();
  },
  description:
    "Iron Mountain Ranch homes for sale in northwest Las Vegas (89131). Gated community homes with expert buyer and seller representation from Dr. Jan Duffy at Berkshire Hathaway HomeServices Nevada Properties.",
  primaryCommunity: "Iron Mountain Ranch",
  primaryZip: "89131",
};

export const agentInfo = {
  name: "Dr. Jan Duffy",
  title: "REALTOR®",
  license: "S.0197614.LLC",
  phone: "(702) 500-1942",
  phoneFormatted: "(702) 500-1942",
  phoneTel: "tel:+17025001942",
  email: "DrDuffy@IronMountainRanchLasVegas.com",
  brokerage: "Berkshire Hathaway HomeServices Nevada Properties",
};

export const officeInfo = {
  name: "Iron Mountain Ranch | Homes by Dr. Jan Duffy",
  address: {
    street: "6628 Sky Pointe Dr.",
    city: "Las Vegas",
    state: "NV",
    zip: "89131",
    full: "6628 Sky Pointe Dr., Las Vegas, NV 89131",
  },
  coordinates: {
    lat: 36.2905,
    lng: -115.2658,
  },
  phone: "(702) 500-1942",
  phoneTel: "tel:+17025001942",
};

/** Primary site navigation — URL architecture for Google + users */
export const primaryNav = [
  { href: "/", label: "Home" },
  { href: "/buy", label: "Buy" },
  { href: "/sell", label: "Sell" },
  { href: "/sub-communities", label: "Sub-Communities" },
  { href: "/market-report", label: "Market Report" },
  { href: "/contact", label: "Contact" },
] as const;

// Market Statistics (Updated January 2026)
export const marketStats = {