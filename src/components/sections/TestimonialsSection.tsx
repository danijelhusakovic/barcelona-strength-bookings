import { TESTIMONIALS } from "@/data/testimonials";

const STRIP = [
  "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=700&q=80",
];

export function TestimonialsSection() {
  return (
    <section aria-labelledby="testimonials-heading" className="border-t border-hairline/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
            From clients
          </div>
          <h2 id="testimonials-heading" className="font-display text-4xl sm:text-5xl font-semibold tracking-tight">
            Quiet results, repeated.
          </h2>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="flex flex-col gap-6 border-t border-primary pt-6">
              <blockquote className="text-base leading-relaxed text-foreground">
                "{t.quote}"
              </blockquote>
              <figcaption className="text-sm text-muted-foreground">
                <span className="text-foreground font-medium">{t.name}</span>, {t.age} · {t.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-16 overflow-hidden">
        <div className="flex gap-3 px-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {STRIP.map((src) => (
            <div
              key={src}
              className="relative flex-shrink-0 w-64 h-80 overflow-hidden rounded-md"
            >
              <img
                src={src}
                alt="Community training"
                loading="lazy"
                width={700}
                height={875}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
