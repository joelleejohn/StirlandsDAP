import React, { Component } from 'react';
import { Typography, Paper } from '@material-ui/core';
import DataGrid from '../components/DataGrid';
import StirlandsHelper from '../StirlandsHelper';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core';

class Home extends Component {

    constructor(props) {
        super(props);
        this.refreshData = this.refreshData.bind(this);
    }

    static styles = {
		noData: {
			display: 'grid',
			alignItems: 'center',
			alignContent: 'center',
			justifyContent: 'center',
            placeContent: 'center',
            width: '50%'
		}
	}

    state = {
        isLoggedIn: this.props.auth.isAuthenticated,
        data: undefined,
        columns: undefined,
        loadGrid: false,
    }

    async componentDidMount(){
        let response;

        await StirlandsHelper.ajaxPost(this.props.query, new FormData()).then( resp => {
            response = resp; 
        });

        this.setState({ data: response.data.result, columns: response.columns, loadGrid: response?.data?.result?.length > 1 });
    }

    refreshData(){
        let response;

        StirlandsHelper.ajaxPost(this.props.query, new FormData()).then( resp => {
            response = resp; 
        });

        this.setState({ data: response.data.result, columns: response.columns, loadGrid: response?.data?.result?.length > 1 });
    }

    render() {

        const classes = this.props.classes;

        if (this.state.loadGrid){
            return (
                <DataGrid user={this.props.auth.user} refreshData={this.refreshData} data={this.state.data} columns={this.state.columns} allowEdit={true} title={this.props.title} />
            );
        } else {
            return (
                <Paper className={classes.noData}>
					<Typography variant="h3" component="p">No data has been found!</Typography>
				</Paper>
            );
        }
    }
}

export default withRouter(withStyles(Home.styles)(Home))