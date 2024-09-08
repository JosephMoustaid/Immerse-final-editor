import React from "react";

import wallTexture from "../../assets/textures/blueWall2.jpg";
import floorTexture from "../../assets/textures/floor6.jpg";
import ceilingTexture from "../../assets/textures/ceilingLamps.jpg";

import DeskEntity from '../../EnvironmentComponents/DeskEntity.jsx';
import SharedDesk from '../../EnvironmentComponents/SharedDesk.jsx';
import DoubleDoor from "../../assets/3D_Components/double_door_692.glb";
import WindowBlind from "../../assets/3D_Components/not_see_through_window.glb";
import teacherDesk from "../../assets/3D_Components/teacher_desk.glb";
import ProjectorScreen from "../../assets/3D_Components/projector_screen.glb"; 
import Projector from "../../assets/3D_Components/projector.glb"; 
import deskShelf from "../../assets/3D_Components/ikea_fjallbo_wall_shelf.glb";
import AC from "../../assets/3D_Components/conditioner_slide_dc.glb";
import pcCharger from "../../assets/3D_Components/low_poly_pc_cable.glb";
import cableWiring from "../../assets/3D_Components/factory_parts.glb";
import securityCamera from "../../assets/3D_Components/security_camera.glb";
import arduinoProject1 from "../../assets/3D_Components/arduinoProject1.glb";
import motor1 from "../../assets/3D_Components/motor1.glb";
import calendar from "../../assets/3D_Components/calendar_wall.glb";

function StaticElements(){
    return (
        <>

            {/* Floor */}
            <a-plane 
                rotation="-90 0 0" 
                width="80" 
                height="80" 
                material={`src: url(${floorTexture}); repeat: 6 6`}  
                src={floorTexture}
                static-body
            />

            {/* Walls */}
            <a-box 
                position="0 10 -40" 
                rotation="0 0 0" 
                width="80" 
                height="20" 
                depth="0.1" 
                material={`src: url(${wallTexture}); repeat: 4 2`}  
                src={wallTexture}
                static-body
            />

            <a-box 
                position="40 10 0" 
                rotation="0 -90 0" 
                width="80" 
                height="20" 
                depth="0.1" 
                material={`src: url(${wallTexture}); repeat: 4 2`}  
                src={wallTexture}
                repeat="4 2"
                static-body
            />

            <a-box 
                position="-40 10 0" 
                rotation="0 90 0" 
                width="80" 
                height="20" 
                depth="0.1" 
                material={`src: url(${wallTexture}); repeat: 4 2`}  
                src={wallTexture}
                static-body
            />

            <a-box 
                position="0 10 40" 
                rotation="0 180 0" 
                width="80" 
                height="20" 
                depth="0.1" 
                material={`src: url(${wallTexture});repeat: 4 2`}  
                src={wallTexture}
                static-body
            />

            {/* Ceiling */}
            <a-plane 
                position="0 20 0" 
                rotation="90 0 0" 
                width="80" 
                height="80" 
                material={`src: url(${ceilingTexture}); repeat: 2 3`}  
                src={ceilingTexture}
                static-body
            />

            {/* Other static elements */}
            <a-gltf-model 
                src={teacherDesk} 
                position="-30 1.9 0" 
                scale=".09 .09 .09"
                rotation="0 180 0"
            ></a-gltf-model>

            <a-entity>
                <DeskEntity position="-24 0 -36" rotation="0 0 0"/>
                <DeskEntity position="-12 0 -36" rotation="0 0 0"/>
                <DeskEntity position="0 0 -36" rotation="0 0 0"/>
                <DeskEntity position="12 0 -36" rotation="0 0 0"/>
                <DeskEntity position="24 0 -36" rotation="0 0 0"/>
            </a-entity>

            <a-gltf-model 
                src={DoubleDoor} 
                position="-40 0 25" 
                scale=".07 .07 .07"
                rotation="0 -90 0"
            ></a-gltf-model>

            <a-gltf-model 
                src={calendar} 
                position="-39.5 10 10" 
                scale="1.5 1.5 1.5"
                rotation="0 90 0"
            ></a-gltf-model>

            <a-entity>
                <a-gltf-model 
                    src={WindowBlind} 
                    position="-18 8 39.7" 
                    scale="2 2 2"
                    rotation="0 0 0"
                ></a-gltf-model>
                <a-gltf-model 
                    src={WindowBlind} 
                    position="0 8 39.7" 
                    scale="2 2 2"
                    rotation="0 0 0"
                ></a-gltf-model>
                <a-gltf-model 
                    src={WindowBlind} 
                    position="18 8 39.7" 
                    scale="2 2 2"
                    rotation="0 0 0"
                ></a-gltf-model>
            </a-entity>

            <a-gltf-model 
                src={ProjectorScreen} 
                position="39.4 15 -17" 
                scale="2 4 4"
                rotation="0 0 0"
            ></a-gltf-model>

            <a-gltf-model 
                src={Projector} 
                position="30 18 -17" 
                scale="5 5 5"
                rotation="0 90 0"
            ></a-gltf-model>

            <a-entity>
                <a-gltf-model  
                    src={AC}
                    position="39 18 5"
                    scale="13 9 9"
                    rotation="0 -90 0"
                ></a-gltf-model>
                <a-gltf-model  
                    src={AC}
                    position="-39 18 0"
                    scale="13 9 9"
                    rotation="0 90 0"
                ></a-gltf-model>
            </a-entity>

            <a-gltf-model  
                src={pcCharger}
                position="37.1 0 3"
                scale="2 2 2"
                rotation="0 180 0"
            ></a-gltf-model>

            <a-gltf-model  
                src={cableWiring}
                position="-30 7 -12"
                scale=".4 .65 .4"
                rotation="0 135 0"
            ></a-gltf-model>

            <a-entity>
                <a-gltf-model  
                    src={securityCamera}
                    position="-39 20 -39"
                    scale=".5 .5 .5"
                    rotation="180 -120 0"
                ></a-gltf-model>
                <a-gltf-model  
                    src={securityCamera}
                    position="39 20 39"
                    scale=".5 .5 .5"
                    rotation="180 50 0"
                ></a-gltf-model>
            </a-entity>

            <a-entity>
                <a-gltf-model 
                    src={deskShelf} 
                    position="34.5 5 -38.7" 
                    scale="13 13 8"
                    rotation="0 -90 0"
                ></a-gltf-model>
                <a-gltf-model 
                    src={arduinoProject1} 
                    position="33 6.5 -38" 
                    scale=".5 .5 .5"
                    rotation="0 0 0"
                    grabbable
                ></a-gltf-model>
                <a-gltf-model 
                    src={motor1} 
                    position="35 9.4 -38.5" 
                    scale="6 6 6"
                    rotation="0 90 0"
                ></a-gltf-model>
            </a-entity>
            
            <SharedDesk position='0 0 0' rotation='0 0 0'/>
            <SharedDesk position='0 0 -20' rotation='0 0 0'/>
        </>
    );
}

export default StaticElements;
