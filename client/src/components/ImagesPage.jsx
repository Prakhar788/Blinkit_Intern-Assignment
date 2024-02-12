// ImagesPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../ImagesPage.css'; // Import the CSS file for styling

const ImagesPage = () => {
  //const [images, setImages] = useState([]);
  const [usersWithImages, setUsersWithImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Make a request to your Express server's /images endpoint
        const response = await axios.get('http://localhost:3001/images'); // Update the URL
        //setImages(response.data);
        setUsersWithImages(response.data.filter((user) => user.uploadedImages.length > 0));
      } catch (error) {
        console.error('Error fetching images:', error.message);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="images-container">
      <h2>Images Page</h2>
      {usersWithImages.map((user) => (
        <div key={user.username} className="user-images">
          <h3>{user.username}</h3>
          <ul>
            {user.uploadedImages.map((image) => (
              <li key={image.timestamp} className="image-item">
                <img src={image.imageUrl} alt="Uploaded" className="image" />
                <p className="uploaded-by">Uploaded by: {image.uploadedBy}</p>
                <p className="timestamp">Timestamp: {new Date(image.timestamp).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ImagesPage;
