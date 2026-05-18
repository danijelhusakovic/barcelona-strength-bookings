# Alex Moreno — Personal Trainer Site

Single-page, mobile-first, frontend only. Booking CTAs are demo buttons (non-functional, styled as primary actions).

## Design system

- **Palette** (warm charcoal + ember), defined in `src/styles.css` as oklch tokens:
  - `--background` #141210 (deep warm charcoal)
  - `--card` / elevated surface #262320
  - `--border` / muted line #4a4540
  - `--primary` (ember/orange) #e8541c — used sparingly: primary CTAs, availability dots, active states, key numerals
  - `--foreground` near-white, `--muted-foreground` warm grey
- **Typography**: Inter (body) + Space Grotesk (display) via Google Fonts. Tight tracking on headlines, generous line-height on body. Strong scale jumps (e.g. 14 / 16 / 20 / 32 / 56 / 80).
- **Layout**: 12-col grid, generous whitespace, sharp corners on schedule cells (radius 4px), softer 12px on cards. No gradients, no glow, no decorative motion — restrained fades only.
- **Tone**: calm authority. Copy is short, declarative, no exclamation marks, no "transform your life" language.

## Page structure

Single route: `src/routes/index.tsx` composing section components from `src/components/sections/`.

### 1. Hero (`HeroSection.tsx`)
- Full-viewport, asymmetric split: left = copy, right = full-bleed Unsplash photo (athlete training, warm tone).
- H1: "Stronger every week. Without guesswork." (outcome-driven)
- One-line support: "Structured strength & conditioning for busy professionals — indoors and across Barcelona."
- Primary button (ember): "Book Your Session" → scrolls to schedule
- Secondary text link with arrow: "View Schedule" → scrolls to schedule
- Minimal top nav: wordmark left, anchor links right (Schedule · Coach · Logistics)

### 2. Schedule (`ScheduleSection.tsx`) — visual anchor
- Renders like a real timetable, not a marketing block.
- Desktop: 6-column grid (Mon–Sat), time rows on the left axis.
- Mobile: stacked day-by-day accordion, default open = today.
- Each cell shows: class name · focus tag (Strength / Conditioning / Mobility) · location pill (Studio / Outdoor) · duration · availability indicator (ember dot = open, hollow = full) · "Book" button.
- Mock week data lives in `src/data/schedule.ts` — realistic 6am–8pm spread, mix of studio (Poblenou) and outdoor (Ciutadella, Barceloneta, Montjuïc).
- Filter chips above: All · Studio · Outdoor · Strength · Conditioning · Mobility.

### 3. Trust / Coach (`CoachSection.tsx`)
- Two-column: portrait left, content right.
- Name, role, location line.
- 3 credibility bullets (icon + one line each): years coaching, methodology, retention/consistency.
- Below: 2×2 image grid — studio interior, outdoor park session, beach training, urban stairs.

### 4. Social proof (`TestimonialsSection.tsx`)
- 3 short testimonials in a row (stack on mobile). Each: 1–2 line quote, first name, age, profession.
- Below: horizontal scrolling strip of community photos (studio + outdoor).

### 5. Logistics (`LogisticsSection.tsx`)
- 5-block grid: Base location · Outdoor spots · Session length · What to bring · Who it's for.
- Each block: small label, one short line. Almost spec-sheet aesthetic.

### 6. Final CTA (`BookingCtaSection.tsx`)
- Full-width charcoal band, large display headline, single ember "Book Your Session" button.
- Footer below: wordmark, location, year, social icons (Instagram, WhatsApp) — non-functional.

## Technical

- Stack: TanStack Start, Tailwind v4, shadcn (Button, Badge, Tabs, Accordion).
- Files to create:
  - `src/styles.css` — replace tokens with new warm-charcoal + ember palette, add font imports
  - `src/routes/index.tsx` — composes sections, sets `<head>` (title, meta description, og)
  - `src/components/sections/{Hero,Schedule,Coach,Testimonials,Logistics,BookingCta,SiteNav,SiteFooter}.tsx`
  - `src/data/schedule.ts` — typed mock week (Mon–Sat × ~4–5 slots/day)
  - `src/data/testimonials.ts`
- All booking buttons are demo (`<button>` with no handler, or anchor to `#schedule` for hero CTAs).
- Images: Unsplash hotlinks with `loading="lazy"`, `width`/`height` set, descriptive alt text.
- SEO: H1 unique, meta title <60 chars ("Alex Moreno — S&C Coach, Barcelona"), meta description <160 chars, single H1, semantic `<section>` with aria-labels.
- Mobile-first: schedule reflows to accordion, hero stacks, nav collapses to wordmark + anchor to schedule.

## Out of scope (per brief)

No pricing, no forms, no email capture, no blog, no motivational copy, no backend.
