// API service layer base URL
const API_BASE = 'http://localhost:3000/api';

// Frontend rate limiting variables (100 requests per minute)
let requestCount = 0;
let resetTime = Date.now() + 60000;

// Safe JSON parse to avoid crashes
const parseJSON = async (response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

// Main API function
export const apiCall = async (endpoint, options = {}) => {

  // Reset counter after 1 minute
  if (Date.now() > resetTime) {
    requestCount = 0;
    resetTime = Date.now() + 60000;
  }

  // Block if limit exceeded
  if (requestCount >= 100) {
    return { success: false, error: 'Rate limit exceeded (frontend)' };
  }

  requestCount++;

  const { method = 'GET', body, authenticated = true } = options;

  // Request headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add authorization token if authenticated
  if (authenticated) {
    const token = localStorage.getItem('authToken');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  // Request config
  const config = {
    method,
    headers,
    credentials: 'include', // needed for cookies/auth
  };

  // Attach body if present
  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, config);
    const data = await parseJSON(response);

    // Handle API errors
    if (!response.ok) {
      throw new Error(data?.msg || data?.message || `API Error: ${response.status}`);
    }

    return { success: true, data };

  } catch (error) {
    return { success: false, error: error.message };
  }
};


// ================= AUTH =================
export const auth = {
  signin: async (email, password) => {
    return apiCall('/auth/signin', {
      method: 'POST',
      body: { email, password },
      authenticated: false,
    });
  },
};


// ================= RECORDS =================
export const records = {

  // Create record
  create: async (recordData) => {
    return apiCall('/financial/records', {
      method: 'POST',
      body: recordData,
    });
  },

  // Get records with filters
  list: async (filters = {}) => {
    const query = new URLSearchParams(filters).toString();
    return apiCall(`/financial/records?${query}`, {
      method: 'GET',
    });
  },

  // Update record
  update: async (id, updates) => {
    return apiCall(`/financial/records/${id}`, {
      method: 'PUT',
      body: updates,
    });
  },

  // Delete record
  delete: async (id) => {
    return apiCall(`/financial/records/${id}`, {
      method: 'DELETE',
    });
  },

  // Get summary
  summary: async () => {
    return apiCall('/financial/summary', {
      method: 'GET',
    });
  },
};


// ================= USERS =================
export const users = {

  // Create user
  create: async (userData) => {
    return apiCall('/user/create', {
      method: 'POST',
      body: userData,
    });
  },

  // Get all users
  getAll: async () => {
    return apiCall('/user/getusers', {
      method: 'GET',
    });
  },

  // Delete user
  delete: async (userId) => {
    return apiCall(`/user/deleteuser/${userId}`, {
      method: 'DELETE',
    });
  },

  // Update user
  update: async (userId, updates) => {
    return apiCall(`/user/updateuser/${userId}`, {
      method: 'PUT',
      body: updates,
    });
  },
};



export const contact = {

  // Send contact form data to backend
  send: async (formData) => {
    return apiCall(`/user/contact`, {
      method: 'POST',
      body: formData,
      authenticated: false, // public form
    });
  },
};