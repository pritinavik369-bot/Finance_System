import React, { useEffect, useState } from "react";
import { users } from "../services/api";
import { useAuth } from "../context/AuthContext";
import UserForm from "../components/users/UserForm";
import UserTable from "../components/users/UserTable";

export default function Users() {
  const { user } = useAuth();
  const [list, setList] = useState([]);

  const loadUsers = async () => {
    const res = await users.getAll();
    if (res.success) setList(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // 🔐 Restrict page
  if (user.role !== "admin") {
    return <p className="p-6 text-red-500">Access Denied</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold mb-4 text-purple-900">Users Management</h1>

        <UserForm refresh={loadUsers} />
        <UserTable users={list} refresh={loadUsers} />
      </div>
    </div>
  );
}