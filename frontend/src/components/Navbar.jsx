import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ token, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${searchQuery}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="brand">MyBlogApp</Link>
        
        <form onSubmit={handleSearch} className="search-form">
          <input 
            type="text" 
            placeholder="Search author..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </form>

        <div className="nav-links">
          <Link to="/" className="nav-item">Home</Link>
          <Link to="/users" className="nav-item">Users</Link>
          {token ? (
            <>
              <Link to="/create-post" className="nav-item">Create Blog</Link>
              <button onClick={() => { onLogout(); navigate('/login'); }} className="logout-button">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-item">Login</Link>
              <Link to="/signup" className="signup-btn">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;