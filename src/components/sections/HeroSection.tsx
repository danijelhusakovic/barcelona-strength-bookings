import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/components/booking/booking-context";

export function HeroSection() {
  const { openSheet } = useBooking();

  return (
    <section className="relative pt-24 lg:pt-16 min-h-[100svh] flex items-center overflow-hidden">
      <div className="mx-auto max-w-7xl w-full px-6 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 lg:pr-8">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground mb-8">
            <span className="h-px w-8 bg-primary" />
            Barcelona · Strength &amp; Conditioning
          </div>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.02] tracking-tight">
            Stronger every week.
            <br />
            <span className="text-muted-foreground">Without guesswork.</span>
          </h1>
          <p className="mt-8 text-lg text-muted-foreground max-w-md leading-relaxed">
            Structured strength and conditioning for busy professionals — indoor
            studio sessions and outdoor training across the city.
          </p>
          {/* 4.1 — Pricing hint; confirm exact € amount with stakeholder before launch */}
          <p className="mt-3 text-sm text-muted-foreground/70">
            From €XX / session &middot; packages available
          </p>

          {/* CTAs — Book opens sheet; View schedule scrolls only */}
          <div className="mt-10 flex items-center gap-6">
            <Button
              id="hero-book-btn"
              size="lg"
              className="gap-2"
              onClick={() => openSheet()}
            >
              Book Your Session
              <ArrowRight className="h-4 w-4" />
            </Button>
            <a
              href="#schedule"
              className="text-sm text-foreground border-b border-hairline hover:border-primary transition-colors pb-1"
            >
              View schedule
            </a>
          </div>

          {/* 4.3 — Reduced to one hero stat; full credentials live in #coach */}
          <dl className="mt-16 flex items-center gap-8">
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                Coaching experience
              </dt>
              <dd className="mt-2 font-display text-2xl">12 yrs</dd>
            </div>
            <a
              href="#coach"
              className="text-sm text-muted-foreground border-b border-hairline hover:border-primary hover:text-foreground transition-colors pb-1 self-end mb-1"
            >
              See credentials
            </a>
          </dl>
        </div>

        <div className="lg:col-span-6 relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80"
              alt="Athlete training with barbell in a minimal studio"
              loading="eager"
              width={1200}
              height={1500}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div className="text-xs uppercase tracking-[0.18em] text-foreground/90">
                Studio · Poblenou
              </div>
              <div className="flex items-center gap-2 text-xs text-foreground/90">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                Open slots this week
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
