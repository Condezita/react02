import React, { useState } from 'react';
import { useAuth } from '../ruteo/AuthContext';
import { useNavigate } from 'react-router-dom';

// Para verificar que no registre con el mismo correo
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '../conexion/firebase';

import "react-toastify/dist/ReactToastify.css";           // Para estilos
import { ToastContainer, toast } from "react-toastify";

function RegisterForm() {

  const { register } = useAuth();             // Registra usuario
  
  const [email, setEmail] = useState('');       // Variables para correo
  const [password, setPassword] = useState(''); // Variable para password
  
  const navigate = useNavigate();               // Navegación

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await register(email, password);
      //await registerUser(email, password);    // Verifica correo ya registrado
      navigate('/iniciarsesion'); // Redirigir a ruta /iniciarsesion
      console.log("Se registro usuario...xxx");
    } catch (error) {
      console.error('Error al registrar usuario:', error.message);
    }
  }

  return (

    <div className='container-sm text-center' id='none'>
      <div className='card bs-secondary p-3 mt-3'>
        
        <ToastContainer/>

        <div className='col-md-12 p-2'>
          <div className='card mb-1'>
            <h2>Registro de Nuevo Usuario</h2>
          </div>
        </div>

        <form className='card card-body' onSubmit={handleRegister}>

        <div className='form-group input-group'>
          <div className='input-group-text bd-light'>
            <i className='material-icons'>person_add</i>
          </div>
          <input className='form-control float-start' placeholder='Email'  
            type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        
        <div className='form-group input-group'>
          <div className='input-group-text bd-light'>
            <i className='material-icons'>lock</i>
          </div>
          <input className='form-control float-start' placeholder='Contraseña'  
            type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

          
        <button className='btn btn-primary btn-block' type="submit">
          Registrarse
        </button>

        </form>

      </div>
    </div>

  );
}

export default RegisterForm;

/*
const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await register(email, password);
      //await registerUser(email, password);    // Verifica correo ya registrado
      navigate('/iniciarsesion'); // Redirigir a ruta /iniciarsesion
      console.log("Se registro usuario...xxx");
    } catch (error) {
      console.error('Error al registrar usuario:', error.message);
    }
  }
*/