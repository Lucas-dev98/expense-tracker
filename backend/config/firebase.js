import admin from 'firebase-admin';

let db;

try {
  const serviceAccount = await import('../serviceAccountKey.json', { assert: { type: "json" } });
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount.default)
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