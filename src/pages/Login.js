import React, { Component } from 'react';
import { TextField, FormControl, Card, CardActions, CardContent } from '@material-ui/core';
import { Container, Button, withStyles, withTheme } from '@material-ui/core';
import StirlandsHelper from '../StirlandsHelper';
import { Router, Redirect, useHistory, withRouter } from 'react-router-dom';

class Login extends Component {

	constructor(){
		super();
		this.handleLoginClick = this.handleLoginClick.bind(this);
	}

	state = { 
		username: null, 
		password: null, 
		isLoggedIn: false, 
	}

	static style = theme => {
		return {
			grid: {
				display: 'grid',
				placeContent: 'center',
				placeSelf: 'center',
				height: '100%',
				width: '100%',
			},
			form: {
				display: 'grid',
				gridAutoFlow: 'row',
				gap: '1.5rem',
				height: 'min-content',
			},
			loginButton: {
				padding: '5px',
				borderRadius: '5px', 
			},
			formControl: {
				padding: '2rem',
				borderRadius: '5px',
			},
			inputLabel: {
				fontSize: '1.2rem'
			}
		}
	}

	async componentDidMount(){
		let auth;
		await StirlandsHelper.checkAuthentication().then(resp =>{
			console.log(resp);
			auth = resp;
		});
		
		this.setState({isLoggedIn: auth.result.isAuthenticated});
	}

	handleLoginClick(event){
		let formData = new FormData();
		Object.keys(this.state).forEach(key => formData.append(key, this.state[key]));

		let resp = StirlandsHelper.ajaxPost("login", formData);
		resp.then(r => this.setState({ isLoggedIn: r.result.isAuthenticated }));
	}

	render() {
		const { history, classes } = this.props;

		if (this.state.isLoggedIn)
			history.push("/");

		const inputProps = {
			step: 300,
			className: classes.formControl
		}

		const labelProps = {
			className: classes.inputLabel,
			required: true,
			color: 'primary',
		}


		return (
			<Container className={classes.grid}>
				<Card>
					<CardContent>
						<form className={classes.form}>
							<FormControl>
								< TextField InputLabelProps={labelProps} label="Username" inputProps={inputProps} className={classes.formControl} id = "username" name = "usernmae" placeholder="Enter Username" onChange = { (event) => { this.setState({ username: event.target.value }) }} />
							</FormControl>
							<FormControl>
								<TextField InputLabelProps={labelProps} label="Password" inputProps={inputProps} className={classes.formControl} id="password" name="password" type="password" placeholder="Enter password here" onChange={(event) =>  this.setState({password: event.target.value})}/>
							</FormControl>
							<FormControl >
							</FormControl>
						</form>
					</CardContent>
					<CardActions>
						<Button className={classes.loginButton} onClick={(event) => this.handleLoginClick(event)}>Login</Button>
					</CardActions>
				</Card>
			</Container>
		);
	}
}

export default withRouter(withTheme(withStyles(Login.style)(Login)));