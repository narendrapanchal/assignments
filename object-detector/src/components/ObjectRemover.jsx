import React, { useRef, useState, useEffect } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import { Stage, Layer, Image, Rect } from 'react-konva';

function ObjectRemover() {
  const imageRef = useRef();
  const [image, setImage] = useState(null);
  const [objects, setObjects] = useState([]);
  const [selectedObject, setSelectedObject] = useState(null);
  
  // Load image and model on mount
  useEffect(() => {
    const loadImage = () => {
      const img = new window.Image();
      img.src = 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTzMfFHMvk5Dsn4vygZaxX3nrvZfifDyo5EpTswYEIqXbOQIv64qaSOdjhvGCE3buTfWm5dxRw6AgWYELWS2TlhIHTBf7Dokyzoy2MjNwQ'; // Replace with your image URL
      img.crossOrigin = 'anonymous'; // To avoid CORS issues
      img.onload = () => setImage(img);
    };

    loadImage();

    // Load the COCO-SSD model and detect objects
    const loadModelAndDetect = async () => {
      const model = await cocoSsd.load();
      if (image) {
        const predictions = await model.detect(image);
        setObjects(predictions);
      }
    };

    if (image) {
      loadModelAndDetect();
    }
  }, [image]);

  // Handle object selection and "removal"
  const handleObjectClick = (index) => {
    setSelectedObject(index);
  };

  const handleRemoveObject = () => {
    if (selectedObject !== null) {
      // Remove the selected object from the detected objects list
      setObjects(objects.filter((_, i) => i !== selectedObject));
      setSelectedObject(null);
    }
  };

  return (
    <div>
      <button onClick={handleRemoveObject} disabled={selectedObject === null}>
        Remove Selected Object
      </button>
      <Stage width={600} height={400}>
        <Layer>
          {image && <Image image={image} ref={imageRef} />}
          {objects.map((obj, index) => (
            <Rect
              key={index}
              x={obj.bbox[0]}
              y={obj.bbox[1]}
              width={obj.bbox[2]}
              height={obj.bbox[3]}
              stroke={index === selectedObject ? 'red' : 'yellow'}
              strokeWidth={2}
              onClick={() => handleObjectClick(index)}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}

export default ObjectRemover;
