import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoHelp, IoCloseSharp } from 'react-icons/io5';
import { GrResources } from 'react-icons/gr';
import { FaRegFilePdf } from 'react-icons/fa';
import { CiVideoOn } from 'react-icons/ci';
import { TbArrowsMove } from 'react-icons/tb';

import { selectObject, modifyObjectWithKeys } from '../components/ObjectManipulation'; // Import functions


import PdfViewer from '../components/PDFViewer';
import VideoViewer from '../components/VideoViewer';
import ItLabScene from '../environments/Lab/LabScene';
import SchoolHallScene from '../environments/School/SchoolScene';

import Motherboard from '../assets/3D_Components/window.glb';
import Video from '../assets/videos/video.mp4';
import PDF from '../assets/pdf/Rapport.pdf';

import wallTexture from "./../assets/textures/blueWall2.jpg";
import floorTexture from "./../assets/textures/floor6.jpg";
import ceilingTexture from "./../assets/textures/ceilingLamps.jpg";
import woodTexture from "./../assets/textures/wood5.webp"
import Nav from "../components/Nav.jsx"
import LabScene from '../environments/Lab/LabScene';

import maleAvatarModel from "./../assets/avatars/maleStudent.glb";

const Editor = () => {
  const openSideNav = () => {
    document.getElementById("mySidenav").style.width = "300px";
  } 
  const closeSideNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  } 

  const navigate = useNavigate();
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  
  const [selectedObject, setSelectedObject] = useState(null);
  const [environment, setEnvironment] = useState('itLab');
  const [assets, setAssets] = useState([{ id: 'Motherboard', name: 'Motherboard', src: Motherboard, visible: false }]);
  const [pdf, setPdf] = useState({ id: 'PDF', name: 'Course PDF', visible: false });
  const [video, setVideo] = useState({ id: 'Video', name: 'Course Video', visible: false });
  const [showModel, setShowModel] = useState(true); // Add state to control the visibility of the model section

  useEffect(() => {
    const savedEnv = localStorage.getItem('selectedEnv') || 'itLab';
    setEnvironment(savedEnv);
  }, []);

  useEffect(() => {
    const sceneEl = sceneRef.current;

    const handleSelectObject = (evt) => {/* Your logic here */};
    const handleModifyObjectWithKeys = (event) => {/* Your logic here */};

    sceneEl?.addEventListener('click', handleSelectObject);
    window.addEventListener('keydown', handleModifyObjectWithKeys);

    return () => {
      sceneEl?.removeEventListener('click', handleSelectObject);
      window.removeEventListener('keydown', handleModifyObjectWithKeys);
    };
  }, [selectedObject]);

  const toggleVisibility = (index) => {
    setAssets((prevAssets) => {
      const newAssets = [...prevAssets];
      newAssets[index] = { ...newAssets[index], visible: !newAssets[index].visible };
      return newAssets;
    });
  };

  const togglePdfVisibility = () => setPdf(prev => ({ ...prev, visible: !prev.visible }));
  const toggleVideoVisibility = () => setVideo(prev => ({ ...prev, visible: !prev.visible }));
  const handleCloseModel = () => setShowModel(false); // Handler to close the model section
  const handleOpenModel = () => setShowModel(true); // Handler to close the model section

  return (
    <div className="App">
      {/* 3D Scene */}
      <a-scene ref={sceneRef} environment={`preset: ${environment}`}>
        <a-assets>
          {assets.map((asset) => (
            <a-asset-item key={asset.id} id={asset.id} src={asset.src}></a-asset-item>
          ))}
          <a-asset-item id="video" src={Video}></a-asset-item>
          <a-asset-item id="pdf" src={PDF}></a-asset-item>


          <img id="WoodTexture" src={woodTexture} />
          <img id="wallTexture" src={wallTexture} alt="Wall Texture" />
          <img id="ceilingTexture" src={ceilingTexture} alt="Ceiling Texture" />
        </a-assets>
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


        {video.visible && <VideoViewer position="0 0 -17" rotation="0 -90 0" scale="5 5 5" />}

        <a-box color="green" height="100" width="100" scale="5 5 5" ></a-box>
        <a-plane color="blue" width="100" height="100"></a-plane>

        { environment === 'itLab' && <ItLabScene cameraRef={cameraRef} videoVisible={video.visible} pdfVisible={pdf.visible} /> }
        { environment === 'universityHall' && <SchoolHallScene cameraRef={cameraRef} videoVisible={video.visible} pdfVisible={pdf.visible} />}
        

        
        {assets.map((asset) => asset.visible && (
          <a-gltf-model
            key={asset.id}
            class="selectable collidable"
            src={asset.src}
            position="0 0 -3"
            scale="1 1 1"
            rotation="0 0 0"
            material="color: #00FF00"
          ></a-gltf-model>
        ))}
        

        
        {pdf.visible && <PdfViewer pdf={PDF} scale={10} rotation="0 0 0" class="selectable" position="10 5 0" />}
        
        {showModel && (  // Conditionally render the model section based on the state
          <div id="model">
            <div id="info">
              <a id="close" onClick={handleCloseModel} role='button'><IoCloseSharp/></a>
              <h2 className="fw-bolder">Welcome to Immerse Editor!</h2>
              <h3 className="text-start fw-lighter ps-4"><u>Instructions:</u></h3>
              <ul>
                <li className="text-start">Use the keys WASD for movement</li>
                <li className="text-start">Scroll Up and Down for vertical movement</li>
                <li className="text-start">To select a model, move the cursor to the element and left-click with your mouse</li>
                <li className="text-start">Use the keyboard arrows <TbArrowsMove/> to control the model horizontal position and "Y", "C" to control vertical position</li>
                <li className="text-start">Use "+" and "-" to control the model scale</li>
                <li className="text-start">Use "A" and "E" to control the model rotation</li>
                <li className="text-start">You can control the position, scale, and rotation for all assets(video, PDF, and models)</li>
                <li className="text-start">Annotations: If you want to add an annotation to a 3D model:
                  <ol>
                    <li className="text-start">Click on "n" key</li>
                    <li className="text-start">Then you have to point the cursor on the annotation spot on the 3D model</li>
                    <li className="text-start">Mouse Right-click</li>
                    <li className="text-start">Enter the annotation details</li>
                  </ol>
                </li>
              </ul>
            </div>
          </div>
        )}
      </a-scene>

      {/* Side Navigation */}
      <div id="mySidenav" className="sidenav d-flex flex-column">
        <div className="p-1 flex-grow-1">
          <div className='d-flex justify-content-between align-items-center'>
            <h2 className="fs-4 m-0 fw-bolder">Editor Menu</h2>
            <div className="d-flex align-items-center"> 
              <a id="help" className="m-0 fs-2 text-decoration-none text-dark p-0" onClick={handleOpenModel}  role="button"><IoHelp /></a>
              <a id="closebtn" className='fs-2 m-0 p-0 text-dark' onClick={closeSideNav} role="button"><IoCloseSharp/></a>
            </div>
          </div>
          <hr />
          <h4 className='fs-5 fw-light text-start fw-bold'><GrResources/> Uploaded Assets</h4>
          <ul className="list-group">
            {assets.map((asset, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                {asset.name}
                <button 
                  className={`btn ${asset.visible ? 'btn-danger' : 'btn-dark'}`} 
                  onClick={() => toggleVisibility(index)}>
                  {asset.visible ? 'Hide' : 'Show'}
                </button>
              </li>
            ))}
          </ul>
          <hr />
          <h4 className='fs-5 fw-light text-start mt-4 fw-bold'><FaRegFilePdf /> PDF</h4>
          <button 
            className={`btn ${pdf.visible ? 'btn-danger' : 'btn-dark'} w-100`} 
            onClick={togglePdfVisibility}>
            {pdf.visible ? 'Hide PDF' : 'Show PDF'}
          </button>
          <hr />
          <h4 className='fs-5 fw-light text-start mt-4 fw-bold'><CiVideoOn/> Video</h4>
          <button 
            className={`btn ${video.visible ? 'btn-danger' : 'btn-dark'} w-100`} 
            onClick={toggleVideoVisibility}>
            {video.visible ? 'Hide video' : 'Show video'}
          </button>
        </div>

        <div className="p-3">
          <button id="downloadBtn" className="btn btn-primary w-100 fw-bold text-white">Save the course</button>
        </div>
      </div>
      <div className='fs-4 cursor-pointer p-3' onClick={openSideNav} role='button' id="openEditor">&#9776; Open Editor Menu</div>
    </div>
  );
};

export default Editor;
