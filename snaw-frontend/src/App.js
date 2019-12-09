import React from 'react';
import logo from './img/logo_small.png';
import './App.css';
import AnalyzeButton from './components/AnalyzeButton';
import UploadButton from './components/UploadButton';
import ApplicationBar from "./components/ApplicationBar";

function App() {

  var spectroImg = new Image();
  var analysisImg = new Image();
  spectroImg.src = 'data:image/png;base64,'+window.spectroImg;
  analysisImg.src = 'data:image/png;base64,'+window.analysisImg;
  return (
    <div className="App">
      <ApplicationBar/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <p><b>Soundscape Noise Analysis Workbench</b></p>
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