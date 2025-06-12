const admin = require('firebase-admin');
const db = require('../config/firebase');
const User = require('../models/user');
const { isValidEmail, isValidPassword } = require('../utils/validators');

exports.register = async (req, res) => {
  const { email, password, displayName } = req.body;

  // Validação dos dados
  if (!isValidEmail(email) || !isValidPassword(password)) {
    return res.status(400).json({ error: 'Dados inválidos.' });
  }

  try {
    // Cria usuário no Firebase Auth
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName,
    });

    // Cria objeto User do modelo
    const user = new User({
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName,
      photoURL: userRecord.photoURL,
      createdAt: new Date(),
    });

    // Salva no Firestore
    await db.collection('users').doc(user.uid).set({ ...user });

    res.status(201).json({ uid: user.uid, email: user.email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};