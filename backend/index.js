import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import apiRoutes from './routes/api.js';
import authRoutes from './routes/auth.js';

const app = express();

app.use(express.json());
app.use(cors());

// Rotas
app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));