"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  User,
  Mail,
  Phone,
  CalendarDays,
  UserCheck,
  AlertTriangle,
  Check,
  QrCode,
  PenLine,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { WaiverForm } from "@/lib/types";

// ---------------------------------------------------------------------------
// Zod schema — Zod v4 uses a slightly different API but we stick with
// the standard approach that works with @hookform/resolvers.
// ---------------------------------------------------------------------------

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const waiverSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(7, "Enter a valid phone number"),
  emergencyContact: z.string().min(2, "Emergency contact name is required"),
  emergencyPhone: z.string().min(7, "Emergency contact phone is required"),
  agreedToTerms: z.literal(true, {
    message: "You must agree to the waiver terms",
  }),
  signature: z.string().min(2, "Signature is required"),
  date: z.string(),
});

type WaiverFormValues = z.infer<typeof waiverSchema>;

// ---------------------------------------------------------------------------
// Waiver Page Component
// ---------------------------------------------------------------------------

export default function WaiverPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<WaiverFormValues>({
    resolver: zodResolver(waiverSchema),
    defaultValues: {
      fullName: "",
      dateOfBirth: "",
      email: "",
      phone: "",
      emergencyContact: "",
      emergencyPhone: "",
      agreedToTerms: undefined as unknown as true,
      signature: "",
      date: new Date().toISOString().split("T")[0],
    },
    mode: "onTouched",
  });

  const onSubmit = (data: WaiverFormValues) => {
    // In production this would POST to an API
    console.log("Waiver submitted:", data);
    setIsSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-navy/40 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <a
              href="/"
              className="font-heading text-2xl tracking-wider text-gold"
            >
              True Lux
            </a>
            <span className="flex items-center gap-2 text-sm tracking-wide text-muted">
              <Shield className="h-4 w-4 text-gold/60" />
              Digital Waiver
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <SuccessState key="success" />
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              {/* Title */}
              <div className="mb-10 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold/20 bg-gold/5">
                  <Shield className="h-8 w-8 text-gold" />
                </div>
                <h1 className="font-heading text-4xl font-bold text-foreground sm:text-5xl">
                  Charter Waiver &amp; Release
                </h1>
                <p className="mx-auto mt-4 max-w-lg text-muted">
                  All guests must complete this waiver before boarding. Please
                  read carefully and sign below.
                </p>
              </div>

              {/* QR Code notice */}
              <div className="mb-8 flex items-start gap-4 rounded-lg border border-border bg-navy-light/50 p-4">
                <QrCode className="mt-0.5 h-5 w-5 shrink-0 text-gold/60" />
                <p className="text-sm text-muted">
                  <span className="font-medium text-foreground">
                    On the vessel?
                  </span>{" "}
                  Scan the QR code provided by your crew to access this form on
                  your phone.
                </p>
              </div>

              {/* Waiver Text */}
              <WaiverTerms />

              {/* Form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-10 space-y-10"
                noValidate
              >
                {/* Personal Information */}
                <section>
                  <h2 className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold">
                    <User className="h-4 w-4" />
                    Personal Information
                  </h2>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <WaiverInput
                      label="Full Legal Name"
                      icon={User}
                      error={errors.fullName?.message}
                      {...register("fullName")}
                      placeholder="John A. Doe"
                    />
                    <WaiverInput
                      label="Date of Birth"
                      icon={CalendarDays}
                      type="date"
                      error={errors.dateOfBirth?.message}
                      {...register("dateOfBirth")}
                    />
                    <WaiverInput
                      label="Email"
                      icon={Mail}
                      type="email"
                      error={errors.email?.message}
                      {...register("email")}
                      placeholder="john@example.com"
                    />
                    <WaiverInput
                      label="Phone"
                      icon={Phone}
                      type="tel"
                      error={errors.phone?.message}
                      {...register("phone")}
                      placeholder="(305) 555-0100"
                    />
                  </div>
                </section>

                {/* Emergency Contact */}
                <section>
                  <h2 className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold">
                    <AlertTriangle className="h-4 w-4" />
                    Emergency Contact
                  </h2>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <WaiverInput
                      label="Emergency Contact Name"
                      icon={UserCheck}
                      error={errors.emergencyContact?.message}
                      {...register("emergencyContact")}
                      placeholder="Jane Doe"
                    />
                    <WaiverInput
                      label="Emergency Contact Phone"
                      icon={Phone}
                      type="tel"
                      error={errors.emergencyPhone?.message}
                      {...register("emergencyPhone")}
                      placeholder="(305) 555-0101"
                    />
                  </div>
                </section>

                {/* Agreement */}
                <section>
                  <h2 className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold">
                    <PenLine className="h-4 w-4" />
                    Agreement &amp; Signature
                  </h2>

                  {/* Checkbox */}
                  <label className="group flex cursor-pointer items-start gap-3">
                    <div className="relative mt-0.5">
                      <input
                        type="checkbox"
                        {...register("agreedToTerms")}
                        className="peer sr-only"
                      />
                      <div
                        className={cn(
                          "flex h-5 w-5 items-center justify-center rounded border-2 transition-all",
                          "peer-checked:border-gold peer-checked:bg-gold",
                          errors.agreedToTerms
                            ? "border-red-500"
                            : "border-white/30 group-hover:border-gold/50"
                        )}
                      >
                        <Check className="h-3.5 w-3.5 text-background opacity-0 peer-checked:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    <span className="text-sm leading-relaxed text-muted">
                      I have read, understand, and agree to the{" "}
                      <span className="text-foreground">
                        Charter Waiver &amp; Release of Liability
                      </span>{" "}
                      terms above. I acknowledge that participation in water
                      activities involves inherent risks.
                    </span>
                  </label>
                  {errors.agreedToTerms && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.agreedToTerms.message}
                    </p>
                  )}

                  {/* Signature */}
                  <div className="mt-6">
                    <label className="mb-2 block text-sm font-medium tracking-wide text-foreground/80">
                      <PenLine className="mb-0.5 mr-2 inline-block h-4 w-4 text-gold" />
                      Signature
                    </label>
                    <input
                      {...register("signature")}
                      placeholder="Type your full legal name as signature"
                      className={cn(
                        "w-full border-b-2 border-t-0 border-l-0 border-r-0 bg-transparent px-1 py-3 text-xl outline-none transition-colors",
                        "font-[cursive] italic text-foreground placeholder:not-italic placeholder:text-white/20",
                        errors.signature
                          ? "border-red-500"
                          : "border-white/20 focus:border-gold"
                      )}
                    />
                    {errors.signature && (
                      <p className="mt-1.5 text-sm text-red-400">
                        {errors.signature.message}
                      </p>
                    )}
                    <p className="mt-2 text-xs text-muted">
                      By typing your name above, you agree this constitutes a
                      legally binding electronic signature.
                    </p>
                  </div>

                  {/* Date (hidden-ish, auto-filled) */}
                  <input type="hidden" {...register("date")} />
                </section>

                {/* Submit */}
                <div className="border-t border-border pt-8">
                  <Button type="submit" size="lg" className="w-full gap-2">
                    <Shield className="h-4 w-4" />
                    Submit Waiver
                  </Button>
                  <p className="mt-3 text-center text-xs text-muted">
                    Your information is encrypted and stored securely.
                  </p>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

// ===========================================================================
// Waiver Terms
// ===========================================================================

function WaiverTerms() {
  return (
    <div className="rounded-lg border border-border bg-navy-light/30 p-6 sm:p-8">
      <div className="max-h-80 space-y-6 overflow-y-auto pr-2 text-sm leading-relaxed text-muted">
        {/* Section 1 */}
        <div>
          <h3 className="mb-2 font-semibold text-foreground">
            1. Assumption of Risk
          </h3>
          <p>
            I acknowledge that participation in a yacht charter and related water
            activities, including but not limited to swimming, snorkeling, jet
            skiing, paddleboarding, and other water sports, involves inherent
            risks. These risks include, but are not limited to: drowning,
            collision, slips, falls, exposure to sun and weather elements,
            seasickness, marine life encounters, and equipment malfunction. I
            voluntarily assume all such risks, both known and unknown, even if
            arising from the negligence of True Lux Yacht Charters, LLC
            (&ldquo;Company&rdquo;), its agents, employees, or crew members.
          </p>
        </div>

        {/* Section 2 */}
        <div>
          <h3 className="mb-2 font-semibold text-foreground">
            2. Release of Liability
          </h3>
          <p>
            In consideration of being permitted to participate in the charter, I
            hereby release, waive, discharge, and covenant not to sue the
            Company, its owners, officers, directors, employees, agents, crew
            members, and affiliates from any and all liability, claims, demands,
            actions, or causes of action arising out of or related to any loss,
            damage, injury, or death that may be sustained by me, or any
            property belonging to me, while participating in the charter or
            while on or near the vessel, whether caused by the negligence of the
            Company or otherwise.
          </p>
        </div>

        {/* Section 3 */}
        <div>
          <h3 className="mb-2 font-semibold text-foreground">
            3. Indemnification
          </h3>
          <p>
            I agree to indemnify, defend, and hold harmless the Company from any
            and all claims, damages, liabilities, costs, and expenses (including
            reasonable attorney fees) arising from my participation in the
            charter, my use of the vessel or equipment, or any breach of this
            agreement.
          </p>
        </div>

        {/* Section 4 */}
        <div>
          <h3 className="mb-2 font-semibold text-foreground">
            4. Medical Acknowledgment
          </h3>
          <p>
            I certify that I am in good health and physically capable of
            participating in the charter activities. I understand that the
            Company does not provide medical personnel onboard. I agree to
            notify the captain or crew immediately of any medical condition,
            allergy, or physical limitation that may affect my safety or the
            safety of others. I consent to emergency medical treatment in the
            event of an accident or illness.
          </p>
        </div>

        {/* Section 5 */}
        <div>
          <h3 className="mb-2 font-semibold text-foreground">
            5. Rules &amp; Conduct
          </h3>
          <p>
            I agree to follow all safety instructions provided by the captain
            and crew. I understand that the captain has final authority over all
            decisions regarding the safety and operation of the vessel. I agree
            not to bring illegal substances onboard and acknowledge that
            excessive alcohol consumption may result in early termination of the
            charter without refund. I agree to treat the vessel, equipment, and
            crew with respect and will be held financially responsible for any
            damage caused by my negligence or willful misconduct.
          </p>
        </div>

        {/* Section 6 */}
        <div>
          <h3 className="mb-2 font-semibold text-foreground">
            6. Photo &amp; Media Release
          </h3>
          <p>
            I grant True Lux Yacht Charters, LLC the irrevocable right and
            permission to use photographs, videos, and other media taken during
            the charter for promotional, marketing, advertising, and social
            media purposes. I waive any right to compensation, inspection, or
            approval of such materials. If I do not wish to be photographed, I
            will notify the crew in writing prior to the charter.
          </p>
        </div>

        {/* Section 7 */}
        <div>
          <h3 className="mb-2 font-semibold text-foreground">
            7. Governing Law
          </h3>
          <p>
            This waiver shall be governed by and construed in accordance with
            the laws of the State of Florida and applicable maritime law. Any
            dispute arising from or related to this agreement shall be resolved
            through binding arbitration in Miami-Dade County, Florida.
          </p>
        </div>

        {/* Section 8 */}
        <div>
          <h3 className="mb-2 font-semibold text-foreground">
            8. Acknowledgment
          </h3>
          <p>
            I acknowledge that I have read this waiver and release of liability
            in its entirety, that I understand its contents, and that I sign it
            voluntarily. I understand that by signing this document, I am giving
            up substantial legal rights, including my right to sue for
            negligence. This agreement is binding upon me, my heirs, executors,
            administrators, and assigns.
          </p>
        </div>
      </div>
    </div>
  );
}

// ===========================================================================
// Success State
// ===========================================================================

function SuccessState() {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-20 text-center"
    >
      <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold bg-gold/10">
        <Check className="h-10 w-10 text-gold" />
      </div>
      <h2 className="font-heading text-4xl font-bold text-foreground">
        Waiver Submitted
      </h2>
      <p className="mx-auto mt-4 max-w-md text-muted">
        Thank you for completing the charter waiver. A copy has been sent to
        your email for your records. You are all set for an unforgettable
        experience on the water.
      </p>
      <div className="mx-auto mt-8 max-w-sm rounded-lg border border-border bg-navy-light/50 p-6 text-left">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gold">
          Reminders
        </h3>
        <ul className="space-y-3 text-sm text-muted">
          <li className="flex gap-3">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            All guests in your party must complete their own waiver.
          </li>
          <li className="flex gap-3">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            Arrive at the marina 15 minutes before your departure time.
          </li>
          <li className="flex gap-3">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            Bring sunscreen, sunglasses, and a valid photo ID.
          </li>
        </ul>
      </div>
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Button asChild size="lg">
          <a href="/">Return Home</a>
        </Button>
        <Button asChild variant="outline" size="lg">
          <a href="/fleet">View Fleet</a>
        </Button>
      </div>
    </motion.div>
  );
}

// ===========================================================================
// Shared Input Component
// ===========================================================================

import { forwardRef } from "react";

interface WaiverInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: React.ElementType;
  error?: string;
}

const WaiverInput = forwardRef<HTMLInputElement, WaiverInputProps>(
  ({ label, icon: Icon, error, className, ...props }, ref) => {
    return (
      <div>
        <label className="mb-2 block text-sm font-medium tracking-wide text-foreground/80">
          <Icon className="mb-0.5 mr-2 inline-block h-4 w-4 text-gold" />
          {label}
        </label>
        <input
          ref={ref}
          {...props}
          className={cn(
            "w-full rounded-md border bg-navy-light px-4 py-3 text-sm text-foreground placeholder:text-white/30 outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/40",
            "[color-scheme:dark]",
            error ? "border-red-500" : "border-border",
            className
          )}
        />
        {error && <p className="mt-1.5 text-sm text-red-400">{error}</p>}
      </div>
    );
  }
);
WaiverInput.displayName = "WaiverInput";
