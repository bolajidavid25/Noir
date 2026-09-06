interface PaymentSuccessModalProps {
  referenceId: string;
  onViewAccount: () => void;
  onContinue: () => void;
}

export default function PaymentSuccessModal({ referenceId, onViewAccount, onContinue }: PaymentSuccessModalProps) {
  return (
    <div className="success-overlay" role="dialog" aria-modal="true" aria-labelledby="success-title">
      <section className="success-modal">
        <div className="success-mark">✓</div>
        <p className="checkout-kicker">NŌIR / Payment received</p>
        <h2 id="success-title">Your order is confirmed.</h2>
        <p className="success-copy">Thank you for choosing NŌIR. A confirmation has been sent to your email, and your order is now saved to your account.</p>
        <div className="success-reference"><span>Reference ID</span><strong>{referenceId || "Processing"}</strong></div>
        <div className="success-actions"><button className="checkout-button" onClick={onViewAccount}>View account</button><button className="success-secondary" onClick={onContinue}>Continue browsing</button></div>
      </section>
    </div>
  );
}
