import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import admin from 'firebase-admin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let db;

try {
  const serviceAccountPath = path.join(__dirname, '../serviceAccountKey.json');
  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  db = admin.firestore();
  console.log('Firebase inicializado com sucesso!');
} catch (error) {
  console.log('Arquivo serviceAccountKey.json não encontrado. Usando banco de dados mock para desenvolvimento.');

  db = {
    collection: () => ({
      add: async (data) => {
        console.log('Mock: Adicionando gasto:', data);
        return { id: 'mock-id-' + Date.now() };
      },
      get: async () => ({
        docs: []
      })
    })
  };
}

export default db;