import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllUsers = ({ currentUserId }) => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;
    // Backend @router.get("/") in users.py now filters the current user
    axios.get("http://127.0.0.1:8000/users/", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setUsers(res.data))
    .catch(err => console.error("Error fetching users", err));
  }, [token]);

  return (
    <div className="page-container">
      <h2 style={{ color: '#1e3a8a', marginBottom: '20px' }}>Community Members</h2>
      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
         {users.map(user => (
  <tr 
    key={user.id} 
    onClick={() => navigate(`/?search=${user.username}`)} // Redirect to home with search param
    style={{ cursor: 'pointer' }}
  >
    <td style={{ color: '#2563eb', fontWeight: 'bold' }}>{user.username}</td>
    <td>{user.email}</td>
  </tr>
))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;