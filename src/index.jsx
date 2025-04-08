import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import LoginPage from "./LoginPage.jsx";
import Pantry from "./Pantry.jsx";
import "./index.css";
import { getCurrentUser, logout } from './services/authService';

function Main() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPantry, setShowPantry] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const userInfo = getCurrentUser();
    if (userInfo) {
      setIsLoggedIn(true);
      setUser(userInfo);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setUser(getCurrentUser());
  };

  const handleBackClick = () => {
    setShowPantry(false);
  };

  const handlePantryClick = () => {
    setShowPantry(true);
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setUser(null);
  };

  // Render different components based on authentication state
  return (
    <>
      {!isLoggedIn ? (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      ) : showPantry ? (
        <Pantry user={user} onBackClick={handleBackClick} />
      ) : (
        <App onPantryClick={handlePantryClick} onLogout={handleLogout} />
      )}
    </>
  );
}

const entryPoint = document.getElementById("root");
ReactDOM.createRoot(entryPoint).render(<Main />);