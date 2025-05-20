import React, { useState } from 'react';
import {
    Typography,
    CircularProgress,
    CssBaseline,
    Step,
    StepLabel,
    } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import {
    ToolbarSpacer,
    Layout,
    StyledPaper,
    StyledStepper,
    StyledButton,
    StyledDivider,
    SpinnerWrapper,
} from './CheckoutStyles';

import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';

import { db } from '../../../config/firebase'; // your Firestore instance
import { collection, addDoc } from 'firebase/firestore';

const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
const [activeStep, setActiveStep] = useState(0);
const [shippingData, setShippingData] = useState({});
const [orderId, setOrderId] = useState(null);
const [isFinished, setIsFinished] = useState(false);

const navigate = useNavigate();

    // No useEffect to generate token here because Firebase approach is different

const nextStep = () => setActiveStep((prev) => prev + 1);
const backStep = () => setActiveStep((prev) => prev - 1);

const handleShippingData = async (data) => {
        setShippingData(data);

        // Create a new order document in Firestore with shipping data and cart
    try {
        const orderRef = await addDoc(collection(db, 'orders'), {
            shippingData: data,
            cart,
            createdAt: new Date(),
            status: 'pending',
        });

        setOrderId(orderRef.id); // store Firestore order doc id as "token"
        nextStep();
    } catch (err) {
        console.error('Error creating order in Firestore:', err);
        // Optionally show error to user or redirect
        navigate('/cart');
        }
    };

    // Timeout fallback in case you want to simulate order completion
    const timeout = () => {
        setTimeout(() => {
        setIsFinished(true);
        console.log('Checkout timeout triggered: showing confirmation fallback');
        }, 3000);
    };

    let Confirmation = () =>
        order?.customer ? (
        <>
            <div>
            <Typography variant="h5">
                Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!
            </Typography>
            <StyledDivider />
            <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
            </div>
            <br />
            <StyledButton component={Link} variant="outlined" to="/">
            Back to Home
            </StyledButton>
        </>
        ) : isFinished ? (
        <>
            <div>
            <Typography variant="h5">Thank you for your purchase</Typography>
            <StyledDivider />
            </div>
            <br />
            <StyledButton component={Link} variant="outlined" to="/">
            Back to Home
            </StyledButton>
        </>
        ) : (
        <SpinnerWrapper>
            <CircularProgress />
        </SpinnerWrapper>
        );

    if (error) {
        Confirmation = () => (
        <>
            <Typography variant="h5">Error: {error}</Typography>
            <br />
            <StyledButton component={Link} to="/">
            Back to Home
            </StyledButton>
            <StyledButton component={Link} to="/cart">
            Back to Cart
            </StyledButton>
        </>
        );
    }

    const Form = () =>
        activeStep === 0 ? (
        <AddressForm nextStep={nextStep} test={handleShippingData} />
        ) : (
        <PaymentForm
            shippingData={shippingData}
            orderId={orderId}
            nextStep={nextStep}
            backStep={backStep}
            onCaptureCheckout={onCaptureCheckout}
            timeout={timeout}
        />
        );

    return (
        <>
        <CssBaseline />
        <ToolbarSpacer />
        <Layout>
            <StyledPaper>
            <Typography variant="h4" align="center">
                Checkout
            </Typography>

            <StyledStepper activeStep={activeStep}>
                {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
                ))}
            </StyledStepper>

            {activeStep === steps.length ? <Confirmation /> : <Form />}
            </StyledPaper>
        </Layout>
        </>
    );
};

export default Checkout;
