import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F4EBDD",
        }}
      >
        <span style={{ fontSize: 96, color: "#A67C3D", fontFamily: "Georgia, serif" }}>S</span>
      </div>
    ),
    { ...size }
  );
}
