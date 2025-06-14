import db from '../config/firebase.js';
import Insight from '../models/insight.js';
import Expense from '../models/expense.js';
import { isValidExpense } from '../utils/validators.js';
import { generateInsightsWithGemini } from '../services/aiProcessor.js';

export const addExpense = async (req, res) => {
  try {
    const { description, amount, category, userId, createdAt } = req.body;

    const expense = new Expense({
      description,
      amount,
      category,
      userId,
      createdAt: createdAt ? new Date(createdAt) : new Date(),
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

export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('expenses').doc(id).delete();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir gasto.' });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, amount, category, createdAt } = req.body;
    await db
      .collection('expenses')
      .doc(id)
      .update({
        description,
        amount,
        category,
        createdAt: createdAt ? new Date(createdAt) : new Date(),
      });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao editar gasto.' });
  }
};

export const getInsights = async (req, res) => {
  try {
    const { userId } = req.query;
    const snapshot = await db
      .collection('expenses')
      .where('userId', '==', userId)
      .get();
    const expenses = snapshot.docs.map((doc) => doc.data());
    const insights = await generateInsightsWithGemini(expenses);

    // Salva os insights no banco (opcional)
    const insightDoc = new Insight({ userId, insights, createdAt: new Date() });
    await db.collection('insights').add({ ...insightDoc });

    res.json({ insights });
  } catch (error) {
    console.error('Erro ao gerar/salvar insights:', error);
    res
      .status(500)
      .json({ error: `Erro ao gerar/salvar insights: ${error.message}` });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const { userId } = req.query;
    const snapshot = await db
      .collection('expenses')
      .where('userId', '==', userId)
      .get();
    const expenses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar gastos.' });
  }
};
