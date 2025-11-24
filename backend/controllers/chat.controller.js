import express from 'express';
// If running on Node <18, fetch may not be global. Use node-fetch as a fallback.
import nodeFetch from 'node-fetch';

const fetch = globalThis.fetch ?? nodeFetch;

const chatRouter = express.chatRouter();

// POST /api/v1/chat
chatRouter.post('/', async (req, res) => {
  const { message, history } = req.body;
  const key = process.env.OPENAI_API_KEY;
  if (!key) return res.status(500).json({ error: 'OPENAI_API_KEY not configured on server.' });

  try {
    const messages = [
      { role: 'system', content: 'You are a helpful agricultural assistant that provides concise, actionable advice for crop diseases and treatments.' },
      ...(Array.isArray(history) ? history : []),
      { role: 'user', content: message }
    ];

    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages,
        max_tokens: 500,
        temperature: 0.2
      })
    });

    const data = await resp.json();
    const text = data?.choices?.[0]?.message?.content ?? data?.choices?.[0]?.text ?? null;
    return res.json({ reply: text, raw: data });
  } catch (err) {
    console.error('Chat proxy error:', err);
    return res.status(500).json({ error: err.message || 'Chat proxy error' });
  }
});

export default chatRouter;