import React, { Component } from 'react';
import logo from '../logo.svg';
import Menu from '../components/Menu';
import { Table, TableBody, TableCell, TableContainer, TableRow, TableHead, Paper } from '@material-ui/core';
import StirlandsHelper from '../StirlandsHelper';

export default class DataGrid extends Component {

	static style = {
		noData: {
			position: 'absolute',
			fontSize: '20px',
		}
	}

    state = {
		data: this.props.data,
		columns: this.props.columns,
		sort: this.props.sort,
    }

    componentDidMount(){
		console.log('mounted dataGrid');
		console.log(this.state)
    }

    render() {
		if (this.state.data === undefined || this.state.columns === undefined){
			return (
				<div className={DataGrid.style.noData}>HomePage: you are { this.state.isLoggedIn ? "logged in" : "not logged in" }</div>
			);
		} else {
			const data = this.state.data
			const columns = this.state.columns
			return (
				<TableContainer component={Paper}>
					<Table style={{minWidth: '650px'}}>
						<TableHead>
							<TableRow>
								{columns.map(col => (
									<TableCell key={ `col-${col.key}`} align="left">{col.displayName}</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{data.map(row => (
								<TableRow key={row.name}>
									{
										columns.map(col => (
											<TableCell component="th" scope="row" style={{minHeight: '100px', color: 'black'}}>{row[col.key]}</TableCell>	
										))
									}
								</TableRow>
							))}
						</TableBody>
					</Table> 
				</TableContainer>
			);
		}
    }
}