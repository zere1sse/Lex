// src/sections/GlossarySection.jsx
import React, { useState, useEffect } from 'react';
import './GlossarySection.css';
import termsData from '../data/glossaryTermsData'; // ¡Importa los datos estáticos aquí!

function GlossarySection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTerms, setFilteredTerms] = useState([]); // Inicialmente vacío o se llenará con useEffect

  // Usamos useEffect para ordenar los términos iniciales y establecerlos en el estado
  useEffect(() => {
    // Crear una copia de los datos para no mutar el original y ordenarla
    const sortedTerms = [...termsData].sort((a, b) => a.term.localeCompare(b.term));
    setFilteredTerms(sortedTerms);
  }, []); // Se ejecuta solo una vez al montar

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    
    const filtered = termsData.filter(item => // Filtra sobre los datos originales
      item.term.toLowerCase().includes(value) ||
      item.definition.toLowerCase().includes(value)
    );
    // Ordenar los resultados filtrados alfabéticamente por 'term'
    filtered.sort((a, b) => a.term.localeCompare(b.term));
    setFilteredTerms(filtered);
  };

  return (
    <section id="glossary" className="glossary-section">
      <div className="section-header">
        <h2 className="section-title">Glosario Jurídico</h2>
        <p className="section-subtitle">Aquí podrás buscar y definir términos legales.</p>
      </div>

      <div className="glossary-content">
        <input
          type="text"
          placeholder="Buscar término o definición..."
          className="glossary-search-input"
          value={searchTerm}
          onChange={handleSearch}
        />

        {filteredTerms.length > 0 ? (
          <ul className="glossary-list">
            {filteredTerms.map((item) => (
              <li key={item.id} className="glossary-item">
                <h3 className="term-title">{item.term}</h3>
                <p className="term-definition">{item.definition}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-results">No se encontraron resultados para "{searchTerm}".</p>
        )}
      </div>
    </section>
  );
}

export default GlossarySection;