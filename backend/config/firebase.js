const admin = require('firebase-admin');

let db;

try {
  // Try to load service account from file
  const serviceAccount = require('../serviceAccountKey.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  
  db = admin.firestore();
  console.log('Firebase initialized successfully');
} catch (error) {
  console.log('Firebase service account not found. Using mock database for development.');
  
  // Mock database for development
  db = {
    collection: () => ({
      add: async (data) => {
        console.log('Mock: Adding expense:', data);
        return { id: 'mock-id-' + Date.now() };
      },
      get: async () => ({
        docs: []
      })
    })
  };
}

module.exports = db;