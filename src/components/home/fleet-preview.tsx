"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";
import { Anchor, Users, Ruler, ArrowRight } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { yachts } from "@/lib/data/yachts";

const ease = [0.25, 0.4, 0.25, 1] as [number, number, number, number];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease,
    },
  },
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

export function FleetPreview() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      ref={ref}
      id="fleet"
      className="relative overflow-hidden bg-background py-24 md:py-32"
    >
      {/* Subtle top gradient separator */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Section Heading */}
        <motion.div
          variants={headingVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16 text-center md:mb-20"
        >
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold tracking-tight text-white md:text-5xl">
            Our Fleet
          </h2>
          <div className="mx-auto mt-4 h-[2px] w-16 bg-gold-gradient" />
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
            Hand-selected vessels maintained to the highest standards, each
            offering a unique charter experience.
          </p>
        </motion.div>

        {/* Yacht Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {yachts.map((yacht) => (
            <motion.div key={yacht.id} variants={cardVariants}>
              <Link
                href={`/fleet/${yacht.slug}`}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-sm",
                  "border border-white/[0.06] bg-surface-light",
                  "transition-all duration-500",
                  "hover:border-gold/30 hover:gold-glow"
                )}
              >
                {/* Placeholder Image Area */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, #0d1b2a 0%, #1a2744 40%, #0d1b2a 100%)`,
                    }}
                  />
                  {/* Yacht silhouette accent */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Anchor className="h-12 w-12 text-gold/10 transition-colors duration-500 group-hover:text-gold/20" />
                  </div>
                  {/* Price badge */}
                  <div className="absolute bottom-3 right-3 rounded-sm bg-black/70 px-3 py-1.5 backdrop-blur-sm">
                    <span className="text-xs font-medium text-gold">
                      From {formatCurrency(yacht.pricing.halfDay)}
                    </span>
                    <span className="text-[10px] text-muted"> / half day</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-white transition-colors duration-300 group-hover:text-gold">
                    {yacht.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted/70">{yacht.tagline}</p>

                  {/* Specs Row */}
                  <div className="mt-4 flex items-center gap-4 border-t border-white/[0.06] pt-4">
                    <div className="flex items-center gap-1.5">
                      <Ruler className="h-3.5 w-3.5 text-gold/60" />
                      <span className="text-xs text-muted">
                        {yacht.length}&apos;
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-gold/60" />
                      <span className="text-xs text-muted">
                        {yacht.capacity} guests
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View Full Fleet Link */}
        <motion.div
          variants={headingVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-14 text-center"
        >
          <Link
            href="/fleet"
            className={cn(
              "group inline-flex items-center gap-2",
              "text-sm font-semibold uppercase tracking-[0.15em] text-gold",
              "transition-colors duration-300 hover:text-gold-light"
            )}
          >
            View Full Fleet
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
