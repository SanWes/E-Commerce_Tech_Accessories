import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography} from '@material-ui/core';
import { ShoppingCart, ShoppingCartOutlined } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';

// import logo from '../../assets/logo.png';
import logo2 from '../../assets/logo.jpg';
import useStyles from './navbarStyles';

const Navbar = ({ totalItems }) => {
    const classes = useStyles();
    //this allows the use of custom css styling thats written in the styles.js file
    const location = useLocation();
    // property 'path name' in order to render or not on specific routes -- using to only display cart logo on root route


    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit"  style= {{backgroundColor: "SeaGreen" }} >
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit" font-weight="bold">
                        <img src={logo2} alt="CodiGo Shop" height="50px" className={classes.image} />
                        <strong>CodiGo Space :&nbsp; </strong>The Wise Choice
                    </Typography>
                    <div className={classes.grow}/>

                    {/* if route = '/' display this button */}
                    {location.pathname === '/' && (
                    <div className={classes.button}>
                        <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                            <Badge badgeContent={totalItems} color="secondary">
                                {/* <ShoppingCart/> */}
                                <ShoppingCartOutlined/>
                            </Badge>

                        </IconButton>

                    </div> )}
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
