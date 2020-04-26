import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import './styles.css'
import Home from '../pages/Home';
import StirlandsHelper from '../StirlandsHelper';

import Authenticate from "./Authenticate";
import Login from "../pages/Login";

export default class Menu extends Component {
	
	constructor(){
		super();
		this.state = {currentPage: '', isAuthenticated: null};
		
	}

	isAuthenticated = false;

	async componentDidMount(){
		console.log('Mounted Menu')
		console.log(this.state)
		this.isAuthenticated = StirlandsHelper.checkAuthentication();
	}

	ProtectedRoute({ children, isAuthenticated, ...rest }) {	
		return (
		  <Route
			{...rest}
			render={ ({location}) =>
			  isAuthenticated ?	(children) : (
				<Redirect
				  to={{
					pathname: "/login",
					state: { from: location }
				  }}
				/>
			  )
			}
		  />
		);
	  }


	render(){
		return (
			<Router>
				<div>
					<nav>
						<ul>
							<li>
								<Link to="/">Home</Link>
							</li>
							<li>
								<Link to="/authenticate">Protected</Link>
							</li>
							<li>
								<Link to="/login">Login</Link>
							</li>
						</ul>
					</nav>
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<this.ProtectedRoute path="/authenticate" isAuthenticated={this.isAuthenticated}>
							<Authenticate />
						</this.ProtectedRoute>
						<Route exact path="/login">
							<Login/>
						</Route>
					</Switch>
				</div>
			</Router>
		);
	}
}