const db = require('../config/firebase');
const { processExpense } = require('../services/aiProcessor');

exports.addExpense = async (req, res) => {
  try {
    const { description, userId } = req.body;
    const { amount, category } = processExpense(description);
    
    await db.collection('expenses').add({ userId, description, amount, category });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao processar gasto' });
  }
};