import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Posts = ({ token, currentUserId }) => { 
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const navigate = useNavigate();
  const searchName = new URLSearchParams(search).get('search');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const url = searchName 
          ? `http://127.0.0.1:8000/posts/?username=${searchName}`
          : "http://127.0.0.1:8000/posts/";
        const res = await axios.get(url);
        setPosts(res.data);
      } catch (err) { console.error("Fetch error:", err); }
    };
    fetchPosts();
  }, [searchName]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
    } catch (err) { alert("Error deleting post"); }
  };

  return (
    <div className="page-container">
      <div style={{width: '100%', maxWidth: '800px'}}>
        <h2 style={{textAlign: 'center', marginBottom: '20px', color: '#1e3a8a'}}>
          {searchName ? `Posts by ${searchName}` : "Public Feed"}
        </h2>
        {searchName && (
          <button onClick={() => navigate('/')} style={{display: 'block', margin: '0 auto 20px', background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', textDecoration: 'underline'}}>
            Show All Posts
          </button>
        )}
        <div className="posts-list">
          {posts.map(post => (
            <div key={post.id} className="post-card-clean">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <div className="post-footer">
                <span style={{fontWeight: 'bold', color: '#64748b'}}>Author: {post.author}</span>
                {token && currentUserId && Number(currentUserId) === post.author_id && (
                  <div className="action-buttons">
                    <button onClick={() => navigate(`/edit/${post.id}`)} className="btn-edit">Edit</button>
                    <button onClick={() => handleDelete(post.id)} className="btn-delete">Delete</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;