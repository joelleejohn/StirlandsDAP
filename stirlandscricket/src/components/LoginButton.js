import { ExitToApp } from '@material-ui/icons';
import React, { Component } from 'react';
import { Link, withRouter, Router } from 'react-router-dom';
import { withStyles, withTheme } from '@material-ui/core/styles';
import { Typography, Paper, IconButton, Button } from '@material-ui/core';
import StirlandsHelper from '../StirlandsHelper';

class LoginButton extends Component {
	state = {
		isLoggedIn: this.props.isAuthenticated,
		user: this.props.user
	}


	static style = theme =>  {
		return {
		
			loginButton: {
				color: theme.palette.secondary.contrastText,
				backgroundColor: theme.palette.secondary.main,
			},
			loggedInText: {
				maxWidth: '100%',
				color: theme.palette.secondary.contrastText,
			},
			paper: {
				backgroundColor: theme.palette.secondary.main,
				height: '2rem',
				width: '14rem',
				placeContent: 'center',
				alignContent: 'center',
				alignItems: 'center',
				display: 'grid',
				gridAutoFlow: 'column',
			}
		}
	}

	render(){
		let render;
		const { classes } = this.props;

		if (this.state.isLoggedIn){
			render = (
				<Paper className={classes.paper} elevation={3}>
					<Typography component="span" className={classes.loggedInText}>Logged in as { this.state.user.username }</Typography>
					<IconButton component={Link} to="/" onClick={this.props.logout}>
						<ExitToApp />
					</IconButton>
				</Paper>
			)
		} else {
			render = (
				<div>
					<Link to="/login" className={ classes.lb }>
						<Button className={ classes.loginButton }>
							login
						</Button>
					</Link>
				</div>
			)
		}
		return render;
	}
}

export default withTheme(withStyles(LoginButton.style)(LoginButton));
