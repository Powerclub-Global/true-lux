"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote:
      "We booked the Azimut for my wife's birthday and it exceeded every expectation. The crew was impeccable, the boat was stunning, and watching the sunset over Star Island was absolutely magical. Worth every penny.",
    name: "James & Maria Castellano",
    occasion: "Birthday Celebration",
    rating: 5,
  },
  {
    quote:
      "Our corporate event on the Sunseeker was the talk of the office for weeks. True Lux handled every detail from catering coordination to the custom route. Professional, seamless, and unforgettable.",
    name: "David Chen",
    occasion: "Corporate Event",
    rating: 5,
  },
  {
    quote:
      "We've chartered yachts in Monaco, Ibiza, and the BVI -- and True Lux in Miami is genuinely world-class. The Leopard catamaran was perfect for our family, and the captain knew every hidden sandbar and cove.",
    name: "Sophie & Laurent Marchand",
    occasion: "Family Vacation",
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: rating }).map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4 fill-gold text-gold"
        />
      ))}
    </div>
  );
}

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

export function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-background py-24 md:py-32"
    >
      {/* Subtle top separator */}
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
            What Our Guests Say
          </h2>
          <div className="mx-auto mt-4 h-[2px] w-16 bg-gold-gradient" />
        </motion.div>

        {/* Testimonial Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              variants={cardVariants}
              className={cn(
                "group relative flex flex-col rounded-sm p-8",
                "border border-white/[0.06] bg-surface-light",
                "transition-all duration-500",
                "hover:border-gold/20"
              )}
            >
              {/* Quote icon */}
              <Quote className="mb-5 h-8 w-8 text-gold/20" />

              {/* Star Rating */}
              <StarRating rating={testimonial.rating} />

              {/* Quote Text */}
              <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-muted">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="mt-6 border-t border-white/[0.06] pt-5">
                <p className="font-[family-name:var(--font-playfair)] text-sm font-semibold text-white">
                  {testimonial.name}
                </p>
                <p className="mt-1 text-xs text-gold/80">
                  {testimonial.occasion}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
