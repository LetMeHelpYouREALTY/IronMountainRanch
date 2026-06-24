#!/usr/bin/env node
/**
 * Upload Iron Mountain Ranch hero WebP/JPG assets to Cloudflare R2 bucket `listing-photos`.
 *
 * Requires: CLOUDFLARE_API_TOKEN (or wrangler login) + CLOUDFLARE_ACCOUNT_ID
 *
 * Usage:
 *   node scripts/upload-imr-heroes-to-r2.mjs
 *   pnpm run cloudflare:upload-heroes
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const BUCKET = process.env.IMR_R2_BUCKET ?? "listing-photos";

const UPLOADS = [
  {
    file: path.join(ROOT, "public/images/hero/imr-gated-village-hero.webp"),
    key: "iron-mountain-ranch/heroes/imr-gated-village-hero.webp",
    contentType: "image/webp",
  },
  {
    file: path.join(ROOT, "public/images/hero/imr-village-streetscape-hero.webp"),
    key: "iron-mountain-ranch/heroes/imr-village-streetscape-hero.webp",
    contentType: "image/webp",
  },
  {
    file: path.join(ROOT, "public/images/hero/imr-community-park-hero.webp"),
    key: "iron-mountain-ranch/heroes/imr-community-park-hero.webp",
    contentType: "image/webp",
  },
  {
    file: path.join(ROOT, "public/images/hero/imr-estates-hero.webp"),
    key: "iron-mountain-ranch/heroes/imr-estates-hero.webp",
    contentType: "image/webp",
  },
  {
    file: path.join(ROOT, "public/images/hero/imr-seller-home-hero.webp"),
    key: "iron-mountain-ranch/heroes/imr-seller-home-hero.webp",
    contentType: "image/webp",
  },
  {
    file: path.join(ROOT, "public/images/hero/imr-sheep-range-hero.webp"),
    key: "iron-mountain-ranch/heroes/imr-sheep-range-hero.webp",
    contentType: "image/webp",
  },
  {
    file: path.join(ROOT, "public/Image/hero_bg_1.jpg"),
    key: "iron-mountain-ranch/heroes/legacy/hero_bg_1.jpg",
    contentType: "image/jpeg",
  },
  {
    file: path.join(ROOT, "public/Image/hero_bg_2.jpg"),
    key: "iron-mountain-ranch/heroes/legacy/hero_bg_2.jpg",
    contentType: "image/jpeg",
  },
  {
    file: path.join(ROOT, "public/Image/hero_bg_3.jpg"),
    key: "iron-mountain-ranch/heroes/legacy/hero_bg_3.jpg",
    contentType: "image/jpeg",
  },
];

function runWranglerPut({ file, key, contentType }) {
  const args = [
    "r2",
    "object",
    "put",
    `${BUCKET}/${key}`,
    `--file=${file}`,
    `--content-type=${contentType}`,
  ];

  if (process.env.CLOUDFLARE_ACCOUNT_ID) {
    args.push(`--account-id=${process.env.CLOUDFLARE_ACCOUNT_ID}`);
  }

  const result = spawnSync("npx", ["wrangler", ...args], {
    cwd: ROOT,
    stdio: "inherit",
    shell: true,
  });

  if (result.status !== 0) {
    throw new Error(`wrangler upload failed for ${key}`);
  }
}

function main() {
  console.log(`Uploading ${UPLOADS.length} hero assets to R2 bucket "${BUCKET}"...`);

  for (const item of UPLOADS) {
    if (!fs.existsSync(item.file)) {
      console.warn(`Skip missing file: ${item.file}`);
      continue;
    }
    const sizeKb = Math.round(fs.statSync(item.file).size / 1024);
    console.log(`→ ${item.key} (${sizeKb} KB)`);
    runWranglerPut(item);
  }

  console.log("Done. Verify:");
  console.log(
    "  https://pub-55f2185197354e748b122f17b695df69.r2.dev/iron-mountain-ranch/heroes/imr-gated-village-hero.webp",
  );
}

main();
