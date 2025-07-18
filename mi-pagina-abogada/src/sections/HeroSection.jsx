// src/sections/HeroSection.jsx
import React from 'react';
import './HeroSection.css'; // Asegúrate de que este archivo CSS exista

function HeroSection() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <h1>Tu Aliado Legal <br/> en [Ciudad/País]</h1>
        <p>Expertos en derecho para brindarte la mejor asesoría y representación.</p>
        <a href="#contact" className="btn-primary">Agenda una Consulta</a>
      </div>
    </section>
  );
}

export default HeroSection;