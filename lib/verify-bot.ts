import { checkBotId } from "botid/server";
import { NextResponse } from "next/server";

type BotDeniedResponse = NextResponse<{ error: string }>;

/** Returns a 403 response when BotID classifies the request as a bot. */
export async function verifyBotRequest(): Promise<BotDeniedResponse | null> {
  const devBypass = process.env.BOTID_DEV_BYPASS;
  const verification = await checkBotId(
    process.env.NODE_ENV === "development" && devBypass === "BAD-BOT"
      ? { developmentOptions: { bypass: "BAD-BOT" } }
      : undefined
  );

  if (verification.isBot) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  return null;
}
