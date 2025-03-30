import { useState } from 'react';
import './loginPage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Welcome back, ${username}!`);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">🚀 Welcome Back!</h2>
        <form onSubmit={handleLogin} className="login-form">
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
          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
        <p className="login-reset">
          Forgot your password? <span className="reset-link">Reset here</span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
