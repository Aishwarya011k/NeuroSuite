import React from 'react';
import { FaBrain, FaUserMd, FaChartLine } from 'react-icons/fa';
import { Typewriter } from 'react-simple-typewriter';

const About = () => {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-blue-400">
            <Typewriter 
              words={["About NeuroSuite"]} 
              loop 
              cursor 
              cursorStyle="|" 
            />
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Empowering healthcare professionals with advanced neurological analysis tools
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800/40 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-bold text-blue-100 mb-4">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed">
              NeuroSuite aims to revolutionize neurological diagnostics by providing cutting-edge AI-powered tools for brain signal analysis and sleep study interpretation, making advanced neurological assessment more accessible and accurate.
            </p>
          </div>

          <div className="bg-gray-800/40 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-bold text-blue-100 mb-4">Why Choose Us</h2>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <FaBrain className="w-6 h-6 text-blue-400 mt-1" />
                <span>Advanced AI algorithms for precise neural signal analysis</span>
              </li>
              <li className="flex items-start gap-3">
                <FaUserMd className="w-6 h-6 text-blue-400 mt-1" />
                <span>Designed by neurologists for healthcare professionals</span>
              </li>
              <li className="flex items-start gap-3">
                <FaChartLine className="w-6 h-6 text-blue-400 mt-1" />
                <span>Real-time processing and comprehensive reporting</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-6 bg-gray-800/40 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
          <h2 className="text-2xl font-bold text-blue-100">Ready to Get Started?</h2>
          <p className="text-gray-400">
            Join healthcare professionals worldwide who trust NeuroSuite
          </p>
          <button 
            onClick={() => window.location.href = '/signup'}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;