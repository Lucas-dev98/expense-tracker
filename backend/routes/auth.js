import express from 'express';
import { register } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);

router.post('/login', async (req, res) => {
  res.status(501).json({ error: 'Login deve ser feito pelo frontend usando Firebase Auth.' });
});

export default router;