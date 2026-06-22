import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Clock } from "lucide-react";
import { agentInfo, officeInfo, primaryNav, siteConfig } from "@/lib/site-config";
import GbpActionLinks from "@/components/shared/GbpActionLinks";

const businessHours = [
  "Mon–Fri: 9:00 AM – 6:00 PM",
  "Sat: 10:00 AM – 4:00 PM",
  "Sun: By appointment",
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
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
              <li>6628 Sky Pointe Dr., Las Vegas NV 89131</li>
              <li>Zip codes: 89131, 89143</li>
              <li>Gated master-planned community</li>
              <li>
                <Link href="/sub-communities" className="hover:text-white">
                  View all sub-communities →
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
                  {businessHours.map((line) => (
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
  );
}
