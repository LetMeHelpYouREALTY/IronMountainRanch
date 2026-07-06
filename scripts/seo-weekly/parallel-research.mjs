#!/usr/bin/env node
/**
 * Parallel Search + Extract — weekly SEO / AEO / GEO research digest.
 * @see https://docs.parallel.ai/search/search-quickstart
 * @see https://docs.parallel.ai/extract/extract-quickstart
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parallelExtract, parallelSearch } from "./parallel-client.mjs";

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
  {
    label: "Competitor SEO — Northwest Las Vegas",
    objective:
      "Identify SEO content strategies used by competing Las Vegas gated community and neighborhood real estate sites in northwest Las Vegas.",
    search_queries: [
      "Centennial Hills Las Vegas real estate blog content strategy",
      "gated community Las Vegas SEO neighborhood pages",
      "Las Vegas hyperlocal real estate website FAQ schema",
    ],
  },
  {
    label: "Las Vegas Market Trends (2026)",
    objective:
      "Summarize current Las Vegas residential market trends relevant to Iron Mountain Ranch buyers and sellers: inventory, median price, days on market.",
    search_queries: [
      "Las Vegas housing market inventory 2026",
      "northwest Las Vegas home prices trend 2026",
      "Las Vegas gated community resale market 2026",
    ],
  },
];

const COMPETITOR_EXTRACT = {
  label: "Competitor Page Extract",
  urls: [
    "https://www.realtor.com/realestateandhomes-search/Iron-Mountain-Ranch_Las-Vegas_NV",
    "https://www.redfin.com/neighborhood/89131/NV/Las-Vegas/Iron-Mountain-Ranch",
  ],
  objective:
    "Extract listing counts, price ranges, and neighborhood positioning copy useful for Iron Mountain Ranch SEO differentiation.",
};

function formatSection(label, data) {
  if (data.skipped) {
    return `## ${label}\n\n_Skipped: ${data.reason}_\n`;
  }
  const lines = [`## ${label}`, ""];

  if (data.search_id) lines.push(`Search ID: ${data.search_id}`, "");
  if (data.extract_id) lines.push(`Extract ID: ${data.extract_id}`, "");

  const results = data.results ?? [];
  for (const result of results.slice(0, 4)) {
    lines.push(`### ${result.title ?? result.url}`);
    if (result.url) lines.push(`Source: ${result.url}`);
    if (result.publish_date) lines.push(`Published: ${result.publish_date}`);
    lines.push("");
    for (const excerpt of (result.excerpts ?? []).slice(0, 2)) {
      lines.push(String(excerpt).trim());
      lines.push("");
    }
    if (result.content) {
      lines.push(String(result.content).trim().slice(0, 1500));
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

  console.log(`Parallel extract: ${COMPETITOR_EXTRACT.label}`);
  const extractData = await parallelExtract({
    urls: COMPETITOR_EXTRACT.urls,
    objective: COMPETITOR_EXTRACT.objective,
  });
  sections.push(formatSection(COMPETITOR_EXTRACT.label, extractData));

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
    `- Competitor extracts are for positioning research only — do not copy MLS data verbatim.`,
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
