import React, { useState, useEffect } from "react";
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";
import FormInput from "./FormInput";

const mockCountries = [
    { id: 'US', label: 'United States' },
    { id: 'CA', label: 'Canada' },
];

const mockSubdivisions = {
    US: [
        { id: 'NY', label: 'New York' },
        { id: 'CA', label: 'California' },
    ],
    CA: [
        { id: 'ON', label: 'Ontario' },
        { id: 'QC', label: 'Quebec' },
    ],
};

const mockShippingOptions = [
    { id: 'standard', label: 'Standard - $5.00' },
    { id: 'express', label: 'Express - $10.00' },
];

const AddressForm = ({ nextStep, setShippingData }) => {
    const methods = useForm();
    const [shippingCountry, setShippingCountry] = useState("US");
    const [shippingSubdivision, setShippingSubdivision] = useState("NY");
    const [shippingOption, setShippingOption] = useState("standard");
    const [subdivisions, setSubdivisions] = useState(mockSubdivisions["US"]);

    useEffect(() => {
        setSubdivisions(mockSubdivisions[shippingCountry]);
        setShippingSubdivision(mockSubdivisions[shippingCountry][0].id);
    }, [shippingCountry]);

    const onSubmit = (data) => {
        setShippingData({ ...data, shippingCountry, shippingSubdivision, shippingOption });
    };

    return (
        <>
        <Typography variant="h6" gutterBottom>Shipping Address</Typography>
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                    <FormInput name="firstName" label="First Name" />
                    <FormInput name="lastName" label="Last Name" />
                    <FormInput name="email" label="Email" />
                    <FormInput name="address1" label="Address" />
                    <FormInput name="city" label="City" />
                    <FormInput name="zip" label="ZIP / Postal Code" />

                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Country</InputLabel>
                        <Select
                            value={shippingCountry}
                            fullWidth
                            onChange={(e) => setShippingCountry(e.target.value)}
                        >
                            {mockCountries.map((country) => (
                                <MenuItem key={country.id} value={country.id}>
                                    {country.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <InputLabel>State / Province</InputLabel>
                        <Select
                            value={shippingSubdivision}
                            fullWidth
                            onChange={(e) => setShippingSubdivision(e.target.value)}
                        >
                            {subdivisions.map((subdivision) => (
                                <MenuItem key={subdivision.id} value={subdivision.id}>
                                    {subdivision.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Option</InputLabel>
                        <Select
                            value={shippingOption}
                            fullWidth
                            onChange={(e) => setShippingOption(e.target.value)}
                        >
                            {mockShippingOptions.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                </Grid>

                <br />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Button component={Link} to="/cart" variant="outlined">
                        Back to Cart
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                        Next
                    </Button>
                </div>
            </form>
        </FormProvider>
        </>
    );
};

export default AddressForm;
