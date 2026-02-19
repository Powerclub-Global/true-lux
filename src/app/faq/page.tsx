"use client";

import Link from "next/link";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { BRAND } from "@/lib/constants";
import { Button } from "@/components/ui/button";

// ---------------------------------------------------------------------------
// FAQ Data
// ---------------------------------------------------------------------------
interface FaqItem {
  question: string;
  answer: string;
}

interface FaqCategory {
  category: string;
  items: FaqItem[];
}

const FAQ_DATA: FaqCategory[] = [
  {
    category: "Booking",
    items: [
      {
        question: "How do I book a charter?",
        answer:
          "You can book a charter by filling out our online inquiry form, calling us directly at (305) 555-0199, or emailing charter@truelux.com. Our concierge team will respond within 2 hours during business hours to confirm availability and walk you through the process.",
      },
      {
        question: "How far in advance should I book?",
        answer:
          "We recommend booking at least 2-4 weeks in advance for weekday charters and 4-6 weeks for weekends and holidays. Peak season (December through April) books up quickly, so we recommend reserving as early as possible. Last-minute availability is sometimes possible — give us a call to check.",
      },
      {
        question: "What is your cancellation policy?",
        answer:
          "Cancellations made more than 14 days before the charter date receive a full refund minus a $250 administrative fee. Cancellations within 7-14 days receive a 50% refund. Cancellations within 7 days are non-refundable. Weather-related cancellations initiated by the captain are fully refundable or rescheduled at no cost.",
      },
      {
        question: "Is a deposit required to book?",
        answer:
          "Yes. A 50% deposit is required at the time of booking to secure your reservation. The remaining balance is due 7 days before the charter date. For bookings made within 7 days of the charter, the full amount is due at booking.",
      },
    ],
  },
  {
    category: "Charter Day",
    items: [
      {
        question: "What should I bring on the charter?",
        answer:
          "We recommend bringing sunscreen (reef-safe preferred), sunglasses, a hat, a light cover-up, and any personal medications. Towels, ice, water, and basic snorkeling gear are provided. If you plan on swimming, wear your swimsuit. Soft-soled shoes or bare feet are preferred on board — no heels or dark-soled shoes please.",
      },
      {
        question: "Can I bring my own food and drinks?",
        answer:
          "Absolutely! You are welcome to bring your own food and beverages, including alcohol for guests 21 and over. We provide ice, coolers, and a full galley for food preparation. Alternatively, we can arrange a private chef or catering through our add-on services for a truly hands-free experience.",
      },
      {
        question: "What are the itinerary options?",
        answer:
          "Our captain will work with you to create the perfect route based on weather, your interests, and charter duration. Popular stops include the Haulover Sandbar, Star Island, Fisher Island, Stiltsville, Biscayne National Park, and Key Biscayne. Multi-day charters can visit the Florida Keys or even the Bahamas.",
      },
      {
        question: "What happens if the weather is bad?",
        answer:
          "Safety is our top priority. Our captain monitors weather conditions closely and will make the final decision about whether conditions are safe. If the charter must be cancelled due to weather, you will receive a full refund or the option to reschedule at no additional cost. Light rain typically does not affect the charter, and our vessels have covered areas.",
      },
    ],
  },
  {
    category: "Payment & Pricing",
    items: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards (Visa, MasterCard, American Express, Discover), wire transfers, and ACH bank transfers. A 3% processing fee applies to credit card payments over $5,000. Wire transfers have no additional fees.",
      },
      {
        question: "Are gratuities included in the price?",
        answer:
          "Gratuities are not included in the charter price. If you enjoyed your experience, a tip of 15-20% of the charter cost is customary and greatly appreciated by the crew. Gratuities can be given in cash directly to the captain or added to your credit card charge.",
      },
      {
        question: "What is included in the charter price?",
        answer:
          "All charters include the yacht, professional captain and crew, fuel, insurance, ice, water, towels, and basic water toys (snorkeling gear, paddleboards depending on vessel). Add-ons such as private chef, DJ, photographer, jet skis, and custom decorations are available at additional cost.",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function FaqPage() {
  return (
    <div className="min-h-screen">
      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative flex flex-col items-center justify-center px-6 pb-16 pt-32 text-center">
        <div className="mb-6 h-px w-16 bg-gold" />
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-white/50">
          Everything you need to know before stepping aboard. Can&rsquo;t find
          your answer? We&rsquo;re just a call away.
        </p>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* FAQ Accordion                                                    */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-3xl px-6 pb-24">
        {FAQ_DATA.map((category) => (
          <div key={category.category} className="mb-12">
            <h2 className="mb-6 font-heading text-2xl font-bold">
              {category.category}
            </h2>

            <Accordion.Root type="multiple" className="space-y-3">
              {category.items.map((item, index) => (
                <Accordion.Item
                  key={index}
                  value={`${category.category}-${index}`}
                  className="overflow-hidden rounded-lg border border-white/5 bg-[#0A1628] transition-colors data-[state=open]:border-gold/20"
                >
                  <Accordion.Header>
                    <Accordion.Trigger className="group flex w-full items-center justify-between px-6 py-4 text-left text-sm font-medium transition-colors hover:text-gold sm:text-base">
                      <span>{item.question}</span>
                      <ChevronDown className="h-5 w-5 shrink-0 text-white/30 transition-transform duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:text-gold" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <div className="border-t border-white/5 px-6 py-4 text-sm leading-relaxed text-white/50">
                      {item.answer}
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </div>
        ))}
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* CTA                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-t border-white/5 bg-[#0A1628] py-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-heading text-3xl font-bold">
            Still Have Questions?
          </h2>
          <p className="mt-4 text-white/50">
            Our concierge team is standing by to help you plan the perfect
            charter. Reach out anytime.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <a
              href={`tel:${BRAND.phone.replace(/\D/g, "")}`}
              className="flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-gold"
            >
              <Phone className="h-4 w-4" />
              {BRAND.phone}
            </a>
            <a
              href={`mailto:${BRAND.email}`}
              className="flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-gold"
            >
              <Mail className="h-4 w-4" />
              {BRAND.email}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
