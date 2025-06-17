import admin from 'firebase-admin';
import db from '../config/firebase.js';
import User from '../models/user.js';
import { isValidEmail, isValidPassword } from '../utils/validators.js';

// Controller responsável pelo registro de novos usuários
export const register = async (req, res) => {
  const { email, password, displayName } = req.body;

  // Validação dos dados recebidos do frontend
  if (!isValidEmail(email) || !isValidPassword(password)) {
    return res.status(400).json({ error: 'Dados inválidos.' });
  }

  try {
    // Cria o usuário no Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName,
    });

    // Cria uma instância do modelo User para padronizar os dados
    const user = new User({
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName,
      photoURL: userRecord.photoURL,
      createdAt: new Date(),
    });

    // Salva o usuário recém-criado no Firestore (coleção 'users')
    await db
      .collection('users')
      .doc(user.uid)
      .set({ ...user });

    // Retorna sucesso com os dados essenciais do usuário
    res.status(201).json({ uid: user.uid, email: user.email });
  } catch (error) {
    // Em caso de erro (ex: email já cadastrado), retorna mensagem de erro
    res.status(400).json({ error: error.message });
  }
};