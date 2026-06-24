import { buildAgentIconResponse } from "@/lib/agent-icon";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return buildAgentIconResponse({ size: 180, borderRadius: 36 });
}
