import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          border: "1px solid #A67C3D",
        }}
      >
        <span style={{ fontSize: 20, color: "#A67C3D", fontFamily: "Georgia, serif" }}>S</span>
      </div>
    ),
    { ...size }
  );
}
