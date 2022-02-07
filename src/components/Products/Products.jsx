import React from 'react'
import {Grid} from '@material-ui/core'

import Product from './Product/Product';
import useStyles from './productsStyles';

const Products = ({ products, onAddToCart }) => {
    const classes = useStyles();

   return ( 
    <main className={classes.content}>
        {/* div creates enough space for navbar to be seperate from content */}
        <div className={classes.toolbar} /> 
        
        {/* Loop through products to display them all */}
            <Grid container justifyContent="center" spacing={4} >
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3} >
                    {/* xs sm md lg are for different mobile response sizes */}
                    <Product product={product} onAddToCart={onAddToCart}  />
                    {/*Product componenet is being sent with each specific product */}
                    </Grid>
                ))}

            </Grid>
        </main>
    )
}

export default Products;