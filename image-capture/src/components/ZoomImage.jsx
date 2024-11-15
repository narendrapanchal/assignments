import ImageZoom from "react-image-zooom";

const ZoomImage = ({baseURL}) => {
 
    
return (
    <>
    <ImageZoom
                src={baseURL}
                alt="Zoom-images"
                zoom="300"
                width="200"
                height="200"
                objectFit="contain"
                zIndex="0"
              /></>
)
}
export default ZoomImage;