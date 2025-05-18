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
            Empowering developers and researchers with powerful tools for neural signal processing
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800/40 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-bold text-blue-100 mb-4">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed">
              NeuroSuite aims to accelerate BCI research and development by providing open-source tools 
              for EEG signal processing, visualization, and analysis. We're building a community-driven 
              platform for neural decoding innovation.
            </p>
          </div>

          <div className="bg-gray-800/40 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-bold text-blue-100 mb-4">Why Choose Us</h2>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <FaBrain className="w-6 h-6 text-blue-400 mt-1" />
                <span>Ready-to-use ML models for EEG signal processing</span>
              </li>
              <li className="flex items-start gap-3">
                <FaUserMd className="w-6 h-6 text-blue-400 mt-1" />
                <span>Built by researchers for researchers</span>
              </li>
              <li className="flex items-start gap-3">
                <FaChartLine className="w-6 h-6 text-blue-400 mt-1" />
                <span>Comprehensive API and visualization tools</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-6 bg-gray-800/40 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
          <h2 className="text-2xl font-bold text-blue-100">Start Building Today</h2>
          <p className="text-gray-400">
            Join our community of developers and researchers working on neural signal processing
          </p>
          <div className="space-y-4">
            <button 
              onClick={() => window.location.href = '/signup'}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Create Developer Account
            </button>
            <div className="text-gray-400">
              Already have an account?{' '}
              <a 
                href="/login" 
                className="text-blue-400 hover:text-blue-300 transition"
              >
                Log in here
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;