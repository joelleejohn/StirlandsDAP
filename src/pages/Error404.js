import React, { Component } from 'react';
import { Typography, Paper, Card } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core';

class Error404 extends Component {
	static styles = {
		root: {
			placeSelf: 'center',
			alignSelf: 'center',
			alignItems: 'center',
			placeItems: 'center',
			display: 'grid',
			gridAutoRows: '4rem',
			width: 'calc(100% - 65%)',
			marginLeft: 'calc(100% - 75%)',
			padding: '10px',
		}
	}

    render() {
		const classes = this.props.classes;
		console.log(this.props.location);
		return (
			<Paper className={classes.root}>
				<Typography variant="h4" component="p">Uh oh! The page: {this.props.location.pathname} doesn't exist!</Typography>
				<Typography variant="caption" component="p">Please use the menu to navigate to a page that does!</Typography>
			</Paper>
		);
    }
}

export default withRouter(withStyles(Error404.styles)(Error404))