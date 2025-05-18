// Navbar.jsx
import React from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Badge,
    Typography,
    } from '@mui/material';
import { ShoppingCartOutlined } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

import logo2 from '../../assets/logo.jpg';
import {
    StyledAppBar,
    StyledToolbar,
    StyledTitle,
    StyledImage,
    StyledGrow,
    StyledButtonContainer,
} from './NavbarStyles';

const Navbar = ({ totalItems }) => {
    const location = useLocation();

    return (
        <StyledAppBar position="fixed" color="inherit">
        <StyledToolbar>
            <StyledTitle component={Link} to="/" variant="h6" color="inherit">
            <StyledImage src={logo2} alt="CodiGo Shop" height="50px" />
            <strong>CodiGo Space :&nbsp;</strong>The Wise Choice
            </StyledTitle>

            <StyledGrow />

            {location.pathname === '/' && (
            <StyledButtonContainer>
                <IconButton
                component={Link}
                to="/cart"
                aria-label="Show cart items"
                color="inherit"
                >
                <Badge badgeContent={totalItems} color="secondary">
                    <ShoppingCartOutlined />
                </Badge>
                </IconButton>
            </StyledButtonContainer>
            )}
        </StyledToolbar>
        </StyledAppBar>
    );
};

export default Navbar;
