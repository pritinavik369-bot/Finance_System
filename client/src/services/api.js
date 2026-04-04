// API service layer
const API_BASE = 'http://localhost:3000/api';

// Safe JSON parse
const parseJSON = async (response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

// Main API function
export const apiCall = async (endpoint, options = {}) => {
  const { method = 'GET', body, authenticated = true } = options;

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const config = {
    method,
    headers,
    credentials: 'include', // ✅ for cookies
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, config);
    const data = await parseJSON(response);

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
      body: { email, password }, // ✅ FIXED
      authenticated: false,
    });
  },
};


// ================= RECORDS =================
export const records = {
  create: async (recordData) => {
    return apiCall('/financial/records', {
      method: 'POST',
      body: recordData,
    });
  },

  list: async (filters = {}) => {
    const query = new URLSearchParams(filters).toString();
    return apiCall(`/financial/records?${query}`, {
      method: 'GET',
    });
  },

  update: async (id, updates) => {
    return apiCall(`/financial/records/${id}`, {
      method: 'PUT',
      body: updates,
    });
  },

  delete: async (id) => {
    return apiCall(`/financial/records/${id}`, {
      method: 'DELETE',
    });
  },

  summary: async () => {
    return apiCall('/financial/summary', {
      method: 'GET',
    });
  },
};


// ================= USERS =================
export const users = {
  create: async (userData) => {
    return apiCall('/user/create', {
      method: 'POST',
      body: userData,
    });
  },

  getAll: async () => {
    return apiCall('/user/getusers', {
      method: 'GET',
    });
  },

  delete: async (userId) => {
    return apiCall(`/user/deleteuser/${userId}`, {
      method: 'DELETE',
    });
  },

  update: async (userId, updates) => {
    return apiCall(`/user/updateuser/${userId}`, {
      method: 'PUT',
      body: updates,
    });
  },
};