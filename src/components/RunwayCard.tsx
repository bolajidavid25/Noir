import { useState } from "react";

interface RunwayCardProps {
  src: string;
  label: string;
  onClick: () => void;
}

export default function RunwayCard({ src, label, onClick }: RunwayCardProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", overflow: "hidden", aspectRatio: "2/3", cursor: "pointer" }}
    >
      <img
        src={src}
        alt={label}
        loading="lazy"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: hovered ? "scale(1.08)" : "scale(1)", transition: "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)", filter: hovered ? "brightness(0.85)" : "brightness(0.7)" }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)" }} />
      <div style={{ position: "absolute", bottom: "1.25rem", left: "1rem", right: "1rem" }}>
        <p style={{ color: "#f2ede6", fontFamily: "'Fraunces', serif", fontSize: "0.9rem", fontStyle: "italic", fontWeight: 300 }}>{label}</p>
      </div>
      {hovered && (
        <div style={{ position: "absolute", top: "1rem", right: "1rem", background: "var(--gold)", color: "var(--gold-on)", fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.3rem 0.6rem", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
          Shop
        </div>
      )}
    </div>
  );
}
