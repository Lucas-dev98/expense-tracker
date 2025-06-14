import { generateInsightsWithGrok } from './aiProcessor.js';
import 'dotenv/config';

const despesasTeste = [
  { description: "Almoço no restaurante", amount: 45.5, category: "Alimentação", createdAt: new Date(), userId: "teste" },
  { description: "Uber para o trabalho", amount: 22, category: "Transporte", createdAt: new Date(), userId: "teste" },
  { description: "Farmácia - remédio", amount: 60, category: "Saúde", createdAt: new Date(), userId: "teste" }
];

(async () => {
  try {
    const insights = await generateInsightsWithGrok(despesasTeste);
    console.log("INSIGHTS DA IA GROK:");
    insights.forEach((insight, idx) => console.log(`${idx + 1}. ${insight}`));
  } catch (e) {
    console.error("Erro ao testar IA Grok:", e);
  }
})();