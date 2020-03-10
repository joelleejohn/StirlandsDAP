import React, { Component } from 'react';
import logo from './logo.svg';
import Menu from './components/Menu';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = { userroles: undefined };
  }

  async loadPlayers(){
    let formData = new FormData();
    formData.append('queryMethod', 'getAllPlayers');
    await fetch('http://localhost:8012/StirlandsDAP/stirlandscricket/src/api/dbInferface.php', {  method: 'POST', body: formData})
                  .then(async (response) => {this.setState({userroles: (await response.json()).data})});
  }

  async componentDidMount(){
    console.log(this.state.userroles);
    (await this.loadPlayers());
    console.log('After await:');
    console.log(this.state.userroles);
  }

  render() {
    let items = [];
    console.log('in render:');
    console.log(this.state.userroles);
    if (this.state.userroles)
      this.state.userroles.forEach(item => items.push(<p>{item.rfuserrole}</p>));
    return (
      <div className="App">
        <Menu />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {items}
        </header>
      </div>
    );
  }
}
export default App;
