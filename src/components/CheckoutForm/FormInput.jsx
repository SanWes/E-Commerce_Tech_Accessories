import React from 'react';
import { TextField, Grid } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

function FormInput({ name, label, validation }) {
    const { control } = useFormContext();

    return (
        <Grid item xs={12} sm={6}>
            <Controller
                name={name}
                control={control}
                defaultValue=""
                rules={validation}
                render={({ field, fieldState: { error } }) => (
                    <TextField
                    {...field}
                    label={label}
                    fullWidth
                    required={!!validation?.required}
                    error={!!error}
                    helperText={error ? error.message : ''}
                    />
                )}
            />
        </Grid>
    );
}

export default FormInput;
