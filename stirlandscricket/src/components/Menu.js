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

	constructor(props){
		super(props);
		this.toggleDrawer = this.toggleDrawer.bind(this);
	}

	state = {
		isAuthenticated: this.props.isAuthenticated,
		user: this.props.user,
		drawerOpen: this.props.drawerOpen,
		toggle: this.props.drawerTrigger,
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

	toggleDrawer = () => this.props.drawerTrigger;

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
		console.log('Drawer state is');
		console.log(this.state.drawerOpen);
		console.log('Drawer props are');
		console.log(this.props.drawerTrigger);
		return (
			<Router>
				<div>
					<Drawer open={this.props.drawerOpen}>
						<Paper elevation={0}>
							<LoginButton isAuthenticated={ this.state.isAuthenticated } user={ this.state.user } />
							<List>
								<ListItemLink primary="Home" to="/" icon={ <MenuIcon /> } onClick={this.props.drawerTrigger}/>
								<ListItemLink primary="Protected" to="/authenticate" icon={ <MenuBook /> } onClick={this.props.drawerTrigger}/>
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