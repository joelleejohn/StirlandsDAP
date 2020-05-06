import React, { Component } from "react";
import { Switch, Route, Link as RouterLink, Redirect, withRouter } from "react-router-dom";
import Page from '../pages/Page';
import { MenuBook, Menu as MenuIcon } from '@material-ui/icons';
import * as Icons from '@material-ui/icons';
import { Button, Paper, List, ListItem, ListItemText, ListItemIcon, withTheme, withStyles } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Authenticate from "./Authenticate";
import Login from "../pages/Login";

class Menu extends Component {

	constructor(props){
		super(props);
		this.toggleDrawer = this.toggleDrawer.bind(this);
	}

	state = {
		isAuthenticated: this.props.isAuthenticated,
		user: this.props.user,
		drawerOpen: this.props.drawerOpen,
		toggle: this.props.drawerTrigger,
		pages: this.props.pages,
	}

    static style = theme => {
    	return {
    		grid: {
    			placeSelf: 'center',
    			height: '100%',
    			width: '100%',
    		}
    	}
	}
	
	getIcon = (iconName) => Object.entries(Icons).find(([name, exported]) => name.toLowerCase() === iconName)[1]


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
		const  { history, classes } = this.props;
		const auth = {
			isAuthenticated: this.state.isAuthenticated,
			user: this.state.user
		};
		console.log('auth');
		console.log(auth);

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
			<div className={classes.grid}>
				<Drawer open={this.props.drawerOpen}>
					<Paper elevation={0}>
						<List>
							{ this.state.pages.forEach(page => {
								const ItemIcon = this.getIcon(page.icon);
								return <ListItemLink primary={page.displayName} to={page.route} icon={ ItemIcon } onClick={this.props.drawerTrigger} />

							})}
						</List>
					</Paper>
				</Drawer>
				<Switch>
					{ this.state.pages.forEach(page => {
						return (
							<Route>
								<Page query={page.query} auth={auth} filterFields={page.filterFields} formFields={page.formFields}/>
							</Route>
						);
					})}
					<Route exact path="/">
						<Page auth={auth}/>
					</Route>
					<Route exact path="/login">
						<Login/>
					</Route>
				</Switch>
			</div>
		);
	}
}

export default withRouter(withTheme(withStyles(Menu.style)(Menu)));