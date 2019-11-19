import React from 'react';
import logo from './img/results_example.png';

function Results() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="Results-logo" alt="logo" />
        <p>
          <b>Results</b>
        </p>
      </header>
    </div>
  );
}

export default Results;