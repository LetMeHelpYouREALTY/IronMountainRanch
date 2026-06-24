"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface FAQ {
  question: string;
  answer: string;
}

// Default FAQs for the section
export const defaultFaqs: FAQ[] = [
  {
    question: "What Iron Mountain Ranch villages do you cover?",
    answer:
      "Dr. Jan covers every gated MLS subdivision inside Iron Mountain Ranch—Village 1-A through Village 11 (including Wolf Creek, Meadow Ridge, and Classics marketing names), Iron Mountain Estates, Bradley Ranch, and Quarterhorse Estate in 89131 and 89143.",
  },
  {
    question: "How long does buying in Iron Mountain Ranch take?",
    answer:
      "Typically 30–45 days from accepted offer to closing for financed buyers in northwest Las Vegas. Village HOA document review and gate access coordination are part of Dr. Jan's buyer representation.",
  },
  {
    question: "Do you provide Iron Mountain Ranch home valuations?",
    answer:
      "Yes—free village-level CMAs using closed MLS comps for your exact subdivision, not generic 89131 averages. Request a valuation on the Sell page or call (702) 996-3758.",
  },
  {
    question: "What makes Dr. Jan different for Iron Mountain Ranch?",
    answer:
      "Hyperlocal MLS filtering by village, LMA/HOA fee verification before tours, and northwest Las Vegas comparison data (Centennial Hills, Summerlin, Skye Canyon) from Berkshire Hathaway HomeServices Nevada Properties.",
  },
  {
    question: "Can you help with Iron Mountain Estates in 89143?",
    answer:
      "Yes. Iron Mountain Estates and larger estate parcels trade above typical village medians—often $700,000–$1.2M+ in current marketing. Dr. Jan tracks estate-section inventory separately from Village 4 entry pricing.",
  },
  {
    question: "What are your fees for Iron Mountain Ranch buyers and sellers?",
    answer:
      "Buyer representation is typically paid from listing-side commission at closing. Sellers receive a competitive listing package with village-specific pricing strategy. Call (702) 996-3758 for details.",
  },
];

interface FAQSectionProps {
  /** Custom FAQs to display (defaults to defaultFaqs) */
  faqs?: FAQ[];
  /** Custom title for the section */
  title?: string;
  /** Custom subtitle for the section */
  subtitle?: string;
  /** Whether to include JSON-LD schema (handled separately by FAQSchema component) */
  className?: string;
}

export default function FAQSection({
  faqs = defaultFaqs,
  title = "Frequently Asked Questions",
  subtitle = "Get answers to common questions about our real estate services",
  className = "",
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={`py-16 md:py-24 bg-white ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-slate-200 rounded-lg mb-4 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-slate-50 transition-colors"
              >
                <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-blue-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-slate-400 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
                  <p className="text-slate-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Helper to generate FAQ schema data from FAQ array
 * Use with FAQSchema component: <FAQSchema faqs={getFAQSchemaData(faqs)} />
 */
export function getFAQSchemaData(faqs: FAQ[]) {
  return faqs.map((faq) => ({
    question: faq.question,
    answer: faq.answer,
  }));
}
