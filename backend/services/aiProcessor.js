import 'dotenv/config';
import fetch from 'node-fetch';

export function processExpense(text) {
  // ... (igual ao seu código atual)
}

const apiKey = process.env.GROK_API_KEY;

export async function generateInsightsWithGrok(expenses) {
  const prompt = `
    Analise os seguintes gastos (em formato JSON) e gere insights financeiros em português, de forma clara e objetiva.
    Responda APENAS neste formato JSON:
    {
      "insights": [
        "Insight 1",
        "Insight 2",
        "Insight 3"
      ]
    }
    Gastos: ${JSON.stringify(expenses)}
  `;

  const response = await fetch('https://api.grok.x.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'grok-3-latest',
      messages: [
        { role: 'system', content: 'Você é um assistente financeiro que gera insights claros e objetivos.' },
        { role: 'user', content: prompt }
      ],
      stream: false,
      temperature: 0
    })
  });

  if (!response.ok) {
    throw new Error('Erro ao consultar a IA Grok');
  }

  const data = await response.json();
  let insights = [];
  try {
    const content = data.choices?.[0]?.message?.content;
    const parsed = JSON.parse(content);
    insights = parsed.insights || [];
  } catch (e) {
    insights = [data.choices?.[0]?.message?.content || 'Não foi possível gerar insights.'];
  }
  return insights;
}