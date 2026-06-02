import { ArrowRight } from "lucide-react";

const STEPS = [
  {
    number: "01",
    heading: "Pick a slot",
    body: "Browse the weekly timetable and choose a studio or outdoor session that fits your schedule. Open slots are always visible — no waitlist, no back-and-forth.",
  },
  {
    number: "02",
    heading: "Show up",
    body: "Come to the Poblenou studio or your chosen outdoor location. All equipment is provided. Just bring yourself and be ready to work.",
  },
  {
    number: "03",
    heading: "Your program starts",
    body: "Every session follows a structured plan tailored to where you are. Progress is tracked, load is progressive, and results compound week over week.",
  },
] as const;

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="border-t border-hairline/40 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
            How it works
          </div>
          <h2
            id="how-it-works-heading"
            className="font-display text-4xl sm:text-5xl font-semibold tracking-tight"
          >
            Three steps, zero friction.
          </h2>
        </div>

        {/* Steps grid */}
        <div className="grid md:grid-cols-3 gap-px bg-hairline/40 rounded-md overflow-hidden">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className="relative bg-background p-8 sm:p-10 flex flex-col gap-6"
            >
              {/* Step number */}
              <div className="font-display text-5xl font-semibold text-muted-foreground/20 leading-none select-none">
                {step.number}
              </div>

              {/* Arrow connector (hidden on last item and on mobile) */}
              {i < STEPS.length - 1 && (
                <ArrowRight className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-4 w-4 text-hairline z-10" />
              )}

              {/* Content */}
              <div className="flex flex-col gap-3">
                <h3 className="font-display text-xl font-semibold tracking-tight">
                  {step.heading}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
