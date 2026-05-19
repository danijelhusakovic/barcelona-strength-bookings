# Implementation plan: robust metadata & vendor cleanup

SEO, social link previews, browser chrome, and removal of **user-visible** scaffold branding. Stack: TanStack Start; global head in [`src/routes/__root.tsx`](src/routes/__root.tsx), page meta in [`src/routes/index.tsx`](src/routes/index.tsx).

**Head ownership:** Root = charset, viewport, theme-color, icons, fonts, fallback title. Routes = title, description, robots, canonical, `og:*`, `twitter:*`, JSON-LD.

**Automated repo check:** `npm run verify:meta`

---

## Master checklist

| Phase | Topic | Code in repo | Manual / deploy |
|-------|--------|:------------:|:-----------------:|
| [x] **A** | Audit tool/vendor strings | Done | — |
| [x] **B** | Remove user-visible Lovable copy | Done | — |
| [x] **C** | Head architecture (root vs routes) | Done | — |
| [x] **D** | Core HTML / SEO meta | Done | — |
| [x] **E** | Open Graph (full set + hosted image) | Done | — |
| [x] **F** | Twitter / X Card tags | Done | — |
| [x] **G** | Icons, theme-color, web manifest | Done | — |
| [x] **H** | JSON-LD structured data | Done | — |
| [x] **I** | OG image asset (`public/og/default.png`) | Done | — |
| [x] **K** | Env-specific robots + `VITE_SITE_URL` | Done | — |
| [ ] **J** | Post-deploy verification | — | **You** (after redeploy) |

**Production deploy note:** As of last check, [https://barcelona-strength-bookings-dusky.vercel.app/](https://barcelona-strength-bookings-dusky.vercel.app/) may still serve an **older build** (e.g. Unsplash `og:image`, no `twitter:card`). **Redeploy** after merging metadata changes, then complete Phase J.

---

## Phase A — Audit

### A.1 Search targets

- [x] `Lovable`, `lovable`, `@lovable` in `src/` — **none in rendered routes**
- [x] `bolt`, `Bolt`, `bolt.new` — **none in source**
- [x] `tanstack_start_ts` — renamed to `barcelona-strength-bookings` in `package.json`
- [x] Placeholder titles (`Lovable App`, `Generated Project`) — **none in source**

### A.2 Current locations (verified)

| Location | Status | Notes |
|----------|--------|--------|
| `src/routes/__root.tsx` | [x] Clean | Global tags only; `SITE.name` fallback title |
| `src/routes/index.tsx` | [x] Complete | Full SEO, OG, Twitter, canonical, JSON-LD |
| `src/lib/site-meta.ts` | [x] Exists | Single source of truth |
| `vite.config.ts` | [x] Neutral comment | Build import `@lovable.dev/vite-tanstack-config` kept (not in HTML) |
| `package.json` / lockfiles | [x] Dev dep only | `@lovable.dev/*` not user-visible |
| `public/*` | [x] Clean | No scaffold strings |

### A.3 Verdict

- [x] No Lovable/Bolt in rendered `<head>` or UI copy in `src/`
- [x] Build-time Lovable packages remain (optional removal = separate refactor; see Optional follow-up)

---

## Phase B — Remove user-visible tool references

### B.1 Root route (`__root.tsx`)

- [x] No `Lovable App` title
- [x] No Lovable `description` / `author` / `og:*` / `twitter:*`
- [x] No `@Lovable` `twitter:site`
- [x] Marketing meta owned by child routes only

### B.2 Comments & UI

- [x] `vite.config.ts` comment reworded (no `@lovable.dev` product pitch)
- [x] `src/**/*.tsx` scanned — no Lovable in UI strings

### B.3 Repo hygiene

- [x] `package.json` `name` → `barcelona-strength-bookings`
- [x] [`README.md`](README.md) added

---

## Phase C — Head architecture

- [x] Option 1 implemented: root = global; index = marketing
- [x] Ownership comments in `__root.tsx` and `index.tsx` `head()`
- [x] No duplicate `og:title` / marketing tags in root
- [x] 404/error use root fallback title (`SITE.name`)

---

## Phase D — Core HTML / SEO

### D.1 Required tags (`index.tsx` + `site-meta.ts`)

- [x] `<title>` — `SITE.title`
- [x] `<meta name="description">` — `SITE.description`
- [x] `<link rel="canonical">` — `SITE.origin`
- [x] `<meta name="robots">` — `index,follow` on prod; `noindex,nofollow` on preview (`VITE_VERCEL_ENV`)
- [x] `<meta name="referrer">` — `strict-origin-when-cross-origin`
- [x] `<html lang="en">` in `__root.tsx` shell

### D.2 Optional / deferred

- [ ] `hreflang` alternates — **deferred** until Spanish locale
- [x] [`public/robots.txt`](public/robots.txt) — `Allow: /` + `Sitemap:` line
- [x] [`public/sitemap.xml`](public/sitemap.xml) — single URL (update `<loc>` when custom domain)

---

## Phase E — Open Graph

- [x] `og:type` = `website`
- [x] `og:site_name` = `SITE.name`
- [x] `og:locale` = `SITE.locale` (`en_GB`)
- [x] `og:url` = `SITE.origin` (absolute)
- [x] `og:title` = `SITE.title`
- [x] `og:description` = `SITE.descriptionShort`
- [x] `og:image` = `SITE.ogImage` → `{origin}/og/default.png` (absolute)
- [x] `og:image:width` = `1200`
- [x] `og:image:height` = `630`
- [x] `og:image:alt` = `SITE.ogImageAlt`
- [ ] Scrape in [Meta Sharing Debugger](https://developers.facebook.com/tools/debug/) — **Phase J, after deploy**

---

## Phase F — Twitter / X Card

- [x] `twitter:card` = `summary_large_image`
- [x] `twitter:title` = `SITE.title`
- [x] `twitter:description` = `SITE.descriptionShort`
- [x] `twitter:image` = `SITE.ogImage`
- [x] `twitter:image:alt` = `SITE.ogImageAlt`
- [x] No fake `twitter:site` (`twitterHandle` undefined → tag omitted)
- [ ] Validate card on production URL — **Phase J, after deploy**

---

## Phase G — Icons & browser chrome

### G.1 Favicons

- [x] [`public/favicon.svg`](public/favicon.svg)
- [x] [`public/favicon-32.png`](public/favicon-32.png) — via `npm run icons`
- [x] [`public/apple-touch-icon.png`](public/apple-touch-icon.png)
- [x] [`public/icons/icon-192.png`](public/icons/icon-192.png) + `icon-512.png`
- [x] Links in `__root.tsx`: SVG, 32px PNG, apple-touch-icon

### G.2 Theme

- [x] `<meta name="theme-color" content="#141210">` (matches brand background)

### G.3 Web manifest

- [x] [`public/site.webmanifest`](public/site.webmanifest)
- [x] `<link rel="manifest" href="/site.webmanifest">` in `__root.tsx`

---

## Phase H — JSON-LD

- [x] `@type`: `Person` + `LocalBusiness`
- [x] Fields: `name`, `jobTitle`, `description`, `url`, `image`, `address`, `areaServed`
- [x] `sameAs` array (empty until real profile URLs added)
- [x] Injected via `head()` `scripts` in `index.tsx`
- [ ] [Google Rich Results Test](https://search.google.com/test/rich-results) — **Phase J, after deploy**

### H.1 Optional content (when URLs exist)

- [ ] Add Instagram URL to `sameAs` in `index.tsx`
- [ ] Add other social URLs to `sameAs`

---

## Phase I — OG image asset

- [x] Branded PNG at [`public/og/default.png`](public/og/default.png) (1200×630)
- [x] `SITE.ogImage` points to on-domain absolute URL
- [x] Width/height meta tags set

---

## Phase J — Post-deploy verification (manual)

Complete **after** redeploying to production. Set **`VITE_SITE_URL`** in Vercel → Production environment variables.

- [ ] View `<head>` in DevTools on production `/` — expect canonical, full OG, Twitter, JSON-LD, favicon links, **no** Lovable
- [ ] Confirm `og:image` is `…/og/default.png` (not Unsplash)
- [ ] Confirm `theme-color` is `#141210`
- [ ] [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) — scrape URL
- [ ] LinkedIn Post Inspector — paste URL
- [ ] Slack or Discord — paste link; confirm card image/title
- [ ] Mobile share sheet spot-check
- [ ] View page source — grep for `Lovable` (should be absent)

---

## Phase K — Environment behavior

- [x] `vite.config.ts` injects `import.meta.env.VITE_VERCEL_ENV` from `VERCEL_ENV`
- [x] `SITE.isProduction` true only when `VITE_VERCEL_ENV === "production"`
- [x] Preview builds: `robots: noindex, nofollow`
- [x] Production builds: `robots: index, follow`
- [x] `SITE.origin` from `VITE_SITE_URL` (see [`.env.example`](.env.example))
- [ ] Set `VITE_SITE_URL` in Vercel production env to canonical domain — **dashboard step**

---

## Definition of done

### Code (repo) — complete

- [x] No Lovable/scaffold strings in `src/` routes’ `<head>`
- [x] Canonical + `og:url` + full OG set + hosted `og:image`
- [x] Twitter `summary_large_image` + aligned image; no fake `@` handle
- [x] Favicons + manifest + theme-color
- [x] `npm run verify:meta` passes

### Production — pending your deploy + Phase J

- [ ] Redeploy with latest commit
- [ ] Phase J checklist completed on live URL
- [ ] JSON-LD validated in Rich Results Test

---

## Optional follow-up (out of scope)

- [ ] Replace `@lovable.dev/vite-tanstack-config` with hand-rolled Vite config (large refactor)
- [ ] Spanish locale + `hreflang`
- [ ] Dynamic `sitemap.xml` when multiple routes exist
- [ ] `favicon.ico` multi-size (optional; SVG + PNG fallback sufficient)

---

## File reference

| Artifact | Path |
|----------|------|
| Constants | [`src/lib/site-meta.ts`](src/lib/site-meta.ts) |
| Global head | [`src/routes/__root.tsx`](src/routes/__root.tsx) |
| Homepage head + JSON-LD | [`src/routes/index.tsx`](src/routes/index.tsx) |
| OG image | [`public/og/default.png`](public/og/default.png) |
| Regenerate PNG icons | `npm run icons` |
| Verify repo implementation | `npm run verify:meta` |
| Env template | [`.env.example`](.env.example) |
