import { FollowUpBossClient } from "@/lib/fub/client";

export type WebsiteLeadInput = {
  name: string;
  email?: string;
  phone?: string;
  message?: string;
  source: string;
  stage?: string;
  tags?: string[];
  formType: string;
  referer?: string | null;
  interest?: "buy" | "sell" | "both";
  customFields?: Record<string, string | number | boolean | undefined>;
};

function splitName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: "" };
  }
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}

function getFubClient(): FollowUpBossClient | null {
  const apiKey = process.env.FUB_API_KEY;
  if (!apiKey) {
    console.warn("[leads] FUB_API_KEY not configured — skipping CRM ingest");
    return null;
  }
  return new FollowUpBossClient({
    apiKey,
    systemKey: process.env.FUB_SYSTEM_KEY,
  });
}

/** Ingest a website lead into Follow Up Boss (upsert + event + tags). */
export async function ingestWebsiteLead(
  input: WebsiteLeadInput
): Promise<{ personId: number | null; isNew: boolean; synced: boolean }> {
  const fub = getFubClient();
  if (!fub) {
    return { personId: null, isNew: false, synced: false };
  }

  if (!input.email && !input.phone) {
    throw new Error("Email or phone is required");
  }

  const { firstName, lastName } = splitName(input.name);

  let existingPerson = null;
  if (input.email) {
    existingPerson = await fub.findPerson({ email: input.email });
  } else if (input.phone) {
    existingPerson = await fub.findPerson({ phone: input.phone });
  }

  const person = await fub.upsertPerson({
    firstName,
    lastName,
    name: input.name,
    emails: input.email ? [{ value: input.email }] : undefined,
    phones: input.phone ? [{ value: input.phone }] : undefined,
    source: input.source,
    stage: input.stage ?? "New Lead",
    customFields: {
      ...input.customFields,
      formType: input.formType,
      interest: input.interest,
      capturedAt: new Date().toISOString(),
      captureUrl: input.referer ?? "direct",
    },
  });

  const tags = [
    ...(input.tags ?? []),
    "website-lead",
    "iron-mountain-ranch",
    input.formType,
  ].filter((tag, index, arr) => Boolean(tag) && arr.indexOf(tag) === index);

  for (const tag of tags) {
    try {
      await fub.addTag(person.id, tag);
    } catch (error) {
      console.error(`[leads] Failed to add tag "${tag}":`, error);
    }
  }

  const eventMessage = input.message
    ? `Lead message: ${input.message}`
    : `New ${input.formType} inquiry from ${input.source}`;

  await fub.createEvent({
    source: "website",
    type: "Inbound Lead",
    message: eventMessage,
    personId: person.id,
    data: {
      formType: input.formType,
      url: input.referer,
      interest: input.interest,
      ...input.customFields,
    },
  });

  return {
    personId: person.id,
    isNew: !existingPerson,
    synced: true,
  };
}
