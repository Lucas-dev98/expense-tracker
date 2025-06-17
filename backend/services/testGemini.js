// Importa a função responsável por gerar insights usando a IA Gemini
import { generateInsightsWithGemini } from './aiProcessor.js';

// Exemplo de lista de gastos simulados para teste da IA
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

// Função auto-executável para testar a geração de insights
(async () => {
  // Chama a IA Gemini para gerar insights com base nos gastos simulados
  const insights = await generateInsightsWithGemini(expenses);
  // Exibe os insights gerados no console
  console.log("Insights gerados pela Gemini:", insights);
})();