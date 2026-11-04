import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 70, background: "#101b16", color: "#f2f4ec", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 28, color: "#bed0ad" }}><div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 68, height: 68, border: "2px solid #9ab68b", borderRadius: 20, fontSize: 27 }}>MU</div>Muhammad Usama</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}><div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -4 }}>Senior Software Engineer</div><div style={{ fontSize: 32, color: "#bed0ad" }}>Enterprise platforms · SaaS · 3D experiences</div></div>
      <div style={{ width: "100%", height: 2, background: "#6e8e71" }} />
    </div>,
    size,
  );
}
