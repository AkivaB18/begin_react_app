import React, { useState } from 'react';
import axios from 'axios';
import './loginPage.css';

function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  // Direct axios calls for simplicity
  const API_URL = 'http://localhost:5000/api/users';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Log what we're about to do
      console.log(`Attempting to ${isRegister ? 'register' : 'login'} user: ${username}`);
      
      // Make the direct request
      const endpoint = isRegister ? `${API_URL}/register` : `${API_URL}/login`;
      console.log(`Sending request to: ${endpoint}`);
      
      const response = await axios.post(endpoint, { username, password });
      
      console.log('Response received:', response.data);
      
      // Store token in localStorage
      if (response.data && response.data.token) {
        localStorage.setItem('userInfo', JSON.stringify(response.data));
        localStorage.setItem('userToken', response.data.token);
        
        // Call the callback function to redirect to App
        onLoginSuccess();
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(`Server error: ${error.response.data.message || error.response.statusText}`);
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        setError('Network error - No response from server. Is the backend running?');
        console.error('Request made but no response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        setError(`Error: ${error.message}`);
        console.error('Error setting up request:', error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">
          {isRegister ? '🚀 Create Account' : '🚀 Welcome Back!'}
        </h2>
        <form onSubmit={handleSubmit} className="login-form">
          {error && <p className="error-message">{error}</p>}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading
              ? 'Loading...'
              : isRegister
              ? 'Register'
              : 'Log In'}
          </button>
        </form>
        <p className="login-switch">
          {isRegister ? 'Already have an account? ' : "Don't have an account? "}
          <span
            className="switch-link"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? 'Log In' : 'Register'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;