import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../assets/byte.png'

const Signin = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  axios.defaults.withCredentials=true;

  const [err, setErr] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5006/api/auth/login', {
      username: formData.username,
      password: formData.password
    })
    .then(res => {
      console.log("Response data:", res.data); 
      if (res.data.Login) {
        if(res.data.role==='admin'){
        console.log("Login State", res.data.Login);
        window.location.href = '/AdminDashboard';
        }
        else{
          window.location.href='/'
        }
      } 
        
      
    })
    .catch(err => {
      console.error(err);
      setErr('Error signing in');
    });
  };

  return (
    <div className="min-h-screen max-lg:flex-col flex bg-white">
      <div className="md:block md:w-1/2 bg-coral-red p-8 text-center">
        <img src='https://png.pngtree.com/png-vector/20231015/ourmid/pngtree-scan-delivery-process-png-image_10160781.png' alt="Welcome illustration" className="mx-auto w-2/3 mb-4" />
        <p className="text-white">Join us to see the latest technology products out there.</p>
      </div>
      <div className="m-auto w-3/4 p-16 md:w-1/2">
        <div className="text-center mb-4">
        <div className="text-center flex flex-col justify-center items-center mb-8">
          <img src={logo} className='w-1/4 max-lg:w-3/4 '></img>
        </div>        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Your name"
              className="border border-gray-300 rounded-md py-2 px-3 w-full"
            />
          </div>
      
          <div className="mb-3">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="border border-gray-300 rounded-md py-2 px-3 w-full"
            />
          </div>
          {err && <p className="text-red-500">{err}</p>}
          <button
            type="submit"
            className="bg-coral-red text-white py-2 px-4 rounded-md w-full hover:bg-red-600"
          >
    
            Sign in 
              </button>
        </form>
        <div className="text-center mt-4">
          <p>Already have an account? <Link to={'/signup'} className="text-coral-red">Register</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
