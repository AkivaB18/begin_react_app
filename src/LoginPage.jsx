import { useState } from 'react';
import { login, register } from './services/authService';
import './loginPage.css';

function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isRegister) {
        // Register new user
        await register(username, password);
      } else {
        // Login existing user
        await login(username, password);
      }
      
      // Call the callback function to redirect to App
      onLoginSuccess();
    } catch (error) {
      setError(error.toString());
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