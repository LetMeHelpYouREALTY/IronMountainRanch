import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { applyLeadApiGuards } from "@/lib/leads/lead-api-guard";
import { ingestWebsiteLead } from "@/lib/leads/ingest-website-lead";
import { getRateLimitHeaders } from "@/lib/rate-limit";

const leadSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().min(10).max(20),
  message: z.string().max(2000).optional(),
  source: z.string().max(120).optional(),
  interest: z.enum(["buy", "sell", "both"]).optional(),
});

export async function POST(request: NextRequest) {
  const guard = await applyLeadApiGuards(request);
  if (guard instanceof NextResponse) return guard;

  try {
    const body = await request.json();
    const data = leadSchema.parse(body);

    const result = await ingestWebsiteLead({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      source: data.source ?? "ironmountainranchlasvegas.com",
      formType: "lead-submit",
      tags: ["website-lead", data.interest ?? "general"].filter(Boolean) as string[],
      referer: request.headers.get("referer"),
      interest: data.interest,
    });

    return NextResponse.json(
      { success: true, personId: result.personId, synced: result.synced },
      { headers: getRateLimitHeaders(guard.rateLimit) }
    );
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
