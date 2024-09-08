import React, { useState, useEffect, useRef , useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";  // Import useNavigate from react-router-dom


const AnnotationsMaker = ({ modelUrl }) => {

  const location = useLocation();
  const pathname = location.pathname;
  
  // get the path where the adding annotations query came from
  const basePath = pathname.replace(/\/add-annotations$/, '');

  const [showModal, setShowModal] = useState(true);
  const [isAddingAnnotation, setIsAddingAnnotation] = useState(false);
  const sceneRef = useRef(null);
  const navigate = useNavigate();  // Initialize useNavigate

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [annotations, setAnnotations] = useState([]);
  useEffect(() => {
    if (!sceneRef.current) return;

    const sceneEl = sceneRef.current;
    const cursorEl = sceneEl.querySelector("a-cursor");
    const cameraEl = sceneEl.querySelector("a-camera");

    const handleAnnotationPlacement = (evt) => {
      if (!isAddingAnnotation) return; // Exit if not in annotation mode

      const intersectedEl = evt.detail.intersectedEl;
      if (intersectedEl) {
        const intersectedPoint = evt.detail.intersection.point;

        const annotationName = prompt("Enter annotation name:");
        const annotationDescription = prompt("Enter annotation description:");
        if (annotationName && annotationDescription) {
          const { x, y, z } = intersectedPoint;

          const newAnnotation = {
            id: annotations.length + 1,
            name: annotationName,
            description: annotationDescription,
            position: { x, y, z },
            rotation: calculateRotation({ x, y, z }, cameraEl.object3D.position),
          };

          setAnnotations((prevAnnotations) => [...prevAnnotations, newAnnotation]);
          console.log(newAnnotation);
        }
        setIsAddingAnnotation(false); // Exit annotation mode
      }
    };

    cursorEl.addEventListener("click", handleAnnotationPlacement);

    return () => {
      cursorEl.removeEventListener("click", handleAnnotationPlacement);
    };
  }, [isAddingAnnotation, annotations]);

  const calculateRotation = (annotationPosition, cameraPosition) => {
    const dx = cameraPosition.x - annotationPosition.x;
    const dz = cameraPosition.z - annotationPosition.z;
    const rotationY = Math.atan2(dx, dz) * (180 / Math.PI);
    return `0 ${rotationY} 0`;
  };

  const handleStartAddingAnnotation = () => {
    setIsAddingAnnotation(true);
    console.log("Annotation mode activated. Click on the model to add an annotation.");
  };

  const handleFinish = () => {
    // Navigate to /lab and pass annotations as state
    navigate(basePath);
  };
  let calculateCameraPosition = () => {
    let x = "0";
    let y = "0";
    let z = "0";
  
    try {
      if (typeof modelTransform.position === "string") {
        let positionArray = modelTransform.position.split(" ");
        x= positionArray[0];
        y= positionArray[1];
        z= positionArray[2];

        z=z+2.5;
      }
    } catch (error) {
      console.error("Error calculating camera position:", error);
    }
  
    return `${x} ${y} ${z}`;
  };
  
  
  let calculateFloorPosition = () => {
    let x = "0";
    let y = "0";
    let z = "0";
    
    // Split the position string once and store in an array
    let positionArray = modelTransform.position.split(" ");
    
    // Assign y correctly
    y = (Number(positionArray[1]) - 2).toString(); // Convert string to number, subtract 2, and convert back to string
  
    return `${x} ${y} ${z}`;
  };
  
  return (
    <div>
      <div style={{ position: "relative", width: "100%", height: "100vh" }}>
        <a-scene ref={sceneRef} embedded>
          {/* Camera with built-in controls */}
          <a-camera position={calculateCameraPosition()}>
            {/* Add cursor for interaction */}
            <a-cursor fuse="false" color="#FF0000" raycaster="objects: .clickable"></a-cursor>
          </a-camera>

          {/* Lighting for the scene */}
          <a-light type="ambient" color="#888"></a-light>
          <a-light
            type="directional"
            color="#fff"
            intensity="1"
            position="0 4 -4"
          ></a-light>

          {/* Walls */}
          <a-box
            height="20"
            width="100"
            depth="0.5"
            position="0 0 -50"
            color="#242424"
          ></a-box>
          <a-box
            height="20"
            width="100"
            depth="0.5"
            position="0 0 50"
            rotation="0 180 0"
            color="#242424"
          ></a-box>
          <a-box
            height="20"
            width="100"
            depth="0.5"
            position="50 0 0"
            rotation="0 90 0"
            color="#242424"
          ></a-box>
          <a-box
            height="20"
            width="100"
            depth="0.5"
            position="-50 0 0"
            rotation="0 -90 0"
            color="#242424"
          ></a-box>

          {/* Floor */}
          <a-plane
            position={calculateFloorPosition()}
            rotation="-90 0 0"
            width="100"
            height="100"
            color="#808080"
          ></a-plane>

          {/* Load 3D model dynamically */}
          {modelUrl && (
            <a-gltf-model
              src={modelUrl}
              scale={modelTransform.scale}
              position={modelTransform.position}
              rotation={modelTransform.rotation}
              class="clickable"
            ></a-gltf-model>
          )}

          {/* Annotations as A-Frame entities */}
          {annotations.map((annotation, index) => {
            const modelCenter = { x: 0, y: 0, z: 0 };

            const directionVector = {
              x: annotation.position.x - modelCenter.x,
              y: annotation.position.y - modelCenter.y,
              z: annotation.position.z - modelCenter.z,
            };

            const magnitude = Math.sqrt(
              directionVector.x ** 2 + directionVector.y ** 2 + directionVector.z ** 2
            );
            const unitVector = {
              x: directionVector.x / magnitude,
              y: directionVector.y / magnitude,
              z: directionVector.z / magnitude,
            };

            const lineEnd = {
              x: annotation.position.x + unitVector.x * 0.4,
              y: annotation.position.y + unitVector.y * 0.4,
              z: annotation.position.z + unitVector.z * 0.4,
            };

            return (
              <a-entity key={annotation.id}>
                <a-entity
                  line={`start: ${annotation.position.x} ${annotation.position.y} ${annotation.position.z}; 
                        end: ${lineEnd.x} ${lineEnd.y} ${lineEnd.z}; color: grey; opacity: 0.7`}
                  material="color: grey; opacity: 0.7"
                  lineWidth="5"
                ></a-entity>

                <a-entity
                  geometry="primitive: plane; width: 0.6; height: 0.3"
                  material="color: grey; transparent: true; opacity: 0.8"
                  position={`${lineEnd.x} ${lineEnd.y} ${lineEnd.z}`}
                  rotation={annotation.rotation}
                  class="annotation"
                  events={{ click: () => alert(`Annotation ${annotation.id} clicked!`) }}
                >
                  <a-text
                    value={`${index + 1}. ${annotation.name} :`}
                    color="white"
                    align="center"
                    width="1.1"
                    position="-0.2 0.1 0"
                    anchor="center"
                  ></a-text>

                  <a-text
                    value={annotation.description}
                    color="white"
                    align="center"
                    width="0.6"
                    position="-0.2 0.05 0"
                    anchor="center"
                  ></a-text>
                </a-entity>
              </a-entity>
            );
          })}
        </a-scene>

        {/* Button to start annotation process */}
        <button
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 10,
            padding: "8px 16px",
            color: "white",
            backgroundColor: "#00ed1c",
            border: "none",
            borderRadius: "5px",
            boxShadow: "0 .5rem 1rem rgba(0, 0, 0, 0.15)",
            fontWeight: "600",
            cursor: "pointer",
          }}
          onClick={handleStartAddingAnnotation}
        >
          Add Annotation
        </button>

        <button
          style={{
            position: "absolute",
            top: "50px",
            right: "10px",
            zIndex: 10,
            padding: "8px 16px",
            color: "white",
            backgroundColor: "#ffc42e",
            border: "none",
            borderRadius: "5px",
            boxShadow: "0 .5rem 1rem rgba(0, 0, 0, 0.15)",
            fontWeight: "600",
            cursor: "pointer",
          }}
          onClick={handleFinish}
        >
          Finish
        </button>
      </div>
    </div>
  );
};

export default AnnotationsMaker;
