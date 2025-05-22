import React, { useState, useEffect } from 'react';
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

import { db } from '../../../config/firebase'; 
import { collection, addDoc } from 'firebase/firestore';

// 🛒 Import cart context to use clearCart()
import { useCart } from '../../../context/CartContext';

const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ cart, setCart, order, error }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [shippingData, setShippingData] = useState({});
    const [orderId, setOrderId] = useState(null);
    const [isFinished, setIsFinished] = useState(false);

    const navigate = useNavigate();

    // ✅ use clearCart from context
    const { clearCart } = useCart();

    const nextStep = () => setActiveStep((prev) => prev + 1);
    const backStep = () => setActiveStep((prev) => prev - 1);

    const handleShippingData = async (data) => {
        setShippingData(data);

        try {
            const orderRef = await addDoc(collection(db, 'orders'), {
                shippingData: data,
                cart,
                createdAt: new Date(),
                status: 'pending',
            });

            setOrderId(orderRef.id);
            nextStep();
        } catch (err) {
            console.error('Error creating order in Firestore:', err);
            navigate('/cart');
        }
    };

    const saveOrderToFirestore = async (orderData) => {
        try {
            const docRef = await addDoc(collection(db, 'orders'), orderData);
            setOrderId(docRef.id);

            setTimeout(() => {
                setIsFinished(true);
            }, 2000);
        } catch (err) {
            console.error('Error saving full order:', err);
        }
    };

    // ✅ Clear cart only once using localStorage flag
    useEffect(() => {
        const alreadyCleared = localStorage.getItem('cartCleared');

        if (activeStep === steps.length && !alreadyCleared) {
            clearCart(); // 🧹 Clear the cart from Firestore
            localStorage.setItem('cartCleared', 'true'); // ✅ Set the flag
        }
    }, [activeStep, clearCart]);

    // ✅ Optional: Reset flag on component mount if needed
    useEffect(() => {
        return () => {
            localStorage.removeItem('cartCleared');
        };
    }, []);

    let Confirmation = () =>
        error ? (
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
        ) : isFinished ? (
            <>
                <div>
                    <Typography variant="h5">
                        Thank you for your purchase, {shippingData.firstName || 'Valued'} {shippingData.lastName || 'Customer'}!
                    </Typography>
                    <StyledDivider />
                    <Typography variant="subtitle2">Order ref: {orderId}</Typography>
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

    const Form = () =>
        activeStep === 0 ? (
            <AddressForm 
                nextStep={nextStep} 
                setShippingData={handleShippingData} 
            />
        ) : (
            <PaymentForm
                cartItems={cart}
                shippingData={shippingData}
                orderId={orderId}
                nextStep={nextStep}
                backStep={backStep}
                handleFirebaseOrder={saveOrderToFirestore}
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
