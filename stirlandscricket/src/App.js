import React, { Component } from 'react';
import Menu from './components/Menu';
import useStyles from './components/styles';
import StirlandsHelper from './StirlandsHelper'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import './App.css';
import { withStyles } from '@material-ui/styles';

class App extends Component {

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
		open: true
	}

	async componentDidMount(){
		let auth = await StirlandsHelper.checkAuthentication().then(resp => resp);
		this.setState({ isAuthenticated: auth.result.isAuthenticated, user: auth.result.user })
	}

	render() {

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
				<div class="rootGrid">
					<Menu className={App.styles.root} isAuthenticated={this.state.isAuthenticated} user={this.state.user}/>
				</div>
			);
		}
  }
}

export default withStyles(App.styles)(App)
