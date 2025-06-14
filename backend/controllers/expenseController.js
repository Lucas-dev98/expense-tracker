import db from '../config/firebase.js';
import Insight from '../models/insight.js';
import Expense from '../models/expense.js';
import { isValidExpense } from '../utils/validators.js';
import { generateInsightsWithGemini } from '../services/aiProcessor.js';

import db from '../config/firebase.js';

// Adicionar gasto
export const addExpense = async (req, res) => {
  try {
    const {
      description,
      amount,
      category,
      userId,
      createdAt,
      type,
      paymentMethod,
      installmentCount,
      currentInstallment
    } = req.body;

    const expense = {
      description,
      amount,
      category,
      userId,
      createdAt: createdAt ? new Date(createdAt) : new Date(),
      type,
      paymentMethod,
      installmentCount,
      currentInstallment
    };

    const docRef = await db.collection('expenses').add(expense);
    res.json({ id: docRef.id, ...expense });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar gasto.' });
  }
};

// Listar gastos do usuário
export const getExpenses = async (req, res) => {
  try {
    const { userId } = req.query;
    const snapshot = await db
      .collection('expenses')
      .where('userId', '==', userId)
      .get();
    const expenses = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar gastos.' });
  }
};

// Atualizar gasto
export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      description,
      amount,
      category,
      createdAt,
      type,
      paymentMethod,
      installmentCount,
      currentInstallment
    } = req.body;

    const updatedExpense = {
      description,
      amount,
      category,
      createdAt: createdAt ? new Date(createdAt) : new Date(),
      type,
      paymentMethod,
      installmentCount,
      currentInstallment
    };

    await db.collection('expenses').doc(id).update(updatedExpense);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao editar gasto.' });
  }
};

// Excluir gasto
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('expenses').doc(id).delete();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir gasto.' });
  }
};