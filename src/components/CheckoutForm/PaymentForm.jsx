import React, { useState } from 'react';
import { Typography, Button, Divider, TextField } from '@mui/material';
import Review from './Review';

const PaymentForm = ({ cartItems, shippingData, backStep, nextStep, handleFirebaseOrder }) => {
    const [cardDetails, setCardDetails] = useState({
        cardName: '',
        cardNumber: '',
        expDate: '',
        cvc: ''
    });

    const handleChange = (e) => {
        setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

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
            payment: cardDetails, // Will not charge, just storing for mock
            createdAt: new Date().toISOString()
        };

        handleFirebaseOrder(orderData); // Save order in Firestore
        nextStep();
    };

    return (
        <>
            <Review cartItems={cartItems} shippingData={shippingData} />
            <Divider />
            <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>
                Payment Method
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name on Card"
                    name="cardName"
                    fullWidth
                    margin="normal"
                    value={cardDetails.cardName}
                    onChange={handleChange}
                />
                <TextField
                    label="Card Number"
                    name="cardNumber"
                    fullWidth
                    margin="normal"
                    value={cardDetails.cardNumber}
                    onChange={handleChange}
                />
                <TextField
                    label="Expiration Date"
                    name="expDate"
                    fullWidth
                    margin="normal"
                    value={cardDetails.expDate}
                    onChange={handleChange}
                />
                <TextField
                    label="CVC"
                    name="cvc"
                    fullWidth
                    margin="normal"
                    value={cardDetails.cvc}
                    onChange={handleChange}
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
        </>
    );
};

export default PaymentForm;
