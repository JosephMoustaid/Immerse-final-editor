import React, { useState, useRef, useContext } from 'react';
import TofferLights from "./TofferLights.jsx";
import StaticElements from "./StaticElements.jsx";
import maleAvatarModel from "../../assets/avatars/maleStudent.glb";

import wallTexture from "../../assets/textures/blueWall2.jpg";
import floorTexture from "../../assets/textures/floor6.jpg";
import ceilingTexture from "../../assets/textures/ceilingLamps.jpg";

//import useCameraCollider from "../../useCameraCollider.jsx";

function LabScene({ video, pdf, assets = [] }) {

  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const controlRef = useRef(null);

  // Initialize cameraRef properly
  const cameraRef = useRef(null);

  const handlePlayPause = () => {
    const videoElement = videoRef.current;
    const controlElement = controlRef.current;

    if (videoElement.paused) {
      videoElement.play();
      setIsPlaying(true);
      controlElement.setAttribute('src', '#pause');
    } else {
      videoElement.pause();
      setIsPlaying(false);
      controlElement.setAttribute('src', '#play');
    }
  };

  return (
    <>
      <a-scene physics="gravity: -9.8; friction: 1; restitution: 0">
        <a-assets>
          <img id="play" src="" alt="../../assets/icons/play.webp" />
          <img id="pause" src="" alt="../../assets/icons/pause.webp" />

          <img id="floorTexture" src={floorTexture} alt="Floor Texture" />
          <img id="wallTexture" src={wallTexture} alt="Wall Texture" />
          <img id="ceilingTexture" src={ceilingTexture} alt="Ceiling Texture" />
        </a-assets>

        {/* Ambient Lighting */}
        <a-entity light="type: ambient; intensity: 0.5" />

        {/* Directional Lighting */}
        <a-entity light="type: directional; intensity: 0.8" position="0 30 30" />

        {/* Camera with collider */}
        <a-camera
          position="25 10 25"
          rotation="0 -90 0"
          camera-collider
          ref={cameraRef} // Attach the ref here
        >
        </a-camera>

        {/* Camera with avatar model as a child */}
        <a-entity
          id="rig"
          height="10"
          position="12 8 12"
          rotation="0 -90 0"
          movement-controls
          physics-debug
        >
          <a-camera
            camera-collider
            look-controls="pointerLockEnabled: true"
            dynamic-body="mass: 5; linearDamping: 0.9; angularDamping: 0.9"
            collision="shape: box"
            wasd-controls="enabled: false"  // Disables wasd-controls 
            ref={cameraRef} // Attach the ref here as well
          >
            <a-gltf-model
              src={maleAvatarModel}
              position="0 -9 6"
              rotation="0 180 0"
              scale="5 5 5"
            />
            <a-cursor color="#FF0000"></a-cursor>
          </a-camera>
        </a-entity>

        <StaticElements />
        <TofferLights />

        {/* 
        <PdfViewer
          pdf={pdfUrl}
          scale={2.5}
          rotation="0 -90 0"
          position="34 5 19"
        />

        <VideoViewer
          videoPath={videoPath}
          position="39 11 -17"
          rotation="0 -90 0"
          scale="5 5 5"
        />

        <AssetViewer
          asset={arduino_uno}
          position="20 5 -5"
          rotation="0 -45 0"
          scale="3 3 3"
          cameraRef={cameraRef} // Pass the ref here
        />
        */}
        <a-entity physics-debug></a-entity>
      </a-scene>
    </>
  );
}

export default LabScene;
