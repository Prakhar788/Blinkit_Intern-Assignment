// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import UploadImage from './components/UploadImage';
import ImagesPage from './components/ImagesPage';

const App = () => {
  const storedToken = localStorage.getItem('token');
  const [token, setToken] = useState(storedToken || '');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [token, setToken] = useState('');
  const navigate=useNavigate();
  const handleSignup = async () => {
    try {
      await axios.post('http://localhost:3001/signup', { username, password });
      console.log('User created successfully');
    } catch (error) {
      console.error('Error creating user:', error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/login', { username, password });
      const authtoken=response.data.token
      localStorage.setItem('token', authtoken);
      setToken(authtoken);
      navigate('/');
      console.log('Login successful. Token:', authtoken);
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };
  

  // const handleUpload = async (e) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append('image', e.target.files[0]);
  //     await axios.post('http://localhost:3001/upload', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     console.log('Image uploaded successfully');
  //   } catch (error) {
  //     console.error('Error uploading image:', error.message);
  //   }
  // };
  const handleUpload = async (e) => {
    try {
      const formData = new FormData();
      formData.append('image', e.target.files[0]);
      
      // Log the token for debugging
      console.log('Token:', token);
      const headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: token,
      };
  
      await axios.post('http://localhost:3001/upload', formData, {
        headers
      });
      console.log('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error.message);
    }
  };
  

  return (
   
      <Routes>
        <Route path="/signup" element={         <Signup
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleSignup={handleSignup}
          />}/>
        <Route path="/login" element={          <Login
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />}/>
        <Route path="/upload" element={<UploadImage handleUpload={handleUpload} />}/>
        <Route path='/uploaded-image' element={<ImagesPage/>}/>
        <Route path="/" element={ <Home token={token} />}/>

      </Routes>

  );
};

export default App;
