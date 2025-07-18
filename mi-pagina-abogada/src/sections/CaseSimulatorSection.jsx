// src/sections/CaseSimulatorSection.jsx
import React, { useState, useEffect } from 'react';
import './CaseSimulatorSection.css';
import legalCases from '../data/legalCases'; // Importa los casos legales

function CaseSimulatorSection() {
  const [currentCase, setCurrentCase] = useState(null);
  const [currentStage, setCurrentStage] = useState(null);
  const [showResultFeedback, setShowResultFeedback] = useState(false);

  useEffect(() => {
    // Asegúrate de que legalCases no esté vacío
    if (legalCases.length > 0) {
      setCurrentCase(legalCases[0]);
      // Verifica que el 'start' stage exista y tenga 'options' si es una pregunta
      if (legalCases[0].stages && legalCases[0].stages['start']) {
        const startStage = legalCases[0].stages['start'];
        // Si la etapa de inicio es una pregunta, debe tener opciones
        if (startStage.type !== 'result' && !startStage.options) {
             console.error("La etapa 'start' del primer caso no tiene la propiedad 'options' definida.", startStage);
             // Opcional: Podrías establecer un estado de error aquí para mostrar al usuario
        }
        setCurrentStage(startStage); // Inicia en el 'start' stage
      } else {
        console.error("El primer caso en legalCases.js no tiene una etapa 'start' definida o está vacío.");
      }
    } else {
      console.warn("No se encontraron casos legales en 'legalCases.js'. El simulador no funcionará.");
    }
  }, []);

  const handleOptionClick = (nextStageKey) => {
    if (currentCase && currentCase.stages[nextStageKey]) {
      const nextStage = currentCase.stages[nextStageKey];
      setCurrentStage(nextStage);
      if (nextStage.type === 'result') {
        setShowResultFeedback(true);
      } else {
        setShowResultFeedback(false);
      }
    }
  };

  const resetSimulator = () => {
    if (currentCase) {
      // Asegúrate de que la etapa 'start' exista al reiniciar
      if (currentCase.stages && currentCase.stages['start']) {
        setCurrentStage(currentCase.stages['start']);
        setShowResultFeedback(false);
      } else {
        console.error("No se puede reiniciar: La etapa 'start' no está definida para el caso actual.");
      }
    }
  };

  if (!currentCase) {
    return (
      <section id="simulator" className="simulator-section">
        <div className="section-header">
          <h2 className="section-title">Simulador de Casos Legales</h2>
          <p className="section-subtitle">Cargando caso o no se encontró ningún caso válido para simular.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="simulator" className="simulator-section">
      <div className="section-header">
        <h2 className="section-title">Simulador de Casos Legales</h2>
        <p className="section-subtitle">Ponte a prueba con situaciones legales y explora sus posibles desenlaces.</p>
      </div>

      <div className="simulator-content">
        <div className="case-display">
          <h3>Caso: {currentCase.title}</h3>
          {currentStage && currentStage.type !== 'result' ? (
            <>
              <p className="case-description">{currentCase.description}</p>
              <h4 className="stage-question">{currentStage.question}</h4>
              <div className="options-container">
                {/* AÑADIDA COMPROBACIÓN: currentStage.options && */}
                {currentStage.options && currentStage.options.map((option, index) => (
                  <button
                    key={index}
                    className="btn btn-secondary option-button"
                    onClick={() => handleOptionClick(option.nextStage)}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </>
          ) : (
            currentStage && currentStage.type === 'result' && (
              <div className={`result-feedback ${currentStage.isCorrect ? 'correct' : 'incorrect'}`}>
                <h4>{currentStage.text}</h4>
                {showResultFeedback && currentStage.feedback && (
                  <p className="feedback-text">{currentStage.feedback}</p>
                )}
                <button onClick={resetSimulator} className="btn btn-primary reset-button">
                  Reiniciar Caso
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

export default CaseSimulatorSection;