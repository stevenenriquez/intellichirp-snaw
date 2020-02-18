import React from 'react';
import axios from 'axios';
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
    this.setState(this.state.selectedFile)
  };

  /*-----------------------------------------------------/
   * Function [Event Handler]: submitHandler
   *-----------------------------------------------------/
   * This function handles the "Submit" button on the web app.
   * The function will check if the current state contains files.
   * If there are none, then the function will preventDefualting
   * for the Form, and call a re-render. Once files have been added,
   * this function will set filesInserted = true, which is sent to the
   * AnalyzeButton.js The page then force updates, which allows
   * the "Analyze" button to be shown in green and active.
   *-----------------------------------------------------*/
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
                Click the Upload button to select files. <br/><br/> Selected Files: <br/><br/>
                {this.state.selectedFile.map(function(file, index) {
                  return <li key={index}>{file.name}</li>
                })}
                <br/>
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