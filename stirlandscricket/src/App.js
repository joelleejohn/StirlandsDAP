import React, { Component } from 'react';
import logo from './logo.svg';
import Menu from './components/Menu';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = { data: undefined };
  }

  async loadPlayers(){
    let formData = new FormData();
    formData.append('queryMethod', 'getAllPlayers');
    const resp = await fetch('http://localhost/StirlandsDAP/stirlandscricket/src/api/dbInferface.php', {  method: 'POST', body: formData}).then(response => {this.state.data = response; return response.json()}).then(data => console.log(data));
  }

  async componentDidMount(){
    await this.loadPlayers();
  }
  
  render() {
    return (
      <div className="App">
        <Menu />
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
}
export default App;
