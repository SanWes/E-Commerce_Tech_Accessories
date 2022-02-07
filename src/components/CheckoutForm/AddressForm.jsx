import React, { useState, useEffect } from "react";
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";

import { commerce } from "../../lib/commerce";

import FormInput from "./FormInput";

const AddressForm = ({ checkoutToken, test }) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');
    const methods = useForm();

    // set to be array of arrays in order to map through it later on, with initials and name ["AL", "Albania"] ..etc
    const countries = Object.entries(shippingCountries).map( ([code, name])  => ({id: code, label: name}));
    // console.log("Countries********", countries)

    const subdivisions = Object.entries(shippingSubdivisions).map( ([code, name])  => ({id: code, label: name}));

    // console.log(shippingOptions);
    const options = shippingOptions.map(
        (sO) =>({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` }))

    // *********************
    // FETCHING METHODS

    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);

        // console.log(countries)
        setShippingCountries(countries);
        // in order to loop properly to display, extract the keys and place into an array [AL,AT, CA, DR, US ]
        setShippingCountry(Object.keys(countries)[0]);
    };

    const fetchSubdivisions = async (countryCode) => {
        const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode);

        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    };

    const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {country: country, region: stateProvince});

        setShippingOptions(options);
        setShippingOption(options[0].id);
        console.log("Shipping Option",shippingOption);
    };

    useEffect(() =>{
        fetchShippingCountries(checkoutToken.id);
    }, []);
    
    useEffect(() =>{
        if(shippingCountry) fetchSubdivisions(shippingCountry);
    }, [shippingCountry]);

    useEffect(() => {
        if(shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision)
    }, [shippingCountry, shippingSubdivision]);

    return (
        <>
            <Typography variant="h6" gutterBottom>Shipping address</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data) => test({ ...data, shippingCountry, shippingSubdivision, shippingOption }) )}>
                    <Grid container spacing={3}>
                        <FormInput name='firstName' label='First Name' />
                        <FormInput name='lastName' label='Last Name' />
                        <FormInput name='email' label='Email' />
                        <FormInput name='address1' label='Address'/>
                        <FormInput name='city' label='Town City' />
                        <FormInput name='zip' label='ZIP / Postal Code' />
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                                {countries.map( (country) => (
                                    <MenuItem key={country.id} value={country.id}>
                                        {country.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                                {subdivisions.map( (subdivision) => (
                                    <MenuItem key={subdivision.id} value={subdivision.id}>{subdivision.label} </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                            {options.map( (option) => (
                                    <MenuItem key={option.id} value={option.id}>{option.label} </MenuItem>
                                ))}
                            </Select>
                            
                        </Grid>

                    </Grid>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                    <Button component={Link} to="/cart" variant="outlined">Back to Cart</Button>
                    <Button type="submit" variant="contained" color="primary">Next</Button>

                    </div>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm;
