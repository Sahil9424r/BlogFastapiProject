import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [data, setData] = useState({ title: '', content: '' });
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/posts/", data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/'); // Return to public feed
    } catch (err) {
      alert("Error: Please login to publish.");
    }
  };

  return (
    <div className="page-container">
      <div className="standard-card">
        <h2 style={{ color: '#1e3a8a', marginBottom: '20px' }}>Create New Blog</h2>
        <form onSubmit={handleCreate}>
          <input 
            type="text" 
            placeholder="Title" 
            required 
            onChange={e => setData({...data, title: e.target.value})} 
          />
          <textarea 
            placeholder="Content" 
            rows="6" 
            required 
            onChange={e => setData({...data, content: e.target.value})} 
          />
          <button type="submit" className="btn-primary-wide">Publish Blog</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;