import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../services/auth';
import LoadingSpinner from './LoadSpinner';

const Profile = () => {
  const { user, tokens, logout } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (tokens?.accessToken) {
          const data = await getUserProfile(tokens.accessToken);
          setProfileData(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [tokens]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-xl border border-gray-800 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-blue-100">My Profile</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Log Out
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-800/50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-blue-200 mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-400">Full Name</label>
                <p className="text-lg text-gray-100">{profileData?.full_name || 'Not available'}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-400">Email</label>
                <p className="text-lg text-gray-100">{profileData?.email || 'Not available'}</p>
              </div>
              {profileData?.organization && (
                <div>
                  <label className="block text-sm text-gray-400">Organization</label>
                  <p className="text-lg text-gray-100">{profileData.organization}</p>
                </div>
              )}
              {profileData?.role && (
                <div>
                  <label className="block text-sm text-gray-400">Role</label>
                  <p className="text-lg text-gray-100">{profileData.role}</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-blue-200 mb-4">Account Settings</h2>
            <div className="space-y-4">
              <button className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Change Password
              </button>
              <button className="w-full md:w-auto px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition">
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;