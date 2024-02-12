// ImagesPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImagesPage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Make a request to your Express server's /images endpoint
        const response = await axios.get('http://localhost:3001/images');
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error.message);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <h2>Images Page</h2>
      {images.map((user) => (
        <div key={user.username}>
          <h3>{user.username}</h3>
          <ul>
            {user.uploadedImages.map((image) => (
              <li key={image.timestamp}>
                <img src={image.imageUrl} alt="Uploaded" />
                <p>Uploaded by: {image.uploadedBy}</p>
                <p>Timestamp: {new Date(image.timestamp).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ImagesPage;
