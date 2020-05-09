import React, { Component } from "react";
import { Switch, Route, Link as RouterLink, Redirect, withRouter } from "react-router-dom";
import Home from '../pages/Home';
import * as Icons from '@material-ui/icons';
import { MenuBook, Menu as MenuIcon } from '@material-ui/icons';
import { Button, Paper, List, ListItem, ListItemText, ListItemIcon, withTheme, withStyles } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Login from "../pages/Login";
import Error404 from "../pages/Error404";

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
			},
			error404: {
				placeSelf: 'center',
				alignSelf: 'center',
				display: 'grid',
				gridAutoRows: '4rem',
				width: '40%',

			}
    	}
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
		const getIcon = (iconName) => Object.entries(Icons).find(([name, exported]) => name.toLowerCase() === iconName)[1];
		const  { history, classes } = this.props;

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
							<ListItemLink primary="Home" to="/players" icon={ < Icons.PlayArrow />}/>
							{
								this.state.pages.map(page => {
									const Icon = getIcon(page.icon);
									return <ListItemLink key={page.route} primary={page.title} to={page.route} icon={ <Icon /> } onClick={this.props.drawerTrigger}/>
								})
							}
						</List>
					</Paper>
				</Drawer>
				<Switch>
					<Route exact path="/">
						<Redirect to="/players"/>
					</Route>
					<Route path="/players">
						<Home query="getPlayers" title="Players" auth={{ isAuthenticated: this.state.isAuthenticated, user: this.state.user }}/>
					</Route>
					<Route exact path="/login">
						<Login/>
					</Route>
					<Route path="*">
						<Error404 className={classes.error404}/>	
					</Route>
				</Switch>
			</div>
		);
	}
}

export default withRouter(withTheme(withStyles(Menu.style)(Menu)))