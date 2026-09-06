import { useState, type ReactNode } from "react";

interface FaqItemProps {
  q: string;
  children: ReactNode;
}

export default function FaqItem({ q, children }: FaqItemProps) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: "1px solid var(--border-mid)" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{ width: "100%", background: "none", border: "none", padding: "1.1rem 0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", cursor: "pointer", textAlign: "left" }}
      >
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", color: "var(--text)", fontWeight: 400, lineHeight: 1.4 }}>{q}</span>
        <span style={{ color: "var(--gold)", fontSize: "1rem", flexShrink: 0, transition: "transform 0.3s", transform: open ? "rotate(45deg)" : "rotate(0deg)", display: "block", lineHeight: 1 }}>+</span>
      </button>
      <div style={{ overflow: "hidden", maxHeight: open ? 400 : 0, transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)", paddingBottom: open ? "1.1rem" : 0 }}>
        <p style={{ color: "var(--text-muted)", fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", lineHeight: 1.8, fontWeight: 300 }}>{children}</p>
      </div>
    </div>
  );
}
