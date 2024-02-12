// src/components/UploadImage.js
import React from 'react';

const UploadImage = ({ handleUpload }) => {
  return (
    <div>
      <h2>Upload Image</h2>
      <input type="file" onChange={handleUpload} />
    </div>
  );
};

export default UploadImage;
