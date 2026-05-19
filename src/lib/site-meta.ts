/**
 * site-meta.ts — single source of truth for metadata constants.
 *
 * Usage in any route:
 *   import { SITE } from "@/lib/site-meta";
 *   head: () => ({ meta: [{ title: SITE.name }, ...] })
 *
 * Set VITE_SITE_URL in your .env (and Vercel env vars) to the canonical
 * production domain. Falls back to the known Vercel preview URL so
 * OG/canonical tags still work in CI preview deployments.
 */

const BASE_URL =
  (import.meta.env.VITE_SITE_URL as string | undefined) ??
  "https://barcelona-strength-bookings-dusky.vercel.app";

// Strip any trailing slash so we can safely append paths.
const ORIGIN = BASE_URL.replace(/\/$/, "");

export const SITE = {
  /** Canonical origin — no trailing slash. */
  origin: ORIGIN,

  /** Human-readable brand name used in og:site_name, JSON-LD, etc. */
  name: "Barcelona Strength",

  /** Full coach name for structured data and fallback titles. */
  coachName: "Alex Moreno",

  /** Default page title (also root fallback for 404 / error routes). */
  title: "Alex Moreno — S&C Coach, Barcelona",

  /** Default meta description (also og:description baseline). */
  description:
    "Structured strength & conditioning in Barcelona. Studio and outdoor sessions for busy professionals. Book a slot this week.",

  /** Shorter variant used where character limits are tight (Twitter). */
  descriptionShort:
    "Studio and outdoor strength & conditioning in Barcelona. Sessions for busy professionals.",

  /** Absolute URL to the default OG / Twitter share image (1200 × 630). */
  ogImage: `${ORIGIN}/og/default.png`,

  /** Alt text for the OG image. */
  ogImageAlt:
    "Alex Moreno — Strength & Conditioning Coach, Barcelona. Dark gym aesthetic with barbell silhouette.",

  /** OG image dimensions (update if you change the asset). */
  ogImageWidth: "1200",
  ogImageHeight: "630",

  /** Twitter / X handle — set to a real handle or remove the tag. */
  twitterHandle: undefined as string | undefined,

  /** Default og:locale. */
  locale: "en_GB",

  /**
   * True only on Vercel production (or local prod build without VERCEL_ENV).
   * Preview deployments use `noindex` so duplicate URLs are not indexed.
   */
  isProduction: (() => {
    const vercelEnv = import.meta.env.VITE_VERCEL_ENV as string | undefined;
    if (vercelEnv) return vercelEnv === "production";
    return import.meta.env.PROD === true;
  })(),
} as const;
