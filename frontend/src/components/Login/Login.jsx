import React, { useState } from 'react'
import "./Login.css"
import { useNavigate } from 'react-router-dom';
import { api } from '../../utlis/api';
import toast from 'react-hot-toast';
import { useAuth } from '../Contexts/AuthContext';



export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [validated, setValidated] = useState(false);

  const { setToken, setisAuth, setuser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {

      const response = await api.post('/auth/login', { email, password });
      console.log(response.data)
      const token = response.data.token;
      setToken(token);
      localStorage.setItem('token', token);


      // if(role=='admin'){
      //   localStorage.setItem('isAdmin', true);
      //   navigate('/admin');
      // }

     
      navigate('/');
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.');
      console.log(error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidated(true);

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!email || !emailRegex.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    if (!password) {
      setError('Password is required');
      return;
    }

    setError('');

    const loginSuccess = await handleLogin(email, password);
    if (loginSuccess) {
      setEmail('');
      setPassword('');
      setisAuth(true);
      setuser(loginSuccess.user)
    }
  };

  return (
<div className='container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light login-background'>
      <div className='col-11 col-sm-8 col-md-6 col-lg-4 bg-white p-4 rounded shadow'>
        <div id='title' className='text-center mb-4'>
          <h3>Login </h3>
        </div>
        <form className='form needs-validation' 
          noValidate
          onSubmit={handleSubmit}
        >
          <div id='email'  className='mb-3 w-100'>
            <label htmlFor='emailInput'
              className='form-label'
            >Email</label>
            <input placeholder='enter your email'
              type='email'
              // id='emailInput'
              className={`border form-control ${validated && (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) ? 'is-invalid' : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="invalid-feedback">
              Please Enter a Valid Email
            </div>
          </div>
          <div id='pass' className='mb-3 w-100'>
            <label htmlFor='passInput' className='form-label'>Password</label>
            <input placeholder='enter your password'
              type='password'
              // id='passInput'
              className={`border form-control ${validated && !password ? 'is-invalid' : ''}`}              
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="invalid-feedback">
            Password is required
            </div>
          </div>
          {error && <div className="text-danger mb-3">{error}</div>}
          <div className='d-grid'>
            <button id='submitButton' type='submit' className="btn ms-4 m-3">LogIn</button>
          </div>
          {/* {error && <div className="text-danger mt-3">{error}</div>} */}
          <div className='text-center' >
            <a href="/forgetpassword" className='d-block'>forgot your password?</a>
            <a href="/signup"  className='d-block mt-2'>create new account</a>
          </div>
        </form>
      </div>
    </div>
  )
};


