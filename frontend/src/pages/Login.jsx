import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

// 1. Receive onLogin as a prop to update global state instantly
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('username', email); // FastAPI OAuth2 expects 'username'
      formData.append('password', password);

      const res = await axios.post("http://127.0.0.1:8000/login", formData);

      // 2. Save auth data to localStorage
      localStorage.setItem('token', res.data.access_token);
      localStorage.setItem('userId', res.data.user_id); 

      // 3. Update parent state in App.jsx
      // This ensures Navbar and Posts see the new token immediately
      onLogin(res.data.access_token, res.data.user_id); 

      navigate('/'); // 4. Redirect to home feed
    } catch (err) {
      console.error(err);
      alert("Invalid Credentials or Server Error");
    }
  };

  return (
    <div className="page-container">
      <div className="standard-card">
        <h2 style={{ color: '#1e3a8a', marginBottom: '20px' }}>Welcome Back</h2>
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          {/* Using wide primary button style */}
          <button type="submit" className="btn-primary-wide">Login</button>
        </form>
        <p style={{ marginTop: '20px' }}>
          Don't have an account? <Link to="/signup" style={{ color: '#2563eb', fontWeight: 'bold' }}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;