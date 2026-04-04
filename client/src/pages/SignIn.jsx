import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { auth } from '../services/api';

export default function SignIn() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await auth.signin(formData.email, formData.password);
    
    if (result.success) {
      const userData = {
        userId: result.data.userId || result.data._id,
        name: result.data.name,
        email: result.data.email,
        role: result.data.role,
      };
      login(userData, result.data.token);
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-100 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-[2rem] bg-white/95 border border-purple-100 shadow-[0_25px_80px_rgba(168,85,247,0.14)] p-8">
        <h2 className="text-3xl font-bold text-center text-purple-900 mb-8">Sign In</h2>

        {error && (
          <div className="mb-4 p-3 bg-pink-50 border border-pink-200 text-pink-700 rounded-3xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-purple-200 rounded-3xl focus:outline-none focus:ring-2 focus:ring-pink-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-purple-200 rounded-3xl focus:outline-none focus:ring-2 focus:ring-pink-300"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium py-3 shadow-lg shadow-pink-200/50 transition hover:brightness-110 disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-purple-600 mt-6">
          Default credentials: email <code className="bg-purple-100 px-2 py-1 rounded-full">admin@gmail.com</code> password <code className="bg-purple-100 px-2 py-1 rounded-full">admin123</code>
        </p>
      </div>
    </div>
  );
}
