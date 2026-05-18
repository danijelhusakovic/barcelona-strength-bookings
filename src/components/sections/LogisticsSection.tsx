const ITEMS = [
  {
    label: "Base location",
    value: "Poblenou Studio",
    detail: "Carrer de Pujades, Barcelona",
  },
  {
    label: "Outdoor sessions",
    value: "Ciutadella · Barceloneta · Montjuïc · Bunkers del Carmel",
    detail: "Meeting points shared on booking",
  },
  {
    label: "Session length",
    value: "40–60 minutes",
    detail: "Mobility 40m · Strength & Conditioning 50–60m",
  },
  {
    label: "What to bring",
    value: "Trainers, water, a small towel",
    detail: "Everything else is provided",
  },
  {
    label: "Good fit for",
    value: "Professionals training 2–4×/week, returning lifters",
    detail: "Not a fit for one-off drop-ins or bootcamp formats",
  },
];

export function LogisticsSection() {
  return (
    <section id="logistics" aria-labelledby="logistics-heading" className="border-t border-hairline/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-12">
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
            Logistics
          </div>
          <h2 id="logistics-heading" className="font-display text-4xl sm:text-5xl font-semibold tracking-tight">
            The practical details.
          </h2>
        </div>

        <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 border-t border-hairline/60">
          {ITEMS.map((i) => (
            <div
              key={i.label}
              className="border-b border-hairline/60 lg:border-b-0 lg:border-r last:border-r-0 py-8 lg:py-10 lg:px-6 first:lg:pl-0"
            >
              <dt className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                {i.label}
              </dt>
              <dd className="mt-4 font-display text-lg leading-snug">{i.value}</dd>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{i.detail}</p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
