import { useMemo, useState } from "react";
import { SCHEDULE, DAYS, type Slot, type Focus, type Location } from "@/data/schedule";
import { MapPin, Clock } from "lucide-react";

type Filter = "All" | Location | Focus;
const FILTERS: Filter[] = ["All", "Studio", "Outdoor", "Strength", "Conditioning", "Mobility"];

function focusClass(f: Focus) {
  switch (f) {
    case "Strength": return "text-primary";
    case "Conditioning": return "text-foreground";
    case "Mobility": return "text-muted-foreground";
  }
}

function SlotCard({ slot }: { slot: Slot }) {
  return (
    <article
      className={`group relative flex flex-col gap-3 border border-hairline/60 bg-surface p-4 rounded-md transition-colors ${
        slot.open ? "hover:border-primary/60" : "opacity-60"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-display text-lg leading-tight">{slot.time}</div>
          <div className={`text-[11px] uppercase tracking-[0.14em] mt-1 ${focusClass(slot.focus)}`}>
            {slot.focus}
          </div>
        </div>
        <span
          className={`h-2 w-2 rounded-full mt-2 ${
            slot.open ? "bg-primary" : "border border-hairline bg-transparent"
          }`}
          aria-label={slot.open ? "Open" : "Full"}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium leading-snug">{slot.name}</h3>
        <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {slot.location}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {slot.duration}m
          </span>
        </div>
        <div className="mt-1 text-[11px] text-muted-foreground/80">{slot.place}</div>
      </div>

      <button
        type="button"
        disabled={!slot.open}
        className="mt-1 inline-flex items-center justify-center w-full rounded-sm border border-hairline px-3 py-2 text-xs font-medium text-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-colors disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-hairline disabled:hover:text-muted-foreground"
      >
        {slot.open ? "Book" : "Full"}
      </button>
    </article>
  );
}

export function ScheduleSection() {
  const [filter, setFilter] = useState<Filter>("All");

  const filtered = useMemo(() => {
    if (filter === "All") return SCHEDULE;
    return SCHEDULE.filter(
      (s) => s.location === filter || s.focus === filter,
    );
  }, [filter]);

  const byDay = useMemo(() => {
    return DAYS.map((d) => ({
      day: d,
      slots: filtered.filter((s) => s.day === d),
    }));
  }, [filtered]);

  const openCount = filtered.filter((s) => s.open).length;

  return (
    <section id="schedule" aria-labelledby="schedule-heading" className="border-t border-hairline/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
              This week
            </div>
            <h2 id="schedule-heading" className="font-display text-4xl sm:text-5xl font-semibold tracking-tight">
              Pick a slot. Show up.
            </h2>
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="text-foreground font-medium">{openCount}</span> open slots ·{" "}
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> available
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider rounded-sm border transition-colors ${
                filter === f
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-hairline text-muted-foreground hover:text-foreground hover:border-foreground/60"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          {byDay.map(({ day, slots }) => (
            <div key={day} className="flex flex-col gap-3">
              <div className="flex items-baseline justify-between border-b border-hairline/60 pb-2">
                <div className="font-display text-sm font-semibold uppercase tracking-[0.18em]">
                  {day}
                </div>
                <div className="text-[11px] text-muted-foreground">
                  {slots.filter((s) => s.open).length}/{slots.length}
                </div>
              </div>
              {slots.length === 0 ? (
                <div className="text-xs text-muted-foreground/60 py-4">—</div>
              ) : (
                slots.map((s) => <SlotCard key={s.id} slot={s} />)
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
