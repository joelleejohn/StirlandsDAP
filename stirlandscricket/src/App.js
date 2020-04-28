import React, { Component } from 'react';
import Menu from './components/Menu';
import useStyles from './components/styles';
import StirlandsHelper from './StirlandsHelper'
import Backdrop from '@material-ui/core/Backdrop'
import {CircularProgress, CssBaseline, Button} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import './App.css';
import { withStyles } from '@material-ui/styles';

class App extends Component {

	  constructor(props) {
	  	super(props);
	  	this.handleDrawerState = this.handleDrawerState.bind(this);
	  }

	static styles = {
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
		}

	}
	
	state = {
		isAuthenticated: null,
		user: null,
		open: true,
		drawerOpen: false,
	}

	async componentDidMount(){
		let auth = await StirlandsHelper.checkAuthentication();
		this.setState({ isAuthenticated: auth.result.isAuthenticated, user: auth.result.user })
	}

	handleDrawerState(){
		console.log('handleDrawerState called');
		this.setState({ drawerOpen: !this.state.drawerOpen });
	}

	render() {
		console.log('App rendered')
		const handleClose = () => {
			this.setState({ open: false});
		};

		if (this.state.isAuthenticated === null){
			return (
				<Backdrop className={App.styles.backdrop} open={ this.state.open } onClick={handleClose}>
					<CircularProgress color="inherit" />
				</Backdrop>
			)
		} else {

			return (
				<CssBaseline>
					<div className="rootGrid">
						<Button variant="contained" startIcon={<MenuIcon />} id="menuButton" onClick={this.handleDrawerState}>Menu</Button>
						<Menu  drawerOpen={this.state.drawerOpen} drawerTrigger={this.handleDrawerState} className={App.styles.root} isAuthenticated={this.state.isAuthenticated} user={this.state.user}/>
					</div>
				</CssBaseline>
			);
		}
  }
}

export default withStyles(App.styles)(App)
