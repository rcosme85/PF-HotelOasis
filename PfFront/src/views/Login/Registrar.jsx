import React, { useState } from 'react';
import axios from 'axios';
import styles from './Registrar.module.css';
import { Link } from 'react-router-dom';

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmPassword: '',
    admin: false,
  });

  const [errors, setErrors] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar campos obligatorios
    const newErrors = {};
    if (formData.nombre === '') {
      newErrors.nombre = 'Este campo es obligatorio';
    }
    if (formData.apellido === '') {
      newErrors.apellido = 'Este campo es obligatorio';
    }
    if (formData.email === '') {
      newErrors.email = 'Este campo es obligatorio';
    }
    if (formData.password === '') {
      newErrors.password = 'Este campo es obligatorio';
    }
    if (formData.confirmPassword === '') {
      newErrors.confirmPassword = 'Este campo es obligatorio';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/hotel/users`, formData);
      console.log(formData)
      if (response.data) {
        window.alert('Usuario creado!');
        setFormData({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        confirmPassword: '',
        admin: false,
      });

      document.getElementById('nombre').value = '';
      document.getElementById('apellido').value = '';
      document.getElementById('email').value = '';
      document.getElementById('password').value = '';
      document.getElementById('confirmPassword').value = '';
      }
    } catch (error) {
      console.error('Error sending data to backend:', error);
      if (error.response.status === 400) {
        window.alert("Correo electronico ya existe")
      }
    }
  };

  return (

    <div className={styles.container}>
      
    <form onSubmit={handleSubmit} className={styles.registrationForm}>
      <input type="hidden" name="admin" value="false" />
      <h2 className={styles.titleCreate}>Crear cuenta</h2>

      <div>
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
            Nombres
          </label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            autoComplete="given-name"
            className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${errors.nombre ? 'border-red-500' : ''}`}
            onChange={handleChange}
            required
          />
          {errors.nombre && <p className="text-red-500">{errors.nombre}</p>}
        </div>

        <div>
          <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">
            Apellidos
          </label>
          <input
            type="text"
            name="apellido"
            id="apellido"
            autoComplete="family-name"
            className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${errors.apellido ? 'border-red-500' : ''}`}
            onChange={handleChange}
            required
          />
          {errors.apellido && <p className="text-red-500">{errors.apellido}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Correo electrónico
          </label>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${errors.email ? 'border-red-500' : ''}`}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="new-password"
            className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${errors.password ? 'border-red-500' : ''}`}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>

        <div>
          <label >
            Confirmar Contraseña
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            autoComplete="new-password"
            className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${errors.confirmPassword ? 'border-red-500' : ''}`}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
        </div>
      </div>

      <div className={`mt-6 ${styles.buttonContainer}`} >
        <button
          type="submit"
          className=""
        >
          Registrar
        </button>
        <p className={styles.pcreate}>Si no tienes cuenta aún</p>
        <div className={styles.Loginlinkdiv}>
              
              <Link to="/login" className={styles.loginLink}>
                Iniciar sesión
              </Link>
            </div>
      </div>
    </form>
    </div>
  );
}
