import Navbar from "@/components/layouts/Navbar";
import IronMountainPageHero from "@/components/sections/IronMountainPageHero";
import Footer from "@/components/layouts/Footer";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import { Phone, Mail, MapPin, Clock, Calendar, CheckCircle, Star, Users, Shield } from "lucide-react";
import CalendlyWidget from "@/components/calendly/CalendlyWidget";
import Link from "next/link";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import { agentInfo, officeInfo, siteConfig } from "@/lib/site-config";
import GBPMapCard from "@/components/shared/GBPMapCard";
import { businessHoursLines } from "@/lib/google-business-profile";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Dr. Jan Duffy | Iron Mountain Ranch Las Vegas",
  description: "Contact Dr. Jan Duffy for Iron Mountain Ranch real estate. 6628 Sky Pointe Dr., Las Vegas NV 89131. Call (702) 996-3758 or email DrDuffy@IronMountainRanchLasVegas.com.",
  path: "/contact",
});

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  mainEntity: {
    "@type": "RealEstateAgent",
    name: siteConfig.name,
    telephone: "+17029963758",
    email: "DrDuffy@IronMountainRanchLasVegas.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "6628 Sky Pointe Dr.",
      addressLocality: "Las Vegas",
      addressRegion: "NV",
      postalCode: "89131",
      addressCountry: "US",
    },
  },
};

export default function ContactPage() {

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <Navbar />
      <main>
        <IronMountainPageHero
          path="/contact"
          title={`Contact ${agentInfo.name}`}
          subtitle={`Questions about Iron Mountain Ranch real estate? Reach ${siteConfig.name} at ${officeInfo.address.full}.`}
        />
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info & Map */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Get In Touch</h2>
              <p className="text-slate-700 mb-8">
                Whether you're buying your first home, selling a luxury property, or exploring
                investment opportunities, I'm here to provide expert guidance backed by the trusted{" "}
                <strong>Berkshire Hathaway HomeServices</strong> brand. Serving Las Vegas since 2008 
                with $127M+ in closed transactions.
              </p>

              {/* NAP Information */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start bg-slate-50 rounded-lg p-4">
                  <Phone className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Phone (Call or Text)</h3>
                    <a
                      href={agentInfo.phoneTel}
                      className="text-2xl font-bold text-blue-600 hover:text-blue-700"
                    >
                      {agentInfo.phoneFormatted}
                    </a>
                    <p className="text-sm text-slate-500 mt-1">
                      Available 7 days a week, 9am-6pm
                    </p>
                  </div>
                </div>

                <div className="flex items-start bg-slate-50 rounded-lg p-4">
                  <Mail className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
                    <a
                      href={`mailto:${agentInfo.email}`}
                      className="text-blue-600 hover:text-blue-700 font-medium break-all"
                    >
                      {agentInfo.email}
                    </a>
                    <p className="text-sm text-slate-500 mt-1">
                      Typically respond within 2 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start bg-slate-50 rounded-lg p-4">
                  <MapPin className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Office Address</h3>
                    <address className="not-italic text-slate-700">
                      {agentInfo.brokerage}
                      <br />
                      {officeInfo.address.street}
                      <br />
                      {officeInfo.address.city}, {officeInfo.address.state} {officeInfo.address.zip}
                    </address>
                  </div>
                </div>

                <div className="flex items-start bg-slate-50 rounded-lg p-4">
                  <Clock className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Office Hours</h3>
                    <div className="text-slate-700">
                      {businessHoursLines.map((line) => (
                        <p key={line.day}>
                          {line.day}: {line.hours}
                        </p>
                      ))}
                    </div>
                    <p className="text-sm text-slate-500 mt-1">
                      Available by appointment outside these hours
                    </p>
                  </div>
                </div>
              </div>

              <GBPMapCard className="mb-8" title={`${siteConfig.name} — office location`} height={300} />

              {/* Credentials */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-slate-700">
                  <strong>Dr. Jan Duffy, REALTOR®</strong><br />
                  License S.0197614.LLC<br />
                  Berkshire Hathaway HomeServices Nevada Properties
                </p>
              </div>
            </div>

            {/* Schedule Appointment - Calendly Widget */}
            <div>
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="bg-blue-600 text-white p-6 text-center">
                  <Calendar className="h-10 w-10 mx-auto mb-3" />
                  <h2 className="text-2xl font-bold mb-2">Schedule an Appointment</h2>
                  <p className="text-blue-100">
                    Book a time that works for you—phone consultation, property showing, 
                    or in-person meeting at our office.
                  </p>
                </div>
                <CalendlyWidget
                  height="600px"
                  utm={{
                    utmSource: "ironmountainranchlasvegas.com",
                    utmMedium: "website",
                    utmCampaign: "imr-contact",
                    utmContent: "contact-page",
                  }}
                />
              </div>

              {/* Why Contact BHHS */}
              <div className="mt-6 bg-slate-900 text-white rounded-xl p-6">
                <h3 className="font-bold text-lg mb-4">Why Contact Berkshire Hathaway HomeServices?</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Shield className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-slate-300 text-sm">
                      <strong className="text-white">Trusted Brand:</strong> The only real estate brand backed by Warren Buffett's Berkshire Hathaway Inc.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <Star className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-slate-300 text-sm">
                      <strong className="text-white">Proven Results:</strong> $127M+ in closed transactions serving Las Vegas since 2008.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <Users className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-slate-300 text-sm">
                      <strong className="text-white">Global Network:</strong> 50,000+ agents worldwide for seamless relocations and referrals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Areas Section */}
          <section className="max-w-5xl mx-auto mt-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
              Areas We Serve
            </h2>
            <p className="text-slate-600 text-center max-w-3xl mx-auto mb-8">
              Dr. Jan Duffy provides expert real estate services throughout the Las Vegas Valley. 
              Whether you're buying, selling, or investing in any of these communities, contact us 
              for personalized guidance backed by Berkshire Hathaway HomeServices.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Las Vegas",
                "Henderson",
                "Summerlin",
                "Green Valley",
                "North Las Vegas",
                "Southern Highlands",
                "Skye Canyon",
                "Centennial Hills",
                "The Ridges",
                "Inspirada",
                "Mountains Edge",
                "Spring Valley",
              ].map((area) => (
                <div key={area} className="bg-slate-50 rounded-lg p-3 text-center hover:bg-blue-50 transition-colors">
                  <span className="text-slate-700 font-medium text-sm">{area}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Contact Options */}
          <section className="max-w-4xl mx-auto mt-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
              Prefer to Reach Out Directly?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <a
                href="tel:+17029963758"
                className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-xl transition-colors"
              >
                <Phone className="h-8 w-8 mr-4" />
                <div className="text-left">
                  <div className="font-bold text-lg">Call Now</div>
                  <div className="text-blue-100">(702) 996-3758</div>
                </div>
              </a>
              <a
                href={`mailto:${agentInfo.email}`}
                className="flex items-center justify-center bg-slate-700 hover:bg-slate-800 text-white p-6 rounded-xl transition-colors"
              >
                <Mail className="h-8 w-8 mr-4" />
                <div className="text-left">
                  <div className="font-bold text-lg">Send Email</div>
                  <div className="text-slate-300">{agentInfo.email}</div>
                </div>
              </a>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="max-w-4xl mx-auto mt-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "What should I expect during my first consultation?",
                  a: "Your consultation is a no-pressure conversation about your real estate goals. We'll discuss your timeline, budget, preferences, and answer any questions you have about the Las Vegas market. Whether you're buying, selling, or exploring options, I'll provide honest guidance tailored to your situation.",
                },
                {
                  q: "Do I need to be pre-approved before scheduling a showing?",
                  a: "For buyers, having a pre-approval letter strengthens your position, but it's not required for an initial consultation. I can connect you with trusted local lenders during our first meeting if you haven't started the financing process yet.",
                },
                {
                  q: "How quickly can you respond to inquiries?",
                  a: "I typically respond to calls, texts, and emails within 2 hours during business hours (9am-6pm daily). For urgent matters, calling or texting (702) 996-3758 is the fastest way to reach me.",
                },
                {
                  q: "Do you charge for consultations?",
                  a: "No. Initial consultations are always free and without obligation. Whether you're ready to move forward or just exploring your options, there's never any pressure.",
                },
              ].map((faq, index) => (
                <div key={index} className="bg-slate-50 rounded-lg p-6">
                  <h3 className="font-bold text-slate-900 mb-2">{faq.q}</h3>
                  <p className="text-slate-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Last Updated */}
        <div className="text-center text-sm text-slate-500 mt-8">Last Updated: January 2026</div>
      </main>
      <RealScoutListings />
      <Footer />
    </>
  );
}
