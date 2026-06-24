import { ImageResponse } from "next/og";
import { loadAgentHeadshotDataUrl } from "@/lib/agent-photos";

type AgentIconOptions = {
  size: number;
  borderRadius: number;
};

export async function buildAgentIconResponse({ size, borderRadius }: AgentIconOptions) {
  const src = await loadAgentHeadshotDataUrl();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          borderRadius,
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          width={size}
          height={size}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      </div>
    ),
    { width: size, height: size },
  );
}
