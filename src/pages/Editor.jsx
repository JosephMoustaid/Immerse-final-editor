import { GrResources } from "react-icons/gr";
import { FaRegFilePdf } from "react-icons/fa";
import { IoHelp } from "react-icons/io5";
import { TbArrowsMove } from "react-icons/tb";
import { CiMenuBurger } from "react-icons/ci";
import { CiVideoOn } from "react-icons/ci";
import Motherboard from '../assets/3d_Models/window.glb';
import { useEffect, useRef, useState } from 'react';
import { selectObject, modifyObjectWithKeys } from '../components/ObjectManipulation'; // Import functions
import PdfViewer from "../components/PDFViewer";
import VideoViewer from "../components/VideoViewer";
import Video from '../assets/videos/video.mp4';
import PDF from '../assets/pdf/Rapport.pdf';
import { IoCloseSharp } from "react-icons/io5";
import  {buildWall}   from "../components/WallBuilder";
const elephant = process.env.PUBLIC_URL + '/assets/3d_Models/elephant/scene.gltf';

function Editor() {
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [environment, setEnvironment] = useState('default'); // Default environment

  const [assets, setAssets] = useState([
    { id: 'Motherboard', name: 'Motherboard', src: Motherboard, visible: false },
    { id: 'Elephant', name: 'Elephant', src: elephant, visible: false }
  ]);

  // Separate PDF state for managing its visibility
  const [pdf, setPdf] = useState({ id: 'PDF', name: 'Course PDF', visible: false });
  const [video, setVideo] = useState({ id: 'Video', name: 'Course Video', visible: false });

  const toggleVideoVisibility = () => {
    setVideo((prevVideo) => ({ ...prevVideo, visible: !prevVideo.visible }));
  };
  
  useEffect(() => {
    const sceneEl = sceneRef.current;
    
    const handleSelectObject = (evt) => selectObject(evt, setSelectedObject, cameraRef);
    const handleModifyObjectWithKeys = (event) => modifyObjectWithKeys(event, selectedObject, setSelectedObject, cameraRef);

    sceneEl.addEventListener('click', handleSelectObject);
    window.addEventListener('keydown', handleModifyObjectWithKeys);

    return () => {
      sceneEl.removeEventListener('click', handleSelectObject);
      window.removeEventListener('keydown', handleModifyObjectWithKeys);
    };
  }, [selectedObject]);
  
  useEffect(() => {
    // Fetch the environment from localStorage
    const savedEnv = localStorage.getItem('selectedEnv') || 'forest';
    setEnvironment(savedEnv);
  }, []);

  // Function to toggle the visibility of an asset
  const toggleVisibility = (index) => {
    setAssets((prevAssets) => {
      const newAssets = [...prevAssets];
      newAssets[index] = { ...newAssets[index], visible: !newAssets[index].visible };
      return newAssets;
    });
  };

  // Function to toggle PDF visibility
  const togglePdfVisibility = () => {
    setPdf((prevPdf) => ({ ...prevPdf, visible: !prevPdf.visible }));
  };

  useEffect(() => {
    const menuUI = document.getElementById('openEditor');
    const closeUI = document.getElementById('closebtn');
    const model = document.querySelector("#model");
    const openModel = document.querySelector("#help");

    if (menuUI && closeUI && model ) {
      menuUI.addEventListener('mousedown', openNav);
      closeUI.addEventListener('mousedown', closeNav);
      model.addEventListener("click", () => {
        model.classList.add("hide");
      });
      openModel.addEventListener("click", () => {
        model.classList.remove("hide");
      });
    }

    return () => {
      if (menuUI && closeUI) {
        menuUI.removeEventListener('mousedown', openNav);
        closeUI.removeEventListener('mousedown', closeNav);
      }
    };
  }, []);

  const openNav = () => {
    document.getElementById("mySidenav").style.width = "400px";
  };

  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  };
  

  return (
    <div className="App">
      <a-scene ref={sceneRef} environment={`preset: ${environment}`}>
        <a-assets>
          {assets.map((asset) => (
            <a-asset-item key={asset.id} id={asset.id} src={asset.src}></a-asset-item>
          ))}
          <a-asset-item id="video" src={Video}></a-asset-item>
        </a-assets>

        <a-light id="dirlight" intensity="1" light="castShadow:true;type:directional" position="1 1 1"></a-light>

        {video.visible && (
            <VideoViewer 
              position="39 11 -17" 
              rotation="0 -90 0" 
              scale="5 5 5" 
            />
          )}

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

        <a-entity light="type: directional; intensity: 1" position="-1 2 1"></a-entity>

        {/* Conditionally render the assets based on their visibility */}
        {assets.map((asset, index) => (
          asset.visible && (
            <a-gltf-model
              key={asset.id}
              class="selectable collidable"
              src={asset.src}
              position="0 0 -3"
              scale="1 1 1"
              rotation="0 0 0"
              material="color: #00FF00"
            ></a-gltf-model>
          )
        ))}

        {/* Conditionally render the PDF based on its visibility */}
        {pdf.visible && (
          <PdfViewer pdf={PDF} scale={1} rotation="0 0 0" class="selectable" position="10 5 0" />
        )}
        <div id="model">
          <div id="info">
            <a id="close"><IoCloseSharp/></a>
            <h2 className="fw-bolder">Welcome to Immerse Editor!</h2>
            <h3 className="text-start fw-lighter ps-4" ><u>Instructions:</u></h3>
            <ul>
              <li className="text-start">Use the keys  WQSD for movement</li>
              <li className="text-start">Scroll Up and Down for vertical movement</li>
              <li className="text-start">To select a model , move the cursor to the element and left click with ur mouse</li>
              <li className="text-start">Use the keyboard arrows <TbArrowsMove/> to control the  model  horizontal position and "Y" , "C" to control vertical position</li>
              <li className="text-start">Use "+" and "-" to control the model scale</li>
              <li className="text-start">Use "A" and "E" to control the model rotation</li>
              <li className="text-start">You can control the position , scale and rotation for all assets(video , PDF and models)</li>
            </ul>
          </div>
        </div>
      </a-scene>

      <div id="mySidenav" className="sidenav d-flex flex-column">
        <div className="p-1 flex-grow-1">
          
          <div className='d-flex justify-content-between align-items-center'>
            <h2 className="fs-4 m-0 fw-bolder">Editor Menu</h2>
            <div className="d-flex align-items-center">
              <a id="help" className="m-0 fs-2 text-decoration-none text-dark  p-0"><IoHelp /></a>
              <a id="closebtn" className='fs-2 m-0 p-0 text-dark'><IoCloseSharp/></a>
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
          <h4 className='fs-5 fw-light text-start mt-4 fw-bold'> <FaRegFilePdf /> PDF</h4>
          <button 
            className={`btn ${pdf.visible ? 'btn-danger' : 'btn-dark'} w-100`} 
            onClick={togglePdfVisibility}>
            {pdf.visible ? 'Hide PDF' : 'Show PDF'}
          </button>
          <hr />
          <h4 className='fs-5 fw-light text-start mt-4 fw-bold'> <CiVideoOn/> Video</h4>
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

      <div className='fs-4 cursor-pointer p-3' id="openEditor">&#9776; Open Editor Menu</div>
    </div>
  );
}

export default Editor;
