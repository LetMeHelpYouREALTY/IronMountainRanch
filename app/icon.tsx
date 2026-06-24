import { buildAgentIconResponse } from "@/lib/agent-icon";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  return buildAgentIconResponse({ size: 32, borderRadius: 6 });
}
