"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const ease = [0.25, 0.4, 0.25, 1] as [number, number, number, number];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.15,
      duration: 0.8,
      ease,
    },
  }),
};

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background — dark gradient simulating yacht image overlay */}
      <div className="absolute inset-0 z-0">
        {/* Simulated yacht image background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #0a1628 0%, #030712 30%, #0d1b2a 60%, #030712 100%)",
          }}
        />
        {/* Subtle water-like shimmer pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 20% 50%, rgba(192, 152, 99, 0.4) 0%, transparent 50%), " +
              "radial-gradient(ellipse at 80% 20%, rgba(192, 152, 99, 0.2) 0%, transparent 50%), " +
              "radial-gradient(ellipse at 60% 80%, rgba(192, 152, 99, 0.15) 0%, transparent 50%)",
          }}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Decorative gold line */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0}
          className="mx-auto mb-8 h-px w-16 bg-gold"
        />

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={1}
          className={cn(
            "font-[family-name:var(--font-playfair)] text-5xl font-bold leading-tight tracking-tight text-white",
            "md:text-7xl md:leading-[1.1]",
            "lg:text-8xl"
          )}
        >
          Experience Miami{" "}
          <span className="text-gold-gradient">From the Water</span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={2}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted md:mt-8 md:text-xl"
        >
          Private yacht charters with professional crew. Biscayne Bay, Star
          Island, and beyond.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={3}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row md:mt-12"
        >
          <Link
            href="/fleet"
            className={cn(
              "inline-flex h-14 items-center justify-center rounded-sm px-10",
              "bg-gold text-sm font-semibold uppercase tracking-[0.15em] text-background",
              "transition-all duration-300",
              "hover:bg-gold-light hover:shadow-[0_0_30px_rgba(192,152,99,0.3)]",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            )}
          >
            Explore the Fleet
          </Link>
          <Link
            href="/contact"
            className={cn(
              "inline-flex h-14 items-center justify-center rounded-sm px-10",
              "border border-gold bg-transparent text-sm font-semibold uppercase tracking-[0.15em] text-gold",
              "transition-all duration-300",
              "hover:bg-gold/10 hover:shadow-[0_0_30px_rgba(192,152,99,0.15)]",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            )}
          >
            Check Availability
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
      >
        <Link
          href="#fleet"
          aria-label="Scroll to fleet section"
          className="flex flex-col items-center gap-2 text-muted/60 transition-colors hover:text-gold"
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.2em]">
            Discover
          </span>
          <ChevronDown className="h-5 w-5 animate-scroll-bounce" />
        </Link>
      </motion.div>
    </section>
  );
}
