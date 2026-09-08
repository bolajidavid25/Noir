import { useEffect, useState, type FormEvent } from "react";
import { createUserWithEmailAndPassword, getRedirectResult, signInWithEmailAndPassword, signInWithRedirect, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "../lib/firebase";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const saveProfile = async (uid: string, profile: { name: string; email: string }) => {
    try {
      await setDoc(doc(db, "users", uid), {
        ...profile,
        updatedAt: serverTimestamp(),
      }, { merge: true });
    } catch {
      // Authentication should still succeed if profile persistence is unavailable.
    }
  };

  useEffect(() => {
    let active = true;
    getRedirectResult(auth).then(async (result) => {
      if (!active || !result) return;
      await saveProfile(result.user.uid, { name: result.user.displayName || "", email: result.user.email || "" });
    }).catch((authError) => {
      if (active) setError(getAuthErrorMessage(authError));
    });
    return () => { active = false; };
  }, []);

  if (!open) return null;

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (mode === "signup") {
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(credential.user, { displayName: name });
        await saveProfile(credential.user.uid, { name, email });
      } else {
        const credential = await signInWithEmailAndPassword(auth, email, password);
        await saveProfile(credential.user.uid, { name: credential.user.displayName || "", email: credential.user.email || email });
      }
      onClose();
    } catch (authError) {
      setError(getAuthErrorMessage(authError));
    } finally {
      setLoading(false);
    }
  };

  const googleSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (authError) {
      setError(getAuthErrorMessage(authError));
      setLoading(false);
    }
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <section className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-title" onClick={(event) => event.stopPropagation()}>
        <button className="auth-close" onClick={onClose} aria-label="Close account dialog">×</button>
        <p className="checkout-kicker">NŌIR / Account</p>
        <h2 id="auth-title">{mode === "login" ? "Welcome back." : "Create your account."}</h2>
        <p className="auth-intro">Save your edit, track orders, and keep every NŌIR reference in one place.</p>

        <button className="auth-google" type="button" onClick={googleSignIn} disabled={loading}>Continue with Google</button>
        <div className="auth-divider"><span>or</span></div>

        <form onSubmit={submit} className="auth-form">
          {mode === "signup" && <label>Name<input value={name} onChange={(event) => setName(event.target.value)} required autoComplete="name" /></label>}
          <label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" /></label>
          <label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={6} autoComplete={mode === "login" ? "current-password" : "new-password"} /></label>
          {error && <p className="auth-error" role="alert">{error}</p>}
          <button className="auth-submit" type="submit" disabled={loading}>{loading ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}</button>
        </form>

        <button className="auth-switch" type="button" onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}>
          {mode === "login" ? "New to NŌIR? Create an account" : "Already have an account? Sign in"}
        </button>
      </section>
    </div>
  );
}

function getAuthErrorMessage(error: unknown): string {
  const code = getAuthErrorCode(error);
  const messages: Record<string, string> = {
    "auth/email-already-in-use": "An account already exists with this email. Sign in instead.",
    "auth/invalid-credential": "The email or password is incorrect.",
    "auth/invalid-email": "Enter a valid email address.",
    "auth/weak-password": "Use a password with at least 6 characters.",
    "auth/popup-closed-by-user": "Google sign-in was cancelled.",
    "auth/popup-blocked": "Your browser blocked the Google sign-in window. Allow pop-ups for this site and try again.",
    "auth/unauthorized-domain": "This site is not authorized for Google sign-in. Add the current site domain in Firebase Authentication > Settings > Authorized domains.",
    "auth/operation-not-allowed": "This sign-in method is not enabled in Firebase Authentication.",
    "auth/account-exists-with-different-credential": "An account already exists with this email. Sign in using the original sign-in method.",
    "auth/network-request-failed": "Network error. Check your connection and try again.",
  };
  return messages[code] || "Unable to authenticate. Check your details and try again.";
}

function getAuthErrorCode(error: unknown): string {
  return typeof error === "object" && error !== null && "code" in error ? String(error.code) : "";
}
