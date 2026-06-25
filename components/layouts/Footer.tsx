import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Clock } from "lucide-react";
import { agentInfo, officeInfo, primaryNav, siteConfig } from "@/lib/site-config";
import { businessHoursDisplay } from "@/lib/google-business-profile";
import GbpActionLinks from "@/components/shared/GbpActionLinks";
import CalendlyInlineSection from "@/components/calendly/CalendlyInlineSection";
import SiteOfficeMapSection from "@/components/sections/SiteOfficeMapSection";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <CalendlyInlineSection
        utm={{
          utmSource: "ironmountainranchlasvegas.com",
          utmMedium: "website",
          utmCampaign: "imr-footer",
          utmContent: "site-footer",
        }}
        variant="dark"
      />
      <SiteOfficeMapSection />
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <h3 className="font-bold text-xl mb-4">{siteConfig.name}</h3>
            <p className="text-slate-300 mb-4 text-sm">{siteConfig.description}</p>
            <GbpActionLinks className="mb-6" layout="stack" />
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/drjanduffy" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/drjanduffy" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/in/drjanduffy" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Site Map</h3>
            <ul className="space-y-2">
              {primaryNav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-300 hover:text-white text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Iron Mountain Ranch</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link href="/neighborhoods/iron-mountain-ranch" className="hover:text-white font-medium">
                  Iron Mountain Ranch homes for sale
                </Link>
              </li>
              <li>
                <Link href="/buy" className="hover:text-white">
                  Iron Mountain Ranch houses for sale
                </Link>
              </li>
              <li>
                <Link href="/89131-homes-for-sale" className="hover:text-white">
                  89131 homes for sale
                </Link>
              </li>
              <li>
                <Link href="/89143-homes-for-sale" className="hover:text-white">
                  89143 homes for sale
                </Link>
              </li>
              <li>
                <Link href="/iron-mountain-ranch-hoa" className="hover:text-white">
                  HOA &amp; LMA guide
                </Link>
              </li>
              <li>
                <Link href="/iron-mountain-ranch-schools" className="hover:text-white">
                  Schools near IMR
                </Link>
              </li>
              <li>
                <Link href="/sub-communities/iron-mountain-estates" className="hover:text-white">
                  Iron Mountain Estates
                </Link>
              </li>
              <li>Office: {officeInfo.address.full}</li>
              <li>{officeInfo.areaLabel}</li>
              <li>Community zips: 89131 &amp; 89143</li>
              <li>Gated master-planned community</li>
              <li>
                <Link href="/sub-communities" className="hover:text-white">
                  View all sub-communities →
                </Link>
              </li>
              <li>
                <Link href="/google-business" className="hover:text-white">
                  Google Business Profile
                </Link>
              </li>
              <li>
                <Link href="/las-vegas-zip-code-map" className="hover:text-white">
                  Las Vegas zip code map
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact {agentInfo.name}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm">{officeInfo.address.full}</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-blue-400 flex-shrink-0" />
                <Link href={agentInfo.phoneTel} className="text-slate-300 hover:text-white text-sm">
                  {agentInfo.phoneFormatted}
                </Link>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-blue-400 flex-shrink-0" />
                <Link href={`mailto:${agentInfo.email}`} className="text-slate-300 hover:text-white text-sm break-all">
                  {agentInfo.email}
                </Link>
              </li>
              <li className="flex items-start">
                <Clock className="h-5 w-5 mr-3 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm">
                  {businessHoursDisplay.map((line) => (
                    <span key={line} className="block">{line}</span>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center">
          <p className="text-slate-400 text-sm">
            © {currentYear} {siteConfig.name}. {agentInfo.brokerage}. License {agentInfo.license}.
          </p>
          <Link href="/sitemap.xml" className="text-slate-500 text-xs mt-2 inline-block hover:text-white">
            Sitemap
          </Link>
        </div>
      </div>
    </footer>
    </>
  );
}
