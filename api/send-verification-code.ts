import { sendVerificationEmailRequest } from './_lib/server';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  try {
    const body = await (req.body && typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}'));
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const result = await sendVerificationEmailRequest(email, process.env);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Unable to send verification email.' });
  }
}
