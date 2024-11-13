import  { useState } from 'react';
import CameraCapture from './components/CameraCapture';
import ImageGallery from './components/ImageGallery';
import './App.css';

const App = () => {
  const [images, setImages] = useState([]);

  const handleCapture = (imageData) => {
    setImages([...images, imageData]);
  };

  const handleDelete = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="app">
      <h1>Camera Capture and Gallery</h1>
      <CameraCapture onCapture={handleCapture} />
      <ImageGallery images={images} onDelete={handleDelete} />
    </div>
  );
};

export default App;