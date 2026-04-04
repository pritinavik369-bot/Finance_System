import React from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Sign Up</h2>
        
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Account creation is currently managed by administrators. 
            Please use the default admin credentials to log in, or contact an administrator to create your account.
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-700 mb-2"><strong>Demo Credentials:</strong></p>
          <p className="text-sm text-gray-600">Username: <code className="bg-white px-2 py-1 rounded">Admin</code></p>
          <p className="text-sm text-gray-600">Password: <code className="bg-white px-2 py-1 rounded">admin123</code></p>
        </div>

        <Link
          to="/sign-in"
          className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
        >
          Go to Sign In
        </Link>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <Link to="/sign-in" className="text-blue-600 hover:text-blue-700 font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
