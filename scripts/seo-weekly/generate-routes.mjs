#!/usr/bin/env node
/**
 * Walk app/ for static marketing routes (excludes api, dynamic [id] segments).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "../..");
const APP_DIR = path.join(ROOT, "app");

const SKIP_DIRS = new Set(["api", "listings"]);
const DYNAMIC_SEGMENT = /^\[.+\]$/;

function readSubCommunitySlugs() {
  const file = path.join(ROOT, "lib/iron-mountain-ranch.ts");
  const content = fs.readFileSync(file, "utf8");
  const slugs = [];
  const re = /slug:\s*"([^"]+)"/g;
  let match;
  while ((match = re.exec(content)) !== null) {
    slugs.push(match[1]);
  }
  return [...new Set(slugs)];
}

function walkPages(dir, segments = []) {
  /** @type {string[]} */
  const routes = [];
  if (!fs.existsSync(dir)) return routes;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith("_")) continue;
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      if (entry.name.startsWith("(") && entry.name.endsWith(")")) {
        routes.push(...walkPages(full, segments));
        continue;
      }
      if (DYNAMIC_SEGMENT.test(entry.name)) {
        if (entry.name === "[slug]" && segments.join("/") === "sub-communities") {
          for (const slug of readSubCommunitySlugs()) {
            routes.push(`/sub-communities/${slug}`);
          }
        }
        continue;
      }
      routes.push(...walkPages(full, [...segments, entry.name]));
      continue;
    }

    if (entry.name === "page.tsx") {
      const route = "/" + segments.join("/");
      routes.push(route === "/" ? "/" : route.replace(/\/+/g, "/"));
    }
  }

  return routes;
}

export function collectMarketingRoutes() {
  const routes = walkPages(APP_DIR).sort((a, b) => a.localeCompare(b));
  return [...new Set(routes)];
}

export function routeFromPageFile(pageFile) {
  const rel = path.relative(APP_DIR, pageFile).replace(/\\/g, "/");
  if (rel === "page.tsx") return "/";
  const dir = path.dirname(rel);
  return `/${dir}`;
}

function main() {
  const routes = collectMarketingRoutes();
  const outPath = path.join(ROOT, "lib/seo-weekly/marketing-routes.generated.json");
  const payload = {
    generatedAt: new Date().toISOString(),
    count: routes.length,
    routes,
  };
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  console.log(`Wrote ${routes.length} routes to ${path.relative(ROOT, outPath)}`);
}

const isMain =
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isMain) {
  main();
}
