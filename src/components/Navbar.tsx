import { useEffect, useState } from "react";
import type { User } from "firebase/auth";

interface NavbarProps {
  page: "home" | "products" | "checkout" | "account";
  setPage: (p: "home" | "products" | "checkout" | "account") => void;
  cartCount: number;
  onCartOpen: () => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
  user: User | null;
  onAccountOpen: () => void;
  onSignOut: () => void;
}

export default function Navbar({ page, setPage, cartCount, onCartOpen, theme, onToggleTheme, user, onAccountOpen, onSignOut }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => { setMenuOpen(false); }, [page]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    if (page !== "home") {
      setPage("home");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 300);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { label: "Home",     action: () => { setPage("home"); window.scrollTo({ top: 0, behavior: "smooth" }); setMenuOpen(false); } },
    { label: "About",    action: () => scrollTo("about") },
    { label: "Products", action: () => { setPage("products"); setMenuOpen(false); } },
    { label: "FAQ",      action: () => scrollTo("faq") },
    { label: "Contact",  action: () => scrollTo("contact") },
  ];

  const navBg = scrolled || menuOpen
    ? "color-mix(in srgb, var(--bg) 96%, transparent)"
    : "transparent";

  return (
    <>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, transition: "background 0.4s, border-color 0.4s", background: navBg, borderBottom: (scrolled || menuOpen) ? "1px solid var(--border)" : "1px solid transparent", backdropFilter: (scrolled || menuOpen) ? "blur(12px)" : "none" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 2rem", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <button
            onClick={() => { setPage("home"); window.scrollTo({ top: 0, behavior: "smooth" }); setMenuOpen(false); }}
            style={{ fontFamily: "'Fraunces', serif", fontSize: "1.5rem", fontWeight: 400, letterSpacing: "0.04em", color: "var(--text)", background: "none", border: "none", cursor: "pointer", transition: "color 0.35s" }}
          >
            NŌIR
          </button>

          {/* Desktop nav links */}
          <div className="noir-nav-links">
            {navItems.map((item) => (
              <button key={item.label} onClick={item.action}
                style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", transition: "color 0.2s", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                {item.label}
              </button>
            ))}

            {/* Theme toggle */}
            <button onClick={onToggleTheme} title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              style={{ position: "relative", width: 52, height: 28, borderRadius: 14, border: "1px solid var(--border)", background: theme === "light" ? "var(--gold)" : "var(--bg-elevated)", cursor: "pointer", padding: 0, transition: "background 0.3s", flexShrink: 0 }}
            >
              <span style={{ position: "absolute", left: 7, top: "50%", transform: "translateY(-50%)", fontSize: "0.6rem", opacity: theme === "light" ? 1 : 0.4, transition: "opacity 0.3s", pointerEvents: "none" }}>☀</span>
              <span style={{ position: "absolute", right: 7, top: "50%", transform: "translateY(-50%)", fontSize: "0.6rem", opacity: theme === "dark" ? 1 : 0.4, transition: "opacity 0.3s", pointerEvents: "none" }}>☽</span>
              <span style={{ position: "absolute", top: 3, left: theme === "light" ? "calc(100% - 25px)" : 3, width: 20, height: 20, borderRadius: "50%", background: theme === "light" ? "#fff" : "var(--gold)", transition: "left 0.3s cubic-bezier(0.4,0,0.2,1)", boxShadow: "0 1px 4px rgba(0,0,0,0.3)", pointerEvents: "none" }} />
            </button>

            <button onClick={onAccountOpen} title={user ? "Open account" : "Sign in or create an account"}
              style={{ background: "none", border: "1px solid var(--border)", color: "var(--text)", padding: "8px 12px", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}
            >
              {user ? getFirstName(user) : "Sign in"}
            </button>

            {/* Cart */}
            <button onClick={onCartOpen}
              style={{ position: "relative", background: "none", border: "1px solid var(--border)", borderRadius: 2, color: "var(--text)", padding: "8px 16px", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "border-color 0.2s, color 0.2s", fontFamily: "'Inter', sans-serif" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.color = "var(--gold)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text)"; }}
            >
              <CartIcon />
              Cart
              {cartCount > 0 && (
                <span style={{ background: "var(--gold)", color: "var(--gold-on)", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", fontWeight: 600 }}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile right: cart icon + hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {/* Mobile cart */}
            <button onClick={onCartOpen} className="noir-hamburger" style={{ position: "relative" }}>
              <CartIcon />
              {cartCount > 0 && (
                <span style={{ position: "absolute", top: -4, right: -4, background: "var(--gold)", color: "var(--gold-on)", borderRadius: "50%", width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.55rem", fontWeight: 600 }}>
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburger button */}
            <button
              className="noir-hamburger"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      <div className={`noir-mobile-menu${menuOpen ? " is-open" : ""}`} style={{ background: "color-mix(in srgb, var(--bg) 96%, transparent)" }}>
        {navItems.map((item) => (
          <button key={item.label} onClick={item.action}
            style={{ background: "none", border: "none", borderBottom: "1px solid var(--border-mid)", color: "var(--text-muted)", fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontWeight: 500, padding: "1rem 0", textAlign: "left", width: "100%", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            {item.label}
          </button>
        ))}
        {/* Theme + cart row */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", paddingTop: "1rem" }}>
          <button onClick={onAccountOpen} style={{ background: "none", border: "1px solid var(--border)", color: "var(--text)", padding: "0.65rem 1rem", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
            {user ? getFirstName(user) : "Sign in / Create account"}
          </button>
          <button onClick={onToggleTheme}
            style={{ position: "relative", width: 52, height: 28, borderRadius: 14, border: "1px solid var(--border)", background: theme === "light" ? "var(--gold)" : "var(--bg-elevated)", cursor: "pointer", padding: 0, flexShrink: 0 }}
          >
            <span style={{ position: "absolute", left: 7, top: "50%", transform: "translateY(-50%)", fontSize: "0.6rem", opacity: theme === "light" ? 1 : 0.4, pointerEvents: "none" }}>☀</span>
            <span style={{ position: "absolute", right: 7, top: "50%", transform: "translateY(-50%)", fontSize: "0.6rem", opacity: theme === "dark" ? 1 : 0.4, pointerEvents: "none" }}>☽</span>
            <span style={{ position: "absolute", top: 3, left: theme === "light" ? "calc(100% - 25px)" : 3, width: 20, height: 20, borderRadius: "50%", background: theme === "light" ? "#fff" : "var(--gold)", transition: "left 0.3s cubic-bezier(0.4,0,0.2,1)", boxShadow: "0 1px 4px rgba(0,0,0,0.3)", pointerEvents: "none" }} />
          </button>
          <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontFamily: "'Inter', sans-serif" }}>{theme === "dark" ? "Dark mode" : "Light mode"}</span>
        </div>
      </div>
    </>
  );
}

function getFirstName(user: User): string {
  return (user.displayName || user.email?.split("@")[0] || "Account").trim().split(/\s+/)[0];
}

function CartIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}
