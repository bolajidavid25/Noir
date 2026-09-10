import { useState, type FormEvent } from "react";
import { auth } from "../lib/firebase";
import type { CartItem } from "../components/CartDrawer";

interface CheckoutPageProps {
  items: CartItem[];
  onBack: () => void;
  onRemove: (id: number) => void;
  onQtyChange: (id: number, qty: number) => void;
}

export default function CheckoutPage({ items, onBack, onRemove, onQtyChange }: CheckoutPageProps) {
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("United Kingdom");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationToken, setVerificationToken] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const shipping = subtotal > 2500 ? 0 : 25;
  const total = subtotal + shipping;

  const beginPayment = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          items: items.map((product) => ({
            id: product.product.id,
            name: product.product.name,
            category: product.product.category,
            image: product.product.image,
            price: product.product.price,
            qty: product.qty,
          })),
        }),
      });
      const result = await readApiResponse(response);
      if (!response.ok || !result.url) throw new Error(result.error || "Unable to start checkout.");
      window.location.assign(result.url);
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : "Unable to start checkout.");
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <main style={{ minHeight: "75vh", padding: "10rem 2rem 6rem", maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
        <p className="checkout-kicker">Your bag</p>
        <h1 className="checkout-title">Nothing waiting yet.</h1>
        <p style={{ color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "2rem" }}>Return to the collection and choose a piece worth keeping.</p>
        <button className="checkout-button checkout-button-secondary" onClick={onBack}>Continue Shopping</button>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="checkout-shell">
        <div className="checkout-heading">
          <button className="checkout-back" onClick={onBack} aria-label="Back to shopping">← Back to collection</button>
          <p className="checkout-kicker">NŌIR / Checkout</p>
          <h1 className="checkout-title">Complete your order.</h1>
          <p className="checkout-intro">A considered edit, prepared for its next chapter.</p>
        </div>

        <div className="checkout-grid">
          <form className="checkout-form" onSubmit={beginPayment}>
            <section className="checkout-section">
              <div className="checkout-section-heading"><span>01</span><h2>Contact</h2></div>
              <label className="checkout-label" htmlFor="email">Email address</label>
              <div className="checkout-verification-row">
                <input className="checkout-input" id="email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
              </div>
            </section>

            <section className="checkout-section">
              <div className="checkout-section-heading"><span>02</span><h2>Delivery</h2></div>
              <label className="checkout-label" htmlFor="country">Country or region</label>
              <select className="checkout-input" id="country" value={country} onChange={(event) => setCountry(event.target.value)}>
                <option>United Kingdom</option>
                <option>United States</option>
                <option>France</option>
                <option>Italy</option>
                <option>Germany</option>
              </select>
              <p className="checkout-helper">Delivery details and payment are completed securely with Stripe.</p>
            </section>

            {error && <p className="checkout-error" role="alert">{error}</p>}
            <button className="checkout-button" type="submit" disabled={loading}>
              {loading ? "Opening secure checkout..." : `Pay securely · $${total.toLocaleString()}`}
            </button>
            <p className="checkout-secure"><span>◆</span> Secure payment powered by Stripe</p>
          </form>

          <aside className="checkout-summary">
            <div className="checkout-summary-header"><p className="checkout-kicker">Your edit</p><span>{items.reduce((sum, item) => sum + item.qty, 0)} pieces</span></div>
            <div className="checkout-items">
              {items.map(({ product, qty }) => (
                <div className="checkout-item" key={product.id}>
                  <img src={product.image} alt={product.name} />
                  <div className="checkout-item-copy">
                    <h3>{product.name}</h3>
                    <p>{product.category}</p>
                    <div className="checkout-item-controls">
                      <div className="checkout-quantity"><button type="button" onClick={() => onQtyChange(product.id, Math.max(1, qty - 1))}>−</button><span>{qty}</span><button type="button" onClick={() => onQtyChange(product.id, qty + 1)}>+</button></div>
                      <button className="checkout-remove" type="button" onClick={() => onRemove(product.id)}>Remove</button>
                    </div>
                  </div>
                  <strong>${(product.price * qty).toLocaleString()}</strong>
                </div>
              ))}
            </div>
            <div className="checkout-totals"><div><span>Subtotal</span><span>${subtotal.toLocaleString()}</span></div><div><span>Delivery</span><span>{shipping ? `$${shipping}` : "Complimentary"}</span></div><div className="checkout-total"><span>Total</span><span>${total.toLocaleString()}</span></div></div>
          </aside>
        </div>
      </div>
    </main>
  );
}

  async function readApiResponse(response: Response): Promise<{ url?: string; error?: string; verificationToken?: string }> {
  const text = await response.text();
  if (!text) return {};
  try {
    return JSON.parse(text) as { url?: string; error?: string };
  } catch {
    return { error: response.ok ? "The server returned an invalid response." : `The server returned an error (${response.status}). Please try again.` };
  }
}
