import React from 'react'
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core'

import useStyles from './cartItemStyles'

const CartItem = ( { item, onUpdateCartQty, onRemoveFromCart } ) => {
    
    const classes = useStyles();

    // console.log("***************",item.image)

    return (
        <Card className="cart-item">

            <CardMedia className={classes.media} image={item.image.url} alt={item.name}   />
        
            {/* <img className={classes.media} src={item.image.url} alt={item.name} /> */}

            <CardContent className={classes.cardContent} >
                <Typography variant="h4">{item.name} </Typography>
                <Typography variant="h5">{item.line_total.formatted_with_symbol} </Typography>
            </CardContent>

            <CardActions className={classes.cardActions} >
                <div className={classes.buttons} >
                    <Button type="button" size="small" onClick={() => onUpdateCartQty(item.id, item.quantity-1)}>-</Button>
                    <Typography>{item.quantity}
                    </Typography>

                    <Button type="button" size="small" onClick={() => onUpdateCartQty(item.id, item.quantity+1)}>+</Button>
                </div>
                <Button variant="contained" type="button" color="secondary" onClick={() => onRemoveFromCart(item.id)}>Remove</Button>
            </CardActions>
            
        </Card>
    )
}

export default CartItem
