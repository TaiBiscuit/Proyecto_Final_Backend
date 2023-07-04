import CartManager  from '../services/CartManager.js';
import ProductManager from '../services/ProductManager.js';

const manager = new CartManager;
const productManager = new ProductManager();


export const getCart =async (req, res) => {
    try {
        const cart = await manager.getCart();
        console.log(cart)
        res.status(200).send(cart);
        } catch (err) {
        res.status(500).send({status: 'EM', error: err});
    }
}

export const getCartPopulated = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cartFiltered = await manager.getCartPopulated(cartId);
        const cartProducts = cartFiltered[0].products
        res.render('cart', {carts: cartProducts})
    } catch (err) {
        res.status(500).send({status: 'EM', error: err});
    }
}

export const addProdToCart = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const prodId = req.params.pid;
        const result = await manager.addProdToCart(cartId, prodId);
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send({status: 'EM', error: err});
    }
}

export const deleteProdFromCart = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const prodId = req.params.pid;
        const result = await manager.deleteProdFromCart(cartId, prodId);
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send({status: 'EM', error: err});
    }
}

export const emptyCart = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const result = await manager.emptyCart(cartId);
        res.status(200).send(result)
    } catch (err) {
        res.status(500).send({status: 'EM', error: err});
    }
}

export const addProdFromPage = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const prodId = req.params.pid;
        const product = await productManager.getProductsById(prodId);
        const result = await manager.addProdToCart(cartId, product.id); 
        const cartFiltered = await manager.getCartPopulated(cartId);
        const cartProducts = cartFiltered[0].products
        res.render('cart', {carts: cartProducts})
    } catch (err) {
        res.status(500).send({status: 'EM', error: err});
    }  
}