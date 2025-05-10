import React, { useState } from 'react'
import "./ForgetPassword.css"
import { useNavigate } from 'react-router';
export default function ForgetPassword() {


  // ناقص يتعمله باك

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();


  const resetButton = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/forgot-password', { email });  // لازم يتعملها  api
      setSuccessMessage('We have sent you an email with a link to reset your password.');
      setError('');
    } catch (error) {
      setError('Failed to send reset email. Please check your email and try again.');
      setSuccessMessage('');
    }
  };

  const cancelButton = () => {
    navigate('/login') ; 
  };



  return (
    <>

<div  className="container-fluid d-flex justify-content-center align-items-center min-vh-100 forget-bg">


<div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>

  <div className="text-center mb-3">
   <h3>Reset your password </h3> 
   {/* We will send you an email to reset your password */}
   <p className="text-center"> Please enter your email address to search for your account</p>
  </div>

      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

  <form className='form'>
    <div className="mb-3">
    <label  htmlFor="emailInput" className="form-label">Email</label>
    <input  className="form-control" placeholder='enter your email' type='email' id='emailInput' required/>
    </div>
     
    <div className="d-flex justify-content-between mt-4">
          <button className="btn w-45" onClick={resetButton}>reset</button>
          <button className="btn w-45" onClick={cancelButton}>cancel</button>
    </div>


    </form>
    </div>
    </div>
    </>
  )
}