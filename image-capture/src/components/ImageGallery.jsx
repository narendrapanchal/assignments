import React, { useState } from 'react';

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
          <img
            src={image}
            alt="Captured"
            className="gallery-image"
            style={{ transition: 'transform 0.3s' }}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
