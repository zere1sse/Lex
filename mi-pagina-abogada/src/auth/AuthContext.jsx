// src/auth/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase'; // Importa la instancia de autenticación de Firebase
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged // Para escuchar cambios en el estado de autenticación
} from 'firebase/auth';

// Crea el contexto de autenticación
const AuthContext = createContext();

// Hook personalizado para usar el contexto de autenticación
export function useAuth() {
  return useContext(AuthContext);
}

// Proveedor de autenticación que envuelve tu aplicación
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null); // Estado para el usuario actual
  const [loading, setLoading] = useState(true); // Para saber si la autenticación se está cargando

  // Funciones de autenticación
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  // Escuchar cambios en el estado de autenticación (cuando el usuario inicia/cierra sesión)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user); // Establece el usuario actual
      setLoading(false);    // La carga ha terminado
    });

    // Limpia el listener cuando el componente se desmonta
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Solo renderiza los hijos cuando la carga ha terminado */}
    </AuthContext.Provider>
  );
}