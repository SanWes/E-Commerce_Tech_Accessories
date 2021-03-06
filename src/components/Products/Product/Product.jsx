import React from 'react'
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton} from '@material-ui/core'
import {AddShoppingCart} from '@material-ui/icons'

import useStyles from './productStyles'

const Product = ({ product, onAddToCart }) => {
    const classes = useStyles();

    // console.log(product)

    // return (
    //     <div>
    //         test
    //     </div>
    // )

    return (
        <Card className={classes.root} style={{height: "100%"}}>
            <CardMedia className={classes.media} image={product.image.url} title={product.name} />
            <CardContent>
                <div className={classes.CardContent}>
                <Typography variant="h5" gutterBottom>
                {product.name}

                </Typography>
                <Typography variant="h5" >
                {product.price.formatted_with_symbol}

                </Typography>

                </div>
                <Typography dangerouslySetInnerHTML={{__html:product.description}} variant ="body2" colot="textSecondary" />
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}  >
                <IconButton aria-label="Add to Cart" onClick={() => onAddToCart(product.id, 1)} >Add to Cart
                    <AddShoppingCart/> 
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Product
