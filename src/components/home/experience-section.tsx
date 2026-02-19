"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { DollarSign, Shield, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: DollarSign,
    title: "All-Inclusive Pricing",
    description:
      "No hidden fees, no surprises. Fuel, crew, insurance, and dockage are all included in one transparent price so you can focus on the experience.",
  },
  {
    icon: Shield,
    title: "Professional Crew",
    description:
      "Every charter is helmed by a USCG-licensed captain and supported by experienced crew trained in hospitality, safety, and seamanship.",
  },
  {
    icon: Sparkles,
    title: "Curated Fleet",
    description:
      "Each vessel is hand-selected and maintained to the highest standards. We partner only with proven builders and conduct rigorous inspections.",
  },
];

const ease = [0.25, 0.4, 0.25, 1] as [number, number, number, number];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
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

export function ExperienceSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24 md:py-32"
      style={{
        background:
          "linear-gradient(180deg, #030712 0%, #0a1628 50%, #030712 100%)",
      }}
    >
      {/* Subtle decorative elements */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Section Heading */}
        <motion.div
          variants={headingVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16 text-center md:mb-20"
        >
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold tracking-tight text-white md:text-5xl">
            Why True Lux
          </h2>
          <div className="mx-auto mt-4 h-[2px] w-16 bg-gold-gradient" />
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
            We set the standard for luxury yacht charters in Miami. Every detail
            is considered, every moment elevated.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                className={cn(
                  "group relative flex flex-col items-center rounded-sm p-8 text-center md:p-10",
                  "border border-white/[0.04] bg-white/[0.02]",
                  "transition-all duration-500",
                  "hover:border-gold/20 hover:bg-white/[0.04]"
                )}
              >
                {/* Icon */}
                <div
                  className={cn(
                    "mb-6 flex h-16 w-16 items-center justify-center rounded-full",
                    "border border-gold/20 bg-gold/[0.06]",
                    "transition-all duration-500",
                    "group-hover:border-gold/40 group-hover:bg-gold/[0.1] group-hover:shadow-[0_0_30px_rgba(192,152,99,0.15)]"
                  )}
                >
                  <Icon className="h-7 w-7 text-gold" />
                </div>

                {/* Title */}
                <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-white">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
