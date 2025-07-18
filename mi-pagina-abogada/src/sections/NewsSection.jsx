// src/sections/NewsSection.jsx
import React, { useState, useEffect } from 'react';
import './NewsSection.css';

function NewsSection() {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterCategory, setFilterCategory] = useState('general'); // Categoría por defecto
  const [searchTerm, setSearchTerm] = useState(''); // Término de búsqueda del usuario

  const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
  const BASE_URL = 'https://newsapi.org/v2/top-headlines';

  // Opciones de categorías para News API
  const categories = [
    { value: 'general', label: 'Todas (General)' },
    { value: 'business', label: 'Negocios' },
    { value: 'entertainment', label: 'Entretenimiento' },
    { value: 'health', label: 'Salud' },
    { value: 'science', label: 'Ciencia' },
    { value: 'sports', label: 'Deportes' },
    { value: 'technology', label: 'Tecnología' },
  ];

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!NEWS_API_KEY) {
          throw new Error("News API Key no configurada. Por favor, crea un archivo .env con VITE_NEWS_API_KEY.");
        }

        // *** CAMBIO AQUÍ PARA PRUEBA: country=us ***
        // Si funciona con 'us', ese es el problema con el plan gratuito.
        let url = `${BASE_URL}?country=us&apiKey=${NEWS_API_KEY}`; 
        
        // Si hay un término de búsqueda, lo añadimos
        if (searchTerm) {
            url += `&q=${encodeURIComponent(searchTerm)}`;
        }
        // La categoría solo se añade si no es 'general'
        if (filterCategory !== 'general') {
          url += `&category=${filterCategory}`;
        }
        
        const response = await fetch(url);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Error al obtener noticias: ${response.status} ${response.statusText} - ${errorData.message}`);
        }
        const data = await response.json();
        
        if (data.articles) {
          const validArticles = data.articles.filter(article => 
            article.title !== '[Removed]' && article.urlToImage && article.description && article.url
          );
          setNewsArticles(validArticles);
        } else {
          setNewsArticles([]);
        }
      } catch (err) {
        console.error("Error fetching news:", err);
        setError(err.message || "No se pudieron cargar las noticias.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [filterCategory, searchTerm, NEWS_API_KEY]);

  return (
    <section id="news" className="news-section">
      <div className="section-header">
        <h2 className="section-title">Últimas Noticias</h2>
        {/* Actualizamos el subtítulo para reflejar el cambio de país para la prueba */}
        <p className="section-subtitle">Mantente informado con los titulares más recientes de Estados Unidos y el mundo.</p> 
      </div>

      <div className="news-filters">
        <input
          type="text"
          placeholder="Buscar noticias..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="category-select"
        >
          {categories.map(category => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="loading-message">Cargando noticias...</p>}
      {error && <p className="error-message">Error: {error}</p>}

      {!loading && !error && (
        <div className="news-grid">
          {newsArticles.length > 0 ? (
            newsArticles.map(article => (
              <a href={article.url} target="_blank" rel="noopener noreferrer" key={article.url} className="news-card-link">
                <div className="news-card">
                  <img src={article.urlToImage || 'https://via.placeholder.com/600x400/CCCCCC/FFFFFF?text=No+Image'} alt={article.title} className="news-image" />
                  <div className="news-card-content">
                    <span className="news-category">{article.source.name || 'General'}</span>
                    <h3 className="news-title">{article.title}</h3>
                    <p className="news-date">{new Date(article.publishedAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p className="news-summary">{article.description || 'No hay descripción disponible.'}</p>
                  </div>
                </div>
              </a>
            ))
          ) : (
            <p className="no-news-found">No se encontraron noticias con los filtros aplicados. Intenta con otra búsqueda o categoría.</p>
          )}
        </div>
      )}
    </section>
  );
}

export default NewsSection;