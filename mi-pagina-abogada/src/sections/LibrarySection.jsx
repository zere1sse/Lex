// src/sections/LibrarySection.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore'; // Importa 'query' y 'where'
import { useAuth } from '../auth/AuthContext'; // Importa el hook de autenticación
import './LibrarySection.css';

function LibrarySection() {
  const { currentUser } = useAuth(); // Obtiene el usuario actual
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [loadingNotes, setLoadingNotes] = useState(true); // Nuevo estado para la carga de notas

  // Función para obtener apuntes de Firestore para el usuario actual
  const getNotes = async () => {
    if (!currentUser) { // Si no hay usuario logueado, no intentes obtener notas
      setNotes([]);
      setLoadingNotes(false);
      return;
    }

    setLoadingNotes(true);
    try {
      // Crea una consulta para obtener solo las notas del usuario actual
      const q = query(collection(db, "notes"), where("userId", "==", currentUser.uid));
      const querySnapshot = await getDocs(q);
      const fetchedNotes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNotes(fetchedNotes);
    } catch (error) {
      console.error("Error obteniendo apuntes:", error);
      // Puedes mostrar un error al usuario aquí
    } finally {
      setLoadingNotes(false);
    }
  };

  // Cargar apuntes al iniciar el componente o cuando el usuario cambia
  useEffect(() => {
    getNotes();
  }, [currentUser]); // Dependencia en currentUser para recargar cuando el usuario inicia/cierra sesión

  // Función para añadir un nuevo apunte
  const addNote = async () => {
    if (!currentUser) {
      alert("Debes iniciar sesión para guardar apuntes.");
      return;
    }
    if (newNote.trim() === '') return;

    try {
      await addDoc(collection(db, "notes"), {
        text: newNote,
        timestamp: new Date(),
        userId: currentUser.uid // <--- ¡AQUÍ GUARDAMOS EL ID DEL USUARIO!
      });
      setNewNote('');
      getNotes(); // Recargar las notas para mostrar la nueva
    } catch (e) {
      console.error("Error añadiendo apunte: ", e);
      alert("Error al guardar el apunte.");
    }
  };

  return (
    <section id="library" className="library-section">
      <div className="section-header">
        <h2 className="section-title">Biblioteca Jurídica</h2>
        <p className="section-subtitle">Accede a los códigos fundamentales, leyes especiales, doctrina y jurisprudencia chilena.</p>
      </div>

      <div className="library-content">
        {/* ... Códigos Fundamentales ... */}
        <div className="category-block">
          <h3>Códigos Fundamentales de Chile</h3>
          <ul className="resource-list">
            <li><a href="https://www.bcn.cl/leychile/navegar?idNorma=242302" target="_blank" rel="noopener noreferrer">Constitución Política de la República de Chile</a></li>
            <li><a href="https://www.bcn.cl/leychile/navegar?idNorma=172986" target="_blank" rel="noopener noreferrer">Código Civil</a></li>
            <li><a href="https://www.bcn.cl/leychile/navegar?idNorma=173322" target="_blank" rel="noopener noreferrer">Código Penal</a></li>
            <li><a href="https://www.bcn.cl/leychile/navegar?idNorma=173323" target="_blank" rel="noopener noreferrer">Código Procesal Penal</a></li>
            <li><a href="https://www.bcn.cl/leychile/navegar?idNorma=173005" target="_blank" rel="noopener noreferrer">Código del Trabajo</a></li>
            <li><a href="https://www.bcn.cl/leychile/navegar?idNorma=1054363" target="_blank" rel="noopener noreferrer">Código de Comercio</a></li>
          </ul>
        </div>

        {/* ... Leyes Especiales ... */}
        <div className="category-block">
          <h3>Leyes Especiales Destacadas</h3>
          <ul className="resource-list">
            <li><a href="https://www.bcn.cl/leychile/navegar?idNorma=213825" target="_blank" rel="noopener noreferrer">Ley de Matrimonio Civil (Ley 19.947)</a></li>
            <li><a href="https://www.bcn.cl/leychile/navegar?idNorma=217316" target="_blank" rel="noopener noreferrer">Ley de Propiedad Intelectual (Ley 17.336)</a></li>
            <li><a href="https://www.bcn.cl/leychile/navegar?idNorma=205096" target="_blank" rel="noopener noreferrer">Ley de Protección al Consumidor (Ley 19.496)</a></li>
            <li><a href="https://www.bcn.cl/leychile/navegar?idNorma=247291" target="_blank" rel="noopener noreferrer">Ley de Donaciones (Decreto Ley 3.063)</a></li>
          </ul>
        </div>

        {/* Mis Apuntes Personalizados (Ahora protegido por usuario) */}
        <div className="category-block">
          <h3>Mis Apuntes Personalizados</h3>
          {currentUser ? (
            <>
              <p>Escribe y guarda tus notas importantes:</p>
              <textarea
                className="notes-textarea"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Escribe tu nuevo apunte aquí..."
                rows="4"
              ></textarea>
              <button className="btn btn-primary" onClick={addNote}>Guardar Apunte</button>

              <h4 className="notes-list-title">Apuntes Guardados:</h4>
              {loadingNotes ? (
                <p>Cargando apuntes...</p>
              ) : notes.length === 0 ? (
                <p>No hay apuntes guardados aún.</p>
              ) : (
                <ul className="notes-list">
                  {notes.map((note) => (
                    <li key={note.id} className="note-item">
                      {note.text}
                      <span className="note-timestamp">
                        {note.timestamp && new Date(note.timestamp.seconds * 1000).toLocaleDateString('es-CL')}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <p>Inicia sesión para acceder a tus apuntes personales.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default LibrarySection;