// Simple AI helper using an OpenAI‑compatible API.
// You MUST set VITE_OPENAI_API_KEY in a .env file for this to work in your project.
//
// Example .env.local:
// VITE_OPENAI_API_KEY=sk-xxxx
// VITE_OPENAI_MODEL=gpt-4o-mini
//
// This file keeps all AI logic in one place so the UI can stay clean.

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY as string | undefined;
const MODEL =
  (import.meta.env.VITE_OPENAI_MODEL as string | undefined) || 'gpt-4o-mini';

export async function askFarmingAssistant(question: string): Promise<string> {
  if (!API_KEY) {
    return (
      'AI assistant is not fully configured yet.\n\n' +
      'To enable real answers, add your OpenAI API key to a `.env` file as:\n' +
      'VITE_OPENAI_API_KEY=your_key_here\n\n' +
      'In the meantime, here is some general guidance:\n' +
      'Ask about specific crops (maize, rice, cassava, vegetables), planting time, ' +
      'fertilizer use, and pest control for Nigerian conditions.'
    );
  }

  const systemPrompt =
    'You are an expert Nigerian agricultural extension officer. ' +
    'Give clear, practical, and safe advice for small to medium scale farmers. ' +
    'Focus on Nigerian climate (rainy and dry season), common crops (maize, rice, cassava, yam, vegetables), ' +
    'and simple steps farmers can follow. Keep answers concise and easy to understand. ' +
    'IMPORTANT: Do NOT use any markdown formatting like #, ##, **, *, or code blocks. Use plain text only.';

  try {
    const res = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: question },
        ],
        temperature: 0.7,
        max_tokens: 400,
      }),
    });

    if (!res.ok) {
      console.error('AI API error status:', res.status, await res.text());
      return (
        'I could not reach the AI service at the moment. Please try again later.'
      );
    }

    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };

    const content = data.choices?.[0]?.message?.content?.trim();
    if (!content) {
      return 'I could not generate a response. Please try asking in a different way.';
    }

    return content;
  } catch (error) {
    console.error('AI request failed:', error);
    return 'Network error while contacting the AI service. Please check your internet connection and try again.';
  }
}


