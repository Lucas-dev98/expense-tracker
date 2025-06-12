import React from 'react';
import { getAuth, signOut } from 'firebase/auth';

const Header: React.FC = () => {
  const auth = getAuth();

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <header className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Gestão de Gastos com IA</h1>
      <button
        onClick={handleLogout}
        className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Sair
      </button>
    </header>
  );
};

export default Header;