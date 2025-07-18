// src/components/Login.jsx
import React, { useRef, useState } from 'react';
import { useAuth } from '../auth/AuthContext'; // Importa el hook de autenticación
import './AuthForms.css'; // Crearemos este CSS

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth(); // Obtiene la función de login del contexto
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Para deshabilitar el botón mientras se carga

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el recargado de la página

    try {
      setError(''); // Limpia errores anteriores
      setLoading(true); // Inicia el estado de carga
      await login(emailRef.current.value, passwordRef.current.value);
      // Si el login es exitoso, podrías redirigir al usuario o mostrar un mensaje
      alert('¡Inicio de sesión exitoso!');
      // Opcional: window.location.href = '/'; o una redirección con React Router
    } catch (err) {
      setError('Error al iniciar sesión: ' + err.message);
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Iniciar Sesión</h2>
        {error && <p className="auth-error">{error}</p>} {/* Muestra errores si los hay */}
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input type="email" id="email" ref={emailRef} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input type="password" id="password" ref={passwordRef} required />
        </div>
        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? 'Iniciando...' : 'Iniciar Sesión'}
        </button>
        <p className="auth-switch">
          ¿No tienes cuenta? <a href="/register">Regístrate aquí</a> {/* Esto requeriría React Router o un estado simple para mostrar Register */}
        </p>
      </form>
    </div>
  );
}

export default Login;