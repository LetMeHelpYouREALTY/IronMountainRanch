#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { collectMarketingRoutes, routeFromPageFile } from "./generate-routes.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "../..");
const APP_DIR = path.join(ROOT, "app");

function walkPageFiles(dir, segments = [], files = []) {
  if (!fs.existsSync(dir)) return files;
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
    if (entry.name === "page.tsx") files.push(full);
  }
  return files;
}

function auditFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const route = routeFromPageFile(filePath);
  const issues = [];

  const hasMetadata =
    content.includes("export const metadata") || content.includes("export async function generateMetadata");
  if (!hasMetadata) issues.push("missing-metadata");

  if (hasMetadata && !content.includes("canonical:")) {
    issues.push("missing-canonical");
  }

  if (!/<h1[\s>]/.test(content) && !content.includes("<h1 ")) {
    issues.push("missing-h1");
  }

  if (!content.includes("application/ld+json") && !content.includes("SiteJsonLd")) {
    issues.push("missing-jsonld");
  }

  if (content.includes("export const metadata") && !content.includes("twitter:") && !content.includes("buildSocialImageMetadata")) {
    issues.push("missing-twitter-metadata");
  }

  if (content.includes("FAQPage") || content.toLowerCase().includes("frequently asked")) {
    if (!content.includes("FAQPage") && !content.includes("generateFaq")) {
      issues.push("faq-without-schema");
    }
  }

  return { route, file: path.relative(ROOT, filePath).replace(/\\/g, "/"), issues };
}

export function runAudit() {
  const routes = collectMarketingRoutes();
  const pageFiles = walkPageFiles(APP_DIR);
  const audits = pageFiles.map(auditFile);
  const issueCount = audits.reduce((n, a) => n + a.issues.length, 0);

  const report = {
    generatedAt: new Date().toISOString(),
    routeCount: routes.length,
    pageCount: pageFiles.length,
    issueCount,
    audits,
    sitemapGap: [],
  };

  const outDir = path.join(ROOT, "reports/seo-weekly");
  fs.mkdirSync(outDir, { recursive: true });
  const stamp = new Date().toISOString().slice(0, 10);
  const outPath = path.join(outDir, `audit-${stamp}.json`);
  fs.writeFileSync(outPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  console.log(`Audit: ${issueCount} issues across ${pageFiles.length} pages → ${path.relative(ROOT, outPath)}`);
  return report;
}

export { auditFile, walkPageFiles };

const isMain =
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isMain) {
  runAudit();
}
