import React, { useRef, useState, useEffect } from "react";


import AssetViewerAnnotationMaker from "./AssetViewerAnnotationMaker";
function AssetViewer({
  asset,
  position = "0 0 0",
  rotation = "0 0 0",
  scale = "1 1 1",
  modelPosition = "0 0 0",
  cameraRef
}) {
  const [pos, setPos] = useState(position.split(" ").map(Number));
  const [rot, setRot] = useState(rotation.split(" ").map(Number));
  const [scl, setScl] = useState(scale.split(" ").map(Number));
  const [controlsEnabled, setControlsEnabled] = useState(true);
  const assetRef = useRef(null);

  useEffect(() => {
    if (modelPosition !== "0 0 0") {
      setPos(modelPosition.split(" ").map(Number));
    }
  }, [modelPosition]);

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.setAttribute("wasd-controls", `enabled: ${controlsEnabled}`);
    }
  }, [controlsEnabled, cameraRef]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (!controlsEnabled) {
        switch (event.key) {
          case "ArrowUp":
            updatePosition(1, 0.1); // Move up
            break;
          case "ArrowDown":
            updatePosition(1, -0.1); // Move down
            break;
          case "ArrowLeft":
            updatePosition(0, -0.1); // Move left
            break;
          case "ArrowRight":
            updatePosition(0, 0.1); // Move right
            break;
          case "a":
            updateRotation(1, 5); // Rotate around Y-axis
            break;
          case "d":
            updateRotation(1, -5); // Rotate around Y-axis
            break;
          case "w":
            updateRotation(0, 5); // Rotate around X-axis
            break;
          case "s":
            updateRotation(0, -5); // Rotate around X-axis
            break;
          case "+":
            updateScale(0.1); // Increase scale
            break;
          case "-":
            updateScale(-0.1); // Decrease scale
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [controlsEnabled, pos, rot, scl]);

  const updatePosition = (axis, delta) => {
    const newPos = [...pos];
    newPos[axis] += delta;
    setPos(newPos);
    if (assetRef.current) {
      assetRef.current.setAttribute("position", newPos.join(" "));
    }
  };

  const updateRotation = (axis, delta) => {
    const newRot = [...rot];
    newRot[axis] += delta;
    setRot(newRot);
    if (assetRef.current) {
      assetRef.current.setAttribute("rotation", newRot.join(" "));
    }
  };

  const updateScale = (delta) => {
    const newScaleValue = Math.max(scl[0] + delta, 0.1); // Ensuring scale doesn't go below 0.1
    const newScale = [newScaleValue, newScaleValue, newScaleValue];
    setScl(newScale);
    if (assetRef.current) {
      assetRef.current.setAttribute("scale", newScale.join(" "));
    }
  };

  useEffect(() => {
    const assetEl = assetRef.current;

    const disableCameraControls = () => {
      setControlsEnabled(false);
    };

    const enableCameraControls = () => {
      setControlsEnabled(true);
    };

    if (assetEl) {
      assetEl.addEventListener("mouseenter", disableCameraControls);
      assetEl.addEventListener("mouseleave", enableCameraControls);
    }

    return () => {
      if (assetEl) {
        assetEl.removeEventListener("mouseenter", disableCameraControls);
        assetEl.removeEventListener("mouseleave", enableCameraControls);
      }
    };
  }, [cameraRef]);

  return (
    <>
      <a-entity
        ref={assetRef}
        gltf-model={`url(${asset})`}
        position={pos.join(" ")}
        rotation={rot.join(" ")}
        scale={scl.join(" ")}
      ></a-entity>


      <AssetViewerAnnotationMaker assetRef={assetRef} scale={scl.join(" ")}/>
    </>
  );
}

export default AssetViewer;
