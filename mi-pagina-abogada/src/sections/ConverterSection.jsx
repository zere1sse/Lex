// src/sections/ConverterSection.jsx
import React, { useState, useEffect } from 'react';
import './ConverterSection.css';

function ConverterSection() {
  const [clpValue, setClpValue] = useState('');
  const [ufValue, setUfValue] = useState('');
  const [utmValue, setUtmValue] = useState('');
  const [conversionType, setConversionType] = useState('clpToUf'); // 'clpToUf', 'ufToClp', 'clpToUtm', 'utmToClp'
  const [ufToday, setUfToday] = useState(0); // Valor de la UF del día
  const [utmToday, setUtmToday] = useState(0); // Valor de la UTM del día
  const [loadingValues, setLoadingValues] = useState(true);
  const [errorValues, setErrorValues] = useState(null);

  // --- Funciones para obtener valores de UF y UTM (EJEMPLO - NECESITA DATOS REALES) ---
  // IMPORTANTE: Los valores de UF y UTM cambian diariamente y NO se pueden obtener
  // directamente de una API pública gratuita de forma fácil y confiable para
  // uso comercial/continuo sin una API key o scraping (lo cual es riesgoso).
  //
  // Para el desarrollo, usaremos valores FIJOS o simula la carga.
  // En un entorno de producción, necesitarías:
  // 1. Una API de pago (ej. Mindicador.cl tiene planes para API keys)
  // 2. Un backend que haga scraping de un sitio oficial y te sirva los datos
  // 3. Actualizar los valores manualmente con cierta frecuencia (no recomendado para dinámico)
  //
  // POR AHORA, USAREMOS VALORES FIJOS PARA QUE FUNCIONE.
  // Te sugiero buscar un valor actual de UF y UTM en el SII de Chile
  // o en Mindicador.cl y actualizar estos.
  //

  useEffect(() => {
    // Simular carga de valores (reemplazar con API real en producción)
    setLoadingValues(true);
    setErrorValues(null);
    try {
      // Valores de ejemplo al 17 de julio de 2025 (¡actualiza con los reales!)
      setUfToday(38000); // Ejemplo: UF $38.000 CLP
      setUtmToday(66000); // Ejemplo: UTM $66.000 CLP
      setLoadingValues(false);
    } catch (err) {
      setErrorValues("No se pudieron cargar los valores de UF/UTM. Use valores de referencia.");
      setLoadingValues(false);
    }
  }, []);

  const handleClpChange = (e) => {
    const value = parseFloat(e.target.value);
    setClpValue(e.target.value); // Mantener el string para la entrada
    if (!isNaN(value) && value > 0) {
      if (conversionType === 'clpToUf' && ufToday > 0) {
        setUfValue((value / ufToday).toFixed(4));
        setUtmValue('');
      } else if (conversionType === 'clpToUtm' && utmToday > 0) {
        setUtmValue((value / utmToday).toFixed(4));
        setUfValue('');
      } else {
        setUfValue('');
        setUtmValue('');
      }
    } else {
      setUfValue('');
      setUtmValue('');
    }
  };

  const handleUfChange = (e) => {
    const value = parseFloat(e.target.value);
    setUfValue(e.target.value);
    if (!isNaN(value) && value > 0 && ufToday > 0) {
      if (conversionType === 'ufToClp') {
        setClpValue((value * ufToday).toFixed(2));
        setUtmValue('');
      } else {
        setClpValue('');
        setUtmValue('');
      }
    } else {
      setClpValue('');
      setUtmValue('');
    }
  };

  const handleUtmChange = (e) => {
    const value = parseFloat(e.target.value);
    setUtmValue(e.target.value);
    if (!isNaN(value) && value > 0 && utmToday > 0) {
      if (conversionType === 'utmToClp') {
        setClpValue((value * utmToday).toFixed(2));
        setUfValue('');
      } else {
        setClpValue('');
        setUfValue('');
      }
    } else {
      setClpValue('');
      setUfValue('');
    }
  };

  const handleConversionTypeChange = (e) => {
    setConversionType(e.target.value);
    // Limpiar todos los campos al cambiar el tipo de conversión
    setClpValue('');
    setUfValue('');
    setUtmValue('');
  };

  return (
    <section id="converter" className="converter-section">
      <div className="section-header">
        <h2 className="section-title">Convertidor de Unidades</h2>
        <p className="section-subtitle">Calcula valores de UF, UTM y CLP.</p>
      </div>

      <div className="converter-content">
        {loadingValues ? (
          <p className="loading-message">Cargando valores de UF y UTM...</p>
        ) : errorValues ? (
          <p className="error-message">{errorValues}</p>
        ) : (
          <div className="current-values">
            <p>Valor UF hoy: <strong>${ufToday.toLocaleString('es-CL')}</strong> CLP</p>
            <p>Valor UTM hoy: <strong>${utmToday.toLocaleString('es-CL')}</strong> CLP</p>
            <p className="values-disclaimer">
              (Valores de referencia. Para datos actualizados en producción, se requiere integración con una API externa.)
            </p>
          </div>
        )}

        <div className="conversion-controls">
          <label htmlFor="conversion-type">Tipo de Conversión:</label>
          <select id="conversion-type" value={conversionType} onChange={handleConversionTypeChange}>
            <option value="clpToUf">CLP a UF</option>
            <option value="ufToClp">UF a CLP</option>
            <option value="clpToUtm">CLP a UTM</option>
            <option value="utmToClp">UTM a CLP</option>
          </select>
        </div>

        <div className="input-group">
          {(conversionType === 'clpToUf' || conversionType === 'clpToUtm' || conversionType === 'ufToClp' || conversionType === 'utmToClp') && (
            <label>
              Monto en CLP:
              <input
                type="number"
                value={clpValue}
                onChange={handleClpChange}
                placeholder="Ingrese monto en CLP"
                disabled={conversionType === 'ufToClp' || conversionType === 'utmToClp'}
              />
            </label>
          )}
          
          {(conversionType === 'ufToClp' || conversionType === 'clpToUf') && (
            <label>
              Monto en UF:
              <input
                type="number"
                value={ufValue}
                onChange={handleUfChange}
                placeholder="Ingrese monto en UF"
                disabled={conversionType === 'clpToUf'}
              />
            </label>
          )}

          {(conversionType === 'utmToClp' || conversionType === 'clpToUtm') && (
            <label>
              Monto en UTM:
              <input
                type="number"
                value={utmValue}
                onChange={handleUtmChange}
                placeholder="Ingrese monto en UTM"
                disabled={conversionType === 'clpToUtm'}
              />
            </label>
          )}
        </div>

        <div className="result-display">
          {conversionType === 'clpToUf' && clpValue && ufValue && <p><strong>{parseFloat(clpValue).toLocaleString('es-CL')} CLP</strong> es igual a <strong>{ufValue} UF</strong></p>}
          {conversionType === 'ufToClp' && ufValue && clpValue && <p><strong>{parseFloat(ufValue).toLocaleString('es-CL')} UF</strong> es igual a <strong>${parseFloat(clpValue).toLocaleString('es-CL')} CLP</strong></p>}
          {conversionType === 'clpToUtm' && clpValue && utmValue && <p><strong>{parseFloat(clpValue).toLocaleString('es-CL')} CLP</strong> es igual a <strong>{utmValue} UTM</strong></p>}
          {conversionType === 'utmToClp' && utmValue && clpValue && <p><strong>{parseFloat(utmValue).toLocaleString('es-CL')} UTM</strong> es igual a <strong>${parseFloat(clpValue).toLocaleString('es-CL')} CLP</strong></p>}
        </div>
      </div>
    </section>
  );
}

export default ConverterSection;