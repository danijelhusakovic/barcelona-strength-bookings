import { useState } from "react";
import { toast } from "sonner";
import { MapPin, Clock, Calendar, ArrowRight, ChevronLeft, Mail } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBooking } from "./booking-context";

export function BookingSheet() {
  const { open, mode, slot, closeSheet } = useBooking();
  const [email, setEmail] = useState("");

  const handleConfirm = () => {
    toast.success("Slot held for 10 minutes", {
      description: slot
        ? `${slot.day} · ${slot.time} — ${slot.name} (demo only)`
        : "Demo only — no real reservation made.",
    });
    closeSheet();
  };

  const handleWaitlistSubmit = () => {
    toast.success("Added to waitlist", {
      description: slot
        ? `We'll notify you if a spot opens on ${slot.day} at ${slot.time} (demo only)`
        : "Demo only — no real waitlist entry made.",
    });
    setEmail("");
    closeSheet();
  };

  return (
    <Sheet open={open} onOpenChange={(v) => !v && closeSheet()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md bg-surface border-l border-hairline/60 flex flex-col gap-0 p-0"
      >
        {/* ── Waitlist mode ─────────────────────────────────────────── */}
        {mode === "waitlist" && slot ? (
          <>
            <SheetHeader className="px-6 pt-6 pb-4 border-b border-hairline/40">
              <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
                Join waitlist
              </div>
              <SheetTitle className="font-display text-2xl leading-snug text-left">
                {slot.name}
              </SheetTitle>
              <SheetDescription className="sr-only">
                Waitlist for {slot.name} on {slot.day} at {slot.time}
              </SheetDescription>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              {/* Slot summary */}
              <div className="rounded-md border border-hairline/60 bg-background divide-y divide-hairline/40">
                <div className="flex items-center gap-3 px-4 py-3 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="font-medium text-foreground">{slot.day}</span>
                  <span className="text-hairline">·</span>
                  <span className="font-display text-base text-foreground">{slot.time}</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-foreground">{slot.place}</span>
                  <span className="ml-auto text-xs text-muted-foreground">{slot.location}</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-foreground">{slot.duration} minutes</span>
                </div>
              </div>

              {/* Email field (mock — no real submission) */}
              <div className="space-y-2">
                <Label htmlFor="waitlist-email" className="text-sm text-foreground">
                  Your email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input
                    id="waitlist-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9 bg-background border-hairline/60 focus-visible:ring-ring"
                  />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We'll notify you if a spot opens. No spam, unsubscribe any time.
                </p>
              </div>

              {/* Demo disclaimer */}
              <p className="text-xs text-muted-foreground/60 leading-relaxed">
                ⚠ Demo only — no real waitlist entry will be created.
              </p>
            </div>

            <SheetFooter className="flex-col gap-2 px-6 py-6 border-t border-hairline/40">
              <Button
                onClick={handleWaitlistSubmit}
                className="w-full gap-2"
                size="lg"
                disabled={!email.includes("@")}
              >
                Notify me
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={closeSheet}
                className="w-full border-hairline/60 text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            </SheetFooter>
          </>
        ) : slot ? (
          <>
            {/* ── Booking mode — slot selected ──────────────────────── */}
            <SheetHeader className="px-6 pt-6 pb-4 border-b border-hairline/40">
              <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
                Confirm booking
              </div>
              <SheetTitle className="font-display text-2xl leading-snug text-left">
                {slot.name}
              </SheetTitle>
              <SheetDescription className="sr-only">
                Booking details for {slot.name} on {slot.day} at {slot.time}
              </SheetDescription>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              {/* Session detail card */}
              <div className="rounded-md border border-hairline/60 bg-background divide-y divide-hairline/40">
                <div className="flex items-center gap-3 px-4 py-3 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="font-medium text-foreground">{slot.day}</span>
                  <span className="text-hairline">·</span>
                  <span className="font-display text-base text-foreground">{slot.time}</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-foreground">{slot.place}</span>
                  <span className="ml-auto text-xs text-muted-foreground">{slot.location}</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-foreground">{slot.duration} minutes</span>
                </div>
              </div>

              {/* Focus badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-hairline/60 bg-background">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {slot.focus}
                </span>
              </div>

              {/* Demo disclaimer */}
              <p className="text-xs text-muted-foreground/60 leading-relaxed">
                ⚠ Demo only — no real reservation will be made. Confirming shows a success toast to illustrate the booking flow.
              </p>
            </div>

            <SheetFooter className="flex-col gap-2 px-6 py-6 border-t border-hairline/40">
              <Button onClick={handleConfirm} className="w-full gap-2" size="lg">
                Confirm booking
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={closeSheet}
                className="w-full border-hairline/60 text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Change slot
              </Button>
            </SheetFooter>
          </>
        ) : (
          <>
            {/* ── Empty state — no slot selected ───────────────────── */}
            <SheetHeader className="px-6 pt-6 pb-4 border-b border-hairline/40">
              <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
                Book a session
              </div>
              <SheetTitle className="font-display text-2xl text-left">
                Pick a slot
              </SheetTitle>
              <SheetDescription className="text-sm text-muted-foreground text-left mt-1">
                Browse the schedule and tap{" "}
                <span className="text-foreground font-medium">"Book"</span> on any open slot to
                reserve your place.
              </SheetDescription>
            </SheetHeader>

            <div className="flex-1" />

            <div className="px-6 py-6 border-t border-hairline/40">
              <Button
                variant="outline"
                className="w-full border-hairline/60"
                onClick={closeSheet}
                asChild
              >
                <a href="#schedule">View Schedule</a>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
