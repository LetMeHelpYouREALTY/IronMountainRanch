/**
 * Claude advisor — lead capture & bot protection stack (June 2026).
 * Synthesized from Parallel Search (Vercel BotID docs, FUB API guidance, IMR codebase).
 */
export const LEAD_STACK_DECISIONS = {
  botProtection: {
    choice: "Vercel BotID (primary) + optional Cloudflare Turnstile (secondary)",
    rationale:
      "BotID is invisible, runs per protected POST from real browser sessions, and pairs with withBotId() rewrites. Turnstile remains optional when NEXT_PUBLIC_TURNSTILE_SITE_KEY is set.",
    sources: [
      "https://vercel.com/docs/botid/get-started",
      "https://vercel.com/docs/botid/local-development-behavior",
    ],
  },
  fubIngestion: {
    choice: "POST /v1/events via createEvent after person upsert",
    rationale:
      "FUB recommends event notifications for website leads so automations, assignment, and deduplication run. Avoid bare POST /people without events.",
    sources: ["https://docs.followupboss.com/reference/send-in-a-lead"],
  },
  rateLimit: {
    choice: "Upstash sliding window — 5 submissions / hour / IP on lead routes",
    rationale:
      "Defense in depth after BotID; fails open if Redis is not configured (local dev).",
  },
  clientForms: {
    choice: "fetch() from page to BotID-protected routes (never curl in prod tests)",
    rationale:
      "BotIdClient must attach headers; server routes must list matching paths in botid-routes.ts.",
  },
  deepAnalysis: {
    choice: "Enable BotID Deep Analysis in Vercel Firewall → Rules (Pro)",
    rationale: "Paid tier adds Kasada ML signals on checkBotId() calls for high-value lead endpoints.",
  },
  speedToLead: {
    choice: "FUB event + tags + stage on ingest; target <90s human follow-up",
    rationale: "2026 speed-to-lead benchmarks favor sub-minute response for portal-style leads.",
  },
} as const;

export type LeadStackDecisions = typeof LEAD_STACK_DECISIONS;
