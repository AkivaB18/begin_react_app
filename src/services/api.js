// src/services/api.js
import axios from 'axios';

// Create axios instance with explicit base URL
const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Increase timeout for slower connections
  timeout: 10000,
});

// Debug interceptor to help diagnose issues
api.interceptors.request.use(
  config => {
    console.log(`Making ${config.method.toUpperCase()} request to: ${config.baseURL}${config.url}`);
    return config;
  },
  error => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken');
    if (token) {
      console.log('Adding auth token to request');
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for better error handling
api.interceptors.response.use(
  response => {
    console.log('Response received successfully');
    return response;
  },
  error => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout - server took too long to respond');
    } else if (!error.response) {
      console.error('Network error - could not connect to the server. Is the backend running?');
    } else {
      console.error(`Error ${error.response.status}: ${error.response.statusText}`);
      console.error('Error details:', error.response.data);
    }
    return Promise.reject(error);
  }
);

export default api;