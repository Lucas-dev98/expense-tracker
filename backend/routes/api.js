import express from 'express';
import { addExpense, getInsights, deleteExpense, updateExpense } from '../controllers/expenseController.js';
const router = express.Router();

// Rota para adicionar uma despesa
// Rota para obter insights
router.get('/insights', getInsights);
router.delete('/expenses/:id', deleteExpense);
router.put('/expenses/:id', updateExpense);
router.post('/add-expense', addExpense);

export default router;