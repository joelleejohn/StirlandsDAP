import React, { Component } from 'react';
import logo from '../logo.svg';
import DataGrid from '../components/DataGrid';
import { Table, TableBody, TableCell } from '@material-ui/core';
import StirlandsHelper from '../StirlandsHelper';

export default class Home extends Component {

    state = {
        isLoggedIn: this.props.auth.isAuthenticated,
        data: undefined,
        columns: undefined,
        loadGrid: false,
    }

    async componentDidMount(){
        let response = await StirlandsHelper.ajaxPost("getAllPlayers", new FormData());
        this.setState({ data: response.data, columns: response.columns, loadGrid: true });
        console.log('response')
        console.log(response)
    }

    render() {
        if (this.state.loadGrid){
            return (
                <DataGrid data={this.state.data} columns={this.state.columns} sort={undefined} />
            );
        } else {
            return <p> No data yet</p>
        }
    }
}