import api from './api';

// Login user
export const login = async (username, password) => {
  try {
    const response = await api.post('/users/login', { username, password });
    
    if (response.data && response.data.token) {
      // Store user info in localStorage
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      localStorage.setItem('userToken', response.data.token);
    }
    
    return response.data;
  } catch (error) {
    throw error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};

// Register user
export const register = async (username, password) => {
  try {
    const response = await api.post('/users/register', { username, password });
    
    if (response.data && response.data.token) {
      // Store user info in localStorage
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      localStorage.setItem('userToken', response.data.token);
    }
    
    return response.data;
  } catch (error) {
    throw error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};

// Logout user
export const logout = () => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('userToken');
};

// Get current user
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('userInfo');
  return userStr ? JSON.parse(userStr) : null;
};

// Update pantry items
export const updatePantryItems = async (pantryItems) => {
  try {
    const response = await api.put('/users/pantry', { pantryItems });
    
    // Update local storage with new pantry items
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      userInfo.pantryItems = response.data.pantryItems;
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }
    
    return response.data;
  } catch (error) {
    throw error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};