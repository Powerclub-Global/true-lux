import Link from "next/link";
import type { Metadata } from "next";
import {
  Shield,
  Award,
  Heart,
  Anchor,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";
import { BRAND } from "@/lib/constants";
import { Button } from "@/components/ui/button";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: `About — ${BRAND.name}`,
  description:
    "Learn about True Lux, Miami's premier luxury yacht charter company. Our story, values, and the team that makes every voyage unforgettable.",
};

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const VALUES = [
  {
    icon: Shield,
    title: "Safety First",
    description:
      "Every vessel is USCG inspected. Our captains carry 100-ton Master licenses with thousands of logged hours. Safety is never an afterthought — it is our foundation.",
  },
  {
    icon: Award,
    title: "Uncompromising Quality",
    description:
      "From the teak decking to the crystal glassware, we obsess over details. Our fleet is maintained to the highest standards, ensuring a flawless experience every time.",
  },
  {
    icon: Heart,
    title: "Personal Service",
    description:
      "Every charter is tailored to you. Our concierge team works directly with each guest to craft an itinerary, menu, and experience that exceeds expectations.",
  },
] as const;

const TEAM = [
  {
    name: "Captain James Rivera",
    role: "Lead Captain",
    bio: "20+ years navigating South Florida waters. USCG 100-ton Master license. Former America's Cup crew member and lifelong waterman.",
  },
  {
    name: "Sofia Morales",
    role: "Operations Director",
    bio: "Former luxury hospitality director at The Setai Miami Beach. Ensures every charter runs with five-star precision from dock to dock.",
  },
  {
    name: "Marcus Chen",
    role: "Guest Concierge",
    bio: "Your single point of contact from first inquiry to farewell. Specializes in bespoke event planning, catering coordination, and surprise-and-delight moments.",
  },
] as const;

const TRUST_BADGES = [
  { icon: ShieldCheck, label: "USCG Licensed" },
  { icon: Shield, label: "Fully Insured" },
  { icon: BadgeCheck, label: "IYBA Member" },
] as const;

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative flex flex-col items-center justify-center px-6 pb-16 pt-32 text-center">
        <div className="mb-6 h-px w-16 bg-gold" />
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          About True Lux
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-white/50">
          Redefining luxury on the water since 2018. Based in Miami Beach,
          driven by passion.
        </p>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Our Story — 2-column                                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">
              Our Story
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">
              Born on Biscayne Bay
            </h2>
            <div className="mt-6 space-y-4 text-white/60 leading-relaxed">
              <p>
                True Lux was founded with a simple belief: a day on the water
                should be effortless, extraordinary, and deeply personal. What
                began as a single charter boat operating out of Miami Beach
                Marina has grown into one of South Florida&rsquo;s most trusted
                luxury yacht charter companies.
              </p>
              <p>
                With over two decades of combined maritime experience, our team
                has navigated everything from sunset cruises on Biscayne Bay to
                multi-day voyages through the Florida Keys and the Bahamas. We
                know these waters like the back of our hand — every sandbar,
                every hidden cove, every perfect anchorage.
              </p>
              <p>
                Our passion for the water is matched only by our dedication to
                hospitality. Every charter is an opportunity to create memories
                that last a lifetime, and we treat it that way. From corporate
                retreats to intimate celebrations, we bring the same level of
                care, professionalism, and attention to detail.
              </p>
            </div>
            <Button asChild className="mt-8">
              <Link href="/fleet">Explore Our Fleet</Link>
            </Button>
          </div>

          {/* Image Placeholder */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-800/60">
            <div className="absolute inset-0 flex items-center justify-center">
              <Anchor className="h-16 w-16 text-white/10" />
            </div>
            {/* Decorative border */}
            <div className="absolute inset-0 rounded-lg border border-gold/10" />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Values Grid                                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-y border-white/5 bg-[#0A1628] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">
              What Drives Us
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">
              Our Values
            </h2>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="rounded-lg border border-white/5 bg-[#030712] p-8 text-center transition-colors hover:border-gold/20"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/20 bg-gold/5">
                    <Icon className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="mt-6 font-heading text-xl font-bold">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/50">
                    {v.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Team Section                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">
            The People Behind the Helm
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">
            Meet Our Crew
          </h2>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="group rounded-lg border border-white/5 bg-[#0A1628] p-6 transition-colors hover:border-gold/20"
            >
              {/* Avatar Placeholder */}
              <div className="mx-auto h-28 w-28 rounded-full bg-gray-800/60 ring-2 ring-white/5 transition-all group-hover:ring-gold/20" />

              <div className="mt-6 text-center">
                <h3 className="font-heading text-lg font-bold">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-gold">
                  {member.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Trust Badges                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-t border-white/5 bg-[#0A1628] py-16">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-12 px-6">
          {TRUST_BADGES.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.label}
                className="flex flex-col items-center gap-3 text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/20 bg-gold/5">
                  <Icon className="h-6 w-6 text-gold" />
                </div>
                <span className="text-sm font-medium tracking-wide text-white/60">
                  {badge.label}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
