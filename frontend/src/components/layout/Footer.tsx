import React from 'react';

const Footer: React.FC = () => (
  <footer className="w-full text-center py-4 bg-gray-200 mt-8">
    <span className="text-gray-600 text-sm">
      &copy; {new Date().getFullYear()} Gestão de Gastos com IA. Todos os direitos reservados.
    </span>
  </footer>
);

export default Footer;