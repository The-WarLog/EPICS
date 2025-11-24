
import { OpenRouter } from '@openrouter/sdk';

const openRouter = new OpenRouter({
  apiKey: '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',
  
});


// POST /api/v1/chat
const chatResponse = async (req, res) => {
  const { message, history } = req.body;
  //const key = process.env.GEMINI_API_KEY;
  //if (!key) return res.status(500).json({ error: 'Gemini API NOT FOUND' });

  try {
    const messages = [
      { role: 'system', 
        content: 'You are a helpful agricultural assistant that provides concise, actionable advice for crop diseases and treatments to Indian Rural Farmers multiple langauges.' },
      ...(Array.isArray(history) ? history : []),
      { role: 'user', content: message }
    ];

    const completion=await openRouter.chat.send({
       model: 'x-ai/grok-4.1-fast:free',
      messages: messages,
    })

    const reply = await completion.choices?.[0]?.message?.content ?? 'No Response';
    //const text = data?.choices?.[0]?.message?.content ?? data?.choices?.[0]?.text ?? null;
    return res.json({ reply: reply, raw: completion });
  } catch (err) {
    console.error('Chat proxy error:', err);
    return res.status(500).json({ error: err.message || 'Chat proxy error' });
  }
};

export default chatResponse ;