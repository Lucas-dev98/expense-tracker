import db from '../config/firebase.js';
import { generateAndSaveInsights } from '../services/aiProcessor.js';

// Categorias válidas (mantenha sincronizado com o frontend)
const validCategories = [
  'Alimentação',
  'Transporte',
  'Moradia',
  'Lazer',
  'Saúde',
  'Educação',
  'Investimentos',
  'Outros'
];

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
      currentInstallment,
    } = req.body;

    const validMethods = ['Credito', 'Debito', 'Dinheiro'];
    const amountNumber = typeof amount === 'string' ? Number(amount) : amount; // <-- sempre converte para número

    if (
      !description ||
      typeof amountNumber !== 'number' ||
      isNaN(amountNumber) ||
      !category ||
      !validCategories.includes(category) ||
      !userId ||
      !type ||
      !paymentMethod ||
      !validMethods.includes(paymentMethod)
    ) {
      return res
        .status(400)
        .json({ error: 'Dados obrigatórios ausentes ou inválidos.' });
    }

    const expense = {
      description,
      amount: amountNumber, // <-- sempre número
      category,
      userId,
      createdAt: createdAt ? new Date(createdAt) : new Date(),
      type,
      paymentMethod,
      installmentCount,
      currentInstallment,
    };

    const docRef = await db.collection('expenses').add(expense);
    await generateAndSaveInsights(userId, db);
    res.json({
      id: docRef.id,
      ...expense,
      createdAt:
        expense.createdAt instanceof Date
          ? expense.createdAt.toISOString()
          : expense.createdAt,
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar gasto.' });
  }
};

// Atualizar gasto
export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    let {
      description,
      amount,
      category,
      createdAt,
      type,
      paymentMethod,
      installmentCount,
      currentInstallment,
    } = req.body;

    const amountNumber = typeof amount === 'string' ? Number(amount) : amount; // <-- sempre converte para número

    const validMethods = ['Credito', 'Debito', 'Dinheiro'];
    if (
      !description ||
      typeof amountNumber !== 'number' ||
      isNaN(amountNumber) ||
      !category ||
      !validCategories.includes(category) ||
      !type ||
      !paymentMethod ||
      !validMethods.includes(paymentMethod)
    ) {
      return res
        .status(400)
        .json({ error: 'Dados obrigatórios ausentes ou inválidos.' });
    }

    const updatedExpense = {
      description,
      amount: amountNumber, // <-- sempre número
      category,
      createdAt: createdAt ? new Date(createdAt) : new Date(),
      type,
      paymentMethod,
      installmentCount,
      currentInstallment,
    };

    await db.collection('expenses').doc(id).update(updatedExpense);
    const doc = await db.collection('expenses').doc(id).get();
    const userId = doc.data().userId;

    await generateAndSaveInsights(userId, db);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao editar gasto.' });
  }
};

// Excluir gasto
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection('expenses').doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Gasto não encontrado.' });
    }
    const userId = doc.data().userId;
    await db.collection('expenses').doc(id).delete();
    await generateAndSaveInsights(userId, db);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir gasto.' });
  }
};

// Buscar gastos por usuário
export const getExpenses = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: 'userId é obrigatório.' });
    }
    const snapshot = await db
      .collection('expenses')
      .where('userId', '==', userId)
      .get();
    const expenses = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar gastos.' });
  }
};

export const getInsights = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: 'userId é obrigatório.' });
    }
    const snapshot = await db
      .collection('insights')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .limit(1)
      .get();

    if (snapshot.empty) {
      return res.json({ insights: [] });
    }

    const doc = snapshot.docs[0];
    const data = doc.data();
    res.json({ insights: data.insights || [] });
  } catch (error) {
    console.error('Erro ao buscar insights:', error);
    res.status(500).json({ error: 'Erro ao buscar insights.' });
  }
};