import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link as RouterLink, Redirect } from "react-router-dom";
import './styles.css'
import Home from '../pages/Home';
import { MenuBook, Menu as MenuIcon } from '@material-ui/icons';
import { Button, Link, Paper, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
import useStyles from '../components/styles';
import Drawer from '@material-ui/core/Drawer';
import LoginButton from '../components/LoginButton';
import Authenticate from "./Authenticate";
import Login from "../pages/Login";

export default class Menu extends Component {

	state = {
		isAuthenticated: this.props.isAuthenticated,
		user: this.props.user,
		drawerOpen: true,
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

	  toggleDrawer = () => {
		  this.setState({ drawerOpen: !this.state.drawerOpen})
	  }


	render(){

		function ListItemLink (props){
			const { icon, primary, to, onClick } = props;

			  const CustomLink = React.useMemo(
				() =>
				React.forwardRef((linkProps, ref) => (
					<RouterLink ref={ref} to={to} {...linkProps} />
				)),
				[to],
			);
			
			return (
				<li onClick={onClick}>
					<ListItem component={CustomLink}>
						{icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
						<ListItemText primary={primary} />
					</ListItem>
				</li>
			);
		}

		return (
			<Router>
				<div>
					<Drawer open={this.state.drawerOpen}>
						<Paper elevation={0}>
							<LoginButton isAuthenticated={ this.state.isAuthenticated } user={ this.state.user } />
							<List>
								<ListItemLink primary="Home" to="/" icon={ <MenuIcon /> } onClick={this.toggleDrawer}/>
								<ListItemLink primary="Protected" to="/authenticate" icon={ <MenuBook /> } />
							</List>
						</Paper>
					</Drawer>
					<Switch>
						<Route exact path="/">
							<Home auth={{ isAuthenticated: this.state.isAuthenticated, user: this.state.user }}/>
						</Route>
						<this.ProtectedRoute path="/authenticate" isAuthenticated={this.state.isAuthenticated}>
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