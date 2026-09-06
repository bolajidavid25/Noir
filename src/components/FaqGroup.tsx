import { type ReactNode } from "react";

interface FaqGroupProps {
  label: string;
  children: ReactNode;
}

export default function FaqGroup({ label, children }: FaqGroupProps) {
  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <p style={{ fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", fontFamily: "'Inter', sans-serif", marginBottom: "1rem", fontWeight: 600 }}>{label}</p>
      <div style={{ display: "flex", flexDirection: "column" }}>{children}</div>
    </div>
  );
}
