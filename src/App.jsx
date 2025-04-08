import React from 'react';
import Examples from './components/Examples.jsx';
import Header from './components/Header/Header.jsx';
import CoreConcepts from './components/CoreConcepts.jsx';
import { logout } from './services/authService';

function App({ onPantryClick, onLogout }) {
  return (
    <>
      <Header onPantryClick={onPantryClick} onLogout={onLogout} />
      <main>
        <CoreConcepts />
        <Examples />
      </main>
    </>
  );
}

export default App;