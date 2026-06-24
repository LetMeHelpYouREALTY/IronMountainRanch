#!/usr/bin/env node
/**
 * Poll production until homepage responds 200 with expected site marker.
 */
const DEFAULT_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://www.ironmountainranchlasvegas.com";
const MARKER = process.env.SEO_WEEKLY_LIVE_MARKER?.trim() || "Iron Mountain Ranch";
const MAX_ATTEMPTS = Number(process.env.SEO_WEEKLY_LIVE_MAX_ATTEMPTS ?? 24);
const INTERVAL_MS = Number(process.env.SEO_WEEKLY_LIVE_INTERVAL_MS ?? 30_000);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function waitForLive(baseUrl = DEFAULT_URL) {
  const url = baseUrl.replace(/\/$/, "");
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const response = await fetch(url, {
        headers: { "User-Agent": "IronMountainRanch-seo-weekly/1.0" },
        redirect: "follow",
      });
      const html = await response.text();
      if (response.ok && html.includes(MARKER)) {
        console.log(`Live check passed (${response.status}) on attempt ${attempt}: ${url}`);
        return true;
      }
      console.warn(
        `Live check attempt ${attempt}/${MAX_ATTEMPTS}: status=${response.status} marker=${html.includes(MARKER)}`
      );
    } catch (error) {
      console.warn(`Live check attempt ${attempt}/${MAX_ATTEMPTS} failed:`, error);
    }
    if (attempt < MAX_ATTEMPTS) await sleep(INTERVAL_MS);
  }
  return false;
}

if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, "/")}`) {
  waitForLive()
    .then((ok) => process.exit(ok ? 0 : 1))
    .catch(() => process.exit(1));
}
