import { useState, useMemo } from "react";
import ProductCard from "../components/ProductCard";
import { products, categories } from "../data/products";
import type { Product } from "../data/products";

interface AllProductsPageProps {
  setPage: (p: "home" | "products") => void;
  onAddToCart: (product: Product) => void;
  initialCategory?: string;
  onViewed: (product: Product) => void;
}

const ITEMS_PER_PAGE = 24;

export default function AllProductsPage({ setPage, onAddToCart, initialCategory = "all", onViewed }: AllProductsPageProps) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sort, setSort] = useState<"default" | "asc" | "desc">("default");
  const [page, setLocalPage] = useState(1);

  const filtered = useMemo(() => {
    return products
      .filter((p) => activeCategory === "all" || p.category === activeCategory)
      .sort((a, b) => sort === "asc" ? a.price - b.price : sort === "desc" ? b.price - a.price : 0);
  }, [activeCategory, sort]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const visible = filtered.slice(0, page * ITEMS_PER_PAGE);

  const switchCategory = (id: string) => {
    setActiveCategory(id);
    setLocalPage(1);
  };

  return (
    <div style={{ minHeight: "100vh", paddingTop: 72, background: "var(--bg)", transition: "background 0.35s" }}>

      {/* Header */}
      <div style={{ padding: "5rem 2rem 3rem", borderBottom: "1px solid var(--border-mid)", background: "var(--bg-deep)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 70% 50%, color-mix(in srgb, var(--gold) 6%, transparent) 0%, transparent 60%)" }} />
        <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative" }}>
          <button onClick={() => setPage("home")} style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Inter', sans-serif", display: "flex", alignItems: "center", gap: 8, marginBottom: "2rem", padding: 0, transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}>← Back to Home</button>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "0.75rem" }}>
            <span style={{ display: "block", width: 32, height: 1, background: "var(--gold)" }} />
            <span style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)", fontFamily: "'Inter', sans-serif" }}>The Collection</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(2.5rem, 5vw, 5.5rem)", fontWeight: 300, color: "var(--text)", lineHeight: 1.0 }}>
                {activeCategory === "all" ? "All Products" : activeCategory}
              </h1>
              <p style={{ color: "var(--text-muted)", fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.85rem", marginTop: "0.75rem" }}>
                {filtered.length.toLocaleString()} piece{filtered.length !== 1 ? "s" : ""} available
              </p>
            </div>
            <select value={sort} onChange={(e) => { setSort(e.target.value as typeof sort); setLocalPage(1); }} style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--text-muted)", padding: "0.5rem 1rem", fontSize: "0.65rem", letterSpacing: "0.08em", fontFamily: "'Inter', sans-serif", cursor: "pointer", outline: "none" }}>
              <option value="default">Sort: Default</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filter bar — horizontally scrollable */}
      <div style={{ borderBottom: "1px solid var(--border-mid)", background: "var(--bg-deep)", position: "sticky", top: 72, zIndex: 30 }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 2rem", overflowX: "auto", display: "flex", alignItems: "stretch", height: 52, scrollbarWidth: "none" }}>
          <div style={{ display: "flex", gap: "0.1rem", alignItems: "center", minWidth: "max-content" }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => switchCategory(cat.id)}
                style={{
                  background: activeCategory === cat.id ? "var(--gold)" : "none",
                  border: "none",
                  color: activeCategory === cat.id ? "var(--gold-on)" : "var(--text-muted)",
                  padding: "0 1rem",
                  height: "100%",
                  fontSize: "0.62rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: activeCategory === cat.id ? 600 : 400,
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "3rem 2rem" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "6rem 0", color: "var(--text-muted)", fontFamily: "'Fraunces', serif", fontStyle: "italic", fontSize: "1.5rem" }}>Nothing here yet.</div>
        ) : (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.5rem" }}>
              {visible.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} onViewed={onViewed} />
              ))}
            </div>

            {/* Load more */}
            {page < totalPages && (
              <div style={{ textAlign: "center", marginTop: "3rem" }}>
                <button
                  onClick={() => setLocalPage((p) => p + 1)}
                  style={{ background: "none", border: "1px solid var(--border)", color: "var(--text-muted)", padding: "0.85rem 2.5rem", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Inter', sans-serif", transition: "color 0.2s, border-color 0.2s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--gold)"; e.currentTarget.style.borderColor = "var(--gold)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}
                >
                  Load More — {filtered.length - visible.length} remaining
                </button>
              </div>
            )}

            <p style={{ textAlign: "center", color: "var(--text-faint)", fontSize: "0.65rem", fontFamily: "'Inter', sans-serif", marginTop: "2rem" }}>
              Showing {visible.length} of {filtered.length.toLocaleString()} pieces
            </p>
          </>
        )}
      </div>

      <div style={{ borderTop: "1px solid var(--border-mid)", padding: "2rem", textAlign: "center" }}>
        <p style={{ color: "var(--text-faint)", fontSize: "0.7rem", fontFamily: "'Fraunces', serif", fontStyle: "italic" }}>NŌIR — Crafted with obsession. © 2026</p>
      </div>
    </div>
  );
}
