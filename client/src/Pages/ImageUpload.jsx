import React, { useState } from 'react';
import axios from 'axios';

function ImageUpload() {
  const [file, setFile] = useState(null);
  const [dehazedImagePath, setDehazedImagePath] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append('upload_file', file);

    try {
      const response = await axios.post('http://127.0.0.1:5000/dehaze/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(response.data);
      setDehazedImagePath(url);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const downloadImage = async () => {
    if (dehazedImagePath) {
      try {
        const response = await axios.get(dehazedImagePath, {
          responseType: 'blob'
        });
        const url = window.URL.createObjectURL(response.data);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'dehazed_image.jpg');
        document.body.appendChild(link);
        link.click();
      } catch (error) {
        console.error('Error downloading image:', error);
      }
    }
  };

  return (
    <div className="App">
      <h1>Dehaze Image</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile}>Upload Image</button>
      {dehazedImagePath && (
        <div>
          <img src={dehazedImagePath} alt="Dehazed" style={{ maxWidth: '100%', maxHeight: '400px' }} />
          <button onClick={downloadImage}>Download Dehazed Image</button>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;