# Implementation plan: robust metadata & vendor cleanup

Single document for **SEO**, **social / link previews**, **browser chrome**, and **removing user-facing references** to scaffolding tools (Lovable, etc.). This repo is **TanStack Start** + file routes; global defaults live in [`src/routes/__root.tsx`](src/routes/__root.tsx), page-specific meta in [`src/routes/index.tsx`](src/routes/index.tsx) (and future routes).

**Do not ship conflicting `<head>` tags.** Root and child routes both define meta today; crawlers and platforms may pick the wrong duplicate. This plan standardizes on **one source of truth** per concern (see §4).

---

## Goals

| Goal | Success criteria |
|------|------------------|
| **Link previews** | Consistent title, description, and image on major platforms (see §7). |
| **SEO** | Accurate title/description, canonical URL, language; no template placeholders. |
| **Brand** | No “Lovable App”, `@Lovable`, or other scaffold branding in **rendered HTML** or **public repo copy** where avoidable. |
| **Maintainability** | Centralized constants (URL, site name, default OG image path) for prod vs preview. |

---

## Master checklist

Track overall progress.

| Phase | Topic | Done |
|-------|--------|------|
| [x] **A** | Audit: find and classify all tool/vendor strings | ✅ 2026-05-18 |
| [x] **B** | Remove/replace **user-visible** Lovable meta & copy | ✅ 2026-05-18 |
| [ ] **C** | Head architecture: single strategy for root + routes | |
| [ ] **D** | Core HTML meta (title, description, lang, canonical, robots) | |
| [ ] **E** | Open Graph (full set + image asset) | |
| [ ] **F** | Twitter / X Card tags | |
| [ ] **G** | Icons, theme-color, manifest (optional) | |
| [ ] **H** | Structured data JSON-LD (optional) | |
| [ ] **I** | Verification & regression checks | |

---

## Phase A — Audit (find everything)

Audit completed 2026-05-18. Results recorded below.

### A.1 Strings to find

- [x] `Lovable`, `lovable`, `@lovable` — see A.2 table below
- [x] `bolt`, `Bolt`, `bolt.new` — **zero hits** outside plan doc ✅
- [x] `tanstack_start_ts` — present in `package.json` + lock files (cosmetic, not HTML-visible)
- [x] Placeholder titles: `Lovable App`, `Generated Project` — **zero hits** in any source file ✅

### A.2 Audit findings (actual state)

| Location | Strings found | Severity | Action in later phases |
|----------|---------------|----------|------------------------|
| `src/routes/__root.tsx` | **None** — already cleaned; title is `"Barcelona Strength Bookings"`, charset, viewport, theme-color | ✅ Clean | Confirm child routes own marketing meta (Phase C). |
| `src/routes/index.tsx` | No Lovable strings; partial OG (`og:title`, `og:description`, Unsplash `og:image`) | ⚠️ Incomplete | Extend with full OG/Twitter, canonical, brand image (Phases D–F). |
| `vite.config.ts` line 1 | `// @lovable.dev/vite-tanstack-config already includes…` | ❌ Dev-visible comment | Phase B.2: reword to neutral. |
| `vite.config.ts` line 7 | `import { defineConfig } from "@lovable.dev/vite-tanstack-config"` | ℹ️ Build dep only | Keep — not exposed in rendered HTML. |
| `package.json` | `"name": "tanstack_start_ts"`; devDep `@lovable.dev/vite-tanstack-config` | ⚠️ Optional | Phase B.3: rename `name` field. Dep not HTML-visible. |
| `bunfig.toml` | `minimumReleaseAgeExcludes = ["@lovable.dev/vite-tanstack-config"]` | ℹ️ Dev-only | Not user-visible; leave unless removing dep entirely. |
| `bun.lock` / `package-lock.json` | `@lovable.dev/*` and `lovable-tagger` lock entries | ℹ️ Auto-generated | No hand-editing; auto-updated by package manager. |
| `src/**/*.tsx` (all files) | **Zero matches** for `lovable`, `bolt`, `Lovable App`, `Generated Project` | ✅ Clean | No action needed. |
| `public/` | No scaffold strings in static assets | ✅ Clean | No action needed. |

### A.3 Important distinction (avoid false expectations)

- **Removing “all references to Lovable” in dependencies** = replacing `@lovable.dev/vite-tanstack-config` with a hand-rolled or official TanStack+Vite config. That is a **large build refactor**, not a metadata task. This plan treats it as **optional follow-up** (§12).
- **Removing Lovable from what users and bots see** = **required** for this initiative. As of audit: the only remaining non-lockfile reference is the **`vite.config.ts` comment** on line 1. `__root.tsx` is already clean.

### A.4 Verdict

| Concern | Result |
|---------|--------|
| Lovable strings in rendered `<head>` | ✅ None — `__root.tsx` already cleaned |
| Lovable strings in `src/` UI code | ✅ None |
| Bolt strings anywhere in source | ✅ None |
| Placeholder titles in source | ✅ None |
| Remaining Lovable ref (non-HTML) | ✅ Fixed in Phase B.2 — `vite.config.ts` comment reworded |
| Generic `package.json` name | ✅ Renamed to `barcelona-strength-bookings` in Phase B.3 |

---

## Phase B — Remove user-visible tool references

### B.1 Root route meta ([`src/routes/__root.tsx`](src/routes/__root.tsx))

`__root.tsx` was already cleaned before this phase began (confirmed in Phase A audit).
All scaffold strings (`Lovable App`, `@Lovable`, Lovable OG tags) were absent.
Option 1 (minimal global tags only) is already implemented: `charset`, `viewport`, `theme-color`, fallback `title`.
Child routes own all marketing copy. No changes required here.

- [x] Remove or replace `{ title: "Lovable App" }` — **N/A**: already `"Barcelona Strength Bookings"`
- [x] Remove or replace `name="description"` Lovable string — **N/A**: no description in root (correct per Option 1)
- [x] Remove `name="author"` Lovable — **N/A**: no author tag present
- [x] Remove/replace `og:title`, `og:description` Lovable duplicates — **N/A**: no OG tags in root (correct)
- [x] Remove `twitter:site` → `@Lovable` — **N/A**: no twitter tags in root
- [x] Re-evaluate `twitter:card` — **N/A**: no twitter tags in root; card will be set per-route in Phase F

### B.2 Comments and developer-facing copy

- [x] [`vite.config.ts`](vite.config.ts): rewrote first comment block — removed `@lovable.dev` product pitch; now reads "Preconfigured Vite + TanStack Start stack. The bundled config already includes…"
- [x] Scan `src/**/*.tsx` for accidental "Lovable" in UI strings — **zero hits** confirmed in Phase A audit ✅

### B.3 Optional repo hygiene

- [x] [`package.json`](package.json) `"name"`: renamed from `tanstack_start_ts` to `barcelona-strength-bookings` ✅
- [x] [`README.md`](README.md): created with project description ✅

---

## Phase C — Head architecture (TanStack Start / Router)

### C.1 Problem

[`__root.tsx`](src/routes/__root.tsx) and [`index.tsx`](src/routes/index.tsx) both define overlapping `meta` entries. Merged output order can leave **stale duplicates** or wrong precedence for some consumers.

### C.2 Recommended approach

1. **Root (`__root.tsx`):** Only **global** tags: `charset`, `viewport`, default `language` / `html` `lang` (if not set on `<html>`), optional `theme-color`, **favicon links** (§8). Avoid marketing `title`/`description`/`og:*` here unless you intentionally want identical meta on every route (404, error pages included).
2. **Per-route (`index.tsx`, future routes):** Full **route-specific** `title`, `description`, `og:*`, `twitter:*`, `link rel="canonical"` where applicable.
3. **404 / error UI:** Ensure [`notFoundComponent`](src/routes/__root.tsx) and [`errorComponent`](src/routes/__root.tsx) do not rely on a misleading global `<title>` — set `head` on a dedicated not-found route if you add one, or accept root title for those edge pages.

### C.3 Checklist

- [ ] Document in code comment (one short block) which file owns which meta category.
- [ ] After edits, **View Page Source** on `/` and on a forced 404 (if testable) to confirm no Lovable strings remain.

---

## Phase D — Core HTML / SEO meta

Implement per canonical production URL (e.g. `https://barcelona-strength-bookings-dusky.vercel.app` or a custom domain once live). Prefer **environment variable** for base URL (e.g. `VITE_SITE_URL` or `SITE_URL` read at build time for static tags, or TanStack-supported pattern).

### D.1 Tags to add or fix

| Tag | Purpose | Notes |
|-----|---------|--------|
| `<title>` | Browser tab + SERP | Already good on index; ensure root does not override incorrectly. |
| `<meta name="description">` | SERP snippet | Align wording with OG description or slight variation. |
| `<link rel="canonical" href="...">` | Duplicate URL consolidation | **Strongly recommended** once final domain is fixed. |
| `<html lang="...">` | Accessibility + SEO | Currently `en`; use `en` or `es` / split later per product decision. |
| `<meta name="robots" content="index, follow">` | Default indexing | Explicit default; use `noindex` on staging/preview if needed. |
| `<meta name="referrer" content="strict-origin-when-cross-origin">` | Privacy | Optional. |

### D.2 Optional

- [ ] `hreflang` alternate links if you add Spanish locale.
- [ ] [`public/robots.txt`](public/robots.txt) — allow all, reference sitemap URL if you add sitemap.
- [ ] [`public/sitemap.xml`](public/sitemap.xml) or generated sitemap for multi-route future.

---

## Phase E — Open Graph (complete set)

Facebook, LinkedIn, Slack, Discord, WhatsApp, iMessage (often), and others read **Open Graph**.

### E.1 Minimum robust set

| Property | Example / intent |
|----------|------------------|
| `og:title` | Same or tighter than `<title>`. |
| `og:description` | 1–2 sentences; can match `meta description` with minor variation. |
| `og:type` | `website` for homepage. |
| `og:url` | **Canonical** page URL — reduces wrong-preview URL when shared with query strings. |
| `og:site_name` | e.g. `Alex Moreno` or brand legal name. |
| `og:image` | Absolute HTTPS URL to image (see §6). |
| `og:image:width` / `og:image:height` | Helps validators and some crawlers. |
| `og:image:alt` | Short description of image for accessibility. |
| `og:locale` | e.g. `en_US` or `en_ES` as appropriate. |

### E.2 Optional

- `og:locale:alternate` if bilingual.
- `article:*` only if you add blog posts.

### E.3 Checklist

- [ ] All `og:*` values use **absolute URLs** where required (`og:url`, `og:image`).
- [ ] Image is **≥ ~1200px** wide recommended for large previews; test in Meta Sharing Debugger after deploy.

---

## Phase F — Twitter / X Card tags

Twitter often uses dedicated tags; if missing, it may fall back to OG (behavior can change).

### F.1 Recommended set

| Tag | Notes |
|-----|--------|
| `twitter:card` | `summary_large_image` if you invest in a wide OG image; else `summary`. |
| `twitter:title` | Mirror `og:title` or shorter. |
| `twitter:description` | Mirror `og:description` or shorter. |
| `twitter:image` | Same URL as `og:image` (absolute). |
| `twitter:image:alt` | Same as `og:image:alt`. |

### F.2 Optional

- `twitter:site` — **only** if there is a real `@handle` for the business.
- `twitter:creator` — if personal brand handle differs from site.

### F.3 Checklist

- [ ] Remove placeholder `@Lovable` (Phase B).
- [ ] Validate with X’s card preview tooling (URLs change; search “Twitter card validator” or use X developer tools as available).

---

## Phase G — Icons, PWA, browser chrome

### G.1 Favicons & touch icons

- [ ] Add [`public/favicon.ico`](public/favicon.ico) (and/or `favicon.svg`).
- [ ] `<link rel="icon" href="/favicon.ico" sizes="any">` (or appropriate) in root `head` `links`.
- [ ] Optional: `apple-touch-icon` for iOS bookmarks.

### G.2 Theme

- [ ] `<meta name="theme-color" content="...">` aligned with `--background` or brand (dark charcoal).

### G.3 Optional PWA

- [ ] [`public/site.webmanifest`](public/site.webmanifest) with `name`, `short_name`, `icons`, `theme_color`, `background_color` — only if you want “Add to Home Screen” polish.

---

## Phase H — Structured data (JSON-LD) — optional

Improves rich results where Google supports them (not guaranteed).

- [ ] **`Person`** or **`LocalBusiness`** (or `SportsActivityLocation` if accurate) with name, image, area served (Barcelona), URL, sameAs (Instagram, etc. when real URLs exist).
- [ ] Inject a `<script type="application/ld+json">` in root or index route head (TanStack `head` API permitting) with **validated** JSON (Google Rich Results Test).

---

## Phase I — Social preview image (asset work)

Today `og:image` is an **Unsplash** URL. Robust branding usually means:

- [ ] **Hosted image** on your domain (e.g. `/og/default.png` in `public/`) or stable CDN — avoids third-party rate limits and gives full control.
- [ ] Design **~1200×630** (or platform-specific template) showing: wordmark, tagline, optional photo — matches dark brand.
- [ ] Compress (WebP or optimized PNG) for performance; keep **absolute URL** in meta.

---

## Phase J — Verification checklist (after implementation)

| Step | Tool / action |
|------|----------------|
| [ ] View rendered `<head>` | Browser DevTools → Elements → `<head>` on production URL. |
| [ ] Open Graph | [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) (Meta) — scrape after deploy. |
| [ ] LinkedIn | LinkedIn Post Inspector (URL may change). |
| [ ] Slack / Discord | Paste link in private channel; confirm card. |
| [ ] Mobile share sheet | iOS/Android share preview spot-check. |
| [ ] Grep production HTML | Confirm no `Lovable`, `bolt`, template `og:title` conflicts. |

---

## Phase K — Environment-specific behavior (staging vs production)

- [ ] **Production:** `index, follow`, canonical = prod domain, `og:url` = prod.
- [ ] **Preview deployments (Vercel):** Consider `noindex` for non-production hostnames to avoid duplicate SERP listings — implement via env branch in `head()` if TanStack/Vercel exposes `VERCEL_ENV` or similar.

---

## Suggested implementation order

1. **Phase A** — Audit (short).  
2. **Phase B** — Strip Lovable from `__root.tsx` head.  
3. **Phase C** — Decide root vs route ownership; refactor `head()` accordingly.  
4. **Phases D–F** — Canonical, full OG, Twitter.  
5. **Phase G** — Favicon + theme-color.  
6. **Phase I** — Branded `og:image` asset + point meta to it.  
7. **Phase H** — JSON-LD if desired.  
8. **Phase J** — Verify on live URL after deploy.

---

## Optional follow-up: remove `@lovable.dev` from dependencies

**Not required** for metadata or HTML cleanliness. Only needed if the goal is “no Lovable in `package.json` at all.”

- Replace `@lovable.dev/vite-tanstack-config` with an explicit Vite config: `@tanstack/react-start/plugin/vite`, `@vitejs/plugin-react`, `@tailwindcss/vite`, `vite-tsconfig-paths`, and conditional `nitro` / Cloudflare plugins (mirror what Lovable’s wrapper does today).
- High risk of regressions; treat as a **separate project** with its own test plan (dev server, `npm run build`, Vercel + Wrangler paths).

---

## Files likely to change (summary)

| File | Changes |
|------|---------|
| [`src/routes/__root.tsx`](src/routes/__root.tsx) | Remove Lovable meta; optional global links; optional `theme-color`; optional JSON-LD. |
| [`src/routes/index.tsx`](src/routes/index.tsx) | Expand OG/Twitter/canonical; possibly `head` helper import from shared module. |
| New e.g. `src/lib/site-meta.ts` | Constants: `siteName`, `siteUrl`, `defaultDescription`, `ogImageUrl`, `twitterHandle?`. |
| [`public/*`](public/) | `favicon.ico`, `og/` image, optional `robots.txt`, `site.webmanifest`. |
| [`vite.config.ts`](vite.config.ts) | Neutral comments only (unless doing optional follow-up). |
| [`package.json`](package.json) | Optional `name` rename. |

---

## Definition of done

- [ ] No `Lovable`, `Lovable App`, `@Lovable`, or scaffold OG strings in **rendered** `<head>` for `/`.
- [ ] Canonical URL + `og:url` + full OG image dimensions/alt + `og:site_name` + `og:locale`.
- [ ] Twitter card type chosen intentionally; `twitter:image` aligned with OG; no fake `twitter:site`.
- [ ] Favicon present; optional theme-color.
- [ ] Manual verification (Phase J) passed on **final production domain**.
- [ ] (Optional) JSON-LD validates in Google Rich Results Test.

---

*This file is planning only; implement in small PRs (e.g. B+C first, then D–F, then assets).*
