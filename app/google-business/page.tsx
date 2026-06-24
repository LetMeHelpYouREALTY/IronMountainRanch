import Navbar from "@/components/layouts/Navbar";
import IronMountainPageHero from "@/components/sections/IronMountainPageHero";
import Footer from "@/components/layouts/Footer";
import GBPMapCard from "@/components/shared/GBPMapCard";
import GbpActionLinks from "@/components/shared/GbpActionLinks";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Star,
  CheckCircle,
  MessageSquare,
  Home,
} from "lucide-react";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import { googleBusinessProfile } from "@/lib/google-business-profile";
import {
  getGbpBrowseReviewsUrl,
  getGbpWriteReviewUrl,
  getVisibleGbpAggregateRating,
} from "@/lib/gbp-public";
import {
  businessInfo,
  gbpDescription,
  gbpFAQs,
  generateLocalBusinessSchema,
  generateFAQSchema,
} from "@/lib/gbp-schema";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildPageMetadata({
  title: `${siteConfig.name} | Northwest Las Vegas Real Estate`,
  description: `${siteConfig.name} at ${googleBusinessProfile.address.full}. Iron Mountain Ranch buyer and seller representation. Call ${googleBusinessProfile.phone}.`,
  path: "/google-business",
  keywords: [
    "Iron Mountain Ranch real estate",
    "Iron Mountain Ranch homes for sale",
    "89131 realtor",
    "northwest Las Vegas gated community",
    "Dr. Jan Duffy Iron Mountain Ranch",
  ],
});

export default function GoogleBusinessPage() {
  const localBusinessSchema = generateLocalBusinessSchema();
  const faqSchema = generateFAQSchema();
  const aggregateRating = getVisibleGbpAggregateRating();
  const browseReviewsUrl = getGbpBrowseReviewsUrl();
  const writeReviewUrl = getGbpWriteReviewUrl();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <main>
        <IronMountainPageHero
          path="/google-business"
          title={siteConfig.name}
          subtitle={`${googleBusinessProfile.agentName}, ${googleBusinessProfile.primaryCategory} · License ${businessInfo.license}`}
        >
          <GbpActionLinks />
        </IronMountainPageHero>

        <div className="container mx-auto px-4 py-16">
          <section className="max-w-5xl mx-auto mb-16">
            <div className="bg-slate-50 rounded-2xl p-8 md:p-10 border border-slate-200">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                {siteConfig.name}
              </h1>
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-slate-900">{businessInfo.address.streetAddress}</p>
                      <p className="text-slate-700">
                        {businessInfo.address.addressLocality}, {businessInfo.address.addressRegion}{" "}
                        {businessInfo.address.postalCode}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <a href={`tel:${businessInfo.phone.tel}`} className="font-medium text-blue-600 hover:text-blue-700">
                      {businessInfo.phone.display}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <a href={`mailto:${businessInfo.email}`} className="text-blue-600 hover:text-blue-700">
                      {businessInfo.email}
                    </a>
                  </div>
                  <p className="text-sm text-slate-600 pt-2">
                    Primary category: <strong>{businessInfo.categories.primary}</strong>
                    <br />
                    Website (GBP):{" "}
                    <a href={googleBusinessProfile.websiteUrl} className="text-blue-600 hover:text-blue-700">
                      {googleBusinessProfile.websiteUrl}
                    </a>
                  </p>
                </div>

                {aggregateRating ? (
                  <div className="text-center bg-white rounded-xl p-8 border border-slate-200">
                    <div className="flex justify-center mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-8 w-8 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-3xl font-bold text-slate-900 mb-2">
                      {aggregateRating.ratingValue} / 5.0
                    </p>
                    <p className="text-slate-600 mb-2">{aggregateRating.reviewCount} Google reviews</p>
                  </div>
                ) : (
                  <div className="text-center bg-white rounded-xl p-8 border border-slate-200">
                    <Star className="h-10 w-10 text-amber-400 mx-auto mb-3" />
                    <p className="text-slate-700 font-medium mb-2">Google reviews</p>
                    <p className="text-sm text-slate-500">
                      Review stars appear here after GBP verification and env ratings are set.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="max-w-5xl mx-auto mb-16">
            <GBPMapCard title={`${siteConfig.name} office map`} />
          </section>

          <section className="max-w-5xl mx-auto mb-16">
            <div className="bg-slate-50 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-bold text-slate-900">Business Hours</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                {businessInfo.hours.map((line) => (
                  <div key={line.day}>
                    <span className="font-medium">{line.day}:</span> {line.hours}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">About This Office</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Who we are</h3>
                <p className="text-slate-700 leading-relaxed">{gbpDescription.whoWeAre}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Home className="h-5 w-5 text-blue-600" />
                  Services
                </h3>
                <p className="text-slate-700 leading-relaxed">{gbpDescription.whatWeDo}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  Service area
                </h3>
                <p className="text-slate-700 leading-relaxed">{gbpDescription.whereWeServe}</p>
              </div>
            </div>
          </section>

          <section className="max-w-5xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Services</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {businessInfo.services.map((service) => (
                <div key={service.name} className="bg-white border border-slate-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-slate-900">{service.name}</h3>
                      <p className="text-sm text-slate-600">{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="max-w-5xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Service Areas</h2>
            <div className="flex flex-wrap gap-2 justify-center">
              {businessInfo.serviceAreas.map((area) => (
                <span
                  key={area}
                  className="bg-blue-50 text-slate-800 px-3 py-1 rounded-full text-sm border border-blue-100"
                >
                  {area}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Link href="/sub-communities" className="text-blue-600 hover:text-blue-800 font-medium">
                Iron Mountain Ranch villages →
              </Link>
              <Link href="/buy" className="text-blue-600 hover:text-blue-800 font-medium">
                Search IMR listings →
              </Link>
              <Link href="/sell" className="text-blue-600 hover:text-blue-800 font-medium">
                Sell in IMR →
              </Link>
            </div>
          </section>

          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {gbpFAQs.map((faq) => (
                <div key={faq.question} className="bg-white border border-slate-200 rounded-lg p-6">
                  <h3 className="font-bold text-slate-900 mb-3 flex items-start gap-2">
                    <MessageSquare className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    {faq.question}
                  </h3>
                  <p className="text-slate-600 ml-7">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {(browseReviewsUrl || writeReviewUrl) && (
            <section className="max-w-4xl mx-auto mb-16">
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-8 text-center">
                <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Google Reviews</h2>
                <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                  Reviews on the Iron Mountain Ranch Google Business Profile help neighbors find this office.
                  Mention your village and transaction type when you share feedback.
                </p>
                <GbpActionLinks layout="row" className="justify-center" />
              </div>
            </section>
          )}

          <section className="max-w-4xl mx-auto">
            <div className="bg-slate-900 text-white rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Iron Mountain Ranch Real Estate Help</h2>
              <p className="text-xl text-slate-300 mb-8">
                Call, book a consultation, or search current MLS listings for gated northwest Las Vegas villages.
              </p>
              <GbpActionLinks layout="row" className="justify-center" />
            </div>
          </section>
        </div>
        <p className="text-center text-sm text-slate-500 pb-8">
          Last updated: {new Date().toLocaleString("en-US", { month: "long", year: "numeric" })}
        </p>
      </main>
      <Footer />
    </>
  );
}
