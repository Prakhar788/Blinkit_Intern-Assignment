// src/components/Home.js
import React from 'react';

const Home = ({ token }) => {
  return (
    <div>
      <h2>Home</h2>
      <p>{token ? `Welcome! You are logged in.` : 'You are not logged in.'}</p>
      <br />
      
    </div>
  );
};

export default Home;
