import React, { Component } from 'react';
import logo from '../logo.svg';
import DataGrid from '../components/DataGrid';
import { Table, TableBody, TableCell } from '@material-ui/core';
import StirlandsHelper from '../StirlandsHelper';

export default class Home extends Component {

    state = {
        isLoggedIn: this.props.auth.isAuthenticated
    }

    componentDidMount(){

    }

    render() {
        return (
            <DataGrid data={undefined} columns={undefined} sort={undefined} />
        );
    }
}