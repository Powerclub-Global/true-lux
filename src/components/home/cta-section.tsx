"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { BRAND } from "@/lib/constants";

const ease = [0.25, 0.4, 0.25, 1] as [number, number, number, number];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease,
    },
  }),
};

export function CtaSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24 md:py-32"
    >
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #030712 0%, #0a1628 30%, #0d1b2a 50%, #0a1628 70%, #030712 100%)",
          }}
        />
        {/* Subtle gold radial accent */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(192, 152, 99, 0.6) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Top separator */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        {/* Decorative gold line */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0}
          className="mx-auto mb-8 h-px w-16 bg-gold"
        />

        {/* Heading */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={1}
          className="font-[family-name:var(--font-playfair)] text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
        >
          Ready to Set Sail?
        </motion.h2>

        {/* Copy */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={2}
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted"
        >
          Tell us about your ideal charter and our team will craft a
          personalized experience. From intimate sunset cruises to multi-day
          voyages, every journey begins with a conversation.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={3}
          className="mt-10"
        >
          <Link
            href="/contact"
            className={cn(
              "inline-flex h-14 items-center justify-center rounded-sm px-12",
              "bg-gold text-sm font-semibold uppercase tracking-[0.15em] text-background",
              "transition-all duration-300",
              "hover:bg-gold-light hover:shadow-[0_0_40px_rgba(192,152,99,0.3)]",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            )}
          >
            Plan Your Charter
          </Link>
        </motion.div>

        {/* Phone Number */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={4}
          className="mt-8"
        >
          <a
            href={`tel:${BRAND.phone.replace(/[^\d+]/g, "")}`}
            className={cn(
              "inline-flex items-center gap-2.5",
              "text-sm text-muted transition-colors duration-300 hover:text-gold"
            )}
          >
            <Phone className="h-4 w-4" />
            <span className="tracking-wide">{BRAND.phone}</span>
          </a>
        </motion.div>

        {/* Bottom decorative line */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={5}
          className="mx-auto mt-16 h-px w-16 bg-gold/30"
        />
      </div>
    </section>
  );
}
