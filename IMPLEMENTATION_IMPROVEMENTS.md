# Frontend implementation plan

Implementation checklist for all frontend improvements from the UX brainstorm, **excluding replacement of stock photography with real assets**. Current Unsplash URLs stay as-is; image work here is limited to attributes (`sizes`, `loading`, alt text) and optional CSS overlays (vignette/duotone).

**Stack:** TanStack Start, React 19, Tailwind v4, shadcn/ui in `src/components/ui/`.

**Primary files:** `src/components/sections/*`, `src/routes/index.tsx`, `src/routes/__root.tsx`, `src/styles.css`.

---

## Out of scope

- [ ] *(intentionally excluded)* Swap hero, coach portrait, gallery, or testimonial strip for real photography
- [ ] *(intentionally excluded)* WebP/AVIF export pipeline for new asset files

---

## Master progress

Track overall completion at a glance. Check a box when **all** sub-items in that phase are done.

| Phase | Focus | Status |
|-------|--------|--------|
| [x] **0** | Foundations (fonts, tokens, skip link, scroll-margin) | |
| [x] **1** | Navigation (mobile menu, scroll-spy, sticky bar) | |
| [x] **2** | Booking UX (sheet, toasts, CTAs, waitlist UI) | |
| [x] **3** | Schedule (mobile layout, split filters, next-available) | |
| [x] **4** | Content & conversion (pricing, how-it-works, hero CTAs) | |
| [ ] **5** | Social proof & logistics (testimonials, maps, footer) | |
| [ ] **6** | Visual polish (shadcn adoption, section rhythm, motion) | |
| [ ] **7** | Meta, i18n, content order (optional / larger) | |

---

## Phase 0 — Foundations

**Goal:** Fix build warnings, global a11y baseline, and anchor scrolling before layering features.

**Files:** `src/styles.css`, `src/routes/__root.tsx`, `src/routes/index.tsx`

### 0.1 Font loading

- [x] Remove Google Fonts `@import` from `src/styles.css` (fixes PostCSS “@import must precede” warning)
- [x] Add `preconnect` to `fonts.googleapis.com` and `fonts.gstatic.com` in `__root.tsx`
- [x] Add `<link>` stylesheets for Inter + Space Grotesk in document `<head>`
- [x] Verify fonts still apply via `--font-sans` / `--font-display` in `@theme`
- [x] Confirm no layout shift regression on first paint (manual check in devtools)

### 0.2 Skip link & main landmark

- [x] Add “Skip to main content” as first focusable element in `index.tsx` (or `__root.tsx` body)
- [x] Ensure `<main>` has `id="main-content"` (or matching target)
- [x] Style skip link: visually hidden until `:focus-visible`

### 0.3 Scroll margin for hash targets

- [x] Add `scroll-margin-top` (≥ `4rem` / nav height) on `#schedule`, `#coach`, `#logistics`
- [x] Add `id` on testimonials section if linked from nav (`#testimonials`)
- [x] Smoke-test: each nav anchor lands with heading fully visible below fixed header

### 0.4 Image attributes (existing URLs only)

- [x] Add meaningful `sizes` on hero image (`HeroSection.tsx`)
- [x] Add `sizes` on coach portrait and gallery tiles (`CoachSection.tsx`)
- [x] Add `sizes` on testimonial strip images (`TestimonialsSection.tsx`)
- [x] Keep `loading="eager"` on hero LCP image; lazy elsewhere
- [x] Improve testimonial strip `alt` text (unique per image, not repeated “Community training”)

---

## Phase 1 — Navigation

**Goal:** Full section access on mobile; clear “where am I” while scrolling.

**Files:** `src/components/sections/SiteNav.tsx`, new hook optional `src/hooks/use-scroll-spy.ts`, `src/components/sections/TestimonialsSection.tsx` (add `id`)

### 1.1 Mobile menu (sheet)

- [x] Import shadcn `Sheet` (+ `Button` for trigger) in `SiteNav.tsx`
- [x] Add menu icon button visible below `md`, hidden at `md+`
- [x] Sheet contents: Schedule, Coach, Testimonials, Logistics, Book CTA
- [x] Close sheet on anchor click / route unchanged
- [x] Trap focus and restore on close (Sheet default behavior)
- [x] `aria-label` on menu trigger; `aria-expanded` tied to open state

### 1.2 Desktop nav updates

- [x] Add “Testimonials” link to desktop nav (parity with mobile)
- [x] Use consistent anchor hrefs: `#schedule`, `#coach`, `#testimonials`, `#logistics`

### 1.3 Scroll-spy active state

- [x] Implement `IntersectionObserver` (hook or inline) for section ids
- [x] Apply active styles on matching nav link (`text-foreground`, optional underline/dot)
- [x] Debounce or use `rootMargin` so fixed header doesn’t flicker active state
- [x] Works for both desktop links and mobile sheet links (if sheet closed)

### 1.4 Sticky mobile CTA bar (optional)

- [x] Show fixed bottom bar after user scrolls past hero (`useScroll` or intersection)
- [x] Bar content: “Book” (primary) + “Schedule” (secondary) or single Book
- [x] Respect safe-area-inset-bottom; don’t overlap sheet or footer
- [x] Hide when booking sheet open; respect `prefers-reduced-motion` for enter/exit

---

## Phase 2 — Booking UX (demo flow)

**Goal:** “Book” feels like a product step, not a dead anchor.

**Files:** new `src/components/booking/BookingSheet.tsx` (or under `sections/`), `ScheduleSection.tsx`, `HeroSection.tsx`, `BookingCtaSection.tsx`, `SiteNav.tsx`, `src/routes/index.tsx` (mount `Toaster`)

### 2.1 Global toast setup

- [x] Mount `Toaster` from `src/components/ui/sonner.tsx` in `index.tsx` or `__root.tsx`
- [x] Theme to match ember palette (dark background)

### 2.2 Booking sheet component

- [x] Create controlled `BookingSheet` using shadcn `Sheet` (side: bottom on mobile, right on `md+` if desired)
- [x] Props: `open`, `onOpenChange`, `slot: Slot | null` (from `@/data/schedule`)
- [x] Display: day, time, session name, focus, location, place, duration
- [x] Actions: primary “Confirm booking” (demo), secondary “Change slot” (closes sheet)
- [x] On confirm: `toast.success` with demo copy (e.g. “Slot held for 10 minutes — demo only”)
- [x] Empty state if opened without slot (e.g. from nav “Book”): prompt to pick from schedule

### 2.3 Wire slot cards

- [x] Open `BookingSheet` with selected slot on open-slot “Book” click
- [x] Replace raw `<button>` with shadcn `Button` where appropriate
- [x] Full slots: keep disabled; add `aria-disabled="true"`

### 2.4 Full-slot waitlist UI (frontend only)

- [x] On disabled Book: shadcn `Tooltip` — “Full — join waitlist (demo)”
- [x] Optional: waitlist button opens sheet in waitlist mode (email field mock, no submit)

### 2.5 Global CTAs

- [x] Nav “Book”: open sheet without slot **or** scroll to `#schedule` + highlight first open slot (pick one behavior, document in code comment)
- [x] Hero “Book Your Session”: same as nav Book behavior
- [x] Hero “View schedule”: scroll to `#schedule` only (no sheet); consider `scroll-margin` already applied
- [x] Bottom CTA “Book Your Session”: align with nav Book behavior
- [ ] Optional: URL param `?book=1` opens sheet on load (shareable demo)

### 2.6 Highlight first open slot (optional enhancement)

- [ ] When landing on schedule from “Book”, briefly pulse or ring first open `SlotCard`
- [ ] Respect `prefers-reduced-motion` (use border color change instead of animation)

---

## Phase 3 — Schedule improvements

**Goal:** Usable timetable on phones; clearer filtering.

**Files:** `ScheduleSection.tsx`, `src/data/schedule.ts` (helpers only if needed)

### 3.1 Split filters

- [x] Replace single `Filter` union with separate `locationFilter` and `focusFilter` (each: `All` | specific)
- [x] UI: two labeled rows — “Location” (All, Studio, Outdoor) and “Focus” (All, Strength, Conditioning, Mobility)
- [x] `useMemo` filtered list: apply both filters (AND logic)
- [x] Update open-slot count to respect both filters
- [x] Active chip styles match existing ember primary pattern

### 3.2 Mobile day navigation

Pick **one** pattern (recommended: **day tabs**):

**Option A — Day tabs (recommended)**

- [x] Horizontal tab list Mon–Sat above slot grid (`md` and below)
- [x] State: `selectedDay`; show only that day’s cards
- [x] Desktop (`lg+`): keep existing 6-column week grid OR retain tabs for consistency

**Option B — Accordion**

- [ ] shadcn `Accordion` one item per day; default expand today or first day with open slots

- [x] Implement chosen option (Option A — Day tabs)
- [x] Preserve filter behavior within selected day / accordion panel

### 3.3 “Next available” chip

- [x] Compute nearest open slot from `SCHEDULE` (by day order + time)
- [x] Chip/button near section header: “Next: Tue 07:00 — Park Intervals”
- [x] Click: set day tab / scroll to card / open booking sheet for that slot
- [x] Hide chip when no open slots in filtered set

---

## Phase 4 — Content & conversion

**Goal:** Reduce bounce for cold traffic; clarify path to booking.

**Files:** new `src/components/sections/HowItWorksSection.tsx` (optional), `HeroSection.tsx`, `src/routes/index.tsx`, copy constants optional `src/data/site-copy.ts`

### 4.1 Pricing / first-session line (hero)

- [x] Add one line under hero subcopy (placeholder copy OK): e.g. “From €XX / session · packages available”
- [x] Style: `text-sm text-muted-foreground`; don’t compete with primary CTA
- [ ] Confirm final € amounts with stakeholder before launch

### 4.2 “How it works” section (optional but planned)

- [x] New section: 3 steps — Pick a slot → Show up → Program starts
- [x] Place **between** `HeroSection` and `ScheduleSection` in `index.tsx`
- [x] Match eyebrow + `font-display` heading pattern
- [x] Mobile: stack; desktop: 3-column grid
- [x] No backend; static copy only

### 4.3 Hero CTA & stats refinement

- [x] Differentiate Book vs View schedule (see Phase 2.5)
- [x] Reduce stats row to **one** hero stat + link “See credentials” → `#coach`
- [x] Remove or soften duplicate stats that repeat coach section

### 4.4 Content order (decision + implement)

Choose one layout and implement in `index.tsx`:

- [ ] **Default:** Keep current order (Hero → Schedule → Coach → …)
- [ ] **Alt A:** Hero → Coach → Schedule → Testimonials → Logistics → CTA
- [x] **Alt B:** Hero → How it works → Schedule → Coach → Testimonials → Logistics → CTA *(chosen)*
- [ ] **Alt C:** Hero → Logistics → Schedule → Coach → …

Document chosen order in a one-line comment at top of `index.tsx`.

---

## Phase 5 — Social proof & logistics

**Goal:** Stronger trust signals and actionable location info (no new photos).

**Files:** `TestimonialsSection.tsx`, `src/data/testimonials.ts`, `LogisticsSection.tsx`, `BookingCtaSection.tsx` (`SiteFooter`)

### 5.1 Testimonials

- [ ] Add `id="testimonials"` and ensure nav links work (Phase 1)
- [ ] Add avatar placeholders: initials in circle or generic `Avatar` component (no real photos required)
- [ ] Optional outcome line under quote (static in `testimonials.ts`): e.g. “+40 kg deadlift in 6 months”
- [ ] Tighten section vertical padding vs other sections (`py-20` vs `py-32`) per design pass
- [ ] Mobile: consider shadcn `Carousel` for quotes OR keep 3-column stack with smaller gap

### 5.2 Testimonial photo strip

- [ ] Unique `alt` per strip image (describe scene, not duplicate string)
- [ ] Add scroll hint on mobile: “Swipe” label or snap-scroll dots (no auto-marquee unless Phase 6)
- [ ] Optional: `prefers-reduced-motion` disables marquee if added later

### 5.3 Logistics → maps

- [ ] “Open in Maps” link for Poblenou studio address (Google Maps URL with encoded address)
- [ ] Optional: static map thumbnail linking to same URL (still Unsplash or simple placeholder tile — not a new photo shoot)
- [ ] Outdoor locations: text list + optional per-location map links
- [ ] External links: `rel="noopener noreferrer"`, `target="_blank"`

### 5.4 Footer

- [ ] Replace `href="#"` on Instagram and WhatsApp with real URLs **or** remove links until URLs exist
- [ ] If removed, show plain text labels or “Coming soon” without fake `#` links
- [ ] Verify copyright year still dynamic

---

## Phase 6 — Visual polish & motion

**Goal:** Consistent components, subtle depth, restrained motion.

**Files:** `src/styles.css`, all section components, optional `src/components/ui/*`

### 6.1 shadcn component adoption

- [ ] Replace repeated CTA class strings with `Button` (`variant="default" | "outline" | "ghost"`)
- [ ] Replace filter chips with `Button` `variant="outline"` + `size="sm"` or custom toggle group
- [ ] Ensure all interactive elements get `focus-visible:ring-2 ring-ring` via Button defaults
- [ ] Do **not** import chart, sidebar, or other unused heavy UI into sections

### 6.2 Section rhythm & surfaces

- [ ] Apply alternating `bg-surface` / `bg-background` on select sections (e.g. schedule, logistics)
- [ ] Use `--surface-2` for elevated cards if needed (slot cards already use `bg-surface`)
- [ ] Tighten testimonials padding; preserve large CTA section (`BookingCtaSection`)
- [ ] Differentiate heading scale only where needed (avoid changing every section)

### 6.3 Secondary accent token

- [ ] Add CSS variable e.g. `--accent-secondary` (warm sand / muted gold) in `:root` + `@theme`
- [ ] Map to Tailwind utility e.g. `text-accent-secondary` or `bg-badge`
- [ ] Use for focus labels and badges only — **not** primary CTAs (keep ember exclusive for Book)

### 6.4 Hero image treatment (CSS only)

- [ ] Stronger bottom vignette or duotone overlay using brand oklch (no new image file)
- [ ] Hero pulse dot: wrap in `@media (prefers-reduced-motion: no-preference)` or replace with static dot

### 6.5 Motion

- [ ] Section header scroll-in: optional `opacity` + `translate-y` on first intersection (headers only)
- [ ] Global: disable decorative motion when `prefers-reduced-motion: reduce`
- [ ] Testimonial strip: if marquee added, pause on hover/focus; no marquee under reduced-motion

---

## Phase 7 — Meta, accessibility extras, i18n (larger / optional)

**Goal:** SEO/social completeness and optional bilingual UI.

**Files:** `src/routes/index.tsx`, `src/routes/__root.tsx`, new `src/i18n/*` if pursued

### 7.1 Meta & social

- [ ] Add `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- [ ] Add `og:locale` (`en_ES` or `en_US` as appropriate)
- [ ] Add canonical URL placeholder (env-based or static for production domain)
- [ ] Consider `theme-color` meta matching `--background`

### 7.2 Accessibility audit pass

- [ ] Keyboard-only walk: nav → sheet → schedule filters → book → confirm → toast
- [ ] Screen reader: landmarks (`header`, `main`, `footer`), headings hierarchy (single `h1` in hero)
- [ ] Color contrast check on `muted-foreground` and hairline borders (WCAG AA)
- [ ] Full-slot tooltips reachable via keyboard (TooltipTrigger focusable)

### 7.3 EN / ES toggle (optional)

- [ ] Create `src/i18n/en.json` + `src/i18n/es.json` for nav, hero, section headings, CTAs
- [ ] React context or simple `useState` locale in `index.tsx`
- [ ] Toggle control in footer or nav
- [ ] Update `<html lang>` dynamically in `__root.tsx` or route head
- [ ] Localized meta description per locale (static switch, no backend)

---

## Suggested implementation order

Work through phases **0 → 6** sequentially; phase **7** can run in parallel or last.

```text
0 Foundations
  ↓
1 Navigation          ← unblocks mobile testing of everything else
  ↓
2 Booking UX          ← highest perceived product value
  ↓
3 Schedule            ← depends lightly on 2 (sheet opens from slots)
  ↓
4 Content             ← copy/stakeholder input for pricing
  ↓
5 Social + logistics
  ↓
6 Visual polish       ← best done after structure stable
  ↓
7 Meta / i18n         ← optional
```

---

## Definition of done (whole initiative)

- [ ] All phase checklists above completed (except out-of-scope photography)
- [ ] `npm run dev` runs without PostCSS font `@import` warning
- [ ] Mobile: menu, schedule day UI, and booking sheet usable end-to-end
- [ ] Desktop: scroll-spy, split filters, booking sheet from slot card
- [ ] No `href="#"` placeholder social links in production config
- [ ] Lighthouse spot-check: a11y no regressions; LCP still acceptable with current images

---

## Quick reference — files to touch

| Area | Files |
|------|--------|
| Page composition | `src/routes/index.tsx` |
| Document shell | `src/routes/__root.tsx` |
| Tokens / global CSS | `src/styles.css` |
| Nav | `src/components/sections/SiteNav.tsx` |
| Hero | `src/components/sections/HeroSection.tsx` |
| Schedule | `src/components/sections/ScheduleSection.tsx`, `src/data/schedule.ts` |
| Coach | `src/components/sections/CoachSection.tsx` |
| Testimonials | `src/components/sections/TestimonialsSection.tsx`, `src/data/testimonials.ts` |
| Logistics | `src/components/sections/LogisticsSection.tsx` |
| CTA / footer | `src/components/sections/BookingCtaSection.tsx` |
| New | `src/components/booking/BookingSheet.tsx`, `src/components/sections/HowItWorksSection.tsx`, `src/hooks/use-scroll-spy.ts` (optional) |
| UI primitives | `src/components/ui/button.tsx`, `sheet.tsx`, `sonner.tsx`, `tooltip.tsx`, `tabs.tsx` or `accordion.tsx` |

---

## Notes for implementers

- **Stakeholder copy:** Pricing € amounts, WhatsApp/Instagram URLs, and final “how it works” wording need owner input before marking Phase 4.1 / 5.4 complete.
- **Demo labeling:** Any booking confirm or waitlist action should say “demo” in UI or toast to avoid false expectations.
- **Content order:** If Alt A/B/C is chosen in Phase 4.4, re-test scroll-spy section ids and mobile menu order.
- **Real assets later:** When photography is ready, swap `src` URLs only — `sizes` and layout from Phase 0.4 should carry over.
