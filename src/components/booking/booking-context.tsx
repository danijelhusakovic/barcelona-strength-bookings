import { createContext, useContext, useState, type ReactNode } from "react";
import type { Slot } from "@/data/schedule";

type SheetMode = "book" | "waitlist";

interface BookingContextValue {
  open: boolean;
  mode: SheetMode;
  slot: Slot | null;
  /** Open the sheet in booking mode. Pass a slot to pre-fill, or null/undefined to show "pick a slot" state. */
  openSheet: (slot?: Slot | null) => void;
  /** Open the sheet in waitlist mode for a full slot. */
  openWaitlist: (slot: Slot) => void;
  closeSheet: () => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<SheetMode>("book");
  const [slot, setSlot] = useState<Slot | null>(null);

  const openSheet = (s: Slot | null = null) => {
    setMode("book");
    setSlot(s);
    setOpen(true);
  };

  const openWaitlist = (s: Slot) => {
    setMode("waitlist");
    setSlot(s);
    setOpen(true);
  };

  const closeSheet = () => {
    setOpen(false);
    // Keep slot/mode in state until animation ends (~300ms) to avoid content flicker
    setTimeout(() => {
      setSlot(null);
      setMode("book");
    }, 350);
  };

  return (
    <BookingContext.Provider value={{ open, mode, slot, openSheet, openWaitlist, closeSheet }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within <BookingProvider>");
  return ctx;
}
