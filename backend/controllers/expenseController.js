import db from '../config/firebase.js';
import Expense from '../models/expense.js';
import { isValidExpense } from '../utils/validators.js';
import { generateInsightsWithGrok, processExpense } from '../services/aiProcessor.js';

export const addExpense = async (req, res) => {
  try {
    const { description, userId } = req.body;
    const { amount, category } = processExpense(description);

    const expense = new Expense({
      description,
      amount,
      category,
      userId,
      createdAt: new Date(),
    });

    if (!isValidExpense(expense)) {
      return res.status(400).json({ error: 'Dados de despesa inválidos.' });
    }

    const docRef = await db.collection('expenses').add({ ...expense });

    res.json({ id: docRef.id, ...expense });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao adicionar gasto.' });
  }
};

export const getInsights = async (req, res) => {
  try {
    res.set('Cache-Control', 'no-store');
    const { userId } = req.query;
    const snapshot = await db
      .collection('expenses')
      .where('userId', '==', userId)
      .get();
    const expenses = snapshot.docs.map((doc) => doc.data());
    const insights = await generateInsightsWithGrok(expenses);
    console.log('Insights gerados:');
    insights.forEach((insight, idx) => {
      console.log(`  ${idx + 1}. ${insight}`);
    });
    res.json({ insights });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar insights.' });
  }
};