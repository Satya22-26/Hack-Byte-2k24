import React, { useState } from 'react';
import axios from 'axios';

function Video() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [processedVideoPath, setProcessedVideoPath] = useState(null);

  const fileSelectedHandler = event => {
    setSelectedFile(event.target.files[0]);
  };

  const fileUploadHandler = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    axios.post('http://127.0.0.1:5000/uploadvideo', formData)
      .then(response => {
        console.log('Upload successful:', response.data);
        setProcessedVideoPath(response.data.processed_video_path);
      })
      .catch(error => {
        console.error('Upload failed:', error.message);
        // Display error message
      });
  };

  const downloadProcessedVideo = () => {
    axios.get(`http://localhost:5000/processedvideo?path=${processedVideoPath}`, { responseType: 'blob' })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `processed_video.mp4`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(error => {
        console.error('Download failed:', error.message);
        // Display error message
      });
  };

  return (
    <div>
      <input type="file" onChange={fileSelectedHandler} />
      <button onClick={fileUploadHandler}>Upload</button>
      {processedVideoPath && <button onClick={downloadProcessedVideo}>Download Processed Video</button>}
    </div>
  );
}

export default Video;
