import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { verifyBotRequest } from "@/lib/verify-bot";

const leadSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().min(10).max(20),
  message: z.string().max(2000).optional(),
  source: z.string().max(120).optional(),
  interest: z.enum(["buy", "sell", "both"]).optional(),
});

export async function POST(request: NextRequest) {
  const botResponse = await verifyBotRequest();
  if (botResponse) return botResponse;

  try {
    const body = await request.json();
    const data = leadSchema.parse(body);

    // TODO: wire to Follow Up Boss / email notification
    console.info("[leads/submit]", {
      name: data.name,
      email: data.email,
      phone: data.phone,
      source: data.source ?? "ironmountainranchlasvegas.com",
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
