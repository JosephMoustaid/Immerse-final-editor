import React, { useState, useEffect } from "react";

import AnnotationBg from "../assets/images/annotationBg.png"
const AssetViewerAnnotationsMaker = ({ assetRef, assetScale }) => {
  const [isAddingAnnotation, setIsAddingAnnotation] = useState(false);
  const [annotations, setAnnotations] = useState([]);

  useEffect(() => {
    if (!assetRef.current) return;

    const cursorEl = document.querySelector("a-cursor");
    const cameraEl = document.querySelector("a-camera");

    const handleAnnotationPlacement = (evt) => {
      if (!isAddingAnnotation) return;

      const intersectedEl = evt.detail.intersectedEl;
      if (intersectedEl === assetRef.current) {
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

          console.log("New annotation added at:", { x, y, z }); // Debugging the position

          setAnnotations((prevAnnotations) => [...prevAnnotations, newAnnotation]);
        }
        setIsAddingAnnotation(false);
      }
    };

    cursorEl.addEventListener("click", handleAnnotationPlacement);

    return () => {
      cursorEl.removeEventListener("click", handleAnnotationPlacement);
    };
  }, [isAddingAnnotation, annotations, assetRef]);

  const calculateRotation = (annotationPosition, cameraPosition) => {
    const dx = cameraPosition.x - annotationPosition.x;
    const dz = cameraPosition.z - annotationPosition.z;
    const rotationY = Math.atan2(dx, dz) * (180 / Math.PI);
    return `0 ${rotationY} 0`;
  };

  const randomizeAnnotationPlacement = (position) => {
    const randomOffset = () => (Math.random() - 0.5) * 0.2; // Random offset between -0.1 and 0.1
    return {
      x: position.x + randomOffset(),
      y: position.y + randomOffset(),
      z: position.z + randomOffset(),
    };
  };

  const randomizeRotation = () => {
    return `0 ${Math.random() * 360} 0`; // Random Y-axis rotation between 0 and 360 degrees
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'n' || event.key === 'N') {
        setIsAddingAnnotation(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <a-entity>
      {/* Annotations Rendering */}
      {annotations.map((annotation, index) => {
        const modelCenter = { x: 0, y: 0, z: 0 };
        const directionVector = {
          x: annotation.position.x - modelCenter.x,
          y: annotation.position.y - modelCenter.y,
          z: annotation.position.z - modelCenter.z,
        };
        const magnitude = Math.sqrt(
          directionVector.x ** 2 +
          directionVector.y ** 2 +
          directionVector.z ** 2
        );
        const unitVector = {
          x: directionVector.x / magnitude,
          y: directionVector.y / magnitude,
          z: directionVector.z / magnitude,
        };
        const lineEnd = randomizeAnnotationPlacement({
          x: annotation.position.x + unitVector.x * 0.8,
          y: annotation.position.y + unitVector.y * 0.8,
          z: annotation.position.z + unitVector.z * 0.8,
        });

        console.log("Rendering annotation at position:", annotation.position); // Debugging annotation rendering

        return (
          <a-entity key={annotation.id}>
            {/* Line from model to annotation */}
            <a-entity
              line={`start: ${annotation.position.x} ${annotation.position.y} ${annotation.position.z}; 
                    end: ${lineEnd.x} ${lineEnd.y} ${lineEnd.z}; color: green; opacity: 0.7`}
              material="color: green; opacity: 0.7"
            ></a-entity>

            {/* Annotation box */}
            <a-entity
                geometry="primitive: plane; width: .9; height: .5"
                material={`src: url(${AnnotationBg}); transparent: true; opacity: 0.8`}
                position={`${lineEnd.x} ${lineEnd.y} ${lineEnd.z}`}
                rotation={randomizeRotation()} // Apply random rotation
                class="annotation"
                scale={assetScale}
            >

                a-
              {/* Annotation Text */}
              <a-text
                value={`${index + 1}. ${annotation.name}:`}
                color="white"
                align="center"
                width=".9" // Increased text width
                position="-0.3 0.2 0"
                scale={assetScale}
              ></a-text>

              <a-text
                value={annotation.description}
                color="white"
                align="center"
                width=".6" // Increased text width
                position="-0.3 0.1 0"
                scale={assetScale}
              ></a-text>
            </a-entity>
          </a-entity>
        );
      })}
    </a-entity>
  );
};

export default AssetViewerAnnotationsMaker;
