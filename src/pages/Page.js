import React, { Component } from 'react';
import DataGrid from '../components/DataGrid';
import DatePicker from '../components/DatePicker';
import StirlandsHelper from '../StirlandsHelper';
import { withRouter } from 'react-router-dom';
import { Typography, Paper, IconButton, FormControl, TextField } from '@material-ui/core';
import { AutoComplete } from '@material-ui/lab';
import { Check } from '@material-ui/icons';

class Page extends Component {

    state = {
        isLoggedIn: this.props.isAuthenticated,
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

        this.setState({ isLoggedIn: this.props.isAuthenticated, data: response.data, columns: response.columns, loadGrid: true });
    }

    render() {
        let MainData;
        if (this.state.loadGrid){
           return <DataGrid user={this.props.user} data={this.state.data} columns={this.state.columns} title="Active players" />;
        } else {
            return <Typography>No data yet</Typography>
        }
    }
}

export default withRouter(Page)