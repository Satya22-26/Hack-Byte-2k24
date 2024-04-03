import React, { useEffect } from 'react';

const RealTimeDehaze = () => {
    useEffect(() => {
        const accessCamera = async () => {
            try {
                const video = document.getElementById('original-video');
                const dehazedImage = document.getElementById('dehazed-image');

                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                video.srcObject = stream;

                video.addEventListener('play', () => {
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.width = 640;
                    canvas.height = 480;

                    setInterval(() => {
                        context.drawImage(video, 0, 0, canvas.width, canvas.height);
                        const imageData = canvas.toDataURL('image/jpeg');

                        // Send the frame to the server for dehazing
                        fetch('http://127.0.0.1:5000/api/process_frame', {
                            method: 'POST',
                            body: JSON.stringify({ image_data: imageData }),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        .then(response => response.json())
                        .then(data => {
                            // Display dehazed frame
                            dehazedImage.src = 'data:image/jpeg;base64,' + data.dehazed_image;
                        });
                    }, 1000 / 30);
                });
            } catch (error) {
                console.error('Error accessing camera:', error);
            }
        };

        accessCamera();
    }, []);

    return (
        <div>
            <h1>Real-time Dehazing Platform</h1>
            <div id="video-container">
                <div id="original-frame">
                    <h3>Original Frame</h3>
                    <video id="original-video" autoPlay playsInline width="640" height="480"></video>
                </div>
                <div id="dehazed-frame">
                    <h3>Dehazed Frame</h3>
                    <img id="dehazed-image" src="" alt="Dehazed Image" width="640" height="480" />
                </div>
            </div>
        </div>
    );
};

export default RealTimeDehaze;