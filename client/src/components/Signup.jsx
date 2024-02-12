// src/components/Signup.js
import React from 'react';
import '../AuthForm.css'; // Import the CSS file for styling

const Signup = ({ username, password, setUsername, setPassword, handleSignup }) => {
  return (
    <div className="auth-form">
      <h2>Sign Up</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignup}>Sign Up</button>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default Signup;
