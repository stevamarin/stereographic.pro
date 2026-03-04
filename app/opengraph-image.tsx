import { ImageResponse } from "next/og"

export const alt = "StereoGraphic Production — Sound Design & Audio Post-Production"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "black",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        {/* Logo text */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "white",
            letterSpacing: "-1px",
            marginBottom: 16,
          }}
        >
          StereoGraphic
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 400,
            color: "#a78bfa",
            letterSpacing: "4px",
            textTransform: "uppercase",
            marginBottom: 40,
          }}
        >
          Production
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 24,
            color: "#9ca3af",
            maxWidth: 600,
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          Sound Design & Audio Post-Production for Content Creators & Game Studios
        </div>

        {/* Subtle purple accent line */}
        <div
          style={{
            width: 120,
            height: 3,
            background: "#a78bfa",
            borderRadius: 4,
            marginTop: 40,
          }}
        />
      </div>
    ),
    { ...size }
  )
}
