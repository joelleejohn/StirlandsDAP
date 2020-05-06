import React from 'react';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';

const ComboBox = (props) => {
	return (
      <Autocomplete
		options={props.data}
		getOptionLabel={(option) => option.displayValue}
        id={props.ident}
        renderInput={(params) => <TextField {...params} label="controlled" margin="normal" />}
      />
	);
}

export default ComboBox;