import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { applyLeadApiGuards } from "@/lib/leads/lead-api-guard";
import { ingestWebsiteLead } from "@/lib/leads/ingest-website-lead";
import { getRateLimitHeaders } from "@/lib/rate-limit";

const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().min(10).max(20).optional(),
  message: z.string().min(10).max(2000),
});

export async function POST(request: NextRequest) {
  const guard = await applyLeadApiGuards(request);
  if (guard instanceof NextResponse) return guard;

  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    const result = await ingestWebsiteLead({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      source: "ironmountainranchlasvegas.com/contact",
      formType: "contact",
      tags: ["contact-form"],
      referer: request.headers.get("referer"),
    });

    return NextResponse.json(
      { success: true, personId: result.personId, synced: result.synced },
      { headers: getRateLimitHeaders(guard.rateLimit) }
    );
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
