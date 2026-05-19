import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/sections/SiteNav";
import { HeroSection } from "@/components/sections/HeroSection";
import { ScheduleSection } from "@/components/sections/ScheduleSection";
import { CoachSection } from "@/components/sections/CoachSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { LogisticsSection } from "@/components/sections/LogisticsSection";
import {
  BookingCtaSection,
  SiteFooter,
} from "@/components/sections/BookingCtaSection";
import { SITE } from "@/lib/site-meta";

// JSON-LD structured data (Phase H) — Person + LocalBusiness
const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Person", "LocalBusiness"],
  name: SITE.coachName,
  jobTitle: "Strength & Conditioning Coach",
  description: SITE.description,
  url: SITE.origin,
  image: SITE.ogImage,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Barcelona",
    addressCountry: "ES",
  },
  areaServed: {
    "@type": "City",
    name: "Barcelona",
  },
  sameAs: [
    // Add real social profile URLs here when available, e.g.:
    // "https://www.instagram.com/alexmoreno_snc",
  ],
};

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    // ── Per-route meta (owned by this route) ─────────────────────────────
    // title, description, og:*, twitter:*, canonical, robots belong here.
    // Global tags (charset, viewport, theme-color, font links) live in root.
    meta: [
      // ── Phase D: Core SEO ────────────────────────────────────────────
      { title: SITE.title },
      { name: "description", content: SITE.description },
      {
        name: "robots",
        content: SITE.isProduction ? "index, follow" : "noindex, nofollow",
      },
      { name: "referrer", content: "strict-origin-when-cross-origin" },

      // ── Phase E: Open Graph ──────────────────────────────────────────
      { property: "og:type",         content: "website" },
      { property: "og:site_name",    content: SITE.name },
      { property: "og:locale",       content: SITE.locale },
      { property: "og:url",          content: SITE.origin },
      { property: "og:title",        content: SITE.title },
      { property: "og:description",  content: SITE.descriptionShort },
      { property: "og:image",        content: SITE.ogImage },
      { property: "og:image:width",  content: SITE.ogImageWidth },
      { property: "og:image:height", content: SITE.ogImageHeight },
      { property: "og:image:alt",    content: SITE.ogImageAlt },

      // ── Phase F: Twitter / X Card ────────────────────────────────────
      { name: "twitter:card",        content: "summary_large_image" },
      { name: "twitter:title",       content: SITE.title },
      { name: "twitter:description", content: SITE.descriptionShort },
      { name: "twitter:image",       content: SITE.ogImage },
      { name: "twitter:image:alt",   content: SITE.ogImageAlt },
    ],
    links: [
      // Phase D: canonical URL
      { rel: "canonical", href: SITE.origin },
    ],
    scripts: [
      // Phase H: JSON-LD structured data
      {
        type: "application/ld+json",
        children: JSON.stringify(jsonLd),
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <SiteNav />
      <main id="main-content">
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
