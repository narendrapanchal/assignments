import React, { useEffect, useRef, useState } from 'react'

const  ImageComponent=({imageUrl})=> {
    const [scale,setScale]=useState(1);
    const [postion,setPosition]=useState({x:0,y:0});
    const imageRef=useRef(null);
    const handleZoomIn=()=>{
        setScale((prev)=>prev+0.1);
    }
    const handleZoomOut=()=>{
        setScale((prev)=>prev-0.1);
    }
    useEffect(()=>{
const image=imageRef.current;
let isDragging=false;
let prevPosition={x:0,y:0};
const handleMouseDown=(e)=>{
    isDragging=true;
    prevPosition={x:e.clientX,y:e.clientY};
}
    },[])
  return (
    <div style={{
        backgroundColor:"#fffffff",
        borderRadius:"10px",
        position:"relative",
        overflow:"hidden"  
    }}>
        <div className='btn-container'>
            <button onClick={handleZoomIn}>
                <span>Add</span>
            </button>
            <button onClick={handleZoomOut}>
                <span>remove</span>
            </button>
        </div>
        <img ref={imageRef}
        scr={imageUrl}
        alt="Image"
        style={{
            width:"50vw",
            height:"auto",
            cursor:"move",
            transform:`scale(${scale}) translate(${position.x}px, ${position.y}px)`
        }}
        draggable={false}
        />
      
    </div>
  )
}

export default ImageComponent
