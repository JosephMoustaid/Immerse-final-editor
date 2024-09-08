import React, { useState, useRef } from 'react';
import TofferLights from "./TofferLights.jsx";
import StaticElements from "./StaticElements.jsx";

import AssetViewer from '../environmentViewers/AssetViewer.jsx';
import arduino from "../../assets/3D_Components/arduino_uno.glb";

import maleAvatarModel from "../../assets/avatars/maleStudent.glb";

import wallTexture from "../../assets/textures/blueWall2.jpg";
import floorTexture from "../../assets/textures/floor6.jpg";
import ceilingTexture from "../../assets/textures/ceilingLamps.jpg";

import CustomLookControls from "../../components/CustomLookControls.jsx";

import PdfViewer from '../../Viewers/PdfViewer.jsx';
import VideoViewer from '../../Viewers/VideoViewer.jsx';

import pdfDefault from "../../assets/pdf/Rapport.pdf";
import videoDefault from "../../assets/videos/video.mp4";


import { selectObject, modifyObjectWithKeys } from '../../components/ObjectManipulation.jsx'; 

function LabScene({ video=videoDefault, pdf=pdfDefault, assets = [] , cameraRef , videoVisible=false , pdfVisible=false }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlayPause = () => {
    const videoElement = videoRef.current;
    if (videoElement.paused) {
      videoElement.play();
      setIsPlaying(true);
    } else {
      videoElement.pause();
      setIsPlaying(false);
    }
  };

  return (
    <a-scene>

      
        {/* Lighting */}
        <a-entity light="type: ambient; intensity: 0.5" />
        <a-entity light="type: directional; intensity: 0.8" position="0 30 30" />


        {/* Camera */}
        <a-entity
          id="camera"
          camera
          look-controls
          my-custom-look-controls
          camera-collider="speed: 0.2; radius: 0.5"
          ref={cameraRef}
          rotation="0 0 0"
          position="0 3 0"
        >
          <a-cursor></a-cursor>
        </a-entity>

        <StaticElements />
        <TofferLights />


        <AssetViewer
          asset={arduino}
          position="20 5 -5"
          rotation="0 -45 0"
          scale="3 3 3"
          cameraRef={cameraRef} // Pass the ref here
        />

        { pdfVisible && (
          <PdfViewer 
            pdf={pdf}
            scale={2.5}
            rotation="0 -90 0"
            position="34 5 19"
          />
        )}
        
        {videoVisible && (
          <VideoViewer
            videoPath={video}
            position="39 11 -17"
            rotation="0 -90 0"
            scale="5 5 5"/>
        )
        }
        
    </a-scene>
  );
}

export default LabScene;