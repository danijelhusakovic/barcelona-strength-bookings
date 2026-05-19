/**
 * generate-icons.mjs
 * Generates favicon.ico, icon-192.png, icon-512.png from favicon.svg.
 * Run once after changing the SVG: node generate-icons.mjs
 *
 * Requires: npm install -D sharp (dev only, not in main deps)
 * If sharp is not available, icons can be generated via any SVG-to-PNG tool.
 */
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    console.error(
      "sharp is not installed. Run: npm install -D sharp\n" +
        "Then re-run: node generate-icons.mjs"
    );
    process.exit(1);
  }

  const svgBuffer = readFileSync(resolve(__dirname, "public/favicon.svg"));
  const iconsDir = resolve(__dirname, "public/icons");
  mkdirSync(iconsDir, { recursive: true });

  // 192×192 PNG
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(resolve(iconsDir, "icon-192.png"));
  console.log("✓ public/icons/icon-192.png");

  // 512×512 PNG
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(resolve(iconsDir, "icon-512.png"));
  console.log("✓ public/icons/icon-512.png");

  // apple-touch-icon 180×180
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(resolve(__dirname, "public/apple-touch-icon.png"));
  console.log("✓ public/apple-touch-icon.png");

  // favicon 32×32 PNG (good fallback; true .ico requires ico-endec or similar)
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(resolve(__dirname, "public/favicon-32.png"));
  console.log("✓ public/favicon-32.png");

  console.log("\nAll icons generated. Commit the public/ outputs.");
}

main();
