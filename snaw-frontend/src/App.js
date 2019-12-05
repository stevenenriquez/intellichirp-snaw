import React from 'react';
import logo from './img/logo_small.png';
import './App.css';
import AnalyzeButton from './components/AnalyzeButton';
import UploadButton from './components/UploadButton';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Token received from Backend = {window.token}</p>
        <p>Test information array [1, 2, 3, 4, 5]  at position 1 = {window.array[1]}</p>
        <p>
          <b>Soundscape Noise Analysis Workbench</b>
        </p>
        <br/>
        <div> 
          Drag and drop WAV files here, or click the Upload button to select file/s.
          <UploadButton/>
          <br/><br/>
        </div>
        <div> 
          <AnalyzeButton/>
        </div>
      </header>
    </div>
  );
}

export default App;