import {Router} from 'express';
import CartManager from '../api/CartManager.js';
import cartModel from '../api/cart.model.js';

const cartsRouter = Router();
const cartManager = new CartManager();





cartsRouter.get('/carts', async (req, res) => {
    try {
        const cart = await cartManager.getCart();
        res.status(200).send(cart);
/*         res.render('carts', {layout: 'main', emptyCart}); */
    } catch (err) {
        res.status(500).send({status: 'EM', error: err});
    }
});

cartsRouter.get('/carts/:cid?', async (req, res) => {
    try{
        const cartId = req.params.cid;
        const cartFiltered = await cartManager.getCartById(cartId)
        res.status(200).send(cartFiltered);
    } catch (err) {
        res.status(500).send({status: 'EM', error: err});
    }
});

cartsRouter.put('/carts/:cid?', async (req, res) => {
    try {
        let cart = await cartModel.find({_id:"646ced30db302211376014dc"})
        res.status(200).send({status: 'OK', carts: cart});
    } catch (err) {
        res.status(500).send({status: 'EM', error: err});
    }
/*     const product = req.query.products;
    const cartId = req.params.cid;
    if(product) {
        let cart = await cartModel.find({_id:"646c357845cba4a9a0de755b"});
        res.status(200).send({status: 'OK', carts: cart});
    } else {
        res.status(200).send({status: 'OK', products: product});
    } */
})

export default cartsRouter;