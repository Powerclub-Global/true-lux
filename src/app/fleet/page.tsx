"use client";

import { useState } from "react";
import Link from "next/link";
import { cn, formatCurrency } from "@/lib/utils";
import { yachts } from "@/lib/data/yachts";
import { Anchor, Users, BedDouble, ArrowRight } from "lucide-react";

// ---------------------------------------------------------------------------
// Filter definitions
// ---------------------------------------------------------------------------
const FILTERS = [
  { label: "All", value: "all" },
  { label: "Under 50\u2019", value: "under-50" },
  { label: "50\u201370\u2019", value: "50-70" },
  { label: "70\u2019+", value: "70-plus" },
] as const;

type FilterValue = (typeof FILTERS)[number]["value"];

function filterYachts(filter: FilterValue) {
  switch (filter) {
    case "under-50":
      return yachts.filter((y) => y.length < 50);
    case "50-70":
      return yachts.filter((y) => y.length >= 50 && y.length <= 70);
    case "70-plus":
      return yachts.filter((y) => y.length > 70);
    default:
      return yachts;
  }
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function FleetPage() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const filtered = filterYachts(activeFilter);

  return (
    <div className="min-h-screen">
      {/* ------------------------------------------------------------------ */}
      {/* Hero */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative flex flex-col items-center justify-center px-6 pb-16 pt-32 text-center">
        <div className="mb-6 h-px w-16 bg-gold" />
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Our Fleet
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-white/50">
          A curated selection of Miami&rsquo;s finest luxury yachts, each
          meticulously maintained and crewed by experienced professionals.
        </p>

        {/* Filter Pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={cn(
                "rounded-full border px-5 py-2 text-sm font-medium tracking-wide transition-all duration-300",
                activeFilter === f.value
                  ? "border-gold bg-gold text-[#030712]"
                  : "border-white/10 bg-transparent text-white/50 hover:border-gold/40 hover:text-gold"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Yacht Grid */}
      {/* ------------------------------------------------------------------ */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        {filtered.length === 0 ? (
          <p className="py-20 text-center text-white/40">
            No yachts match this filter. Try a different size range.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2">
            {filtered.map((yacht) => (
              <Link
                key={yacht.id}
                href={`/fleet/${yacht.slug}`}
                className="group overflow-hidden rounded-lg border border-white/5 bg-[#0A1628] transition-all duration-300 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5"
              >
                {/* Image Placeholder */}
                <div className="relative aspect-[16/10] w-full bg-gray-800/60">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Anchor className="h-12 w-12 text-white/10" />
                  </div>
                  {/* Price Badge */}
                  <div className="absolute bottom-4 right-4 rounded-sm bg-[#030712]/80 px-3 py-1.5 text-sm font-semibold text-gold backdrop-blur-sm">
                    From {formatCurrency(yacht.pricing.halfDay)}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <p className="text-xs font-medium uppercase tracking-widest text-gold">
                    {yacht.builder} &middot; {yacht.year}
                  </p>
                  <h2 className="mt-2 font-heading text-2xl font-bold">
                    {yacht.name}
                  </h2>
                  <p className="mt-1 text-sm text-white/40">{yacht.tagline}</p>

                  {/* Specs */}
                  <div className="mt-5 flex items-center gap-6 border-t border-white/5 pt-5 text-sm text-white/50">
                    <span className="flex items-center gap-1.5">
                      <Anchor className="h-4 w-4 text-gold" />
                      {yacht.length}&prime;
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="h-4 w-4 text-gold" />
                      {yacht.capacity} guests
                    </span>
                    <span className="flex items-center gap-1.5">
                      <BedDouble className="h-4 w-4 text-gold" />
                      {yacht.cabins} cabins
                    </span>
                  </div>

                  {/* Pricing */}
                  <div className="mt-5 text-sm text-white/50">
                    <span className="font-semibold text-white">
                      {formatCurrency(yacht.pricing.halfDay)}
                    </span>{" "}
                    / half day &nbsp;&middot;&nbsp;{" "}
                    <span className="font-semibold text-white">
                      {formatCurrency(yacht.pricing.fullDay)}
                    </span>{" "}
                    / full day
                  </div>

                  {/* CTA */}
                  <div className="mt-5 flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-gold transition-colors group-hover:text-[#D4B48A]">
                    View Details
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
