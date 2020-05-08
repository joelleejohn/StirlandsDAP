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

class DataGrid extends Component {

	constructor(props){
		super(props);
		this.handleSelection = this.handleSelection.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.getFormDetails = this.getFormDetails.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleComboChange = this.handleComboChange.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
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
				gap: '1rem'
			},
			submit: {
				paddingTop: '10px',
				backgroundColor: theme.palette.secondary.main,
				color: theme.palette.secondary.contrastText
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
		dateregisteredraw: new moment(),
		dateofbirthraw: new moment(),
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

	handleInputChange(event, valueOverride) {
		const target = event.target;
		const value = target.name.startsWith('is') ? target.checked : target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
	}

	handleComboChange(event, data, fieldname) {
		const name = fieldname.substring(0, fieldname.length - 2)
		const nameVersion = name + 'name';
		this.setState({
			[fieldname] : data[fieldname],
			[nameVersion] : data[nameVersion],
			[name]: data
		});
	}

	handleDateChange(fieldName, selectedDate){
		const rawFieldName = `${fieldName}raw`;
		console.log(selectedDate.format('YYYY-MM-DD'))
		this.setState({ 
			[fieldName]: selectedDate.format('YYYY-MM-DD'),
			[rawFieldName]: selectedDate,					
		})
	}

	reset(){
		this.props.refreshData();
		this.setState({ isOpenAdd: false, isOpenEdit: false, isOpenDelete: false})
	}

	getFormDetails(method){
		let formData = new FormData();
		let player = {
			...{ playerid: this.state.playerid },
			...{ firstname: this.state.firstname },
			...{ lastname: this.state.lastname },
			...{ dateofbirth: this.state.dateofbirth },
			...{ dateregistered: this.state.dateregistered },
			...{ isactive: this.state.isactive },
			...{ iscaptain: this.state.iscaptain },
			...{ iscurrent: this.state.iscurrent },
			...{ homephone: this.state.homenumber },
			...{ phonenumber: this.state.phonenumber },
			...{ locationid: this.state.locationid },
			...{ teamid: this.state.teamid},

		}
		Object.keys(player).forEach(key => {
			let value = player[key];
			if (key.startsWith('is')){
				value = player[key] ? 1 : 0
			}
			if (key.endsWith('id') || key.endsWith('number')){
				value = parseInt(player[key])
			}
			formData.append(key, value)
		});

		StirlandsHelper.ajaxPost(method, formData);
		this.reset();
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
				
				const Form = () =>{
					if (this.state.isOpenAdd) {
					return (
							<Modal open={this.state.isOpenAdd} onClose={(event) => this.handleEdit()}>
								<Card className={classes.modalForm}>
									<MuiPickersUtilsProvider utils={MomentUtils}>
									<FormControl>
										<TextField
										required
											label="First Name"
											value={this.state?.firstname}
											id="firstname" name="firstname" placeholder="Enter first name"
											onBlur={(event) =>  this.handleInputChange(event)}
										/>
									</FormControl>
									<FormControl>
										<TextField
										required
											label="Last Name"
											defaultValue={this.state?.lastname}
											id="lastname" name="lastname" placeholder="Enter last name"
											onBlur={(event) =>  this.handleInputChange(event)}
										/>
									</FormControl>
									<FormControl>
										<TextField
										required
											label="Home Phone"
											defaultValue={this.state?.homenumber}
											id="homenumber" name="homenumber" type="tel" placeholder="Enter home phone number"
											onBlur={(event) =>  this.handleInputChange(event)}
										/>
									</FormControl>
									<FormControl>
										<TextField
										required
											label="Mobile"
											defaultValue={this.state?.phonenumber}
											id="phonenumber" name="phonenumber" type="tel" placeholder="Enter mobile phone number"
											onBlur={(event) =>  this.handleInputChange(event)}
										/>
									</FormControl>
									<Autocomplete 
										options={this.state.teamData}
										id="teamid"
										name="teamid"
										value={this.state?.team}
										renderInput={(params) => <TextField {...params} label="Team" variant="outlined"/>}
										getOptionLabel={(option) => option.teamname }
										onChange={(event, data) => this.handleComboChange(event, data, 'teamid')}
									/>
									<Autocomplete 
										options={this.state.locationData}
										id="locationid"
										name="locationid"
										value={this.state?.location}
										renderInput={(params) => <TextField {...params} label="Location" variant="outlined"/>}
										getOptionLabel={(option) => option.locationname }
										onChange={(event, data) => this.handleComboChange(event, data, 'locationid')}
									/>
										<DatePicker disableFuture format="DD-MM-YYYY" id="dateregistered" value={this.state.dateregisteredraw}name="dateregistered" label="Date Registered" onChange={(moment) => this.handleDateChange("dateregistered", moment)} />
										<DatePicker disableFuture format="DD-MM-YYYY" id="dateofbirth" value={this.state.dateofbirthraw} name="dateofbirth" label="D.O.B" onChange={(moment) => this.handleDateChange("dateofbirth", moment)} />
										<FormControlLabel label="Current Team" control={ <Switch color="secondary" checked={this.state.iscurrent} name="iscurrent" onChange={(event) => this.handleInputChange(event)} />}  />
										<FormControlLabel label="Active player" control={ <Switch color="secondary" checked={this.state.isactive} name="isactive" onChange={(event) => this.handleInputChange(event)} />}  />
										<FormControlLabel label="Team Captain" control={ <Switch color="primary" checked={this.state.iscaptain} name="iscaptain" onChange={(event) => this.handleInputChange(event)} />}  />
									<CardActions>
										<Button className={classes.submit} onClick={(event) => this.getFormDetails('addPlayer')}>Add</Button>
										<Button onClick={(event) => this.handleAdd()}>Close</Button>
									</CardActions>		
									</MuiPickersUtilsProvider>
								</Card>
							</Modal>
						);
					} else if (this.state.isOpenEdit){
					return (
							<Modal open={this.state.isOpenAdd} onClose={(event) => this.handleEdit()}>
								<Card className={classes.modalForm}>
									<MuiPickersUtilsProvider utils={MomentUtils}>
									<FormControl>
										<TextField
										required
											label="First Name"
											value={this.state?.playerData?.firstname}
											id="firstname" name="firstname" placeholder="Enter first name"
											onBlur={(event) =>  this.handleInputChange(event)}
										/>
									</FormControl>
									<FormControl>
										<TextField
										required
											label="Last Name"
											defaultValue={this.state?.lastname}
											id="lastname" name="lastname" placeholder="Enter last name"
											onBlur={(event) =>  this.handleInputChange(event)}
										/>
									</FormControl>
									<FormControl>
										<TextField
										required
											label="Home Phone"
											defaultValue={this.state?.playerData?.homenumber}
											id="homenumber" name="homenumber" type="tel" placeholder="Enter home phone number"
											onBlur={(event) =>  this.handleInputChange(event)}
										/>
									</FormControl>
									<FormControl>
										<TextField
										required
											label="Mobile"
											defaultValue={this.state?.phonenumber}
											id="phonenumber" name="phonenumber" type="tel" placeholder="Enter mobile phone number"
											onBlur={(event) =>  this.handleInputChange(event)}
										/>
									</FormControl>
									<Autocomplete 
										options={this.state.teamData}
										id="teamid"
										name="teamid"
										value={this.state?.playerData?.team}
										renderInput={(params) => <TextField {...params} label="Team" variant="outlined"/>}
										getOptionLabel={(option) => option.teamname }
										onChange={(event, data) => this.handleComboChange(event, data, 'teamid')}
									/>
									<Autocomplete 
										options={this.state.locationData}
										id="locationid"
										name="locationid"
										value={this.state?.playerData?.location}
										renderInput={(params) => <TextField {...params} label="Location" variant="outlined"/>}
										getOptionLabel={(option) => option.locationname }
										onChange={(event, data) => this.handleComboChange(event, data, 'locationid')}
									/>
										<DatePicker disableFuture format="DD-MM-YYYY" id="dateregistered" value={this.state.dateregisteredraw}name="dateregistered" label="Date Registered" onChange={(moment) => this.handleDateChange("dateregistered", moment)} />
										<DatePicker disableFuture format="DD-MM-YYYY" id="dateofbirth" value={this.state.dateofbirthraw} name="dateofbirth" label="D.O.B" onChange={(moment) => this.handleDateChange("dateofbirth", moment)} />
										<FormControlLabel label="Current Team" control={ <Switch color="secondary" checked={this.state.iscurrent} name="iscurrent" onChange={(event) => this.handleInputChange(event)} />}  />
										<FormControlLabel label="Active player" control={ <Switch color="secondary" checked={this.state.isactive} name="isactive" onChange={(event) => this.handleInputChange(event)} />}  />
										<FormControlLabel label="Team Captain" control={ <Switch color="primary" checked={this.state.iscaptain} name="iscaptain" onChange={(event) => this.handleInputChange(event)} />}  />
									<CardActions>
										<Button className={classes.submit} onClick={(event) => this.getFormDetails('addPlayer')}>Add</Button>
										<Button onClick={(event) => this.handleAdd()}>Close</Button>
									</CardActions>		
									</MuiPickersUtilsProvider>
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

export default withTheme(withStyles(DataGrid.styles)(DataGrid))