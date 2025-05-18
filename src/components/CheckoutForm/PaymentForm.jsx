import React from 'react';
import { Typography, Button, Divider } from '@mui/material';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Review from './Review';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY); // Use your Stripe test public key

const PaymentForm = ({ checkoutToken, shippingData, backStep, nextStep, onCaptureCheckout, timeout }) => {

const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
    });

    if (error) {
        console.log('[Stripe error]', error);
    } else {
        const orderData = {
            line_items: checkoutToken.live.line_items,
            customer: {
                firstname: shippingData.firstName,
                lastname: shippingData.lastName,
                email: shippingData.email,
            },
            shipping: {
                name: 'Domestic',
                street: shippingData.address1,
                town_city: shippingData.city,
                country: shippingData.shippingCountry,
                county_state: shippingData.shippingSubdivision,
                postal_zip_code: shippingData.zip,
            },
            fulfillment: {
                shipping_method: shippingData.shippingOption,
            },
            // payment: {
            //     gateway: 'test_gateway',
            //     card: {
            //         number: '4242 4242 4242 4242',
            //         expiry_month: '01',
            //         expiry_year: '2023',
            //         cvc: '123',
            //         postal_zip_code: '94103',
            //     }
            //     },
            payment: {
                gateway: 'stripe',
                stripe: {
                payment_method_id: paymentMethod.id,
                },
            },
        };

        onCaptureCheckout(checkoutToken.id, orderData);
        timeout();
        nextStep();
    }
    };

    return (
    <>
        <Review checkoutToken={checkoutToken} />
        <Divider />
        <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>
        Payment method
        </Typography>

        <Elements stripe={stripePromise}>
        <ElementsConsumer>
            {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>

            <Typography
                variant="body2"
                style={{
                    marginBottom: '1rem',
                    backgroundColor: '#f0f0f0',
                    padding: '1rem',
                    borderRadius: '8px',
                    fontSize: '0.9rem'
                }}
            >
            <strong>Test Mode:</strong> Use this test card to simulate payment:<br />
            <strong>Card Number:</strong> 4242 4242 4242 4242<br />
            <strong>Exp Date:</strong> 12/34 &nbsp; <strong>CVC:</strong> 123 &nbsp; <strong>ZIP:</strong> 94103
            </Typography>

                <CardElement />
                <br /> <br />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined" onClick={backStep}>
                    Back
                </Button>
                <Button type="submit" variant="contained" disabled={!stripe} color="primary">
                    Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                </Button>
                </div>
            </form>
            )}
        </ElementsConsumer>
        </Elements>
    </>
    );
};

export default PaymentForm;
