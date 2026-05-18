import { Check } from "lucide-react";

const POINTS = [
  {
    title: "12 years coaching",
    body: "Former S&C lead for amateur athletes. Trained over 140 clients across studio and outdoor formats.",
  },
  {
    title: "Programmed, not improvised",
    body: "Every block is written, tracked, and reviewed. You see exactly what's progressing and what's next.",
  },
  {
    title: "Built for consistency",
    body: "Average client stays nine months. Sessions adapt around travel, deload weeks, and life.",
  },
];

const GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80",
    alt: "Minimal training studio interior with barbells",
  },
  {
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80",
    alt: "Outdoor park training session",
  },
  {
    src: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=900&q=80",
    alt: "Beach conditioning at sunrise",
  },
  {
    src: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=900&q=80",
    alt: "Urban stairs training",
  },
];

export function CoachSection() {
  return (
    <section id="coach" aria-labelledby="coach-heading" className="border-t border-hairline/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1000&q=80"
              alt="Portrait of Alex Moreno, strength and conditioning coach"
              loading="lazy"
              width={1000}
              height={1250}
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-7 lg:pl-8 flex flex-col justify-center">
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
            The coach
          </div>
          <h2 id="coach-heading" className="font-display text-4xl sm:text-5xl font-semibold tracking-tight">
            Alex Moreno
          </h2>
          <p className="mt-3 text-muted-foreground">
            Strength &amp; Conditioning Coach · Barcelona
          </p>

          <ul className="mt-10 space-y-6">
            {POINTS.map((p) => (
              <li key={p.title} className="flex gap-4">
                <span className="flex-shrink-0 mt-1 inline-flex h-6 w-6 items-center justify-center rounded-sm border border-primary text-primary">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <div>
                  <h3 className="text-base font-medium">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{p.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-12 grid grid-cols-2 lg:grid-cols-4 gap-3 mt-8">
          {GALLERY.map((g) => (
            <div key={g.src} className="relative aspect-square overflow-hidden rounded-md">
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                width={900}
                height={900}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 50vw"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
