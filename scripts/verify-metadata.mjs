/**
 * Verifies metadata implementation in the repo (not live production).
 * Run: npm run verify:meta
 */
import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const warnings = [];

function mustExist(rel) {
  const p = resolve(root, rel);
  if (!existsSync(p)) errors.push(`Missing file: ${rel}`);
  else return p;
}

function mustNotContain(rel, pattern, label) {
  const p = resolve(root, rel);
  if (!existsSync(p)) return;
  const text = readFileSync(p, "utf8");
  if (pattern.test(text)) errors.push(`${label}: found in ${rel}`);
}

function mustContain(rel, pattern, label) {
  const p = resolve(root, rel);
  if (!existsSync(p)) return;
  const text = readFileSync(p, "utf8");
  if (!pattern.test(text)) errors.push(`${label}: not found in ${rel}`);
}

// No scaffold branding in user-facing source
mustNotContain("src/routes/__root.tsx", /Lovable/i, "Lovable in root head");
mustNotContain("src/routes/index.tsx", /Lovable/i, "Lovable in index");
mustNotContain("vite.config.ts", /bolt\.new/i, "bolt.new reference");

// Core files
mustExist("src/lib/site-meta.ts");
mustExist("public/og/default.png");
mustExist("public/favicon.svg");
mustExist("public/favicon-32.png");
mustExist("public/apple-touch-icon.png");
mustExist("public/icons/icon-192.png");
mustExist("public/icons/icon-512.png");
mustExist("public/site.webmanifest");
mustExist("public/robots.txt");
mustExist("public/sitemap.xml");
mustExist(".env.example");

// Index route meta
mustContain("src/routes/index.tsx", /og:site_name/, "og:site_name");
mustContain("src/routes/index.tsx", /og:url/, "og:url");
mustContain("src/routes/index.tsx", /twitter:card/, "twitter:card");
mustContain("src/routes/index.tsx", /rel: "canonical"/, "canonical link");
mustContain("src/routes/index.tsx", /application\/ld\+json/, "JSON-LD");
mustContain("src/routes/index.tsx", /SITE\.ogImage/, "SITE.ogImage");

// Root global head
mustContain("src/routes/__root.tsx", /favicon\.svg/, "favicon link");
mustContain("src/routes/__root.tsx", /site\.webmanifest/, "manifest link");
mustNotContain("src/routes/__root.tsx", /og:title/, "duplicate og:title in root");

// Vercel preview robots
mustContain("src/lib/site-meta.ts", /VITE_VERCEL_ENV/, "VITE_VERCEL_ENV");
mustContain("vite.config.ts", /VITE_VERCEL_ENV/, "VERCEL_ENV define");

// robots.txt sitemap
const robots = readFileSync(resolve(root, "public/robots.txt"), "utf8");
if (!/^Sitemap:/m.test(robots)) warnings.push("robots.txt: no Sitemap line");

if (warnings.length) {
  console.warn("Warnings:");
  warnings.forEach((w) => console.warn(`  - ${w}`));
}

if (errors.length) {
  console.error("Metadata verification failed:\n");
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}

console.log("Metadata verification passed (repo implementation).");
console.log("Reminder: run Phase J manual checks on production URL after deploy.");
