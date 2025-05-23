import React, { useState, useEffect } from "react";
import {
    InputLabel,
    Select,
    MenuItem,
    Button,
    Grid,
    Typography,
} from "@mui/material";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import FormInput from "./FormInput";

const mockCountries = [
    { id: "US", label: "United States" },
    { id: "CA", label: "Canada" },
];

const mockSubdivisions = {
    US: [
        { id: "NY", label: "New York" },
        { id: "CA", label: "California" },
    ],
    CA: [
        { id: "ON", label: "Ontario" },
        { id: "QC", label: "Quebec" },
    ],
};

const mockShippingOptions = [
    { id: "standard", label: "Standard - $5.00" },
    { id: "express", label: "Express - $10.00" },
];

const AddressForm = ({ nextStep, setShippingData }) => {
    const methods = useForm();
    const {
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = methods;

    const [subdivisions, setSubdivisions] = useState(mockSubdivisions["US"]);

    const shippingCountry = watch("shippingCountry", "US");

    useEffect(() => {
        setSubdivisions(mockSubdivisions[shippingCountry]);
        const firstSubdivision = mockSubdivisions[shippingCountry][0]?.id || "";
        setValue("shippingSubdivision", firstSubdivision);
    }, [shippingCountry, setValue]);

    const onSubmit = (data) => {
        setShippingData(data);
        // nextStep(); // Optional: if using multistep
    };

return (
        <>
        <Typography variant="h6" gutterBottom>
            Shipping Address
        </Typography>
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <FormInput
                name="firstName"
                label="First Name"
                validation={{
                    required: "First name is required",
                    pattern: {
                    value: /^[A-Za-z\s'-]+$/,
                    message: "Only letters are allowed",
                    },
                }}
                />
                <FormInput
                name="lastName"
                label="Last Name"
                validation={{
                    required: "Last name is required",
                    pattern: {
                    value: /^[A-Za-z\s'-]+$/,
                    message: "Only letters are allowed",
                    },
                }}
                />
                <FormInput
                name="email"
                label="Email"
                validation={{
                    required: "Email is required",
                    pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Enter a valid email",
                    },
                }}
                />
                <FormInput
                name="address1"
                label="Address"
                validation={{
                    required: "Address is required",
                }}
                />
                <FormInput
                name="city"
                label="City"
                validation={{
                    required: "City is required",
                    pattern: {
                    value: /^[A-Za-z\s'-]+$/,
                    message: "Enter a valid city",
                    },
                }}
                />
                <FormInput
                name="zip"
                label="ZIP / Postal Code"
                validation={{
                    required: "ZIP code is required",
                    pattern: {
                    value: /^\d{5}(-\d{4})?$/,
                    message: "Enter a valid ZIP code",
                    },
                }}
                />

                <Grid item xs={12} sm={6}>
                <InputLabel>Shipping Country</InputLabel>
                <Controller
                    name="shippingCountry"
                    control={control}
                    defaultValue="US"
                    render={({ field }) => (
                    <Select fullWidth {...field}>
                        {mockCountries.map((country) => (
                        <MenuItem key={country.id} value={country.id}>
                            {country.label}
                        </MenuItem>
                        ))}
                    </Select>
                    )}
                />
                </Grid>

                <Grid item xs={12} sm={6}>
                <InputLabel>State / Province</InputLabel>
                <Controller
                    name="shippingSubdivision"
                    control={control}
                    defaultValue={subdivisions[0]?.id || ""}
                    render={({ field }) => (
                    <Select fullWidth {...field}>
                        {subdivisions.map((subdivision) => (
                        <MenuItem key={subdivision.id} value={subdivision.id}>
                            {subdivision.label}
                        </MenuItem>
                        ))}
                    </Select>
                    )}
                />
                </Grid>

                <Grid item xs={12} sm={6}>
                <InputLabel>Shipping Option</InputLabel>
                <Controller
                    name="shippingOption"
                    control={control}
                    defaultValue="standard"
                    render={({ field }) => (
                    <Select fullWidth {...field}>
                        {mockShippingOptions.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.label}
                        </MenuItem>
                        ))}
                    </Select>
                    )}
                />
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
