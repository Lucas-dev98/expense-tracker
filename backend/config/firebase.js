import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import admin from 'firebase-admin';

// Resolve __dirname para módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let db;

try {
  // Caminho absoluto para o arquivo de chave de serviço do Firebase
  const serviceAccountPath = path.join(__dirname, '../serviceAccountKey.json');
  // Lê o conteúdo do arquivo de chave de serviço
  const serviceAccountRaw = fs.readFileSync(serviceAccountPath, 'utf8');
  // Faz o parse do JSON da chave de serviço
  const serviceAccount = JSON.parse(serviceAccountRaw);

  // Loga que a chave foi encontrada e mostra o project_id para conferência
  console.log('\x1b[36m%s\x1b[0m', `🔑 serviceAccountKey.json encontrado e carregado.`);
  if (serviceAccount.project_id) {
    console.log('\x1b[36m%s\x1b[0m', `Projeto Firebase: ${serviceAccount.project_id}`);
  }

  // Inicializa o Firebase Admin SDK com a chave de serviço
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  // Inicializa o Firestore para uso no projeto
  db = admin.firestore();
  console.log('\x1b[32m%s\x1b[0m', '✅ Firebase inicializado com sucesso!');
} catch (error) {
  // Caso haja erro, exibe mensagem amigável e usa um mock para desenvolvimento
  console.error('\x1b[31m%s\x1b[0m', '❌ Erro ao inicializar o Firebase!');
  if (error.code === 'ENOENT') {
    // Arquivo de chave não encontrado
    console.error(
      '\x1b[33m%s\x1b[0m',
      'Arquivo serviceAccountKey.json não encontrado. Usando banco de dados mock para desenvolvimento.'
    );
  } else if (error instanceof SyntaxError) {
    // Erro de sintaxe ao ler o JSON
    console.error(
      '\x1b[33m%s\x1b[0m',
      'Erro de sintaxe ao ler o arquivo serviceAccountKey.json. Verifique se o JSON está válido.'
    );
  } else {
    // Outro erro inesperado
    console.error(error);
  }

  // Mock do Firestore para ambiente de desenvolvimento sem chave
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

// Exporta a instância do Firestore (ou mock) para uso nos controllers
export default db;