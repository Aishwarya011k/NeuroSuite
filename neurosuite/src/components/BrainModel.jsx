import React from 'react';
import { useGLTF } from '@react-three/drei';

const BrainModel = () => {
  // You'll need to add your 3D brain model file
  const brain = useGLTF('/brain.glb');

  return (
    <primitive
      object={brain.scene}
      scale={2}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
    />
  );
};

export default BrainModel;