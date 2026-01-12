import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Posts from './pages/Posts';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AllUsers from './pages/AllUsers';
import EditPost from './pages/EditPost';
import CreatePost from './pages/CreatePost';
import './App.css';

function App() {
  // Initialize state from localStorage
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [currentUserId, setCurrentUserId] = useState(localStorage.getItem('userId'));

  const handleLogin = (newToken, userId) => {
    setToken(newToken);
    setCurrentUserId(userId);
  };

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    setCurrentUserId(null);
  };

  return (
    <Router>
      <Navbar token={token} onLogout={handleLogout} />
      <div className="main-content">
        <Routes>
          {/* Pass state as props for reactivity */}
          <Route path="/" element={<Posts token={token} currentUserId={currentUserId} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/users" element={<AllUsers token={token} currentUserId={currentUserId} />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;