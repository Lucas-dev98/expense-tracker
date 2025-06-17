// Importa as dependências principais do projeto
import express from 'express';
import cors from 'cors';
import 'dotenv/config'; // Carrega variáveis de ambiente do arquivo .env
import apiRoutes from './routes/api.js'; // Rotas de gastos e insights
import authRoutes from './routes/auth.js'; // Rotas de autenticação

const app = express();

// Middleware para permitir o uso de JSON no corpo das requisições
app.use(express.json());

// Middleware para habilitar o CORS (permite requisições de outros domínios, como o frontend)
app.use(cors());

// Define as rotas principais da API
app.use('/api', apiRoutes);   // Rotas para gastos e insights (ex: /api/expenses)
app.use('/auth', authRoutes); // Rotas para autenticação (ex: /auth/register)

// Define a porta do servidor (usa a variável de ambiente PORT ou 3001 por padrão)
const PORT = process.env.PORT || 3001;

// Inicia o servidor e exibe mensagem no console
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));