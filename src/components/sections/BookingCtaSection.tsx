import { ArrowRight } from "lucide-react";

export function BookingCtaSection() {
  return (
    <section aria-labelledby="cta-heading" className="border-t border-hairline/40">
      <div className="mx-auto max-w-7xl px-6 py-28 sm:py-40 text-center">
        <h2
          id="cta-heading"
          className="font-display text-5xl sm:text-7xl lg:text-8xl font-semibold tracking-tight max-w-4xl mx-auto leading-[1.02]"
        >
          Book a session.
          <br />
          <span className="text-primary">Start this week.</span>
        </h2>
        <p className="mt-8 text-muted-foreground max-w-md mx-auto">
          One slot is enough to begin. Pick a time that fits.
        </p>
        <div className="mt-12">
          <a
            href="#schedule"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-8 py-4 text-base font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Book Your Session
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline/40">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-muted-foreground">
        <div className="font-display text-sm text-foreground">
          ALEX<span className="text-primary">.</span>MORENO
        </div>
        <div>Barcelona, Spain</div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-foreground transition-colors">Instagram</a>
          <a href="#" className="hover:text-foreground transition-colors">WhatsApp</a>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
