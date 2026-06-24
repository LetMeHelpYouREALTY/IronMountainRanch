import { ImageResponse } from "next/og";
import { agentInfo, officeInfo, siteConfig } from "./site-config";

/** Universal social preview size (1.91:1) — Facebook, LinkedIn, X large card */
export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;
export const OG_IMAGE_CONTENT_TYPE = "image/png";

export type OgCardInput = {
  headline: string;
  subheadline: string;
  badge?: string;
};

export function buildOgImageResponse({
  headline,
  subheadline,
  badge,
}: OgCardInput) {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #0f172a 0%, #1d4ed8 45%, #0f172a 100%)",
          color: "#ffffff",
          padding: "56px 64px",
          justifyContent: "space-between",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {badge ? (
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                background: "#2563eb",
                color: "#ffffff",
                fontSize: 22,
                fontWeight: 700,
                padding: "10px 20px",
                borderRadius: 999,
              }}
            >
              {badge}
            </div>
          ) : null}
          <div
            style={{
              display: "flex",
              fontSize: 58,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: 1000,
            }}
          >
            {headline}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              lineHeight: 1.35,
              color: "#dbeafe",
              maxWidth: 980,
            }}
          >
            {subheadline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            borderTop: "2px solid rgba(255,255,255,0.2)",
            paddingTop: 24,
          }}
        >
          <div style={{ display: "flex", fontSize: 28, fontWeight: 700 }}>
            {agentInfo.name} · {agentInfo.title}
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#bfdbfe" }}>
            {siteConfig.fullName}
          </div>
          <div style={{ display: "flex", fontSize: 20, color: "#93c5fd" }}>
            {officeInfo.address.full} · {agentInfo.phoneFormatted}
          </div>
        </div>
      </div>
    ),
    { ...OG_IMAGE_SIZE }
  );
}

export function getDefaultOgImageAlt(headline: string): string {
  return `${headline} — ${siteConfig.fullName} in northwest Las Vegas (89131)`;
}
