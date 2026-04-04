import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Smart Finance Management
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Track your income and expenses with ease. Get real-time insights into your financial health.
          </p>
          
          {!isAuthenticated() ? (
            <div className="flex gap-4 justify-center">
              <Link
                to="/sign-in"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition"
              >
                Get Started
              </Link>
              <Link
                to="/about"
                className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium transition"
              >
                Learn More
              </Link>
            </div>
          ) : (
            <Link
              to="/dashboard"
              className="inline-block px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition"
            >
              Go to Dashboard
            </Link>
          )}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">Track Records</h3>
            <p className="text-gray-600">Easy to add and manage your income and expense records in real-time.</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition">
            <div className="text-3xl mb-4">💼</div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">Categorized</h3>
            <p className="text-gray-600">Organize your transactions with custom categories for better analysis.</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition">
            <div className="text-3xl mb-4">🔒</div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">Secure</h3>
            <p className="text-gray-600">Your financial data is protected with secure authentication and encryption.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
