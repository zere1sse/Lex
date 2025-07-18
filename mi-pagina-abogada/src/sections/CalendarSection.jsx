// src/sections/CalendarSection.jsx
import React, { useState, useEffect } from 'react';
import './CalendarSection.css';
// Importamos auth y db si planeamos guardar eventos en Firestore
// import { auth, db } from '../firebase';
// import { collection, addDoc, getDocs, query, where, orderBy, deleteDoc, doc } from 'firebase/firestore';

function CalendarSection() {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [events, setEvents] = useState([]);
  // const [user, setUser] = useState(null); // Para Firestore: para saber quién añadió el evento
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect para obtener el usuario autenticado (si usamos Firestore)
  /*
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchEvents(currentUser.uid);
      } else {
        setEvents([]);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);
  */

  // --- Lógica para cargar eventos (Inicialmente local, luego podemos ir a Firestore) ---
  // Por ahora, manejaremos los eventos en el estado local del componente.
  // Si deseas persistirlos, necesitaremos usar Firestore y la lógica comentada arriba/abajo.
  
  // Cargar eventos del localStorage al iniciar (para persistencia básica sin DB)
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('calendarEvents')) || [];
    // Ordenar los eventos por fecha
    storedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    setEvents(storedEvents);
  }, []);

  // Guardar eventos en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);


  // Función para añadir un nuevo evento
  const handleAddEvent = async (e) => {
    e.preventDefault(); // Previene el recargo de la página

    if (!eventName || !eventDate) {
      alert('Por favor, ingresa el nombre y la fecha del evento.');
      return;
    }

    const newEvent = {
      id: Date.now().toString(), // Genera un ID único basado en la marca de tiempo
      name: eventName,
      date: eventDate,
      description: eventDescription,
      // userId: user ? user.uid : 'guest', // Para Firestore
    };

    // Lógica para añadir a Firestore (comentado por ahora)
    /*
    if (user) {
      try {
        const docRef = await addDoc(collection(db, 'calendarEvents'), {
          ...newEvent,
          userId: user.uid // Asegurarse de guardar el ID del usuario
        });
        newEvent.id = docRef.id; // Asignar el ID de Firestore al evento
        setEvents((prevEvents) => [...prevEvents, newEvent].sort((a, b) => new Date(a.date) - new Date(b.date)));
        alert('Evento añadido con éxito a Firestore!');
      } catch (error) {
        console.error('Error adding document to Firestore:', error);
        setError('No se pudo añadir el evento.');
      }
    } else {
      // Si no hay usuario o no estamos usando Firestore, añadir localmente
    */
    setEvents((prevEvents) => [...prevEvents, newEvent].sort((a, b) => new Date(a.date) - new Date(b.date)));
    alert('Evento añadido con éxito!');
    // }


    // Limpiar campos del formulario
    setEventName('');
    setEventDate('');
    setEventDescription('');
  };

  // Función para eliminar un evento
  const handleDeleteEvent = async (idToDelete) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este evento?')) {
      return;
    }

    // Lógica para eliminar de Firestore (comentado por ahora)
    /*
    if (user) {
      try {
        await deleteDoc(doc(db, 'calendarEvents', idToDelete));
        setEvents((prevEvents) => prevEvents.filter(event => event.id !== idToDelete));
        alert('Evento eliminado de Firestore!');
      } catch (error) {
        console.error('Error deleting document from Firestore:', error);
        setError('No se pudo eliminar el evento.');
      }
    } else {
    */
    setEvents((prevEvents) => prevEvents.filter(event => event.id !== idToDelete));
    alert('Evento eliminado.');
    // }
  };

  // Función para obtener eventos de Firestore (comentado por ahora)
  /*
  const fetchEvents = async (uid) => {
    setLoading(true);
    setError(null);
    try {
      const q = query(collection(db, 'calendarEvents'), where('userId', '==', uid), orderBy('date'));
      const querySnapshot = await getDocs(q);
      const eventsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEvents(eventsList);
    } catch (err) {
      console.error('Error fetching calendar events:', err);
      setError('No se pudieron cargar tus eventos del calendario.');
    } finally {
      setLoading(false);
    }
  };
  */

  return (
    <section id="calendar" className="calendar-section">
      <div className="section-header">
        <h2 className="section-title">Calendario de Plazos</h2>
        <p className="section-subtitle">Organiza tus fechas importantes: exámenes, audiencias, seminarios, etc.</p>
      </div>

      <div className="calendar-container">
        <div className="add-event-form">
          <h3>Añadir Nuevo Plazo/Evento</h3>
          <form onSubmit={handleAddEvent}>
            <div className="form-group">
              <label htmlFor="eventName">Nombre del Evento:</label>
              <input
                type="text"
                id="eventName"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="Ej. Examen Derecho Penal"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="eventDate">Fecha:</label>
              <input
                type="date"
                id="eventDate"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="eventDescription">Descripción (opcional):</label>
              <textarea
                id="eventDescription"
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                placeholder="Detalles adicionales del evento..."
                rows="3"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Añadir Evento</button>
          </form>
        </div>

        <div className="events-list">
          <h3>Próximos Plazos y Eventos</h3>
          {/*
          // Lógica de carga y error para Firestore
          {loading && <p className="loading-message">Cargando eventos...</p>}
          {error && <p className="error-message">{error}</p>}
          */}
          {events.length === 0 ? (
            <p className="no-events">No hay eventos programados. ¡Añade uno nuevo!</p>
          ) : (
            <ul>
              {events.map((event) => (
                <li key={event.id} className="event-item">
                  <div className="event-info">
                    <h4>{event.name}</h4>
                    <p className="event-date">Fecha: {new Date(event.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    {event.description && <p className="event-description">{event.description}</p>}
                  </div>
                  <button onClick={() => handleDeleteEvent(event.id)} className="btn btn-danger">Eliminar</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

export default CalendarSection;