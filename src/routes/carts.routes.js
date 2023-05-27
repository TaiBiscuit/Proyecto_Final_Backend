import {Router} from 'express';
import CartManager from '../api/CartManager.js';
import cartModel from '../api/cart.model.js';
import productModel from '../api/product.model.js';
import mongoose from 'mongoose';

const cartsRouter = Router();
const cartManager = new CartManager();





cartsRouter.get('/carts', async (req, res) => {
    try {
        const cartId = req.query.cid;

        if(cartId != undefined) {
            const cartId = req.query.cid;
            const cartFiltered = await cartManager.getCartById(cartId)
            res.status(200).send(cartFiltered);
        } else {
            const cart = await cartManager.getCart();
            res.status(200).send(cart);
        }
    } catch (err) {
        res.status(500).send({status: 'EM', error: err});
    }
});

 cartsRouter.put('/carts/:cid?', async (req, res) => {
    try {
        const cartId = req.query.cid;
        const prodId = req.query.pid;
        const result = await cartManager.addProdToCart(cartId, prodId).populate('products') 
        .then(res.status(200).send({status: 'OK', carts: cart, prod:'result'}));
    } catch (err) {
        res.status(500).send({status: 'EM', error: err});
    }
}); 

cartsRouter.delete('/carts/:cid?/products/:pid?', async (req, res) => {

})
/*     const product = req.query.products;
    const cartId = req.params.cid;
    if(product) {
        let cart = await cartModel.find({_id:"646c357845cba4a9a0de755b"});
        res.status(200).send({status: 'OK', carts: cart});
    } else {
        res.status(200).send({status: 'OK', products: product});
    } */

/* 
cartsRouter.put('/carts/:cid?/product/:pid?', async (req, res) => {
    const cid = req.query.cid;

    res.status(200).send({status: 'OK', cart: cid})
});

 */

export default cartsRouter;