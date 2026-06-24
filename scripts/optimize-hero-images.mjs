#!/usr/bin/env node
/**
 * Compress public/images/hero/*.png → .webp for LCP (PageSpeed / mobile).
 * Run: node scripts/optimize-hero-images.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const HERO_DIR = path.join(__dirname, "../public/images/hero");
const MAX_WIDTH = 1920;
const WEBP_QUALITY = 78;

async function main() {
  const files = fs.readdirSync(HERO_DIR).filter((f) => f.endsWith(".png"));
  if (files.length === 0) {
    console.log("No PNG files in public/images/hero");
    return;
  }

  for (const file of files) {
    const input = path.join(HERO_DIR, file);
    const output = path.join(HERO_DIR, file.replace(/\.png$/i, ".webp"));
    const before = fs.statSync(input).size;
    await sharp(input)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY, effort: 4 })
      .toFile(output);
    const after = fs.statSync(output).size;
    console.log(
      `${file} → ${path.basename(output)}: ${(before / 1024 / 1024).toFixed(2)}MB → ${(after / 1024).toFixed(0)}KB`,
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
