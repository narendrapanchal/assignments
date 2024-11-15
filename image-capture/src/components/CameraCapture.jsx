import React, { useState, useRef, useEffect } from 'react';

const CameraCapture = ({ onCapture }) => {
  const videoRef = useRef(null);
  const [cameraFacing, setCameraFacing] = useState('user'); // 'user' is the front camera
  const [zoomLevel, setZoomLevel] = useState(1);
  const [aspectRatio, setAspectRatio] = useState('16:9');

  useEffect(() => {
    const getMedia = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: cameraFacing,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });
      videoRef.current.srcObject = stream;
    };
    getMedia();
  }, [cameraFacing]);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.1, 2)); 
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.1, 1)); 

  const handleCapture = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    onCapture(canvas.toDataURL());
  };

  const handleAspectRatioChange = (ratio) => setAspectRatio(ratio);

  return (
    <div className='camera-capture'>
      <video ref={videoRef} autoPlay style={{ transform: `scale(${zoomLevel})`, aspectRatio: aspectRatio }} />
      <div className='buttons'>
        <button onClick={() => setCameraFacing(cameraFacing === 'user' ? 'environment' : 'user')}>Toggle Camera</button>
        <button onClick={handleZoomIn}>Zoom In</button>
        <button onClick={handleZoomOut}>Zoom Out</button>
        <button onClick={() => handleAspectRatioChange('16:9')}>16:9</button>
        <button onClick={() => handleAspectRatioChange('4:3')}>4:3</button>
        <button onClick={() => handleAspectRatioChange('1:1')}>1:1</button>
        <button onClick={handleCapture}>Capture</button>
      </div>
    </div>
  );
};

export default CameraCapture;
