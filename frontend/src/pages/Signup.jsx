import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Ensure backend has @router.post("/signup/")
      await axios.post("http://127.0.0.1:8000/signup/", formData);
      alert("Registration Successful! Please login.");
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.detail || "Signup failed. Try a different username or email.");
    }
  };

  return (
    <div className="page-container">
      <div className="standard-card">
        <h2 style={{color: '#1e3a8a', marginBottom: '20px'}}>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <input type="text" placeholder="Username" required
            onChange={e => setFormData({...formData, username: e.target.value})} />
          <input type="email" placeholder="Email" required
            onChange={e => setFormData({...formData, email: e.target.value})} />
          <input type="password" placeholder="Password" required
            onChange={e => setFormData({...formData, password: e.target.value})} />
          <button type="submit" className="btn-primary-wide">Register</button>
        </form>
        <p style={{marginTop: '20px'}}>
          Already have an account? <Link to="/login" style={{color: '#2563eb', fontWeight: 'bold'}}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;