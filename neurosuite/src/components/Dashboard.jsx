import React, { useState, useEffect } from 'react';
import { FaBrain, FaBed, FaChartLine, FaUserMd, FaFileDownload, FaClock, FaLaptopMedical } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';

const StatCard = ({ icon, title, value, change }) => (
  <div className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <h3 className="text-2xl font-bold text-blue-100 mt-1">{value}</h3>
        {change && (
          <p className={`text-sm mt-2 ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {change > 0 ? '+' : ''}{change}% from last month
          </p>
        )}
      </div>
      <div className="p-3 bg-blue-500/10 rounded-lg">
        {icon}
      </div>
    </div>
  </div>
);

const RecentActivity = ({ date, action, status }) => (
  <div className="flex items-center gap-4 p-4 hover:bg-gray-800/30 rounded-lg transition-all">
    <div className="p-2 bg-blue-500/10 rounded-lg">
      <FaClock className="w-5 h-5 text-blue-400" />
    </div>
    <div className="flex-1">
      <p className="text-gray-300">{action}</p>
      <p className="text-sm text-gray-500">{date}</p>
    </div>
    <span className={`px-3 py-1 rounded-full text-sm ${
      status === 'Completed' ? 'bg-green-500/20 text-green-400' :
      status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-400' :
      'bg-red-500/20 text-red-400'
    }`}>
      {status}
    </span>
  </div>
);

const FeatureCard = ({ icon, title, description, link, comingSoon }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      onClick={() => !comingSoon && navigate(link)}
      className={`bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl border border-gray-700 
                  transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10
                  ${!comingSoon && 'hover:border-blue-500/50 cursor-pointer'}`}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-4 bg-blue-500/10 rounded-lg">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-blue-100">{title}</h3>
        <p className="text-gray-400">{description}</p>
        {comingSoon && (
          <span className="inline-block px-3 py-1 text-sm bg-blue-500/20 text-blue-300 rounded-full">
            Coming Soon
          </span>
        )}
      </div>
    </div>
  );
};

const RecentFeatureCard = ({ date, feature, status }) => (
  <div className="bg-gray-800/40 backdrop-blur-sm p-4 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-all">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-500/10 rounded-lg">
          {feature === 'Mind Decoder' && <FaBrain className="w-5 h-5 text-blue-400" />}
          {feature === 'Sleep Analysis' && <FaBed className="w-5 h-5 text-blue-400" />}
          {feature === 'View Reports' && <FaChartLine className="w-5 h-5 text-blue-400" />}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-blue-100">{feature}</h3>
          <p className="text-xs text-gray-400">{date}</p>
        </div>
      </div>
      <span className={`px-3 py-1 rounded-full text-xs ${
        status === 'Completed' ? 'bg-green-500/20 text-green-400' :
        'bg-yellow-500/20 text-yellow-400'
      }`}>
        {status}
      </span>
    </div>
  </div>
);

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const stats = [
    { icon: <FaBrain className="w-6 h-6 text-blue-400" />, title: 'Total Analyses', value: '156', change: 12.5 },
    { icon: <FaBed className="w-6 h-6 text-blue-400" />, title: 'Sleep Studies', value: '89', change: 8.2 },
    { icon: <FaChartLine className="w-6 h-6 text-blue-400" />, title: 'EEG Recordings', value: '67', change: -2.3 },
    { icon: <FaUserMd className="w-6 h-6 text-blue-400" />, title: 'Patients', value: '34', change: 15.7 }
  ];

  const recentActivities = [
    { date: '2 hours ago', action: 'Sleep Stage Analysis', status: 'Completed' },
    { date: '5 hours ago', action: 'EEG Mind Decoding', status: 'In Progress' },
    { date: 'Yesterday', action: 'Patient Report Generated', status: 'Completed' },
    { date: '2 days ago', action: 'New Patient Added', status: 'Completed' }
  ];

  const features = [
    {
      icon: <FaBrain className="w-8 h-8 text-blue-400" />,
      title: "Mind Decoder",
      description: "Visualize and decode brain activity patterns from EEG signals in real-time",
      link: "/eeg-decoder"
    },
    {
      icon: <FaBed className="w-8 h-8 text-blue-400" />,
      title: "Sleep Stage Analysis",
      description: "Advanced sleep stage classification using AI-powered EEG analysis",
      link: "/sleep-detector"
    },
    {
      icon: <FaLaptopMedical className="w-8 h-8 text-blue-400" />,
      title: "Emotion Recognition",
      description: "Detect emotional states through EEG pattern analysis",
      link: "/emotion-recognizer"
    },
   
  ];

  const recentFeatures = [
    { date: '2 hours ago', feature: 'Sleep Analysis', status: 'Completed' },
    { date: '5 hours ago', feature: 'Mind Decoder', status: 'In Progress' },
    { date: 'Yesterday', feature: 'View Reports', status: 'Completed' },
    { date: ' Yesterday', feature: 'Sleep Analysis', status: 'Completed' }
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-blue-100">
            Welcome back, <span className="text-blue-400">{user?.full_name}</span>
          </h1>
          <p className="text-gray-400">Access your neuro-analysis tools below</p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        {/* Recent Features */}
        <div className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
          <h2 className="text-xl font-semibold text-blue-100 mb-6">Recently Used Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentFeatures.map((item, index) => (
              <RecentFeatureCard key={index} {...item} />
            ))}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-12 bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
          <h2 className="text-xl font-semibold text-blue-100 mb-4">Quick Tips</h2>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Use Mind Decoder for real-time brain activity visualization</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Sleep Stage Analysis works best with EDF format files</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Try our new Emotion Recognition feature for sentiment analysis</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;