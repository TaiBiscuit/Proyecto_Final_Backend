import { Router } from 'express';
import { getCart, getCartPopulated, addProdToCart, deleteProdFromCart, emptyCart, addProdFromPage, purchaseCart } from '../controllers/cart.controller.js';
import { checkIfValid } from '../controllers/isAdmin.js';

const cartsRouter = Router();

cartsRouter.get('/carts', checkIfValid,  getCart);

cartsRouter.get('/carts/:cid?', checkIfValid,  getCartPopulated);

cartsRouter.put('/carts/:cid?/products/:pid?', checkIfValid, addProdToCart); 

cartsRouter.post('/carts/:cid?/products/:pid?', checkIfValid,  addProdFromPage)

cartsRouter.delete('/carts/:cid?/products/:pid?', checkIfValid,  deleteProdFromCart);

cartsRouter.delete('/carts/:cid?', checkIfValid,  emptyCart);

cartsRouter.put('/carts/:cid?/purchase', checkIfValid,  purchaseCart);

export default cartsRouter;