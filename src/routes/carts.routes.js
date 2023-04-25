import {Router} from 'express';
import CartManager from '../CartManager.js';
import ProductManager from '../ProductManager.js';

const cartsRouter = Router();
const cartManager = new CartManager('./carts.json');
const manager = new ProductManager('./products.json');
const emptyCart = [];

cartsRouter.post('/', async (req, res) => {
    await cartManager.addCart(emptyCart)
    .then(res.status(200).send({state: 'added', message: 'ok'}))
});

cartsRouter.post('/:cid?/product/:pid?', async (req, res) => {
    const productId = req.params.pid;
    const cartId = req.params.cid;
    await cartManager.updateCarts(cartId, productId)
    .then(res.status(200).send({state: 'added', message: 'ok'}))
});

cartsRouter.get('/:cid?', (req, res) => {
    const cartProductsById = cartManager.getCartsById(req.params.cid);
    cartProductsById.then(cartProducts => res.status(200).send(cartProducts));
});

export default cartsRouter;