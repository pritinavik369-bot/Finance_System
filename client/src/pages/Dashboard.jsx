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

  // Load data on component mount based on role
  useEffect(() => {
    if (user?.role === 'admin' || user?.role === 'analyst') {
      loadSummary();
      loadRecords();
    }
  }, [user?.role]);

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
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 via-purple-50 to-pink-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 rounded-[2rem] bg-white/85 backdrop-blur-sm p-8 shadow-[0_20px_80px_rgba(168,85,247,0.14)] border border-purple-100">
          <h1 className="text-4xl font-bold text-purple-900 mb-2">Financial Dashboard</h1>
          <p className="text-purple-600 text-lg">Welcome, {user?.name}</p>
        </div>

        {/* Summary Cards - Visible to Admin and Analyst */}
        {(user?.role === 'admin' || user?.role === 'analyst') && summary && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="rounded-3xl border border-pink-100 bg-white/90 shadow-lg p-6">
              <p className="text-pink-600 text-sm font-medium mb-2">Total Income</p>
              <p className="text-3xl font-bold text-pink-700">${summary.totalIncome.toFixed(2)}</p>
            </div>
            <div className="rounded-3xl border border-purple-100 bg-white/90 shadow-lg p-6">
              <p className="text-purple-600 text-sm font-medium mb-2">Total Expense</p>
              <p className="text-3xl font-bold text-purple-700">${summary.totalExpenses.toFixed(2)}</p>
            </div>
            <div className={`rounded-3xl border border-pink-100 bg-white/90 shadow-lg p-6`}>
              <p className={`${summary.netBalance >= 0 ? 'text-purple-600' : 'text-pink-600'} text-sm font-medium mb-2`}>Balance</p>
              <p className={`text-3xl font-bold ${summary.netBalance >= 0 ? 'text-purple-700' : 'text-pink-700'}`}>${summary.netBalance.toFixed(2)}</p>
            </div>
          </div>
        )}

        {/* Category Totals */}
        {summary?.categoryTotals && summary.categoryTotals.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-purple-900">Category Breakdown</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {summary.categoryTotals.map((cat, index) => (
                <div key={index} className="rounded-3xl bg-white/90 border border-pink-100 shadow-lg p-5">
                  <p className="font-medium text-purple-700">{cat._id.category} <span className="text-sm text-pink-500">({cat._id.type})</span></p>
                  <p className="text-2xl font-bold text-purple-900">${cat.total.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Activity */}
        {summary?.recentActivity && summary.recentActivity.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
            <div className="rounded-3xl bg-white/95 shadow-lg border border-purple-100 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-pink-50 to-purple-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-purple-700">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-purple-700">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-purple-700">Category</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-purple-700">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.recentActivity.map((record) => (
                    <tr key={record._id} className="border-t border-purple-100">
                      <td className="px-4 py-3 text-sm text-gray-600">{new Date(record.date).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{record.type}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{record.category}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-purple-700">${record.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Monthly Trends */}
        {summary?.monthlyTrends && summary.monthlyTrends.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Monthly Trends</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Income Trends */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-green-600">Income Trends</h3>
                  <div className="space-y-2">
                    {summary.monthlyTrends
                      .filter(trend => trend._id.type === 'income')
                      .slice(0, 6)
                      .map((trend, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            {trend._id.year}-{String(trend._id.month).padStart(2, '0')}
                          </span>
                          <span className="font-medium text-green-600">${trend.total.toFixed(2)}</span>
                        </div>
                      ))}
                  </div>
                </div>
                {/* Expense Trends */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-red-600">Expense Trends</h3>
                  <div className="space-y-2">
                    {summary.monthlyTrends
                      .filter(trend => trend._id.type === 'expense')
                      .slice(0, 6)
                      .map((trend, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            {trend._id.year}-{String(trend._id.month).padStart(2, '0')}
                          </span>
                          <span className="font-medium text-red-600">${trend.total.toFixed(2)}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Viewer Role Message */}
        {user?.role === 'viewer' && (
          <div className="rounded-3xl bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300 shadow-lg p-8 mb-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-purple-900 mb-2">👁️ Viewer Mode</h2>
              <p className="text-purple-700 text-lg">You have read-only access to the dashboard. Contact an Admin or Analyst to create or manage financial records.</p>
            </div>
          </div>
        )}

        {/* Records Management - Only for admin/analyst */}
        {(user?.role === 'admin' || user?.role === 'analyst') && (
          <>
            {/* Filters */}
            <div className="mb-8 rounded-3xl bg-white/85 border border-purple-100 shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-purple-900">Filters</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <select name="type" onChange={handleFilterChange} className="px-4 py-3 border border-purple-200 rounded-3xl bg-white focus:outline-none focus:ring-2 focus:ring-pink-300">
                  <option value="">All Types</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
                <input type="text" name="category" placeholder="Category" onChange={handleFilterChange} className="px-4 py-3 border border-purple-200 rounded-3xl bg-white focus:outline-none focus:ring-2 focus:ring-pink-300" />
                <input type="date" name="startDate" onChange={handleFilterChange} className="px-4 py-3 border border-purple-200 rounded-3xl bg-white focus:outline-none focus:ring-2 focus:ring-pink-300" />
                <input type="date" name="endDate" onChange={handleFilterChange} className="px-4 py-3 border border-purple-200 rounded-3xl bg-white focus:outline-none focus:ring-2 focus:ring-pink-300" />
              </div>
              <button onClick={applyFilters} className="mt-4 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-5 py-2 text-white shadow-lg shadow-pink-200/50 transition hover:brightness-110">Apply Filters</button>
            </div>

            {/* Form Toggle and Add Form - Only for Admin */}
            {user?.role === 'admin' && (
              <div className="mb-8">
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium py-2 px-6 shadow-lg shadow-pink-200/50 transition hover:brightness-105"
                >
                  {showForm ? 'Cancel' : 'Add Record'}
                </button>

                {showForm && (
                  <form onSubmit={handleSubmit} className="mt-6 rounded-[2rem] bg-white/90 border border-purple-100 shadow-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-purple-700 mb-1">Amount</label>
                      <input
                        type="number"
                        step="0.01"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="0.00"
                        className="w-full px-4 py-3 border border-purple-200 rounded-3xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-purple-700 mb-1">Type</label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-purple-200 rounded-3xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                      >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-purple-700 mb-1">Category</label>
                      <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="e.g., Salary, Groceries"
                        className="w-full px-4 py-3 border border-purple-200 rounded-3xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-purple-700 mb-1">Date</label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-purple-200 rounded-3xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-purple-700 mb-1">Notes</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Additional notes"
                      className="w-full px-4 py-3 border border-purple-200 rounded-3xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                      rows="3"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium py-3 shadow-lg shadow-purple-200/50 transition hover:brightness-110 disabled:opacity-60"
                  >
                    {loading ? 'Creating...' : 'Create Record'}
                  </button>
                </form>
                )}
              </div>
            )}

            {/* Analyst View Message */}
            {user?.role === 'analyst' && (
              <div className="rounded-3xl bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-blue-300 shadow-lg p-6 mb-8">
                <p className="text-blue-800 font-medium">📊 You can view and analyze records, but only Admins can create or modify records.</p>
              </div>
            )}
          </>
        )}

        {/* Records Table - Only show for admin/analyst */}
        {(user?.role === 'admin' || user?.role === 'analyst') && (
        <div className="bg-white/90 rounded-[2rem] shadow-xl border border-purple-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-purple-100 bg-gradient-to-r from-pink-50 to-purple-50">
            <h2 className="text-xl font-bold text-purple-800">Records</h2>
          </div>
          
          {loading && !showForm ? (
            <div className="p-6 text-center text-purple-600">Loading records...</div>
          ) : recordsList.length === 0 ? (
            <div className="p-6 text-center text-purple-600">No records yet. Create one to get started!</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-purple-50 border-b border-purple-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-purple-700">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-purple-700">Category</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-purple-700">Type</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-purple-700">Amount</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-purple-700">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {recordsList.map((record, idx) => (
                    <tr key={idx} className="border-b border-purple-100 hover:bg-purple-50/70">
                      <td className="px-6 py-4 text-sm text-purple-600">
                        {new Date(record.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-purple-800">{record.category}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          record.type === 'income'
                            ? 'bg-pink-100 text-pink-700'
                            : 'bg-purple-100 text-purple-700'
                        }`}>
                          {record.type.charAt(0).toUpperCase() + record.type.slice(1)}
                        </span>
                      </td>
                      <td className={record.type === 'income' ? 'px-6 py-4 text-sm font-semibold text-right text-pink-600' : 'px-6 py-4 text-sm font-semibold text-right text-purple-600'}>
                        <span>
                          {record.type === 'income' ? '+' : '-'}${record.amount.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-purple-600">{record.notes || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        )}
      </div>
    </div>
  );
}
