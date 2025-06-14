import 'dotenv/config';
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || "AIzaSyCq3T7gC8WyxRXPMefwid8cWaZIWkrfFr0";
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
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    // O novo SDK retorna o texto diretamente
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
    throw new Error('Erro ao consultar a IA Gemini');
  }
}