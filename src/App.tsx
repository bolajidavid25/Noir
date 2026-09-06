import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { arrayUnion, doc, setDoc } from "firebase/firestore";
import Navbar from "./components/Navbar";
import AuthModal from "./components/AuthModal";
import PaymentSuccessModal from "./components/PaymentSuccessModal";
import CartDrawer from "./components/CartDrawer";
import type { CartItem } from "./components/CartDrawer";
import HomePage from "./pages/HomePage";
import AllProductsPage from "./pages/AllProductsPage";
import CheckoutPage from "./pages/CheckoutPage";
import AccountPage from "./pages/AccountPage";
import type { Product } from "./data/products";
import { auth, db } from "./lib/firebase";

export default function App() {
  const [page, setPage] = useState<"home" | "products" | "checkout" | "account">("home");
  const [activeCategory, setActiveCategory] = useState("all");
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [user, setUser] = useState<User | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [paymentReference, setPaymentReference] = useState<string | null>(null);

  useEffect(() => onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    setAuthChecked(true);
    setAuthOpen(!currentUser);
  }), []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("checkout") === "success") {
      setPaymentReference(params.get("session_id") || "");
      setCartItems([]);
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const handleSetPage = (p: "home" | "products" | "checkout" | "account") => {
    setPage(p);
    if (p === "home") setActiveCategory("all");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSetCategory = (cat: string) => {
    setActiveCategory(cat);
  };

  const addToCart = (product: Product) => {
    if (!user) {
      setAuthOpen(true);
      return;
    }
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) return prev.map((i) => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product, qty: 1 }];
    });
    setCartOpen(true);
  };

  const markViewed = async (product: Product) => {
    if (!user) return;
    try {
      await setDoc(doc(db, "users", user.uid), { viewedItems: arrayUnion(product) }, { merge: true });
    } catch {
      // The product remains usable even if history cannot be updated.
    }
  };

  const removeFromCart = (id: number) => setCartItems((prev) => prev.filter((i) => i.product.id !== id));
  const changeQty = (id: number, qty: number) => setCartItems((prev) => prev.map((i) => i.product.id === id ? { ...i, qty } : i));
  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  return (
    <div style={{ minHeight: "100%", background: "var(--bg)", transition: "background 0.35s ease" }}>
      <Navbar
        page={page}
        setPage={handleSetPage}
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
        user={user}
        onAccountOpen={() => user ? handleSetPage("account") : setAuthOpen(true)}
        onSignOut={() => signOut(auth)}
      />
      <AuthModal open={authChecked && authOpen} onClose={() => setAuthOpen(false)} />
      {paymentReference !== null && <PaymentSuccessModal referenceId={paymentReference} onViewAccount={() => { setPaymentReference(null); handleSetPage("account"); }} onContinue={() => { setPaymentReference(null); handleSetPage("home"); }} />}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onRemove={removeFromCart}
        onQtyChange={changeQty}
        onCheckout={() => { setCartOpen(false); handleSetPage("checkout"); }}
      />
      <div key={page}>
        {page === "home" ? (
          <HomePage
            setPage={handleSetPage}
            onAddToCart={addToCart}
            setCategory={handleSetCategory}
            onViewed={markViewed}
          />
        ) : page === "products" ? (
          <AllProductsPage
            setPage={handleSetPage}
            onAddToCart={addToCart}
            initialCategory={activeCategory}
            onViewed={markViewed}
          />
        ) : page === "checkout" ? (
          <CheckoutPage
            items={cartItems}
            onBack={() => handleSetPage("home")}
            onRemove={removeFromCart}
            onQtyChange={changeQty}
          />
        ) : user ? (
          <AccountPage user={user} onAddToCart={addToCart} onSignOut={() => signOut(auth)} onBack={() => handleSetPage("home")} />
        ) : null}
      </div>
    </div>
  );
}
