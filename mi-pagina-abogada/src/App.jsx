// src/App.jsx
import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { AuthProvider } from './auth/AuthContext';

import Header from './sections/HeaderSection';
import HomeSection from './sections/HomeSection';
import LibrarySection from './sections/LibrarySection';
import ToolsSection from './sections/ToolsSection';
import GlossarySection from './sections/GlossarySection';
import ConverterSection from './sections/ConverterSection';
import CalendarSection from './sections/CalendarSection';
import CaseSimulatorSection from './sections/CaseSimulatorSection';
import NewsSection from './sections/NewsSection'; // ¡NUEVA IMPORTACIÓN AQUÍ!

// ELIMINAR O COMENTAR el componente placeholder NewsSection si lo tenías aquí:
/*
const NewsSection = () => (
  <section id="news" style={{ padding: '80px 40px', textAlign: 'center', minHeight: '50vh', backgroundColor: 'var(--color-primary-light)' }}>
    <h2 style={{ fontFamily: 'var(--font-family-display)', fontSize: '2.5em', color: 'var(--color-primary-dark)' }}>Noticias Legales</h2>
    <p style={{ fontFamily: 'var(--font-family-primary)', fontSize: '1.2em', color: 'var(--color-text-dark)' }}>Mantente informado con las últimas novedades del ámbito legal.</p>
    <p>Contenido de noticias aquí...</p>
  </section>
);
*/

const ProfileSection = () => (
  <section id="profile" style={{ padding: '80px 40px', textAlign: 'center', minHeight: '50vh', backgroundColor: 'var(--color-background)' }}>
    <h2 style={{ fontFamily: 'var(--font-family-display)', fontSize: '2.5em', color: 'var(--color-primary-dark)' }}>Mi Perfil</h2>
    <p style={{ fontFamily: 'var(--font-family-primary)', fontSize: '1.2em', color: 'var(--color-text-dark)' }}>Administra la información de tu cuenta.</p>
    <p>Contenido del perfil aquí...</p>
  </section>
);


function App() {
  const [currentView, setCurrentView] = useState('home');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (!user && currentView !== 'login' && currentView !== 'register' && currentView !== 'home') {
        setCurrentView('home');
      }
    });
    return () => unsubscribe();
  }, [currentView]);


  const handleNavigate = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      handleNavigate('home');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert("Error al cerrar sesión.");
    }
  };


  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeSection onNavigate={handleNavigate} />;
      case 'library':
        return <LibrarySection />;
      case 'tools':
        return <ToolsSection onNavigate={handleNavigate} />;
      case 'news':
        return <NewsSection />; // ¡USA EL COMPONENTE IMPORTADO!
      case 'profile':
        return <ProfileSection />;
      case 'login':
        return <Login onNavigate={handleNavigate} />;
      case 'register':
        return <Register onNavigate={handleNavigate} />;
      case 'glossary':
        return <GlossarySection />;
      case 'converter':
        return <ConverterSection />;
      case 'calendar':
        return <CalendarSection />;
      case 'simulator':
        return <CaseSimulatorSection />;
      default:
        return <HomeSection onNavigate={handleNavigate} />;
    }
  };

  return (
    <AuthProvider>
      <div className="app-container">
        <Header onNavigate={handleNavigate} onLogout={handleLogout} currentUser={user} />
        <main className="main-content">
          {renderView()}
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;