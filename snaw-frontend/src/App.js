import React from 'react';
import axios from 'axios';
import logo from './img/logo_small.png';
import './App.css';
import AnalyzeButton from './components/AnalyzeButton';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {selectedFile: []}
  }

  fileSelectedHandler = event => {
    event.preventDefault()
    let file = event.target.files[0];
    this.state.selectedFile.push(file)
  }

  fileUploadHandler = () => {
    const fData = new FormData();
    fData.append('file', this.state.selectedFile[0]);
    fData.append('filename', this.state.selectedFile[0].name);
    console.log(fData);
    axios({
      method: 'post',
      url: 'http://127.0.0.1:5000/upload',
      data: fData,
    })
      .then(response => console.log(response))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            <b>Soundscape Noise Analysis Workbench</b>
          </p>
          <br/>
          <form action="http://127.0.0.1:5000/upload" method="post">
            <div> 
              Drag and drop WAV files here, or click the Upload button to select file/s. <br/>
              {/* Choose file/s */}
              <input type="file" accept="audio/wav" onChange={this.fileSelectedHandler} />
              {/* Upload file/s */}
              <button onClick={this.fileUploadHandler}>Upload</button>
              <br/><br/>
            </div>
          </form>
          <div> 
            <AnalyzeButton/>
          </div>
        </header>
      </div>
    );
  }
}

export default App;