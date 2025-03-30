import React, { useState } from 'react';
import Examples from './components/Examples.jsx';
import Header from './components/Header/Header.jsx';
import CoreConcepts from './components/CoreConcepts.jsx';
import PantryItem from './components/PantryItem.jsx';

function App() {
  // Declare state for the list of pantry items and for the new item name

  return (
    <>
      <Header />
      <main>
        <CoreConcepts />
        <Examples />
        
      </main>
    </>
  );
}

export default App;
