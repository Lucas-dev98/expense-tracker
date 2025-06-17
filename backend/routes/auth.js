import express from 'express';
import { register } from '../controllers/authController.js';

const router = express.Router();

// ==================== Rotas de Autenticação ====================

// Rota para registro de novo usuário (POST /api/auth/register)
// Chama o controller que cria o usuário no Firebase Auth e salva no Firestore
router.post('/register', register);

// Rota de login (POST /api/auth/login)
// OBS: O login deve ser feito diretamente pelo frontend usando Firebase Auth.
// Esta rota retorna 501 (Not Implemented) para indicar que não é suportada no backend.
router.post('/login', async (req, res) => {
  res.status(501).json({ error: 'Login deve ser feito pelo frontend usando Firebase Auth.' });
});

// Exporta o router para ser usado no app principal
export default router;