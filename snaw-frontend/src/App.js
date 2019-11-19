import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import AnalyzeButton from './components/AnalyzeButton';
import UploadButton from './components/UploadButton';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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