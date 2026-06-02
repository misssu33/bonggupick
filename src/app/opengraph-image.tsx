import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "봉구픽 — AI 쇼핑·숏폼 운영 연구소";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 22,
            color: "#2563eb",
            fontWeight: 600,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#2563eb",
            }}
          />
          AI 쇼핑·숏폼 운영 연구소
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 56,
            fontWeight: 700,
            color: "#0f172a",
            lineHeight: 1.2,
            maxWidth: 900,
          }}
        >
          봉구픽
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 28,
            color: "#64748b",
            lineHeight: 1.5,
            maxWidth: 880,
          }}
        >
          TikTok Affiliate · AI 상세페이지 · 쇼츠 전환 구조 아카이브
        </div>
      </div>
    ),
    { ...size },
  );
}
