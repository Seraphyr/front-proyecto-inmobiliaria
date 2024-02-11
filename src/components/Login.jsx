import './Login.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = () => {
  const [nombre, setNombre] = useState(''); 
  const [clave, setClave] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setNombre(e.target.value); 
  };

  const handlePasswordChange = (e) => {
    setClave(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3001/login', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: nombre, password: clave }) 
    });
    const data = await response.json();
    console.log(data);
    if (data.token) {
      Cookies.set('token', data.token);
      navigate('/');
    }
  };

  return (
    <div className="login-container text-white">
      <form onSubmit={handleSubmit} className="login-form bg-opacity-100 text-white blockquote-footer rounded-end-circle p-5">
        <h2 className="login-title">Log In</h2>
        <div className="form-group">
          <label>Nombre:</label>
          <input type="text" value={nombre} onChange={handleUsernameChange} className="form-control" />
        </div>
        <div className="form-group">
          <label>Clave:</label>
          <input type="password" value={clave} onChange={handlePasswordChange} className="form-control" />
        </div>
        <button type="submit" className="btn">Entrar</button> {/* Agregado "type" para el botón de enviar */}
        <button className="btn" onClick={() => navigate('/register')}>Registrarse</button>
      </form>
    </div>
  );
};

export default Login;