import React, { Component } from 'react';
import * as Icons from '@material-ui/icons';
import { withTheme, Typography, Switch, Button, Paper, CardActions, Card, Modal, FormControl, TextField, FormControlLabel } from '@material-ui/core';
import MaterialTable  from 'material-table';
import { withStyles } from '@material-ui/styles';
import { Autocomplete } from '@material-ui/lab';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import StirlandsHelper from '../StirlandsHelper';
import MaterialForm from '../components/MaterialForm';

class DataGrid extends Component {

	constructor(props){
		super(props);
		this.handleSelection = this.handleSelection.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.reset = this.reset.bind(this);
	}

	static styles = (theme) =>{ 
		return {
			noData: {
				position: 'absolute',
				fontSize: '20px',
				display: 'grid',
				alignItems: 'center',
				alignContent: 'center',
				justifyContent: 'center',
				placeContent: 'center',
			},
			form: {
				display: 'grid'
			}
		}
	}


    state = {
		data: this.props.data,
		columns: this.props.columns,
		sort: this.props.sort,
		user: this.props.user,
		selected: [],
		isOpenAdd: false,
		isOpenEdit: false,
		isOpenDelete: false,
		editPlayer: null,
		deletePlayer: [],
		locationData: null,
		teamData: null,
		playerData: null,
	}

	handleSelection(newSelection) {
		this.setState({ selected: newSelection, playerData: newSelection[0]});
	}

	handleDelete(selected){
		this.state.selected.forEach(row => {
			const formData = new FormData();
			formData.append('playerid', row.playerid);
			StirlandsHelper.ajaxPost('deletePlayer', formData);
		});
		this.props.refreshData();
	}

	handleEdit(){
		const newState = !this.state.isOpenEdit;
		this.setState({ isOpenEdit: newState, playerData: newState ? this.state.selected[0]: null});
	}

	handleAdd(){
		const newState = !this.state.isOpenAdd;
		this.setState({ isOpenAdd: newState });
	}

	reset(){
		this.props.refreshData();
		this.setState({ isOpenAdd: false, isOpenEdit: false, isOpenDelete: false})
	}

	async componentDidMount(){
		let { locationData, teamData } = this.state;

		if (!this.state.locationData || !this.state.teamData){

			await StirlandsHelper.ajaxPost("locations", new FormData()).then(resp => locationData = resp.result);
			await StirlandsHelper.ajaxPost("teams", new FormData()).then(resp => teamData = resp.result);
		}



		this.setState({ locationData, teamData });
	}

    render() {

		const classes = this.props.classes;

		if (this.state.data === undefined || this.state.columns === undefined){
			return (
				<Paper className={classes.noData}>
					<Typography>No data has been found!</Typography>
				</Paper>
			);
		} else {
			const data = this.state.data;
			const columns = this.state.columns.map((col) => {
				let Icon;
				try {

					 Icon = Object.entries(Icons).find(([name, exported]) => name.toLowerCase() === col.icon)[1]
				} catch {
					Icon = Icons.Help
				}
				function iconRender(rowData, iconToRender){
					return rowData[col.key] === 1 ? <Icon /> : null

				}

				let colConv = { 
					field: col.key,
					headerStyle: { textAlign: (col.datatype === 'numeric' || col.datatype === 'icon') ? "center" : "left" },
					title: <span className="columnHeader" ><Icon />{col.displayName}</span>,
					...((col.datatype !== null && col.datatype !== 'icon') && { type: col.datatype }),
					...(col.datatype === 'icon' && { type: 'boolean', render: rowData =>  iconRender(rowData, col.icon)}),
					...(col.sort !== null && { defaultSort: col.sort === 1 ? 'asc' : 'desc' }),
					...((col.key.endsWith('id') || col?.isHidden) && { hidden: true } ),
					...((col.datatype === 'numeric' || col.datatype === 'icon') && { cellStyle: { textAlign: 'center' } }),
				} 
				return colConv; 
			});

			// Only allow editing if user is an administrator
			if (this.state.user?.rfuserrole === 'Administrator'){
				let diableDelete = this.state.selected.length < 1;
				let diableEdit = this.state.selected.length !== 1;
				let disableAdd = this.state.selected.length !== 0;

				const Form = ( props ) => {
					if (this.state.isOpenAdd) {
						return <MaterialForm handleClose={() => this.handleAdd()} isOpen={true} player={null} isAdd locationData={this.state.locationData} teamData={this.state.teamData}/>
						
					} else if (this.state.isOpenEdit){
						console.log(this.state.selected[0])
						return <MaterialForm handleClose={() => this.handleEdit()} isOpen={true} player={this.state.selected[0]} locationData={this.state.locationData} teamData={this.state.teamData}/>

					} else return null;
				}
				
				return (
					<div>
						<MaterialTable 
							columns={columns}
							data={data}
							title={this.props.title}
							sortable
							onSelectionChange={ row => this.handleSelection(row)}
							options={{ selection: true, pageSize: 10}}
							actions={[
								{
									tooltip: 'Add a new record',
									icon: 'add',
									disabled: disableAdd,
									isFreeAction: true,
									onClick: (event, rows) => this.handleAdd()
								},
								{
									tooltip: 'Edit the selected row',
									icon: 'edit',
									disabled: diableEdit,
									onClick: (event, rows) => this.handleEdit(rows)
								},
								{
									tooltip: 'Delete Selected row(s)',
									icon: 'delete',
									disabled: diableDelete,
									onClick: (event, rows) => this.handleDelete(rows)
								},
							]}
						/>
						<Form />
					</div>
				);
			} else {
				return (
					<MaterialTable
						columns={columns}
						data={data}
						title={this.props.title}
						sortable
						options={{pageSize: 10}}
					/>);
			}
		}
    }
}

export default withTheme(withStyles(DataGrid.styles)(DataGrid))