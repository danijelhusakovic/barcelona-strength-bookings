import { Link } from "@tanstack/react-router";

export function SiteNav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-hairline/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-base font-semibold tracking-tight">
          ALEX<span className="text-primary">.</span>MORENO
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#schedule" className="hover:text-foreground transition-colors">Schedule</a>
          <a href="#coach" className="hover:text-foreground transition-colors">Coach</a>
          <a href="#logistics" className="hover:text-foreground transition-colors">Logistics</a>
        </nav>
        <a
          href="#schedule"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Book
        </a>
      </div>
    </header>
  );
}
