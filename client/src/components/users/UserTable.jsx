import React, { useState } from "react";
import { users } from "../../services/api";

export default function UserTable({ users: userList, refresh }) {
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", role: "", status: "" });
  const [message, setMessage] = useState("");

  const handleEdit = (user) => {
    setEditingUser(user._id);
    setEditForm({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const result = await users.update(editingUser, editForm);
    if (result.success) {
      setMessage("User updated successfully!");
      setEditingUser(null);
      refresh();
    } else {
      setMessage(result.error);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const result = await users.delete(userId);
      if (result.success) {
        setMessage("User deleted successfully!");
        refresh();
      } else {
        setMessage(result.error);
      }
    }
  };

  return (
    <div className="bg-white/95 p-6 rounded-[2rem] shadow-xl border border-purple-100">
      <h2 className="text-xl font-bold mb-4 text-purple-900">Users List</h2>
      {message && (
        <p className={`mb-4 text-sm ${message.includes("success") ? "text-pink-600" : "text-purple-600"}`}>
          {message}
        </p>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-purple-100">
          <thead className="bg-purple-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-purple-700 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-purple-700 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-purple-700 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-purple-700 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-purple-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-purple-100">
            {userList.map((user) => (
              <tr key={user._id} className="hover:bg-purple-50/60">
                {editingUser === user._id ? (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="text"
                        name="name"
                        value={editForm.name}
                        onChange={handleEditChange}
                        className="border border-purple-200 rounded-2xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-300"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="email"
                        name="email"
                        value={editForm.email}
                        onChange={handleEditChange}
                        className="border border-purple-200 rounded-2xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-300"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        name="role"
                        value={editForm.role}
                        onChange={handleEditChange}
                        className="border border-purple-200 rounded-2xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                      >
                        <option value="viewer">Viewer</option>
                        <option value="analyst">Analyst</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        name="status"
                        value={editForm.status}
                        onChange={handleEditChange}
                        className="border border-purple-200 rounded-2xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={handleUpdate}
                        className="text-pink-600 hover:text-pink-800 mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingUser(null)}
                        className="text-purple-600 hover:text-purple-900"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-purple-900">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600 capitalize">{user.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600 capitalize">{user.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-pink-600 hover:text-pink-800 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="text-purple-600 hover:text-purple-900"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}