import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const SuccessPage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-gray-800">
        <div className="text-center">
          <div className="mb-4 text-green-400">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-blue-100 mb-2">Welcome, {user?.full_name}!</h2>
          <p className="text-gray-400 mb-6">Your account has been successfully created.</p>
          <div className="space-y-4">
            <Link to="/dashboard">
              <button className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Go to Dashboard
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;