#!/usr/bin/env node
/**
 * Weekly SEO / GEO / AEO / schema automation orchestrator.
 * Intended for GitHub Actions (full git + Parallel API access).
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { collectMarketingRoutes } from "./generate-routes.mjs";
import { runParallelResearch } from "./parallel-research.mjs";
import { runAudit } from "./audit-pages.mjs";
import { waitForLive } from "./wait-for-live.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "../..");

function git(cmd) {
  return execSync(cmd, { cwd: ROOT, encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }).trim();
}

function hasGitChanges() {
  const status = git("git status --porcelain");
  return status.length > 0;
}

function commitAndPush(stamp) {
  git("git add -A");
  if (!hasGitChanges()) {
    console.log("No changes to commit.");
    return false;
  }
  const message = `chore(seo): weekly SEO/AEO/GEO audit ${stamp}`;
  const body =
    "Automated weekly pass: Parallel research, route inventory, sitemap coverage, canonical/metadata audit, and safe canonical fixes.";
  git(`git commit -m "${message}" -m "${body}"`);
  const branch = git("git rev-parse --abbrev-ref HEAD");
  git(`git push origin ${branch}`);
  console.log(`Pushed ${branch}`);
  return true;
}

async function weeklyPass() {
  process.chdir(ROOT);

  // 1) Refresh marketing route inventory (feeds sitemap.ts)
  await import("./generate-routes.mjs");
  execSync("node scripts/seo-weekly/generate-routes.mjs", { cwd: ROOT, stdio: "inherit" });

  const routes = collectMarketingRoutes();
  console.log(`Marketing routes: ${routes.length}`);

  // 2) Parallel Search research digest
  await runParallelResearch();

  // 3) Audit all pages
  runAudit();

  // 4) Safe enhancements — canonical + social metadata via shared helper
  execSync("node scripts/apply-page-metadata.mjs", { cwd: ROOT, stdio: "inherit" });

  const stamp = new Date().toISOString().slice(0, 10);
  const summaryPath = path.join(ROOT, "reports/seo-weekly", `summary-${stamp}.md`);
  fs.mkdirSync(path.dirname(summaryPath), { recursive: true });
  fs.writeFileSync(
    summaryPath,
    [
      `# Weekly SEO summary (${stamp})`,
      ``,
      `- Routes inventoried: ${routes.length}`,
      `- Canonical/social metadata via buildPageMetadata`,
      `- Research + audit artifacts in \`reports/seo-weekly/\``,
      ``,
    ].join("\n"),
    "utf8"
  );

  return stamp;
}

async function main() {
  const loopUntilLive = process.env.SEO_WEEKLY_LOOP_UNTIL_LIVE === "true";
  const maxLoops = Number(process.env.SEO_WEEKLY_MAX_LOOPS ?? 3);

  for (let loop = 1; loop <= maxLoops; loop++) {
    console.log(`\n=== SEO weekly pass ${loop}/${maxLoops} ===\n`);
    const stamp = await weeklyPass();

    const shouldPush = process.env.SEO_WEEKLY_GIT_PUSH !== "false";
    let pushed = false;
    if (shouldPush) {
      try {
        git("git config user.email") || git('git config user.email "seo-weekly@ironmountainranchlasvegas.com"');
        git("git config user.name") || git('git config user.name "seo-weekly-bot"');
      } catch {
        git('git config user.email "seo-weekly@ironmountainranchlasvegas.com"');
        git('git config user.name "seo-weekly-bot"');
      }
      pushed = commitAndPush(stamp);
    }

    if (!loopUntilLive) {
      console.log("SEO weekly pass complete (loop-until-live disabled).");
      return;
    }

    if (pushed) {
      const live = await waitForLive();
      if (live) {
        console.log("Production is live after weekly SEO push.");
        return;
      }
      console.warn("Production not confirmed live; retrying weekly pass if loops remain.");
    } else if (await waitForLive()) {
      console.log("No git changes; production already live.");
      return;
    }
  }

  console.error("Exceeded SEO_WEEKLY_MAX_LOOPS without confirming production.");
  process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
