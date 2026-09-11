const fs = require('fs');
const code = `

function chatPlugin(env: Record<string, string>): Plugin {
  return {
    name: 'chat-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          return res.end();
        }
        try {
          const body = await readJsonBody(req);
          if (!env.GEMINI_API_KEY) throw new Error('Gemini API key is missing.');
          if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) throw new Error('Invalid messages format.');
          const { GoogleGenerativeAI } = await import('@google/generative-ai');
          const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
          const SYSTEM_PROMPT = \`You are Onyx, a highly sophisticated, high-end virtual fashion assistant and salesperson for NŌIR, an exclusive luxury fashion store.
Your personality is elegant, refined, helpful, and slightly mysterious. You offer exceptional styling advice.

You have access to NŌIR's product catalog. When relevant, you MUST recommend these specific products to the user to help drive sales.
Always use the exact names of the products and mention their price gracefully. Do not invent products.

NŌIR's Current Catalog:
\${products.map((p: any) => \`- \${p.name} ($\${p.price}): \${p.description}\`).join('\\n')}

Rules:
1. Always maintain the luxurious Onyx persona.
2. If asked about something unrelated to fashion, politely pivot back to fashion or NŌIR's catalog.
3. Be concise and format your messages beautifully (using markdown).\`;
          const history = body.messages.slice(0, -1).map((msg: any) => ({ role: msg.role === 'user' ? 'user' : 'model', parts: [{ text: msg.content }] }));
          const currentMessage = body.messages[body.messages.length - 1].content;
          const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash', systemInstruction: SYSTEM_PROMPT });
          const chat = model.startChat({ history });
          const result = await chat.sendMessage(currentMessage);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ reply: result.response.text() }));
        } catch (error: any) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: error.message }));
        }
      });
    }
  }
}
`;
fs.appendFileSync('vite.config.ts', code);
