// Navbar.jsx
import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Badge,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Divider,
    Box,
    useTheme,
    useMediaQuery
} from '@mui/material';
import { ShoppingCartOutlined, Menu as MenuIcon } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

import logo2 from '../../assets/logo.jpg';
import {
    StyledAppBar,
    StyledToolbar,
    StyledTitle,
    StyledImage,
    StyledGrow,
    StyledButtonContainer,
    StyledDrawerList,
    StyledListItemText,
} from './NavbarStyles';

const Navbar = () => {
    const location = useLocation();
    const { cartCount } = useCart();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const drawerList = (
        <StyledDrawerList
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
        >
        <List>
            <ListItem button component={Link} to="/">
            <StyledListItemText primary="Home" />
            </ListItem>
            <Divider sx={{ backgroundColor: 'white' }} />
            <ListItem button component={Link} to="/cart">
            <StyledListItemText primary="Cart" />
            </ListItem>
        </List>
        </StyledDrawerList>
    );

    return (
        <StyledAppBar position="fixed" color="inherit">
        <StyledToolbar>

            {isMobile && (
            <>
                <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ mr: 1 }}
                >
                <MenuIcon />
                </IconButton>

                <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                PaperProps={{ sx: { backgroundColor: 'SeaGreen', color: 'white' } }}
                >
                {drawerList}
                </Drawer>
            </>
            )}

            <StyledTitle component={Link} to="/" variant="h6" color="inherit">
            <StyledImage src={logo2} alt="CodiGo Shop" height="50px" />
            <strong>CodiGo Space :&nbsp;</strong>The Wise Choice
            </StyledTitle>

            <StyledGrow />

            {/* Cart icon always visible */}
            {location.pathname === '/' && (
            <StyledButtonContainer>
                <IconButton
                component={Link}
                to="/cart"
                aria-label="Show cart items"
                color="inherit"
                >
                <Badge badgeContent={cartCount} color="secondary">
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
