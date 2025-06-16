import { generateInsightsWithGemini } from './aiProcessor.js';

const expenses = [
  {
    description: "Supermercado",
    amount: 250,
    category: "Alimentação",
    createdAt: new Date().toISOString(),
    type: "Saida"
  },
  {
    description: "Salário",
    amount: 3000,
    category: "Renda",
    createdAt: new Date().toISOString(),
    type: "Entrada"
  }
];

(async () => {
  const insights = await generateInsightsWithGemini(expenses);
  console.log("Insights gerados pela Gemini:", insights);
})();