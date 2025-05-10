import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { useAuth } from '../Contexts/AuthContext'; 
import "./SignUp.css"
import { api } from '../../utlis/api';


export default function SignUp() {

  const navigate = useNavigate();
  const { setToken } = useAuth();

  const [username, setUsername] = useState(''); 
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setpNumber] = useState('');
  const [error, setError] = useState('');
  const [validated, setValidated] = useState(false);

  const handleSignUp = async (email, password,username,address,phone) => {
    try {
      const response = await api.post('/auth/register', { email, password,username,address,phone });
      
      setToken(response.data.token)
      
      console.log('Signup success:', response.data);
      navigate('/login');
      return true ;
    } catch (error) {
      setError(error.response?.data?.message || 'SignUp failed. Please try again.');
      console.log(error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidated(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const phoneRegex = /^[0-9]{10,15}$/;

    if (!username.trim()) {
      setError('Please enter your username');
      return;
    }
    if (!email || !emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!address.trim()) {
      setError('Please enter your address');
      return;
    }
    if (!phone || !phoneRegex.test(phone)) {
      setError('Please enter a valid phone number');
      return;
    }
    if (!password || !passwordRegex.test(password)) {
      setError('Password must be at least 8 characters long and contain letters, numbers, and special characters');
      return;
    }

    
    setError('');
    const SignSuccess =await handleSignUp(email, password,username,address,phone );  
    if (SignSuccess) {
    setUsername('');
    setEmail('');
    setAddress('');
    setPassword('');
    setpNumber('');
  }
  }

  return (
    <div  className='container-fluid d-flex justify-content-center align-items-center min-vh-100 signup-bg container1'>
    <div  className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>

      {/* <div  id='title'> */}
       <p className="text-center mb-4" > Sign Up </p> 
      {/* </div> */}

      <form className='form needs-validation' onSubmit={handleSubmit} noValidate>
        <div id='name' className="mb-3">
        <label htmlFor='nameInput' className='form-label'>User Name</label>
        <input placeholder='enter your name' 
        type='text' 
        id='nameInput' 
        className={`form-control ${validated && !username.trim() ? 'is-invalid' : ''}`}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        />
        </div>

        <div id='email'className="mb-3">
        <label htmlFor='emailInput' className='form-label'>Email</label>
        <input placeholder='enter your email' 
        type='email' 
        id='emailInput' 
        className={`form-control ${validated && (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) ? 'is-invalid' : ''}`}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        />
        </div>

        <div id='adress' className="mb-3">
        <label htmlFor='adressInput' className='form-label'>Address</label>
        <input placeholder='enter your address' 
        type='text' 
        id='adressInput'
        className={`form-control ${validated && !address.trim() ? 'is-invalid' : ''}`}
        value={address}
        onChange={(e)=> setAddress(e.target.value)}
        required
        />
        </div>

        <div id='phoneNumber' className="mb-3">
        <label htmlFor='phoneNumberInput' className='form-label'>Phone Number</label>
        <input placeholder='enter your phone number' 
        type='number' 
        id='phoneNumberInput'
        className={`form-control ${validated && (!phone || !/^[0-9]{10,15}$/.test(phone)) ? 'is-invalid' : ''}`}
        value={phone}
        onChange={(e)=> setpNumber(e.target.value)}
        required
        />
        </div>

        <div id='pass' className="mb-3">
        <label htmlFor='passInput'>Password</label>
        <input placeholder='enter your password' 
        type='password' 
        id='passInput'
        className={`form-control ${validated && (!password || password.length < 8) ? 'is-invalid' : ''}`}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        />
        </div>

        <div className="d-grid">
          <button id='submitButton' className="btn" type='submit' >Sign Up</button>
        </div>


        {error && <div className="text-danger mt-3">{error}</div>}


        <div className="text-center mt-3">
          <a href='/login'>already have an account</a>
        </div>



      </form>

    </div>
    </div>
  )
}
