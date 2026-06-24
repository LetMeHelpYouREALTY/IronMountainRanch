import { agentInfo } from "@/lib/site-config";
import { absoluteUrl } from "@/lib/site-url";
import { readFile } from "node:fs/promises";
import path from "node:path";

/** Default first-party headshot (synced from portfolio Cloudflare asset /Image/agent1.png). */
export const DEFAULT_AGENT_HEADSHOT_PATH = "/images/agent/dr-jan-duffy.png";

const headshotMeta = {
  width: 512,
  height: 512,
  alt: `${agentInfo.name}, ${agentInfo.title} | ${agentInfo.brokerage} — Iron Mountain Ranch Las Vegas`,
} as const;

/**
 * Relative path or absolute URL for Dr. Jan Duffy headshot.
 * Override with `NEXT_PUBLIC_DR_JAN_DUFFY_HEADSHOT` (e.g. imagedelivery.net URL on Cloudflare Images).
 */
export function getAgentHeadshotSrc(): string {
  const override = process.env.NEXT_PUBLIC_DR_JAN_DUFFY_HEADSHOT?.trim();
  if (override) return override;
  return DEFAULT_AGENT_HEADSHOT_PATH;
}

/** Absolute URL for JSON-LD `image` / `logo` fields. */
export function getAgentHeadshotUrl(): string {
  const src = getAgentHeadshotSrc();
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  return absoluteUrl(src);
}

export const drJanDuffyPhotos = {
  headshot: {
    get src() {
      return getAgentHeadshotSrc();
    },
    get url() {
      return getAgentHeadshotUrl();
    },
    width: headshotMeta.width,
    height: headshotMeta.height,
    alt: headshotMeta.alt,
  },
} as const;

export function isExternalAgentPhoto(src: string): boolean {
  return src.startsWith("http://") || src.startsWith("https://");
}

/** Load headshot bytes as a data URL for `next/og` icon generation. */
export async function loadAgentHeadshotDataUrl(): Promise<string> {
  const src = getAgentHeadshotSrc();

  if (isExternalAgentPhoto(src)) {
    const res = await fetch(src, { next: { revalidate: 86400 } });
    if (!res.ok) {
      throw new Error(`Agent headshot fetch failed (${res.status}): ${src}`);
    }
    const buf = Buffer.from(await res.arrayBuffer());
    const type = res.headers.get("content-type") ?? "image/png";
    return `data:${type};base64,${buf.toString("base64")}`;
  }

  const filePath = path.join(process.cwd(), "public", src.replace(/^\//, ""));
  const buf = await readFile(filePath);
  const ext = path.extname(filePath).slice(1).toLowerCase();
  const mime = ext === "jpg" || ext === "jpeg" ? "image/jpeg" : `image/${ext || "png"}`;
  return `data:${mime};base64,${buf.toString("base64")}`;
}
