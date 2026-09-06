import { useState } from "react";

interface LookbookCardProps {
  src: string;
  label: string;
  tall?: boolean;
}

export default function LookbookCard({ src, label, tall }: LookbookCardProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", overflow: "hidden", aspectRatio: tall ? "3/5" : "4/3", height: tall ? "100%" : undefined }}
    >
      <img
        src={src}
        alt={label}
        loading="lazy"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: hovered ? "scale(1.06)" : "scale(1)", transition: "transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)" }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)", transition: "opacity 0.4s", opacity: hovered ? 1 : 0.7 }} />
      <div style={{ position: "absolute", bottom: "1.25rem", left: "1.25rem", right: "1.25rem" }}>
        <p style={{ color: "#f2ede6", fontFamily: "'Fraunces', serif", fontSize: "1rem", fontWeight: 300 }}>{label}</p>
        <p style={{ color: "var(--gold)", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "'Inter', sans-serif", marginTop: "0.25rem", opacity: hovered ? 1 : 0, transition: "opacity 0.3s" }}>
          Shop Now →
        </p>
      </div>
    </div>
  );
}
