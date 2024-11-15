import React, { useState } from 'react';
import ZoomImage from './ZoomImage';

const ImageGallery = ({ images, onDelete }) => {
  return (
    <div className="gallery">
      {images.map((image, index) => (
        <div key={index} className="gallery-item">
          <div className='cancel'>
          <button
          className='delete-button'
          onClick={() => onDelete(index)}
          >&times;</button>
          </div>
          <ZoomImage baseURL={image}/>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
