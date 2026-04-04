import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/');
  };

  return (
    <header className="bg-gradient-to-r from-pink-50 via-purple-50 to-white shadow-lg border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        
        <Link to="/" className="text-2xl font-bold text-purple-900">
          FinanceApp
        </Link>

        <nav className="hidden md:flex gap-6 items-center">
          <Link to="/" className="text-purple-600 hover:text-purple-900 font-medium">
            Home
          </Link>
          <Link to="/about" className="text-purple-600 hover:text-purple-900 font-medium">
            About
          </Link>
          <Link to="/contact" className="text-purple-600 hover:text-purple-900 font-medium">
            Contact
          </Link>

          {isAuthenticated() ? (
            <>
              <Link to="/dashboard" className="text-purple-600 hover:text-purple-900 font-medium">
                Dashboard
              </Link>
              {user?.role === 'admin' && (
                <Link to="/users" className="text-purple-600 hover:text-purple-900 font-medium">
                  Users
                </Link>
              )}

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                >
                  <span className="text-sm font-medium text-gray-800">{user?.name}</span>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                    {user?.role}
                  </span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-3xl shadow-xl border border-purple-100 z-10">
                    <div className="px-4 py-3 border-b border-purple-100">
                      <p className="text-sm font-medium text-purple-800">{user?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-pink-600 hover:bg-pink-50 font-medium"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link
              to="/sign-in"
              className="px-4 py-2 text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 font-medium transition"
            >
              Sign In
            </Link>
          )}
        </nav>

      </div>
    </header>
  );
}