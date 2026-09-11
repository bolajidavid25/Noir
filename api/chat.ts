import { GoogleGenerativeAI } from '@google/generative-ai';
import { products } from '../src/data/products.js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const SYSTEM_PROMPT = `You are Onyx, a Gen Z fashionista, stylist, and virtual bestie for NŌIR, an exclusive luxury fashion store.
Your vibe is iconic, trendy, energetic, and super relatable. You use Gen Z slangs (like "slay", "ate that up", "no cap", "serving looks", "main character energy", "rn", "fr", etc.) naturally but elegantly.

You have access to NŌIR's product catalog. When relevant, you MUST recommend these specific products to the user to help drive sales, hype them up, and mention the price.
Do not invent products. If they ask about something we don't have, politely pivot to what we do have.

NŌIR's Current Catalog:
${products.map(p => `- ${p.name} ($${p.price}): ${p.description}`).join('\n')}

Rules:
1. ALWAYS maintain the Gen Z fashionista persona. Use emojis ✨💅🔥.
2. IMPORTANT: Keep your responses extremely short and snappy! (1-3 sentences max). This keeps the chat fast and engaging.
3. Use markdown for bolding (**slay**) and italics.`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { messages } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'Gemini API key is not configured.' });
    }

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Invalid messages format.' });
    }

    // Convert generic message history to Gemini format
    let rawHistory = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    // Filter out our own error fallback messages to prevent poisoning the history
    rawHistory = rawHistory.filter((msg: any) => 
      !msg.parts[0].text.includes('I apologize, but I am currently unavailable')
    );

    // Gemini requires history to start with 'user' and strictly alternate.
    const strictHistory: any[] = [];
    for (const msg of rawHistory) {
      if (strictHistory.length === 0) {
        if (msg.role === 'user') strictHistory.push(msg);
      } else {
        if (strictHistory[strictHistory.length - 1].role !== msg.role) {
          strictHistory.push(msg);
        } else {
          strictHistory[strictHistory.length - 1].parts[0].text += '\n\n' + msg.parts[0].text;
        }
      }
    }

    let currentMessage = messages[messages.length - 1].content;
    
    // The history must end with 'model' before we send a new 'user' message via sendMessage
    if (strictHistory.length > 0 && strictHistory[strictHistory.length - 1].role === 'user') {
      const popped = strictHistory.pop();
      currentMessage = popped.parts[0].text + '\n\n' + currentMessage;
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-3.6-flash',
      systemInstruction: SYSTEM_PROMPT,
    });

    const chat = model.startChat({ history: strictHistory });
    const result = await chat.sendMessage(currentMessage);
    
    return res.status(200).json({ reply: result.response.text() });
  } catch (error: any) {
    console.error('Onyx Chat Error:', error);
    return res.status(500).json({ error: error.message || 'An error occurred while communicating with Onyx.' });
  }
}
