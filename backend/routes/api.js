import express from 'express';
// Importa os controllers responsáveis pelas operações de gastos e insights
import { addExpense, getInsights, deleteExpense, updateExpense, getExpenses } from '../controllers/expenseController.js';

const router = express.Router();

// ==================== Rotas de Gastos ====================

// Busca todos os gastos de um usuário (GET /api/expenses?userId=...)
router.get('/expenses', getExpenses);

// Adiciona um novo gasto (POST /api/add-expense)
router.post('/add-expense', addExpense);

// Atualiza um gasto existente (PUT /api/expenses/:id)
router.put('/expenses/:id', updateExpense);

// Exclui um gasto (DELETE /api/expenses/:id)
router.delete('/expenses/:id', deleteExpense);

// ==================== Rotas de Insights ====================

// Busca os insights automáticos do usuário (GET /api/insights?userId=...)
router.get('/insights', getInsights);

// Exporta o router para ser usado no app principal
export default router;