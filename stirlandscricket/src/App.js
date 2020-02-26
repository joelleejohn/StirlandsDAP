import React from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';

function App() {
  let formData = new FormData();
  formData.append('queryMethod', 'getAllPlayers');
  $.ajax({
    type: 'POST',
    url: '../src/api/dbInferface.php',
    processData: false,
    contentType: false,
    dataType: 'json',
    data: formData,
    success: function(data){
        console.log(data);
    }
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
