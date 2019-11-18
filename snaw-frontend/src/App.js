import React from 'react';
import logo from './logo_small.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Soundscape Noise Analysis Workbench
        </p>
        <a
          className="App-link"
          href="https://soundscapes2landscapes.org/about/soundscapes"
          target="_blank"
          rel="noopener noreferrer"
        >
          Soundscapes2Landscapes
        </a>
      </header>
    </div>
  );
}

export default App;
