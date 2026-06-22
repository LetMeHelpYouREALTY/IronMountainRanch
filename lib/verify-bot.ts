import { checkBotId } from "botid/server";
import { NextResponse } from "next/server";

type BotDeniedResponse = NextResponse<{ error: string }>;

/** Returns a 403 response when BotID classifies the request as a bot. */
export async function verifyBotRequest(): Promise<BotDeniedResponse | null> {
  const verification = await checkBotId();

  if (verification.isBot) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  return null;
}
