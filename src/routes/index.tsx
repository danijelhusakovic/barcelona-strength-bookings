import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/sections/SiteNav";
import { HeroSection } from "@/components/sections/HeroSection";
import { ScheduleSection } from "@/components/sections/ScheduleSection";
import { CoachSection } from "@/components/sections/CoachSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { LogisticsSection } from "@/components/sections/LogisticsSection";
import { BookingCtaSection, SiteFooter } from "@/components/sections/BookingCtaSection";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Alex Moreno — S&C Coach, Barcelona" },
      {
        name: "description",
        content:
          "Structured strength & conditioning in Barcelona. Studio and outdoor sessions for busy professionals. Book a slot this week.",
      },
      { property: "og:title", content: "Alex Moreno — S&C Coach, Barcelona" },
      {
        property: "og:description",
        content:
          "Studio and outdoor strength & conditioning in Barcelona. Programmed sessions for busy professionals.",
      },
      {
        property: "og:image",
        content:
          "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <HeroSection />
        <ScheduleSection />
        <CoachSection />
        <TestimonialsSection />
        <LogisticsSection />
        <BookingCtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
