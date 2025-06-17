import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import admin from 'firebase-admin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let db;

try {
  const serviceAccountPath = path.join(__dirname, '../serviceAccountKey.json');
  const serviceAccountRaw = fs.readFileSync(serviceAccountPath, 'utf8');
  const serviceAccount = JSON.parse(serviceAccountRaw);

  // Exibe parte da chave carregada para confirmação (NÃO exibe informações sensíveis!)
  console.log('\x1b[36m%s\x1b[0m', `🔑 serviceAccountKey.json encontrado e carregado.`);
  if (serviceAccount.project_id) {
    console.log('\x1b[36m%s\x1b[0m', `Projeto Firebase: ${serviceAccount.project_id}`);
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  db = admin.firestore();
  console.log('\x1b[32m%s\x1b[0m', '✅ Firebase inicializado com sucesso!');
} catch (error) {
  console.error('\x1b[31m%s\x1b[0m', '❌ Erro ao inicializar o Firebase!');
  if (error.code === 'ENOENT') {
    console.error(
      '\x1b[33m%s\x1b[0m',
      'Arquivo serviceAccountKey.json não encontrado. Usando banco de dados mock para desenvolvimento.'
    );
  } else if (error instanceof SyntaxError) {
    console.error(
      '\x1b[33m%s\x1b[0m',
      'Erro de sintaxe ao ler o arquivo serviceAccountKey.json. Verifique se o JSON está válido.'
    );
  } else {
    console.error(error);
  }

  db = {
    collection: () => ({
      add: async (data) => {
        console.log('Mock: Adicionando gasto:', data);
        return { id: 'mock-id-' + Date.now() };
      },
      get: async () => ({
        docs: [],
      }),
    }),
  };
}
export default db;
