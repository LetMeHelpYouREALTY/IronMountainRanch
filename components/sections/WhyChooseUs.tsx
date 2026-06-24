import { Shield, TrendingUp, Users, Award, Clock, Home, MapPin } from "lucide-react";
import Link from "next/link";
import { ironMountainRanch } from "@/lib/iron-mountain-ranch";

const features = [
  {
    icon: Shield,
    title: "Gated village expertise",
    description:
      "Iron Mountain Ranch-Village 1-A through 11, Iron Mountain Estates, Bradley Ranch, and Quarterhorse Estate—MLS subdivision by subdivision.",
  },
  {
    icon: MapPin,
    title: "Northwest 89131 & 89143",
    description:
      "Centennial Hills, Aliante, Floyd Lamb Park, and Red Rock Canyon access—with Sheep Range views from many IMR lots.",
  },
  {
    icon: TrendingUp,
    title: "Village-level comps",
    description:
      "Live MLS snapshots by village—not generic valley averages—before you tour or list in Iron Mountain Ranch.",
  },
  {
    icon: Users,
    title: "Buyer & seller representation",
    description:
      "Dr. Jan Duffy negotiates HOA review, gate access, and village-specific pricing for northwest Las Vegas clients.",
  },
  {
    icon: Clock,
    title: "Responsive tours",
    description:
      "Private showings across gated entries with clear communication on LMA fees and village amenities.",
  },
  {
    icon: Home,
    title: "KB master-plan knowledge",
    description: `~${ironMountainRanch.homeCount.toLocaleString()} homes since 2002—parks, ponds, and walking paths maintained through the community LMA.`,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Why Choose Dr. Jan for Iron Mountain Ranch?
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Hyperlocal guidance for gated KB villages in northwest Las Vegas—not generic valley copy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="bg-blue-100 rounded-full p-4 mb-4">
                  <Icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <p className="text-center mt-10">
          <Link
            href="/sub-communities"
            className="font-semibold text-blue-600 hover:underline"
          >
            Explore every Iron Mountain Ranch village →
          </Link>
        </p>
      </div>
    </section>
  );
}
