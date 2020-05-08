import React, { Component } from 'react';
import * as Icons from '@material-ui/icons';
import { Typography, Button, Paper, CardActions, Card, Modal, FormControl, TextField} from '@material-ui/core';
import MaterialTable  from 'material-table';
import { withStyles } from '@material-ui/styles';
import { Autocomplete } from '@material-ui/lab';
import StirlandsHelper from '../StirlandsHelper';

class DataGrid extends Component {

	constructor(props){
		super(props);
		this.handleSelection = this.handleSelection.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.getFormDetails = this.getFormDetails.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	static styles = {
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
		},
		modalForm: {
			display: 'grid',
			position: 'absolute',
			left: '30%',
			top: '50%',
			transform: 'translate(50%, -50%)',
			minHeight: '50%',
			minWidth: '400px',
			padding: '1rem',
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
		player: {
			firstname: null,
			lastname: null,
			locationid: null,
			teamid: null,
		},
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
		this.setState({ isOpenDelete: !this.state.isOpenDelete });
	}

	handleEdit(){
		const newState = !this.state.isOpenEdit;
		this.setState({ isOpenEdit: newState });
	}

	handleAdd(){
		const newState = !this.state.isOpenAdd;
		this.setState({ isOpenAdd: newState });
	}

	componentDidUpdate(){
		
		console.log('triggered update')
		console.log(this.state)
	}

	handleInputChange(event, prefix) {
		const target = event.target;
		const value = target.name.startsWith('is') ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}


	getFormDetails(method){
		let formData = new FormData();
		Object.keys(this.state.player).forEach(key => formData.append(key, this.state[key]));
		StirlandsHelper.ajaxPost(method, formData).then(this.props.refreshData);
	}

	async componentDidMount(){
		let { locationData, teamData, playerData } = this.state;

		if (this.state.selected[0] && !this.state.playerData) {
			let formData = new FormData();
			formData.append("playerid", this.state.selected[0])
			await StirlandsHelper.ajaxPost("getPlayer", formData).then(resp => {
				console.log(resp)
			playerData = resp.result[0]});
		}
		if (!this.state.locationData || !this.state.teamData){

			await StirlandsHelper.ajaxPost("locations", new FormData()).then(resp => locationData = resp.result);
			await StirlandsHelper.ajaxPost("teams", new FormData()).then(resp => teamData = resp.result);
		}



		this.setState({ locationData, teamData, playerData });
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
				console.log(col.icon)
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
				console.log(this.state)
				let diableDelete = this.state.selected.length < 1;
				let diableEdit = this.state.selected.length !== 1;
				let disableAdd = this.state.selected.length !== 0;
				
				const Form = () =>{
					if (this.state.isOpenAdd) {
						console.log('state in render');
						console.log(this.state);
					return (
							<Modal open={this.state.isOpenAdd} onClose={(event) => this.handleEdit()}>
								<Card className={classes.modalForm}>
									<FormControl>
										<TextField
											label="First Name"
											value={this.state.player?.firstname}
											id="firstname" name="firstname" placeholder="Enter first name"
											onBlur={(event) =>  this.handleInputChange(event)}
										/>
									</FormControl>
									<FormControl>
										<TextField
											label="Last Name"
											value={this.state.player?.lastname}
											id="lastname" name="lastname" placeholder="Enter last name"
											onBlur={(event) =>  this.handleInputChange(event)}
										/>
									</FormControl>
									<Autocomplete 
										options={this.state.teamData}
										id="locationid"
										name="locationid"
										value={this.state.playerData?.locationname}
										renderInput={(params) => <TextField {...params} label="Team" variant="outlined"/>}
										getOptionLabel={(option) => option.teamname }
										onChange={(event, data) => this.handleInputChange()}
									/>
									<Autocomplete 
										options={this.state.locationData}
										id="locationid"
										name="locationid"
										renderInput={(params) => <TextField {...params} label="Location" variant="outlined"/>}
										getOptionLabel={(option) => option.locationname }
									/>
									<CardActions>
										<Button onClick={(event) => this.handleLoginClick(event)}>Login</Button>
									</CardActions>		
								</Card>
							</Modal>
						);
					} else if (this.state.isOpenEdit){
							return (
							<Modal open={this.state.isOpenAdd} onClose={(event) => this.handleEdit()}>
								<Card className={classes.modalForm}>
									<FormControl>
										<TextField
											label="First Name"
											value={this.state.player['firstname'] ? this.state.addPlayer["firstname"] : '' }
											id="firstname" name="firstname" placeholder="Enter first name"
											onChange={(event) =>  this.handleInputChange(event)}
										/>
									</FormControl>
									<FormControl>
										<TextField
											label="Last Name"
											value={this.state.addPlayer["lastname"] ? this.state.addPlayer["lastname"] : '' }
											id="lastname" name="lastname" placeholder="Enter last name"
											onChange={(event) =>  this.handleInputChange(event)}
										/>
									</FormControl>
									<Autocomplete 
										options={this.state.teamData}
										id="locationid"
										name="locationid"
										
										renderInput={(params) => <TextField {...params} label="Team" variant="outlined"/>}
										getOptionLabel={(option) => option.teamname }
									/>
									<Autocomplete 
										options={this.state.locationData}
										id="locationid"
										name="locationid"
										renderInput={(params) => <TextField {...params} label="Location" variant="outlined"/>}
										getOptionLabel={(option) => option.locationname }
									/>
									<CardActions>
										<Button onClick={(event) => this.handleLoginClick(event)}>Login</Button>
									</CardActions>		
								</Card>
							</Modal>
						);
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

export default withStyles(DataGrid.styles)(DataGrid)