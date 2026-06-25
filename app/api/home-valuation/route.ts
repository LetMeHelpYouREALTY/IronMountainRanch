import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { applyLeadApiGuards } from "@/lib/leads/lead-api-guard";
import { ingestWebsiteLead } from "@/lib/leads/ingest-website-lead";
import { getRateLimitHeaders } from "@/lib/rate-limit";

const valuationSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().min(10).max(20),
  address: z.string().min(5).max(200),
  village: z.string().max(120).optional(),
});

export async function POST(request: NextRequest) {
  const guard = await applyLeadApiGuards(request);
  if (guard instanceof NextResponse) return guard;

  try {
    const body = await request.json();
    const data = valuationSchema.parse(body);

    const result = await ingestWebsiteLead({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: `Home valuation request for ${data.address}${data.village ? ` (${data.village})` : ""}`,
      source: "ironmountainranchlasvegas.com/home-valuation",
      formType: "home-valuation",
      tags: ["seller", "home-valuation", "iron-mountain-ranch"],
      referer: request.headers.get("referer"),
      interest: "sell",
      customFields: {
        propertyAddress: data.address,
        village: data.village,
      },
    });

    return NextResponse.json(
      { success: true, personId: result.personId, synced: result.synced },
      { headers: getRateLimitHeaders(guard.rateLimit) }
    );
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
