import React from 'react';
import { TextField, Grid } from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';

function FormInput ({ name, label }) {
    const {control} = useFormContext();

    return (
        <Grid item xs={12} sm={6}>
            <Controller
                defaultValue=""
                render={({ field }) => ( 
                <TextField {...field} label={label} required/>)}
                control={control}
                required
                fullWidth
                name={name}
            />
        </Grid>
    )
}

export default FormInput;
