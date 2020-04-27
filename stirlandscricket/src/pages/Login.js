import React, { Component } from 'react';
import logo from '../logo.svg';
import Menu from '../components/Menu';
import useStyles from '../components/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { Container, Grid, Button } from '@material-ui/core';
import StirlandsHelper from '../StirlandsHelper';
import { Router, Redirect, useHistory, withRouter } from 'react-router-dom';

class Login extends Component {

    state = { 
        username: null, 
        password: null, 
        isLoggedIn: StirlandsHelper.checkAuthentication().isAuthenticated 
    }

    classes = useStyles();
    isLoggedIn;
    async componentDidMount(){
        this.setState({isLoggedIn: await StirlandsHelper.checkAuthentication()});
    }

    render() {
        if (this.state.isLoggedIn)
            this.props.history.push("/");

        return (
            < Container >
                <Grid >
                    <FormControl>
                        < TextField id = "username"
                        name = "usernmae"
                        placeholder = "Enter Username"
                        onChange = {
                            (event) => {
                                this.setState({
                                    username: event.target.value
                                });
                            }
                        }
                        />
                        <TextField id="password" name="password" type="password" placeholder="Enter password here" onChange={(event) =>  this.setState({password: event.target.value})}/>
                        <Button onClick={(event) => { 

                                let formData = new FormData();
                                Object.keys(this.state).forEach(key => formData.append(key, this.state[key]));

                                let resp = StirlandsHelper.ajaxPost("login", formData);
                                resp.then(r => this.setState({ isLoggedIn: r.result }))
                                console.log("Login response");
                                console.log(this.state.isLoggedIn);
                            }}>Login</Button>
                    </FormControl>
                </Grid>
            </Container>
        );
    }
}

export default withRouter(Login);