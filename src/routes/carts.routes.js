import {Router} from 'express';
import CartManager from '../api/CartManager.js';
import ProductManager from '../api/ProductManager.js';

const cartsRouter = Router();
const cartManager = new CartManager();
const productManager = new ProductManager();

cartsRouter.get('/carts', async (req, res) => {
    try {
        const cart = await cartManager.getCart();
        console.log(cart)
        res.status(200).send(cart);
        } catch (err) {
        res.status(500).send({status: 'EM', error: err});
    }
});

cartsRouter.get('/carts/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cartFiltered = await cartManager.getCartPopulated(cartId);
        const cartProducts = cartFiltered[0].products
        res.render('cart', {carts: cartProducts})
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

cartsRouter.post('/carts/:cid?/products/:pid?', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const prodId = req.params.pid;
        const product = await productManager.getProductsById(prodId);
        const result = await cartManager.addProdToCart(cartId, product.id); 
        const cartFiltered = await cartManager.getCartPopulated(cartId);
        const cartProducts = cartFiltered[0].products
        res.render('cart', {carts: cartProducts})
    } catch (err) {
        res.status(500).send({status: 'EM', error: err});
    }   
})

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