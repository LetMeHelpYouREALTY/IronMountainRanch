import { NextRequest, NextResponse } from "next/server";
import {
  checkRateLimit,
  getClientId,
  getRateLimitHeaders,
  leadFormLimiter,
} from "@/lib/rate-limit";
import { verifyBotRequest } from "@/lib/verify-bot";

type GuardFailure = NextResponse<{ error: string; retryAfter?: string }>;

type GuardSuccess = {
  rateLimit: Awaited<ReturnType<typeof checkRateLimit>>;
};

/** BotID + rate limit gate for public lead endpoints. */
export async function applyLeadApiGuards(
  request: NextRequest
): Promise<GuardFailure | GuardSuccess> {
  const botResponse = await verifyBotRequest();
  if (botResponse) return botResponse;

  const clientId = getClientId(request);
  const rateLimit = await checkRateLimit(leadFormLimiter, clientId);

  if (!rateLimit.success) {
    const resetDate = new Date(rateLimit.reset);
    const minutesUntilReset = Math.ceil((rateLimit.reset - Date.now()) / 60000);

    return NextResponse.json(
      {
        error: `Too many submissions. Please try again in ${minutesUntilReset} minute${minutesUntilReset > 1 ? "s" : ""}.`,
        retryAfter: resetDate.toISOString(),
      },
      {
        status: 429,
        headers: getRateLimitHeaders(rateLimit),
      }
    );
  }

  return { rateLimit };
}
