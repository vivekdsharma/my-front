import React, { useState } from 'react';
import '../styles/formStyles.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CustomerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        uemail: email,
        upassword: password,
      });
  
      if (response.data.success) {
        console.log('Login Response:', response.data);  // Check the response
        alert('User Logged In!');
        
        // Save the token and userId in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);
  
        navigate('/customer-landing'); // Redirect to landing page after successful login
      }
    } catch (err) {
      setError(err.response ? err.response.data.error : 'Something went wrong');
    }
  };
  

  return (
    <div className="user-login-container">
      <h2 className="user-login-title">User Login</h2>
      <form onSubmit={handleSubmit} className="user-login-form">
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input
          type="email"
          className="user-login-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="user-login-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="user-login-button">Login</button>
      </form>
    </div>
  );
};

export default CustomerLogin;
