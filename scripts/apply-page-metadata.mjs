#!/usr/bin/env node
/**
 * Migrate `export const metadata: Metadata = { ... }` to buildPageMetadata().
 * Idempotent — skips files already using the helper or generateMetadata.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const APP_DIR = path.join(ROOT, "app");

const IMPORT_LINE =
  'import { buildPageMetadata } from "@/lib/page-metadata";\n';
const METADATA_TYPE_IMPORT = 'import type { Metadata } from "next";\n';

function walkPageFiles(dir, segments = [], files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith("_") || entry.name === "api") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "listings") continue;
      if (entry.name.startsWith("(") && entry.name.endsWith(")")) {
        walkPageFiles(full, segments, files);
        continue;
      }
      if (/^\[.+\]$/.test(entry.name)) continue;
      walkPageFiles(full, [...segments, entry.name], files);
      continue;
    }
    if (entry.name === "page.tsx") files.push({ full, route: "/" + segments.join("/") });
  }
  return files;
}

function findMetadataBlock(content) {
  const marker = "export const metadata";
  const start = content.indexOf(marker);
  if (start === -1) return null;
  if (content.includes("buildPageMetadata")) return null;
  if (content.includes("generateMetadata")) return null;

  const braceStart = content.indexOf("{", start);
  if (braceStart === -1) return null;

  let depth = 0;
  let end = braceStart;
  for (let i = braceStart; i < content.length; i++) {
    const ch = content[i];
    if (ch === "{") depth += 1;
    else if (ch === "}") {
      depth -= 1;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }

  let tail = end;
  while (tail < content.length && /[\s;]/.test(content[tail])) tail += 1;

  return {
    start,
    end: tail,
    inner: content.slice(braceStart + 1, end - 1),
  };
}

function extractStringField(inner, field) {
  const re = new RegExp(`${field}:\\s*"((?:\\\\.|[^"\\\\])*)"`, "s");
  const m = inner.match(re);
  return m ? m[1].replace(/\\"/g, '"') : null;
}

function extractKeywords(inner) {
  const m = inner.match(/keywords:\s*\[([\s\S]*?)\]/);
  if (!m) return null;
  const items = [...m[1].matchAll(/"((?:\\.|[^"\\])*)"/g)].map((x) => x[1].replace(/\\"/g, '"'));
  return items.length ? items : null;
}

function escapeString(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function applyFile({ full, route }) {
  let content = fs.readFileSync(full, "utf8");
  const block = findMetadataBlock(content);
  if (!block) return false;

  const title = extractStringField(block.inner, "title");
  const description = extractStringField(block.inner, "description");
  if (!title || !description) {
    console.warn(`Skip (title/description): ${path.relative(ROOT, full)}`);
    return false;
  }

  const keywords = extractKeywords(block.inner);
  const pathLiteral = route === "/" ? '"/"' : `"${route}"`;

  const keywordsLine = keywords
    ? `,\n  keywords: ${JSON.stringify(keywords)}`
    : "";

  const replacement = `export const metadata: Metadata = buildPageMetadata({
  title: "${escapeString(title)}",
  description: "${escapeString(description)}",
  path: ${pathLiteral}${keywordsLine},
});`;

  content = content.slice(0, block.start) + replacement + content.slice(block.end);

  if (!content.includes('from "@/lib/page-metadata"')) {
    if (content.includes(METADATA_TYPE_IMPORT.trim())) {
      content = content.replace(METADATA_TYPE_IMPORT, METADATA_TYPE_IMPORT + IMPORT_LINE);
    } else {
      const typeImport = 'import type { Metadata } from "next";\n';
      content = typeImport + IMPORT_LINE + content;
    }
  }

  fs.writeFileSync(full, content, "utf8");
  console.log(`Updated ${path.relative(ROOT, full)}`);
  return true;
}

function main() {
  const files = walkPageFiles(APP_DIR);
  let count = 0;
  for (const file of files) {
    if (applyFile(file)) count += 1;
  }
  console.log(`Done. ${count} page(s) migrated.`);
}

main();
