#!/usr/bin/env node
/**
 * HEAD-check marketing routes on production (or BASE_URL env).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const BASE = (process.env.BASE_URL ?? "https://www.ironmountainranchlasvegas.com").replace(
  /\/$/,
  "",
);

const routesJson = JSON.parse(
  fs.readFileSync(path.join(ROOT, "lib/seo-weekly/marketing-routes.generated.json"), "utf8"),
);

const extra = ["/buyers", "/sellers", "/listings", "/sitemap.xml", "/robots.txt"];
const paths = [...new Set([...routesJson.routes, ...extra])];

async function check(routePath) {
  const url = routePath === "/" ? BASE : `${BASE}${routePath}`;
  try {
    const res = await fetch(url, { method: "HEAD", redirect: "manual" });
    return { path: routePath, status: res.status, location: res.headers.get("location") };
  } catch (err) {
    return { path: routePath, status: "ERR", error: String(err) };
  }
}

const results = [];
for (const routePath of paths) {
  results.push(await check(routePath));
}

const failed = results.filter((r) => r.status !== 200 && r.status !== 308 && r.status !== 301);
const redirects = results.filter((r) => r.status === 308 || r.status === 301);

console.log(`\nAudited ${results.length} URLs on ${BASE}\n`);
console.log("=== 404 / errors ===");
for (const r of failed) {
  console.log(`${r.status}\t${r.path}${r.location ? ` → ${r.location}` : ""}`);
}
if (failed.length === 0) console.log("(none)");

console.log("\n=== Redirects (expected for legacy paths) ===");
for (const r of redirects) {
  console.log(`${r.status}\t${r.path} → ${r.location}`);
}

console.log(`\nOK: ${results.length - failed.length - redirects.length} | Redirects: ${redirects.length} | Failed: ${failed.length}\n`);
process.exit(failed.length > 0 ? 1 : 0);
