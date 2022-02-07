import React, {useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { commerce } from '../../../lib/commerce';
import useStyles from './checkoutStyles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';

const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {

    const [activeStep, setActiveStep] = useState(0);
    const [shippingData, setshippingData] = useState({});
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [isFinished, setIsFinished] = useState(false);
    const classes = useStyles();
    const navigate = useNavigate();

    useEffect(() => {
        if (cart.id) {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});

                // console.log(token);
                setCheckoutToken(token);
            } catch (error) {
                if (activeStep !== steps.length) {
                console.log("Generate Token error", error)
                navigate("/")}
            }
        }
        generateToken();
        }
    }, [ cart ]);

    const nextStep = () => setActiveStep((previousActiveStep) => previousActiveStep + 1)
    const backStep = () => setActiveStep((previousActiveStep) => previousActiveStep - 1)

    const test = (data) => {
        setshippingData(data);
        nextStep();
    };

    const timeout = () => {
        setTimeout( () => {
            setIsFinished(true)
            console.log("timeout function running...");
        }, 3000);
    };

    let Confirmation = () => (order.customer ? (
        <>
            <div>
                <Typography variant="h5">Thank you for your purchase, {order.customer.firstname}  {order.customer.lastname}!</Typography>
                <Divider className={classes.divider}/>
                <Typography variant="subtitle2">Order ref:  {order.customer_reference}</Typography>
            </div>
            <br/>
            <Button component={Link} variant="outlined" type="button" to="/">Back to Home</Button>
        </>
    )   : isFinished ? (
        <>
            <div>
                <Typography variant="h5">Thank you for your purchase</Typography>
                <Divider className={classes.divider}/>
            </div>
            <br/>
            <Button component={Link} variant="outlined" type="button" to="/">Back to Home</Button>
        </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    ));

    if(error) {
        Confirmation = () => (
        <>
            <Typography variant="h5">Error: {error}</Typography>
            <br/>
            <Button component={Link} to="/">Back to Home</Button>
            <Button component={Link} to="/cart">Back to Cart</Button>
        </>);
    }

    const Form = () => (activeStep === 0 
        ? <AddressForm 
            checkoutToken={checkoutToken} 
            nextStep={nextStep} 
            test={test} 
             /> 
        : <PaymentForm 
            shippingData={shippingData}
            checkoutToken={checkoutToken} 
            nextStep={nextStep}
            backStep={backStep} 
            onCaptureCheckout={onCaptureCheckout}
            timeout={timeout}
        />
        )
    
    return (
        <>
            <CssBaseline />
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">
                    Checkout
                    </Typography>

                    {/* Stepper moves as steps progress */}
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    {activeStep === steps.length
                    ? <Confirmation />
                    : checkoutToken && <Form />
                    }
                </Paper>
            </main>
        </>
    );
};

export default Checkout;
