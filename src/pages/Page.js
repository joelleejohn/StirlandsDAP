import React, { Component } from 'react';
import DataGrid from '../components/DataGrid';
import DatePicker from '../components/DatePicker';
import StirlandsHelper from '../StirlandsHelper';
import { withRouter } from 'react-router-dom';
import { Typography, Paper, IconButton, FormControl, TextField } from '@material-ui/core';
import { AutoComplete } from '@material-ui/lab';
import { Check } from '@material-ui/icons';

class Page extends Component {

    constructor(){
        super();
        this.handleFilterCommit = this.handleFilterCommit.bind(this);
        console.log('props');
        console.log(this.state);
    }

    state = {
        isLoggedIn: this.props.auth.isAuthenticated,
        data: undefined,
        columns: undefined,
        loadGrid: false,
        filters: [],
    }

    async componentDidMount(){
        let response;
        await StirlandsHelper.ajaxPost(this.props.query, new FormData()).then( resp => {
            console.log(resp);
            response = resp; 
        });

        
        this.setState({ data: response.data, columns: response.columns, loadGrid: true });
    }

    render() {
        console.log('props before grid load');
        console.log(this.props);

        const { formFields, filterFields } = this.props;
        let MainData, FilterForm, Form;
        if (this.state.loadGrid){
            MainData = <DataGrid user={this.props.auth.user} data={this.state.data} columns={this.state.columns} allowEdit={true} title="Active players" />
        } else {
            MainData = <Typography>No data yet</Typography>
        }

        return <Paper><MainData /></Paper>
    }
}

export default withRouter(Page)