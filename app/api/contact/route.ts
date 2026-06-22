import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { verifyBotRequest } from "@/lib/verify-bot";

const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().min(10).max(20).optional(),
  message: z.string().min(10).max(2000),
});

export async function POST(request: NextRequest) {
  const botResponse = await verifyBotRequest();
  if (botResponse) return botResponse;

  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    console.info("[contact]", {
      name: data.name,
      email: data.email,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
