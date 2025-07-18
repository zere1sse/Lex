// src/sections/ToolsSection.jsx
import React from 'react';
import './ToolsSection.css';

// 1. Asegúrate de que `onNavigate` se reciba como prop aquí
function ToolsSection({ onNavigate }) {
  return (
    <section id="tools" className="tools-section">
      <div className="section-header">
        <h2 className="section-title">Herramientas y Utilidades</h2>
        <p className="section-subtitle">Recursos prácticos para facilitar tu estudio y organización.</p>
      </div>

      <div className="tools-grid"> {/* Usas tools-grid, no tools-content, ajustaré el CSS */}
        <div className="tool-card"> {/* Usas tool-card, no tool-block, ajustaré el CSS */}
          <h3>Glosario Jurídico</h3>
          <p>Define y organiza términos legales a tu medida.</p>
          {/* 2. Añade el onClick y llama a onNavigate con el nombre de la vista */}
          <button className="btn btn-primary" onClick={() => onNavigate('glossary')}>Acceder al Glosario</button>
        </div>

        <div className="tool-card">
          <h3>Convertidor de Unidades</h3>
          <p>Calcula valores de UF, UTM y otros indicadores legales.</p>
          <button className="btn btn-primary" onClick={() => onNavigate('converter')}>Usar Convertidor</button>
        </div>

        <div className="tool-card">
          <h3>Calendario de Plazos</h3>
          <p>Organiza tus fechas importantes: exámenes, audiencias, seminarios.</p>
          <button className="btn btn-primary" onClick={() => onNavigate('calendar')}>Ver Calendario</button>
        </div>

        <div className="tool-card">
          <h3>Simulador de Casos</h3>
          <p>Practica la organización de casos hipotéticos.</p>
          <button className="btn btn-primary" onClick={() => onNavigate('simulator')}>Iniciar Simulador</button>
        </div>

      </div>
    </section>
  );
}

export default ToolsSection;