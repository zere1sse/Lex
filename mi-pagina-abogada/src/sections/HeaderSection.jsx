// src/sections/HeaderSection.jsx
import React, { useState } from 'react';
import './HeaderSection.css';

// Recibe currentUser, onLogout, y onNavigate como props
function HeaderSection({ currentUser, onLogout, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Función para manejar clics en el menú de navegación
  const handleNavClick = (view) => {
    onNavigate(view); // Llama a la función de navegación de App.jsx
    toggleMenu(); // Cierra el menú móvil
  };

  return (
    <header className="header">
      <div className="logo">
        <a href="#" onClick={() => handleNavClick('home')}>LEX <span className="logo-accent">HER</span></a>
      </div>

      <button className="hamburger-menu" onClick={toggleMenu} aria-label="Toggle menu">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      <nav className={`nav-menu ${isOpen ? 'open' : ''}`}>
        <ul>
          {currentUser ? ( // Si hay un usuario logueado, muestra las secciones y opción de logout
            <>
              <li><a href="#home" onClick={() => handleNavClick('home')}>Inicio</a></li>
              <li><a href="#library" onClick={() => handleNavClick('library')}>Biblioteca</a></li>
              <li><a href="#tools" onClick={() => handleNavClick('tools')}>Herramientas</a></li>
              <li><a href="#news" onClick={() => handleNavClick('news')}>Noticias</a></li>
              <li><a href="#profile" onClick={() => handleNavClick('profile')}>Mi Perfil</a></li>
              <li>
                <button className="nav-button" onClick={onLogout}>Cerrar Sesión</button> {/* Botón de logout */}
              </li>
            </>
          ) : ( // Si no hay usuario, muestra opciones de login/registro
            <>
              <li><button className="nav-button" onClick={() => handleNavClick('login')}>Iniciar Sesión</button></li>
              <li><button className="nav-button" onClick={() => handleNavClick('register')}>Registrarse</button></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default HeaderSection;