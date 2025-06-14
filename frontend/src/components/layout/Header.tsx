import React from "react";
import { useAuth } from "../../context/AuthContext";
import "./Header.scss";

const Header: React.FC = () => {
  const { user } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <header className="main-header">
      <div className="main-header__container">
        <span className="main-header__logo">💸 Gestão de Gastos IA</span>
        {user && (
          <div className="main-header__user">
            <span className="main-header__email">{user.email}</span>
            <button className="main-header__logout" onClick={handleLogout}>
              Sair
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;