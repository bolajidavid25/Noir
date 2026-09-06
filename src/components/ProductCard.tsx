import { useState } from "react";
import type { Product } from "../data/products";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewed?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onViewed }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const tagStyle = (tag: string): React.CSSProperties => {
    if (tag === "Limited") return { background: "var(--gold)", color: "var(--gold-on)" };
    if (tag === "New") return { background: "var(--text)", color: "var(--bg)" };
    return { background: "var(--border)", color: "var(--gold)" };
  };

  return (
    <div
      onClick={() => onViewed?.(product)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--bg-card)",
        border: "1px solid",
        borderColor: hovered ? "var(--border)" : "var(--border-mid)",
        cursor: "pointer",
        transition: "border-color 0.3s, transform 0.3s, background 0.35s",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      <div style={{ position: "relative", overflow: "hidden", aspectRatio: "4/5", background: "var(--bg-elevated)" }}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
        />
        {product.tag && (
          <span style={{
            position: "absolute", top: 12, left: 12,
            padding: "3px 10px",
            fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase",
            fontFamily: "'Inter', sans-serif", fontWeight: 600,
            ...tagStyle(product.tag),
          }}>
            {product.tag}
          </span>
        )}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: "color-mix(in srgb, var(--bg) 90%, transparent)",
          padding: "1rem",
          transform: hovered ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}>
          <button
            onClick={handleAdd}
            style={{
              width: "100%",
              background: added ? "var(--border)" : "transparent",
              color: added ? "var(--gold)" : "var(--text)",
              border: "1px solid", borderColor: added ? "var(--gold)" : "var(--border)",
              padding: "0.6rem",
              fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase",
              cursor: "pointer", fontFamily: "'Inter', sans-serif", fontWeight: 500,
              transition: "all 0.2s",
            }}
          >
            {added ? "✓ Added" : "Add to Bag"}
          </button>
        </div>
      </div>

      <div style={{ padding: "1rem" }}>
        <p style={{ fontSize: "0.6rem", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Inter', sans-serif", marginBottom: 4 }}>
          {product.category}
        </p>
        <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "1rem", fontWeight: 400, color: "var(--text)", marginBottom: 6 }}>
          {product.name}
        </h3>
        <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "'Inter', sans-serif", lineHeight: 1.6, marginBottom: 10 }}>
          {product.description}
        </p>
        <p style={{ fontFamily: "'Fraunces', serif", fontSize: "1.1rem", color: "var(--gold)" }}>
          ${product.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
