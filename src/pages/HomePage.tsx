import { useState, useRef, type ReactNode } from "react";
import HeroSlider from "../components/HeroSlider";
import ProductCard from "../components/ProductCard";
import LookbookCard from "../components/LookbookCard";
import RunwayCard from "../components/RunwayCard";
import FaqGroup from "../components/FaqGroup";
import FaqItem from "../components/FaqItem";
import { products, categoryMeta } from "../data/products";
import type { Product } from "../data/products";

interface HomePageProps {
  setPage: (p: "home" | "products") => void;
  onAddToCart: (product: Product) => void;
  setCategory: (c: string) => void;
  onViewed: (product: Product) => void;
}


const featured     = products.filter((p) => p.tag === "Featured").slice(0, 3);
const newArrivals  = products.filter((p) => p.tag === "New").slice(0, 6);
const limited      = [
  products.find((p) => p.name === "Crimson Statement Gown"),
  ...products.filter((p) => p.tag === "Limited" && p.name !== "Crimson Statement Gown").slice(0, 1),
  (() => {
    const gown = products.find((p) => p.name === "Noir Sequin Gown");
    return gown ? {
      ...gown,
      name: "Blue Hour Gown",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1400&h=900&fit=crop&auto=format",
    } : undefined;
  })(),
].filter((p): p is Product => Boolean(p));
const trending     = products.filter((p) => p.tag).slice(8, 16);
const bagSpotlight = products.filter((p) => p.category === "Bags").slice(0, 4);

const lookbookImages = [
  { src: "https://images.unsplash.com/photo-1613909671501-f9678ffc1d33?w=600&h=900&fit=crop&auto=format", label: "Women's Collection", cat: "Women's Clothing", span: "tall" },
  { src: "https://images.unsplash.com/photo-1635279474047-ab3cda78bbe8?w=600&h=500&fit=crop&auto=format", label: "Runway Looks", cat: "Women's Clothing", span: "short" },
  { src: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600&h=500&fit=crop&auto=format", label: "Men's Tailoring", cat: "Men's Clothing", span: "short" },
  { src: "https://images.unsplash.com/photo-1543728069-a3f97c5a2f32?w=600&h=700&fit=crop&auto=format", label: "The Show", cat: "Women's Clothing", span: "mid" },
  { src: "https://images.unsplash.com/photo-1762430790694-aedd36b4cb8c?w=600&h=700&fit=crop&auto=format", label: "Runway Edit", cat: "Men's Clothing", span: "mid" },
  { src: "https://images.unsplash.com/photo-1662532577856-e8ee8b138a8b?w=600&h=900&fit=crop&auto=format", label: "Statement Dressing", cat: "Women's Clothing", span: "tall" },
];

const runwayStrip = [
  { src: "https://images.unsplash.com/photo-1685432531593-1afc8a152e5f?w=400&h=600&fit=crop&auto=format", label: "Street Style" },
  { src: "https://images.unsplash.com/photo-1662893992324-397132d77dbd?w=400&h=600&fit=crop&auto=format", label: "Couture" },
  { src: "https://images.unsplash.com/photo-1629511565591-a1d494ad6c58?w=400&h=600&fit=crop&auto=format", label: "Power Dressing" },
  { src: "https://images.unsplash.com/photo-1675685828170-fe4b100acd24?w=400&h=600&fit=crop&auto=format", label: "Garden Party" },
  { src: "https://images.unsplash.com/photo-1679101893304-045625840a94?w=400&h=600&fit=crop&auto=format", label: "Evening Formal" },
];

export default function HomePage({ setPage, onAddToCart, setCategory, onViewed }: HomePageProps) {
  const nav = (cat: string) => { setCategory(cat); setPage("products"); };

  return (
    <div>
      <HeroSlider onShopNow={() => setPage("products")} />

      {/* Shop by Category — 9 categories in asymmetric grid */}
      <section id="categories" style={{ padding: "6rem 2rem", background: "var(--bg-deep)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <SectionLabel>Shop by Category</SectionLabel>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(2rem, 3.5vw, 3.5rem)", fontWeight: 300, color: "var(--text)", lineHeight: 1.1 }}>
              Every desire,<br /><em style={{ color: "var(--gold)", fontStyle: "italic" }}>covered.</em>
            </h2>
            <GhostButton onClick={() => setPage("products")}>View All →</GhostButton>
          </div>

          {/* Row 1 */}
          <div className="noir-cat-row-1" style={{ marginBottom: "0.875rem" }}>
            {(["Women's Shoes", "Bags", "Men's Shoes"] as const).map((cat) => (
              <CategoryCard key={cat} cat={cat} onClick={() => nav(cat)} />
            ))}
          </div>
          {/* Row 2 */}
          <div className="noir-cat-row-2" style={{ marginBottom: "0.875rem" }}>
            {(["Women's Clothing", "Women's Suits", "Men's Clothing"] as const).map((cat) => (
              <CategoryCard key={cat} cat={cat} onClick={() => nav(cat)} />
            ))}
          </div>
          {/* Row 3 */}
          <div className="noir-cat-row-3">
            {(["Men's Suits", "Jewelry", "Fragrance"] as const).map((cat) => (
              <CategoryCard key={cat} cat={cat} onClick={() => nav(cat)} />
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="noir-pad-xl" style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div className="noir-about-grid">
          <div>
            <SectionLabel>About NŌIR</SectionLabel>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(2.5rem, 4vw, 4rem)", fontWeight: 300, lineHeight: 1.1, color: "var(--text)", marginBottom: "1.5rem" }}>
              Obsession with<br /><em style={{ fontStyle: "italic", color: "var(--gold)" }}>craft</em> above all else.
            </h2>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.9, fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.9rem", marginBottom: "1.5rem" }}>
              Founded in 2019 in a small Parisian atelier, NŌIR was born from a refusal to compromise. Every piece we make begins with a question: would we wear it ourselves?
            </p>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.9, fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.9rem", marginBottom: "2.5rem" }}>
              Shoes crafted in Naples, bags in Florence, suits cut on Savile Row, jewelry cast in Antwerp, and fragrance composed in Grasse. We refuse shortcuts at every step.
            </p>
            <div className="noir-stats-grid">
              {[["9", "Categories"], ["450+", "Products"], ["100+", "Brands"], ["60+", "Countries"]].map(([num, label]) => (
                <div key={label}>
                  <p style={{ fontFamily: "'Fraunces', serif", fontSize: "1.8rem", color: "var(--gold)", fontWeight: 300 }}>{num}</p>
                  <p style={{ fontSize: "0.6rem", color: "var(--text-muted)", letterSpacing: "0.08em", fontFamily: "'Inter', sans-serif" }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: -24, right: -24, bottom: 24, left: 24, border: "1px solid var(--border)", zIndex: 0 }} />
            <img
              src="https://images.unsplash.com/photo-1779912217839-96eabe1de90b?w=700&h=880&fit=crop&auto=format"
              alt="NŌIR editorial"
              loading="lazy"
              style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", position: "relative", zIndex: 1 }}
            />
          </div>
        </div>
      </section>

      {/* Featured */}
      <section id="featured" style={{ padding: "4rem 2rem 6rem", background: "var(--bg-deep)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem" }}>
            <div>
              <SectionLabel>Curated Selection</SectionLabel>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(2rem, 3.5vw, 3.5rem)", fontWeight: 300, color: "var(--text)", lineHeight: 1.1 }}>Featured Pieces</h2>
            </div>
            <GhostButton onClick={() => setPage("products")}>View All →</GhostButton>
          </div>
          <div className="noir-featured-grid">
            {featured.map((p) => <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} onViewed={onViewed} />)}
          </div>
        </div>
      </section>

      {/* The Lookbook — editorial masonry grid */}
      <section style={{ padding: "6rem 2rem", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem" }}>
            <div>
              <SectionLabel>Editorial</SectionLabel>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(2rem, 3.5vw, 3.5rem)", fontWeight: 300, color: "var(--text)", lineHeight: 1.1 }}>
                The Lookbook
              </h2>
            </div>
            <GhostButton onClick={() => setPage("products")}>Shop the Look →</GhostButton>
          </div>
          {/* Masonry-style grid */}
          <div className="noir-lookbook-grid">
            {/* Col 1: tall */}
            <div className="noir-lookbook-tall" style={{ position: "relative", overflow: "hidden", cursor: "pointer" }}
              onClick={() => nav(lookbookImages[0].cat)}>
              <LookbookCard src={lookbookImages[0].src} label={lookbookImages[0].label} tall />
            </div>
            {/* Col 2 top */}
            <div style={{ position: "relative", overflow: "hidden", cursor: "pointer" }}
              onClick={() => nav(lookbookImages[1].cat)}>
              <LookbookCard src={lookbookImages[1].src} label={lookbookImages[1].label} />
            </div>
            {/* Col 3 top */}
            <div style={{ position: "relative", overflow: "hidden", cursor: "pointer" }}
              onClick={() => nav(lookbookImages[2].cat)}>
              <LookbookCard src={lookbookImages[2].src} label={lookbookImages[2].label} />
            </div>
            {/* Col 2 bottom */}
            <div style={{ position: "relative", overflow: "hidden", cursor: "pointer" }}
              onClick={() => nav(lookbookImages[3].cat)}>
              <LookbookCard src={lookbookImages[3].src} label={lookbookImages[3].label} />
            </div>
            {/* Col 3 bottom */}
            <div style={{ position: "relative", overflow: "hidden", cursor: "pointer" }}
              onClick={() => nav(lookbookImages[4].cat)}>
              <LookbookCard src={lookbookImages[4].src} label={lookbookImages[4].label} />
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals — horizontal scroll */}
      <section className="noir-arrivals-section">
        <div className="noir-arrivals-header">
          <div>
            <SectionLabel>Just Dropped</SectionLabel>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(2rem, 3.5vw, 3.5rem)", fontWeight: 300, color: "var(--text)", lineHeight: 1.1 }}>New Arrivals</h2>
          </div>
          <GhostButton onClick={() => setPage("products")}>See All New →</GhostButton>
        </div>
        <div className="noir-arrivals-strip">
          {newArrivals.map((p) => (
            <div key={p.id} className="noir-arrivals-card">
              <ProductCard product={p} onAddToCart={onAddToCart} onViewed={onViewed} />
            </div>
          ))}
        </div>
      </section>

      {/* House of Bags — feature section */}
      <section className="noir-pad-lg" style={{ background: "var(--bg-deep)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div className="noir-bags-split">
            {/* Left: editorial image */}
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, color-mix(in srgb, var(--gold) 12%, transparent) 0%, transparent 60%)", zIndex: 1, pointerEvents: "none" }} />
              <img
                src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=1000&fit=crop&auto=format"
                alt="House of Bags editorial"
                loading="lazy"
                style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", display: "block" }}
              />
              <div style={{ position: "absolute", bottom: "2rem", left: "2rem", zIndex: 2 }}>
                <span style={{ background: "var(--gold)", color: "var(--gold-on)", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", padding: "0.4rem 0.9rem", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>10 Houses</span>
              </div>
            </div>
            {/* Right: copy + 2×2 bag grid */}
            <div>
              <SectionLabel>The Bag Edit</SectionLabel>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(2rem, 3vw, 3.5rem)", fontWeight: 300, color: "var(--text)", lineHeight: 1.1, marginBottom: "1rem" }}>
                House of<br /><em style={{ color: "var(--gold)", fontStyle: "italic" }}>Bags.</em>
              </h2>
              <p style={{ color: "var(--text-muted)", fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.85rem", lineHeight: 1.8, marginBottom: "2rem", maxWidth: 400 }}>
                Hermès, Chanel, Bottega Veneta — fifty pieces from the world's greatest maisons, each a considered investment in enduring craft.
              </p>
              <div className="noir-bags-mini" style={{ marginBottom: "2rem" }}>
                {bagSpotlight.map((p) => (
                  <div key={p.id} style={{ position: "relative", overflow: "hidden", cursor: "pointer", background: "var(--bg-elevated)" }} onClick={() => nav("Bags")}>
                    <img src={p.image} alt={p.name} loading="lazy" style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover", display: "block", transition: "transform 0.5s" }}
                      onMouseEnter={(e) => ((e.target as HTMLImageElement).style.transform = "scale(1.07)")}
                      onMouseLeave={(e) => ((e.target as HTMLImageElement).style.transform = "scale(1)")} />
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0.6rem", background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }}>
                      <p style={{ color: "#f2ede6", fontSize: "0.65rem", fontFamily: "'Inter', sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</p>
                    </div>
                  </div>
                ))}
              </div>
              <GhostButton onClick={() => nav("Bags")}>Shop All Bags →</GhostButton>
            </div>
          </div>
        </div>
      </section>

      {/* Limited editions */}
      <section style={{ padding: "0 2rem 6rem" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <LimitedBanner limited={limited} onAddToCart={onAddToCart} setPage={setPage} />
        </div>
      </section>

      {/* Trending Now — 8-product grid */}
      <section className="noir-pad-lg" style={{ background: "var(--bg)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem" }}>
            <div>
              <SectionLabel>Right Now</SectionLabel>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(2rem, 3.5vw, 3.5rem)", fontWeight: 300, color: "var(--text)", lineHeight: 1.1 }}>Trending Now</h2>
            </div>
            <GhostButton onClick={() => setPage("products")}>View All →</GhostButton>
          </div>
          <div className="noir-trending-grid">
            {trending.map((p) => <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} onViewed={onViewed} />)}
          </div>
        </div>
      </section>

      {/* The Runway Strip */}
      <section className="noir-pad-lg" style={{ background: "var(--bg-deep)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem" }}>
            <div>
              <SectionLabel>SS · FW · 2026</SectionLabel>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(2rem, 3.5vw, 3.5rem)", fontWeight: 300, color: "var(--text)", lineHeight: 1.1 }}>
                The Runway<br /><em style={{ fontStyle: "italic", color: "var(--gold)" }}>Edit.</em>
              </h2>
            </div>
            <GhostButton onClick={() => setPage("products")}>Shop the Edit →</GhostButton>
          </div>
          <div className="noir-runway-grid">
            {runwayStrip.map(({ src, label }, i) => (
              <RunwayCard key={i} src={src} label={label} onClick={() => setPage("products")} />
            ))}
          </div>
        </div>
      </section>

      {/* Category spotlight row */}
      <section style={{ padding: "0 2rem 6rem", background: "var(--bg-deep)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", paddingTop: "5rem" }}>
          <SectionLabel>Explore More</SectionLabel>
          <div className="noir-spotlight-grid" style={{ marginTop: "2rem" }}>
            {[
              { cat: "Men's Suits", label: "100 suits", desc: "10 types. 10 houses. Every occasion covered." },
              { cat: "Women's Suits", label: "100 looks", desc: "Power blazers to velvet tuxedos. 10 brands." },
              { cat: "Fragrance", label: "20 collections", desc: "Ultra-rare sets from Creed, Clive Christian, Roja Parfums and more." },
            ].map(({ cat, label, desc }) => (
              <SpotlightCard key={cat} cat={cat} label={label} desc={desc} onClick={() => nav(cat)} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="noir-pad-xl" style={{ background: "var(--bg)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <SectionLabel>Got Questions</SectionLabel>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(2.5rem, 4vw, 4rem)", fontWeight: 300, color: "var(--text)", lineHeight: 1.1, marginBottom: "1rem" }}>
              Frequently Asked<br /><em style={{ fontStyle: "italic", color: "var(--gold)" }}>Questions.</em>
            </h2>
            <p style={{ color: "var(--text-muted)", fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.9rem", maxWidth: 520, margin: "0 auto" }}>
              Everything you need to know about buying, security, and the authenticity of every piece in our collection.
            </p>
          </div>

          <div className="noir-faq-grid">
            {/* Left column */}
            <div>
              <FaqGroup label="Ordering & Payment">
                <FaqItem q="How do I place an order?">
                  Browse any category, add items to your bag, and proceed to checkout. We accept Visa, Mastercard, Amex, PayPal, Apple Pay, Google Pay, and Stripe. All transactions are processed instantly via PCI DSS Level 1 certified infrastructure.
                </FaqItem>
                <FaqItem q="Can I modify or cancel my order after placing it?">
                  Orders can be modified or cancelled within 2 hours of placement by contacting hello@noir-studio.com. After fulfillment begins, our standard return policy applies.
                </FaqItem>
                <FaqItem q="Do you offer instalment or Buy Now Pay Later options?">
                  Yes — we partner with Klarna and Affirm for eligible orders above £500. Select your preferred option at checkout. Terms are displayed transparently before confirmation.
                </FaqItem>
                <FaqItem q="Are prices inclusive of taxes and duties?">
                  Prices displayed are inclusive of VAT for EU customers. International customers may be subject to local import duties, which are calculated and displayed at checkout before payment.
                </FaqItem>
                <FaqItem q="Do you offer gift wrapping or personal messages?">
                  Every NŌIR order ships in our signature matte black gift box with tissue and a silk ribbon. A handwritten note can be added at checkout — complimentary on all orders.
                </FaqItem>
              </FaqGroup>

              <FaqGroup label="Shipping & Delivery">
                <FaqItem q="Where do you ship to?">
                  We ship to over 60 countries worldwide via DHL Express, FedEx Priority, and specialist art logistics couriers for high-value pieces. Free shipping on all orders above £1,000.
                </FaqItem>
                <FaqItem q="How long does delivery take?">
                  UK & EU: 1–3 business days. USA & Canada: 2–4 business days. Rest of world: 3–6 business days. Express next-day options are available at checkout for most destinations.
                </FaqItem>
                <FaqItem q="Is my order insured during shipping?">
                  Yes — every shipment is fully insured for its declared retail value at no additional cost. High-value items (£5,000+) are shipped via bonded courier with dedicated tracking and signature requirement.
                </FaqItem>
              </FaqGroup>
            </div>

            {/* Right column */}
            <div>
              <FaqGroup label="Security & Privacy">
                <FaqItem q="Is my payment information secure?">
                  Absolutely. We use 256-bit SSL encryption and never transmit raw card data through our servers. All payment processing is handled directly by Stripe, a PCI DSS Level 1 certified provider — the highest standard available.
                </FaqItem>
                <FaqItem q="Do you store my card details?">
                  No. NŌIR does not store, log, or have access to your full card number at any point. Stripe's tokenisation means even our engineers cannot see your payment details.
                </FaqItem>
                <FaqItem q="How is my personal data used?">
                  Your data is used solely to fulfil your order and improve your experience. We never sell or share personal data with third parties for marketing. Full details are in our Privacy Policy, compliant with GDPR and CCPA.
                </FaqItem>
                <FaqItem q="What happens if there is suspicious activity on my account?">
                  Our fraud detection layer monitors all transactions in real time. Any suspicious activity triggers an immediate account freeze and notification to you. Our security team responds within 30 minutes, 24/7.
                </FaqItem>
              </FaqGroup>

              <FaqGroup label="Authenticity & Returns">
                <FaqItem q="How do I know products are authentic?">
                  Every product sold through NŌIR is sourced directly from the brand, its authorised distributors, or verified pre-owned specialists. Each piece undergoes a 12-point authentication inspection by our in-house team before dispatch.
                </FaqItem>
                <FaqItem q="Do items come with original packaging and certificates?">
                  Yes — all new items ship with original brand packaging, dust bags, authenticity cards, and certificates of authenticity where issued by the manufacturer. Pre-owned items include our own NŌIR Authentication Certificate.
                </FaqItem>
                <FaqItem q="What is your return policy?">
                  Unworn, undamaged items may be returned within 14 days of receipt for a full refund. Fragrances, custom or personalised items, and Limited Edition pieces are non-returnable. Returns are free on all UK orders.
                </FaqItem>
                <FaqItem q="How do I care for luxury items?">
                  Each product ships with a care card specific to its materials — leather treatments, fabric care codes, and fragrance preservation guidance. Our customer team is available via chat for specialist care advice.
                </FaqItem>
              </FaqGroup>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="noir-pad-xl">
        <div style={{ maxWidth: 1400, margin: "0 auto" }} className="noir-contact-grid">
          <div>
            <SectionLabel>Reach Us</SectionLabel>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(2rem, 3.5vw, 3.5rem)", fontWeight: 300, color: "var(--text)", lineHeight: 1.1, marginBottom: "1.5rem" }}>
              {"Let's talk about"}<br /><em style={{ color: "var(--gold)", fontStyle: "italic" }}>something rare.</em>
            </h2>
            <p style={{ color: "var(--text-muted)", fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.9rem", lineHeight: 1.8, marginBottom: "2rem" }}>
              For bespoke orders, press inquiries, or collaboration proposals. We respond within 24 hours.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[["hello@noir-studio.com", "Email"], ["+33 1 42 86 00 00", "Phone"], ["12 Rue du Faubourg, Paris", "Studio"]].map(([val, label]) => (
                <div key={label} style={{ display: "flex", gap: "1rem", alignItems: "center", borderBottom: "1px solid var(--border-mid)", paddingBottom: "1rem" }}>
                  <span style={{ fontSize: "0.6rem", letterSpacing: "0.1em", color: "var(--text-muted)", textTransform: "uppercase", fontFamily: "'Inter', sans-serif", minWidth: 52 }}>{label}</span>
                  <span style={{ color: "var(--text)", fontFamily: "'Inter', sans-serif", fontSize: "0.85rem" }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <Footer setPage={setPage} nav={nav} />
    </div>
  );
}

// ── Category Card ─────────────────────────────────────────────────────────────
function CategoryCard({ cat, onClick }: { cat: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const meta = categoryMeta[cat];
  if (!meta) return null;
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", cursor: "pointer", background: "var(--bg-elevated)" }}
    >
      <img
        src={meta.image} alt={meta.headline}
        style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s cubic-bezier(0.4,0,0.2,1)", transform: hovered ? "scale(1.07)" : "scale(1)" }}
      />
      <div style={{ position: "absolute", inset: 0, background: hovered ? "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.08) 60%)" : "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.04) 50%)", transition: "background 0.4s" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.25rem" }}>
        <p style={{ fontSize: "0.5rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(184,150,90,0.9)", fontFamily: "'Inter', sans-serif", marginBottom: 3 }}>{meta.sub}</p>
        <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "1.1rem", fontWeight: 300, color: "#f2ede6", marginBottom: 6 }}>{meta.headline}</h3>
        <div style={{ display: "flex", alignItems: "center", gap: 6, opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(6px)", transition: "opacity 0.3s, transform 0.3s" }}>
          <span style={{ fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#b8965a", fontFamily: "'Inter', sans-serif" }}>Shop Now</span>
          <span style={{ color: "#b8965a", fontSize: "0.7rem" }}>→</span>
        </div>
      </div>
    </div>
  );
}

// ── Spotlight Card ────────────────────────────────────────────────────────────
function SpotlightCard({ cat, label, desc, onClick }: { cat: string; label: string; desc: string; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  const meta = categoryMeta[cat];
  if (!meta) return null;
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: "1.25rem", padding: "1.5rem", border: "1px solid var(--border)", background: hov ? "var(--bg-elevated)" : "var(--bg-card)", cursor: "pointer", transition: "background 0.25s" }}
    >
      <div style={{ width: 100, height: 120, overflow: "hidden", background: "var(--bg-elevated)", flexShrink: 0 }}>
        <img src={meta.image} alt={cat} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s", transform: hov ? "scale(1.06)" : "scale(1)" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: "0.55rem", color: "var(--gold)", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "'Inter', sans-serif", marginBottom: 6 }}>{label}</p>
          <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: "1rem", color: "var(--text)", fontWeight: 400, marginBottom: 8 }}>{cat}</h4>
          <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontFamily: "'Inter', sans-serif", lineHeight: 1.6 }}>{desc}</p>
        </div>
        <p style={{ fontSize: "0.6rem", color: hov ? "var(--gold)" : "var(--text-muted)", letterSpacing: "0.1em", fontFamily: "'Inter', sans-serif", transition: "color 0.2s", marginTop: 8 }}>Explore →</p>
      </div>
    </div>
  );
}

// ── Limited Banner ────────────────────────────────────────────────────────────
function LimitedBanner({ limited, onAddToCart, setPage }: { limited: Product[]; onAddToCart: (p: Product) => void; setPage: (p: "home" | "products") => void }) {
  const [active, setActive] = useState(0);
  const current = limited[active];
  if (!current) return null;
  return (
    <div style={{ border: "1px solid var(--border)", background: "var(--bg-card)", overflow: "hidden" }}>
      {/* Image — cinematic tall crop */}
      <div style={{ position: "relative", overflow: "hidden", background: "var(--bg-elevated)", height: "min(72vh, 680px)" }}>
        <img
          key={current.id}
          src={current.image}
          alt={current.name}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", animation: "limitedFadeIn 0.6s ease" }}
        />
        {/* deep bottom scrim so text pops */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, transparent 35%, rgba(0,0,0,0.72) 100%)" }} />

        {/* label top-left */}
        <div style={{ position: "absolute", top: "1.75rem", left: "2rem", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ display: "block", width: 22, height: 1, background: "var(--gold)" }} />
          <span style={{ fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold)", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Limited Edition</span>
        </div>

        {/* slide dots top-right */}
        <div style={{ position: "absolute", top: "1.6rem", right: "2rem", display: "flex", gap: "0.4rem", alignItems: "center" }}>
          {limited.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{ width: i === active ? 24 : 8, height: 8, borderRadius: 4, background: i === active ? "var(--gold)" : "rgba(255,255,255,0.3)", border: "none", cursor: "pointer", transition: "width 0.3s, background 0.2s", padding: 0 }}
            />
          ))}
        </div>

        {/* product info overlaid on image bottom */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "2rem 2rem 1.75rem", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
          <div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 300, color: "#f2ede6", lineHeight: 1.1, marginBottom: "0.4rem", textShadow: "0 2px 20px rgba(0,0,0,0.4)" }}>{current.name}</h2>
            <p style={{ fontFamily: "'Fraunces', serif", fontSize: "1.4rem", color: "var(--gold)", fontWeight: 300 }}>${current.price.toLocaleString()}</p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexShrink: 0 }}>
            <button
              onClick={() => onAddToCart(current)}
              style={{ background: "var(--gold)", color: "var(--gold-on)", border: "none", padding: "0.8rem 1.8rem", fontSize: "0.63rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer", fontFamily: "'Inter', sans-serif", transition: "opacity 0.2s", whiteSpace: "nowrap" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Add to Bag
            </button>
            <GhostButton onClick={() => setPage("products")}>View All</GhostButton>
          </div>
        </div>
      </div>
      <style>{`@keyframes limitedFadeIn { from { opacity: 0; transform: scale(1.03) } to { opacity: 1; transform: scale(1) } }`}</style>
    </div>
  );
}

// ── Contact Form ──────────────────────────────────────────────────────────────
function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const submitMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setError("");
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    try {
      const response = await fetch("/api/contact-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form.entries())),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to send your message.");
      formElement.reset();
      setStatus("sent");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to send your message.");
      setStatus("error");
    }
  };

  return (
    <form onSubmit={submitMessage} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {[["Name", "text", "Your name"], ["Email", "email", "your@email.com"], ["Subject", "text", "What brings you here?"]].map(([label, type, placeholder]) => (
        <div key={label as string}>
          <label style={{ display: "block", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)", fontFamily: "'Inter', sans-serif", marginBottom: 8 }}>{label}</label>
          <input name={label.toLowerCase()} required type={type as string} placeholder={placeholder as string} style={{ width: "100%", background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--text)", padding: "0.85rem 1rem", fontSize: "0.85rem", fontFamily: "'Inter', sans-serif", outline: "none", transition: "border-color 0.2s" }} onFocus={(e) => (e.currentTarget.style.borderColor = "var(--gold)")} onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")} />
        </div>
      ))}
      <div>
        <label style={{ display: "block", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)", fontFamily: "'Inter', sans-serif", marginBottom: 8 }}>Message</label>
        <textarea name="message" required placeholder="Tell us everything." rows={4} style={{ width: "100%", background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--text)", padding: "0.85rem 1rem", fontSize: "0.85rem", fontFamily: "'Inter', sans-serif", outline: "none", resize: "none", transition: "border-color 0.2s" }} onFocus={(e) => (e.currentTarget.style.borderColor = "var(--gold)")} onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")} />
      </div>
      {status === "sent" && <p style={{ color: "var(--gold)", fontSize: "0.72rem", fontFamily: "'Inter', sans-serif" }}>Your message has been sent.</p>}
      {status === "error" && <p style={{ color: "#d78979", fontSize: "0.72rem", fontFamily: "'Inter', sans-serif" }}>{error}</p>}
      <button type="submit" disabled={status === "sending"} style={{ background: "var(--gold)", color: "var(--gold-on)", border: "none", padding: "1rem", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, cursor: status === "sending" ? "wait" : "pointer", fontFamily: "'Inter', sans-serif", transition: "opacity 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")} onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}>{status === "sending" ? "Sending..." : "Send Message"}</button>
    </form>
  );
}

// ── Shared ────────────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1rem" }}>
      <span style={{ display: "block", width: 24, height: 1, background: "var(--gold)" }} />
      <span style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)", fontFamily: "'Inter', sans-serif" }}>{children}</span>
    </div>
  );
}

function GhostButton({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ background: "none", border: "1px solid var(--border)", color: "var(--text-muted)", padding: "0.7rem 1.4rem", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Inter', sans-serif", transition: "color 0.2s, border-color 0.2s", whiteSpace: "nowrap" }} onMouseEnter={(e) => { e.currentTarget.style.color = "var(--gold)"; e.currentTarget.style.borderColor = "var(--gold)"; }} onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}>
      {children}
    </button>
  );
}

function Footer({ setPage, nav }: { setPage: (p: "home" | "products") => void; nav: (c: string) => void }) {
  return (
    <footer style={{ borderTop: "1px solid var(--border-mid)", padding: "4rem 2rem", background: "var(--bg)", transition: "background 0.35s" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div className="noir-footer-grid">
          <div>
            <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "2rem", fontWeight: 400, color: "var(--text)", marginBottom: "1rem" }}>NŌIR</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", lineHeight: 1.8, fontFamily: "'Inter', sans-serif", fontWeight: 300, maxWidth: 260 }}>Luxury fashion crafted for those who understand that quality is never loud.</p>
          </div>
          {[
            { label: "Navigate", links: [{ text: "Home", fn: () => setPage("home") }, { text: "All Products", fn: () => setPage("products") }, { text: "About", fn: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }) }, { text: "Contact", fn: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }) }] },
            { label: "Categories", links: ["Women's Shoes", "Bags", "Women's Suits", "Men's Suits", "Men's Shoes", "Fragrance"].map((c) => ({ text: c, fn: () => nav(c) })) },
            { label: "Support", links: [{ text: "Shipping", fn: () => {} }, { text: "Returns", fn: () => {} }, { text: "Size Guide", fn: () => {} }, { text: "Care Guide", fn: () => {} }, { text: "Authenticity", fn: () => {} }] },
          ].map((col) => (
            <div key={col.label}>
              <p style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)", fontFamily: "'Inter', sans-serif", marginBottom: "1.25rem" }}>{col.label}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {col.links.map((link) => (
                  <li key={link.text}>
                    <button onClick={link.fn} style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: "0.8rem", cursor: "pointer", padding: 0, fontFamily: "'Inter', sans-serif", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}>{link.text}</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Payment Section */}
        <div style={{ borderTop: "1px solid var(--border-mid)", paddingTop: "2.5rem", marginBottom: "2rem" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", fontFamily: "'Inter', sans-serif" }}>Secure Checkout — 256-bit SSL Encryption</span>
            </div>
            <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
              {/* Visa */}
              <PayBadge>
                <svg viewBox="0 0 60 38" width="52" height="33" style={{ display: "block" }}>
                  <rect width="60" height="38" rx="4" fill="#1a1f71"/>
                  <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fontFamily="'Inter',sans-serif" fontWeight="800" fontSize="18" fill="#FFFFFF" letterSpacing="-1">VISA</text>
                </svg>
              </PayBadge>
              {/* Mastercard */}
              <PayBadge>
                <svg viewBox="0 0 60 38" width="52" height="33" style={{ display: "block" }}>
                  <rect width="60" height="38" rx="4" fill="#252525"/>
                  <circle cx="23" cy="19" r="10" fill="#eb001b"/>
                  <circle cx="37" cy="19" r="10" fill="#f79e1b"/>
                  <path d="M30 11a10 10 0 0 1 0 16A10 10 0 0 1 30 11z" fill="#ff5f00"/>
                </svg>
              </PayBadge>
              {/* Amex */}
              <PayBadge>
                <svg viewBox="0 0 60 38" width="52" height="33" style={{ display: "block" }}>
                  <rect width="60" height="38" rx="4" fill="#2e77bc"/>
                  <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fontFamily="'Inter',sans-serif" fontWeight="800" fontSize="10" fill="#FFFFFF" letterSpacing="0.5">AMERICAN</text>
                  <text x="50%" y="80%" dominantBaseline="middle" textAnchor="middle" fontFamily="'Inter',sans-serif" fontWeight="800" fontSize="10" fill="#FFFFFF" letterSpacing="0.5">EXPRESS</text>
                </svg>
              </PayBadge>
              {/* PayPal */}
              <PayBadge>
                <svg viewBox="0 0 60 38" width="52" height="33" style={{ display: "block" }}>
                  <rect width="60" height="38" rx="4" fill="#f5f7fa"/>
                  <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fontFamily="'Inter',sans-serif" fontWeight="800" fontSize="13" fill="#003087" letterSpacing="-0.5">Pay<tspan fill="#009cde">Pal</tspan></text>
                </svg>
              </PayBadge>
              {/* Apple Pay */}
              <PayBadge>
                <svg viewBox="0 0 60 38" width="52" height="33" style={{ display: "block" }}>
                  <rect width="60" height="38" rx="4" fill="#1c1c1e"/>
                  <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fontFamily="'Inter',sans-serif" fontWeight="600" fontSize="12" fill="#FFFFFF" letterSpacing="-0.3"> Pay</text>
                  <text x="18" y="24" fontFamily="sans-serif" fontSize="16" fill="#FFFFFF"></text>
                </svg>
              </PayBadge>
              {/* Google Pay */}
              <PayBadge>
                <svg viewBox="0 0 60 38" width="52" height="33" style={{ display: "block" }}>
                  <rect width="60" height="38" rx="4" fill="#f8f9fa"/>
                  <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fontFamily="'Inter',sans-serif" fontWeight="600" fontSize="11" fill="#5f6368" letterSpacing="-0.3">G <tspan fill="#4285f4">P</tspan><tspan fill="#ea4335">a</tspan><tspan fill="#fbbc05">y</tspan></text>
                </svg>
              </PayBadge>
              {/* Stripe */}
              <PayBadge>
                <svg viewBox="0 0 60 38" width="52" height="33" style={{ display: "block" }}>
                  <rect width="60" height="38" rx="4" fill="#635bff"/>
                  <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fontFamily="'Inter',sans-serif" fontWeight="700" fontSize="14" fill="#FFFFFF" letterSpacing="-0.5">stripe</text>
                </svg>
              </PayBadge>
            </div>
            <p style={{ fontSize: "0.62rem", color: "var(--text-faint)", fontFamily: "'Inter', sans-serif", textAlign: "center", maxWidth: 420, lineHeight: 1.6 }}>
              All transactions are secured and encrypted. We never store your card details. Powered by Stripe with PCI DSS Level 1 compliance.
            </p>
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--border-mid)", paddingTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ color: "var(--text-faint)", fontSize: "0.7rem", fontFamily: "'Inter', sans-serif" }}>© 2026 NŌIR Studio. All rights reserved.</p>
          <p style={{ color: "var(--text-faint)", fontSize: "0.7rem", fontFamily: "'Fraunces', serif", fontStyle: "italic" }}>Crafted with obsession.</p>
        </div>
      </div>
    </footer>
  );
}

function PayBadge({ children }: { children: ReactNode }) {
  return (
    <div style={{ border: "1px solid var(--border)", borderRadius: 6, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.2s" }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--gold)")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)")}
    >
      {children}
    </div>
  );
}
