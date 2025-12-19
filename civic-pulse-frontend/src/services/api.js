import axios from 'axios';

// Base API URL - Change this if backend runs on a different port
const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('civicPulseToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized - token expired or invalid
    if (error.response?.status === 401) {
      localStorage.removeItem('civicPulseToken');
      localStorage.removeItem('civicPulseUser');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ==================== AUTH APIs ====================

export const authAPI = {
  // Register new user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Get current user profile
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// ==================== PROBLEM APIs ====================

export const problemAPI = {
  // Get all problems with optional filters
  getAll: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.location) params.append('location', filters.location);
    if (filters.sort) params.append('sort', filters.sort);
    if (filters.order) params.append('order', filters.order);
    
    const response = await api.get(`/problems?${params.toString()}`);
    return response.data;
  },

  // Get problem by ID
  getById: async (id) => {
    const response = await api.get(`/problems/${id}`);
    return response.data;
  },

  // Create new problem (with image upload)
  create: async (problemData) => {
    const formData = new FormData();
    formData.append('title', problemData.title);
    formData.append('description', problemData.description);
    formData.append('location', problemData.location);
    
    if (problemData.image) {
      formData.append('image', problemData.image);
    }

    const response = await api.post('/problems', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update problem status
  updateStatus: async (id, status) => {
    const response = await api.put(`/problems/${id}/status`, { status });
    return response.data;
  },

  // Delete problem
  delete: async (id) => {
    const response = await api.delete(`/problems/${id}`);
    return response.data;
  },
};

// ==================== COMMENT APIs ====================

export const commentAPI = {
  // Get all comments for a problem
  getAll: async (problemId) => {
    const response = await api.get(`/problems/${problemId}/comments`);
    return response.data;
  },

  // Add comment to problem
  add: async (problemId, text) => {
    const response = await api.post(`/problems/${problemId}/comments`, { text });
    return response.data;
  },

  // Delete comment
  delete: async (commentId) => {
    const response = await api.delete(`/comments/${commentId}`);
    return response.data;
  },
};

// ==================== UPVOTE APIs ====================

export const upvoteAPI = {
  // Toggle upvote on problem
  toggle: async (problemId) => {
    const response = await api.post(`/problems/${problemId}/upvote`);
    return response.data;
  },

  // Get upvote status for a problem
  getStatus: async (problemId) => {
    const response = await api.get(`/problems/${problemId}/upvote/status`);
    return response.data;
  },
};

// ==================== ADMIN APIs ====================

export const adminAPI = {
  // Get all users
  getAllUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },

  // Block/Unblock user
  toggleBlockUser: async (userId) => {
    const response = await api.put(`/admin/users/${userId}/block`);
    return response.data;
  },

  // Delete user
  deleteUser: async (userId) => {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data;
  },

  // Get all problems (admin view)
  getAllProblems: async () => {
    const response = await api.get('/admin/problems');
    return response.data;
  },

  // Delete problem (admin)
  deleteProblem: async (problemId) => {
    const response = await api.delete(`/admin/problems/${problemId}`);
    return response.data;
  },
};

// Export the axios instance for custom requests if needed
export default api;

