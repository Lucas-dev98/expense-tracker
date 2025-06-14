import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export async function generateInsightsWithGemini(expenses) {
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

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro-latest' });

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Tenta extrair o JSON dos insights
    let insights = [];
    try {
      const match = text.match(/\{[\s\S]*\}/);
      if (match) {
        const parsed = JSON.parse(match[0]);
        insights = parsed.insights || [];
      } else {
        insights = [text];
      }
    } catch (e) {
      insights = [text];
    }
    return insights;
  } catch (error) {
    console.error('Erro ao consultar a IA Gemini:', error);
    throw new Error('Erro ao consultar a IA Gemini');
  }
}
