import React from 'react';
import { Typography, Button, Divider, TextField } from '@mui/material';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import Review from './Review';

const PaymentForm = ({ cartItems, shippingData, backStep, nextStep, handleFirebaseOrder }) => {
    const methods = useForm({
        mode: 'onTouched',
        defaultValues: {
        cardName: '',
        cardNumber: '',
        expDate: '',
        cvc: ''
        }
    });

    const { handleSubmit, control, formState: { errors } } = methods;

    const onSubmit = (data) => {
        const orderData = {
            items: cartItems,
            customer: {
                firstName: shippingData.firstName,
                lastName: shippingData.lastName,
                email: shippingData.email,
            },
            shipping: {
                address: shippingData.address1,
                city: shippingData.city,
                country: shippingData.shippingCountry,
                state: shippingData.shippingSubdivision,
                postalCode: shippingData.zip,
                option: shippingData.shippingOption
            },
            payment: data, // Use validated form data
            createdAt: new Date().toISOString()
        };

        handleFirebaseOrder(orderData); // Save order in Firestore
        nextStep();
    };

    // console.log('cartItems:', cartItems);
    // console.log('Review input:', Object.values(cartItems || {}));

    return (
        <>
        <Review cart={{ items: Object.values(cartItems || {}) }} />
        
        <Divider />
        <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>
            Payment Method
        </Typography>

        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="cardName"
                control={control}
                rules={{ required: 'Name on card is required' }}
                render={({ field }) => (
                <TextField
                    label="Name on Card"
                    fullWidth
                    margin="normal"
                    error={!!errors.cardName}
                    helperText={errors.cardName ? errors.cardName.message : ''}
                    {...field}
                />
                )}
            />

            <Controller
                name="cardNumber"
                control={control}
                rules={{
                required: 'Card number is required',
                pattern: {
                    value: /^\d{16}$/,
                    message: 'Card number must be 16 digits'
                }
                }}
                render={({ field }) => (
                <TextField
                    label="Card Number"
                    fullWidth
                    margin="normal"
                    error={!!errors.cardNumber}
                    helperText={errors.cardNumber ? errors.cardNumber.message : ''}
                    {...field}
                />
                )}
            />

            <Controller
                name="expDate"
                control={control}
                rules={{
                required: 'Expiration date is required',
                pattern: {
                    value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
                    message: 'Expiration date must be in MM/YY format'
                }
                }}
                render={({ field }) => (
                <TextField
                    label="Expiration Date (MM/YY)"
                    fullWidth
                    margin="normal"
                    error={!!errors.expDate}
                    helperText={errors.expDate ? errors.expDate.message : ''}
                    {...field}
                />
                )}
            />

            <Controller
                name="cvc"
                control={control}
                rules={{
                required: 'CVC is required',
                pattern: {
                    value: /^\d{3,4}$/,
                    message: 'CVC must be 3 or 4 digits'
                }
                }}
                render={({ field }) => (
                <TextField
                    label="CVC"
                    fullWidth
                    margin="normal"
                    error={!!errors.cvc}
                    helperText={errors.cvc ? errors.cvc.message : ''}
                    {...field}
                />
                )}
            />

            <br />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined" onClick={backStep}>
                Back
                </Button>
                <Button type="submit" variant="contained" color="primary">
                Place Order
                </Button>
            </div>
            </form>
        </FormProvider>
        </>
    );
};

export default PaymentForm;
