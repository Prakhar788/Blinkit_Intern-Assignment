// src/components/Home.js
import React from 'react';

const Home = ({ token }) => {
  return (
    <div>
      <h2>Home</h2>
      <p>{token ? `Welcome! You are logged in.` : 'You are not logged in.'}</p>
      <br />
      <p>
        <a href="/signup">Sign Up</a>
      </p>
      <p>
        <a href="/login">Login</a>
      </p>
      <p>
        <a href="/upload">Upload Image</a>
      </p>
    </div>
  );
};

export default Home;
