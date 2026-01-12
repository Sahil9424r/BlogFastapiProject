import React, { useState } from 'react';
import api from './api';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/login/', { email, password });
            // Store the token from utils.create_token
            localStorage.setItem('token', response.data.access_token);
            alert("Login successful!");
        } catch (error) {
            alert("Error: " + error.response.data.detail);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;