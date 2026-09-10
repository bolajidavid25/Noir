import crypto from 'node:crypto';
import Stripe from 'stripe';
import { Resend } from 'resend';
import { products } from '../../src/data/products.js';

export function getServerEnv() {
  let privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY || '';
  if (privateKey.startsWith('"') && privateKey.endsWith('"')) privateKey = privateKey.slice(1, -1);
  if (privateKey.startsWith("'") && privateKey.endsWith("'")) privateKey = privateKey.slice(1, -1);
  privateKey = privateKey.replace(/\\n/g, '\n').trim();

  return {
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || '',
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || '',
    RESEND_API_KEY: process.env.RESEND_API_KEY || '',
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL || '',
    RESEND_CONTACT_TO_EMAIL: process.env.RESEND_CONTACT_TO_EMAIL || '',
    FIREBASE_ADMIN_PROJECT_ID: process.env.FIREBASE_ADMIN_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID || '',
    FIREBASE_ADMIN_CLIENT_EMAIL: process.env.FIREBASE_ADMIN_CLIENT_EMAIL || '',
    FIREBASE_ADMIN_PRIVATE_KEY: privateKey,
    APP_URL: process.env.APP_URL || 'http://localhost:8443',
  };
}

export async function getFirebaseAdmin(env: NodeJS.ProcessEnv) {
  const projectId = env.FIREBASE_ADMIN_PROJECT_ID?.trim();
  const clientEmail = env.FIREBASE_ADMIN_CLIENT_EMAIL?.trim();
  let privateKey = env.FIREBASE_ADMIN_PRIVATE_KEY?.trim() || '';
  if (privateKey.startsWith('"') && privateKey.endsWith('"')) privateKey = privateKey.slice(1, -1);
  if (privateKey.startsWith("'") && privateKey.endsWith("'")) privateKey = privateKey.slice(1, -1);
  privateKey = privateKey.replace(/\\n/g, '\n');
  
  if (privateKey) {
    const match = privateKey.match(/-----BEGIN PRIVATE KEY-----\s*(.*?)\s*-----END PRIVATE KEY-----/s);
    if (match) {
      const body = match[1].replace(/\s+/g, '');
      privateKey = `-----BEGIN PRIVATE KEY-----\n${body.match(/.{1,64}/g)?.join('\n')}\n-----END PRIVATE KEY-----\n`;
    }
  }
  if (!projectId || !clientEmail || !privateKey) return null;
  const [{ cert, getApps, initializeApp: initializeAdminApp }, { getAuth: getAdminAuth }, { getFirestore: getAdminFirestore }] = await Promise.all([
    import('firebase-admin/app'),
    import('firebase-admin/auth'),
    import('firebase-admin/firestore'),
  ]);
  const app = getApps()[0] || initializeAdminApp({ credential: cert({ projectId, clientEmail, privateKey }) });
  return { auth: getAdminAuth(app), firestore: getAdminFirestore(app) };
}

export function readRawBody(req: any): Promise<string> {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.setEncoding?.('utf8');
    req.on('data', (chunk: any) => { raw += chunk; });
    req.on('end', () => resolve(raw));
    req.on('error', reject);
  });
}

export function emailLayout(title: string, content: string): string {
  return `<div style="background:#0c0b09;padding:40px 20px;font-family:Arial,sans-serif;color:#aaa"><div style="max-width:560px;margin:auto;border:1px solid #3b3630;padding:36px;background:#151310"><div style="color:#b8965a;letter-spacing:6px;font-size:12px;margin-bottom:28px">NŌIR</div><h1 style="font-family:Georgia,serif;font-weight:normal;color:#f2ede6;font-size:32px">${title}</h1><p style="line-height:1.8">${content}</p><p style="border-top:1px solid #3b3630;padding-top:20px;margin-top:32px;font-size:12px">noir-studio.com</p></div></div>`;
}

export function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

export function formatAmount(amountInCents: number): string {
  return `$${(amountInCents / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
}

function verificationSecret(env: NodeJS.ProcessEnv): string {
  return env.VERIFICATION_CODE_SECRET || env.STRIPE_WEBHOOK_SECRET || env.STRIPE_SECRET_KEY || 'noir-verification-secret';
}

function createVerificationToken(email: string, code: string, expiresAt: number, env: NodeJS.ProcessEnv): string {
  const payload = Buffer.from(JSON.stringify({
    email,
    codeHash: crypto.createHash('sha256').update(code).digest('hex'),
    expiresAt,
  })).toString('base64url');
  const signature = crypto.createHmac('sha256', verificationSecret(env)).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

function verifyVerificationToken(email: string, code: string, token: string, env: NodeJS.ProcessEnv): boolean {
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;
  const expectedSignature = crypto.createHmac('sha256', verificationSecret(env)).update(payload).digest('base64url');
  if (signature.length !== expectedSignature.length) return false;
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) return false;
  try {
    const saved = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as { email?: string; codeHash?: string; expiresAt?: number };
    return saved.email === email
      && Boolean(saved.expiresAt && saved.expiresAt > Date.now())
      && saved.codeHash === crypto.createHash('sha256').update(code).digest('hex');
  } catch {
    return false;
  }
}

export async function sendVerificationEmailRequest(email: string, env: NodeJS.ProcessEnv) {
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    throw new Error('Enter a valid email address.');
  }
  if (!env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL) {
    throw new Error('Email verification is not configured. Add RESEND_API_KEY and RESEND_FROM_EMAIL.');
  }

  const code = crypto.randomInt(100000, 1000000).toString();
  const expiresAt = Date.now() + 10 * 60 * 1000;

  const resend = new Resend(env.RESEND_API_KEY);
  const result = await resend.emails.send({
    from: env.RESEND_FROM_EMAIL,
    to: email,
    subject: 'Your NŌIR verification code',
    html: emailLayout('Verify your email', `Your NŌIR verification code is <strong style="font-size:28px;letter-spacing:8px;color:#b8965a">${code}</strong><br><br>This code expires in 10 minutes. If you did not request it, you can safely ignore this message.`),
  });

  if (result.error) {
    throw new Error(result.error.message);
  }

  return { sent: true, verificationToken: createVerificationToken(email, code, expiresAt, env) };
}

export async function verifyEmailCodeRequest(email: string, code: string, token: string, env: NodeJS.ProcessEnv) {
  const verified = verifyVerificationToken(email, code, token, env);
  if (!verified) {
    throw new Error('That code is incorrect or has expired.');
  }
  return { verified: true };
}

export async function sendContactMessageRequest(body: Record<string, any>, env: NodeJS.ProcessEnv) {
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (!name || !/^\S+@\S+\.\S+$/.test(email) || !subject || !message) {
    throw new Error('Please complete every field before sending your message.');
  }

  if (name.length > 120 || email.length > 200 || subject.length > 200 || message.length > 5000) {
    throw new Error('One or more fields are too long.');
  }

  if (!env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL) {
    throw new Error('Email delivery is not configured.');
  }

  const resend = new Resend(env.RESEND_API_KEY);
  
  // Send the message to the store owner
  const result = await resend.emails.send({
    from: env.RESEND_FROM_EMAIL,
    to: env.RESEND_CONTACT_TO_EMAIL || 'Bolajidavid05@gmail.com',
    replyTo: email,
    subject: `NŌIR contact: ${subject}`,
    html: emailLayout(`Message from ${escapeHtml(name)}`, `<strong style="color:#b8965a">${escapeHtml(subject)}</strong><br><br>${escapeHtml(message).replace(/\n/g, '<br>')}<br><br><span style="font-size:12px">Reply directly to this email to reach ${escapeHtml(email)}.</span>`),
  });

  if (result.error) {
    throw new Error(result.error.message);
  }

  // Send a confirmation email to the user
  const confirmationResult = await resend.emails.send({
    from: env.RESEND_FROM_EMAIL,
    to: email,
    subject: 'We have received your message - NŌIR',
    html: emailLayout(
      'Message Received',
      `Dear ${escapeHtml(name)},<br><br>Thank you for reaching out to us. We have received your message regarding <strong style="color:#b8965a">"${escapeHtml(subject)}"</strong> and our team will provide a response within the next 24 hours.<br><br>Best regards,<br>The NŌIR Team`
    ),
  });

  if (confirmationResult.error) {
    console.error('Failed to send confirmation email to user:', confirmationResult.error);
    // We do not throw an error here to avoid failing the whole request if the confirmation email fails.
  }

  return { sent: true };
}

export async function createCheckoutSessionRequest(body: Record<string, any>, env: NodeJS.ProcessEnv, origin: string) {
  const secretKey = env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('Stripe is not configured. Add STRIPE_SECRET_KEY to your environment variables.');
  }

  const firebaseAdmin = await getFirebaseAdmin(env);
  const idToken = typeof body.idToken === 'string' ? body.idToken : '';
  
  let firebaseUid = 'guest';
  let firebaseEmail = typeof body.email === 'string' ? body.email : '';

  if (idToken && firebaseAdmin) {
    try {
      const verifiedUser = await firebaseAdmin.auth.verifyIdToken(idToken);
      firebaseUid = verifiedUser.uid;
      if (verifiedUser.email) {
        firebaseEmail = verifiedUser.email;
      }
    } catch (err) {
      // Ignore token verification errors to allow fallback to guest checkout,
      // or you could throw an error if you want to enforce strictly valid tokens.
    }
  }

  const requestedItems = Array.isArray(body.items) ? body.items : [];
  const lineItems = requestedItems.map((item: { id?: unknown; qty?: unknown }) => {
    const product = products.find((candidate) => candidate.id === Number(item.id));
    const quantity = Math.floor(Number(item.qty));
    if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
      throw new Error('One or more cart items are invalid.');
    }

    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.name,
          description: product.category,
          images: /^https:\/\//.test(product.image) ? [product.image] : undefined,
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity,
    };
  });

  if (lineItems.length === 0) {
    throw new Error('Your cart is empty.');
  }

  const stripe = new Stripe(secretKey);
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: lineItems,
    customer_email: firebaseEmail || undefined,
    shipping_address_collection: {
      allowed_countries: ['GB', 'US', 'FR', 'IT', 'DE'],
    },
    shipping_options: [{
      shipping_rate_data: {
        type: 'fixed_amount',
        fixed_amount: { amount: 2500, currency: 'usd' },
        display_name: 'Standard delivery',
        delivery_estimate: { minimum: { unit: 'business_day', value: 3 }, maximum: { unit: 'business_day', value: 6 } },
      },
    }],
    metadata: {
      firebaseUid,
      firebaseEmail,
    },
    success_url: `${origin}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/?checkout=cancelled`,
  });

  return { url: session.url };
}
