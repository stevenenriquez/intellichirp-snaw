import React from 'react';
import logo from './img/logo_small.png';
import './App.css';
import AnalyzeButton from './components/AnalyzeButton';
import ApplicationBar from "./components/ApplicationBar";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";

class App extends React.Component {


  constructor(props) {
    super(props);
    this.state = {selectedFile: [], filesInserted: false, fileCount: 0};
    this.submitHandler.bind(this)
  }

  fileSelectedHandler = event => {
    event.preventDefault();
    this.state.selectedFile = Array.from(event.target.files);
    this.state.fileCount += this.state.selectedFile.length;
  };

 submitHandler = event =>{
     if(this.state.fileCount == 0) {
         event.preventDefault();
         this.render();
     }
     else{
        this.state.filesInserted = true;
        this.state.fileCount = 0;
        this.forceUpdate();

     }
 }

  render() {
    return (
      <div className="App">
        <ApplicationBar/>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <p>
            <b>Soundscape Noise Analysis Workbench</b>
          </p>
          <br/>
          <form action="/uploader" method="POST"
                encType="multipart/form-data">
            <label htmlFor='my-input'>
                <Button variant="outlined" color='#3f5a14' component='span'>
                    Upload Audio File
                </Button>
            </label>
            <input id="my-input" aria-describedby="my-helper-text" type='file' multiple={true} onChange={this.fileSelectedHandler} name='file' style={{display: 'none'}}/>
            <FormHelperText id="my-helper-text">
                Drag and drop WAV files here, or click the Upload button to select file/s.
            </FormHelperText>
              <label htmlFor='my-submit'>
                  <input id='my-submit' type='submit' style={{display: 'none'}}/>

                  <Button variant="contained" backgroundColor='#3f5a14'onClick={this.submitHandler} component='span'>
                      Submit
                  </Button>
              </label>
          </form>
            <br/>
          {<AnalyzeButton bool={this.state.filesInserted}/>}
          {this.state.filesInserted = false}
        </header>
      </div>
    );
  }
}

export default App;