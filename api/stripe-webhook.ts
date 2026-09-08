import Stripe from 'stripe';
import { getFirebaseAdmin, readRawBody, formatAmount, emailLayout, getServerEnv } from './_lib/server';
import { getFirebaseAdmin, readRawBody } from './_lib/server.js';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  try {
    const env = getServerEnv();
    const secretKey = env.STRIPE_SECRET_KEY;
    const webhookSecret = env.STRIPE_WEBHOOK_SECRET;
    if (!secretKey || !webhookSecret) {
      res.status(503).end('Stripe webhook is not configured.');
      return;
    }

    const stripe = new Stripe(secretKey);
    const rawBody = await readRawBody(req);
    const signature = req.headers['stripe-signature'] || '';
    const event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const firebaseUid = session.metadata?.firebaseUid;
      const firebaseAdmin = getFirebaseAdmin(env);
      if (!firebaseUid || !firebaseAdmin) {
        throw new Error('Firebase transaction storage is not configured.');
      }

      const email = session.customer_details?.email || session.customer_email;
      const items = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 });

      await firebaseAdmin.firestore.collection('users').doc(firebaseUid).collection('transactions').doc(session.id).set({
        referenceId: session.id,
        stripePaymentIntentId: typeof session.payment_intent === 'string' ? session.payment_intent : null,
        status: session.payment_status,
        amountTotal: session.amount_total || 0,
        currency: session.currency || 'usd',
        customerEmail: email || null,
        items: items.data.map((item) => ({
          name: item.description || 'NŌIR piece',
          quantity: item.quantity || 1,
          amountTotal: item.amount_total || 0,
        })),
        createdAt: (await import('firebase-admin/firestore')).FieldValue.serverTimestamp(),
        updatedAt: (await import('firebase-admin/firestore')).FieldValue.serverTimestamp(),
      });

      if (email) {
        const { Resend } = await import('resend');
        const resend = new Resend(env.RESEND_API_KEY || '');
        const itemRows = items.data.map((item) => `<tr><td style="padding:8px 0;color:#f2ede6">${item.description || 'NŌIR piece'}</td><td style="padding:8px 0;text-align:right;color:#b8965a">${item.quantity || 1} × ${formatAmount(item.amount_total || 0)}</td></tr>`).join('');
        const result = await resend.emails.send({
          from: env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
          to: email,
          subject: 'Your NŌIR order is confirmed',
          html: emailLayout('Order confirmed', `Thank you for choosing NŌIR. Your order is being prepared with care.<br><br><table style="width:100%;border-top:1px solid #3b3630;border-bottom:1px solid #3b3630">${itemRows}</table><br><strong style="color:#f2ede6">Total: ${formatAmount(session.amount_total || 0)}</strong>`),
        });
        if (result.error) {
          throw new Error(result.error.message);
        }
      }
    }

    res.status(200).json({ received: true });
  } catch (error) {
    res.status(400).send(error instanceof Error ? error.message : 'Invalid webhook.');
  }
}
