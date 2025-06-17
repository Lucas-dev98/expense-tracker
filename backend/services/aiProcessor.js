import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';

// Lê a chave da API Gemini do arquivo .env
const apiKey = process.env.GEMINI_API_KEY;
// Inicializa o cliente da Gemini AI com a chave da API
const ai = new GoogleGenAI({ apiKey });

/**
 * Gera insights financeiros usando a IA Gemini com base nos gastos fornecidos.
 * @param {Array} expenses - Lista de gastos do usuário.
 * @returns {Promise<Array>} - Array de insights gerados pela IA.
 */
export async function generateInsightsWithGemini(expenses) {
  // Monta o prompt para a IA, pedindo resposta em formato JSON
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
    // Faz a chamada à API Gemini para gerar os insights
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    let text = response.text;
    let insights = [];
    try {
      // Tenta extrair e fazer o parse do JSON retornado pela IA
      const match = text.match(/\{[\s\S]*\}/);
      if (match) {
        const parsed = JSON.parse(match[0]);
        insights = parsed.insights || [];
      } else {
        // Se não encontrar JSON, retorna o texto bruto como insight
        insights = [text];
      }
    } catch (e) {
      // Se der erro no parse, retorna o texto bruto como insight
      insights = [text];
    }
    return insights;
  } catch (error) {
    // Em caso de erro na chamada à IA, retorna mensagem padrão
    console.error('Erro ao consultar a IA Gemini:', error);
    return ['Não foi possível gerar insights no momento.'];
  }
}

/**
 * Busca todos os gastos do usuário, gera insights com a IA Gemini e salva no Firestore.
 * @param {string} userId - ID do usuário.
 * @param {object} db - Instância do Firestore.
 */
export async function generateAndSaveInsights(userId, db) {
  // Busca todos os gastos do usuário no Firestore
  const snapshot = await db
    .collection('expenses')
    .where('userId', '==', userId)
    .get();
  const expenses = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // Gera insights usando a IA Gemini
  const insights = await generateInsightsWithGemini(expenses);

  // Monta o objeto de insights para salvar no Firestore
  const insightObj = {
    userId,
    insights: Array.isArray(insights) ? insights : [],
    createdAt: new Date(),
  };
  // Salva os insights na coleção 'insights'
  await db.collection('insights').add(insightObj);
}