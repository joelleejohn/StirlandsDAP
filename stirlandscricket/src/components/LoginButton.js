import { Button } from '@material-ui/core';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';

class LoginButton extends Component {
	state = {
		isLoggedIn: this.props.isAuthenticated,
		user: this.props.user
	}


	static style = {
		
		lb: {
			color: "rgba(255, 255, 255, 1)",
			backgroundColor: "rgba(0, 0, 0, 0.7)",
		},
		ltext: {
			maxWidth: '100%',
		}
	}

	render(){
		let render;

		if (this.state.isLoggedIn){
			render = (
				<h3 className={LoginButton.style.ltext}>Welcome to Stirlands, { this.state.user.username }</h3>
			)
		} else {
			render = (
				<div>
					<Link to="/login" style={ LoginButton.style.lb }>
						<Button style={this.style}>
							login
						</Button>
					</Link>
				</div>
			)
		}
		return render;
	}
}

export default withRouter(withStyles(LoginButton.style)(LoginButton));
