import React, { Component } from 'react';
import * as Icons from '@material-ui/icons';
import MaterialTable  from 'material-table';

export default class DataGrid extends Component {

	static style = {
		noData: {
			position: 'absolute',
			fontSize: '20px',
		}
	}

    state = {
		data: this.props.data,
		columns: this.props.columns,
		sort: this.props.sort,
		user: this.props.user,
	}

    render() {
		if (this.state.data === undefined || this.state.columns === undefined){
			return (
				<div id="noData"><p>No data has been found!</p></div>
			);
		} else {
			const data = this.state.data;
			const columns = this.state.columns.map((col) => {
				const Icon = Object.entries(Icons).find(([name, exported]) => name.toLowerCase() === col.icon)[1]
				
				function iconRender(rowData, iconToRender){
					return rowData[col.key] === 1 ? <Icon /> : null
				}
				let colConv = { 
					field: col.key,
					headerStyle: { textAlign: 'center' },
					title: <span class="columnHeader" ><Icon />{col.displayName}</span>,
					...((col.datatype !== null && col.datatype !== 'icon') && { type: col.datatype }),
					...(col.datatype === 'icon' && { type: 'boolean', render: rowData =>  iconRender(rowData, col.icon)}),
					...(col.sort !== null && { defaultSort: col.sort === 1 ? 'asc' : 'desc' }),
					...(col.key.endsWith('id') && { hidden: true } ),
					...((col.datatype === 'numeric' || col.datatype === 'icon') && { cellStyle: { textAlign: 'center' } }),
				} 
				return colConv; 
			});

			// Only allow editing if user is a 
			if (this.state.user?.rfuserrole === 'Administrator' && this.props.allowEdit){
				return (
					<MaterialTable 
						columns={columns}
						data={data}
						title={this.props.title}
						editable={{...this.props.editable}}
						sortable={true}
					/> 
	
					// <TableContainer component={Paper}>
					// 	<Table style={{minWidth: '650px'}}>
					// 		<TableHead>
					// 			<TableRow>
					// 				{columns.map(col => (
					// 					<TableCell key={ `col-${col.key}`} align="left">{col.displayName}</TableCell>
					// 				))}
					// 			</TableRow>
					// 		</TableHead>
					// 		<TableBody>
					// 			{data.map(row => (
					// 				<TableRow key={row.name}>
					// 					{
					// 						columns.map(col => (
					// 							<TableCell component="th" scope="row" style={{minHeight: '100px', color: 'black', textAlign: 'center'}}>{row[col.key]}</TableCell>	
					// 						))
					// 					}
					// 				</TableRow>
					// 			))}
					// 		</TableBody>
					// 	</Table> 
					// </TableContainer>
				);
			} else {
				return (
					<MaterialTable
						columns={columns}
						data={data}
						title={this.props.title}
					/>);
			}
		}
    }
}