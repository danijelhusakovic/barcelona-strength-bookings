// Preconfigured Vite + TanStack Start stack. The bundled config already includes the
// following plugins — do NOT add them manually or the app will break with duplicates:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

// Vercel: TanStack Start needs Nitro to emit `.vercel/output` (SSR + static). Without it,
// `vite build` only produces Cloudflare worker artifacts and no root HTML — Vercel shows 404.
// Cloudflare / local: keep default (Cloudflare vite plugin on build, no Nitro).
const isVercel = Boolean(process.env.VERCEL);

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  cloudflare: isVercel ? false : undefined,
  plugins: isVercel ? [...nitro({ preset: "vercel" })] : [],
  vite: {
    define: {
      // Injected at build time on Vercel (production | preview | development).
      "import.meta.env.VITE_VERCEL_ENV": JSON.stringify(
        process.env.VERCEL_ENV ?? "",
      ),
    },
  },
});
