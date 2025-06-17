import db from '../config/firebase.js';
import { generateAndSaveInsights } from '../services/aiProcessor.js';

// Lista de categorias válidas para gastos (deve ser mantida sincronizada com o frontend)
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

// ========================= Adicionar gasto =========================
export const addExpense = async (req, res) => {
  try {
    // Extrai os dados do corpo da requisição
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

    // Métodos de pagamento válidos
    const validMethods = ['Credito', 'Debito', 'Dinheiro'];
    // Garante que amount será sempre um número
    const amountNumber = typeof amount === 'string' ? Number(amount) : amount;

    // Validação dos dados recebidos
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

    // Monta o objeto do gasto
    const expense = {
      description,
      amount: amountNumber,
      category,
      userId,
      createdAt: createdAt ? new Date(createdAt) : new Date(),
      type,
      paymentMethod,
      installmentCount,
      currentInstallment,
    };

    // Salva o gasto no Firestore
    const docRef = await db.collection('expenses').add(expense);

    // Gera e salva insights automáticos após adicionar o gasto
    await generateAndSaveInsights(userId, db);

    // Retorna o gasto criado (com id e data formatada)
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

// ========================= Atualizar gasto =========================
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

    // Garante que amount será sempre um número
    const amountNumber = typeof amount === 'string' ? Number(amount) : amount;

    const validMethods = ['Credito', 'Debito', 'Dinheiro'];
    // Validação dos dados recebidos
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

    // Monta o objeto atualizado do gasto
    const updatedExpense = {
      description,
      amount: amountNumber,
      category,
      createdAt: createdAt ? new Date(createdAt) : new Date(),
      type,
      paymentMethod,
      installmentCount,
      currentInstallment,
    };

    // Atualiza o gasto no Firestore
    await db.collection('expenses').doc(id).update(updatedExpense);

    // Busca o usuário do gasto para atualizar insights
    const doc = await db.collection('expenses').doc(id).get();
    const userId = doc.data().userId;

    // Gera e salva insights automáticos após editar o gasto
    await generateAndSaveInsights(userId, db);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao editar gasto.' });
  }
};

// ========================= Excluir gasto =========================
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    // Busca o gasto para obter o userId
    const doc = await db.collection('expenses').doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Gasto não encontrado.' });
    }
    const userId = doc.data().userId;

    // Exclui o gasto do Firestore
    await db.collection('expenses').doc(id).delete();

    // Gera e salva insights automáticos após excluir o gasto
    await generateAndSaveInsights(userId, db);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir gasto.' });
  }
};

// ========================= Buscar gastos por usuário =========================
export const getExpenses = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: 'userId é obrigatório.' });
    }
    // Busca todos os gastos do usuário no Firestore
    const snapshot = await db
      .collection('expenses')
      .where('userId', '==', userId)
      .get();
    // Mapeia os documentos para um array de objetos
    const expenses = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar gastos.' });
  }
};

// ========================= Buscar insights automáticos =========================
export const getInsights = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: 'userId é obrigatório.' });
    }
    // Busca o insight mais recente do usuário
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
    // Retorna os insights encontrados (ou array vazio)
    res.json({ insights: data.insights || [] });
  } catch (error) {
    console.error('Erro ao buscar insights:', error);
    res.status(500).json({ error: 'Erro ao buscar insights.' });
  }
};