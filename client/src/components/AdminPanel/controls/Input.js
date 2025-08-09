import React from 'react'
import { TextField, InputAdornment } from '@material-ui/core';
export default function Input(props) {

    const { name, label, value,error=null, onChange, icon, size } = props;
    return (
        <TextField 
            label={label}
            size={size}
            name={name}
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {icon}
                  </InputAdornment>
                ),
              }}
            value={value||''}
            onChange={onChange}
            {...(error && {error:true,helperText:error})}
        />
    )
}
