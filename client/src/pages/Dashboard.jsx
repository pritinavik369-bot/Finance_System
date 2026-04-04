import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { records } from '../services/api';

export default function Dashboard() {
  const { user } = useAuth();
  const [recordsList, setRecordsList] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({});
  const [formData, setFormData] = useState({
    amount: '',
    type: 'income',
    category: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  // Load data on component mount
  useEffect(() => {
    loadSummary();
    if (user.role !== 'viewer') {
      loadRecords();
    }
  }, [user.role]);

  const loadSummary = async () => {
    const result = await records.summary();
    if (result.success) {
      setSummary(result.data);
    }
  };

  const loadRecords = async () => {
    setLoading(true);
    setError(null);
    const result = await records.list(filters);
    
    if (result.success) {
      setRecordsList(result.data || []);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    loadRecords();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || '' : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await records.create(formData);

    if (result.success) {
      setRecordsList(prev => [...prev, result.data]);
      loadSummary(); // Refresh summary
      setFormData({
        amount: '',
        type: 'income',
        category: '',
        date: new Date().toISOString().split('T')[0],
        notes: '',
      });
      setShowForm(false);
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Financial Dashboard</h1>
          <p className="text-gray-600">Welcome, {user?.name}</p>
        </div>

        {/* Summary Cards */}
        {summary && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <p className="text-green-600 text-sm font-medium mb-2">Total Income</p>
              <p className="text-3xl font-bold text-green-600">${summary.totalIncome.toFixed(2)}</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <p className="text-red-600 text-sm font-medium mb-2">Total Expense</p>
              <p className="text-3xl font-bold text-red-600">${summary.totalExpenses.toFixed(2)}</p>
            </div>
            <div className={`${summary.netBalance >= 0 ? 'bg-blue-50 border-blue-200' : 'bg-orange-50 border-orange-200'} border rounded-lg p-6`}>
              <p className={`${summary.netBalance >= 0 ? 'text-blue-600' : 'text-orange-600'} text-sm font-medium mb-2`}>Balance</p>
              <p className={`text-3xl font-bold ${summary.netBalance >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>${summary.netBalance.toFixed(2)}</p>
            </div>
          </div>
        )}

        {/* Category Totals */}
        {summary?.categoryTotals && summary.categoryTotals.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Category Breakdown</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {summary.categoryTotals.map((cat, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-4">
                  <p className="font-medium">{cat._id.category} ({cat._id.type})</p>
                  <p className="text-2xl font-bold">${cat.total.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Activity */}
        {summary?.recentActivity && summary.recentActivity.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Type</th>
                    <th className="px-4 py-2 text-left">Category</th>
                    <th className="px-4 py-2 text-left">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.recentActivity.map((record) => (
                    <tr key={record._id} className="border-t">
                      <td className="px-4 py-2">{new Date(record.date).toLocaleDateString()}</td>
                      <td className="px-4 py-2">{record.type}</td>
                      <td className="px-4 py-2">{record.category}</td>
                      <td className="px-4 py-2">${record.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Records Management - Only for analyst/admin */}
        {user.role !== 'viewer' && (
          <>
            {/* Filters */}
            <div className="mb-8 bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Filters</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <select name="type" onChange={handleFilterChange} className="px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="">All Types</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
                <input type="text" name="category" placeholder="Category" onChange={handleFilterChange} className="px-3 py-2 border border-gray-300 rounded-lg" />
                <input type="date" name="startDate" onChange={handleFilterChange} className="px-3 py-2 border border-gray-300 rounded-lg" />
                <input type="date" name="endDate" onChange={handleFilterChange} className="px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
              <button onClick={applyFilters} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">Apply Filters</button>
            </div>

            {/* Form Toggle and Add Form */}
            <div className="mb-8">
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition"
              >
                {showForm ? 'Cancel' : 'Add Record'}
              </button>

              {showForm && (
                <form onSubmit={handleSubmit} className="mt-6 bg-white rounded-lg shadow p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                      <input
                        type="number"
                        step="0.01"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="0.00"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="e.g., Salary, Groceries"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Additional notes"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="3"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-2 rounded-lg transition"
                  >
                    {loading ? 'Creating...' : 'Create Record'}
                  </button>
                </form>
              )}
            </div>

            {/* Records List */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <h2 className="text-xl font-bold p-6 border-b">Financial Records</h2>
              {loading ? (
                <p className="p-6">Loading...</p>
              ) : recordsList.length === 0 ? (
                <p className="p-6">No records found.</p>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left">Date</th>
                      <th className="px-4 py-2 text-left">Type</th>
                      <th className="px-4 py-2 text-left">Category</th>
                      <th className="px-4 py-2 text-left">Amount</th>
                      <th className="px-4 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recordsList.map((record) => (
                      <tr key={record._id} className="border-t">
                        <td className="px-4 py-2">{new Date(record.date).toLocaleDateString()}</td>
                        <td className="px-4 py-2">{record.type}</td>
                        <td className="px-4 py-2">{record.category}</td>
                        <td className="px-4 py-2">${record.amount.toFixed(2)}</td>
                        <td className="px-4 py-2">{record.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {/* Records Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Records</h2>
          </div>
          
          {loading && !showForm ? (
            <div className="p-6 text-center text-gray-600">Loading records...</div>
          ) : recordsList.length === 0 ? (
            <div className="p-6 text-center text-gray-600">No records yet. Create one to get started!</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Category</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Type</th>
                    <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">Amount</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {recordsList.map((record, idx) => (
                    <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(record.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">{record.category}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          record.type === 'income' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {record.type.charAt(0).toUpperCase() + record.type.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-right">
                        <span className={record.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                          {record.type === 'income' ? '+' : '-'}${record.amount.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{record.notes || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
