// src/components/Login.js
import React from 'react';
import '../AuthForm.css'; // Import the CSS file for styling

const Login = ({ username, password, setUsername, setPassword, handleLogin }) => {
  return (
    <div className="auth-form">
      <h2>Login</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
};

export default Login;
