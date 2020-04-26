import React, { Component } from 'react';
import logo from '../logo.svg';
import Menu from '../components/Menu';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { Grid } from '@material-ui/core';

export default class Login extends Component {
    constructor() {
        super();
        this.state = { username: null, password: null}
    }

    render() {
        return (
            <Grid direction="column" justify="center" alignItems="center">
                <FormControl>
                    <TextField name="usernmae" placeholder="Enter Usename" />
                    <TextField name="password" type="password" placeholder="Enter password here" />
                </FormControl>
            </Grid>
        );
    }
}