import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp, login } from '../services/auth';
import { useAuth } from '../context/AuthContext';
import LoadSpinner from './LoadSpinner';

const SignUp = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirm_password: '',
    organization: '',
    role: '',
    agreed_to_terms: false
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/;
    
    if (!passwordRegex.test(formData.password)) {
      setError('Password must be 8-64 characters and include uppercase, lowercase, number, and special character');
      return false;
    }

    // Password match validation
    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match');
      return false;
    }

    // Full name validation
    if (formData.full_name.trim().length < 2) {
      setError('Please enter a valid full name');
      return false;
    }

    // Terms agreement validation
    if (!formData.agreed_to_terms) {
      setError('Please agree to the Terms and Conditions');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    try {
      setLoading(true);
      
      // Sign up the user
      const userData = await signUp({
        email: formData.email,
        full_name: formData.full_name,
        password: formData.password,
        confirm_password: formData.confirm_password,
        organization: formData.organization || undefined,
        role: formData.role || undefined,
        agreed_to_terms: formData.agreed_to_terms
      });

      // Login the user after successful signup
      const tokens = await login({
        email: formData.email,
        password: formData.password
      });

      // Set authentication state
      authLogin(userData, tokens);

      // Redirect to success page
      navigate('/success');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800/40 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
          <h2 className="text-2xl font-bold text-blue-100 mb-6 text-center">
            Create your account
          </h2>
          
          {error && (
            <div className="mb-4 p-3 rounded bg-red-500/10 border border-red-500 text-red-500">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Field */}
            <div>
              <label htmlFor="full_name" className="block text-sm font-medium text-gray-300">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                required
                value={formData.full_name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 text-gray-100 px-3 py-2 focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 text-gray-100 px-3 py-2 focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                minLength={8}
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 text-gray-100 px-3 py-2 focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
              <p className="mt-1 text-sm text-gray-400">
                Must be at least 8 characters with letters and numbers
              </p>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-300">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                required
                value={formData.confirm_password}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 text-gray-100 px-3 py-2 focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            {/* Organization Field */}
            <div>
              <label htmlFor="organization" className="block text-sm font-medium text-gray-300">
                Organization <span className="text-gray-500">(Optional)</span>
              </label>
              <input
                type="text"
                id="organization"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 text-gray-100 px-3 py-2 focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            {/* Role Field */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-300">
                Role/Job Title <span className="text-gray-500">(Optional)</span>
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 text-gray-100 px-3 py-2 focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="agreed_to_terms"
                name="agreed_to_terms"
                required
                checked={formData.agreed_to_terms}
                onChange={handleChange}
                className="mt-1 h-4 w-4 rounded border-gray-700 text-blue-600 focus:ring-blue-500 bg-gray-800"
                disabled={loading}
              />
              <label htmlFor="agreed_to_terms" className="ml-2 block text-sm text-gray-300">
                I agree to the <a href="#" className="text-blue-400 hover:text-blue-300">Terms and Conditions</a>
                <span className="text-red-500"> *</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full p-3 rounded-lg flex items-center justify-center space-x-2 
                ${loading ? 'bg-gray-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {loading ? (
                <>
                  <LoadSpinner />
                  <span className="ml-2">Creating Account...</span>
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center text-gray-400">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-blue-400 hover:text-blue-300 transition font-medium"
            >
              Log in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;