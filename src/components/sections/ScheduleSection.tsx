import { useMemo, useState } from "react";
import { MapPin, Clock, ChevronRight } from "lucide-react";
import { SCHEDULE, DAYS, type Slot, type Focus, type Location } from "@/data/schedule";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useBooking } from "@/components/booking/booking-context";

// ── Filter types ─────────────────────────────────────────────────────────────
type LocationFilter = "All" | Location;
type FocusFilter = "All" | Focus;

const LOCATION_FILTERS: LocationFilter[] = ["All", "Studio", "Outdoor"];
const FOCUS_FILTERS: FocusFilter[] = ["All", "Strength", "Conditioning", "Mobility"];

// ── Helpers ───────────────────────────────────────────────────────────────────
function focusClass(f: Focus) {
  switch (f) {
    case "Strength":    return "text-primary";
    case "Conditioning": return "text-foreground";
    case "Mobility":    return "text-muted-foreground";
  }
}

// ── Slot card inner content (shared between open/full variants) ───────────────
function SlotCardInner({ slot }: { slot: Slot }) {
  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-display text-lg leading-tight">{slot.time}</div>
          <div className={`text-[11px] uppercase tracking-[0.14em] mt-1 ${focusClass(slot.focus)}`}>
            {slot.focus}
          </div>
        </div>
        <span
          className={`h-2 w-2 rounded-full mt-2 shrink-0 ${
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
    </>
  );
}

// ── Slot card (open or full) ──────────────────────────────────────────────────
function SlotCard({ slot, onBook, onWaitlist }: { slot: Slot; onBook: (s: Slot) => void; onWaitlist: (s: Slot) => void }) {
  if (!slot.open) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {/* Wrapper div needed: TooltipTrigger can't forward to a disabled button */}
          <div className="group relative flex flex-col gap-3 border border-hairline/60 bg-surface p-4 rounded-md opacity-55">
            <SlotCardInner slot={slot} />
            <button
              type="button"
              onClick={() => onWaitlist(slot)}
              className="mt-1 inline-flex items-center justify-center w-full rounded-sm border border-hairline px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors cursor-pointer"
            >
              Full — join waitlist
            </button>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top">Full — join waitlist (demo)</TooltipContent>
      </Tooltip>
    );
  }

  return (
    <article className="group relative flex flex-col gap-3 border border-hairline/60 bg-surface p-4 rounded-md transition-colors hover:border-primary/60">
      <SlotCardInner slot={slot} />
      <button
        type="button"
        onClick={() => onBook(slot)}
        className="mt-1 inline-flex items-center justify-center w-full rounded-sm border border-hairline px-3 py-2 text-xs font-medium text-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-colors"
      >
        Book
      </button>
    </article>
  );
}

// ── Filter chip ───────────────────────────────────────────────────────────────
function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 text-xs uppercase tracking-wider rounded-sm border transition-colors ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-hairline text-muted-foreground hover:text-foreground hover:border-foreground/60"
      }`}
    >
      {label}
    </button>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export function ScheduleSection() {
  const [locationFilter, setLocationFilter] = useState<LocationFilter>("All");
  const [focusFilter, setFocusFilter] = useState<FocusFilter>("All");
  // selectedDay is used for the mobile tab view; defaults to Mon
  const [selectedDay, setSelectedDay] = useState<(typeof DAYS)[number]>("Mon");
  const { openSheet, openWaitlist } = useBooking();

  // AND-logic filtering across both dimensions
  const filtered = useMemo(() => {
    return SCHEDULE.filter((s) => {
      const locOk = locationFilter === "All" || s.location === locationFilter;
      const focOk = focusFilter === "All" || s.focus === focusFilter;
      return locOk && focOk;
    });
  }, [locationFilter, focusFilter]);

  const byDay = useMemo(
    () => DAYS.map((d) => ({ day: d, slots: filtered.filter((s) => s.day === d) })),
    [filtered],
  );

  const openCount = filtered.filter((s) => s.open).length;

  // Nearest open slot in filtered set (canonical DAYS order, then by time)
  const nextAvailable = useMemo(() => {
    for (const day of DAYS) {
      const open = filtered
        .filter((s) => s.day === day && s.open)
        .sort((a, b) => a.time.localeCompare(b.time));
      if (open.length > 0) return open[0];
    }
    return null;
  }, [filtered]);

  const handleBook = (slot: Slot) => openSheet(slot);
  const handleWaitlist = (slot: Slot) => openWaitlist(slot);

  const handleNextAvailable = () => {
    if (!nextAvailable) return;
    setSelectedDay(nextAvailable.day); // switch mobile tab to that day
    openSheet(nextAvailable);
  };

  return (
    <TooltipProvider delayDuration={200}>
      <section
        id="schedule"
        aria-labelledby="schedule-heading"
        className="border-t border-hairline/40 py-24 sm:py-32"
      >
        <div className="mx-auto max-w-7xl px-6">

          {/* ── Section header ──────────────────────────────────── */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
                This week
              </div>
              <h2
                id="schedule-heading"
                className="font-display text-4xl sm:text-5xl font-semibold tracking-tight"
              >
                Pick a slot. Show up.
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {/* Open slot count */}
              <div className="text-sm text-muted-foreground">
                <span className="text-foreground font-medium">{openCount}</span> open slots ·{" "}
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  available
                </span>
              </div>

              {/* Next available chip — hidden when no open slots in filtered set */}
              {nextAvailable && (
                <button
                  type="button"
                  onClick={handleNextAvailable}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-primary/10 border border-primary/30 text-xs text-primary hover:bg-primary/20 transition-colors"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  Next: {nextAvailable.day} {nextAvailable.time} — {nextAvailable.name}
                  <ChevronRight className="h-3 w-3 shrink-0" />
                </button>
              )}
            </div>
          </div>

          {/* ── Split filters ────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row gap-y-3 gap-x-8 mb-8">
            {/* Location row */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground w-16 shrink-0">
                Location
              </span>
              {LOCATION_FILTERS.map((f) => (
                <FilterChip
                  key={f}
                  label={f}
                  active={locationFilter === f}
                  onClick={() => setLocationFilter(f)}
                />
              ))}
            </div>

            {/* Focus row */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground w-16 shrink-0">
                Focus
              </span>
              {FOCUS_FILTERS.map((f) => (
                <FilterChip
                  key={f}
                  label={f}
                  active={focusFilter === f}
                  onClick={() => setFocusFilter(f)}
                />
              ))}
            </div>
          </div>

          {/* ── Mobile: day tab strip ────────────────────────────── */}
          <div className="lg:hidden mb-5">
            <div
              className="flex gap-1.5 overflow-x-auto pb-1"
              style={{ scrollbarWidth: "none" }}
              role="tablist"
              aria-label="Day selection"
            >
              {DAYS.map((day) => {
                const daySlots = filtered.filter((s) => s.day === day);
                const openInDay = daySlots.filter((s) => s.open).length;
                const isSelected = selectedDay === day;
                return (
                  <button
                    key={day}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedDay(day)}
                    className={`flex flex-col items-center gap-0.5 px-4 py-2.5 rounded-md border shrink-0 transition-colors ${
                      isSelected
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-hairline/60 text-muted-foreground hover:text-foreground hover:border-foreground/40"
                    }`}
                  >
                    <span className="font-display font-semibold uppercase tracking-[0.14em] text-[11px]">
                      {day}
                    </span>
                    <span
                      className={`text-[10px] ${
                        openInDay > 0 ? "text-primary" : "text-muted-foreground/50"
                      }`}
                    >
                      {openInDay}/{daySlots.length}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Mobile: selected day's cards ─────────────────────── */}
          <div className="lg:hidden" role="tabpanel">
            {(() => {
              const dayData = byDay.find((d) => d.day === selectedDay);
              if (!dayData || dayData.slots.length === 0) {
                return (
                  <p className="py-12 text-center text-sm text-muted-foreground">
                    No sessions match current filters for {selectedDay}.
                  </p>
                );
              }
              return (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {dayData.slots.map((s) => (
                    <SlotCard key={s.id} slot={s} onBook={handleBook} onWaitlist={handleWaitlist} />
                  ))}
                </div>
              );
            })()}
          </div>

          {/* ── Desktop: 6-column week grid ──────────────────────── */}
          <div className="hidden lg:grid lg:grid-cols-6 gap-3">
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
                  slots.map((s) => <SlotCard key={s.id} slot={s} onBook={handleBook} onWaitlist={handleWaitlist} />)
                )}
              </div>
            ))}
          </div>

        </div>
      </section>
    </TooltipProvider>
  );
}
