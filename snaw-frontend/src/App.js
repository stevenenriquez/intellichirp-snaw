import React from 'react';
import logo from './img/logo_small.png';
import './App.css';
import AnalyzeButton from './components/AnalyzeButton';
import UploadButton from './components/UploadButton';

function App() {

  var randomNum = Math.floor(Math.random() * 5);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        //First we test a string from the flask back-end.
        <p>Token received from Backend = {window.token}</p>
        //We then will test receiving an array from the back-end and display its positions.
        <p>Test information array [1, 2, 3, 4, 5]  at position {randomNum} = {window.array[randomNum]}</p>
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