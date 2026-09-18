import React from 'react';
import { Typography, Divider, TextField, Chip, Paper } from '@mui/material';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import Review from './Review';
import RetroButton from '../common/RetroButton';

// Demo payment data for portfolio testing
const DEMO_PAYMENT = {
    cardName: 'John Doe',
    cardNumber: '4242424242424242',
    expDate: '12/25',
    cvc: '123'
};

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

    const { handleSubmit, control, formState: { errors }, setValue } = methods;

    const handleDemoPayment = () => {
        setValue('cardName', DEMO_PAYMENT.cardName);
        setValue('cardNumber', DEMO_PAYMENT.cardNumber);
        setValue('expDate', DEMO_PAYMENT.expDate);
        setValue('cvc', DEMO_PAYMENT.cvc);
    };

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
        <Paper 
            elevation={0}
            sx={{ 
                p: 4, 
                border: '2px solid #1A1A1D',
                backgroundColor: '#F5F5DC',
                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
            }}
        >
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
                
                <Divider sx={{ my: 3 }}>
                    <Chip label="Portfolio Demo" size="small" color="secondary" />
                </Divider>
                
                <RetroButton
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    onClick={handleDemoPayment}
                    sx={{ mb: 2 }}
                >
                    Use Demo Payment Info
                </RetroButton>
                <Typography variant="caption" display="block" align="center" color="text.secondary" sx={{ mb: 2 }}>
                    Demo: 4242 4242 4242 4242 (Test Stripe card)
                </Typography>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <RetroButton variant="outlined" onClick={backStep}>
                    Back
                    </RetroButton>
                    <RetroButton type="submit" variant="contained" color="primary">
                    Place Order
                    </RetroButton>
                </div>
                </form>
            </FormProvider>
        </Paper>
    );
};

export default PaymentForm;
