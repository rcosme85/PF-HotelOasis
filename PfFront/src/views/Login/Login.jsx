import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Ajusta la importación según tu enrutador
import styles from './Login.module.css';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/hotel/users/login`, formData);

      if (response.data) {
        window.alert('Inicio de sesión exitoso');
        setFormData({
          email: '',
          password: '',
        });
        
      document.getElementById('email').value = '';
      document.getElementById('password').value = '';
    
      }
      
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2 className={styles.loginTitle}>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <label className={styles.label}>
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              className={styles.input}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.label}>
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="password"
              className={styles.input}
              onChange={handleChange}
              required
            />
          </div>
        
          {error && <p className={styles.error}>{error}</p>}
          
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.button}>
              Ingresar
            </button>
            <p>Si no tienes cuenta aún</p>
            <div className={styles.createAccount}>
              
              <Link to="/registrar" className={styles.createAccountLink}>
                Crear cuenta
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
