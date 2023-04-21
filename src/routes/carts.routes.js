const express = require('express');

const cartRouter = express.Router();
const CartManager = require('../scriptcart.js');
const cartManager = new CartManager('./carrito.json')
const emptyCart = [];

cartRouter.post('/api/carts', async (req, res) => {
    await cartManager.addCart(emptyCart)
    .then(res.status(200).send({state: 'added', message: 'ok'}))
});

cartRouter.post('./api/carts/:cid?/product/:pid?', async (req, res) => {
    
});

cartRouter.get('/api/carts/:cid?', (req, res) => {
    const cartProductsById = cartManager.getProductsById(req.params.cid);
    cartProductsById.then(cartProducts => res.status(200).send(cartProducts));
});

module.exports = cartRouter;