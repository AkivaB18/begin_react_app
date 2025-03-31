import React from 'react';
import Examples from './components/Examples.jsx';
import Header from './components/Header/Header.jsx';
import CoreConcepts from './components/CoreConcepts.jsx';

function App({ onPantryClick }) {
  return (
    <>
      <Header onPantryClick={onPantryClick} />
      <main>
        <CoreConcepts />
        <Examples />
      </main>
    </>
  );
}

export default App;