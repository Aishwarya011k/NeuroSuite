import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import BrainModel from './BrainModel';
import { Typewriter } from 'react-simple-typewriter';
const Hero = () => {
  return (
    <section className="min-h-[calc(100vh-4rem)] w-full flex flex-col lg:flex-row items-center justify-between px-4 py-8 lg:py-0">
      {/* Text Content (40%) */}
      <div className="w-full lg:w-[40%] space-y-6 text-left z-10">
        <h1 className="font-poppins text-3xl md:text-4xl lg:text-5xl font-bold text-gray-100 leading-tight">
          Introducing!, <span className="text-4xl md:text-5xl lg:text-6xl text-blue-400"><Typewriter words={["NeuroSuite"]} loop cursor cursorStyle="|" /></span>
        </h1>
        <p className="font-poppins text-lg text-gray-300 leading-relaxed max-w-xl">
          Advanced AI-powered solutions for neurological diagnostics and treatment planning. Experience the future of healthcare with NeuroSuite's cutting-edge technology.
        </p>
        <div className="flex gap-4 pt-4">
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
            Get Started
          </button>
          <button className="px-6 py-3 border border-gray-600 text-gray-200 font-semibold rounded-lg hover:bg-gray-800 transition">
            Learn More
          </button>
        </div>
      </div>

      {/* 3D Brain Model (60%) */}
       <div className="w-full lg:w-[60%] h-[400px] lg:h-[600px] relative">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <BrainModel />
          <OrbitControls enableZoom={false} autoRotate />
        </Canvas>
      </div> 
    </section>
  );
};

export default Hero;




  