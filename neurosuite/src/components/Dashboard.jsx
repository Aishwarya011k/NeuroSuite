import React, { useState, useEffect } from 'react';
import { FaBrain, FaBed, FaChartLine, FaUserMd, FaFileDownload, FaClock } from 'react-icons/fa';
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

const FeatureCard = ({ icon, title, description, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all cursor-pointer group"
  >
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="p-4 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-all">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-blue-100">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  </div>
);

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
      description: "Analyze brain signals and visualize neural activity patterns in real-time",
      onClick: () => navigate('/eeg-decoder')
    },
    {
      icon: <FaBed className="w-8 h-8 text-blue-400" />,
      title: "Sleep Stage Analysis",
      description: "Identify and classify different stages of sleep from EEG recordings",
      onClick: () => navigate('/sleep-detector')
    },
    {
      icon: <FaChartLine className="w-8 h-8 text-blue-400" />,
      title: "View Reports",
      description: "Access and analyze your previous analysis results and reports",
      onClick: () => navigate('/reports')
    }
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
          <p className="text-gray-400">Select a feature to get started</p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        {/* Recent Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Tips */}
          <div className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
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
                <span>View your analysis history in the Reports section</span>
              </li>
            </ul>
          </div>

          {/* Recently Used Features */}
          <div className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
            <h2 className="text-xl font-semibold text-blue-100 mb-4">Recently Used Features</h2>
            <div className="space-y-3">
              {recentFeatures.map((item, index) => (
                <RecentFeatureCard key={index} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;