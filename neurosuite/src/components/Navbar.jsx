import React from "react";
import { logo } from "../assets";
import { useState } from "react";
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  
  return (
    <nav className="bg-gray-900/60 backdrop-blur-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="NeuroSuite Logo" className="h-8 w-auto" />
            <span className="text-xl font-bold text-blue-400">NeuroSuite</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex gap-8">
            <Link to="/" className="text-gray-300 hover:text-blue-300 font-medium transition">Home</Link>
            <Link to="/about" className="text-gray-300 hover:text-blue-300 font-medium transition">About</Link>
            <Link to="/features" className="text-gray-300 hover:text-blue-300 font-medium transition">Features</Link>
            {user && (
              <Link to="/dashboard" className="text-gray-300 hover:text-blue-300 font-medium transition">Dashboard</Link>
            )}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex gap-3">
            {user ? (
              <>
                <Link to="/profile">
                  <button className="px-4 py-2 rounded border border-gray-600 text-gray-200 hover:bg-gray-800 hover:text-blue-200 transition font-semibold">
                    Profile
                  </button>
                </Link>
                <button 
                  onClick={logout}
                  className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition font-semibold"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="px-4 py-2 rounded border border-gray-600 text-gray-200 hover:bg-gray-800 hover:text-blue-200 transition font-semibold">
                    Log In
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition font-semibold">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white-300 focus:outline-none"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}