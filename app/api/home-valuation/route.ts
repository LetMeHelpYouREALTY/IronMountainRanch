import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { verifyBotRequest } from "@/lib/verify-bot";

const valuationSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().min(10).max(20),
  address: z.string().min(5).max(200),
  village: z.string().max(120).optional(),
});

export async function POST(request: NextRequest) {
  const botResponse = await verifyBotRequest();
  if (botResponse) return botResponse;

  try {
    const body = await request.json();
    const data = valuationSchema.parse(body);

    console.info("[home-valuation]", {
      address: data.address,
      email: data.email,
      village: data.village,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
