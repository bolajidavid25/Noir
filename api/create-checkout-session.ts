import { createCheckoutSessionRequest } from './_lib/server';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  try {
    const body = await (req.body && typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}'));
    const host = req.headers?.['x-forwarded-host'] || req.headers?.host || 'localhost:8443';
    const proto = req.headers?.['x-forwarded-proto'] || 'http';
    const result = await createCheckoutSessionRequest(body, process.env, `${proto}://${host}`);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Unable to create checkout session.' });
  }
}
