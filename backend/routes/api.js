import express from 'express';
import { addExpense, getInsights } from '../controllers/expenseController.js';

const router = express.Router();

router.post('/add-expense', addExpense);
router.get('/insights', getInsights);

export default router;