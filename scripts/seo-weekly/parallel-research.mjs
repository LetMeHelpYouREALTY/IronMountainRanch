#!/usr/bin/env node
/**
 * Parallel Search API — weekly SEO / AEO / GEO research digest.
 * @see https://docs.parallel.ai/search/search-quickstart
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "../..");

const RESEARCH_PACKS = [
  {
    label: "Google SEO & Search Console (2026)",
    objective:
      "Find current Google Search Central guidance for real estate local SEO, structured data, and Search Console indexing best practices in 2026.",
    search_queries: [
      "Google Search Central structured data real estate 2026",
      "Google Search Console page indexing best practices 2026",
      "local business schema real estate agent requirements",
    ],
  },
  {
    label: "AEO — Answer Engine Optimization",
    objective:
      "Identify answer-engine optimization tactics for real estate FAQ content, question headings, and featured-snippet friendly copy in 2026.",
    search_queries: [
      "answer engine optimization FAQ real estate 2026",
      "AI overview optimization local business website",
      "question heading SEO best practices 2026",
    ],
  },
  {
    label: "GEO — Entity & Generative Search",
    objective:
      "Research generative engine optimization for stable business entities, NAP consistency, and JSON-LD for local real estate brands.",
    search_queries: [
      "generative engine optimization local business NAP 2026",
      "entity SEO JSON-LD RealEstateAgent LocalBusiness",
      "Google Business Profile website alignment schema",
    ],
  },
  {
    label: "Iron Mountain Ranch — Local Intent",
    objective:
      "Gather hyper-local search intent signals for Iron Mountain Ranch Las Vegas 89131 gated community home buyers and sellers.",
    search_queries: [
      "Iron Mountain Ranch Las Vegas homes for sale 89131",
      "Iron Mountain Ranch northwest Las Vegas real estate market",
      "gated communities Centennial Hills Las Vegas buyer guide",
    ],
  },
];

async function parallelSearch({ objective, search_queries, session_id }) {
  const apiKey = process.env.PARALLEL_API_KEY?.trim();
  if (!apiKey) {
    return { skipped: true, reason: "PARALLEL_API_KEY not set" };
  }

  const response = await fetch("https://api.parallel.ai/v1/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify({
      objective,
      search_queries,
      ...(session_id ? { session_id } : {}),
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Parallel search failed (${response.status}): ${text}`);
  }

  return response.json();
}

function formatSection(label, data) {
  if (data.skipped) {
    return `## ${label}\n\n_Skipped: ${data.reason}_\n`;
  }
  const lines = [`## ${label}`, "", `Search ID: ${data.search_id}`, ""];
  for (const result of (data.results ?? []).slice(0, 4)) {
    lines.push(`### ${result.title ?? result.url}`);
    lines.push(`Source: ${result.url}`);
    if (result.publish_date) lines.push(`Published: ${result.publish_date}`);
    lines.push("");
    for (const excerpt of (result.excerpts ?? []).slice(0, 2)) {
      lines.push(String(excerpt).trim());
      lines.push("");
    }
  }
  return lines.join("\n");
}

export async function runParallelResearch() {
  let sessionId;
  const sections = [];

  for (const pack of RESEARCH_PACKS) {
    console.log(`Parallel research: ${pack.label}`);
    const data = await parallelSearch({
      objective: pack.objective,
      search_queries: pack.search_queries,
      session_id: sessionId,
    });
    if (data.session_id) sessionId = data.session_id;
    sections.push(formatSection(pack.label, data));
  }

  const stamp = new Date().toISOString().slice(0, 10);
  const outDir = path.join(ROOT, "reports/seo-weekly");
  fs.mkdirSync(outDir, { recursive: true });
  const mdPath = path.join(outDir, `research-${stamp}.md`);
  const body = [
    `# Weekly SEO / AEO / GEO Research`,
    ``,
    `Generated: ${new Date().toISOString()}`,
    `Site: ${process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ironmountainranchlasvegas.com"}`,
    ``,
    ...sections,
    `## Automation notes`,
    ``,
    `- Apply research manually or via follow-up PRs; this job does not rewrite marketing copy without human review.`,
    `- NAP and GBP fields must stay aligned with lib/site-contact.ts.`,
    ``,
  ].join("\n");
  fs.writeFileSync(mdPath, body, "utf8");
  console.log(`Research report → ${path.relative(ROOT, mdPath)}`);
  return mdPath;
}

if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, "/")}`) {
  runParallelResearch().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
