import { useEffect } from "react";
import type { Product } from "../data/products";

export interface CartItem {
  product: Product;
  qty: number;
}

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: number) => void;
  onQtyChange: (id: number, qty: number) => void;
  onCheckout: () => void;
}

export default function CartDrawer({ open, onClose, items, onRemove, onQtyChange, onCheckout }: CartDrawerProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const total = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(4px)",
          zIndex: 90,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.35s ease",
        }}
      />

      <div
        style={{
          position: "fixed", top: 0, right: 0, bottom: 0,
          width: "min(420px, 100vw)",
          background: "var(--bg-card)",
          borderLeft: "1px solid var(--border)",
          zIndex: 100,
          display: "flex",
          flexDirection: "column",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {/* Header */}
        <div style={{ padding: "2rem", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)", fontFamily: "'Inter', sans-serif" }}>
              Your Bag
            </p>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "1.6rem", fontWeight: 400, color: "var(--text)", marginTop: 4 }}>
              {items.length} {items.length === 1 ? "item" : "items"}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none", border: "1px solid var(--border)",
              color: "var(--text-muted)", width: 40, height: 40, borderRadius: 2,
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              transition: "color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.borderColor = "var(--text-muted)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem 2rem" }}>
          {items.length === 0 ? (
            <div style={{ textAlign: "center", paddingTop: "4rem" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem", opacity: 0.2 }}>∅</div>
              <p style={{ color: "var(--text-muted)", fontFamily: "'Fraunces', serif", fontStyle: "italic", fontSize: "1.1rem" }}>
                Your bag is empty
              </p>
              <p style={{ color: "var(--text-faint)", fontSize: "0.75rem", marginTop: 8, fontFamily: "'Inter', sans-serif" }}>
                Add pieces to begin
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {items.map((item) => (
                <CartItemRow key={item.product.id} item={item} onRemove={onRemove} onQtyChange={onQtyChange} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: "2rem", borderTop: "1px solid var(--border)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
              <span style={{ color: "var(--text-muted)", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Inter', sans-serif" }}>Total</span>
              <span style={{ fontFamily: "'Fraunces', serif", fontSize: "1.4rem", color: "var(--text)" }}>${total.toLocaleString()}</span>
            </div>
            <button
              onClick={onCheckout}
              style={{
                width: "100%", background: "var(--gold)", color: "var(--gold-on)",
                border: "none", padding: "1rem", fontSize: "0.7rem",
                letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600,
                cursor: "pointer", fontFamily: "'Inter', sans-serif", transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Proceed to Checkout
            </button>
            <button
              onClick={onClose}
              style={{
                width: "100%", background: "none", color: "var(--text-muted)", border: "none",
                padding: "0.75rem", fontSize: "0.65rem", letterSpacing: "0.12em",
                textTransform: "uppercase", cursor: "pointer", fontFamily: "'Inter', sans-serif",
                marginTop: 8, transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}

function CartItemRow({ item, onRemove, onQtyChange }: { item: CartItem; onRemove: (id: number) => void; onQtyChange: (id: number, qty: number) => void }) {
  return (
    <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
      <div style={{ width: 72, height: 90, flexShrink: 0, overflow: "hidden", background: "var(--bg-elevated)" }}>
        <img src={item.product.image} alt={item.product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontFamily: "'Fraunces', serif", fontSize: "0.95rem", color: "var(--text)", marginBottom: 2 }}>{item.product.name}</p>
        <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "'Inter', sans-serif", marginBottom: 8 }}>{item.product.category}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid var(--border)" }}>
            <button onClick={() => onQtyChange(item.product.id, Math.max(1, item.qty - 1))}
              style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>−</button>
            <span style={{ color: "var(--text)", fontSize: "0.8rem", minWidth: 16, textAlign: "center", fontFamily: "'Inter', sans-serif" }}>{item.qty}</span>
            <button onClick={() => onQtyChange(item.product.id, item.qty + 1)}
              style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>+</button>
          </div>
          <p style={{ fontFamily: "'Fraunces', serif", fontSize: "1rem", color: "var(--gold)" }}>${(item.product.price * item.qty).toLocaleString()}</p>
        </div>
      </div>
      <button
        onClick={() => onRemove(item.product.id)}
        style={{ background: "none", border: "none", color: "var(--text-faint)", cursor: "pointer", padding: 4, flexShrink: 0, transition: "color 0.2s" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-faint)")}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
          <path d="M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
        </svg>
      </button>
    </div>
  );
}
