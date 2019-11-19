import React from 'react';
import logo from './img/results_example.png';

function Results() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <b>Results</b>
        </p>
        <img src={logo} className="Results-logo" alt="logo" />
      </header>
    </div>
  );
}

export default Results;