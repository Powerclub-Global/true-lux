"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BRAND, ADD_ONS, CHARTER_TYPES } from "@/lib/constants";
import { Button } from "@/components/ui/button";

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------
const inquirySchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  preferredDate: z.string().min(1, "Please select a preferred date"),
  partySize: z
    .number()
    .min(1, "Party size must be at least 1")
    .max(50, "Party size cannot exceed 50"),
  charterType: z.enum(["half-day", "full-day", "multi-day"], {
    error: "Please select a charter type",
  }),
  occasion: z.string().optional(),
  addOns: z.array(z.string()).optional(),
  message: z.string().optional(),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const OCCASIONS = [
  "Birthday",
  "Corporate",
  "Wedding",
  "Family",
  "Bachelorette",
  "Other",
] as const;

const CONTACT_INFO = [
  {
    icon: Phone,
    label: "Phone",
    value: BRAND.phone,
    href: `tel:${BRAND.phone.replace(/\D/g, "")}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: BRAND.email,
    href: `mailto:${BRAND.email}`,
  },
  {
    icon: MapPin,
    label: "Address",
    value: BRAND.address,
    href: `https://maps.google.com/?q=${encodeURIComponent(BRAND.address)}`,
  },
] as const;

const HOURS = [
  { day: "Monday \u2013 Friday", hours: "8:00 AM \u2013 8:00 PM" },
  { day: "Saturday", hours: "8:00 AM \u2013 10:00 PM" },
  { day: "Sunday", hours: "9:00 AM \u2013 6:00 PM" },
] as const;

const SOCIAL_LINKS = [
  { icon: Instagram, label: "Instagram", href: BRAND.instagram },
  { icon: Facebook, label: "Facebook", href: BRAND.facebook },
] as const;

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      addOns: [],
    },
  });

  async function onSubmit(data: InquiryFormData) {
    // In production this would POST to an API route
    console.log("Inquiry submitted:", data);
    alert(
      "Thank you for your inquiry! Our team will contact you within 2 hours."
    );
  }

  return (
    <div className="min-h-screen">
      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative flex flex-col items-center justify-center px-6 pb-16 pt-32 text-center">
        <div className="mb-6 h-px w-16 bg-gold" />
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Plan Your Charter
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-white/50">
          Tell us about your dream day on the water. Our concierge team will
          craft a personalized experience just for you.
        </p>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Form + Sidebar                                                   */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
          {/* ============================================================ */}
          {/* Inquiry Form                                                  */}
          {/* ============================================================ */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8"
            noValidate
          >
            {/* Name row */}
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="First Name" error={errors.firstName?.message}>
                <input
                  {...register("firstName")}
                  type="text"
                  placeholder="John"
                  className={inputStyles(!!errors.firstName)}
                />
              </Field>
              <Field label="Last Name" error={errors.lastName?.message}>
                <input
                  {...register("lastName")}
                  type="text"
                  placeholder="Doe"
                  className={inputStyles(!!errors.lastName)}
                />
              </Field>
            </div>

            {/* Email / Phone */}
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Email" error={errors.email?.message}>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="john@example.com"
                  className={inputStyles(!!errors.email)}
                />
              </Field>
              <Field label="Phone" error={errors.phone?.message}>
                <input
                  {...register("phone")}
                  type="tel"
                  placeholder="(305) 555-0199"
                  className={inputStyles(!!errors.phone)}
                />
              </Field>
            </div>

            {/* Date / Party Size */}
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Preferred Date"
                error={errors.preferredDate?.message}
              >
                <input
                  {...register("preferredDate")}
                  type="date"
                  className={inputStyles(!!errors.preferredDate)}
                />
              </Field>
              <Field label="Party Size" error={errors.partySize?.message}>
                <input
                  {...register("partySize")}
                  type="number"
                  min={1}
                  max={50}
                  placeholder="8"
                  className={inputStyles(!!errors.partySize)}
                />
              </Field>
            </div>

            {/* Charter Type / Occasion */}
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Charter Type"
                error={errors.charterType?.message}
              >
                <select
                  {...register("charterType")}
                  className={inputStyles(!!errors.charterType)}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a charter type
                  </option>
                  {CHARTER_TYPES.map((ct) => (
                    <option key={ct.id} value={ct.id}>
                      {ct.label} ({ct.duration})
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Occasion" error={errors.occasion?.message}>
                <select
                  {...register("occasion")}
                  className={inputStyles(false)}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select an occasion
                  </option>
                  {OCCASIONS.map((o) => (
                    <option key={o} value={o.toLowerCase()}>
                      {o}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            {/* Add-ons checkboxes */}
            <fieldset>
              <legend className="mb-3 text-sm font-medium text-white/80">
                Add-ons{" "}
                <span className="text-white/30">(optional)</span>
              </legend>
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {ADD_ONS.map((addon) => (
                  <label
                    key={addon.id}
                    className="flex cursor-pointer items-center gap-3 rounded-lg border border-white/5 bg-[#0A1628] px-4 py-3 transition-colors hover:border-gold/20 has-[:checked]:border-gold/40 has-[:checked]:bg-gold/5"
                  >
                    <input
                      {...register("addOns")}
                      type="checkbox"
                      value={addon.id}
                      className="h-4 w-4 rounded border-white/20 bg-transparent text-gold accent-[#C09863]"
                    />
                    <div>
                      <span className="text-sm font-medium">{addon.name}</span>
                      <span className="ml-2 text-xs text-white/30">
                        +${addon.price}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Message */}
            <Field label="Message" error={errors.message?.message}>
              <textarea
                {...register("message")}
                rows={4}
                placeholder="Tell us about your vision for the day — special requests, dietary needs, surprise plans..."
                className={cn(inputStyles(false), "resize-y")}
              />
            </Field>

            {/* Submit */}
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              <Send className="mr-2 h-4 w-4" />
              {isSubmitting ? "Sending..." : "Send Inquiry"}
            </Button>
          </form>

          {/* ============================================================ */}
          {/* Contact Sidebar                                               */}
          {/* ============================================================ */}
          <aside>
            <div className="sticky top-24 space-y-8">
              {/* Contact details */}
              <div className="rounded-lg border border-white/5 bg-[#0A1628] p-6">
                <h2 className="font-heading text-xl font-bold">
                  Get in Touch
                </h2>
                <div className="mt-6 space-y-5">
                  {CONTACT_INFO.map((info) => {
                    const Icon = info.icon;
                    return (
                      <a
                        key={info.label}
                        href={info.href}
                        target={info.label === "Address" ? "_blank" : undefined}
                        rel={
                          info.label === "Address"
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="flex items-start gap-3 text-sm text-white/50 transition-colors hover:text-gold"
                      >
                        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                        <div>
                          <p className="text-xs uppercase tracking-wide text-white/30">
                            {info.label}
                          </p>
                          <p className="mt-0.5">{info.value}</p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Hours */}
              <div className="rounded-lg border border-white/5 bg-[#0A1628] p-6">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gold" />
                  <h3 className="text-sm font-semibold">Business Hours</h3>
                </div>
                <div className="mt-4 space-y-2">
                  {HOURS.map((h) => (
                    <div
                      key={h.day}
                      className="flex justify-between text-sm text-white/50"
                    >
                      <span>{h.day}</span>
                      <span>{h.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social */}
              <div className="rounded-lg border border-white/5 bg-[#0A1628] p-6">
                <h3 className="text-sm font-semibold">Follow Us</h3>
                <div className="mt-4 flex items-center gap-3">
                  {SOCIAL_LINKS.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/10 text-white/40 transition-all duration-300 hover:border-gold/40 hover:bg-gold/5 hover:text-gold"
                        aria-label={social.label}
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function inputStyles(hasError: boolean) {
  return cn(
    "w-full rounded-lg border bg-[#0A1628] px-4 py-3 text-sm text-white placeholder:text-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40",
    hasError ? "border-red-500/60" : "border-white/10 hover:border-white/20"
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-white/80">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}
