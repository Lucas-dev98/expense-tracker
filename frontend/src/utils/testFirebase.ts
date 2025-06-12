import { auth, db } from '../services/firebase';
import { connectAuthEmulator } from 'firebase/auth';
import { connectFirestoreEmulator } from 'firebase/firestore';

export const testFirebaseConnection = () => {
  console.log('Firebase Auth:', auth);
  console.log('Firebase Firestore:', db);
  console.log('Firebase Config:', {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY?.substring(0, 10) + '...',
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
  });
};

// Para desenvolvimento local, se quiser usar emuladores
export const setupEmulators = () => {
  if (process.env.NODE_ENV === 'development') {
    try {
      connectAuthEmulator(auth, 'http://localhost:9099');
      connectFirestoreEmulator(db, 'localhost', 8080);
    } catch (error) {
      console.log('Emulators already connected or not available');
    }
  }
};