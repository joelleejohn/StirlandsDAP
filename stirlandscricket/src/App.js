import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
  } from "react-router-dom";
import logo from './logo.svg';
import Menu from './components/Menu';
import Home from './pages/Home';
import './App.css';

export default class App extends Component {
	
	constructor(){
		super();
		this.state = { userroles: undefined };
	}

	async componentDidMount(){
	}

	render() {
		return (
			<Menu />
		);
  }
}
