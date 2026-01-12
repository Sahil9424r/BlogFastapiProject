import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({ title: '', content: '' });
  const token = localStorage.getItem('token');

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/posts/`);
        const post = res.data.find(p => p.id === parseInt(id));
        if (post) setData({ title: post.title, content: post.content });
      } catch (err) { console.error("Error fetching post:", err); }
    };
    getPost();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/posts/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/');
    } catch (err) { alert(err.response?.data?.detail || "Update failed"); }
  };

  return (
    <div className="page-container">
      <div className="standard-card">
        <h2 style={{color: '#1e3a8a', marginBottom: '20px'}}>Edit Post</h2>
        <form onSubmit={handleUpdate}>
          <input type="text" value={data.title} onChange={e => setData({...data, title: e.target.value})} required />
          <textarea value={data.content} onChange={e => setData({...data, content: e.target.value})} rows="5" required />
          <button type="submit" className="btn-primary-wide">Save Changes</button>
          <button type="button" onClick={() => navigate('/')} style={{marginTop: '10px', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontWeight: 'bold'}}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;