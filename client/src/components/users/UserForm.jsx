import React, { useState } from "react";
import { users } from "../../services/api";

export default function UserForm({ refresh }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "viewer",
    status: "active",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const result = await users.create(formData);
    if (result.success) {
      setMessage("User created successfully!");
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "viewer",
        status: "active",
      });
      refresh();
    } else {
      setMessage(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white/95 p-6 rounded-[2rem] shadow-xl mb-6 border border-purple-100">
      <h2 className="text-xl font-bold mb-4 text-purple-900">Create New User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-purple-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-3 border border-purple-200 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-purple-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-3 border border-purple-200 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-purple-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-3 border border-purple-200 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-purple-700">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 border border-purple-200 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
            >
              <option value="viewer">Viewer</option>
              <option value="analyst">Analyst</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-purple-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 border border-purple-200 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-3 px-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-medium shadow-lg shadow-pink-200/50 transition hover:brightness-110 disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create User"}
        </button>
      </form>
      {message && (
        <p className={`mt-4 text-sm ${message.includes("success") ? "text-pink-600" : "text-purple-600"}`}>
          {message}
        </p>
      )}
    </div>
  );
}