import { useEffect, useState } from "react";
import { collection, doc, onSnapshot } from "firebase/firestore";
import type { User } from "firebase/auth";
import ProductCard from "../components/ProductCard";
import type { Product } from "../data/products";
import { db } from "../lib/firebase";

interface AccountPageProps {
  user: User;
  onAddToCart: (product: Product) => void;
  onSignOut: () => void;
  onBack: () => void;
}

type Transaction = {
  id: string;
  referenceId?: string;
  status?: string;
  amountTotal?: number;
  currency?: string;
  customerEmail?: string;
  items?: Array<{ name: string; quantity: number; amountTotal: number }>;
  createdAt?: { seconds?: number };
};

export default function AccountPage({ user, onAddToCart, onSignOut, onBack }: AccountPageProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [viewedItems, setViewedItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribeTransactions = onSnapshot(collection(db, "users", user.uid, "transactions"), (snapshot) => {
      const loadedTransactions = snapshot.docs.map((item) => ({ id: item.id, ...item.data() } as Transaction));
      setTransactions(loadedTransactions.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)));
      setLoading(false);
    }, () => {
      setError("We could not load your order history yet.");
      setLoading(false);
    });
    const unsubscribeProfile = onSnapshot(doc(db, "users", user.uid), (snapshot) => {
      const profile = snapshot.data();
      setViewedItems(Array.isArray(profile?.viewedItems) ? profile.viewedItems as Product[] : []);
    }, () => setError("We could not load your viewed items yet."));
    return () => { unsubscribeTransactions(); unsubscribeProfile(); };
  }, [user.uid]);

  return (
    <main className="account-page">
      <div className="account-shell">
        <header className="account-heading">
          <button className="checkout-back" onClick={onBack}>← Back to collection</button>
          <p className="checkout-kicker">NŌIR / Account</p>
          <h1 className="checkout-title">Your private edit.</h1>
          <p className="checkout-intro">{user.displayName || user.email}. Your references, purchases, and saved pieces in one place.</p>
          <button className="account-signout" onClick={onSignOut}>Sign out</button>
        </header>

        {error && <p className="account-error">{error}</p>}
        <section className="account-section">
          <div className="account-section-heading"><span>01</span><h2>Order history</h2><em>{transactions.length} orders</em></div>
          {loading ? <p className="account-empty">Loading your history...</p> : transactions.length === 0 ? <p className="account-empty">Your first considered purchase will appear here.</p> : (
            <div className="account-orders">
              {transactions.map((transaction) => (
                <article className="account-order" key={transaction.id}>
                  <div><p className="account-order-label">Reference ID</p><strong>{transaction.referenceId || transaction.id}</strong></div>
                  <div><p className="account-order-label">Status</p><span className={`account-status account-status-${transaction.status}`}>{transaction.status || "processing"}</span></div>
                  <div><p className="account-order-label">Total</p><strong>{formatMoney(transaction.amountTotal || 0, transaction.currency)}</strong></div>
                  <div className="account-order-items">{transaction.items?.map((item) => `${item.name} × ${item.quantity}`).join(" · ") || "Order details"}</div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="account-section">
          <div className="account-section-heading"><span>02</span><h2>Recently viewed</h2><em>{viewedItems.length} pieces</em></div>
          {viewedItems.length === 0 ? <p className="account-empty">Pieces you select while browsing will be kept here.</p> : <div className="account-viewed-grid">{viewedItems.map((product) => <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />)}</div>}
        </section>
      </div>
    </main>
  );
}

function formatMoney(cents: number, currency = "usd") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: currency.toUpperCase() }).format(cents / 100);
}
