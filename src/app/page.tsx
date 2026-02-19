import { HeroSection } from "@/components/home/hero-section";
import { FleetPreview } from "@/components/home/fleet-preview";
import { ExperienceSection } from "@/components/home/experience-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { CtaSection } from "@/components/home/cta-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <FleetPreview />
      <ExperienceSection />
      <TestimonialsSection />
      <CtaSection />
    </main>
  );
}
