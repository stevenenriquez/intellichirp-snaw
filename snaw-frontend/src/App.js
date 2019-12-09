import React from 'react';
import logo from './img/logo_small.png';
import './App.css';
import AnalyzeButton from './components/AnalyzeButton';
import UploadButton from './components/UploadButton';

function App() {

  var randomNum = Math.floor(Math.random() * 5);
  var spectroImg = new Image();
  var analysisImg = new Image();
  spectroImg.src = 'data:image/png;base64,'+window.spectroImg;
  analysisImg.src = 'data:image/png;base64,'+window.analysisImg;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p> Spectrogram: </p>
        <p> <img src={spectroImg.src}/></p>
        <p> CityNet Analysis </p>
        <p> <img src = {analysisImg.src}/></p>
         <p> <b>Soundscape Noise Analysis Workbench</b></p>
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