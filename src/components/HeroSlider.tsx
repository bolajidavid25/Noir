import { useEffect, useRef, useState } from "react";
import blackDressVideo from "../imports/Black_Dress.mp4";
import chanelVideo from "../imports/chanel_allure_homme_sport.mp4";
import drMartensVideo from "../imports/Dr.Martens.mp4";

interface HeroSliderProps {
  onShopNow: () => void;
}

const slides = [
  {
    id: 1,
    video: chanelVideo,
    poster: "https://images.unsplash.com/photo-1654617058572-f1f473581778?w=1400&h=900&fit=crop&auto=format",
    headline: "Scent of\nExcellence",
    subline: "Ultra-rare fragrance collections — 20 houses, each a masterpiece of perfumery.",
    cta: "Explore Fragrance",
    accent: "Fragrance Edit",
  },
  {
    id: 2,
    video: drMartensVideo,
    poster: "https://images.unsplash.com/photo-1616406432452-07bc5938759d?w=1400&h=900&fit=crop&auto=format",
    headline: "Walk with\nPurpose",
    subline: "Chelsea boots, Oxfords, and every silhouette in between — 100 styles of men's luxury.",
    cta: "Shop Men's Shoes",
    accent: "Men's Shoes",
  },
  {
    id: 3,
    video: blackDressVideo,
    poster: "https://images.unsplash.com/photo-1732706431123-1aac2b46ace6?w=1400&h=900&fit=crop&auto=format",
    headline: "Wear\nthe Night",
    subline: "Evening capsule — limited to 200 pieces worldwide.",
    cta: "View Capsule",
    accent: "Women's Drop",
  },
];

export default function HeroSlider({ onShopNow }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const goTo = (idx: number) => {
    if (animating || idx === current) return;
    setPrev(current);
    setAnimating(true);
    setCurrent(idx);
    setTimeout(() => { setPrev(null); setAnimating(false); }, 800);
  };

  const next = () => goTo((current + 1) % slides.length);
  const prev_ = () => goTo((current - 1 + slides.length) % slides.length);

  const startTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((c) => {
        const n = (c + 1) % slides.length;
        setPrev(c);
        setAnimating(true);
        setTimeout(() => { setPrev(null); setAnimating(false); }, 800);
        return n;
      });
    }, 5500);
  };

  useEffect(() => {
    const vid = videoRefs.current[current];
    if (vid) { vid.currentTime = 0; vid.play().catch(() => {}); }
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((c) => {
        const n = (c + 1) % slides.length;
        setPrev(c);
        setAnimating(true);
        setTimeout(() => { setPrev(null); setAnimating(false); }, 800);
        return n;
      });
    }, 5500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [current]);

  return (
    <section id="home" style={{ position: "relative", height: "100vh", minHeight: 600, overflow: "hidden", background: "#0c0b09" }}>
      {slides.map((slide, i) => {
        const isActive = i === current;
        const isPrev = i === prev;
        return (
          <div
            key={slide.id}
            style={{
              position: "absolute", inset: 0,
              transition: "opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1)",
              opacity: isActive ? 1 : isPrev ? 0 : 0,
              pointerEvents: isActive ? "auto" : "none",
            }}
          >
            <video
              ref={(el) => { videoRefs.current[i] = el; }}
              autoPlay
              muted
              loop
              playsInline
              poster={slide.poster}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
            >
              <source src={slide.video} type="video/mp4" />
            </video>
            {/* Overlay gradients */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.82) 30%, rgba(0,0,0,0.2) 100%)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)" }} />
          </div>
        );
      })}

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, height: "100%", maxWidth: 1400, margin: "0 auto", padding: "0 2rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ maxWidth: 560 }}>
          <div key={`accent-${current}`} style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: "1.5rem", animation: "fadeSlideUp 0.6s 0.1s both" }}>
            <span style={{ display: "block", width: 32, height: 1, background: "#b8965a" }} />
            <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#b8965a", fontFamily: "'Inter', sans-serif" }}>
              {slides[current].accent}
            </span>
          </div>

          <h1
            key={`headline-${current}`}
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(3.5rem, 7vw, 7rem)",
              fontWeight: 300, lineHeight: 1.0,
              color: "#f2ede6",
              marginBottom: "1.5rem",
              whiteSpace: "pre-line",
              animation: "fadeSlideUp 0.7s 0.2s both",
            }}
          >
            {slides[current].headline}
          </h1>

          <p key={`sub-${current}`} style={{ fontSize: "0.9rem", color: "rgba(242,237,230,0.7)", marginBottom: "2.5rem", lineHeight: 1.7, fontFamily: "'Inter', sans-serif", fontWeight: 300, animation: "fadeSlideUp 0.7s 0.35s both" }}>
            {slides[current].subline}
          </p>

          <div key={`cta-${current}`} style={{ display: "flex", gap: "1rem", animation: "fadeSlideUp 0.7s 0.45s both" }}>
            <button
              onClick={onShopNow}
              style={{ background: "#b8965a", color: "#0c0b09", border: "none", padding: "1rem 2.5rem", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer", fontFamily: "'Inter', sans-serif", transition: "opacity 0.2s, transform 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              {slides[current].cta}
            </button>
            <button
              style={{ background: "none", color: "#f2ede6", border: "1px solid rgba(242,237,230,0.35)", padding: "1rem 2rem", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Inter', sans-serif", transition: "border-color 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#f2ede6"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(242,237,230,0.35)"; }}
            >
              Lookbook
            </button>
          </div>
        </div>
      </div>

      {/* Slide controls */}
      <div style={{ position: "absolute", bottom: "2.5rem", left: 0, right: 0, zIndex: 20, maxWidth: 1400, margin: "0 auto", padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => { goTo(i); startTimer(); }}
              style={{ background: i === current ? "#b8965a" : "rgba(242,237,230,0.3)", border: "none", cursor: "pointer", borderRadius: 0, transition: "all 0.3s", width: i === current ? 32 : 8, height: 2, padding: 0 }}
            />
          ))}
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          {[{ fn: () => { prev_(); startTimer(); }, icon: "←" }, { fn: () => { next(); startTimer(); }, icon: "→" }].map(({ fn, icon }) => (
            <button key={icon} onClick={fn}
              style={{ background: "none", border: "1px solid rgba(242,237,230,0.25)", color: "#f2ede6", width: 44, height: 44, cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.2s, color 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#b8965a"; e.currentTarget.style.color = "#b8965a"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(242,237,230,0.25)"; e.currentTarget.style.color = "#f2ede6"; }}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>

      <div style={{ position: "absolute", top: "50%", right: "2rem", transform: "translateY(-50%)", zIndex: 20 }}>
        <span style={{ fontFamily: "'Fraunces', serif", fontSize: "0.75rem", color: "rgba(242,237,230,0.4)", writingMode: "vertical-rl" }}>
          0{current + 1} / 0{slides.length}
        </span>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
