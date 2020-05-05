import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Menu  from './components/Menu';
import LoginButton  from './components/LoginButton';
import StirlandsHelper from './StirlandsHelper'
import { Backdrop, CircularProgress, CssBaseline, AppBar, Typography, IconButton, Toolbar, ThemeProvider} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { blue, pink } from '@material-ui/core/colors'

const muiTheme = createMuiTheme({
  palette: {
  	primary: {
  		main: blue[700],
	  },
	  secondary: {
		main: pink[500]
	  },
  },
});

const styles = (theme = muiTheme) => {
	return {
		root: {
			background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
			border: 0,
			borderRadius: 3,
			boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
			color: 'black',
			height: 48,
			padding: '0 30px',
			display: 'grid',
			gridAutoFlow: 'column'
		},
		backdrop: {
			zIndex: 100,
			color: '#999'
		},
		baseGrid: {
			backgroundColor: 'rgb(100, 100, 100)',
			display: 'grid',
			gridTemplateColumns: '1fr 3fr'
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			flexGrow: 1,
		}
	}
}

class App extends Component {

	constructor(props) {
		super(props);
		this.handleDrawerState = this.handleDrawerState.bind(this);
		this.logout = this.logout.bind(this);
	}
	
	state = {
		isAuthenticated: null,
		user: null,
		open: true,
		drawerOpen: false,
	}

	async componentDidMount(){
		let auth;
		await StirlandsHelper.checkAuthentication().then(resp => {
			console.log(resp);
			auth = resp;
		});
		console.log(auth)
		this.setState({ isAuthenticated: auth.result.isAuthenticated, user: auth.result.user })
	}

	handleDrawerState(){
		this.setState({ drawerOpen: !this.state.drawerOpen });
	}

	logout() {
		StirlandsHelper.ajaxPost("logout", new FormData()).then(resolved => resolved);
		this.forceUpdate();
	}

	render() {
		const { classes } = this.props;
		const handleClose = () => {
			this.setState({ open: false});
		};

		if (this.state.isAuthenticated === null){
			return (
				<Backdrop className={classes.backdrop} open={ this.state.open } onClick={handleClose}>
					<CircularProgress color="inherit" />
				</Backdrop>
			)
		} else {
			console.log(muiTheme.palette.primary)
			return (
				<CssBaseline>
					<ThemeProvider theme={muiTheme}>
						<Router>
							<AppBar position="static">
								<Toolbar>
									<IconButton className={classes.menuButton} edge="start" color="inherit" aria-label="menu"  onClick={this.handleDrawerState} >
										<MenuIcon />
									</IconButton>
									<Typography className={classes.title} variant="h6"> Stirlands Cricket Club </Typography>
									<LoginButton  logout={this.logout} isAuthenticated={ this.state.isAuthenticated } user={ this.state.user } />
								</Toolbar>
							</AppBar>
							<div className="rootGrid">
								<Menu  drawerOpen={this.state.drawerOpen} drawerTrigger={this.handleDrawerState} className={classes.root} isAuthenticated={this.state.isAuthenticated} user={this.state.user}/>
							</div>
						</Router>
					</ThemeProvider>
				</CssBaseline>
			);
		}
  }
}

export default withStyles(styles)(App)
