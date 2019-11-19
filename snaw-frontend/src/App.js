import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <b>Soundscape Noise Analysis Workbench</b>
        </p>
        <div> 
          <p>
            Drag and drop files here, or click to select files
          </p>
        </div>
        <div> 
          <p>
            Analyze
          </p>
        </div>
      </header>
    </div>
  );
}

export default App;