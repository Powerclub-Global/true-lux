"use client";

import Link from "next/link";
import * as Tabs from "@radix-ui/react-tabs";
import {
  Anchor,
  Users,
  BedDouble,
  UserCheck,
  Gauge,
  Check,
  Phone,
  ArrowLeft,
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { BRAND } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import type { Yacht } from "@/lib/types";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
interface Props {
  yacht: Yacht;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function YachtDetailClient({ yacht }: Props) {
  return (
    <div className="min-h-screen">
      {/* ---------------------------------------------------------------- */}
      {/* Hero Image Section                                               */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative flex h-[50vh] min-h-[380px] items-end bg-gray-800/60">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/40 to-transparent" />

        {/* Back link */}
        <Link
          href="/fleet"
          className="absolute left-6 top-8 z-10 flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-gold"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Fleet
        </Link>

        {/* Title block */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-10">
          <div className="inline-block rounded-sm bg-gold/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold backdrop-blur-sm">
            {yacht.builder} &middot; {yacht.year}
          </div>
          <h1 className="mt-3 font-heading text-4xl font-bold sm:text-5xl">
            {yacht.name}
          </h1>
          <p className="mt-2 text-lg text-white/50">{yacht.tagline}</p>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Specs Strip                                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-b border-white/5 bg-[#0A1628]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 px-6 py-6 text-sm sm:justify-start md:gap-12">
          <SpecBadge
            icon={<Anchor className="h-5 w-5" />}
            label="Length"
            value={`${yacht.length}\u2032`}
          />
          <SpecBadge
            icon={<Users className="h-5 w-5" />}
            label="Capacity"
            value={`${yacht.capacity} Guests`}
          />
          <SpecBadge
            icon={<BedDouble className="h-5 w-5" />}
            label="Cabins"
            value={String(yacht.cabins)}
          />
          <SpecBadge
            icon={<UserCheck className="h-5 w-5" />}
            label="Crew"
            value={String(yacht.crew)}
          />
          <SpecBadge
            icon={<Gauge className="h-5 w-5" />}
            label="Speed"
            value={yacht.specs.speed}
          />
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Main Content + Sticky Sidebar                                    */}
      {/* ---------------------------------------------------------------- */}
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1fr_360px]">
        {/* ============================================================= */}
        {/* Tabbed Content                                                 */}
        {/* ============================================================= */}
        <Tabs.Root defaultValue="overview" className="min-w-0">
          <Tabs.List className="flex gap-1 overflow-x-auto border-b border-white/10">
            {(["overview", "amenities", "specs", "pricing"] as const).map(
              (tab) => (
                <Tabs.Trigger
                  key={tab}
                  value={tab}
                  className={cn(
                    "whitespace-nowrap border-b-2 border-transparent px-5 py-3 text-sm font-medium uppercase tracking-wide text-white/40 transition-colors",
                    "hover:text-white",
                    "data-[state=active]:border-gold data-[state=active]:text-gold"
                  )}
                >
                  {tab}
                </Tabs.Trigger>
              )
            )}
          </Tabs.List>

          {/* ---- Overview Tab ---- */}
          <Tabs.Content value="overview" className="pt-8 focus:outline-none">
            <h2 className="font-heading text-2xl font-bold">Overview</h2>
            <p className="mt-4 leading-relaxed text-white/60">
              {yacht.description}
            </p>

            <h3 className="mt-10 text-lg font-semibold">
              What&rsquo;s Included
            </h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {yacht.includes.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-white/60"
                >
                  <Check className="h-4 w-4 shrink-0 text-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </Tabs.Content>

          {/* ---- Amenities Tab ---- */}
          <Tabs.Content value="amenities" className="pt-8 focus:outline-none">
            <h2 className="font-heading text-2xl font-bold">Amenities</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {yacht.amenities.map((amenity) => (
                <div
                  key={amenity}
                  className="flex items-start gap-3 rounded-lg border border-white/5 bg-[#0A1628] p-4"
                >
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <span className="text-sm">{amenity}</span>
                </div>
              ))}
            </div>
          </Tabs.Content>

          {/* ---- Specs Tab ---- */}
          <Tabs.Content value="specs" className="pt-8 focus:outline-none">
            <h2 className="font-heading text-2xl font-bold">
              Technical Specifications
            </h2>
            <div className="mt-6 overflow-hidden rounded-lg border border-white/5">
              <table className="w-full text-sm">
                <tbody>
                  {(
                    [
                      ["Length", yacht.specs.length],
                      ["Beam", yacht.specs.beam],
                      ["Draft", yacht.specs.draft],
                      ["Max Speed", yacht.specs.speed],
                      ["Fuel Capacity", yacht.specs.fuelCapacity],
                      ["Water Capacity", yacht.specs.waterCapacity],
                      ["Builder", yacht.builder],
                      ["Year", String(yacht.year)],
                      ["Guest Capacity", `${yacht.capacity} guests`],
                      ["Cabins", String(yacht.cabins)],
                      ["Crew", String(yacht.crew)],
                    ] as const
                  ).map(([label, value], i) => (
                    <tr
                      key={label}
                      className={cn(
                        "border-b border-white/5 last:border-0",
                        i % 2 === 0 ? "bg-[#0A1628]" : "bg-[#030712]"
                      )}
                    >
                      <td className="px-5 py-3 font-medium text-white/50">
                        {label}
                      </td>
                      <td className="px-5 py-3 text-right">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Tabs.Content>

          {/* ---- Pricing Tab ---- */}
          <Tabs.Content value="pricing" className="pt-8 focus:outline-none">
            <h2 className="font-heading text-2xl font-bold">
              Charter Pricing
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <PriceCard
                title="Half Day"
                subtitle="4 hours"
                price={yacht.pricing.halfDay}
              />
              <PriceCard
                title="Full Day"
                subtitle="8 hours"
                price={yacht.pricing.fullDay}
              />
              {yacht.pricing.multiDayPerDay && (
                <PriceCard
                  title="Multi-Day"
                  subtitle="per day"
                  price={yacht.pricing.multiDayPerDay}
                />
              )}
            </div>

            <h3 className="mt-10 text-lg font-semibold">
              What&rsquo;s Included
            </h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {yacht.includes.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-white/60"
                >
                  <Check className="h-4 w-4 shrink-0 text-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </Tabs.Content>
        </Tabs.Root>

        {/* ============================================================= */}
        {/* Sticky Sidebar CTA                                             */}
        {/* ============================================================= */}
        <aside className="order-first lg:order-last">
          <div className="sticky top-24 rounded-lg border border-white/5 bg-[#0A1628] p-6">
            <p className="text-xs font-medium uppercase tracking-widest text-gold">
              Book This Yacht
            </p>
            <h3 className="mt-2 font-heading text-2xl font-bold">
              {yacht.name}
            </h3>

            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-3xl font-bold text-gold">
                {formatCurrency(yacht.pricing.halfDay)}
              </span>
              <span className="text-sm text-white/40">/ half day</span>
            </div>

            <Button asChild size="lg" className="mt-6 w-full">
              <Link href={`/contact?yacht=${yacht.slug}`}>
                Check Availability
              </Link>
            </Button>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-white/50">
              <Phone className="h-4 w-4 text-gold" />
              <a
                href={`tel:${BRAND.phone.replace(/\D/g, "")}`}
                className="transition-colors hover:text-gold"
              >
                {BRAND.phone}
              </a>
            </div>

            <p className="mt-4 text-center text-xs text-white/30">
              No commitment required. Our team will respond within 2 hours.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------
function SpecBadge({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-gold">{icon}</span>
      <div>
        <p className="text-xs uppercase tracking-wide text-white/40">
          {label}
        </p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}

function PriceCard({
  title,
  subtitle,
  price,
}: {
  title: string;
  subtitle: string;
  price: number;
}) {
  return (
    <div className="rounded-lg border border-white/5 bg-[#030712] p-5 text-center">
      <p className="text-sm font-medium uppercase tracking-wide text-white/40">
        {title}
      </p>
      <p className="mt-2 text-3xl font-bold">{formatCurrency(price)}</p>
      <p className="mt-1 text-xs text-white/40">{subtitle}</p>
    </div>
  );
}
