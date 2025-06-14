import React from 'react';
import './Footer.scss';

const Footer: React.FC = () => (
  <footer className="main-footer">
    <div className="main-footer__container">
      <span className="main-footer__brand">💸 Gestão de Gastos IA</span>
      <span className="main-footer__copy">
        &copy; {new Date().getFullYear()} Todos os direitos reservados.
      </span>
    </div>
  </footer>
);

export default Footer;