/**
 * Routes protected by Vercel BotID.
 * Must stay in sync with server-side checkBotId() calls.
 */
export const botIdProtectedRoutes = [
  { path: "/api/leads/submit", method: "POST" },
  { path: "/api/leads/capture", method: "POST" },
  { path: "/api/contact", method: "POST" },
  { path: "/api/home-valuation", method: "POST" },
] as const;
