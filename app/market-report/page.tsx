import Navbar from "@/components/layouts/Navbar";
import IronMountainPageHero from "@/components/sections/IronMountainPageHero";
import Footer from "@/components/layouts/Footer";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import Link from "next/link";
import { TrendingUp, TrendingDown, Home, DollarSign, BarChart, Phone } from "lucide-react";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import { marketStats } from "@/lib/site-config";
import {
  REGIONAL_MARKET_LAST_UPDATED,
  regionalMarketComparison,
} from "@/lib/lv-regional-market";

export const metadata: Metadata = buildPageMetadata({
  title: "Iron Mountain Ranch Market Report | Las Vegas 89131",
  description: "Iron Mountain Ranch and northwest Las Vegas real estate market data. Median prices, inventory, and expert analysis from Dr. Jan Duffy.",
  path: "/market-report",
});

// Report Schema
const reportSchema = {
  "@context": "https://schema.org",
  "@type": "Report",
  name: `Las Vegas Real Estate Market Report - ${REGIONAL_MARKET_LAST_UPDATED}`,
  author: {
    "@type": "RealEstateAgent",
    name: "Dr. Jan Duffy",
    worksFor: "Berkshire Hathaway HomeServices Nevada Properties",
  },
  datePublished: "2026-06-01",
  about: {
    "@type": "Place",
    name: "Las Vegas, Nevada",
  },
};

export default function MarketReportPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reportSchema) }}
      />
      <Navbar />
      <main>
        <IronMountainPageHero
          path="/market-report"
          title="Iron Mountain Ranch Market Report | Northwest Las Vegas 89131"
          subtitle={`${REGIONAL_MARKET_LAST_UPDATED} | Iron Mountain Ranch village stats plus valley comparison from Berkshire Hathaway HomeServices Nevada Properties`}
        />
        <div className="container mx-auto px-4 py-16">
          {/* Key Stats Overview */}
          <section className="mb-16 bg-slate-900 text-white rounded-2xl p-8 md:p-12 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Las Vegas Market Snapshot | {REGIONAL_MARKET_LAST_UPDATED}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                  {marketStats.lasVegas.medianPriceFormatted}
                </div>
                <div className="text-slate-300 text-sm">Median Home Price</div>
                <div className="flex items-center justify-center mt-1 text-green-400 text-sm">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  {marketStats.lasVegas.yearOverYearChange} YoY
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                  {marketStats.lasVegas.daysOnMarket}
                </div>
                <div className="text-slate-300 text-sm">Days on Market</div>
                <div className="flex items-center justify-center mt-1 text-green-400 text-sm">
                  <TrendingDown className="h-4 w-4 mr-1" />
                  Valley average
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                  {marketStats.lasVegas.activeListings.toLocaleString("en-US")}
                </div>
                <div className="text-slate-300 text-sm">Active Listings</div>
                <div className="flex items-center justify-center mt-1 text-yellow-400 text-sm">
                  +12% YoY
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                  {marketStats.lasVegas.inventoryMonths}
                </div>
                <div className="text-slate-300 text-sm">Months Inventory</div>
                <div className="flex items-center justify-center mt-1 text-slate-400 text-sm">
                  Seller&apos;s Market
                </div>
              </div>
            </div>
          </section>

          {/* Area Breakdown */}
          <section className="mb-16 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              Market Data by Area
            </h2>
            <p className="text-center text-slate-600 mb-8 max-w-3xl mx-auto">
              Iron Mountain Ranch ({marketStats.ironMountainRanch.medianPriceFormatted} median,{" "}
              {marketStats.ironMountainRanch.daysOnMarket} days on market) sits between the broader
              Las Vegas valley and premium Summerlin / Southern Highlands pricing—see{" "}
              <Link href="/sub-communities" className="text-blue-600 font-semibold hover:underline">
                village guides
              </Link>{" "}
              for hyperlocal context.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regionalMarketComparison.map((item) => (
                <div
                  key={item.id}
                  className={`rounded-lg p-6 hover:shadow-lg transition-shadow ${
                    item.highlight
                      ? "bg-blue-50 border-2 border-blue-300"
                      : "bg-white border border-slate-200"
                  }`}
                >
                  <h3 className="font-bold text-lg text-slate-900 mb-1">{item.name}</h3>
                  {item.scopeNote ? (
                    <p className="text-xs text-slate-500 mb-3">{item.scopeNote}</p>
                  ) : null}
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Median Price</span>
                      <span className="font-semibold text-slate-900">{item.medianPriceFormatted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">YoY Change</span>
                      <span className="font-semibold text-green-600">{item.yearOverYearChange}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Days on Market</span>
                      <span className="font-semibold text-slate-900">{item.daysOnMarket} days</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Expert Analysis */}
          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Expert Market Analysis
            </h2>
            <div className="bg-slate-50 rounded-lg p-8">
              <blockquote className="text-lg text-slate-700 italic mb-6">
                "The Las Vegas market remains strong heading into 2026. We're seeing continued
                demand from California relocators and remote workers, but the days of 20 offers on
                every listing are behind us. Buyers finally have some negotiating power, while
                sellers are still achieving solid appreciation. It's a balanced market that rewards
                proper pricing and preparation."
              </blockquote>
              <cite className="text-slate-900 font-semibold">
                — Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties
              </cite>
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center">
                  <Home className="h-5 w-5 text-blue-600 mr-2" />
                  For Buyers
                </h3>
                <ul className="space-y-2 text-slate-600">
                  <li>• More inventory = more choices</li>
                  <li>• Negotiating power is returning</li>
                  <li>• Interest rates stabilizing around 6.5%</li>
                  <li>• New construction offering incentives</li>
                </ul>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center">
                  <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                  For Sellers
                </h3>
                <ul className="space-y-2 text-slate-600">
                  <li>• Still a seller's market (2.1 months inventory)</li>
                  <li>• Proper pricing is crucial</li>
                  <li>• 4.2% appreciation in past year</li>
                  <li>• Well-priced homes sell in under 30 days</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Market Trends */}
          <section className="mb-16 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Key Market Trends to Watch
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">California Migration</h3>
                <p className="text-slate-600 text-sm">
                  Continued influx of California buyers seeking affordability and no state income
                  tax. Summerlin and Henderson remain top destinations.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Home className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">New Construction</h3>
                <p className="text-slate-600 text-sm">
                  Builders offering significant incentives including rate buydowns, closing cost
                  credits, and upgrades. Great time for new home buyers.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <BarChart className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Luxury Strength</h3>
                <p className="text-slate-600 text-sm">
                  The $1M+ segment showing strongest appreciation at 8.5% YoY. The Ridges and
                  Southern Highlands leading the luxury market.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Market Questions We're Hearing
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "Is now a good time to buy in Las Vegas?",
                  a: "Yes. With more inventory, returning negotiating power, and stable interest rates, buyers have more options than they've had in years. Well-priced homes are still moving quickly, but you won't face the bidding wars of 2021-2022.",
                },
                {
                  q: "Should I wait for prices to drop?",
                  a: "Las Vegas prices have historically been resilient. Current appreciation of 4.2% YoY, strong job growth, and continued California migration suggest prices will remain stable or continue gradual increases. Waiting typically costs more than potential savings.",
                },
                {
                  q: "Is this a buyer's or seller's market?",
                  a: "With 2.1 months of inventory, Las Vegas is technically still a seller's market (6 months is balanced). However, buyers have more leverage than they've had since 2019. It's a balanced environment that rewards proper pricing.",
                },
                {
                  q: "What's happening with interest rates?",
                  a: "Rates have stabilized around 6.5% for conventional loans. Many buyers are using builder incentives or rate buydowns to achieve effective rates in the low 5% range. VA and FHA options remain competitive.",
                },
              ].map((faq, index) => (
                <div key={index} className="bg-slate-50 rounded-lg p-6">
                  <h3 className="font-bold text-slate-900 mb-2">{faq.q}</h3>
                  <p className="text-slate-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="text-center bg-blue-600 text-white rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get Personalized Market Insights
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Want to know what these numbers mean for your specific neighborhood or situation? Dr.
              Jan Duffy provides free market consultations.
            </p>
            <a
              href="tel:+17029963758"
              className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-md font-bold text-lg hover:bg-blue-50 transition-colors"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call (702) 996-3758
            </a>
            <p className="mt-4 text-blue-200 text-sm">
              Berkshire Hathaway HomeServices Nevada Properties
            </p>
          </section>
        </div>

        {/* Last Updated */}
        <div className="text-center text-sm text-slate-500 mt-8">
          Last Updated: {REGIONAL_MARKET_LAST_UPDATED}
        </div>
      </main>
      <RealScoutListings />
      <Footer />
    </>
  );
}
