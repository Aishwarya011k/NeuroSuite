import React from 'react';
import { FaBrain, FaChartLine, FaLaptopMedical } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';
import { useAuth } from '../context/AuthContext';

const FeatureCard = ({ icon, title, description, link, requiresAuth, user }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      onClick={() => {
        if (requiresAuth && !user) {
          navigate('/login', { state: { from: link } });
          return;
        }
        navigate(link);
      }}
      className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl border border-gray-700 
                 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl 
                 hover:shadow-blue-500/10 cursor-pointer"
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-3 bg-blue-500/10 rounded-lg">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-blue-100">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
      {requiresAuth && !user && (
        <div className="mt-4 text-sm text-blue-400">
          Login required to access this feature
        </div>
      )}
    </div>
  );
};

const Features = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: <FaBrain className="w-8 h-8 text-blue-400" />,
      title: "Visualize your mind in a Click",
      description: "Advanced EEG signal processing with real-time monitoring and analysis of brain wave patterns for accurate neurological assessment.",
      link: "/eeg-decoder",
      requiresAuth: true  // Added requiresAuth
    },
    {
      icon: <FaChartLine className="w-8 h-8 text-blue-400" />,
      title: "Sleep Stage Detector",
      description: "Interactive visualization tools for EEG data with customizable displays and comprehensive reporting capabilities.",
      link: "/sleep-detector",
      requiresAuth: true  // Added requiresAuth
    },
    {
      icon: <FaLaptopMedical className="w-8 h-8 text-blue-400" />,
      title: "Emotion Recognition",
      description: "Detect and analyze emotional states through EEG patterns using advanced neural networks",
      link: "/emotion-recognizer",
      requiresAuth: true
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold text-blue-400">
            <Typewriter words={["Features of NeuroSuite"]} loop cursor cursorStyle="|" />
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover powerful tools for neurological analysis and research with our comprehensive suite of features designed for medical professionals.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} user={user} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;