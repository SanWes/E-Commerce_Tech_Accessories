// src/components/Auth/Auth.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Box, 
    Container, 
    Paper, 
    TextField, 
    Button, 
    Typography, 
    Tabs, 
    Tab, 
    Alert,
    CircularProgress,
    Divider,
    Chip,
    Fade
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';

// Demo credentials for portfolio testing
const DEMO_CREDENTIALS = {
    email: 'demo@codigospace.com',
    password: 'demo123456'
};

const Auth = () => {
    const [tabValue, setTabValue] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showWelcome, setShowWelcome] = useState(false);
    
    const { login, register, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setShowWelcome(true);
            const timer = setTimeout(() => {
                navigate('/');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [user, navigate]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
        setError('');
    };

    const handleDemoLogin = () => {
        setEmail(DEMO_CREDENTIALS.email);
        setPassword(DEMO_CREDENTIALS.password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (tabValue === 0) {
            // Login
            const result = await login(email, password);
            if (!result.success) {
                setError(result.error);
            }
        } else {
            // Register
            const result = await register(email, password);
            if (!result.success) {
                setError(result.error);
            }
        }

        setLoading(false);
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, mb: 4 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    {showWelcome ? (
                        <Fade in={showWelcome} timeout={500}>
                            <Box sx={{ textAlign: 'center', py: 8 }}>
                                <Typography variant="h4" gutterBottom color="primary">
                                    Welcome Back!
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    {user?.email}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                                    Redirecting to home...
                                </Typography>
                            </Box>
                        </Fade>
                    ) : (
                        <>
                            <Typography variant="h4" align="center" gutterBottom>
                                CodiGo Space
                            </Typography>
                            <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 3 }}>
                                {tabValue === 0 ? 'Sign in to your account' : 'Create a new account'}
                            </Typography>

                            <Tabs 
                                value={tabValue} 
                                onChange={handleTabChange} 
                                centered 
                                sx={{ mb: 3 }}
                            >
                                <Tab label="Login" />
                                <Tab label="Register" />
                            </Tabs>

                            {error && (
                                <Alert severity="error" sx={{ mb: 3 }}>
                                    {error}
                                </Alert>
                            )}

                            <form onSubmit={handleSubmit}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    margin="normal"
                                    autoComplete="email"
                                />
                                <TextField
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    margin="normal"
                                    autoComplete={tabValue === 0 ? "current-password" : "new-password"}
                                    helperText={tabValue === 1 ? "Password must be at least 6 characters" : ""}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled={loading}
                                >
                                    {loading ? <CircularProgress size={24} /> : (tabValue === 0 ? 'Sign In' : 'Create Account')}
                                </Button>
                            </form>

                            {tabValue === 0 && (
                                <>
                                    <Divider sx={{ my: 3 }}>
                                        <Chip label="Portfolio Demo" size="small" color="secondary" />
                                    </Divider>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        color="secondary"
                                        onClick={handleDemoLogin}
                                        sx={{ mb: 1 }}
                                    >
                                        Use Demo Account
                                    </Button>
                                    <Typography variant="caption" display="block" align="center" color="text.secondary">
                                        Demo: demo@codigospace.com / demo123456
                                    </Typography>
                                </>
                            )}
                        </>
                    )}
                </Paper>
            </Box>
        </Container>
    );
};

export default Auth;
