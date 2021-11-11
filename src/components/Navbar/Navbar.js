import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography} from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';

import logo from '../../assets/logo.png';
import useStyles from './navbarStyles';

const Navbar = ({ totalItems}) => {
    const classes = useStyles();
    //this allows the use of custom css styling thats written in the styles.js file

    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="Relentless Merchandise Shop" height="50px" className={classes.image} />
                        Relentless Merchandise
                    </Typography>
                    <div className={classes.grow}/>
                    <div className={classes.button}>
                        <IconButton aria-label="Show cart items" color="inherit">
                            <Badge badgeContent={totalItems} color="secondary">
                                <ShoppingCart/>
                            </Badge>

                        </IconButton>

                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
