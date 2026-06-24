#!/usr/bin/env node
/**
 * Safe metadata fixes: add alternates.canonical where missing on static metadata exports.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { walkPageFiles } from "./audit-pages.mjs";
import { routeFromPageFile } from "./generate-routes.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "../..");
const APP_DIR = path.join(ROOT, "app");

function enhanceCanonical(filePath) {
  const route = routeFromPageFile(filePath);
  const canonical = route === "/" ? "/" : route;
  let content = fs.readFileSync(filePath, "utf8");

  if (!content.includes("export const metadata")) return false;
  if (content.includes("canonical:")) return false;

  const metadataMatch = content.match(/export const metadata(?:: Metadata)?\s*=\s*\{/);
  if (!metadataMatch || metadataMatch.index === undefined) return false;

  const insertAt = metadataMatch.index + metadataMatch[0].length;
  const insertion = `\n  alternates: { canonical: "${canonical}" },`;
  content = `${content.slice(0, insertAt)}${insertion}${content.slice(insertAt)}`;
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Added canonical ${canonical} → ${path.relative(ROOT, filePath)}`);
  return true;
}

function main() {
  const files = walkPageFiles(APP_DIR);
  let changed = 0;
  for (const file of files) {
    if (enhanceCanonical(file)) changed += 1;
  }
  console.log(`Canonical enhancements: ${changed} file(s)`);
  return changed;
}

export { enhanceCanonical };

if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, "/")}`) {
  main();
}
