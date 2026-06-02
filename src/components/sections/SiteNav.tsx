import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, ArrowRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { useBooking } from "@/components/booking/booking-context";

const NAV_LINKS = [
  { label: "Schedule", href: "#schedule" },
  { label: "Coach", href: "#coach" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Logistics", href: "#logistics" },
] as const;

const SECTION_IDS = ["schedule", "coach", "testimonials", "logistics"];

export function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const activeId = useScrollSpy(SECTION_IDS);
  const { openSheet, open: sheetOpen } = useBooking();

  // Show sticky bottom bar once the hero is no longer visible
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("section");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const handleMobileNavClick = () => setMenuOpen(false);

  return (
    <>
      {/* ── Top navigation bar ─────────────────────────────────── */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-hairline/40 bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="font-display text-base font-semibold tracking-tight"
          >
            ALEX<span className="text-primary">.</span>MORENO
          </Link>

          {/* Desktop nav links */}
          <nav
            className="hidden md:flex items-center gap-8 text-sm text-muted-foreground"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.slice(1);
              const isActive = activeId === id;
              return (
                <a
                  key={href}
                  href={href}
                  className={`relative py-1 transition-colors hover:text-foreground ${
                    isActive ? "text-foreground" : ""
                  }`}
                >
                  {label}
                  {/* Active underline dot */}
                  <span
                    className={`absolute -bottom-px inset-x-0 h-px rounded-full bg-primary transition-opacity duration-200 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {/* Desktop Book button */}
            <Button
              id="nav-book-btn"
              onClick={() => openSheet()}
              size="sm"
              className="hidden md:inline-flex gap-1.5"
            >
              Book
            </Button>

            {/* Mobile hamburger */}
            <button
              type="button"
              id="mobile-menu-btn"
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-md text-muted-foreground hover:text-foreground hover:bg-surface transition-colors"
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile menu sheet ───────────────────────────────────── */}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent
          side="right"
          className="w-[280px] bg-background border-l border-hairline/60 flex flex-col p-0"
        >
          <SheetHeader className="px-6 pt-6 pb-4 border-b border-hairline/40">
            <SheetTitle className="font-display text-base tracking-tight text-left">
              ALEX<span className="text-primary">.</span>MORENO
            </SheetTitle>
          </SheetHeader>

          <nav
            className="flex-1 flex flex-col gap-1 px-3 py-4"
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.slice(1);
              const isActive = activeId === id;
              return (
                <a
                  key={href}
                  href={href}
                  onClick={handleMobileNavClick}
                  className={`flex items-center gap-3 px-3 py-3 rounded-md text-sm transition-colors ${
                    isActive
                      ? "text-foreground bg-surface font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-surface/60"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full shrink-0 transition-colors ${
                      isActive ? "bg-primary" : "bg-transparent"
                    }`}
                  />
                  {label}
                </a>
              );
            })}
          </nav>

          {/* Mobile sheet Book CTA */}
          <div className="px-6 py-6 border-t border-hairline/40">
            <Button
              id="mobile-sheet-book-btn"
              className="w-full gap-2"
              onClick={() => {
                setMenuOpen(false);
                openSheet();
              }}
            >
              Book a session
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* ── Sticky mobile bottom CTA bar ───────────────────────── */}
      {/* Hidden when booking sheet is open to avoid overlap */}
      <div
        aria-hidden={!pastHero || sheetOpen}
        className={`fixed bottom-0 inset-x-0 z-40 md:hidden motion-safe:transition-transform motion-safe:duration-300 ${
          pastHero && !sheetOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="bg-background/95 backdrop-blur-md border-t border-hairline/40 px-4 py-3 flex items-center gap-3">
          <Button
            id="sticky-bar-book-btn"
            className="flex-1 gap-2"
            onClick={() => openSheet()}
          >
            Book
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="border-hairline/60 text-muted-foreground"
            asChild
          >
            <a href="#schedule">Schedule</a>
          </Button>
        </div>
      </div>
    </>
  );
}
