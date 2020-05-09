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


class MaterialForm extends Component {

	constructor(props){
		super(props);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleComboChange = this.handleComboChange.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);

		let extendedState = { 
			dateregisteredraw: new moment(), 
			dateofbirthraw: new moment(), 
			location: null, 
			team: null
		}

		if (!this.props.isAdd){
			extendedState.dateregisteredraw = new moment(this.props.player.dateregistered);
			extendedState.dateofbirthraw = new moment(this.props.player.dateofbirth);
			extendedState.location= this.props.locationData.find( ld => ld.locationid === this.props.player.locationid);
			extendedState.team = this.props.teamData.find( td => td.teamid === this.props.player.teamid);
		}

		this.state = { ...this.state, ...this.props.player, ...extendedState }
	}

	static styles(theme){
		return {
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
		isAdd: this.props.isAdd,
		isOpen: this.props.isOpen,
		player: this.props.player,
		locationData: this.props.locationData,
		teamData: this.props.teamData,
		location: null,
		team: null,
	}
	
	handleInputChange(event) {
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
		if (data){
			this.setState({
				[fieldname] : data[fieldname],
				[nameVersion] : data[nameVersion],
				[name]: data
			});

		}else {
			this.setState({
				[fieldname] : null,
				[nameVersion] : '',
				[name]: null
			});
		}
	}

	handleDateChange(fieldName, selectedDate){
		const rawFieldName = `${fieldName}raw`;
		this.setState({ 
			[fieldName]: selectedDate.format('YYYY-MM-DD'),
			[rawFieldName]: selectedDate,					
		})
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
		this.handClose();
	}

	render() {
		const classes = this.props.classes;
		return (
			<Modal open={this.state.isOpen} onClose={ ()=>this.props.handleClose()}>
			<Card className={classes.modalForm}>
				<MuiPickersUtilsProvider utils={MomentUtils}>
				<FormControl>
					<TextField
					required
						label="First Name"
						value={this.state?.firstname}
						id="firstname" name="firstname" placeholder="Enter first name"
						onChange={(event) =>  this.handleInputChange(event)}
					/>
				</FormControl>
				<FormControl>
					<TextField
					required
						label="Last Name"
						value={this.state?.lastname}
						id="lastname" name="lastname" placeholder="Enter last name"
						onChange={(event) =>  this.handleInputChange(event)}
					/>
				</FormControl>
				<FormControl>
					<TextField
					required
						label="Home Phone"
						value={this.state?.homenumber}
						id="homenumber" name="homenumber" type="tel" placeholder="Enter home phone number"
						onChange={(event) =>  this.handleInputChange(event)}
					/>
				</FormControl>
				<FormControl>
					<TextField
					required
						label="Mobile"
						value={this.state?.phonenumber}
						id="phonenumber" name="phonenumber" type="tel" placeholder="Enter mobile phone number"
						onBlur={(event) =>  this.handleInputChange(event)}
					/>
				</FormControl>
				<Autocomplete 
				freeSolo
					options={this.state.teamData}
					id="teamid"
					name="teamid"
					inputValue={this.state.teamname}
					value={this.state.team}
					renderInput={(params) => <TextField {...params} label="Team" variant="outlined"/>}
					getOptionLabel={(option) => { console.log(option); return option.teamname } }
					onChange={(event, data) => this.handleComboChange(event, data, 'teamid')}
				/>
				<Autocomplete 
				freeSolo
					autoComplete
					options={this.state.locationData}
					id="locationid"
					name="locationid"
					value={this.state.location}
					inputValue={this.state.locationname}
					renderInput={(params) => <TextField {...params} label="Location" variant="outlined"/>}
					getOptionLabel={(option) => option.locationname }
					onChange={(event, data) => this.handleComboChange(event, data, 'locationid')}
				/>
					<DatePicker disableFuture format="DD-MM-YYYY" id="dateregistered" value={this.state.dateregisteredraw}name="dateregistered" label="Date Registered" onChange={(moment) => this.handleDateChange("dateregistered", moment)} />
					<DatePicker disableFuture format="DD-MM-YYYY" id="dateofbirth" value={this.state.dateofbirthraw} name="dateofbirth" label="D.O.B" onChange={(moment) => this.handleDateChange("dateofbirth", moment)} />
					<FormControlLabel label="Current Team" control={ <Switch color="secondary" checked={Boolean(this.state.iscurrent)} name="iscurrent" onChange={(event) => this.handleInputChange(event)} />}  />
					<FormControlLabel label="Active player" control={ <Switch color="secondary" checked={Boolean(this.state.isactive)} name="isactive" onChange={(event) => this.handleInputChange(event)} />}  />
					<FormControlLabel label="Team Captain" control={ <Switch color="primary" checked={Boolean(this.state.iscaptain)} name="iscaptain" onChange={(event) => this.handleInputChange(event)} />}  />
				<CardActions>
					<Button className={classes.submit} onClick={(event) => this.getFormDetails( this.props.isAdd ? 'addPlayer' : 'editPlayer')}>{this.props.isAdd ? 'Add' : 'Edit'}</Button>
					<Button onClick={(event) => this.props.handleClose()}>Close</Button>
				</CardActions>		
				</MuiPickersUtilsProvider>
			</Card>
		</Modal>
	);
	}
}

export default withTheme(withStyles(MaterialForm.styles)(MaterialForm));