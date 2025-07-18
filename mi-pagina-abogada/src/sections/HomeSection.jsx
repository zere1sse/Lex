// src/sections/HomeSection.jsx
import React from 'react';
import './HomeSection.css'; // Crearemos este CSS

function HomeSection() {
  return (
    <section id="home" className="home-section">
      <div className="home-content">
        <h1 className="home-title">Bienvenida, Futura Abogada</h1>
        <p className="home-subtitle">Tu espacio personalizado para el estudio y la práctica del Derecho Chileno.</p>
        <blockquote className="home-quote">
          "La justicia, aunque cojee, llega."
          <cite> - Refrán Popular</cite>
        </blockquote>
        {/* Aquí podríamos añadir botones a secciones importantes */}
        <div className="home-buttons">
            <a href="#library" className="btn btn-primary">Explorar Biblioteca</a>
            <a href="#tools" className="btn btn-secondary">Mis Herramientas</a>
        </div>
      </div>
    </section>
  );
}

export default HomeSection;