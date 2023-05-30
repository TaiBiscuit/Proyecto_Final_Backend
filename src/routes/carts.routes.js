import {Router} from 'express';
import CartManager from '../api/CartManager.js';

const cartsRouter = Router();
const cartManager = new CartManager();

cartsRouter.get('/carts', async (req, res) => {
    try {
        const cartId = req.query.cid;

        if(cartId != undefined) {
            const cartId = req.query.cid;
            const cartFiltered = await cartManager.getCartPopulated(cartId)
            res.status(200).send(cartFiltered);
        } else {
            const cart = await cartManager.getCart();
            console.log(cart)
            res.status(200).send(cart);
        }
    } catch (err) {
        res.status(500).send({status: 'EM', error: err});
    }
});

 cartsRouter.put('/carts/:cid?/products/:pid?', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const prodId = req.params.pid;
        const result = await cartManager.addProdToCart(cartId, prodId);
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send({status: 'EM', error: err});
    }
}); 

cartsRouter.delete('/carts/:cid?/products/:pid?', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const prodId = req.params.pid;
        const result = await cartManager.deleteProdFromCart(cartId, prodId);
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send({status: 'EM', error: err});
    }
});

cartsRouter.delete('/carts/:cid?', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const result = await cartManager.emptyCart(cartId);
        res.status(200).send(result)
    } catch (err) {
        res.status(500).send({status: 'EM', error: err});
    }
});

export default cartsRouter;