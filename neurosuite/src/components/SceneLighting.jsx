import { useHelper } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

const SceneLighting = () => {
  const mainLightRef = useRef()

  return (
    <>
      {/* Bright ambient light */}
      <ambientLight intensity={1.2} color="#ffffff" />
      
      {/* Main key light */}
      <directionalLight
        ref={mainLightRef}
        position={[5, 8, 3]}
        intensity={2}
        color="#ffffff"
        castShadow
      />
      
      {/* Front fill light */}
      <pointLight
        position={[0, 2, 4]}
        intensity={1.5}
        color="#e6f0ff"
      />
      
      {/* Rim light for highlights */}
      <pointLight
        position={[-2, 3, -4]}
        intensity={1.2}
        color="#b3d9ff"
      />
    </>
  )
}

export default SceneLighting