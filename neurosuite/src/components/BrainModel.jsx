import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import SceneLighting from './SceneLighting';
import * as THREE from 'three';


const BrainModel = () => {
  const brain = useGLTF('/brain.glb');

  // Enhance materials for better lighting
  useEffect(() => {
    if (brain.scene) {
      brain.scene.traverse((child) => {
        if (child.isMesh) {
          // Increase material brightness
          child.material.metalness = 0.2;
          child.material.roughness = 0.3;
          child.material.envMapIntensity = 2;

          // Add emissive glow
          child.material.emissive = new THREE.Color('#304878');
          child.material.emissiveIntensity = 0.2;

          // Enable shadows
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [brain]);

  return (
    <>
      <SceneLighting />
      <primitive
        object={brain.scene}
        scale={2}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
      />
    </>
  );
};

export default BrainModel;