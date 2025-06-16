import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey });

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

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    let text = response.text;
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
    return ['Não foi possível gerar insights no momento.'];
  }
}

export async function generateAndSaveInsights(userId, db) {
  const snapshot = await db
    .collection('expenses')
    .where('userId', '==', userId)
    .get();
  const expenses = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const insights = await generateInsightsWithGemini(expenses);

  const insightObj = {
    userId,
    insights: Array.isArray(insights) ? insights : [],
    createdAt: new Date(),
  };
  await db.collection('insights').add(insightObj);
}