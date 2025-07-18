// src/components/Register.jsx
import React, { useState } from 'react';
import './Register.css'; // Asegúrate de que este archivo CSS exista en la misma carpeta
// Puedes importar Firebase aquí si Register maneja su propia lógica de autenticación
// import { auth } from '../firebase';
// import { createUserWithEmailAndPassword } from 'firebase/auth';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    // Aquí iría tu lógica de registro, por ejemplo con Firebase:
    // try {
    //   await createUserWithEmailAndPassword(auth, email, password);
    //   setSuccess('¡Registro exitoso! Ya puedes iniciar sesión.');
    //   setEmail('');
    //   setPassword('');
    //   setConfirmPassword('');
    // } catch (err) {
    //   console.error("Error al registrar:", err);
    //   setError('Error al registrar: ' + err.message);
    // }

    // Simulación de registro
    console.log('Intentando registrar:', { email, password });
    setSuccess('¡Registro exitoso (simulado)!');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="register-container">
      <h2>Crear Cuenta</h2>
      {error && <p className="register-error-message">{error}</p>}
      {success && <p className="register-success-message">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="register-email">Correo Electrónico</label>
          <input
            type="email"
            id="register-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu.email@ejemplo.com"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="register-password">Contraseña</label>
          <input
            type="password"
            id="register-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="register-confirm-password">Confirmar Contraseña</label>
          <input
            type="password"
            id="register-confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="********"
            required
          />
        </div>
        <button type="submit" className="register-submit-button">
          Registrarme
        </button>
      </form>
    </div>
  );
}

export default Register;