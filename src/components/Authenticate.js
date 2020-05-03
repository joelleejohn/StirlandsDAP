import React, { Component } from 'react';
import logo from '../logo.svg';

export default class Authenticate extends Component {


	render() {
		console.log('Called Authenticate Render')
		return this.props.isAuthenticated ? (
			<div>Not Authenticated</div>
		) : (
			<div>Authenticated</div>
		);
	}
}