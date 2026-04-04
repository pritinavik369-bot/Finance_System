import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 relative overflow-hidden">

      {/* Soft Background Shapes */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-pink-200 rounded-full opacity-30 blur-2xl"></div>
      <div className="absolute bottom-10 right-10 w-52 h-52 bg-purple-200 rounded-full opacity-30 blur-2xl"></div>

      {/* Hero Section */}
      <div className="flex flex-col gap-6 p-16 px-4 max-w-6xl mx-auto text-center">
        
        <h1 className="text-4xl lg:text-6xl font-bold text-purple-700">
          Smart Finance Management
        </h1>

        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
          Track your income and expenses with ease. Get clear insights into your financial health and manage everything in one place.
        </p>

        {!isAuthenticated() ? (
          <div className="flex gap-4 justify-center mt-4">
            <Link
              to="/sign-in"
              className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl shadow-md hover:scale-105 transition"
            >
              Get Started
            </Link>

            <Link
              to="/about"
              className="px-8 py-3 border-2 border-purple-400 text-purple-600 rounded-2xl hover:bg-purple-50 transition"
            >
              Learn More
            </Link>
          </div>
        ) : (
          <Link
            to="/dashboard"
            className="inline-block px-8 py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-2xl shadow-md hover:scale-105 transition"
          >
            Go to Dashboard
          </Link>
        )}
      </div>

      {/* Feature Section */}
      <div className="max-w-6xl mx-auto p-4 flex flex-col gap-8 py-10">
        
        <h2 className="text-2xl font-semibold text-center text-purple-700">
          Features
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          
          {/* Card 1 */}
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-pink-100 hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-3 text-gray-800">Track Records</h3>
            <p className="text-gray-600 text-sm">
              Easily add and manage your income and expenses in real-time.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-purple-100 hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-3 text-gray-800">Categorized</h3>
            <p className="text-gray-600 text-sm">
              Organize transactions with categories for better financial clarity.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-indigo-100 hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-3 text-gray-800">Secure</h3>
            <p className="text-gray-600 text-sm">
              Your data stays protected with secure authentication and access control.
            </p>
          </div>

        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-6">
          <Link
            to={isAuthenticated() ? "/dashboard" : "/sign-in"}
            className="text-purple-600 font-medium hover:underline"
          >
            {isAuthenticated() ? "Go to your dashboard" : "Start managing your finances"}
          </Link>
        </div>

      </div>
    </div>
  );
}