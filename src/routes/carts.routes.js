import {Router} from 'express';
import { getCart, getCartPopulated, addProdToCart, deleteProdFromCart, emptyCart, addProdFromPage } from '../controllers/cart.controller.js';

const cartsRouter = Router();

cartsRouter.get('/carts', getCart);

cartsRouter.get('/carts/:cid', getCartPopulated);

cartsRouter.put('/carts/:cid?/products/:pid?', addProdToCart); 

cartsRouter.post('/carts/:cid?/products/:pid?', addProdFromPage)

cartsRouter.delete('/carts/:cid?/products/:pid?', deleteProdFromCart);

cartsRouter.delete('/carts/:cid?', emptyCart);

export default cartsRouter;