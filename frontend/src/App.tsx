import React, { useState } from 'react';
import { useAuth, AuthProvider } from './context/AuthContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './pages/Dashboard';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const [screen, setScreen] = useState<'start' | 'login' | 'register'>('start');

  if (loading) return <div>Carregando...</div>;

  if (!user) {
    if (screen === 'start') {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full text-center space-y-4">
            <h2 className="text-2xl font-bold mb-4">Bem-vindo!</h2>
            <button
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => setScreen('login')}
            >
              Fazer Login
            </button>
            <button
              className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={() => setScreen('register')}
            >
              Cadastrar-se
            </button>
          </div>
        </div>
      );
    }

    if (screen === 'login') {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
            <Login />
            <p className="mt-4 text-center">
              Não tem conta?{' '}
              <button
                className="text-blue-600 underline"
                onClick={() => setScreen('register')}
              >
                Cadastre-se
              </button>
            </p>
            <p className="mt-2 text-center">
              <button
                className="text-gray-500 underline"
                onClick={() => setScreen('start')}
              >
                Voltar
              </button>
            </p>
          </div>
        </div>
      );
    }

    if (screen === 'register') {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
            <Register onRegisterSuccess={() => setScreen('login')} />
            <p className="mt-4 text-center">
              Já tem conta?{' '}
              <button
                className="text-blue-600 underline"
                onClick={() => setScreen('login')}
              >
                Faça login
              </button>
            </p>
            <p className="mt-2 text-center">
              <button
                className="text-gray-500 underline"
                onClick={() => setScreen('start')}
              >
                Voltar
              </button>
            </p>
          </div>
        </div>
      );
    }
    // fallback para segurança
    return null;
  }

  // Usuário autenticado
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Header />
      <Dashboard />
      <Footer />
    </div>
  );
};

const App: React.FC = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;