import React, { Component } from 'react';
import logo from '../logo.svg';
import DataGrid from '../components/DataGrid';
import { Table, TableBody, TableCell } from '@material-ui/core';
import StirlandsHelper from '../StirlandsHelper';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';

class Home extends Component {

    state = {
        isLoggedIn: this.props.auth.isAuthenticated,
        data: undefined,
        columns: undefined,
        loadGrid: false,
    }

    async componentDidMount(){
        let response;

        await StirlandsHelper.ajaxPost("getAllPlayers", new FormData()).then( resp => {
            console.log(resp);
            response = resp; 
        });

        this.setState({ data: response.data, columns: response.columns, loadGrid: true });
    }

    render() {
        console.log('props before grid load');
        console.log(this.props);
        if (this.state.loadGrid){
            return (
                <DataGrid user={this.props.auth.user} data={this.state.data} columns={this.state.columns} allowEdit={true} title="Active players" />
            );
        } else {
            return <p>No data yet</p>
        }
    }
}

export default withRouter(Home)