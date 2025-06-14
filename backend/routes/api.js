import express from 'express';
import { addExpense, getInsights, deleteExpense, updateExpense, getExpenses } from '../controllers/expenseController.js';
const router = express.Router();

router.get('/expenses', getExpenses);
router.get('/insights', getInsights);
router.delete('/expenses/:id', deleteExpense);
router.put('/expenses/:id', updateExpense);
router.post('/add-expense', addExpense);

export default router;